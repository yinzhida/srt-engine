import getLogger from '@/js/utils/logger';
import { formatTime } from '@/js/utils/time';
import newGUID from '@/js/utils/guid';

import { getSubtitleTextArrayByUrl, getTextArrayFromText } from '@/js/utils/srt';

class SrtEngine {
  constructor (shouldBuildIndex) {
    this.logger = getLogger('SrtEngine');
    this.content = [];
    this.url = null;
    this.shouldBuildIndex = typeof shouldBuildIndex === 'boolean' ? shouldBuildIndex : true;
    this.indexGroup = null;
  }

  load (url) {
    this.url = url;
    this.content = getSubtitleTextArrayByUrl(url);
    if (this.shouldBuildIndex) {
      this.buildIndex();
    }
  }

  compile (text) {
    this.url = '';
    this.content = getTextArrayFromText(text);
    if (this.shouldBuildIndex) {
      this.buildIndex();
    }
  }

  stringify () {
    let result = '';
    let len = this.content.length;
    for (let i = 0; i < len; i++) {
      let data = this.content[i];
      let id = i + 1;
      result += id + '\n';
      result += formatTime((data.startTimeInMilliSeconds / 1000), 'hh:mm:ss,S');
      result += ' --> ';
      result += formatTime((data.endTimeInMilliSeconds / 1000), 'hh:mm:ss,S');
      result += '\n';
      result += data.texts.join('\n') + '\n\n';
    }
    return result;
  }

  buildIndex () {
    const len = this.content.length;
    this.indexGroup = {};
    for (let i = 0; i < len; i++) {
      const data = this.content[i];
      const levelKey = this.getLevelKey(data.startTimeInMilliSeconds);
      this.indexGroup[levelKey] = this.indexGroup[levelKey] || [];
      this.indexGroup[levelKey].push(data);
    }
  }

  findByTime (milliSecondtime) {
    if (this.indexGroup) { // 通过索引查询
      const levelKey = this.getLevelKey(milliSecondtime);
      return this.indexGroup[levelKey].find((item) => {
        return item.startTimeInMilliSeconds < milliSecondtime &&
          item.endTimeInMilliSeconds > milliSecondtime;
      });
    } else { // 直接轮询查询
      let len = this.content.length;
      for (let i = 0; i < len; i++) {
        let data = this.content[i];
        if (data.startTimeInMilliSeconds < milliSecondtime &&
          data.endTimeInMilliSeconds > milliSecondtime) {
          return data;
        }
      }
    }
  }

  getLevelKey (milliSecondtime) {
    return parseInt(milliSecondtime / 100 / 60 / 10);
  }

  findByText () {

  }

  findById () {

  }

  addDialogue ({ startTimeInMilliSeconds, endTimeInMilliSeconds, texts, index }) {
    let data = {
      uid: newGUID(),
      id: index,
      startTimeInMilliSeconds,
      endTimeInMilliSeconds,
      texts,
    };
    this.content.splice(index, 0, data);
    this.updateIndex();
  }

  updateDialogue () {

  }

  removeDialogue () {

  }

  getContent () {
    return this.content;
  }
}

export default SrtEngine;
