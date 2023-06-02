<template>
  <NuxtLayout name="withdrawalcomplete">
    <div class="withdrawalPage col-lg-8 mx-auto px-3 flex flex-col">
      <div class="withdrawalPage-link flex items-center flex-wrap">
        <div>
          <NuxtLink to="/account/settings">設定</NuxtLink>
        </div>
        <div class="mx-2">
          <SDIcon icon="chevron-right" class="mx-2" />
        </div>
        <div><NuxtLink to="/account/settings/withdrawal">退会する</NuxtLink></div>
        <div class="mx-2">
          <SDIcon icon="chevron-right" class="mx-2" />
        </div>
        <div>退会手続き完了</div>
      </div>
      <div class="withdrawalPage-content">
        <div class="withdrawalPage-content-title flex items-end">
          <div class="title-main">退会手続き完了</div>
          <div class="title-description">Withdrawal procedure completed</div>
        </div>
        <div class="withdrawalPage-content-main flex flex-col">
          <div class="title-main">退会手続きが完了しました。</div>
          <div
            class="
              text-base text-[#7E7D7D]
              font-medium
              mt-[60px]
              mb-[40px]
              w-[100%]
              content-text
            "
          >
            subsQをご利用いただき、ありがとうございました。<br />
            退会完了メールを送信しておりますので、ご確認ください。<br />
            またのご利用をお待ちしております。
          </div>
          <div class="w-[100%] content-button">
            <b-button
              class="w-full bg-[#E79C3A] border-none py-[10px]"
              v-on:click="topPage()"
              >TOPページへ戻る</b-button
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
    }
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
      let rememberLogin = localStorage.getItem("rememberLogin");
      if (rememberLogin === "true") {
        localStorage.removeItem("token_user");
        localStorage.removeItem("type");
      } else {
        Cookies.remove("token_user");
        Cookies.remove("type");
      }
      this.$router.push("/");
    },
  },
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      let rememberLogin = localStorage.getItem("rememberLogin");
      if (rememberLogin === "true") {
        localStorage.removeItem("token_user");
        localStorage.removeItem("type");
      } else {
        Cookies.removeItem("token_user");
        Cookies.removeItem("type");
      }
      this.$router.push("/");
    });
  },
};
</script>


<style lang="scss" scoped>
.withdrawalPage {
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
  &-link {
    font-size: 14px;
    font-weight: 600;
    color: $gray-800;
    margin-bottom: 50px;
    margin-top: 30px;
    @include screen(991) {
      margin-bottom: 30px;
    }
    @include screen(480){
      display: none;
    }
    a {
      &:hover {
        color: $orange;
      }
    }
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