var n = require("UIGrid");
var r=cc.Class({
    extends: cc.Component,
    properties: {
        uiGrid : n, 
        scrowView:cc.ScrollView, 
        mask:cc.Mask, 
        origiItem:cc.Node, 
        itemCount : 0, 
        rows : 1, 
        columns : 1, 
        dataCount : 0
    },
    
    InitScroll () {
        this.initObj(), this.initMoveEvent(), this.initMaskCornerLocalPos(), this.initItems();
    }, 
    initObj () {
        this.cellHeight = this.uiGrid.cellHeight, this.cellWidth = this.uiGrid.cellWidth, this.maxPerLine = this.uiGrid.maxPerLine, this.maskSize = this.scrowView.node.getContentSize(), this.uiGrid.pivot = n.Pivot.TopLeft, 1 != this.scrowView.horizontal || 1 != this.scrowView.vertical ? 1 == this.scrowView.horizontal ? (this.uiGrid.arrangement = n.Arrangement.Vertical, this.rows = this.maxPerLine, this.columns = this.itemCount / this.maxPerLine, this.extents = this.columns * this.cellWidth * .5) : (this.uiGrid.arrangement = n.Arrangement.Horizontal, this.columns = this.maxPerLine, this.rows = this.itemCount / this.maxPerLine, this.extents = this.rows * this.cellHeight * .5) : console.error("\u65E0\u9650\u6ED1\u52A8\u7EC4\u4EF6\u4E0D\u652F\u6301\u4E0A\u4E0B\u5DE6\u53F3\u4E00\u8D77\u6ED1\u52A8");
    }, 
    convertCornerPosToContentSpace (e) {
        cc.Vec2.ZERO;
        var t = this.scrowView.content,
            i = this.mask.node.parent.convertToWorldSpaceAR(e);
        return t.convertToNodeSpaceAR(i);
    }, 
    initData (e, t) {
        this.InitScroll(), null == t && console.warn("\u65E0\u9650\u6ED1\u52A8\u7EC4\u4EF6\u6E32\u67D3\u56DE\u8C03\u6CA1\u6709\u6CE8\u518C\u4E8B\u4EF6"), this.onRenderItem = t, this.dataCount = e, this.onInitDatas();
    }, 
    onInitDatas () {
        null == this.cacheContentPos ? this.cacheContentPos = this.scrowView.content.position : (this.scrowView.scrollToOffset(cc.Vec2.ZERO), this.uiGrid.reposition(), this.scrowView.content.position = this.cacheContentPos);
        for (var e = 0; e < this.itemCount; e++) {
            var t = this.items[e],
                i = e < this.dataCount;
            t.active = i, 1 == i && this.updateItem(e, e, t);
        }
    }, 
    initItems () {
        this.items = [];
        for (var e = 0; e < this.itemCount; e++) {
            var t = cc.instantiate(this.origiItem);
            t.name = t.name + "_" + e, this.items.push(t), this.uiGrid.addChild(t);
        }
        this.uiGrid.repositionNow = !0;
    }, 
    initMoveEvent () {
        var e = new cc.Component.EventHandler();
        e.handler = "onScrowMove", e.component = "LoopScrow", e.target = this.node, this.scrowView.scrollEvents.push(e);
    }, 
    initMaskCornerLocalPos () {
        var e = .5 * this.maskSize.height,
            t = .5 * this.maskSize.width,
            i = this.mask.node.position.x - t,
            n = i + this.maskSize.width,
            a = this.mask.node.position.y - e,
            o = a + this.maskSize.height;
        this.rightUpLocalPos = cc.v2(n, o), this.leftDownLocalPos = cc.v2(i, a), this.centerLocalPos = this.rightUpLocalPos.add(this.leftDownLocalPos), this.centerLocalPos.x = .5 * this.centerLocalPos.x, this.centerLocalPos.y = .5 * this.centerLocalPos.y;
    }, 
    getMaskCenterWorldPos () {
        this.centerPos = this.convertCornerPosToContentSpace(this.centerLocalPos);
    }, 
    onScrowMove () {
        this.getMaskCenterWorldPos();
        var e = null,
            t = 0,
            i = 0,
            n = null;
        if (1 == this.scrowView.vertical)
            for (var a = 0; a < this.itemCount; a++) {
                t = (e = this.items[a]).position.y - this.centerPos.y, i = 0, n = e.position, (t < -this.extents || t > this.extents) && (t < -this.extents ? n.y += 2 * this.extents : n.y -= 2 * this.extents, (i = this.getDataIndexByItemPos(n)) >= 0 && i < this.dataCount && (e.position = n, this.updateItem(a, i, e)));
            } else
                for (a = 0; a < this.itemCount; a++) {
                    t = (e = this.items[a]).position.x - this.centerPos.x, i = 0, n = e.position, (t < -this.extents || t > this.extents) && (t < -this.extents ? n.x += 2 * this.extents : n.x -= 2 * this.extents, (i = this.getDataIndexByItemPos(n)) >= 0 && i < this.dataCount && (e.position = n, this.updateItem(a, i, e)));
                }
    }, 
    updateItem (e, t, i) {
        null != this.onRenderItem && this.onRenderItem(e, t, i);
    }, 
    getDataIndexByItemPos (e) {
        var t = e.x / this.cellWidth,
            i = -e.y / this.cellHeight;
        return this.uiGrid.arrangement == n.Arrangement.Horizontal ? t + i * this.maxPerLine : i + t * this.maxPerLine;
    }
})
// module.exports = r

/*LoopScrow: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "3b7a9zDms1FMbNOb74Yd/Op", "LoopScrow"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = e("./UIGrid"),
            a = cc._decorator,
            o = a.ccclass,
            s = a.property,
            r = function (e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.uiGrid = null, t.scrowView = null, t.mask = null, t.origiItem = null, t.itemCount = 0, t.rows = 1, t.columns = 1, t.dataCount = 0, t;
                }
                return __extends(t, e), t.prototype.InitScroll = function () {
                    this.initObj(), this.initMoveEvent(), this.initMaskCornerLocalPos(), this.initItems();
                }, t.prototype.initObj = function () {
                    this.cellHeight = this.uiGrid.cellHeight, this.cellWidth = this.uiGrid.cellWidth, this.maxPerLine = this.uiGrid.maxPerLine, this.maskSize = this.scrowView.node.getContentSize(), this.uiGrid.pivot = n.Pivot.TopLeft, 1 != this.scrowView.horizontal || 1 != this.scrowView.vertical ? 1 == this.scrowView.horizontal ? (this.uiGrid.arrangement = n.Arrangement.Vertical, this.rows = this.maxPerLine, this.columns = this.itemCount / this.maxPerLine, this.extents = this.columns * this.cellWidth * .5) : (this.uiGrid.arrangement = n.Arrangement.Horizontal, this.columns = this.maxPerLine, this.rows = this.itemCount / this.maxPerLine, this.extents = this.rows * this.cellHeight * .5) : console.error("\u65E0\u9650\u6ED1\u52A8\u7EC4\u4EF6\u4E0D\u652F\u6301\u4E0A\u4E0B\u5DE6\u53F3\u4E00\u8D77\u6ED1\u52A8");
                }, t.prototype.convertCornerPosToContentSpace = function (e) {
                    cc.Vec2.ZERO;
                    var t = this.scrowView.content,
                        i = this.mask.node.parent.convertToWorldSpaceAR(e);
                    return t.convertToNodeSpaceAR(i);
                }, t.prototype.initData = function (e, t) {
                    this.InitScroll(), null == t && console.warn("\u65E0\u9650\u6ED1\u52A8\u7EC4\u4EF6\u6E32\u67D3\u56DE\u8C03\u6CA1\u6709\u6CE8\u518C\u4E8B\u4EF6"), this.onRenderItem = t, this.dataCount = e, this.onInitDatas();
                }, t.prototype.onInitDatas = function () {
                    null == this.cacheContentPos ? this.cacheContentPos = this.scrowView.content.position : (this.scrowView.scrollToOffset(cc.Vec2.ZERO), this.uiGrid.reposition(), this.scrowView.content.position = this.cacheContentPos);
                    for (var e = 0; e < this.itemCount; e++) {
                        var t = this.items[e],
                            i = e < this.dataCount;
                        t.active = i, 1 == i && this.updateItem(e, e, t);
                    }
                }, t.prototype.initItems = function () {
                    this.items = [];
                    for (var e = 0; e < this.itemCount; e++) {
                        var t = cc.instantiate(this.origiItem);
                        t.name = t.name + "_" + e, this.items.push(t), this.uiGrid.addChild(t);
                    }
                    this.uiGrid.repositionNow = !0;
                }, t.prototype.initMoveEvent = function () {
                    var e = new cc.Component.EventHandler();
                    e.handler = "onScrowMove", e.component = "LoopScrow", e.target = this.node, this.scrowView.scrollEvents.push(e);
                }, t.prototype.initMaskCornerLocalPos = function () {
                    var e = .5 * this.maskSize.height,
                        t = .5 * this.maskSize.width,
                        i = this.mask.node.position.x - t,
                        n = i + this.maskSize.width,
                        a = this.mask.node.position.y - e,
                        o = a + this.maskSize.height;
                    this.rightUpLocalPos = cc.v2(n, o), this.leftDownLocalPos = cc.v2(i, a), this.centerLocalPos = this.rightUpLocalPos.add(this.leftDownLocalPos), this.centerLocalPos.x = .5 * this.centerLocalPos.x, this.centerLocalPos.y = .5 * this.centerLocalPos.y;
                }, t.prototype.getMaskCenterWorldPos = function () {
                    this.centerPos = this.convertCornerPosToContentSpace(this.centerLocalPos);
                }, t.prototype.onScrowMove = function () {
                    this.getMaskCenterWorldPos();
                    var e = null,
                        t = 0,
                        i = 0,
                        n = null;
                    if (1 == this.scrowView.vertical)
                        for (var a = 0; a < this.itemCount; a++) {
                            t = (e = this.items[a]).position.y - this.centerPos.y, i = 0, n = e.position, (t < -this.extents || t > this.extents) && (t < -this.extents ? n.y += 2 * this.extents : n.y -= 2 * this.extents, (i = this.getDataIndexByItemPos(n)) >= 0 && i < this.dataCount && (e.position = n, this.updateItem(a, i, e)));
                        } else
                            for (a = 0; a < this.itemCount; a++) {
                                t = (e = this.items[a]).position.x - this.centerPos.x, i = 0, n = e.position, (t < -this.extents || t > this.extents) && (t < -this.extents ? n.x += 2 * this.extents : n.x -= 2 * this.extents, (i = this.getDataIndexByItemPos(n)) >= 0 && i < this.dataCount && (e.position = n, this.updateItem(a, i, e)));
                            }
                }, t.prototype.updateItem = function (e, t, i) {
                    null != this.onRenderItem && this.onRenderItem(e, t, i);
                }, t.prototype.getDataIndexByItemPos = function (e) {
                    var t = e.x / this.cellWidth,
                        i = -e.y / this.cellHeight;
                    return this.uiGrid.arrangement == n.Arrangement.Horizontal ? t + i * this.maxPerLine : i + t * this.maxPerLine;
                }, __decorate([s({
                    displayName: "\u6392\u5E8F\u7EC4\u4EF6UIGrid",
                    type: n.UIGrid
                })], t.prototype, "uiGrid", void 0), __decorate([s({
                    displayName: "\u6ED1\u52A8\u7EC4\u4EF6ScrollView",
                    type: cc.ScrollView
                })], t.prototype, "scrowView", void 0), __decorate([s({
                    displayName: "\u906E\u7F69mask",
                    type: cc.Mask
                })], t.prototype, "mask", void 0), __decorate([s({
                    displayName: "\u751F\u6210\u7684origiItem",
                    type: cc.Node
                })], t.prototype, "origiItem", void 0), __decorate([s], t.prototype, "itemCount", void 0), t = __decorate([o], t);
            }(cc.Component);
        i.default = r, 
*/