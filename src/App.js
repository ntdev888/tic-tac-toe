
import './App.css';
import { useState } from 'react';



function Square({ value, onSquareClick }) {
  return (
  <button className="square" onClick={onSquareClick}>{value}</button>
  )
}
 


function Board({ msg, win }) {
  const [ xIsNext, setXIsNext ] = useState(true)
  const [ squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    win(nextSquares, xIsNext);
    setXIsNext(!xIsNext);
    msg(nextSquares);
  };

  return (
  <>
  <div>
  <div className="board-row">
    <Square value={squares[0]} onSquareClick={() => handleClick(0)} id="1"/>
    <Square value={squares[1]} onSquareClick={() => handleClick(1)} id="2"/>
    <Square value={squares[2]} onSquareClick={() => handleClick(2)} id="3"/>
    </div>
    <div className="board-row">
    <Square value={squares[3]} onSquareClick={() => handleClick(3)} id="3"/>
    <Square value={squares[4]} onSquareClick={() => handleClick(4)} id="4"/>
    <Square value={squares[5]} onSquareClick={() => handleClick(5)} id="5"/>
    </div>
    <div className="board-row">
    <Square value={squares[6]} onSquareClick={() => handleClick(6)} id="6"/>
    <Square value={squares[7]} onSquareClick={() => handleClick(7)} id="7"/>
    <Square value={squares[8]} onSquareClick={() => handleClick(8)} id="8"/>
    </div>
    </div>
    </>
  )
}



function App() {
  const [ winner, setWinner ] = useState(null);

  function isWinner(value, current) {
    const winConditions = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6]
    ];
    
    if (current == true) {
    const newArray = value.map((element, index) => {
      if (element === 'X') {
        return index;
      }
    }).filter(index => index !== undefined);
    
    const isWin = winConditions.some(condition =>
      condition.every(index => newArray.includes(index))
    );
    
    if (isWin) {
    console.log('X'); // Output: X
    setWinner('X');
    };
    }

    if (current == false) {
      const newArray = value.map((element, index) => {
        if (element === 'O') {
          return index;
        }
      }).filter(index => index !== undefined);
      
      const isWin = winConditions.some(condition =>
        condition.every(index => newArray.includes(index))
      );
      
      if (isWin) {
      console.log('O'); // Output: O
      setWinner('O');
      }
      }
  };


  function deepMessage(input) {
    return console.log('square are ' + JSON.stringify(input));
  };

  return (
    <>
    <div className="container">
    <div className="tictactoeapp">    
    <span className="title">Nics Tic-Tac-Toe App</span>
    <div className="app"><Board win={(value, current) => isWinner(value, current)} msg={(input) => deepMessage(input)}/></div>
    <div className="title">Win Condition: {winner} </div>
    </div>
    </div>
  </>
  );
}

export default App;
