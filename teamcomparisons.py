import pandas as pd

df = pd.read_csv("UCLStats25-26.csv")

barca = df[df["Team"] == "FC Barcelona"]   # only Barca rows
others = df[df["Team"] != "FC Barcelona"]  # everyone else

# Split each group by position
# Barcelona
barca_attackers = barca[barca["Position"] == "Attacker"]
barca_midfielders = barca[barca["Position"] == "Midfielder"]
barca_defenders = barca[barca["Position"] == "Defender"]
barca_keepers = barca[barca["Position"] == "Goalkeeper"]

# Other teams
other_attackers = others[others["Position"] == "Attacker"]
other_midfielders = others[others["Position"] == "Midfielder"]
other_defenders = others[others["Position"] == "Defender"]
other_keepers = others[others["Position"] == "Goalkeeper"]


def avg(group, column):
    return round(group[column].mean(), 2)


# Print averages for ATTACKERS
print("=" * 50)
print("ATTACKERS")
print("=" * 50)
print(f"  Barcelona  → Goals: {avg(barca_attackers, 'Goals')} | "
      f"Shots: {avg(barca_attackers, 'Shots')} | "
      f"Shots on Target: {avg(barca_attackers, 'ShotsOnTarget')}")
print(f"  Other Teams → Goals: {avg(other_attackers, 'Goals')} | "
      f"Shots: {avg(other_attackers, 'Shots')} | "
      f"Shots on Target: {avg(other_attackers, 'ShotsOnTarget')}")

# Print averages for MIDFIELDERS
print("\n" + "=" * 50)
print("MIDFIELDERS")
print("=" * 50)
print(f"  Barcelona   → Assists: {avg(barca_midfielders, 'Assists')} | "
      f"Passes: {avg(barca_midfielders, 'Passes')} | "
      f"Accurate Passes: {avg(barca_midfielders, 'AccuratePasses')}")
print(f"  Other Teams → Assists: {avg(other_midfielders, 'Assists')} | "
      f"Passes: {avg(other_midfielders, 'Passes')} | "
      f"Accurate Passes: {avg(other_midfielders, 'AccuratePasses')}")

# Print averages for DEFENDERS
print("\n" + "=" * 50)
print("DEFENDERS")
print("=" * 50)
print(f"  Barcelona   → Fouls: {avg(barca_defenders, 'FoulsCommitted')} | "
      f"Tackles: {avg(barca_defenders, 'Tackles')} | "
      f"Successful Tackles: {avg(barca_defenders, 'SuccessfulTackles')}")
print(f"  Other Teams → Fouls: {avg(other_defenders, 'FoulsCommitted')} | "
      f"Tackles: {avg(other_defenders, 'Tackles')} | "
      f"Successful Tackles: {avg(other_defenders, 'SuccessfulTackles')}")

# Print averages for GOALKEEPERS
print("\n" + "=" * 50)
print("GOALKEEPERS")
print("=" * 50)
print(f"  Barcelona   → Saves: {avg(barca_keepers, 'Saves')} | "
      f"Goals Conceded: {avg(barca_keepers, 'GoalsConceded')} | "
      f"Clean Sheets: {avg(barca_keepers, 'CleanSheets')}")
print(f"  Other Teams → Saves: {avg(other_keepers, 'Saves')} | "
      f"Goals Conceded: {avg(other_keepers, 'GoalsConceded')} | "
      f"Clean Sheets: {avg(other_keepers, 'CleanSheets')}")

print("\n Team comparisons complete.")
