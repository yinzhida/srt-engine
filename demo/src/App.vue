<template>
  <div id="app">
    {{msg}}
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
      msg: 'loading'
    }
  },

  mounted () {
    let se = new SrtEngine();
    se.load('/static/subs/lldq.srt').then((se) => {
      // this.msg = se.findByUid(1);
      se.updateDialogueByUid(1, {
        startTimeInMilliSeconds: 1000,
      });
      // this.msg = se.findByUid(1);
      // this.msg = se.findByTime(1000);
      // this.msg = se.findByText('爸爸');
      // this.msg = se.findByText('爸爸');
      this.msg = se.stringify({
        align: 5,
        fontColor: 'red',
        fontSize: 16,
      })
      // se.removeDialogueByUid();
      // se.addDialogue();
    });
  },

  methods: {
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
