const SIZE = 500;

export class Square{
    private letters: string;
    private row: number;
    private column: number;
    
    constructor(column: number, row: number, letters: string){
        this.letters = letters;
        this.row = row;
        this.column = column;
    }

    contains(x: number, y: number, board: Board){
        if(x >= this.column*SIZE/5 &&
             y >= this.row*SIZE/5 &&
             x < (this.column + 1)*SIZE/5 &&
             y < (this.row + 1)*SIZE/5){
                return true;
        }

        return false;
    }

    size(){
        return this.letters.length;
    }

    set(s: string){
        this.letters = s;
    }

    get(){
        return this.letters;
    }

    getColumn(){
        return this.column;
    }

    getRow(){
        return this.row;
    }
}
  
export class Board{
    private squares: Array<Square>;
    private size: number;
    private selected: Square | null;
    private win: boolean;

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

    get(){
        return this.squares;
    }

    setWin(w: boolean){
        this.win = w;
    }

    getSelected(){
        return this.selected;
    }

    setSelected(s: Square|null){
        if(s){
            this.selected = s;
        }
        
    }

    fold(move: Move){
        if(this.selected  && !this.win){
            let targetIdx = (5 * this.selected.getRow()) + this.selected.getColumn() + move.getColumn() + (5 * move.getRow());
            if(targetIdx >= 0 && targetIdx < this.squares.length){
                let target = this.squares[targetIdx];
                if(target.get() != "" && target.size() + this.selected.size() <= 6 &&
                    !(this.selected.getColumn() == 4 && target.getColumn() == 0)){

                    target.set(this.selected.get() + target.get());
                    this.selected.set("");
                    this.selected = target;
                    return true;
                }
            }
        }
        return false;
    }
}

export class Move{
    private row: number;
    private column: number;
  
    constructor(){
      this.row = 0;
      this.column = 0;
    }
    
    getColumn(){
        return this.column;
    }

    getRow(){
        return this.row;
    }

    parseKey(code: String){
      switch(code){
        case "ArrowUp":
        case "KeyW":
          this.row = -1;
          this.column = 0;
          break;
        case "ArrowLeft":
        case "KeyA":
          this.row = 0;
          this.column = -1;
          break;
        case "ArrowDown":
        case "KeyS":
          this.row = 1;
          this.column = 0;
          break;
        case "ArrowRight":
        case "KeyD":
          this.row = 0;
          this.column = 1;
          break;
        default:
            return false;
      }
      return true;
    }
  }


export class Model{
    private board: Board;
    private moves: number;
    private score: number;
    private config: string;
    

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
        for(let s of this.board.get()){
            if(s.get() != ""){
                numSq++;
                if(solutions.indexOf(s.get()) < 0){
                    win = false;
                }
            }
            
        }

        if(numSq == 5){
            this.board.setWin(true);
            return  win ? "Congratulations!" : "Try again!";
        }

        return "";
        
    }

    calcScore(){
        let solutions = JSON.parse(this.config).words;
        let score = 0;

        for(let s of this.board.get()){
            if(s.size() > 1){
                for(let sol of solutions){
                    if(sol.includes(s.get())){
                        score += s.size();
                    }
                }
            }
            
        }

        this.score = score;
        return this.score;
    }

    getBoard(){
        return this.board;
    }
}