import React, { useState } from 'react';
import { startGame } from '../utils';


const StartScreen = (gameOver, setGameOver, points, setPoints, highScore, setHighScore, speed, setSpeed) => {
  const [buttonText, setButtonText] = useState("Start")

  return (
    <div className="info">
    <p
      style={{
        visibility:
          gameOver && buttonText === 'Play again'
            ? 'visible'
            : 'hidden',
      }}
    >
      GAME OVER
    </p>
    <button
      onClick={() => {
        startGame();
      }}
    >
      {buttonText}
    </button>
    <input
      type="radio"
      checked={speed === 350}
      onChange={() => setSpeed(350)}
    />
    Easy
    <input
      type="radio"
      checked={speed === 150}
      onChange={() => setSpeed(150)}
    />
    Medium
    <input
      type="radio"
      checked={speed === 50}
      onChange={() => setSpeed(50)}
    />
    Hard
    <p>Points: {points}</p>
    <p>High Score: {highScore}</p>
  </div>
  );
};

export default StartScreen;