'use strict';

const debugLogger = {
    debug: (...args) => {
        console.log(...args);
    },
    info: (...args) => {
        console.log(...args);
    },
    error: (...args) => {
        console.error(...args);
    },
};

const prodLogger = {
    debug: (...args) => {
        // no-op
    },
    info: (...args) => {
        console.log(...args);
    },
    error: (...args) => {
        console.error(...args);
    },
};

export default process.env.DEBUG_MODE === 'true' ? debugLogger : prodLogger;
