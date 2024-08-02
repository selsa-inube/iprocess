const sizes = ["wide", "compact"] as const;
export type IDatetimefieldSize = (typeof sizes)[number];

const status = ["invalid", "pending"] as const;
export type IDatetimefieldStatus = (typeof status)[number];