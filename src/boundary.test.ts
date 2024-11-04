import { expect, test } from "vitest"
import Home from "./app/page"
import { Model } from "./model";

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

let m = new Model(JSON.stringify(config));
test("select", () => {
    
})