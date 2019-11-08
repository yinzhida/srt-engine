# srt engine
srt editor engine, improve performance by indexing

# install
```bash
npm i -S srt-engine
```

# usage
```js
import StrEngine from 'srt-engine';
let se = new SrtEngine();
se.load('your srt file url');
```
or you can load srt through `compile` method,
or `transform` a content array to a srt-engine instance.
```js
se.compile(text);
let dialogue = se.findByTime(10000); // milliseconds
const fileText = se.stringify({
  fontSize: 16,
  fontColor: #ffffff,
  bold: true,
  italic: true,
  underground: true,
  // align default 2, values: 
  // 7, 8, 9
  // 4, 5, 6
  // 1, 2, 3
  align: 2, 
})
```
dialogue object like this:
```js
{
  id: 1,
  uid: 1, // unique id
  startTimeInMilliSeconds: 0,
  endTimeInMilliSeconds: 3000,
  texts: ['an dialogue', '一个对话'],
}
```

# methods:
### load
param: url

return: promise --> SE instance
### compile
param: file text

return: SE instance
### transform
param: content Array

return: SE instance
### stringify
param: styles Object(all dialogue support fontSize, font), start, end

return: file text
### findByTime
param: milliseconds Number

return: dialogue Array
### findByText
param: text

return: dialogue Array
### findByUid
param: uid (an attribute of dialogue object)

return: an dialogue
### findByTimeRange
param: start end

return: dialogue Array
### addDialogue
param: dialogue index(position)

return: dialogue(cloneDeep)
### updateDialogueByUid
param: uid, dialogueInfos(like dialogue, not strict)

return: SE instance
### removeDialogueByUid
param: uid

return: SE instance
### sort
param: none

return: SE instance
### getContent
param: none

return: dialogue Array
### getOriginText
param: none

return: origin file text