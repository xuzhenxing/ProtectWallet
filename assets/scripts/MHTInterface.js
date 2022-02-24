

var n = {
    mhtGlobal: null,
    Init: function Init() {
        cc.log("MHT\u521D\u59CB\u5316init"), mht.init({
            channellevel1: "MHT",
            channellevel2: "MHT",
            imei: "0123456789",
            appid: "825aab027f477d6d31a108761b2fec67"
        }, function (e) {
            e && (cc.log("MHT\u521D\u59CB\u5316\u6210\u529F"), mht.login(function (e, t) {
                t ? cc.log("\u767B\u9646\u5931\u8D25 " + e + ": " + t) : cc.log("\u767B\u9646\u6210\u529F: " + JSON.stringify(e));
            }));
        });
    },
    Login: function Login() {
        mht.login(function (e, t) {
            t ? cc.log("\u767B\u9646\u5931\u8D25 " + e + ": " + t) : cc.log("\u767B\u9646\u6210\u529F: " + JSON.stringify(e));
        });
    }
};
/*MHTInterface: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "e26561xkxBBc6L4eRjsGo1r", "MHTInterface");
        var n = {
            mhtGlobal: null,
            Init: function Init() {
                cc.log("MHT\u521D\u59CB\u5316init"), mht.init({
                    channellevel1: "MHT",
                    channellevel2: "MHT",
                    imei: "0123456789",
                    appid: "825aab027f477d6d31a108761b2fec67"
                }, function (e) {
                    e && (cc.log("MHT\u521D\u59CB\u5316\u6210\u529F"), mht.login(function (e, t) {
                        t ? cc.log("\u767B\u9646\u5931\u8D25 " + e + ": " + t) : cc.log("\u767B\u9646\u6210\u529F: " + JSON.stringify(e));
                    }));
                });
            },
            Login: function Login() {
                mht.login(function (e, t) {
                    t ? cc.log("\u767B\u9646\u5931\u8D25 " + e + ": " + t) : cc.log("\u767B\u9646\u6210\u529F: " + JSON.stringify(e));
                });
            }
        };
        t.exports = n, 
*/