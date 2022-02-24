

cc.Class({
    extends: cc.Component,
    properties: {
        callBack: [cc.Component.EventHandler],
        StartCall: [cc.Component.EventHandler],
        canMove: cc.Boolean = !0
    },
    start: function start() {
        this.BeginPos = cc.Vec2.ZERO, this.node.on(cc.Node.EventType.TOUCH_START, this.startClick, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.moveClick, this), this.node.on(cc.Node.EventType.TOUCH_END, this.endClick, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.cancelClick, this);
    },
    startClick(e){
        console.log('点击Move   startClick')
        var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
        this.BeginPos = this.node.parent.convertToNodeSpaceAR(t), null != this.StartCall && this.StartCall.forEach(function (t) {
            t.emit([e]);
        });
    },
    moveClick(){
        console.log('点击Move   moveClick')
        if (0 != this.canMove) {
            var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
            t = this.node.parent.convertToNodeSpaceAR(t), this.node.x += t.x - this.BeginPos.x, this.node.y += t.y - this.BeginPos.y, this.BeginPos = t;
        } else cc.log("cant move");
    },
    endClick(){
        console.log('点击Move   endClick')
        null != this.callBack && this.callBack.forEach(function (t) {
            t.emit([e]);
        });
    },
    cancelClick(){
        console.log('点击Move   cancelClick')
        null != this.callBack && this.callBack.forEach(function (t) {
            t.emit([e]);
        });
    },
    // SetBegin: function SetBegin(e) {
    //     var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
    //     this.BeginPos = this.node.parent.convertToNodeSpaceAR(t), null != this.StartCall && this.StartCall.forEach(function (t) {
    //         t.emit([e]);
    //     });
    // },
    // mouseFun: function mouseFun(e) {
    //     if (0 != this.canMove) {
    //         var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
    //         t = this.node.parent.convertToNodeSpaceAR(t), this.node.x += t.x - this.BeginPos.x, this.node.y += t.y - this.BeginPos.y, this.BeginPos = t;
    //     } else cc.log("cant move");
    // },
    CanMove: function CanMove() {
        cc.log("canmove"), this.canMove = !0;
    },
    NotMove: function NotMove() {
        cc.log("notmove"), this.canMove = !1;
    }
})

/*Move: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "017e1POltRHe6YnD7jg1IKO", "Move"), cc.Class({
            extends: cc.Component,
            properties: {
                callBack: [cc.Component.EventHandler],
                StartCall: [cc.Component.EventHandler],
                canMove: cc.Boolean = !0
            },
            start: function start() {
                this.BeginPos = cc.Vec2.ZERO, this.node.on(cc.Node.EventType.TOUCH_START, this.SetBegin, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.mouseFun, this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
                    null != this.callBack && this.callBack.forEach(function (t) {
                        t.emit([e]);
                    });
                }, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
                    null != this.callBack && this.callBack.forEach(function (t) {
                        t.emit([e]);
                    });
                }, this);
            },
            SetBegin: function SetBegin(e) {
                var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
                this.BeginPos = this.node.parent.convertToNodeSpaceAR(t), null != this.StartCall && this.StartCall.forEach(function (t) {
                    t.emit([e]);
                });
            },
            mouseFun: function mouseFun(e) {
                if (0 != this.canMove) {
                    var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
                    t = this.node.parent.convertToNodeSpaceAR(t), this.node.x += t.x - this.BeginPos.x, this.node.y += t.y - this.BeginPos.y, this.BeginPos = t;
                } else cc.log("cant move");
            },
            CanMove: function CanMove() {
                cc.log("canmove"), this.canMove = !0;
            },
            NotMove: function NotMove() {
                cc.log("notmove"), this.canMove = !1;
            }
        }), 
*/