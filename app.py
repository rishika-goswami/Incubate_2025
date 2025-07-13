import os
import pandas as pd
import streamlit as st
import random
import openai

# ─── 0. Load your OpenAI key securely ─────────────────────────────────────────
# Option A: Streamlit secrets (deployed on Streamlit Cloud)
# Put your key in .streamlit/secrets.toml as:
# [openai]
# api_key = "sk-…"
OPENAI_KEY = st.secrets["openai"]["api_key"]

# Option B: Environment variable (for local dev)
# OPENAI_KEY = os.getenv("OPENAI_API_KEY")

openai.api_key = OPENAI_KEY
client = openai

# ─── 1. Load your preprocessed CSV ────────────────────────────────────────────
df = pd.read_csv("preprocessed_data.csv")  # make sure this lives next to app.py

# ─── 1a. Derive a clean `patient_id` from `UMR No.` ───────────────────────────
df["patient_id"] = (
    df["UMR No."].astype(str)
                .str.replace(r"\.0$", "", regex=True)
                .str.strip()
)

# ─── 2. Simulate geo_zones if needed ─────────────────────────────────────────
zones = ["Zone A", "Zone B", "Zone C"]
if "geo_zone" not in df.columns:
    df["geo_zone"] = [random.choice(zones) for _ in range(len(df))]

# ─── 3. Streamlit UI ───────────────────────────────────────────────────────────
st.title("Antibiotic Resistance Checker")
patient_id = st.text_input("Enter Patient UMR No.")
antibiotic  = st.text_input("Enter Antibiotic Name")

# ─── 4. Helpers ───────────────────────────────────────────────────────────────
def get_antibiotic_col(name: str):
    for col in df.columns:
        if col.lower() == name.lower():
            return col
    return None

def check_patient_resistance(pid: str, ab_name: str):
    col = get_antibiotic_col(ab_name)
    if not col:
        return None
    return (df[df["patient_id"] == pid][col] == "r").any()

def get_patient_zone(pid: str):
    try:
        return df[df["patient_id"] == pid]["geo_zone"].iloc[0]
    except:
        return None

def check_region_resistance(zone: str, ab_name: str, threshold: int = 5):
    col = get_antibiotic_col(ab_name)
    if not col:
        return None
    return (df[df["geo_zone"] == zone][col] == "r").sum() >= threshold

def generate_alert_message(patient_flag: bool, region_flag: bool) -> str:
    reasons = []
    if patient_flag: reasons.append("patient has a known resistance")
    if region_flag: reasons.append("this region shows significant resistance")
    prompt = (
        "A doctor is considering prescribing an antibiotic, but the "
        + " and ".join(reasons)
        + ". Generate a formal medical alert."
    )
    resp = client.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role":"user","content":prompt}]
    )
    return resp.choices[0].message.content

# ─── 5. Button handler ────────────────────────────────────────────────────────
if st.button("Check Resistance"):
    if not patient_id or not antibiotic:
        st.warning("Please enter both Patient UMR No. and Antibiotic name.")
    else:
        p_flag = check_patient_resistance(patient_id, antibiotic)
        if p_flag is None:
            st.error("Antibiotic not found.")
        else:
            zone = get_patient_zone(patient_id)
            if not zone:
                st.error("Patient not found.")
            else:
                r_flag = check_region_resistance(zone, antibiotic)
                if r_flag is None:
                    st.error("Antibiotic not found.")
                elif p_flag or r_flag:
                    alert = generate_alert_message(p_flag, r_flag)
                    st.error(alert)
                else:
                    st.success("No resistance found. Antibiotic is safe to proceed.")
