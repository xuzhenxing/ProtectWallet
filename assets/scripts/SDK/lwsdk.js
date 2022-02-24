var errMsg = {
  '100': {
    code: 100,
    msg: '请求参数为空。'
  },
  '101': {
    code: 101,
    msg: '跳转小程序appId不能为空。'
  },
  '102': {
    code: 102,
    msg: '初始化失败。'
  },
  '103': {
    code: 103,
    msg: '"埋点没有数据上传!"'
  },
  '104': {
    code: 104,
    msg: '"用户拒绝授权!"'
  },
  '105': {
    code: 105,
    msg: '"更新用户信息失败!"'
  },
  '200': {
    code: 200,
    msg: '接口返回数据为空。'
  },
  '201': {
    code: 201,
    msg: '接口请求失败。'
  },
  '1000': {
    code: 1000,
    msg: '调用了指定平台api，请发布到相应平台运行。'
  }
};
var sourceURI = {
  regUser: '/WxLogin/UserReg',
  share: "/Share/common",
  config: '/Config/common',
  set: "/game/set",
  get: "/game/get",
  time: "/game/time",
  Logcommon: "/Log/common",
  Auth: '/WxLogin/Auth',
  ScoreUpdate: '/Rank/ScoreUpdate',
  GetWorldRank: '/Rank/GetWorldRank',
}
/**
 * 乐玩品牌SDK
 */
class LWSDK {
  env = 'pro';
  version = '1.0.0'; //.乐玩sdk的版本号
  debug = false;
  ipConfig = {
    pro: {
      ip1: 'https://login.llewan.com:1799',
      ip2: "https://game.llewan.com:1899",
      ip3: "https://log.llewan.com:1999",
      ip4: "https://res.llewan.com:2099",
    },
    dev: {
      ip1: 'https://login.llewan.com:1799',
      ip2: "https://game.llewan.com:1899",
      ip3: "https://log.llewan.com:1999",
      ip4: "https://res.llewan.com:2099",
    }
  };
  md5_key = 'game@lewan2020';
  sdk_conf = {
    //.游戏唯一标识
    game: '',
    //.当前游戏版本      
    version: '',
    //.开发平台:由sdk维护者确定,weixin/toutiao/qq/app,接入游戏的技术不需要修改
    dev_platform: 'weixin',
    //.接口加密key,切勿修改
    md5_key: '$5dfjr$%dsadsfdsii',
    default_upload_row_count: 20,
    default_upload_interval: 120,
    //游戏在线统计时长开启与关闭。true为开启,false为关闭
    game_online: false,
    //分享调起时间设置
    share_time_limit: 2,
    //默认分享文案
    default_shareInfo: {
      imageUrl: '',
      query: null,
      sysid: -1,
      title: '和我一起来玩游戏吧！',
      type: 0
    },
    canShare: false, //是否需要支持分享功能
  };
  ConfigData = {
    "config1": null,
    "config2": null,
    "config3": null,
    "config4": null,
  };
  ShareList = [];
  shareStartTime = 0;
  shareEnterChannel = "wxgamecid=CCBgAAoXkpQY8Ls-dS0ugl&source_id=30022";
  initFlag = 0;

  get ip1() {
    return this.ipConfig[this.env].ip1;
  }

  get ip2() {
    return this.ipConfig[this.env].ip2;
  }

  get ip3() {
    return this.ipConfig[this.env].ip3;
  }

  get ip4() {
    return this.ipConfig[this.env].ip4;
  }

  md5 = function (v) {
    function m(c, b) {
      var a = (c & 65535) + (b & 65535);
      return (c >> 16) + (b >> 16) + (a >> 16) << 16 | a & 65535
    }

    function h(c, b, a, d, e, f) {
      c = m(m(b, c), m(d, f));
      return m(c << e | c >>> 32 - e, a)
    }

    function g(c, b, a, d, e, f, g) {
      return h(b & a | ~b & d, c, b, e, f, g)
    }

    function k(c, b, a, d, e, f, g) {
      return h(b & d | a & ~d, c, b, e, f, g)
    }

    function l(c, b, a, d, e, f, g) {
      return h(a ^ (b | ~d), c, b, e, f, g)
    }

    function n(c, b) {
      c[b >> 5] |= 128 << b % 32;
      c[(b + 64 >>> 9 << 4) + 14] = b;
      var a = 1732584193,
        d = -271733879,
        e = -1732584194,
        f = 271733878;
      for (b = 0; b < c.length; b += 16) {
        var n = a;
        var p = d;
        var q = e;
        var r = f;
        a = g(a, d, e, f, c[b], 7, -680876936);
        f = g(f, a, d, e, c[b + 1], 12, -389564586);
        e = g(e, f, a, d, c[b + 2], 17, 606105819);
        d = g(d, e, f, a, c[b + 3], 22, -1044525330);
        a = g(a, d, e, f, c[b + 4], 7, -176418897);
        f = g(f, a, d, e, c[b + 5], 12, 1200080426);
        e = g(e, f, a, d, c[b + 6], 17, -1473231341);
        d = g(d, e, f, a, c[b + 7], 22, -45705983);
        a = g(a, d, e, f, c[b + 8], 7, 1770035416);
        f = g(f, a, d, e, c[b + 9], 12, -1958414417);
        e = g(e, f, a, d, c[b + 10], 17, -42063);
        d = g(d, e, f, a, c[b + 11], 22, -1990404162);
        a = g(a, d, e, f, c[b + 12], 7, 1804603682);
        f = g(f, a, d, e, c[b + 13], 12, -40341101);
        e = g(e, f, a, d, c[b + 14], 17,
          -1502002290);
        d = g(d, e, f, a, c[b + 15], 22, 1236535329);
        a = k(a, d, e, f, c[b + 1], 5, -165796510);
        f = k(f, a, d, e, c[b + 6], 9, -1069501632);
        e = k(e, f, a, d, c[b + 11], 14, 643717713);
        d = k(d, e, f, a, c[b], 20, -373897302);
        a = k(a, d, e, f, c[b + 5], 5, -701558691);
        f = k(f, a, d, e, c[b + 10], 9, 38016083);
        e = k(e, f, a, d, c[b + 15], 14, -660478335);
        d = k(d, e, f, a, c[b + 4], 20, -405537848);
        a = k(a, d, e, f, c[b + 9], 5, 568446438);
        f = k(f, a, d, e, c[b + 14], 9, -1019803690);
        e = k(e, f, a, d, c[b + 3], 14, -187363961);
        d = k(d, e, f, a, c[b + 8], 20, 1163531501);
        a = k(a, d, e, f, c[b + 13], 5, -1444681467);
        f = k(f, a, d, e, c[b +
          2], 9, -51403784);
        e = k(e, f, a, d, c[b + 7], 14, 1735328473);
        d = k(d, e, f, a, c[b + 12], 20, -1926607734);
        a = h(d ^ e ^ f, a, d, c[b + 5], 4, -378558);
        f = h(a ^ d ^ e, f, a, c[b + 8], 11, -2022574463);
        e = h(f ^ a ^ d, e, f, c[b + 11], 16, 1839030562);
        d = h(e ^ f ^ a, d, e, c[b + 14], 23, -35309556);
        a = h(d ^ e ^ f, a, d, c[b + 1], 4, -1530992060);
        f = h(a ^ d ^ e, f, a, c[b + 4], 11, 1272893353);
        e = h(f ^ a ^ d, e, f, c[b + 7], 16, -155497632);
        d = h(e ^ f ^ a, d, e, c[b + 10], 23, -1094730640);
        a = h(d ^ e ^ f, a, d, c[b + 13], 4, 681279174);
        f = h(a ^ d ^ e, f, a, c[b], 11, -358537222);
        e = h(f ^ a ^ d, e, f, c[b + 3], 16, -722521979);
        d = h(e ^ f ^ a, d, e, c[b + 6], 23,
          76029189);
        a = h(d ^ e ^ f, a, d, c[b + 9], 4, -640364487);
        f = h(a ^ d ^ e, f, a, c[b + 12], 11, -421815835);
        e = h(f ^ a ^ d, e, f, c[b + 15], 16, 530742520);
        d = h(e ^ f ^ a, d, e, c[b + 2], 23, -995338651);
        a = l(a, d, e, f, c[b], 6, -198630844);
        f = l(f, a, d, e, c[b + 7], 10, 1126891415);
        e = l(e, f, a, d, c[b + 14], 15, -1416354905);
        d = l(d, e, f, a, c[b + 5], 21, -57434055);
        a = l(a, d, e, f, c[b + 12], 6, 1700485571);
        f = l(f, a, d, e, c[b + 3], 10, -1894986606);
        e = l(e, f, a, d, c[b + 10], 15, -1051523);
        d = l(d, e, f, a, c[b + 1], 21, -2054922799);
        a = l(a, d, e, f, c[b + 8], 6, 1873313359);
        f = l(f, a, d, e, c[b + 15], 10, -30611744);
        e = l(e, f, a,
          d, c[b + 6], 15, -1560198380);
        d = l(d, e, f, a, c[b + 13], 21, 1309151649);
        a = l(a, d, e, f, c[b + 4], 6, -145523070);
        f = l(f, a, d, e, c[b + 11], 10, -1120210379);
        e = l(e, f, a, d, c[b + 2], 15, 718787259);
        d = l(d, e, f, a, c[b + 9], 21, -343485551);
        a = m(a, n);
        d = m(d, p);
        e = m(e, q);
        f = m(f, r)
      }
      return [a, d, e, f]
    }

    function q(c) {
      var b, a = "",
        d = 32 * c.length;
      for (b = 0; b < d; b += 8) a += String.fromCharCode(c[b >> 5] >>> b % 32 & 255);
      return a
    }

    function p(c) {
      var b, a = [];
      a[(c.length >> 2) - 1] = void 0;
      for (b = 0; b < a.length; b += 1) a[b] = 0;
      var d = 8 * c.length;
      for (b = 0; b < d; b += 8) a[b >> 5] |= (c.charCodeAt(b / 8) & 255) <<
        b % 32;
      return a
    }

    function r(c) {
      return q(n(p(c), 8 * c.length))
    }

    function t(c, b) {
      var a = p(c),
        d = [],
        e = [];
      d[15] = e[15] = void 0;
      16 < a.length && (a = n(a, 8 * c.length));
      for (c = 0; 16 > c; c += 1) d[c] = a[c] ^ 909522486, e[c] = a[c] ^ 1549556828;
      b = n(d.concat(p(b)), 512 + 8 * b.length);
      return q(n(e.concat(b), 640))
    }

    function u(c) {
      var b = "",
        a;
      for (a = 0; a < c.length; a += 1) {
        var d = c.charCodeAt(a);
        b += "0123456789abcdef".charAt(d >>> 4 & 15) + "0123456789abcdef".charAt(d & 15)
      }
      return b
    }
    return function (c, b, a) {
      b ? a ? c = t(unescape(encodeURIComponent(b)), unescape(encodeURIComponent(c))) :
        (c = t(unescape(encodeURIComponent(b)), unescape(encodeURIComponent(c))), c = u(c)) : c = a ? r(unescape(encodeURIComponent(c))) : u(r(unescape(encodeURIComponent(c))));
      return c
    }
  }(this);

  /**
   * console.log封装 log(打印log信息)
   * @example 示例:
   * lwsdk.log(1111)
   */
  log() {
    if (this.debug) {
      var t = Array.prototype.slice.apply(arguments);
      t.unshift(">>>DEBUG: ");
      //debugger
      console.log.apply(console, t)
    }
  }

  /**
   * console.warn封装 warn(打印warn信息)
   * @example 示例:
   * lwsdk.warn(1111)
   */
  warn() {
    if (this.debug) {
      var t = Array.prototype.slice.apply(arguments);
      t.unshift(">>>DEBUG: ");
     // debugger
      console.warn.apply(console, t)
    }
  }

  /**
   * console.error封装 error(打印error信息)
   * @example 示例:
   * lwsdk.error(1111)
   */
  error() {
    if (this.debug) {
      console.error.apply(console, arguments)
    }
  }

  fitPlatform() {
    if (typeof wx !== 'undefined') {
      return true;
    }
    this.error(errMsg[1000]);
    return false
  }

  /**
   * 对象继承
   * @param {Object} target 目标对象
   * @example 示例：
   * var target = {};
   * var extra1 = {a: 1};
   * var extra2 = {b: 2};
   * lwsdk.extend(target, extra1, extra2);
   * console.log(target);
   */
  extend(target) {
    var sources = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < sources.length; i += 1) {
      var source = sources[i];
      if (source && typeof source == "object") {
        for (var key in source) {
          if (source.hasOwnProperty(key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  }

  /**
   * SDK初始化
   * @param {JSON} param0 解构参数
   * @param {boolean} param0.debug 是否开启SDK debug模式，true是，false否
   * @param {boolean} param0.isProduction 是否切换到正式环境，true是，false否
   * @param {string} param0.game 游戏编码，乐玩后台获取， 比如'tatajuntuan-weixin'
   * @param {string} param0.version 游戏版本，乐玩后台获取 ,比如'1.0.0'
   * @param {string} param0.dev_platform 游戏发布平台，乐玩后台获取 ,比如'weixin'、'toutiao'、'qq'
   * @param {boolean} param0.canShare 是否有分享功能，true是，false否
   * @param {function} param0.success 成功回调
   * @param {function} param0.fail 失败回调
   */
  init({
    debug = false,
    isProduction = true,
    game,
    version,
    dev_platform = 'weixin',
    canShare = true,
    success,
    fail
  } = {}) {
    var self = this;
    if (!game) {
      self.error('game 游戏编码参数不能为空');
      return
    }
    if (!version) {
      self.error('version 游戏版本参数不能为空');
      return
    }
    if (!dev_platform) {
      self.error('dev_platform 游戏发布平台参数不能为空');
      return
    }
    self.sdk_conf.game = game;
    self.sdk_conf.version = version;
    self.sdk_conf.dev_platform = dev_platform;
    self.sdk_conf.canShare = canShare;
    self.debug = debug;
    self.env = isProduction ? 'pro' : 'dev';

    self.checkUpdate();
    self.setWeChatListener();

    Promise.all([self.login(), self.getConfigData(), self.getShareData()]).then(res => {
      self.log(res);
      if (res[0] && res[1] && res[2]) {
        // self.logServer();//这个需要登录的用户token参数，但是新注册接口没有返回，就先注释了
        self.tryUpdateUserInfo();
        success && success(res[0]);
      } else {
        fail && fail(errMsg[102]);
      }
    }).catch(err => {
      self.warn(err);
      fail && fail(errMsg[102]);
    })
  }

  login() {
    var self = this;
    return new Promise((resolve, reject) => {
      if (self.fitPlatform()) {
        var userinfo = self.getUser();
        if (userinfo) {
          resolve(userinfo);
        } else {
          wx.login({
            success(res) {
              self.regUser({
                code: res.code
              }).then(userinfo => {
                self.log('注册成功', userinfo);
                self.setUser(userinfo);
                resolve(userinfo);
              }).catch(err => {
                self.log(err);
                reject(err);
              })
            },
            fail(err) {
              self.log(err);
              reject(err);
            }
          })
        }
      } else {
        reject(errMsg[1000])
      }
    })
  }

  /**
   * 获取后台配置
   */
  getConfigData() {
    var self = this;
    return new Promise((resolve, reject) => {
      self.Post(self.ip2 + sourceURI.config, {}, function (res) {
        if (res && res.c == 1) {
          self.ConfigData = res.d;
          resolve(true);
        } else {
          self.log("sdk 后台配置信息初始化失败,再次初始化：", res);
          reject(false)
        }
      });
    })
  }

  /**
   * 获取分享素材
   */
  getShareData() {
    var self = this;
    return new Promise((resolve, reject) => {
      self.Post(self.ip2 + sourceURI.share, {}, function (res) {
        // self.log("初始化分享信息：",res)
        if (res && res.c == 1) {
          self.ShareList = res.d;
        } else {
          self.log("sdk 初始化分享信息失败：", res)
        }
        resolve(true);
      });
    })
  }

  /**
   * 获取本地用户信息（登录成功后，会在本地存储用户信息） getUser（获取用户信息）
   * @example 示例:
   * //.不存在返回null
   * var user = lwsdk.getUser();
   */
  getUser() {
    var userinfo = this.getItem('userinfo');
    if (userinfo) {
      return JSON.parse(userinfo);
    } else {
      return null;
    }
  }

  /**
   * 设置本地用户信息缓存
   * @param {JSON} userinfo 用户信息
   */
  setUser(userinfo) {
    if (userinfo && typeof userinfo === 'object') {
      this.setItem('userinfo', JSON.stringify(userinfo))
    }
  }

  /**
   * 数据存储 setItem（存）
   * @param {String} key 键
   * @param {String} value 值
   * @example 示例:
   * lwsdk.setItem("nick","hello")
   */
  setItem(key, value) {
    if (typeof cc !== 'undefined') {
      cc.sys.localStorage.setItem(key, value);
    } else if (typeof Laya !== 'undefined') {
      Laya.LocalStorage.setItem(key, value);
    } else if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }
  /**
   * 数据存储 getItem（取）
   * @param {String} key 键
   * @param {String} value 值
   * @example 示例:
   * var nick = lwsdk.getItem("nick")
   */
  getItem(key) {
    if (typeof cc !== 'undefined') {
      return cc.sys.localStorage.getItem(key);
    } else if (typeof Laya !== 'undefined') {
      return Laya.LocalStorage.getItem(key);
    } else if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
  }
  /**
   * 数据存储 removeItem(删)
   * @param {String} key 键
   * @example 示例:
   * lwsdk.removeItem("nick")
   */
  removeItem(key) {
    if (typeof cc !== 'undefined') {
      cc.sys.localStorage.removeItem(key);
    } else if (typeof Laya !== 'undefined') {
      Laya.LocalStorage.removeItem(key);
    } else if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  /**
   * 用户注册接口
   * @param {JSON} param 结构参数
   * @param {string} param.code 微信登录code
   */
  regUser({
    code
  } = {}) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.post({
        url: self.ip1 + sourceURI.regUser,
        reqData: {
          code: code
        },
        success: res => {
          if (res) {
            if (res.code === 1) {
              resolve(res.d);
            } else {
              reject(res.msg);
            }
          } else {
            reject(errMsg[200]);
          }
        },
        fail: err => {
          reject(err);
        }
      })
    })
  }

  getBaseRequestData() {
    return {
      game: this.sdk_conf.game,
      version: this.sdk_conf.version
    }
  }

  /**
   * 获取请求参数query字符串
   * @param {JSON} requestData 请求参数
   */
  getQueryString(data, encode = false) {
    if (!data && typeof data !== 'object') {
      this.warn(errMsg[100]);
      return ''
    }
    var param = '';
    for (var key of data.sortKeys) {
      var value = typeof data.requestData[key] === 'object' && data.requestData[key] !== null ? JSON.stringify(data.requestData[key]) : data.requestData[key];
      if (encode) {
        param += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
      } else {
        param += key + "=" + value + "&";
      }
    }
    var temp = param.slice(0, -1);
    return temp
  }

  /**
   * 根据ASCII编码重新排序
   * @param {JSON} requestData 
   */
  sortByASCII(requestData) {
    if (!requestData && typeof requestData !== 'object') {
      this.warn(errMsg[100]);
      return ''
    }
    this.extend(requestData, this.getBaseRequestData());
    var arr = new Array();
    var num = 0;
    for (var i in requestData) {
      arr[num] = i;
      num++;
    }
    var sortArr = arr.sort(); //按ASCII编码排序
    return {
      sortKeys: sortArr,
      requestData: requestData
    }
  }

  /**
   * 发起网络请求 Post（发起Post请求）
   * @param {String} url 请求地址
   * @param {Object} reqData 请求参数
   * @param {Object} success 成功回调
   * @param {Object} success 失败回调
   */
  post({
    url,
    reqData,
    success,
    fail,
    useSign = true
  } = {}) {
    var self = this;
    //重新排序参数
    var data = self.sortByASCII(reqData);
    //1.拼接请求参数
    var param = self.getQueryString(data, true);
    if (useSign) {
      var tempStr = self.getQueryString(data) + self.md5_key;
      self.log('拼接sign参数', tempStr);
      var sign = self.md5(tempStr);
      param = param + '&sign=' + sign;
    }

    //2.发起请求
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          var response = xhr.responseText;
          self.log("网络请求返回，接口地址：", url, "返回内容", response);
          if (response) {
            var responseJson = JSON.parse(response);
            success && success(responseJson);
          } else {
            self.log("sdk 返回数据不存在");
            fail && fail(errMsg[200]);
          }
        } else {
          self.log("sdk 请求失败", xhr);
          fail && fail(errMsg[201]);
        }
      }
    };
    xhr.onabort = xhr.onerror = xhr.ontimeout = function () {
      self.log("sdk 请求失败", xhr);
      fail && fail(errMsg[201]);
    };
    self.log("发起网络请求，接口地址：", url, "请求参数：", param);
    xhr.open("POST", url, true);
    xhr.timeout = 60 * 1000; // 超时时间，单位是毫秒
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(param); //reqData为字符串形式： "key=value"
  }

  /**
   * 发起网络请求 Post（发起Post请求）
   * @param {String} url 请求地址
   * @param {Object} reqData 请求参数
   * @param {Object} success 成功回调
   * @param {Object} success 失败回调
   */
  get({
    url,
    reqData,
    success,
    fail,
    useSign = false
  } = {}) {
    var self = this;
    //重新排序参数
    var data = self.sortByASCII(reqData);
    //1.拼接请求参数
    var param = self.getQueryString(data, true);
    if (useSign) {
      var tempStr = self.getQueryString(data) + self.md5_key;
      self.log('拼接sign参数', tempStr);
      var sign = self.md5(tempStr);
      param = param + '&sign=' + sign;
    }
    url += '?' + param;
    //2.发起请求
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          var response = xhr.responseText;
          self.log("网络请求返回，接口地址：", url, "返回内容", response);
          if (response) {
            var responseJson = JSON.parse(response);
            success && success(responseJson);
          } else {
            self.log("sdk 返回数据不存在");
            fail && fail(errMsg[200]);
          }
        } else {
          self.log("sdk 请求失败", xhr);
          fail && fail(errMsg[201]);
        }
      }
    };
    xhr.onabort = xhr.onerror = xhr.ontimeout = function () {
      self.log("sdk 请求失败", xhr);
      fail && fail(errMsg[201]);
    };
    self.log("发起网络请求，接口地址：" + url);
    xhr.open("GET", url, true);
    xhr.timeout = 60 * 1000; // 超时时间，单位是毫秒
    xhr.send();
  }

  Get(url, reqData, callback) {
    var self = this;
    reqData.game = self.sdk_conf.game;
    reqData.version = self.sdk_conf.version;
    reqData.dev_platform = self.sdk_conf.dev_platform;
    reqData.llewan_sdk_version = self.version;
    var ts = new Date().getTime();
    reqData.ts = ts;
    var token = "";
    if (self.getUser() && self.getUser() != null) {
      token = self.getUser().token;
    }
    var options = null;
    var source_id = 0;
    if (self.fitPlatform()) {
      options = wx.getLaunchOptionsSync();
      source_id = options.query.source_id;
    }

    //数据验证签名。规则为：MD5(ts.substr(9,4)+game.substr(0,2)+version.substr(0,1)+key),时间戳后4位、data前3位、key（服务端提供）然后进行MD5加密
    reqData.sign = self.md5(ts.toString().substr(9, 4) + self.sdk_conf.game.substr(0, 2) + self.sdk_conf.version.substr(0, 1) + self.sdk_conf.md5_key);

    url += "?";
    for (var item in reqData) {
      var value = typeof reqData[item] === 'object' && reqData[item] !== null ? JSON.stringify(reqData[item]) : reqData[item];
      url += item + "=" + value + "&";
    }
    url += "token=" + token + "&";

    url += "source_id=" + source_id + "&";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          var response = xhr.responseText;
          self.log("网络请求返回，接口地址：", url, "返回内容", response)
          if (response) {
            if (self.changeHost) {
              response = response.replace(/https:\/\/res.g.llewan.com/g, self.ip4);
            }
            var responseJson = JSON.parse(response);
            callback(responseJson);
          } else {
            self.log("sdk 返回数据不存在", url);
            callback(null);
          }
        } else {
          self.log("sdk 请求失败", url);
          callback(null);
        }
      }
    };
    xhr.onabort = xhr.onerror = xhr.ontimeout = function () {
      self.log("sdk 请求失败", xhr);
      callback(null);
    };
    self.log("发起网络请求，接口地址：" + url);
    xhr.open("GET", url, true);
    xhr.timeout = 60 * 1000; // 超时时间，单位是毫秒
    xhr.send();
  }

  Post(url, reqData, callback) {
    var self = this;
    reqData.game = self.sdk_conf.game;
    reqData.version = self.sdk_conf.version;
    reqData.dev_platform = self.sdk_conf.dev_platform;
    reqData.llewan_sdk_version = self.version;
    var ts = new Date().getTime();
    var token = "";
    if (self.getUser() && self.getUser() != null) {
      token = self.getUser().token;
    }
    var options = null;
    var source_id = 0;
    if (self.fitPlatform()) {
      options = wx.getLaunchOptionsSync();
      source_id = options.query.source_id;
    }

    reqData.ts = ts;
    reqData.sign = self.md5(ts.toString().substr(9, 4) + self.sdk_conf.game.substr(0, 2) + self.sdk_conf.version.substr(0, 1) + self.sdk_conf.md5_key);

    //1.拼接请求参数
    var param = "";
    for (var item in reqData) {
      var value = typeof reqData[item] === 'object' && reqData[item] !== null ? JSON.stringify(reqData[item]) : reqData[item];
      param += item + "=" + value + "&";
    }
    param += "token=" + token + "&";
    param += "source_id=" + source_id + "&";

    //2.发起请求
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          var response = xhr.responseText;
          self.log("网络请求返回，接口地址：", url, "返回内容", response);
          if (response) {
            if (self.changeHost) {
              response = response.replace(/https:\/\/res.g.llewan.com/g, self.ip4);
            }
            var responseJson = JSON.parse(response);
            callback(responseJson);
          } else {
            self.log("sdk 返回数据不存在");
            callback(null);
          }
        } else {
          self.log("sdk 请求失败", xhr);
          callback(null);
        }
      }
    };
    xhr.onabort = xhr.onerror = xhr.ontimeout = function () {
      self.log("sdk 请求失败", xhr);
      callback(null);
    };
    self.log("发起网络请求，接口地址：", url, "请求参数：", param);
    xhr.open("POST", url, true);
    xhr.timeout = 60 * 1000; // 超时时间，单位是毫秒
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(param); //reqData为字符串形式： "key=value"
  }

  /**
   * 获取游戏启动参数
   */
  getLaunchOptions() {
    if (!this.fitPlatform()) {
      return null;
    }
    var options = wx.getLaunchOptionsSync();
    return options;
  }

  /**
   * 路径的query转换成路径字符串
   * @param {*} query 启动小游戏的 query 参数
   */
  queryToPath(query) {
    if (!query) {
      return null
    }
    var path = '?';
    for (var key in query) {
      path = path + key + '=' + query[key] + '&'
    }
    if (path == '?') {
      return null
    }
    if (path.lastIndexOf('&') > 0) {
      path = path.substr(0, path.length - 1)
    }
    return path
  }
  /**
   * 微信小游戏（冷启动的时候会检查，如果有更新则会重启小游戏进行更新） checkUpdate（版本更新）非必要
   * @example 示例:
   * lwsdk.checkUpdate();
   */
  checkUpdate() {
    var self = this;
    if (self.fitPlatform() && typeof wx.getUpdateManager === 'function') {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (self.debug) {
          self.log("sdk 请求完新版本信息的回调", res.hasUpdate)
        }
      })
      updateManager.onUpdateReady(function () {
        if (self.debug) {
          self.log("sdk 新的版本已经下载好，调用 applyUpdate 应用新版本并重启")
        }
        updateManager.applyUpdate()
      })
      updateManager.onUpdateFailed(function () {
        if (self.debug) {
          self.log("sdk 新的版本下载失败")
        }
      })
    }
  }
  /**
   * {运营配置} 游戏后台配置信息，运营人员使用的通用配置开关 getConfig1（运营配置）
   * @example 示例:
   * var d = lwsdk.getConfig1();
   */
  getConfig1() {
    if (!this.ConfigData || !this.ConfigData.config1) {
      this.warn('没有获取到服务器的对应游戏配置信息，请检查后台是否已配置或网络请求正常？');
      return null;
    }
    return JSON.parse(this.ConfigData.config1);
  }

  /**
   * {程序配置} 游戏后台配置信息，程序员使用的游戏数据开关，可随便自定义数据：例如复活次数等 getConfig2（程序配置）
   * @example 示例:
   * var d = lwsdk.getConfig2();
   */
  getConfig2() {
    if (!this.ConfigData || !this.ConfigData.config2) {
      this.warn('没有获取到服务器的对应游戏配置信息，请检查后台是否已配置或网络请求正常？');
      return null;
    }
    return JSON.parse(this.ConfigData.config2);
  }

  /**
   * 根据键获取自定义配置数据
   * @param {string} key 自定义数据的键
   * @example 示例：
   * var timeLimit = lwsdk.getCustomConfigByKey('timeLimit');
   */
  getCustomConfigByKey(key) {
    var config = this.getConfig2();
    if (!config) {
      return null
    }
    if (typeof config[key] === 'undefined') {
      return null
    }
    return config[key]
  }

  /**
   * {运营配置} 游戏后台配置信息，运营人员使用的通用配置开关,相关按钮根据时间来配置以及跳转方式按钮属性 getConfig3（运营配置）
   * @example 示例:
   * var d = lwsdk.getConfig3();
   */
  getConfig3() {
    if (!this.ConfigData || !this.ConfigData.config3) {
      this.warn('没有获取到服务器的对应游戏配置信息，请检查后台是否已配置或网络请求正常？');
      return null;
    }
    return JSON.parse(this.ConfigData.config3);
  }

  /**
   * {技术程序控制} 游戏服务端控制一些需要服务端判断的比如：ip地区配置，getConfig4（技术程序）
   * @example 示例:
   * var d = lwsdk.getConfig4();
   */
  getConfig4() {
    if (!this.ConfigData || !this.ConfigData.config4) {
      this.warn('没有获取到服务器的对应游戏配置信息，请检查后台是否已配置或网络请求正常？');
      return null;
    }
    return JSON.parse(this.ConfigData.config4);
  }
  //.根据权重随机获取指定type类型的分享信息。
  getShareByWeight(type) {
    if (!this.ShareList || this.ShareList.length === 0) {
      this.error('没有找到后台配置的分享素材，当前分享素材是sdk内置，请检查网络是否正常或后台是否已配置，联系公司运营配置分享素材');
      return this.sdk_conf.default_shareInfo
    }
    if (this.ShareList.length > 0) {
      //1.获取某种type的集合
      var tArray = [];
      for (var i = 0; i < this.ShareList.length; i++) {
        if (type == this.ShareList[i]['type']) {
          this.ShareList[i].weight = parseInt(this.ShareList[i].weight);
          tArray.push(this.ShareList[i]);
        }
      }
      //2.根据权重配比：从i集合（权重越大占比越多）中随机获取。
      var iArray = [];
      for (var i = 0; i < tArray.length; i++) {
        for (var j = 0; j < tArray[i].weight; j++) {
          iArray.push(i);
        }
      }
      var i = iArray[parseInt(Math.random() * iArray.length)];
      //3.结果处理：正则替换昵称
      var item = tArray[i];
      if (item.title.indexOf("&nickName") != -1) {
        item.title = item.title.replace(/&nickName/g, this.getUser().nickName);
      }
      return JSON.parse(JSON.stringify(item));
    }
  }
  /**
   * @apiGroup A
   * @apiName onShareAppMessage
   * @api {分享} 注册微信右上角分享,游戏初始化就可以调用了 onShareAppMessage(分享)
   * @param {int} type=0 后台自定义的分享类型；例如：0：右上角分享、1：普通分享
   * @param {int} specialFlag=0 特殊标记,例如0:默认、1：邀新好友、2:邀旧好友
   * @param {int} rewardFlag=xxx 活动或者道具id
   * @param {String} [title] 转发标题
   * @param {String} [imageUrl] 转发显示图片的链接
   * @param {String} [query] 必须是 key1=val1&key2=val2 的格式。
   * @param {callback} [success] 成功回调
   * @param {callback} [fail] 失败回调
   * @param {callback} [cancel] 点击取消分享按钮回调 
   * 
   * @example 示例:
   * lwsdk.onShareAppMessage({type: 0,query: "",success:xxx,cancel:xxx,fail:xxx,rewardFlag:'' });
   */
  onShareAppMessage(obj) {
    var self = this;
    if (self.fitPlatform()) {
      //.微信右上角分享
      var specialFlag = 0;
      var rewardFlag = 0;
      wx.showShareMenu({
        withShareTicket: true
      })
      wx.onShareAppMessage(function (res) {
        //.默认0：右上角分享
        var tpye = 0;
        if (!obj) {
          obj = {};
        }
        if (obj['type']) {
          tpye = obj['type'];
        }
        if (obj.specialFlag) {
          specialFlag = obj.specialFlag;
        }

        if (obj.rewardFlag) {
          rewardFlag = obj.rewardFlag;
        }

        var shareInfo = self.getShareByWeight(tpye)

        if (obj.title) {
          shareInfo.title = obj.title;
        }
        if (obj.imageUrl) {
          shareInfo.imageUrl = obj.imageUrl;
        }
        if (shareInfo.query) {
          shareInfo.query += self.shareEnterChannel + '&' + obj.query + "&type=" + shareInfo.type + "&share_id=" + shareInfo.sysid + "&uid=" + self.userid + "&special_flag=" + specialFlag + "&reward_flag=" + rewardFlag;
        } else {
          if (obj.query) {
            shareInfo.query = self.shareEnterChannel + "&share_id=" + shareInfo.sysid + "&type=" + shareInfo.type + "&uid=" + self.userid + "&special_flag=" + specialFlag + "&reward_flag=" + rewardFlag + "&" + obj.query;
          } else {
            shareInfo.query = self.shareEnterChannel + "&share_id=" + shareInfo.sysid + "&type=" + shareInfo.type + "&uid=" + self.userid + "&special_flag=" + specialFlag + "&reward_flag=" + rewardFlag;
          }
        }
        if (obj.success) {
          shareInfo.successCallback = obj.success;
        }
        if (obj.fail) {
          shareInfo.failCallback = obj.fail;
        }

        if (obj.cancel) {
          shareInfo.cancelCallback = function () {
            self.shareCancelCallback = true;
            obj.cancel();
            self.log("分享取消了");
          }
        }
        var nowTime = new Date().getTime();
        self.shareStartTime = nowTime / 1000;
        self.shareInfo = shareInfo;
        self.log('shareInfo', shareInfo);
        return shareInfo;
      })
    }
  }
  /**
   * @apiGroup A
   * @apiName shareAppMessage
   * @api {分享} 主动拉起微信分享 shareAppMessage(分享)
   * @param {json} param0 解构参数：{type = 1, query = "", title, imageUrl, success, fail, rewardFlag }
   * @param {int} param0.type 后台自定义的分享类型；例如：0：右上角分享、1：普通分享 2：分享加金币
   * @param {int} [param0.specialFlag] 特殊标记,例如0:默认、1：邀新好友、2:邀旧好友
   * @param {String} [param0.title] 转发标题
   * @param {String} [param0.imageUrl] 转发显示图片的链接
   * @param {String} [param0.query] 必须是 key1=val1&key2=val2 的格式。
   * @param {callback} [param0.success] 成功回调
   * @param {callback} [param0.fail] 失败回调 
   * @example 示例:
   * lwsdk.shareAppMessage({type: 1,query: "",success:res=>console.log(111),fail:err=>console.log(222,err)});
   */
  shareAppMessage({
    type = 1,
    query = "",
    title,
    imageUrl,
    success,
    fail,
    specialFlag = 0
  } = {}) {
    console.log("this.getShareByWeight(type)",this.getShareByWeight(1))
    var self = this;
    if (self.fitPlatform()) {
      var shareInfo = this.getShareByWeight(type);
      console.log("shareInfoshareInfo",shareInfo)
      if (title) {
        shareInfo.title = title;
      }
      if (imageUrl) {
        shareInfo.imageUrl = imageUrl;
      }
      if (shareInfo.query) {
        shareInfo.query += self.shareEnterChannel + '&' + query + "&type=" + shareInfo.type + "&share_id=" + shareInfo.sysid + "&uid=" + self.userid + "&special_flag=" + specialFlag + "&reward_flag=" + rewardFlag;
      } else {
        if (query) {
          shareInfo.query = self.shareEnterChannel + "&share_id=" + shareInfo.sysid + "&type=" + shareInfo.type + "&uid=" + self.userid + "&special_flag=" + specialFlag + "&" + query;
        } else {
          shareInfo.query = self.shareEnterChannel + "&share_id=" + shareInfo.sysid + "&type=" + shareInfo.type + "&uid=" + self.userid + "&special_flag=" + specialFlag;
        }
      }
      if (success) {
        shareInfo.successCallback = success;
      }
      if (fail) {
        shareInfo.failCallback = fail;
      }

      self.log("sdk 微信分享", shareInfo);
      wx.shareAppMessage(shareInfo);
      var nowTime = new Date().getTime();
      self.shareStartTime = nowTime / 1000;
      self.shareInfo = shareInfo;
    }
  }
  /**
   * 微信小游戏显示和隐藏的监听事件，无需手动调用，不对外提供使用 setWeChatListener(游戏显示和隐藏监听)
   */
  setWeChatListener() {
    let self = this;
    if (!self.fitPlatform()) {
      return
    }
    wx.onHide(function (res) {
      //监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
      self.log("sdk 小游戏隐藏到后台");
      self.uploadSceneEvent(null, '隐藏小游戏到后台', null);
      if (self.shareStartTime > 0) {
        //隐藏发生在分享调起
        self.log("sdk 隐藏发生在分享调起");
      }
    });

    wx.onShow(function (res) {
      //监听小游戏回到前台的事件
      self.log("sdk 监听小游戏回到前台的事件");
      var nowTime = new Date().getTime();
      if (self.isGameStart && self.sdk_conf.game_online) {
        var onlineKey = self.getGameOnlineKey();
        var dataString = self.getItem(onlineKey);
        var data = JSON.parse(dataString);
        data.last_time = nowTime / 1000;
        self.log("onShow->" + onlineKey, JSON.stringify(data));
        self.setItem(onlineKey, JSON.stringify(data));
      }

      if (self.shareStartTime > 0) {
        var shareTime = (nowTime / 1000) - self.shareStartTime;

        if (shareTime >= self.sdk_conf.share_time_limit) {

          self.log("sdk 分享成功");
          if (self.shareInfo.successCallback) {
            self.shareInfo.successCallback();
            self.log("sdk 分享成功回调");
          }
        } else {
          self.log("sdk 分享失败");
          //分享失败 回调失败
          if (self.shareInfo.failCallback) {
            self.shareInfo.failCallback();
            self.log("sdk 分享失败回调");
          } else if (self.shareInfo.cancelCallback) {
            self.shareInfo.cancelCallback();
            self.log("sdk 分享取消回调");
          }
        }

        //重置分享数据
        self.shareStartTime = -1;
        self.shareInfo = null;
        self.log("sdk 清空分享数据记录");
      }
    })
  }

  /**
   *  数据存储 setToServer（存用户服务器数据）
   * @param {String} dataKey 键
   * @param {String} dataType 数据类型,首字母大学的驼峰形式,例如：ShareGroup 或者 ShareLimit 
   * @param {String} data 需要保存的数据
   * @param {String} expireTime 过期时间 单位(秒),0：默认一天;-1:永不失效(10年);
   * 注意：dataKey和dataType共同确定一个数据的key值，也就是说 如果同样传递key111但是如果dataType不一样，sdk会认为是不同的两个数据key
   * @example 示例：
   * var data = {'key3':'test'};
   * lwsdk.setToServer({dataKey:"testKey",dataType:"TestData",data:data,expireTime:3600});
   * 
   */
  setToServer({
    dataKey,
    dataType,
    data,
    expireTime
  } = {}) {
    var self = this;
    var localExpireTime = 24 * 60 * 60;
    if (expireTime == -1) {
      localExpireTime = 365 * 24 * 60 * 60;
    } else if (expireTime == 0) {
      localExpireTime = 24 * 60 * 60;
    }
    if (expireTime == -1) {
      expireTime = 15 * 24 * 60 * 60;
    } else if (expireTime == 0) {
      expireTime = 24 * 60 * 60;
    }
    dataKey = self.sdk_conf.game + ":" + dataType + ":" + self.getUser().uid + ":" + dataKey;
    self.setLocalCache(dataKey, JSON.stringify(data), localExpireTime);
    // self.log("sdk setToServer " + dataKey + " ： " + JSON.stringify(data));
    // gm.DataManager.userData = data
    // if (gm != defined ) {
    //   console.log("gm 存在")
    // }else{
    //   console.log("gm 存在")
    // }
    if (dataType == "girlData") {
      if (data && data.Level !== null && data.Level !== undefined && gm !== undefined) {
        gm.DataManager.userData.Level = data.Level,
          gm.DataManager.userData.gold = data.gold,
          gm.DataManager.userData.lastDate = data.lastDate,
          gm.DataManager.userData.can_power = data.can_power,
          gm.DataManager.userData.quest_pawer = data.quest_pawer,
          gm.DataManager.userData.power = data.power,
          gm.DataManager.userData.NowMission = data.NowMission,
          gm.DataManager.userData.MaxMission = data.MaxMission,
          gm.DataManager.userData.LittleMission = data.LittleMission,
          gm.DataManager.userData.Right = data.Right,
          gm.DataManager.userData.pass = data.pass,
          gm.DataManager.userData.accuracy = data.accuracy,
          gm.DataManager.userData.Tip = data.Tip,
          gm.DataManager.userData.skinShoe = data.skinShoe,
          gm.DataManager.userData.skinHead = data.skinHead,
          gm.DataManager.userData.skinCoat = data.skinCoat;
        gm.DataManager.userData.get_tip = data.get_tip;
        if (data.SetMission) {
          gm.DataManager.userData.SetMission = data.SetMission
        }
        if (data.offline) {
          gm.DataManager.userData.offline = data.offline
        }
        if (data.powerNum) {
          gm.DataManager.userData.powerNum = data.powerNum
        }
        if (data.worldOrfriend) {
          gm.DataManager.userData.worldOrfriend = data.worldOrfriend
        }
      }
    } else if (dataKey == "girlDataSet" && gm !== undefined) {
      if (data.sound !== null && data.sound !== undefined) {
        console.log(data.sound, "data.sound")
        gm.DataManager.SettingData.sound = data.sound
        console.log(gm.DataManager.SettingData.sound)
      }
      if (data.vibration !== null && data.vibration !== undefined) {
        gm.DataManager.SettingData.vibration = data.vibration
      }
      if (data.effect !== null && data.effect !== undefined) {
        gm.DataManager.SettingData.effect = data.effect
      }
    }

    // console.log(gm.DataManager.userData,"初始化数据")
    // console.log(data,"初始化数据,上传数据")
    self.Post(self.ip2 + sourceURI.set, {
      key: dataKey,
      data: JSON.stringify(data),
      data_type: dataType,
      expireTime: String(expireTime)
    }, function (d) {
      self.log("sdk setToServer 服务端返回", JSON.stringify(d));
      if (!d || d.c !== 1) {
        self.warn("sdk 设置失败,请联系服务端技术查看问题！");
      }
    });
  }

  /**
   * 数据存储 getFromServer（取用户服务器数据）
   * @param {String} dataKey 键
   * @param {String} dataType 数据类型 首字母大学的驼峰形式,例如：ShareGroup 或者 ShareLimit 
   * @param {String} data 特殊情况下需要传递额外数据状况，一般不传递
   * @param {String} success 回调
   * @example 示例：
   * lwsdk.getFromServer({dataKey:"testKey",dataType:"TestData",success:(d)=>{
   *      lwsdk.log("获取返回",d.key3);
   *  }});
   */
  getFromServer({
    dataKey,
    dataType,
    data,
    success
  } = {}) {
    var self = this;
    dataKey = self.sdk_conf.game + ":" + dataType + ":" + self.getUser().uid + ":" + dataKey;
    var cacheData = self.getLocalCache(dataKey)
    self.log("sdk getFromServer " + dataKey + " ：" + cacheData);
    if (cacheData == -1) {
      //去远程服务器拿数据
      self.Post(self.ip2 + sourceURI.get, {
        key: dataKey,
        data_type: dataType,
        data: JSON.stringify(data)
      }, function (d) {
        if (d && d.c === 1) {
          success && success(d.d);
        } else {
          success && success(null);
        }
      });
    } else if (cacheData == 0) {
      //本地缓存过期了直接返回
      //success(null);

      //去远程服务器拿数据
      self.Post(self.ip2 + self.get, {
        key: dataKey,
        data_type: dataType,
        data: JSON.stringify(data)
      }, function (d) {
        if (d && d.c === 1) {
          success && success(d.d);
        } else {
          success && success(null);
        }
      });
    } else {
      //获取到数据
      self.log("cacheData->" + cacheData);
      try {
        cacheData = JSON.parse(cacheData);
      } catch (e) {
        self.error("sdk json 转换异常");
      }
      success && success(cacheData);
    }
  }

  /**
   * 数据存储，有时效的数据可以调用该方法存 setLocalCache（存）
   * @param {String} key 键
   * @param {String} value 值
   * @param {String} expireTime 过期时间单位(秒)
   * @example 示例:
   * lwsdk.setLocalCache("nick","hello")
   */
  setLocalCache(key, value, expireTime) {
    var nowTime = new Date().getTime();
    this.log("sdk setLocalCache nowTime", nowTime);
    expireTime = nowTime + expireTime * 1000;
    this.log("sdk setLocalCache expireTime", expireTime);
    var localData = {
      'data': value,
      'expireTime': expireTime
    };
    this.setItem(key, JSON.stringify(localData));
  }

  /**
   * @apiGroup C
   * @apiName getLocalCache
   * @api {数据存储} 数据存储，取setLocalCache方法存的数据 getLocalCache（取）
   * @param {String} key 键
   * @example 示例:
   * var nick = lwsdk.getLocalCache("nick")
   */
  getLocalCache(key) {
    var self = this;
    var nowTime = new Date().getTime();
    self.log("sdk getLocalCache nowTime", nowTime);
    var localData = self.getItem(key);
    self.log("sdk getLocalCache " + key + " 本地获取值：" + localData);
    if (localData) {
      var data = JSON.parse(localData);
      var expireTime = data.expireTime;
      return data.data;
    } else {
      //本地不存在数据,应该去远程服务器拿数据
      return -1;
    }
  }
  /**
   * 获取服务器时间，一般用于时间比较严谨的场景 getServerTime (取服务器时间)
   * @example 示例:
   * lwsdk.getServerTime((nowTime)=>{
   *  lwsdk.log("获取返回",nowTime);
   * });
   */
  getServerTime(success, fail) {
    var self = this;
    self.Post(self.ip2 + sourceURI.time, {}, function (d) {
      if (!d) {
        fail && fail(null);
        return
      }
      if (d.c === 1) {
        self.log("获取返回", d.nowTime);
        success && success(d.nowTime);
      }
    })
  }
  /**
   * 跳转到小程序或者小游戏注意有时间限定 navigateToMiniProgram(跳转到小程序) 
   * @param {json} param0 解构参数:{appId, path = '', extraData = {}, envVersion, success, fail, complete}
   * @param {string} param0.appId 小程序appId
   * @param {string} param0.path 跳转路径
   * @param {json} param0.extraData 跳转附带额外参数
   * @param {string} param0.envVersion 跳转指向的小程序版本
   * @param {fucntion} param0.success 成功返回
   * @param {fucntion} param0.fail 失败返回
   * @param {fucntion} param0.complete 完成返回
   * @example 示例:
   * lwsdk.navigateToMiniProgram({appId: 'appId'}});
   */

  navigateToMiniProgram({
    appId,
    path = '',
    extraData = {},
    envVersion,
    success,
    fail,
    complete
  } = {}) {
    if (!this.fitPlatform()) {
      return
    }
    if (!appId) {
      this.warn(errMsg[101]);
      return
    }
    wx.navigateToMiniProgram({
      appId: appId, // 要打开的小程序appId
      path: path, //  打开的页面路径，如果为空则打开首页
      extraData: extraData, // 需要传递给目标小程序的数据
      envVersion: envVersion, //特殊情况下需要跳转到对应小程序的开发版本
      success: (res) => {
        this.log("小程序跳转成功", res);
        success && success(res);
      },
      fail: (err) => {
        this.log(err);
        fail && fail(err);
      },
      complete: (res) => {
        complete && complete(res);
      },
    })
  }

  /**
   * 后台按钮开关，开关是否打开
   * @param {string} buttonKey 后台开关key 
   * @example 示例:
   * if(lwsdk.isSwitchOn('SHARE')){
   *    //开关已打开
   * } else {
   *    //开关已关闭
   * }
   */
  isSwitchOn(buttonKey) {
    if (!this.fitPlatform()) return true;
    if (!this.getConfig1() || !this.getConfig1()[buttonKey]) {
      return false;
    } else {
      return true;
    }
  }

  getUploadRowCount() {
    var res = this.sdk_conf.default_upload_row_count;
    try {
      res = this.getConfig4().uploadRowCount;
      if (!res) {
        res = this.sdk_conf.default_upload_row_count;
      }
    } catch (e) {
      res = this.sdk_conf.default_upload_row_count;
    }
    return res;
  }

  getUploadInterval() {
    var res = this.sdk_conf.default_upload_interval;
    try {
      res = this.getConfig4().uploadInterval;
      if (!res) {
        res = this.sdk_conf.default_upload_interval;
      }
    } catch (e) {
      res = this.sdk_conf.default_upload_interval;
    }
    return res;
  }

  /**
   * 将事件信息发送到乐玩服务器记录 uploadSceneEvent(将事件信息发送到乐玩服务器记录)
   * @param {JsonArray} eventJsonArray 要上传的json数组
   * @apiDeprecated 废弃，sdk内部调用，外部一般调用这个方法即可 (#B:setSceneEvent)
   * @apiExample 示例：
   * sdk.uploadSceneEvent(null,'游戏结束',null)   //游戏上传场景数据
   * sdk.uploadSceneEvent(jsonArray,'',null)      //将要上传的数据传递过来
   */
  uploadSceneEvent(eventJsonArray, uploadEvent, callbackFunction) {
    var self = this;
    var lastUploadDataTime = self.getItem("lastUploadDataTime");
    var nowTime = new Date().getTime() / 1000;

    self.log("nowTime:" + nowTime + ";lastUploadDataTime:" + lastUploadDataTime);
    if (lastUploadDataTime) {
      //存在更新时间 暂不做任何处理
    } else {
      //上次更新时间没有就等于当前时间
      lastUploadDataTime = nowTime;
      self.setItem("lastUploadDataTime", lastUploadDataTime);
    }

    if (eventJsonArray === null) {
      //如果没有传递要上传的数据
      var eventData = self.getItem("eventData");
      try {
        eventJsonArray = JSON.parse(eventData);
        self.log(uploadEvent);
        self.uploadData(eventJsonArray, uploadEvent, callbackFunction);
      } catch (e) {
        self.warn(errMsg[103]);
      }
    } else if (eventJsonArray.data.length >= self.getUploadRowCount()) {
      uploadEvent = "数据累计(" + self.getUploadRowCount() + "条)上传";
      self.log(uploadEvent);
      self.uploadData(eventJsonArray, uploadEvent, callbackFunction);
    } else if ((nowTime - lastUploadDataTime) >= self.getUploadInterval()) {
      uploadEvent = "定时(" + self.getUploadInterval() + "秒)上传";
      self.log(uploadEvent);
      self.uploadData(eventJsonArray, uploadEvent, callbackFunction);
    }
  }

  uploadData(eventJsonArray, uploadEvent, callbackFunction) {
    var self = this;
    var nowTime = new Date().getTime() / 1000;
    eventJsonArray.upload_event = uploadEvent;
    //达到一定数量级
    self.log("当前上传数据", eventJsonArray);
    self.Post(self.ip3 + sourceURI.Logcommon, {
      log_type: "SceneEventLog",
      data: JSON.stringify(eventJsonArray)
    }, function (d) {
      if (callbackFunction) {
        callbackFunction(d);
      }
    });
    //上传完了之后删除数据
    self.removeItem("eventData");
    self.setItem("lastUploadDataTime", nowTime);
  }

  /**
   * 数据存储,一般用于事件埋点上报 setSceneEvent(存) 将事件信息发送到乐玩服务器记录
   * @param {String} sceneName 场景名称，比如：加载页，主页，第1关,第2关，厨房，矿坑
   * @param {String} eventName 事件名称，比如：点击、加载、触摸、移动
   * @param {String} eventId 事件ID 通常谢按钮的英文或者中文名字，比如：首页-开始闯关
   * @param {JSON} params 额外参数相关
   * @param {function} callback 回调函数
   * @example 示例: 
   * lwsdk.setSceneEvent({sceneName:"首页",eventName:"点击",eventId:"首页-开始闯关"});
   */
  setSceneEvent({
    sceneName,
    eventName,
    eventId,
    params = {},
    callback
  } = {}) {
    var self = this;
    if (!self.fitPlatform()) {
      return
    }
    var eventData = self.getItem("eventData");
    var deviceModel = self.getItem('deviceModel');
    var eventJsonArray = {};
    var data = [];
    var insertData = {};
    if (eventData) {
      eventJsonArray = JSON.parse(eventData);
      data = eventJsonArray.data;
      //self.log("已经存在:"+data);
    }
    var uid = -1;
    try {
      uid = self.getUser().uid;
    } catch (e) {
      uid = "noid_" +
        (new Date()).getTime() +
        "_" +
        (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
        (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    insertData.uid = uid;
    insertData.scene_name = sceneName;
    insertData.event_id = eventId;
    insertData.event_name = eventName;
    insertData.params = JSON.stringify(params);
    insertData.device_model = deviceModel;
    insertData.event_time = self.formatTime(new Date(), "time", "-")
    //self.log("添加数据",JSON.stringify(insertData));

    data.push(insertData);
    eventJsonArray.data = data;
    //self.log("添加后:"+JSON.stringify(eventJsonArray.data));

    self.setItem("eventData", JSON.stringify(eventJsonArray));
    self.uploadSceneEvent(eventJsonArray, '', callback)
  }

  formatTime(time, type, split) {
    var self = this;
    var mat = {};
    mat.M = time.getMonth() + 1; //月份记得加1
    mat.H = time.getHours();
    mat.s = time.getSeconds();
    mat.m = time.getMinutes();
    mat.Y = time.getFullYear();
    mat.D = time.getDate();
    mat.d = time.getDay(); //星期几

    mat.d = self.formatZero(mat.d);
    mat.H = self.formatZero(mat.H);
    mat.M = self.formatZero(mat.M);
    mat.D = self.formatZero(mat.D);
    mat.s = self.formatZero(mat.s);
    mat.m = self.formatZero(mat.m);

    if (type == "date") {
      if (split.indexOf(":") > -1) {
        mat.Y = mat.Y.toString().substr(2, 2);
        return mat.Y + "/" + mat.M + "/" + mat.D
      } else if (split.indexOf("/") > -1) {
        return mat.Y + "/" + mat.M + "/" + mat.D
      } else if (split.indexOf("-") > -1) {
        return mat.Y + "-" + mat.M + "-" + mat.D
      } else if (split.indexOf("-") > -1) {
        return mat.Y + "-" + mat.M + "-" + mat.D
      } else {
        return mat.Y + mat.M + mat.D
      }
    } else {
      if (split.indexOf(":") > -1) {
        mat.Y = mat.Y.toString().substr(2, 2);
        return mat.Y + "/" + mat.M + "/" + mat.D + " " + mat.H + ":" + mat.m + ":" + mat.s;
      } else if (split.indexOf("/") > -1) {
        return mat.Y + "/" + mat.M + "/" + mat.D + " " + mat.H + "/" + mat.m + "/" + mat.s;
      } else if (split.indexOf("-") > -1) {
        return mat.Y + "-" + mat.M + "-" + mat.D + " " + mat.H + "-" + mat.m + "-" + mat.s;
      } else if (split.indexOf("-") > -1) {
        return mat.Y + "-" + mat.M + "-" + mat.D + " " + mat.H + "-" + mat.m + "-" + mat.s;
      } else {
        return mat.Y + mat.M + mat.D + mat.H + mat.m + mat.s;
      }
    }
  }
  formatZero(str) {
    str = str.toString();
    if (str.length < 2) {
      str = '0' + str;
    }
    return str;
  }
  /**
   * logServer 日志上报
   */
  logServer() {
    var self = this;
    if (!self.fitPlatform()) {
      return
    }
    if (self.getUser()) {
      self.userid = self.getUser().uid;
    }
    if (self.userid && self.initFlag === 0) {
      var option = wx.getLaunchOptionsSync();
      var gdt_vid = option.query.gdt_vid;
      var weixinadinfo = option.query.weixinadinfo
      if (gdt_vid) {
        self.setItem("gdt_vid", gdt_vid);
        self.setItem("weixinadinfo", weixinadinfo);
      }
      if (option.query.share_id && option.query.uid) {
        option.query.share_uid = option.query.uid;
        option.query.uid = self.userid;
        self.Post(self.ip3 + sourceURI.Logcommon, {
          log_type: "ShareEnter",
          data: JSON.stringify(option)
        }, function (d) {

        });
        self.shareTypeEnterLog(option);
      }
      wx.onShow((option) => {
        if (option.query.uid) {
          option.query.share_uid = option.query.uid;
          option.query.uid = self.userid;
          self.Post(self.ip3 + sourceURI.Logcommon, {
            log_type: "ShareEnter",
            data: JSON.stringify(option)
          }, function (d) {

          });
          self.shareTypeEnterLog(option);
        }
      })

      //5.统计：每次打开小游戏调用
      wx.getSystemInfo({
        success(res) {
          var loginData = res;
          loginData.uid = self.userid;
          loginData.share_uid = option.query.share_uid;
          loginData.scene = option.scene;
          loginData.source_id = option.query.source_id;
          loginData.source_id2 = option.query.source_id2;
          loginData.special_flag = option.query.special_flag;
          loginData.reward_flag = option.query.reward_flag;
          self.setItem("deviceModel", res.model);
          wx.getNetworkType({
            success(res2) {
              loginData.network_type = res2.networkType;
              self.log("sdk LoginData", loginData)
              self.Post(self.ip3 + sourceURI.Logcommon, {
                log_type: "LoginData",
                data: JSON.stringify(loginData)
              }, function (d) {
                //很重要防止因为配置获取失败，重复调用
                self.initFlag = 1;
              });
            }
          })
        }
      })
    }
  }

  /**
   * 微信授权登录，将透明图片附着在游戏中功能按钮之上，点击弹出授权按钮 WxAuthLoginOpacity（授权）
   * @param {Object} param0 解构参数
   * @param {number} param0.width 授权按钮的宽度
   * @param {number} param0.height 授权按钮的高度
   * @param {number} param0.left 授权按钮的左边距
   * @param {number} param0.top 授权按钮的顶部边距
   * @param {string} param0.backgroundColor 授权按钮的背景颜色，支持16进制hex颜色值，默认为透明"#00000000"，测试时确认按钮位置可传递其他颜色
   * @param {function} param0.success 授权成功回调
   * @param {function} param0.fail 授权失败回调
   * @example 示例：
   * var obj = {
   *  width: 100,
   *  height: 200,
   *  left: 100,
   *  top: 100,
   *  backgroundColor: "#ff6600"
   * }
   * lwsdk.WxAuthLoginOpacity(obj);
   */
  WxAuthLoginOpacity({
    width = 120,
    height = 40,
    left,
    top,
    backgroundColor = "#ff6600",
    success,
    fail
  } = {}) {
    console.log("调用了获取信息的方法")
    var self = this;
    console.log(self.fitPlatform())
    if (self.fitPlatform()) {
      var options = wx.getLaunchOptionsSync();
      var referee_id = options.query.share_uid; //.推荐人id
      var source_id = options.query.source_id; //.用户来源id
      var source_id2 = options.query.source_id2; //.用户来源子id
      var share_id = options.query.share_id; //.分享素材ID
      var special_flag = options.query.special_flag;

      var createUserInfoButton = function (params) {
        //.微信登录按钮
        if (self.button) {
          self.button.show();
        } else {
          wx.getSystemInfo({
            success(res) {
              width = width || 120;
              height = height || 40;
              left = left || (res.screenWidth / 2 - width / 2);
              top = top || (res.screenHeight / 2 - height / 2);
              // ratio = 750 / res.screenWidth; //设计与真实尺寸缩放比例,这里默认设计分辨率为750x1334
              // width = width / ratio;
              // height = height / ratio;
              // left = left / ratio;
              // top = top ? top / ratio : bottom ? res.screenHeight - bottom / ratio - height : 0; //如果以底部为定位基线要使用bottom计算
              self.button = wx.createUserInfoButton({
                type: 'text',
                text: '获取登录信息',
                style: {
                  left: left,
                  top: top,
                  width: width,
                  height: height,
                  lineHeight: height,
                  backgroundColor: backgroundColor || '#00000000',
                  color: '#00000000',
                  textAlign: 'center',
                  fontSize: 16,
                  borderRadius: 4
                }
              })
              self.button.onTap((res1) => {
                self.setSceneEvent("游戏界面", "页面触发", "微信授权弹窗出现");
                if (!self.getItem("wxauth")) {
                  wx.showToast({
                    title: '登录中...',
                    icon: 'loading',
                    duration: 8
                  });
                } else {
                  success && success(self.getUser());
                  return;
                }
                // 处理用户拒绝授权的情况
                self.log('授权按钮', res1);
                if (res1.errMsg.indexOf('deny') > -1 || res1.errMsg.indexOf('denied') > -1) {
                  // self.button.hide();
                  fail && fail(errMsg[104])
                  return;
                }

                wx.getSetting({
                  success(auths) {
                    if (auths.authSetting["scope.userInfo"]) {
                      self.log('sdk 用户已经授权', res1);
                      var reqData = {
                        rawData: res1.rawData,
                        iv: res1.iv,
                        encryptedData: res1.encryptedData,
                        signature: res1.signature,

                        referee_id: referee_id,
                        source_id: source_id,
                        source_id2: source_id2,
                        share_id: share_id,
                        special_flag: special_flag,

                      }
                      if (res1.iv.search(/\+/g) > -1) {
                        self.log('res1.iv有加号', res1.iv);
                      }
                      self.log('==登录参数==', reqData);

                      self.modifyUserInfo(reqData, success, fail);

                    } else {
                      fail && fail(errMsg[104])
                    }
                  }
                })
              })
              self.button.show()
            }
          })
        }
      }


      self.button && self.button.hide()

      wx.checkSession({
        success() {
          //session_key 未过期，并且在本生命周期一直有效
          createUserInfoButton();
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          self.login((userData) => {
            createUserInfoButton();
          });
        }
      })
    } else {
      console.log(self.fitPlatform(), "=====false")
    }
  }

  /**
   * 主动销毁微信用户信息授权按钮
   */
  hideAuthoriseButton() {
    if (this.button) {
      this.button.hide();
      //this.button.destroy();
      //this.button = null;
    }
  }


  showAuthoriseButton() {
    if (this.button) {
      let self = this
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            console.log("用户已经获取过权限")
          } else {
            console.log("显示授权")
            self.button.show();
          }
        }
      })
    }
  }

  /**
   * 更新用户信息
   * @param {*} reqData 用户授权加密信息
   * @param {*} success 成功回调
   * @param {function} fail 失败回调 
   */
  modifyUserInfo(reqData, success, fail) {
    var self = this;
    var requestData = {
      uid: this.getUser().uid,
      rawData: reqData.rawData,
      iv: reqData.iv,
      encryptedData: reqData.encryptedData,
      signature: reqData.signature
    }
    self.post({
      url: self.ip1 + sourceURI.Auth,
      reqData: requestData,
      success: function (data) {
        self.log('sdk 更新用户信息结果', data)
        if (data && data.code == 1) {
          var newUserInfo = self.extend(self.getUser(), data.d);
          self.setUser(newUserInfo);
          wx.hideToast();
          self.hideAuthoriseButton();
          //.登录成功，重新初始化
          self.userid = data.d.uid;

          success && success(newUserInfo);
        } else {
          self.log(errMsg[105], data);
          fail && fail(errMsg[105]);
          fail && wx.showToast({
            title: '登录失败请重试3'
          });
        }
      },
      fail: err => {
        fail && fail(err);
        fail && wx.showToast({
          title: '登录失败请重试3'
        });
      }
    })
  }

  /**
   * 尝试更新最新用户信息
   */
  tryUpdateUserInfo() {
    var self = this;
    if (self.fitPlatform()) {
      wx.getSetting({
        success(auths) {
          if (auths.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: res => {
                self.log('sdk 用户已经授权', res);
                var reqData = res;
                var rawData = JSON.parse(res.rawData);
                var userinfo = self.getUser();
                if (rawData.nickName !== userinfo.nickName || rawData.avavtarUrl !== userinfo.avavtarUrl) {
                  self.modifyUserInfo(reqData);
                }
              }
            })
          }
        }
      })
    }
  }

  /**
   * 覆盖式保存用户排行榜得分score（会直接覆盖上一次保存的得分，需要使用者提前做好判断是否需要上传）
   * @param {int} score 总得分
   * @param {function} success 保存成功回调函数
   * @param {function} fail 保存失败回调函数
   * @example 示例：
   * lwsdk.rankingSetScore({score: 110, success: res => {console.log(res)}, fail: err => console.log(err)})
   */
  rankingSetScore({
    score,
    success,
    fail
  } = {}) {
    if (typeof score === 'number' && score >= 0) {
      var self = this;
      self.post({
        url: self.ip2 + sourceURI.ScoreUpdate,
        reqData: {
          uid: self.getUser().uid,
          score: Number(score),
          scoreName: 'score'
        },
        success: function (res) {
          self.log('rankingSetScore', res);
          if (res && res.code === 1) {
            success && success(res.msg)
          } else {
            fail && fail(res.msg)
          }
        },
        fail: err => {
          fail && fail(err)
        }
      })
    }
  }

  /**
   * 保存用户排行榜得分coin
   * @param {int} coin 总得分
   * @param {function} success 保存成功回调函数
   * @param {function} fail 保存失败回调函数
   */
  rankingSetCoin({
    coin,
    success,
    fail
  } = {}) {
    console.log(coin, 'coin====')
    if (typeof coin === 'number' && coin >= 0) {
      var self = this;
      self.post({
        url: self.ip2 + sourceURI.ScoreUpdate,
        reqData: {
          uid: self.getUser().uid,
          score: Number(coin),
          scoreName: 'coin'
        },
        success: function (res) {
          self.log('rankingSetCoin', res);
          if (res && res.code === 1) {
            success && success(res.msg)
          } else {
            fail && fail(res.msg)
          }
        },
        fail: err => {
          fail && fail(err)
        }
      })
    }
  }

  /**
   * 获取世界排行榜
   * @param {function} success 获取排行榜数据成功回调
   * @param {function} fail 获取排行榜数据失败回调
   * @example 示例：
   * lwsdk.rankingGet({page: 1, offset: 30, success:res=>console.log(111,res)})
   */
  rankingGet({
    page = 1,
    offset = 20,
    success,
    fail
  } = {}) {
    var self = this;
    self.get({
      url: self.ip2 + sourceURI.GetWorldRank,
      reqData: {
        uid: self.getUser().uid,
        page: page,
        offset: offset,
        scoreName: 'score'
      },
      success: function (res) {
        self.log('rankingGet', res);
        if (res && res.code === 1) {
          var data = res.d;
          var userinfo = self.getUser();
          var myself = {
            nickName: userinfo.nickName,
            avatarUrl: userinfo.avatarUrl
          };
          myself.rank = data.rank;
          myself.score = data.score;
          success && success({
            list: data.list,
            myself: myself
          })
        } else {
          fail && fail(res.msg)
        }
      },
      fail: err => {
        fail && fail(err)
      }
    })
  }


}

var lwsdk = new LWSDK();
if (typeof window === 'object') {
  var envGlobal = window;
} else if (typeof GameGlobal === 'object') {
  var envGlobal = GameGlobal;
}
envGlobal.lwsdk = lwsdk;
envGlobal.wx = typeof qq !== 'undefined' ? qq : envGlobal.wx;
envGlobal.wx = typeof tt !== 'undefined' ? tt : envGlobal.wx;
console.warn('当前乐玩lwsdk使用的是（微信、qq、头条）版，注意是否跟想发布的平台一致，当前lwsdk版本号：' + lwsdk.version);
console.warn('场景值：', lwsdk.getLaunchOptions() && lwsdk.getLaunchOptions().scene);
console.warn('路径：', lwsdk.queryToPath(lwsdk.getLaunchOptions() && lwsdk.getLaunchOptions().query));
module.exports = lwsdk;
var sdk = {
  /**
   * @apiGroup B
   * @apiName formatTime
   * @api {时间格式化} 对时间格式化 formatTime (时间格式化)
   * @apiParam {Date} time 时间 
   * @apiParam {String} type 类型 date or time
   * @apiParam {String} split 分隔符 / - : 空
   * @apiSuccessExample {json} 示例:
   * var time = sdk.formatTime(new Date(),"date",""); 20180920
   * var time = sdk.formatTime(new Date(),"time",""); 20180920122324
   */
  formatTime(time, type, split) {
    var self = this;
    var mat = {
      M: null,
      H: null,
      s: null,
      m: null,
      Y: null,
      D: null,
      d: null
    };
    mat.M = time.getMonth() + 1; //月份记得加1
    mat.H = time.getHours();
    mat.s = time.getSeconds();
    mat.m = time.getMinutes();
    mat.Y = time.getFullYear();
    mat.D = time.getDate();
    mat.d = time.getDay(); //星期几

    mat.d = self.formatZero(mat.d);
    mat.H = self.formatZero(mat.H);
    mat.M = self.formatZero(mat.M);
    mat.D = self.formatZero(mat.D);
    mat.s = self.formatZero(mat.s);
    mat.m = self.formatZero(mat.m);

    if (type == "date") {
      if (split.indexOf(":") > -1) {
        mat.Y = mat.Y.toString().substr(2, 2);
        return mat.Y + "/" + mat.M + "/" + mat.D
      } else if (split.indexOf("/") > -1) {
        return mat.Y + "/" + mat.M + "/" + mat.D
      } else if (split.indexOf("-") > -1) {
        return mat.Y + "-" + mat.M + "-" + mat.D
      } else if (split.indexOf("-") > -1) {
        return mat.Y + "-" + mat.M + "-" + mat.D
      } else {
        return mat.Y + mat.M + mat.D
      }
    } else {
      if (split.indexOf(":") > -1) {
        mat.Y = mat.Y.toString().substr(2, 2);
        return mat.Y + "/" + mat.M + "/" + mat.D + " " + mat.H + ":" + mat.m + ":" + mat.s;
      } else if (split.indexOf("/") > -1) {
        return mat.Y + "/" + mat.M + "/" + mat.D + " " + mat.H + "/" + mat.m + "/" + mat.s;
      } else if (split.indexOf("-") > -1) {
        return mat.Y + "-" + mat.M + "-" + mat.D + " " + mat.H + "-" + mat.m + "-" + mat.s;
      } else if (split.indexOf("-") > -1) {
        return mat.Y + "-" + mat.M + "-" + mat.D + " " + mat.H + "-" + mat.m + "-" + mat.s;
      } else {
        return mat.Y + mat.M + mat.D + mat.H + mat.m + mat.s;
      }
    }
  },
  formatZero(str) {
    str = str.toString();
    if (str.length < 2) {
      str = '0' + str;
    }
    return str;
  },
}
window['sdk'] = sdk