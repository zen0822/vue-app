"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./About.scss");
var About_pug_1 = __importDefault(require("./About.pug"));
var mixin_1 = __importDefault(require("../Component/mixin"));
exports.default = {
    name: 'PageAbout',
    template: About_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {};
    },
    computed: {
        selectOpt: function () {
            this.testOpt.unshift({
                value: -1,
                text: '请选择'
            });
            return this.testOpt;
        }
    }
};
//# sourceMappingURL=About.js.map