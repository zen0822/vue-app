"use strict";
/**
 * toast 底部提示组件
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
var toasting = false;
var toastHub = [];
/**
 * 创建 toast 组件的实例
 **/
var createToast = function () {
    var toastCompVm = new vue_1.default({
        name: 'toast',
        mixins: [base_1.default],
        computed: {
            cPrefix: function () {
                return this.compPrefix + "-toast";
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
                    props: {
                        position: 'bottom'
                    },
                    ref: 'toast'
                })
            ]);
        },
        mounted: function () {
            this.$store.dispatch(type_json_1.default.toast.add, this);
        }
    }).$mount();
    document.body.appendChild(toastCompVm.$el);
};
var commonVuex = new vue_1.default({
    store: store_1.default
});
/**
 * 调用 toast
 **/
var toast = function (opt) {
    if (opt === void 0) { opt = {}; }
    if (toasting) {
        toastHub.push(opt);
        return false;
    }
    toasting = true;
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
        .getters[type_json_1.default.toast.get]
        .$refs
        .toast
        .set({
        message: option.message,
        type: option.type,
        hideCb: function () {
            toasting = false;
            option.cb && option.cb();
            if (toastHub.length > 0) {
                return toast(toastHub.shift());
            }
        }
    })
        .show();
};
window.addEventListener('load', function () {
    createToast();
});
exports.default = toast;
//# sourceMappingURL=toast.js.map