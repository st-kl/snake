import React, { useEffect, useState } from 'react';

const GameScreen = ({
  gameOver,
  setGameOver,
  points,
  setPoints,
  highScore,
  setHighScore,
  speed,
  setButtonText,
  direction,
  setDirection,
  food,
  setFood,
  snake,
  setSnake,
  rows,
  columns,
  createRandomCoordinates,
  grid,
  setGrid,
}) => {
  const [directionIsSet, setDirectionIsSet] = useState(false);

  const buildSnake = () => {
    for (const [i, v] of snake.entries()) {
      if (i === 0) {
        createHead(v);
      } else if (i === snake.length - 1) {
        createTail(v);
      } else {
        createBody(v, i);
      }
    }
  };

  const createHead = (v) => {
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
  };

  const createBody = (v, i) => {
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
    } else {
      v.class = 'grid-item snake body';
    }
  };

  const createTail = (v) => {
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
  };

  const createGrid = () => {
    

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

  useEffect(() => {
    document.onkeydown = keyPress;

    const runGame = setInterval(() => {
      moveSnake();
      setDirectionIsSet(false);
    }, speed);
    return () => clearInterval(runGame);
  });

  useEffect(() => {
    buildSnake();
    setGrid(createGrid());
    checkCollision();
    eatFood();
    // eslint-disable-next-line
  }, [snake, food]);

  return (
    <div>
      <div className='grid'>
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
