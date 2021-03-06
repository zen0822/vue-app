"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var vue_i18n_1 = __importDefault(require("vue-i18n"));
var apollo_boost_1 = __importDefault(require("apollo-boost"));
var vue_apollo_1 = __importDefault(require("vue-apollo"));
var router_1 = require("./router");
var App_1 = __importDefault(require("./App/App"));
var vue2do_1 = __importDefault(require("vue2do"));
var en_US_json_1 = __importDefault(require("src/language/en-US.json"));
vue_1.default.use(vue_i18n_1.default);
vue_1.default.use(vue_apollo_1.default);
vue_1.default.use(vue2do_1.default, {
    prefix: 'z'
});
var vue2doLang = new vue_i18n_1.default({
    locale: Object.keys(en_US_json_1.default)[0],
    messages: en_US_json_1.default
});
var apolloProvider = new vue_apollo_1.default({
    defaultClient: new apollo_boost_1.default({
        uri: 'http://localhost:5168/gql'
    })
});
function createApp() {
    var router = router_1.createRouter();
    router.beforeEach(function (to, from, next) {
        document.title = to.meta.title;
        next();
    });
    var app = new vue_1.default(__assign({}, App_1.default, { apolloProvider: apolloProvider, i18n: vue2doLang, router: router }));
    return {
        app: app,
        router: router
    };
}
exports.createApp = createApp;
//# sourceMappingURL=app.js.map