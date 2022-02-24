

cc.Class({
    extends: cc.Component,
    properties: {
        cr: {
            default: 10,
            tooltip: "\u6D82\u62B9\u5706\u7684\u534A\u5F84"
        },
        mask: cc.Mask,
        pic: cc.Node,
        callBack: [cc.Component.EventHandler]
    },
    start: function start() {
        this._PointDic = new Array(), this._CheckDic = new Array();
        var e = this.pic.getContentSize(),
            t = e.width / this.cr,
            i = e.height / this.cr,
            n = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO),
            a = cc.Rect.fromMinMax(cc.v2(n.x - this.node.width / 2, n.y - this.node.height / 2), cc.v2(n.x + this.node.width / 2, n.y + this.node.height / 2));
        this._AllPointNum = t * i;
        for (var o = 0; o < t; o++) {
            for (var s = 0; s < i; s++) {
                var r = this.pic.x - e.width / 2 + this.cr / 2 + this.cr * o,
                    c = this.pic.y - e.height / 2 + this.cr / 2 + this.cr * s,
                    l = new cc.Vec2(r, c);
                this._PointDic.push(l), this._CheckDic.push(!1);
            }
        }
        var u = this;
        this.node.on(cc.Node.EventType.TOUCH_START, this.startClick, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.moveClick, this);
    },
    startClick(e){
        console.log('点击了startClick -----')
        var t = e.touch.getLocation();
        t = u.mask.node.convertToNodeSpaceAR(t), u._addCircle(t);
    },
    moveClick(e){
        console.log('点击了moveClick +++++++')
        var t = e.touch.getLocation();
        cc.log(a), cc.log(t), cc.log(a.contains(t)), a.contains(t) && (t = u.mask.node.convertToNodeSpaceAR(t), u._addCircle(t));
    },
    _addCircle: function _addCircle(e) {
        for (var t = 0; t < this._PointDic.length; t++) {
            var i = this._PointDic[t];
            e.sub(i).mag() < this.cr && (this._CheckDic[t] = !0);
        }
        this.mask._graphics.lineWidth = 1, this.mask._graphics.strokeColor = cc.color(255, 0, 0), this.mask._graphics.fillColor = cc.color(0, 255, 0), this.mask._graphics.circle(e.x, e.y, this.cr), this.mask._graphics.fill(), this.mask._graphics.stroke();
        for (var n = 0, a = 0; a < this._CheckDic.length; a++) {
            this._CheckDic[a] && n++;
        }
        n / this._AllPointNum > .8 && null != this.callBack && this.callBack.forEach(function (e) {
            e.emit();
        });
    }
})

/*Scratch: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "05927v/w3RO95B6rJzqIzeT", "Scratch"), cc.Class({
            extends: cc.Component,
            properties: {
                cr: {
                    default: 10,
                    tooltip: "\u6D82\u62B9\u5706\u7684\u534A\u5F84"
                },
                mask: cc.Mask,
                pic: cc.Node,
                callBack: [cc.Component.EventHandler]
            },
            start: function start() {
                this._PointDic = new Array(), this._CheckDic = new Array();
                var e = this.pic.getContentSize(),
                    t = e.width / this.cr,
                    i = e.height / this.cr,
                    n = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO),
                    a = cc.Rect.fromMinMax(cc.v2(n.x - this.node.width / 2, n.y - this.node.height / 2), cc.v2(n.x + this.node.width / 2, n.y + this.node.height / 2));
                this._AllPointNum = t * i;
                for (var o = 0; o < t; o++) {
                    for (var s = 0; s < i; s++) {
                        var r = this.pic.x - e.width / 2 + this.cr / 2 + this.cr * o,
                            c = this.pic.y - e.height / 2 + this.cr / 2 + this.cr * s,
                            l = new cc.Vec2(r, c);
                        this._PointDic.push(l), this._CheckDic.push(!1);
                    }
                }
                var u = this;
                this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
                    var t = e.touch.getLocation();
                    t = u.mask.node.convertToNodeSpaceAR(t), u._addCircle(t);
                }, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
                    var t = e.touch.getLocation();
                    cc.log(a), cc.log(t), cc.log(a.contains(t)), a.contains(t) && (t = u.mask.node.convertToNodeSpaceAR(t), u._addCircle(t));
                }, this);
            },
            _addCircle: function _addCircle(e) {
                for (var t = 0; t < this._PointDic.length; t++) {
                    var i = this._PointDic[t];
                    e.sub(i).mag() < this.cr && (this._CheckDic[t] = !0);
                }
                this.mask._graphics.lineWidth = 1, this.mask._graphics.strokeColor = cc.color(255, 0, 0), this.mask._graphics.fillColor = cc.color(0, 255, 0), this.mask._graphics.circle(e.x, e.y, this.cr), this.mask._graphics.fill(), this.mask._graphics.stroke();
                for (var n = 0, a = 0; a < this._CheckDic.length; a++) {
                    this._CheckDic[a] && n++;
                }
                n / this._AllPointNum > .8 && null != this.callBack && this.callBack.forEach(function (e) {
                    e.emit();
                });
            }
        }), 
*/