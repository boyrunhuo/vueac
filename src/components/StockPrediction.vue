<template>
  <div>
    <appheader></appheader>
    <div class="container">
      <div class="Appdisplay">
        <div class="edge">
          <div class="desktop">
            <i class="el-icon-loading" v-if='isloading'></i>

            <div class="showplace">
              <div id="StockPrediction" style="height: 300px;width:600px"></div>
            </div>
            <span class="detail">{{detail}}</span>
          </div>
        </div>

      </div>
      <div class="setgradewarp">
        <span>当前内容分数：</span>
        <input class="setgradeinput" placeholder="输入分数0~100" v-model="newgrade">
        <el-button type="primary" @click="setgradeDone" v-if="isok">确定</el-button>
        <el-button type="primary" class="nextbtn" @click="playnext" v-if="isnext">播放下一条</el-button>
      </div>
      <v-table class="gradetable" :width="400" :columns="columns" :table-data="tableData" :show-vertical-border="false">
      </v-table>
    </div>
    <el-button class="uploadgrade" v-if="isbtnshow" @click="goTSP" type="success">提交所有分数</el-button>
  </div>
</template>
<script>
import appheader from './AppHeader'
const dataList = [
  [215, 227, 206, 230, 195, 325, 315],
  [200, 260, 180, 264, 173, 360, 265],
  [165, 290, 160, 280, 145, 400, 235],
  [110, 360, 120, 334, 105, 470, 150]
]
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
export default {
  name: 'StockPrediction',
  data() {
    return {
      tableData: [
        //app数据
        { qualityLossRatio: '0%', time: '0ms', errorRatio: '1%', grade: '' },
        { qualityLossRatio: '10%', time: '0ms', errorRatio: '10%', grade: '' },
        { qualityLossRatio: '25%', time: '0ms', errorRatio: '25%', grade: '' },
        { qualityLossRatio: '50%', time: '0ms', errorRatio: '50%', grade: '' },

        { qualityLossRatio: '0%', time: '1000ms', errorRatio: '1%', grade: '' },
        {
          qualityLossRatio: '10%',
          time: '1000ms',
          errorRatio: '10%',
          grade: ''
        },
        {
          qualityLossRatio: '25%',
          time: '1000ms',
          errorRatio: '25%',
          grade: ''
        },
        {
          qualityLossRatio: '50%',
          time: '1000ms',
          errorRatio: '50%',
          grade: ''
        },

        { qualityLossRatio: '0%', time: '3000ms', errorRatio: '1%', grade: '' },
        {
          qualityLossRatio: '10%',
          time: '3000ms',
          errorRatio: '10%',
          grade: ''
        },
        {
          qualityLossRatio: '25%',
          time: '3000ms',
          errorRatio: '25%',
          grade: ''
        },
        {
          qualityLossRatio: '50%',
          time: '3000ms',
          errorRatio: '50%',
          grade: ''
        },

        { qualityLossRatio: '0%', time: '5000ms', errorRatio: '1%', grade: '' },
        {
          qualityLossRatio: '10%',
          time: '5000ms',
          errorRatio: '10%',
          grade: ''
        },
        {
          qualityLossRatio: '25%',
          time: '5000ms',
          errorRatio: '25%',
          grade: ''
        },
        {
          qualityLossRatio: '50%',
          time: '5000ms',
          errorRatio: '50%',
          grade: ''
        }
      ],
      columns: [
        {
          field: 'qualityLossRatio',
          title: '质量损失',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          formatter(rowData, rowIndex, pagingIndex, field) {
            return `<span class='cell-edit-color'>${rowData[field]}</span>`
          },
          isResize: true
        },
        {
          field: 'time',
          title: '计算时间',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true
        },
        {
          field: 'errorRatio',
          title: '数据误差%',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true
        },
        {
          field: 'grade',
          title: '评分：',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true
        }
      ],
      gradelen: 0,
      dataarr: [],
      reg: /^(0|[1-9][0-9]*)$/,
      newgrade: '',
      isbtnshow: false,
      index: 0,
      appdetail: [
        {
          title: '质量损失0% 计算时间0ms 数据误差1',
          time: 0
        },
        {
          title: '质量损失10% 计算时间0ms 数据误差10',
          time: 0
        },
        {
          title: '质量损失25% 计算时间0ms 数据误差25',
          time: 0
        },
        {
          title: '质量损失50% 计算时间0ms 数据误差50',
          time: 0
        },

        {
          title: '质量损失0% 计算时间1000ms 数据误差1',
          time: 1000
        },
        {
          title: '质量损失10% 计算时间1000ms 数据误差10',
          time: 1000
        },
        {
          title: '质量损失25% 计算时间1000ms 数据误差25',
          time: 1000
        },
        {
          title: '质量损失50% 计算时间1000ms 数据误差50',
          time: 1000
        },

        {
          title: '质量损失0% 计算时间3000ms 数据误差1',
          time: 3000
        },
        {
          title: '质量损失10% 计算时间3000ms 数据误差10',
          time: 3000
        },
        {
          title: '质量损失25% 计算时间3000ms 数据误差25',
          time: 3000
        },
        {
          title: '质量损失50% 计算时间3000ms 数据误差50',
          time: 3000
        },

        {
          title: '质量损失0% 计算时间5000ms 数据误差1',
          time: 5000
        },

        {
          title: '质量损失10% 计算时间5000ms 数据误差10',
          time: 5000
        },

        {
          title: '质量损失25% 计算时间5000ms 数据误差25',
          time: 5000
        },

        {
          title: '质量损失50% 计算时间5000ms 数据误差50',
          time: 5000
        }
      ],
      option: {
        title: {
          text: '股票预测情况对比',
          textStyle: {
            color: 'whitesmoke'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['真实走势', '预测走势'],
          textStyle: {
            color: 'whitesomke'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: {
            lineStyle: {
              color: 'whitesmoke'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'whitesmoke'
            }
          }
        },
        series: [
          {
            name: '真实走势',
            type: 'line',
            data: [220, 232, 201, 234, 190, 330, 310]
          },
          {
            name: '预测走势',
            type: 'line',
            data: [215, 227, 206, 230, 195, 325, 315]
          }
        ]
      },
      appitem: 0,
      isloading: false,
      isok: true,
      isnext: false,
      alldata: ''
    }
  },
  components: {
    appheader
  },
  computed: {
    detail() {
      return this.appdetail[this.appitem].title
    }
  },
  methods: {
    setgradeDone() {
      if (
        !this.reg.test(this.newgrade) ||
        this.newgrade > 100 ||
        this.newgrade < 0
      ) {
        this.$message({
          message: '分数只能是0-100的整数',
          type: 'warning'
        })
      } else {
        this.option.series[1].data = []

        this.tableData[this.gradelen].grade = this.newgrade
        this.gradelen++
        this.newgrade = ''
        this.isok = false
        this.isnext = true
      }

      if (this.gradelen === this.tableData.length) {
        this.isbtnshow = true
        this.isok = false
        this.isnext = false
      } else {
        this.isbtnshow = false
      }
    },
    playnext() {
      this.isloading = true
      this.appitem = (this.appitem + 1) % this.appdetail.length
      this.isnext = false
      this.index = (this.index + 1) % dataList.length

      this.option.series[1].data = dataList[this.index]

      setTimeout(() => {
        this.drawGraph()
        this.isloading = false
        this.isok = true
      }, this.appdetail[this.appitem % this.appdetail.length].time)
    },

    getDate() {
      for (let i = 0, len = this.tableData.length; i < len; i++) {
        this.dataarr.push({
          qualityLossRatio: this.tableData[i].qualityLossRatio,
          errorRatio: this.tableData[i].errorRatio,
          time: this.tableData[i].time,
          grade: this.tableData[i].grade
        })
      }

      return this.dataarr
    },
    goTSP() {
      this.alldata = this.getDate()
      console.log(this.alldata)

      fetch(
        'http://120.79.193.101:8080/ApproximateComputing/stockPrediction/stockPredictions',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            stockPredictions: this.alldata
          })
        }
      ).then(response => {
        return response.json().then(data => {
          if (data.code === 0) {
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success'
            })

            this.$router.push({
              path: 'TSP'
            })
          } else {
            this.$message({
              showClose: warning,
              message: '提交错误',
              type: 'warning'
            })
          }
        })
      })
    },
    drawGraph() {
      let myChart = echarts.init(document.getElementById('StockPrediction'))
      if (this.option && typeof this.option === 'object') {
        myChart.setOption(this.option, true)
      }
    }
  },
  mounted() {
    this.drawGraph()
  }
}
</script>
<style scoped >

</style>
