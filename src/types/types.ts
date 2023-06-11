export const RabbiTypeKeys = ["תנא", "אמורא", "ראשון", "אחרון"] as const;
export type IRabbiType = (typeof RabbiTypeKeys)[number];
