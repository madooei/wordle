import { describe, it, expect } from "vitest";
import { evaluateGuess } from "./evaluate";

describe("evaluateGuess", () => {
  it("returns a color for each letter in the guess", () => {
    const result = evaluateGuess("APPLE", "SPEED");
    expect(result).toHaveLength(5);
  });
});
