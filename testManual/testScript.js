/// <reference path="./global.d.ts" />

const N = NeillUtils;

let config = { lit: true, dogs: false, name: "rex" };
console.log("testScript.js started");

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(100);

    N.doOverGrid(
        { w: 300, h: 200 },
        { numCols: 10, numRows: 5 },
        ({ pixelPos, indexPos }) => {
            fill(indexPos.colIx * 25);
            circle(pixelPos.x, pixelPos.y, 10);
        }
    );
    const p = N.snapPositionTo({ x: 10, y: 20 }, 100);

    push();
    translate(N.mousePos());
    circle(0, 0, 50);
    pop();
    N.messaging.drawMessages();
    N.messaging.updateMessages();
}

function mousePressed() {
    N.messaging.postMessage("mousePressed at " + N.vec2DToString(N.mousePos()));
    redraw();
}

function logIt() {
    const divElem = document.createElement("div");
    divElem.textContent = [...arguments]
        .map((arg) => JSON.stringify(arg))
        .join("");
    document.body.appendChild(divElem);
}

logIt("hello html world: ", N.collect(10, (ix) => ix * ix).join(", "));

logIt(N.zip([1, 2], "a b c".split(" ")));
logIt(
    "zipWith: ",
    N.zipWith([1, 2, 3, 4, 5, 6], "abcdefghhi".split(""), (n, c) => c.repeat(n))
);

logIt("zip: ", N.zip([1, 2, 3, 4, 5, 6], "abcdefghhi".split("")));

logIt(config);
logIt("dogs is now: ", N.toggleBooleanInConfig("dogs", config));
logIt(config);
logIt("dogs is now: ", N.toggleBooleanInConfig("dogs", config));
logIt("dogs is now: ", N.toggleBooleanInConfig("dogs", config));
logIt("lit is now: ", N.toggleBooleanInConfig("lit", config));
logIt("dogs is now: ", N.toggleBooleanInConfig("dogs", config));
logIt("dogs is now: ", N.toggleBooleanInConfig("dogs", config));
logIt(config);

logIt("polarToCartesian(0,100)", N.polarToCartesian(0, 100));
logIt("polarToCartesian(PI/2,100)", N.polarToCartesian(Math.PI / 2, 100));

N.repeat(4, (ix) => logIt("repeat() says : " + ix));
