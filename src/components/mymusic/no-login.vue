<template>
  <div class="main">
    <!-- 底层部分 -->
    <div class="underlying">
      <p class="title">登录网易云音乐</p>
      <p class="info">查看并管理你收藏的私房音乐，方便地随时随地收听</p>
      <p class="icon-lists">
        <i class="iconfont icon-video"></i>
        <i class="iconfont icon-video"></i>
        <i class="iconfont icon-video"></i>
        <i class="iconfont icon-video"></i>
      </p>
      <el-button type="primary" @click="dialogVisible=true">立即登录</el-button>
    </div>

    <!-- 对话框部分 -->
    <div class="dialog">
      <el-dialog title="登录" :visible.sync="dialogVisible" width="30%">
        <div class="options">
          <!-- 选择登录，注册界面 -->
          <div class="select_login_register" v-if="!showLogigRegisterDialog">
            <div class="content">
              <div class="left">
                <div class="picture">
                  <img src="../../assets/img/detail/dayback.png" width="100%" alt />
                </div>
                <el-button type="primary" @click="goLogin">手机登录</el-button>
                <el-button @click="goRegister">注册</el-button>
              </div>
              <div class="right">111</div>
            </div>
            <div class="footer">
              <el-checkbox v-model="checked">同意</el-checkbox>
              <a href="https://st.music.163.com/official-terms/service" target="_blank">《服务条框》</a>
              <a href="https://st.music.163.com/official-terms/privacy" target="_blank">《隐私政策》</a>
              <a href="https://st.music.163.com/official-terms/children" target="_blank">《儿童隐私政策》</a>
            </div>
          </div>

          <!-- 登录注册界面 -->
          <div class="login_register" v-else>
            <div class="form">
              <el-form
                :model="userinfo"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="手机号码" prop="phone">
                  <el-input placeholder="请输入内容" v-model="userinfo.phone" class="input-with-select">
                    <el-select v-model="phone_pre" slot="prepend" placeholder="请选择">
                      <el-option label="地区" value="1"></el-option>
                      <el-option label="尾号" value="2"></el-option>
                    </el-select>
                  </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="userinfo.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('userinfo')">提交</el-button>
                  <el-button @click="resetForm('userinfo')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <footer>
              <span>返回菜单</span>
            </footer>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      checked: false,
      showLogigRegisterDialog: false, //是否进去登录注册界面
      userinfo: {
        phone: "",
        pass: "",
      }, //登录注册用户信息
      rules: {}, //输入的规则
      phone_pre: "", //手机前缀
    };
  },
  methods: {
    //去登录
    goLogin() {
      if (!this.checked) {
        this.$message({ message: "请先勾选同意协议", offset: 80 });
        return;
      }
      this.showLogigRegisterDialog = true;
    },
    //去注册
    goRegister() {
      if (!this.checked) {
        this.$message({ message: "请先勾选同意协议", offset: 80 });
        return;
      }
      this.showLogigRegisterDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .underlying {
    @include flex-center;
    flex-direction: column;
    .title {
      font-size: 22px;
      font-weight: 600;
    }
    .info {
      color: #cfa488;
      margin: 20px 0;
    }
    .icon-lists {
      i {
        font-size: 40px;
      }
    }
    .el-button {
      margin-top: 20px;
      background-color: #0c73c2;
    }
  }

  .dialog {
    /deep/ .el-dialog__header {
      background-color: $theme-color;
      /deep/ .el-dialog__title,
      .el-dialog__close {
        color: white;
      }
    }
    .options {
      .select_login_register {
        .content {
          @include flex-between;
          .left {
            @include flex-general(column, center, center);
            width: 70%;
            border-right: 2px dotted black;
            padding: 0 10% 0 0;
            margin-bottom: 30px;
            .el-button {
              width: 100%;
              margin-top: 10px;
              &:not(:first-child) {
                margin-left: 0;
              }
            }
          }
          .right {
            flex: 1;
          }
        }
        .footer {
          font-size: 12px;
          a:hover {
            text-decoration: underline;
          }
        }
      }
      .login_register {
      }
    }
  }
}
</style>
