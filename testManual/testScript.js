console.log("testScript.js started");
console.log(P5NeillUtils.zip([1, 2], "a b c".split(" ")));

function logToPage(...args) {
    const divElem = document.createElement("div");
    divElem.textContent = args.map((arg) => JSON.stringify(arg));
    document.body.appendChild(divElem);
}

logToPage(
    "hello html world: ",
    P5NeillUtils.collect(10, (ix) => ix * ix).join(", ")
);

P5NeillUtils.repeat(10, (ix) => logToPage("repeat() says : " + ix));
