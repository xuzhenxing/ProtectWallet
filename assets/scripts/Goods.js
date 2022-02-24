

var n = require("util"),
a = require("GameConfig");

cc.Class({
    extends: require("IElement"),
    properties: {
        Price: 0,
        GoodsId: 0,
        Count: 0,
        startPos: null,
        endPos: null,
        centerPos: null,
        isStart: !1,
        dir: 0,
        runTime: 0,
        runDir: 0,
        startPercent: 0,
        rad: 0,
        type: 0,
        cornerPosition: null,
        row: 0,
        col: 0,
        dishesInitPos: null,
        FactoryId: 0,
        BussinessIndex: 0
    },
    Init: function Init(e) {
        this._super(e), this.Price = e.price, this.FactoryId = this.elementConfig.factoryId, this.BussinessIndex = this.elementConfig.bussinessIndex;
    },
    SetRunInfo: function SetRunInfo(e, t, i, n, a, o, s, r, c) {
        this.rad = e, this.startPos = t, this.dishesInitPos = t, this.endPos = i, this.centerPos = n, this.runDir = o, this.dir = a, this.startPercent = s, this.type = r, this.cornerPosition = c, this.StartRun();
    },
    StartRun: function StartRun() {
        this.isStart = !0, this.runTime = this.startPercent;
    },
    UpdatePos: function UpdatePos(e) {
        if (this.isStart) {
            var t;
            if (0 == this.type || 2 == this.type)
                if (this.runTime >= 1) this.type += 1;
                else {
                    var i,
                        o = e / (this.rad * Math.PI / 180) / 180;
                    this.runTime += o, t = this.runTime;
                    var s = (i = 0 == this.runDir ? n.VectorSlerp(this.startPos, this.endPos, this.centerPos, -t) : n.VectorSlerp(this.startPos, this.endPos, this.centerPos, t)).sub(this.cacheNode.position);
                    o = n.getDegree(s);
                    this.cacheNode.position = i, this.cacheNode.angle = o;
                } 1 == this.type ? (this.cacheNode.angle = 0, t = cc.Vec2.RIGHT.mul(e), this.cacheNode.position = this.cacheNode.position.add(t), this.cacheNode.position.x >= this.cornerPosition[1].x && (this.type += 1, this.startPos = this.cornerPosition[1], this.endPos = this.cornerPosition[2], this.runDir = 0, this.runTime = 0)) : 3 == this.type && (this.cacheNode.angle = 180, t = cc.Vec2.RIGHT.mul(-e), this.cacheNode.position = this.cacheNode.position.add(t), this.cacheNode.position.x <= this.cornerPosition[3].x && (this.type = 0, this.startPos = this.cornerPosition[3], this.endPos = this.cornerPosition[0], this.runDir = 0, this.runTime = 0));
            var r = this.row,
                c = this.col;
            if (this.cacheNode.position.y > 0 ? this.row = 0 : this.row = 1, this.cacheNode.position.x <= this.cornerPosition[3].x) this.col = 0;
            else if (this.cacheNode.position.x >= this.cornerPosition[1].x) this.col = 9;
            else {
                e = this.cacheNode.position.x - this.cornerPosition[3].x;
                this.col = Math.ceil(e / a.DishesWid);
            }
            r == this.row && c == this.col || gm.BattlePlayManager.UpdateGridInfo(this.elementConfig.factoryId, this.elementConfig.bussinessIndex, r, c, this);
        }
    },
    DisableSkin: function DisableSkin() {
        this.node.active = !1;
    },
    EnablbeSkin: function EnablbeSkin() {
        this.node.active = !0;
    },
    SendTranslateBelt: function SendTranslateBelt() {
        return gm.BattlePlayManager.AddGoodsToBelt(this.elementConfig.factoryId, this.elementConfig.bussinessIndex, this);
    },
    SendCustomer: function SendCustomer(e) {
        gm.BattlePlayManager.RemoveGridGoods(this);
        var t = e.GetCustomerEatPos(),
            i = cc.moveTo(a.GetDishesTime, t);
        this.cacheNode.runAction(i);
    },
    OnUpdate: function OnUpdate(e) {},
    Sale: function Sale() {
        gm.DataBase.ChangeCoin(this.Price, !0);
        var e = this.cacheNode.convertToWorldSpaceAR(cc.Vec2.ZERO),
            t = this.cacheNode.parent.convertToNodeSpaceAR(e);
        gm.EffectManager.PlayEffect("effect/CoinTip", .5, t, 0, 1, {
            parent: this.cacheNode.parent,
            isFront: !0,
            time: -1,
            labelCount: this.Price
        }), gm.BattlePlayManager.RemoveGoods(this);
    },
    Dispose: function Dispose() {
        this._super();
    }
})
/*Goods: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "57e9f8n5yZOj79waDXAs/9L", "Goods");
        var n = o(e("util")),
            a = o(e("GameConfig"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: e("IElement"),
            properties: {
                Price: 0,
                GoodsId: 0,
                Count: 0,
                startPos: null,
                endPos: null,
                centerPos: null,
                isStart: !1,
                dir: 0,
                runTime: 0,
                runDir: 0,
                startPercent: 0,
                rad: 0,
                type: 0,
                cornerPosition: null,
                row: 0,
                col: 0,
                dishesInitPos: null,
                FactoryId: 0,
                BussinessIndex: 0
            },
            Init: function Init(e) {
                this._super(e), this.Price = e.price, this.FactoryId = this.elementConfig.factoryId, this.BussinessIndex = this.elementConfig.bussinessIndex;
            },
            SetRunInfo: function SetRunInfo(e, t, i, n, a, o, s, r, c) {
                this.rad = e, this.startPos = t, this.dishesInitPos = t, this.endPos = i, this.centerPos = n, this.runDir = o, this.dir = a, this.startPercent = s, this.type = r, this.cornerPosition = c, this.StartRun();
            },
            StartRun: function StartRun() {
                this.isStart = !0, this.runTime = this.startPercent;
            },
            UpdatePos: function UpdatePos(e) {
                if (this.isStart) {
                    var t;
                    if (0 == this.type || 2 == this.type)
                        if (this.runTime >= 1) this.type += 1;
                        else {
                            var i,
                                o = e / (this.rad * Math.PI / 180) / 180;
                            this.runTime += o, t = this.runTime;
                            var s = (i = 0 == this.runDir ? n.default.VectorSlerp(this.startPos, this.endPos, this.centerPos, -t) : n.default.VectorSlerp(this.startPos, this.endPos, this.centerPos, t)).sub(this.cacheNode.position);
                            o = n.default.getDegree(s);
                            this.cacheNode.position = i, this.cacheNode.angle = o;
                        } 1 == this.type ? (this.cacheNode.angle = 0, t = cc.Vec2.RIGHT.mul(e), this.cacheNode.position = this.cacheNode.position.add(t), this.cacheNode.position.x >= this.cornerPosition[1].x && (this.type += 1, this.startPos = this.cornerPosition[1], this.endPos = this.cornerPosition[2], this.runDir = 0, this.runTime = 0)) : 3 == this.type && (this.cacheNode.angle = 180, t = cc.Vec2.RIGHT.mul(-e), this.cacheNode.position = this.cacheNode.position.add(t), this.cacheNode.position.x <= this.cornerPosition[3].x && (this.type = 0, this.startPos = this.cornerPosition[3], this.endPos = this.cornerPosition[0], this.runDir = 0, this.runTime = 0));
                    var r = this.row,
                        c = this.col;
                    if (this.cacheNode.position.y > 0 ? this.row = 0 : this.row = 1, this.cacheNode.position.x <= this.cornerPosition[3].x) this.col = 0;
                    else if (this.cacheNode.position.x >= this.cornerPosition[1].x) this.col = 9;
                    else {
                        e = this.cacheNode.position.x - this.cornerPosition[3].x;
                        this.col = Math.ceil(e / a.default.DishesWid);
                    }
                    r == this.row && c == this.col || gm.BattlePlayManager.UpdateGridInfo(this.elementConfig.factoryId, this.elementConfig.bussinessIndex, r, c, this);
                }
            },
            DisableSkin: function DisableSkin() {
                this.node.active = !1;
            },
            EnablbeSkin: function EnablbeSkin() {
                this.node.active = !0;
            },
            SendTranslateBelt: function SendTranslateBelt() {
                return gm.BattlePlayManager.AddGoodsToBelt(this.elementConfig.factoryId, this.elementConfig.bussinessIndex, this);
            },
            SendCustomer: function SendCustomer(e) {
                gm.BattlePlayManager.RemoveGridGoods(this);
                var t = e.GetCustomerEatPos(),
                    i = cc.moveTo(a.default.GetDishesTime, t);
                this.cacheNode.runAction(i);
            },
            OnUpdate: function OnUpdate(e) {},
            Sale: function Sale() {
                gm.DataBase.ChangeCoin(this.Price, !0);
                var e = this.cacheNode.convertToWorldSpaceAR(cc.Vec2.ZERO),
                    t = this.cacheNode.parent.convertToNodeSpaceAR(e);
                gm.EffectManager.PlayEffect("effect/CoinTip", .5, t, 0, 1, {
                    parent: this.cacheNode.parent,
                    isFront: !0,
                    time: -1,
                    labelCount: this.Price
                }), gm.BattlePlayManager.RemoveGoods(this);
            },
            Dispose: function Dispose() {
                this._super();
            }
        }), 
*/