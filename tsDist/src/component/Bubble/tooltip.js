"use strict";
/**
 * 冒泡样式的 tooltip 组件
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var Bubble_1 = __importDefault(require("./Bubble"));
var store_1 = __importDefault(require("../../vuex/store"));
var type_json_1 = __importDefault(require("../../vuex/module/common/type.json"));
var base_1 = __importDefault(require("../../mixin/base"));
/**
 * 创建 tooltip 组件的实例
 **/
var createTooltip = function () {
    var tooltipCompVm = new vue_1.default({
        name: 'tooltip',
        mixins: [base_1.default],
        computed: {
            cPrefix: function () {
                return this.compPrefix + "-tooltip";
            }
        },
        components: {
            bubble: Bubble_1.default
        },
        store: store_1.default,
        render: function (h) {
            return h('div', {
                class: [this.cPrefix]
            }, [
                h('bubble', {
                    ref: 'tooltip'
                })
            ]);
        },
        mounted: function () {
            this.$store.dispatch(type_json_1.default.tooltip.add, this);
        }
    }).$mount();
    document.body.appendChild(tooltipCompVm.$el);
};
var commonVuex = new vue_1.default({
    store: store_1.default
});
/**
 * 调用 tooltip
 **/
var tooltip = function (opt) {
    if (opt === void 0) { opt = ''; }
    var option = {};
    if (typeof opt === 'string') {
        option = {
            message: opt
        };
    }
    else {
        option = opt;
    }
    var tooltipVm = commonVuex.$store.getters[type_json_1.default.tooltip.get].$refs.tooltip;
    tooltipVm.set({
        message: option.message,
        target: opt.target
    }).show();
    return tooltipVm;
};
window.addEventListener('load', function () {
    createTooltip();
});
exports.default = tooltip;
//# sourceMappingURL=tooltip.js.map