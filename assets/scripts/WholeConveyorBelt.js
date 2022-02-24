

var n = require("util"),
a = (require("GameDefine"), require("GameConfig"));
cc.Class({
    extends: cc.Component,
    properties: {
        LeftTopEdge: cc.Node,
        LeftBottomEdge: cc.Node,
        RightTopEdge: cc.Node,
        RightBottomEdge: cc.Node,
        GoodsInitPos: cc.Node,
        BeltItem: cc.Node,
        Speed: 0,
        RunDir: 0,
        centerOffset: 0,
        beltNodeList: 0,
        FactoryId: 0,
        BussinessIndex: 0,
        rad: 0,
        Goods: null,
        cornerPosition: null
    },
    Init: function Init(e, t) {
        this.FactoryId = e, this.BussinessIndex = t, this.Goods = {}, this.CreatBelt(), this.UpdateSpeed();
    },
    UpdateSpeed: function UpdateSpeed() {
        var e = gm.DataBase.FactoryData[this.FactoryId][this.BussinessIndex].speedLv,
            t = gm.GameData.FactoryDic[this.FactoryId],
            i = parseInt(t.speedUpgradeVal * (e - 1)),
            n = t.tanslateSpeed - i,
            a = 360 * this.rad * Math.PI / 180 + 2 * this.LeftTopEdge.position.sub(this.RightTopEdge.position).mag();
        this.Speed = a / (n / 1e3);
    },
    CreatBelt: function CreatBelt() {
        this.beltNodeList = new Array();
        var t = this.LeftTopEdge.position,
            i = this.RightTopEdge.position,
            a = this.LeftBottomEdge.position,
            o = this.RightBottomEdge.position;
        this.cornerPosition = new Array(), this.cornerPosition.push(t), this.cornerPosition.push(i), this.cornerPosition.push(o), this.cornerPosition.push(a), this.rad = t.sub(a).mag() / 2;
        for (var s = t.sub(i).mag(), r = 0, c = !1, l = 180 * this.rad * Math.PI / 180, u = l / this.BeltItem.width, d = 0; d < 2; d++) {
            for (var h = 0; h <= u; h++) {
                var f = 0;
                0 == d ? (m = n.VectorSlerp(i, o, 0, -h * this.BeltItem.width / l), v = o, y = i, f = 2) : (m = n.VectorSlerp(t, a, 0, h * this.BeltItem.width / l), v = t, y = a, f = 0), (w = cc.instantiate(this.BeltItem)).active = !0, w.parent = this.node, w.position = m, c = !1, (r += 1) % 2 == 0 && (c = !0), (C = new(require("Belt"))()).Init(w, this.rad, y, v, 0, 1, this.RunDir, h * this.BeltItem.width / l, f, this.cornerPosition, c), this.beltNodeList.push(C);
            }
        }
        u = s / this.BeltItem.width - 2;
        for (var p = 0; p < 2; p++) {
            for (var g = 0; g <= u; g++) {
                var m, v, y, w, C;
                f = 1;
                0 == p ? (v = i, m = (y = t).add(cc.Vec2.RIGHT.mul(this.BeltItem.width * (g + 1))), f = 1) : (v = a, m = (y = o).add(cc.Vec2.RIGHT.mul(-this.BeltItem.width * (g + 1))), f = 3), (w = cc.instantiate(this.BeltItem)).active = !0, w.parent = this.node, w.position = m, c = !1, (r += 1) % 2 == 0 && (c = !0), (C = new(require("Belt"))()).Init(w, this.rad, y, v, 0, 1, this.RunDir, g * this.BeltItem.width / l, f, this.cornerPosition, c), this.beltNodeList.push(C);
            }
        }
    },
    CheckSendDishes: function CheckSendDishes() {
        var e = 0;
        e = this.GoodsInitPos.position.y > 0 ? 0 : 1;
        var t = this.GoodsInitPos.position.x - this.cornerPosition[3].x,
            i = Math.ceil(t / a.DishesWid);
        return !!gm.BattlePlayManager.CheckDishesFree(this.FactoryId, this.BussinessIndex, e, i, this.GoodsInitPos.position);
    },
    AddGoods: function AddGoods(e) {
        if (this.CheckSendDishes()) {
            this.Goods[e.elementConfig.id] = e, e.cacheNode.parent = this.node, e.cacheNode.position = this.GoodsInitPos.position;
            var t = this.LeftBottomEdge.position,
                i = this.GoodsInitPos.position;
            return e.SetRunInfo(this.rad, i, t, 0, 1, this.RunDir, .5, 3, this.cornerPosition), !0;
        }
        return !1;
    },
    RemoveGoods: function RemoveGoods(e) {
        null != this.Goods[e.elementConfig.id] && delete this.Goods[e.elementConfig.id];
    },
    OnUpdate: function OnUpdate(e) {
        for (var t = this.beltNodeList.length, i = 0; i < t; i++) {
            this.beltNodeList[i].UpdatePos(this.Speed * e);
        }
        for (var n in this.Goods) {
            if (this.Goods.hasOwnProperty(n)) this.Goods[n].UpdatePos(this.Speed * e);
        }
    }
})
/*WholeConveyorBelt: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "3d996ernxVBUpH7WyiufaTk", "WholeConveyorBelt");
        var n = o(e("util")),
            a = (o(e("GameDefine")), o(e("GameConfig")));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            properties: {
                LeftTopEdge: cc.Node,
                LeftBottomEdge: cc.Node,
                RightTopEdge: cc.Node,
                RightBottomEdge: cc.Node,
                GoodsInitPos: cc.Node,
                BeltItem: cc.Node,
                Speed: 0,
                RunDir: 0,
                centerOffset: 0,
                beltNodeList: 0,
                FactoryId: 0,
                BussinessIndex: 0,
                rad: 0,
                Goods: null,
                cornerPosition: null
            },
            Init: function Init(e, t) {
                this.FactoryId = e, this.BussinessIndex = t, this.Goods = {}, this.CreatBelt(), this.UpdateSpeed();
            },
            UpdateSpeed: function UpdateSpeed() {
                var e = gm.DataBase.FactoryData[this.FactoryId][this.BussinessIndex].speedLv,
                    t = gm.GameData.FactoryDic[this.FactoryId],
                    i = parseInt(t.speedUpgradeVal * (e - 1)),
                    n = t.tanslateSpeed - i,
                    a = 360 * this.rad * Math.PI / 180 + 2 * this.LeftTopEdge.position.sub(this.RightTopEdge.position).mag();
                this.Speed = a / (n / 1e3);
            },
            CreatBelt: function CreatBelt() {
                this.beltNodeList = new Array();
                var t = this.LeftTopEdge.position,
                    i = this.RightTopEdge.position,
                    a = this.LeftBottomEdge.position,
                    o = this.RightBottomEdge.position;
                this.cornerPosition = new Array(), this.cornerPosition.push(t), this.cornerPosition.push(i), this.cornerPosition.push(o), this.cornerPosition.push(a), this.rad = t.sub(a).mag() / 2;
                for (var s = t.sub(i).mag(), r = 0, c = !1, l = 180 * this.rad * Math.PI / 180, u = l / this.BeltItem.width, d = 0; d < 2; d++) {
                    for (var h = 0; h <= u; h++) {
                        var f = 0;
                        0 == d ? (m = n.default.VectorSlerp(i, o, 0, -h * this.BeltItem.width / l), v = o, y = i, f = 2) : (m = n.default.VectorSlerp(t, a, 0, h * this.BeltItem.width / l), v = t, y = a, f = 0), (w = cc.instantiate(this.BeltItem)).active = !0, w.parent = this.node, w.position = m, c = !1, (r += 1) % 2 == 0 && (c = !0), (C = new(e("Belt"))()).Init(w, this.rad, y, v, 0, 1, this.RunDir, h * this.BeltItem.width / l, f, this.cornerPosition, c), this.beltNodeList.push(C);
                    }
                }
                u = s / this.BeltItem.width - 2;
                for (var p = 0; p < 2; p++) {
                    for (var g = 0; g <= u; g++) {
                        var m, v, y, w, C;
                        f = 1;
                        0 == p ? (v = i, m = (y = t).add(cc.Vec2.RIGHT.mul(this.BeltItem.width * (g + 1))), f = 1) : (v = a, m = (y = o).add(cc.Vec2.RIGHT.mul(-this.BeltItem.width * (g + 1))), f = 3), (w = cc.instantiate(this.BeltItem)).active = !0, w.parent = this.node, w.position = m, c = !1, (r += 1) % 2 == 0 && (c = !0), (C = new(e("Belt"))()).Init(w, this.rad, y, v, 0, 1, this.RunDir, g * this.BeltItem.width / l, f, this.cornerPosition, c), this.beltNodeList.push(C);
                    }
                }
            },
            CheckSendDishes: function CheckSendDishes() {
                var e = 0;
                e = this.GoodsInitPos.position.y > 0 ? 0 : 1;
                var t = this.GoodsInitPos.position.x - this.cornerPosition[3].x,
                    i = Math.ceil(t / a.default.DishesWid);
                return !!gm.BattlePlayManager.CheckDishesFree(this.FactoryId, this.BussinessIndex, e, i, this.GoodsInitPos.position);
            },
            AddGoods: function AddGoods(e) {
                if (this.CheckSendDishes()) {
                    this.Goods[e.elementConfig.id] = e, e.cacheNode.parent = this.node, e.cacheNode.position = this.GoodsInitPos.position;
                    var t = this.LeftBottomEdge.position,
                        i = this.GoodsInitPos.position;
                    return e.SetRunInfo(this.rad, i, t, 0, 1, this.RunDir, .5, 3, this.cornerPosition), !0;
                }
                return !1;
            },
            RemoveGoods: function RemoveGoods(e) {
                null != this.Goods[e.elementConfig.id] && delete this.Goods[e.elementConfig.id];
            },
            OnUpdate: function OnUpdate(e) {
                for (var t = this.beltNodeList.length, i = 0; i < t; i++) {
                    this.beltNodeList[i].UpdatePos(this.Speed * e);
                }
                for (var n in this.Goods) {
                    if (this.Goods.hasOwnProperty(n)) this.Goods[n].UpdatePos(this.Speed * e);
                }
            }
        }), 
*/