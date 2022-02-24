
var n = require("GameConfig");
cc.Class({
    extends: require("IComponent"),
    properties: {
        FactoryTable: null
    },
    Init: function Init() {
        this.FactoryTable = {}, this.FactoryTableRefreshTime = {};
    },
    AddTable: function AddTable(e, t, i) {
        null == this.FactoryTable[e] && (this.FactoryTable[e] = new Array()), null == this.FactoryTable[e][t] && (this.FactoryTable[e][t] = new Array()), null == this.FactoryTableRefreshTime[e] && (this.FactoryTableRefreshTime[e] = new Array()), null == this.FactoryTableRefreshTime[e][t] && (this.FactoryTableRefreshTime[e][t] = new Array());
        for (var n = this.FactoryTable[e][t], a = i.length, o = 0; o < a; o++) {
            var s = i[o];
            n[o] = s;
        }
    },
    InsertCustomer: function InsertCustomer(e, t, i) {
        null == this.FactoryTable[e] && (this.FactoryTable[e] = {}), null == this.FactoryTable[e][t] && (this.FactoryTable[e][t] = new Array()), this.FactoryTable[e][t][i] = 1;
    },
    RemoveCustomer: function RemoveCustomer(e, t, i) {
        this.FactoryTable[e][t][i] = 0;
    },
    GetSeatFree: function GetSeatFree(e, t, i) {
        for (var n = this.FactoryTable[e][t], a = i.length, o = new Array(), s = 0; s < a; s++) {
            if (0 == n[s] && s <= 4 && 0 == o.length ? o[0] = s : 0 == n[s] && s > 4 && o.length < 2 && (o[1] = s), 2 == o.length) return o;
        }
        return o;
    },
    OnUpdate: function OnUpdate(e) {
        for (var t in this.FactoryTableRefreshTime) {
            if (this.FactoryTableRefreshTime.hasOwnProperty(t))
                for (var i = this.FactoryTableRefreshTime[t], a = i.length, o = 0; o < a; o++) {
                    var s = i[o];
                    null != s[0] && s[0] > 0 && (s[0] -= e, s[0] < 0 && (s[0] = 0)), null != s[1] && s[1] > 0 && (s[1] -= e, s[1] < 0 && (s[1] = 0));
                }
        }
        for (var r in this.FactoryTable) {
            if (this.FactoryTable.hasOwnProperty(r))
                for (var c = this.FactoryTable[r], l = c.length, u = 0; u < l; u++) {
                    var d,
                        h = this.GetSeatFree(r, u, c[u]),
                        f = this.FactoryTableRefreshTime[r][u][0],
                        p = this.FactoryTableRefreshTime[r][u][1];
                    null != h[0] && (null == f || f <= 0) && (d = h[0], this.FactoryTableRefreshTime[r][u][0] = n.CustomerRefreshGap, c[u][d] = 1, gm.BattlePlayManager.AddCustomerToEnter(r, u, d, 0)), null != h[1] && (null == p || p <= 0) && (d = h[1], this.FactoryTableRefreshTime[r][u][1] = n.CustomerRefreshGap, c[u][d] = 1, gm.BattlePlayManager.AddCustomerToEnter(r, u, d, 1));
                }
        }
    }
})

/*TableSeatManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "7df1bk7RMhKWrgbfhV4kyxZ", "TableSeatManager");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("GameConfig"));
        cc.Class({
            extends: e("IComponent"),
            properties: {
                FactoryTable: null
            },
            Init: function Init() {
                this.FactoryTable = {}, this.FactoryTableRefreshTime = {};
            },
            AddTable: function AddTable(e, t, i) {
                null == this.FactoryTable[e] && (this.FactoryTable[e] = new Array()), null == this.FactoryTable[e][t] && (this.FactoryTable[e][t] = new Array()), null == this.FactoryTableRefreshTime[e] && (this.FactoryTableRefreshTime[e] = new Array()), null == this.FactoryTableRefreshTime[e][t] && (this.FactoryTableRefreshTime[e][t] = new Array());
                for (var n = this.FactoryTable[e][t], a = i.length, o = 0; o < a; o++) {
                    var s = i[o];
                    n[o] = s;
                }
            },
            InsertCustomer: function InsertCustomer(e, t, i) {
                null == this.FactoryTable[e] && (this.FactoryTable[e] = {}), null == this.FactoryTable[e][t] && (this.FactoryTable[e][t] = new Array()), this.FactoryTable[e][t][i] = 1;
            },
            RemoveCustomer: function RemoveCustomer(e, t, i) {
                this.FactoryTable[e][t][i] = 0;
            },
            GetSeatFree: function GetSeatFree(e, t, i) {
                for (var n = this.FactoryTable[e][t], a = i.length, o = new Array(), s = 0; s < a; s++) {
                    if (0 == n[s] && s <= 4 && 0 == o.length ? o[0] = s : 0 == n[s] && s > 4 && o.length < 2 && (o[1] = s), 2 == o.length) return o;
                }
                return o;
            },
            OnUpdate: function OnUpdate(e) {
                for (var t in this.FactoryTableRefreshTime) {
                    if (this.FactoryTableRefreshTime.hasOwnProperty(t))
                        for (var i = this.FactoryTableRefreshTime[t], a = i.length, o = 0; o < a; o++) {
                            var s = i[o];
                            null != s[0] && s[0] > 0 && (s[0] -= e, s[0] < 0 && (s[0] = 0)), null != s[1] && s[1] > 0 && (s[1] -= e, s[1] < 0 && (s[1] = 0));
                        }
                }
                for (var r in this.FactoryTable) {
                    if (this.FactoryTable.hasOwnProperty(r))
                        for (var c = this.FactoryTable[r], l = c.length, u = 0; u < l; u++) {
                            var d,
                                h = this.GetSeatFree(r, u, c[u]),
                                f = this.FactoryTableRefreshTime[r][u][0],
                                p = this.FactoryTableRefreshTime[r][u][1];
                            null != h[0] && (null == f || f <= 0) && (d = h[0], this.FactoryTableRefreshTime[r][u][0] = n.default.CustomerRefreshGap, c[u][d] = 1, gm.BattlePlayManager.AddCustomerToEnter(r, u, d, 0)), null != h[1] && (null == p || p <= 0) && (d = h[1], this.FactoryTableRefreshTime[r][u][1] = n.default.CustomerRefreshGap, c[u][d] = 1, gm.BattlePlayManager.AddCustomerToEnter(r, u, d, 1));
                        }
                }
            }
        }), 
*/