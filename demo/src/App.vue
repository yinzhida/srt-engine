<template>
  <div id="app">
    {{msg}}
  </div>
</template>

<script>
import { ProjectName } from '../../dist/project-name.umd'

export default {
  name: 'App',

  components: {
  },

  data () {
    return {
      msg: 'loading...'
    }
  },

  mounted () {
    let pro = new ProjectName();
    this.msg = pro.msg;
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
