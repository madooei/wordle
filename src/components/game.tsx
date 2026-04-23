import { useEffect } from "react";
import { useStore } from "@tanstack/react-store";
import { Button } from "@/components/ui/button";
import {
  addLetter,
  gameStore,
  newGame,
  removeLetter,
  submitGuess,
} from "@/store/game-store";
import { Board } from "./board";
import { Keyboard } from "./keyboard";

export function Game() {
  const status = useStore(gameStore, (s) => s.status);
  const message = useStore(gameStore, (s) => s.message);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        submitGuess();
      } else if (e.key === "Backspace") {
        removeLetter();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        addLetter(e.key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Wordle</h1>

      <Board />

      <div className="flex h-6 items-center">
        {message && (
          <p
            aria-live="polite"
            className={
              status === "won"
                ? "text-green-600 font-semibold"
                : status === "lost"
                  ? "text-red-600 font-semibold"
                  : "text-amber-700 font-semibold"
            }
          >
            {message}
          </p>
        )}
      </div>

      <Keyboard />

      {status !== "playing" && <Button onClick={newGame}>New Game</Button>}
    </div>
  );
}
