import { useEffect, useState } from 'react';

function App() {
  const rows = 15;
  const columns = 21;

  // coordinates for food
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

  // states
  const [grid, setGrid] = useState([]);
  const [direction, setDirection] = useState('down');
  const [snake, setSnake] = useState([
    { x: Math.floor(rows / 2), y: Math.floor(columns / 2) },
  ]);
  const [food, setFood] = useState(createRandomCoordinates());
  const [gameOver, setGameOver] = useState(true);
  const [points, setPoints] = useState(0);
  const [buttonText, setButtonText] = useState('Play');
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const [directionIsSet, setDirectionIsSet] = useState(false);

  // logic to render grid
  const createGrid = () => {
    // define each part of the snake with class compositions
    for (const [i, v] of snake.entries()) {
      // head
      if (i === 0) {
        switch (direction) {
          case 'up':
            v.class = 'grid-item snake head up';
            break;
          case 'down':
            v.class = 'grid-item snake head down';
            break;
          case 'left':
            v.class = 'grid-item snake head left';
            break;
          case 'right':
            v.class = 'grid-item snake head right';
            break;
          default:
            break;
        }
        // tail
      } else if (i === snake.length - 1) {
        const tail = snake[snake.length - 1];
        const beforeTail = snake[snake.length - 2];
        if (tail.x === beforeTail.x && tail.y === beforeTail.y + 1) {
          v.class = 'grid-item snake tail left';
        } else if (tail.x === beforeTail.x && tail.y === beforeTail.y - 1) {
          v.class = 'grid-item snake tail right';
        } else if (tail.x === beforeTail.x + 1 && tail.y === beforeTail.y) {
          v.class = 'grid-item snake tail up';
        } else if (tail.x === beforeTail.x - 1 && tail.y === beforeTail.y) {
          v.class = 'grid-item snake tail down';
        }
        // body - corner
      } else {
        if (snake.length > 2) {
          const before = snake[i - 1];
          const after = snake[i + 1];
          if (
            (before.x === v.x + 1 &&
              before.y === v.y &&
              after.x === v.x &&
              after.y === v.y + 1) ||
            (before.x === v.x &&
              before.y === v.y + 1 &&
              after.x === v.x + 1 &&
              after.y === v.y)
          ) {
            v.class = 'grid-item snake body top-left';
          } else if (
            (before.x === v.x &&
              before.y === v.y + 1 &&
              after.x === v.x - 1 &&
              after.y === v.y) ||
            (before.x === v.x - 1 &&
              before.y === v.y &&
              after.x === v.x &&
              after.y === v.y + 1)
          ) {
            v.class = 'grid-item snake body bottom-left';
          } else if (
            (before.x === v.x - 1 &&
              before.y === v.y &&
              after.x === v.x &&
              after.y === v.y - 1) ||
            (before.x === v.x &&
              before.y === v.y - 1 &&
              after.x === v.x - 1 &&
              after.y === v.y)
          ) {
            v.class = 'grid-item snake body bottom-right';
          } else if (
            (before.x === v.x &&
              before.y === v.y - 1 &&
              after.x === v.x + 1 &&
              after.y === v.y) ||
            (before.x === v.x + 1 &&
              before.y === v.y &&
              after.x === v.x &&
              after.y === v.y - 1)
          ) {
            v.class = 'grid-item snake body top-right';
            // body - straight
          } else {
            v.class = 'grid-item snake body';
          }
        }
      }
    }

    const grid = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let isSnake = false;

        for (const part of snake) {
          if (part.x === i && part.y === j) {
            isSnake = true;
            grid.push(part);
          }
        }
        if (!isSnake) {
          if (food.x === i && food.y === j) {
            grid.push({ x: i, y: j, class: 'grid-item food' });
            isSnake = false;
          } else {
            grid.push({ x: i, y: j, class: 'grid-item' });
          }
        }
      }
    }
    return grid;
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
    setSnake([...snake, snake.slice(-1)]);
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

    // collisions with self
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
      if (points > highScore) setHighScore(points);
    }
  };

  const keyPress = (event) => {
    if (!directionIsSet) {
      setDirectionIsSet(true);
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
        default:
          break;
      }
    }
  };
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

  // effects
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
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default App;
