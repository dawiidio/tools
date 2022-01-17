export const shuffleArray = <T = any>(
    arr: T[],
    size = 1,
    preventDuplicates = false,
): T[] => {
    if (size > arr.length && preventDuplicates) {
        throw new Error(
            `Size can't be larger than array size when preventDuplicates = true`,
        );
    }

    const tempArr = [...arr];

    return new Array(size).fill(0).map(() => {
        const idx = Math.floor(Math.random() * (tempArr.length || arr.length));

        if (tempArr.length) {
            return tempArr.splice(idx, 1).at(0) as unknown as T;
        } else {
            return arr.slice(idx, idx + 1).at(0) as unknown as T;
        }
    });
};
