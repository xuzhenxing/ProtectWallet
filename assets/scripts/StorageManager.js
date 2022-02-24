var n = require("cookieStorage"),
a = "undefined" != typeof wx ? wx : null,
o = {
    setItem: function setItem(e, t) {
        a ? wx.setStorage({
            key: e,
            data: JSON.stringify(t),
            success: function success() {
                cc.log("\u7ED3\u679C\u6570\u636E\u5199\u5165\u6210\u529F");
            },
            fail: function fail() {
                cc.log("\u7ED3\u679C\u6570\u636E\u5199\u5165\u5931\u8D25");
            }
        }) : cc.sys.isNative || cc.sys.os != cc.sys.OS_IOS ? cc.sys.localStorage.setItem(e, JSON.stringify(t)) : n.write(e, JSON.stringify(t));
    },
    getItem: function getItem(e) {
        var t;
        return a ? (t = wx.getStorageSync(e)) ? JSON.parse(t) : null : cc.sys.isNative || cc.sys.os != cc.sys.OS_IOS ? (t = cc.sys.localStorage.getItem(e)) ? JSON.parse(t) : null : (t = n.read(e)) ? JSON.parse(n.read(e)) : null;
    }
};
module.exports = o

/*StorageManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "1edd6V8X8RPKYgL0tnMOPai", "StorageManager");
        var n = e("cookieStorage"),
            a = "undefined" != typeof wx ? wx : null,
            o = {
                setItem: function setItem(e, t) {
                    a ? wx.setStorage({
                        key: e,
                        data: JSON.stringify(t),
                        success: function success() {
                            cc.log("\u7ED3\u679C\u6570\u636E\u5199\u5165\u6210\u529F");
                        },
                        fail: function fail() {
                            cc.log("\u7ED3\u679C\u6570\u636E\u5199\u5165\u5931\u8D25");
                        }
                    }) : cc.sys.isNative || cc.sys.os != cc.sys.OS_IOS ? cc.sys.localStorage.setItem(e, JSON.stringify(t)) : n.write(e, JSON.stringify(t));
                },
                getItem: function getItem(e) {
                    var t;
                    return a ? (t = wx.getStorageSync(e)) ? JSON.parse(t) : null : cc.sys.isNative || cc.sys.os != cc.sys.OS_IOS ? (t = cc.sys.localStorage.getItem(e)) ? JSON.parse(t) : null : (t = n.read(e)) ? JSON.parse(n.read(e)) : null;
                }
            };
        t.exports = o, 
*/