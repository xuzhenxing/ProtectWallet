
var n = {
    ShowAds: function ShowAds() {
        window.h5api.canPlayAd() ? window.h5api.playAd(this.videoReward.bind(this)) : this.videoReward({
            code: -1
        });
    },
    UpdateScore: function UpdateScore(e) {
        cc.log("\u63D0\u4EA4\u5206\u6570" + e), window.h5api.submitScore(e, this.UploadCallback.bind(this));
    },
    UploadCallback: function UploadCallback(e) {
        cc.log("\u63D0\u4EA4\u8FD4\u56DE:" + e.code), e.code;
    },
    GetRankData: function GetRankData(e) {
        window.h5api.getRank(e);
    },
    videoReward: function videoReward(e) {
        10001 === e.code || -1 === e.code && game.uiToastLayer.showTips("\u6FC0\u52B1\u5E7F\u544A\u52A0\u8F7D\u5931\u8D25", 1);
    },
    userOperate: function userOperate(e) {}
};
module.exports = n

/*Web4399Interface: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "150a9HPYhhN2bkl7EXY45bV", "Web4399Interface");
        var n = {
            ShowAds: function ShowAds() {
                window.h5api.canPlayAd() ? window.h5api.playAd(this.videoReward.bind(this)) : this.videoReward({
                    code: -1
                });
            },
            UpdateScore: function UpdateScore(e) {
                cc.log("\u63D0\u4EA4\u5206\u6570" + e), window.h5api.submitScore(e, this.UploadCallback.bind(this));
            },
            UploadCallback: function UploadCallback(e) {
                cc.log("\u63D0\u4EA4\u8FD4\u56DE:" + e.code), e.code;
            },
            GetRankData: function GetRankData(e) {
                window.h5api.getRank(e);
            },
            videoReward: function videoReward(e) {
                10001 === e.code || -1 === e.code && game.uiToastLayer.showTips("\u6FC0\u52B1\u5E7F\u544A\u52A0\u8F7D\u5931\u8D25", 1);
            },
            userOperate: function userOperate(e) {}
        };
        t.exports = n, 
*/