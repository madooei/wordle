export type LetterState = "correct" | "present" | "absent";

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export function evaluateGuess(guess: string, target: string): LetterState[] {
  const result: LetterState[] = [];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      result.push("correct");
    } else if (target.includes(guess[i])) {
      result.push("present");
    } else {
      result.push("absent");
    }
  }
  return result;
}
