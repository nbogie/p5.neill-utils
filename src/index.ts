/**
 * Call the given function repeatedly, the given number of times.
 * @param numRepeats number of times to call the given function
 * @param fn function to call repeatedly.  Will be passed the zero-based count of the current iteration
 * @see {@link collect} - if you want to collect the returned values from the function instead.
 *
 */
function repeat(numRepeats: number, fn: (ix: number) => void): void {
    for (let i = 0; i < numRepeats; i++) {
        fn(i);
    }
}
/**
 * Builds and returns an array collected from the repeated calling of the given function.
 * @param numItems number of items to collect
 * @param fn function to call repeatedly in order to construct each element of the array.  It will be passed a counter (zero-based) indicating the number of the current iteration.
 * @returns array of constructed items
 */
function collect<Item>(numItems: number, fn: (ix: number) => Item): Item[] {
    const results: Item[] = [];
    for (let i = 0; i < numItems; i++) {
        results.push(fn(i));
    }
    return results;
}

/**
 * Finds the element in an array that results in the minimum value
 * when passed through the iteratee function.
 * * @param array The array to iterate over.
 * @param iteratee The function to execute on each element to get the value to compare.
 * @returns The element that produced the minimum value, or undefined if the array is empty.
 */
function minBy<T, V>(array: T[], iteratee: (value: T) => V): T | undefined {
    if (!array || array.length === 0) {
        return undefined;
    }

    let minElement: T = array[0];
    let minValue: V = iteratee(array[0]);

    // Iterate from the second element
    for (let i = 1; i < array.length; i++) {
        const currentElement: T = array[i];
        const currentIteratedValue: V = iteratee(currentElement);

        // If the current iterated value is less than the current minimum value
        if (currentIteratedValue < minValue) {
            minValue = currentIteratedValue;
            minElement = currentElement;
        }
    }

    return minElement;
}
/**
 * Finds the element in an array that results in the maximum value
 * when passed through the iteratee function.
 * * @param array The array to iterate over.
 * @param iteratee The function to execute on each element to get the value to compare.
 * @returns The element that produced the maximum value, or undefined if the array is empty.
 */
function maxBy<T, V>(array: T[], iteratee: (value: T) => V): T | undefined {
    if (!array || array.length === 0) {
        return undefined;
    }

    // Initialize with the first element and its transformed value
    let maxElement: T = array[0];
    let maxValue: V = iteratee(array[0]);

    // Iterate from the second element
    for (let i = 1; i < array.length; i++) {
        const currentElement: T = array[i];
        const currentIteratedValue: V = iteratee(currentElement);

        // If the current iterated value is greater than the current maximum value
        if (currentIteratedValue > maxValue) {
            maxValue = currentIteratedValue;
            maxElement = currentElement;
        }
    }

    return maxElement;
}

/**
 * Creates an array of values by applying a function to elements
 * paired from two arrays.
 * * @param array1 The first array.
 * @param array2 The second array.
 * @param iteratee The function to combine the paired elements.
 * @returns A new array containing the results of the iteratee function.
 */
function zipWith<T1, T2, TResult>(
    array1: T1[],
    array2: T2[],
    iteratee: (value1: T1, value2: T2) => TResult
): TResult[] {
    // Determine the length of the shortest array
    const length = Math.min(array1.length, array2.length);

    // Pre-allocate the result array
    const result: TResult[] = new Array(length);

    for (let i = 0; i < length; i++) {
        // Apply the iteratee function to the paired elements
        result[i] = iteratee(array1[i], array2[i]);
    }

    return result;
}
/**
 * Creates an array of grouped elements, where the first element of the first array
 * is paired with the first element of the second array, and so on.
 * If the arrays are not the same length, the output array will be the length of the shorter array.
 * @param array1 The first array.
 * @param array2 The second array.
 * @returns A new array of tuples containing the paired elements.
 */
function zip<T1, T2>(array1: T1[], array2: T2[]): [T1, T2][] {
    return zipWith(array1, array2, (value1, value2) => [value1, value2]);
}

export { zip, zipWith, collect, repeat, maxBy, minBy };
