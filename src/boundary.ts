import {Board} from './model'

export function redraw(ctx: any, board: Board){
    let canvas = ctx.getContext("2d");

    if(canvas){
        canvas.clearRect(0, 0, ctx.width, ctx.height);
        canvas.fillStyle = "yellow";
        
        if(board.selected){
            canvas.fillRect(board.selected.column*(ctx.width/5), board.selected.row*(ctx.height/5), ctx.width/5, ctx.height/5);
        }

        for (let s of board.squares){

            canvas.font =  "10px Arial";
            canvas.fillStyle = "black";

            canvas.fillText(s.letters, s.column*(ctx.width/5)+(ctx.width/10)-(3*s.letters.length), s.row*(ctx.height/5)+(ctx.height/10)+5)
            canvas.strokeRect(s.column*(ctx.width/5), s.row*(ctx.height/5), ctx.width/5, ctx.height/5)
        }
        return true;
    }
    return false;
}