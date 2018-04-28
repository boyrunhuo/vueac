<template>
  <div>
    <appheader></appheader>
    <div class="container">
      <div class="Appdisplay">
        <div class="edge">
          <div class="desktop">
            <i class="el-icon-loading" v-if='isloading'></i>

            <div class="showplace">
              <div id="pathplaning" style="height: 300px;width:600px"></div>
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
    <el-button class="uploadgrade" v-if="isbtnshow" @click="goStockPrediction" type="success">提交所有分数</el-button>
  </div>
</template>
<script>
import appheader from './AppHeader'
const linksList = [[1, 6], [2, 7], [1, 4, 3, 8], [1, 5, 7]]
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/graph')
export default {
  name: 'PathPlaning',
  data() {
    return {
      tableData: [
        //app数据
        { qualityLossRatio: '0%', time: '0ms', pathLength: '20', grade: '' },
        { qualityLossRatio: '10%', time: '0ms', pathLength: '22', grade: '' },
        { qualityLossRatio: '25%', time: '0ms', pathLength: '26', grade: '' },
        { qualityLossRatio: '50%', time: '0ms', pathLength: '34', grade: '' },

        { qualityLossRatio: '0%', time: '1000ms', pathLength: '20', grade: '' },
        {
          qualityLossRatio: '10%',
          time: '1000ms',
          pathLength: '22',
          grade: ''
        },
        {
          qualityLossRatio: '25%',
          time: '1000ms',
          pathLength: '26',
          grade: ''
        },
        {
          qualityLossRatio: '50%',
          time: '1000ms',
          pathLength: '34',
          grade: ''
        },

        { qualityLossRatio: '0%', time: '3000ms', pathLength: '20', grade: '' },
        {
          qualityLossRatio: '10%',
          time: '3000ms',
          pathLength: '22',
          grade: ''
        },
        {
          qualityLossRatio: '25%',
          time: '3000ms',
          pathLength: '26',
          grade: ''
        },
        {
          qualityLossRatio: '50%',
          time: '3000ms',
          pathLength: '34',
          grade: ''
        },

        { qualityLossRatio: '0%', time: '5000ms', pathLength: '20', grade: '' },
        {
          qualityLossRatio: '10%',
          time: '5000ms',
          pathLength: '22',
          grade: ''
        },
        {
          qualityLossRatio: '25%',
          time: '5000ms',
          pathLength: '26',
          grade: ''
        },
        { qualityLossRatio: '50%', time: '5000ms', pathLength: '34', grade: '' }
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
          field: 'pathLength',
          title: '路径长度',
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
          title: '质量损失0% 计算时间0ms 路径长度20',
          time: 0
        },
        {
          title: '质量损失10% 计算时间0ms 路径长度22',
          time: 0
        },
        {
          title: '质量损失25% 计算时间0ms 路径长度26',
          time: 0
        },
        {
          title: '质量损失50% 计算时间0ms 路径长度34',
          time: 0
        },

        {
          title: '质量损失0% 计算时间1000ms 路径长度20',
          time: 1000
        },
        {
          title: '质量损失10% 计算时间1000ms 路径长度22',
          time: 1000
        },
        {
          title: '质量损失25% 计算时间1000ms 路径长度26',
          time: 1000
        },
        {
          title: '质量损失50% 计算时间1000ms 路径长度34',
          time: 1000
        },

        {
          title: '质量损失0% 计算时间3000ms 路径长度20',
          time: 3000
        },
        {
          title: '质量损失10% 计算时间3000ms 路径长度22',
          time: 3000
        },
        {
          title: '质量损失25% 计算时间3000ms 路径长度26',
          time: 3000
        },
        {
          title: '质量损失50% 计算时间3000ms 路径长度34',
          time: 3000
        },

        {
          title: '质量损失0% 计算时间5000ms 路径长度20',
          time: 5000
        },

        {
          title: '质量损失10% 计算时间5000ms  路径长度22',
          time: 5000
        },

        {
          title: '质量损失25% 计算时间5000ms 路径长度26',
          time: 5000
        },

        {
          title: '质量损失50% 计算时间5000ms 路径长度34',
          time: 5000
        }
      ],
      option: {
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
              normal: {
                show: true
              }
            },
            edgeSymbol: ['circle', 'circle'],
            edgeSymbolSize: [4, 4],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            data: [
              {
                name: '起点',
                x: 300,
                y: 300
              },
              {
                name: '终点',
                x: 800,
                y: 250
              },
              {
                name: 'Y城',
                x: 450,
                y: 120
              },
              {
                name: '机场',
                x: 550,
                y: 260
              },
              {
                name: 'P城',
                x: 550,
                y: 500
              },
              {
                name: '医院',
                x: 700,
                y: 100
              }
            ],
            // links: [],
            links: [
              {
                source: '起点',
                target: 'Y城',
                label: {
                  normal: {
                    show: true,
                    formatter: '14'
                  }
                },
                lineStyle: ''
              },
              {
                source: '起点',
                target: '机场',
                label: {
                  normal: {
                    show: true,
                    formatter: '9'
                  }
                },
                lineStyle: {
                  normal: {
                    width: 4,
                    color: 'brown'
                  }
                }
              },
              {
                source: '起点',
                target: 'P城',
                label: {
                  normal: {
                    show: true,
                    formatter: '7'
                  }
                }
              },
              {
                source: 'Y城',
                target: '医院',
                label: {
                  normal: {
                    show: true,
                    formatter: '9'
                  }
                }
              },
              {
                source: '机场',
                target: 'Y城',
                label: {
                  normal: {
                    show: true,
                    formatter: '2'
                  }
                }
              },
              {
                source: '机场',
                target: 'P城',
                label: {
                  normal: {
                    show: true,
                    formatter: '10'
                  }
                }
              },
              {
                source: '机场',
                target: '终点',
                label: {
                  normal: {
                    show: true,
                    formatter: '11'
                  }
                },
                lineStyle: {
                  normal: {
                    width: 4,
                    color: 'brown'
                  }
                }
              },
              {
                source: 'P城',
                target: '终点',
                label: {
                  normal: {
                    show: true,
                    formatter: '15'
                  }
                }
              },
              {
                source: '医院',
                target: '终点',
                label: {
                  normal: {
                    show: true,
                    formatter: '6'
                  }
                }
              }
            ],
            lineStyle: {
              normal: {
                opacity: 1,
                width: 2,
                curveness: 0
              }
            }
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
        for (
          let i = 0, len = this.option.series[0].links.length;
          i < len;
          i++
        ) {
          this.option.series[0].links[i].lineStyle = {
            normal: {}
          }
          this.drawGraph()
        }
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
      this.index = (this.index + 1) % linksList.length

      for (let i = 0, len = linksList[this.index].length; i < len; i++) {
        this.option.series[0].links[linksList[this.index][i]].lineStyle = {
          normal: {
            width: 4,
            color: 'brown'
          }
        }
      }

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
          pathLength: this.tableData[i].pathLength,
          time: this.tableData[i].time,
          grade: this.tableData[i].grade
        })
      }

      return this.dataarr
    },
    goStockPrediction() {
      this.alldata = this.getDate()
      console.log(this.alldata)

      fetch(
        'http://120.79.193.101:8080/ApproximateComputing/pathPlaning/pathPlanings',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pathPlanings: this.alldata
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
              path: 'StockPrediction'
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
      let myChart = echarts.init(document.getElementById('pathplaning'))
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
