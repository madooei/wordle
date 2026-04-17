import { Store } from "@tanstack/store";
import { MAX_GUESSES, WORD_LENGTH } from "@/lib/evaluate";
import { randomWord, STARTER_WORD } from "@/lib/words";

export type GameStatus = "playing" | "won" | "lost";

export interface GameState {
  target: string;
  guesses: string[];
  currentGuess: string;
  status: GameStatus;
  message: string;
}

function initialState(target: string): GameState {
  return {
    target,
    guesses: [],
    currentGuess: "",
    status: "playing",
    message: "",
  };
}

export const gameStore = new Store<GameState>(initialState(STARTER_WORD));

export function addLetter(letter: string) {
  const state = gameStore.state;
  if (state.status !== "playing") return;
  if (state.currentGuess.length >= WORD_LENGTH) return;
  if (!/^[A-Za-z]$/.test(letter)) return;
  gameStore.setState((s) => ({
    ...s,
    currentGuess: s.currentGuess + letter.toUpperCase(),
    message: "",
  }));
}

export function removeLetter() {
  const state = gameStore.state;
  if (state.status !== "playing") return;
  gameStore.setState((s) => ({
    ...s,
    currentGuess: s.currentGuess.slice(0, -1),
    message: "",
  }));
}

export function submitGuess() {
  const state = gameStore.state;
  if (state.status !== "playing") return;
  if (state.currentGuess.length !== WORD_LENGTH) {
    gameStore.setState((s) => ({ ...s, message: "Not enough letters" }));
    return;
  }

  const guess = state.currentGuess;
  const nextGuesses = [...state.guesses, guess];
  const won = guess === state.target;
  const lost = !won && nextGuesses.length >= MAX_GUESSES;

  gameStore.setState((s) => ({
    ...s,
    guesses: nextGuesses,
    currentGuess: "",
    status: won ? "won" : lost ? "lost" : "playing",
    message: won ? "You won!" : lost ? `The word was ${s.target}` : "",
  }));
}

export function newGame() {
  gameStore.setState(() => initialState(randomWord()));
}
