

var n = require("GameConfig");
require("GameDefine");

cc.Class({
    extends: require("IElement"),
    properties: {
        FactoryId: 0,
        BussinessIndex: 0,
        SeatIndex: 0,
        GoodsId: 0,
        GoodsConfig: null,
        BuffCom: null,
        ProperCom: null,
        State: null,
        StartProduceTime: -1,
        ProduceCompleteTime: -1,
        CurRaw: null,
        CurGoods: null,
        Level: 0,
        DishesRow: 0,
        DishesCol: 0,
        preTouchTime: 0
    },
    Init: function Init(t) {
        this._super(t), this.FactoryId = t.factoryId, this.BussinessIndex = t.bussinessIndex, this.Level = gm.DataBase.FactoryData[this.FactoryId][this.BussinessIndex].dishLv, this.GoodsId = this.GetDishesType(), this.GoodsConfig = gm.GameData.ItemDic[this.GoodsId], this.BuffCom = new(require("BuffComponent"))(), this.ProperCom = new(require("PropertyComponent"))(), this.BuffCom.Init(this), this.ProperCom.Init(this), this.FillProperty(), this.components.push(this.BuffCom), this.components.push(this.ProperCom), this.SetState(n.ChefState.Free), this.cacheNode.width = 100, this.cacheNode.height = 100, this.cacheNode.on(cc.Node.EventType.TOUCH_END, this.OnTouch.bind(this), this);
    },
    OnTouch: function OnTouch(e) {
        console.log("OnTouch")
        this.preTouchTime <= 0 && (this.preTouchTime = n.ClickGapTime, this.StartProduceTime = 0);
    },
    GetDishesType: function GetDishesType() {
        for (var e = gm.GameData.FactoryDic[this.FactoryId], t = -1, i = e.dishesUnlockLevel, n = i.length, a = 0; a < n; a++) {
            var o = parseInt(i[a], 10),
                s = o;
            if (a < n - 1 && (s = parseInt(i[a + 1], 10)), this.Level >= o && this.Level < s) {
                t = a;
                break;
            }
            if (o == s) {
                t = a;
                break;
            }
        }
        return e.levelToDishes[this.BussinessIndex][t];
    },
    FillProperty: function FillProperty() {
        var e = gm.GameData.FactoryDic[this.FactoryId],
            t = parseFloat(e.tanslateSpeed) / 5;
        this.ProperCom.SetBaseVal(n.ChefProperty.ProduceSpeed, t);
        var i = gm.DataBase.FactoryData[this.FactoryId][this.BussinessIndex].speedLv,
            a = parseFloat(e.speedUpgradeVal * (i - 1));
        this.ProperCom.ChangeVal(n.ChefProperty.ProduceSpeed, -a);
    },
    OnUpdate: function OnUpdate(e) {
        0 != this.enabled && (this._super(e), this.ChefActionCheck(e), this.preTouchTime > 0 && (this.preTouchTime -= e, this.preTouchTime < 0 && (this.preTouchTime = 0)));
    },
    SetState: function SetState(e) {
        this.State = e;
    },
    ChefActionCheck: function ChefActionCheck(e) {
        this.State == n.ChefState.Free ? (this.SetState(n.ChefState.Working), this.StartProduceTime = this.ProperCom.GetProperty(n.ChefProperty.ProduceSpeed, !0) / 1e3, this.CreateRawMat(this.FactoryId, this.BussinessIndex, this.SeatIndex, this.GoodsId, n.ElementType.Raw)) : this.State == n.ChefState.Working ? (this.StartProduceTime -= e, this.StartProduceTime <= 0 && (this.SetState(n.ChefState.WorkComplete), this.ProduceCompleteTime = .1, null != this.CurRaw && (this.CurRaw.Dispose(), this.CurRaw = null), this.CreateGoods(this.FactoryId, this.BussinessIndex, this.SeatIndex, this.GoodsId, n.ElementType.Goods))) : this.State == n.ChefState.WorkComplete && (this.ProduceCompleteTime -= e, this.ProduceCompleteTime <= 0 && this.CurGoods.SendTranslateBelt() && this.SetState(n.ChefState.Free));
    },
    CreateRawMat: function CreateRawMat(e, t, i, n, a) {
        this.CurRaw = gm.BattlePlayManager.AddGoods(e, t, i, n, a);
    },
    CreateGoods: function CreateGoods(e, t, i, n, a) {
        this.CurGoods = gm.BattlePlayManager.AddGoods(e, t, i, n, a);
    },
    UpgradeLevel: function UpgradeLevel() {
        var e = gm.GameData.FactoryDic[this.FactoryId],
            t = parseFloat(e.tanslateSpeed) / 5;
        this.ProperCom.Reset(n.ChefProperty.ProduceSpeed), this.ProperCom.SetBaseVal(n.ChefProperty.ProduceSpeed, t);
        var i = gm.DataBase.FactoryData[this.FactoryId][this.BussinessIndex].speedLv,
            a = parseFloat(e.speedUpgradeVal * (i - 1));
        this.ProperCom.ChangeVal(n.ChefProperty.ProduceSpeed, -a);
    }
})
/*Chef: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "fc0a3scq31Ms4Ns6ayYiXdS", "Chef");
        var n = a(e("GameConfig"));
        a(e("GameDefine"));

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: e("IElement"),
            properties: {
                FactoryId: 0,
                BussinessIndex: 0,
                SeatIndex: 0,
                GoodsId: 0,
                GoodsConfig: null,
                BuffCom: null,
                ProperCom: null,
                State: null,
                StartProduceTime: -1,
                ProduceCompleteTime: -1,
                CurRaw: null,
                CurGoods: null,
                Level: 0,
                DishesRow: 0,
                DishesCol: 0,
                preTouchTime: 0
            },
            Init: function Init(t) {
                this._super(t), this.FactoryId = t.factoryId, this.BussinessIndex = t.bussinessIndex, this.Level = gm.DataBase.FactoryData[this.FactoryId][this.BussinessIndex].dishLv, this.GoodsId = this.GetDishesType(), this.GoodsConfig = gm.GameData.ItemDic[this.GoodsId], this.BuffCom = new(e("BuffComponent"))(), this.ProperCom = new(e("PropertyComponent"))(), this.BuffCom.Init(this), this.ProperCom.Init(this), this.FillProperty(), this.components.push(this.BuffCom), this.components.push(this.ProperCom), this.SetState(n.default.ChefState.Free), this.cacheNode.width = 100, this.cacheNode.height = 100, this.cacheNode.on(cc.Node.EventType.TOUCH_END, this.OnTouch.bind(this), this);
            },
            OnTouch: function OnTouch(e) {
                this.preTouchTime <= 0 && (this.preTouchTime = n.default.ClickGapTime, this.StartProduceTime = 0);
            },
            GetDishesType: function GetDishesType() {
                for (var e = gm.GameData.FactoryDic[this.FactoryId], t = -1, i = e.dishesUnlockLevel, n = i.length, a = 0; a < n; a++) {
                    var o = parseInt(i[a], 10),
                        s = o;
                    if (a < n - 1 && (s = parseInt(i[a + 1], 10)), this.Level >= o && this.Level < s) {
                        t = a;
                        break;
                    }
                    if (o == s) {
                        t = a;
                        break;
                    }
                }
                return e.levelToDishes[this.BussinessIndex][t];
            },
            FillProperty: function FillProperty() {
                var e = gm.GameData.FactoryDic[this.FactoryId],
                    t = parseFloat(e.tanslateSpeed) / 5;
                this.ProperCom.SetBaseVal(n.default.ChefProperty.ProduceSpeed, t);
                var i = gm.DataBase.FactoryData[this.FactoryId][this.BussinessIndex].speedLv,
                    a = parseFloat(e.speedUpgradeVal * (i - 1));
                this.ProperCom.ChangeVal(n.default.ChefProperty.ProduceSpeed, -a);
            },
            OnUpdate: function OnUpdate(e) {
                0 != this.enabled && (this._super(e), this.ChefActionCheck(e), this.preTouchTime > 0 && (this.preTouchTime -= e, this.preTouchTime < 0 && (this.preTouchTime = 0)));
            },
            SetState: function SetState(e) {
                this.State = e;
            },
            ChefActionCheck: function ChefActionCheck(e) {
                this.State == n.default.ChefState.Free ? (this.SetState(n.default.ChefState.Working), this.StartProduceTime = this.ProperCom.GetProperty(n.default.ChefProperty.ProduceSpeed, !0) / 1e3, this.CreateRawMat(this.FactoryId, this.BussinessIndex, this.SeatIndex, this.GoodsId, n.default.ElementType.Raw)) : this.State == n.default.ChefState.Working ? (this.StartProduceTime -= e, this.StartProduceTime <= 0 && (this.SetState(n.default.ChefState.WorkComplete), this.ProduceCompleteTime = .1, null != this.CurRaw && (this.CurRaw.Dispose(), this.CurRaw = null), this.CreateGoods(this.FactoryId, this.BussinessIndex, this.SeatIndex, this.GoodsId, n.default.ElementType.Goods))) : this.State == n.default.ChefState.WorkComplete && (this.ProduceCompleteTime -= e, this.ProduceCompleteTime <= 0 && this.CurGoods.SendTranslateBelt() && this.SetState(n.default.ChefState.Free));
            },
            CreateRawMat: function CreateRawMat(e, t, i, n, a) {
                this.CurRaw = gm.BattlePlayManager.AddGoods(e, t, i, n, a);
            },
            CreateGoods: function CreateGoods(e, t, i, n, a) {
                this.CurGoods = gm.BattlePlayManager.AddGoods(e, t, i, n, a);
            },
            UpgradeLevel: function UpgradeLevel() {
                var e = gm.GameData.FactoryDic[this.FactoryId],
                    t = parseFloat(e.tanslateSpeed) / 5;
                this.ProperCom.Reset(n.default.ChefProperty.ProduceSpeed), this.ProperCom.SetBaseVal(n.default.ChefProperty.ProduceSpeed, t);
                var i = gm.DataBase.FactoryData[this.FactoryId][this.BussinessIndex].speedLv,
                    a = parseFloat(e.speedUpgradeVal * (i - 1));
                this.ProperCom.ChangeVal(n.default.ChefProperty.ProduceSpeed, -a);
            }
        }), 
*/