# FC Barcelona Player Performance Analysis

## Project Overview
This project analyzes and visualizes FC Barcelona player performance for the 2025-2026 UEFA Champions League season.
It compares Barcelona players to players from other European teams in the Champions League and groups them by position:

- **Attackers** → goals, shots per game, shots on target
- **Midfielders** → assists, passes per game, pass accuracy  
- **Defenders** → fouls, successful tackles, yellow/red cards  
- **Goalkeepers** → saves, clean sheets  

### Per 90 Minutes Statistics
To ensure fair comparison between players with different playing time, this project includes per 90 minutes metrics.

#### What This Means
Player stats are normalized based on minutes played using the following formula:
**Stat per 90 = (Total Stat / Minutes Played) × 90**
- For Example: 
Goals: 10, Minutes Played: 1800 --> Goals per 90 = 0.50

--- 

The goal is to use Python for data analysis, export the results, and build a web app to display the trends.

---

## Project Deliverables

### 1. Python — Data Analysis & JSON Export
- **Task:** Analyze player data (stats per 90, trends, comparisons) using Python  
- **Output:** A `results.json` file containing calculated stats  
- **Skills Demonstrated:** Data processing, basic Python programming  

#### Example Python Tasks:
- Calculate goals per 90 for attackers  
- Calculate assists per 90 and pass accuracy per 90 for midfielders  
- Compare Barcelona players to players from other teams  

---

### 2. React.js — Interactive Player Stats App
- **Task:** Build a React application to display player stats dynamically  
- **Output:** A web page that shows all players with stats in tables or cards  
- **Skills Demonstrated:** React components, state management, loading JSON data  

#### Example Features:
- Filter players by team or position  
- Show player stats for each season  
- Highlight top performers visually  

---

### 3. HTML/CSS — Layout & Styling
- **Task:** Use HTML and CSS to design and style the React app  
- **Output:** A visually organized and responsive web page  
- **Skills Demonstrated:** Web design, styling, responsive layout  

#### Example Features:
- Tables or cards with clear headings  
- Color-coded stats for quick readability  
- Mobile-friendly layout  
