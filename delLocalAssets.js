var fs = require("fs")
var path = require('path');

var Uuid = (typeof CC_EDITOR !== 'undefined' ? CC_EDITOR : true) && require('node-uuid');

var Base64KeyChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

var AsciiTo64 = new Array(128);
for (var i = 0; i < 128; ++i) {
	AsciiTo64[i] = 0;
}
for (i = 0; i < 64; ++i) {
	AsciiTo64[Base64KeyChars.charCodeAt(i)] = i;
}

var Reg_Dash = /-/g;
var Reg_Uuid = /^[0-9a-fA-F-]{36}$/;
var Reg_NormalizedUuid = /^[0-9a-fA-F]{32}$/;
var Reg_CompressedUuid = /^[0-9a-zA-Z+/]{22,23}$/;

var Reg_Uuid2 = /[0-9a-fA-F-]{36}/g;

var UuidUtils = {

	// 加了这个标记后，字符串就不可能会是 uuid 了。
	NonUuidMark: '.',

	// 压缩后的 uuid 可以减小保存时的尺寸，但不能做为文件名（因为无法区分大小写并且包含非法字符）。
	// 默认将 uuid 的后面 27 位压缩成 18 位，前 5 位保留下来，方便调试。
	// fc991dd7-0033-4b80-9d41-c8a86a702e59 -> fc9913XADNLgJ1ByKhqcC5Z
	// 如果启用 min 则将 uuid 的后面 30 位压缩成 20 位，前 2 位保留不变。
	// fc991dd7-0033-4b80-9d41-c8a86a702e59 -> fcmR3XADNLgJ1ByKhqcC5Z
	/*
	 * @param {Boolean} [min=false]
	 */
	compressUuid: function (uuid, min) {
		if (Reg_Uuid.test(uuid)) {
			uuid = uuid.replace(Reg_Dash, '');
		} else if (!Reg_NormalizedUuid.test(uuid)) {
			return uuid;
		}
		var reserved = (min === true) ? 5 : 2;
		return UuidUtils.compressHex(uuid, reserved);
	},

	compressHex: function (hexString, reservedHeadLength) {
		var length = hexString.length;
		var i;
		if (typeof reservedHeadLength !== 'undefined') {
			i = reservedHeadLength;
		} else {
			i = length % 3;
		}
		var head = hexString.slice(0, i);
		var base64Chars = [];
		while (i < length) {
			var hexVal1 = parseInt(hexString[i], 16);
			var hexVal2 = parseInt(hexString[i + 1], 16);
			var hexVal3 = parseInt(hexString[i + 2], 16);
			base64Chars.push(Base64KeyChars[(hexVal1 << 2) | (hexVal2 >> 2)]);
			base64Chars.push(Base64KeyChars[((hexVal2 & 3) << 4) | hexVal3]);
			i += 3;
		}
		return head + base64Chars.join('');
	},

	decompressUuid: function (str) {
		if (str.length === 23) {
			// decode base64
			var hexChars = [];
			for (var i = 5; i < 23; i += 2) {
				var lhs = AsciiTo64[str.charCodeAt(i)];
				var rhs = AsciiTo64[str.charCodeAt(i + 1)];
				hexChars.push((lhs >> 2).toString(16));
				hexChars.push((((lhs & 3) << 2) | rhs >> 4).toString(16));
				hexChars.push((rhs & 0xF).toString(16));
			}
			//
			str = str.slice(0, 5) + hexChars.join('');
		} else if (str.length === 22) {
			// decode base64
			var hexChars = [];
			for (var i = 2; i < 22; i += 2) {
				var lhs = AsciiTo64[str.charCodeAt(i)];
				var rhs = AsciiTo64[str.charCodeAt(i + 1)];
				hexChars.push((lhs >> 2).toString(16));
				hexChars.push((((lhs & 3) << 2) | rhs >> 4).toString(16));
				hexChars.push((rhs & 0xF).toString(16));
			}
			//
			str = str.slice(0, 2) + hexChars.join('');
		}
		return [str.slice(0, 8), str.slice(8, 12), str.slice(12, 16), str.slice(16, 20), str.slice(20)].join('-');
	},

	isUuid: function (str) {
		return Reg_CompressedUuid.test(str) || Reg_NormalizedUuid.test(str) || Reg_Uuid.test(str);
	},

	uuid: function () {
		var uuid = Uuid.v4();
		return UuidUtils.compressUuid(uuid, true);
	}
};

var settings

var useful_uuids = []

var window = {}
window["_CCSettings"] = {}

fs.readdir("./build/wechatgame/src", function (err, files) {
	files.forEach(function (filename) {
		//获取当前文件的绝对路径
		var filedir = path.join("./build/wechatgame/src", filename);
		if (filedir.indexOf("settings") > 0) {
			fs.readFile(filedir, 'utf-8', function (err, data) {
				eval(data)
				settings = window._CCSettings
				// console.log(settings["rawAssets"]["assets"])

				// console.log(settings["uuids"][57])
				//保留的文件 node delLocalAssets  (npm i node-uuid)  
				// addUsefulUuidsFromMeta("./assets/scenes")
				// addUsefulUuidsFromMeta("./assets/resources/json")
				// addUsefulUuidsFromMeta("./assets/texture/loading")



				// console.log(useful_uuids)
			})
		}
	})
})




function addUsefulUuidsFromPrefab(filePath) {
	fs.readdir(filePath, function (err, files) {
		if (err) {
			console.warn(err)
		} else {
			//遍历读取到的文件列表
			files.forEach(function (filename) {
				//获取当前文件的绝对路径
				var filedir = path.join(filePath, filename);
				//根据文件路径获取文件信息，返回一个fs.Stats对象
				fs.stat(filedir, function (eror, stats) {
					if (eror) {
						console.warn('获取文件stats失败');
					} else {
						var isFile = stats.isFile(); //是文件
						var isDir = stats.isDirectory(); //是文件夹
						if (isFile && filedir.indexOf(".prefab") > 0 && filedir.indexOf(".meta") < 0) {

							fs.readFile(filedir, 'utf-8', function (err, data) {
								useful_uuids = useful_uuids.concat(data.match(Reg_Uuid2));
								// var myArray = Reg_Uuid2.exec(data)
								// console.log(myArray)
								//          	for(key in myArray){ 
								//    console.log(key); 
								// } 
							})

						}
						if (isDir) {
							addUsefulUuidsFromPrefab(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
						}
					}
				})
			});
		}
	});
}


function addUsefulUuidsFromMeta(filePath) {
	fs.readdir(filePath, function (err, files) {
		if (err) {
			console.warn(err)
		} else {
			//遍历读取到的文件列表
			files.forEach(function (filename) {
				//获取当前文件的绝对路径
				var filedir = path.join(filePath, filename);
				//根据文件路径获取文件信息，返回一个fs.Stats对象
				fs.stat(filedir, function (eror, stats) {
					if (eror) {
						console.warn('获取文件stats失败');
					} else {
						var isFile = stats.isFile(); //是文件
						var isDir = stats.isDirectory(); //是文件夹
						if (isFile && filedir.indexOf(".meta") > 0) {
							// console.log(filedir);

							fs.readFile(filedir, 'utf-8', function (err, data) {
								useful_uuids.push(JSON.parse(data)["uuid"])
								// console.log(UuidUtils.compressUuid(JSON.parse(data)["uuid"]),settings["uuids"].indexOf(UuidUtils.compressUuid(JSON.parse(data)["uuid"])))
								if (settings["uuids"].indexOf(UuidUtils.compressUuid(JSON.parse(data)["uuid"])) > -1) {
									for (var a in settings["packedAssets"]) {
										// alert(a + " " + settings["packedAssets"][a])
										if (settings["packedAssets"][a].indexOf(settings["uuids"].indexOf(UuidUtils.compressUuid(JSON.parse(data)["uuid"]))) > -1 || settings["packedAssets"][a].indexOf(UuidUtils.compressUuid(JSON.parse(data)["uuid"])) > -1) {
											useful_uuids.push(a)
										}
									}
									// useful_uuids.push(UuidUtils.compressUuid(JSON.parse(data)["uuid"]))
								}
							})

						}
						if (isDir) {
							addUsefulUuidsFromMeta(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
						}
					}
				})
			});
		}
	});
}

function delFromBuildAssets(filePath) {
	fs.readdir(filePath, function (err, files) {
		if (err) {
			console.warn(err)
		} else {
			//遍历读取到的文件列表
			files.forEach(function (filename) {
				//获取当前文件的绝对路径
				var filedir = path.join(filePath, filename);
				//根据文件路径获取文件信息，返回一个fs.Stats对象
				fs.stat(filedir, function (eror, stats) {
					if (eror) {
						console.warn('获取文件stats失败');
					} else {
						var isFile = stats.isFile(); //是文件
						var isDir = stats.isDirectory(); //是文件夹
						if (isFile) {
							if (useful_uuids.indexOf(filename.split(".")[0]) > -1) {
								// console.log(filename.split(".")[0])
							} else {
								fs.unlinkSync(filedir);
							}
						}
						if (isDir) {
							delFromBuildAssets(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
						}
					}
				})
			});
		}
	});
}

function rmEmptyDir(filePath) {
	fs.readdir(filePath, function (err, files) {
		if (err) {
			console.warn(err)
		} else {
			//遍历读取到的文件列表
			console.log(filePath, files.length)

			if (files.length === 0) {
				fs.rmdirSync(filePath)
			} else {
				files.forEach(function (filename) {
					var filedir = path.join(filePath, filename);
					//根据文件路径获取文件信息，返回一个fs.Stats对象
					fs.stat(filedir, function (eror, stats) {
						if (eror) {
							console.warn('获取文件stats失败');
						} else {
							var isDir = stats.isDirectory(); //是文件夹
							if (isDir) {
								rmEmptyDir(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
							}
						}
					})
				})
			}
		}
	});
}


function uniqueArr(array) {
	var n = []; //一个新的临时数组
	//遍历当前数组
	for (var i = 0; i < array.length; i++) {
		//如果当前数组的第i已经保存进了临时数组，那么跳过，
		//否则把当前项push到临时数组里面
		if (n.indexOf(array[i]) == -1) n.push(array[i]);
	}
	return n;
}

setTimeout(function () {
	console.log(uniqueArr(useful_uuids).length)
	useful_uuids = uniqueArr(useful_uuids)
	setTimeout(function () {

		delFromBuildAssets("build/wechatgame/res")

		setTimeout(function () {
			rmEmptyDir("build/wechatgame/res")
		}, 1000)

	}, 1000)

}, 1000)