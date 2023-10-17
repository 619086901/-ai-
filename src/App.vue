<template>
  <div id="app">
    <router-view />
    <div id="jiangsu_message" class="jiangsu_message"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  border: 0;
}
#app {
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  position: relative;
}
.jiangsu_message {
  position: absolute;
  top: 0;
  left: 50%;
}
body {
  margin: 0px;
  padding: 0px;
  border: 0px;
  font-size: 24px;
  font-family: Microsoft YaHei, sans-serif;
  line-height: 100%;
  height: 1080px;
  width: 1920px;
  overflow: hidden;
  color: #ffffff;
}
</style>
