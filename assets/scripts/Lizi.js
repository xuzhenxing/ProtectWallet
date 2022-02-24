
var n = require("util")
cc.Class({
    extends: cc.Component,
    properties: {
        Sprite: cc.Sprite,
        Scale: {
            default: cc.Vec2.ONE,
            displayName: "\u7C92\u5B50\u5927\u5C0F"
        },
        LifeTime: {
            default: cc.Vec2.ONE,
            displayName: "\u6301\u7EED\u65F6\u95F4"
        },
        BeginRotation: {
            default: cc.Vec2.ONE,
            displayName: "\u521D\u59CB\u89D2\u5EA6"
        },
        AngularSpeed: {
            default: cc.Vec2.ONE,
            displayName: "\u65CB\u8F6C\u89D2\u5EA6"
        },
        BeginSpeedX: {
            default: cc.Vec2.ONE,
            displayName: "\u53D1\u5C04\u901F\u5EA6X"
        },
        BeginSpeedY: {
            default: cc.Vec2.ONE,
            displayName: "\u53D1\u5C04\u901F\u5EA6Y"
        },
        AccelerationX: {
            default: cc.Vec2.ONE,
            displayName: "\u53D1\u5C04\u52A0\u901F\u5EA6X"
        },
        AccelerationY: {
            default: cc.Vec2.ONE,
            displayName: "\u53D1\u5C04\u52A0\u901F\u5EA6Y"
        },
        Gravity: cc.Integer = 10,
        _Timer: cc.Integer = 0,
        _Speed: cc.Vec2.ZERO,
        _Acceleration: cc.Vec2.ZERO
    },
    onLoad: function onLoad() {
        this._Timer = 0, this._Speed = cc.Vec2.ZERO, this._Acceleration = cc.Vec2.ZERO;
    },
    Fire: function Fire(e, t) {
        cc.log(this.node.x), cc.log(this.node.y), this._LiziLauncher = e;
        var i = n.getRandom(100 * this.Scale.x, 100 * this.Scale.y) / 100;
        this._LifeTime = n.getRandom(100 * this.LifeTime.x, 100 * this.LifeTime.y) / 100, this.node.angle = -n.getRandom(100 * this.BeginRotation.x, 100 * this.BeginRotation.y) / 100, this._AngularSpeed = n.getRandom(100 * this.AngularSpeed.x, 100 * this.AngularSpeed.y) / 100;
        var a = n.getRandom(100 * this.BeginSpeedX.x, 100 * this.BeginSpeedX.y) / 100,
            o = n.getRandom(100 * this.BeginSpeedY.x, 100 * this.BeginSpeedY.y) / 100;
        this._Speed = new cc.Vec2(a, o);
        var s = n.getRandom(100 * this.AccelerationX.x, 100 * this.AccelerationX.y) / 100,
            r = n.getRandom(100 * this.AccelerationY.x, 100 * this.AccelerationY.y) / 100;
        this._Acceleration, new cc.Vec2(s, r), this.Sprite.spriteFrame = t, this.node.scaleX = i, this.node.scaleY = i, this._Timer = 0;
    },
    update: function update(e) {
        this.node.angle -= this._AngularSpeed * e, this._Speed.x = this._Speed.x + this._Acceleration.x * e, this._Speed.y = this._Speed.y + this._Acceleration.y * e, this._Speed.y -= this.Gravity, this.node.x = this.node.x + this._Speed.x * e, this.node.y = this.node.y + this._Speed.y * e, this._Timer += e, this._Timer > this._LifeTime && this._LiziLauncher.LiziRecycle(this);
    },
    ChangeSpeed: function ChangeSpeed(e, t) {
        this.node.x - e > 0 && (this._Speed.x = -this._Speed.x), this.node.y - t > 0 && (this._Speed.y = -this._Speed.y);
    }
})
/*Lizi: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "18e8d4WtapK7Y3g5Fuq9OZp", "Lizi");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("util"));
        cc.Class({
            extends: cc.Component,
            properties: {
                Sprite: cc.Sprite,
                Scale: {
                    default: cc.Vec2.ONE,
                    displayName: "\u7C92\u5B50\u5927\u5C0F"
                },
                LifeTime: {
                    default: cc.Vec2.ONE,
                    displayName: "\u6301\u7EED\u65F6\u95F4"
                },
                BeginRotation: {
                    default: cc.Vec2.ONE,
                    displayName: "\u521D\u59CB\u89D2\u5EA6"
                },
                AngularSpeed: {
                    default: cc.Vec2.ONE,
                    displayName: "\u65CB\u8F6C\u89D2\u5EA6"
                },
                BeginSpeedX: {
                    default: cc.Vec2.ONE,
                    displayName: "\u53D1\u5C04\u901F\u5EA6X"
                },
                BeginSpeedY: {
                    default: cc.Vec2.ONE,
                    displayName: "\u53D1\u5C04\u901F\u5EA6Y"
                },
                AccelerationX: {
                    default: cc.Vec2.ONE,
                    displayName: "\u53D1\u5C04\u52A0\u901F\u5EA6X"
                },
                AccelerationY: {
                    default: cc.Vec2.ONE,
                    displayName: "\u53D1\u5C04\u52A0\u901F\u5EA6Y"
                },
                Gravity: cc.Integer = 10,
                _Timer: cc.Integer = 0,
                _Speed: cc.Vec2.ZERO,
                _Acceleration: cc.Vec2.ZERO
            },
            onLoad: function onLoad() {
                this._Timer = 0, this._Speed = cc.Vec2.ZERO, this._Acceleration = cc.Vec2.ZERO;
            },
            Fire: function Fire(e, t) {
                cc.log(this.node.x), cc.log(this.node.y), this._LiziLauncher = e;
                var i = n.default.getRandom(100 * this.Scale.x, 100 * this.Scale.y) / 100;
                this._LifeTime = n.default.getRandom(100 * this.LifeTime.x, 100 * this.LifeTime.y) / 100, this.node.angle = -n.default.getRandom(100 * this.BeginRotation.x, 100 * this.BeginRotation.y) / 100, this._AngularSpeed = n.default.getRandom(100 * this.AngularSpeed.x, 100 * this.AngularSpeed.y) / 100;
                var a = n.default.getRandom(100 * this.BeginSpeedX.x, 100 * this.BeginSpeedX.y) / 100,
                    o = n.default.getRandom(100 * this.BeginSpeedY.x, 100 * this.BeginSpeedY.y) / 100;
                this._Speed = new cc.Vec2(a, o);
                var s = n.default.getRandom(100 * this.AccelerationX.x, 100 * this.AccelerationX.y) / 100,
                    r = n.default.getRandom(100 * this.AccelerationY.x, 100 * this.AccelerationY.y) / 100;
                this._Acceleration, new cc.Vec2(s, r), this.Sprite.spriteFrame = t, this.node.scaleX = i, this.node.scaleY = i, this._Timer = 0;
            },
            update: function update(e) {
                this.node.angle -= this._AngularSpeed * e, this._Speed.x = this._Speed.x + this._Acceleration.x * e, this._Speed.y = this._Speed.y + this._Acceleration.y * e, this._Speed.y -= this.Gravity, this.node.x = this.node.x + this._Speed.x * e, this.node.y = this.node.y + this._Speed.y * e, this._Timer += e, this._Timer > this._LifeTime && this._LiziLauncher.LiziRecycle(this);
            },
            ChangeSpeed: function ChangeSpeed(e, t) {
                this.node.x - e > 0 && (this._Speed.x = -this._Speed.x), this.node.y - t > 0 && (this._Speed.y = -this._Speed.y);
            }
        }), 
*/