import { expect, test } from "vitest"
import Home from "./app/page"
import {config1} from './config'
import { Model } from "./model";

let m = new Model(JSON.stringify(config1));
test("select", () => {
    
})