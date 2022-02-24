
import CommonFun from "./SdkManager"
import MD5 from "./Mz_MD5"
import BlackList from "./BlackList"
import { MistakeBox } from "./MistakeBox"
import SdkManager from "./SdkManager"


// 微信-钱包守卫战 API:

// 授权拿token: POST https://tdsed.cn/wechat/basic_auth?app_token=R2Nw9R&code= 参数 code
// 初始化 GET https://tdsed.cn/api/people/init 参数 token
// 心跳 POST https://tdsed.cn/api/people/heartbeat 参数 token data timestamps sign

// 配置 http://auroth.cn/admin/accounts/R2Nw9R/options
// 互推 http://auroth.cn/admin/accounts/R2Nw9R/hu_tui
// 微信-插针我最牛 API:

// 授权拿token: POST https://cryophoenix.cn/wechat/basic_auth?app_token=dnLz7g&code= 参数 code
// 初始化 GET https://cryophoenix.cn/api/people/init 参数 token
// 心跳 POST https://cryophoenix.cn/api/people/heartbeat 参数 token data timestamps sign

// 配置 http://auroth.cn/admin/accounts/dnLz7g/options
// 互推 http://auroth.cn/admin/accounts/dnLz7g/hu_tui

/**
 * 服务器域名和apptoken 根据游戏自己调整
 */
const requestURL = "https://tdsed.cn"//'https://auroth.cn'
const mini_game = "R2Nw9R"//"EeP7Gd"

const version = "1.0.0"

const bannerId = [""] //横幅广告id
const videoId = [""] //视频id
const intervalID = [""] //插屏广告id
const nativeId = [""] //原生id


const isLandScape = true //是否是横屏


export default class MZSdk {

    videoCFun = null
    videoAD = null
    isOnVideo = false
    videoCFun2 = null
    bannerAD = null
    isShowBanner = false
    intervalAd = null
    nativeAd = null
    nativePre = null
    initUser_callFun = null
    tryTime = 0
    imei = ''
    stabBox = [0, 0]
    hasQlVideo = false
    isShowInterval = false
    mistakebox = null

    bannerRfTime = 20   //banner刷新时间 单位s
    interval_probability = 1 //插屏展示几率 1代表100%
    interval_delay_time = 1 //插屏延迟时间 单位s
    MistakeBoxConfig = [1, 1] //误触宝箱配置 前面是误触banner的次数 后面是误触视频的次数
    MistakeBoxSwitch = 1 //误触宝箱开关
    QLVideoSwitch = 1 //强拉视频开关
    LDMistakeBoxSwitch = 1 //落地误触宝箱开关
    LDQLVideoSwitch = 1 //落地强拉视频开关
    blackCityList = [] //屏蔽城市
    blackProvinceList = ['广东省'] //屏蔽省份

    //控制是否需要点击屏幕继续
    onClickContinue = false;
    /**
     * 初始化sdk
     */
    initSDK(cfun) {
        //this.createIntervalAD()
        this.initUserData(cfun)
        //console.log("initSDK--", this.bannerAD)
    }

    /**
   * 视频初始化
   */
    initVideo() {
        let id = videoId[Math.floor(Math.random() * videoId.length)]
        this.videoAD = qg.createRewardedVideoAd({
            adUnitId: id
        })
        this.videoAD.load()
        this.videoAD.onLoad(() => {
            console.log("激励视频加载成功");
            this.videoAD.show()

        })
        this.videoAD.onError((err) => {
            this.isOnVideo = false
            console.log("暂无视频")
            SdkManager.showTips("暂无视频")
            this.videoCFun2 && this.videoCFun2()
            console.log(err);
            this.videoAD.offError()
            this.videoAD.offLoad()
        })
        this.videoAD.onClose(() => {
            console.log("激励视频广告完成，发放奖励");
            this.videoAD.offClose()
            this.videoAD.offError()
            this.videoAD.offLoad()
            this.videoAD.offClose()
            this.isOnVideo = false
            this.videoCFun && this.videoCFun(true)
        })
    }

    /**
     *   播放视频
     * @param cFun  视频播放成功回调
     * @param cFun2  视频播放失败回调
     * @returns 
     */
    doVideo(cFun, cFun2?) {
        if (!window["mz"]) {
            cFun && (cFun(true))
            return
        }
        if (this.isOnVideo) {
            return
        }
        if (videoId.length == 0) {
            return console.log("暂无视频")
        }
        this.isOnVideo = true
        this.videoCFun = cFun
        this.videoCFun2 = cFun2
        this.initVideo()
    }

    /**
    *  强拉视频
    * @param cfun  视频结束后的逻辑
    */
    QLVideo(cfun) {
        if (!this.QLVideoSwitch || BlackList.ins.IsBlack || this.hasQlVideo) return cfun && cfun()
        this.doVideo(cfun, cfun)
        this.hasQlVideo = true
    }


    
    /**
     *  刷新banner
     */
    rFBanner() {
        return
        setInterval(() => {
            this.bannerAD.destroy()
            this.bannerAD = this.createBanner()
            if (this.isShowBanner) {
                this.bannerAD.show()
            }
            console.log("rFBanner", this.isShowBanner, this.bannerAD)
        }, this.bannerRfTime * 1000)
    }


    /**
     * 创建banner广告
     * @returns 
     */
    createBanner() {
        if (!window["mz"]) {
            return
        }
        let Id = bannerId[Math.floor(Math.random() * bannerId.length)]
        if (!Id) return
        let screenHeight = qg.getSystemInfoSync().screenHeight;
        let screenWidth = qg.getSystemInfoSync().screenWidth;
        let style = isLandScape ? {
            left: (screenWidth - screenWidth / 2) / 2,
            top: screenHeight - screenWidth / 2 / 6.7,
            width: screenWidth / 2,
            height: screenWidth / 2 / 6.7
        } : {
            left: 0,
            top: screenHeight - screenWidth / 6.7,
            width: screenWidth,
            height: screenWidth / 6.7
        }
        let banner = qg.createBannerAd({
            adUnitId: Id,
            style: style
        });
        let self = this
        banner.onLoad(function () {
            console.log("banner 广告加载成功");
            if (self.isShowBanner)
                banner.show();
        })
        banner.onResize((res) => {
            console.log("Banner 尺寸改变");
            banner.style.width = style.width;
            banner.style.height = style.height;
            banner.style.top = style.top;
            banner.style.left = style.left
        });

        banner.onClose(function () {
            console.log("banner 广告关闭");
            banner.offClose()
        })

        banner.onError(function (err) {
            console.log(err);
            banner.offError()
        })
        return banner
    }

    /**
     * 显示普通banner广告
     * @returns 
     */
    showBanner() {
        if (!window["mz"]) {
            return
        }
        console.log("showBanner----", this.bannerAD)
        this.isShowBanner = true
        if (this.bannerAD) {
            this.bannerAD.show()
        } else {
            this.bannerAD = this.createBanner()
        }



    }

    /**
     * 隐藏普通banner广告
     * @returns 
     */
    hideBanner() {
        if (!window["mz"]) {
            return
        }
        this.isShowBanner = false
        console.log("hideBanner----", this.bannerAD)
        if (this.bannerAD) {
            this.bannerAD.hide()
        }

    }

    /**
      * 显示插屏广告
      * @param cfun 插屏关闭回调
      */
    showInterval(cfun?) {
        let random = Math.random()
        if (random < this.interval_probability) {
            setTimeout(() => {
                this.isShowInterval = true
                if (this.intervalAd) {
                    this.intervalAd.show()
                } else {
                    this.createIntervalAD(cfun)
                }
            }, this.interval_delay_time * 1000);
        }
    }
    /**
     * 创建普通插屏
     * @param cFun 
     * @returns 
     */
    createIntervalAD(cFun?) {
        if (!window['mz']) {
            return
        }
        let Id = intervalID[Math.floor(Math.random() * intervalID.length)]
        this.intervalAd = qg.createInsertAd({
            adUnitId: Id
        })
        this.intervalAd.load()
        this.intervalAd.onLoad(() => {
            console.log("insert 广告加载成功");
            if (this.isShowInterval)
                this.intervalAd.show()

        })
        this.intervalAd.onError(err => {
            console.log("插屏 err--", JSON.stringify(err))
            this.intervalAd.destroy()
            this.intervalAd = null
            this.isShowInterval = false
            cFun && cFun()

        })
        this.intervalAd.onClose(res => {
            console.log('插屏 广告关闭')
            this.intervalAd.destroy()
            this.intervalAd = null
            this.isShowInterval = false
            this.createIntervalAD()
            cFun && cFun()
        })

    }
    /**
     * 显示原生广告
     * @param cfun 
     * @returns 
     */
    showNativeAD(cfun) {
        console.log("开始载入魅族原生广告")
        if (!window['mz']) {
            return
        }

        if (qg.getSystemInfoSync().platformVersionCode < 1092) {
            return
        }
        let Id = nativeId[Math.floor(Math.random() * nativeId.length)]
        this.nativeAd = qg.createNativeAd({
            adUnitId: Id
        });
        this.nativeAd.load();
        this.nativeAd.onLoad((res) => {
            console.log('原生广告加载', res.adList)
            let adList = res.adList
            console.log("native AD 加载成功 res =" + adList)
        })
        this.nativeAd.onError(function (err) {
            cfun && cfun()
            console.log(err)
        })
    }
    /**
     * 隐藏原生广告
     */
    hideNativeAD() {
        this.nativeAd.destroy()
    }
  

   

    //服务器模块***************************************

    /**
     * 初始化数据入口
     * @param CallFun 数据初始化完成回调
     */
    initUserData(CallFun) {
        let token = cc.sys.localStorage.getItem('token')
        console.log("token-initUserData", token)
        this.initUser_callFun = CallFun
        if (token) {
            CommonFun.token = token
            this.api_init()
        } else {
            this.login()
        }
    }

    /**
     * 登陆
     */
    login() {
        console.log("login")
        let self = this
        if (window['wx']) {
            let call = () => {
                console.log("test1---")
                wx.login({
                    success: (res) => {
                        self.imei = res.code
                        console.log("login", self.imei)
                        self.tryTime = 0
                        self.api_auth()
                    },
                    fail: (res) => {
                        call()
                        console.log("获取Code失败", res)
                    }
                })
            }
            call()
        } else {
            console.log("login-2")
            this.initUser_callFun && this.initUser_callFun()
        }
    }

    /**
     * 授权
     */
    api_auth() {
        if (this.tryTime > 5) {
            console.log('服务器繁忙！')
            this.initUser_callFun && this.initUser_callFun()
        }
        let self = this
        let imei = self.imei
        function success(res) {
            console.log("api_auth()api_auth()",res)
            let token = res.data.token
            CommonFun.token = token
            cc.sys.localStorage.setItem('token', token)
            self.tryTime = 0
            self.api_init()
        }
        function fail() {
            self.api_auth()
            console.log("获取res失败")
        }
        self.post_request('/meizu/basic_auth', { app_token: mini_game, imei }, success, fail)
    }

    /**
     * 初始化
     */
    api_init() {
        if (this.tryTime > 5) {
            console.log('服务器繁忙！')
            this.initUser_callFun && this.initUser_callFun()
        }
        this.tryTime++
        let self = this
        let success = (res) => {
            const { data } = res
            console.log('init data111', data)
            if (data.openid != undefined) {
                CommonFun.user_openid = data.openid
            }
            if (data.is_new != undefined) {
                CommonFun.is_new = data.is_new
            }
            const { code } = data
            if (code === 200) {
                self.handleUserInitData(data)
            } else if (code === 202) {
                self.api_init()
            } else if (code === 401) {
                self.login()
            } else {
                console.log('初始化错误')
            }
        }
        let fail = () => {
            console.log("获取init失败")
            self.api_init()
        }
        this.get_request('/api/people_meizu/init', {}, success, fail)
    }

    /**
     * 上传数据至服务器
     * @param data 
     * @returns 
     */
    postDataToServer(data) {
        if (!window["mz"]) {
            return
        }
        function success(res) {
            console.log("提交数据成功")
        }
        function fail() {
            console.log("提交数据失败")
        }
        data = create(data)
        data.token = CommonFun.token
        this.post_request('/api/people_meizu/heartbeat', data, success, fail)
    }

    /**
     * 清除服务器数据
     * @returns 
     */
    cleanDataToServer() {
        if (!window["mz"]) {
            return
        }
        function success(res) {
            console.log("清除数据成功")
        }
        function fail() {
            console.log("清除数据失败")
        }
        this.get_request('/api/people_meizu/clear_data', {}, success, fail)
    }

    /**
     * 处理数据
     * @param data 
     */
    handleUserInitData(data) {
        this.initConfig(data.settings.options)
        CommonFun.updateUserData(data.data)
        this.initUser_callFun && this.initUser_callFun()
    }


    initConfig(options) {
        console.log("initConfig---", options)
        if (!options) return
        options.bannerRfTime !== undefined && (this.bannerRfTime = options.bannerRfTime)
        options.interval_probability !== undefined && (this.interval_probability = options.interval_probability)
        options.interval_delay_time !== undefined && (this.interval_delay_time = options.interval_delay_time)
        options.MistakeBoxConfig !== undefined && (this.MistakeBoxConfig = options.MistakeBoxConfig)
        options.MistakeBoxSwitch !== undefined && (this.MistakeBoxSwitch = options.MistakeBoxSwitch)
        options.QLVideoSwitch !== undefined && (this.QLVideoSwitch = options.QLVideoSwitch)
        options.LDMistakeBoxSwitch !== undefined && (this.LDMistakeBoxSwitch = options.LDMistakeBoxSwitch)
        options.LDQLVideoSwitch !== undefined && (this.LDQLVideoSwitch = options.LDQLVideoSwitch)
        options.blackCityList !== undefined && (this.blackCityList = options.blackCityList)
        options.blackProvinceList !== undefined && (this.blackProvinceList = options.blackProvinceList)
        options.onClickContinue !== undefined && (this.onClickContinue = options.onClickContinue)
        BlackList.ins.initConfig(this.blackCityList, this.blackProvinceList)
    }

    get_request(url: string, data: any = {}, success, fail) {
        const token = CommonFun.token
        token && (data.token = token)
        version && (data.version = version)
        mini_game && (data.app_token = mini_game)
        this.request(url, data, 'GET', success, fail)
    }

    post_request(url: string, data: any = {}, success, fail) {
        const token = CommonFun.token
        token && (data.token = token)
        version && (data.version = version)
        this.request(url, data, 'POST', success, fail)
    }

    request(url: string, data: any = {}, method = 'GET', success, fail) {
        if (method === 'GET' || method === 'POST') {
            let cha = '?'
            if (url.includes(cha)) {
                cha = '&'
            }
            if (typeof (data) == 'object') {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        url += cha
                        if (cha == '?') {
                            cha = '&'
                        }
                        const element = data[key];
                        url = url + key + '=' + element
                    }
                }
            }
        }
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = {
                        data: JSON.parse(xhr.responseText),
                        statusCode: xhr.status
                    }
                    success(response)
                } else {
                    fail()
                }
            }
        }
        xhr.onerror = e => {
            console.log('request error', e);
            fail && fail()
        };
        xhr.open(method, requestURL + url, true)
        xhr.setRequestHeader('content-type', 'application/json')
        var info = typeof (data) == 'string' ? data : JSON.stringify(data)
        xhr.send(info)
    }

}
function check({ data, sign, timestamps }) {
    return sign === createSign(data, timestamps)
}

function create(data) {
    const timestamps = new Date().getTime()
    return {
        data: JSON.stringify(data),
        sign: createSign(JSON.stringify(data), timestamps),
        timestamps
    }
}

function createSign(data, timestamps) {
    return MD5.hex_md5((data + 'j' + timestamps))
}