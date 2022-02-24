require("ConstModName");
        var n = require("ConstModRes");

        cc.Class({
            statics: {
                ModuleToResourceDic: null,
                IniUIModules: function IniUIModules() {
                    this.ModuleToResourceDic = [], this.ModuleToResourceDic[n.MOD_BeginView] = n.MOD_BeginView, this.ModuleToResourceDic[n.MOD_GameLoading] = n.MOD_GameLoading, this.ModuleToResourceDic[n.MOD_GameView] = n.MOD_GameView, this.ModuleToResourceDic[n.MOD_LevelFailView] = n.MOD_LevelFailView, this.ModuleToResourceDic[n.MOD_LevelView] = n.MOD_LevelView, this.ModuleToResourceDic[n.MOD_MissionView] = n.MOD_MissionView, this.ModuleToResourceDic[n.MOD_SettingView] = n.MOD_SettingView, this.ModuleToResourceDic[n.MOD_TipsView] = n.MOD_TipsView, this.ModuleToResourceDic[n.MOD_LuckBagView] = n.MOD_LuckBagView, this.ModuleToResourceDic[n.MOD_ShowRewardView] = n.MOD_ShowRewardView;
                },
                RegisterAllModules: function RegisterAllModules() {
                    this.IniUIModules();
                    var t = require("BaseMediator");
                    gm.UIManager.RegisterMediator(n.MOD_BeginView, new t()), gm.UIManager.RegisterMediator(n.MOD_GameLoading, new t()), gm.UIManager.RegisterMediator(n.MOD_GameView, new t()), gm.UIManager.RegisterMediator(n.MOD_LevelFailView, new t()), gm.UIManager.RegisterMediator(n.MOD_LevelView, new t()), gm.UIManager.RegisterMediator(n.MOD_MissionView, new t()), gm.UIManager.RegisterMediator(n.MOD_SettingView, new t()), gm.UIManager.RegisterMediator(n.MOD_TipsView, new t()), gm.UIManager.RegisterMediator(n.MOD_LuckBagView, new t()), gm.UIManager.RegisterMediator(n.MOD_ShowRewardView, new t());
                }
            }
        })
/*ModulesLib: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "83aaexbC/BCM5lsJz9fKoS8", "ModulesLib");
        a(e("ConstModName"));
        var n = a(e("ConstModRes"));

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            statics: {
                ModuleToResourceDic: null,
                IniUIModules: function IniUIModules() {
                    this.ModuleToResourceDic = [], this.ModuleToResourceDic[n.default.MOD_BeginView] = n.default.MOD_BeginView, this.ModuleToResourceDic[n.default.MOD_GameLoading] = n.default.MOD_GameLoading, this.ModuleToResourceDic[n.default.MOD_GameView] = n.default.MOD_GameView, this.ModuleToResourceDic[n.default.MOD_LevelFailView] = n.default.MOD_LevelFailView, this.ModuleToResourceDic[n.default.MOD_LevelView] = n.default.MOD_LevelView, this.ModuleToResourceDic[n.default.MOD_MissionView] = n.default.MOD_MissionView, this.ModuleToResourceDic[n.default.MOD_SettingView] = n.default.MOD_SettingView, this.ModuleToResourceDic[n.default.MOD_TipsView] = n.default.MOD_TipsView, this.ModuleToResourceDic[n.default.MOD_LuckBagView] = n.default.MOD_LuckBagView, this.ModuleToResourceDic[n.default.MOD_ShowRewardView] = n.default.MOD_ShowRewardView;
                },
                RegisterAllModules: function RegisterAllModules() {
                    this.IniUIModules();
                    var t = e("BaseMediator");
                    gm.UIManager.RegisterMediator(n.default.MOD_BeginView, new t()), gm.UIManager.RegisterMediator(n.default.MOD_GameLoading, new t()), gm.UIManager.RegisterMediator(n.default.MOD_GameView, new t()), gm.UIManager.RegisterMediator(n.default.MOD_LevelFailView, new t()), gm.UIManager.RegisterMediator(n.default.MOD_LevelView, new t()), gm.UIManager.RegisterMediator(n.default.MOD_MissionView, new t()), gm.UIManager.RegisterMediator(n.default.MOD_SettingView, new t()), gm.UIManager.RegisterMediator(n.default.MOD_TipsView, new t()), gm.UIManager.RegisterMediator(n.default.MOD_LuckBagView, new t()), gm.UIManager.RegisterMediator(n.default.MOD_ShowRewardView, new t());
                }
            }
        }), 
*/