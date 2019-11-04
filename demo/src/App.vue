<template>
  <div id="app">
    输入1：
    <input
      type="text"
      v-model="searchText1"
    >
    &nbsp;&nbsp;
    输入2：
    <input
      type="text"
      v-model="searchText2"
    >
    <br>
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

    <input
      type="button"
      @click="findByTimeRange"
      value="findByTimeRange"
    >

    <input
      type="button"
      @click="stringifyWidthTime"
      value="stringifyWidthTime"
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
      searchText1: '',
      searchText2: '',
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
        this.msg = se.getOriginText();
      });
    },

    findByTime () {
      this.result = this.se.findByTime(parseInt(this.searchText1));
    },

    findByText () {
      this.result = this.se.findByText(this.searchText1);
    },

    findByUid () {
      this.result = this.se.findByUid(parseInt(this.searchText1));
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
      this.se.updateDialogueByUid(parseInt(this.searchText1), {
        startTimeInMilliSeconds: 0,
        endTimeInMilliSeconds: 1000,
        texts: ['更新过的字幕~~~~'],
      });
    },

    deleteByUid () {
      this.se.removeDialogueByUid(parseInt(this.searchText1));
    },

    stringify () {
      this.result = this.se.stringify({
        fontColor: '#333',
      });
    },

    sort () {
      this.se.sort();
    },

    findByTimeRange () {
      this.result = this.se.findByTimeRange(this.searchText1, this.searchText2);
    },

    stringifyWidthTime () {
      this.result = this.se.stringify({
        fontColor: 'red',
        fontSize: '32',
      }, this.searchText1, this.searchText2);
    },

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
