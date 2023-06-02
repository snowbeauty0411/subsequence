<template>
  <NuxtLayout :name="user_type === 'BUYER' ? 'buyer' : 'seller'">
    <div class="withdrawalPage flex flex-col">
      <div class="withdrawalPage-link flex items-center flex-wrap">
        <div>
          <NuxtLink to="/account/settings">設定</NuxtLink>
        </div>
        <div class="mx-2">
          <SDIcon icon="chevron-right" class="mx-2" />
        </div>
        <div>退会する</div>
      </div>
      <div class="withdrawalPage-content">
        <div class="withdrawalPage-content-title flex items-end">
          <div class="title-main">退会する</div>
          <div class="title-description">Withdrawal from membership</div>
        </div>
        <div class="text-[#5E5C5C] text-base mt-[40px] mb-[50px] font-medium">
          下記の条件を満たしてから、退会へお進みください。
        </div>
        <div class="withdrawalPage-content-info flex justify-around">
          <div class="info-left text-xl text-[#5E5C5C] font-semibold w-[35%]">
            <div>「購入ユーザー」</div>
            <div>
              現在、<span class="text-[#F79158]">購入中のサービス</span>がない
            </div>
            <br />
            <div>「出品ユーザー」</div>
  
            <div>
              <span class="text-[#F79158]"
                >出品中のサービス・振込申請中の売上金</span
              >
              がない
            </div>
            <div>
              （売上振込申請を行っている場合は、振込が完了してから退会手続きを行なってください）
            </div>
          </div>
          <div class="info-right w-[35%] flex items-center">
            <img src="@/assets/images/logo3.png" alt="" />
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
  components: {
    SDIcon,
  },
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
  methods: {
    redirectConfirm() {
      this.$router.push("/account/settings/withdrawal/confirm");
    },
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
  &-link {
    font-size: 14px;
    font-weight: 600;
    color: $gray-800;
    margin-bottom: 50px;
    margin-top: 30px;
    @include screen(991) {
      margin-bottom: 30px;
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
    }
    &-info {
      @include screen(991) {
        flex-direction: column;
      }
      .info-left {
        @include screen(991) {
          width: 100%;
          font-size: 18px;
        }
      }
      .info-right {
        @include screen(991) {
          margin-top: 50px;
          width: 100%;
          justify-content: center;
        }
      }
    }
    button {
      @include screen(576) {
        width: 100%;
      }
    }
  }
}
</style>