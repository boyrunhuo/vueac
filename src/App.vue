<template>
  <div id="app" ref='app'style="background-image: url('../static/image/background.png')">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
html,
body {
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
</style>
