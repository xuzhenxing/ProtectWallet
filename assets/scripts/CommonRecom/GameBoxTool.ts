import JuHeGame from "./JuHeGame";
import juHeEvent from "./juHeEvent";


export default class GameBoxTool{

    /** 系统信息 */
    private static SystemInfo: any = null;


    static showJuheGame(fun?) {
        // var NotificationCenter = new cc.EventTarget()
        cc.systemEvent.dispatchEvent(new cc.Event.EventCustom(juHeEvent.EVENT_SHOW_JUHE_GAME, true));
        fun && (JuHeGame.e = fun)
    }

    static showHotGame() {
        cc.systemEvent.dispatchEvent(new cc.Event.EventCustom(juHeEvent.EVENT_SHOW_HOT_GAME, true));
    }


    static showfalseDialogGame() {
        cc.systemEvent.dispatchEvent(new cc.Event.EventCustom(juHeEvent.EVENT_SHOW_FALSE_DIALOG_GAME, true));
    }
    /** 加权随机 */
    static shuffle_1(arr: Array<any>) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j].weight > arr[j + 1].weight) {
                    var swap = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = swap;
                }
            }
        }
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            var a = 0
            for (var x = 0; x < arr[i].icon.length; x++) {
                if (arr[i].icon[x].icon_weight)
                    a += arr[i].icon[x].icon_weight
            }
            for (var n = 0; n < arr[i].icon.length; n++) {
                if (arr[i].icon[n].icon_weight) {
                    var randomNumber = arr[i].icon[n].icon_weight / a
                    Math.random() <= randomNumber && (arr[i].icon[0].icon = arr[i].icon[n].icon)
                    return
                }
            }

        }
    }
    /** 按序刷新 */
    static shuffle_2(arr: Array<any>) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j].sort > arr[j + 1].sort) {
                    var swap = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = swap;
                }
            }
        }
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            var a = 0
            for (var x = 0; x < arr[i].icon.length; x++) {
                if (arr[i].icon[x].icon_weight)
                    a += arr[i].icon[x].icon_weight
            }
            for (var n = 0; n < arr[i].icon.length; n++) {
                if (arr[i].icon[x].icon_weight) {
                    var randomNumber = arr[i].icon[x].icon_weight / a
                    Math.random() <= randomNumber && (arr[i].icon[0].icon = arr[i].icon[x].icon)
                    return
                }
            }

        }
    }
    /** 未点击优先曝光 */
    static shuffle_3(arr: Array<any>) {
        this.shuffle_1(arr)
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            if (arr[i].icon.length > 0)
                for (var n = 1; n < arr[i].icon.length; n++) {
                    arr.push({ appid: arr[i].appid, name: arr[i].name, icon: arr[i].icon[n], path: arr[i].path })
                }
        }
    }
    /** 按序展示 */
    static shuffle_4(arr: Array<any>) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j].sort > arr[j + 1].sort) {
                    var swap = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = swap;
                }
            }
        }
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            if (arr[i].icon.length > 0)
                for (var n = 1; n < arr[i].icon.length; n++) {
                    arr.push({ appid: arr[i].appid, name: arr[i].name, icon: arr[i].icon[n], path: arr[i].path })
                }
        }
    }
    /** 按权重展示 */
    static shuffle_5(arr: Array<any>) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j].weight > arr[j + 1].weight) {
                    var swap = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = swap;
                }
            }
        }
    }
    /** 按游戏展示 */
    static shuffle_6(arr: Array<any>) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j].sort > arr[j + 1].sort) {
                    var swap = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = swap;
                }
            }
        }
    }


    /** 加载图片 */
    static loadIcon(url: string) {
        return new Promise((resovle, reject) => {
            cc.loader.load(url, (err, res) => {
                err ? reject(err) : resovle(res)
            })
        })
    }
    static getSystemInfo() {
        return new Promise((resolve, reject) => {
            if (this.SystemInfo == null) {
                if (window["wx"]) {
                    window["wx"].getSystemInfo({
                        success: (res) => {
                            this.SystemInfo = res;
                            resolve(res);
                        },
                        fail: reject,
                    });
                }
            } else {
                resolve(this.SystemInfo);
            }
        })
    }
    static navigate(param: { appid: string, path: string }, success: Function, fail: Function) {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) {
            fail();
            return;
        }
        window["wx"].navigateToMiniProgram({
            appId: param.appid,
            path: param.path,
            success: success,
            fail: fail,
            complete: function () { }
        })
    }
}