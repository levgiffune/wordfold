const SIZE = 500;

//one square on a board
export class Square{
    letters: string;
    row: number;
    column: number;
    
    constructor(column: number, row: number, letters: string){
        this.letters = letters;
        this.row = row;
        this.column = column;
    }

    //do we contain these coordinates? 
    contains(x: number, y: number){
        if(x >= this.column*SIZE/5 &&
             y >= this.row*SIZE/5 &&
             x < (this.column + 1)*SIZE/5 &&
             y < (this.row + 1)*SIZE/5){
                return true;
        }
        return false;
    }
}
  
export class Board{
    squares: Array<Square>;
    selected: Square | null;
    win: boolean;

    constructor(data: Array<string>){
        let i = 0;
        let j = 0;
        this.squares = [];

        //populate from config
        for(const n of data){
            for(const s of n){
                this.squares.push(new Square(i, j, s));
                i++;
                if(i > 4){i = 0; j++}
            }
            
        }
        this.selected = null;
        this.win = false;
    }

    //main logic engine of the game
    fold(move: Move){
        //are we allowed to fold?
        if(this.selected  && !this.win){
            //if so find the intended target
            const targetIdx = (5 * this.selected.row) + this.selected.column + move.column + (5 * move.row);
            //are we moving to a real square?
            if(targetIdx >= 0 && targetIdx < this.squares.length){
                //if so get it
                const target = this.squares[targetIdx];
                //is our move legal  (as per assignment spec)
                if(target.letters != "" && 
                    target.letters.length + this.selected.letters.length <= 6 &&
                    Math.abs(target.column - this.selected.column) != 4){
                    //if so, fold
                    target.letters = this.selected.letters + target.letters;
                    this.selected.letters = "";
                    //to allow move chaining we move selection as well
                    this.selected = target;
                    return true;
                }
            }
        }
        //something was illegal, fail quietly
        return false;
    }
}

//helper class
export class Move{
    row: number;
    column: number;
  
    constructor(){
      this.row = 0;
      this.column = 0;
    }
    
    //parse direction in the vertical and horizontal from WASD or arrows
    parseKey(code: string){
      switch(code){
        case "ArrowUp":
        case "KeyW":
            this.row = -1;
            this.column = 0;
            return this;
        case "ArrowLeft":
        case "KeyA":
            this.row = 0;
            this.column = -1;
            return this;
        case "ArrowDown":
        case "KeyS":
            this.row = 1;
            this.column = 0;
            return this;
        case "ArrowRight":
        case "KeyD":
            this.row = 0;
            this.column = 1;
            return this;
        default:
            return null;
      }
    }
  }


export class Model{
    board: Board;
    moves: number;
    score: number;
    config: string;
    

    constructor(config: string){
        this.config = config;
        this.board = new Board(JSON.parse(config).initial);
        this.score = 0;
        this.moves = 0;
    }

    //win checker
    checker(){
        const solutions = JSON.parse(this.config).words;
        let win = true;
        let numSq = 0;
        //iterate squares to find soln words
        for(const s of this.board.squares){
            //how many squares are filled?
            if(s.letters != ""){
                numSq++;
                //since there are 5 solns, any wrong answer in 5 squares ensures failure
                if(solutions.indexOf(s.letters) < 0){
                    win = false;
                }
            }
        }

        //make sure only 5 squares are filled
        if(numSq == 5){
            //tell the board we won so player can't move anymore
            this.board.win = true;
            return  win ? "Congratulations!" : "Try again!";
        }
        return "";
    }

    //calculate score as per assignment spec
    calcScore(){
        const solutions = JSON.parse(this.config).words;
        let score = 0;

        //iterate squares and find fragments of solutions
        for(const s of this.board.squares){
            if(s.letters.length > 1){
                for(const sol of solutions){
                    if(sol.includes(s.letters)){
                        score += s.letters.length;
                    }
                }
            }
        }

        //update
        this.score = score;
        return this.score;
    }
}