# add_zones.py

import pandas as pd
import random

INPUT_FILE = "preprocessed_data.csv"
OUTPUT_FILE = "zone_divided_data.csv"
zones = ["Zone A", "Zone B", "Zone C"]

try:
    df = pd.read_csv(INPUT_FILE)
except FileNotFoundError:
    print(f"❌ Error: Could not find '{INPUT_FILE}'")
    exit(1)

df["patient_id"] = (
    df["UMR No."].astype(str)
                 .str.replace(r"\.0$", "", regex=True)
                 .str.strip()
)

df["geo_zone"] = [random.choice(zones) for _ in range(len(df))]

df.to_csv(OUTPUT_FILE, index=False)
print(f"✅ Saved zone-divided data to '{OUTPUT_FILE}'")
