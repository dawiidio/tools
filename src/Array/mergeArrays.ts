interface IMergeArraysProps<T = any> {
    findIndex: (entry1: T, entry2: T) => boolean;

    merge: (entry1: T, entry2: T) => T;
}

export const mergeArrays = <T = any>(arr1: T[], arr2: T[], { findIndex, merge }: IMergeArraysProps<T>): T[] => {
    const entriesToMergeWith = [...arr2];

    const mergedEntries = arr1.map((entry) => {
        const matchIdx = entriesToMergeWith.findIndex((e) => findIndex(entry, e));

        if (matchIdx === -1)
            return entry;

        const [match] = entriesToMergeWith.splice(matchIdx, 1);

        return merge(entry, match);
    });

    return [
        ...entriesToMergeWith,
        ...mergedEntries,
    ];
};
