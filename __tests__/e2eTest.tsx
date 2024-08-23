import Router from "../src/Router";
import {render} from "@testing-library/react";

describe('e2eTest', ()=>{
    it('fullTest', async ()=>{
        render(<Router/>);
    });
});