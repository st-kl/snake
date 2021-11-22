import React from 'react';

const StartScreen = ({
  gameOver,
  setGameOver,
  points,
  setPoints,
  highScore,
  speed,
  setSpeed,
  buttonText,
  setCountDownScreen,
}) => {
  const radioButtons = [
    { level: 'Easy', speed: 350 },
    { level: 'Medium', speed: 150 },
    { level: 'Hard', speed: 50 },
  ];

  const startNewGame = () => {
    setGameOver(false);
    setCountDownScreen(true);
    setPoints(0);
  };

  // start new game when hitting the space bar
  const keyPress = (event) => {
    if (event.keyCode === 32) startNewGame();
  };

  // event listener for key press
  document.onkeydown = keyPress;

  return (
    <div className='info'>
      {gameOver && buttonText === 'Play again' ? <p>GAME OVER</p> : <p></p>}
      <button onClick={() => startNewGame()}>{buttonText}</button>
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
      <p className='instructions'>Control snake: arrow keys</p>
      <p className='instructions'>Start game: spacebar</p>
    </div>
  );
};

export default StartScreen;
