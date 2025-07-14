import os
import sys
import random
import pandas as pd
import openai
from flask import Flask, request, jsonify, render_template_string
from functools import lru_cache

# ─── 0. Load OpenAI key from env ──────────────────────────────────────────────
openai.api_key = os.environ.get("OPENAI_API_KEY", "")

# ─── Load & prepare data ───────────────────────────────────────────────────────
df = pd.read_csv("preprocessed_data.csv")
df["patient_id"] = (
    df["UMR No."].astype(str)
                .str.replace(r"\.0$", "", regex=True)
                .str.strip()
)
zones = ["Zone A", "Zone B", "Zone C"]
if "geo_zone" not in df.columns:
    df["geo_zone"] = [random.choice(zones) for _ in range(len(df))]

# ─── Helper functions ─────────────────────────────────────────────────────────
def get_antibiotic_col(name: str):
    for c in df.columns:
        if c.lower() == name.lower():
            return c
    return None

def check_patient_resistance(pid: str, ab: str):
    col = get_antibiotic_col(ab)
    if not col:
        return None
    return (df[df["patient_id"] == pid][col] == "r").any()

def check_region_resistance(pid: str, ab: str, threshold: int = 5):
    col = get_antibiotic_col(ab)
    if not col:
        return None
    zone = df[df["patient_id"] == pid]["geo_zone"].iloc[0]
    return (df[df["geo_zone"] == zone][col] == "r").sum() >= threshold

@lru_cache(maxsize=1024)
def generate_alert(patient_flag: bool, region_flag: bool) -> str:
    """Cache up to 1024 unique (patient_flag, region_flag) combos."""
    reasons = []
    if patient_flag:
        reasons.append("patient has a known resistance")
    if region_flag:
        reasons.append("this region shows significant resistance")
    prompt = (
        "A doctor is considering prescribing an antibiotic, but the "
        + " and ".join(reasons)
        + ". Generate a formal medical alert."
    )
    resp = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=50,
        temperature=0.0
    )
    return resp.choices[0].message.content

# ─── Flask App ────────────────────────────────────────────────────────────────
app = Flask(__name__)

# ─── Front end ────────────────────────────────────────────────────────────────
@app.route("/")
def index():
    return render_template_string("""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Antibiotic Resistance Checker</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f4f4f4; }
    #root { max-width: 600px; margin: auto; background: white; padding: 1.5rem; border-radius: 8px; }
    input, button { padding: 0.5rem; font-size: 1rem; margin-top: 0.5rem; width: 100%; }
    button { background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .alert { margin-top: 1rem; padding: 1rem; border-radius: 4px; }
    .error { background: #f8d7da; color: #721c24; }
    .success { background: #d4edda; color: #155724; }
  </style>
</head>
<body>
  <div id="root"></div>

  <!-- React + Babel via CDN -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

  <!-- Our JSX App -->
  <script type="text/babel">
    function App() {
      const [pid, setPid] = React.useState("");
      const [ab, setAb] = React.useState("");
      const [msg, setMsg] = React.useState(null);
      const [type, setType] = React.useState("");

      const check = async () => {
        setMsg("Checking…");
        const res = await fetch("/api/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patient_id: pid, antibiotic: ab })
        });
        const data = await res.json();
        if (data.error) {
          setType("error");
          setMsg(data.error);
        } else if (data.alert) {
          setType("error");
          setMsg(data.alert);
        } else {
          setType("success");
          setMsg("No resistance found. Safe to proceed.");
        }
      };

      return (
        <div>
          <h1>Antibiotic Resistance Checker</h1>
          <label>Patient UMR No.</label>
          <input value={pid} onChange={e => setPid(e.target.value)} />
          <label>Antibiotic Name</label>
          <input value={ab} onChange={e => setAb(e.target.value)} />
          <button onClick={check}>Check Resistance</button>
          {msg && <div className={"alert " + type}>{msg}</div>}
        </div>
      );
    }

    ReactDOM.render(<App />, document.getElementById("root"));
  </script>
</body>
</html>
    """)

# ─── API endpoint ─────────────────────────────────────────────────────────────
@app.route("/api/check", methods=["POST"])
def api_check():
    data = request.get_json()
    pid = data.get("patient_id", "").strip()
    ab  = data.get("antibiotic", "").strip()
    if not pid or not ab:
        return jsonify(error="Patient ID and antibiotic are required"), 400

    pflag = check_patient_resistance(pid, ab)
    if pflag is None:
        return jsonify(error="Antibiotic not found in dataset"), 404

    rflag = check_region_resistance(pid, ab)
    if not (pflag or rflag):
        return jsonify(alert=None)

    alert = generate_alert(pflag, rflag)
    return jsonify(alert=alert)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
