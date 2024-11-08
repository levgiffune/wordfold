'use client'
import React from 'react';
import {Model, Move} from '../model';
import {redraw} from '../boundary'
import { select } from '../controller';

//configurations
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

export default function Home() {
  //state variables
  const [score, setScore] = React.useState(0);
  const [moves, setMoves] = React.useState(0);
  const [win, setWin] = React.useState("");
  const [conf, setConf] = React.useState(config1);
  const [model, setModel] = React.useState(new Model(JSON.stringify(conf)));
  const canvasRef = React.useRef(null);

  //controller for move use case
  const handleKey = (e: KeyboardEvent) => {
    const direction = new Move();
    
    //make sure we got a valid key
    if(direction.parseKey(e.code)){
      //make sure the move is valid
      if(model.board.fold(direction)){
        //increment moves, update score, refresh display
        setMoves(moves + 1);
        setScore(model.calcScore());
        redraw(canvasRef.current, model.board);
        return true;
      }
    }

    //we did not make a move
    return false;
  }

  //controller for reset use case
  const reset = () => {
    setModel(new Model(JSON.stringify(conf))); 
    setMoves(0); 
    setScore(0); 
    setWin("");
  }

  //bind move controller
  React.useEffect(() => {
    document.addEventListener("keydown", handleKey);
    //cleanup
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  });
  
  //bind refresh to model
  React.useEffect(() => {
    redraw(canvasRef.current, model.board);
  }, [model])

  //bind reset and refresh to config (i.e. changing conf resets score and moves)
  React.useEffect(() => {
    redraw(canvasRef.current, model.board);
    reset();
  }, [conf]);

  return (
    <body>
      <h1>Score: {score}</h1>
      <h1>Moves: {moves}</h1>
      <p>Click a square to select it. Use the arrow keys or WASD to move a square. 
        Try to make 5 words matching the theme. When you think you have solved the puzzle, check your solution.</p>
      <h1 className={win == "Congratulations!" ? "green" : "red"}>{win}</h1>
      <div className="line">
        <label id="buttons">
            <button data-testid="reset" onClick={() => {reset()}}>reset</button>
            <button data-testid="check" onClick={() => {
              setWin(model.checker());
            }}>check solution</button>
        </label>
        <label data-testid="dropdown" id="dropdown">
              Choose a puzzle theme
              <select
                value={conf.name.substring(1)}
                onChange={(e) => {
                  switch (e.target.value){
                    case "1":
                      setConf(config1);
                      break;
                    case "2":
                      setConf(config2);
                      break;
                    case "3":
                    setConf(config3);
                    break;
                  }
                }}
              >
                <option value="1">{config1.theme}</option>
                <option value="2">{config2.theme}</option>
                <option value="3">{config3.theme}</option>
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
