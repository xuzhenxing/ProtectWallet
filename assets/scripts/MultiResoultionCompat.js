

// var n = cc._decorator,
// a = n.ccclass,
// o = (n.property, function (e) {
//     function t() {
//         return null !== e && e.apply(this, arguments) || this;
//     }
//     var i;
//     return __extends(t, e), i = t, t.prototype.onLoad = function () {
//         cc.view.setDesignResolutionSize(i.DEFAULT_RESOLUTION_WIDTH, i.DEFAULT_RESOLUTION_HEIGHT, cc.ResolutionPolicy.SHOW_ALL);
//     }, t.getShowAllModeScale = function () {
//         return Math.min(cc.view.getCanvasSize().width / this.DEFAULT_RESOLUTION_WIDTH, cc.view.getCanvasSize().height / this.DEFAULT_RESOLUTION_HEIGHT);
//     }, t.getShowAllModeRealHeight = function () {
//         return this.DEFAULT_RESOLUTION_HEIGHT * this.getShowAllModeScale();
//     }, t.getShowAllModeRealWidth = function () {
//         return this.DEFAULT_RESOLUTION_WIDTH * this.getShowAllModeScale();
//     }, t.getShowAllModeVerticalBorderHeight = function () {
//         return cc.view.getCanvasSize().height - this.getShowAllModeRealHeight();
//     }, t.getShowAllModeHorizontalBorderWidth = function () {
//         return cc.view.getCanvasSize().width - this.getShowAllModeRealWidth();
//     }, t.getShowAllModeNodePositionCloseToBottom = function (e) {
//         var t = i.getShowAllModeScale(),
//             n = i.getShowAllModeVerticalBorderHeight() / 2,
//             a = (e.y * t - n) / t;
//         return cc.v2(e.x, a);
//     }, t.convertNodePosInDesignToNodePosInCanvas = function (e) {
//         return e.sub(cc.v2(this.getShowAllModeScale(), this.getShowAllModeScale()));
//     }, t.convertNodePosInCanvasToNodePosInDesign = function (e) {
//         return e.div(cc.v2(this.getShowAllModeScale(), this.getShowAllModeScale()));
//     }, t.convertWidthInDesignToWidthInCanvas = function (e) {
//         return e * this.getShowAllModeScale();
//     }, t.convertWidthInCanvasToWidthInDesign = function (e) {
//         return e / this.getShowAllModeScale();
//     }, t.convertHeightInDesignToHeightInCanvas = function (e) {
//         return e * this.getShowAllModeScale();
//     }, t.convertHeightInCanvasToHeightInDesign = function (e) {
//         return e / this.getShowAllModeScale();
//     }, t.DEFAULT_RESOLUTION_WIDTH = 720, t.DEFAULT_RESOLUTION_HEIGHT = 1280, t = i = __decorate([a], t);
// }(cc.Component))
var o=cc.Class({
    extends: cc.Component,
    properties: {
        DEFAULT_RESOLUTION_WIDTH : 720,
        DEFAULT_RESOLUTION_HEIGHT : 1280
    },
    onLoad () {
        cc.view.setDesignResolutionSize(i.DEFAULT_RESOLUTION_WIDTH, i.DEFAULT_RESOLUTION_HEIGHT, cc.ResolutionPolicy.SHOW_ALL);
    }, 
    getShowAllModeScale () {
        return Math.min(cc.view.getCanvasSize().width / this.DEFAULT_RESOLUTION_WIDTH, cc.view.getCanvasSize().height / this.DEFAULT_RESOLUTION_HEIGHT);
    }, 
    getShowAllModeRealHeight () {
        return this.DEFAULT_RESOLUTION_HEIGHT * this.getShowAllModeScale();
    }, 
    getShowAllModeRealWidth () {
        return this.DEFAULT_RESOLUTION_WIDTH * this.getShowAllModeScale();
    }, 
    getShowAllModeVerticalBorderHeight () {
        return cc.view.getCanvasSize().height - this.getShowAllModeRealHeight();
    }, 
    getShowAllModeHorizontalBorderWidth () {
        return cc.view.getCanvasSize().width - this.getShowAllModeRealWidth();
    }, 
    getShowAllModeNodePositionCloseToBottom (e) {
        var t = i.getShowAllModeScale(),
            n = i.getShowAllModeVerticalBorderHeight() / 2,
            a = (e.y * t - n) / t;
        return cc.v2(e.x, a);
    }, 
    convertNodePosInDesignToNodePosInCanvas (e) {
        return e.sub(cc.v2(this.getShowAllModeScale(), this.getShowAllModeScale()));
    }, 
    convertNodePosInCanvasToNodePosInDesign (e) {
        return e.div(cc.v2(this.getShowAllModeScale(), this.getShowAllModeScale()));
    }, 
    convertWidthInDesignToWidthInCanvas (e) {
        return e * this.getShowAllModeScale();
    }, 
    convertWidthInCanvasToWidthInDesign (e) {
        return e / this.getShowAllModeScale();
    }, 
    convertHeightInDesignToHeightInCanvas (e) {
        return e * this.getShowAllModeScale();
    }, 
    convertHeightInCanvasToHeightInDesign (e) {
        return e / this.getShowAllModeScale();
    }
})
module = o

/*MultiResoultionCompat: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "a1ebdl70ixLCrxB0dkC4zAW", "MultiResoultionCompat"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            a = n.ccclass,
            o = (n.property, function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                var i;
                return __extends(t, e), i = t, t.prototype.onLoad = function () {
                    cc.view.setDesignResolutionSize(i.DEFAULT_RESOLUTION_WIDTH, i.DEFAULT_RESOLUTION_HEIGHT, cc.ResolutionPolicy.SHOW_ALL);
                }, t.getShowAllModeScale = function () {
                    return Math.min(cc.view.getCanvasSize().width / this.DEFAULT_RESOLUTION_WIDTH, cc.view.getCanvasSize().height / this.DEFAULT_RESOLUTION_HEIGHT);
                }, t.getShowAllModeRealHeight = function () {
                    return this.DEFAULT_RESOLUTION_HEIGHT * this.getShowAllModeScale();
                }, t.getShowAllModeRealWidth = function () {
                    return this.DEFAULT_RESOLUTION_WIDTH * this.getShowAllModeScale();
                }, t.getShowAllModeVerticalBorderHeight = function () {
                    return cc.view.getCanvasSize().height - this.getShowAllModeRealHeight();
                }, t.getShowAllModeHorizontalBorderWidth = function () {
                    return cc.view.getCanvasSize().width - this.getShowAllModeRealWidth();
                }, t.getShowAllModeNodePositionCloseToBottom = function (e) {
                    var t = i.getShowAllModeScale(),
                        n = i.getShowAllModeVerticalBorderHeight() / 2,
                        a = (e.y * t - n) / t;
                    return cc.v2(e.x, a);
                }, t.convertNodePosInDesignToNodePosInCanvas = function (e) {
                    return e.sub(cc.v2(this.getShowAllModeScale(), this.getShowAllModeScale()));
                }, t.convertNodePosInCanvasToNodePosInDesign = function (e) {
                    return e.div(cc.v2(this.getShowAllModeScale(), this.getShowAllModeScale()));
                }, t.convertWidthInDesignToWidthInCanvas = function (e) {
                    return e * this.getShowAllModeScale();
                }, t.convertWidthInCanvasToWidthInDesign = function (e) {
                    return e / this.getShowAllModeScale();
                }, t.convertHeightInDesignToHeightInCanvas = function (e) {
                    return e * this.getShowAllModeScale();
                }, t.convertHeightInCanvasToHeightInDesign = function (e) {
                    return e / this.getShowAllModeScale();
                }, t.DEFAULT_RESOLUTION_WIDTH = 720, t.DEFAULT_RESOLUTION_HEIGHT = 1280, t = i = __decorate([a], t);
            }(cc.Component));
        i.default = o, 
*/