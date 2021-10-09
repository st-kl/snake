import { useState } from 'react';
import GameScreen from './Components/GameScreen';
import StartScreen from './Components/StartScreen';

function App() {
  const rows = 15;
  const columns = 21;

  // calculates random x and y coordinates for the food item and
  // makes sure it's not placed where the snake currently is
  const createRandomCoordinates = () => {
    let isAvailable = false;

    while (!isAvailable) {
      const x = Math.floor(Math.random() * rows);
      const y = Math.floor(Math.random() * columns);

      if (!snake.filter((part) => part.x === x && part.y === y).length) {
        isAvailable = true;
        return { x, y };
      }
    }
  };

  const [gameOver, setGameOver] = useState(true);
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const [buttonText, setButtonText] = useState('Start');
  const [direction, setDirection] = useState('down');
  const [snake, setSnake] = useState([
    { x: Math.floor(rows / 2), y: Math.floor(columns / 2) },
  ]);
  const [food, setFood] = useState(createRandomCoordinates(snake));
  const [grid, setGrid] = useState([]);

  return (
    <div className='App'>
      <div className='content'>
        <h1>Snake</h1>
        {gameOver ? (
          <StartScreen
            rows={rows}
            columns={columns}
            gameOver={gameOver}
            setGameOver={setGameOver}
            points={points}
            setPoints={setPoints}
            highScore={highScore}
            speed={speed}
            setSpeed={setSpeed}
            buttonText={buttonText}
            setDirection={setDirection}
            setFood={setFood}
            setSnake={setSnake}
            createRandomCoordinates={createRandomCoordinates}
            grid={grid}
            setGrid={setGrid}
          />
        ) : (
          <GameScreen
            rows={rows}
            columns={columns}
            gameOver={gameOver}
            setGameOver={setGameOver}
            points={points}
            setPoints={setPoints}
            highScore={highScore}
            setHighScore={setHighScore}
            speed={speed}
            setSpeed={setSpeed}
            buttonText={buttonText}
            setButtonText={setButtonText}
            direction={direction}
            setDirection={setDirection}
            food={food}
            setFood={setFood}
            snake={snake}
            setSnake={setSnake}
            createRandomCoordinates={createRandomCoordinates}
            grid={grid}
            setGrid={setGrid}
          />
        )}
      </div>
    </div>
  );
}

export default App;
