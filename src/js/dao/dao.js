/**
 * @Desc:   Http Utils in video-editor
 * @Author: yinzhida
 * @Email:  yinzhida@qiyi.com
 * @Date:   2018-02-09 17:59:45
 * @Last Modified by:   yinzhida
 * @Last Modified time: 2018-02-28 15:05:14
 */
import { isFetchSuccess } from '@/js/utils/common-util';
import getLogger from '@/js/utils/logger';
import queryString from 'query-string';
import merge from 'lodash.merge';


function checkCode (json) {
  let code = json.code;
  let message = json.msg || 'error';

  if (isFetchSuccess(code)) {
    return json;
  } else {
    const logger = getLogger('SrtEngine');
    logger.error('checkCode', 'Server error: ', code, ', message: ', message);
  }
}

function fetchFactory (process) {
  return async function (url, options) {
    const startTime = Date.now() && performance && performance.now();
    let result = await request(url, options).then(response => {
      const endTime = Date.now() && performance && performance.now();
      response.timing = endTime - startTime;
      const logger = getLogger('SrtEngine');
      logger.trans('fetchFactory', response);
      if (process) {
        return process(response);
      }

      return response;
    });
    return result;
  };
}

const request = async function request (url, options = {}) {
  options = merge({
    method: 'GET',
    mode: 'cors',
    headers: new Headers()
  }, options);

  if (options.method.toUpperCase() === 'GET') {
    if (options.data != null) {
      url = url + '?' + queryString.stringify(options.data);
    }
  } else if (options.method.toUpperCase() === 'POST') {
    let headers = options.headers;

    if (options.type && options.type.toUpperCase() === 'JSON') {
      headers.set('content-type', 'application/json; charset=utf-8');
      if (options.data != null) {
        options.body = JSON.stringify(options.data);
      }
    } else if (options.type && options.type.toUpperCase() === 'FORM') {
      headers.set('content-type', 'application/x-www-form-urlencoded; charset=utf-8');
      if (options.data != null) {
        options.body = queryString.stringify(options.data);
      }
    }
  }

  return fetch(url, options);
};


const GET = async function GET (url, options) {
  return fetchFactory((response) => {
    return response;
  })(url, Object.assign(options, {
    method: 'GET'
  }));
};

const POST = async function POST (url, options) {
  return fetchFactory((response) => {
    return response;
  })(url, Object.assign(options, {
    method: 'POST'
  }));
};

const fetchBlob = async function fetchBlob (url, options) {
  return fetchFactory((response) => {
    return response.blob();
  })(url, options);
};

const fetchText = async function fetchText (url, options) {
  return fetchFactory((response) => {
    return response.text();
  })(url, options);
};

const fetchJSON = async function fetchJSON (url, options) {
  return fetchFactory((response) => {
    return response.json().then(json => checkCode(json));
  })(url, options);
};

const fetchArrayBuffer = async function fetchArrayBuffer (url, options) {
  return fetchFactory((response) => {
    return response.arrayBuffer();
  })(url, options);
};

export {
  GET,
  POST,
  request,
  fetchBlob,
  fetchText,
  fetchJSON,
  fetchArrayBuffer
};
