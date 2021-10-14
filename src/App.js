import { useState } from 'react';
import CountdownScreen from './Components/CountdownScreen';
import GameScreen from './Components/GameScreen';
import StartScreen from './Components/StartScreen';

function App() {
  const [gameOver, setGameOver] = useState(true);
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const [buttonText, setButtonText] = useState('Start');
  const [countDownScreen, setCountDownScreen] = useState(false);

  return (
    <div className="App">
      <div className="content">
        <h1>Snake</h1>
        {gameOver ? (
          <StartScreen
            gameOver={gameOver}
            setGameOver={setGameOver}
            points={points}
            highScore={highScore}
            speed={speed}
            setSpeed={setSpeed}
            buttonText={buttonText}
            setCountDownScreen={setCountDownScreen}
          />
        ) : countDownScreen ? (
          <CountdownScreen setCountDownScreen={setCountDownScreen} />
        ) : (
          <GameScreen
            gameOver={gameOver}
            setGameOver={setGameOver}
            points={points}
            setPoints={setPoints}
            highScore={highScore}
            setHighScore={setHighScore}
            speed={speed}
            setButtonText={setButtonText}
          />
        )}
      </div>
    </div>
  );
}

export default App;
