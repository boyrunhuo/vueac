<template>
  <div class="admin">
<adbar></adbar>
<h3 class="adtitle">音频</h3>
    <div id="container" style="width:800px;height:600px"></div>
    <el-button type="primary" @click="downloadexcel">下载excel</el-button>

    <el-table :data="tableData" border class="etable" size="mini">
      <el-table-column prop="qualityLossRatio" label="质量损失X">
      </el-table-column>
      <el-table-column prop="time" label="时间延迟Y">
      </el-table-column>
      <el-table-column prop="grade" label="平均得分Z">
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import adbar from './Adminnavbar'
let echarts = require('echarts/lib/echarts')
require('echarts-gl')
let mydata = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],

  [1, 0],
  [1, 1],
  [1, 2],
  [1, 3],

  [2, 0],
  [2, 1],
  [2, 2],
  [2, 3],

  [3, 0],
  [3, 1],
  [3, 2],
  [3, 3]
]
const qualityLossRatio = ['0%', '10%', '25%', '50%']
const time = ['0ms', '1000ms', '3000ms', '5000ms']
export default {
  name: 'AudioAD',
  data() {
    return {
      tableData: [
        { qualityLossRatio: '0%', time: '0ms', grade: '' },
        { qualityLossRatio: '10%', time: '0ms', grade: '' },
        { qualityLossRatio: '25%', time: '0ms', grade: '' },
        { qualityLossRatio: '50%', time: '0ms', grade: '' },

        { qualityLossRatio: '0%', time: '1000ms', grade: '' },
        { qualityLossRatio: '10%', time: '1000ms', grade: '' },
        { qualityLossRatio: '25%', time: '1000ms', grade: '' },
        { qualityLossRatio: '50%', time: '1000ms', grade: '' },

        { qualityLossRatio: '0%', time: '3000ms', grade: '' },
        { qualityLossRatio: '10%', time: '3000ms', grade: '' },
        { qualityLossRatio: '25%', time: '3000ms', grade: '' },
        { qualityLossRatio: '50%', time: '3000ms', grade: '' },

        { qualityLossRatio: '0%', time: '5000ms', grade: '' },
        { qualityLossRatio: '10%', time: '5000ms', grade: '' },
        { qualityLossRatio: '25%', time: '5000ms', grade: '' },
        { qualityLossRatio: '50%', time: '5000ms', grade: '' }
      ]
    }
  },
  components: {
    adbar
  },
  methods: {
    downloadexcel() {
      fetch('http://localhost:3000/audio')
        .then(response => response.blob())
        .then(blob => {
          let a = document.createElement('a')
          let url = window.URL.createObjectURL(blob)
          let filename = response.header.get('Content-Disposition')
          a.href = url
          a.download = filename
          a.click()
          window.URL.revokeObjectURL(url)
        })
    },
    drawBar(appname) {
      fetch('http://localhost:3000/audio')
        .then(response => response.json())
        .then(data => {
          for (let i = 0, len = data.grade.length; i < len; i++) {
            mydata[i].push(data.grade[i])
            this.tableData[i].grade = data.grade[i]
          }
        })
        .then(() => {
          let myChart = echarts.init(document.getElementById('container'))

          myChart.setOption({
            tooltip: {},
            visualMap: {
              max: 100,
              inRange: {
                color: [
                  '#313695',
                  '#4575b4',
                  '#74add1',
                  '#abd9e9',
                  '#e0f3f8',
                  '#ffffbf',
                  '#fee090',
                  '#fdae61',
                  '#f46d43',
                  '#d73027',
                  '#a50026'
                ]
              }
            },
            xAxis3D: {
              type: 'category',
              data: qualityLossRatio
            },
            yAxis3D: {
              type: 'category',
              data: time
            },
            zAxis3D: {
              type: 'value'
            },
            grid3D: {
              boxWidth: 60,
              boxDepth: 80,
              viewControl: {},
              light: {
                main: {
                  intensity: 1.2,
                  shadow: true
                },
                ambient: {
                  intensity: 0.3
                }
              }
            },
            series: [
              {
                type: 'bar3D',
                data: mydata.map(function(item) {
                  return {
                    value: [item[1], item[0], item[2]]
                  }
                }),
                shading: 'lambert',

                label: {
                  textStyle: {
                    fontSize: 16,
                    borderWidth: 1
                  }
                },

                emphasis: {
                  label: {
                    textStyle: {
                      fontSize: 20,
                      color: '#900'
                    }
                  },
                  itemStyle: {
                    color: '#900'
                  }
                }
              }
            ]
          })
        })
    }
  },

  mounted() {
    this.drawBar()
  }
}
</script>
<style scoped>

</style>
