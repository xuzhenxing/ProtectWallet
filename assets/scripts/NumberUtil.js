

function n(e, t) {
    for (e = e.toString(), t = t.toString();
        "0" === e[0];) {
        e = e.substr(1);
    }
    for (;
        "0" === t[0];) {
        t = t.substr(1);
    }
    if (e.length > t.length) return 1;
    if (e.length < t.length) return -1;
    for (var i, n, a = 0;;) {
        if ((i = parseInt(e.charAt(a))) > (n = parseInt(t.charAt(a)))) return 1;
        if (i < n) return -1;
        if (a === e.length - 1) return 0;
        a++;
    }
}

function a(e, t) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5;
    e = e.toString();
    var a = [],
        r = 9,
        c = i,
        l = 0;
    (t = t.toString()).length - e.length > 0 && (c += l = t.length - e.length);
    for (var u = 0; u < c; u++) {
        e += "0";
    }
    var d,
        h,
        f = e.length,
        p = t.length,
        g = parseInt(t.charAt(0)),
        m = e.substr(0, p);
    e = e.substr(p);
    for (var v = 0; v < f - p + 1; v++) {
        for (;
            "0" === m[0];) {
            m = m.substr(1);
        }
        if (m.length === p) r = Math.ceil((parseInt(m.charAt(0)) + 1) / g);
        else {
            if (!(m.length > p)) {
                a.push(0), m += e[0], e = e.substr(1);
                continue;
            }
            r = Math.ceil((parseInt(m.substr(0, 2)) + 1) / g);
        }
        for (var y = r - 1; y >= 0; y--) {
            if (0 === y) {
                a.push(0), m += e[0], e = e.substr(1);
                break;
            }
            if (0 === (h = n(d = d || o(t, y + ""), m)) || -1 === h) {
                a.push(y), h ? (m = s(m, d), m += e[0]) : m = e[0], e = e.substr(1);
                break;
            }
            d = s(d, t);
        }
        d = 0;
    }
    for (var w = 0; w < l; w++) {
        a.unshift("0");
    }
    a.splice(a.length - c, 0, "."), a[0] || "." === a[1] || a.shift(), c = !1;
    for (var C = a.indexOf("."), I = C + 1; I < a.length; I++) {
        if (a[I]) {
            c = !0;
            break;
        }
    }
    return c || a.splice(C), a = a.join("");
}

function o(e, t) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5;
    e = e.toString(), t = t.toString();
    var n,
        o = e.split("."),
        s = t.split("."),
        r = 0,
        c = 0;
    o.length > 1 && (r = o[1].length, e = o[0] + o[1]), s.length > 1 && (c = s[1].length, t = s[0] + s[1]), n = Math.pow(10, r + c);
    for (var l, u, d = [], h = -4, f = [], p = [];
        "" !== e;) {
        f.unshift(parseInt(e.substr(h))), e = e.slice(0, h);
    }
    for (;
        "" !== t;) {
        p.unshift(parseInt(t.substr(h))), t = t.slice(0, h);
    }
    for (var g = 0; g < f.length; g++) {
        for (var m = 0; m < p.length; m++) {
            u = 0, f[g] && p[m] && (u = f[g] * p[m]), d[l = g + m] ? d[l] += u : d[l] = u;
        }
    }
    for (var v = d.length - 1; v > 0; v--) {
        for (d[v] += "", d[v].length > 4 && (d[v - 1] += parseInt(d[v].slice(0, h)), d[v] = d[v].substr(h)); d[v].length < 4;) {
            d[v] = "0" + d[v];
        }
    }
    return d = d[0] ? d.join("") : "0", n > 1 ? a(d, n, i) : d;
}

function s(e, t) {
    e = e.toString(), t = t.toString();
    for (var i = [];
        "0" === e[0];) {
        e = e.substr(1);
    }
    for (;
        "0" === t[0];) {
        t = t.substr(1);
    }
    for (var n = -15, a = "1", o = 0; o < 15; o++) {
        a += "0";
    }
    for (a = parseInt(a);
        "" !== e && "" !== t;) {
        i.unshift(parseInt(e.substr(n)) - parseInt(t.substr(n))), e = e.slice(0, n), t = t.slice(0, n);
    }
    if ("" !== e || "" !== t) {
        var s = "" === t ? 1 : -1;
        for (e += t;
            "" !== e;) {
            i.unshift(s * parseInt(e.substr(n))), e = e.slice(0, n);
        }
    }
    for (; 0 !== i.length && 0 === i[0];) {
        i.shift();
    }
    var r = "";
    if (0 === i.length) i = 0;
    else if (i[0] < 0) {
        r = "-";
        for (var c = i.length - 1; c > 0; c--) {
            for (i[c] > 0 && (i[c] -= a, i[c - 1]++), i[c] *= -1, i[c] += ""; i[c].length < 15;) {
                i[c] = "0" + i[c];
            }
        }
        i[0] *= -1;
    } else
        for (var l = i.length - 1; l > 0; l--) {
            for (i[l] < 0 && (i[l] += a, i[l - 1]--), i[l] += ""; i[l].length < 15;) {
                i[l] = "0" + i[l];
            }
        }
    if (i) {
        for (; 0 === (i[0] = parseInt(i[0]));) {
            i.shift();
        }
        i = r + i.join("");
    }
    return i;
}
module.exports = {
    Compare: n,
    Divide: a,
    Multiply: o,
    Add: function Add(e, t) {
        e = e.toString(), t = t.toString();
        var i = e.split("."),
            n = t.split("."),
            a = 0,
            o = 0,
            s = 0;
        i.length > 1 && (a = parseFloat("0." + i[1]));
        n.length > 1 && (o = parseFloat("0." + n[1]));
        s = a + o, e = i[0], t = n[0];
        var r = [],
            c = -15;
        for (;
            "" !== e && "" !== t;) {
            r.unshift(parseInt(e.substr(c)) + parseInt(t.substr(c))), e = e.slice(0, c), t = t.slice(0, c);
        }
        e += t;
        for (var l = r.length - 1; l > 0; l--) {
            if (r[l] += "", r[l].length > 15) r[l - 1] += 1, r[l] = r[l].substr(1);
            else
                for (; r[l].length < 15;) {
                    r[l] = "0" + r[l];
                }
        }
        for (; e && (r[0] + "").length > 15;) {
            r[0] = (r[0] + "").substr(1), r.unshift(parseInt(e.substr(c)) + 1), e = e.slice(0, c);
        }
        if (e) {
            for (;
                (r[0] + "").length < 15;) {
                r[0] = "0" + r[0];
            }
            r.unshift(e);
        }
        r = r[0] ? r.join("") : "0";
        if (s > 0) {
            if (s >= 1) {
                var u = "",
                    d = r;
                r.length > 1 && (u = r.substr(0, r.length - 1), d = r.substr(r.length - 1, 1)), d = (parseInt(d) + 1).toString();
                var h = (s - 1).toString().split(".")[1];
                return r = u + d + "." + h;
            }
            return s = s.toString().split("."), r + "." + s[1];
        }
        return r;
    },
    Reduce: s,
    Pow: function Pow(e, t) {
        for (var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5, n = e.toString(), a = 0; a < t - 1; a++) {
            n = o(n, e, i);
        }
        return n;
    },
    Ceil: function Ceil(e) {
        var t = (e = e.toString()).split("."),
            i = t[0];
        if (t.length > 1) {
            var n = i.substr(0, i.length - 1),
                a = i.substr(i.length - 1, 1),
                o = "0." + t[1];
            return parseFloat(o) <= 0 ? e : n + (parseInt(a) + 1).toString();
        }
        return e;
    }
}


/*NumberUtil: [function (e, t, i) {
        "use strict";

        function n(e, t) {
            for (e = e.toString(), t = t.toString();
                "0" === e[0];) {
                e = e.substr(1);
            }
            for (;
                "0" === t[0];) {
                t = t.substr(1);
            }
            if (e.length > t.length) return 1;
            if (e.length < t.length) return -1;
            for (var i, n, a = 0;;) {
                if ((i = parseInt(e.charAt(a))) > (n = parseInt(t.charAt(a)))) return 1;
                if (i < n) return -1;
                if (a === e.length - 1) return 0;
                a++;
            }
        }

        function a(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5;
            e = e.toString();
            var a = [],
                r = 9,
                c = i,
                l = 0;
            (t = t.toString()).length - e.length > 0 && (c += l = t.length - e.length);
            for (var u = 0; u < c; u++) {
                e += "0";
            }
            var d,
                h,
                f = e.length,
                p = t.length,
                g = parseInt(t.charAt(0)),
                m = e.substr(0, p);
            e = e.substr(p);
            for (var v = 0; v < f - p + 1; v++) {
                for (;
                    "0" === m[0];) {
                    m = m.substr(1);
                }
                if (m.length === p) r = Math.ceil((parseInt(m.charAt(0)) + 1) / g);
                else {
                    if (!(m.length > p)) {
                        a.push(0), m += e[0], e = e.substr(1);
                        continue;
                    }
                    r = Math.ceil((parseInt(m.substr(0, 2)) + 1) / g);
                }
                for (var y = r - 1; y >= 0; y--) {
                    if (0 === y) {
                        a.push(0), m += e[0], e = e.substr(1);
                        break;
                    }
                    if (0 === (h = n(d = d || o(t, y + ""), m)) || -1 === h) {
                        a.push(y), h ? (m = s(m, d), m += e[0]) : m = e[0], e = e.substr(1);
                        break;
                    }
                    d = s(d, t);
                }
                d = 0;
            }
            for (var w = 0; w < l; w++) {
                a.unshift("0");
            }
            a.splice(a.length - c, 0, "."), a[0] || "." === a[1] || a.shift(), c = !1;
            for (var C = a.indexOf("."), I = C + 1; I < a.length; I++) {
                if (a[I]) {
                    c = !0;
                    break;
                }
            }
            return c || a.splice(C), a = a.join("");
        }

        function o(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5;
            e = e.toString(), t = t.toString();
            var n,
                o = e.split("."),
                s = t.split("."),
                r = 0,
                c = 0;
            o.length > 1 && (r = o[1].length, e = o[0] + o[1]), s.length > 1 && (c = s[1].length, t = s[0] + s[1]), n = Math.pow(10, r + c);
            for (var l, u, d = [], h = -4, f = [], p = [];
                "" !== e;) {
                f.unshift(parseInt(e.substr(h))), e = e.slice(0, h);
            }
            for (;
                "" !== t;) {
                p.unshift(parseInt(t.substr(h))), t = t.slice(0, h);
            }
            for (var g = 0; g < f.length; g++) {
                for (var m = 0; m < p.length; m++) {
                    u = 0, f[g] && p[m] && (u = f[g] * p[m]), d[l = g + m] ? d[l] += u : d[l] = u;
                }
            }
            for (var v = d.length - 1; v > 0; v--) {
                for (d[v] += "", d[v].length > 4 && (d[v - 1] += parseInt(d[v].slice(0, h)), d[v] = d[v].substr(h)); d[v].length < 4;) {
                    d[v] = "0" + d[v];
                }
            }
            return d = d[0] ? d.join("") : "0", n > 1 ? a(d, n, i) : d;
        }

        function s(e, t) {
            e = e.toString(), t = t.toString();
            for (var i = [];
                "0" === e[0];) {
                e = e.substr(1);
            }
            for (;
                "0" === t[0];) {
                t = t.substr(1);
            }
            for (var n = -15, a = "1", o = 0; o < 15; o++) {
                a += "0";
            }
            for (a = parseInt(a);
                "" !== e && "" !== t;) {
                i.unshift(parseInt(e.substr(n)) - parseInt(t.substr(n))), e = e.slice(0, n), t = t.slice(0, n);
            }
            if ("" !== e || "" !== t) {
                var s = "" === t ? 1 : -1;
                for (e += t;
                    "" !== e;) {
                    i.unshift(s * parseInt(e.substr(n))), e = e.slice(0, n);
                }
            }
            for (; 0 !== i.length && 0 === i[0];) {
                i.shift();
            }
            var r = "";
            if (0 === i.length) i = 0;
            else if (i[0] < 0) {
                r = "-";
                for (var c = i.length - 1; c > 0; c--) {
                    for (i[c] > 0 && (i[c] -= a, i[c - 1]++), i[c] *= -1, i[c] += ""; i[c].length < 15;) {
                        i[c] = "0" + i[c];
                    }
                }
                i[0] *= -1;
            } else
                for (var l = i.length - 1; l > 0; l--) {
                    for (i[l] < 0 && (i[l] += a, i[l - 1]--), i[l] += ""; i[l].length < 15;) {
                        i[l] = "0" + i[l];
                    }
                }
            if (i) {
                for (; 0 === (i[0] = parseInt(i[0]));) {
                    i.shift();
                }
                i = r + i.join("");
            }
            return i;
        }
        cc._RF.push(t, "d85ffwfB85Ay7Fqjo63C53Z", "NumberUtil"), t.exports = {
            Compare: n,
            Divide: a,
            Multiply: o,
            Add: function Add(e, t) {
                e = e.toString(), t = t.toString();
                var i = e.split("."),
                    n = t.split("."),
                    a = 0,
                    o = 0,
                    s = 0;
                i.length > 1 && (a = parseFloat("0." + i[1]));
                n.length > 1 && (o = parseFloat("0." + n[1]));
                s = a + o, e = i[0], t = n[0];
                var r = [],
                    c = -15;
                for (;
                    "" !== e && "" !== t;) {
                    r.unshift(parseInt(e.substr(c)) + parseInt(t.substr(c))), e = e.slice(0, c), t = t.slice(0, c);
                }
                e += t;
                for (var l = r.length - 1; l > 0; l--) {
                    if (r[l] += "", r[l].length > 15) r[l - 1] += 1, r[l] = r[l].substr(1);
                    else
                        for (; r[l].length < 15;) {
                            r[l] = "0" + r[l];
                        }
                }
                for (; e && (r[0] + "").length > 15;) {
                    r[0] = (r[0] + "").substr(1), r.unshift(parseInt(e.substr(c)) + 1), e = e.slice(0, c);
                }
                if (e) {
                    for (;
                        (r[0] + "").length < 15;) {
                        r[0] = "0" + r[0];
                    }
                    r.unshift(e);
                }
                r = r[0] ? r.join("") : "0";
                if (s > 0) {
                    if (s >= 1) {
                        var u = "",
                            d = r;
                        r.length > 1 && (u = r.substr(0, r.length - 1), d = r.substr(r.length - 1, 1)), d = (parseInt(d) + 1).toString();
                        var h = (s - 1).toString().split(".")[1];
                        return r = u + d + "." + h;
                    }
                    return s = s.toString().split("."), r + "." + s[1];
                }
                return r;
            },
            Reduce: s,
            Pow: function Pow(e, t) {
                for (var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5, n = e.toString(), a = 0; a < t - 1; a++) {
                    n = o(n, e, i);
                }
                return n;
            },
            Ceil: function Ceil(e) {
                var t = (e = e.toString()).split("."),
                    i = t[0];
                if (t.length > 1) {
                    var n = i.substr(0, i.length - 1),
                        a = i.substr(i.length - 1, 1),
                        o = "0." + t[1];
                    return parseFloat(o) <= 0 ? e : n + (parseInt(a) + 1).toString();
                }
                return e;
            }
        }, 
*/