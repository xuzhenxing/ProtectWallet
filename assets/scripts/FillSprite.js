

cc.Class({
    extends: cc.Component,
    properties: {
        timer: 4,
        sprite: cc.Sprite,
        AllFillCallBack: [cc.Component.EventHandler]
    },
    start: function start() {
        this._time = 0;
    },
    FillSprite: function FillSprite(e) {
        this._time++, this.sprite.fillRange = this._time / this.timer, this._time / this.timer >= 1 && null != this.AllFillCallBack && this.AllFillCallBack.forEach(function (t) {
            t.emit([e]);
        });
    }
})

/*FillSprite: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "014b9mALLhNrZKN7J0s7nNO", "FillSprite"), cc.Class({
            extends: cc.Component,
            properties: {
                timer: 4,
                sprite: cc.Sprite,
                AllFillCallBack: [cc.Component.EventHandler]
            },
            start: function start() {
                this._time = 0;
            },
            FillSprite: function FillSprite(e) {
                this._time++, this.sprite.fillRange = this._time / this.timer, this._time / this.timer >= 1 && null != this.AllFillCallBack && this.AllFillCallBack.forEach(function (t) {
                    t.emit([e]);
                });
            }
        }), 
*/