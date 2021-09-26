import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const rows = 15;
  const columns = 21;

  const [grid, setGrid] = useState([]);
  const [direction, setDirection] = useState('left');
  const [snake, setSnake] = useState([{ row: 3, col: 7 }]);
  const [food, setFood] = useState({ row: 3, col: 2 });

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

          if (food.row === i && food.col === j) {
            grid.push({ row: i, col: j, class: 'grid-item food' });
          } else if (isSnake) {
            grid.push({ row: i, col: j, class: 'grid-item snake' });
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
          newSnake.pop();
          return newSnake;
        });
        break;
      case 'down':
        setSnake((currSnake) => {
          const newSnake = currSnake.map((part) => {
            return { ...part };
          });

          newSnake.unshift({ row: newSnake[0].row + 1, col: newSnake[0].col });
          newSnake.pop();
          return newSnake;
        });
        break;
      case 'left':
        setSnake((currSnake) => {
          const newSnake = currSnake.map((part) => {
            return { ...part };
          });

          newSnake.unshift({ row: newSnake[0].row, col: newSnake[0].col - 1 });
          newSnake.pop();
          return newSnake;
        });
        break;
      case 'right':
        setSnake((currSnake) => {
          const newSnake = currSnake.map((part) => {
            return { ...part };
          });

          newSnake.unshift({ row: newSnake[0].row, col: newSnake[0].col + 1 });
          newSnake.pop();
          return newSnake;
        });
        break;
    }
  };

  useEffect(() => {
    updateGrid();
  }, [snake]);

  /*   document.addEventListener('keydown', (key) => {
    switch (key.keyCode) {
      case 37:
        setDirection('left');
        break;
      case 38:
        setDirection('up');
        break;
      case 39:
        setDirection('right');
        break;
      case 40:
        setDirection('down');
        break;
    }
  }); */

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
          <p>Points</p>
          <button
            onClick={() => {
              moveSnake();
              if (snake[0].row === food.row && snake[0].col === food.col) {
                setSnake((currSnake) => {
                  const newSnake = currSnake.map((part) => {
                    return { ...part };
                  });

                  newSnake.push({ row: food.row, col: food.col });
                  return newSnake;
                });
                /*                 setFood((currFood) => {
                  let isFree = false;

                  while (isFree) {
                    const row = Math.floor(Math.random * rows);
                    const col = Math.floor(Math.random * columns);

                    if (
                      !snake.filter(
                        (part) => part.row === row && part.col === col
                      ).length
                    ) {
                      isFree = false;
                      return { row: row, col: col };
                    }
                  }
                }); */
              }
            }}
          >
            Start Game
          </button>
          <button onClick={() => setDirection('up')}>UP</button>
          <button onClick={() => setDirection('down')}>DOWN</button>
          <button onClick={() => setDirection('left')}>LEFT</button>
          <button onClick={() => setDirection('right')}>RIGHT</button>
        </div>
      </div>
    </div>
  );
}

export default App;
