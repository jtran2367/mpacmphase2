# This script analyzes the data and saves everything to results.json -> will be read by React
import pandas as pd
import json

df = pd.read_csv("UCLStats25-26.csv")


def safe_avg(group, column):
    value = group[column].mean()
    if pd.isna(value):
        return 0
    return round(value, 2)


def player_to_dict(row, columns):
    stats = {}
    for col in columns:
        value = row[col]
        if pd.isna(value):
            stats[col] = None
        else:
            stats[col] = int(value)

    return {
        "name": row["Player"],
        "team": row["Team"],
        "position": row["Position"],
        "gamesPlayed": int(row["GamesPlayed"]),
        "stats": stats
    }


# which stats to export for each position
position_config = {
    "Attacker":   ["Goals", "Shots", "ShotsOnTarget"],
    "Midfielder": ["Assists", "Passes", "AccuratePasses"],
    "Defender":   ["FoulsCommitted", "Tackles", "SuccessfulTackles"],
    "Goalkeeper": ["Saves", "GoalsConceded", "CleanSheets"]
}

barca = df[df["Team"] == "FC Barcelona"]
others = df[df["Team"] != "FC Barcelona"]

# full results structure, has two sections: "players" and "averages"

results = {
    "players": {},    # will hold individual player data by position
    "averages": {}    # will hold team averages by position
}

for position, columns in position_config.items():

    # Filtering players by this position
    all_in_position = df[df["Position"] == position]
    barca_in_position = barca[barca["Position"] == position]
    others_in_position = others[others["Position"] == position]

    # Building a list of player dictionaries for this position
    player_list = []
    for _, row in all_in_position.iterrows():
        player_list.append(player_to_dict(row, columns))

    # Storing the player list under this position name
    results["players"][position] = player_list

    # Building averages for Barcelona vs other teams
    barca_avgs = {}
    others_avgs = {}
    for col in columns:
        barca_avgs[col] = safe_avg(barca_in_position, col)
        others_avgs[col] = safe_avg(others_in_position, col)

    results["averages"][position] = {
        "barcelona": barca_avgs,
        "otherTeams": others_avgs
    }

with open("results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print("results.json has been created successfully.")
print(f"Total positions exported: {len(results['players'])}")
for position, players in results["players"].items():
    print(f"  {position}: {len(players)} players")
