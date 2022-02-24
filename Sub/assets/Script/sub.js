
cc.Class({
    extends: cc.Component,

    properties: {
        rank:cc.Node
    },

    onLoad() {
        console.log('123456789')
        let self =this
        window.subNode = this
        this.load()
    },
    submitScore(score){//, curname, warPower) { //提交得分
        window.wx.getUserCloudStorage({
            // keyList: ["level", "curname", "warPower"],
            keyList: ["ALL"],
                success: function (getres) {
                    if (getres.KVDataList.length != 0) {
                        console.log(getres)
                        // if (getres.KVDataList[0].value > warPower) {
                        //     return;
                        // }
                    }
                    // 对用户托管数据进行写数据操作
                    window.wx.setUserCloudStorage({
                        KVDataList:[{key: "ALL", value: "" + score}], //[{key: "level", value: "" + level},{key: "curname", value: "" + curname},{key: "warPower", value: "" + warPower}],
                        success: function (res) {
                            
                        },
                        fail: function (res) {
                           
                        },
                        complete: function (res) {

                        }
                    });
                }
        })
    },
    load() {
        let self=this
        if (window['wx']) {
            window.wx.onMessage(data => {
                index = 0
                console.log("%c%s", "color: green", '---[子域]---', '接受消息', data)
                if (data.messageType == 0) { //提交分数
                    submitScore(data.level);
                } else if (data.messageType === 2) { //展示排行榜
                    showRank()
                }else{
                    self.rank.active=false
                }
            });
        }
    },
    showRank(){
        console.log("showRank")
        this.rank.active = true
        // wx.getUserInfo({
        //      openIdList: ['selfOpenId'],
        //         success: (res) => {
        //             console.log(res)
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: (selfData) => {
                wx.getFriendCloudStorage({
                    keyList: ["ALL"],
                    success: res => {
                        this.rank.getComponent("rank").dataSorter(res.data,selfData.data)
                    },
                    fail: res => {
                        console.log("网络加载失败", res);
                    },
                });
            }
        })
        //         }
        // })

        // let self=this
        // wx.getPotentialFriendList({
        //     success(res) {
        //         console.log(res)
        //         self.rank.getComponent("rank").dataSorter(res)
        //         // self.inviteNode.getComponent('invite').init(data.list)
        //     }
        // })
        
    }
});
var index = 0

function showRank() {
    if (!window.subNode) {
        index++
        if (index < 50) {
            setTimeout(function () {
                showRank()
            }, 500);
        }
    } else {
        window.subNode.showRank()
    }
}
// function load() {
//     let self=this
//     if (window['wx']) {
//         window.wx.onMessage(data => {
//             index = 0
//             console.log("%c%s", "color: green", '---[子域]---', '接受消息', data)
//             if (data.messageType == 0) { //提交分数
//                 submitScore(data.level);
//             } else if (data.messageType === 2) { //展示排行榜
//                 showRank()
//             }else{
//                 self.rank.active=false
//             }
//         });
//     }
// }

function submitScore(score) { //提交得分
    console.log("提交得分",score)
    window.wx.getUserCloudStorage({
        keyList: ["ALL"],
        success: function (getres) {
            if (getres.KVDataList.length != 0) {
                console.log(getres)
                // if (getres.KVDataList[0].value > score) {
                //     return;
                // }
            }
            // 对用户托管数据进行写数据操作
            window.wx.setUserCloudStorage({
                KVDataList: [{
                    key: "ALL",
                    value: "" + score
                }],
                success: function (res) {

                },
                fail: function (res) {

                },
                complete: function (res) {

                }
            });
        }
    })
}
// load()
