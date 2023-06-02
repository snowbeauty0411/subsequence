<template>
  <div id="signUpDone">
    <div class="signup-form" v-on:keyup.enter="handleSubmit">
      <div class="logo flex justify-center mb-5">
        <Nuxt-link to="/"
          ><img src="@/assets/images/subsQ_logo3.svg" alt="logo"
        /></Nuxt-link>
      </div>
      <div class="signup-form-title my-4">
        <div class="title-heading mb-3">会員登録</div>
        <div class="title-description">メンバー登録に成功</div>
        <!-- <div class="title-description">
          記載された内容に従って、アカウント作成のステップにお進みください。
        </div> -->
      </div>
      <Nuxt-Link to="/login">
        <div class="mt-2 form-submit flex justify-content-end">
          <b-button
            type="input"
            class="form-submit-button"
            v-bind:is-loading="submitted"
          >
            <img src="@/assets/images/returnIcon.svg" />
            <span class="text-button">ログイン</span>
          </b-button>
        </div>
      </Nuxt-Link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpDone",
};
</script>

<style lang="scss" scoped>
#signUpDone {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
  min-height: 100vh;
  .signup-form {
    width: 50%;
    .logo {
      img {
        width: 150px;
      }
    }
    &-title {
      .title-heading {
        color: #5e5c5c;
        font-size: 25px;
        font-weight: 600;
      }
      .title-description {
        color: #7e7d7d;
        font-size: 16px;
      }
    }
    @media (max-width: 576px) {
      width: 90%;
    }
    @media (max-width: 768px) {
      width: 70%;
    }
    .form-submit {
      width: 100%;
      &-button {
        width: 30%;
        margin-top: 50px;
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 1px 1px 6px #00000029;
        border-radius: 28px;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 11px 20px;
        border: none;
        @media (max-width: 768px) {
          width: unset;
        }
        &:focus {
          border: 1px solid $orange;
        }
        img {
          margin-right: 10px;
        }
        .text-button {
          color: #5e5c5c;
          font-size: 1rem;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
