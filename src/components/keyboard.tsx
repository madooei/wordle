import { useStore } from "@tanstack/react-store";
import { cn } from "@/lib/utils";
import { evaluateGuess, type LetterState } from "@/lib/evaluate";
import {
  addLetter,
  gameStore,
  removeLetter,
  submitGuess,
} from "@/store/game-store";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

const priority: Record<LetterState, number> = {
  absent: 0,
  present: 1,
  correct: 2,
};

function computeKeyStates(
  guesses: string[],
  target: string,
): Record<string, LetterState> {
  const map: Record<string, LetterState> = {};
  for (const guess of guesses) {
    const states = evaluateGuess(guess, target);
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const next = states[i];
      const existing = map[letter];
      if (!existing || priority[next] > priority[existing]) {
        map[letter] = next;
      }
    }
  }
  return map;
}

const stateStyles: Record<LetterState, string> = {
  correct: "bg-green-500 text-white",
  present: "bg-yellow-500 text-white",
  absent: "bg-neutral-500 text-white",
};

export function Keyboard() {
  const target = useStore(gameStore, (s) => s.target);
  const guesses = useStore(gameStore, (s) => s.guesses);
  const keyStates = computeKeyStates(guesses, target);

  const handleClick = (key: string) => {
    if (key === "ENTER") submitGuess();
    else if (key === "BACK") removeLetter();
    else addLetter(key);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {ROWS.map((row, rIdx) => (
        <div key={rIdx} className="flex justify-center gap-1.5">
          {row.map((key) => {
            const isWide = key === "ENTER" || key === "BACK";
            const state = keyStates[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleClick(key)}
                className={cn(
                  "h-12 rounded-md text-sm font-semibold uppercase transition-colors",
                  isWide ? "w-16 text-xs" : "w-9",
                  state
                    ? stateStyles[state]
                    : "bg-neutral-200 text-foreground hover:bg-neutral-300",
                )}
              >
                {key === "BACK" ? "⌫" : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
