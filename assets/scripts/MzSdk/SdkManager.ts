
import toast from "./toast";
import MZSdk from "./MZSdk";




class SdkManager {
    sdkMgr: MZSdk


    token
    user_openid
    is_new = false
    version = 2

    toast = null
    mistake_box = null
    SubPackgeNameStr=["anim","audio","dragon","effects","texture","girl","Prefabs","textures","audios"]

    /**
    * 服务器数据初始化入口
    * @param severInfo 服务器数据
    */
    updateUserData(severInfo) {
        console.log(severInfo)
        let data
        if (severInfo) {
            try {
                data = JSON.parse(severInfo)
            } catch (error) {
                data = severInfo
            }

        }
        console.log("更新数据")
    }


    /**
     * 初始化sdk
     * @param cfun 初始化完成回调
     */
    initSDK(cfun) {
        this.sdkMgr = new MZSdk()
        this.sdkMgr.initSDK(cfun)
    }

    /**
     * 显示banner
     */
    showBanner() {
        this.sdkMgr.showBanner()
    }

    /**
     * 隐藏banner
     */
    hideBanner() {
        this.sdkMgr.hideBanner()
    }
    /**
     * 显示插屏
     * @param cfun 关闭插屏回调
     */
    showInterval(cfun?) {
        this.sdkMgr.showInterval(cfun)
    }

    /**
     * 播放激励视频
     * @param cfun 视频成功回调
     */
    doVideo(cfun) {
        this.sdkMgr.doVideo(cfun)
    }

    /**
    * 强拉视频
    * @param cfun 视频结束回调
    */
    QLVideo(cfun) { 
        this.sdkMgr.QLVideo(cfun)
    }

    loadsub(fun?){
        let self = this;
        for(let  i=0;i<self.SubPackgeNameStr.length;i++){
            wx.loadSubpackage({
                name: self.SubPackgeNameStr[i], // name 可以填 name 或者 root
                success: function (res) {
                    console.log("加载分包成功", res)
                    console.log(i,self.SubPackgeNameStr.length-1)
                    if(i==self.SubPackgeNameStr.length-1){
                        fun&&fun()
                    }
                    // 分包加载成功后通过 success 回调
                },
                fail: function (res) {
                    console.log("加载分包失败", res)
                    // 分包加载失败通过 fail 回调
                }
            })
        }
        
    }
 

    /**
     * 默认toast
     * @param str  默认toast内容
     * @param parent  默认toast的父节点，默认在canvas下
     */
    showTips(str, parent?) {
        // if (this.toast) {
        //     var o = cc.instantiate(this.toast);
        //     o.getComponent(toast).bindDate(str)
        //     o.parent = parent ? parent : cc.Canvas.instance.node
        //     o.zIndex = 1001
        // } else {
        //     let self = this
        //     // cc.loader.loadRes("MZSdk/prefabs/toast", cc.Prefab, function (e, t) {
        //     //     if (e) cc.error(e); else {
        //     //         self.toast = cc.instantiate(t);
        //     //         var o = cc.instantiate(t);
        //     //         o.getComponent(toast).bindDate(str)
        //     //         o.parent = parent ? parent : cc.Canvas.instance.node
        //     //         o.zIndex = 1001
        //     //     }
        //     // });
        // }

    }





}
export default new SdkManager()