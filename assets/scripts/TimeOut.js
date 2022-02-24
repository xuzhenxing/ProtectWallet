
cc.Class({
    extends: cc.Component,
    properties: {
        BeforeCallback: [cc.Component.EventHandler],
        finishedCallback: [cc.Component.EventHandler],
        time: cc.Integer
    },
    Play: function Play() {
        var e = this;
        null != this.BeforeCallback && this.BeforeCallback.forEach(function (e) {
            e.emit();
        }), null != this._timer && clearTimeout(this._timer), this._timer = setTimeout(function () {
            null != e.finishedCallback && e.finishedCallback.forEach(function (e) {
                e.emit();
            }), e._timer = null;
        }, 1e3 * this.time);
    }
})

/*TimeOut: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "8800ajVMjRE77oJt0YeJIhF", "TimeOut"), cc.Class({
            extends: cc.Component,
            properties: {
                BeforeCallback: [cc.Component.EventHandler],
                finishedCallback: [cc.Component.EventHandler],
                time: cc.Integer
            },
            Play: function Play() {
                var e = this;
                null != this.BeforeCallback && this.BeforeCallback.forEach(function (e) {
                    e.emit();
                }), null != this._timer && clearTimeout(this._timer), this._timer = setTimeout(function () {
                    null != e.finishedCallback && e.finishedCallback.forEach(function (e) {
                        e.emit();
                    }), e._timer = null;
                }, 1e3 * this.time);
            }
        }), 
*/