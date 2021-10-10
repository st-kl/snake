import React from 'react';

const StartScreen = ({
  rows,
  columns,
  gameOver,
  setGameOver,
  points,
  setPoints,
  highScore,
  speed,
  setSpeed,
  buttonText,
  setDirection,
  setFood,
  setSnake,
  createRandomCoordinates,
}) => {
  const radioButtons = [
    { level: 'Easy', speed: 350 },
    { level: 'Medium', speed: 150 },
    { level: 'Hard', speed: 50 },
  ];

  const startGame = () => {
    setGameOver(false);
    setSnake([
      {
        x: Math.floor(rows / 2),
        y: Math.floor(columns / 2),
      },
    ]);
    setFood(createRandomCoordinates());
    setPoints(0);
    setDirection('down');
  };

  return (
    <div className='info'>
      {gameOver && buttonText === 'Play again' ? <p>GAME OVER</p> : <p></p>}
      <button
        onClick={() => {
          startGame();
        }}
      >
        {buttonText}
      </button>
      <div className='radioButtons'>
        {radioButtons.map((button) => {
          return (
            <div key={button.level}>
              <input
                key={button.level}
                type='radio'
                checked={speed === button.speed}
                onChange={() => setSpeed(button.speed)}
              />
              {button.level}
            </div>
          );
        })}
      </div>
      <p>Points: {points}</p>
      <p>High Score: {highScore}</p>
    </div>
  );
};

export default StartScreen;
