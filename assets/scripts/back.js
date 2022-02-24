// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },
    Init(){
        this.node.on(cc.Node.EventType.TOUCH.END,this.backClick,this)
    },
    backClick() {
        console.log("我点击了假退出  胜利界面", cfs.default.ZJXJJ_FXCXLBY);
        // adSdk.hideBanner()
        if (cfs.default.ZJXJJ_FXCXLBY) {
            cc.loader.loadRes("Prefabs/Panel/otherGames/falseDialogGame", (err, spf) => {
                var back = cc.instantiate(spf);
                back.parent = cc.director.getScene();
                back.position = cc.v2(375, 667);
                back.zIndex = 100000
            })

        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
