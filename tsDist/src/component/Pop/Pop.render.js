"use strict";
/**
 * pop.render.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(h) {
    return h(this.type + "-transition", {
        props: {
            direction: this.popDirection,
            global: !this.part,
            speed: this.speed
        },
        ref: 'transition'
    }, [
        h('div', {
            class: this.compClass,
            style: [this.positionStyle],
            directives: [{
                    name: 'show',
                    value: this.popDisplay
                }]
        }, this.$slots.default)
    ]);
}
exports.default = default_1;
//# sourceMappingURL=Pop.render.js.map