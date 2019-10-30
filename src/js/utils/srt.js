/*
 * Created Date: 2018-04-18 5:34:06
 * Author: yinzhida Email: zhaoxinxin@qiyi.com
 * -----
 * Last Modified: 2019-10-30 17:52:59
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 * Copyright (c) 2018 IQIYI
 */

import { fetchBlob } from '@/dao/dao';
import DataCache from './data-cache';

const getMilliSecondsFromString = (timeStr) => {
  //时间格式转换
  let timeDivide = timeStr.split(',');
  let milliSecond = Number(timeDivide[1]);
  let otherTimeStr = timeDivide[0];
  let hmsArray = otherTimeStr.split(':');
  milliSecond = hmsArray[0] * 60 * 60 * 1000 + hmsArray[1] * 60 * 1000 + hmsArray[2] * 1000 + milliSecond;
  return milliSecond;
};

const compileTextLine = (text) => {
  if (!text) {
    return {
      text: '',
      styles: {},
    }
  }

  let fontSize, fontColor, bold, italic, underline, align;
  const alignMatch = text.match(/\{\\(an\d)\}/);
  if (alignMatch) {
    align = alignMatch[1];
  }

  const fontSizeMatch = text.match(/<font\s+[^>]*?size="?(\d+)"?/);
  if (fontSizeMatch) {
    fontSize = parseInt(fontSizeMatch[1]);
  }

  const fontColorMatch = text.match(/<font\s+[^>]*?color="?(\d+)"?/);
  if (fontColorMatch) {
    fontColor = fontSizeMatch[1];
  }

  const boldMatch = text.match(/(<b>|<B>|<bold>|<BOLD>)/);
  if (boldMatch) {
    bold = true;
  }

  const italicMatch = text.match(/(<i>|<I>)/);
  if (italicMatch) {
    italic = true;
  }

  const underlineMatch = text.match(/(<u>|<U>)/);
  if (underlineMatch) {
    underline = true;
  }

  let showText = text.replace(/{\\.*?}/g, '').replace(/<\/?(font|b|B|bold|BOLD|i|I|u|U).*?>/g, '');

  return {
    text: showText,
    styles: {
      fontSize,
      fontColor,
      bold,
      italic,
      underline,
      align,
    }
  }
}

const getTextArrayFromText = (text) => {
  let lineArray = text.split('\n');
  try {
    //一条字幕的开始点
    let marker = 0;
    let dataArray = [];
    for (let i = 0; i < lineArray.length; i++) {
      //here is a start point of data
      if (i === marker) {
        //default timeString
        let timeArr = ['00:00:00,000', '00:00:00,000'];
        if ((i + 1) >= lineArray.length) {
          return dataArray;
        }

        let timeStr = lineArray[i + 1];
        if (timeStr !== '') {
          timeArr = timeStr.trim().split('-->');
        }

        let data = {
          id: lineArray[i].trim(), //id
          idOriginal: lineArray[i], //id
          timeStr: timeStr, //timeStr
          startTimeStr: timeArr[0], //starttime
          endTimeStr: timeArr[1], //endtime
          texts: [] //subtitle content,may have several lines
        };

        //根据字幕里的事件字符串，获取开始结束的以毫秒计数的时间点
        data.startTimeInMilliSeconds = getMilliSecondsFromString(data.startTimeStr);
        data.endTimeInMilliSeconds = getMilliSecondsFromString(data.endTimeStr);

        //如果这些数据有误，说明这个字幕文件格式不太对。
        if (isNaN(data.id) || isNaN(data.startTimeInMilliSeconds) || isNaN(data.endTimeInMilliSeconds)) {
          throw new Error('字幕文件的内容，格式有误！');
        }

        //now point to the content line i+2，就是说id和时间后边，是这个字幕的内容，这部分是从第三行开始
        let contentLineNumber = 2;
        if ((i + contentLineNumber) >= lineArray.length) {
          data.texts.push('');
          dataArray.push(data);
          return dataArray;
        }

        //当然这个字幕到底是有一行字幕还是有两行或者三行字幕都不好说，所以做一下循环，看看到底有几行
        //if line i+2 have words, then it must be the subtitle contentline. and we should find it's next line, util we get a '', another case is there is'nt content line.
        while (lineArray[i + contentLineNumber].trim() !== '') {
          data.texts.push(lineArray[i + contentLineNumber]);
          contentLineNumber++;
          if ((i + contentLineNumber) >= lineArray.length) {
            data.texts.push('');
            dataArray.push(data);
            return dataArray;
          }
        }

        //查找完字幕内容，就该来分析一下，这句字幕是不是结束啦，后边空行是不是有多于一行，然后计算出下一句字幕的开始位置（marker）。
        //now we know at the index 'i+contentLineNumber' we get a '', so we should see the next line 'i+contentLineNumber+1' until we get some words.
        let divideLineNumber = i + contentLineNumber + 1;
        if (divideLineNumber >= lineArray.length) {
          marker = 0;
          dataArray.push(data);
          return dataArray;
        }

        //这个地方空行可能也不止一行，不过按理说应该是一行才对。
        while (lineArray[divideLineNumber].trim() === '') {
          divideLineNumber++;
          if (divideLineNumber >= lineArray.length) {
            marker = 0;
            dataArray.push(data);
            return dataArray;
          }
        }

        //here we got a new marker point.
        marker = divideLineNumber;
        i = divideLineNumber - 1;
        dataArray.push(data);
      }
    }
    return dataArray;
  } catch (e) {
    console.error('getTextArrayFromText', '解析文件出错，文件格式可能不正确。', e.toString());
    return [];
  }
};

const getSubtitleTextArrayByUrl = async (url) => {
  let cacheUtil = DataCache.getInstanceByname('subtitleText', 2);
  let textArray = cacheUtil.getData(url);

  if (textArray) {
    return textArray;
  }

  let result = await fetchBlob(url).then((blob) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = function (e) {
        let text = reader.result;
        let textArray = getTextArrayFromText(text);
        let cacheUtil = DataCache.getInstanceByname('subtitleText', 2);
        cacheUtil.add(url, textArray);
        console.log('returnTextArray', textArray);
        resolve(textArray);
      };
      reader.readAsText(blob, 'UTF-8');
    });
  });
  return result;
};

export {
  getMilliSecondsFromString,
  getTextArrayFromText,
  getSubtitleTextArrayByUrl,
};

