//don't use this convenience if it occludes content in intellisense and docs.

/** any object with x and y properties.  Not necessarily a p5.Vector */
interface SimpleXY {
    x: number;
    y: number;
}

import * as messaging from "./messaging.ts";
export { messaging };
/**
 * Call the given function repeatedly, the given number of times.
 * @param numRepeats number of times to call the given function
 * @param fn function to call repeatedly.  Will be passed the zero-based count of the current iteration
 * @see {@link collect} - if you want to collect the returned values from the function instead.
 *
 */
export function repeat(numRepeats: number, fn: (ix: number) => void): void {
    for (let i = 0; i < numRepeats; i++) {
        fn(i);
    }
}

/**
 * snaps a value to the nearest increment
 * @param val value to quantise
 * @param increment increment by which to snap
 * @returns new value snapped to nearest increment
 */
export function snapTo(val: number, increment: number): number {
    return Math.round(val / increment) * increment;
}

//todo: could just be an overriden version of snapTo?
/**
 * Snaps given position to the nearest increment on both axes, returning new position.
 * @param pos position to quantise.  Unchanged.
 * @param increment
 * @returns new position object snapped on both x and y axes to nearest increment
 */
export function snapPositionTo(pos: SimpleXY, increment: number): SimpleXY {
    const [x, y] = [pos.x, pos.y].map((val) => snapTo(val, increment));
    return {
        x,
        y,
    };
}

/**
 * Builds and returns an array collected from the repeated calling of the given function.
 * @param numItems number of items to collect
 * @param fn function to call repeatedly in order to construct each element of the array.  It will be passed a counter (zero-based) indicating the number of the current iteration.
 * @returns array of constructed items
 */
export function collect<Item>(
    numItems: number,
    fn: (ix: number) => Item
): Item[] {
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
export function minBy<T, V>(
    array: T[],
    iteratee: (value: T) => V
): T | undefined {
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
export function maxBy<T, V>(
    array: T[],
    iteratee: (value: T) => V
): T | undefined {
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
export function zipWith<T1, T2, TResult>(
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
export function zip<T1, T2>(array1: T1[], array2: T2[]): [T1, T2][] {
    return zipWith(array1, array2, (value1, value2) => [value1, value2]);
}

/**
 * Converts polar coordinates (radius and angle) to Cartesian coordinates (x and y).  Ignores p5's angleMode.
 * @param angle The angle in radians
 * @param radius The distance from the origin
 * @returns An object with {x,y} the Cartesian coordinates.
 * @see {@link https://p5js.org/reference/p5.Vector/fromAngle/} - If you want a p5.Vector instead
 */
export function polarToCartesian(angle: number, radius: number): SimpleXY {
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
}

// 1. O is the generic type for the config object.
// 2. K is the generic type for the key, which must be a key of O.
// 3. We use a conditional type to constrain K to only be a key whose value is a boolean.
type BooleanKeys<O> = {
    [K in keyof O]: O[K] extends boolean ? K : never;
}[keyof O];

/**
 * Toggles the named boolean property on the given config object in-place.
 * @param config The configuration object.
 * @param key The name of the key to toggle. Must be a boolean property.
 * @throws {Error} If the key does not exist on the object.
 * @throws {Error} If the property exists but is not a boolean.
 * @returns {boolean} the new value of the property
 */
export function toggleBooleanInConfig<
    K extends BooleanKeys<O>,
    O extends object
>(key: K, config: O): boolean {
    // The 'in' operator checks for both own and inherited properties.
    // We use Object.prototype.hasOwnProperty.call for a safer check of only own properties.
    if (!(key in config)) {
        throw new Error(`Key '${String(key)}' not found in given config.`);
    }
    const currentValue = (config as any)[key];

    if (typeof currentValue !== "boolean") {
        throw new Error(
            `Property '${String(key)}' in given config is not boolean`
        );
    }

    (config as any)[key] = !currentValue;
    return (config as any)[key];
}

//example
// doOverGrid({ w: 300, h: 200 }, { numCols: 10, numRows: 5 }, ({ pixelPos }) =>
//     circle(pixelPos.x, pixelPos.y, 10)
// );

//TODO: extract a version of this I've actually used.  this one is horrible.
//TODO: also provide a version that automatically pushes and translates to the relevant pixel positions.  e.g. doOverGridTranslating
/**
 * Call a given function repeatedly over the given grid
 * @param dimensions of grid
 * @param num cols and rows
 * @param cellFn a function to be called for each cell.  it'll be passed the pixel coords and grid coords.
 */
export function doOverGrid(
    { w, h }: { w: number; h: number },
    { numCols, numRows }: { numCols: number; numRows: number },
    cellFn: ({
        pixelPos,
        indexPos,
    }: {
        pixelPos: SimpleXY;
        indexPos: { colIx: number; rowIx: number };
    }) => void
) {
    for (let rowIx = 0; rowIx < numRows; rowIx++) {
        for (let colIx = 0; colIx < numCols; colIx++) {
            const x = w * (colIx / numCols);
            const y = h * (rowIx / numRows);
            cellFn({ pixelPos: { x, y }, indexPos: { colIx, rowIx } });
        }
    }
}

// export function randomPastel(saturation: number): p5.Color {
//     push();
//     const c = color(random(360), saturation, 100);
//     pop();
//     return c;
// }

export function centrePos(): p5.Vector {
    return createVector(width / 2, height / 2);
}

export function mousePos(): p5.Vector {
    return createVector(mouseX, mouseY);
}

export function prevMousePos(): p5.Vector {
    return createVector(pmouseX, pmouseY);
}

/** todo: have a single function for any dimensionality vector */
export function roundVec2D(v: p5.Vector): p5.Vector {
    console.log("to str: ", v.toString());
    return createVector(Math.round(v.x), Math.round(v.y));
}

export function roundVec3D(v: p5.Vector): p5.Vector {
    return createVector(Math.round(v.x), Math.round(v.y), Math.round(v.z));
}

/** turn vector into string form (x,y) - by default will round the elements, but you can pass fractionDigits arg and it will include that many.
 * @todo have one function for 2d, 3d, and Nd
 */
export function vec2DToString(
    v: p5.Vector,
    fractionDigits: number = 0
): string {
    return [v.x, v.y].map((val) => val.toFixed(fractionDigits)).join(",");
}
