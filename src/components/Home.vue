<template>
  <div class="Home">
    <div class="home-container">
      <div class="home-nav">
        <h3>近似计算</h3>
        <el-button @click="dialogFormVisible = true">管理员登录</el-button>
      </div>
      <div class="home-main">
        <h1>网站介绍</h1>

        <p id="pageTextShow"> 本网站有多不同应用，这些应用都有所不同，请你体验一下，并对每个应用的满意度评分!</p>
        <el-button type="primary" circle @click='goGrade'>GO</el-button>
      </div>
      <div class="home-footer">
        the product for @
        <b>Approximate Calculation</b>
      </div>
    </div>

    <el-dialog title="管理员登录" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '60px',
      form: {
        account: '',
        password: ''
      },
      i: 0,
      timer: ''
    }
  },

  methods: {
    login() {
      console.log(this.form.account)
      console.log(this.form.password)

      fetch(' http://localhost:3000/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          account: this.form.account,
          password: this.form.password
        })
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (data.code === 0) {
            this.$router.push({
              path: 'admin'
            })
          } else {
            this.$message({
              showClose: true,
              message: '验证错误',
              type: 'warning'
            })
          }
        })
    },
    goGrade: function() {
      clearInterval(this.timer)
      this.$router.push({
        path: 'Audio'
      })
    }
  }
}
</script>
<style scoped>
.home-container {
  text-align: center;
  width: 80%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  height: 100%;
}

.home-nav {
  height: 80px;
  margin-bottom: 100px;
}
.home-nav > h3 {
  position: absolute;
  left: 20px;
}
.home-nav > button {
  position: absolute;
  right: 20px;
  top: 20px;
}

.home-footer {
  position: absolute;
  bottom: 10px;
  width: 100%;

  height: 20px;
  color: black;
}

#pageTextShow {
  font-size: 24px;
  color: rgb(5, 35, 59);
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  -webkit-animation: type 5s steps(50, end);
  animation: type 5s steps(50, end);
}

.home-main > button {
  width: 50px;
  height: 50px;
}

@-webkit-keyframes type {
  from {
    width: 0;
  }
}

@keyframes type {
  from {
    width: 0;
  }
}

@-webkit-keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
}
</style>
