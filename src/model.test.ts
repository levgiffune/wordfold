import { expect, test } from 'vitest'
import { Model, Square, Move } from './model';
import exp from 'constants';

const config = {
    "name": "#1",
    "words" : [ "CYAN", "YELLOW", "PURPLE", "MAUVE", "BLUE" ],
    "theme" : "Colors",
    "initial": [ ['E', 'L', 'W', 'CY', ''],
                 ['Y', 'L', 'O', 'A', 'N'],
                 ['U', 'B', 'L', 'E', 'E'],
                 ['E', 'L', 'P', 'M', 'V'],
                 ['P', 'U', 'R', 'A', 'U']
               ]
  }

const flatInitial = ['E', 'L', 'W', 'CY', '',
                     'Y', 'L', 'O', 'A', 'N',
                     'U', 'B', 'L', 'E', 'E',
                     'E', 'L', 'P', 'M', 'V',
                     'P', 'U', 'R', 'A', 'U'];

let m = new Model(JSON.stringify(config));

test("Model", () => {
    expect(m.score).toBe(0);
    expect(m.moves).toBe(0);
    expect(m.config).toBe(JSON.stringify(config));
    expect(m.checker()).toBe("");
    expect(m.calcScore()).toBe(2);

    m.board.squares = [new Square(0, 0, "YELLOW"), 
      new Square(1, 0, "MAUVE"), 
      new Square(2, 0, "BLUE"), 
      new Square(3, 0, "PURPLE"), 
      new Square(4, 0, "CYAN")];
    expect(m.checker()).toBe("Congratulations!");

    m.board.squares = [new Square(0, 0, "FHDSHGYR"), 
      new Square(1, 0, "MAUVE"), 
      new Square(2, 0, "BLUE"), 
      new Square(3, 0, "PURPLE"), 
      new Square(4, 0, "CYAN")];
    expect(m.checker()).toBe("Try again!");
})

test("Board", () => {
  m = new Model(JSON.stringify(config));
  let b = m.board;
  let sLet = [];
  let down = new Move()
  down.row = 1;

  for(let s of b.squares){
    sLet.push(s.letters);
  }

  expect(sLet).toStrictEqual(flatInitial);
  expect(b.selected).toBeNull();
  expect(b.win).toBeFalsy();
  expect(b.fold(down)).toBeFalsy();

  b.selected = b.squares[3];
  
  expect(b.fold(down)).toBeTruthy();
  expect(b.squares[3].letters).toBe("");

  
})

test("Move", () => {
  let move = new Move();

  expect(move.row).toBe(0);
  expect(move.column).toBe(0);

  move.parseKey("ArrowUp");
  expect(move.row).toBe(-1);
  expect(move.column).toBe(0);

  move.parseKey("KeyD");
  expect(move.row).toBe(0);
  expect(move.column).toBe(1)

  move.parseKey("ArrowRight");
  expect(move.row).toBe(0);
  expect(move.column).toBe(1)

  move.parseKey("ArrowDown");
  expect(move.row).toBe(1);
  expect(move.column).toBe(0);

  move.parseKey("ArrowLeft");
  expect(move.row).toBe(0);
  expect(move.column).toBe(-1)

  move.parseKey("ArrowUp");
  expect(move.row).toBe(-1);

  expect(move.parseKey("frhshgurf")).toBeNull();

})

test("Square", () => {
  let s = m.board.squares[8];
  let empty = m.board.squares[4];

  expect(s.letters).toBe("CYA");
  expect(empty.letters).toBe("");
  expect(s.row).toBe(1);
  expect(s.column).toBe(3);
  expect(s.contains(350, 150)).toBeTruthy();
  expect(s.contains(500, 50)).toBeFalsy();
})