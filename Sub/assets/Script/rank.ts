const { ccclass, property } = cc._decorator;

@ccclass
export default class rank extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null

    @property(cc.Prefab)
    rankItem: cc.Prefab = null

    ss=""
    start() {

    }

    buildRank = (gameDatas) => {
        console.log(gameDatas)
        gameDatas.forEach((date, rank) => {
            this.drawRankItemEx(rank, date)
        });
    }

    // dataSorter = (gameDatas) => {
    //     // this.content.removeAllChildren()
    //     // let data = []
    //     // for (let i = 0; i < gameDatas.length; i++) {
    //     //     if (gameDatas[i].KVDataList[2]) {
    //     //         data.push(gameDatas[i])
    //     //     }
    //     // }
    //     // let newData = data.sort((a, b) => {
    //     //     let va = Number(a.KVDataList[2].value)
    //     //     let vb = Number(b.KVDataList[2].value)
    //     //     return vb - va;
    //     // })
    //     // return this.buildRank(newData)
    //     this.content.removeAllChildren()
    //     let data = []
    //     for (let i = 0; i < gameDatas.length; i++) {
    //         if (gameDatas[i]) {
    //             data.push(gameDatas[i])
    //         }
    //     }
    //     let newData = data.sort((a, b) => {
    //         // let va = Number(a.KVDataList[2].value)
    //         // let vb = Number(b.KVDataList[2].value)
    //         let va = Number(a.KVDataList[0].value)
    //         let vb = Number(b.KVDataList[0].value)
    //         return vb - va;
    //     })
    //     return this.buildRank(newData)
    // }
    dataSorter = (gameDatas: Array<any>, selfData: Array<any>) => {
        console.log("%c%s", "color: green", '---[子域]---', gameDatas, selfData)
        this.content.removeAllChildren()
        let newData = gameDatas.sort((a, b) => {
            let va = Number(a.KVDataList[0].value)
            let vb = Number(b.KVDataList[0].value)
            return vb - va;
        })
        for (var i = 0; i < newData.length; i++) {
            if (newData[i].avatarUrl == selfData[0].avatarUrl && newData[i].nickname == selfData[0].nickName) {
                console.log("%c%s", "color: green", '---[子域]---自己的数据', newData[i], i)
                this.ss=newData[i].nickname
                break
            }
        }
        return this.buildRank(newData)
    }
    // drawRankItemEx(rank, data) {
    //     console.log(rank,"rank")
    //     console.log(data, "data");

    //     const ctx = cc.instantiate(this.rankItem)
    //     ctx.getChildByName('rank').getComponent(cc.Label).string = rank + 1
    //     ctx.getChildByName('Level').getChildByName('LevelLabel').getComponent(cc.Label).string = //"Lv." + 
    //     (data.KVDataList[0] ? data.KVDataList[0].value : 1);
    //     // ctx.getChildByName('lv').getComponent(cc.Label).string = "Lv." + (data.KVDataList[0] ? data.KVDataList[0].value : 1);
    //     ctx.getChildByName('name').getComponent(cc.Label).string = data.nickname//KVDataList[1] ? data.KVDataList[1].value : "";
    //     // ctx.getChildByName('warpower').getComponent(cc.Label).string = data.KVDataList[2] ? data.KVDataList[2].value : 0;
    //     cc.loader.load(data.avatarUrl + '?aaa=aa.jpg', function (err, texture) {
    //         if (err) { console.log(err); return }
    //         ctx.getChildByName('headIcon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
    //     });
    //     this.content.addChild(ctx)
    // }
    drawRankItemEx(rank, data) {
        const ctx = cc.instantiate(this.rankItem)

        console.log("datadata",data)
        let grade = data.KVDataList[0].value
            let grader =grade// grade.toString().split("")
            let gradeV = "" // 大关
            let gradeL = "" // 小关
            let gradeRight = ""
            if (grader.length < 8 && grader.length > 5) {
                gradeV = grader[0] + ""
                gradeL = grader[1]
                gradeRight = Number(grader[2] + "" + grader[3] + "" + grader[4] + "." + grader[5] + "" + grader[6]).toFixed(2)
            } else if (grader.length < 5) {
                gradeV = grader[0] + ""
                gradeL = grader[1]
                gradeRight = Number(grader[2] + ".").toFixed(2)

            } else if (grader.length == 8) {
                gradeV = grader[0] + "" + grader[1]
                gradeL = grader[2]
                gradeRight = Number(grader[3] + "" + grader[4] + "" + grader[5] + "." + grader[6] + "" + grader[7]).toFixed(2)
            } else if(grader.length > 8 && grader.length < 11) {
                gradeV = grader[0] + "" + grader[1] + "" + grader[2]
                gradeL = grader[3]
                gradeRight = Number(grader[4] + "" + grader[5] + "" + grader[6] + "." + grader[7] + "" + grader[8]).toFixed(2)
            }else{
                gradeV = grader[0] + "" + grader[1]
                gradeL = grader[2]
                gradeRight = Number(grader[3] + "" + grader[4] + "" + grader[5] + "." + grader[6] + "" + grader[7]).toFixed(2)

            }
            if (gradeRight == "NaN") {
                gradeRight = Number(0 + ".").toFixed(2)
            }


            console.log(gradeV,gradeL,gradeRight)

        // ctx.getChildByName('rank').getComponent(cc.Label).string = rank + 1
        if(rank==0){
            ctx.getChildByName('ranksp1').active=true
        }else if(rank==1){
            ctx.getChildByName('ranksp2').active=true
        }else if(rank==2){
            ctx.getChildByName('ranksp3').active=true
        }else{
            ctx.getChildByName('rank').active=true
            ctx.getChildByName('rank').getComponent(cc.Label).string = rank + 1
        }
        if(this.ss==data.nickname){
            ctx.getChildByName('rankBg').active=true
        }
        // ctx.getChildByName('rankbg').getComponent(cc.Sprite).spriteFrame = this.rankBg[rank] ? this.rankBg[rank] : null
        ctx.getChildByName('name').getComponent(cc.Label).string = data.nickname.substr(0, 8) 
        ctx.getChildByName('Level').getChildByName("LevelLabel").getComponent(cc.Label).string = gradeV + "-" + gradeL
        ctx.getChildByName('Right').getChildByName("RightLabel").getComponent(cc.Label).string = gradeRight + "%"
        // ctx.getChildByName('Level').getChildByName('LevelLabel').getComponent(cc.Label).string = data.KVDataList[0] ? data.KVDataList[0].value : 0;
        cc.loader.load(data.avatarUrl + '?aaa=aa.jpg', function (err, texture) {
            if (err) { console.log(err); return }
            ctx.getChildByName('headIcon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
        this.content.addChild(ctx)
        ctx.zIndex=1000000
    }

    // update (dt) {}
}
