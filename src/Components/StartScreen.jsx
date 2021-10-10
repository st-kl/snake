import React from 'react';

const StartScreen = ({
  gameOver,
  setGameOver,
  points,
  highScore,
  speed,
  setSpeed,
  buttonText,
}) => {
  const radioButtons = [
    { level: 'Easy', speed: 350 },
    { level: 'Medium', speed: 150 },
    { level: 'Hard', speed: 50 },
  ];

  return (
    <div className='info'>
      {gameOver && buttonText === 'Play again' ? <p>GAME OVER</p> : <p></p>}
      <button
        onClick={() => {
          setGameOver(false);
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
