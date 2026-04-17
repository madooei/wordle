import { useStore } from "@tanstack/react-store";
import { gameStore } from "@/store/game-store";
import { evaluateGuess, MAX_GUESSES, WORD_LENGTH } from "@/lib/evaluate";
import { Tile } from "./tile";

export function Board() {
  const target = useStore(gameStore, (s) => s.target);
  const guesses = useStore(gameStore, (s) => s.guesses);
  const currentGuess = useStore(gameStore, (s) => s.currentGuess);

  const rows: Array<{
    letters: string[];
    states: Array<ReturnType<typeof evaluateGuess>[number] | undefined>;
  }> = [];

  for (let r = 0; r < MAX_GUESSES; r++) {
    if (r < guesses.length) {
      const guess = guesses[r];
      const states = evaluateGuess(guess, target);
      rows.push({ letters: guess.split(""), states });
    } else if (r === guesses.length) {
      const letters = currentGuess
        .padEnd(WORD_LENGTH, " ")
        .split("")
        .map((c) => (c === " " ? "" : c));
      rows.push({ letters, states: Array(WORD_LENGTH).fill(undefined) });
    } else {
      rows.push({
        letters: Array(WORD_LENGTH).fill(""),
        states: Array(WORD_LENGTH).fill(undefined),
      });
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="flex gap-1.5">
          {row.letters.map((letter, cIdx) => (
            <Tile
              key={cIdx}
              letter={letter}
              state={row.states[cIdx]}
              filled={letter !== ""}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
