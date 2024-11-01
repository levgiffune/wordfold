import {Board} from './model'

export function redraw(ctx: any, board: Board){
    let canvas = ctx.getContext("2d");

    if(canvas){
        canvas.clearRect(0, 0, ctx.width, ctx.height);
        canvas.fillStyle = "yellow";
        let sel = board.getSelected();

        if(sel){
            canvas.fillRect(sel.getColumn()*(ctx.width/5), sel.getRow()*(ctx.height/5), ctx.width/5, ctx.height/5);
        }

        for (let s of board.get()){

            canvas.font =  "10px Arial";
            canvas.fillStyle = "black";

            canvas.fillText(s.get(), s.getColumn()*(ctx.width/5)+(ctx.width/10)-(3*s.size()), s.getRow()*(ctx.height/5)+(ctx.height/10)+5)
            canvas.strokeRect(s.getColumn()*(ctx.width/5), s.getRow()*(ctx.height/5), ctx.width/5, ctx.height/5)
        }
        return true;
    }
    return false;
}