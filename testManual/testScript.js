console.log("testScript.js started");
console.log(NeillUtils.zip([1, 2], "a b c".split(" ")));

function logToPage(...args) {
    const divElem = document.createElement("div");
    divElem.textContent = args.map((arg) => JSON.stringify(arg));
    document.body.appendChild(divElem);
}

logToPage(
    "hello html world: ",
    NeillUtils.collect(10, (ix) => ix * ix).join(", ")
);
logToPage(
    "zipWith: ",
    NeillUtils.zipWith([1, 2, 3, 4, 5, 6], "abcdefghhi".split(""), (n, c) =>
        c.repeat(n)
    )
);
logToPage("zip: ", NeillUtils.zip([1, 2, 3, 4, 5, 6], "abcdefghhi".split("")));

NeillUtils.repeat(4, (ix) => logToPage("repeat() says : " + ix));
