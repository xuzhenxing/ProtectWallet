var n = require("util"),
            a = n.Global,
            o = n.trim;
            module.exports = {
            name: "cookieStorage",
            read: function read(e) {
                if (!e || !l(e)) return null;
                var t = "(?:^|.*;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
                return unescape(s.cookie.replace(new RegExp(t), "$1"));
            },
            write: function write(e, t) {
                if (!e) return;
                s.cookie = escape(e) + "=" + escape(t) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
            },
            each: r,
            remove: c,
            clearAll: function clearAll() {
                r(function (e, t) {
                    c(t);
                });
            }
        };
        var s = a.document;

        function r(e) {
            for (var t = s.cookie.split(/; ?/g), i = t.length - 1; i >= 0; i--) {
                if (o(t[i])) {
                    var n = t[i].split("="),
                        a = unescape(n[0]);
                    e(unescape(n[1]), a);
                }
            }
        }

        function c(e) {
            e && l(e) && (s.cookie = escape(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
        }

        function l(e) {
            return new RegExp("(?:^|;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(s.cookie);
        }

/*cookieStorage: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "0109eZ/Ak5Lar4kgWKL6gnr", "cookieStorage");
        var n = e("util"),
            a = n.Global,
            o = n.trim;
        t.exports = {
            name: "cookieStorage",
            read: function read(e) {
                if (!e || !l(e)) return null;
                var t = "(?:^|.*;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
                return unescape(s.cookie.replace(new RegExp(t), "$1"));
            },
            write: function write(e, t) {
                if (!e) return;
                s.cookie = escape(e) + "=" + escape(t) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
            },
            each: r,
            remove: c,
            clearAll: function clearAll() {
                r(function (e, t) {
                    c(t);
                });
            }
        };
        var s = a.document;

        function r(e) {
            for (var t = s.cookie.split(/; ?/g), i = t.length - 1; i >= 0; i--) {
                if (o(t[i])) {
                    var n = t[i].split("="),
                        a = unescape(n[0]);
                    e(unescape(n[1]), a);
                }
            }
        }

        function c(e) {
            e && l(e) && (s.cookie = escape(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
        }

        function l(e) {
            return new RegExp("(?:^|;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(s.cookie);
        }
        
*/