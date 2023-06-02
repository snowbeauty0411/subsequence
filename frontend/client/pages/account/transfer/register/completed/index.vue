<template>
  <NuxtLayout :name="user_type === 'BUYER' ? 'buyer' : 'seller'">
    <div class="completedRegisterPage flex flex-col">
      <div class="completedRegisterPage-content">
        <div class="completedRegisterPage-content-title flex items-end">
          <div class="title-main">登録完了</div>
          <div class="title-description">Account registration completed</div>
        </div>
        <div class="completedRegisterPage-content-main flex flex-col">
          <div class="title-main">口座登録が完了しました。</div>
          <div
            class="
              text-base text-[#7E7D7D]
              font-medium
              mt-[60px]
              mb-[40px]
              w-[60%]
              content-text
            "
          >
            ご登録いただいた口座はsubsQのサービスを利用して売上金が発生したときに入金先になる口座としてご利用いただけます。
            <br />
            すでに登録済みの口座を変更される場合は、再度登録を行ってください。
          </div>
          <div class="w-[60%] content-button">
            <b-button
              class="w-full bg-[#E79C3A] border-none py-[10px]"
              v-on:click="topPage()"
              >アカウント管理TOPへ戻る</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import SDIcon from "@/components/SDIcon";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      user_type: "",
    };
  },
  created() {
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    let valueToken = null;
    if (rememberLogin === "true") {
      valueToken = localStorage.getItem("token_user");
      this.user_type = localStorage.getItem("type");
    } else {
      valueToken = Cookies.get("token_user");
      this.user_type = Cookies.get("type");
    }

    if (!valueToken) {
      this.$router.push("/login");
    }
  },
  components: {
    SDIcon,
  },
  methods: {
    topPage() {
      if (this.user_type === 'BUYER') {
        this.$router.push("/buyer/account");
      } else {
        this.$router.push("/seller/account");
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.completedRegisterPage {
  padding: 30px 100px;
  @include screen(991) {
    padding: 30px 50px;
  }
  @include screen(576) {
    padding: 30px;
  }
  @include screen(480) {
    padding: 30px;
  }

  &-content {
    @include screen(767) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 30px;
    }
    @include screen(480) {
      padding: 20px;
    }
    &-title {
      @include screen(480){
        display: none;
      }
      .title-main {
        font-size: 22px;
        color: #5e5c5c;
        font-weight: 600;
        @include screen(480) {
          font-size: 16px;
        }
      }
      .title-description {
        margin-left: 20px;
        font-size: 14px;
        color: #5e5c5c;
        @include screen(480) {
          font-size: 12px;
        }
      }
      @include screen(576) {
        flex-direction: column;
        align-items: flex-start;
      }
      @include screen(480) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    &-main {
      margin-top: 50px;
      width: 100%;
      padding: 30px;
      @include screen(480) {
        margin-top: unset;
        padding: 30px 0;
      }
      .title-main {
        font-size: 22px;
        color: #5e5c5c;
        font-weight: 600;
        @include screen(480) {
          font-size: 16px;
        }
      }
      .content-text {
        @include screen(991) {
          width: 100%;
          margin: 20px 0;
        }
      }
      .content-button {
        @include screen(991) {
          width: 100%;
          margin-top: 50px;
        }
      }
      .main-top {
        padding: 30px;
        margin-right: 100px;
        @include screen(480) {
          margin-right: unset;
          padding: 10px;
        }
        &-button {
          margin-top: 50px;
          width: 60%;
          button {
            background: $orange;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>