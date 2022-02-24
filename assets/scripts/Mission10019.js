

cc.Class({
    extends: cc.Component,
    properties: {
        Arrow: cc.Node,
        Min: cc.Integer,
        Max: cc.Integer,
        Target: cc.Integer,
        Time: cc.Integer,
        Progress: cc.Node,
        ProgressTargetScale: cc.Integer,
        Btn: cc.Node,
        SmallAni: new require("PlayAni"),
        BigAni: new require("PlayAni")
    },
    start: function start() {
        var e = this;
        this._Move = !1, this.Btn.on(cc.Node.EventType.TOUCH_START, this.btnstartClick, this), this.Btn.on(cc.Node.EventType.TOUCH_CANCEL, this.btncancelClick, this), this.Btn.on(cc.Node.EventType.TOUCH_END,this.btnendClick, this);
    },
    btnstartClick(t){
        console.log('点击Mission10019   startClick')
        e.ChangeMove(!0);
    },
    btncancelClick(t){
        console.log('点击Mission10019   cancelClick')
        e.ChangeMove(!1);
    },
    btnendClick(t){
        console.log('点击Mission10019   endClick')
        e.ChangeMove(!1);
    },
    ChangeMove: function ChangeMove(e) {
        var t = new Date();
        this._BeginRecordTime = t.getTime() / 1e3, this._Move = e, this._Move || (this.Progress.scale == this.ProgressTargetScale && this.Arrow.y > this.Target ? this.PlayBig() : this.PlaySmall(), this.Arrow.y = this.Min);
    },
    PlaySmall: function PlaySmall() {
        this.SmallAni.Play();
    },
    PlayBig: function PlayBig() {
        this.BigAni.Play();
    },
    update: function update(e) {
        if (this._Move) {
            var t = new Date().getTime() / 1e3 - this._BeginRecordTime,
                i = Math.ceil(t / this.Time) % 2 == 1,
                n = t % this.Time;
            this.Arrow.y = i ? this.Min + (this.Max - this.Min) * n : this.Min + (this.Max - this.Min) * (1 - n);
        }
    }
})


/*Mission10019: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "113061K9lNME7yh+vLDP/2M", "Mission10019"), cc.Class({
            extends: cc.Component,
            properties: {
                Arrow: cc.Node,
                Min: cc.Integer,
                Max: cc.Integer,
                Target: cc.Integer,
                Time: cc.Integer,
                Progress: cc.Node,
                ProgressTargetScale: cc.Integer,
                Btn: cc.Node,
                SmallAni: new e("PlayAni"),
                BigAni: new e("PlayAni")
            },
            start: function start() {
                var e = this;
                this._Move = !1, this.Btn.on(cc.Node.EventType.TOUCH_START, function (t) {
                    e.ChangeMove(!0);
                }, this), this.Btn.on(cc.Node.EventType.TOUCH_CANCEL, function (t) {
                    e.ChangeMove(!1);
                }, this), this.Btn.on(cc.Node.EventType.TOUCH_END, function (t) {
                    e.ChangeMove(!1);
                }, this);
            },
            ChangeMove: function ChangeMove(e) {
                var t = new Date();
                this._BeginRecordTime = t.getTime() / 1e3, this._Move = e, this._Move || (this.Progress.scale == this.ProgressTargetScale && this.Arrow.y > this.Target ? this.PlayBig() : this.PlaySmall(), this.Arrow.y = this.Min);
            },
            PlaySmall: function PlaySmall() {
                this.SmallAni.Play();
            },
            PlayBig: function PlayBig() {
                this.BigAni.Play();
            },
            update: function update(e) {
                if (this._Move) {
                    var t = new Date().getTime() / 1e3 - this._BeginRecordTime,
                        i = Math.ceil(t / this.Time) % 2 == 1,
                        n = t % this.Time;
                    this.Arrow.y = i ? this.Min + (this.Max - this.Min) * n : this.Min + (this.Max - this.Min) * (1 - n);
                }
            }
        }), 
*/