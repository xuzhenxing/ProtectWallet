

var n,
a,
o = cc._decorator,
s = o.ccclass,
r = o.property;
// (function (e) {
// e[e.Horizontal = 1] = "Horizontal", e[e.Vertical = 2] = "Vertical";
// })(n = i.Arrangement || (i.Arrangement = {})),
// function (e) {
// e[e.TopLeft = 1] = "TopLeft", e[e.Top = 2] = "Top", e[e.TopRight = 3] = "TopRight", e[e.Left = 4] = "Left", e[e.Center = 5] = "Center", e[e.Right = 6] = "Right", e[e.BottomLeft = 7] = "BottomLeft", e[e.Bottom = 8] = "Bottom", e[e.BottomRight = 9] = "BottomRight";
// }(π = i.Pivot || (i.Pivot = {}));
// LoadWay: cc.Enum({
//         Single: 0,
//         Mutil: 1,
//         Dir: 2
//     }),
var Arrangement=cc.Enum({
    Horizontal:1, 
    Vertical:2
})
var Pivot=cc.Enum({
    TopLeft: 1,
    Top: 2,
    TopRight: 3,
    Left: 4,
    Center: 5,
    Right: 6,
    BottomLeft: 7,
    Bottom: 8,
    BottomRight: 9
})
// var c = function (e) {
// function t() {
//     var t = null !== e && e.apply(this, arguments) || this;
//     return t.arrangement = Arrangement.Horizontal, t.pivot = Pivot.TopLeft, t.maxPerLine = 0, t.cellWidth = 100, t.cellHeight = 100, t.hideInactive = !1, t.mReposition = !1, t.onReposition = null, t;
// }
// return __extends(t, e), Object.defineProperty(t.prototype, "repositionNow", {
//     set: function set(e) {
//         1 == e && (this.enabled = !0, this.mReposition = !0);
//     },
//     enumerable: !0,
//     configurable: !0
// }), t.prototype.start = function () {
//     this.init(), this.reposition(), this.enabled = !1;
// }, t.prototype.init = function () {
//     this.maxPerLine = Math.floor(this.maxPerLine), this.arrangement = Math.floor(this.arrangement), this.pivot = Math.floor(this.pivot), this.arrangement > 2 ? this.arrangement = 2 : this.arrangement <= 0 && (this.arrangement = 1), this.pivot > 9 ? this.pivot = 9 : this.pivot <= 0 && (this.pivot = 1);
// }, t.prototype.update = function (e) {
//     this.reposition(), this.enabled = !1;
// }, t.prototype.getChildList = function () {
//     for (var e = this.node.childrenCount, t = [], i = 0; i < e; i++) {
//         var n = this.node.children[i];
//         (!this.hideInactive || null != n && 1 == n.active) && t.push(n);
//     }
//     return t;
// }, t.prototype.getChildByIndex = function (e) {
//     var t = this.getChildList();
//     return t.length > e ? t[e] : null;
// }, t.prototype.addChild = function (e, t) {
//     e.parent = this.node, null != t && (e.position = t);
// }, t.prototype.reposition = function () {
//     var e = this.getChildList();
//     this.resetPosition(e), null != this.onReposition && this.onReposition();
// }, t.prototype.resetPosition = function (e) {
//     this.mReposition = !1;
//     for (var t = 0, i = 0, o = 0, s = 0, r = e.length, c = 0; c < r; c++) {
//         var l = (f = e[c]).position;
//         l = this.arrangement == Arrangement.Horizontal ? new cc.Vec2(this.cellWidth * t, -this.cellHeight * i) : new cc.Vec2(this.cellWidth * i, -this.cellHeight * t), f.position = l, o = Math.max(o, t), s = Math.max(s, i), ++t >= this.maxPerLine && this.maxPerLine > 0 && (t = 0, ++i);
//     }
//     if (this.pivot != Pivot.TopLeft) {
//         var u = this.GetPivotOffset(this.pivot),
//             d = void 0,
//             h = 0;
//         this.arrangement == Arrangement.Horizontal ? (d = this.lerp(0, o * this.cellWidth, u.x), h = this.lerp(-s * this.cellHeight, 0, u.y)) : (d = this.lerp(0, s * this.cellWidth, u.x), h = this.lerp(-o * this.cellHeight, 0, u.y));
//         for (c = 0; c < r; c++) {
//             var f;
//             (l = (f = e[c]).position).x -= d, l.y -= h, f.position = l;
//         }
//     }
// }, t.prototype.getPreviewPostionByIndex = function (e) {
//     var t = 0,
//         i = 0;
//     0 != this.maxPerLine ? ((t = e / this.maxPerLine) % this.maxPerLine != 0 && (t = Math.ceil(t) - 1), (i = e % this.maxPerLine - 1) < 0 && (i = this.maxPerLine - 1)) : (t = 0, i = e - 1);
//     var o = 0,
//         s = 0;
//     this.arrangement == Arrangement.Horizontal ? (o = t, s = i) : (o = i, s = t);
//     var r = cc.v2(s * this.cellWidth, o * -this.cellHeight);
//     if (this.pivot != Pivot.TopLeft) {
//         var c = this.maxPerLine - 1,
//             l = Math.floor(this.node.children.length / this.maxPerLine);
//         0 != this.maxPerLine ? (c = this.maxPerLine - 1, l = Math.floor(this.node.children.length / this.maxPerLine)) : (c = this.getChildList().length - 1, l = 0);
//         var u = this.GetPivotOffset(this.pivot),
//             d = void 0,
//             h = 0;
//         this.arrangement == Arrangement.Horizontal ? (d = this.lerp(0, c * this.cellWidth, u.x), h = this.lerp(-l * this.cellHeight, 0, u.y)) : (d = this.lerp(0, l * this.cellWidth, u.x), h = this.lerp(-c * this.cellHeight, 0, u.y)), r.x -= d, r.y -= h;
//     }
//     return r;
// }, t.prototype.GetPivotOffset = function (e) {
//     var t = cc.Vec2.ZERO;
//     return e == Pivot.Top || e == Pivot.Center || e == Pivot.Bottom ? t.x = .5 : e == Pivot.TopRight || e == Pivot.Right || e == Pivot.BottomRight ? t.x = 1 : t.x = 0, e == Pivot.Left || e == Pivot.Center || e == Pivot.Right ? t.y = .5 : e == Pivot.TopLeft || e == Pivot.Top || e == Pivot.TopRight ? t.y = 1 : t.y = 0, t;
// }, t.prototype.lerp = function (e, t, i) {
//     var n = 0;
//     return i > 1 ? i = 1 : i < 0 && (i = 0), n = (t - e) * i, n += e;
// }, __decorate([r({
//     type: cc.Enum(Arrangement),
//     displayName: "\u6392\u5E8F\u679A\u4E3E"
// })], t.prototype, "arrangement", void 0), __decorate([r({
//     type: cc.Enum(Pivot),
//     serializable: !0,
//     displayName: "\u951A\u70B9\u679A\u4E3E"
// })], t.prototype, "pivot", void 0), __decorate([r], t.prototype, "maxPerLine", void 0), __decorate([r], t.prototype, "cellWidth", void 0), __decorate([r], t.prototype, "cellHeight", void 0), __decorate([r], t.prototype, "hideInactive", void 0), t = __decorate([s], t);
// }(cc.Component);
var c=cc.Class({
    extends: cc.Component,
    onLoad(){
        this.arrangement = Arrangement.Horizontal, 
        this.pivot = Pivot.TopLeft, 
        this.maxPerLine = 0, 
        this.cellWidth = 100, 
        this.cellHeight = 100, 
        this.hideInactive = !1, 
        this.mReposition = !1, 
        this.onReposition = null
    },
    // Object.defineProperty(t.prototype, "repositionNow", {
    //         set: function set(e) {
    //             1 == e && (this.enabled = !0, this.mReposition = !0);
    //         },
    //         enumerable: !0,
    //         configurable: !0
    //     }),
         set repositionNow(e){
            1 == e && (this.enabled = !0, this.mReposition = !0);
         },
    start () {
            this.init(), this.reposition(), this.enabled = !1;
        },
        init () {
            this.maxPerLine = Math.floor(this.maxPerLine), this.arrangement = Math.floor(this.arrangement), this.pivot = Math.floor(this.pivot), this.arrangement > 2 ? this.arrangement = 2 : this.arrangement <= 0 && (this.arrangement = 1), this.pivot > 9 ? this.pivot = 9 : this.pivot <= 0 && (this.pivot = 1);
        },
        update (e) {
            this.reposition(), this.enabled = !1;
        },
        getChildList () {
            for (var e = this.node.childrenCount, t = [], i = 0; i < e; i++) {
                var n = this.node.children[i];
                (!this.hideInactive || null != n && 1 == n.active) && t.push(n);
            }
            return t;
        },
        getChildByIndex (e) {
            var t = this.getChildList();
            return t.length > e ? t[e] : null;
        },
        addChild (e, t) {
            e.parent = this.node, null != t && (e.position = t);
        },
        reposition () {
            var e = this.getChildList();
            this.resetPosition(e), null != this.onReposition && this.onReposition();
        },
        resetPosition (e) {
            this.mReposition = !1;
            for (var t = 0, i = 0, o = 0, s = 0, r = e.length, c = 0; c < r; c++) {
                var l = (f = e[c]).position;
                l = this.arrangement == Arrangement.Horizontal ? new cc.Vec2(this.cellWidth * t, -this.cellHeight * i) : new cc.Vec2(this.cellWidth * i, -this.cellHeight * t), f.position = l, o = Math.max(o, t), s = Math.max(s, i), ++t >= this.maxPerLine && this.maxPerLine > 0 && (t = 0, ++i);
            }
            if (this.pivot != Pivot.TopLeft) {
                var u = this.GetPivotOffset(this.pivot),
                    d = void 0,
                    h = 0;
                this.arrangement == Arrangement.Horizontal ? (d = this.lerp(0, o * this.cellWidth, u.x), h = this.lerp(-s * this.cellHeight, 0, u.y)) : (d = this.lerp(0, s * this.cellWidth, u.x), h = this.lerp(-o * this.cellHeight, 0, u.y));
                for (c = 0; c < r; c++) {
                    var f;
                    (l = (f = e[c]).position).x -= d, l.y -= h, f.position = l;
                }
            }
        },
        getPreviewPostionByIndex (e) {
            var t = 0,
                i = 0;
            0 != this.maxPerLine ? ((t = e / this.maxPerLine) % this.maxPerLine != 0 && (t = Math.ceil(t) - 1), (i = e % this.maxPerLine - 1) < 0 && (i = this.maxPerLine - 1)) : (t = 0, i = e - 1);
            var o = 0,
                s = 0;
            this.arrangement == Arrangement.Horizontal ? (o = t, s = i) : (o = i, s = t);
            var r = cc.v2(s * this.cellWidth, o * -this.cellHeight);
            if (this.pivot != Pivot.TopLeft) {
                var c = this.maxPerLine - 1,
                    l = Math.floor(this.node.children.length / this.maxPerLine);
                0 != this.maxPerLine ? (c = this.maxPerLine - 1, l = Math.floor(this.node.children.length / this.maxPerLine)) : (c = this.getChildList().length - 1, l = 0);
                var u = this.GetPivotOffset(this.pivot),
                    d = void 0,
                    h = 0;
                this.arrangement == Arrangement.Horizontal ? (d = this.lerp(0, c * this.cellWidth, u.x), h = this.lerp(-l * this.cellHeight, 0, u.y)) : (d = this.lerp(0, l * this.cellWidth, u.x), h = this.lerp(-c * this.cellHeight, 0, u.y)), r.x -= d, r.y -= h;
            }
            return r;
        },
        GetPivotOffset (e) {
            var t = cc.Vec2.ZERO;
            return e == Pivot.Top || e == Pivot.Center || e == Pivot.Bottom ? t.x = .5 : e == Pivot.TopRight || e == Pivot.Right || e == Pivot.BottomRight ? t.x = 1 : t.x = 0, e == Pivot.Left || e == Pivot.Center || e == Pivot.Right ? t.y = .5 : e == Pivot.TopLeft || e == Pivot.Top || e == Pivot.TopRight ? t.y = 1 : t.y = 0, t;
        },
        lerp (e, t, i) {
            var n = 0;
            return i > 1 ? i = 1 : i < 0 && (i = 0), n = (t - e) * i, n += e;
        }
})
module.UIGrid = c

/*UIGrid: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "b0907zi4eNFZL1m1gkkO7H/", "UIGrid"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n,
            a,
            o = cc._decorator,
            s = o.ccclass,
            r = o.property;
        (function (e) {
            e[e.Horizontal = 1] = "Horizontal", e[e.Vertical = 2] = "Vertical";
        })(n = i.Arrangement || (i.Arrangement = {})),
        function (e) {
            e[e.TopLeft = 1] = "TopLeft", e[e.Top = 2] = "Top", e[e.TopRight = 3] = "TopRight", e[e.Left = 4] = "Left", e[e.Center = 5] = "Center", e[e.Right = 6] = "Right", e[e.BottomLeft = 7] = "BottomLeft", e[e.Bottom = 8] = "Bottom", e[e.BottomRight = 9] = "BottomRight";
        }(a = i.Pivot || (i.Pivot = {}));
        var c = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.arrangement = n.Horizontal, t.pivot = a.TopLeft, t.maxPerLine = 0, t.cellWidth = 100, t.cellHeight = 100, t.hideInactive = !1, t.mReposition = !1, t.onReposition = null, t;
            }
            return __extends(t, e), Object.defineProperty(t.prototype, "repositionNow", {
                set: function set(e) {
                    1 == e && (this.enabled = !0, this.mReposition = !0);
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.start = function () {
                this.init(), this.reposition(), this.enabled = !1;
            }, t.prototype.init = function () {
                this.maxPerLine = Math.floor(this.maxPerLine), this.arrangement = Math.floor(this.arrangement), this.pivot = Math.floor(this.pivot), this.arrangement > 2 ? this.arrangement = 2 : this.arrangement <= 0 && (this.arrangement = 1), this.pivot > 9 ? this.pivot = 9 : this.pivot <= 0 && (this.pivot = 1);
            }, t.prototype.update = function (e) {
                this.reposition(), this.enabled = !1;
            }, t.prototype.getChildList = function () {
                for (var e = this.node.childrenCount, t = [], i = 0; i < e; i++) {
                    var n = this.node.children[i];
                    (!this.hideInactive || null != n && 1 == n.active) && t.push(n);
                }
                return t;
            }, t.prototype.getChildByIndex = function (e) {
                var t = this.getChildList();
                return t.length > e ? t[e] : null;
            }, t.prototype.addChild = function (e, t) {
                e.parent = this.node, null != t && (e.position = t);
            }, t.prototype.reposition = function () {
                var e = this.getChildList();
                this.resetPosition(e), null != this.onReposition && this.onReposition();
            }, t.prototype.resetPosition = function (e) {
                this.mReposition = !1;
                for (var t = 0, i = 0, o = 0, s = 0, r = e.length, c = 0; c < r; c++) {
                    var l = (f = e[c]).position;
                    l = this.arrangement == n.Horizontal ? new cc.Vec2(this.cellWidth * t, -this.cellHeight * i) : new cc.Vec2(this.cellWidth * i, -this.cellHeight * t), f.position = l, o = Math.max(o, t), s = Math.max(s, i), ++t >= this.maxPerLine && this.maxPerLine > 0 && (t = 0, ++i);
                }
                if (this.pivot != a.TopLeft) {
                    var u = this.GetPivotOffset(this.pivot),
                        d = void 0,
                        h = 0;
                    this.arrangement == n.Horizontal ? (d = this.lerp(0, o * this.cellWidth, u.x), h = this.lerp(-s * this.cellHeight, 0, u.y)) : (d = this.lerp(0, s * this.cellWidth, u.x), h = this.lerp(-o * this.cellHeight, 0, u.y));
                    for (c = 0; c < r; c++) {
                        var f;
                        (l = (f = e[c]).position).x -= d, l.y -= h, f.position = l;
                    }
                }
            }, t.prototype.getPreviewPostionByIndex = function (e) {
                var t = 0,
                    i = 0;
                0 != this.maxPerLine ? ((t = e / this.maxPerLine) % this.maxPerLine != 0 && (t = Math.ceil(t) - 1), (i = e % this.maxPerLine - 1) < 0 && (i = this.maxPerLine - 1)) : (t = 0, i = e - 1);
                var o = 0,
                    s = 0;
                this.arrangement == n.Horizontal ? (o = t, s = i) : (o = i, s = t);
                var r = cc.v2(s * this.cellWidth, o * -this.cellHeight);
                if (this.pivot != a.TopLeft) {
                    var c = this.maxPerLine - 1,
                        l = Math.floor(this.node.children.length / this.maxPerLine);
                    0 != this.maxPerLine ? (c = this.maxPerLine - 1, l = Math.floor(this.node.children.length / this.maxPerLine)) : (c = this.getChildList().length - 1, l = 0);
                    var u = this.GetPivotOffset(this.pivot),
                        d = void 0,
                        h = 0;
                    this.arrangement == n.Horizontal ? (d = this.lerp(0, c * this.cellWidth, u.x), h = this.lerp(-l * this.cellHeight, 0, u.y)) : (d = this.lerp(0, l * this.cellWidth, u.x), h = this.lerp(-c * this.cellHeight, 0, u.y)), r.x -= d, r.y -= h;
                }
                return r;
            }, t.prototype.GetPivotOffset = function (e) {
                var t = cc.Vec2.ZERO;
                return e == a.Top || e == a.Center || e == a.Bottom ? t.x = .5 : e == a.TopRight || e == a.Right || e == a.BottomRight ? t.x = 1 : t.x = 0, e == a.Left || e == a.Center || e == a.Right ? t.y = .5 : e == a.TopLeft || e == a.Top || e == a.TopRight ? t.y = 1 : t.y = 0, t;
            }, t.prototype.lerp = function (e, t, i) {
                var n = 0;
                return i > 1 ? i = 1 : i < 0 && (i = 0), n = (t - e) * i, n += e;
            }, __decorate([r({
                type: cc.Enum(n),
                displayName: "\u6392\u5E8F\u679A\u4E3E"
            })], t.prototype, "arrangement", void 0), __decorate([r({
                type: cc.Enum(a),
                serializable: !0,
                displayName: "\u951A\u70B9\u679A\u4E3E"
            })], t.prototype, "pivot", void 0), __decorate([r], t.prototype, "maxPerLine", void 0), __decorate([r], t.prototype, "cellWidth", void 0), __decorate([r], t.prototype, "cellHeight", void 0), __decorate([r], t.prototype, "hideInactive", void 0), t = __decorate([s], t);
        }(cc.Component);
        i.UIGrid = c, 
*/