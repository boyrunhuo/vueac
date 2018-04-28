<template>
  <div class="app-header">
    <h2 :class="{active1:app1}">音乐</h2>
    <h2 :class="{active2:app2}">视频</h2>
    <h2 :class="{active3:app3}">图像识别</h2>
    <h2 :class="{active4:app4}">语音识别</h2>
    <h2 :class="{active5:app5}">图片解码</h2>
    <h2 :class="{active6:app6}">路径规划</h2>
    <h2 :class="{active7:app7}">股票预测</h2>
    <h2 :class="{active8:app8}">旅行商问题</h2>
  </div>
</template>
<script>
export default {
  name: 'AppHeader',
  data(){
    return {
      app1: false,
      app2: false,
      app3: false,
      app4: false,
      app5: false,
      app6: false,
      app7: false,
      app8: false
    }
  },
  mounted() {
    //控制导航栏颜色
    switch (this.$route.path) {
      case '/Audio':
        this.app1 = true
        break
      case '/Video':
        this.app2 = true
        break
      case '/ImageRecognition':
        this.app3 = true
        break
      case '/SpeechRecognition':
        this.app4 = true
        break
      case '/PhotoDecode':
        this.app5 = true
        break
      case '/PathPlaning':
        this.app6 = true
        break
      case '/StockPrediction':
        this.app7 = true
        break
      case '/TSP':
        this.app8= true
        break
    }
  }
}
</script>

<style scoped>
.app-header {
  background: #111;
  opacity: 0.9;
  border-bottom: 4px solid #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
}
.app-header > h2 {
  padding-top: 20px;
  color: whitesmoke;
}
.app-header > .active1,
.app-header > .active2,
.app-header > .active3,
.app-header > .active4,
.app-header > .active5,
.app-header > .active6,
.app-header > .active7,
.app-header > .active8 {
  color: tomato;
}
</style>
