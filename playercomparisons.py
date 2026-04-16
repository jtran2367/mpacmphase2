# playercomparisons.py --> shows indivial stats for each player, grouped by position
import pandas as pd

data = pd.read_csv("UCLStats25-26.csv")
data = data.fillna(0)


def print_position_table(label, group, columns):
    print("\n" + "=" * 60)
    print(f"  {label}")
    print("=" * 60)

    for _, row in group.iterrows():
        print(
            f"\n  {row['Player']} ({row['Team']}) -- {row['GamesPlayed']} games")

        for col in columns:
            value = row[col]
            if pd.isna(value):
                print(f"     {col}: N/A")
            else:
                print(f"     {col}: {int(value)}")


attacker_stats = ["Goals", "Shots", "ShotsOnTarget"]
midfielder_stats = ["Assists", "Passes", "AccuratePasses"]
defender_stats = ["FoulsCommitted", "Tackles", "SuccessfulTackles"]
keeper_stats = ["Saves", "GoalsConceded", "CleanSheets"]

attackers = data[data["Position"] == "Attacker"]
midfielders = data[data["Position"] == "Midfielder"]
defenders = data[data["Position"] == "Defender"]
goalkeepers = data[data["Position"] == "Goalkeeper"]

print_position_table("ATTACKERS", attackers, attacker_stats)
print_position_table("MIDFIELDERS", midfielders, midfielder_stats)
print_position_table("DEFENDERS", defenders, defender_stats)
print_position_table("GOALKEEPERS", goalkeepers, keeper_stats)

print("\n All player stats printed.")
