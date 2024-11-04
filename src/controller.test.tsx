import { expect, test } from "vitest"
import { Model } from "./model";
import {select} from './app/page'
import { cleanup, render } from "@testing-library/react";
import Home from "./app/page";

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
    const {getByTestId} = render(<canvas data-testid="test"/>);
    const canvas = getByTestId("test");

    expect(select(0, 0, m.board, canvas) == null).toBe(false);
    expect(select(999, 999, m.board, canvas) == null).toBe(true);
    cleanup();
    
})