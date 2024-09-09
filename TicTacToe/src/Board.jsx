import { useState } from 'react';

function Square({ value, onSquareClick, highlight }) {
  return (
    <button 
      className={`square ${highlight ? 'highlight' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, winningLine }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner.player;
  } else if (!squares.includes(null)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const renderSquare = (i) => {
    return (
      <Square 
        value={squares[i]} 
        onSquareClick={() => handleClick(i)} 
        highlight={winningLine && winningLine.includes(i)}
      />
    );
  };

  const boardSize = 3;
  const boardRows = [];
  
  for (let row = 0; row < boardSize; row++) {
    const boardCols = [];
    for (let col = 0; col < boardSize; col++) {
      boardCols.push(renderSquare(row * boardSize + col));
    }
    boardRows.push(<div key={row} className="board-row">{boardCols}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const winnerInfo = calculateWinner(currentSquares);

  function handlePlay(nextSquares, moveIndex) {
    const nextHistory = history.slice(0, currentMove + 1);
    const row = Math.floor(moveIndex / 3);
    const col = moveIndex % 3;
    nextHistory.push({ squares: nextSquares, location: [row, col] });
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSort() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((step, move) => {
    const { location } = step;
    const desc = move 
      ? `Go to move #${move} (${location[0]}, ${location[1]})` 
      : 'Go to game start';
    return (
      <li key={move}>
        {move === currentMove ? (
          <span>You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{desc}</button>
        )}
      </li>
    );
  });

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay} 
          winningLine={winnerInfo ? winnerInfo.line : null}
        />
      </div>
      <div className="game-info">
        <button onClick={toggleSort}>
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: lines[i] };
    }
  }
  return null;
}

