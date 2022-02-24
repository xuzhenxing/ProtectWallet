var n =require("GameConfig");

var a = cc.Class({
    extends: require("IDispose"),
    properties: {
        propertyType: null,
        baseVal: 0,
        attachVal: 0,
        basePercent: 0
    },
    Init: function Init(e, t) {
        this.propertyType = e, this.baseVal = t, this.attachVal = 0, this.basePercent = 0;
    },
    Reset: function Reset() {
        this.attachVal = 0, this.basePercent = 0;
    },
    SetBaseVal: function SetBaseVal(e) {
        this.baseVal = e;
    },
    ChangeVal: function ChangeVal(e) {
        this.attachVal += e;
    },
    ChangePercent: function ChangePercent(e) {
        this.basePercent += e;
    },
    ResetPercent: function ResetPercent() {
        this.basePercent = 0;
    },
    GetProperty: function GetProperty() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = this.basePercent,
            i = this.baseVal;
        return (i = e ? 1 * (this.baseVal + this.attachVal) / (1 + t) : (this.baseVal + this.attachVal) * (1 + t)) < 0 && (i = 0), i;
    }
});
cc.Class({
    extends: require("IComponent"),
    properties: {
        propMap: null
    },
    Init: function Init(e) {
        this._super(e), this.propMap = new Array();
        for (var t, i = cc.Enum.getList(n.ChefProperty), o = i.length, s = 0; s < o; s++) {
            t = i[s].value, this.propMap[t] = new a(), this.propMap[t].Init(t, 0);
        }
    },
    SetBaseVal: function SetBaseVal(e, t) {
        this.propMap[e].SetBaseVal(t);
    },
    ChangeVal: function ChangeVal(e, t) {
        this.propMap[e].ChangeVal(t);
    },
    ChangePercent: function ChangePercent(e, t) {
        this.propMap[e].ChangePercent(t);
    },
    GetProperty: function GetProperty(e, t) {
        return this.propMap[e].GetProperty(t);
    },
    ResetPercent: function ResetPercent(e) {
        this.propMap[e].ResetPercent();
    },
    Reset: function Reset(e) {
        this.propMap[e].Reset();
    },
    Dispose: function Dispose() {
        this.propMap = null;
    }
})
/*PropertyComponent: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "21d0b5CM4xMarz9odgAsTQK", "PropertyComponent");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("GameConfig"));
        var a = cc.Class({
            extends: e("IDispose"),
            properties: {
                propertyType: null,
                baseVal: 0,
                attachVal: 0,
                basePercent: 0
            },
            Init: function Init(e, t) {
                this.propertyType = e, this.baseVal = t, this.attachVal = 0, this.basePercent = 0;
            },
            Reset: function Reset() {
                this.attachVal = 0, this.basePercent = 0;
            },
            SetBaseVal: function SetBaseVal(e) {
                this.baseVal = e;
            },
            ChangeVal: function ChangeVal(e) {
                this.attachVal += e;
            },
            ChangePercent: function ChangePercent(e) {
                this.basePercent += e;
            },
            ResetPercent: function ResetPercent() {
                this.basePercent = 0;
            },
            GetProperty: function GetProperty() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = this.basePercent,
                    i = this.baseVal;
                return (i = e ? 1 * (this.baseVal + this.attachVal) / (1 + t) : (this.baseVal + this.attachVal) * (1 + t)) < 0 && (i = 0), i;
            }
        });
        cc.Class({
            extends: e("IComponent"),
            properties: {
                propMap: null
            },
            Init: function Init(e) {
                this._super(e), this.propMap = new Array();
                for (var t, i = cc.Enum.getList(n.default.ChefProperty), o = i.length, s = 0; s < o; s++) {
                    t = i[s].value, this.propMap[t] = new a(), this.propMap[t].Init(t, 0);
                }
            },
            SetBaseVal: function SetBaseVal(e, t) {
                this.propMap[e].SetBaseVal(t);
            },
            ChangeVal: function ChangeVal(e, t) {
                this.propMap[e].ChangeVal(t);
            },
            ChangePercent: function ChangePercent(e, t) {
                this.propMap[e].ChangePercent(t);
            },
            GetProperty: function GetProperty(e, t) {
                return this.propMap[e].GetProperty(t);
            },
            ResetPercent: function ResetPercent(e) {
                this.propMap[e].ResetPercent();
            },
            Reset: function Reset(e) {
                this.propMap[e].Reset();
            },
            Dispose: function Dispose() {
                this.propMap = null;
            }
        }), 
*/