<template>
  <div id="loginPage">
    <div class="login-form" v-on:keyup.enter="handleSubmit">
      <div class="logo flex justify-center mb-5">
        <Nuxt-link to="/"
          ><img src="@/assets/images/subsQ_logo3.svg" alt="logo"
        /></Nuxt-link>
      </div>
      <div class="text-center text-danger my-2">{{ message }}</div>
      <div class="form-label">メールアドレス</div>
      <div
        class="form-group relative validate-form"
        v-bind:class="{
          'mb-5 mb-md-3':
            !v$.user.password.maxLength || !v$.user.password.minLength,
        }"
      >
        <b-form-input
          v-model.trim="v$.user.email.$model"
          placeholder="qazwsx@gmail.com"
          class="custom-input"
          v-bind:class="{ 'is-invalid': v$.user.email.$error }"
        />
        <div v-if="v$.user.email.$error" class="error-text">
          <p v-if="v$.user.email.required.$invalid">
            {{ messageLogin.email_required }}
          </p>
          <p v-if="v$.user.email.email.$invalid">{{ messageLogin.email }}</p>
          <p v-if="v$.user.email.maxLength.$invalid">
            {{ messageLogin.email_maxLength }}
          </p>
        </div>
      </div>
      <div class="form-label mt-3">パスワード</div>
      <div class="form-group relative validate-form">
        <b-form-input
          v-model.trim="v$.user.password.$model"
          :type="showPassword ? 'password' : 'text'"
          placeholder="Qazwsx"
          v-bind:class="{ 'is-invalid': v$.user.password.$error }"
          class="custom-input"
        />
        <div class="control">
          <div @click="toggleShow">
            <img src="@/assets/images/eye.png" v-if="showPassword" />
            <img src="@/assets/images/eye-slash.png" v-if="!showPassword" />
          </div>
        </div>
        <div v-if="v$.user.password.$error" class="error-text">
          <span v-if="v$.user.password.required.$invalid">{{
            messageLogin.pass_required
          }}</span>
        </div>
      </div>
      <div class="flex justify-between my-3 link-login">
        <div class="form-checkbox">
          <b-form-checkbox
            id="saveLogin"
            v-model="saveLogin"
            name="saveLogin"
            :value="true"
            :nchecked-value="false"
            >ログイン状態を保存</b-form-checkbox
          >
        </div>
        <Nuxt-link to="/forgot/input" class="text-forgotPW"
          >パスワードをお忘れの方</Nuxt-link
        >
      </div>

      <div class="mt-2" v-on:click.prevent="handleSubmit">
        <b-button
          type="input"
          class="submit-login"
          v-bind:is-loading="submitted"
        >
          <span class="text-button">ログイン</span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import { Urls } from "@/utils/urls";
import { Api } from "@/utils/https-common";
import Cookies from "js-cookie";

export default {
  setup: () => ({ v$: useVuelidate() }),
  auth: false,
  layout: "main",
  data() {
    return {
      messageLogin: Message.LOGIN,
      saveLogin: true,
      showPassword: true,
      user: {
        email: "",
        password: "",
      },
      submitted: false,
      message: "",
      optionToast: {
        position: "top-center",
        duration: 3000,
        keepOnHover: true,
        singleton: true,
        fitToScreen: true,
      },
    };
  },

  validations: {
    user: {
      email: { required, email, maxLength: maxLength(256) },
      password: {
        required,
      },
    },
  },

  watch: {},

  created() {
    localStorage.removeItem("token_admin")
    Cookies.remove("token_admin")
    let valueToken = null;
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      valueToken = localStorage.getItem("token_user");
    } else {
      valueToken = Cookies.get("token_user");
      this.saveLogin = false;
    }
    if (valueToken) {
      this.$router.push("/");
    }
  },

  methods: {
    async handleSubmit() {
      this.submitted = true;
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        this.submitted = false;
        const dataForm = this.user;
        await Api.requestServer
          .post(`${Urls.LOGIN}`, dataForm)
          .then((response) => {
            const { data } = response;
            if (data.success) {
              localStorage.setItem("rememberLogin", this.saveLogin);
              if (this.saveLogin) {
                localStorage.setItem("token_user", data.data.access_token);
                localStorage.setItem("account_id", data.data.account_id);
                localStorage.setItem("type", data.data.type);
              } else {
                Cookies.set("token_user", data.data.access_token);
                Cookies.set("account_id", data.data.account_id);
                Cookies.set("type", data.data.type);
              }
              this.$router.push("/");
            } else {
              this.message = data.message;
              setTimeout(() => {
                this.message = "";
              }, 3000);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/auth/index.scss";
</style>

<style lang="scss" scoped>
#loginPage {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;

  .login-form {
    width: 35%;
    padding: 80px 10px;

    .logo {
      img {
        width: 150px;
        @include screen(576){
          width: 95px;
        }
      }
    }
    @media (max-width: 768px) {
      width: 70%;
    }
    @media (max-width: 576px) {
      width: 100%;
      padding-inline: 20px;
    }
    .form-label {
      color: #7e7d7d;
      font-weight: 600;
      font-size: 18px;
      @include screen(576){
        font-size: 16px;
      }
    }
    .form-group {
      position: relative;
      .control {
        position: absolute;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
        cursor: pointer;
        img {
          width: 20px;
        }
      }
    }
    .text-forgotPW {
      text-decoration: none;
      color: #7e7d7d;
    }
    .link-login {
      @include screen(480) {
        flex-direction: column !important;
        align-items: center;
        .form-checkbox {
          margin-bottom: 20px;
        }
      }
    }
    .submit-login {
      margin-top: 50px;
      background-color: $orange;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 11px 0;
      width: 100%;
      border-radius: 8px;
      border: none;
      &:focus {
        box-shadow: 0 0 0 0.25rem #95c895 !important;
      }
      .text-button {
        color: #fff;
        font-size: 1rem;
      }
    }
  }
}
</style>
