
 var n = require("GameConfig"),
 a = require("util");
cc.Class({
    extends: require("BattlePlay"),
    properties: {
        CustomerDic: null,
        ChefDic: null,
        BeltList: null,
        GridInfo: null,
        TableSeatManager: null
    },
    Init: function Init(t) {
        this._super(t), this.enabled = !0, this.CustomerDic = {}, this.ChefDic = {}, this.BeltList = {}, this.GridInfo = {}, this.TableSeatManager = new(require("TableSeatManager"))(), this.TableSeatManager.Init(), gm.Workers = t.widgetTable.Workers, this.InitCustomer();
    },
    InitCustomer: function InitCustomer() {
        for (var e = Object.keys(gm.GameData.FactoryDic), t = e.length, i = 0; i < t; i++) {
            var a = e[i],
                o = gm.GameData.FactoryDic[a],
                s = o.businessCount,
                r = gm.DataBase.FactoryData[a];
            this.BeltList[a] = new Array();
            for (var c = 0; c < s; c++) {
                if (null != r) {
                    for (var l = r[c], u = o.seatConfig[1], d = 0; d < u; d++) {
                        -1 != l.pos[d] && this.AddCustomer(a, c, this.parentCom.componentTable["Factory_" + a].Tables[c]["Seat_" + d], d, n.CustomerState.WaitEat);
                    }
                    l.dishLv > 0 && this.UnlockBussiness(a, c);
                }
            }
        }
    },
    UnlockBussiness: function UnlockBussiness(e, t) {
        var i = gm.DataBase.FactoryData[e][t];
        this.ActiveBelt(e, t), this.AddChef(e, t, this.parentCom.componentTable["Factory_" + e].Tables[t].Chef), this.TableSeatManager.AddTable(e, t, i.pos);
    },
    UpgradeBussinessSpeed: function UpgradeBussinessSpeed(e, t) {
        this.BeltList[e][t].UpdateSpeed(), this.ChefDic[e][t].UpgradeLevel();
    },
    GetEatGoods: function GetEatGoods(e, t, i, n, a) {
        if (null == this.GridInfo[e] || null == this.GridInfo[e][t]) return null;
        var o = this.GridInfo[e][t][i];
        if (null != o)
            for (var s = o.length, r = 0; r < s; r++) {
                var c = o[r];
                if (null != c)
                    for (var l = c.length, u = 0; u < l; u++) {
                        var d = c[u];
                        if (null != d) {
                            var h = d.cacheNode.position.sub(a),
                                f = cc.Vec2.UP;
                            if (0 == i && (f = f.mul(-1)), 180 * f.angle(h) / Math.PI < n) return d;
                        }
                    }
            }
        return null;
    },
    UpdateGridInfo: function UpdateGridInfo(e, t, i, n, a) {
        var o,
            s = a.row,
            r = a.col;
        null == this.GridInfo[e] && (this.GridInfo[e] = new Array()), null == this.GridInfo[e][t] && (this.GridInfo[e][t] = new Array()), null == (o = this.GridInfo[e][t])[a.row] && (o[a.row] = new Array()), null == o[a.row][a.col] && (o[a.row][a.col] = new Array());
        var c,
            l = o[s][r];
        if (null != o[i] && null != (c = o[i][n])) {
            var u = c.indexOf(a);
            u > -1 && c.splice(u, 1);
        } - 1 == l.indexOf(a) && l.push(a);
    },
    RemoveGridGoods: function RemoveGridGoods(e) {
        var t,
            i = e.row,
            n = e.col,
            a = this.GridInfo[e.FactoryId][e.BussinessIndex];
        if (null != a[i] && null != (t = a[i][n])) {
            var o = t.indexOf(e);
            o > -1 && t.splice(o, 1);
        }
        this.BeltList[e.elementConfig.factoryId][e.elementConfig.bussinessIndex].RemoveGoods(e);
    },
    CheckDishesFree: function CheckDishesFree(e, t, i, a, o) {
        if (null == this.GridInfo[e] || null == this.GridInfo[e][t]) return !0;
        var s = this.GridInfo[e][t];
        if (null != s[i]) {
            var r = s[i][a];
            if (null != r && r.length > 0) return !1;
            if (null != s[i][a + 1] && s[i][a + 1].length > 0 && s[i][a + 1][0].cacheNode.position.sub(o).mag() < n.DishesWid) return !1;
            if (null != s[i][a - 1] && s[i][a - 1].length > 0 && s[i][a - 1][0].cacheNode.position.sub(o).mag() < n.DishesWid) return !1;
        }
        return !0;
    },
    ActiveBelt: function ActiveBelt(e, t) {
        var i = this.parentCom.componentTable["Factory_" + e].Tables[t].Belts;
        this.BeltList[e][t] = i, i.Init(e, t);
    },
    AddGoodsToBelt: function AddGoodsToBelt(e, t, i) {
        return null != this.BeltList[e] && null != this.BeltList[e][t] && this.BeltList[e][t].AddGoods(i);
    },
    GetCustomerPath: function GetCustomerPath(e, t, i, n) {
        var o = null,
            s = cc.Vec2.ZERO;
        (o = 0 == i ? this.parentCom.componentTable["Factory_" + e].Tables[t].UpPath : this.parentCom.componentTable["Factory_" + e].Tables[t].DownPath, 0 == n) ? s = a.GetChildByName(o, "Enter").convertToWorldSpaceAR(cc.Vec2.ZERO): s = a.GetChildByName(o, "Exit").convertToWorldSpaceAR(cc.Vec2.ZERO);
        return s;
    },
    RemoveCustomer: function RemoveCustomer(e) {
        delete this.CustomerDic[e.elementConfig.id], e.Dispose();
    },
    ChangeSeatState: function ChangeSeatState(e, t, i, n) {
        this.parentCom.componentTable["Factory_" + e].Tables[t]["SeatBg_" + i].active = n, 1 == n && this.TableSeatManager.RemoveCustomer(e, t, i);
    },
    GetSeatPos: function GetSeatPos(e, t, i) {
        return this.parentCom.componentTable["Factory_" + e].Tables[t]["Seat_" + i].convertToWorldSpaceAR(cc.Vec2.ZERO);
    },
    AddCustomerToEnter: function AddCustomerToEnter(t, i, o, s) {
        var r = a.GenerateUUID(),
            c = new(require("ElementConfig"))();
        c.name = "Customer", c.elementType = n.ElementType.Customer, c.id = r, c.resourcePath = "model/Customer_" + a.getRandom(1, 7), c.factoryId = t, c.bussinessIndex = i, c.seatIndex = o;
        var l = new(require("Customer"))(),
            u = this.parentCom.componentTable["Factory_" + t].Tables[i]["Seat_" + o],
            d = u.convertToNodeSpaceAR(this.GetCustomerPath(t, i, s, 0));
        return c.position = d, c.parent = u, l.Init(c), l.SetState(n.CustomerState.Enter), this.CustomerDic[c.id] = l, l;
    },
    AddCustomer: function AddCustomer(t, i, o, s, r) {
        var c = a.GenerateUUID(),
            l = new(require("ElementConfig"))();
        l.name = "Customer", l.elementType = n.ElementType.Customer, l.id = c, l.resourcePath = "model/Customer_" + a.getRandom(1, 7), l.factoryId = t, l.bussinessIndex = i, l.seatIndex = s;
        var u = new(require("Customer"))();
        return s <= 4 ? (l.position = new cc.Vec2(0, 20), l.rotation = 180) : (l.position = new cc.Vec2(0, -20), l.rotation = 0), l.parent = o, u.Init(l), u.SetState(n.CustomerState.WaitEat), this.CustomerDic[l.id] = u, u;
    },
    AddChef: function AddChef(t, i, o) {
        var s = a.GenerateUUID(),
            r = new(require("ElementConfig"))();
        r.name = "Chef", r.elementType = n.ElementType.Chef, r.id = s, r.resourcePath = "model/Chef_" + a.getRandom(1, 5), r.factoryId = t, r.bussinessIndex = i;
        var c = new(require("Chef"))();
        return r.position = new cc.Vec2(0, 20), r.parent = o, c.Init(r), null == this.ChefDic[t] && (this.ChefDic[t] = new Array()), this.ChefDic[t][i] = c, c;
    },
    AddGoods: function AddGoods(t, i, o, s, r) {
        var c = a.GenerateUUID(),
            l = new(require("ElementConfig"))();
        l.name = "Goods", l.elementType = r, l.id = c, r == n.ElementType.Raw ? l.resourcePath = "model/Raw" : r == n.ElementType.Goods && (l.resourcePath = "model/Goods");
        gm.GameData.FactoryDic[t];
        l.parent = this.parentCom.componentTable["Factory_" + t].Tables[i].SeatRaw, l.translateBelt = this.parentCom.componentTable["Factory_" + t].Tables[i].TranslatePos, l.position = cc.Vec2.ZERO, l.price = gm.GameData.GetDishesPrice(t, i, gm.DataBase.FactoryData[t][i].dishLv), l.goodsId = s, l.factoryId = t, l.bussinessIndex = i;
        var u = new(require("Goods"))();
        return u.Init(l), this.CustomerDic[l.id] = u, u;
    },
    RemoveGoods: function RemoveGoods(e) {
        var t = e.elementConfig.id;
        delete this.CustomerDic[t], this.RemoveGridGoods(e), e.Dispose();
    },
    UpgradeCustomer: function UpgradeCustomer(e, t) {
        for (var i in this.CustomerDic) {
            if (this.CustomerDic.hasOwnProperty(i)) {
                var n = this.CustomerDic[i];
                n.FactoryId == e && n.BussinessIndex == t && n.UpgradeLevel();
            }
        }
    },
    OnUpdate: function OnUpdate(e) {
        if (0 != this.enabled) {
            for (var t in this.BeltList) {
                if (this.BeltList.hasOwnProperty(t))
                    for (var i = this.BeltList[t], n = i.length, a = 0; a < n; a++) {
                        var o = i[a];
                        null != o && o.OnUpdate(e);
                    }
            }
            for (var s in this.CustomerDic) {
                if (this.CustomerDic.hasOwnProperty(s)) this.CustomerDic[s].OnUpdate(e);
            }
            for (var r in this.ChefDic) {
                if (this.ChefDic.hasOwnProperty(r))
                    for (var c = this.ChefDic[r], l = (n = c.length, 0); l < n; l++) {
                        var u = c[l];
                        null != u && u.OnUpdate(e);
                    }
            }
            this.TableSeatManager.OnUpdate(e);
        }
    }
})

/*BattlePlayManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "437a1U469ZNhYzpy2QmnE8d", "BattlePlayManager");
        var n = o(e("GameConfig")),
            a = o(e("util"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: e("BattlePlay"),
            properties: {
                CustomerDic: null,
                ChefDic: null,
                BeltList: null,
                GridInfo: null,
                TableSeatManager: null
            },
            Init: function Init(t) {
                this._super(t), this.enabled = !0, this.CustomerDic = {}, this.ChefDic = {}, this.BeltList = {}, this.GridInfo = {}, this.TableSeatManager = new(e("TableSeatManager"))(), this.TableSeatManager.Init(), gm.Workers = t.widgetTable.Workers, this.InitCustomer();
            },
            InitCustomer: function InitCustomer() {
                for (var e = Object.keys(gm.GameData.FactoryDic), t = e.length, i = 0; i < t; i++) {
                    var a = e[i],
                        o = gm.GameData.FactoryDic[a],
                        s = o.businessCount,
                        r = gm.DataBase.FactoryData[a];
                    this.BeltList[a] = new Array();
                    for (var c = 0; c < s; c++) {
                        if (null != r) {
                            for (var l = r[c], u = o.seatConfig[1], d = 0; d < u; d++) {
                                -1 != l.pos[d] && this.AddCustomer(a, c, this.parentCom.componentTable["Factory_" + a].Tables[c]["Seat_" + d], d, n.default.CustomerState.WaitEat);
                            }
                            l.dishLv > 0 && this.UnlockBussiness(a, c);
                        }
                    }
                }
            },
            UnlockBussiness: function UnlockBussiness(e, t) {
                var i = gm.DataBase.FactoryData[e][t];
                this.ActiveBelt(e, t), this.AddChef(e, t, this.parentCom.componentTable["Factory_" + e].Tables[t].Chef), this.TableSeatManager.AddTable(e, t, i.pos);
            },
            UpgradeBussinessSpeed: function UpgradeBussinessSpeed(e, t) {
                this.BeltList[e][t].UpdateSpeed(), this.ChefDic[e][t].UpgradeLevel();
            },
            GetEatGoods: function GetEatGoods(e, t, i, n, a) {
                if (null == this.GridInfo[e] || null == this.GridInfo[e][t]) return null;
                var o = this.GridInfo[e][t][i];
                if (null != o)
                    for (var s = o.length, r = 0; r < s; r++) {
                        var c = o[r];
                        if (null != c)
                            for (var l = c.length, u = 0; u < l; u++) {
                                var d = c[u];
                                if (null != d) {
                                    var h = d.cacheNode.position.sub(a),
                                        f = cc.Vec2.UP;
                                    if (0 == i && (f = f.mul(-1)), 180 * f.angle(h) / Math.PI < n) return d;
                                }
                            }
                    }
                return null;
            },
            UpdateGridInfo: function UpdateGridInfo(e, t, i, n, a) {
                var o,
                    s = a.row,
                    r = a.col;
                null == this.GridInfo[e] && (this.GridInfo[e] = new Array()), null == this.GridInfo[e][t] && (this.GridInfo[e][t] = new Array()), null == (o = this.GridInfo[e][t])[a.row] && (o[a.row] = new Array()), null == o[a.row][a.col] && (o[a.row][a.col] = new Array());
                var c,
                    l = o[s][r];
                if (null != o[i] && null != (c = o[i][n])) {
                    var u = c.indexOf(a);
                    u > -1 && c.splice(u, 1);
                } - 1 == l.indexOf(a) && l.push(a);
            },
            RemoveGridGoods: function RemoveGridGoods(e) {
                var t,
                    i = e.row,
                    n = e.col,
                    a = this.GridInfo[e.FactoryId][e.BussinessIndex];
                if (null != a[i] && null != (t = a[i][n])) {
                    var o = t.indexOf(e);
                    o > -1 && t.splice(o, 1);
                }
                this.BeltList[e.elementConfig.factoryId][e.elementConfig.bussinessIndex].RemoveGoods(e);
            },
            CheckDishesFree: function CheckDishesFree(e, t, i, a, o) {
                if (null == this.GridInfo[e] || null == this.GridInfo[e][t]) return !0;
                var s = this.GridInfo[e][t];
                if (null != s[i]) {
                    var r = s[i][a];
                    if (null != r && r.length > 0) return !1;
                    if (null != s[i][a + 1] && s[i][a + 1].length > 0 && s[i][a + 1][0].cacheNode.position.sub(o).mag() < n.default.DishesWid) return !1;
                    if (null != s[i][a - 1] && s[i][a - 1].length > 0 && s[i][a - 1][0].cacheNode.position.sub(o).mag() < n.default.DishesWid) return !1;
                }
                return !0;
            },
            ActiveBelt: function ActiveBelt(e, t) {
                var i = this.parentCom.componentTable["Factory_" + e].Tables[t].Belts;
                this.BeltList[e][t] = i, i.Init(e, t);
            },
            AddGoodsToBelt: function AddGoodsToBelt(e, t, i) {
                return null != this.BeltList[e] && null != this.BeltList[e][t] && this.BeltList[e][t].AddGoods(i);
            },
            GetCustomerPath: function GetCustomerPath(e, t, i, n) {
                var o = null,
                    s = cc.Vec2.ZERO;
                (o = 0 == i ? this.parentCom.componentTable["Factory_" + e].Tables[t].UpPath : this.parentCom.componentTable["Factory_" + e].Tables[t].DownPath, 0 == n) ? s = a.default.GetChildByName(o, "Enter").convertToWorldSpaceAR(cc.Vec2.ZERO): s = a.default.GetChildByName(o, "Exit").convertToWorldSpaceAR(cc.Vec2.ZERO);
                return s;
            },
            RemoveCustomer: function RemoveCustomer(e) {
                delete this.CustomerDic[e.elementConfig.id], e.Dispose();
            },
            ChangeSeatState: function ChangeSeatState(e, t, i, n) {
                this.parentCom.componentTable["Factory_" + e].Tables[t]["SeatBg_" + i].active = n, 1 == n && this.TableSeatManager.RemoveCustomer(e, t, i);
            },
            GetSeatPos: function GetSeatPos(e, t, i) {
                return this.parentCom.componentTable["Factory_" + e].Tables[t]["Seat_" + i].convertToWorldSpaceAR(cc.Vec2.ZERO);
            },
            AddCustomerToEnter: function AddCustomerToEnter(t, i, o, s) {
                var r = a.default.GenerateUUID(),
                    c = new(e("ElementConfig"))();
                c.name = "Customer", c.elementType = n.default.ElementType.Customer, c.id = r, c.resourcePath = "model/Customer_" + a.default.getRandom(1, 7), c.factoryId = t, c.bussinessIndex = i, c.seatIndex = o;
                var l = new(e("Customer"))(),
                    u = this.parentCom.componentTable["Factory_" + t].Tables[i]["Seat_" + o],
                    d = u.convertToNodeSpaceAR(this.GetCustomerPath(t, i, s, 0));
                return c.position = d, c.parent = u, l.Init(c), l.SetState(n.default.CustomerState.Enter), this.CustomerDic[c.id] = l, l;
            },
            AddCustomer: function AddCustomer(t, i, o, s, r) {
                var c = a.default.GenerateUUID(),
                    l = new(e("ElementConfig"))();
                l.name = "Customer", l.elementType = n.default.ElementType.Customer, l.id = c, l.resourcePath = "model/Customer_" + a.default.getRandom(1, 7), l.factoryId = t, l.bussinessIndex = i, l.seatIndex = s;
                var u = new(e("Customer"))();
                return s <= 4 ? (l.position = new cc.Vec2(0, 20), l.rotation = 180) : (l.position = new cc.Vec2(0, -20), l.rotation = 0), l.parent = o, u.Init(l), u.SetState(n.default.CustomerState.WaitEat), this.CustomerDic[l.id] = u, u;
            },
            AddChef: function AddChef(t, i, o) {
                var s = a.default.GenerateUUID(),
                    r = new(e("ElementConfig"))();
                r.name = "Chef", r.elementType = n.default.ElementType.Chef, r.id = s, r.resourcePath = "model/Chef_" + a.default.getRandom(1, 5), r.factoryId = t, r.bussinessIndex = i;
                var c = new(e("Chef"))();
                return r.position = new cc.Vec2(0, 20), r.parent = o, c.Init(r), null == this.ChefDic[t] && (this.ChefDic[t] = new Array()), this.ChefDic[t][i] = c, c;
            },
            AddGoods: function AddGoods(t, i, o, s, r) {
                var c = a.default.GenerateUUID(),
                    l = new(e("ElementConfig"))();
                l.name = "Goods", l.elementType = r, l.id = c, r == n.default.ElementType.Raw ? l.resourcePath = "model/Raw" : r == n.default.ElementType.Goods && (l.resourcePath = "model/Goods");
                gm.GameData.FactoryDic[t];
                l.parent = this.parentCom.componentTable["Factory_" + t].Tables[i].SeatRaw, l.translateBelt = this.parentCom.componentTable["Factory_" + t].Tables[i].TranslatePos, l.position = cc.Vec2.ZERO, l.price = gm.GameData.GetDishesPrice(t, i, gm.DataBase.FactoryData[t][i].dishLv), l.goodsId = s, l.factoryId = t, l.bussinessIndex = i;
                var u = new(e("Goods"))();
                return u.Init(l), this.CustomerDic[l.id] = u, u;
            },
            RemoveGoods: function RemoveGoods(e) {
                var t = e.elementConfig.id;
                delete this.CustomerDic[t], this.RemoveGridGoods(e), e.Dispose();
            },
            UpgradeCustomer: function UpgradeCustomer(e, t) {
                for (var i in this.CustomerDic) {
                    if (this.CustomerDic.hasOwnProperty(i)) {
                        var n = this.CustomerDic[i];
                        n.FactoryId == e && n.BussinessIndex == t && n.UpgradeLevel();
                    }
                }
            },
            OnUpdate: function OnUpdate(e) {
                if (0 != this.enabled) {
                    for (var t in this.BeltList) {
                        if (this.BeltList.hasOwnProperty(t))
                            for (var i = this.BeltList[t], n = i.length, a = 0; a < n; a++) {
                                var o = i[a];
                                null != o && o.OnUpdate(e);
                            }
                    }
                    for (var s in this.CustomerDic) {
                        if (this.CustomerDic.hasOwnProperty(s)) this.CustomerDic[s].OnUpdate(e);
                    }
                    for (var r in this.ChefDic) {
                        if (this.ChefDic.hasOwnProperty(r))
                            for (var c = this.ChefDic[r], l = (n = c.length, 0); l < n; l++) {
                                var u = c[l];
                                null != u && u.OnUpdate(e);
                            }
                    }
                    this.TableSeatManager.OnUpdate(e);
                }
            }
        }), 
*/