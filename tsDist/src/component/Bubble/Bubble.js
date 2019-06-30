"use strict";
/**
 * bubble 组件
 *
 * 注意要用自定义的 bubble 的时候，bubble的所有祖父元素都不能为相对定位
 * 如果bubble有祖父元素有相对定位的，请启用 props 的 fix
 *
 * @prop width - bubble最大宽度
 * @prop target - 目标的 dom 元素
 * @prop message - bubble 信息
 * @prop display - 是否立即显示bubble
 * @prop fixed - 是否启用基于 window 的相对位置的 bubble
 * @prop hideRightNow - 马上显示和隐藏 bubble，就是纯显示的 bubble 要启用
 *
 * @slot - 主体内容
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Bubble.scss");
var Icon_1 = __importDefault(require("../Icon/Icon"));
var Bubble_render_1 = __importDefault(require("./Bubble.render"));
var base_1 = __importDefault(require("../../mixin/base"));
var MotionZoom_1 = __importDefault(require("../MotionZoom/MotionZoom"));
var prop_1 = require("../../util/dom/prop");
var ARROW_HEIGHT = 20;
exports.default = {
    name: 'Bubble',
    render: Bubble_render_1.default,
    mixins: [base_1.default],
    components: {
        icon: Icon_1.default,
        'zoom-transition': MotionZoom_1.default
    },
    props: {
        theme: {
            type: String,
            default: 'primary'
        },
        message: {
            type: String,
            default: ''
        },
        display: {
            type: Boolean,
            default: false
        },
        fixed: {
            type: Boolean,
            default: false
        },
        hideRightNow: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 0
        },
        target: {
            type: Object,
            default: null
        }
    },
    data: function () {
        this.compName = 'bubble';
        this.bubbleDisplay = false;
        this.targetDetail = {}; // 目标的信息
        return {
            stateMessage: this.message,
            stateTarget: this.target,
            mouseOnBubble: false,
            bubbleDisplayCounter: {},
            displayInterval: 800
        };
    },
    computed: {
        cPrefix: function () {
            return this.compPrefix + "-bubble";
        },
        compClass: function () {
            var _a;
            var className = [
                this.cPrefix,
                this.xclass(this.themeClass),
                (_a = {},
                    _a[this.xclass('custom')] = !this.stateMessage,
                    _a[this.xclass('fixed')] = this.fixed,
                    _a)
            ];
            return "" + className;
        }
    },
    methods: {
        _initComp: function () {
            var _this = this;
            if (this.hideRightNow) {
                this.displayInterval = 0;
            }
            this.initPoiInterval = setInterval(function () {
                _this.bubbleDisplay && _this._initPosition();
            }, 100);
        },
        _binder: function () {
            var _this = this;
            this.$refs.transition.$on('afterLeave', function () {
                _this.bubbleDisplay = false;
            });
            this.$refs.transition.$on('afterEnter', function () {
                _this.bubbleDisplay = true;
            });
        },
        _setDataOpt: function () {
            this.bubbleDisplay = this.display;
        },
        /**
         * 初始化bubble位置
         *
         * @return {Object} - 组件本身
         */
        _initPosition: function (target) {
            if (target === void 0) { target = this.stateTarget; }
            if (!target) {
                return false;
            }
            if (target.nodeType !== 1) {
                console.warn("Vue2do: props target is not a dom element on bubble component.");
                return false;
            }
            var $el = this.$el;
            var hide = getComputedStyle($el).display === 'none';
            if (hide) {
                Object.assign($el.style, {
                    visibility: 'hidden',
                    display: ''
                });
            }
            var position = prop_1.offset(target);
            var width = target.offsetWidth;
            var height = target.offsetHeight;
            if (this.targetDetail.top === position.top &&
                this.targetDetail.left === position.left &&
                this.targetDetail.width === width &&
                this.targetDetail.height === height) {
                if (hide) {
                    Object.assign($el.style, {
                        display: 'none',
                        visibility: ''
                    });
                }
                return false;
            }
            this.targetDetail = {
                top: position.top,
                left: position.left,
                width: width,
                height: height
            };
            var bubbleWidth = this.$el.offsetWidth;
            var bubbleHeight = this.$el.offsetHeight;
            Object.assign(this.$el.style, {
                top: position.top + height + ARROW_HEIGHT / 2 + 'px',
                left: position.left - bubbleWidth / 2 + width / 2 + 'px'
            });
            if (hide) {
                Object.assign($el.style, {
                    display: 'none',
                    visibility: ''
                });
            }
        },
        /**
         * 显示bubble
         * @return {Functio} - 初始化bubble位置
         */
        show: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.bubbleDisplay) {
                                return [2 /*return*/, this];
                            }
                            clearTimeout(this.bubbleDisplayCounter);
                            return [4 /*yield*/, this.$nextTick(function () {
                                    _this._initPosition();
                                    _this.$refs.transition.enter();
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this];
                    }
                });
            });
        },
        /**
         * 隐藏bubble
         * @return {Object} - 组件本身
         */
        hide: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            clearTimeout(this.bubbleDisplayCounter);
                            return [4 /*yield*/, this.$refs.transition.leave()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    return resolve();
                                })];
                    }
                });
            });
        },
        /**
         * 获取bubble的信息
         * @return {Object, String}
         **/
        info: function (text) {
            if (text !== undefined) {
                this.message = text;
                return this;
            }
            return this.message;
        },
        /**
         * 鼠标在bubble上面触发的函数
         **/
        mouseOver: function () {
            this.mouseOnBubble = true;
            clearTimeout(this.bubbleDisplayCounter);
        },
        /**
         * 鼠标离开bubble触发的函数
         **/
        mouseLeave: function () {
            this.mouseOnBubble = false;
            this.setTimeoutBubbleDisplay();
        },
        /**
         * 点击
         */
        click: function (event) {
            return event.stopPropagation();
        },
        /**
         * 延迟隐藏
         **/
        delayHide: function () {
            var _this = this;
            this.bubbleDisplayCounter = setTimeout(function () {
                _this.hide();
            }, this.displayInterval);
        },
        /**
         * 设置相关的属性
         */
        set: function (_a) {
            var _b = _a === void 0 ? {} : _a, message = _b.message, target = _b.target;
            this.stateMessage = message;
            this.stateTarget = target;
            return this;
        }
    },
    destroyed: function () {
        clearInterval(this.initPoiInterval);
    }
};
//# sourceMappingURL=Bubble.js.map