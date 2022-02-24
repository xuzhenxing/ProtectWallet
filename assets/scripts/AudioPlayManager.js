
var n=require("GameDefine")
var a = cc.Class({
    extends: require("IDispose"),
    properties: {
        volume: 0,
        mute: !1,
        channelType: null,
        audioList: null,
        baseVol: 1,
        maxAudioNum: 1
    },
    Init: function Init(e, t, i) {
        this.channelType = e, this.mute = i, this.volume = t, this.audioList = new Array(), this.channelType == n.AudioChannelType.Channel_Background ? (this.baseVol = 1, this.maxAudioNum = 1) : (this.baseVol = 1, this.maxAudioNum = 40);
    },
    Play: function Play(e, t) {
        if (!this.mute) {
            if (this.audioList.length >= this.maxAudioNum) {
                var i = this.audioList[this.maxAudioNum - 1];
                if (this.channelType != n.AudioChannelType.Channel_Background) return;
                i.stop(), this.audioList.splice(this.maxAudioNum - 1, 1), gm.CacheManager.CacheResource(n.CacheType.Audio, i.node);
            }
            var a = this.ConvertAudioName(e),
                o = gm.CacheManager.GetCacheResource(n.CacheType.Audio, a);
            if (null == o) {
                var s = this;
                gm.AssetManager.LoadSingleAssetAsync(e, function (e) {
                    var i = cc.instantiate(e);
                    i.name = a, s.AudioLoadComplete(i, t);
                });
            } else this.AudioLoadComplete(o, t);
        }
    },
    AudioLoadComplete: function AudioLoadComplete(e, t) {
        var i = e.getComponent(cc.AudioSource);
        i.volume = this.volume * this.baseVol, i.mute = this.mute, i.mute && (i.volume = 0);
        if (this.channelType == n.AudioChannelType.Channel_Background) i.loop = !0, i.play();
        else {
            t > -1 ? i.scheduleOnce(function () {
                i.stop();
                var e = this.audioList.indexOf(0);
                this.audioList.splice(e, 1), gm.CacheManager.CacheResource(n.CacheType.Audio, i.node);
            }.bind(this), t) : i.loop = !0, i.play();
        }
        this.audioList.push(i);
    },
    StopAudio: function StopAudio(e) {
        var t = this,
            i = this.ConvertAudioName(e);
        this.audioList.forEach(function (e) {
            if (e.node.name == i) {
                e.stop();
                var a = t.audioList.indexOf(e);
                t.audioList.splice(a, 1), gm.CacheManager.CacheResource(n.CacheType.Audio, e.node);
            }
        });
    },
    ChangeVolume: function ChangeVolume(e) {
        var t = this.audioList.length;
        this.volume = e * this.baseVol;
        for (var i = 0; i < t; i++) {
            this.audioList[i].volume = this.volume;
        }
    },
    ChangeMute: function ChangeMute(e) {
        var t = this.audioList.length;
        this.mute = e;
        for (var i = 0; i < t; i++) {
            this.mute ? this.audioList[i].volume = 0 : this.audioList[i].volume = this.volume;
        }
    },
    ConvertAudioName: function ConvertAudioName(e) {
        return e.replace(/\//g, "#");
    }
});
cc.Class({
    extends: require("IComponent"),
    properties: {
        channelMap: null
    },
    Init: function Init(e) {
        var t = this;
        this._super(e), this.channelMap = new Array(), cc.Enum.getList(n.AudioChannelType).forEach(function (e) {
            t.channelMap[e.value] = new a();
            var i = 0;
            // e.value == n.AudioChannelType.Channel_Background ? i = !gm.DataManager.SettingData.sound : e.value == n.AudioChannelType.Channel_UI && (i = !gm.DataManager.SettingData.effect), t.channelMap[e.value].Init(e.value, 1, i);
        });
    },
    PlayAudio: function PlayAudio(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3;
        this.channelMap[e].Play(t, i);
    },
    ChangeVolume: function ChangeVolume(e, t) {
        this.channelMap[e].ChangeVolume(t);
    },
    ChangeMute: function ChangeMute(e, t) {
        this.channelMap[e].ChangeMute(t), this.ChangeAllMute(e, t);
    },
    StopAudio: function StopAudio(e, t) {
        this.channelMap[e].StopAudio(t);
    },
    ChangeAllMute: function ChangeAllMute(e, t) {
        e == n.AudioChannelType.Channel_Background ? 1 == t ? cc.audioEngine.pauseMusic() : (cc.audioEngine.resumeMusic(), gm.AudioPlayManager.StopAudio(n.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(n.AudioChannelType.Channel_Background, "audios/audio_bgm", -1)) : 1 == t ? cc.audioEngine.pauseAllEffects() : cc.audioEngine.resumeAllEffects();
    }
})


/*AudioPlayManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "47d5bJw/JVFU6WytCZaLJ/C", "AudioPlayManager");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("GameDefine"));
        var a = cc.Class({
            extends: e("IDispose"),
            properties: {
                volume: 0,
                mute: !1,
                channelType: null,
                audioList: null,
                baseVol: 1,
                maxAudioNum: 1
            },
            Init: function Init(e, t, i) {
                this.channelType = e, this.mute = i, this.volume = t, this.audioList = new Array(), this.channelType == n.default.AudioChannelType.Channel_Background ? (this.baseVol = 1, this.maxAudioNum = 1) : (this.baseVol = 1, this.maxAudioNum = 40);
            },
            Play: function Play(e, t) {
                if (!this.mute) {
                    if (this.audioList.length >= this.maxAudioNum) {
                        var i = this.audioList[this.maxAudioNum - 1];
                        if (this.channelType != n.default.AudioChannelType.Channel_Background) return;
                        i.stop(), this.audioList.splice(this.maxAudioNum - 1, 1), gm.CacheManager.CacheResource(n.default.CacheType.Audio, i.node);
                    }
                    var a = this.ConvertAudioName(e),
                        o = gm.CacheManager.GetCacheResource(n.default.CacheType.Audio, a);
                    if (null == o) {
                        var s = this;
                        gm.AssetManager.LoadSingleAssetAsync(e, function (e) {
                            var i = cc.instantiate(e);
                            i.name = a, s.AudioLoadComplete(i, t);
                        });
                    } else this.AudioLoadComplete(o, t);
                }
            },
            AudioLoadComplete: function AudioLoadComplete(e, t) {
                var i = e.getComponent(cc.AudioSource);
                i.volume = this.volume * this.baseVol, i.mute = this.mute, i.mute && (i.volume = 0);
                if (this.channelType == n.default.AudioChannelType.Channel_Background) i.loop = !0, i.play();
                else {
                    t > -1 ? i.scheduleOnce(function () {
                        i.stop();
                        var e = this.audioList.indexOf(0);
                        this.audioList.splice(e, 1), gm.CacheManager.CacheResource(n.default.CacheType.Audio, i.node);
                    }.bind(this), t) : i.loop = !0, i.play();
                }
                this.audioList.push(i);
            },
            StopAudio: function StopAudio(e) {
                var t = this,
                    i = this.ConvertAudioName(e);
                this.audioList.forEach(function (e) {
                    if (e.node.name == i) {
                        e.stop();
                        var a = t.audioList.indexOf(e);
                        t.audioList.splice(a, 1), gm.CacheManager.CacheResource(n.default.CacheType.Audio, e.node);
                    }
                });
            },
            ChangeVolume: function ChangeVolume(e) {
                var t = this.audioList.length;
                this.volume = e * this.baseVol;
                for (var i = 0; i < t; i++) {
                    this.audioList[i].volume = this.volume;
                }
            },
            ChangeMute: function ChangeMute(e) {
                var t = this.audioList.length;
                this.mute = e;
                for (var i = 0; i < t; i++) {
                    this.mute ? this.audioList[i].volume = 0 : this.audioList[i].volume = this.volume;
                }
            },
            ConvertAudioName: function ConvertAudioName(e) {
                return e.replace(/\//g, "#");
            }
        });
        cc.Class({
            extends: e("IComponent"),
            properties: {
                channelMap: null
            },
            Init: function Init(e) {
                var t = this;
                this._super(e), this.channelMap = new Array(), cc.Enum.getList(n.default.AudioChannelType).forEach(function (e) {
                    t.channelMap[e.value] = new a();
                    var i = 0;
                    e.value == n.default.AudioChannelType.Channel_Background ? i = !gm.DataManager.SettingData.sound : e.value == n.default.AudioChannelType.Channel_UI && (i = !gm.DataManager.SettingData.effect), t.channelMap[e.value].Init(e.value, 1, i);
                });
            },
            PlayAudio: function PlayAudio(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3;
                this.channelMap[e].Play(t, i);
            },
            ChangeVolume: function ChangeVolume(e, t) {
                this.channelMap[e].ChangeVolume(t);
            },
            ChangeMute: function ChangeMute(e, t) {
                this.channelMap[e].ChangeMute(t), this.ChangeAllMute(e, t);
            },
            StopAudio: function StopAudio(e, t) {
                this.channelMap[e].StopAudio(t);
            },
            ChangeAllMute: function ChangeAllMute(e, t) {
                e == n.default.AudioChannelType.Channel_Background ? 1 == t ? cc.audioEngine.pauseMusic() : (cc.audioEngine.resumeMusic(), gm.AudioPlayManager.StopAudio(n.default.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(n.default.AudioChannelType.Channel_Background, "audios/audio_bgm", -1)) : 1 == t ? cc.audioEngine.pauseAllEffects() : cc.audioEngine.resumeAllEffects();
            }
        }), 
*/