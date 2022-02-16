import React from 'react';
import ReactDOM from 'react-dom';
import './index.js';

function Square(props) {
  return (
        <button className="square" 
        onClick={props.onClick}
        >
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
   
    renderSquare(i) {
      return ( 
      <Square
        value={this.props.squares[i]}
        onClick={()=> this.props.onClick(i)} 
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
          prevmove: -1,
          xIsNext: true,
        };
      }
      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const prevmove = this.state.prevmove;
        if (calculateWinner(squares) ) { 
          return;
        }

        if(this.state.stepNumber >=6 ){ //+ !this.state.xIsNext ) {  whenever just did 6th move or more or when O is next, this.state.xisnext = false, + !this.state.xIsNext
    

          if(!squares[prevmove]) { // when u pick a square to move and then move it to another place 

            if(prevmove === i) {
              squares[i] = this.state.xIsNext ? 'X': 'O';
              this.setState({
                history: history.concat([{squares:squares,}]),
                stepNumber: history.length,
                prevmove: i,
                xIsNext: this.state.xIsNext,
              });
              return;
            }

            if (!isadjacent(i,prevmove) || squares[i])
              return;

            if (squares[4] === (this.state.xIsNext ? 'X' : 'O')) {
              squares[i]= this.state.xIsNext ? 'X' : 'O';
              console.log(squares[i])
              if(!calculateWinner(squares)) {
                console.log("didnt win wit center")
                squares[i]=null;
                return;
              }
          }
          
          squares[i] = this.state.xIsNext ? 'X' : 'O';
          this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          prevmove:i,
          xIsNext: !this.state.xIsNext,
        });
        }
        else {
        
          if (!squares[i])
            return;
          if (squares[i] !== (this.state.xIsNext? 'X' : 'O'))
            return;
          squares[i] = null;
          this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          prevmove: i,
          xIsNext: this.state.xIsNext,
        });
      }
    }
    else {
      if(squares[i])
        return;
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      prevmove: i,
      xIsNext: !this.state.xIsNext,
    });
    }
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
        
        
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key = {move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          }); 
        
        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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
        return squares[a];
      }
    }
    return null;
  }

 function isadjacent(i,maybe) {
   if (i===0)
    return maybe === 1 || maybe === 3 || maybe === 4;
   else if (i===1)
    return maybe === 0 || maybe=== 2 || maybe === 4 || maybe === 3 || maybe === 5;
   else if (i===2)
    return maybe === 1 || maybe === 4 || maybe === 5;
   else if (i===3)
    return maybe === 0 || maybe=== 1 || maybe === 4 || maybe === 6 || maybe === 7;
   else if (i===4)
    return true;
   else if (i===5)
    return maybe === 1 || maybe=== 2 || maybe === 4 || maybe === 7 || maybe === 8;
   else if (i===6)
    return maybe === 3 || maybe === 4 || maybe === 7;
   else if (i===7)
    return maybe === 3 || maybe=== 4 || maybe === 5 || maybe === 6 || maybe === 8;
   else if (i===8)
    return maybe === 4 || maybe === 5 || maybe === 7;

   
 }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  