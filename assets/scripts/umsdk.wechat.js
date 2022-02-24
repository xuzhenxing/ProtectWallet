

// function n(e, t) {
//     return s(e) || o(e, t) || c(e, t) || a();
// }

// function a() {
//     throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
// }

// function o(e, t) {
//     if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
//         var i = [],
//             n = !0,
//             a = !1,
//             o = void 0;
//         try {
//             for (var s, r = e[Symbol.iterator](); !(n = (s = r.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0) {}
//         } catch (e) {
//             a = !0, o = e;
//         } finally {
//             try {
//                 n || null == r.return || r.return();
//             } finally {
//                 if (a) throw o;
//             }
//         }
//         return i;
//     }
// }

// function s(e) {
//     if (Array.isArray(e)) return e;
// }

// function r(e) {
//     if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
//         if (Array.isArray(e) || (e = c(e))) {
//             var t = 0,
//                 i = function i() {};
//             return {
//                 s: i,
//                 n: function n() {
//                     return t >= e.length ? {
//                         done: !0
//                     } : {
//                         done: !1,
//                         value: e[t++]
//                     };
//                 },
//                 e: function e(_e5) {
//                     throw _e5;
//                 },
//                 f: i
//             };
//         }
//         throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
//     }
//     var _n3,
//         a,
//         o = !0,
//         s = !1;
//     return {
//         s: function s() {
//             _n3 = e[Symbol.iterator]();
//         },
//         n: function n() {
//             var e = _n3.next();
//             return o = e.done, e;
//         },
//         e: function e(_e6) {
//             s = !0, a = _e6;
//         },
//         f: function f() {
//             try {
//                 o || null == _n3.return || _n3.return();
//             } finally {
//                 if (s) throw a;
//             }
//         }
//     };
// }

// function c(e, t) {
//     if (e) {
//         if ("string" == typeof e) return l(e, t);
//         var i = Object.prototype.toString.call(e).slice(8, -1);
//         return "Object" === i && e.constructor && (i = e.constructor.name), "Map" === i || "Set" === i ? Array.from(i) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? l(e, t) : void 0;
//     }
// }

// function l(e, t) {
//     (null == t || t > e.length) && (t = e.length);
//     for (var i = 0, n = new Array(t); i < t; i++) {
//         n[i] = e[i];
//     }
//     return n;
// }

// function u(e) {
//     return function () {
//         var t,
//             i = p(e);
//         if (f()) {
//             var n = p(this).constructor;
//             t = Reflect.construct(i, arguments, n);
//         } else t = i.apply(this, arguments);
//         return d(this, t);
//     };
// }

// function d(e, t) {
//     return !t || "object" !== C(t) && "function" != typeof t ? h(e) : t;
// }

// function h(e) {
//     if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
//     return e;
// }

// function f() {
//     if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
//     if (Reflect.construct.sham) return !1;
//     if ("function" == typeof Proxy) return !0;
//     try {
//         return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
//     } catch (e) {
//         return !1;
//     }
// }

// function p(e) {
//     return (p = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
//         return e.__proto__ || Object.getPrototypeOf(e);
//     })(e);
// }

// function g(e, t) {
//     if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
//     e.prototype = Object.create(t && t.prototype, {
//         constructor: {
//             value: e,
//             writable: !0,
//             configurable: !0
//         }
//     }), t && m(e, t);
// }

// function m(e, t) {
//     return (m = Object.setPrototypeOf || function (e, t) {
//         return e.__proto__ = t, e;
//     })(e, t);
// }

// function v(e, t) {
//     if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
// }

// function y(e, t) {
//     for (var i = 0; i < t.length; i++) {
//         var n = t[i];
//         n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
//     }
// }

// function w(e, t, i) {
//     return t && y(e.prototype, t), i && y(e, i), e;
// }

// function C(e) {
//     "@babel/helpers - typeof";
//     return (C = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
//         return typeof e === "undefined" ? "undefined" : _typeof(e);
//     } : function (e) {
//         return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
//     })(e);
// }
// cc._RF.push(t, "a2455feQ6RFLK7fNAOEZbkb", "umsdk.wechat"),
//     function (e, n) {
//         "object" == (void 0 === i ? "undefined" : C(i)) && "object" == (void 0 === t ? "undefined" : C(t)) ? t.exports = n(): "function" == typeof define && define.amd ? define([], n) : "object" == (void 0 === i ? "undefined" : C(i)) ? i.umsdk = n() : (void 0).umsdk = n();
//     }(0, function () {
//         return function (e) {
//             var t = {};

//             function i(n) {
//                 if (t[n]) return t[n].exports;
//                 var a = t[n] = {
//                     i: n,
//                     l: !1,
//                     exports: {}
//                 };
//                 return e[n].call(a.exports, a, a.exports, i), a.l = !0, a.exports;
//             }
//             return i.m = e, i.c = t, i.d = function (e, t, n) {
//                 i.o(e, t) || Object.defineProperty(e, t, {
//                     enumerable: !0,
//                     get: n
//                 });
//             }, i.r = function (e) {
//                 "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
//                     value: "Module"
//                 }), Object.defineProperty(e, "__esModule", {
//                     value: !0
//                 });
//             }, i.t = function (e, t) {
//                 if (1 & t && (e = i(e)), 8 & t) return e;
//                 if (4 & t && "object" == C(e) && e && e.__esModule) return e;
//                 var n = Object.create(null);
//                 if (i.r(n), Object.defineProperty(n, "default", {
//                         enumerable: !0,
//                         value: e
//                     }), 2 & t && "string" != typeof e)
//                     for (var a in e) {
//                         i.d(n, a, function (t) {
//                             return e[t];
//                         }.bind(null, a));
//                     }
//                 return n;
//             }, i.n = function (e) {
//                 var t = e && e.__esModule ? function () {
//                     return e.default;
//                 } : function () {
//                     return e;
//                 };
//                 return i.d(t, "a", t), t;
//             }, i.o = function (e, t) {
//                 return Object.prototype.hasOwnProperty.call(e, t);
//             }, i.p = "", i(i.s = 0);
//         }([function (e, t, i) {
//             i.r(t);
//             var a = function () {
//                     function e(t, i) {
//                         v(this, e), this.runtime = i, this.data = {
//                             sid: t.slotId
//                         }, this.ad = t.createAd(t.params), this.ad.onError(function (e) {
//                             self.runtime.event("ad", "imp", {
//                                 lbl: self.data.stype,
//                                 val: -2,
//                                 sub5: self.data.sid,
//                                 sub7: e.errMsg,
//                                 subi4: e.errCode
//                             });
//                         });
//                     }
//                     return w(e, [{
//                         key: "load",
//                         value: function value() {
//                             return this.ad.load();
//                         }
//                     }, {
//                         key: "show",
//                         value: function value() {
//                             var e = this;
//                             return this.ad.show().then(function () {
//                                 e.runtime.event("ad", "imp", {
//                                     lbl: e.data.stype,
//                                     val: 0,
//                                     sub5: e.data.sid
//                                 });
//                             }, function (t) {
//                                 throw e.runtime.event("ad", "imp", {
//                                     lbl: e.data.stype,
//                                     val: -1,
//                                     sub5: e.data.sid,
//                                     sub7: t.errMsg,
//                                     subi4: t.errCode
//                                 }), t;
//                             });
//                         }
//                     }, {
//                         key: "destroy",
//                         value: function value() {
//                             this.ad.destroy();
//                         }
//                     }, {
//                         key: "onClose",
//                         value: function value(e) {
//                             this.ad.onClose(e);
//                         }
//                     }, {
//                         key: "offClose",
//                         value: function value(e) {
//                             this.ad.offClose(e);
//                         }
//                     }, {
//                         key: "onLoad",
//                         value: function value(e) {
//                             this.ad.onLoad(e);
//                         }
//                     }, {
//                         key: "offLoad",
//                         value: function value(e) {
//                             this.ad.offLoad(e);
//                         }
//                     }, {
//                         key: "onError",
//                         value: function value(e) {
//                             this.ad.onError(e);
//                         }
//                     }, {
//                         key: "offError",
//                         value: function value(e) {
//                             this.ad.offError(e);
//                         }
//                     }]), e;
//                 }(),
//                 o = function (e) {
//                     g(i, a);
//                     var t = u(i);

//                     function i(e, n) {
//                         var a;
//                         return v(this, i), (a = t.call(this, e, n)).data.stype = "banner", a.showed = !1, a;
//                     }
//                     return w(i, [{
//                         key: "show",
//                         value: function value() {
//                             var e = this;
//                             return this.ad.show().then(function () {
//                                 e.showed || (e.showed = !0, e.runtime.event("ad", "imp", {
//                                     lbl: e.data.stype,
//                                     val: 0,
//                                     sub5: e.data.sid
//                                 }));
//                             }, function (t) {
//                                 throw e.runtime.event("ad", "imp", {
//                                     lbl: e.data.stype,
//                                     val: -1,
//                                     sub5: e.data.sid,
//                                     subi4: t.errCode
//                                 }), t;
//                             });
//                         }
//                     }, {
//                         key: "hide",
//                         value: function value() {
//                             this.ad.hide();
//                         }
//                     }, {
//                         key: "offResize",
//                         value: function value(e) {
//                             this.ad.offResize(e);
//                         }
//                     }, {
//                         key: "onResize",
//                         value: function value(e) {
//                             this.ad.onResize(e);
//                         }
//                     }]), i;
//                 }(),
//                 s = function (e) {
//                     g(i, a);
//                     var t = u(i);

//                     function i(e, n) {
//                         var a;
//                         return v(this, i), (a = t.call(this, e, n)).data.stype = "interstitial", a;
//                     }
//                     return i;
//                 }(),
//                 c = function (e) {
//                     g(i, a);
//                     var t = u(i);

//                     function i(e, n) {
//                         var a;
//                         return v(this, i), (a = t.call(this, e, n)).data.stype = "video", a.adUnitId = e.adUnitId, a.onCloseCallbacks = [], a;
//                     }
//                     return w(i, [{
//                         key: "show",
//                         value: function value() {
//                             var e = this;
//                             return this.ad.offClose(), this.ad.onClose(function (t) {
//                                 t && t.isEnded || void 0 === t ? e.runtime.event("ad", "imp", {
//                                     lbl: e.data.stype,
//                                     val: 0,
//                                     sub5: e.data.sid
//                                 }) : e.runtime.event("ad", "imp", {
//                                     lbl: e.data.stype,
//                                     val: 1,
//                                     sub5: e.data.sid
//                                 });
//                                 var i,
//                                     n = r(e.onCloseCallbacks);
//                                 try {
//                                     for (n.s(); !(i = n.n()).done;) {
//                                         (0, i.value)(t);
//                                     }
//                                 } catch (e) {
//                                     n.e(e);
//                                 } finally {
//                                     n.f();
//                                 }
//                             }), this.ad.show();
//                         }
//                     }, {
//                         key: "onClose",
//                         value: function value(e) {
//                             this.onCloseCallbacks.push(e);
//                         }
//                     }, {
//                         key: "onLoad",
//                         value: function value(e) {
//                             this.ad.offLoad(), this.ad.onLoad(e);
//                         }
//                     }, {
//                         key: "onError",
//                         value: function value(e) {
//                             var t = this;
//                             this.ad.offError(), this.ad.onError(function (e) {
//                                 t.runtime.event("ad", "imp", {
//                                     lbl: t.data.stype,
//                                     val: -2,
//                                     sub5: t.adUnitId,
//                                     sub7: e.errMsg,
//                                     subi4: e.errCode
//                                 });
//                             }), this.ad.onError(e);
//                         }
//                     }]), i;
//                 }();

//             function l(e, t) {
//                 if (!e) {
//                     var i = (e = window.location.search).indexOf("?"); - 1 != i && (e = e.substr(i + 1));
//                 }
//                 for (var n = {}, a = e.split(t || "&"), o = 0; o < a.length; o++) {
//                     if (a[o]) {
//                         var s = a[o].split("=");
//                         n[s[0].trim()] = decodeURIComponent(s[1].trim());
//                     }
//                 }
//                 return n;
//             }

//             function d(e, t) {
//                 var i = [];
//                 for (var n in e) {
//                     e[n] && i.push(n + "=" + encodeURIComponent(e[n]));
//                 }
//                 return i.join(t || "&");
//             }

//             function h(e) {
//                 for (var t = "", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = 0; n < e; n++) {
//                     t += i.charAt(Math.floor(Math.random() * i.length));
//                 }
//                 return t;
//             }

//             function f(e, t) {
//                 for (var i in e) {
//                     "__proto__" != i && e[i] && (t[i] = e[i]);
//                 }
//             }

//             function p(e, t, i, n) {
//                 return new Promise(function (a, o) {
//                     var s;
//                     s = {
//                         url: t,
//                         method: e,
//                         header: i,
//                         data: n,
//                         success: function success(e) {
//                             200 == e.statusCode ? a(e.data) : o(Error(e.statusCode));
//                         },
//                         fail: function fail(e) {
//                             o(e);
//                         }
//                     }, wx.request(s);
//                 });
//             }
//             var m = new(function () {
//                 function e() {
//                     v(this, e);
//                 }
//                 return w(e, [{
//                     key: "get",
//                     value: function value(e, t) {
//                         return p("GET", e, t).catch(function (i) {
//                             if ("request:fail timeout" == i.errMsg) return p("GET", e, t);
//                             throw i;
//                         });
//                     }
//                 }, {
//                     key: "post",
//                     value: function value(e, t, i) {
//                         return p("POST", e, t, i).catch(function (n) {
//                             if ("request:fail timeout" == n.errMsg) return p("POST", e, t, i);
//                             throw n;
//                         });
//                     }
//                 }]), e;
//             }())();

//             function y(e) {
//                 wx.login(e);
//             }

//             function C(e) {
//                 wx.onShareAppMessage(e);
//             }

//             function I(e) {
//                 wx.shareAppMessage(e);
//             }
//             var b = function (e) {
//                     g(i, o);
//                     var t = u(i);

//                     function i(e, n) {
//                         var a;
//                         return v(this, i), e.createAd = wx.createBannerAd, e.params = {
//                             adUnitId: e.adUnitId,
//                             adIntervals: e.adIntervals,
//                             style: e.style
//                         }, (a = t.call(this, e, n)).style = a.ad.style, a;
//                     }
//                     return i;
//                 }(),
//                 T = function (e) {
//                     g(i, s);
//                     var t = u(i);

//                     function i(e, n) {
//                         return v(this, i), e.createAd = wx.createInterstitialAd, e.params = {
//                             adUnitId: e.adUnitId
//                         }, t.call(this, e, n);
//                     }
//                     return i;
//                 }(),
//                 S = function (e) {
//                     g(i, c);
//                     var t = u(i);

//                     function i(e, n) {
//                         return v(this, i), e.createAd = wx.createRewardedVideoAd, e.params = {
//                             adUnitId: e.adUnitId,
//                             multiton: e.multiton
//                         }, t.call(this, e, n);
//                     }
//                     return i;
//                 }(),
//                 A = function () {
//                     function e(t, i) {
//                         v(this, e), this.data = {}, f(t, this.data), this.runtime = i, this.showed = !1;
//                     }
//                     return w(e, [{
//                         key: "show",
//                         value: function value(e) {
//                             if (!this.showed) {
//                                 var t = this.data.impurl,
//                                     i = {},
//                                     n = this.data.impurl.indexOf("?"); - 1 != n && (t = this.data.impurl.substr(0, n), i = l(this.data.impurl.substr(n + 1))), e && (i.em = e, i.ec = -1), t = t + "?" + d(i), m.get(t), this.showed = !0;
//                             }
//                         }
//                     }, {
//                         key: "click",
//                         value: function value(e) {
//                             e = e || {},
//                                 function (e, t) {
//                                     wx.navigateToMiniProgram({
//                                         appId: e.appid,
//                                         path: e.path,
//                                         extraData: t.extraData,
//                                         envVersion: t.envVersion,
//                                         success: t.success,
//                                         fail: t.fail,
//                                         complete: function complete(i) {
//                                             var n = e.clkurl,
//                                                 a = {},
//                                                 o = e.clkurl.indexOf("?"); - 1 != o && (n = e.clkurl.substr(0, o), a = l(e.clkurl.substr(o + 1))), "navigateToMiniProgram:ok" != i.errMsg && (a.em = i.errMsg, a.ec = -1), n = n + "?" + d(a), m.get(n), t.complete && t.complete(i);
//                                         }
//                                     });
//                                 }(this.data, e);
//                         }
//                     }, {
//                         key: "dot",
//                         value: function value() {
//                             return this.data.dot;
//                         }
//                     }]), e;
//                 }(),
//                 _ = function () {
//                     function e(t, i) {
//                         v(this, e), this.runtime = i, this.data = {
//                             stype: "icon",
//                             sid: t.slotId,
//                             limit: t.limit || 10,
//                             min_size: t.min_size || 0,
//                             max_size: t.max_size || 0
//                         }, this.data.limit <= 0 && (this.data.limit = 1);
//                     }
//                     return w(e, [{
//                         key: "load",
//                         value: function value() {
//                             var e = this;
//                             return e.runtime.wait4init().then(function () {
//                                 var t = {};
//                                 return f(e.data, t), f(e.runtime.data, t), m.post("https://gw.api.umgame.cn/api/v1/slot", {}, t).then(function (t) {
//                                     if (0 !== t.c) throw Error(t.m);
//                                     for (var i = t.d, n = [], a = 0; a < i.length; a++) {
//                                         i[a].sid = e.data.sid;
//                                         var o = new A(i[a], e.runtime);
//                                         n.push(o);
//                                     }
//                                     return e.onLoadCallback && e.onLoadCallback(n), n;
//                                 }).catch(function (t) {
//                                     return e.onErrorCallback && e.onErrorCallback(t), t;
//                                 });
//                             });
//                         }
//                     }, {
//                         key: "onLoad",
//                         value: function value(e) {
//                             this.onLoadCallback = e;
//                         }
//                     }, {
//                         key: "onError",
//                         value: function value(e) {
//                             this.onErrorCallback = e;
//                         }
//                     }]), e;
//                 }();
//             t.default = new(function () {
//                 function e() {
//                     v(this, e);
//                 }
//                 return w(e, [{
//                     key: "init",
//                     value: function value(e) {
//                         if (!e.gameId) throw Error("obj.gameId is required by init(obj)");
//                         var t = wx.getLaunchOptionsSync();
//                         this.data = {
//                             sdkv: "0.0.10",
//                             gid: parseInt(e.gameId),
//                             uid: e.userId,
//                             uinfo: e.userInfo || {},
//                             cid: parseInt(t.query.cid || 0),
//                             utmsrc: t.query.utmsrc || "",
//                             suid: t.query.suid || "",
//                             ssid: t.query.ssid || "",
//                             smid: parseInt(t.query.smid || 0),
//                             inited: 0
//                         }, this.authPromise = Promise.resolve(), e.userId || (this.authPromise = this.login().then(function (e) {
//                             return a.data.uid = e.openid, e;
//                         }).catch(function (e) {
//                             throw e;
//                         }));
//                         var i,
//                             a = this;
//                         this.initPromise = this.authPromise.then(function () {
//                             return new Promise(function (e, t) {
//                                 wx.getSystemInfo({
//                                     success: function success(t) {
//                                         var i = n(t.system.split(" "), 2),
//                                             a = i[0],
//                                             o = i[1],
//                                             s = {
//                                                 lang: t.language,
//                                                 os: a,
//                                                 osv: o,
//                                                 make: t.brand,
//                                                 model: t.model,
//                                                 width: t.screenWidth,
//                                                 height: t.screenHeight,
//                                                 pv: t.version,
//                                                 plv: t.SDKVersion
//                                             };
//                                         t.windowWidth > t.windowHeight ? s.o = "landscape" : s.o = "portrait", e(s);
//                                     },
//                                     fail: t
//                                 });
//                             });
//                         }, function (e) {}).then(function (e) {
//                             return f(e, a.data), a.getSetting({
//                                 withSubscriptions: !0
//                             });
//                         }, function (e) {}).then(function (e) {
//                             var t = (e.subscriptionsSetting || {}).itemSettings || {},
//                                 i = [];
//                             for (var n in t) {
//                                 "accept" == t[n] && i.push(n);
//                             }
//                             return a.data.tids = i, m.post("https://gw.api.umgame.cn/api/v1/init", {}, a.data);
//                         }, function (e) {}).then(function (e) {
//                             if (0 !== e.c) throw Error(e.m);
//                             return a.data.inited = 1, a.data.cid = e.d.cid, a.data.utmsrc = e.d.utmsrc, a.data.its = e.d.its, a.bald = e.d.bald, a.config = e.d.params || {}, a.shareMaterial = e.d.share_material || {}, a.shareStats = {
//                                 new: e.d.share_new,
//                                 exists: e.d.share_old
//                             }, a.loc = {
//                                 province: e.d.province,
//                                 city: e.d.city
//                             }, !0;
//                         }, function (e) {
//                             return !1;
//                         }), this.configPromise = this.initPromise.then(function () {
//                             return a.config;
//                         }), this.startTime = Date.now(), i = function i(e) {
//                             a.isShareDialogVisible ? a.isShareDialogVisible = !1 : a.startTime = Date.now();
//                         }, wx.onShow(i), wx.onHide(function (e) {
//                             if (!a.isShareDialogVisible) {
//                                 var t = Date.now(),
//                                     i = parseInt((t - a.startTime) / 1e3);
//                                 a.event("sdk", "exit", {
//                                     val: i
//                                 });
//                             }
//                         });
//                     }
//                 }, {
//                     key: "login",
//                     value: function value() {
//                         var e = this;
//                         return new Promise(function (t, i) {
//                             var n = "umsdk:auth:" + e.data.gid,
//                                 a = {
//                                     success: function success(a) {
//                                         if (a.code) {
//                                             var o = "https://gw.api.umgame.cn/api/v1/auth?" + d({
//                                                 gid: e.data.gid,
//                                                 code: a.code
//                                             }, "&");
//                                             m.get(o).then(function (e) {
//                                                 var a;
//                                                 0 === e.c ? (a = {
//                                                     key: n,
//                                                     data: JSON.stringify(e.d),
//                                                     complete: function complete(i) {
//                                                         i.errMsg, t(e.d);
//                                                     }
//                                                 }, wx.setStorage(a)) : i(Error(e.m));
//                                             }).catch(i);
//                                         } else i(a);
//                                     },
//                                     fail: function fail(e) {
//                                         i(e);
//                                     }
//                                 };
//                             ! function (e) {
//                                 wx.getStorage(e);
//                             }({
//                                 key: n,
//                                 success: function success(e) {
//                                     var i,
//                                         n = JSON.parse(e.data);
//                                     i = {
//                                         success: function success() {
//                                             t(n);
//                                         },
//                                         fail: function fail() {
//                                             y(a);
//                                         }
//                                     }, wx.checkSession(i);
//                                 },
//                                 fail: function fail(e) {
//                                     y(a);
//                                 }
//                             });
//                         });
//                     }
//                 }, {
//                     key: "getSetting",
//                     value: function value(e) {
//                         return new Promise(function (t, i) {
//                             ! function (e) {
//                                 wx.getSetting(e);
//                             }({
//                                 withSubscriptions: e.withSubscriptions,
//                                 success: t,
//                                 fail: i
//                             });
//                         });
//                     }
//                 }, {
//                     key: "loadAttrLib",
//                     value: function value(e, t) {
//                         if (!e) throw Error("function fn is required by loadAttrLib(fn)");
//                         var i = this;
//                         this.initPromise.then(function (n) {
//                             n && (i.bald && !t || e());
//                         });
//                     }
//                 }, {
//                     key: "fetchConfig",
//                     value: function value() {
//                         return this.configPromise;
//                     }
//                 }, {
//                     key: "fetchLocation",
//                     value: function value() {
//                         var e = this;
//                         return this.initPromise.then(function () {
//                             return e.loc;
//                         });
//                     }
//                 }, {
//                     key: "fetchShareData",
//                     value: function value() {
//                         var e = this;
//                         return this.initPromise.then(function () {
//                             return e.shareStats;
//                         });
//                     }
//                 }, {
//                     key: "fetchLaunchOptions",
//                     value: function value() {
//                         var e = this;
//                         return this.initPromise.then(function () {
//                             return {
//                                 cid: e.data.cid,
//                                 src: e.data.utmsrc,
//                                 its: e.data.its
//                             };
//                         });
//                     }
//                 }, {
//                     key: "fetchShareQuery",
//                     value: function value() {
//                         var e = this;
//                         return this.initPromise.then(function () {
//                             return d({
//                                 utmsrc: "share",
//                                 cid: e.data.cid,
//                                 suid: e.data.uid,
//                                 smid: e.shareMaterial.smid
//                             });
//                         });
//                     }
//                 }, {
//                     key: "subscribe",
//                     value: function value(e) {
//                         var t = this;
//                         this.wait4init().then(function () {
//                             var i = {};
//                             f(t.data, i), "subscribeAppMsg:ok" == e.errMsg && (i.tall = 1), e.ids && (i.tids = e.ids), m.post("https://gw.api.umgame.cn/api/v1/sub", {}, i);
//                         });
//                     }
//                 }, {
//                     key: "auth",
//                     value: function value() {
//                         return this.authPromise;
//                     }
//                 }, {
//                     key: "wait4init",
//                     value: function value() {
//                         return this.initPromise;
//                     }
//                 }, {
//                     key: "event",
//                     value: function value(e, t, i) {
//                         if (!e || !t) throw Error("cat and act is required by event(cat, act, params)");
//                         var n = this;
//                         return this.wait4init().then(function () {
//                             var a = {
//                                 app: "minigame",
//                                 cat: e,
//                                 act: t,
//                                 rid: h(16),
//                                 lang: n.data.lang,
//                                 os: n.data.os,
//                                 osv: n.data.osv,
//                                 make: n.data.make,
//                                 model: n.data.model,
//                                 w: n.data.width,
//                                 h: n.data.height,
//                                 did: n.data.uid,
//                                 sub1: n.data.sdkv,
//                                 sub2: n.data.pv,
//                                 sub3: n.data.plv,
//                                 sub4: n.data.utmsrc,
//                                 subi1: n.data.gid,
//                                 subi2: n.data.cid,
//                                 subi3: n.data.its,
//                                 subi7: n.data.inited
//                             };
//                             i && f(i, a);
//                             var o = "https://event.api.umgame.cn/api/v1/event?" + d(a, "&");
//                             return m.get(o);
//                         });
//                     }
//                 }, {
//                     key: "onShareAppMessage",
//                     value: function value(e, t) {
//                         var i = this;
//                         this.fetchShareQuery().then(function (n) {
//                             C(function () {
//                                 var a = t();
//                                 return i.shareMaterial.title && (a.title = i.shareMaterial.title), i.shareMaterial.image && (a.imageUrl = i.shareMaterial.image), a.query ? a.query = a.query + "&" + n : a.query = n, a.query = a.query + "&ssid=" + e, i.isShareDialogVisible = !0, i.event("user", "share", {
//                                     sub5: e,
//                                     subi10: i.shareMaterial.smid
//                                 }), a;
//                             });
//                         }, function (e) {
//                             i.isShareDialogVisible = !0, C(t);
//                         });
//                     }
//                 }, {
//                     key: "shareAppMessage",
//                     value: function value(e) {
//                         if (!e.slotId || !e.data) throw Error("`obj.slotId` and `obj.data` are required by shareAppMessage");
//                         var t = this;
//                         this.fetchShareQuery().then(function (i) {
//                             if (t.shareMaterial.title && (e.data.title = t.shareMaterial.title), t.shareMaterial.image && (e.data.imageUrl = t.shareMaterial.image), e.data.query ? e.data.query = e.data.query + "&" + i : e.data.query = i, e.data.query = e.data.query + "&ssid=" + e.slotId, t.isShareDialogVisible = !0, e.data.success) {
//                                 var n = e.data.success;
//                                 e.data.success = function () {
//                                     t.event("user", "share", {
//                                         sub5: e.slotId,
//                                         subi10: t.shareMaterial.smid
//                                     }), n();
//                                 }, I(e.data);
//                             } else I(e.data), t.event("user", "share", {
//                                 sub5: e.slotId,
//                                 subi10: t.shareMaterial.smid
//                             });
//                         }, function (i) {
//                             t.isShareDialogVisible = !0, I(e.data);
//                         });
//                     }
//                 }, {
//                     key: "createIconAd",
//                     value: function value(e) {
//                         if (!e.slotId) throw Error("obj.slotId is required by createIconAd(obj)");
//                         return new _(e, this);
//                     }
//                 }, {
//                     key: "createBannerAd",
//                     value: function value(e) {
//                         if (!e.adUnitId) throw Error("obj.adUnitId is required by createBannerAd(obj)");
//                         if (!e.slotId) throw Error("obj.slotId is required by createBannerAd(obj)");
//                         return new b(e, this);
//                     }
//                 }, {
//                     key: "createInterstitialAd",
//                     value: function value(e) {
//                         if (!e.adUnitId) throw Error("obj.adUnitId is required by createInterstitialAd(obj)");
//                         if (!e.slotId) throw Error("obj.slotId is required by createInterstitialAd(obj)");
//                         return new T(e, this);
//                     }
//                 }, {
//                     key: "createRewardedVideoAd",
//                     value: function value(e) {
//                         if (!e.adUnitId) throw Error("obj.adUnitId is required by createRewardedVideoAd(obj);");
//                         if (!e.slotId) throw Error("obj.slotId is required by createRewardedVideoAd(obj)");
//                         return new S(e, this);
//                     }
//                 }]), e;
//             }())();
//         }]);
//     })


// /*"umsdk.wechat": [function (e, t, i) {
//         "use strict";

//         function n(e, t) {
//             return s(e) || o(e, t) || c(e, t) || a();
//         }

//         function a() {
//             throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
//         }

//         function o(e, t) {
//             if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
//                 var i = [],
//                     n = !0,
//                     a = !1,
//                     o = void 0;
//                 try {
//                     for (var s, r = e[Symbol.iterator](); !(n = (s = r.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0) {}
//                 } catch (e) {
//                     a = !0, o = e;
//                 } finally {
//                     try {
//                         n || null == r.return || r.return();
//                     } finally {
//                         if (a) throw o;
//                     }
//                 }
//                 return i;
//             }
//         }

//         function s(e) {
//             if (Array.isArray(e)) return e;
//         }

//         function r(e) {
//             if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
//                 if (Array.isArray(e) || (e = c(e))) {
//                     var t = 0,
//                         i = function i() {};
//                     return {
//                         s: i,
//                         n: function n() {
//                             return t >= e.length ? {
//                                 done: !0
//                             } : {
//                                 done: !1,
//                                 value: e[t++]
//                             };
//                         },
//                         e: function e(_e5) {
//                             throw _e5;
//                         },
//                         f: i
//                     };
//                 }
//                 throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
//             }
//             var _n3,
//                 a,
//                 o = !0,
//                 s = !1;
//             return {
//                 s: function s() {
//                     _n3 = e[Symbol.iterator]();
//                 },
//                 n: function n() {
//                     var e = _n3.next();
//                     return o = e.done, e;
//                 },
//                 e: function e(_e6) {
//                     s = !0, a = _e6;
//                 },
//                 f: function f() {
//                     try {
//                         o || null == _n3.return || _n3.return();
//                     } finally {
//                         if (s) throw a;
//                     }
//                 }
//             };
//         }

//         function c(e, t) {
//             if (e) {
//                 if ("string" == typeof e) return l(e, t);
//                 var i = Object.prototype.toString.call(e).slice(8, -1);
//                 return "Object" === i && e.constructor && (i = e.constructor.name), "Map" === i || "Set" === i ? Array.from(i) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? l(e, t) : void 0;
//             }
//         }

//         function l(e, t) {
//             (null == t || t > e.length) && (t = e.length);
//             for (var i = 0, n = new Array(t); i < t; i++) {
//                 n[i] = e[i];
//             }
//             return n;
//         }

//         function u(e) {
//             return function () {
//                 var t,
//                     i = p(e);
//                 if (f()) {
//                     var n = p(this).constructor;
//                     t = Reflect.construct(i, arguments, n);
//                 } else t = i.apply(this, arguments);
//                 return d(this, t);
//             };
//         }

//         function d(e, t) {
//             return !t || "object" !== C(t) && "function" != typeof t ? h(e) : t;
//         }

//         function h(e) {
//             if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
//             return e;
//         }

//         function f() {
//             if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
//             if (Reflect.construct.sham) return !1;
//             if ("function" == typeof Proxy) return !0;
//             try {
//                 return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
//             } catch (e) {
//                 return !1;
//             }
//         }

//         function p(e) {
//             return (p = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
//                 return e.__proto__ || Object.getPrototypeOf(e);
//             })(e);
//         }

//         function g(e, t) {
//             if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
//             e.prototype = Object.create(t && t.prototype, {
//                 constructor: {
//                     value: e,
//                     writable: !0,
//                     configurable: !0
//                 }
//             }), t && m(e, t);
//         }

//         function m(e, t) {
//             return (m = Object.setPrototypeOf || function (e, t) {
//                 return e.__proto__ = t, e;
//             })(e, t);
//         }

//         function v(e, t) {
//             if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
//         }

//         function y(e, t) {
//             for (var i = 0; i < t.length; i++) {
//                 var n = t[i];
//                 n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
//             }
//         }

//         function w(e, t, i) {
//             return t && y(e.prototype, t), i && y(e, i), e;
//         }

//         function C(e) {
//             "@babel/helpers - typeof";
//             return (C = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
//                 return typeof e === "undefined" ? "undefined" : _typeof(e);
//             } : function (e) {
//                 return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
//             })(e);
//         }
//         cc._RF.push(t, "a2455feQ6RFLK7fNAOEZbkb", "umsdk.wechat"),
//             function (e, n) {
//                 "object" == (void 0 === i ? "undefined" : C(i)) && "object" == (void 0 === t ? "undefined" : C(t)) ? t.exports = n(): "function" == typeof define && define.amd ? define([], n) : "object" == (void 0 === i ? "undefined" : C(i)) ? i.umsdk = n() : (void 0).umsdk = n();
//             }(0, function () {
//                 return function (e) {
//                     var t = {};

//                     function i(n) {
//                         if (t[n]) return t[n].exports;
//                         var a = t[n] = {
//                             i: n,
//                             l: !1,
//                             exports: {}
//                         };
//                         return e[n].call(a.exports, a, a.exports, i), a.l = !0, a.exports;
//                     }
//                     return i.m = e, i.c = t, i.d = function (e, t, n) {
//                         i.o(e, t) || Object.defineProperty(e, t, {
//                             enumerable: !0,
//                             get: n
//                         });
//                     }, i.r = function (e) {
//                         "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
//                             value: "Module"
//                         }), Object.defineProperty(e, "__esModule", {
//                             value: !0
//                         });
//                     }, i.t = function (e, t) {
//                         if (1 & t && (e = i(e)), 8 & t) return e;
//                         if (4 & t && "object" == C(e) && e && e.__esModule) return e;
//                         var n = Object.create(null);
//                         if (i.r(n), Object.defineProperty(n, "default", {
//                                 enumerable: !0,
//                                 value: e
//                             }), 2 & t && "string" != typeof e)
//                             for (var a in e) {
//                                 i.d(n, a, function (t) {
//                                     return e[t];
//                                 }.bind(null, a));
//                             }
//                         return n;
//                     }, i.n = function (e) {
//                         var t = e && e.__esModule ? function () {
//                             return e.default;
//                         } : function () {
//                             return e;
//                         };
//                         return i.d(t, "a", t), t;
//                     }, i.o = function (e, t) {
//                         return Object.prototype.hasOwnProperty.call(e, t);
//                     }, i.p = "", i(i.s = 0);
//                 }([function (e, t, i) {
//                     i.r(t);
//                     var a = function () {
//                             function e(t, i) {
//                                 v(this, e), this.runtime = i, this.data = {
//                                     sid: t.slotId
//                                 }, this.ad = t.createAd(t.params), this.ad.onError(function (e) {
//                                     self.runtime.event("ad", "imp", {
//                                         lbl: self.data.stype,
//                                         val: -2,
//                                         sub5: self.data.sid,
//                                         sub7: e.errMsg,
//                                         subi4: e.errCode
//                                     });
//                                 });
//                             }
//                             return w(e, [{
//                                 key: "load",
//                                 value: function value() {
//                                     return this.ad.load();
//                                 }
//                             }, {
//                                 key: "show",
//                                 value: function value() {
//                                     var e = this;
//                                     return this.ad.show().then(function () {
//                                         e.runtime.event("ad", "imp", {
//                                             lbl: e.data.stype,
//                                             val: 0,
//                                             sub5: e.data.sid
//                                         });
//                                     }, function (t) {
//                                         throw e.runtime.event("ad", "imp", {
//                                             lbl: e.data.stype,
//                                             val: -1,
//                                             sub5: e.data.sid,
//                                             sub7: t.errMsg,
//                                             subi4: t.errCode
//                                         }), t;
//                                     });
//                                 }
//                             }, {
//                                 key: "destroy",
//                                 value: function value() {
//                                     this.ad.destroy();
//                                 }
//                             }, {
//                                 key: "onClose",
//                                 value: function value(e) {
//                                     this.ad.onClose(e);
//                                 }
//                             }, {
//                                 key: "offClose",
//                                 value: function value(e) {
//                                     this.ad.offClose(e);
//                                 }
//                             }, {
//                                 key: "onLoad",
//                                 value: function value(e) {
//                                     this.ad.onLoad(e);
//                                 }
//                             }, {
//                                 key: "offLoad",
//                                 value: function value(e) {
//                                     this.ad.offLoad(e);
//                                 }
//                             }, {
//                                 key: "onError",
//                                 value: function value(e) {
//                                     this.ad.onError(e);
//                                 }
//                             }, {
//                                 key: "offError",
//                                 value: function value(e) {
//                                     this.ad.offError(e);
//                                 }
//                             }]), e;
//                         }(),
//                         o = function (e) {
//                             g(i, a);
//                             var t = u(i);

//                             function i(e, n) {
//                                 var a;
//                                 return v(this, i), (a = t.call(this, e, n)).data.stype = "banner", a.showed = !1, a;
//                             }
//                             return w(i, [{
//                                 key: "show",
//                                 value: function value() {
//                                     var e = this;
//                                     return this.ad.show().then(function () {
//                                         e.showed || (e.showed = !0, e.runtime.event("ad", "imp", {
//                                             lbl: e.data.stype,
//                                             val: 0,
//                                             sub5: e.data.sid
//                                         }));
//                                     }, function (t) {
//                                         throw e.runtime.event("ad", "imp", {
//                                             lbl: e.data.stype,
//                                             val: -1,
//                                             sub5: e.data.sid,
//                                             subi4: t.errCode
//                                         }), t;
//                                     });
//                                 }
//                             }, {
//                                 key: "hide",
//                                 value: function value() {
//                                     this.ad.hide();
//                                 }
//                             }, {
//                                 key: "offResize",
//                                 value: function value(e) {
//                                     this.ad.offResize(e);
//                                 }
//                             }, {
//                                 key: "onResize",
//                                 value: function value(e) {
//                                     this.ad.onResize(e);
//                                 }
//                             }]), i;
//                         }(),
//                         s = function (e) {
//                             g(i, a);
//                             var t = u(i);

//                             function i(e, n) {
//                                 var a;
//                                 return v(this, i), (a = t.call(this, e, n)).data.stype = "interstitial", a;
//                             }
//                             return i;
//                         }(),
//                         c = function (e) {
//                             g(i, a);
//                             var t = u(i);

//                             function i(e, n) {
//                                 var a;
//                                 return v(this, i), (a = t.call(this, e, n)).data.stype = "video", a.adUnitId = e.adUnitId, a.onCloseCallbacks = [], a;
//                             }
//                             return w(i, [{
//                                 key: "show",
//                                 value: function value() {
//                                     var e = this;
//                                     return this.ad.offClose(), this.ad.onClose(function (t) {
//                                         t && t.isEnded || void 0 === t ? e.runtime.event("ad", "imp", {
//                                             lbl: e.data.stype,
//                                             val: 0,
//                                             sub5: e.data.sid
//                                         }) : e.runtime.event("ad", "imp", {
//                                             lbl: e.data.stype,
//                                             val: 1,
//                                             sub5: e.data.sid
//                                         });
//                                         var i,
//                                             n = r(e.onCloseCallbacks);
//                                         try {
//                                             for (n.s(); !(i = n.n()).done;) {
//                                                 (0, i.value)(t);
//                                             }
//                                         } catch (e) {
//                                             n.e(e);
//                                         } finally {
//                                             n.f();
//                                         }
//                                     }), this.ad.show();
//                                 }
//                             }, {
//                                 key: "onClose",
//                                 value: function value(e) {
//                                     this.onCloseCallbacks.push(e);
//                                 }
//                             }, {
//                                 key: "onLoad",
//                                 value: function value(e) {
//                                     this.ad.offLoad(), this.ad.onLoad(e);
//                                 }
//                             }, {
//                                 key: "onError",
//                                 value: function value(e) {
//                                     var t = this;
//                                     this.ad.offError(), this.ad.onError(function (e) {
//                                         t.runtime.event("ad", "imp", {
//                                             lbl: t.data.stype,
//                                             val: -2,
//                                             sub5: t.adUnitId,
//                                             sub7: e.errMsg,
//                                             subi4: e.errCode
//                                         });
//                                     }), this.ad.onError(e);
//                                 }
//                             }]), i;
//                         }();

//                     function l(e, t) {
//                         if (!e) {
//                             var i = (e = window.location.search).indexOf("?"); - 1 != i && (e = e.substr(i + 1));
//                         }
//                         for (var n = {}, a = e.split(t || "&"), o = 0; o < a.length; o++) {
//                             if (a[o]) {
//                                 var s = a[o].split("=");
//                                 n[s[0].trim()] = decodeURIComponent(s[1].trim());
//                             }
//                         }
//                         return n;
//                     }

//                     function d(e, t) {
//                         var i = [];
//                         for (var n in e) {
//                             e[n] && i.push(n + "=" + encodeURIComponent(e[n]));
//                         }
//                         return i.join(t || "&");
//                     }

//                     function h(e) {
//                         for (var t = "", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = 0; n < e; n++) {
//                             t += i.charAt(Math.floor(Math.random() * i.length));
//                         }
//                         return t;
//                     }

//                     function f(e, t) {
//                         for (var i in e) {
//                             "__proto__" != i && e[i] && (t[i] = e[i]);
//                         }
//                     }

//                     function p(e, t, i, n) {
//                         return new Promise(function (a, o) {
//                             var s;
//                             s = {
//                                 url: t,
//                                 method: e,
//                                 header: i,
//                                 data: n,
//                                 success: function success(e) {
//                                     200 == e.statusCode ? a(e.data) : o(Error(e.statusCode));
//                                 },
//                                 fail: function fail(e) {
//                                     o(e);
//                                 }
//                             }, wx.request(s);
//                         });
//                     }
//                     var m = new(function () {
//                         function e() {
//                             v(this, e);
//                         }
//                         return w(e, [{
//                             key: "get",
//                             value: function value(e, t) {
//                                 return p("GET", e, t).catch(function (i) {
//                                     if ("request:fail timeout" == i.errMsg) return p("GET", e, t);
//                                     throw i;
//                                 });
//                             }
//                         }, {
//                             key: "post",
//                             value: function value(e, t, i) {
//                                 return p("POST", e, t, i).catch(function (n) {
//                                     if ("request:fail timeout" == n.errMsg) return p("POST", e, t, i);
//                                     throw n;
//                                 });
//                             }
//                         }]), e;
//                     }())();

//                     function y(e) {
//                         wx.login(e);
//                     }

//                     function C(e) {
//                         wx.onShareAppMessage(e);
//                     }

//                     function I(e) {
//                         wx.shareAppMessage(e);
//                     }
//                     var b = function (e) {
//                             g(i, o);
//                             var t = u(i);

//                             function i(e, n) {
//                                 var a;
//                                 return v(this, i), e.createAd = wx.createBannerAd, e.params = {
//                                     adUnitId: e.adUnitId,
//                                     adIntervals: e.adIntervals,
//                                     style: e.style
//                                 }, (a = t.call(this, e, n)).style = a.ad.style, a;
//                             }
//                             return i;
//                         }(),
//                         T = function (e) {
//                             g(i, s);
//                             var t = u(i);

//                             function i(e, n) {
//                                 return v(this, i), e.createAd = wx.createInterstitialAd, e.params = {
//                                     adUnitId: e.adUnitId
//                                 }, t.call(this, e, n);
//                             }
//                             return i;
//                         }(),
//                         S = function (e) {
//                             g(i, c);
//                             var t = u(i);

//                             function i(e, n) {
//                                 return v(this, i), e.createAd = wx.createRewardedVideoAd, e.params = {
//                                     adUnitId: e.adUnitId,
//                                     multiton: e.multiton
//                                 }, t.call(this, e, n);
//                             }
//                             return i;
//                         }(),
//                         A = function () {
//                             function e(t, i) {
//                                 v(this, e), this.data = {}, f(t, this.data), this.runtime = i, this.showed = !1;
//                             }
//                             return w(e, [{
//                                 key: "show",
//                                 value: function value(e) {
//                                     if (!this.showed) {
//                                         var t = this.data.impurl,
//                                             i = {},
//                                             n = this.data.impurl.indexOf("?"); - 1 != n && (t = this.data.impurl.substr(0, n), i = l(this.data.impurl.substr(n + 1))), e && (i.em = e, i.ec = -1), t = t + "?" + d(i), m.get(t), this.showed = !0;
//                                     }
//                                 }
//                             }, {
//                                 key: "click",
//                                 value: function value(e) {
//                                     e = e || {},
//                                         function (e, t) {
//                                             wx.navigateToMiniProgram({
//                                                 appId: e.appid,
//                                                 path: e.path,
//                                                 extraData: t.extraData,
//                                                 envVersion: t.envVersion,
//                                                 success: t.success,
//                                                 fail: t.fail,
//                                                 complete: function complete(i) {
//                                                     var n = e.clkurl,
//                                                         a = {},
//                                                         o = e.clkurl.indexOf("?"); - 1 != o && (n = e.clkurl.substr(0, o), a = l(e.clkurl.substr(o + 1))), "navigateToMiniProgram:ok" != i.errMsg && (a.em = i.errMsg, a.ec = -1), n = n + "?" + d(a), m.get(n), t.complete && t.complete(i);
//                                                 }
//                                             });
//                                         }(this.data, e);
//                                 }
//                             }, {
//                                 key: "dot",
//                                 value: function value() {
//                                     return this.data.dot;
//                                 }
//                             }]), e;
//                         }(),
//                         _ = function () {
//                             function e(t, i) {
//                                 v(this, e), this.runtime = i, this.data = {
//                                     stype: "icon",
//                                     sid: t.slotId,
//                                     limit: t.limit || 10,
//                                     min_size: t.min_size || 0,
//                                     max_size: t.max_size || 0
//                                 }, this.data.limit <= 0 && (this.data.limit = 1);
//                             }
//                             return w(e, [{
//                                 key: "load",
//                                 value: function value() {
//                                     var e = this;
//                                     return e.runtime.wait4init().then(function () {
//                                         var t = {};
//                                         return f(e.data, t), f(e.runtime.data, t), m.post("https://gw.api.umgame.cn/api/v1/slot", {}, t).then(function (t) {
//                                             if (0 !== t.c) throw Error(t.m);
//                                             for (var i = t.d, n = [], a = 0; a < i.length; a++) {
//                                                 i[a].sid = e.data.sid;
//                                                 var o = new A(i[a], e.runtime);
//                                                 n.push(o);
//                                             }
//                                             return e.onLoadCallback && e.onLoadCallback(n), n;
//                                         }).catch(function (t) {
//                                             return e.onErrorCallback && e.onErrorCallback(t), t;
//                                         });
//                                     });
//                                 }
//                             }, {
//                                 key: "onLoad",
//                                 value: function value(e) {
//                                     this.onLoadCallback = e;
//                                 }
//                             }, {
//                                 key: "onError",
//                                 value: function value(e) {
//                                     this.onErrorCallback = e;
//                                 }
//                             }]), e;
//                         }();
//                     t.default = new(function () {
//                         function e() {
//                             v(this, e);
//                         }
//                         return w(e, [{
//                             key: "init",
//                             value: function value(e) {
//                                 if (!e.gameId) throw Error("obj.gameId is required by init(obj)");
//                                 var t = wx.getLaunchOptionsSync();
//                                 this.data = {
//                                     sdkv: "0.0.10",
//                                     gid: parseInt(e.gameId),
//                                     uid: e.userId,
//                                     uinfo: e.userInfo || {},
//                                     cid: parseInt(t.query.cid || 0),
//                                     utmsrc: t.query.utmsrc || "",
//                                     suid: t.query.suid || "",
//                                     ssid: t.query.ssid || "",
//                                     smid: parseInt(t.query.smid || 0),
//                                     inited: 0
//                                 }, this.authPromise = Promise.resolve(), e.userId || (this.authPromise = this.login().then(function (e) {
//                                     return a.data.uid = e.openid, e;
//                                 }).catch(function (e) {
//                                     throw e;
//                                 }));
//                                 var i,
//                                     a = this;
//                                 this.initPromise = this.authPromise.then(function () {
//                                     return new Promise(function (e, t) {
//                                         wx.getSystemInfo({
//                                             success: function success(t) {
//                                                 var i = n(t.system.split(" "), 2),
//                                                     a = i[0],
//                                                     o = i[1],
//                                                     s = {
//                                                         lang: t.language,
//                                                         os: a,
//                                                         osv: o,
//                                                         make: t.brand,
//                                                         model: t.model,
//                                                         width: t.screenWidth,
//                                                         height: t.screenHeight,
//                                                         pv: t.version,
//                                                         plv: t.SDKVersion
//                                                     };
//                                                 t.windowWidth > t.windowHeight ? s.o = "landscape" : s.o = "portrait", e(s);
//                                             },
//                                             fail: t
//                                         });
//                                     });
//                                 }, function (e) {}).then(function (e) {
//                                     return f(e, a.data), a.getSetting({
//                                         withSubscriptions: !0
//                                     });
//                                 }, function (e) {}).then(function (e) {
//                                     var t = (e.subscriptionsSetting || {}).itemSettings || {},
//                                         i = [];
//                                     for (var n in t) {
//                                         "accept" == t[n] && i.push(n);
//                                     }
//                                     return a.data.tids = i, m.post("https://gw.api.umgame.cn/api/v1/init", {}, a.data);
//                                 }, function (e) {}).then(function (e) {
//                                     if (0 !== e.c) throw Error(e.m);
//                                     return a.data.inited = 1, a.data.cid = e.d.cid, a.data.utmsrc = e.d.utmsrc, a.data.its = e.d.its, a.bald = e.d.bald, a.config = e.d.params || {}, a.shareMaterial = e.d.share_material || {}, a.shareStats = {
//                                         new: e.d.share_new,
//                                         exists: e.d.share_old
//                                     }, a.loc = {
//                                         province: e.d.province,
//                                         city: e.d.city
//                                     }, !0;
//                                 }, function (e) {
//                                     return !1;
//                                 }), this.configPromise = this.initPromise.then(function () {
//                                     return a.config;
//                                 }), this.startTime = Date.now(), i = function i(e) {
//                                     a.isShareDialogVisible ? a.isShareDialogVisible = !1 : a.startTime = Date.now();
//                                 }, wx.onShow(i), wx.onHide(function (e) {
//                                     if (!a.isShareDialogVisible) {
//                                         var t = Date.now(),
//                                             i = parseInt((t - a.startTime) / 1e3);
//                                         a.event("sdk", "exit", {
//                                             val: i
//                                         });
//                                     }
//                                 });
//                             }
//                         }, {
//                             key: "login",
//                             value: function value() {
//                                 var e = this;
//                                 return new Promise(function (t, i) {
//                                     var n = "umsdk:auth:" + e.data.gid,
//                                         a = {
//                                             success: function success(a) {
//                                                 if (a.code) {
//                                                     var o = "https://gw.api.umgame.cn/api/v1/auth?" + d({
//                                                         gid: e.data.gid,
//                                                         code: a.code
//                                                     }, "&");
//                                                     m.get(o).then(function (e) {
//                                                         var a;
//                                                         0 === e.c ? (a = {
//                                                             key: n,
//                                                             data: JSON.stringify(e.d),
//                                                             complete: function complete(i) {
//                                                                 i.errMsg, t(e.d);
//                                                             }
//                                                         }, wx.setStorage(a)) : i(Error(e.m));
//                                                     }).catch(i);
//                                                 } else i(a);
//                                             },
//                                             fail: function fail(e) {
//                                                 i(e);
//                                             }
//                                         };
//                                     ! function (e) {
//                                         wx.getStorage(e);
//                                     }({
//                                         key: n,
//                                         success: function success(e) {
//                                             var i,
//                                                 n = JSON.parse(e.data);
//                                             i = {
//                                                 success: function success() {
//                                                     t(n);
//                                                 },
//                                                 fail: function fail() {
//                                                     y(a);
//                                                 }
//                                             }, wx.checkSession(i);
//                                         },
//                                         fail: function fail(e) {
//                                             y(a);
//                                         }
//                                     });
//                                 });
//                             }
//                         }, {
//                             key: "getSetting",
//                             value: function value(e) {
//                                 return new Promise(function (t, i) {
//                                     ! function (e) {
//                                         wx.getSetting(e);
//                                     }({
//                                         withSubscriptions: e.withSubscriptions,
//                                         success: t,
//                                         fail: i
//                                     });
//                                 });
//                             }
//                         }, {
//                             key: "loadAttrLib",
//                             value: function value(e, t) {
//                                 if (!e) throw Error("function fn is required by loadAttrLib(fn)");
//                                 var i = this;
//                                 this.initPromise.then(function (n) {
//                                     n && (i.bald && !t || e());
//                                 });
//                             }
//                         }, {
//                             key: "fetchConfig",
//                             value: function value() {
//                                 return this.configPromise;
//                             }
//                         }, {
//                             key: "fetchLocation",
//                             value: function value() {
//                                 var e = this;
//                                 return this.initPromise.then(function () {
//                                     return e.loc;
//                                 });
//                             }
//                         }, {
//                             key: "fetchShareData",
//                             value: function value() {
//                                 var e = this;
//                                 return this.initPromise.then(function () {
//                                     return e.shareStats;
//                                 });
//                             }
//                         }, {
//                             key: "fetchLaunchOptions",
//                             value: function value() {
//                                 var e = this;
//                                 return this.initPromise.then(function () {
//                                     return {
//                                         cid: e.data.cid,
//                                         src: e.data.utmsrc,
//                                         its: e.data.its
//                                     };
//                                 });
//                             }
//                         }, {
//                             key: "fetchShareQuery",
//                             value: function value() {
//                                 var e = this;
//                                 return this.initPromise.then(function () {
//                                     return d({
//                                         utmsrc: "share",
//                                         cid: e.data.cid,
//                                         suid: e.data.uid,
//                                         smid: e.shareMaterial.smid
//                                     });
//                                 });
//                             }
//                         }, {
//                             key: "subscribe",
//                             value: function value(e) {
//                                 var t = this;
//                                 this.wait4init().then(function () {
//                                     var i = {};
//                                     f(t.data, i), "subscribeAppMsg:ok" == e.errMsg && (i.tall = 1), e.ids && (i.tids = e.ids), m.post("https://gw.api.umgame.cn/api/v1/sub", {}, i);
//                                 });
//                             }
//                         }, {
//                             key: "auth",
//                             value: function value() {
//                                 return this.authPromise;
//                             }
//                         }, {
//                             key: "wait4init",
//                             value: function value() {
//                                 return this.initPromise;
//                             }
//                         }, {
//                             key: "event",
//                             value: function value(e, t, i) {
//                                 if (!e || !t) throw Error("cat and act is required by event(cat, act, params)");
//                                 var n = this;
//                                 return this.wait4init().then(function () {
//                                     var a = {
//                                         app: "minigame",
//                                         cat: e,
//                                         act: t,
//                                         rid: h(16),
//                                         lang: n.data.lang,
//                                         os: n.data.os,
//                                         osv: n.data.osv,
//                                         make: n.data.make,
//                                         model: n.data.model,
//                                         w: n.data.width,
//                                         h: n.data.height,
//                                         did: n.data.uid,
//                                         sub1: n.data.sdkv,
//                                         sub2: n.data.pv,
//                                         sub3: n.data.plv,
//                                         sub4: n.data.utmsrc,
//                                         subi1: n.data.gid,
//                                         subi2: n.data.cid,
//                                         subi3: n.data.its,
//                                         subi7: n.data.inited
//                                     };
//                                     i && f(i, a);
//                                     var o = "https://event.api.umgame.cn/api/v1/event?" + d(a, "&");
//                                     return m.get(o);
//                                 });
//                             }
//                         }, {
//                             key: "onShareAppMessage",
//                             value: function value(e, t) {
//                                 var i = this;
//                                 this.fetchShareQuery().then(function (n) {
//                                     C(function () {
//                                         var a = t();
//                                         return i.shareMaterial.title && (a.title = i.shareMaterial.title), i.shareMaterial.image && (a.imageUrl = i.shareMaterial.image), a.query ? a.query = a.query + "&" + n : a.query = n, a.query = a.query + "&ssid=" + e, i.isShareDialogVisible = !0, i.event("user", "share", {
//                                             sub5: e,
//                                             subi10: i.shareMaterial.smid
//                                         }), a;
//                                     });
//                                 }, function (e) {
//                                     i.isShareDialogVisible = !0, C(t);
//                                 });
//                             }
//                         }, {
//                             key: "shareAppMessage",
//                             value: function value(e) {
//                                 if (!e.slotId || !e.data) throw Error("`obj.slotId` and `obj.data` are required by shareAppMessage");
//                                 var t = this;
//                                 this.fetchShareQuery().then(function (i) {
//                                     if (t.shareMaterial.title && (e.data.title = t.shareMaterial.title), t.shareMaterial.image && (e.data.imageUrl = t.shareMaterial.image), e.data.query ? e.data.query = e.data.query + "&" + i : e.data.query = i, e.data.query = e.data.query + "&ssid=" + e.slotId, t.isShareDialogVisible = !0, e.data.success) {
//                                         var n = e.data.success;
//                                         e.data.success = function () {
//                                             t.event("user", "share", {
//                                                 sub5: e.slotId,
//                                                 subi10: t.shareMaterial.smid
//                                             }), n();
//                                         }, I(e.data);
//                                     } else I(e.data), t.event("user", "share", {
//                                         sub5: e.slotId,
//                                         subi10: t.shareMaterial.smid
//                                     });
//                                 }, function (i) {
//                                     t.isShareDialogVisible = !0, I(e.data);
//                                 });
//                             }
//                         }, {
//                             key: "createIconAd",
//                             value: function value(e) {
//                                 if (!e.slotId) throw Error("obj.slotId is required by createIconAd(obj)");
//                                 return new _(e, this);
//                             }
//                         }, {
//                             key: "createBannerAd",
//                             value: function value(e) {
//                                 if (!e.adUnitId) throw Error("obj.adUnitId is required by createBannerAd(obj)");
//                                 if (!e.slotId) throw Error("obj.slotId is required by createBannerAd(obj)");
//                                 return new b(e, this);
//                             }
//                         }, {
//                             key: "createInterstitialAd",
//                             value: function value(e) {
//                                 if (!e.adUnitId) throw Error("obj.adUnitId is required by createInterstitialAd(obj)");
//                                 if (!e.slotId) throw Error("obj.slotId is required by createInterstitialAd(obj)");
//                                 return new T(e, this);
//                             }
//                         }, {
//                             key: "createRewardedVideoAd",
//                             value: function value(e) {
//                                 if (!e.adUnitId) throw Error("obj.adUnitId is required by createRewardedVideoAd(obj);");
//                                 if (!e.slotId) throw Error("obj.slotId is required by createRewardedVideoAd(obj)");
//                                 return new S(e, this);
//                             }
//                         }]), e;
//                     }())();
//                 }]);
//             }), 
// */