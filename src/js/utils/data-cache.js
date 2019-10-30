/*
 * Created Date: 2018-03-17 11:17:37
 * Author: yinzhida Email: zhaoxinxin@qiyi.com
 * -----
 * Last Modified: 2019-10-30 20:34:15
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 * Copyright (c) 2018 IQIYI
 */
import getLogger from '@/utils/logger';

const instances = new Map();
class DataCache {
  constructor (name, maxQueue) {
    this.logger = getLogger('SrtEngine');
    this.name = name || 'default';
    if (instances.has(name)) {
      this.logger.error('new DataCacheUtil', 'name is invalidate, ', name, 'have been used by others');
      return;
    }
    this.dataCacheQueue = [];
    this.maxCacheNumber = maxQueue || 10;
    instances.set(this.name, this);
  }

  static getInstanceByname (name, maxQueue) {
    if (instances.has(name)) {
      return instances.get(name);
    }
    return new DataCache(name, maxQueue);
  }

  add (key, data) {
    let queue = this.dataCacheQueue;
    while (queue.length >= this.maxCacheNumber) {
      queue.shift();
    }
    queue.push(new Map([[key, data]]));
  }

  clear () {
    this.dataCacheQueue.length = 0;
  }

  getDataByKey (key) {
    let dataMap = this.dataCacheQueue.find((map) => {
      return map.has(key);
    });
    let data = dataMap && dataMap.get(key);
    if (data) {
      this.logger.info('cacheUtilGetData', 'get data success from cache, key: ', key);
    } else {
      this.logger.info('cacheUtilGetData', 'get data failed!!! from cache, key: ', key);
    }
    return data;
  }

  getData (key) {
    return this.getDataByKey(key);
  }

  deleteDataByKey (key) {
    let index = this.dataCacheQueue.findIndex((dataMap) => {
      dataMap.has(key);
    });
    if (index > -1) {
      this.dataCacheQueue.splice(index, 1);
    } else {
      this.logger.warn('DataCacheUtil deleteDataByKey', 'data by key: ', key, ' not find!');
    }
  }
}
export default DataCache;
