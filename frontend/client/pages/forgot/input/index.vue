<template>
  <div id="forgotPage">
    <div class="forgot-form" v-on:keyup.enter="handleSubmit">
      <div class="logo flex justify-center mb-5">
        <Nuxt-link to="/"
          ><img src="@/assets/images/subsQ_logo3.svg" alt="logo"
        /></Nuxt-link>
      </div>
      <!-- <div class="text-center text-danger">{{ message }}</div> -->
      <div class="forgot-form-title my-4">
        <div class="title-heading mb-3">パスワード再設定</div>
        <div class="title-description">
          ご登録いただいたメールアドレスを入力してください。
        </div>
        <div class="title-description">
          メールアドレス宛にパスワード変更ページのURLが記載されたメールを送信します。
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
          class="submit-forgot"
          v-bind:is-loading="submitted"
        >
          <span class="text-button">メールを送信する</span>
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

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      messageLogin: Message.LOGIN,
      user: {
        email: "",
      },
      submitted: false,
      message: "",
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
          .post(`${Urls.FORGOT}/${Urls.INPUT}`, dataForm)
          .then((response) => {
            const { data } = response;
            if (data.success) {
              this.$router.push("/forgot/sended");
            } else {
              this.error = "true";
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
#forgotPage {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;

  .forgot-form {
    width: 50%;
    padding: 10px 10px;

    .logo {
      img {
        width: 150px;
        @include screen(576){
          width: 95px;
        }
      }
    }
    
    &-title {
      .title-heading {
        color: #5e5c5c;
        font-size: 25px;
        font-weight: 600;
        @include screen(576){
          font-size: 18px;
        }
      }
      .title-description {
        color: #7e7d7d;
        font-size: 16px;
        @include screen(576){
          font-size: 14px;
          margin-left: 0px;
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
      @include screen(576){
        font-size: 16px;
      }
    }
    .submit-forgot {
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
        color: #fff;
        font-size: 1rem;
      }
    }
  }
}
</style>
