var n = require("GameDefine");
var lwsdk = require("lwsdk");
var DataBase = cc.Class({
    properties: {
        userData: null,
        AllBoxData: null,
        bgm: null,
    },
    Init: function Init(data) {
        console.log(data,"data============")
        var time = window['sdk'].formatTime(new Date(), "date", "")
        if (window['wx'] && data != null) {
            if (time !== data.lastDate) {
                console.log("新的一天")
                data.quest_pawer = true
                data.can_power = true
                data.get_tip = true
                if (data.power < 5) {
                    data.power = 5
                }
            }
            data.lastDate = time
            if (data.offline) {
                let intervalTime = Math.ceil((new Date().getTime() - data.offline) / 1000)
                console.log('离线时间', intervalTime,data.power)
                if (intervalTime != 0 && data.power < 5) { //判断离线回复体力
                    if (intervalTime >= 300 * (5 - data.power)) {
                        data.power = 5;
                        console.log(data.power,"========")
                        data.powerNum = 300
                    } else if (intervalTime >= 300) {
                        var PowerNum = parseInt((intervalTime / 300).toString());
                        console.log(powerNum,"+++++++++++++")
                        if(typeof(powerNum)!='Number'){
                            powerNum =  parseInt(powerNum)
                        }
                        data.power += PowerNum
                        console.log(data.power,"+++++++++++++")
                        data.powerNum = 300
                    }else{
                        console.log(data.power,"---------")
                        data.powerNum = data.powerNum - intervalTime
                    }
                }else{
                    data.powerNum = 300
                }
            }
        }
        if (window['wx']) {
            if (data != null) {
                gm.DataManager.userData.Level = data.Level,
                    gm.DataManager.userData.gold = data.gold,
                    gm.DataManager.userData.lastDate = data.lastDate,
                    gm.DataManager.userData.can_power = data.can_power,
                    gm.DataManager.userData.quest_pawer = data.quest_pawer,
                    gm.DataManager.userData.power = data.power,
                    gm.DataManager.userData.NowMission = data.NowMission,
                    gm.DataManager.userData.MaxMission = data.MaxMission,
                    gm.DataManager.userData.LittleMission = data.LittleMission,
                    gm.DataManager.userData.Right = data.Right,
                    gm.DataManager.userData.pass = data.pass,
                    gm.DataManager.userData.accuracy = data.accuracy,
                    gm.DataManager.userData.Tip = data.Tip,
                    gm.DataManager.userData.skinShoe = data.skinShoe,
                    gm.DataManager.userData.skinHead = data.skinHead,
                    gm.DataManager.userData.skinCoat = data.skinCoat;
                gm.DataManager.userData.get_tip = data.get_tip;
                if (data.SetMission) {
                    gm.DataManager.userData.SetMission = data.SetMission
                }
                if (data.offline) {
                    gm.DataManager.userData.offline = data.offline
                }
                if (data.powerNum) {
                    gm.DataManager.userData.powerNum = data.powerNum
                }
                if(data.worldOrfriend){
                    gm.DataManager.userData.worldOrfriend = data.worldOrfriend
                }
            } else {
                var e = gm.StorageManager.getItem("userData"),
                    t = gm.StorageManager.getItem("SettingData");
                if (null != e)
                    for (var i in e) {
                        e.hasOwnProperty(i) && (gm.DataManager.userData[i] = e[i]);
                    }
                0 == gm.DataManager.userData.uuid && (gm.DataManager.userData.uuid = this.GetUUid(), this.SaveUserData()), null != t && (gm.DataManager.SettingData = t);
            }
        } else {
            t = gm.StorageManager.getItem("SettingData");
            if (e == null) {
                e = gm.DataManager.userData
            }
            if (null != e)
                for (var i in e) {
                    e.hasOwnProperty(i) && (gm.DataManager.userData[i] = e[i]);
                }
            0 == gm.DataManager.userData.uuid && (gm.DataManager.userData.uuid = this.GetUUid(), this.SaveUserData()), null != t && (gm.DataManager.SettingData = t);
        }
    },
    SaveUserData: function SaveUserData() {
        // heartbeatSchedule.default.emitEvent(gm.DataManager.userData);
        gm.StorageManager.setItem("userData", gm.DataManager.userData);
        var e = gm.StorageManager.getItem("userData")
        console.log(e, "e=======")
        if (window['wx']) {
            lwsdk.setToServer({
                dataKey: "girlData",
                dataType: "girlData",
                data: gm.DataManager.userData,
                expireTime: 3600
            })
        }
        // console.log(gm.DataManager.userData,"gm.DataManager.userData")
    },
    SaveSettingData: function SaveSettingData() {
        // heartbeatSchedule.default.emitEvent(gm.DataManager.SettingData);
        gm.StorageManager.setItem("SettingData", gm.DataManager.SettingData);
        if (window['wx']) {
            lwsdk.setToServer({
                dataKey: "girlSet",
                dataType: "girlDataSet",
                data: gm.DataManager.SettingData,
                expireTime: 3600
            })
        }
        this.ChangeSetting();
    },
    ChangeSetting: function ChangeSetting() {
        // console.log(!gm.DataManager.SettingData.sound, gm.DataManager.SettingData.sound, "音效====")
        // // debugger
        if (gm.DataManager.SettingData.sound) {
            //     console.log("播放音效")
            //     console.log("不存在背景音乐预设")
            cc.loader.loadRes("audio/" + "audio_bgm", cc.AudioClip, function (c, f) {
                cc.audioEngine.playMusic(f, true);
            });
        } else {
            cc.audioEngine.stopMusic();
        }
        // gm.AudioPlayManager.ChangeMute(n.default.AudioChannelType.Channel_UI, !gm.DataManager.SettingData.effect), gm.AudioPlayManager.ChangeMute(n.default.AudioChannelType.Channel_Background, !gm.DataManager.SettingData.sound);
    },
    GetUUid: function GetUUid() {
        for (var e = e || 32, t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", i = t.length, n = "", a = 0; a < e; a++) {
            n += t.charAt(Math.floor(Math.random() * i));
        }
        return n;
    }
})
window['DataBase'] = DataBase
/*DataBase: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "14e854LOS9IEIblTnuHTbnS", "DataBase");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("GameDefine"));
        cc.Class({
            properties: {
                userData: null,
                AllBoxData: null
            },
            Init: function Init() {
                var e = gm.StorageManager.getItem("userData"),
                    t = gm.StorageManager.getItem("SettingData");
                if (null != e)
                    for (var i in e) {
                        e.hasOwnProperty(i) && (gm.DataManager.userData[i] = e[i]);
                    }
                0 == gm.DataManager.userData.uuid && (gm.DataManager.userData.uuid = this.GetUUid(), this.SaveUserData()), null != t && (gm.DataManager.SettingData = t);
            },
            SaveUserData: function SaveUserData() {
                gm.StorageManager.setItem("userData", gm.DataManager.userData);
            },
            SaveSettingData: function SaveSettingData() {
                gm.StorageManager.setItem("SettingData", gm.DataManager.SettingData), this.ChangeSetting();
            },
            ChangeSetting: function ChangeSetting() {
                gm.AudioPlayManager.ChangeMute(n.default.AudioChannelType.Channel_UI, !gm.DataManager.SettingData.effect), gm.AudioPlayManager.ChangeMute(n.default.AudioChannelType.Channel_Background, !gm.DataManager.SettingData.sound);
            },
            GetUUid: function GetUUid() {
                for (var e = e || 32, t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", i = t.length, n = "", a = 0; a < e; a++) {
                    n += t.charAt(Math.floor(Math.random() * i));
                }
                return n;
            }
        });
        
*/