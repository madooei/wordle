import { cn } from "@/lib/utils";
import type { LetterState } from "@/lib/evaluate";

interface TileProps {
  letter: string;
  state?: LetterState;
  filled?: boolean;
}

const stateStyles: Record<LetterState, string> = {
  correct: "bg-green-500 text-white border-green-500",
  present: "bg-yellow-500 text-white border-yellow-500",
  absent: "bg-neutral-500 text-white border-neutral-500",
};

export function Tile({ letter, state, filled }: TileProps) {
  return (
    <div
      className={cn(
        "flex h-14 w-14 items-center justify-center border-2 text-2xl font-bold uppercase",
        state
          ? stateStyles[state]
          : filled
            ? "border-neutral-500 text-foreground"
            : "border-neutral-300 text-foreground",
      )}
    >
      {letter}
    </div>
  );
}
