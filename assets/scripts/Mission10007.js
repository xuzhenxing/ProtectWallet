

 cc.Class({
    extends: cc.Component,
    properties: {
        target: [cc.Node],
        rightTarget: [cc.Node],
        ErrorCallBack: [cc.Component.EventHandler],
        Time: cc.Integer = 2,
        MoveTime: cc.Integer = 1,
        Distance: cc.Integer = 100
    },
    start: function start() {
        this.targetPos = new Array(), this._boolOpenRight = !1;
        for (var e = 0; e < this.target.length; e++) {
            this.targetPos.push(this.target[e].position);
        }
        this.GapTime = 0, this.BeginTouch = !1, this._beginLocation = null, this.node.on(cc.Node.EventType.TOUCH_START,this.startClick, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.cancelClick, this), this.node.on(cc.Node.EventType.TOUCH_END, this.endClick, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.moveClick, this);
    },
    startClick(e){
        console.log('点击Mission10007   startClick')
        this._beginLocation = e.currentTouch.getLocation(), this.BeginTouch = !0, this.GapTime = 0;
    },
    cancelClick(e){
        console.log('点击Mission10007   cancelClick')
        this.BeginTouch = !1, this.GapTime = 0, this.rightTarget.forEach(function (e) {
            e.active = !1;
        }), this._boolOpenRight = !1, null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (t) {
            t.emit([e]);
        });
    },
    endClick(e){
        console.log('点击Mission10007   endClick')
        this.BeginTouch = !1, this.GapTime = 0, this.rightTarget.forEach(function (e) {
            e.active = !1;
        }), this._boolOpenRight = !1, null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (t) {
            t.emit([e]);
        });
    },
    moveClick(e){
        console.log('点击Mission10007   moveClick')
        this._beginLocation = e.currentTouch.getLocation();
    },
    update: function update(e) {
        if (this.BeginTouch)
            if (this.GapTime += e, this.GapTime > this.Time + this.MoveTime) {
                if (this._boolOpenRight) return;
                this._boolOpenRight = !0, this.rightTarget.forEach(function (e) {
                    e.active = !0;
                });
            } else if (this.GapTime > this.Time)
            for (var t = this.node.convertToNodeSpaceAR(this._beginLocation), i = 0; i < this.target.length; i++) {
                var n = this.target[i];
                n.active && (t.x > 0 ? n.position = this.targetPos[i].lerp(new cc.Vec3(t.x - this.Distance, t.y, 0), (this.GapTime - this.Time) / this.MoveTime) : n.position = this.targetPos[i].lerp(new cc.Vec3(t.x + this.Distance, t.y, 0), (this.GapTime - this.Time) / this.MoveTime));
            }
    }
})

/*Mission10007: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "dcb5a29aCZEK57SWff0wLY/", "Mission10007"), cc.Class({
            extends: cc.Component,
            properties: {
                target: [cc.Node],
                rightTarget: [cc.Node],
                ErrorCallBack: [cc.Component.EventHandler],
                Time: cc.Integer = 2,
                MoveTime: cc.Integer = 1,
                Distance: cc.Integer = 100
            },
            start: function start() {
                this.targetPos = new Array(), this._boolOpenRight = !1;
                for (var e = 0; e < this.target.length; e++) {
                    this.targetPos.push(this.target[e].position);
                }
                this.GapTime = 0, this.BeginTouch = !1, this._beginLocation = null, this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
                    this._beginLocation = e.currentTouch.getLocation(), this.BeginTouch = !0, this.GapTime = 0;
                }, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
                    this.BeginTouch = !1, this.GapTime = 0, this.rightTarget.forEach(function (e) {
                        e.active = !1;
                    }), this._boolOpenRight = !1, null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (t) {
                        t.emit([e]);
                    });
                }, this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
                    this.BeginTouch = !1, this.GapTime = 0, this.rightTarget.forEach(function (e) {
                        e.active = !1;
                    }), this._boolOpenRight = !1, null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (t) {
                        t.emit([e]);
                    });
                }, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
                    this._beginLocation = e.currentTouch.getLocation();
                }, this);
            },
            update: function update(e) {
                if (this.BeginTouch)
                    if (this.GapTime += e, this.GapTime > this.Time + this.MoveTime) {
                        if (this._boolOpenRight) return;
                        this._boolOpenRight = !0, this.rightTarget.forEach(function (e) {
                            e.active = !0;
                        });
                    } else if (this.GapTime > this.Time)
                    for (var t = this.node.convertToNodeSpaceAR(this._beginLocation), i = 0; i < this.target.length; i++) {
                        var n = this.target[i];
                        n.active && (t.x > 0 ? n.position = this.targetPos[i].lerp(new cc.Vec3(t.x - this.Distance, t.y, 0), (this.GapTime - this.Time) / this.MoveTime) : n.position = this.targetPos[i].lerp(new cc.Vec3(t.x + this.Distance, t.y, 0), (this.GapTime - this.Time) / this.MoveTime));
                    }
            }
        }), 
*/