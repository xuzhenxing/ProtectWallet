var n = require("ConstModName"),
    a = require("UIInfo");
var SdkManager = require("SdkManager");
cc.Class({
    extends: cc.Component,
    properties: {
        ArmatureList: [dragonBones.ArmatureDisplay],
        BubbleList: [cc.Label],
        _NowProgress: [],
        _ProgressList: [],
        _StatusList: [],
        _NowBubble: [],
    },
    RunAction: function RunAction(e, t) {
        var i = gm.GameData.LevelActionDic,
            n = gm.GameData.BubbleDic,
            a = gm.DataManager.userData.NowMission;
        this._NowBubble = n[a].Text, console.log(this._NowBubble, "this.nowBubble==");
        var o = i[1e4 * a + 100 * e + t];
        if (null != o) {
            this._NowProgress = new Array(), this._ProgressList = o.Action, cc.log("_ProgressList"), cc.log(this._ProgressList), this._StatusList = o.Status.concat(), cc.log("_StatusList"), cc.log(this._StatusList);
            for (var s = 0; s < this._ProgressList.length; s++) {
                this._NowProgress.push(-1), this.RunDragonAni(s);
            }
            // console.log(this._ProgressList,"_ProgressList===")
        }
    },
    GetNowAction: function GetNowAction(e) {

        var t = gm.GameData.ActionDic;
        if (null != t[e]) return t[e];
        cc.error("Action\u5217\u8868\u4E0D\u5B58\u5728id\u4E3A" + e);
        // console.log(t,"t--=====")
    },
    RunDragonAni: function RunDragonAni(e) {
        cc.director.getScheduler().setTimeScale(1.5)
        var t = this;
        this._NowProgress[e]++;
        var i = this.ArmatureList[e],
            n = this._NowProgress[e],
            a = this._ProgressList[e][n];
        if (null != a) {
            //获取龙骨动画
            // console.log(a,'a+++++++')
            var o = this.GetNowAction(a),
                s = o.ActionName,
                r = o.Loop,
                c = o.Time;
            // if (s == "6_3win") {
            //     console.log(window.skinDragon._armature.getSlot("head")._textureData)
            //     t.ChangeSkin(window.skinDragon._armature, 'head',1)
            //     t.ChangeSkin(window.skinDragon._armature, 'hair', 0)
            //     console.log(window.skinDragon._armature.getSlot("head")._textureData)
            // }
            // console.log(s,'s++++++++++++',"e=======", e,"o=====", o,"i=====",i);
            r < 0 ? (i.playAnimation(s, -1), c > 0 && setTimeout(function () {

                t.RunDragonAni(e);
            }, 1e3 * c)) : (i.playAnimation(s, r), i.once(dragonBones.EventObject.COMPLETE, function () {
                gm.GameLogic.RunAni(), this.RunDragonAni(e);
            }, this));
            var l = this._StatusList.indexOf(a); -
            1 != l ? (this._StatusList.splice(l, 1), gm.GameLogic.StopAni()) : (gm.GameLogic.RunAni());
        }
    },
    ShowDragon: function ShowDragon(e) {
        cc.director.getScheduler().setTimeScale(1.5)
        this.RunDragonAni(e);
    },
    ShowBubble: function ShowBubble(e, t) {
        // debugger
        let self = this
        cc.director.getScheduler().setTimeScale(1.5)
        this.BubbleList[e].string = this._NowBubble[t];

        if (SdkManager.default.sdkMgr.onClickContinue) {
            // 点击屏幕继续
            this.scheduleOnce(() => {
                cc.director.emit("showContinue")
                // console.log(self.GamveView)
                // self.GamveView.ContinueClick()
                cc.director.pause()
            }, 1)
        }
    },
    ShowUIRight: function ShowUIRight() {
        cc.director.getScheduler().setTimeScale(2)
        gm.UIManager.SendNotification(n.MOD_GameView, a.UIInfo_ShowUIRight, null);
    },
    ShowUIWrong: function ShowUIWrong() {
        cc.director.getScheduler().setTimeScale(2)
        gm.UIManager.SendNotification(n.MOD_GameView, a.UIInfo_ShowUIWrong, null);
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
})
/*GameAction: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "04d78xmYdtHkJXG/UGdo62C", "GameAction");
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
                ArmatureList: [dragonBones.ArmatureDisplay],
                BubbleList: [cc.Label],
                _NowProgress: [],
                _ProgressList: [],
                _StatusList: [],
                _NowBubble: []
            },
            RunAction: function RunAction(e, t) {
                var i = gm.GameData.LevelActionDic,
                    n = gm.GameData.BubbleDic,
                    a = gm.DataManager.userData.NowMission;
                cc.log("curPhase"), cc.log(e), this._NowBubble = n[a].Text, cc.log("_NowBubble"), cc.log(this._NowBubble);
                var o = i[1e4 * a + 100 * e + t];
                if (null != o) {
                    this._NowProgress = new Array(), this._ProgressList = o.Action, cc.log("_ProgressList"), cc.log(this._ProgressList), this._StatusList = o.Status.concat(), cc.log("_StatusList"), cc.log(this._StatusList);
                    for (var s = 0; s < this._ProgressList.length; s++) {
                        this._NowProgress.push(-1), this.RunDragonAni(s);
                    }
                }
            },
            GetNowAction: function GetNowAction(e) {
                var t = gm.GameData.ActionDic;
                if (null != t[e]) return t[e];
                cc.error("Action\u5217\u8868\u4E0D\u5B58\u5728id\u4E3A" + e);
            },
            RunDragonAni: function RunDragonAni(e) {
                var t = this;
                this._NowProgress[e]++;
                var i = this.ArmatureList[e],
                    n = this._NowProgress[e],
                    a = this._ProgressList[e][n];
                if (null != a) {
                    var o = this.GetNowAction(a),
                        s = o.ActionName,
                        r = o.Loop,
                        c = o.Time;
                    r < 0 ? (i.playAnimation(s, -1), c > 0 && setTimeout(function () {
                        t.RunDragonAni(e);
                    }, 1e3 * c)) : (i.playAnimation(s, r), i.once(dragonBones.EventObject.COMPLETE, function () {
                        cc.log("\u52A8\u753B\u5B8C\u6210"),  gm.GameLogic.RunAni(), this.RunDragonAni(e);
                    }, this));
                    var l = this._StatusList.indexOf(a);
                    cc.log("LevelAction Status"), -1 != l ? ( this._StatusList.splice(l, 1), gm.GameLogic.StopAni()) : ( gm.GameLogic.RunAni());
                }
            },
            ShowDragon: function ShowDragon(e) {
                this.RunDragonAni(e);
            },
            ShowBubble: function ShowBubble(e, t) {
                cc.log("ShowBubble"), this.BubbleList[e].string = this._NowBubble[t];
            },
            ShowUIRight: function ShowUIRight() {
                gm.UIManager.SendNotification(n.default.MOD_GameView, a.default.UIInfo_ShowUIRight, null);
            },
            ShowUIWrong: function ShowUIWrong() {
                gm.UIManager.SendNotification(n.default.MOD_GameView, a.default.UIInfo_ShowUIWrong, null);
            }
        }), 
*/