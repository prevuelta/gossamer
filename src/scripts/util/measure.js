'use strict';

export default function (_u) {
    return {
        u: _u,
        gR: (1+Math.sqrt(5))/2,
        sR: Math.sqrt(2),
        eSR: 2 * Math.sqrt(2) - 1, //1.828427124
        m (multiplier) {
            return Math.round(this.u * multiplier);
        },
        d (divisor) {
            return Math.round(this.u / divisor);
        },
        df (divisor) {
            return this.u / divisor;
        },
        qqq () {
            return 3.0/4.0;
        },
        tt () {
            return 2.0/3.0;
        },
        t () {
            return 1.0/3.0;
        }
    };
}
