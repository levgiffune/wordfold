import { Board } from "./model";

//draw a board given its model representation
export function redraw(ctx: HTMLCanvasElement | null, board: Board){
    //may be null when first rendering
    if(ctx){
        //the canvas
        const canvas = ctx.getContext("2d");
        if (canvas){
            //clear canvas
            canvas.clearRect(0, 0, ctx.width, ctx.height);
            canvas.fillStyle = "yellow";
            
            //selected square highlighted
            if(board.selected){
                canvas.fillRect(board.selected.column*(ctx.width/5), board.selected.row*(ctx.height/5), ctx.width/5, ctx.height/5);
            }
            
            //outline and fill squares
            for (const s of board.squares){
                canvas.font =  "10px Arial";
                canvas.fillStyle = "black";
    
                canvas.fillText(s.letters, s.column*(ctx.width/5)+(ctx.width/10)-(3*s.letters.length), s.row*(ctx.height/5)+(ctx.height/10)+5)
                canvas.strokeRect(s.column*(ctx.width/5), s.row*(ctx.height/5), ctx.width/5, ctx.height/5)
            }
            return true;
        }
    }
    //there was no canvas
    return false;
  }