<template>
  <div>
    <div class="login-box">
      <div class="login-main">
        <div class="login-left"></div>
        <div class="login-right">
          <div class="right-content">
            <div class="login-title">欢迎登录</div>
            <div class="login-form-box">
              <div class="login-form">
                <div class="login-form-title">账号密码登录</div>
                <div class="login-input-item">
                  <a-input
                    placeholder="请输入登录账号"
                    v-model:value="params.user_name"
                  />
                </div>
                <div class="login-input-item">
                  <a-input
                    type="password"
                    placeholder="请输入登录密码"
                    v-model:value="params.pwd"
                    @pressEnter="login"
                  />
                </div>
                <div class="login-btn">
                  <a-button
                    type="primary"
                    shape="round"
                    block
                    size="large"
                    @click="login"
                  >
                    登录
                  </a-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import User from "@/model/User.js";
import { reactive } from "vue";
import { useUserStore } from "../store/modules/user";
import { useRouter } from "vue-router";
 const router = useRouter();
let params = reactive({
  user_name: "",
  pwd: "",
});
const login = () => {
  User.login(params).then(async (res) => {
    const userStore = useUserStore();
    userStore.setUserInfo(res.data.userInfo);
   
    console.log(router, 5345345345);
    await userStore.setRouter()
    router.replace("/");  
  });
};
</script>

<style lang="less">
.login-box {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #fff;
  .login-main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    .login-left {
      height: 100%;
      flex: 1.5;
      background: url("/img/login.jpg") no-repeat 0 0;
      background-size: 100% 100% cover;
      background-size: cover;
      position: relative;
      display: block;
    }
    .login-right {
      flex: 2;
      .right-content {
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .login-title {
          text-align: left;
          width: 456px;
          margin: 30px auto;
          font-family: PingFangSC-Medium;
          font-size: 30px;
          color: #111;
          letter-spacing: 0;
          margin-right: 17 px;
        }
        .login-form-box {
          width: 460px;
          height: 480px;
          overflow: hidden;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
          padding: 40px;
          margin-top: 24px;
          border-radius: 16px;
          .login-form {
            &-title {
              color: #111;
              font-size: 22px;
              margin-bottom: 40px;
            }
            .login-input-item {
              margin-bottom: 36px;
              .ant-input {
                padding-left: 12px;
                background: #f7f8fa;
                border-radius: 10px;
                border: none;
                height: 64px;
                font-size: 14px;
              }
            }
            .ant-btn-round.ant-btn-lg {
              border: none;
              margin-top: 24px;
              height: 64px;
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
