'use client'
import React from 'react';
import {Model, Board, Move} from '../model';
import {drawPuzzle} from '../boundary';
import {config1} from '../configs'

export function select(x: number, y: number, board: Board, ctx: any){
  let rect = ctx.getBoundingClientRect();

  let truex = x-rect.left;
  let truey = y-rect.top;

  for(let s of board.squares){
    if(s.contains(truex, truey, board)){
      return s;
    }
  }
  
  return null;
}

function redraw(ctx: any, board: Board){
  const canvas = ctx.getContext('2d');

  if (canvas){
    canvas.clearRect(0, 0, ctx.width, ctx.height);
    drawPuzzle(ctx, board);
  }
}

export default function Home() {
  const [score, setScore] = React.useState(0);
  const [moves, setMoves] = React.useState(0);
  const [model, setModel] = React.useState(new Model(JSON.stringify(config1)));
  const [win, setWin] = React.useState("");



  const canvasRef = React.useRef(null);

  const handleKey = (e: any) => {
    let direction = new Move();
    
    if(direction.parseKey(e.code)){
      if(model.board.fold(direction)){
        setMoves(moves + 1);
        setScore(model.calcScore());
        redraw(canvasRef.current, model.board);
      }
    }
    
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleKey);
    // clean up
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  });
  
  React.useEffect(() => {
    redraw(canvasRef.current, model.board);
  }, [model])

  return (
    <body>
      <h1>Score: <span className="score">{score}</span></h1>
      <h1>Moves: <span className="moves">{moves}</span></h1>
      <span id="buttons">
          <button id="reset" onClick={(e) => {setModel(new Model(JSON.stringify(config1))); setMoves(0); setScore(0); setWin("")}}>reset</button>
          <button id="check" onClick={(e) => {
            model.checker(); 
            setWin(model.win ? "Congratulations!" : "")
          }}>check solution</button>
          {win}
        </span>
      <canvas ref={canvasRef} onClick={(e) =>{
        model.board.selected = select(e.clientX, e.clientY, model.board, canvasRef.current);
        redraw(canvasRef.current, model.board);
      }}/>
    </body>
  );
}
