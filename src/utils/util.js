/**
 * 数组转树型
 * @param {*} obj
 */
export const arrToTree = function ({
  childrenName = "children",
  data=[],
  key,
  pIdName,
}) {
  
  let map = data.reduce((map,item)=>{
    item[childrenName] = []
    map[item[key]] = item
    return map
  },{})
  let result = []
  for(let key in map) {
    let item = map[key]
    let pid = item[pIdName]
    if(pid) {
      map[pid][childrenName].push(item)
    } else {
      result.push(item)
    }
  }
  return result
};

/**
 *
 @author likaixuan
 *
 @date 2017-11-21
 *
 * 打印对象详情
 */
export const alertObj = function (obj) {
  let str = "";
  for (let key in obj) {
    str += key + "=" + obj[key] + "\n";
  }
  alert(str);
};

/**
   *
   @author mmmle
   *
   @date 2020-06-20
   *
   * 数组去重
   */
export const uniq = function (array) {
  var temp = [];
  var index = [];
  var l = array.length;
  for (var i = 0; i < l; i++) {
    for (var j = i + 1; j < l; j++) {
      if (array[i] === array[j]) {
        i++;
        j = i;
      }
    }
    temp.push(array[i]);
    index.push(i);
  }
  console.log(index);
  return temp;
};

/**
   *
   @author Mmmle
   *
   @date 2020-06-24
   *
   * 判断对象属性是否为空
   */
export const isNull = function (val) {
  if (val === "") return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(val);
  // if (val) {
  //   if (typeof (val) === 'string') {
  //   } else if(typeof (val) === 'string'){

  //   }
  // }
};
/**
   *
   @author likaixuan
   *
   @date 2017-06-20
   *
   * 防抖动
   */
export const debounce = function (func, sleep) {
  let timeID = null;
  return function () {
    clearTimeout(timeID);
    timeID = setTimeout(func, sleep);
  };
};
export const removeByValue = function (arr, attr, value) {
  // 1数组 2属性 3属性值
  var index = -1;
  for (var i in arr) {
    if (arr[i][attr] === value) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    arr.splice(index, 1);
  }
};
/**
   *
   @author likaixuan
   *
   @date 2017-02-21
   *
   * 简易假深拷贝
   */
export const deepCopy = function (obj, keys = []) {
  let copyObj = {};
  if (Array.isArray(keys) && keys.length > 0) {
    keys.forEach((item) => {
      copyObj[item] = obj[item];
    });
    return JSON.parse(JSON.stringify(copyObj));
  } else {
    return JSON.parse(JSON.stringify(obj));
  }
};
// 树形过滤
export const fileterTree = function (data, child, prop, val) {
  // 树形数组  子节点名称  判断字段  字段值
  let list = [];
  function getArray(data, child, prop, value) {
    if (data) {
      for (var i in data) {
        // console.log('i', i)
        if (data[i][prop] === value) {
          list.push(data[i]);
          // return
        } else {
          // console.log('datai', data[i])
          getArray(data[i][child], child, prop, value);
        }
      }
    } else {
      // console.log(data)
    }
  }
  getArray(data, child, prop, val);
  return list;
};
/**
 * @author likaixuan
 * @date 2017-05-29
 *
 * 开发调试
 */

export const log = function () {
  console.log.apply(console, arguments);
};

/**
 * @author likaixuan
 * @date 2017-03-14
 *
 * 类型检测
 */

export const check = [
  "String",
  "Array",
  "Number",
  "Object",
  "Boolean",
  "Function",
  "Null",
  "Undefined",
].reduce((res, type) => {
  return Object.assign(res, {
    ["is" + type]: function (val) {
      return Object.prototype.toString.call(val) === "[object " + type + "]";
    },
  });
}, {});

export const uuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
};

/**
 * @author 不知道姓名的好心人
 * 清除所有cookie
 */
export const clearAllCookie = function () {
  var keys = document.cookie.match(/[^ =;]+(?==)/g);
  if (keys) {
    for (var i = keys.length; i--; ) {
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }
};

// 日期工具

export const dateTool = {
  cloneDate: function (date) {
    return new Date(date);
  },
  getCurrentYearFirstDay(date) {
    // date 所在年份第一天
    return new Date(date.getFullYear(), 0, 1);
  },
  getCurrentYearLastDay(date) {
    // date 所在年份最后一天
    return new Date(date.getFullYear(), 12, 0);
  },
  getNextYearFirstDay(date) {
    // date 所在年份下一年的第一天
    date = this.cloneDate(date);
    return new Date(date.setFullYear(date.getFullYear() + 1, 0, 1));
  },
  getNextYearLastDay(date) {
    // date 所在年份下一年的最后一天
    date = this.cloneDate(date);
    return new Date(date.setFullYear(date.getFullYear() + 1, 12, 0));
  },
  getPrevYearFirstDay(date) {
    // date 所在年份上一年的第一天
    date = this.cloneDate(date);
    return new Date(date.setFullYear(date.getFullYear() - 1, 0, 1));
  },
  getPrevYearLastDay(date) {
    // date  所在年份上一年的最后一天
    date = this.cloneDate(date);
    return new Date(date.setFullYear(date.getFullYear() - 1, 12, 0));
  },
  getCurrentMonthFirstDay(date) {
    // date 所在月份第一天
    date = this.cloneDate(date);
    return new Date(date.setDate(1));
  },
  getCurrentMonthLastDay(date) {
    // date 所在月份最后一天
    date = this.cloneDate(date);
    return new Date(date.setMonth(date.getMonth() + 1, 0));
  },
  getNextMonthFirstDay(date) {
    // date 所在月的下一月的第一天
    date = this.cloneDate(date);
    return new Date(date.setMonth(date.getMonth() + 1, 1));
  },
  getNextMonthLasttDay(date) {
    // date 所在月的下一月的最后一天
    date = this.cloneDate(date);
    return new Date(date.setMonth(date.getMonth() + 2, 0));
  },
  getPrevMonthFirstDay(date) {
    // date 所在月的上一月的第一天
    date = this.cloneDate(date);
    return new Date(date.setMonth(date.getMonth() - 1, 1));
  },
  getPrevMonthLasttDay(date) {
    // date 所在月的上一月的最后一天
    date = this.cloneDate(date);
    return new Date(date.setDate(0));
  },
  getCurrentWeekFirstDay(date) {
    // date 所在周第一天
    date = this.cloneDate(date);
    return new Date(date.setDate(date.getDate() - (date.getDay() - 1)));
  },
  getCurrentWeekLastDay(date) {
    // date 所在周最后一天
    date = this.cloneDate(date);
    return new Date(date.setDate(date.getDate() + (7 - date.getDay())));
  },
  getNextWeekFirstDay(date) {
    // date 所在周的下一周的第一天
    date = this.cloneDate(date);
    return new Date(date.setDate(date.getDate() - (date.getDay() - 1) + 7));
  },
  getNextWeekLastDay(date) {
    // date 所在周的下一周的最后一天
    date = this.cloneDate(date);
    return new Date(date.setDate(date.getDate() + (14 - date.getDay())));
  },
  getPrevWeekFirstDay(date) {
    // date 所在周的上一周的第一天
    date = this.cloneDate(date);
    return new Date(date.setDate(date.getDate() - (date.getDay() - 1) - 7));
  },
  getPrevWeekLastDay(date) {
    // date 所在周的上一周的最后一天
    date = this.cloneDate(date);
    return new Date(date.setDate(date.getDate() - (date.getDay() - 1) - 1));
  },
  getNextDay(date) {
    // date 下一天
    date = this.cloneDate(date);
    return new Date(date.setDate(date.getDate() + 1));
  },
  getPrevDay(date) {
    // date 上一天
    date = this.cloneDate(date);
    return new Date(date.setDate(date.getDate() - 1));
  },
};

// 对象转字符串
export const objToString = function (obj) {
  Object.keys(obj).reduce((str, key) => {
    if (typeof obj[key] === "function") {
      str += key + ":" + obj[key].toString() + ",\n";
    } else {
      str += key + ":" + JSON.stringify(obj[key], null, "\t") + ",\n";
    }
    return str;
  }, "");
};

// 首字母大写
export const firstToUpperCase = function (str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

// 首字母小写
export const firstToLowerCase = function (str) {
  return str.slice(0, 1).toLowerCase() + str.slice(1);
};

// 驼峰转下划线
export const humpToUnderline = function (name) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
};

// 下划线转驼峰
export const underlineToHump = function (name) {
  let mName = name.toLowerCase();
  return mName.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
};

//  对象数组删除指定对象
export const delObjArr = function (arr, prop, val) {
  arr.forEach((obj) => {
    if (obj[prop] === val) {
      if (arr.indexOf(obj) > -1) {
        var i = arr.indexOf(obj);
        arr.splice(i, 1);
      }
    }
  });
  return arr;
};

//  对象数组替换指定对象
export const repObjArr = function (arr, prop, val, data) {
  arr.forEach((obj) => {
    if (obj[prop] === val) {
      if (arr.indexOf(obj) > -1) {
        var i = arr.indexOf(obj);
        arr.splice(i, 1, data);
      }
    }
  });
  return arr;
};

/**
 * 获取数组中最后一个元素.
 * @param {array} arr - 源数组.
 */
export const getLastEl = function (arr) {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr[arr.length - 1];
  } else {
    return false;
  }
};

/**
 * 将对象数组转换为ids字符串.
 * @param {array} arr - 源数组.
 * @param {string} key -  键值.
 */
export const getIds = function (arr, key) {
  return arr
    .reduce((str, item) => {
      return `${str}${item[key]},`;
    }, "")
    .slice(0, -1);
};

// 对象转url
export const objToUrl = function (obj) {
  obj = obj || {};
  return Object.keys(obj)
    .reduce((str, key) => {
      return `${str}${key}=${obj[key]}&`;
    }, "?")
    .slice(0, -1);
};

// eval 替代版
export const evil = function (fn) {
  var Fn = Function;
  return new Fn("return " + fn)();
};

// sessionstore
export const ss = {
  obj: sessionStorage,
  set: function (key, val) {
    var arr = {};
    if (this.obj) {
      if (Array.isArray(val)) {
        for (var item in val) {
          arr[item] = val[item];
        }
        val = "<array>" + JSON.stringify(arr);
      } else if (typeof val === "object") {
        // 为对象设置标识
        val = "<json>" + JSON.stringify(val);
      }
      this.obj.setItem(key, val);
      return this.get(key);
    }
    return false;
  },
  get: function (key) {
    var result;
    if (this.obj) {
      result = this.obj.getItem(key);
      if (!result) {
        return false;
      }
      if (result.substr(0, 6) === "<json>") {
        // 返回对象
        return JSON.parse(result.slice(6));
      } else if (result.substr(0, 7) === "<array>") {
        // 返回数组
        var obj = JSON.parse(result.slice(7));
        var arr = [];
        for (var item in obj) {
          arr.push(obj[item]);
        }
        return arr;
      } else {
        // 返回字符串
        return result;
      }
    }
    return false;
  },
  del: function (key) {
    if (this.obj) {
      this.obj.removeItem(key);
    }
  },
  add: function (objName, key, val) {
    var result = this.get(objName);
    if (result) {
      if (typeof result === "object") {
        result[key] = val;
      }
      return this.set(objName, result);
    } else {
      // 不存在时创建
      this.set(objName, { [key]: val });
      return false;
    }
  },
  clear: function () {
    this.obj.clear();
  },
};

export const eventBus = {
  callbackListMap: {},
  argsCached: {},
  on(type, callback, isCallcache = false) {
    //绑定事件与回调
    if (!this.callbackListMap[type]) {
      this.callbackListMap[type] = [];
    }
    this.off(type, callback);

    if (!callback.once || !isCallcache) {
      this.callbackListMap[type].push(callback);
    }
    // 先发布后订阅
    if (isCallcache) {
      let args = this.argsCached[type];
      if (!!args && Array.isArray(args)) {
        callback.apply(null, args);
      }
    }
  },
  once(...args) {
    if (args.length >= 2) {
      args[1].once = true;
      this.on.apply(this, args);
    }
  },
  off(type, callback) {
    let callbackList = this.callbackListMap[type];
    if (!callbackList || callbackList.length === 0) {
      return;
    }
    console.log(type, callbackList.length);
    if (!callback) {
      this.argsCached[type] = null;
      this.callbackListMap[type] = [];
    } else {
      //这儿有问题，匿名函数不能判断相等
      const index = callbackList.indexOf(callback);
      if (index !== -1) {
        callbackList.splice(index, 1);
        this.callbackListMap[type] = callbackList;
      }
    }
  },
  emit(type, ...args) {
    // 缓存参数
    this.argsCached[type] = args;
    let callbackList = this.callbackListMap[type];
    if (!callbackList || callbackList.length === 0) {
      return;
    }
    this.callbackListMap[type] = callbackList.filter((item) => {
      item.apply(this, args);
      // 解绑once
      return !item.once;
    });
  },
};
