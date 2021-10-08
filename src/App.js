import { useEffect, useState } from 'react';
import GameScreen from './Components/GameScreen';
import StartScreen from './Components/StartScreen';
import {
  checkCollision,
  createGrid,
  eatFood,
  keyPress,
  moveSnake,
} from './utils';

function App() {
  const [gameOver, setGameOver] = useState(true);
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const [directionIsSet, setDirectionIsSet] = useState(false);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    document.onkeydown = keyPress;

    checkCollision();
    eatFood();

    const runGame = setInterval(() => {
      moveSnake();
      setDirectionIsSet(false);
    }, speed);
    return () => clearInterval(runGame);
  });

  useEffect(() => {
    setGrid(createGrid());
    // eslint-disable-next-line
  }, [snake, food]);

  return (
    <div className="App">
      <div className="content">
        <h1>Snake</h1>
        {!gameOver ? (
          <GameScreen
            gameOver={gameOver}
            setGameOver={setGameOver}
            points={points}
            setPoints={setPoints}
            highScore={highScore}
            setHighScore={setHighScore}
            speed={speed}
            setSpeed={setSpeed}
          />
        ) : (
          <StartScreen
            gameOver={gameOver}
            setGameOver={setGameOver}
            points={points}
            setPoints={setPoints}
            highScore={highScore}
            setHighScore={setHighScore}
            speed={speed}
            setSpeed={setSpeed}
            grid={grid}
            setGrid={setGrid}
          />
        )}
      </div>
    </div>
  );
}

export default App;
