import random from "./random"
import configStore from "./configStore"

export async function shareWithAction(action?, config?, sham = true, cb?) {
    if (configStore.enable_share === false && sham) return
    if (!window['wx']) return cb()

    let configInfo = {
        title: '!',
        imageUrl: ''
    }
    const share_query = `openid=${configStore.openid}`

    wx.shareAppMessage({
        ...configInfo,
        query: share_query
    })

    if (lastShareAction !== action) {
        lastShareAction = action
        percent100 = false
    }
    let result
    if (sham) {
        result = await checkShareResult()
        if (!result) {
            wx.showModal({
                title: '提示',
                content: "请分享到不同的群中",
                success(res) {
                    if (res.confirm) {
                        shareWithAction(action, config, sham, cb)
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else {
            console.log('into')
            cb && cb()
        }
    } else {
        //result = true
        cb && cb()
    }
}

let lastShareAction = ''
let percent100 = false


function checkShareResult() {
    if (configStore.enable_share == false) return
    return new Promise((res) => {
        const shareClickTime = new Date().getTime()

        function test() {
            wx.offShow(test)
            const timeCheck = new Date().getTime() - shareClickTime > 2000

            if (timeCheck) {
                if (random.percent(50) || percent100) {
                    percent100 = false
                    res(true)
                } else {
                    percent100 = true
                    res(false)
                }
            } else {
                res(false)
            }
        }

        wx.onShow(test)
    })
}

export function showShareMen() {
    if (!window['wx']) return
    wx.showShareMenu()
    wx.onShareAppMessage(_ => {
        return {
            title: '!',
            imageUrl: '',
            cancel() {
                console.log('share canel');
            }
        }
    })
    wx.updateShareMenu({
        withShareTicket: true
    })
}

export async function share() {
    if (!window['wx']) return
    wx.showShareMenu()
    wx.onShareAppMessage(_ => {
        return {
            title: '!',
            imageUrl: '',
            cancel() {
                console.log('share canel');
            }
        }
    })
    wx.updateShareMenu({
        withShareTicket: true
    })
}


export function onShow(func) {
    if (window['wx']) {
        wx.onShow((data) => {
            func(data)
        })
    }
}

export function onHide(func) {
    if (window['wx']) {
        wx.onHide(() => {
            func()
        })
    }
}

export function setError(onError) {
    window['wx'] && wx.onError(onError)
}

export function showModal(title = '提示', event = '消息', showCancel = true) {
    if (!window['wx']) return
    wx.showModal({
        title: title,
        content: event,
        showCancel: showCancel,
        success(res) {
            if (res.confirm) {
                console.log('用户点击确定')
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        }
    })
}

export function getLaunchOptionsSync() {
    if (window['wx']) {
        return wx.getLaunchOptionsSync()
    } else {
        return {
            scene: 1001,
            query: {
                shareToken: 'shareToken',
                action: 'action'
            },
            referrerInfo: 'any'
        }
    }
}

export function createBanner(adUnitId: string, isLoadingPage: boolean = false) {
    if (!window['wx']) return
    if (0) {
        return {
            destroy() { },
        }
    }
    const { windowHeight, windowWidth } = wx.getSystemInfoSync()

    let banner = wx.createBannerAd({
        adUnitId,
        style: {
            top: 100,
            left: 50,
            width: 300,
        },
    })

    banner.onResize((res) => {

        banner.style.top
            = isLoadingPage
                ? windowHeight - res.height - 70
                : windowHeight - res.height - 25

        banner.style.left = (windowWidth - res.width) / 2
    })

    banner.show((res) => {
        console.log('onshow', res)
    })

    banner.onError((err) => {
        configStore.bannerError = true
        console.log('error', err)
    })

    banner.onLoad((res) => {
        banner.offLoad()
        console.log('load banner sucess', res)
    })


    return banner
}

export function showVideo() {
    if (!window['wx'] || window['tt']) return
    return new Promise((resolve, reject) => {
        const adUnitId = configStore.videoIdList[Math.floor(configStore.videoIdList.length * Math.random())]
        let videoAd = wx.createRewardedVideoAd({ adUnitId })

        videoAd.onError(e => {
            // emitEvent.emit(ON_SHOW_TOSAT, '暂无视频')
            videoAd && videoAd.offClose()
            videoAd = null
            reject(false)
        })

        videoAd.onClose(res => {
            videoAd.offClose()
            cc.game.resume()
            if (res.isEnded) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        })

        videoAd.load().then(() => {
            videoAd.show()
            cc.game.pause()
        }).catch((err) => {
            reject(false)
        })

    })
}

export function login(): any {
    return new Promise((resolve, reject) => {
        wx.login({
            success: resolve,
            fail: reject,
        })
    })
}

export function getStorage(key: string) {
    return wx.getStorageSync(key)
}

export function setStorage(key: string, value: any) {
    return wx.setStorageSync(key, value)
}

export default {
    getStorage,
    setStorage,
    login,
    onShow,
    onHide,
    getLaunchOptionsSync,
    share,
    showShareMen,
    createBanner,
    showVideo,
    shareWithAction,
    showModal
}