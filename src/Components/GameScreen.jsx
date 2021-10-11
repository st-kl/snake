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
}) => {
  const rows = 15;
  const columns = 21;

  // calculate random x and y coordinates for the food item and
  // make sure it's not placed where the snake currently is
  const createRandomCoordinates = () => {

    while (true) {
      const x = Math.floor(Math.random() * rows);
      const y = Math.floor(Math.random() * columns);

      if (!snake.filter((part) => part.x === x && part.y === y).length) {
        return { x, y };
      }
    }
  };

  const [grid, setGrid] = useState([]);
  const [snake, setSnake] = useState([
    { x: Math.floor(rows / 2), y: Math.floor(columns / 2) },
  ]);
  const [food, setFood] = useState(createRandomCoordinates());
  const [directionIsSet, setDirectionIsSet] = useState(false);
  const [direction, setDirection] = useState('down');

  // assign a class to each part of the snake to define the shape for
  // the head, body (straight & corner) and tail
  const buildSnake = () => {
    for (const [i, v] of snake.entries()) {
      if (i === 0) {
        makeHead(v);
      } else {
        makeBody(v, i);
      }
    }
  };

  // define in which direction the head points based on
  // where the snake is heading
  const makeHead = (v) => {
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

  // define the shape of each body part of the snake
  // and differentiate between a straight and corner element
  // by analyzing the position of the element before and after
  const makeBody = (v, i) => {
    const before = snake[i - 1];
    const after = snake[i + 1];
    // top left corner
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
      // bottom left corner
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
      // bottom right corner
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
      // top right corner
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
      // straight body element
    } else {
      v.class = 'grid-item snake body';
    }
  };

  // create the actual grid by defining each cell as either
  // a snake, food or surrounding grit element
  const createGrid = () => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let isSnake = false;

        // check if cell is a snake element
        for (const part of snake) {
          if (part.x === i && part.y === j) {
            isSnake = true;
            grid.push(part);
          }
        }

        if (!isSnake) {
          // check if cell is a food element
          if (food.x === i && food.y === j) {
            grid.push({ x: i, y: j, class: 'grid-item food' });
            isSnake = false;
            // make cell a normal grid element
          } else {
            grid.push({ x: i, y: j, class: 'grid-item' });
          }
        }
      }
    }
    return grid;
  };

  // "move" the snake along the grid by moving the head one step in the current
  // direction and removing the tail
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

  // add one element to the end of the snake
  const growSnake = () => {
    setSnake([...snake, snake.slice(-1)]);
  };

  // check if the head and food occupy the same cell
  const eatsFood = () => {
    return snake[0].x === food.x && snake[0].y === food.y;
  };

  // check if the snake is leaving the grid or colliding with itself
  const isColliding = () => {
    let isSnake = false;

    // check if head occupies the same cell as a body element, i.e. if the snake
    // is running into itself
    for (const part of snake.slice(4)) {
      if (part.x === snake[0].x && part.y === snake[0].y) {
        isSnake = true;
      }
    }

    // check if snake leaves the grid boundaries
    return (
      snake[0].x === -1 ||
      snake[0].x === rows ||
      snake[0].y === -1 ||
      snake[0].y === columns ||
      isSnake
    );
  };

  // translate a key press into a change of direction, but prohibits a change
  // in the opposite direction
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

  // effect to periodically move the snake
  useEffect(() => {
    document.onkeydown = keyPress;

    const runGame = setInterval(() => {
      moveSnake();
      setDirectionIsSet(false);
    }, speed);
    return () => clearInterval(runGame);
  });

  // effect to run the game logic every time the snake moves
  useEffect(() => {
    // check game over condition and initiate reset if applicable
    if (isColliding()) {
      setGameOver(true);
      if (points > highScore) setHighScore(points);
      setButtonText('Play again');
      setSnake([
        {
          x: Math.floor(rows / 2),
          y: Math.floor(columns / 2),
        },
      ]);
      setPoints(0);
      setDirection('down');
      setFood(createRandomCoordinates());
      // check if snake eats food
    } else if (eatsFood()) {
      growSnake();
      setPoints(points + 1);
      setFood(createRandomCoordinates());
    }
    buildSnake();
    setGrid(createGrid());

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
