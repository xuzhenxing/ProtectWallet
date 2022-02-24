var n = require("ConstModName"),
    a = require("UIInfo");
var cfs = require("configStore");



// // 抖动 动画
// cc.Shake = cc.ActionInterval.extend({
//     _initial_x : 0,
//     _initial_y : 0,
//     _strength_x : 0,
//     _strength_y : 0,
//     /**
//      *  创建抖动动画
//      * @param {number} duration     动画持续时长
//      * @param {number} strength_x   抖动幅度： x方向
//      * @param {number} strength_y   抖动幅度： y方向
//      * @returns {Shake}
//      */
//     ctor:function(duration,strength_x,strength_y){
//         // cc.ActionInterval.prototype.ctor.call(this);
//         this.initWithDuration( duration,strength_x,strength_y);
//     },
//     initWithDuration(duration,strength_x,strength_y) {
//         cc.ActionInterval.prototype.initWithDuration.call(this, duration)
//         this._strength_x = strength_x;
//         this._strength_y = strength_y;
//         return true;
//     },
//     getRandomStrength:function(min,max){
//         return Math.random()*(max-min+1)+min;
//     },
//     update()
//     {
//         let randx = this.getRandomStrength(-this._strength_x,this._strength_x);
//         let randy = this.getRandomStrength(-this._strength_y,this._strength_y);
//         this.getTarget().setPosition(randx + this._initial_x,randy + this._initial_y);
//     },
//     startWithTarget(target)
//     {
//         cc.ActionInterval.prototype.startWithTarget.call(this, target);
//         this._initial_x = target.x;
//         this._initial_y = target.y;
//     },
//     stop()
//     {
//         this.getTarget().setPosition(new cc.Vec2(this._initial_x,this._initial_y));
//         cc.ActionInterval.prototype.stop.call(this);
//     },
// });
// cc.shake = function (duration,strength_x,strength_y) {
//     return new cc.Shake(duration,strength_x,strength_y);
// };
var gameLogin = cc.Class({
    extends: cc.Component,
    properties: {
        GameAction: null,
        GameAni: cc.Animation,
        refresh: false,
    },

    start: function start() {
        gm.GameLogic = this, 
        this.LoadMission(!1);
        window.Mission = 0
    },
    LoadMission: function LoadMission(e) {
        var t = this;
        var Range = Math.floor(Math.random() * (42 - 2) + 1);
        if (Range == 25) {
            Range = 14
        }
        if (gm.DataManager.userData.NowMission == 25) { //测试功能
            gm.DataManager.userData.NowMission = 10
        }
        // console.log(gm.DataManager.userData.NowMission)
        if (gm.DataManager.userData.SetMission > 45 || gm.DataManager.userData.NowMission > 45) { //测试功能
            gm.DataManager.userData.NowMission = Range
        }
        // gm.DataManager.userData.LittleMission = 0
        // console.log(gm.DataManager.userData.SetMission)
        if (gm.DataManager.userData.SetMission > 10) {
            if (gm.DataManager.userData.NowMission == 33) { //测试功能
                gm.DataManager.userData.NowMission = 1
            } else if (gm.DataManager.userData.NowMission == 34) { //测试功能
                gm.DataManager.userData.NowMission = 2
            } else if (gm.DataManager.userData.NowMission == 35) { //测试功能
                gm.DataManager.userData.NowMission = 3
            } else if (gm.DataManager.userData.NowMission == 36) { //测试功能
                gm.DataManager.userData.NowMission = 4
            } else if (gm.DataManager.userData.NowMission == 37) { //测试功能
                gm.DataManager.userData.NowMission = 5
            } else if (gm.DataManager.userData.NowMission == 38) { //测试功能
                gm.DataManager.userData.NowMission = 6
            } else if (gm.DataManager.userData.NowMission == 39) { //测试功能
                gm.DataManager.userData.NowMission = 7
            } else if (gm.DataManager.userData.NowMission == 40) { //测试功能
                gm.DataManager.userData.NowMission = 8
            } else if (gm.DataManager.userData.NowMission == 41) { //测试功能
                gm.DataManager.userData.NowMission = 9
            } else if (gm.DataManager.userData.NowMission == 42) { //测试功能
                gm.DataManager.userData.NowMission = 10
            } else if (gm.DataManager.userData.SetMission > 10 && gm.DataManager.userData.SetMission < 33 && gm.DataManager.userData.SetMission != 25 && gm.DataManager.userData.SetMission !== 11 && gm.DataManager.userData.SetMission !== 13 && gm.DataManager.userData.SetMission !== 15 && gm.DataManager.userData.SetMission < 42) {
                gm.DataManager.userData.NowMission = gm.DataManager.userData.SetMission
            } else if (gm.DataManager.userData.NowMission == 11) { //测试功能
                gm.DataManager.userData.NowMission = 43
            } else if (gm.DataManager.userData.NowMission == 13) { //测试功能
                gm.DataManager.userData.NowMission = 44
            } else if (gm.DataManager.userData.NowMission == 15) { //测试功能
                gm.DataManager.userData.NowMission = 45
            }
        } else 
        if (gm.DataManager.userData.NowMission == 1) { //测试功能
            gm.DataManager.userData.NowMission = 33
        } else if (gm.DataManager.userData.NowMission == 2) { //测试功能
            gm.DataManager.userData.NowMission = 34
        } else if (gm.DataManager.userData.NowMission == 3) { //测试功能
            gm.DataManager.userData.NowMission = 35
        } else if (gm.DataManager.userData.NowMission == 4) { //测试功能
            gm.DataManager.userData.NowMission = 36
        } else if (gm.DataManager.userData.NowMission == 5) { //测试功能
            gm.DataManager.userData.NowMission = 37
        } else if (gm.DataManager.userData.NowMission == 6) { //测试功能
            gm.DataManager.userData.NowMission = 38
        } else if (gm.DataManager.userData.NowMission == 7) { //测试功能
            gm.DataManager.userData.NowMission = 39
        } else if (gm.DataManager.userData.NowMission == 8) { //测试功能
            gm.DataManager.userData.NowMission = 40
        } else if (gm.DataManager.userData.NowMission == 9) { //测试功能
            gm.DataManager.userData.NowMission = 41
        } else if (gm.DataManager.userData.NowMission == 10) { //测试功能
            gm.DataManager.userData.NowMission = 42
        } else if (gm.DataManager.userData.NowMission == 11) {
            gm.DataManager.userData.NowMission = 43
        } else if (gm.DataManager.userData.NowMission == 13) {
            gm.DataManager.userData.NowMission = 44
        } else if (gm.DataManager.userData.NowMission == 15) {
            gm.DataManager.userData.NowMission = 45
        }
        var skin = null
        cc.loader.loadRes("Prefabs/Level/Level_" + gm.DataManager.userData.NowMission, function (i, o) {
            if (i) cc.error(i.message || i);
            else {
                for (var s = 0; s < t.node.children.length; s++) {
                    var r = t.node.children[s];
                    cc.isValid(r) && r.destroy();
                }
                var c = cc.instantiate(o);
                c.parent = t.node, t.GameAction = c.getComponent("GameAction"), null == t.GameAction && (t.GameAction = c.getComponentInChildren("GameAction"), 
                t.GameAni = t.GameAction.node.getComponent(cc.Animation)), null == t.GameAction && cc.error(gm.DataManager.userData.NowMission + "\u6CA1\u6709\u627E\u5230GameAction\u811A\u672C"), 
                e && (gm.GameData.NowPorgress = 0, gm.UIManager.SendNotification(n.MOD_GameView, a.UIInfo_ShowView, null));
                if (gm.DataManager.userData.NowMission == 14) {
                    skin = c.getChildByName("Level_" + gm.DataManager.userData.NowMission + "_anim").getChildByName("热气球").getChildByName("猪脚")
                } else {
                    skin = c.getChildByName("Level_" + gm.DataManager.userData.NowMission + "_anim").getChildByName("猪脚")
                }
                window.skinDragon = skin.getComponent(dragonBones.ArmatureDisplay)
                // console.log(window.skinDragon._armature.getSlot("head"))
                if (window.skinDragon && window.skinDragon !== undefined && window.skinDragon !== null) {
                    t.refishSkin()
                }
            }
            lwsdk.setSceneEvent({
                sceneName: "loading界面",
                eventName: "页面触发",
                eventId: "加载完成"
            });
         });
        // }
        gm.DataManager.userData.accuracy = ((gm.DataManager.userData.Right / gm.DataManager.userData.pass) * 100).toFixed(2)
        if (gm.DataManager.userData.accuracy == "NaN") {
            gm.DataManager.userData.accuracy = 0
        }
        if (gm.DataManager.userData.accuracy != 100) {
            gm.DataManager.userData.Level = Number(gm.DataManager.userData.MaxMission + "" + gm.DataManager.userData.LittleMission + "0" + (gm.DataManager.userData.accuracy * 100)).toFixed(0)
        } else {
            gm.DataManager.userData.Level = Number(gm.DataManager.userData.MaxMission + "" + gm.DataManager.userData.LittleMission + "" + (gm.DataManager.userData.accuracy * 100)).toFixed(0)
        }
        gm.DataManager.userData.offline = new Date().getTime()

    },

    /**
     * 自定义抖动动作
     * @param {float}duration 抖动时间
     * @param {number}shakeStrengthX X轴抖动幅度
     * @param {number}shakeStrengthY Y轴抖动幅度
     * @returns {Shake}
     */

    refishSkin() {
        var t = this
        for (var i = 0; i < 8; i++) {
            if (gm.DataManager.userData.skinHead[i].isChoose == 0) {
                var z = i
                if (z == 0) {
                    z = 0
                } else if (z == 1) {
                    z = 7
                } else if (z == 2) {
                    z = 6
                } else if (z == 3) {
                    z = 9
                } else if (z == 4) {
                    z = 11
                } else if (z == 5) {
                    z = 8
                } else if (z == 6) {
                    z = 10
                } else if (z == 7) {
                    z = 5
                }
                this.ChangeSkin(window.skinDragon._armature, 'head', z)
                if (z == 0) {
                    this.ChangeSkin(window.skinDragon._armature, 'hair', 0)

                } else {
                    this.ChangeSkin(window.skinDragon._armature, 'hair', 1)

                }
            }
            if (gm.DataManager.userData.skinCoat[i].isChoose == 0) {
                var x = i
                if (x == 0) {
                    x = 0
                } else if (x == 1) {
                    x = 7
                } else if (x == 2) {
                    x = 3
                } else if (x == 3) {
                    x = 6
                } else if (x == 4) {
                    x = 2
                } else if (x == 5) {
                    x = 1
                } else if (x == 6) {
                    x = 5
                } else if (x == 7) {
                    x = 4
                }
                var s = i
                if (s == 2) {
                    s = 4
                } else if (s == 6) {
                    s = 1
                } else if (s == 3) {
                    s = 3
                } else if (s == 7) {
                    s = 2
                } else {
                    s = 0
                }
                this.ChangeSkin(window.skinDragon._armature, 'body', x)
                this.ChangeSkin(window.skinDragon._armature, 'skirt', x)
                this.ChangeSkin(window.skinDragon._armature, 'arm', x)
                this.ChangeSkin(window.skinDragon._armature, 'arm1', x)
                this.ChangeSkin(window.skinDragon._armature, 'forearm', s)
                this.ChangeSkin(window.skinDragon._armature, 'forearm1', s)
            }
            if (gm.DataManager.userData.skinShoe[i].isChoose == 0) {
                var p = i
                if (p == 0) {
                    p = 0
                } else if (p == 1) {
                    p = 4
                } else if (p == 2) {
                    p = 3
                } else if (p == 3) {
                    p = 7
                } else if (p == 4) {
                    p = 5
                } else if (p == 5) {
                    p = 1
                } else if (p == 6) {
                    p = 6
                } else if (p == 7) {
                    p = 2
                }

                var o = i
                if (o == 6) {
                    o = 2
                } else if (o == 1) {
                    o = 4
                } else if (o == 0) {
                    o = 1
                } else if (o == 3) {
                    o = 3
                } else {
                    o = 1
                }
                this.ChangeSkin(window.skinDragon._armature, 'foot1', p)
                this.ChangeSkin(window.skinDragon._armature, 'foot', p)
                this.ChangeSkin(window.skinDragon._armature, 'shank', o)
                this.ChangeSkin(window.skinDragon._armature, 'shank1', o)
            }
        }
    },
    ChangeSkin(_armature, name, e) {
        if (CC_JSB) {
            _armature.getSlot(name).setDisplayIndex(e)
        } else {
            // console.log(this.ri.armature().getSlot(name))._displayDatas[0].texture
            _armature.getSlot(name)._textureData = _armature.getSlot(name)._displayDatas[e].texture
            _armature.getSlot(name)._updateFrame()
        }
    },
    GetProgressAnimName: function GetProgressAnimName(e, t) {
        var i = gm.DataManager.userData.NowMission;

        switch (t) {
            case 0:
                return "level_" + i + "_start" + (e + 1);
            case 1:
                return "level_" + i + "_wait" + (e + 1);
            case 2:
                return "level_" + i + "_true" + (e + 1);
            case 3:
                return "level_" + i + "_false" + (e + 1);
        }
    },


    PlayAni: function PlayAni(e, t) {
        var i = this.GetProgressAnimName(gm.GameData.NowPorgress, e);
        if (i == "level_" + gm.DataManager.userData.NowMission + "_start1") {
            window.Mission = 1
            lwsdk.setSceneEvent({
                sceneName: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "关开始",
                eventName: "页面触发",
                eventId: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "开始"
            });
        } else if (i == "level_" + gm.DataManager.userData.NowMission + "_start2") {
            window.Mission = 2
            lwsdk.setSceneEvent({
                sceneName: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "关开始",
                eventName: "页面触发",
                eventId: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "开始"
            });
        } else if (i == "level_" + gm.DataManager.userData.NowMission + "_start3") {
            window.Mission = 3
            lwsdk.setSceneEvent({
                sceneName: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "关开始",
                eventName: "页面触发",
                eventId: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "开始"
            });
        }
        console.log(gm.DataManager.userData.NowMission, "gm.DataManager.userData.NowMission====")
        if (i == "level_" + gm.DataManager.userData.NowMission + "_true1") {
            console.log(gm.DataManager.userData.SetMission)
            // if (gm.DataManager.userData.SetMission >= gm.DataManager.userData.MaxMission) {
            gm.DataManager.userData.LittleMission = 1
            if (gm.DataManager.userData.NowMission == 1 || gm.DataManager.userData.NowMission == 2 || gm.DataManager.userData.NowMission == 3) { //只有一小关
                gm.DataManager.userData.LittleMission = 0
            } else if (gm.DataManager.userData.NowMission == 4 || gm.DataManager.userData.NowMission == 29 || gm.DataManager.userData.NowMission == 5) { //有两小关

            } else {

            }
            // }
            lwsdk.setSceneEvent({
                sceneName: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "关完成",
                eventName: "页面触发",
                eventId: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "通关"
            });
        } else if (i == "level_" + gm.DataManager.userData.NowMission + "_true2") {
            // if (gm.DataManager.userData.SetMission >= gm.DataManager.userData.MaxMission) {
            gm.DataManager.userData.LittleMission = 2
            if (gm.DataManager.userData.NowMission == 1 || gm.DataManager.userData.NowMission == 2 || gm.DataManager.userData.NowMission == 3) { //只有一小关
            } else if (gm.DataManager.userData.NowMission == 4 || gm.DataManager.userData.NowMission == 29 || gm.DataManager.userData.NowMission == 5) { //有两小关
                gm.DataManager.userData.LittleMission = 0
            } else {}
            // }
            lwsdk.setSceneEvent({
                sceneName: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "关完成",
                eventName: "页面触发",
                eventId: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "通关"
            });
        } else if (i == "level_" + gm.DataManager.userData.NowMission + "_true3") {
            // if (gm.DataManager.userData.SetMission >= gm.DataManager.userData.MaxMission) {

            gm.DataManager.userData.LittleMission = 3
            if (gm.DataManager.userData.NowMission == 1 || gm.DataManager.userData.NowMission == 2 || gm.DataManager.userData.NowMission == 3) { //只有一小关
            } else if (gm.DataManager.userData.NowMission == 4 || gm.DataManager.userData.NowMission == 29 || gm.DataManager.userData.NowMission == 5) { //有两小关
            } else {
                gm.DataManager.userData.LittleMission = 0
            }
            // }
            lwsdk.setSceneEvent({
                sceneName: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "关完成",
                eventName: "页面触发",
                eventId: "第" + gm.DataManager.userData.SetMission + "-" + window.Mission + "通关"
            });
        }

        // console.log(i,t,e)
       // debugger
        cc.log("AniPlay " + i), this.GameAni.play(i), this.GameAni.once("finished", t, this), this.GameAction.RunAction(gm.GameData.NowPorgress, e);
        // this.refishSkin()
        if (i == "level_4_true1" || i == "level_31_true2") {
            this.refresh = true
        } else {
            this.refresh = false
        }
        // console.log("357889999")
        // 
    },
    update() {
        let self = this
        if (this.refresh) {
            self.refishSkin()
        } else {

        }
    },

    RunAni: function RunAni() {
        this.GameAni.resume();
    },
    StopAni: function StopAni() {
        this.GameAni.pause();
    },
    playProcessAni: function playProcessAni() {
        var e = this;
        this.PlayAni(0, function () {
            cc.log("After playProcessAni"), e.playWaitingAni();
        });
    },
    playWaitingAni: function playWaitingAni() {
        this.PlayAni(1, function () {
            cc.log("After playWaitingAni"), gm.UIManager.SendNotification(n.MOD_GameView, a.UIInfo_ShowChoose, null);
        });
    },
    playWinAni: function playWinAni() {
        this.PlayAni(2, function () {
            // cc.log("After playWinAni"),
            if (cfs.default.ZJXJJ_SMJL) {

            } else {
                // adSdk.showBanner("结算页", true, true, 10)
            }
            this.refishSkin()
            console.log('游戏结束'),
                gm.UIManager.SendNotification(n.MOD_GameView, a.UIInfo_ShowWin, null);
        });
    },
    PlayFailAni: function PlayFailAni() {
        this.PlayAni(3, function () {
            cc.log("After PlayFailAni"), gm.UIManager.SendNotification(n.MOD_GameView, a.UIInfo_ShowFail, null);
        });
    },
    PlayAdAni: function PlayAdAni() {
        this.PlayAni(4, function () {
            gm.UIManager.SendNotification(n.MOD_GameView, a.UIInfo_ShowADWin, null);
        });
    }
})
window['gameLogin'] = new gameLogin()
/*GameLogic: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "61959BE1PFGn6MyO3qGcZi1", "GameLogic");
        var n = o(e("ConstModName")),
            a = o(e("UIInfo"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            properties: {
                GameAction: null,
                GameAni: cc.Animation
            },
            start: function start() {
                gm.GameLogic = this, this.LoadMission(!1);
            },
            LoadMission: function LoadMission(e) {
                var t = this;
                cc.loader.loadRes("Prefabs/Level/Level_" + gm.DataManager.userData.NowMission, function (i, o) {
                    if (i) cc.error(i.message || i);
                    else {
                        for (var s = 0; s < t.node.children.length; s++) {
                            var r = t.node.children[s];
                            cc.isValid(r) && r.destroy();
                        }
                        var c = cc.instantiate(o);
                        c.parent = t.node, t.GameAction = c.getComponent("GameAction"), null == t.GameAction && (t.GameAction = c.getComponentInChildren("GameAction"), t.GameAni = t.GameAction.node.getComponent(cc.Animation)), null == t.GameAction && cc.error(gm.DataManager.userData.NowMission + "\u6CA1\u6709\u627E\u5230GameAction\u811A\u672C"), e && (gm.GameData.NowPorgress = 0, gm.UIManager.SendNotification(n.default.MOD_GameView, a.default.UIInfo_ShowView, null));
                    }
                });
            },
            GetProgressAnimName: function GetProgressAnimName(e, t) {
                var i = gm.DataManager.userData.NowMission;
                switch (t) {
                    case 0:
                        return "level_" + i + "_start" + (e + 1);
                    case 1:
                        return "level_" + i + "_wait" + (e + 1);
                    case 2:
                        return "level_" + i + "_true" + (e + 1);
                    case 3:
                        return "level_" + i + "_false" + (e + 1);
                }
            },
            PlayAni: function PlayAni(e, t) {
                var i = this.GetProgressAnimName(gm.GameData.NowPorgress, e);
                cc.log("AniPlay " + i), this.GameAni.play(i), this.GameAni.once("finished", t, this), this.GameAction.RunAction(gm.GameData.NowPorgress, e);
            },
            RunAni: function RunAni() {
                cc.log("RunAni"), this.GameAni.resume();
            },
            StopAni: function StopAni() {
                cc.log("StopAni"), this.GameAni.pause();
            },
            playProcessAni: function playProcessAni() {
                var e = this;
                cc.log("playProcessAni"), this.PlayAni(0, function () {
                    cc.log("After playProcessAni"), e.playWaitingAni();
                });
            },
            playWaitingAni: function playWaitingAni() {
                cc.log("playWaitingAni"), this.PlayAni(1, function () {
                    cc.log("After playWaitingAni"), gm.UIManager.SendNotification(n.default.MOD_GameView, a.default.UIInfo_ShowChoose, null);
                });
            },
            playWinAni: function playWinAni() {
                cc.log("playWinAni"), this.PlayAni(2, function () {
                    cc.log("After playWinAni"), gm.UIManager.SendNotification(n.default.MOD_GameView, a.default.UIInfo_ShowWin, null);
                });
            },
            PlayFailAni: function PlayFailAni() {
                cc.log("PlayFailAni"), this.PlayAni(3, function () {
                    cc.log("After PlayFailAni"), gm.UIManager.SendNotification(n.default.MOD_GameView, a.default.UIInfo_ShowFail, null);
                });
            },
            PlayAdAni: function PlayAdAni() {
                this.PlayAni(4, function () {
                    gm.UIManager.SendNotification(n.default.MOD_GameView, a.default.UIInfo_ShowADWin, null);
                });
            }
        }), 
*/