

let Consts = {
	OpenDataKeys: {
		InitKey: "initKey",
		Grade: "testkey",
		ScoreKey: "levelScore", // json.string
		LevelKey: "reachlevel",
	},
	DomainAction: {
		FetchFriend: "FetchFriend",
		FetchGroup: "FetchGroup",
		FetchFriendLevel: "FetchFriendLevel", //好友关卡进度排行
		FetchFriendScore: "FetchFriendScore", //好友关卡得分排行
		HorConmpar: "HorConmpar", //横向比较 horizontal comparison
		Paging: "Paging",
        Scrolling: "Scrolling",
        OverFriend: "overFriend"
	},
}

let utils = {
    curLevel : 1,
    getScore : _=> {return 1}
}
const {ccclass, property} = cc._decorator;
@ccclass
export default class wxRankList extends cc.Component {
    static instance: wxRankList = null;

    @property(cc.Sprite)
    RankBg:cc.Sprite = null
    @property(cc.Label)
    Level:cc.Label = null
    @property(cc.Label)
    Right:cc.Label = null
    @property(cc.Sprite)
    Head:cc.Sprite = null
    @property(cc.Label)
    RankLabel:cc.Label = null
    @property(cc.Label)
    PlayerName:cc.Label = null
    @property(cc.Sprite)
    BG:cc.Sprite = null
    

    @property(cc.Sprite)
    rankRender:cc.Sprite = null; // 排行

    @property(cc.Node)
    rankListNode:cc.Node = null;

    @property(cc.Node)
    horRankNode:cc.Node = null;

    @property(cc.Node)
    rankBgNode:cc.Node = null;

    @property(cc.Label)
    labelTitle:cc.Label = null;

    @property(cc.Node)
    touchLayer:cc.Node = null;

    // @property(Boolean)
    enableScroll = true;//

    _timeCounter = 0;
    rendInterval = 0.5;//刷新排行画布间隔s

    rankTexture:cc.Texture2D=null;
    rankSpriteFrame : cc.SpriteFrame=null;
    closeBackRank=0; // 关闭后操作

    onLoad() {
        wxRankList.instance=this;
        this._timeCounter    = 0
        // this.rankTexture     = new cc.Texture2D();
        // this.rankSpriteFrame = new cc.SpriteFrame();
        this.resizeSharedCanvas(this.rankRender.node.width, this.rankRender.node.height)
        this.node.active = false;
    }

    onShow() {
        this.node.active = true;
    }
    
    update(dt) {
        console.log('update')
        this.updateRankList()
    }

    resizeSharedCanvas(width, height){
        if(!window["wx"]) return;
        let sharedCanvas    = window["wx"].getOpenDataContext().canvas
        sharedCanvas.width  = width
        sharedCanvas.height = height
    }

    changeRender(renderNode:cc.Node){
        // if(renderNode.name === "sprHorRank"){
        //     this.horRankNode.active = true;
        //     this.rankListNode.active = false;
        // }else if(renderNode.name === "sprRankList"){
        //     this.horRankNode.active = false;
        //     this.rankListNode.active = true;
        // }
        this.rankRender.node.width = renderNode.width
        this.rankRender.node.height = renderNode.height
        this.rankRender.node.position = renderNode.position
        this.resizeSharedCanvas(renderNode.width, renderNode.height)
    }

    updateRankList() {
        if(!window["wx"]) return;
        if(!this.rankTexture) return;
        let sharedCanvas = window["wx"].getOpenDataContext().canvas
        this.rankTexture.initWithElement(sharedCanvas);
        this.rankTexture.handleLoadedTexture();
        this.rankSpriteFrame.setTexture(this.rankTexture);
        this.rankRender.spriteFrame = this.rankSpriteFrame;
    }

    onEnable() {
        this.touchLayer.active = true
        if (this.enableScroll) {
            this.rankRender.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        }
    }

    onDisable() {
        if (this.enableScroll) {
            this.rankRender.node.off(cc.Node.EventType.TOUCH_MOVE)
        }
    }

    overFriendShow() {
        this.node.active = true;
        this.rankListNode.active = true;               
        this.rankRender.node.width = this.rankListNode.width
        this.rankRender.node.height = this.rankListNode.height
        this.rankRender.node.position = this.rankListNode.position
        this.resizeSharedCanvas(111, 151)
        this.postMessage(Consts.DomainAction.OverFriend, utils.curLevel)
    }

    onViewDetailRank(){
        this.closeBackRank = 1;
        this.loadLevelScoreRank(utils.curLevel)
    }

    onPageUp() {
        this.postMessage("Paging", -1)
    }

    onPageDown() {
        this.postMessage("Paging", 1)
    }

    onClose() {
        /* if(this.closeBackRank===1){
            this.closeBackRank = 0;
            this.loadHorRank(utils.curLevel)
            return
        } */
        this.node.active = false;
    }

    onTouchMove(event) {
        const deltaY = event.getDeltaY();
        // console.log("rank touchmove:", deltaY);
        this.postMessage("Scrolling", deltaY)
    }

    //获取关卡得分排行
    loadLevelScoreRank(level){
        this.node.active = true;
        this.touchLayer.active = true
        this.onEnable()
        this.changeRender(this.rankListNode)        
        this.postMessage(Consts.DomainAction.FetchFriendScore, level)
    }

    //获取关卡进度排行
    loadLevelOpenRank(){
        //this.labelTitle.string = "关卡排行"
        this.node.active = true;
        this.touchLayer.active = true
        this.onEnable();
        this.changeRender(this.rankListNode)        
        this.postMessage(Consts.DomainAction.FetchFriendLevel)
    }

    //横向比较
    loadHorRank(level=1){
        this.node.active = true;
        this.touchLayer.active = false        
        this.onDisable()
        this.changeRender(this.horRankNode)
        this.postMessage(Consts.DomainAction.HorConmpar, level, utils.getScore(level))
    }
    

    //向子域发送消息
    postMessage(action, data=null, dataEx=null) {
        // console.log('post message', action)
        if(!window["wx"]) return;
        let openDataContext = window["wx"].getOpenDataContext();
        // cc.log(action, data, openDataContext);
        openDataContext.postMessage({
            action: action,
            data: data,
            dataEx:dataEx,
        })
    }

    // //检查得分
    // checkScore(key, callback){
    //     if (!window.wx) return
    //     wx.getUserCloudStorage({
    //         keyList:[key],
    //         success:res=>{
    //             res.data.
    //         }
    //     })
    // }

    //wx api
    // 上传关卡分数
    uploadScore(level, score) {
        if(!window["wx"]) return;
        score = score.toString()
        window["wx"].setUserCloudStorage({
            KVDataList: [
                { key: Consts.OpenDataKeys.ScoreKey+level, value: score },
            ],
            success: (res) => {
                console.log("uploadScore success:res=>", res)
            },
            fail: (res) => {
                console.log("uploadScore fail:res=>", res)
            }
        })
    }

    // 上传关卡开启进度
    uploadLevelOpen(level){
        if (!window.window["wx"]) return
        level = level.toString()
        window["wx"].setUserCloudStorage({
            KVDataList: [
                { key: Consts.OpenDataKeys.LevelKey, value: level },
            ],
            success: (res) => {
                console.log("uploadScore success:res=>", res)
            },
            fail: (res) => {
                console.log("uploadScore fail:res=>", res)
            }
        })
    }

    //删除微信数据
    removeUserKey(key_or_keys) {
        if (!window.window["wx"]) return
        if(typeof(key_or_keys)==="string"){
            key_or_keys = [key_or_keys]
        }
        window["wx"].removeUserCloudStorage({
            keyList: key_or_keys,
            success: (res) => {
                console.log("uploadScore success:res=>", res)
            },
            fail: (res) => {
                console.log("uploadScore fail:res=>", res)
            }
        })
    }

    share(args) {
        if (!window.window["wx"]) return
        if(!args) args={}
        args.imageUrl = args.imageUrl || "http://img.zcool.cn/community/01c2ac57beb18d0000012e7eaa6d19.jpg@1280w_1l_2o_100sh.jpg"
        window["wx"].shareAppMessage({
            title: " ",
            imageUrl: args.imageUrl,
            query: "key testshare",
            success: (res) => {
                console.log("success:", res)
                if(args.success){
                    args.success(res)
                }
            },
            fail: res => {
                console.log("fail:", res)
                if(args.fail){
                    args.fail(res)
                }
            }
        })
    }

    initRank() {

    }

    snapshotSync(){
        if(!window['wx']) return
        var canvas = cc.game['canvas'];
        var width  = cc.winSize.width;
        var height = cc.winSize.height;

        return canvas['toTempFilePathSync']({
            x: 0,
            y: 0,
            width: width*1.5,
            height: height,
            destWidth: width*1.5,
            destHeight: height
        })
    }
}
