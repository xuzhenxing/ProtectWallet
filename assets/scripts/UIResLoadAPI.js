
var n = {
    loadTypeRes: function loadTypeRes(e, t, i) {
        cc.loader.loadRes(e, t, function (e, t) {
            e ? cc.error("error\uFF1A" + (e.message || e)) : i && i(t);
        });
    },
    loadRes: function loadRes(e, t) {
        cc.loader.loadRes(e, function (e, i) {
            e ? cc.error("error: " + (e.message || e)) : t && t(i);
        });
    },
    loadAllRes: function loadAllRes(e, t) {
        cc.loader.loadResDir(e, function (e, i) {
            e ? cc.error("error: " + (e.message || e)) : t && t(i);
        });
    },
    loadTypeAllRes: function loadTypeAllRes(e, t, i) {
        cc.loader.loadResDir(e, t, function (e, t) {
            e ? cc.error("error: " + (e.message || e)) : i && i(t);
        });
    },
    load: function load(e, t) {
        cc.loader.load(raw, function (e, i) {
            e ? cc.error("error: " + (e.message || e)) : t && t(i);
        });
    }
};
module.exports = n

/*UIResLoadAPI: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "9c393CFz+BAQ7xp6ffK8O3q", "UIResLoadAPI");
        var n = {
            loadTypeRes: function loadTypeRes(e, t, i) {
                cc.loader.loadRes(e, t, function (e, t) {
                    e ? cc.error("error\uFF1A" + (e.message || e)) : i && i(t);
                });
            },
            loadRes: function loadRes(e, t) {
                cc.loader.loadRes(e, function (e, i) {
                    e ? cc.error("error: " + (e.message || e)) : t && t(i);
                });
            },
            loadAllRes: function loadAllRes(e, t) {
                cc.loader.loadResDir(e, function (e, i) {
                    e ? cc.error("error: " + (e.message || e)) : t && t(i);
                });
            },
            loadTypeAllRes: function loadTypeAllRes(e, t, i) {
                cc.loader.loadResDir(e, t, function (e, t) {
                    e ? cc.error("error: " + (e.message || e)) : i && i(t);
                });
            },
            load: function load(e, t) {
                cc.loader.load(raw, function (e, i) {
                    e ? cc.error("error: " + (e.message || e)) : t && t(i);
                });
            }
        };
        t.exports = n, 
*/