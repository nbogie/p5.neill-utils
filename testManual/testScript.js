/// <reference path="./global.d.ts" />

const N = NeillUtils;

let config = { lit: true, dogs: false, name: "rex" };

function setup() {
    createCanvas(600, 400);
    N.messaging.registerRenderer(myDrawMessages);
    testVariousFunctions();

    N.messaging.postMessagesAtIntervals(["hello", "world", "let's", "go!"], {
        spacingSec: 0.5,
        durationSec: 1,
    });
}

function draw() {
    background(100);

    drawGrid();
    const p = N.snapPositionTo({ x: 10, y: 20 }, 100);

    push();
    translate(N.mousePos());
    circle(0, 0, 50);
    pop();

    N.messaging.drawMessages();
    N.messaging.updateMessages();
}

function drawGrid() {
    randomSeed(second());

    N.doOverGrid(
        { w: 300, h: 200 },
        { numCols: 10, numRows: 5 },
        ({ pixelPos, indexPos }) => {
            const weighting = map(indexPos.rowIx, 0, 5, 0.9, 0.2, true);
            const c = N.pickBiased(palette.colors, weighting);
            fill(c);
            circle(100 + pixelPos.x, 100 + pixelPos.y, 20);
        }
    );
}

//@ts-ignore
function myDrawMessages(messages) {
    if (messages.length === 0) {
        return;
    }

    const mostRecentMessage = messages.at(-1);

    push();
    textAlign(CENTER, CENTER);
    textSize(24);
    fill("magenta");
    text(mostRecentMessage.msg, width / 2, height / 2);
    pop();
}

function logIt() {
    const divElem = document.createElement("div");
    divElem.textContent = [...arguments]
        .map((arg) => JSON.stringify(arg))
        .join("");
    document.body.appendChild(divElem);
}

function testVariousFunctions() {
    logIt("hello html world: ", N.collect(10, (ix) => ix * ix).join(", "));

    logIt(N.zip([1, 2], "a b c".split(" ")));
    logIt(
        "zipWith: ",
        N.zipWith([1, 2, 3, 4, 5, 6], "abcdefghhi".split(""), (n, c) =>
            c.repeat(n)
        )
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
}

function mousePressed() {
    N.messaging.postMessage("mousePressed at " + N.vec2DToString(N.mousePos()));
    redraw();
}

const palette = {
    name: "tsu_arcade",
    colors: ["#544e47", "#d1af84", "#f3b551", "#cec8b8", "#4aad8b", "#e15147"],
    stroke: "#251c12",
    background: "#cfc7b9",
    size: 6,
    type: "chromotome",
};
