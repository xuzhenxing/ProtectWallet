
var n = {
    httpGets: function httpGets(e, t, i) {
        var n = cc.loader.getXMLHttpRequest();
        n.onreadystatechange = function () {
            if (4 === n.readyState && n.status >= 200 && n.status < 300) {
                var e = n.responseText;
                t(e);
            }
        }, 0 == i ? n.open("GET", e, !0) : n.open("GET", e + "?id=" + Math.random(), !0), n.timeout = 5e3, n.send();
    },
    httpPost: function httpPost(e, t, i) {
        var n = cc.loader.getXMLHttpRequest();
        n.onreadystatechange = function () {
            if (4 === n.readyState && n.status >= 200 && n.status < 300) {
                var e = n.responseText;
                i(e);
            } else i(-1);
        }, n.open("POST", e + "?id=" + Math.random(), !0), n.timeout = 5e3, n.send(t);
    }
};
module.exports = n

/*HttpRequest: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "eec48IJIvNHk482gNG5ujKj", "HttpRequest");
        var n = {
            httpGets: function httpGets(e, t, i) {
                var n = cc.loader.getXMLHttpRequest();
                n.onreadystatechange = function () {
                    if (4 === n.readyState && n.status >= 200 && n.status < 300) {
                        var e = n.responseText;
                        t(e);
                    }
                }, 0 == i ? n.open("GET", e, !0) : n.open("GET", e + "?id=" + Math.random(), !0), n.timeout = 5e3, n.send();
            },
            httpPost: function httpPost(e, t, i) {
                var n = cc.loader.getXMLHttpRequest();
                n.onreadystatechange = function () {
                    if (4 === n.readyState && n.status >= 200 && n.status < 300) {
                        var e = n.responseText;
                        i(e);
                    } else i(-1);
                }, n.open("POST", e + "?id=" + Math.random(), !0), n.timeout = 5e3, n.send(t);
            }
        };
        t.exports = n, 
*/