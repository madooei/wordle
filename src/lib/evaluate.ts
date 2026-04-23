export type LetterState = "correct" | "present" | "absent";

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export function evaluateGuess(guess: string, target: string): LetterState[] {
  const result: LetterState[] = Array.from(
    { length: guess.length },
    () => "absent",
  );
  const remainingTargetLetters = new Map<string, number>();

  // First pass: mark exact matches and count unmatched target letters.
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      result[i] = "correct";
      continue;
    }

    const letter = target[i];
    remainingTargetLetters.set(
      letter,
      (remainingTargetLetters.get(letter) ?? 0) + 1,
    );
  }

  // Second pass: mark present only if an unmatched copy is still available.
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") continue;

    const letter = guess[i];
    const available = remainingTargetLetters.get(letter) ?? 0;
    if (available > 0) {
      result[i] = "present";
      remainingTargetLetters.set(letter, available - 1);
    }
  }

  return result;
}
