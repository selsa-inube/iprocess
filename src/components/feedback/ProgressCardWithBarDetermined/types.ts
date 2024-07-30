export const appearances = [
    "primary",
    "success",
    "warning",
    "danger",
    "help",
    "dark",
    "gray",
    "light",
  ] as const;
  
  export type ProgressCardWithBarType = typeof appearances[number];