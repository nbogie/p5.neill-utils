function zip(arr1: any[], arr2: any[]): any[] {
    console.log("doing stuff");
    return arr1.concat(arr2);
}

function repeat(numRepeats: number, fn: (ix: number) => void): void {
    for (let i = 0; i < numRepeats; i++) {
        fn(i);
    }
}
function collect<Item>(numItems: number, fn: (ix: number) => Item): Item[] {
    const results: Item[] = [];
    for (let i = 0; i < numItems; i++) {
        results.push(fn(i));
    }
    return results;
}
console.log(collect(3, (i) => i * 2));

export { zip, collect, repeat };
