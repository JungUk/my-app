import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';



function Square(props) {
  return (
    <button 
        className="square"  // 이 버튼의 이름은 square 다.
        onClick={props.onClick}  // 버튼이 클릭되면 부모 컴포넌트에서 넘어온 프로퍼티 onClick() 을 동작한다
      >
        {props.value}
      </button> // 부모 컴포넌트에서 넘어온 value 프로퍼티
  )
}


class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}   // 초기값이 null로 채워진 squares 배열 
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
     // 왜 slice() 함수를 쓰는 건가? 안써도 오류는 없는데. -> 사본을 만들어 불변성을 
    
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // ???
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to move start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if(winner) {
      status = 'Winner : ' + winner;
    } else {
      status = 'Next player : ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    // 배열 하나마다 승리 조건
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // 여기까지는 보기 편하게 주석으로 끊었음
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4 ,6],
  ];

  for(let i = 0; i < lines.length; i++) {
    const[a, b, c] = lines[i];
    // const a = lines[i, 0];
    // const b = lines[i, 1];
    // const c = lines[i, 2];

    // 밑에 squares[a] === squares[b] && squares[a] === squares[c] 로 하면 
    // 승리했다고 몇턴 지나서 뜨는데 왜 그런거지?
    // a=b 이고 a=c 이면 b=c 다
    // 역으로 b=c이면 b=a 이고 a=c 이어야 하는건데
    // b=c라고 해서 b=a 가 맞는지는 알 수 없다
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
