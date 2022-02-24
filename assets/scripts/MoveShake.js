

 cc.Class({
    extends: cc.Component,
    properties: {
        time: cc.Integer,
        Distance: cc.Integer = 200,
        SuccessCallBack: [cc.Component.EventHandler]
    },
    onLoad: function onLoad() {
        this.lastTimer = !1, this.CheckUpdate = !1, this._Timer = 0, this.node.on(cc.Node.EventType.TOUCH_START,this.startClick, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.moveClick, this), this.node.on(cc.Node.EventType.TOUCH_END, this.endClick, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.cancelClick, this);
    },
    startClick(e){
        console.log('点击MoveShake   startClick')
        this.CheckUpdate = !0, this._Timer = 0;
        var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
        this.BeginPos = this.node.parent.convertToNodeSpaceAR(t), null != this.StartCall && this.StartCall.forEach(function (t) {
            t.emit([e]);
        });
        //  this.SetBegin(e);
    },
    moveClick(e){
        console.log('点击MoveShake   moveClick')
        if (0 != this.canMove) {
            var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
            t = this.node.parent.convertToNodeSpaceAR(t), this.node.x += t.x - this.BeginPos.x, this.node.y += t.y - this.BeginPos.y, this.BeginPos = t;
        } else cc.log("cant move");
        // this.mouseFun(e);
    },
    endClick(e){
        console.log('点击MoveShake   endClick')
        this.CheckUpdate = !1, this._Timer = 0;
    },
    cancelClick(e){
        console.log('点击MoveShake   cancelClick')
        this.CheckUpdate = !1, this._Timer = 0;
    },
    update: function update() {
        this.CheckUpdate && (cc.log("check"), this.lastTimer ? this.node.position.x < -this.Distance && (this.lastTimer = !1, this._Timer++, console.log("Change" + this._Timer), this._Timer > this.time && (this.CheckUpdate = !1, null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (e) {
            e.emit();
        }))) : this.node.position.x > this.Distance && (this.lastTimer = !0, this._Timer++, console.log("Change" + this._Timer), this._Timer > this.time && (this.CheckUpdate = !1, null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (e) {
            e.emit();
        }))));
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
    // }
})

/*MoveShake: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "b4481zA8AZN2KBBuknzbuO2", "MoveShake"), cc.Class({
            extends: cc.Component,
            properties: {
                time: cc.Integer,
                Distance: cc.Integer = 200,
                SuccessCallBack: [cc.Component.EventHandler]
            },
            onLoad: function onLoad() {
                this.lastTimer = !1, this.CheckUpdate = !1, this._Timer = 0, this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
                    this.CheckUpdate = !0, this._Timer = 0, this.SetBegin(e);
                }, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
                    this.mouseFun(e);
                }, this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
                    this.CheckUpdate = !1, this._Timer = 0;
                }, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
                    this.CheckUpdate = !1, this._Timer = 0;
                }, this);
            },
            update: function update() {
                this.CheckUpdate && (cc.log("check"), this.lastTimer ? this.node.position.x < -this.Distance && (this.lastTimer = !1, this._Timer++, console.log("Change" + this._Timer), this._Timer > this.time && (this.CheckUpdate = !1, null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (e) {
                    e.emit();
                }))) : this.node.position.x > this.Distance && (this.lastTimer = !0, this._Timer++, console.log("Change" + this._Timer), this._Timer > this.time && (this.CheckUpdate = !1, null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (e) {
                    e.emit();
                }))));
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
            }
        }), 
*/