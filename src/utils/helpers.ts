export const fmtMSS = (s: number) =>
    (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;

export const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};
