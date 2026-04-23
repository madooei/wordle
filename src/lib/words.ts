export const WORDS = [
  "SPEED",
  "APPLE",
  "LEVEL",
  "HAPPY",
  "HELLO",
  "GREEN",
  "TEETH",
  "CHEER",
  "ARENA",
  "AGREE",
  "ROBOT",
  "PAPER",
  "SUGAR",
  "BREAD",
  "CRANE",
  "SLATE",
  "HOUSE",
  "WORLD",
  "PLANT",
  "STORM",
  "NIGHT",
  "RIGHT",
  "LIGHT",
  "CHAIR",
  "TABLE",
  "MUSIC",
  "BEACH",
  "CLOUD",
  "RIVER",
  "OCEAN",
  "GREAT",
  "PIZZA",
  "BERRY",
  "STEEL",
  "ENEMY",
];

const WORD_SET = new Set(WORDS);

export const STARTER_WORD = "SPEED";

export function isWordInList(word: string): boolean {
  return WORD_SET.has(word.toUpperCase());
}

export function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}
