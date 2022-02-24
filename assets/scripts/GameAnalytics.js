

//  var s = function () {
//     function e() {
//         n(this, e);
//     }
//     return o(e, [{
//         key: "init",
//         value: function value() {
//             cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("JSIOSGA", "initGA");
//         }
//     }, {
//         key: "postDesignEvent",
//         value: function value() {
//             var e,
//                 t = Array.prototype.slice.call(arguments);
//             if (t.length > 0)
//                 for (var i = 0; i < t.length; i++) {
//                     var n = t[i];
//                     0 == i ? e = n : e += ":" + n;
//                 }
//             cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("JSIOSGA", "addDesignEventWithId:", e) : cc.sys.isNative && cc.sys.os == cc.sys.ANDROID && jsb.reflection.callStaticMethod("org.cocos2dx.javascript/AppActivity", "GA_Event", "(Ljava/lang/String;)V", e);
//         }
//     }]), e;
// }();
// window.analytics = new s()

// /*GameAnalytics: [function (e, t, i) {
//         "use strict";

//         function n(e, t) {
//             if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
//         }

//         function a(e, t) {
//             for (var i = 0; i < t.length; i++) {
//                 var n = t[i];
//                 n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
//             }
//         }

//         function o(e, t, i) {
//             return t && a(e.prototype, t), i && a(e, i), e;
//         }
//         cc._RF.push(t, "ab763AUrxxI2JRE8443vt6c", "GameAnalytics");
//         var s = function () {
//             function e() {
//                 n(this, e);
//             }
//             return o(e, [{
//                 key: "init",
//                 value: function value() {
//                     cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("JSIOSGA", "initGA");
//                 }
//             }, {
//                 key: "postDesignEvent",
//                 value: function value() {
//                     var e,
//                         t = Array.prototype.slice.call(arguments);
//                     if (t.length > 0)
//                         for (var i = 0; i < t.length; i++) {
//                             var n = t[i];
//                             0 == i ? e = n : e += ":" + n;
//                         }
//                     cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("JSIOSGA", "addDesignEventWithId:", e) : cc.sys.isNative && cc.sys.os == cc.sys.ANDROID && jsb.reflection.callStaticMethod("org.cocos2dx.javascript/AppActivity", "GA_Event", "(Ljava/lang/String;)V", e);
//                 }
//             }]), e;
//         }();
//         window.analytics = new s(), 
// */