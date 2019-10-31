(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["srt-engine"] = factory();
	else
		root["srt-engine"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__single__ = __webpack_require__(11);


/*
 * Created Date: 2018-03-01 11:14:20
 * Author: yinzhida Email: yinzhida@qiyi.com
 * -----
 * Last Modified: 2019-10-30 16:24:24
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 * Copyright (c) 2018 IQIYI
 */


var Logger = function () {
  function Logger(component) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Logger);

    this.name = component;
    this.debug = "production" !== 'production';
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Logger, [{
    key: 'log',
    value: function log() {
      if (this.debug) {
        var _console;

        (_console = console).log.apply(_console, arguments);
      }
    }
  }, {
    key: 'trans',
    value: function trans(method) {
      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      this.log.apply(this, ['%c[Data Transmission][' + new Date().toUTCString() + '] component: ' + this.name + ' > method: ' + method + ' > data: ', 'color: blue;'].concat(data));
    }
  }, {
    key: 'info',
    value: function info(method) {
      for (var _len2 = arguments.length, information = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        information[_key2 - 1] = arguments[_key2];
      }

      this.log.apply(this, ['%c[Info][' + new Date().toUTCString() + '] component: ' + this.name + ' > method: ' + method + ' > information: ', 'color: green;'].concat(information));
    }
  }, {
    key: 'warn',
    value: function warn(method) {
      var _console2;

      for (var _len3 = arguments.length, warning = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        warning[_key3 - 1] = arguments[_key3];
      }

      (_console2 = console).warn.apply(_console2, ['[Warning][' + new Date().toUTCString() + '] component: ' + this.name + ' > method: ' + method + ' > warning: '].concat(warning));
    }
  }, {
    key: 'error',
    value: function error(method) {
      var _console3;

      for (var _len4 = arguments.length, _error = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        _error[_key4 - 1] = arguments[_key4];
      }

      (_console3 = console).error.apply(_console3, ['[Error][' + new Date().toUTCString() + '] component: ' + this.name + ' > method: ' + method + ' > error: '].concat(_error));
    }
  }]);

  return Logger;
}();

var getLogger = Object(__WEBPACK_IMPORTED_MODULE_2__single__["a" /* default */])(Logger);

/* harmony default export */ __webpack_exports__["a"] = (getLogger);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatTime; });
/* unused harmony export getTimeNumbers */
/* unused harmony export formatNumber */
/**
 * @Desc:   时间处理工具
 * @Author: yinzhida
 * @Email:  yinzhida@qiyi.com
 * @Date:   2018-02-27 15:42:44
 * @Last Modified by:   yinzhida
 * @Last Modified time: 2018-02-28 15:21:33
 */

/**
 * 根据时间格式，将数字格式的时间转换为格式字符串
 * @param  {[type]} secondtime   [description]
 * @param  {[type]} formatString [description]
 * @return {[type]}              [description]
 */
var formatTime = function formatTime(secondtime, formatString, frameRate) {
  formatString = formatString || 'hh:mm:ss S';

  if (/SS+|FF+/.test(formatString)) {
    console.error('formatTime', '毫秒格式错误，不能有多个连续的S或F出现');
    return;
  }

  var timeKey = [{
    name: 'hour',
    regString: 'h+'
  }, {
    name: 'minute',
    regString: 'm+'
  }, {
    name: 'second',
    regString: 's+'
  }];

  if (!/S|F/.test(formatString)) {
    secondtime = Math.floor(secondtime);
  }

  var timeNumbers = getTimeNumbers(secondtime, frameRate);

  var _loop = function _loop(i, len) {
    formatString = formatString.replace(new RegExp(timeKey[i].regString), function (matchString, index, originalString) {
      return formatNumber(timeNumbers[timeKey[i].name], matchString.length);
    });
  };

  for (var i = 0, len = timeKey.length; i < len; i++) {
    _loop(i, len);
  }

  // 毫秒只支持3位模式
  formatString = formatString.replace(/S/, formatNumber(timeNumbers.milli, 3));
  formatString = formatString.replace(/F/, formatNumber(timeNumbers.frame));
  return formatString;
};

/**
 * 根据时间number获取小时，分钟，秒，毫秒数
 * @param  {[type]} secondtime [description]
 * @return {[type]}            [description]
 */
var getTimeNumbers = function getTimeNumbers(secondtime) {
  var frameRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;

  // 转成字符串
  secondtime = secondtime.toFixed(3);
  // 从小数点切分
  var timeArray = secondtime.split('.');
  // 小数点后三位是毫秒部分
  var milliSecond = 0;
  var frame = 0;
  if (timeArray[1]) {
    milliSecond = Math.round(Number('0.' + timeArray[1]) * 1000);
    frame = Math.floor(milliSecond / (1000 / frameRate));
  }
  // 分别获取时分秒
  var hour = 0;
  var minute = 0;
  var second = 0;
  // 一共多少秒
  var totalSeconds = Number(timeArray[0]);
  // 几个小时
  hour = Math.floor(totalSeconds / 3600);
  // 剩余秒数
  var firstRemain = totalSeconds % 3600;
  // 几分钟
  minute = Math.floor(firstRemain / 60);
  // 剩余秒数
  second = firstRemain % 60;

  var timeNumbers = {
    hour: hour,
    minute: minute,
    second: second,
    milli: milliSecond,
    frame: frame
  };

  return timeNumbers;
};

/**
 * 数字格式化,在数字前边加0，补全到几位，比如输入1,3，则输出001
 * @param  {[type]} number [description]
 * @param  {[type]} n      [description]
 * @return {[type]}        [description]
 */
var formatNumber = function formatNumber(number, n) {
  n = n || 2;
  number = number + '';
  var numberArray = number.split('');

  if (numberArray.length < n) {
    var len = n - numberArray.length;
    for (var i = 0; i < len; i++) {
      numberArray.unshift('0');
    }
  }

  var res = numberArray.join('');
  return res;
};



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @file guid.js
 * @module guid
 */

/**
 * Unique ID for an element or function
 * @type {Number}
 */
var _guid = 1;

/**
 * Get a unique auto-incrementing ID by number that has not been returned before.
 *
 * @return {number}
 *         A new unique ID.
 */
var newGUID = function newGUID() {
  return _guid++;
};

/* harmony default export */ __webpack_exports__["a"] = (newGUID);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = ({
  WILL_BUILD_INDEX_COUNT: 60,
  UID_INDEX_GROUP_SIZE: 50,
  ITME_INDEX_GROUP_DURATION: 1000 * 60 * 10 // 10分钟
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clazz_srt_engine__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SrtEngine", function() { return __WEBPACK_IMPORTED_MODULE_0__clazz_srt_engine__["a"]; });




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_utils_logger__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__js_utils_time__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__js_utils_guid__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__js_config_constants__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash_clonedeep__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash_clonedeep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash_clonedeep__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__js_utils_srt__ = __webpack_require__(13);










var SrtEngine = function () {
  function SrtEngine(shouldBuildIndex) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, SrtEngine);

    this.logger = Object(__WEBPACK_IMPORTED_MODULE_3__js_utils_logger__["a" /* default */])('SrtEngine');
    this.content = [];
    this.url = null;
    this.shouldBuildIndex = typeof shouldBuildIndex === 'boolean' ? shouldBuildIndex : true;
    this.timeIndexGroup = null;
    this.uidIndexGroup = null;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(SrtEngine, [{
    key: 'load',
    value: function load(url) {
      this.url = url;
      this.content = Object(__WEBPACK_IMPORTED_MODULE_8__js_utils_srt__["b" /* getSubtitleTextArrayByUrl */])(url);
      if (this.shouldBuildIndex && this.content.length > __WEBPACK_IMPORTED_MODULE_6__js_config_constants__["a" /* default */].WILL_BUILD_INDEX_COUNT) {
        this.buildIndex();
      }
      return this;
    }
  }, {
    key: 'compile',
    value: function compile(text) {
      this.url = '';
      this.content = Object(__WEBPACK_IMPORTED_MODULE_8__js_utils_srt__["c" /* getTextArrayFromText */])(text);
      if (this.shouldBuildIndex && this.content.length > __WEBPACK_IMPORTED_MODULE_6__js_config_constants__["a" /* default */].WILL_BUILD_INDEX_COUNT) {
        this.buildIndex();
      }
      return this;
    }
  }, {
    key: 'stringify',
    value: function stringify(styles) {
      var result = '';
      var len = this.content.length;
      for (var i = 0; i < len; i++) {
        var data = this.content[i];
        var id = i + 1;
        result += id + '\n';
        result += Object(__WEBPACK_IMPORTED_MODULE_4__js_utils_time__["a" /* formatTime */])(data.startTimeInMilliSeconds / 1000, 'hh:mm:ss,S');
        result += ' --> ';
        result += Object(__WEBPACK_IMPORTED_MODULE_4__js_utils_time__["a" /* formatTime */])(data.endTimeInMilliSeconds / 1000, 'hh:mm:ss,S');
        result += '\n';
        result += this.getStyledTexts(data.texts, styles).join('\n') + '\n\n';
      }
      return result;
    }
  }, {
    key: 'getStyledTexts',
    value: function getStyledTexts(texts, styles) {
      var supportStyles = [{
        name: 'fontColor',
        method: function method(text, value) {
          return '<font color="' + value + '">' + text + '</font>';
        }
      }, {
        name: 'fontSize',
        method: function method(text, value) {
          if (/<font\s color="/.test(text)) {
            text.replace('<font', '<font size=' + value);
          } else {
            return '<font size="' + value + '">' + text + '</font>';
          }
        }
      }, {
        name: 'bold',
        method: function method(text, value) {
          return '<b>' + text + '</b>';
        }
      }, {
        name: 'italic',
        method: function method(text, value) {
          return '<i>' + text + '</i>';
        }
      }, {
        name: 'underground',
        method: function method(text, value) {
          return '<u>' + text + '</u>';
        }
      }, {
        name: 'align',
        method: function method(text, value) {
          return '{\\an' + value + '}' + text;
        }
      }];

      var serialize = function serialize(text) {
        text = Object(__WEBPACK_IMPORTED_MODULE_8__js_utils_srt__["a" /* getPureText */])(text);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(supportStyles), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var style = _step.value;

            var styleValue = styles[style.name];
            if (styleValue) {
              text = style.method(text, styleValue);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      };

      texts.map(serialize);
    }
  }, {
    key: 'buildIndex',
    value: function buildIndex() {
      var len = this.content.length;
      this.timeIndexGroup = {};
      this.uidIndexGroup = {};
      for (var i = 0; i < len; i++) {
        var data = this.content[i];
        this._addToIndex(data);
      }
      return this;
    }
  }, {
    key: '_addToIndex',
    value: function _addToIndex(data) {
      this._addToTimeIndex(data);
      this._addToUidIndex(data);
    }
  }, {
    key: '_removeFromIndex',
    value: function _removeFromIndex(data) {
      this._removeFromTimeIndex(data);
      this._removeFromUidIndex(data);
    }
  }, {
    key: '_addToTimeIndex',
    value: function _addToTimeIndex(data) {
      var levelKey = this.getTimeLevelKey(data.startTimeInMilliSeconds);
      var endLevelKey = this.getTimeLevelKey(data.endTimeInMilliSeconds);
      this.timeIndexGroup[levelKey] = this.timeIndexGroup[levelKey] || [];
      this.timeIndexGroup[levelKey].push(data);
      if (levelKey !== endLevelKey) {
        this.timeIndexGroup[endLevelKey] = this.timeIndexGroup[endLevelKey] || [];
        this.timeIndexGroup[endLevelKey].push(data);
      }
    }
  }, {
    key: '_addToUidIndex',
    value: function _addToUidIndex(data) {
      var levelKey = this.getUidLevelKey(data.uid);
      this.timeIndexGroup[levelKey] = this.timeIndexGroup[levelKey] || [];
      this.timeIndexGroup[levelKey].push(data);
    }
  }, {
    key: '_removeFromTimeIndex',
    value: function _removeFromTimeIndex(data) {
      var levelKey = this.getTimeLevelKey(data.startTimeInMilliSeconds);
      var endLevelKey = this.getTimeLevelKey(data.endTimeInMilliSeconds);

      var currentGroup = this.timeIndexGroup[levelKey];
      var dataIndex = currentGroup.findIndex(function (item) {
        return item.uid === data.uid;
      });
      currentGroup.splice(dataIndex, 1);

      if (levelKey !== endLevelKey) {
        var currentEndGroup = this.timeIndexGroup[endLevelKey];
        var endDataIndex = currentEndGroup.findIndex(function (item) {
          return item.uid === data.uid;
        });
        currentEndGroup.splice(endDataIndex, 1);
      }
    }
  }, {
    key: '_removeFromUidIndex',
    value: function _removeFromUidIndex(data) {
      var levelKey = this.getUidLevelKey(data.uid);
      var currentGroup = this.uidIndexGroup[levelKey];
      var dataIndex = currentGroup.findIndex(function (item) {
        return item.uid === data.uid;
      });
      currentGroup.splice(dataIndex, 1);
    }
  }, {
    key: 'findByTime',
    value: function findByTime(milliSecondtime) {
      if (this.timeIndexGroup) {
        // 通过索引查询
        var levelKey = this.getTimeLevelKey(milliSecondtime);
        return this.timeIndexGroup[levelKey].find(function (item) {
          return item.startTimeInMilliSeconds < milliSecondtime && item.endTimeInMilliSeconds > milliSecondtime && !item.deleted;
        });
      } else {
        // 直接轮询查询
        var len = this.content.length;
        for (var i = 0; i < len; i++) {
          var data = this.content[i];
          if (data.startTimeInMilliSeconds < milliSecondtime && data.endTimeInMilliSeconds > milliSecondtime && !data.deleted) {
            return data;
          }
        }
      }
    }
  }, {
    key: 'getTimeLevelKey',
    value: function getTimeLevelKey(milliSecondtime) {
      return parseInt(milliSecondtime / __WEBPACK_IMPORTED_MODULE_6__js_config_constants__["a" /* default */].ITME_INDEX_GROUP_DURATION);
    }
  }, {
    key: 'getUidLevelKey',
    value: function getUidLevelKey(uid) {
      return parseInt(uid / __WEBPACK_IMPORTED_MODULE_6__js_config_constants__["a" /* default */].UID_INDEX_GROUP_SIZE);
    }
  }, {
    key: 'findByText',
    value: function findByText(word) {
      var searchResult = [];
      var len = this.content.length;

      for (var i = 0; i < len; i++) {
        var data = this.content[i];
        if (!data.deleted && data.texts.join('\n').indexOf(word) !== -1) {
          searchResult.push(data);
        }
      }

      return searchResult;
    }
  }, {
    key: 'findByUid',
    value: function findByUid(uid) {
      if (this.timeIndexGroup) {
        // 通过索引查询
        var levelKey = this.getUidLevelKey(uid);
        return this.uidIndexGroup[levelKey].find(function (item) {
          return item.uid === uid && !item.deleted;
        });
      } else {
        // 直接轮询查询
        var len = this.content.length;
        for (var i = 0; i < len; i++) {
          var data = this.content[i];
          if (data.uid === uid && !data.deleted) {
            return data;
          }
        }
      }
    }
  }, {
    key: 'addDialogue',
    value: function addDialogue(_ref) {
      var startTimeInMilliSeconds = _ref.startTimeInMilliSeconds,
          endTimeInMilliSeconds = _ref.endTimeInMilliSeconds,
          texts = _ref.texts,
          index = _ref.index;

      var data = {
        uid: Object(__WEBPACK_IMPORTED_MODULE_5__js_utils_guid__["a" /* default */])(),
        id: null,
        startTimeInMilliSeconds: startTimeInMilliSeconds,
        endTimeInMilliSeconds: endTimeInMilliSeconds,
        texts: texts
      };
      this.content.splice(index, 0, data);
      if (this.shouldBuildIndex) {
        if (this.timeIndexGroup !== null && this.uidIndexGroup !== null) {
          this._addToIndex(data);
        } else {
          this.buildIndex();
        }
      }
      return this;
    }
  }, {
    key: 'updateDialogueByUid',
    value: function updateDialogueByUid(uid, info) {
      var data = this.findByUid(uid);
      var originData = __WEBPACK_IMPORTED_MODULE_7_lodash_clonedeep___default()(data);
      var needUpdateTimeIndex = false;

      if (typeof info.startTimeInMilliSeconds === 'number') {
        needUpdateTimeIndex = true;
        data.startTimeInMilliSeconds = info.startTimeInMilliSeconds;
      }

      if (typeof info.endTimeInMilliSeconds === 'number') {
        needUpdateTimeIndex = true;
        data.endTimeInMilliSeconds = info.endTimeInMilliSeconds;
      }

      if (this.timeIndexGroup !== null && needUpdateTimeIndex) {
        this._removeFromIndex(originData);
        this._addToIndex(data);
      }

      data.texts = info.texts;
    }
  }, {
    key: 'removeDialogueByUid',
    value: function removeDialogueByUid(uid) {
      var data = this.findByUid(uid);
      data.deleted = true;
    }
  }, {
    key: 'sort',
    value: function sort() {
      this.content.sort(function (a, b) {
        return a.startTimeInMilliSeconds - b.startTimeInMilliSeconds;
      });
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      return __WEBPACK_IMPORTED_MODULE_7_lodash_clonedeep___default()(this.content.filter(function (item) {
        return !item.deleted;
      }).map(function (item) {
        item.texts.map(__WEBPACK_IMPORTED_MODULE_8__js_utils_srt__["a" /* getPureText */]);
        return item;
      }));
    }
  }]);

  return SrtEngine;
}();

/* harmony default export */ __webpack_exports__["a"] = (SrtEngine);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * Created Date: 2018-03-15 10:23:03
 * Author: yinzhida Email: zhaoxinxin@qiyi.com
 * -----
 * Last Modified: 2019-03-26 18:25:51
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 * Copyright (c) 2018 IQIYI
 */
var getClassSingleton = function getClassSingleton(Clazz) {
  var result = void 0;
  return function () {
    return result || (result = new Clazz(arguments));
  };
};

/* harmony default export */ __webpack_exports__["a"] = (getClassSingleton);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("lodash.clonedeep");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getMilliSecondsFromString */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getPureText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getTextArrayFromText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getSubtitleTextArrayByUrl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_dao_dao__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_cache__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__guid__ = __webpack_require__(5);




var _this = this;

/*
 * Created Date: 2018-04-18 5:34:06
 * Author: yinzhida Email: zhaoxinxin@qiyi.com
 * -----
 * Last Modified: 2019-10-31 16:16:53
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 * Copyright (c) 2018 IQIYI
 */





var getMilliSecondsFromString = function getMilliSecondsFromString(timeStr) {
  // 时间格式转换
  var timeDivide = timeStr.split(',');
  var milliSecond = Number(timeDivide[1]);
  var otherTimeStr = timeDivide[0];
  var hmsArray = otherTimeStr.split(':');
  milliSecond = hmsArray[0] * 60 * 60 * 1000 + hmsArray[1] * 60 * 1000 + hmsArray[2] * 1000 + milliSecond;
  return milliSecond;
};

var getPureText = function getPureText(text) {
  if (!text) {
    return '';
  }
  return text.replace(/{\\.*?}/g, '').replace(/<\/?.*?>/g, '');
};

var getTextArrayFromText = function getTextArrayFromText(text) {
  var lineArray = text.split('\n');
  try {
    // 一条字幕的开始点
    var marker = 0;
    var dataArray = [];
    for (var i = 0; i < lineArray.length; i++) {
      // here is a start point of data
      if (i === marker) {
        // default timeString
        var timeArr = ['00:00:00,000', '00:00:00,000'];
        if (i + 1 >= lineArray.length) {
          return dataArray;
        }

        var timeStr = lineArray[i + 1];
        if (timeStr !== '') {
          timeArr = timeStr.trim().split(/\s+/).filter(function (item) {
            return (/\d{1,2}:\d{1,2}:\d{1,2},\d{1,3}/.test(item)
            );
          });
        }

        var data = {
          uid: Object(__WEBPACK_IMPORTED_MODULE_5__guid__["a" /* default */])(),
          id: lineArray[i].trim(), // id
          startTimeInMilliSeconds: getMilliSecondsFromString(timeArr[0]), // 根据字幕里的事件字符串，获取开始结束的以毫秒计数的时间点
          endTimeInMilliSeconds: getMilliSecondsFromString(timeArr[1]), // 根据字幕里的事件字符串，获取开始结束的以毫秒计数的时间点
          texts: [] // subtitle content,may have several lines
        };

        // 如果这些数据有误，说明这个字幕文件格式不太对。
        if (isNaN(data.id) || isNaN(data.startTimeInMilliSeconds) || isNaN(data.endTimeInMilliSeconds)) {
          throw new Error('字幕文件的内容，格式有误！');
        }

        // now point to the content line i+2，就是说id和时间后边，是这个字幕的内容，这部分是从第三行开始
        var contentLineNumber = 2;
        if (i + contentLineNumber >= lineArray.length) {
          data.texts.push('');
          dataArray.push(data);
          return dataArray;
        }

        // 当然这个字幕到底是有一行字幕还是有两行或者三行字幕都不好说，所以做一下循环，看看到底有几行
        // if line i+2 have words, then it must be the subtitle contentline. and we should find it's next line, util we get a '', another case is there is'nt content line.
        while (lineArray[i + contentLineNumber].trim() !== '') {
          data.texts.push(getPureText(lineArray[i + contentLineNumber]));
          contentLineNumber++;
          if (i + contentLineNumber >= lineArray.length) {
            data.texts.push('');
            dataArray.push(data);
            return dataArray;
          }
        }

        // 查找完字幕内容，就该来分析一下，这句字幕是不是结束啦，后边空行是不是有多于一行，然后计算出下一句字幕的开始位置（marker）。
        // now we know at the index 'i+contentLineNumber' we get a '', so we should see the next line 'i+contentLineNumber+1' until we get some words.
        var divideLineNumber = i + contentLineNumber + 1;
        if (divideLineNumber >= lineArray.length) {
          marker = 0;
          dataArray.push(data);
          return dataArray;
        }

        // 这个地方空行可能也不止一行，不过按理说应该是一行才对。
        while (lineArray[divideLineNumber].trim() === '') {
          divideLineNumber++;
          if (divideLineNumber >= lineArray.length) {
            marker = 0;
            dataArray.push(data);
            return dataArray;
          }
        }

        // here we got a new marker point.
        marker = divideLineNumber;
        i = divideLineNumber - 1;
        dataArray.push(data);
      }
    }

    dataArray.originText = text;

    return dataArray;
  } catch (e) {
    console.error('getTextArrayFromText', '解析文件出错，文件格式可能不正确。', e.toString());
    return [];
  }
};

var getSubtitleTextArrayByUrl = function () {
  var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(url) {
    var cacheUtil, textArray, result;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cacheUtil = __WEBPACK_IMPORTED_MODULE_4__data_cache__["a" /* default */].getInstanceByname('subtitleText', 2);
            textArray = cacheUtil.getData(url);

            if (!textArray) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', textArray);

          case 4:
            _context.next = 6;
            return Object(__WEBPACK_IMPORTED_MODULE_3__js_dao_dao__["a" /* fetchBlob */])(url).then(function (blob) {
              return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
                var reader = new FileReader();
                reader.onload = function (e) {
                  var text = reader.result;
                  var textArray = getTextArrayFromText(text);
                  var cacheUtil = __WEBPACK_IMPORTED_MODULE_4__data_cache__["a" /* default */].getInstanceByname('subtitleText', 2);
                  cacheUtil.add(url, textArray);
                  resolve(textArray);
                };
                reader.readAsText(blob, 'UTF-8');
              });
            });

          case 6:
            result = _context.sent;
            return _context.abrupt('return', result);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function getSubtitleTextArrayByUrl(_x) {
    return _ref.apply(this, arguments);
  };
}();



/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GET */
/* unused harmony export POST */
/* unused harmony export request */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchBlob; });
/* unused harmony export fetchText */
/* unused harmony export fetchJSON */
/* unused harmony export fetchArrayBuffer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__js_utils_common_util__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__js_utils_logger__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_query_string__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_query_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash_merge__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash_merge__);




/**
 * @Desc:   Http Utils in video-editor
 * @Author: yinzhida
 * @Email:  yinzhida@qiyi.com
 * @Date:   2018-02-09 17:59:45
 * @Last Modified by:   yinzhida
 * @Last Modified time: 2018-02-28 15:05:14
 */





function checkCode(json) {
  var code = json.code;
  var message = json.msg || 'error';

  if (Object(__WEBPACK_IMPORTED_MODULE_4__js_utils_common_util__["a" /* isFetchSuccess */])(code)) {
    return json;
  } else {
    var logger = Object(__WEBPACK_IMPORTED_MODULE_5__js_utils_logger__["a" /* default */])('SrtEngine');
    logger.error('checkCode', 'Server error: ', code, ', message: ', message);
  }
}

function fetchFactory(process) {
  return function () {
    var _ref = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee(url, options) {
      var startTime, result;
      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              startTime = Date.now() && performance && performance.now();
              _context.next = 3;
              return request(url, options).then(function (response) {
                var endTime = Date.now() && performance && performance.now();
                response.timing = endTime - startTime;
                var logger = Object(__WEBPACK_IMPORTED_MODULE_5__js_utils_logger__["a" /* default */])('SrtEngine');
                logger.trans('fetchFactory', response);
                if (process) {
                  return process(response);
                }

                return response;
              });

            case 3:
              result = _context.sent;
              return _context.abrupt('return', result);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

var request = function () {
  var _ref2 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee2(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var headers;
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = __WEBPACK_IMPORTED_MODULE_7_lodash_merge___default()({
              method: 'GET',
              mode: 'cors',
              headers: new Headers()
            }, options);

            if (options.method.toUpperCase() === 'GET') {
              if (options.data != null) {
                url = url + '?' + __WEBPACK_IMPORTED_MODULE_6_query_string___default.a.stringify(options.data);
              }
            } else if (options.method.toUpperCase() === 'POST') {
              headers = options.headers;


              if (options.type && options.type.toUpperCase() === 'JSON') {
                headers.set('content-type', 'application/json; charset=utf-8');
                if (options.data != null) {
                  options.body = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(options.data);
                }
              } else if (options.type && options.type.toUpperCase() === 'FORM') {
                headers.set('content-type', 'application/x-www-form-urlencoded; charset=utf-8');
                if (options.data != null) {
                  options.body = __WEBPACK_IMPORTED_MODULE_6_query_string___default.a.stringify(options.data);
                }
              }
            }

            return _context2.abrupt('return', fetch(url, options));

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function request(_x3) {
    return _ref2.apply(this, arguments);
  }

  return request;
}();

var GET = function () {
  var _ref3 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee3(url, options) {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', fetchFactory(function (response) {
              return response;
            })(url, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(options, {
              method: 'GET'
            })));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function GET(_x5, _x6) {
    return _ref3.apply(this, arguments);
  }

  return GET;
}();

var POST = function () {
  var _ref4 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee4(url, options) {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', fetchFactory(function (response) {
              return response;
            })(url, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(options, {
              method: 'POST'
            })));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  function POST(_x7, _x8) {
    return _ref4.apply(this, arguments);
  }

  return POST;
}();

var fetchBlob = function () {
  var _ref5 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee5(url, options) {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', fetchFactory(function (response) {
              return response.blob();
            })(url, options));

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  function fetchBlob(_x9, _x10) {
    return _ref5.apply(this, arguments);
  }

  return fetchBlob;
}();

var fetchText = function () {
  var _ref6 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee6(url, options) {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', fetchFactory(function (response) {
              return response.text();
            })(url, options));

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  function fetchText(_x11, _x12) {
    return _ref6.apply(this, arguments);
  }

  return fetchText;
}();

var fetchJSON = function () {
  var _ref7 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee7(url, options) {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', fetchFactory(function (response) {
              return response.json().then(function (json) {
                return checkCode(json);
              });
            })(url, options));

          case 1:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  function fetchJSON(_x13, _x14) {
    return _ref7.apply(this, arguments);
  }

  return fetchJSON;
}();

var fetchArrayBuffer = function () {
  var _ref8 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee8(url, options) {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt('return', fetchFactory(function (response) {
              return response.arrayBuffer();
            })(url, options));

          case 1:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  function fetchArrayBuffer(_x15, _x16) {
    return _ref8.apply(this, arguments);
  }

  return fetchArrayBuffer;
}();



/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isFetchSuccess; });
/* unused harmony export hasAuth */
/* unused harmony export getObjArrayAttributeIndexs */
/* unused harmony export setObjArrayAttributeValue */
/* unused harmony export closeWebPage */
/* unused harmony export generateRandom */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_config_constants__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__time__ = __webpack_require__(4);
/* unused harmony reexport formatTime */

/**
 * @Desc:   常用基本工具类
 * @Author: yinzhida
 * @Email:  yinzhida@qiyi.com
 * @Date:   2018-02-11 16:44:02
 * @Last Modified by: zhaoxinxin
 * @Last Modified time: 2019-02-28 19:47:28
 */



/**
 * @description 判断json格式的fetch是否成功
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
var isFetchSuccess = function isFetchSuccess() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var code = typeof data === 'string' ? data : data.code;
  return code != null ? code === __WEBPACK_IMPORTED_MODULE_1__js_config_constants__["a" /* default */].SUCCESS_CODE : true;
};

var hasAuth = function hasAuth(auth, cutomGlobal) {
  var global = cutomGlobal || window.GLOBAL || {};
  var auths = global['AUTH_LIST'] || [];
  return auths.includes(auth);
};

/**
 * @description 给数组内部对象某属性方法设置值
 */
var setObjArrayAttributeValue = function setObjArrayAttributeValue(objArray, attributeName, attributeValue, index, singleValue) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(objArray), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var obj = _step.value;

      obj[attributeName] = attributeValue;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (index !== undefined && singleValue !== undefined) {
    objArray[index][attributeName] = singleValue;
  }
};

/**
 * @description 获取数组内部对象某属性为特定值的对象的索引值
 */
var getObjArrayAttributeIndexs = function getObjArrayAttributeIndexs(objArray, attributeName, attributeValue) {
  var len = objArray.length;
  var result = [];
  for (var i = 0; i < len; i++) {
    var obj = objArray[i];
    if (obj[attributeName] === attributeValue) {
      result.push(i);
    }
  }
  return result;
};

var closeWebPage = function closeWebPage() {
  if (navigator.userAgent.indexOf('MSIE') > 0) {
    if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
      window.opener = null;
      window.close();
    } else {
      window.open('', '_top');
      window.top.close();
    }
  } else if (navigator.userAgent.indexOf('Firefox') > 0 || navigator.userAgent.indexOf('Chrome') > 0) {
    window.location.href = 'about:blank';
    window.close();
  } else {
    window.opener = null;
    window.open('', '_self');
    window.close();
  }
};
/**
 * 生成从min-max之间的n个不重复随机数
*/
var generateRandom = function generateRandom(n, min, max) {
  var a = [];

  if (min > max) {
    return [0];
  }

  for (var i = 0; i < n; i++) {
    a.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  a.sort(function () {
    return 0.5 - Math.random();
  });

  return a;
};



/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("lodash.merge");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_utils_logger__ = __webpack_require__(2);



/*
 * Created Date: 2018-03-17 11:17:37
 * Author: yinzhida Email: zhaoxinxin@qiyi.com
 * -----
 * Last Modified: 2019-10-31 16:15:23
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 * Copyright (c) 2018 IQIYI
 */


var instances = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a();

var DataCache = function () {
  function DataCache(name, maxQueue) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, DataCache);

    this.logger = Object(__WEBPACK_IMPORTED_MODULE_3__js_utils_logger__["a" /* default */])('SrtEngine');
    this.name = name || 'default';
    if (instances.has(name)) {
      this.logger.error('new DataCacheUtil', 'name is invalidate, ', name, 'have been used by others');
      return;
    }
    this.dataCacheQueue = [];
    this.maxCacheNumber = maxQueue || 10;
    instances.set(this.name, this);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(DataCache, [{
    key: 'add',
    value: function add(key, data) {
      var queue = this.dataCacheQueue;
      while (queue.length >= this.maxCacheNumber) {
        queue.shift();
      }
      queue.push(new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a([[key, data]]));
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.dataCacheQueue.length = 0;
    }
  }, {
    key: 'getDataByKey',
    value: function getDataByKey(key) {
      var dataMap = this.dataCacheQueue.find(function (map) {
        return map.has(key);
      });
      var data = dataMap && dataMap.get(key);
      if (data) {
        this.logger.info('cacheUtilGetData', 'get data success from cache, key: ', key);
      } else {
        this.logger.info('cacheUtilGetData', 'get data failed!!! from cache, key: ', key);
      }
      return data;
    }
  }, {
    key: 'getData',
    value: function getData(key) {
      return this.getDataByKey(key);
    }
  }, {
    key: 'deleteDataByKey',
    value: function deleteDataByKey(key) {
      var index = this.dataCacheQueue.findIndex(function (dataMap) {
        dataMap.has(key);
      });
      if (index > -1) {
        this.dataCacheQueue.splice(index, 1);
      } else {
        this.logger.warn('DataCacheUtil deleteDataByKey', 'data by key: ', key, ' not find!');
      }
    }
  }], [{
    key: 'getInstanceByname',
    value: function getInstanceByname(name, maxQueue) {
      if (instances.has(name)) {
        return instances.get(name);
      }
      return new DataCache(name, maxQueue);
    }
  }]);

  return DataCache;
}();

/* harmony default export */ __webpack_exports__["a"] = (DataCache);

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/map");

/***/ })
/******/ ]);
});
//# sourceMappingURL=srt-engine.js.map