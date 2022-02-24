class configStore {
    public openid = ''
    public token = ''
    public platform = ''
    // public offLineTime = 0
    // public loginTime: number
    public is_new = false
    // public showVideo = true
    public enable_share = false
    // public enable_ad = false
    // public version = 26
    public bannerError = false
    public videoIdList = []
    public is_newHotGame = false
    //互推id
    public numHuTui = 0
    //开关
    public ZJXJJ_SPKG = 0//视频开关
    public ZJXJJ_SHARE = 0//分享开关
    public ZJXJJ_DDicon = 0 //抖动Icon
    public ZJXJJ_HYRWGDT = 0//好友热玩滚动条
    public ZJXJJ_BKYXTJ = 0//爆款游戏推荐
    public ZJXJJ_JSY6GG = 0//结算页六宫格
    public ZJXJJ_HYRMTGY = 0//好友在玩热门推荐推广页
    public ZJXJJ_FXCXLBY = 0//仿小程序列表页
    public ZJXJJ_WYWC = 0//位移误触
    // public SSZM_BDJSY = 0//爆灯结算页
    public ZJXJJ_QLSP = 0//强拉视频
    // public SSZM_LDWC = 0//连点误触
    // public SSZM_SMJL = 0//神秘奖励

    //权重
    public strategy_ZJXJJ_TSDBZ = 4//提示灯不足
    public strategy_ZJXJJ_CJJL = 4//超级奖励
    public strategy_ZJXJJ_GGJL = 4//过关奖励
    public strategy_ZJXJJ_SMJL = 4//神秘奖励
    public strategy_ZJXJJ_XYG = 4//下一关
    public strategy_ZJXJJ_SMDL = 4//神秘大礼
    public strategy_ZJXJJ_FH  = 4//复活
    public strategy_ZJXJJ_TG  = 4//跳过
    public strategy_ZJXJJ_WYWC = 4//位移误触
    // 互推列表
    public gameList_ZJXJJ_DDicon = []//抖动icon
    public gameList_ZJXJJ_HYRWGDT = []//好友热玩滚动条
    public gameList_ZJXJJ_BKYXTJ = []//爆款游戏推荐
    public gameList_ZJXJJ_JSY6GG = []//结算页六宫格
    public gameList_ZJXJJ_HYRMTGY = []//好友在玩热门推荐推广页
    public gameList_ZJXJJ_FXCXLBY = []//仿小程序列表页

    public strategy_ZJXJJ_DDicon = 4//提示灯不足
    public strategy_ZJXJJ_HYRWGDT = 4//超级奖励
    public strategy_ZJXJJ_BKYXTJ = 4//过关奖励
    public strategy_ZJXJJ_JSY6GG = 4//神秘奖励
    public strategy_ZJXJJ_HYRMTGY = 4//下一关
    public strategy_ZJXJJ_FXCXLBY = 4//神秘大礼

    public ZJXJJ_TSDBZ = 0//提示灯不足
    public ZJXJJ_CJJL = 0//超级奖励
    public ZJXJJ_GGJL = 0//过关奖励
    public ZJXJJ_SMJL = 0//神秘奖励
    public ZJXJJ_XYG = 0//下一关
    public ZJXJJ_SMDL = 0//神秘大礼
    public ZJXJJ_FH  = 0//复活
    public ZJXJJ_TG  = 0//跳过

    public ifTry = true
    public showDaily = false
    public ifWuChu = true
    public ifFirstWuChu = true

    public key = 3
}

export default new configStore()