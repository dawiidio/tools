export const parseSecondsToHMS = (seconds: number) => new Date(seconds * 1000).toISOString().slice(11, 19);
