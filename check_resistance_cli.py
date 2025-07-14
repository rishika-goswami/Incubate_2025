# check_resistance_cli.py

import os
import sys
import pandas as pd
from functools import lru_cache

# ─── Load CSV ───────────────────────────────────────────────────
CSV_PATH = "zone_divided_data.csv"
try:
    df = pd.read_csv(CSV_PATH)
except FileNotFoundError:
    print(f"❌ ERROR: '{CSV_PATH}' not found. Run add_zones.py first.")
    sys.exit(1)

df["patient_id"] = (
    df["UMR No."].astype(str)
                 .str.replace(r"\.0$", "", regex=True)
                 .str.strip()
)

# ─── Helper Functions ───────────────────────────────────────────
def get_antibiotic_col(name):
    for col in df.columns:
        if col.lower() == name.lower():
            return col
    return None

def get_geo_zone(pid):
    row = df[df["patient_id"] == pid]
    if row.empty:
        return None
    return row["geo_zone"].iloc[0]

def is_patient_resistant(pid, ab_col):
    subset = df[df["patient_id"] == pid]
    if subset.empty:
        return None
    val = subset[ab_col].iloc[0]
    return isinstance(val, str) and val.strip().lower() == "r"

def is_zone_resistant(zone, ab_col):
    zone_subset = df[df["geo_zone"] == zone]
    return (zone_subset[ab_col].astype(str).str.lower() == "r").any()

# ─── CLI ────────────────────────────────────────────────────────
def main():
    print("🔬 Antibiotic Resistance Checker (CLI)")
    print("Type 'exit' or Ctrl-C to quit.\n")

    while True:
        pid = input("Enter Patient UMR No.: ").strip()
        if pid.lower() in ("exit", "quit"):
            break

        ab = input("Enter Antibiotic Name: ").strip()
        if not pid or not ab:
            print("⚠️  Both fields are required.\n")
            continue

        ab_col = get_antibiotic_col(ab)
        if not ab_col:
            print("❌ Antibiotic not found in dataset.\n")
            continue

        zone = get_geo_zone(pid)
        if not zone:
            print("❌ Patient not found in dataset.\n")
            continue

        if is_patient_resistant(pid, ab_col):
            msg = f"📢 ALERT: Patient is resistant to {ab}. Use an alternative antibiotic."
        elif is_zone_resistant(zone, ab_col):
            msg = f"📢 NOTICE: Geographic zone {zone} shows resistance to {ab}."
        else:
            msg = f"📢 OK: No known resistance to {ab}. Proceed with treatment."

        print(msg + "\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 Goodbye!")
