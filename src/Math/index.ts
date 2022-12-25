export { interpolateMap } from './interpolateMap';

export type Degrees = number;
export type Radians = number;

export const degToRad = (deg: Degrees): Radians => deg * (Math.PI / 180);

export const radToDeg = (rad: Radians): Degrees => (rad * 180) / Math.PI;

export const percentsToDeg = (percents: number) =>
    (percents / 100) * 360;
