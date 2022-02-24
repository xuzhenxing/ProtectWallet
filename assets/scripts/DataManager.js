

var n = {},
a = {
    // skinShoe:[0,0,0,0,0,0,0,0],
    // skinHead:[0,0,0,0,0,0,0,0],
    // skinCoat:[0,0,0,0,0,0,0,0],
    Level:110,
    gold:0,
    lastDate:0,
    can_power:true,
    quest_pawer:true,
    get_tip:true,
    power:5,
    NowMission: 1,
    MaxMission: 1,//TODO
    SetMission:1,
    LittleMission:0,
    Right:0,
    pass:0,
    accuracy:1,
    Tip: 1,
    skinShoe:{0:{isChoose:0,isunlock:0},1:{isChoose:1,isunlock:1},2:{isChoose:1,isunlock:1},3:{isChoose:1,isunlock:1},4:{isChoose:1,isunlock:1},5:{isChoose:1,isunlock:1},6:{isChoose:1,isunlock:1},7:{isChoose:1,isunlock:1}},
    skinHead:{0:{isChoose:0,isunlock:0},1:{isChoose:1,isunlock:1},2:{isChoose:1,isunlock:1},3:{isChoose:1,isunlock:1},4:{isChoose:1,isunlock:1},5:{isChoose:1,isunlock:1},6:{isChoose:1,isunlock:1},7:{isChoose:1,isunlock:1}},
    skinCoat:{0:{isChoose:0,isunlock:0},1:{isChoose:1,isunlock:1},2:{isChoose:1,isunlock:1},3:{isChoose:1,isunlock:1},4:{isChoose:1,isunlock:1},5:{isChoose:1,isunlock:1},6:{isChoose:1,isunlock:1},7:{isChoose:1,isunlock:1}},
    offline:0,
    powerNum:300,
    worldOrfriend:0,
};
n.userData = a;
var o = {
sound: !0,
vibration: !0,
effect: !0
};
n.SettingData = o;
var s = {
userClick: !1,
ADType: 0
};
n.ADS = s, module.exports = n
window['a'] = a
window['o'] = o
window['s'] = s
/*DataManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "765d5dbU2FKEqCEZ+juU8Ll", "DataManager");
        var n = {},
            a = {
                NowMission: 1,
                MaxMission: 1,
                Tip: 0
            };
        n.userData = a;
        var o = {
            sound: !0,
            vibration: !0,
            effect: !0
        };
        n.SettingData = o;
        var s = {
            userClick: !1,
            ADType: 0
        };
        n.ADS = s, t.exports = n, 
*/