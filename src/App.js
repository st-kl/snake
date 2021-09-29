import { useEffect, useState } from 'react';

function App() {
  const rows = 15;
  const columns = 21;

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

  const [grid, setGrid] = useState([]);
  const [direction, setDirection] = useState('down');
  const [snake, setSnake] = useState([
    { x: Math.floor(rows / 2), y: Math.floor(columns / 2) },
  ]);
  const [food, setFood] = useState(createRandomCoordinates());
  const [gameOver, setGameOver] = useState(true);
  const [points, setPoints] = useState(0);
  const [buttonText, setButtonText] = useState('Play');

  const createGrid = () => {
    setGrid(() => {
      const grid = [];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let isSnake = false;

          for (const part of snake) {
            if (part.x === i && part.y === j) {
              isSnake = true;
            }
          }

          if (isSnake) {
            grid.push({ x: i, y: j, class: 'grid-item snake' });
          } else if (food.x === i && food.y === j) {
            grid.push({ x: i, y: j, class: 'grid-item food' });
            isSnake = false;
          } else {
            grid.push({ x: i, y: j, class: 'grid-item' });
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
          head = { x: head.x - 1, y: head.y };
          break;
        case 'down':
          head = { x: head.x + 1, y: head.y };
          break;
        case 'left':
          head = { x: head.x, y: head.y - 1 };
          break;
        case 'right':
          head = { x: head.x, y: head.y + 1 };
          break;
        default:
          break;
      }
      setSnake([head, ...snake.slice(0, -1)]);
    }
  };

  const growSnake = () => {
    setSnake([...snake, snake.slice(-1)[0]]);
  };

  const eatFood = () => {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      setFood(createRandomCoordinates());
      growSnake();
      setPoints(points + 1);
    }
  };

  const checkCollision = () => {
    let isSnake = false;

    for (const part of snake.slice(4)) {
      if (part.x === snake[0].x && part.y === snake[0].y) {
        isSnake = true;
      }
    }

    if (
      snake[0].x === -1 ||
      snake[0].x === rows ||
      snake[0].y === -1 ||
      snake[0].y === columns ||
      isSnake
    ) {
      setGameOver(true);
      setButtonText('Play again');
    }
  };

  function keyPress(event) {
    switch (event.keyCode) {
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

  // effects
  useEffect(() => {
    document.onkeydown = keyPress;
    checkCollision();
    eatFood();

    const runGame = setInterval(() => {
      moveSnake();
    }, 200);
    return () => clearInterval(runGame);
  });

  useEffect(() => {
    createGrid();
  }, [snake, food]);

  return (
    <div className="App">
      <div className="content">
        <h1>Snake</h1>
        {!gameOver ? (
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
          </div>
        ) : (
          <div className="info">
            <p>Points: {points}</p>
            <button
              onClick={() => {
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
              }}
            >
              {buttonText}
            </button>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
