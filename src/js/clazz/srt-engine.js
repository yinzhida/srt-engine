import getLogger from '@/js/utils/logger';
import { formatTime } from '@/js/utils/time';
import newGUID from '@/js/utils/guid';
import constants from '@/js/config/constants';
import cloneDeep from 'lodash.clonedeep';
import { getSubtitleTextArrayByUrl, getTextArrayFromText, getPureText } from '@/js/utils/srt';

class SrtEngine {
  constructor (shouldBuildIndex) {
    this.logger = getLogger('SrtEngine');
    this.content = [];
    this.url = null;
    this.shouldBuildIndex = typeof shouldBuildIndex === 'boolean' ? shouldBuildIndex : true;
    this.timeIndexGroup = null;
    this.uidIndexGroup = null;
    this.modified = false;
  }

  async load (url) {
    this.url = url;
    this.content = await getSubtitleTextArrayByUrl(url);
    if (this.shouldBuildIndex && this.content.length > constants.WILL_BUILD_INDEX_COUNT) {
      this.buildIndex();
    }
    return this;
  }

  compile (text) {
    this.url = '';
    this.content = getTextArrayFromText(text);
    if (this.shouldBuildIndex && this.content.length > constants.WILL_BUILD_INDEX_COUNT) {
      this.buildIndex();
    }
    return this;
  }

  stringify (styles) {
    if (this.modified === false) {
      return this.content.originText;
    }

    let result = '';
    let content = this.getContent();
    let len = content.length;
    for (let i = 0; i < len; i++) {
      let data = content[i];
      let id = i + 1;
      result += id + '\n';
      result += formatTime((data.startTimeInMilliSeconds / 1000), 'hh:mm:ss,S');
      result += ' --> ';
      result += formatTime((data.endTimeInMilliSeconds / 1000), 'hh:mm:ss,S');
      result += '\n';
      result += this.getStyledTexts(data.texts, styles).join('\n') + '\n\n';
    }
    console.log(result);
    return result;
  }

  getStyledTexts (texts, styles) {
    const supportStyles = [{
      name: 'fontColor',
      method (text, value) {
        return `<font color="${value}">${text}</font>`;
      }
    }, {
      name: 'fontSize',
      method (text, value) {
        if (/<font\scolor="/.test(text)) {
          return text.replace('<font', `<font size=${value}`);
        } else {
          return `<font size="${value}">${text}</font>`;
        }
      }
    }, {
      name: 'bold',
      method (text, value) {
        return `<b>${text}</b>`;
      }
    }, {
      name: 'italic',
      method (text, value) {
        return `<i>${text}</i>`;
      }
    }, {
      name: 'underground',
      method (text, value) {
        return `<u>${text}</u>`;
      }
    }, {
      name: 'align',
      method (text, value) {
        return `{\\an${value}}${text}`;
      }
    }];

    const serialize = (text) => {
      text = getPureText(text);
      for (let style of supportStyles) {
        let styleValue = styles[style.name];
        if (styleValue) {
          text = style.method(text, styleValue);
        }
      }
      return text;
    };

    return texts.map(serialize);
  }

  buildIndex () {
    const len = this.content.length;
    this.timeIndexGroup = {};
    this.uidIndexGroup = {};
    for (let i = 0; i < len; i++) {
      const data = this.content[i];
      this._addToIndex(data);
    }
    return this;
  }

  _addToIndex (data) {
    this._addToTimeIndex(data);
    this._addToUidIndex(data);
  }

  _removeFromIndex (data) {
    this._removeFromTimeIndex(data);
    this._removeFromUidIndex(data);
  }

  _addToTimeIndex (data) {
    const levelKey = this.getTimeLevelKey(data.startTimeInMilliSeconds);
    const endLevelKey = this.getTimeLevelKey(data.endTimeInMilliSeconds);
    this.timeIndexGroup[levelKey] = this.timeIndexGroup[levelKey] || [];
    this.timeIndexGroup[levelKey].push(data);
    if (levelKey !== endLevelKey) {
      this.timeIndexGroup[endLevelKey] = this.timeIndexGroup[endLevelKey] || [];
      this.timeIndexGroup[endLevelKey].push(data);
    }
  }

  _addToUidIndex (data) {
    const levelKey = this.getUidLevelKey(data.uid);
    this.uidIndexGroup[levelKey] = this.uidIndexGroup[levelKey] || [];
    this.uidIndexGroup[levelKey].push(data);
  }

  _removeFromTimeIndex (data) {
    const levelKey = this.getTimeLevelKey(data.startTimeInMilliSeconds);
    const endLevelKey = this.getTimeLevelKey(data.endTimeInMilliSeconds);

    let currentGroup = this.timeIndexGroup[levelKey];
    let dataIndex = currentGroup.findIndex(item => item.uid === data.uid);
    currentGroup.splice(dataIndex, 1);

    if (levelKey !== endLevelKey) {
      let currentEndGroup = this.timeIndexGroup[endLevelKey];
      let endDataIndex = currentEndGroup.findIndex(item => item.uid === data.uid);
      currentEndGroup.splice(endDataIndex, 1);
    }
  }

  _removeFromUidIndex (data) {
    let levelKey = this.getUidLevelKey(data.uid);
    let currentGroup = this.uidIndexGroup[levelKey];
    let dataIndex = currentGroup.findIndex(item => item.uid === data.uid);
    currentGroup.splice(dataIndex, 1);
  }

  findByTime (milliSecondtime) {
    let result = [];
    if (this.timeIndexGroup) { // 通过索引查询
      const levelKey = this.getTimeLevelKey(milliSecondtime);
      this.timeIndexGroup[levelKey].forEach((item) => {
        if (item.startTimeInMilliSeconds <= milliSecondtime &&
          item.endTimeInMilliSeconds > milliSecondtime &&
          !item.deleted) {
          result.push(item);
        }
      });
    } else { // 直接轮询查询
      let len = this.content.length;
      for (let i = 0; i < len; i++) {
        let data = this.content[i];
        if (data.startTimeInMilliSeconds < milliSecondtime &&
          data.endTimeInMilliSeconds > milliSecondtime &&
          !data.deleted) {
          result.push(data);
        }
      }
    }
    return result;
  }

  getTimeLevelKey (milliSecondtime) {
    return parseInt(milliSecondtime / constants.ITME_INDEX_GROUP_DURATION);
  }

  getUidLevelKey (uid) {
    return parseInt(uid / constants.UID_INDEX_GROUP_SIZE);
  }

  findByText (word) {
    if (!word) {
      return [];
    }

    let searchResult = [];
    let len = this.content.length;

    for (let i = 0; i < len; i++) {
      let data = this.content[i];
      if (!data.deleted && data.texts.join('\n').indexOf(word) !== -1) {
        searchResult.push(data);
      }
    }

    return searchResult;
  }

  findByUid (uid) {
    if (typeof uid !== 'number') {
      return null;
    }

    if (this.uidIndexGroup) { // 通过索引查询
      let levelKey = this.getUidLevelKey(uid);
      return this.uidIndexGroup[levelKey].find((item) => {
        return item.uid === uid && !item.deleted;
      });
    } else { // 直接轮询查询
      let len = this.content.length;
      for (let i = 0; i < len; i++) {
        let data = this.content[i];
        if (data.uid === uid && !data.deleted) {
          return data;
        }
      }
    }
  }

  addDialogue ({ startTimeInMilliSeconds, endTimeInMilliSeconds, texts, index }) {
    this.modified = true;
    let data = {
      uid: newGUID(),
      id: null,
      startTimeInMilliSeconds,
      endTimeInMilliSeconds,
      texts,
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

  updateDialogueByUid (uid, info) {
    this.modified = true;
    let data = this.findByUid(uid);
    const originData = cloneDeep(data);
    let needUpdateTimeIndex = false;

    if (typeof info.startTimeInMilliSeconds === 'number') {
      needUpdateTimeIndex = true;
      data.startTimeInMilliSeconds = info.startTimeInMilliSeconds;
    }

    if (typeof info.endTimeInMilliSeconds === 'number') {
      needUpdateTimeIndex = true;
      data.endTimeInMilliSeconds = info.endTimeInMilliSeconds;
    }

    if (info.texts) {
      data.texts = info.texts;
    }

    if (this.timeIndexGroup !== null && needUpdateTimeIndex) {
      this._removeFromIndex(originData);
      this._addToIndex(data);
    }
  }

  removeDialogueByUid (uid) {
    this.modified = true;
    let data = this.findByUid(uid);
    data.deleted = true;
  }

  sort () {
    this.modified = true;
    this.content.sort((a, b) => {
      return a.startTimeInMilliSeconds - b.startTimeInMilliSeconds;
    });
  }

  getContent () {
    let result = cloneDeep(this.content.filter(item => !item.deleted));
    result.originText = this.content.originText;
    return result;
  }
}

export default SrtEngine;
