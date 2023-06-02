<template>
  <div id="forgotPage">
    <div class="forgot-form" v-on:keyup.enter="handleSubmit">
      <div class="logo flex justify-center mb-5">
        <Nuxt-link to="/"
          ><img src="@/assets/images/subsQ_logo3.svg" alt="logo"
        /></Nuxt-link>
      </div>
      <div class="forgot-form-title my-4">
        <div class="title-heading mb-3">メール送信完了</div>
        <div class="title-description">
          パスワード再設定用のURLをご入力のメールアドレスに送信しました。
        </div>
        <div class="title-description">
          記載された内容に従って、パスワードの再設定を行なってください。
        </div>
      </div>

      <Nuxt-Link to="/">
        <div class="mt-2 form-submit flex justify-content-end">
          <b-button type="input" class="form-submit-button">
            <span class="text-button">TOPページへ戻る</span>
          </b-button>
        </div>
      </Nuxt-Link>
    </div>
  </div>
</template>

<script>

export default {
  name: "ForgotSended",
};
</script>

<style lang="scss">
#forgotPage {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
  min-height: 100vh;

  .forgot-form {
    width: 50%;

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
          margin-left:0px;
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
    .form-submit {
      width: 100%;
      &-button {
        margin-top: 50px;
        background-color: $orange;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 11px 0;
        width: 100%;
        border-radius: 8px;
        border: none;
        .text-button {
          color: #fff;
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
