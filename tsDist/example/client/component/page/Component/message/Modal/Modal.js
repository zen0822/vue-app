"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Modal.scss");
var Modal_pug_1 = __importDefault(require("./Modal.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
var index_js_1 = require("vue2do/index.js");
var home_bg_jpg_1 = __importDefault(require("exAsset/home-bg.jpg"));
exports.default = {
    name: 'PageCompModal',
    template: Modal_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test',
            homeBgImg: home_bg_jpg_1.default
        };
    },
    methods: {
        simple: function () {
            this.$refs.simple.show();
        },
        alert: function () {
            index_js_1.alert({
                message: '这是一个警告弹窗',
                theme: this.typeTheme,
                ui: this.typeUI
            });
        },
        confirm: function () {
            index_js_1.confirm({
                message: '这是一个确认弹窗',
                title: '测试确认弹出',
                theme: 'danger',
                ui: 'bootstrap'
            });
        },
        showFullPop: function () {
            this.$refs.fullPop.show();
        },
        hideFullPop: function () {
            this.$refs.fullPop.hide();
        },
        purePop: function () {
            this.$refs.purePop.show();
        }
    }
};
//# sourceMappingURL=Modal.js.map