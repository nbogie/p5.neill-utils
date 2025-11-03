interface World {
    messages: Message[];
}
let world: World = { messages: [] };

interface Message {
    /** the text of the message */
    msg: string;
    /** time message was posted, in milliseconds since sketch start */
    postTimeMs: number;
    /** duration (in milliseconds) for which the message should be displayed */
    durationMs: number;
}

/**
 * @param str - text of the message
 * @param durationMs  - duration in milliseconds for the message to be displayed. defaults if not provided.
 */
export function postMessage(str: string, durationMs = 5000) {
    /** @type {Message} */
    const message: Message = {
        msg: str,
        postTimeMs: millis(),
        durationMs,
    };

    world.messages.push(message);
}

export function updateMessages() {
    world.messages = world.messages.filter(
        (m: Message) => millis() < m.postTimeMs + m.durationMs
    );
}
//todo: allow the library user to specify a renderer
export function drawMessages() {
    push();
    translate(width - 50, 50);
    for (let m of world.messages) {
        textSize(18);
        textAlign(RIGHT);
        noStroke();
        fill("white");
        // const timePrefix = +" at " + formatMillisecondsToMMSS(m.postTime);
        text(m.msg, 0, 0);
        translate(0, 30);
    }
    pop();
}

export function postMessagesAtIntervals(msgTexts: string) {
    const spacingMs = 1000;
    const durationMs = 10000;
    let delayMs = 0;
    for (let msgText of msgTexts) {
        postMessageLater(msgText, delayMs, durationMs);
        delayMs += spacingMs;
    }
}

export function postMessageLater(
    str: string,
    delayMs: number,
    durationMs: number
) {
    return setTimeout(() => postMessage(str, durationMs), delayMs);
}

export function clearMessages() {
    world.messages = [];
}
