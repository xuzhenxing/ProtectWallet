

cc.Class({
    extends: cc.Component,
    properties: {
        ani: cc.Animation,
        finishedCallback: [cc.Component.EventHandler],
        aniName: cc.String = ""
    },
    Play: function Play() {
        this.ani.on("finished", this.onFinished, this), "" != this.aniName ? this.ani.play(this.aniName) : this.ani.play();
    },
    onFinished: function onFinished(e, t) {
        null != this.finishedCallback && (this.finishedCallback.forEach(function (e) {
            e.emit();
        }), this.ani.off("finished", this.onFinished, this));
    },
    Stop: function Stop() {
        this.ani.stop();
    }
})
/*PlayAni: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "de5d4GBHlZJ3qVvPWQK/x1A", "PlayAni"), cc.Class({
            extends: cc.Component,
            properties: {
                ani: cc.Animation,
                finishedCallback: [cc.Component.EventHandler],
                aniName: cc.String = ""
            },
            Play: function Play() {
                this.ani.on("finished", this.onFinished, this), "" != this.aniName ? this.ani.play(this.aniName) : this.ani.play();
            },
            onFinished: function onFinished(e, t) {
                null != this.finishedCallback && (this.finishedCallback.forEach(function (e) {
                    e.emit();
                }), this.ani.off("finished", this.onFinished, this));
            },
            Stop: function Stop() {
                this.ani.stop();
            }
        }), 
*/