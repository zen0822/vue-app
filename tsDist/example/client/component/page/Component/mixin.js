"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = __importDefault(require("../../../vuex/store"));
var type_json_1 = __importDefault(require("../../../vuex/module/common/type.json"));
var util_1 = require("vue2do/src/util");
var testOpt = [];
for (var i = 0, len = 33; i < len; i++) {
    testOpt.push({
        text: 'test-' + i,
        name: 'name-' + i,
        size: 'size-' + i,
        en: 'en-' + i,
        value: i
    });
}
exports.default = {
    store: store_1.default,
    methods: {
        _initComp: function () {
        },
        anchorLink: function (name) {
            return this.$route.path + '#' + name;
        },
        goAnchor: function (evt) {
            var anchor = evt.currentTarget;
            this.compStage.scrollTop = anchor.offsetTop;
        }
    },
    computed: {
        varPrefix: function () {
            return 'VUE2DO';
        },
        testOpt: function () {
            return testOpt;
        },
        appContent: function () {
            return this.$store.getters[type_json_1.default.appContent.get];
        },
        compStage: function () {
            return this.$store.getters[type_json_1.default.compStage.get];
        },
        typeUI: function () {
            return this.$store.getters[type_json_1.default.typeUI.get];
        },
        typeTheme: function () {
            return this.$store.getters[type_json_1.default.typeTheme.get];
        },
        deviceSize: function () {
            return this.$store.getters[type_json_1.default.deviceSize];
        }
    },
    mounted: function () {
        var _this = this;
        this._initComp();
        var updateDeviceSize = function () {
            var deviceSizeEle = document.querySelector('.z-css-device-size');
            var deviceType = '';
            if (deviceSizeEle) {
                deviceType = getComputedStyle(deviceSizeEle, ':after').getPropertyValue('content');
                _this.$store.dispatch(type_json_1.default.deviceSize, deviceType);
            }
        };
        window.addEventListener('resize', util_1.debounce(updateDeviceSize, 100));
        updateDeviceSize();
    }
};
//# sourceMappingURL=mixin.js.map