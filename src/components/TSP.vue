<template>
  <div>
    <appheader></appheader>
    <div class="container">
      <div class="Appdisplay">
        <div class="edge">
          <div class="desktop">
            <i class="el-icon-loading" v-if='isloading'></i>

            <div class="showplace">
              <div id="TSP" style="height: 300px;width:600px"></div>
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
    <el-button class="uploadgrade" v-if="isbtnshow" @click="goThanks" type="success">提交所有分数</el-button>
  </div>
</template>
<script>
import appheader from './AppHeader'
const linksList = [[0, 3, 5], [0, 4, 5], [1, 5, 4], [1, 3, 4]]
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/graph')
export default {
  name: 'TSP',
  data() {
    return {
      tableData: [
        //app数据
        { qualityLossRatio: '0%', time: '0ms', pathLength: '62', grade: '' },
        { qualityLossRatio: '10%', time: '0ms', pathLength: '66', grade: '' },
        { qualityLossRatio: '25%', time: '0ms', pathLength: '88', grade: '' },
        { qualityLossRatio: '50%', time: '0ms', pathLength: '106', grade: '' },

        { qualityLossRatio: '0%', time: '1000ms', pathLength: '62', grade: '' },
        {
          qualityLossRatio: '10%',
          time: '1000ms',
          pathLength: '66',
          grade: ''
        },
        {
          qualityLossRatio: '25%',
          time: '1000ms',
          pathLength: '88',
          grade: ''
        },
        {
          qualityLossRatio: '50%',
          time: '1000ms',
          pathLength: '106',
          grade: ''
        },

        { qualityLossRatio: '0%', time: '3000ms', pathLength: '62', grade: '' },
        {
          qualityLossRatio: '10%',
          time: '3000ms',
          pathLength: '66',
          grade: ''
        },
        {
          qualityLossRatio: '25%',
          time: '3000ms',
          pathLength: '88',
          grade: ''
        },
        {
          qualityLossRatio: '50%',
          time: '3000ms',
          pathLength: '106',
          grade: ''
        },

        { qualityLossRatio: '0%', time: '5000ms', pathLength: '62', grade: '' },
        {
          qualityLossRatio: '10%',
          time: '5000ms',
          pathLength: '66',
          grade: ''
        },
        {
          qualityLossRatio: '25%',
          time: '5000ms',
          pathLength: '88',
          grade: ''
        },
        {
          qualityLossRatio: '50%',
          time: '5000ms',
          pathLength: '106',
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
          title: '质量损失0% 计算时间0ms 路径长度62',
          time: 0
        },
        {
          title: '质量损失10% 计算时间0ms 路径长度66',
          time: 0
        },
        {
          title: '质量损失25% 计算时间0ms 路径长度88',
          time: 0
        },
        {
          title: '质量损失50% 计算时间0ms 路径长度106',
          time: 0
        },

        {
          title: '质量损失0% 计算时间1000ms 路径长度62',
          time: 1000
        },
        {
          title: '质量损失10% 计算时间1000ms 路径长度66',
          time: 1000
        },
        {
          title: '质量损失25% 计算时间1000ms 路径长度88',
          time: 1000
        },
        {
          title: '质量损失50% 计算时间1000ms 路径长度106',
          time: 1000
        },

        {
          title: '质量损失0% 计算时间3000ms 路径长度62',
          time: 3000
        },
        {
          title: '质量损失10% 计算时间3000ms 路径长度66',
          time: 3000
        },
        {
          title: '质量损失25% 计算时间3000ms 路径长度88',
          time: 3000
        },
        {
          title: '质量损失50% 计算时间3000ms 路径长度106',
          time: 3000
        },

        {
          title: '质量损失0% 计算时间5000ms 路径长度62',
          time: 5000
        },

        {
          title: '质量损失10% 计算时间5000ms 路径长度66',
          time: 5000
        },

        {
          title: '质量损失25% 计算时间5000ms 路径长度88',
          time: 5000
        },

        {
          title: '质量损失50% 计算时间5000ms 路径长度106',
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
                name: 'A',
                x: 300,
                y: 120
              },
              {
                name: 'B',
                x: 480,
                y: 120
              },
              {
                name: 'C',
                x: 300,
                y: 300
              },
              {
                name: 'D',
                x: 480,
                y: 300
              }
            ],
            // links: [],
            links: [
              {
                source: 'A',
                target: 'B',
                label: {
                  normal: {
                    show: true,
                    formatter: '20'
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
                source: 'A',
                target: 'C',
                label: {
                  normal: {
                    show: true,
                    formatter: '42'
                  }
                }
              },
              {
                source: 'A',
                target: 'D',
                label: {
                  normal: {
                    show: true,
                    formatter: '35'
                  }
                }
              },
              {
                source: 'B',
                target: 'C',
                label: {
                  normal: {
                    show: true,
                    formatter: '30'
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
                source: 'B',
                target: 'D',
                label: {
                  normal: {
                    show: true,
                    formatter: '34'
                  }
                }
              },
              {
                source: 'C',
                target: 'D',
                label: {
                  normal: {
                    show: true,
                    formatter: '12'
                  }
                },
                lineStyle: {
                  normal: {
                    width: 4,
                    color: 'brown'
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
    goThanks() {
      this.alldata = this.getDate()
      console.log(this.alldata)

      fetch('http://120.79.193.101:8080/ApproximateComputing/tSP/tSPs', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tSPs: this.alldata
        })
      }).then(response => {
        return response.json().then(data => {
          if (data.code === 0) {
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success'
            })

            this.$router.push({
              path: 'Thanks'
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
      let myChart = echarts.init(document.getElementById('TSP'))
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
