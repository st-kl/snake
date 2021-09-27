import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const rows = 15;
  const columns = 21;
  let tail;

  const [grid, setGrid] = useState([]);
  const [direction, setDirection] = useState('down');
  const [snake, setSnake] = useState([{ row: 4, col: 11 }]);
  const [food, setFood] = useState({ row: 5, col: 11 });
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(0);
  console.log(direction);

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
    switch (direction) {
      case 'up':
        setSnake((currSnake) => {
          const newSnake = currSnake.map((part) => {
            return { ...part };
          });

          newSnake.unshift({ row: newSnake[0].row - 1, col: newSnake[0].col });
          tail = newSnake.pop();
          return newSnake;
        });
        break;
      case 'down':
        setSnake((currSnake) => {
          const newSnake = currSnake.map((part) => {
            return { ...part };
          });

          newSnake.unshift({ row: newSnake[0].row + 1, col: newSnake[0].col });
          tail = newSnake.pop();
          return newSnake;
        });
        break;
      case 'left':
        setSnake((currSnake) => {
          const newSnake = currSnake.map((part) => {
            return { ...part };
          });

          newSnake.unshift({ row: newSnake[0].row, col: newSnake[0].col - 1 });
          tail = newSnake.pop();
          return newSnake;
        });
        break;
      case 'right':
        setSnake((currSnake) => {
          const newSnake = currSnake.map((part) => {
            return { ...part };
          });

          newSnake.unshift({ row: newSnake[0].row, col: newSnake[0].col + 1 });
          tail = newSnake.pop();
          return newSnake;
        });
        break;
    }
  };

  const evaluateSnake = () => {
    if (
      snake[0].col === columns ||
      snake[0].col === 0 ||
      snake[0].row === rows ||
      snake[0].row === 0
    ) {
      setGameOver(true);
    }
    if (snake[0].row === food.row && snake[0].col === food.col) {
      setSnake((currSnake) => {
        const newSnake = currSnake.map((part) => {
          return { ...part };
        });

        newSnake.push(tail);
        return newSnake;
      });
      setFood(() => {
        let isFree = false;

        while (!isFree) {
          const row = Math.floor(Math.random() * rows);
          const col = Math.floor(Math.random() * columns);

          if (
            !snake.filter((part) => part.row === row && part.col === col).length
          ) {
            isFree = true;
            return { row: row, col: col };
          }
        }
      });
      setPoints(points + 1);
    }
  };

  useEffect(() => {
    updateGrid();
  }, [snake]);

  useEffect(() => {
    const [body] = document.getElementsByTagName('body');
    body.onkeydown = ({ key }) => {
      switch (key) {
        case 'ArrowUp':
          setDirection(() => {
            if (direction !== 'up') {
              return 'down';
            } else {
              return 'up';
            }
          });
        case 'ArrowDown':
          setDirection(() => {
            if (direction !== 'down') {
              return 'up';
            } else {
              return 'down';
            }
          });
        case 'ArrowLeft':
          setDirection(() => {
            if (direction !== 'right') {
              return 'left';
            } else {
              return 'right';
            }
          });
        case 'ArrowRight':
          setDirection(() => {
            if (direction !== 'left') {
              return 'right';
            } else {
              return 'left';
            }
          });
      }
    };
  }, []);

  return (
    <div className='App'>
      <div
        className='content'
        style={{ visibility: gameOver ? 'hidden' : 'visible' }}
      >
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
              moveSnake();
              evaluateSnake();
            }}
          >
            Start Game
          </button>
        </div>
      </div>
      <div
        className='gameOverWrapper'
        style={{ visibility: gameOver ? 'visible' : 'hidden' }}
      >
        <p>GAME OVER</p>
        <button
          onClick={() => {
            setGameOver(false);
            setSnake([{ row: 4, col: 11 }]);
            setFood({ row: 5, col: 11 });
            setPoints(0);
            updateGrid();
            setDirection('down');
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default App;
