require("GameConfig");
var n = require("GameDefine");
cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        window.game = window.game || {}, this._isPlayAD = !1, cc.game.setFrameRate(60);
        var e = this;
        cc.game.on(cc.game.EVENT_SHOW, function () {
                // gm.AudioPlayManager.StopAudio(n.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(n.AudioChannelType.Channel_Background, "audios/audio_bgm", -1), 0 == e._isPlayAD && (e._isPlayAD = !0);
            }),
            cc.game.on(cc.game.EVENT_HIDE, function () {
                e._isPlayAD = !1;
            }.bind(this)),
            this.run();
    },
    run: function run() {}
})
/*Game: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "4a469/7bPJPSYN3PXKZ6kz6", "Game");
        a(e("GameConfig"));
        var n = a(e("GameDefine"));

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            onLoad: function onLoad() {
                window.game = window.game || {}, this._isPlayAD = !1, cc.game.setFrameRate(60);
                var e = this;
                cc.game.on(cc.game.EVENT_SHOW, function () {
                    gm.AudioPlayManager.StopAudio(n.default.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(n.default.AudioChannelType.Channel_Background, "audios/audio_bgm", -1), 0 == e._isPlayAD && (e._isPlayAD = !0), cc.log("cc.game.EVENT_SHOW>>>>>>>>>>>>>>>>>>>>>");
                }), cc.game.on(cc.game.EVENT_HIDE, function () {
                    e._isPlayAD = !1, cc.log("cc.game.EVENT_HIDE>>>>>>>>>>>>>>>>>>>>>");
                }.bind(this)), this.run();
            },
            run: function run() {}
        }), 
*/