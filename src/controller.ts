import { Board } from "./model";

//Controller for select square use case
export function select(x: number, y: number, board: Board, ctx: any){
    //find x/y within relative to the canvas
    let rect = ctx.getBoundingClientRect();
    let truex = x-rect.left;
    let truey = y-rect.top;
  
    //find out what square we clicked
    for(let s of board.squares){
      if(s.contains(truex, truey)){
        return s;
      }
    }
    
    //we will never hit this in practice since this only runs when the click is in bounds
    return null;
  }