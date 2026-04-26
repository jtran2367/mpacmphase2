// App.js - Final version

import { useState, useEffect } from 'react';
import './App.css';
import PositionChart from './PositionChart';

function App() {

  const [data, setData]                         = useState(null);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(null);
  const [selectedTeam, setSelectedTeam]         = useState('All');
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [showCharts, setShowCharts]             = useState(true);

  useEffect(() => {
    fetch('/UCLresults.json')
      .then(response => response.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: '40px', textAlign: 'center' }}>Loading data...</p>;
  if (error)   return <p style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</p>;

  const allPlayers = Object.values(data.players).flat();

  const filteredPlayers = allPlayers.filter(player => {
    const teamMatch =
      selectedTeam === 'All' ||
      (selectedTeam === 'Barcelona' && player.team === 'FC Barcelona') ||
      (selectedTeam === 'Others'    && player.team !== 'FC Barcelona');

    const positionMatch =
      selectedPosition === 'All' ||
      player.position === selectedPosition;

    return teamMatch && positionMatch;
  });

  const groupedPlayers = filteredPlayers.reduce((groups, player) => {
    const pos = player.position;
    if (!groups[pos]) groups[pos] = [];
    groups[pos].push(player);
    return groups;
  }, {});

  const positionOrder = ['Attacker', 'Midfielder', 'Defender', 'Goalkeeper'];

  const chartPositions = selectedPosition === 'All'
    ? positionOrder
    : [selectedPosition];

  return (
    <div className="app">

      <header className="app-header">
        <h1>FC Barcelona</h1>
        <h2>UEFA Champions League 2025-26 — Player Stats</h2>
      </header>

      {/* Filters */}
      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">Team:</span>
          {['All', 'Barcelona', 'Others'].map(option => (
            <button
              key={option}
              className={selectedTeam === option ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setSelectedTeam(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-label">Position:</span>
          {['All', 'Attacker', 'Midfielder', 'Defender', 'Goalkeeper'].map(option => (
            <button
              key={option}
              className={selectedPosition === option ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setSelectedPosition(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="section-header">
        <h3 className="section-title">Barcelona vs Other Teams — Averages</h3>
        <button
          className="toggle-btn"
          onClick={() => setShowCharts(prev => !prev)}
        >
          {showCharts ? 'Hide Charts' : 'Show Charts'}
        </button>
      </div>

      {showCharts && (
        <div className="charts-grid">
          {chartPositions.map(position => {
            const averages = data.averages[position];
            if (!averages) return null;
            return (
              <PositionChart
                key={position}
                position={position}
                averages={averages}
              />
            );
          })}
        </div>
      )}

      {/* Player cards */}
      <div className="section-header">
        <h3 className="section-title">Player Cards</h3>
        <p className="results-count">
          Showing {filteredPlayers.length} player{filteredPlayers.length !== 1 ? 's' : ''}
        </p>
      </div>

      <main>
        {filteredPlayers.length === 0 ? (
          <p className="no-results">No players match the selected filters.</p>
        ) : (
          positionOrder.map(position => {
            const players = groupedPlayers[position];
            if (!players) return null;

            return (
              <section key={position} className="position-section">
                <h3 className="position-title">{position}s</h3>
                <div className="player-grid">
                  {players.map(player => {
                    const isBarça = player.team === 'FC Barcelona';
                    return (
                      <div
                        key={player.name}
                        className={isBarça ? 'player-card barca-card' : 'player-card other-card'}
                      >
                        <div className="player-header">
                          <span className="player-name">{player.name}</span>
                          <span className={isBarça ? 'player-team barca' : 'player-team other'}>
                            {player.team}
                          </span>
                        </div>

                        <p className="player-games">Games: {player.gamesPlayed}</p>

                        <div className="player-stats">
                          {Object.entries(player.stats).map(([statName, statValue]) => (
                            <div key={statName} className="stat-row">
                              <span className="stat-name">{statName}</span>
                              <span className="stat-value">
                                {statValue !== null ? statValue : 'N/A'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}
      </main>

      <footer className="app-footer">
        FC Barcelona UCL Stats 2025-26 — Data Analysis Project
      </footer>

    </div>
  );
}

export default App;