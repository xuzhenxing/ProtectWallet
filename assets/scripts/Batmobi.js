cc.Class({
    properties: {
        rewardRequestGap: 5,
        intertitialRequestGap: 5,
        rewardPreTime: 5,
        intertitialRelivePreTime: 5,
        intertitialGameOverPreTime: 5,
        firebaseAnalytics: null
    },
    isInterAdAvailable: function isInterAdAvailable(e) {
        return !1;
    },
    isRVAvailable: function isRVAvailable() {
        return !1;
    },
    Init: function Init() {},
    logEvent: function logEvent() {},
    playVideo: function playVideo(e) {},
    playInterstitial: function playInterstitial(e) {
        cc.log("Batmobi");
    },
    OnUpdate: function OnUpdate(e) {}
})

/*Batmobi: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "1d982Os8cBLNKEZ4wNlgIc5", "Batmobi");
        cc.Class({
            properties: {
                rewardRequestGap: 5,
                intertitialRequestGap: 5,
                rewardPreTime: 5,
                intertitialRelivePreTime: 5,
                intertitialGameOverPreTime: 5,
                firebaseAnalytics: null
            },
            isInterAdAvailable: function isInterAdAvailable(e) {
                return !1;
            },
            isRVAvailable: function isRVAvailable() {
                return !1;
            },
            Init: function Init() {},
            logEvent: function logEvent() {},
            playVideo: function playVideo(e) {},
            playInterstitial: function playInterstitial(e) {
                cc.log("Batmobi");
            },
            OnUpdate: function OnUpdate(e) {}
        });
        
*/