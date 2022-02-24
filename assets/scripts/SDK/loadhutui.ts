import configStore from "./configStore"
import { IconItem } from "./IconItem"

export default class loadhutui{
	static initLWSDK_1(e) {//sdk卖量功能开关
        console.log("LWSDK_mailiang:", e)
        console.log(sdk.getButtonVisible('ZJXJJ-SPKG'),'sdk.getButtonVisible' )
        // console.log("LWSDK_mailiang:", JSON.stringify(e))
        if (sdk.getButtonVisible('ZJXJJ-SPKG')) {
            configStore.ZJXJJ_SPKG = e['ZJXJJ-SPKG']
        }
        if (sdk.getButtonVisible('ZJXJJ-DDicon')) {
            configStore.ZJXJJ_DDicon = e['ZJXJJ-DDicon']
		}
		if (sdk.getButtonVisible('ZJXJJ-BKYXTJ')) {
            configStore.ZJXJJ_BKYXTJ = e['ZJXJJ-BKYXTJ']
        }
        if (sdk.getButtonVisible('ZJXJJ-HYRWGDT')) {
            configStore.ZJXJJ_HYRWGDT = e['ZJXJJ-HYRWGDT']
        }
        if (sdk.getButtonVisible('ZJXJJ -JSY6GG')) {
            configStore.ZJXJJ_JSY6GG = e['ZJXJJ -JSY6GG']
        }
        if (sdk.getButtonVisible('ZJXJJ-HYRMTGY')) {
            configStore.ZJXJJ_HYRMTGY = e['ZJXJJ-HYRMTGY']
        }
        if (sdk.getButtonVisible('ZJXJJ-FXCXLBY')) {
            configStore.ZJXJJ_FXCXLBY = e['ZJXJJ-FXCXLBY']
		}
		if (sdk.getButtonVisible('ZJXJJ-SHARE')) {
            configStore.ZJXJJ_SHARE = e['ZJXJJ-SHARE']
		}
		
		if (sdk.getButtonVisible('ZJXJJ-WYWC')) {
            configStore.ZJXJJ_WYWC = e['ZJXJJ-WYWC']
		}
		if (sdk.getButtonVisible('ZJXJJ-QLSP')) {
            configStore.ZJXJJ_QLSP = e['ZJXJJ-QLSP']
        }
		if (sdk.getButtonVisible('ZJXJJ-TSDBZ')) {
            configStore.ZJXJJ_TSDBZ = e['ZJXJJ-TSDBZ']
        }
        if (sdk.getButtonVisible('ZJXJJ-CJJL')) {
            configStore.ZJXJJ_CJJL = e['ZJXJJ-CJJL']
        }
        if (sdk.getButtonVisible('ZJXJJ-GGJL')) {
            configStore.ZJXJJ_GGJL = e['ZJXJJ-GGJL']
        }
        if (sdk.getButtonVisible('ZJXJJ-SMJL')) {
            configStore.ZJXJJ_SMJL = e['ZJXJJ-SMJL']
        }
		if (sdk.getButtonVisible('ZJXJJ-XYG')) {
            configStore.ZJXJJ_XYG = e['ZJXJJ-XYG']
        }
        if (sdk.getButtonVisible('ZJXJJ-SMDL')) {
            configStore.ZJXJJ_SMDL = e['ZJXJJ-SMDL']
        }
        if (sdk.getButtonVisible('ZJXJJ-FH')) {
            configStore.ZJXJJ_FH = e['ZJXJJ-FH']
        }
        if (sdk.getButtonVisible('ZJXJJ-TG')) {
            configStore.ZJXJJ_TG = e['ZJXJJ-TG']
        }
        // if (sdk.getButtonVisible('ZJXJJ-BDJSY')) {
        //     configStore.ZJXJJ_BDJSY = e['ZJXJJ-BDJSY']
        // }
        // if (sdk.getButtonVisible('ZJXJJ-LDQT')) {
        //     configStore.ZJXJJ_LDQT = e['ZJXJJ-LDQT']
        // }
        // if (sdk.getButtonVisible('ZJXJJ-LDWC')) {
        //     configStore.ZJXJJ_LDWC = e['ZJXJJ-LDWC']
        // }
        // if (sdk.getButtonVisible('ZJXJJ-SMJL')) {
        //     configStore.ZJXJJ_SMJL = e['ZJXJJ-SMJL']
        // }
        // adSdk.createBannerAdByAdId({}, "adunit-4887c0a0896238b6")
        // sdk.debug = true
    }
    static onLoaded(){
        // console.log('执行了')
        if (window['wx']) {
			// sdk.debug = true
			var self = this
			var callbackAuth = (userData, configOk) => {
				console.log("sdk.diversionData", sdk.diversionData)
				console.log("callbackAuth:", userData, configOk);
				self.initLWSDK_1(sdk.getConfig1())
				// sdk.Post('https://game.llewan.com:1899/adConfig/common', { uid: sdk.getUser().uid }, (d) => {
				// console.log(d)
				// if (d.d.length > 0)
				// 	for (var i = 0; i < d.d.length; i++) {
				// 		if (d.d[i].data) {
				// 			switch (d.d[i].key) {
                // case 'ZJXJJ-DDicon':
				let DDiconObj = sdk.getAdDataToShow("ZJXJJ-DDicon", 0, 0)
				configStore.strategy_ZJXJJ_DDicon = DDiconObj.strategy
				if (DDiconObj.strategy == 1 || DDiconObj.strategy == 2 || DDiconObj.strategy == 3) {
					for (var x = 0; x < DDiconObj.data.length; x++) {
						DDiconObj.data[x].icondata.forEach(element => {
							// console.log(element)
							if (element.icon) {
								element.icon = element.icon.replace(/res.g.llewan.com/, "res.fdn4i.com")
							}
						});
                        var itme:IconItem = {
							appid: DDiconObj.data[x].appid,
							name: DDiconObj.data[x].name,
							icon: DDiconObj.data[x].icondata,
							path: DDiconObj.data[x].path,
							weight: DDiconObj.data[x].weight,
							sort: DDiconObj.data[x].sort,
							location_id: DDiconObj.data[x].location_id,
							config_id: DDiconObj.data[x].config_id,
							type:DDiconObj.data[x].type
						}
						configStore.gameList_ZJXJJ_DDicon.push(itme)
					}
				}
				else if (DDiconObj.strategy == 4 || DDiconObj.strategy == 5) {
                    // console.log(333333333333)
					for (var x = 0; x < DDiconObj.data.length; x++) {
						var iconArr = []
						if (DDiconObj.data[x].icon) {
							DDiconObj.data[x].icon = DDiconObj.data[x].icon.replace(/res.g.llewan.com/, "res.fdn4i.com")
						}
						iconArr.push({
							icon: DDiconObj.data[x].icon, tx_switch: DDiconObj.data[x].tx_switch, label_switch: DDiconObj.data[x].label_switch,
							iconid: DDiconObj.data[x].iconid,type:DDiconObj.data[x].type
						})
						var itme:IconItem = {
							appid: DDiconObj.data[x].appid,
							name: DDiconObj.data[x].name,
							icon: iconArr,
							path: DDiconObj.data[x].path,
							weight: DDiconObj.data[x].weight,
							sort: DDiconObj.data[x].sort,
							location_id: DDiconObj.data[x].location_id,
							config_id: DDiconObj.data[x].config_id,
							type:DDiconObj.data[x].type,
						}
						configStore.gameList_ZJXJJ_DDicon.push(itme)
					}
				}
				// console.log("configStore.gameList_ZJXJJ_DDicon", configStore.gameList_ZJXJJ_DDicon)
				// break;
				// case 'ZJXJJ-TJQ':
				let HYRWGDTObj = sdk.getAdDataToShow("ZJXJJ-HYRWGDT", 0, 0)
				configStore.strategy_ZJXJJ_HYRWGDT = HYRWGDTObj.strategy
				if (HYRWGDTObj.strategy == 1 || HYRWGDTObj.strategy == 2 || HYRWGDTObj.strategy == 3) {
					if (HYRWGDTObj.data)
						for (var x = 0; x < HYRWGDTObj.data.length; x++) {
							HYRWGDTObj.data[x].icondata.forEach(element => {
								if (element.icon) {
									element.icon = element.icon.replace(/res.g.llewan.com/, "res.fdn4i.com")
								}
							});
							var itme:IconItem = {
								appid: HYRWGDTObj.data[x].appid,
								name: HYRWGDTObj.data[x].name,
								icon: HYRWGDTObj.data[x].icondata,
								path: HYRWGDTObj.data[x].path,
								weight: HYRWGDTObj.data[x].weight,
								sort: HYRWGDTObj.data[x].sort,
								location_id: HYRWGDTObj.data[x].location_id,
								config_id: HYRWGDTObj.data[x].config_id,
								type:HYRWGDTObj.data[x].type,
							}
							configStore.gameList_ZJXJJ_HYRWGDT.push(itme)
						}
				}
				else if (HYRWGDTObj.strategy == 4 || HYRWGDTObj.strategy == 5) {
					for (var x = 0; x < HYRWGDTObj.data.length; x++) {
						if (HYRWGDTObj.data[x].icon) {
							HYRWGDTObj.data[x].icon = HYRWGDTObj.data[x].icon.replace(/res.g.llewan.com/, "res.fdn4i.com")
						}
						var iconArr = []
						iconArr.push({
							icon: HYRWGDTObj.data[x].icon, tx_switch: HYRWGDTObj.data[x].tx_switch, label_switch: HYRWGDTObj.data[x].label_switch
							, iconid: HYRWGDTObj.data[x].iconid,type: HYRWGDTObj.data[x].type
						})
						var itme:IconItem = {
							appid: HYRWGDTObj.data[x].appid,
							name: HYRWGDTObj.data[x].name,
							icon: iconArr,
							path: HYRWGDTObj.data[x].path,
							weight: HYRWGDTObj.data[x].weight,
							sort: HYRWGDTObj.data[x].sort,
							location_id: HYRWGDTObj.data[x].location_id,
							config_id: HYRWGDTObj.data[x].config_id,
							type: HYRWGDTObj.data[x].type
						}
						configStore.gameList_ZJXJJ_HYRWGDT.push(itme)
					}
				}
				// console.log("configStore.gameList_ZJXJJ_HYRWGDT", configStore.gameList_ZJXJJ_HYRWGDT)
				// break;
				// case 'ZJXJJ-BKYXTJ':
				let BKYXTJObj = sdk.getAdDataToShow("ZJXJJ-BKYXTJ", 0, 0)
				configStore.strategy_ZJXJJ_BKYXTJ = BKYXTJObj.strategy
				if (BKYXTJObj.strategy == 1 || BKYXTJObj.strategy == 2 || BKYXTJObj.strategy == 3) {
					if (BKYXTJObj.data)
						for (var x = 0; x < BKYXTJObj.data.length; x++) {
							BKYXTJObj.data[x].icondata.forEach(element => {
								if (element.icon) {
									element.icon = element.icon.replace(/res.g.llewan.com/, "res.fdn4i.com")
								}
							});
							var itme:IconItem = {
								appid: BKYXTJObj.data[x].appid,
								name: BKYXTJObj.data[x].name,
								icon: BKYXTJObj.data[x].icondata,
								path: BKYXTJObj.data[x].path,
								weight: BKYXTJObj.data[x].weight,
								sort: BKYXTJObj.data[x].sort,
								location_id: BKYXTJObj.data[x].location_id,
								config_id: BKYXTJObj.data[x].config_id,
								type:BKYXTJObj.data[x].type
							}
							configStore.gameList_ZJXJJ_BKYXTJ.push(itme)
						}
				}
				else if (BKYXTJObj.strategy == 4 || BKYXTJObj.strategy == 5) {

					for (var x = 0; x < BKYXTJObj.data.length; x++) {
						var iconArr = []
						if (BKYXTJObj.data[x].icon) {
							BKYXTJObj.data[x].icon = BKYXTJObj.data[x].icon.replace(/res.g.llewan.com/, "res.fdn4i.com")
						}
						iconArr.push({
							icon: BKYXTJObj.data[x].icon, tx_switch: BKYXTJObj.data[x].tx_switch, label_switch: BKYXTJObj.data[x].label_switch
							, iconid: BKYXTJObj.data[x].iconid,type:BKYXTJObj.data[x].type
						})
						var itme:IconItem = {
							appid: BKYXTJObj.data[x].appid,
							name: BKYXTJObj.data[x].name,
							icon: iconArr,
							path: BKYXTJObj.data[x].path,
							weight: BKYXTJObj.data[x].weight,
							sort: BKYXTJObj.data[x].sort,
							location_id: BKYXTJObj.data[x].location_id,
							config_id: BKYXTJObj.data[x].config_id,
							type:BKYXTJObj.data[x].type
						}
						configStore.gameList_ZJXJJ_BKYXTJ.push(itme)
					}
				}
				// console.log("configStore.gameList_ZJXJJ_BKYXTJ", configStore.gameList_ZJXJJ_BKYXTJ)
				// break;
				// case 'ZJXJJ-JSY6GG':
				// console.log("sdk.ZJXJJ -JSY6GG", sdk.getAdDataToShow("ZJXJJ-JSY6GG", 0, 0))
				let JSY6GGobj = sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0)
				// console.log("sdk.ZJXJJ -JSY6GG", JSY6GGobj)
				configStore.strategy_ZJXJJ_JSY6GG = sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).strategy
				if (sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).strategy == 1 || sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).strategy == 2 || sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).strategy == 3) {
					if (sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data)
						for (var x = 0; x < sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data.length; x++) {
							sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].icondata.forEach(element => {
								if (element.icon) {
									element.icon = element.icon.replace(/res.g.llewan.com/, "res.fdn4i.com")
								}
							});
							var itme:IconItem = {
								appid: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].appid,
								name: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].name,
								icon: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].icondata,
								path: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].path,
								weight: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].weight,
								sort: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].sort,
								location_id: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].location_id,
								config_id: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].config_id,
								type:sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].type
							}
							configStore.gameList_ZJXJJ_JSY6GG.push(itme)
						}
				}
				else if (sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).strategy == 4 || sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).strategy == 5) {
					for (var x = 0; x < sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data.length; x++) {
						var iconArr = []
						if (sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].name) {
							sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].icon = sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].name.replace(/res.g.llewan.com/, "res.fdn4i.com")
						}
						iconArr.push({
							icon: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].icon, tx_switch: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].tx_switch, label_switch: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].label_switch
							, iconid: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].iconid,type:sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].type
						})

						var itme:IconItem = {
							appid: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].appid,
							name: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].name,
							icon: iconArr,
							path: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].path,
							weight: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].weight,
							sort: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].sort,
							location_id: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].location_id,
							config_id: sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].config_id,
							type:sdk.getAdDataToShow("ZJXJJ -JSY6GG", 0, 0).data[x].type
						}
						configStore.gameList_ZJXJJ_JSY6GG.push(itme)
					}
				}
				// console.log("configStore.gameList_ZJXJJ_JSY6GG", configStore.gameList_ZJXJJ_JSY6GG)
				let FXCXLBYObj = sdk.getAdDataToShow("ZJXJJ-FXCXLBY", 0, 0)
				configStore.strategy_ZJXJJ_FXCXLBY = FXCXLBYObj.strategy
				if (FXCXLBYObj.strategy == 1 || FXCXLBYObj.strategy == 2 || FXCXLBYObj.strategy == 3) {
					if (FXCXLBYObj.data)
						for (var x = 0; x < FXCXLBYObj.data.length; x++) {
							FXCXLBYObj.data[x].icondata.forEach(element => {
								if (element.icon) {
									element.icon = element.icon.replace(/res.g.llewan.com/, "res.fdn4i.com")
								}
							});
							var itme:IconItem = {
								appid: FXCXLBYObj.data[x].appid,
								name: FXCXLBYObj.data[x].name,
								icon: FXCXLBYObj.data[x].icondata,
								path: FXCXLBYObj.data[x].path,
								weight: FXCXLBYObj.data[x].weight,
								sort: FXCXLBYObj.data[x].sort,
								location_id: FXCXLBYObj.data[x].location_id,
								config_id: FXCXLBYObj.data[x].config_id,
								type:FXCXLBYObj.data[x].type
							}
							configStore.gameList_ZJXJJ_FXCXLBY.push(itme)
						}
				}
				else if (FXCXLBYObj.strategy == 4 || FXCXLBYObj.strategy == 5) {
					for (var x = 0; x < FXCXLBYObj.data.length; x++) {
						if (FXCXLBYObj.data[x].icon) {
							FXCXLBYObj.data[x].icon = FXCXLBYObj.data[x].icon.replace(/res.g.llewan.com/, "res.fdn4i.com")
						}
						var iconArr = []
						iconArr.push({
							icon: FXCXLBYObj.data[x].icon, tx_switch: FXCXLBYObj.data[x].tx_switch, label_switch: FXCXLBYObj.data[x].label_switch
							, iconid: FXCXLBYObj.data[x].iconid,type:FXCXLBYObj.data[x].type
						})
						var itme:IconItem = {
							appid: FXCXLBYObj.data[x].appid,
							name: FXCXLBYObj.data[x].name,
							icon: iconArr,
							path: FXCXLBYObj.data[x].path,
							weight: FXCXLBYObj.data[x].weight,
							sort: FXCXLBYObj.data[x].sort,
							location_id: FXCXLBYObj.data[x].location_id,
							config_id: FXCXLBYObj.data[x].config_id,
							type:FXCXLBYObj.data[x].type
						}
						configStore.gameList_ZJXJJ_FXCXLBY.push(itme)
					}
				}
				// console.log("configStore.gameList_ZJXJJ_FXCXLBY", configStore.gameList_ZJXJJ_FXCXLBY)
				// console.log("sdk.ZJXJJ_HYRWGDT",sdk.getAdDataToShow("ZJXJJ_HYRWGDT",0,0))
				// let HYRWGDTObj = sdk.getAdDataToShow("ZJXJJ_HYRWGDT",0,0)
				// break;
				// default:
				// console.log('暂无配置')
				// break;

				// }

				//加载IDE指定的场景
				// GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
				// game.manager = new GameMgr(), game.manager.start()
				// // , new sendData();
				// let e = new LogingLayer();
				// game.stage.pageLayer.addChild(e);
				// if (window['wx']) {
				// 	wx.onHide(() => {
				// 		console.log("微信回到后台")
				// 		actio()
				// 	})
				// }
				// this.initShare()
				// })
				var callback = () => {
				}
				var cancel = () => {
				}
				var fail = () => {
				}
				sdk.onShareAppMessage({
					type: 0,
					success: function () {
						//成功回调
					},
					fail: function () {
						//失败回调
					}
				})
				if (window["wx"]) {
					wx.onHide(() => {
						// heartbeatSchedule.emitEvent()
					})
					wx.onShow(() => {
						// SoundManager.resetVolume()
					})
				}
			}

			sdk.WeChatLoginNoAuth({
				game: 'zhengjiuxiaojiejie-weixin',
				version: '1.1.1',
				dev_platform: 'weixin',
				ald_key: '2205e0715f5b69b1354ef01a14697a29',
				changeHost: true,
				callback: callbackAuth
			})
		} 
    }
}