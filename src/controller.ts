import { Board } from "./model";

//Controller for select square use case
export function select(x: number, y: number, board: Board, ctx: HTMLCanvasElement | null){
  if(ctx){
    //find x/y within relative to the canvas
    const rect = ctx.getBoundingClientRect();
    const truex = x-rect.left;
    const truey = y-rect.top;
  
    //find out what square we clicked
    for(const s of board.squares){
      if(s.contains(truex, truey) && s.letters != ""){
        return s;
      }
    }
  }
  return board.selected;
}