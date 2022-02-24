import * as SdkManager from "./SdkManager"

const { property, ccclass } = cc._decorator

@ccclass
export class MistakeBox extends cc.Component {
    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null

    @property(cc.Node)
    planANode: cc.Node = null

    @property(cc.Node)
    planBNode: cc.Node = null

    callback = null//奖励
    clickSuccessed = false
    Type = 0
    progress = 0
    totalProgress = 1
    seccessProgress = 0.55
    reduceSpeed = 0.25
    intervalTime = 0.1
    _interval = 0
    call = null
    rewardCoin = 100
    isOver = false
    isShowBanner = false

    onEnable() {
        if (SdkManager.default.sdkMgr.isShowBanner) {
            this.isShowBanner = true
            SdkManager.default.hideBanner()
        }
        this.setSuccessProgress()
        this.progress = 0
        this.progressBar.progress = 0
        this.planANode.active = true
        this.planBNode.active = false
       

    }
    initType(e, call) {
        this.Type = e
        this.call = call
    }
    setSuccessProgress() {
        this.seccessProgress = 0.55 + Math.random() * 0.05
    }
    countReduceSpeed() {
        if (this._interval > this.intervalTime) {
            this.reduceSpeed = 0.4
        } else {
            this.reduceSpeed = 0.25
        }
    }
    update(dt) {
        if (this.progress > 0 && !this.clickSuccessed) {
            this.progressBar.progress = this.progress
            this._interval += dt
            this.countReduceSpeed()
            this.progress -= this.reduceSpeed * dt
        }
    }
    planA() {
        SdkManager.default.showBanner()
        setTimeout(() => {
            SdkManager.default.hideBanner()
            this.close(true)
        }, 1500);
    }
    planB() {
        this.planANode.active = false
        this.planBNode.active = true
    }
    onClickVideo() {
        SdkManager.default.doVideo(() => {
            this.close(true)
        })
    }
    onClickGet() {
        this.close(false)
    }


    onClicked() {
        this._interval = 0
        this.progress += (this.totalProgress) * 0.14
        if (this.progress >= this.seccessProgress) {
            if (this.isOver) return
            this.isOver = true
            if (this.Type === 0) {
                this.planA()
            } else {
                this.planB()
            }

        }

    }
    onClickClose() {
        this.close(false)
    }

    close(bol) {
        this.call && this.call(bol)
        if (this.isShowBanner) {
            SdkManager.default.showBanner()
        }
        this.node.destroy()
    }

}