import { beforeEach, describe, expect, it } from "vitest";
import { submitGuess, gameStore } from "./game-store";

describe("submitGuess", () => {
  beforeEach(() => {
    gameStore.setState(() => ({
      target: "SPEED",
      guesses: [],
      currentGuess: "",
      status: "playing",
      message: "",
    }));
  });

  it("accepts a guess that exists in the word list", () => {
    gameStore.setState((state) => ({ ...state, currentGuess: "CRANE" }));

    submitGuess();

    expect(gameStore.state.guesses).toEqual(["CRANE"]);
    expect(gameStore.state.currentGuess).toBe("");
    expect(gameStore.state.message).toBe("");
    expect(gameStore.state.status).toBe("playing");
  });

  it("rejects a guess that is not in the word list", () => {
    gameStore.setState((state) => ({ ...state, currentGuess: "ZZZZZ" }));

    submitGuess();

    expect(gameStore.state.guesses).toEqual([]);
    expect(gameStore.state.currentGuess).toBe("ZZZZZ");
    expect(gameStore.state.message).toBe("Not in word list");
    expect(gameStore.state.status).toBe("playing");
  });
});