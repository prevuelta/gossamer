'use strict';

let Util = {
    randomFloat (min, max) {
        return Math.random() * (max - min) + min;
    },
    randomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};

module.exports = Util;
