



//     function n(e) {
//         "@babel/helpers - typeof";
//         return (n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
//             return typeof e === "undefined" ? "undefined" : _typeof(e);
//         } : function (e) {
//             return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
//         })(e);
//     }
//     cc._RF.push(t, "84931FPlxRMn59YKtdF+Cc8", "Base"),
//         function (e, i) {
//             "function" == typeof define && define.amd ? define([], i) : "object" === (void 0 === t ? "undefined" : n(t)) && t.exports ? t.exports = i() : (void 0).Base = i();
//         }(0, function () {
//             function e() {
//                 this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
//             }
//             return e.prototype.encode = function (e) {
//                 var t,
//                     i,
//                     n,
//                     a,
//                     o,
//                     s,
//                     r,
//                     c = "",
//                     l = 0;
//                 for (e = this._utf8_encode(e); l < e.length;) {
//                     a = (t = e.charCodeAt(l++)) >> 2, o = (3 & t) << 4 | (i = e.charCodeAt(l++)) >> 4, s = (15 & i) << 2 | (n = e.charCodeAt(l++)) >> 6, r = 63 & n, isNaN(i) ? s = r = 64 : isNaN(n) && (r = 64), c = c + this._keyStr.charAt(a) + this._keyStr.charAt(o) + this._keyStr.charAt(s) + this._keyStr.charAt(r);
//                 }
//                 return c;
//             }, e.prototype.decode = function (e) {
//                 var t,
//                     i,
//                     n,
//                     a,
//                     o,
//                     s,
//                     r = "",
//                     c = 0;
//                 for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < e.length;) {
//                     t = this._keyStr.indexOf(e.charAt(c++)) << 2 | (a = this._keyStr.indexOf(e.charAt(c++))) >> 4, i = (15 & a) << 4 | (o = this._keyStr.indexOf(e.charAt(c++))) >> 2, n = (3 & o) << 6 | (s = this._keyStr.indexOf(e.charAt(c++))), r += String.fromCharCode(t), 64 != o && (r += String.fromCharCode(i)), 64 != s && (r += String.fromCharCode(n));
//                 }
//                 return r = this._utf8_decode(r);
//             }, e.prototype._utf8_encode = function (e) {
//                 e = e.replace(/\r\n/g, "\n");
//                 for (var t = "", i = 0; i < e.length; i++) {
//                     var n = e.charCodeAt(i);
//                     n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192), t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128));
//                 }
//                 return t;
//             }, e.prototype._utf8_decode = function (e) {
//                 for (var t = "", i = 0, n = 0, a = 0, o = 0; i < e.length;) {
//                     (n = e.charCodeAt(i)) < 128 ? (t += String.fromCharCode(n), i++) : n > 191 && n < 224 ? (a = e.charCodeAt(i + 1), t += String.fromCharCode((31 & n) << 6 | 63 & a), i += 2) : (a = e.charCodeAt(i + 1), o = e.charCodeAt(i + 2), t += String.fromCharCode((15 & n) << 12 | (63 & a) << 6 | 63 & o), i += 3);
//                 }
//                 return t;
//             }, new e();
//         })


// /*Base: [function (e, t, i) {
//         "use strict";

//         function n(e) {
//             "@babel/helpers - typeof";
//             return (n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
//                 return typeof e === "undefined" ? "undefined" : _typeof(e);
//             } : function (e) {
//                 return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
//             })(e);
//         }
//         cc._RF.push(t, "84931FPlxRMn59YKtdF+Cc8", "Base"),
//             function (e, i) {
//                 "function" == typeof define && define.amd ? define([], i) : "object" === (void 0 === t ? "undefined" : n(t)) && t.exports ? t.exports = i() : (void 0).Base = i();
//             }(0, function () {
//                 function e() {
//                     this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
//                 }
//                 return e.prototype.encode = function (e) {
//                     var t,
//                         i,
//                         n,
//                         a,
//                         o,
//                         s,
//                         r,
//                         c = "",
//                         l = 0;
//                     for (e = this._utf8_encode(e); l < e.length;) {
//                         a = (t = e.charCodeAt(l++)) >> 2, o = (3 & t) << 4 | (i = e.charCodeAt(l++)) >> 4, s = (15 & i) << 2 | (n = e.charCodeAt(l++)) >> 6, r = 63 & n, isNaN(i) ? s = r = 64 : isNaN(n) && (r = 64), c = c + this._keyStr.charAt(a) + this._keyStr.charAt(o) + this._keyStr.charAt(s) + this._keyStr.charAt(r);
//                     }
//                     return c;
//                 }, e.prototype.decode = function (e) {
//                     var t,
//                         i,
//                         n,
//                         a,
//                         o,
//                         s,
//                         r = "",
//                         c = 0;
//                     for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < e.length;) {
//                         t = this._keyStr.indexOf(e.charAt(c++)) << 2 | (a = this._keyStr.indexOf(e.charAt(c++))) >> 4, i = (15 & a) << 4 | (o = this._keyStr.indexOf(e.charAt(c++))) >> 2, n = (3 & o) << 6 | (s = this._keyStr.indexOf(e.charAt(c++))), r += String.fromCharCode(t), 64 != o && (r += String.fromCharCode(i)), 64 != s && (r += String.fromCharCode(n));
//                     }
//                     return r = this._utf8_decode(r);
//                 }, e.prototype._utf8_encode = function (e) {
//                     e = e.replace(/\r\n/g, "\n");
//                     for (var t = "", i = 0; i < e.length; i++) {
//                         var n = e.charCodeAt(i);
//                         n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192), t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128));
//                     }
//                     return t;
//                 }, e.prototype._utf8_decode = function (e) {
//                     for (var t = "", i = 0, n = 0, a = 0, o = 0; i < e.length;) {
//                         (n = e.charCodeAt(i)) < 128 ? (t += String.fromCharCode(n), i++) : n > 191 && n < 224 ? (a = e.charCodeAt(i + 1), t += String.fromCharCode((31 & n) << 6 | 63 & a), i += 2) : (a = e.charCodeAt(i + 1), o = e.charCodeAt(i + 2), t += String.fromCharCode((15 & n) << 12 | (63 & a) << 6 | 63 & o), i += 3);
//                     }
//                     return t;
//                 }, new e();
//             }), 
// */