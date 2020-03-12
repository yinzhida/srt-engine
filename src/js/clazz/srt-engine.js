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
    this.originText = null;
    this.style = {
      fontSize: 16,
      fontColor: '#ffffff',
      bold: true,
      italic: true,
      underground: true,
      // align default 2, values:
      // 7, 8, 9
      // 4, 5, 6
      // 1, 2, 3
      align: 2,
    };
  }

  async load (url) {
    this.clearSrtEngine();
    this.url = url;
    this.content = await getSubtitleTextArrayByUrl(url);
    this.originText = this.content.originText;

    if (this.shouldBuildIndex && this.content.length > constants.WILL_BUILD_INDEX_COUNT) {
      this.buildIndex();
    }
    return this;
  }

  compile (text) {
    this.clearSrtEngine();
    this.content = getTextArrayFromText(text);
    this.originText = this.content.originText;
    if (this.shouldBuildIndex && this.content.length > constants.WILL_BUILD_INDEX_COUNT) {
      this.buildIndex();
    }
    return this;
  }

  transform (content) {
    this.clearSrtEngine();
    this.content = content.map((item) => {
      item.uid = item.uid === undefined ? newGUID() : item.uid;
      return item;
    });
    this.originText = null;
    if (this.shouldBuildIndex && this.content.length > constants.WILL_BUILD_INDEX_COUNT) {
      this.buildIndex();
    }
    return this;
  }

  clearSrtEngine () {
    this.url = '';
    this.modified = false;
    this.originText = null;
    this.clearIndex();
  }

  setStyle (style) {
    this.style = style;
  }

  getStyle () {
    return this.style;
  }

  stringify (styles, start, end) {
    styles = Object.assign(styles, this.style);
    start = Number(start);
    end = Number(end);
    let cutRange = false;
    if (this.isUsableNumber(start) && this.isUsableNumber(end)) {
      cutRange = true;
    }

    let result = '';
    let content = this.getContent();
    let len = content.length;
    for (let i = 0; i < len; i++) {
      let data = content[i];
      let dialogueStart = data.startTimeInMilliSeconds;
      let dialogueEnd = data.endTimeInMilliSeconds;

      if (cutRange) {
        if (data.endTimeInMilliSeconds <= start || data.startTimeInMilliSeconds >= end) {
          continue;
        }
        dialogueStart = data.startTimeInMilliSeconds - start;
        dialogueStart = dialogueStart < 0 ? 0 : dialogueStart;
        dialogueEnd = data.endTimeInMilliSeconds - start;
        dialogueEnd = dialogueEnd > (end - start) ? (end - start) : dialogueEnd;
      }

      let id = i + 1;
      result += id + '\n';
      result += formatTime((dialogueStart / 1000), 'hh:mm:ss,S');
      result += ' --> ';
      result += formatTime((dialogueEnd / 1000), 'hh:mm:ss,S');
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

  clearIndex () {
    this.timeIndexGroup = null;
    this.uidIndexGroup = null;
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
          item.endTimeInMilliSeconds >= milliSecondtime &&
          !item.deleted) {
          result.push(item);
        }
      });
    } else { // 直接轮询查询
      let len = this.content.length;
      for (let i = 0; i < len; i++) {
        let data = this.content[i];
        if (data.startTimeInMilliSeconds <= milliSecondtime &&
          data.endTimeInMilliSeconds >= milliSecondtime &&
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
    uid = Number(uid);
    if (!this.isUsableNumber(uid)) {
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

  findByTimeRange (start, end) {
    const duration = end - start;
    if (duration < 0) {
      return [];
    }

    let searchResult = [];
    if (duration < constants.SEARCH_TEXT_USE_INDEX_MAX_RANGE &&
      this.timeIndexGroup !== null) { // 使用索引
      const levelKey = this.getTimeLevelKey(start);
      const endLevelKey = this.getTimeLevelKey(end);
      for (let key = levelKey; key <= endLevelKey; key++) {
        for (let dialogue of this.timeIndexGroup[key]) {
          if (!(dialogue.endTimeInMilliSeconds < start ||
            dialogue.startTimeInMilliSeconds > end) && dialogue.deleted === false) {
            searchResult.push(dialogue);
          }
        }
      }
    } else {
      // 直接查找
      let len = this.content.length;
      for (let i = 0; i < len; i++) {
        let data = this.content[i];
        if (!(data.endTimeInMilliSeconds < start ||
          data.startTimeInMilliSeconds > end)) {
          searchResult.push(data);
        }
      }
    }

    return searchResult;
  }

  addDialogue (dialogue, index) {
    this.modified = true;
    let uid = newGUID();
    let data = Object.assign(cloneDeep(dialogue), {
      uid: uid,
    });

    if (index !== undefined) {
      this.content.splice(index, 0, data);
    } else {
      this.content.push(data);
    }

    if (this.timeIndexGroup !== null && this.uidIndexGroup !== null) {
      this._addToIndex(data);
    } else {
      if (this.shouldBuildIndex && this.content.length > constants.WILL_BUILD_INDEX_COUNT) {
        this.buildIndex();
      }
    }

    return cloneDeep(data);
  }

  updateDialog (dialogue, info) {
    const originData = cloneDeep(dialogue);
    let needUpdateTimeIndex = false;

    if (this.isUsableNumber(info.startTimeInMilliSeconds)) {
      needUpdateTimeIndex = true;
      dialogue.startTimeInMilliSeconds = info.startTimeInMilliSeconds;
    }

    if (this.isUsableNumber(info.endTimeInMilliSeconds)) {
      needUpdateTimeIndex = true;
      dialogue.endTimeInMilliSeconds = info.endTimeInMilliSeconds;
    }

    if (info.texts) {
      dialogue.texts = info.texts;
    }

    if (this.timeIndexGroup !== null && needUpdateTimeIndex) {
      this._removeFromTimeIndex(originData);
      this._addToTimeIndex(dialogue);
    }
    return this;
  }

  updateDialogueByUid (uid, info) {
    this.modified = true;
    let data = this.findByUid(uid);
    return this.updateDialog(data, info);
  }

  updateDialogByIndex (index, info) {
    this.modified = true;
    let content = this.content.filter(item => !item.deleted);
    let data = content[index];
    return this.updateDialog(data, info);
  }

  updateDialogueByRange (startIndex, endIndex, getInfos) {
    let content = this.content.filter(item => !item.deleted);
    let targets;
    if (startIndex !== undefined) {
      if (endIndex !== undefined) {
        targets = content.slice(startIndex, endIndex);
      } else {
        targets = content.slice(startIndex);
      }
    }
    targets.forEach((item) => {
      let info = getInfos(item);
      this.updateDialog(item, info);
    });
  }

  removeDialogueByUid (uid) {
    this.modified = true;
    let data = this.findByUid(uid);
    data.deleted = true;
    return this;
  }

  sort () {
    this.modified = true;
    this.content.sort((a, b) => {
      return a.startTimeInMilliSeconds - b.startTimeInMilliSeconds;
    });
    for (let key in this.timeIndexGroup) {
      const group = this.timeIndexGroup[key];
      group.sort((a, b) => {
        return a.startTimeInMilliSeconds - b.startTimeInMilliSeconds;
      });
    }
    return this;
  }

  getContent () {
    let result = cloneDeep(this.content.filter(item => !item.deleted));
    return result;
  }

  getOriginText () {
    return this.originText;
  }

  isUsableNumber (value) {
    if (value === undefined || value === null || isNaN(value)) {
      return false;
    }
    return true;
  }
}

export default SrtEngine;
