'use client'
import React from 'react';
import {Model, Board, Move} from '../model';
import {redraw} from '../boundary'

const config1 = {
  "name": "#1",
  "words" : [ "CYAN", "YELLOW", "PURPLE", "MAUVE", "BLUE" ],
  "theme" : "Colors",
  "initial": [ ['E', 'L', 'W', 'Y', 'C'],
               ['Y', 'L', 'O', 'A', 'N'],
               ['U', 'B', 'L', 'E', 'E'],
               ['E', 'L', 'P', 'M', 'V'],
               ['P', 'U', 'R', 'A', 'U']
             ]
}
  
const config2 = {
  "name": "#2",
  "words" : [ "TAPIR", "EAGLE", "JAGUAR", "SNAKE", "WOLF"],
  "theme" : "Animals",
  "initial": [ ['E', 'K', 'O', 'A', 'P'],
               ['A', 'W', 'L', 'I', 'R'],
               ['N', 'S', 'F', 'A', 'T'],
               ['L', 'E', 'E', 'R', 'A'],
               ['A', 'G', 'G', 'U', 'J']
             ]
}

const config3 = {
  "name": "#3",
  "words" : [ "CHERRY", "PAPAYA", "BANANA", "PEAR", "FIG" ],
  "theme" : "Fruits",
  "initial": [ ['H', 'C', 'N', 'A', 'N'],
               ['Y', 'R', 'A', 'A', 'A'],
               ['R', 'E', 'A', 'Y', 'B'],
               ['F', 'P', 'P', 'E', 'R'],
               ['I', 'G', 'A', 'P', 'A']
             ]
}

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
      <h1>Score: {score}</h1>
      <h1>Moves: {moves}</h1>
      <h1 className={win == "Congratulations!" ? "green" : "red"}>{win}</h1>
      <p>Click a square to select it. Use the arrow keys or WASD to move a square.</p>
      <div className="line">
        <label id="buttons">
            <button data-testid="reset" onClick={(e) => {reset()}}>reset</button>
            <button data-testid="check" onClick={(e) => {
              setWin(model.checker());
            }}>check solution</button>
        </label>
        <label data-testid="dropdown" id="dropdown">
              Choose a puzzle theme
              <select
                value={conf.name.substring(1)}
                onChange={(e) => {setConf(eval("config" + e.target.value))}}
              >
                <option value={1}>{config1.theme}</option>
                <option value={2}>{config2.theme}</option>
                <option value={3}>{config3.theme}</option>
              </select>
        </label>
      </div>
      <canvas data-testid="canvas" id="canvas" ref={canvasRef} onClick={(e) =>{
        model.board.selected = select(e.clientX, e.clientY, model.board, canvasRef.current);
        redraw(canvasRef.current, model.board);
      }}/>
    </body>
  );
}
