<template>
  <div id="app">
    输入：
    <input
      type="text"
      v-model="searchText"
    >
    &nbsp;&nbsp;
    <input
      type="button"
      @click="findByTime"
      value="findByTime"
    >
    <input
      type="button"
      @click="findByText"
      value="findByText"
    >
    <input
      type="button"
      @click="findByUid"
      value="findByUid"
    >
    <input
      type="button"
      @click="addDialogue"
      value="addDialogue"
    >
    <input
      type="button"
      @click="updateByUid"
      value="updateByUid"
    >
    <input
      type="button"
      @click="deleteByUid"
      value="deleteByUid"
    >
    <input
      type="button"
      @click="stringify"
      value="stringify"
    >
    <input
      type="button"
      @click="sort"
      value="sort"
    >
    <br><br>
    <div style="background: #333; color: white;">result: {{result}}</div>
    <br>
    srt-content: <textarea
      name=""
      id=""
      cols="500"
      rows="100"
      :value="msg"
    ></textarea>
  </div>
</template>

<script>
import { SrtEngine } from '../../dist/srt-engine.umd'
import lldq from './assets/lldq.srt'
import logo from './assets/logo.png'

export default {
  name: 'App',

  components: {
  },

  data () {
    return {
      msg: 'loading',
      result: '',
      searchText: '',
    }
  },

  mounted () {
    let se = new SrtEngine();
    this.se = se;
    this.load();
    // se.load('/static/subs/lldq.srt').then((se) => {
    //   // this.msg = se.findByUid(1);
    //   this.msg = se.stringify({
    //     align: 5,
    //     fontColor: 'red',
    //     fontSize: 16,
    //   });
    //   this.se = se;
    //   // se.updateDialogueByUid(1, {
    //   //   startTimeInMilliSeconds: 1000,
    //   // });
    //   // this.msg = se.findByUid(1);
    //   // this.msg = se.findByTime(1000);
    //   // this.msg = se.findByText('爸爸');
    //   // this.msg = se.findByText('爸爸');
    //   // se.removeDialogueByUid();
    //   // se.addDialogue();
    // });
  },

  methods: {
    load () {
      this.se.load('/static/subs/lldq.srt').then((se) => {
        this.msg = se.getContent().originText;
      });
    },

    findByTime () {
      this.result = this.se.findByTime(parseInt(this.searchText));
    },

    findByText () {
      this.result = this.se.findByText(this.searchText);
    },

    findByUid () {
      this.result = this.se.findByUid(parseInt(this.searchText));
    },

    addDialogue () {
      this.se.addDialogue({
        index: null,
        startTimeInMilliSeconds: 0,
        endTimeInMilliSeconds: 1000,
        texts: ['新增字幕'],
      });
    },

    updateByUid () {
      this.se.updateDialogueByUid(parseInt(this.searchText), {
        startTimeInMilliSeconds: 0,
        endTimeInMilliSeconds: 1000,
        texts: ['更新过的字幕~~~~'],
      });
    },

    deleteByUid () {
      this.se.removeDialogueByUid(parseInt(this.searchText));
    },

    stringify () {
      this.result = this.se.stringify({
        fontColor: '#333',
      });
    },

    sort () {
      this.se.sort();
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
