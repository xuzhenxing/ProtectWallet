

var n = {};
window.game = window.game || {}, game.on = function (e, t, i) {
    var a = n[e];
    null == a && (a = [], n[e] = a);
    for (var o = a.length, s = 0; s < o; s++) {
        var r = a[s];
        r.callback == t && r.thisObj == i && cc.warn("\u4E8B\u4EF6\u3010" + e + "\u3011\u91CD\u590D\u76D1\u542C");
    }
    null == t && cc.error("\u4E8B\u4EF6\u3010" + e + "\u56DE\u8C03\u51FD\u6570\u4E3A\u7A7A"), a.push({
        callback: t,
        thisObj: i
    });
}, game.off = function (e, t, i) {
    var a = n[e];
    null == a && cc.error("\u4E8B\u4EF6\u3010" + e + "\u3011\u6CA1\u6709\u6CE8\u518C\u8FC7");
    for (var o = a.length, s = 0; s < o; s++) {
        var r = a[s];
        if (r.callback == t && r.thisObj == i) {
            a.splice(s, 1);
            break;
        }
    }
    0 == a.length && delete n[e];
}, game.dispatchEvent = function (e, t) {
    var i = n[e];
    null == i && cc.error("\u4E8B\u4EF6\u3010" + e + "\u3011\u6CA1\u6709\u88AB\u76D1\u542C\u8FC7");
    for (var a = i.length, o = 0; o < a; o++) {
        var s = i[o];
        s.callback.call(s.thisObj, t);
    }
}

/*EventManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "3c513R8Y0pN/pDcJoyXqxMJ", "EventManager");
        var n = {};
        window.game = window.game || {}, game.on = function (e, t, i) {
            var a = n[e];
            null == a && (a = [], n[e] = a);
            for (var o = a.length, s = 0; s < o; s++) {
                var r = a[s];
                r.callback == t && r.thisObj == i && cc.warn("\u4E8B\u4EF6\u3010" + e + "\u3011\u91CD\u590D\u76D1\u542C");
            }
            null == t && cc.error("\u4E8B\u4EF6\u3010" + e + "\u56DE\u8C03\u51FD\u6570\u4E3A\u7A7A"), a.push({
                callback: t,
                thisObj: i
            });
        }, game.off = function (e, t, i) {
            var a = n[e];
            null == a && cc.error("\u4E8B\u4EF6\u3010" + e + "\u3011\u6CA1\u6709\u6CE8\u518C\u8FC7");
            for (var o = a.length, s = 0; s < o; s++) {
                var r = a[s];
                if (r.callback == t && r.thisObj == i) {
                    a.splice(s, 1);
                    break;
                }
            }
            0 == a.length && delete n[e];
        }, game.dispatchEvent = function (e, t) {
            var i = n[e];
            null == i && cc.error("\u4E8B\u4EF6\u3010" + e + "\u3011\u6CA1\u6709\u88AB\u76D1\u542C\u8FC7");
            for (var a = i.length, o = 0; o < a; o++) {
                var s = i[o];
                s.callback.call(s.thisObj, t);
            }
        }, 
*/