import React, { useState } from 'react';
import { createRandomCoordinates } from '../utils';

const GameScreen = (grid, setGrid, gameOver, setGameOver, points, setPoints, highScore, setHighScore, speed, setSpeed) => {
  const rows = 15;
  const columns = 21;

  

  const [direction, setDirection] = useState('down');
  const [snake, setSnake] = useState([
    { x: Math.floor(rows / 2), y: Math.floor(columns / 2) },
  ]);
  const [food, setFood] = useState(createRandomCoordinates(snake));


  return (
    <div>
    <div className="grid">
      {grid.map((cell) => {
        return (
          <div
            className={`${cell.class}`}
            key={`grid-item-${cell.x}-${cell.y}`}
          ></div>
        );
      })}
    </div>
    <p>Points: {points}</p>
    <p>High Score: {highScore}</p>
  </div>
  );
};

export default GameScreen;