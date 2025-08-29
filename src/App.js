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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      {/* Main Cost Display */}
      <div className="text-center mb-12">
        <div className="text-8xl md:text-9xl font-mono font-bold text-white mb-4">
          {formatCost(cost)}
        </div>
        <div className="text-xl text-gray-300">
          Meeting Cost
        </div>
      </div>

      {/* People Counter */}
      <div className="flex items-center gap-6 mb-12">
        <button
          onClick={() => adjustPeople(-1)}
          className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 text-white text-2xl font-bold transition-colors"
          disabled={people <= 1}
        >
          −
        </button>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-1">
            {people}
          </div>
          <div className="text-sm text-gray-400">
            {people === 1 ? 'person' : 'people'}
          </div>
        </div>

        <button
          onClick={() => adjustPeople(1)}
          className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 text-white text-2xl font-bold transition-colors"
          disabled={people >= 100}
        >
          +
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-semibold transition-colors"
          >
            Start Meeting
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-lg font-semibold transition-colors"
          >
            Pause
          </button>
        )}
        
        <button
          onClick={resetTimer}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg font-semibold transition-colors"
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