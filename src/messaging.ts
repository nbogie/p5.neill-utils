//Some functions for posting and displaying messages.
//not a robust system.  can't support two sketches at once, for example, and the rendering is hard-coded at the moment.

interface MessageSystem {
    messages: Message[];
    userRenderFunction?: MessagesRenderFunction;
}

type MessagesRenderFunction = (messages: Message[]) => void;

/** todo: check this messageSystem variable isn't polluting.  */
let messageSystem: MessageSystem = {
    messages: [],
    userRenderFunction: undefined,
};

export interface Message {
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

    messageSystem.messages.push(message);
}
/**
 * Needs to be called periodically to have old messages culled from message list
 */
export function updateMessages() {
    messageSystem.messages = messageSystem.messages.filter(
        (m: Message) => millis() < m.postTimeMs + m.durationMs
    );
}

export function registerRenderer(fn: MessagesRenderFunction) {
    messageSystem.userRenderFunction = fn;
}

/** draw the messages on screen. You can override how this is done by first passing a function to registerRenderer() that takes an array of Message objects.
 * @example
 * ```js
 * registerRenderer(myDrawMessagesFn);
 * drawMessages()
 * ```
 */
export function drawMessages() {
    const chosenRenderer =
        messageSystem.userRenderFunction ?? defaultRenderMessages;
    chosenRenderer(messageSystem.messages);
}

function defaultRenderMessages(messages: Message[]) {
    push();
    translate(width - 50, 50);
    for (let m of messages) {
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
/** post the given strings as messages distributed over time.
 */
export function postMessagesAtIntervals(
    msgTexts: string[],
    { spacingSec, durationSec } = { spacingSec: 1, durationSec: 10 }
) {
    let delayMs = 0;
    for (let msgText of msgTexts) {
        postMessageLater(msgText, delayMs, durationSec * 1000);
        delayMs += spacingSec * 1000;
    }
}
/**
 *
 * @param str the text of the message to post
 * @param delayMs how long to wait before posting the message
 * @param durationMs how long after posting should the message endure in the system?
 * @returns the timeoutId returned from setTimeout, in case the user wants to clear it.
 */
export function postMessageLater(
    str: string,
    delayMs: number,
    durationMs: number
) {
    return setTimeout(() => postMessage(str, durationMs), delayMs);
}
/**
 * remove all messages from the system
 */
export function clearMessages() {
    messageSystem.messages = [];
}
