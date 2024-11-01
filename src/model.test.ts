import { expect, test } from 'vitest'
import { Model } from './model';
import exp from 'constants';

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

test("Model", () => {
    let m = new Model(JSON.stringify(config1));
    
    expect(m.calcScore()).toBe(0);
    expect(m.checker()).toBe("");
    expect(m.getBoard().getSelected()).toBeNull();
})