#!/usr/bin/env python3
import os
import sys
import random
import pandas as pd
from openai import OpenAI
from functools import lru_cache

# ─── 0. Load OpenAI key from env & init client ────────────────────────────────
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_KEY:
    print("ERROR: The OPENAI_API_KEY environment variable is not set.")
    sys.exit(1)
client = OpenAI(api_key=OPENAI_KEY)

# ─── 1. Load & prepare data ───────────────────────────────────────────────────
CSV_PATH = "preprocessed_data.csv"
try:
    df = pd.read_csv(CSV_PATH)
except FileNotFoundError:
    print(f"ERROR: Could not find '{CSV_PATH}'.")
    sys.exit(1)

df["patient_id"] = (
    df["UMR No."].astype(str)
                .str.replace(r"\.0$", "", regex=True)
                .str.strip()
)
zones = ["Zone A", "Zone B", "Zone C"]
if "geo_zone" not in df.columns:
    df["geo_zone"] = [random.choice(zones) for _ in range(len(df))]

# ─── 2. Helper functions ───────────────────────────────────────────────────────
def get_antibiotic_col(name: str):
    name = name.lower()
    for col in df.columns:
        if col.lower() == name:
            return col
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
    # get zone for patient
    subset = df[df["patient_id"] == pid]
    if subset.empty:
        return None
    zone = subset["geo_zone"].iloc[0]
    return (df[df["geo_zone"] == zone][col] == "r").sum() >= threshold

@lru_cache(maxsize=512)
def generate_alert(patient_flag: bool, region_flag: bool) -> str:
    reasons = []
    if patient_flag:
        reasons.append("patient has a known resistance")
    if region_flag:
        reasons.append("this region shows significant resistance")
    reason_str = " and ".join(reasons)
    prompt = (
        f"A doctor is considering prescribing an antibiotic, but the {reason_str}. "
        f"Generate a concise medical alert."
    )
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=50,
        temperature=0.0
    )
    return resp.choices[0].message.content.strip()

# ─── 3. CLI loop ───────────────────────────────────────────────────────────────
def main():
    print("🔬 Antibiotic Resistance Checker (CLI)")
    print("Type 'exit' or Ctrl-C to quit.\n")
    while True:
        pid = input("Enter Patient UMR No.: ").strip()
        if pid.lower() in ("exit", "quit"):
            break

        ab = input("Enter Antibiotic Name: ").strip()
        if not pid or not ab:
            print("⚠️  Both Patient UMR No. and Antibiotic are required.\n")
            continue

        pflag = check_patient_resistance(pid, ab)
        if pflag is None:
            print("❌ Patient or antibiotic not found in dataset.\n")
            continue

        rflag = check_region_resistance(pid, ab)
        if rflag is None:
            print("❌ Could not determine regional resistance.\n")
            continue

        if not (pflag or rflag):
            print("✅ No resistance found. Antibiotic is safe to proceed.\n")
            continue

        # generate (or fetch cached) alert
        alert = generate_alert(pflag, rflag)
        print(f"🚨 ALERT: {alert}\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nGoodbye!")
