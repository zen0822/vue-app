"use strict";
/**
 * bubble.render.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(h) {
    var _this = this;
    return h('zoom-transition', {
        props: {
            speed: 'fast',
            origin: '50% 0',
            global: this.fixed,
            once: true,
            display: this.display
        },
        ref: 'transition'
    }, [
        h('div', {
            class: this.compClass,
            on: {
                click: this.click
            }
        }, [
            h('div', {
                class: [this.xclass('arrow')]
            }, [
                h('icon', {
                    class: [this.xclass('border')],
                    props: {
                        kind: 'triangle-up',
                        ui: this.ui,
                        theme: this.theme
                    }
                }),
                h('icon', {
                    class: [this.xclass('body')],
                    props: {
                        kind: 'triangle-up',
                        ui: this.ui,
                        theme: this.theme
                    }
                })
            ]),
            h('div', {
                class: [this.xclass('slot')]
            }, [
                (function () {
                    if (_this.$slots.default) {
                        return _this.$slots.default;
                    }
                    else {
                        return h('div', {
                            class: [_this.xclass('text')]
                        }, _this.stateMessage);
                    }
                })()
            ])
        ])
    ]);
}
exports.default = default_1;
//# sourceMappingURL=Bubble.render.js.map