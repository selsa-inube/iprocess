const appearances = [
  "primary",
  "success",
  "warning",
  "danger",
  "help",
  "dark",
  "gray",
  "light",
] as const;

export type ProgressBarAppearanceType = typeof appearances[number];
