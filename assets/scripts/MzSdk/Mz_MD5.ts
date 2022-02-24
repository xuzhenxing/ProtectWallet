

export default class Mz_MD5 {
    hexcase
    b64pad
    constructor() {
        this.hexcase = 0;
        this.b64pad = "";
    }
    static hex_md5 = function (e) {
        return new Mz_MD5().hex_md5(e);
    }
    hex_md5 = function (t) {
        return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(t)));
    }
    b64_md5 = function (t) {
        return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(t)));
    }
    any_md5 = function (t, e) {
        return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(t)), e);
    }
    hex_hmac_md5 = function (t, e) {
        return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)));
    }
    b64_hmac_md5 = function (t, e) {
        return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)));
    }
    any_hmac_md5 = function (t, e, n) {
        return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)), n);
    }
    md5_vm_test = function () {
        return "900150983cd24fb0d6963f7d28e17f72" == this.hex_md5("abc").toLowerCase();
    }
    rstr_md5 = function (t) {
        return this.binl2rstr(this.binl_md5(this.rstr2binl(t), 8 * t.length));
    }
    rstr_hmac_md5 = function (t, e) {
        var n = this.rstr2binl(t);
        n.length > 16 && (n = this.binl_md5(n, 8 * t.length));
        for (var o = Array(16), i = Array(16), r = 0; r < 16; r++) o[r] = 909522486 ^ n[r],
            i[r] = 1549556828 ^ n[r];
        var a = this.binl_md5(o.concat(this.rstr2binl(e)), 512 + 8 * e.length);
        return this.binl2rstr(this.binl_md5(i.concat(a), 640));
    }
    rstr2hex = function (t) {
        try {
            this.hexcase;
        } catch (t) {
            this.hexcase = 0;
        }
        for (var e, n = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", o = "", i = 0; i < t.length; i++) e = t.charCodeAt(i),
            o += n.charAt(e >>> 4 & 15) + n.charAt(15 & e);
        return o;
    }
    rstr2b64 = function (t) {
        try {
            this.b64pad;
        } catch (t) {
            this.b64pad = "";
        }
        for (var e = "", n = t.length, o = 0; o < n; o += 3) for (var i = t.charCodeAt(o) << 16 | (o + 1 < n ? t.charCodeAt(o + 1) << 8 : 0) | (o + 2 < n ? t.charCodeAt(o + 2) : 0), r = 0; r < 4; r++) 8 * o + 6 * r > 8 * t.length ? e += this.b64pad : e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(i >>> 6 * (3 - r) & 63);
        return e;
    }
    rstr2any = function (t, e) {
        var n, o, i, r, a, s = e.length, c = Array(Math.ceil(t.length / 2));
        for (n = 0; n < c.length; n++) c[n] = t.charCodeAt(2 * n) << 8 | t.charCodeAt(2 * n + 1);
        var l = Math.ceil(8 * t.length / (Math.log(e.length) / Math.log(2))), u = Array(l);
        for (o = 0; o < l; o++) {
            for (a = Array(), r = 0, n = 0; n < c.length; n++) r = (r << 16) + c[n], r -= (i = Math.floor(r / s)) * s,
                (a.length > 0 || i > 0) && (a[a.length] = i);
            u[o] = r, c = a;
        }
        var d = "";
        for (n = u.length - 1; n >= 0; n--) d += e.charAt(u[n]);
        return d;
    }
    str2rstr_utf8 = function (t) {
        for (var e, n, o = "", i = -1; ++i < t.length;) e = t.charCodeAt(i), n = i + 1 < t.length ? t.charCodeAt(i + 1) : 0,
            55296 <= e && e <= 56319 && 56320 <= n && n <= 57343 && (e = 65536 + ((1023 & e) << 10) + (1023 & n),
                i++), e <= 127 ? o += String.fromCharCode(e) : e <= 2047 ? o += String.fromCharCode(192 | e >>> 6 & 31, 128 | 63 & e) : e <= 65535 ? o += String.fromCharCode(224 | e >>> 12 & 15, 128 | e >>> 6 & 63, 128 | 63 & e) : e <= 2097151 && (o += String.fromCharCode(240 | e >>> 18 & 7, 128 | e >>> 12 & 63, 128 | e >>> 6 & 63, 128 | 63 & e));
        return o;
    }
    str2rstr_utf16le = function (t) {
        for (var e = "", n = 0; n < t.length; n++) e += String.fromCharCode(255 & t.charCodeAt(n), t.charCodeAt(n) >>> 8 & 255);
        return e;
    }
    str2rstr_utf16be = function (t) {
        for (var e = "", n = 0; n < t.length; n++) e += String.fromCharCode(t.charCodeAt(n) >>> 8 & 255, 255 & t.charCodeAt(n));
        return e;
    }
    rstr2binl = function (t) {
        for (var e = Array(t.length >> 2), n = 0; n < e.length; n++) e[n] = 0;
        for (n = 0; n < 8 * t.length; n += 8) e[n >> 5] |= (255 & t.charCodeAt(n / 8)) << n % 32;
        return e;
    }
    binl2rstr = function (t) {
        for (var e = "", n = 0; n < 32 * t.length; n += 8) e += String.fromCharCode(t[n >> 5] >>> n % 32 & 255);
        return e;
    }
    binl_md5 = function (t, e) {
        t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
        for (var n = 1732584193, o = -271733879, i = -1732584194, r = 271733878, a = 0; a < t.length; a += 16) {
            var s = n, c = o, l = i, u = r;
            n = this.md5_ff(n, o, i, r, t[a + 0], 7, -680876936), r = this.md5_ff(r, n, o, i, t[a + 1], 12, -389564586),
                i = this.md5_ff(i, r, n, o, t[a + 2], 17, 606105819), o = this.md5_ff(o, i, r, n, t[a + 3], 22, -1044525330),
                n = this.md5_ff(n, o, i, r, t[a + 4], 7, -176418897), r = this.md5_ff(r, n, o, i, t[a + 5], 12, 1200080426),
                i = this.md5_ff(i, r, n, o, t[a + 6], 17, -1473231341), o = this.md5_ff(o, i, r, n, t[a + 7], 22, -45705983),
                n = this.md5_ff(n, o, i, r, t[a + 8], 7, 1770035416), r = this.md5_ff(r, n, o, i, t[a + 9], 12, -1958414417),
                i = this.md5_ff(i, r, n, o, t[a + 10], 17, -42063), o = this.md5_ff(o, i, r, n, t[a + 11], 22, -1990404162),
                n = this.md5_ff(n, o, i, r, t[a + 12], 7, 1804603682), r = this.md5_ff(r, n, o, i, t[a + 13], 12, -40341101),
                i = this.md5_ff(i, r, n, o, t[a + 14], 17, -1502002290), o = this.md5_ff(o, i, r, n, t[a + 15], 22, 1236535329),
                n = this.md5_gg(n, o, i, r, t[a + 1], 5, -165796510), r = this.md5_gg(r, n, o, i, t[a + 6], 9, -1069501632),
                i = this.md5_gg(i, r, n, o, t[a + 11], 14, 643717713), o = this.md5_gg(o, i, r, n, t[a + 0], 20, -373897302),
                n = this.md5_gg(n, o, i, r, t[a + 5], 5, -701558691), r = this.md5_gg(r, n, o, i, t[a + 10], 9, 38016083),
                i = this.md5_gg(i, r, n, o, t[a + 15], 14, -660478335), o = this.md5_gg(o, i, r, n, t[a + 4], 20, -405537848),
                n = this.md5_gg(n, o, i, r, t[a + 9], 5, 568446438), r = this.md5_gg(r, n, o, i, t[a + 14], 9, -1019803690),
                i = this.md5_gg(i, r, n, o, t[a + 3], 14, -187363961), o = this.md5_gg(o, i, r, n, t[a + 8], 20, 1163531501),
                n = this.md5_gg(n, o, i, r, t[a + 13], 5, -1444681467), r = this.md5_gg(r, n, o, i, t[a + 2], 9, -51403784),
                i = this.md5_gg(i, r, n, o, t[a + 7], 14, 1735328473), o = this.md5_gg(o, i, r, n, t[a + 12], 20, -1926607734),
                n = this.md5_hh(n, o, i, r, t[a + 5], 4, -378558), r = this.md5_hh(r, n, o, i, t[a + 8], 11, -2022574463),
                i = this.md5_hh(i, r, n, o, t[a + 11], 16, 1839030562), o = this.md5_hh(o, i, r, n, t[a + 14], 23, -35309556),
                n = this.md5_hh(n, o, i, r, t[a + 1], 4, -1530992060), r = this.md5_hh(r, n, o, i, t[a + 4], 11, 1272893353),
                i = this.md5_hh(i, r, n, o, t[a + 7], 16, -155497632), o = this.md5_hh(o, i, r, n, t[a + 10], 23, -1094730640),
                n = this.md5_hh(n, o, i, r, t[a + 13], 4, 681279174), r = this.md5_hh(r, n, o, i, t[a + 0], 11, -358537222),
                i = this.md5_hh(i, r, n, o, t[a + 3], 16, -722521979), o = this.md5_hh(o, i, r, n, t[a + 6], 23, 76029189),
                n = this.md5_hh(n, o, i, r, t[a + 9], 4, -640364487), r = this.md5_hh(r, n, o, i, t[a + 12], 11, -421815835),
                i = this.md5_hh(i, r, n, o, t[a + 15], 16, 530742520), o = this.md5_hh(o, i, r, n, t[a + 2], 23, -995338651),
                n = this.md5_ii(n, o, i, r, t[a + 0], 6, -198630844), r = this.md5_ii(r, n, o, i, t[a + 7], 10, 1126891415),
                i = this.md5_ii(i, r, n, o, t[a + 14], 15, -1416354905), o = this.md5_ii(o, i, r, n, t[a + 5], 21, -57434055),
                n = this.md5_ii(n, o, i, r, t[a + 12], 6, 1700485571), r = this.md5_ii(r, n, o, i, t[a + 3], 10, -1894986606),
                i = this.md5_ii(i, r, n, o, t[a + 10], 15, -1051523), o = this.md5_ii(o, i, r, n, t[a + 1], 21, -2054922799),
                n = this.md5_ii(n, o, i, r, t[a + 8], 6, 1873313359), r = this.md5_ii(r, n, o, i, t[a + 15], 10, -30611744),
                i = this.md5_ii(i, r, n, o, t[a + 6], 15, -1560198380), o = this.md5_ii(o, i, r, n, t[a + 13], 21, 1309151649),
                n = this.md5_ii(n, o, i, r, t[a + 4], 6, -145523070), r = this.md5_ii(r, n, o, i, t[a + 11], 10, -1120210379),
                i = this.md5_ii(i, r, n, o, t[a + 2], 15, 718787259), o = this.md5_ii(o, i, r, n, t[a + 9], 21, -343485551),
                n = this.safe_add(n, s), o = this.safe_add(o, c), i = this.safe_add(i, l), r = this.safe_add(r, u);
        }
        return [n, o, i, r];
    }
    md5_cmn = function (t, e, n, o, i, r) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(e, t), this.safe_add(o, r)), i), n);
    }
    md5_ff = function (t, e, n, o, i, r, a) {
        return this.md5_cmn(e & n | ~e & o, t, e, i, r, a);
    }
    md5_gg = function (t, e, n, o, i, r, a) {
        return this.md5_cmn(e & o | n & ~o, t, e, i, r, a);
    }
    md5_hh = function (t, e, n, o, i, r, a) {
        return this.md5_cmn(e ^ n ^ o, t, e, i, r, a);
    }
    md5_ii = function (t, e, n, o, i, r, a) {
        return this.md5_cmn(n ^ (e | ~o), t, e, i, r, a);
    }
    safe_add = function (t, e) {
        var n = (65535 & t) + (65535 & e);
        return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n;
    }
    bit_rol = function (t, e) {
        return t << e | t >>> 32 - e;
    }

}


/*MD5: [ function(t, e, n) {
        "use strict";
        cc._RF.push(e, "d8e20dkD7xJv4/w/zqp4MXH", "MD5"), Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function t() {
                this.hexcase = 0, this.b64pad = "";
            }
            return t.hex_md5 = function(e) {
                return new t().hex_md5(e);
            }, t.prototype.hex_md5 = function(t) {
                return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(t)));
            }, t.prototype.b64_md5 = function(t) {
                return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(t)));
            }, t.prototype.any_md5 = function(t, e) {
                return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(t)), e);
            }, t.prototype.hex_hmac_md5 = function(t, e) {
                return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)));
            }, t.prototype.b64_hmac_md5 = function(t, e) {
                return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)));
            }, t.prototype.any_hmac_md5 = function(t, e, n) {
                return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)), n);
            }, t.prototype.md5_vm_test = function() {
                return "900150983cd24fb0d6963f7d28e17f72" == this.hex_md5("abc").toLowerCase();
            }, t.prototype.rstr_md5 = function(t) {
                return this.binl2rstr(this.binl_md5(this.rstr2binl(t), 8 * t.length));
            }, t.prototype.rstr_hmac_md5 = function(t, e) {
                var n = this.rstr2binl(t);
                n.length > 16 && (n = this.binl_md5(n, 8 * t.length));
                for (var o = Array(16), i = Array(16), r = 0; r < 16; r++) o[r] = 909522486 ^ n[r],
                i[r] = 1549556828 ^ n[r];
                var a = this.binl_md5(o.concat(this.rstr2binl(e)), 512 + 8 * e.length);
                return this.binl2rstr(this.binl_md5(i.concat(a), 640));
            }, t.prototype.rstr2hex = function(t) {
                try {
                    this.hexcase;
                } catch (t) {
                    this.hexcase = 0;
                }
                for (var e, n = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", o = "", i = 0; i < t.length; i++) e = t.charCodeAt(i),
                o += n.charAt(e >>> 4 & 15) + n.charAt(15 & e);
                return o;
            }, t.prototype.rstr2b64 = function(t) {
                try {
                    this.b64pad;
                } catch (t) {
                    this.b64pad = "";
                }
                for (var e = "", n = t.length, o = 0; o < n; o += 3) for (var i = t.charCodeAt(o) << 16 | (o + 1 < n ? t.charCodeAt(o + 1) << 8 : 0) | (o + 2 < n ? t.charCodeAt(o + 2) : 0), r = 0; r < 4; r++) 8 * o + 6 * r > 8 * t.length ? e += this.b64pad : e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(i >>> 6 * (3 - r) & 63);
                return e;
            }, t.prototype.rstr2any = function(t, e) {
                var n, o, i, r, a, s = e.length, c = Array(Math.ceil(t.length / 2));
                for (n = 0; n < c.length; n++) c[n] = t.charCodeAt(2 * n) << 8 | t.charCodeAt(2 * n + 1);
                var l = Math.ceil(8 * t.length / (Math.log(e.length) / Math.log(2))), u = Array(l);
                for (o = 0; o < l; o++) {
                    for (a = Array(), r = 0, n = 0; n < c.length; n++) r = (r << 16) + c[n], r -= (i = Math.floor(r / s)) * s,
                    (a.length > 0 || i > 0) && (a[a.length] = i);
                    u[o] = r, c = a;
                }
                var d = "";
                for (n = u.length - 1; n >= 0; n--) d += e.charAt(u[n]);
                return d;
            }, t.prototype.str2rstr_utf8 = function(t) {
                for (var e, n, o = "", i = -1; ++i < t.length; ) e = t.charCodeAt(i), n = i + 1 < t.length ? t.charCodeAt(i + 1) : 0,
                55296 <= e && e <= 56319 && 56320 <= n && n <= 57343 && (e = 65536 + ((1023 & e) << 10) + (1023 & n),
                i++), e <= 127 ? o += String.fromCharCode(e) : e <= 2047 ? o += String.fromCharCode(192 | e >>> 6 & 31, 128 | 63 & e) : e <= 65535 ? o += String.fromCharCode(224 | e >>> 12 & 15, 128 | e >>> 6 & 63, 128 | 63 & e) : e <= 2097151 && (o += String.fromCharCode(240 | e >>> 18 & 7, 128 | e >>> 12 & 63, 128 | e >>> 6 & 63, 128 | 63 & e));
                return o;
            }, t.prototype.str2rstr_utf16le = function(t) {
                for (var e = "", n = 0; n < t.length; n++) e += String.fromCharCode(255 & t.charCodeAt(n), t.charCodeAt(n) >>> 8 & 255);
                return e;
            }, t.prototype.str2rstr_utf16be = function(t) {
                for (var e = "", n = 0; n < t.length; n++) e += String.fromCharCode(t.charCodeAt(n) >>> 8 & 255, 255 & t.charCodeAt(n));
                return e;
            }, t.prototype.rstr2binl = function(t) {
                for (var e = Array(t.length >> 2), n = 0; n < e.length; n++) e[n] = 0;
                for (n = 0; n < 8 * t.length; n += 8) e[n >> 5] |= (255 & t.charCodeAt(n / 8)) << n % 32;
                return e;
            }, t.prototype.binl2rstr = function(t) {
                for (var e = "", n = 0; n < 32 * t.length; n += 8) e += String.fromCharCode(t[n >> 5] >>> n % 32 & 255);
                return e;
            }, t.prototype.binl_md5 = function(t, e) {
                t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
                for (var n = 1732584193, o = -271733879, i = -1732584194, r = 271733878, a = 0; a < t.length; a += 16) {
                    var s = n, c = o, l = i, u = r;
                    n = this.md5_ff(n, o, i, r, t[a + 0], 7, -680876936), r = this.md5_ff(r, n, o, i, t[a + 1], 12, -389564586),
                    i = this.md5_ff(i, r, n, o, t[a + 2], 17, 606105819), o = this.md5_ff(o, i, r, n, t[a + 3], 22, -1044525330),
                    n = this.md5_ff(n, o, i, r, t[a + 4], 7, -176418897), r = this.md5_ff(r, n, o, i, t[a + 5], 12, 1200080426),
                    i = this.md5_ff(i, r, n, o, t[a + 6], 17, -1473231341), o = this.md5_ff(o, i, r, n, t[a + 7], 22, -45705983),
                    n = this.md5_ff(n, o, i, r, t[a + 8], 7, 1770035416), r = this.md5_ff(r, n, o, i, t[a + 9], 12, -1958414417),
                    i = this.md5_ff(i, r, n, o, t[a + 10], 17, -42063), o = this.md5_ff(o, i, r, n, t[a + 11], 22, -1990404162),
                    n = this.md5_ff(n, o, i, r, t[a + 12], 7, 1804603682), r = this.md5_ff(r, n, o, i, t[a + 13], 12, -40341101),
                    i = this.md5_ff(i, r, n, o, t[a + 14], 17, -1502002290), o = this.md5_ff(o, i, r, n, t[a + 15], 22, 1236535329),
                    n = this.md5_gg(n, o, i, r, t[a + 1], 5, -165796510), r = this.md5_gg(r, n, o, i, t[a + 6], 9, -1069501632),
                    i = this.md5_gg(i, r, n, o, t[a + 11], 14, 643717713), o = this.md5_gg(o, i, r, n, t[a + 0], 20, -373897302),
                    n = this.md5_gg(n, o, i, r, t[a + 5], 5, -701558691), r = this.md5_gg(r, n, o, i, t[a + 10], 9, 38016083),
                    i = this.md5_gg(i, r, n, o, t[a + 15], 14, -660478335), o = this.md5_gg(o, i, r, n, t[a + 4], 20, -405537848),
                    n = this.md5_gg(n, o, i, r, t[a + 9], 5, 568446438), r = this.md5_gg(r, n, o, i, t[a + 14], 9, -1019803690),
                    i = this.md5_gg(i, r, n, o, t[a + 3], 14, -187363961), o = this.md5_gg(o, i, r, n, t[a + 8], 20, 1163531501),
                    n = this.md5_gg(n, o, i, r, t[a + 13], 5, -1444681467), r = this.md5_gg(r, n, o, i, t[a + 2], 9, -51403784),
                    i = this.md5_gg(i, r, n, o, t[a + 7], 14, 1735328473), o = this.md5_gg(o, i, r, n, t[a + 12], 20, -1926607734),
                    n = this.md5_hh(n, o, i, r, t[a + 5], 4, -378558), r = this.md5_hh(r, n, o, i, t[a + 8], 11, -2022574463),
                    i = this.md5_hh(i, r, n, o, t[a + 11], 16, 1839030562), o = this.md5_hh(o, i, r, n, t[a + 14], 23, -35309556),
                    n = this.md5_hh(n, o, i, r, t[a + 1], 4, -1530992060), r = this.md5_hh(r, n, o, i, t[a + 4], 11, 1272893353),
                    i = this.md5_hh(i, r, n, o, t[a + 7], 16, -155497632), o = this.md5_hh(o, i, r, n, t[a + 10], 23, -1094730640),
                    n = this.md5_hh(n, o, i, r, t[a + 13], 4, 681279174), r = this.md5_hh(r, n, o, i, t[a + 0], 11, -358537222),
                    i = this.md5_hh(i, r, n, o, t[a + 3], 16, -722521979), o = this.md5_hh(o, i, r, n, t[a + 6], 23, 76029189),
                    n = this.md5_hh(n, o, i, r, t[a + 9], 4, -640364487), r = this.md5_hh(r, n, o, i, t[a + 12], 11, -421815835),
                    i = this.md5_hh(i, r, n, o, t[a + 15], 16, 530742520), o = this.md5_hh(o, i, r, n, t[a + 2], 23, -995338651),
                    n = this.md5_ii(n, o, i, r, t[a + 0], 6, -198630844), r = this.md5_ii(r, n, o, i, t[a + 7], 10, 1126891415),
                    i = this.md5_ii(i, r, n, o, t[a + 14], 15, -1416354905), o = this.md5_ii(o, i, r, n, t[a + 5], 21, -57434055),
                    n = this.md5_ii(n, o, i, r, t[a + 12], 6, 1700485571), r = this.md5_ii(r, n, o, i, t[a + 3], 10, -1894986606),
                    i = this.md5_ii(i, r, n, o, t[a + 10], 15, -1051523), o = this.md5_ii(o, i, r, n, t[a + 1], 21, -2054922799),
                    n = this.md5_ii(n, o, i, r, t[a + 8], 6, 1873313359), r = this.md5_ii(r, n, o, i, t[a + 15], 10, -30611744),
                    i = this.md5_ii(i, r, n, o, t[a + 6], 15, -1560198380), o = this.md5_ii(o, i, r, n, t[a + 13], 21, 1309151649),
                    n = this.md5_ii(n, o, i, r, t[a + 4], 6, -145523070), r = this.md5_ii(r, n, o, i, t[a + 11], 10, -1120210379),
                    i = this.md5_ii(i, r, n, o, t[a + 2], 15, 718787259), o = this.md5_ii(o, i, r, n, t[a + 9], 21, -343485551),
                    n = this.safe_add(n, s), o = this.safe_add(o, c), i = this.safe_add(i, l), r = this.safe_add(r, u);
                }
                return [ n, o, i, r ];
            }, t.prototype.md5_cmn = function(t, e, n, o, i, r) {
                return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(e, t), this.safe_add(o, r)), i), n);
            }, t.prototype.md5_ff = function(t, e, n, o, i, r, a) {
                return this.md5_cmn(e & n | ~e & o, t, e, i, r, a);
            }, t.prototype.md5_gg = function(t, e, n, o, i, r, a) {
                return this.md5_cmn(e & o | n & ~o, t, e, i, r, a);
            }, t.prototype.md5_hh = function(t, e, n, o, i, r, a) {
                return this.md5_cmn(e ^ n ^ o, t, e, i, r, a);
            }, t.prototype.md5_ii = function(t, e, n, o, i, r, a) {
                return this.md5_cmn(n ^ (e | ~o), t, e, i, r, a);
            }, t.prototype.safe_add = function(t, e) {
                var n = (65535 & t) + (65535 & e);
                return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n;
            }, t.prototype.bit_rol = function(t, e) {
                return t << e | t >>> 32 - e;
            }, t;
        }();
        n.default = o,
*/