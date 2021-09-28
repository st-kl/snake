import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const rows = 15;
  const columns = 21;

  const createRandomCoordinates = () => {
    let isFree = false;

    while (!isFree) {
      const row = Math.floor(Math.random() * rows) + 1;
      const col = Math.floor(Math.random() * columns) + 1;

      if (
        !snake.filter((part) => part.row === row && part.col === col).length
      ) {
        isFree = true;
        return { row: row, col: col };
      }
    }
  };

  const [grid, setGrid] = useState([]);
  const [direction, setDirection] = useState('down');
  const [snake, setSnake] = useState([{ row: 4, col: 11 }]);
  const [food, setFood] = useState({ row: rows + 1, col: columns + 1 });
  const [gameOver, setGameOver] = useState(true);
  const [points, setPoints] = useState(0);
  const [buttonText, setButtonText] = useState('Play');

  const updateGrid = () => {
    setGrid(() => {
      const grid = [];
      for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= columns; j++) {
          let isSnake = false;

          for (const part of snake) {
            if (part.row === i && part.col === j) {
              isSnake = true;
            }
          }

          if (isSnake) {
            grid.push({ row: i, col: j, class: 'grid-item snake' });
          } else if (food.row === i && food.col === j) {
            grid.push({ row: i, col: j, class: 'grid-item food' });
            isSnake = false;
          } else {
            grid.push({ row: i, col: j, class: 'grid-item' });
          }
        }
      }

      return grid;
    });
  };

  const moveSnake = () => {
    if (!gameOver) {
      let head = snake.slice(0)[0];
      switch (direction) {
        case 'up':
          head = { row: head.row - 1, col: head.col };
          break;
        case 'down':
          head = { row: head.row + 1, col: head.col };
          break;
        case 'left':
          head = { row: head.row, col: head.col - 1 };
          break;
        case 'right':
          head = { row: head.row, col: head.col + 1 };
          break;
        default:
          break;
      }
      setSnake([head, ...snake.slice(0, -1)]);
    }
  };

  useEffect(() => {
    document.onkeydown = onKeyDown;
    checkCollision();
    eatFood();

    const runGame = setInterval(() => {
      moveSnake();
    }, 300);
    return () => clearInterval(runGame);
  });

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 38:
        if (direction !== 'down') setDirection('up');
        break;
      case 40:
        if (direction !== 'up') setDirection('down');

        break;
      case 37:
        if (direction !== 'right') setDirection('left');

        break;
      case 39:
        if (direction !== 'left') setDirection('right');

        break;
    }
  }

  const growSnake = () => {
    setSnake([...snake, snake.slice(-1)[0]]);
  };

  const eatFood = () => {
    if (snake[0].row === food.row && snake[0].col === food.col) {
      setFood(createRandomCoordinates());
      growSnake();
      setPoints(points + 1);
    }
  };

  useEffect(() => {
    updateGrid();
  }, [snake, food]);

  const checkCollision = () => {
    let isSnake = false;

    for (const part of snake.slice(3)) {
      if (part.row === snake[0].row && part.col === snake[0].col) {
        isSnake = true;
      }
    }

    if (
      snake[0].row === 0 ||
      snake[0].row === rows + 1 ||
      snake[0].col === 0 ||
      snake[0].col === columns + 1 ||
      isSnake
    ) {
      setGameOver(true);
      setButtonText('Play again');
    }
  };

  return (
    <div className='App'>
      <div className='content'>
        <div className='grid'>
          {grid.map((cell) => {
            return (
              <div
                className={`${cell.class}`}
                key={`grid-item-${cell.row}-${cell.col}`}
              ></div>
            );
          })}
        </div>
        <div className='info'>
          <p>Points: {points}</p>
          <button
            onClick={() => {
              setGameOver(false);
              setSnake([{ row: 4, col: 11 }]);
              setFood(createRandomCoordinates());
              setPoints(0);
              setDirection('down');
            }}
          >
            {buttonText}
          </button>
          <p
            style={{
              visibility:
                gameOver && buttonText === 'Play again' ? 'visible' : 'hidden',
            }}
          >
            GAME OVER
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
