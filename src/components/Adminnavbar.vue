<template>
<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/audioAD' }">音频</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/videoAD' }">视频</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/imageRecognitionAD' }">图像识别</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/SpeechRecognitionAD' }">语音识别</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/PhotoDecodeAD' }">图片解码</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/PathPlaningAD' }">路径规划</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/StockPredictionAD' }">股票预测</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/TSPAD' }">旅行商问题</el-breadcrumb-item>
    <el-breadcrumb-item></el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>
<script>
export default {
  name: 'Adminnavbar',
  data() {
    return {
    }
  }
}
</script scoped>
<style>

</style>
