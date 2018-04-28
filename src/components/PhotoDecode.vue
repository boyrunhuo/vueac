<template>
  <div>
    <appheader></appheader>
    <div class="container">
      <div class="Appdisplay">
        <div class="edge">
          <div class="desktop">
            <i class="el-icon-loading" v-if='isloading'></i>

            <div class="showplace">
              <img ref="img" class="myimg" src="../../static/image/hero@2x.jpg" alt="" v-show="isdecode">
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
    <el-button class="uploadgrade" v-if="isbtnshow" @click="goPathPlaning" type="success">提交所有分数</el-button>
  </div>
</template>
<script>
import appheader from './AppHeader'
const imgList = [
  '../../static/image/hero@2x.jpg',
  '../../static/image/maxresdefault.jpg',
  '../../static/image/polymagnet.png'
]
export default {
  name: 'PhotoDecode',
  data() {
    return {
      tableData: [
        //app数据
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
          title: '解码时间',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true
        },
        {
          field: 'grade',
          title: '评分：',
          width: 200,
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
      url: '',
      appdetail: [
        {
          title: '质量损失0% 解码时间0ms',
          time: 0
        },
        {
          title: '质量损失10% 解码时间0ms',
          time: 0
        },
        {
          title: '质量损失25% 解码时间0ms',
          time: 0
        },
        {
          title: '质量损失50% 解码时间0ms',
          time: 0
        },
        {
          title: '质量损失0% 解码时间1000ms',
          time: 1000
        },
        {
          title: '质量损失10% 解码时间1000ms',
          time: 1000
        },
        {
          title: '质量损失25% 解码时间1000ms',
          time: 1000
        },
        {
          title: '质量损失50% 解码时间1000ms',
          time: 1000
        },
        {
          title: '质量损失0% 解码时间3000ms',
          time: 3000
        },

        {
          title: '质量损失10% 解码时间3000ms',
          time: 3000
        },
        {
          title: '质量损失25% 解码时间3000ms',
          time: 3000
        },
        {
          title: '质量损失50% 解码时间3000ms',
          time: 3000
        },
        {
          title: '质量损失0% 解码时间5000ms',
          time: 5000
        },

        {
          title: '质量损失10% 解码时间5000ms',
          time: 5000
        },

        {
          title: '质量损失25% 解码时间5000ms',
          time: 5000
        },

        {
          title: '质量损失50% 解码时间5000ms',
          time: 5000
        }
      ],
      appitem: 0,
      isloading: false,
      isok: true,
      isnext: false,
      alldata: '',
      isdecode: true
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
      this.index = (this.index + 1) % imgList.length
      this.url = imgList[this.index]
      this.isdecode = false

      setTimeout(() => {
        this.isdecode = true
        this.isloading = false
        this.isok = true
      }, this.appdetail[this.appitem % this.appdetail.length].time)
    },

    getDate() {
      for (let i = 0, len = this.tableData.length; i < len; i++) {
        this.dataarr.push({
          qualityLossRatio: this.tableData[i].qualityLossRatio,
          time: this.tableData[i].time,
          grade: this.tableData[i].grade
        })
      }

      return this.dataarr
    },
    goPathPlaning() {
      this.alldata = this.getDate()
      console.log(this.alldata)

      fetch(
        'http://120.79.193.101:8080/ApproximateComputing/photoDecode/photoDecodes',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            photoDecodes: this.alldata
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
              path: 'PathPlaning'
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
    }
  },
  watch: {
    url(newUrl) {
      this.$refs.img.src = newUrl
    }
  }
}
</script>
<style scoped >
.myimg {
  display: block;
  width: 620px;
  height: 340px;
}
</style>
