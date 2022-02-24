

export default class BlackList {
    static _ins = null
    static get ins() {
        return this._ins || (this._ins = new BlackList), this._ins
    }
    static positionUrl = ""
    static blackCityList = ['香港特别行政区', '天津市']
    static blackProvinceList = ['广东省']
    private isBlack = false
    scene = 0

    get IsBlack() {
        return this.isBlack
    }

    initConfig(blackcitylist, blackprovincelist) {
        BlackList.blackCityList = blackcitylist
        BlackList.blackProvinceList = blackprovincelist
        this.init()
        console.log("initConfig-----", BlackList.blackCityList, BlackList.blackProvinceList)
    }
    init() {
        let self = this
        let success = function (res) {
            self.checkBlack(res)
        }
        let fail = function (res) {

        }
        this.position(success, fail)
    }

    checkBlack(res) {
        if (res.province == "" || res.province == "中国") {
            this.isBlack = true
        } else {
            if (BlackList.blackProvinceList['includes'](res.province)) {
                this.isBlack = true
            }
            if (BlackList.blackCityList['includes'](res.city)) {
                this.isBlack = true
            }
        }
        console.log("黑名单----", this.isBlack, res, res["province"], res.city, this.scene)
    }


    position = (success, fail) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", BlackList.positionUrl, true);
        xhr.responseType = "text";
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('x-api-token', 'application/json')
        xhr.setRequestHeader('x-api-userid', 'application/json')
        xhr.onload = () => {
            if (xhr.status == 200 || xhr.status == 304) {
                success && success(JSON.parse(xhr.responseText))
            } else {
                fail && fail()
            }
        };
        xhr.timeout = 5000
        // 请求结束
        xhr.onloadend = e => {
            console.log('request loadend');
        };
        // 请求出错
        xhr.onerror = e => {
            console.log('request error');
        };
        // 请求超时
        xhr.ontimeout = e => {
            console.log('request timeout');
        };
        xhr.send()
    }
}








