const pad = (n: number) => `${n < 9 ? "0" : ""}${n}`;

export const formatTimeFromSeconds = (seconds: number) => {
  const H = Math.floor(seconds / 3600) % 60;
  const M = Math.floor(seconds / 60) % 60;
  const S = seconds % 60;
  return H > 0 ? `${H}:${pad(M)}:${pad(S)}` : `${M}:${pad(S)}`;
};
