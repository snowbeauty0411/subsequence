<template>
  <div id="signUpPage">
    <b-container fluid>
      <b-row>
        <b-col lg="6" class="signup-left relative">
          <div class="signup-left-logo">
            <Nuxt-link to="/">
              <img src="@/assets/images/subsQ_logo2.svg" alt="" class="mt-4" />
            </Nuxt-link>
          </div>
          <div class="signup-left-content absolute">
            <div class="signup-left-content-title">Welcome to our service</div>
            <div class="signup-left-content-description my-3">
              We will help you advertise your subscription service.
            </div>
            <div class="signup-left-content-textJP">
              サブスクリプションマーケットのサブスキュー
            </div>
          </div>
        </b-col>
        <b-col cols="12" lg="6" class="signup-right"
          >
          <div class="signup-left-logo" data-v-fdff0ef5=""><a href="/" class="" data-v-fdff0ef5="">
            <img src="@/assets/images/subsQ_logo2.svg" alt="" class="mt-4" data-v-fdff0ef5=""></a>
          </div>
          <div class="signup-right-content">
            <div class="signup-right-title my-4">
              <div class="signup-right-title-heading mb-3">
                アカウントを作成する
              </div>
              <div class="signup-right-title-description">
                ご入力いただいたメールアドレスにアカウント作成メールを送信します。
              </div>
            </div>
            <div class="text-center text-danger">{{ message }}</div>
            <div class="form-label">メールアドレス</div>
            <div class="form-group relative validate-form">
              <b-form-input
                v-model.trim="v$.user.email.$model"
                placeholder="qazwsx@gmail.com"
                class="custom-input"
              />
              <div v-if="v$.user.email.$error" class="error-text">
                <p v-if="v$.user.email.required.$invalid">
                  {{ messageLogin.email_required }}
                </p>
                <p v-if="v$.user.email.email.$invalid">
                  {{ messageLogin.email }}
                </p>
                <p v-if="v$.user.email.maxLength.$invalid">
                  {{ messageLogin.email_maxLength }}
                </p>
              </div>
            </div>

            <div class="mt-2" v-on:click.prevent="handleSubmit">
              <b-button
                type="input"
                class="submit-signup"
                v-bind:is-loading="submitted"
              >
                <span class="text-button">アカウント作成メールを送信</span>
              </b-button>
            </div>
            <div class="text-login flex justify-center">
              <Nuxt-Link to="/login">ログイン</Nuxt-Link>
            </div>
          </div>
          <div class="signup-left-content" data-v-fdff0ef5="">
            <div class="signup-left-content-title" data-v-fdff0ef5="">Welcome to our service</div>
            <div class="signup-left-content-description my-3" data-v-fdff0ef5=""> We will help you advertise your subscription
              service. </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import { Urls } from "@/utils/urls";
import { Api } from "@/utils/https-common";

export default {
  setup: () => ({ v$: useVuelidate() }),
  name: "SignUp",
  data() {
    return {
      messageLogin: Message.LOGIN,
      user: {
        email: "",
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
    },
  },
  created() {},
  methods: {
    async handleSubmit() {
      this.submitted = true;
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        this.submitted = false;
        const dataForm = this.user;
        await Api.requestServer
          .post(`${Urls.SIGNUP}/${Urls.CHECK_EMAIL}`, dataForm)
          .then((response) => {
            const { data } = response;
            if (data.success) {
              this.$router.push("/signup/done");
            } else {
              this.message = data.message;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/auth/index.scss";
</style>

<style lang="scss" scoped>
#signUpPage {
  background-color: #ffffff;
  min-height: 100vh;
  .signup-left {
    background-image: url("~/assets/images/backgroundSignUp.png");
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-left: 60px;
    @media (max-width: 991px) {
      display: none;
    }
    &-logo {
      img {
        width: 120px;
      }
    }
    &-content {
      top: 50%;
      transform: translateY(calc(-50% + 15px));
      &-title {
        font-size: 45px;
        color: #5e5c5c;
        @include screen(767){
          font-size: 35px;
        }
        @include screen(480){
          font-size: 27px;
        }
      }
      &-description {
        font-size: 16px;
        color: #5e5c5c;
        @include screen(480){
          font-size: 11px;
        }
      }
      &-textJP {
        margin-top: 100px;
        font-size: 16px;
        color: #5e5c5c;
        font-weight: 600;
      }
    }
  }
  .signup-right {
    margin-bottom: 120px;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    min-height: calc(100vh - 120px);
    flex-direction: column;
    align-items: center;
    @include screen(991){
      background-image: url(@/assets/images/backgroundSignUp.png);
      min-height: 100vh;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding-inline: 40px;
    }
    @include screen(480){
      padding-inline: 20px;
    }
    .signup-left-logo{
      @include screen(991){
        margin-right: auto;
      }
    }
    .signup-left-content{
      @include screen(991){
        margin-right: auto;
      }
    }
    &-content {
      width: 700px;
      padding: 0 20px;
      max-width: 100%;
      margin: auto;
      @include screen(480){
        padding: unset;
      }
      .signup-right-title {
        padding: 10px 10px;
        &-heading {
          color: #5e5c5c;
          font-size: 25px;
          font-weight: 600;
        }
        &-description {
          color: #7e7d7d;
          font-size: 16px;
        }
      }
      .form-label {
        color: #7e7d7d;
        font-weight: 600;
      }
      .submit-signup {
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
          border: 1px solid $orange;
        }
        .text-button {
          color: $white;
          font-size: 1rem;
          font-weight: 500;
        }
      }
      .text-login {
        margin-top: 50px;
        a {
          color: $orange;
          font-weight: 600;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
