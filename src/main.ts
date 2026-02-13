import { processInstructionSet } from "./index";

const rawInput = [[5, 5], [1, 2, "N"], ["LMLMLMLMM"], [3, 3, "E"], ["MMRMMRMRRM"]];

const results = processInstructionSet(rawInput);

console.log("--- Mission Results ---");
console.log(results);
