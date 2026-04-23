import { describe, it, expect } from "vitest";
import { evaluateGuess } from "./evaluate";

describe("evaluateGuess", () => {
  it("returns a color for each letter in the guess", () => {
    const result = evaluateGuess("APPLE", "SPEED");
    expect(result).toHaveLength(5);
  });

  it("marks every position correct when guess equals target", () => {
    const result = evaluateGuess("CRANE", "CRANE");
    expect(result).toEqual([
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
    ]);
  });

  it("marks letters present when they exist in a different position", () => {
    const result = evaluateGuess("ABCDF", "FBCDA");
    expect(result).toEqual([
      "present",
      "correct",
      "correct",
      "correct",
      "present",
    ]);
  });

  it("marks letters absent when they are not in the target", () => {
    const result = evaluateGuess("ZZZZZ", "CRANE");
    expect(result).toEqual([
      "absent",
      "absent",
      "absent",
      "absent",
      "absent",
    ]);
  });

  it("does not over-credit duplicate letters in the guess", () => {
    const result = evaluateGuess("ALLOT", "CANAL");
    expect(result).toEqual([
      "present",
      "present",
      "absent",
      "absent",
      "absent",
    ]);
  });

  it("handles mixed correct and present with duplicate letters", () => {
    const result = evaluateGuess("EERIE", "SHEEP");
    expect(result).toEqual([
      "present",
      "present",
      "absent",
      "absent",
      "absent",
    ]);
  });

  it("returns an empty result for an empty guess", () => {
    expect(evaluateGuess("", "CRANE")).toEqual([]);
  });

  it("uses the guess length for evaluation when lengths differ", () => {
    expect(evaluateGuess("CAT", "CRANE")).toEqual([
      "correct",
      "present",
      "absent",
    ]);
    expect(evaluateGuess("CRANES", "CRANE")).toHaveLength(6);
  });
});
