var n = require("util");

cc.Class({
    properties: {
        moduleName: null,
        name: null,
        body: null,
        type: null
    },
    ctor: function ctor() {
        this.Overloading();
    },
    Overloading: function Overloading() {
        var e = this,
            t = function t(_t6) {
                e.name = _t6;
            };
        n.OverloadingFunc(this, "Init", t), t = function t(_t7, i) {
            e.name = _t7, e.body = i;
        }, n.OverloadingFunc(this, "Init", t), t = function t(_t8, i, n) {
            e.name = _t8, e.body = i, e.type = n;
        }, n.OverloadingFunc(this, "Init", t), t = function t(_t9, i, n, a) {
            e.moduleName = _t9, e.name = i, e.body = n, e.type = a;
        }, n.OverloadingFunc(this, "Init", t);
    }
})


/*Notification: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "e7cbafCCWZNpqg/pgdiAdXs", "Notification");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("util"));
        cc.Class({
            properties: {
                moduleName: null,
                name: null,
                body: null,
                type: null
            },
            ctor: function ctor() {
                this.Overloading();
            },
            Overloading: function Overloading() {
                var e = this,
                    t = function t(_t6) {
                        e.name = _t6;
                    };
                n.default.OverloadingFunc(this, "Init", t), t = function t(_t7, i) {
                    e.name = _t7, e.body = i;
                }, n.default.OverloadingFunc(this, "Init", t), t = function t(_t8, i, n) {
                    e.name = _t8, e.body = i, e.type = n;
                }, n.default.OverloadingFunc(this, "Init", t), t = function t(_t9, i, n, a) {
                    e.moduleName = _t9, e.name = i, e.body = n, e.type = a;
                }, n.default.OverloadingFunc(this, "Init", t);
            }
        }), 
*/