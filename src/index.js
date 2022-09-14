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
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // 왜 slice() 함수를 쓰는 건가? 안써도 오류는 없는데. -> 사본을 만들어 불변성을 
    squares[i] = 'X';
    this.setState({squares: squares});
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
    const status = 'Next player: X';

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

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
