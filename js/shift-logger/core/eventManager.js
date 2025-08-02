// modules/eventManager.js

import { EVENTS } from './appEvents.js';

export function dispatchAppEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
}

export function logEvent(eventName, detail = {}) {
    console.log(`[G.E.T. EVENT]: ${eventName}`, detail);
    dispatchAppEvent(eventName, detail);
}
