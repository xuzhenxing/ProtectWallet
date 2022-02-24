
var n = require("GameConfig")
cc.Class({
    extends: cc.Component,
    properties: {
        curTheme: 0
    },
    start: function start() {
        this.node.color = n.ThemeColor[gm.DataBase.Data.themeType], this.curTheme = gm.DataBase.Data.themeType;
    },
    update: function update(e) {
        this.curTheme != gm.DataBase.Data.themeType && (this.node.color = n.ThemeColor[gm.DataBase.Data.themeType]);
    }
})

/*ThemeSetting: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "de0b74xURNCz4ia2vfhTq+J", "ThemeSetting");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("GameConfig"));
        cc.Class({
            extends: cc.Component,
            properties: {
                curTheme: 0
            },
            start: function start() {
                this.node.color = n.default.ThemeColor[gm.DataBase.Data.themeType], this.curTheme = gm.DataBase.Data.themeType;
            },
            update: function update(e) {
                this.curTheme != gm.DataBase.Data.themeType && (this.node.color = n.default.ThemeColor[gm.DataBase.Data.themeType]);
            }
        }), 
*/