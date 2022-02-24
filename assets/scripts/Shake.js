

cc.Class({
    properties: {
        duration: 0,
        dtCost: 0,
        shakeStrengthX: 0,
        shakeStrengthY: 0,
        shakeNode: null,
        nodeInitialPos: null,
        bindCallback: null,
        key: null,
        isDone: !0
    },
    shake: function shake(e, t, i, n, a) {
        this.duration = e, this.dtCost = 0, this.isDone = !1, this.shakeStrengthX = t, this.shakeStrengthY = i, this.shakeNode = n, this.nodeInitialPos = n.getPosition(), this.key = a, null != this.bindCallback && gm.GameApp.unschedule(this.bindCallback), this.bindCallback = this.doSchedule.bind(this), cc.sys.isNative ? gm.GameApp.schedule(this.bindCallback, 0, cc.REPEAT_FOREVER, 0) : gm.GameApp.schedule(this.bindCallback, 0, cc.REPEAT_FOREVER, 0, this.key);
    },
    doSchedule: function doSchedule(e) {
        if (cc.isValid(this.shakeNode)) {
            var t = 40 * e,
                i = this.getRandomStrength(-this.shakeStrengthX, this.shakeStrengthX) * t,
                n = this.getRandomStrength(-this.shakeStrengthY, this.shakeStrengthY) * t;
            this.shakeNode.setPosition(this.nodeInitialPos.add(new cc.Vec2(i, n))), this.dtCost += e, this.dtCost >= this.duration && (gm.GameApp.unschedule(this.bindCallback), this.shakeNode.setPosition(this.nodeInitialPos), this.isDone = !0);
        }
    },
    getRandomStrength: function getRandomStrength(e, t) {
        return Math.random() * (t - e + 1) + e;
    }
})

/*Shake: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "75989dZl6FMIKhbo9dxpYdY", "Shake");
        cc.Class({
            properties: {
                duration: 0,
                dtCost: 0,
                shakeStrengthX: 0,
                shakeStrengthY: 0,
                shakeNode: null,
                nodeInitialPos: null,
                bindCallback: null,
                key: null,
                isDone: !0
            },
            shake: function shake(e, t, i, n, a) {
                this.duration = e, this.dtCost = 0, this.isDone = !1, this.shakeStrengthX = t, this.shakeStrengthY = i, this.shakeNode = n, this.nodeInitialPos = n.getPosition(), this.key = a, null != this.bindCallback && gm.GameApp.unschedule(this.bindCallback), this.bindCallback = this.doSchedule.bind(this), cc.sys.isNative ? gm.GameApp.schedule(this.bindCallback, 0, cc.REPEAT_FOREVER, 0) : gm.GameApp.schedule(this.bindCallback, 0, cc.REPEAT_FOREVER, 0, this.key);
            },
            doSchedule: function doSchedule(e) {
                if (cc.isValid(this.shakeNode)) {
                    var t = 40 * e,
                        i = this.getRandomStrength(-this.shakeStrengthX, this.shakeStrengthX) * t,
                        n = this.getRandomStrength(-this.shakeStrengthY, this.shakeStrengthY) * t;
                    this.shakeNode.setPosition(this.nodeInitialPos.add(new cc.Vec2(i, n))), this.dtCost += e, this.dtCost >= this.duration && (gm.GameApp.unschedule(this.bindCallback), this.shakeNode.setPosition(this.nodeInitialPos), this.isDone = !0);
                }
            },
            getRandomStrength: function getRandomStrength(e, t) {
                return Math.random() * (t - e + 1) + e;
            }
        });
        
*/