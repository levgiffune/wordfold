const SIZE = 500;

export class Square{
    letters: string;
    row: number;
    column: number;
    
    constructor(column: number, row: number, letters: string){
        this.letters = letters;
        this.row = row;
        this.column = column;
    }

    contains(x: number, y: number, board: Board){
        if(x >= this.column*board.size/5 &&
             y >= this.row*board.size/5 &&
             x < (this.column + 1)*board.size/5 &&
             y < (this.row + 1)*board.size/5){
                return true;
        }

        return false;
    }
}
  
export class Board{
    squares: Array<Square>;
    size: number;
    selected: Square | null;
    win: boolean;

    constructor(data: Array<string>){
        let i = 0;
        let j = 0;
        this.squares = [];

        for(let n of data){
            for(let s of n){
                this.squares.push(new Square(i, j, s));
                i++;
                if(i > 4){i = 0; j++}
            }
            
        }
        this.size = SIZE;
        this.selected = null;
        this.win = false;
    }

    fold(move: Move){
        if(this.selected  && !this.win){
            let targetIdx = (5 * this.selected.row) + this.selected.column + move.column + (5 * move.row);
            if(targetIdx >= 0 && targetIdx < this.squares.length){
                let target = this.squares[targetIdx];
                if(target.letters != "" && target.letters.length + this.selected.letters.length <= 6){
                    target.letters = this.selected.letters + target.letters;
                    this.selected.letters = "";
                    this.selected = target;
                    return true;
                }
            }
        }
        return false;
    }
}

export class Move{
    row: number;
    column: number;
  
    constructor(){
      this.row = 0;
      this.column = 0;
    }
  
    parseKey(code: String){
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

    checker(){
        let solutions = JSON.parse(this.config).words;
        let win = true;
        let numSq = 0;
        for(let s of this.board.squares){
            if(s.letters != ""){
                numSq++;
                if(solutions.indexOf(s.letters) < 0){
                    win = false;
                }
            }
            
        }

        if(numSq == 5){
            this.board.win = true;
            return  win ? "Congratulations!" : "Try again!";
        }

        return "";
        
    }

    calcScore(){
        let solutions = JSON.parse(this.config).words;
        let score = 0;

        for(let s of this.board.squares){
            if(s.letters.length > 1){
                for(let sol of solutions){
                    if(sol.includes(s.letters)){
                        score += s.letters.length;
                    }
                }
            }
            
        }

        this.score = score;
        return this.score;
    }
}