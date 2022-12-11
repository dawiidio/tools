/**
 * Re-maps a number from one range to another
 *
 * @example interpolateMap(50, 0, 100, 1000, 8000) // returns: 4500
 *
 * @param n
 * @param start1
 * @param stop1
 * @param start2
 * @param stop2
 * @param withinBounds
 */
export function interpolateMap(n: number, start1: number, stop1: number, start2: number, stop2: number, withinBounds?: boolean): number {
    const newVal = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;

    if (!withinBounds) {
        return newVal;
    }

    if (start2 < stop2) {
        return Math.max(Math.min(newVal, stop2), start2);
    } else {
        return Math.max(Math.min(newVal, start2), stop2);
    }
}
