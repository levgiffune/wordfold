import { expect, test, vi } from "vitest"
import Home from "./app/page"
import {Model} from "./model";
import {cleanup, fireEvent, render} from "@testing-library/react";
import React from 'react';

test("render", () => {
    const {getByText} = render(<Home/>);
    expect(getByText("Score: 0") == undefined).toBe(false);
    cleanup();
})