import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Field from './components/Field';
import BoardModel from './model/BoardModel';
import { MINE_ID } from './constants/gameConstants';
import './App.css';

const GAME_PARAMS = {
  rows: 5,
  columns: 6,
  mines: 4,
};

const DELAY_ALERT = 10;

function App() {
  const [board, setBoard] = useState(null);
  const [lose, setLose] = useState(false);
  const [points, setPoints] = useState(0);
  const [flipped, setFlipped] = useState([]);

  function handleNewBoard() {
    const mineBoard = new BoardModel(GAME_PARAMS);
    setBoard(mineBoard.generateBoard());
    setLose(false);
    setPoints(0);
    setFlipped([]);
  }

  useEffect(() => {
    handleNewBoard();
  }, []);

  const handleClickField = useCallback(
    (fieldValue, cellId) => {
      setFlipped((prevItems) => {
        return [...prevItems, cellId];
      });

      if (fieldValue === MINE_ID) {
        setTimeout(() => {
          alert(`Mina ativada você obteve: ${points} pontos`);
        }, DELAY_ALERT);

        setLose(true);
        return;
      }

      const sumPoints = parseInt(Number(points) + Number(fieldValue));

      setPoints(sumPoints);
    },
    [points]
  );

  const gameBoard = useMemo(() => {
    if (board && board.length > 0) {
      return board.map((boardRow, y) => {
        return (
          <div key={`row-${y}`} className="board-row">
            {boardRow.map((value, x) => (
              <Field
                key={`row-${x}`}
                id={`row-${y}-${x}`}
                value={value}
                onClick={!lose ? handleClickField : null}
                flipped={flipped}
              />
            ))}
          </div>
        );
      });
    }

    return null;
  }, [board, handleClickField, flipped, lose]);

  return (
    <div className="App">
      <div className="board-container">{gameBoard}</div>
      <div className="actions">
        <button type="button" onClick={handleNewBoard}>
          Novo jogo
        </button>
      </div>
    </div>
  );
}

export default App;
