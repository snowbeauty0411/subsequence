<template>
  <div id="resetPage">
    <div class="reset-form" v-on:keyup.enter="handleSubmit">
      <div class="logo flex justify-center mb-5">
        <Nuxt-link to="/"
          ><img src="@/assets/images/subsQ_logo3.svg" alt="logo"
        /></Nuxt-link>
      </div>
      <div v-if="checkToken == true">
      <div class="title-heading my-4">パスワード再設定</div>
      <div class="text-center text-danger">{{ message }}</div>
      <!-- Password -->
      <div class="form-label mt-3">パスワード</div>
      <div class="form-group relative validate-form">
        <b-form-input
          v-model.trim="v$.user.password.$model"
          :type="showPassword ? 'password' : 'text'"
          placeholder="パスワード"
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
          placeholder="パスワード再入力"
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

      <div class="mt-2" v-on:click.prevent="handleSubmit">
        <b-button
          type="input"
          class="submit-reset"
          v-bind:is-loading="submitted"
        >
          <span class="text-button">ログイン</span>
        </b-button>
      </div>
      </div>
      <div v-else>
        <div class="text-center text-danger">{{ message }}</div>
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
import { useToast } from "vue-toastification";
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
  name: "ResetPassword",
  setup() {
    const v$ = useVuelidate();
    const toast = useToast();
    return {
      v$,
      toast,
    };
  },
  data() {
    return {
      messageLogin: Message.LOGIN,
      showPassword: true,
      showConfirmPassword: true,
      user: {
        password: "",
        confirmPassword: "",
      },
      submitted: false,
      message: "",
      token: "",
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      checkToken: false,
    };
  },
  validations: {
    user: {
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
    },
  },
  watch: {},
  async created() {
    this.token = this.$route.params.token;
    const dataForm = {
      token: this.token,
    };
    await Api.requestServer
      .post(`${Urls.PASSWORD}/${Urls.CHECK}`, dataForm)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.checkToken = true
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
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        this.submitted = false;
        if (this.user.password === this.user.confirmPassword) {
          const dataForm = {
            password: this.user.password,
            password_confirmation: this.user.confirmPassword,
            token: this.token,
          };
          await Api.requestServer
            .post(`${Urls.PASSWORD}/${Urls.RESET}`, dataForm)
            .then((response) => {
              const { data } = response;
              if (data.success) {
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
                  this.messageLogin.reset_pw_success,
                  this.optionToast
                );
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
        } else {
          this.message = Message.LOGIN.error_password;
          setTimeout(() => {
            this.message = "";
          }, 3000);
        }
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
#resetPage {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
  min-height: 100vh;

  .reset-form {
    width: 35%;
    padding: 80px 10px;

    .logo {
      img {
        width: 150px;
      }
    }

    @media (max-width: 576px) {
      width: 90%;
    }
    @media (max-width: 768px) {
      width: 70%;
    }
    .form-label {
      color: #7e7d7d;
      font-weight: 600;
      font-size: 18px;
    }
    .title-heading {
      color: #5e5c5c;
      font-size: 25px;
      font-weight: 600;
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
    .text-forgotPW {
      text-decoration: none;
      color: #7e7d7d;
    }
    .submit-reset {
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
