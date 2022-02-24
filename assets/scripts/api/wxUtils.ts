import { isWechat } from "./system";
export default class wxUtils {

    public static share_start_time: number
    public static isBanner = true
    public static share_list = [
        {
            "msg": '',
            "url": ''
        }
    ]
    static transpond() {//开启右上角分享
        wx.showShareMenu()
        wx.onShareAppMessage(() => {
          return {
            title: "还记的那张照片吗？",
            // imageUrl: this.defaultShareData.img,
            query: "",
          }
        })
        wx.updateShareMenu({
          withShareTicket: true
        })
      }
    public static share() {
        // console.log(this.queryHandle())
        if (!window['wx']) return
        if (window['tt']) {
            const url = wxUtils.share_list[0].url
            const ti = wxUtils.share_list[0].msg
            window['tt'].onShareAppMessage(() => {
                return {
                    title: ti,
                    imageUrl: url
                }
            })

            window['tt'].showShareMenu()
        }
        else if (window['wx']) {
            wx.showShareMenu()
            const url = wxUtils.share_list[0].url
            const ti = wxUtils.share_list[0].msg
            wx.onShareAppMessage(_ => {
                return {
                    title: ti,
                    imageUrl: url,
                    cancel() {
                        console.log('share canel');
                    }
                }
            })
            wx.updateShareMenu({
                withShareTicket: true
            })
        }

    }

    public static shareWithAction() {
        if (!isWechat) return
        this.share_start_time = new Date().getTime()
        const url = wxUtils.share_list[0].url
        const ti = wxUtils.share_list[0].msg
        wx.shareAppMessage({
            title: ti,
            imageUrl: url,
            cancel() {
                console.log('share canel');
            }
        })
    }
    public static shareGet(): any {
        // return new Promise((resolve, reject) => {
        //     resolve(true)
        // })
        this.shareWithAction()
        return new Promise((resolve, reject) => {
            wx.onShow(function () {
                let share_back_time = new Date().getTime()
                if (share_back_time - wxUtils.share_start_time >= 2000) {
                    let randomNum = wxUtils.getIntByRange(0, 100)
                    if (randomNum < 50) {
                        wx.showToast({
                            title: '试试把游戏介绍给其他朋友!',
                            duration: 1500,
                            icon: "none"
                        })
                        resolve(false)
                    } else {
                        wxUtils.share_start_time = 0;
                        resolve(true)
                    }
                }
                else {
                    wx.showToast({
                        title: '换个群再试试',
                        duration: 1500,
                        icon: "none"
                    })
                    resolve(false)
                }

                // wxUtils.share_start_time =share_back_time;
            }
            )
        })
    }
    public static getIntByRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    public static qglogin(): any {
        return new Promise((resolve, reject) => {
            // qg.login({
            //     success: resolve,
            //     fail: reject,
            // })
        })
    }
    public static swanlogin(): any {
        console.log("进入浏览器111");
        return new Promise((resolve, reject) => {
            // debugger
            // swan.login({
            //     success: resolve,
            //     fail: reject,
            // })
        })
    }


    public static login(): Promise<{ code: string }> {
        if (window['qq'])
            return new Promise((resolve, reject) => {
                // qq.login({
                //     success: resolve,
                //     fail: reject,
                // })
            })
        else
            return new Promise((resolve, reject) => {
                wx.login({
                    success: resolve,
                    fail: reject,
                })
            })
    }

    public exitProgrom() {
        wx.exitMiniProgram()
    }

    public static getStorage(key: string) {
        if (window['swan'])
        return
            // return swan.getStorageSync(key)
        else if (window['qq'])
        return
            // return qq.getStorageSync(key)
        else
            return wx.getStorageSync(key)
    }

    public static setStorage(key: string, value: any) {
        if (window['swan'])
        return
            // return swan.setStorageSync(key, value)
        else if (window['qq'])
        return
            // return qq.setStorageSync(key, value)
        else
            return wx.setStorageSync(key, value)
    }

    public static onHide(func) {
        if (isWechat) {
            wx.onHide(() => {
                // analytics.sendEvent('log_wx onHide')
                func()
            })
        }
    }
    public static showToast(key: string) {
        if (window['tt'])
        return
            // return tt.showToast({
            //     title: key,
            //     icon: 'none'
            // })
        else if (window['swan'])
        return
            // return swan.showToast({
            //     title: key,
            //     icon: 'none'
            // })
        else if (window['qq'])
        return
            // return qq.showToast({
            //     title: key,
            //     icon: 'none'
            // })
        else if (window['wx'])
            return wx.showToast({
                title: key,
                icon: 'none'
            })
        else if (window['qg'])
        return
            // return qg.showToast({
            //     title: key,
            //     icon: 'none'
            // })
        else return console.log(key)
    }

    public static getLaunchOptionsSync() {
        if (window['tt'])
        return
            // return tt.getLaunchOptionsSync()
        else if (window['qq'])
        return
            // return qq.getLaunchOptionsSync()
        else if (window['wx']) {
            return wx.getLaunchOptionsSync()
        } else {
            return {
                scene: 1089,
                query: {
                    shareToken: 'shareToken',
                    action: 'action'
                },
                referrerInfo: {
                    appId: ''
                },
            }
        }
    }

    public static setting(n: cc.Node) {
        if (window['wx']) {
            let winSize = wx.getSystemInfoSync();
            if (winSize.screenWidth / winSize.screenHeight < 0.5) {
                n.y += 100
            }
        }
    }
    public static openRewardVideo() {
         if (window['tt']) {
            let adUnitId = 'gp6mhnh7fk1i9146d7'
            return new Promise((resolve, reject) => {
                let videoAd = window['tt'].createRewardedVideoAd({ adUnitId })

                videoAd.onError(e => {
                    wxUtils.showToast('今日的视频播放次数用完了')
                    console.log(e)
                    reject(3)
                })
                videoAd.onClose(res => {
                    // videoAd.offClose()
                    if (res.isEnded) {
                        resolve(2)
                    }
                    else {
                        wxUtils.showToast('视频未播放完毕')
                        resolve(3)
                    }
                    // res.isEnded ? resolve(true) : resolve(false)
                })

                videoAd.load().then(() => {
                    videoAd.show()
                }).catch((err) => {
                    reject(err.errMsg)
                })

            })
        }
        else if (window['wx']) {
            const adUnitId = 'adunit-2a496a039bd14716'
            return new Promise((resolve, reject) => {
                const videoAd = wx.createRewardedVideoAd({
                    adUnitId,
                })

                videoAd.onError((e) => {
                    console.log('video load error', e)
                    this.showToast('今日的视频播放次数用完了')
                    resolve(1)
                })
                videoAd.onClose((res) => {
                    videoAd.offClose()

                    if (res && res.isEnded) {
                        resolve(2)
                    } else {
                        wxUtils.showToast('视频未播放完毕')

                        resolve(3)
                    }
                })

                videoAd
                    .load()
                    .then(() => {
                        videoAd.show()
                    })
                    .catch((err) => {
                        reject(err.errMsg)
                    })
            })
        }

        else if (!window['wx']) {
            return false
        }
    }

    public static createBanner(adUnitId, isLoadingPage?) {
        if (window['tt']) {
            const { windowHeight, windowWidth } = window['tt'].getSystemInfoSync()

            let banner = window['tt'].createBannerAd({
                adUnitId,
                style: {
                    top: false
                        ? windowHeight - 100 - 70
                        : windowHeight - 100,
                    left: 50,
                    width: 300,
                },
            })

            let updateCD = 1
            banner.onResize((res) => {
                if (updateCD) {
                    banner.style.top
                        = windowHeight - res.height - 10

                    banner.style.left = (windowWidth - res.width) / 2
                    updateCD = 0
                }
            })

            banner.show((res) => {
                console.log('onshow', res)
            })

            banner.onError((err) => {
                console.log('error', err)
            })

            return banner
        }
        else if (window['wx'] && !window['qq'] && !window['tt']) {
            const { windowHeight, windowWidth } = wx.getSystemInfoSync()

            let banner = wx.createBannerAd({
                adUnitId,
                style: {
                    top: 100,
                    left: 50,
                    width: windowWidth,
                },
            })
            banner.show((res) => {

            })

            banner.onResize((res) => {
                let left = (windowWidth - res.width) / 2 + 10
                banner.style.top = windowHeight - windowWidth / 3 + 10;
                banner.style.left = windowWidth / 5 / 2;
                banner.style.width = windowWidth * 4 / 5;
            })
            banner.onError((err) => {
                console.log('error', err)
                wxUtils.isBanner = false
            })

            return banner
        }
        else {
            return null
        }
    }



}
