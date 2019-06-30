"use strict";
/**
 * tip 组件
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var Message_1 = __importDefault(require("./Message"));
var store_1 = __importDefault(require("../../vuex/store"));
var type_json_1 = __importDefault(require("../../vuex/module/common/type.json"));
var base_1 = __importDefault(require("../../mixin/base"));
var tiping = false;
var tipHub = [];
/**
 * 创建 tip 组件的实例
 **/
var createTip = function () {
    var tipCompVm = new vue_1.default({
        name: 'tip',
        mixins: [base_1.default],
        computed: {
            // 组件类名的前缀
            cPrefix: function () {
                return this.compPrefix + "-tip";
            }
        },
        components: {
            message: Message_1.default
        },
        store: store_1.default,
        render: function (h) {
            return h('div', {
                class: [this.cPrefix]
            }, [
                h('message', {
                    ref: 'tip'
                })
            ]);
        },
        mounted: function () {
            this.$store.dispatch(type_json_1.default.tip.add, this);
        }
    }).$mount();
    document.body.appendChild(tipCompVm.$el);
};
var commonVuex = new vue_1.default({
    store: store_1.default
});
/**
 * 调用 tip
 **/
var tip = function (opt) {
    if (opt === void 0) { opt = ''; }
    if (tiping) {
        tipHub.push(opt);
        return false;
    }
    tiping = true;
    var option = {};
    if (typeof opt === 'string') {
        option = {
            message: opt.toString()
        };
    }
    else {
        option = opt;
    }
    return commonVuex
        .$store
        .getters[type_json_1.default.tip.get]
        .$refs
        .tip
        .set({
        message: option.message,
        type: option.type,
        hideCb: function () {
            tiping = false;
            option.cb && option.cb();
            if (tipHub.length > 0) {
                return tip(tipHub.shift());
            }
        }
    })
        .show();
};
window.addEventListener('load', function () {
    createTip();
});
exports.default = tip;
//# sourceMappingURL=tip.js.map