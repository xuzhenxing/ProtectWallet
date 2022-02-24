

var n = require("GameConfig"),
a = require("NumberUtil");
var s = Object.assign ? Object.assign : function (e, t, i, n) {
    for (var a = 1; a < arguments.length; a++) {
        d(Object(arguments[a]), function (t, i) {
            e[i] = t;
        });
    }
    return e;
},
r = function () {
    if (Object.create) return function (e, t, i, n) {
        var a = u(arguments, 1);
        return s.apply(this, [Object.create(e)].concat(a));
    };
    var e = function e() {};
    return function (t, i, n, a) {
        var o = u(arguments, 1);
        return e.prototype = t, s.apply(this, [new e()].concat(o));
    };
}(),
c = String.prototype.trim ? function (e) {
    return String.prototype.trim.call(e);
} : function (e) {
    return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
},
l = "undefined" != typeof window ? window : i;

function u(e, t) {
return Array.prototype.slice.call(e, t || 0);
}

function d(e, t) {
h(e, function (e, i) {
    return t(e, i), !1;
});
}

function h(e, t) {
if (f(e)) {
    for (var i = 0; i < e.length; i++) {
        if (t(e[i], i)) return e[i];
    }
} else
    for (var n in e) {
        if (e.hasOwnProperty(n) && t(e[n], n)) return e[n];
    }
}

function f(e) {
return null != e && "function" != typeof e && "number" == typeof e.length;
}

function p(e, t) {
return parseInt(Math.random() * (t - e + 1) + e, 10);
}

function g(e, t, i) {
var n = null,
    a = null;
    // console.log(e,"e======",'t========',t,'i================',i)
if (null == e && cc.log(t + " \u8DEF\u5F84\u4E0D\u5B58\u5728"), i) {
    if (null == (n = cc.find(t, e)) && null == (n = e.getChildByName(t)))
        for (var o = e.children, s = o.length, r = 0; r < s; r++) {
            if (null != (a = o[r].getChildByName(t))) {
                n = a;
                break;
            }
            if (null != (n = g(a, t, i))) break;
        }
} else n = cc.find(t, e);
return null == n && cc.log(t + " \u8DEF\u5F84\u4E0D\u5B58\u5728"), n;
}

function m(e, t) {
var i = Math.PI / 2,
    n = new cc.Vec2(e.x, e.y);
return n = n.rotateSelf(i), 1 == t && n.mul(-1), n.normalize();
}
module.exports = {
assign: s,
create: r,
trim: c,
bind: function bind(e, t) {
    return function () {
        return t.apply(e, Array.prototype.slice.call(arguments, 0));
    };
},
slice: u,
each: d,
map: function map(e, t) {
    var i = f(e) ? [] : {};
    return h(e, function (e, n) {
        return i[n] = t(e, n), !1;
    }), i;
},
pluck: h,
isList: f,
isFunction: function isFunction(e) {
    return e && "[object Function]" === {}.toString.call(e);
},
isObject: function isObject(e) {
    return e && "[object Object]" === {}.toString.call(e);
},
getRotateVector: function getRotateVector(e, t) {
    Math.PI;
    var i = e.x * Math.cos(t) - e.y * Math.sin(t),
        n = e.x * Math.sin(t) + e.y * Math.cos(t);
    return new cc.Vec2(i, n);
},
getRandom: p,
ArrayBreakOrder: function ArrayBreakOrder(e) {
    for (var t = 1; t < e.length; t++) {
        var i = Math.floor(Math.random() * (t + 1)),
            n = [e[i], e[t]];
        e[t] = n[0], e[i] = n[1];
    }
},
getAngleBetweenVector: function getAngleBetweenVector(e, t) {
    var i = e.dot(t),
        n = e.mag(),
        a = t.mag(),
        o = e.x * t.y - e.y * t.x,
        s = 180 * Math.acos(i / (n * a)) / Math.PI;
    o < 0 && (s = -s);
    return s;
},
ParseWidgetByTable: function ParseWidgetByTable(e, t) {
    for (var i in t) {
        if (t.hasOwnProperty(i)) {
            var n = t[i];
            t[i] = g(e, n, !0);
        }
    }
},
ParseComponentByTable: function ParseComponentByTable(e, t) {
    for (var i in t) {
        if (t.hasOwnProperty(i)) {
            var n = t[i];
            null == e && cc.log(n[0] + " \u8DEF\u5F84\u4E0D\u5B58\u5728");
            var a = g(e, n[0], !0);
            t[i] = a.getComponent(n[1]);
        }
    }
},
GetChildByName: g,
OverloadingFunc: function OverloadingFunc(e, t, i) {
    var n = e[t];
    e[t] = function () {
        return i.length == arguments.length ? i.apply(this, arguments) : "function" == typeof n ? n.apply(this, arguments) : void 0;
    };
},
Global: l,
SetActive: function SetActive(e, t) {
    e.active = t, t ? e.resumeSystemEvents(!0) : e.pauseSystemEvents(!0);
},
ConvertStringFormat: function ConvertStringFormat(e) {
    var t = e + "",
        i = t.length;
    if (i >= 4 && i <= 6) {
        var n = t.substring(0, i - 3),
            a = t.substring(i - 3, 2);
        t = a > 0 ? n + "." + a + "k" : n + "k";
    } else if (i >= 7 && i <= 9) {
        var n = t.substring(0, i - 6),
            a = t.substring(i - 6, 2);
        t = a > 0 ? n + "." + a + "m" : n + "m";
    } else if (i >= 10 && i <= 12) {
        var n = t.substring(0, i - 9),
            a = t.substring(i - 9, 2);
        t = a > 0 ? n + "." + a + "b" : n + "b";
    } else if (i >= 13 && i <= 15) {
        var n = t.substring(0, i - 12),
            a = t.substring(i - 12, 2);
        t = a > 0 ? n + "." + a + "t" : n + "t";
    } else if (i >= 16 && i <= 18) {
        var n = t.substring(0, i - 15),
            a = t.substring(i - 15, 2);
        t = a > 0 ? n + "." + a + "aa" : n + "aa";
    } else if (i >= 19 && i <= 21) {
        var n = t.substring(0, i - 18),
            a = t.substring(i - 18, 2);
        t = a > 0 ? n + "." + a + "bb" : n + "bb";
    } else if (i >= 22 && i <= 24) {
        var n = t.substring(0, i - 21),
            a = t.substring(i - 21, 2);
        t = a > 0 ? n + "." + a + "cc" : n + "cc";
    } else if (i >= 25 && i <= 27) {
        var n = t.substring(0, i - 24),
            a = t.substring(i - 24, 2);
        t = a > 0 ? n + "." + a + "dd" : n + "dd";
    } else if (i >= 28 && i <= 30) {
        var n = t.substring(0, i - 27),
            a = t.substring(i - 27, 2);
        t = a > 0 ? n + "." + a + "ee" : n + "ee";
    } else if (i >= 31 && i <= 33) {
        var n = t.substring(0, i - 33),
            a = t.substring(i - 33, 2);
        t = a > 0 ? n + "." + a + "ff" : n + "ff";
    } else if (i >= 34 && i <= 36) {
        var n = t.substring(0, i - 36),
            a = t.substring(i - 36, 2);
        t = a > 0 ? n + "." + a + "gg" : n + "gg";
    }
    return t;
},
GenerateUUID: function GenerateUUID() {
    var e = new Date().getTime();
    window.performance && "function" == typeof window.performance.now && (e += performance.now());
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var i = (e + 16 * Math.random()) % 16 | 0;
        return e = Math.floor(e / 16), ("x" == t ? i : 3 & i | 8).toString(16);
    });
},
VectorSlerp: function VectorSlerp(e, t, i, n) {
    var a = t.add(e).mul(.5),
        o = m(t.sub(e), !0);
    a = a.add(o.mul(i));
    var s = e.sub(a),
        r = t.sub(a),
        c = s.angle(r);
    n < 0 && (c = 2 * Math.PI - c);
    var l = c * n,
        u = cc.Vec2.ZERO;
    return u.x = s.x * Math.cos(l) - s.y * Math.sin(l) + a.x, u.y = s.x * Math.sin(l) + s.y * Math.cos(l) + a.y, u;
},
GetVerticalVector: m,
getDegree: function getDegree(e) {
    var t = Math.atan(e.y / e.x) / Math.PI * 180;
    e.x >= 0 ? e.y < 0 && (t += 360) : e.y > 0 ? t += 180 : t = 180 + t;
    return t;
},
lerp: function lerp(e, t, i) {
    var n = 0;
    i > 1 ? i = 1 : i < 0 && (i = 0);
    var o = a.Reduce(t, e);
    return n = a.Multiply(o, i), n = a.Add(n, e);
},
DelayShowBanner: function DelayShowBanner(e, t, i, a) {
    var o = e.getComponent(cc.Widget);
    if (console.log("DelayShowNow" + n.DelayShowNow), console.log("DelayShowCheck" + n.DelayShowCheck), -1 == n.DelayShowNow) n.DelayShowNow = 0, n.DelayShowCheck = p(n.DelayShowMin, n.DelayShowMax);
    else {
        if (n.DelayShowNow++, !(n.DelayShowNow > n.DelayShowCheck)) return console.log("DelayShowBannerNot"), o.bottom = i, void gm.AdManager.playADBanner();
        n.DelayShowNow = 0, n.DelayShowCheck = p(n.DelayShowMin, n.DelayShowMax);
    }
    console.log("DelayShowBanner"), 1 == n.DelayShowbanner && null != o ? (cc.log("??????????"), cc.log(n.BannerErrorDelay), cc.log(i - t), cc.log(t), cc.log(i), gm.AdManager.closeAdBanner(), o.bottom = t, o.updateAlignment(), cc.log(o.bottom), e.stopAllActions(), e.runAction(cc.sequence(cc.delayTime(a), cc.callFunc(function () {
        gm.AdManager.playADBanner(), cc.log("?SDFSDFSADF");
    }), cc.delayTime(.1), cc.moveBy(n.BannerErrorDelay, new cc.v2(0, i - t))))) : gm.AdManager.playADBanner();
}
}
/*util: [function (e, t, i) {
        (function (i) {
            "use strict";
            cc._RF.push(t, "15e6aYp7wdDcrn4QXuleQzG", "util");
            var n = o(e("GameConfig")),
                a = o(e("NumberUtil"));

            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var s = Object.assign ? Object.assign : function (e, t, i, n) {
                    for (var a = 1; a < arguments.length; a++) {
                        d(Object(arguments[a]), function (t, i) {
                            e[i] = t;
                        });
                    }
                    return e;
                },
                r = function () {
                    if (Object.create) return function (e, t, i, n) {
                        var a = u(arguments, 1);
                        return s.apply(this, [Object.create(e)].concat(a));
                    };
                    var e = function e() {};
                    return function (t, i, n, a) {
                        var o = u(arguments, 1);
                        return e.prototype = t, s.apply(this, [new e()].concat(o));
                    };
                }(),
                c = String.prototype.trim ? function (e) {
                    return String.prototype.trim.call(e);
                } : function (e) {
                    return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                },
                l = "undefined" != typeof window ? window : i;

            function u(e, t) {
                return Array.prototype.slice.call(e, t || 0);
            }

            function d(e, t) {
                h(e, function (e, i) {
                    return t(e, i), !1;
                });
            }

            function h(e, t) {
                if (f(e)) {
                    for (var i = 0; i < e.length; i++) {
                        if (t(e[i], i)) return e[i];
                    }
                } else
                    for (var n in e) {
                        if (e.hasOwnProperty(n) && t(e[n], n)) return e[n];
                    }
            }

            function f(e) {
                return null != e && "function" != typeof e && "number" == typeof e.length;
            }

            function p(e, t) {
                return parseInt(Math.random() * (t - e + 1) + e, 10);
            }

            function g(e, t, i) {
                var n = null,
                    a = null;
                if (null == e && cc.log(t + " \u8DEF\u5F84\u4E0D\u5B58\u5728"), i) {
                    if (null == (n = cc.find(t, e)) && null == (n = e.getChildByName(t)))
                        for (var o = e.children, s = o.length, r = 0; r < s; r++) {
                            if (null != (a = o[r].getChildByName(t))) {
                                n = a;
                                break;
                            }
                            if (null != (n = g(a, t, i))) break;
                        }
                } else n = cc.find(t, e);
                return null == n && cc.log(t + " \u8DEF\u5F84\u4E0D\u5B58\u5728"), n;
            }

            function m(e, t) {
                var i = Math.PI / 2,
                    n = new cc.Vec2(e.x, e.y);
                return n = n.rotateSelf(i), 1 == t && n.mul(-1), n.normalize();
            }
            t.exports = {
                assign: s,
                create: r,
                trim: c,
                bind: function bind(e, t) {
                    return function () {
                        return t.apply(e, Array.prototype.slice.call(arguments, 0));
                    };
                },
                slice: u,
                each: d,
                map: function map(e, t) {
                    var i = f(e) ? [] : {};
                    return h(e, function (e, n) {
                        return i[n] = t(e, n), !1;
                    }), i;
                },
                pluck: h,
                isList: f,
                isFunction: function isFunction(e) {
                    return e && "[object Function]" === {}.toString.call(e);
                },
                isObject: function isObject(e) {
                    return e && "[object Object]" === {}.toString.call(e);
                },
                getRotateVector: function getRotateVector(e, t) {
                    Math.PI;
                    var i = e.x * Math.cos(t) - e.y * Math.sin(t),
                        n = e.x * Math.sin(t) + e.y * Math.cos(t);
                    return new cc.Vec2(i, n);
                },
                getRandom: p,
                ArrayBreakOrder: function ArrayBreakOrder(e) {
                    for (var t = 1; t < e.length; t++) {
                        var i = Math.floor(Math.random() * (t + 1)),
                            n = [e[i], e[t]];
                        e[t] = n[0], e[i] = n[1];
                    }
                },
                getAngleBetweenVector: function getAngleBetweenVector(e, t) {
                    var i = e.dot(t),
                        n = e.mag(),
                        a = t.mag(),
                        o = e.x * t.y - e.y * t.x,
                        s = 180 * Math.acos(i / (n * a)) / Math.PI;
                    o < 0 && (s = -s);
                    return s;
                },
                ParseWidgetByTable: function ParseWidgetByTable(e, t) {
                    for (var i in t) {
                        if (t.hasOwnProperty(i)) {
                            var n = t[i];
                            t[i] = g(e, n, !0);
                        }
                    }
                },
                ParseComponentByTable: function ParseComponentByTable(e, t) {
                    for (var i in t) {
                        if (t.hasOwnProperty(i)) {
                            var n = t[i];
                            null == e && cc.log(n[0] + " \u8DEF\u5F84\u4E0D\u5B58\u5728");
                            var a = g(e, n[0], !0);
                            t[i] = a.getComponent(n[1]);
                        }
                    }
                },
                GetChildByName: g,
                OverloadingFunc: function OverloadingFunc(e, t, i) {
                    var n = e[t];
                    e[t] = function () {
                        return i.length == arguments.length ? i.apply(this, arguments) : "function" == typeof n ? n.apply(this, arguments) : void 0;
                    };
                },
                Global: l,
                SetActive: function SetActive(e, t) {
                    e.active = t, t ? e.resumeSystemEvents(!0) : e.pauseSystemEvents(!0);
                },
                ConvertStringFormat: function ConvertStringFormat(e) {
                    var t = e + "",
                        i = t.length;
                    if (i >= 4 && i <= 6) {
                        var n = t.substring(0, i - 3),
                            a = t.substring(i - 3, 2);
                        t = a > 0 ? n + "." + a + "k" : n + "k";
                    } else if (i >= 7 && i <= 9) {
                        var n = t.substring(0, i - 6),
                            a = t.substring(i - 6, 2);
                        t = a > 0 ? n + "." + a + "m" : n + "m";
                    } else if (i >= 10 && i <= 12) {
                        var n = t.substring(0, i - 9),
                            a = t.substring(i - 9, 2);
                        t = a > 0 ? n + "." + a + "b" : n + "b";
                    } else if (i >= 13 && i <= 15) {
                        var n = t.substring(0, i - 12),
                            a = t.substring(i - 12, 2);
                        t = a > 0 ? n + "." + a + "t" : n + "t";
                    } else if (i >= 16 && i <= 18) {
                        var n = t.substring(0, i - 15),
                            a = t.substring(i - 15, 2);
                        t = a > 0 ? n + "." + a + "aa" : n + "aa";
                    } else if (i >= 19 && i <= 21) {
                        var n = t.substring(0, i - 18),
                            a = t.substring(i - 18, 2);
                        t = a > 0 ? n + "." + a + "bb" : n + "bb";
                    } else if (i >= 22 && i <= 24) {
                        var n = t.substring(0, i - 21),
                            a = t.substring(i - 21, 2);
                        t = a > 0 ? n + "." + a + "cc" : n + "cc";
                    } else if (i >= 25 && i <= 27) {
                        var n = t.substring(0, i - 24),
                            a = t.substring(i - 24, 2);
                        t = a > 0 ? n + "." + a + "dd" : n + "dd";
                    } else if (i >= 28 && i <= 30) {
                        var n = t.substring(0, i - 27),
                            a = t.substring(i - 27, 2);
                        t = a > 0 ? n + "." + a + "ee" : n + "ee";
                    } else if (i >= 31 && i <= 33) {
                        var n = t.substring(0, i - 33),
                            a = t.substring(i - 33, 2);
                        t = a > 0 ? n + "." + a + "ff" : n + "ff";
                    } else if (i >= 34 && i <= 36) {
                        var n = t.substring(0, i - 36),
                            a = t.substring(i - 36, 2);
                        t = a > 0 ? n + "." + a + "gg" : n + "gg";
                    }
                    return t;
                },
                GenerateUUID: function GenerateUUID() {
                    var e = new Date().getTime();
                    window.performance && "function" == typeof window.performance.now && (e += performance.now());
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
                        var i = (e + 16 * Math.random()) % 16 | 0;
                        return e = Math.floor(e / 16), ("x" == t ? i : 3 & i | 8).toString(16);
                    });
                },
                VectorSlerp: function VectorSlerp(e, t, i, n) {
                    var a = t.add(e).mul(.5),
                        o = m(t.sub(e), !0);
                    a = a.add(o.mul(i));
                    var s = e.sub(a),
                        r = t.sub(a),
                        c = s.angle(r);
                    n < 0 && (c = 2 * Math.PI - c);
                    var l = c * n,
                        u = cc.Vec2.ZERO;
                    return u.x = s.x * Math.cos(l) - s.y * Math.sin(l) + a.x, u.y = s.x * Math.sin(l) + s.y * Math.cos(l) + a.y, u;
                },
                GetVerticalVector: m,
                getDegree: function getDegree(e) {
                    var t = Math.atan(e.y / e.x) / Math.PI * 180;
                    e.x >= 0 ? e.y < 0 && (t += 360) : e.y > 0 ? t += 180 : t = 180 + t;
                    return t;
                },
                lerp: function lerp(e, t, i) {
                    var n = 0;
                    i > 1 ? i = 1 : i < 0 && (i = 0);
                    var o = a.default.Reduce(t, e);
                    return n = a.default.Multiply(o, i), n = a.default.Add(n, e);
                },
                DelayShowBanner: function DelayShowBanner(e, t, i, a) {
                    var o = e.getComponent(cc.Widget);
                    if (console.log("DelayShowNow" + n.default.DelayShowNow), console.log("DelayShowCheck" + n.default.DelayShowCheck), -1 == n.default.DelayShowNow) n.default.DelayShowNow = 0, n.default.DelayShowCheck = p(n.default.DelayShowMin, n.default.DelayShowMax);
                    else {
                        if (n.default.DelayShowNow++, !(n.default.DelayShowNow > n.default.DelayShowCheck)) return console.log("DelayShowBannerNot"), o.bottom = i, void gm.AdManager.playADBanner();
                        n.default.DelayShowNow = 0, n.default.DelayShowCheck = p(n.default.DelayShowMin, n.default.DelayShowMax);
                    }
                    console.log("DelayShowBanner"), 1 == n.default.DelayShowbanner && null != o ? (cc.log("??????????"), cc.log(n.default.BannerErrorDelay), cc.log(i - t), cc.log(t), cc.log(i), gm.AdManager.closeAdBanner(), o.bottom = t, o.updateAlignment(), cc.log(o.bottom), e.stopAllActions(), e.runAction(cc.sequence(cc.delayTime(a), cc.callFunc(function () {
                        gm.AdManager.playADBanner(), cc.log("?SDFSDFSADF");
                    }), cc.delayTime(.1), cc.moveBy(n.default.BannerErrorDelay, new cc.v2(0, i - t))))) : gm.AdManager.playADBanner();
                }
            }, 
*/