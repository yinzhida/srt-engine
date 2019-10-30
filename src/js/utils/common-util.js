/**
 * @Desc:   常用基本工具类
 * @Author: yinzhida
 * @Email:  yinzhida@qiyi.com
 * @Date:   2018-02-11 16:44:02
 * @Last Modified by: zhaoxinxin
 * @Last Modified time: 2019-02-28 19:47:28
 */
import Constants from '@/config/Constants';
import { formatTime } from './TimeUtil';

/**
 * @description 判断json格式的fetch是否成功
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
const isFetchSuccess = (data = {}) => {
    const code = typeof data === 'string' ? data : data.code;
    return code != null ? code === Constants.SUCCESS_CODE : true;
};

const hasAuth = (auth, cutomGlobal) => {
    let global = cutomGlobal || window.GLOBAL || {};
    let auths = global['AUTH_LIST'] || [];
    return auths.includes(auth);
};

/**
 * @description 给数组内部对象某属性方法设置值
 */
const setObjArrayAttributeValue = (objArray, attributeName, attributeValue, index, singleValue) => {
    for (let obj of objArray) {
        obj[attributeName] = attributeValue;
    }
    if (index !== undefined && singleValue !== undefined) {
        objArray[index][attributeName] = singleValue;
    }
};

/**
 * @description 获取数组内部对象某属性为特定值的对象的索引值
 */
const getObjArrayAttributeIndexs = (objArray, attributeName, attributeValue) => {
    let len = objArray.length;
    let result = [];
    for (let i = 0; i < len; i++) {
        let obj = objArray[i];
        if (obj[attributeName] === attributeValue) {
            result.push(i);
        }
    }
    return result;
};

const closeWebPage = () => {
    if (navigator.userAgent.indexOf('MSIE') > 0) {
        if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
            window.opener = null;
            window.close();
        } else {
            window.open('', '_top');
            window.top.close();
        }
    } else if (navigator.userAgent.indexOf('Firefox') > 0 || navigator.userAgent.indexOf('Chrome') > 0) {
        //window.location.href = 'about:blank ';
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
const generateRandom = (n, min, max) => {
    let a = [];

    if (min > max) {
        return [0];
    }

    for (let i = 0; i < n; i++) {
        a.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    a.sort(() => {
        return 0.5 - Math.random();
    });

    return a;
};

export {
    isFetchSuccess,
    hasAuth,
    formatTime,
    getObjArrayAttributeIndexs,
    setObjArrayAttributeValue,
    closeWebPage,
    generateRandom
};
