<template>
  <div id="signUpInputPage">
    <div class="signUp-form" v-on:keyup.enter="handleSubmit">
      <div class="logo flex justify-center mb-5">
        <Nuxt-link to="/"
          ><img src="@/assets/images/subsQ_logo3.svg" alt="logo"
        /></Nuxt-link>
      </div>
      <!-- <div class="text-center text-danger">{{ message }}</div> -->

      <!-- Email -->
      <div class="text-center text-danger">{{ message }}</div>
      <div class="form-label">アカウント名</div>
      <div class="form-group relative validate-form">
        <b-form-input
          v-model.trim="v$.user.account_name.$model"
          placeholder="xxxxxxxx"
          v-bind:class="{ 'is-invalid': v$.user.account_name.$error }"
          class="custom-input"
        />
        <div v-if="v$.user.account_name.$error" class="error-text">
          <span v-if="v$.user.account_name.required.$invalid">{{
            messageLogin.account_name
          }}</span>
          <span
            v-if="
              v$.user.account_name.maxLength.$invalid ||
              v$.user.account_name.minLength.$invalid
            "
            >{{ messageLogin.account_name }}</span
          >
        </div>
      </div>
      <!-- Password -->
      <div class="form-label mt-3">パスワード</div>
      <div class="form-group relative validate-form">
        <b-form-input
          v-model.trim="v$.user.password.$model"
          :type="showPassword ? 'password' : 'text'"
          placeholder="••••••••••••"
          v-bind:class="{ 'is-invalid': v$.user.password.$error }"
          class="custom-input"
          maxlength="30"
        />
        <div class="control">
          <div @click="toggleShowPassword(true)">
            <img src="@/assets/images/eye.png" v-if="showPassword" />
            <img src="@/assets/images/eye-slash.png" v-if="!showPassword" />
          </div>
        </div>
        <div v-if="v$.user.password.$error" class="error-text">
          <span v-if="v$.user.password.required.$invalid">{{
            messageLogin.pass_required
          }}</span>
          <span
            v-if="
              v$.user.password.maxLength.$invalid ||
              v$.user.password.minLength.$invalid ||
              v$.user.password.regexPassword.$invalid
            "
            >{{ messageLogin.pass_maxLength }}</span
          >
        </div>
      </div>
      <!-- ConfirmPassword -->
      <div class="form-label mt-3">パスワード再入力</div>
      <div class="form-group relative validate-form">
        <b-form-input
          v-model.trim="v$.user.confirmPassword.$model"
          :type="showConfirmPassword ? 'password' : 'text'"
          placeholder="••••••••••••"
          v-bind:class="{ 'is-invalid': v$.user.confirmPassword.$error }"
          class="custom-input"
          maxlength="30"
        />
        <div class="control">
          <div @click="toggleShowPassword(false)">
            <img src="@/assets/images/eye.png" v-if="showConfirmPassword" />
            <img
              src="@/assets/images/eye-slash.png"
              v-if="!showConfirmPassword"
            />
          </div>
        </div>
        <div v-if="v$.user.confirmPassword.$error" class="error-text">
          <span v-if="v$.user.confirmPassword.required.$invalid">{{
            messageLogin.pass_required
          }}</span>
          <span
            v-if="
              v$.user.confirmPassword.maxLength.$invalid ||
              v$.user.confirmPassword.minLength.$invalid ||
              v$.user.confirmPassword.regexPassword.$invalid
            "
            >{{ messageLogin.pass_maxLength }}</span
          >
        </div>
      </div>
      <div class="flex justify-content-between my-3">
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
      </div>

      <div class="mt-2" v-on:click.prevent="handleSubmit">
        <b-button
          type="input"
          class="submit-signUp"
          v-bind:is-loading="submitted"
        >
          <span class="text-button">アカウントを作成</span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import { Urls } from "@/utils/urls";
import { Api } from "@/utils/https-common";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";

const regexPassword = (value) => {
  let isNotFullWidth = true;
  if (value) {
    const regex = /^(?=.*[0-9])(?=.*[a-z]).{8,33}$/;
    const found = regex.test(value);
    if (found) {
      isNotFullWidth = true;
    } else {
      isNotFullWidth = false;
    }
  }
  return isNotFullWidth;
};

export default {
  setup() {
    const v$ = useVuelidate();
    const toast = useToast();
    return {
      v$,
      toast,
    };
  },
  auth: false,
  layout: "main",
  data() {
    return {
      messageLogin: Message.LOGIN,
      saveLogin: true,
      showPassword: true,
      showConfirmPassword: true,
      user: {
        account_name: "",
        password: "",
        confirmPassword: "",
      },
      submitted: false,
      message: "",
      optionToast: {
        position: "top-right",
        duration: 3000,
        keepOnHover: true,
        singleton: true,
        fitToScreen: true,
      },
      token: "",
    };
  },
  validations: {
    user: {
      account_name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(10),
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30),
        regexPassword,
      },
      confirmPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30),
        regexPassword,
      },
      submitted: false,
    },
  },

  watch: {},
  created() {
    this.token = this.$route.params.token;
  },

  methods: {
    async handleSubmit() {
      this.submitted = true;
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        this.submitted = false;
        const dataForm = {
          name: this.user.account_name,
          password: this.user.password,
          password_confirmation: this.user.confirmPassword,
          token: this.token,
        };
        await Api.requestServer
          .post(`${Urls.SIGNUP}/${Urls.CREATE}`, dataForm)
          .then((response) => {
            const { data } = response;
            if (data.success) {
              Cookies.set("token_user", data.data.access_token);
              let rememberLogin = localStorage.getItem("rememberLogin");
              if (rememberLogin === "true") {
                localStorage.setItem("token_user", data.data.access_token);
                localStorage.setItem("account_id", data.data.account_id);
                localStorage.setItem("type", data.data.type);
              } else {
                Cookies.set("token_user", data.data.access_token);
                Cookies.set("account_id", data.data.account_id);
                Cookies.set("type", data.data.type);
              }

              this.toast.success(
                this.messageLogin.signup_success,
                this.optionToast
              );
              this.$router.push("/");
            } else {
              this.message = data.message;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    toggleShowPassword(data) {
      if (data) {
        this.showPassword = !this.showPassword;
      } else {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/auth/index.scss";
</style>

<style lang="scss" scoped>
#signUpInputPage {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
  min-height: 100vh;

  .signUp-form {
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
      font-size: 16px;
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
        img {
          width: 20px;
          cursor: pointer;
        }
      }
    }
    .form-checkbox {
      input {
        border-color: $orange !important;
        &:checked {
          background-color: $orange !important;
          border-color: $orange !important;
        }
      }
      label {
        color: $orange;
        font-weight: 500;
      }
    }
    .submit-signUp {
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
