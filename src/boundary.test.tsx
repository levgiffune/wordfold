import { expect, test } from "vitest"
import Home from "./app/page"
import {cleanup, render} from "@testing-library/react";
import React from 'react';

test("render", () => {
    const {getByText} = render(<Home/>);
    expect(getByText("Score: 0") == undefined).toBe(false);
    cleanup();
})