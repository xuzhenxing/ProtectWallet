require("GameConfig"), require("util"), require("UIInfo"), require("ConstModName"), require("GameDefine");
cc.Class({
    properties: {
        ActionDic: null,
        GameLevelDic: null,
        LevelActionDic: null,
        BubbleDic: null,
        PropsDic: null,
        NowPorgress: 0
    },
    Init: function Init() {

        this.ActionDic = new Array(),
            this.GameLevelDic = new Array(),
            this.LevelActionDic = new Array(),
            this.BubbleDic = new Array(),
            this.PropsDic = new Array(),
            this.MainViewShowAD = !1, this.BoolNew = !1;
    },
    ParseData: function ParseData(e, t) {
        var i, n;
        switch (n = (i = t).length, cc.log(e), e) {
            case "ActionConfig":
                for (var a = 0; a < n; a++) {
                    var o = i[a];
                    this.ActionDic[o.ID] = o;
                }
                break;
            case "GameLevelConfig":
                for (var s = 0; s < n; s++) {
                    var r = i[s];
                    r.choose = JSON.parse(r.choose), this.GameLevelDic[r.id] = r;
                }
                break;
            case "LevelActionConfig":
                for (var c = 0; c < n; c++) {
                    var l = i[c];
                    l.Action = JSON.parse(l.Action), l.Status = JSON.parse(l.Status), this.LevelActionDic[l.ID] = l;
                }
                break;
            case "BubbleConfig":
                for (var u = 0; u < n; u++) {
                    var d = i[u];
                    d.Text = JSON.parse(d.Text), this.BubbleDic[d.Level] = d;
                }
                break;
            case "PropsConfig":
                for (var h = 0; h < n; h++) {
                    var f = i[h];
                    this.PropsDic[f.id] = f;
                }
        }
        // debugger
    },
    CheckHadNextProgress: function CheckHadNextProgress() {
        var e = gm.DataManager.userData.NowMission,
            t = this.GameLevelDic[e].choose;
        // console.log(t ," T =======================CheckHadNextProgress" ,t);
        return this.NowPorgress < t.length;
    },
    GetActionType: function GetActionType(e) {
        var t = gm.DataManager.userData.NowMission,
            i = this.GameLevelDic[t].choose[this.NowPorgress];
        // console.log(i ," T =======================GetActionType" ,t);
        //  cc.log(this.NowPorgress,"this.NowPorgress"), cc.log(i), cc.log(e);
        var n = i[e - 1];
        return null == n ? null : this.PropsDic[n].type;
    },
    GetActionIcon: function GetActionIcon(e) {
        var t = gm.DataManager.userData.NowMission,
            i = this.GameLevelDic[t].choose[this.NowPorgress][e - 1];
        // console.log(i ," T =======================GetActionIcon" ,t);
        return null == i ? null : this.PropsDic[i].icon;
    }
})
/*GameData: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "0756bZBk9JAOKgTyLSnjLo+", "GameData");
        n(e("GameConfig")), n(e("util")), n(e("UIInfo")), n(e("ConstModName")), n(e("GameDefine"));

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            properties: {
                ActionDic: null,
                GameLevelDic: null,
                LevelActionDic: null,
                BubbleDic: null,
                PropsDic: null,
                NowPorgress: 0
            },
            Init: function Init() {
                this.ActionDic = new Array(), this.GameLevelDic = new Array(), this.LevelActionDic = new Array(), this.BubbleDic = new Array(), this.PropsDic = new Array(), this.MainViewShowAD = !1, this.BoolNew = !1;
            },
            ParseData: function ParseData(e, t) {
                var i, n;
                switch (n = (i = t).length, cc.log(e), e) {
                    case "ActionConfig":
                        for (var a = 0; a < n; a++) {
                            var o = i[a];
                            this.ActionDic[o.ID] = o;
                        }
                        break;
                    case "GameLevelConfig":
                        for (var s = 0; s < n; s++) {
                            var r = i[s];
                            r.choose = JSON.parse(r.choose), this.GameLevelDic[r.id] = r;
                        }
                        break;
                    case "LevelActionConfig":
                        for (var c = 0; c < n; c++) {
                            var l = i[c];
                            l.Action = JSON.parse(l.Action), l.Status = JSON.parse(l.Status), this.LevelActionDic[l.ID] = l;
                        }
                        break;
                    case "BubbleConfig":
                        for (var u = 0; u < n; u++) {
                            var d = i[u];
                            d.Text = JSON.parse(d.Text), this.BubbleDic[d.Level] = d;
                        }
                        break;
                    case "PropsConfig":
                        for (var h = 0; h < n; h++) {
                            var f = i[h];
                            this.PropsDic[f.id] = f;
                        }
                }
            },
            CheckHadNextProgress: function CheckHadNextProgress() {
                var e = gm.DataManager.userData.NowMission,
                    t = this.GameLevelDic[e].choose;
                return this.NowPorgress < t.length;
            },
            GetActionType: function GetActionType(e) {
                var t = gm.DataManager.userData.NowMission,
                    i = this.GameLevelDic[t].choose[this.NowPorgress];
                cc.log("?????????????????"), cc.log(this.NowPorgress), cc.log(i), cc.log(e);
                var n = i[e - 1];
                return null == n ? null : this.PropsDic[n].type;
            },
            GetActionIcon: function GetActionIcon(e) {
                var t = gm.DataManager.userData.NowMission,
                    i = this.GameLevelDic[t].choose[this.NowPorgress][e - 1];
                return null == i ? null : this.PropsDic[i].icon;
            }
        }), 
*/