import React, { useState, useEffect } from 'react';

const MeetingCostTimer = () => {
  const [people, setPeople] = useState(5);
  const [cost, setCost] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // AU$86.03 per hour per person
  const HOURLY_RATE = 86.03;
  const COST_PER_SECOND = HOURLY_RATE / 3600; // Convert to per second

  useEffect(() => {
    let interval = null;
    if (isRunning && startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = (now - startTime) / 1000;
        const currentCost = elapsedSeconds * COST_PER_SECOND * people;
        setCost(currentCost);
      }, 100); // Update every 100ms for smooth counting
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime, people]);

  const startTimer = () => {
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCost(0);
    setStartTime(null);
  };

  const formatCost = (cost) => {
    return `AU$${cost.toFixed(2)}`;
  };

  const adjustPeople = (delta) => {
    const newCount = people + delta;
    if (newCount >= 1 && newCount <= 100) {
      setPeople(newCount);
    }
  };

  return (
    <div className="timer-container">
      {/* Main Cost Display */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="cost-display">
          {formatCost(cost)}
        </div>
        <div className="cost-label">
          Meeting Cost
        </div>
      </div>

      {/* People Counter */}
      <div className="people-counter">
        <button
          onClick={() => adjustPeople(-1)}
          className="people-button"
          disabled={people <= 1}
        >
          −
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <div className="people-count">
            {people}
          </div>
          <div className="people-label">
            {people === 1 ? 'person' : 'people'}
          </div>
        </div>

        <button
          onClick={() => adjustPeople(1)}
          className="people-button"
          disabled={people >= 100}
        >
          +
        </button>
      </div>

      {/* Controls */}
      <div className="controls">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="control-button start-button"
          >
            Start Meeting
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="control-button pause-button"
          >
            Pause
          </button>
        )}
        
        <button
          onClick={resetTimer}
          className="control-button reset-button"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <MeetingCostTimer />
    </div>
  );
}

export default App;