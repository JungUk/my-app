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

  // 생성자를 써서 변수를 만들어야 되는 이유는 뭐지?
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // 왜 slice() 함수를 쓰는 건가? 안써도 오류는 없는데. -> 사본을 만들어 불변성을 
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}   // 초기값이 null로 채워진 squares 배열 
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner) {
      status = 'Winner : ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
