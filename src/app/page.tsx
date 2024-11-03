'use client'
import React from 'react';
import {Model, Board, Move} from '../model';
import {redraw} from '../boundary'
import {config1, config2, config3} from '../config'


export function select(x: number, y: number, board: Board, ctx: any){
  let rect = ctx.getBoundingClientRect();

  let truex = x-rect.left;
  let truey = y-rect.top;

  for(let s of board.squares){
    if(s.contains(truex, truey)){
      return s;
    }
  }
  
  return null;
}

export default function Home() {
  const [score, setScore] = React.useState(0);
  const [moves, setMoves] = React.useState(0);
  const [win, setWin] = React.useState("");
  const [conf, setConf] = React.useState(config1);
  const [model, setModel] = React.useState(new Model(JSON.stringify(conf)));

  const canvasRef = React.useRef(null);

  const handleKey = (e: any) => {
    let direction = new Move();
    
    if(direction.parseKey(e.code)){
      if(model.board.fold(direction)){
        setMoves(moves + 1);
        setScore(model.calcScore());
        redraw(canvasRef.current, model.board);
        return true;
      }
    }
    return false;
  }

  const reset = () => {
    setModel(new Model(JSON.stringify(conf))); 
    setMoves(0); 
    setScore(0); 
    setWin("");
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
  }, [model, conf])

  React.useEffect(() => {
    redraw(canvasRef.current, model.board);
    reset();
  }, [conf]);

  return (
    <body>
      <h1>Score: <span className="score">{score}</span></h1>
      <h1>Moves: <span className="moves">{moves}</span></h1>
      <label id="buttons">
          <button id="reset" onClick={(e) => {reset()}}>reset</button>
          <button id="check" onClick={(e) => {
            setWin(model.checker());
          }}>check solution</button>
          <span id="message" className={win == "Congratulations!" ? "green" : "red"}>{win}</span>
      </label>
      <label id="dropdown">
            Choose a puzzle theme
            <select
              value={conf.name.substring(1)}
              onChange={(e) => {setConf(eval("config" + e.target.value))}}
            >
              <option value="1">{config1.theme}</option>
              <option value="2">{config2.theme}</option>
              <option value="3">{config3.theme}</option>
            </select>
      </label>
      <canvas id="canvas" ref={canvasRef} onClick={(e) =>{
        model.board.selected = select(e.clientX, e.clientY, model.board, canvasRef.current);
        redraw(canvasRef.current, model.board);
      }}/>
    </body>
  );
}
