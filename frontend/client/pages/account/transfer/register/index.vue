<template>
  <NuxtLayout :name="user_type === 'BUYER' ? 'buyer' : 'seller'"
    ><div class="registerTransferPage flex flex-col">
      <div class="registerTransferPage-content">
        <div class="registerTransferPage-content-title flex items-end">
          <div class="title-main">振込口座の登録</div>
          <div class="title-description">Transfer account registration</div>
        </div>
        <div
          class="registerTransferPage-content-info flex flex-col w-full my-[50px] items-center"
        >
          <div
            class="identity-info flex flex-col col col-md-12 col-lg-10 col-xl-10 col-xxl-7 p-2 p-sm-4 relative"
          >
            <div
              v-if="identity_verification_status === 4"
              class="background-info absolute flex justify-center items-center flex-col"
            >
              <SDIcon icon="check-lg" class="text-[40px]" />
              <div class="text-[30px] text-center">本人確認は完了してます</div>
            </div>
            <div
              class="identity-info-top flex justify-content-sm-between justify-content-center"
            >
              <div
                class="identity-infomation-top-text text-[20px] text-[#707070] font-semibold flex flex-col justify-center mb-3 mb-sm-0"
              >
                <div class="text-sm-start text-center">振込口座の設定には、</div>
                <div class="text-sm-start text-center">
                  事前に<span class="text-[#F79158]">本人確認</span>
                  が必要です。
                </div>
              </div>
              <div class="identity-info-top-image">
                <img src="@/assets/images/logo3.png" alt="" />
              </div>
            </div>
            <div class="identity-info-bottom" v-if="identity_verification_status !== 4">
              <div class="flex justify-center w-[100%] my-[10px]">
                <b-button
                  @click="redirectToIdentityVerify"
                  class="w-full bg-[#E79C3A] border-none py-[10px] font-medium"
                  >本人確認を行う</b-button
                >
              </div>
            </div>
          </div>
          <div
            v-if="identity_verification_status === 4"
            class="text-infomation col col-md-10 col-lg-7 col-xl-7 col-xxl-6 mx-auto text-[18px] mt-[80px] text-[#7E7D7D]"
          >
            <a class="text-[#E79C3A]" @click="redirectToTerm()">subsQ 利用規約</a>
            および
            <a class="text-[#E79C3A]" @click="redirectToPolicy()">プライバシーポリシー</a>
            に基づき取り扱います。ご確認いただき、内容に同意した上で次へお進みください。
          </div>
        </div>
        <div
          class="flex justify-center w-[100%] my-[50px]"
          v-if="identity_verification_status === 4"
        >
          <b-button
            class="col-md-10 col-lg-7 col-xl-7 col-xxl-6 mx-auto bg-[#E79C3A] border-none py-[10px] font-medium"
            v-on:click="registerSubmitPage()"
            >次へ</b-button
          >
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import Cookies from "js-cookie";
import SDIcon from "@/components/SDIcon";
import { buyerStore } from "@/store/buyer/index.ts";
import { sellerStore } from "@/store/seller/index.ts";
import { mapState } from "pinia";

export default {
  data() {
    return {
      user_type: "",
      account_id: "",
      identity_verification_status: "",
    };
  },
  setup() {
    const store = buyerStore();
    const storeSeller = sellerStore();
    return {
      store,
      storeSeller,
    };
  },
  computed: {
    ...mapState(buyerStore, ["dataAccountBuyer"]),
    ...mapState(sellerStore, ["dataAccount"]),
  },
  watch: {
    dataAccount() {
      this.identity_verification_status = Number(
        this.dataAccount.identity_verification_status
      );
    },
    dataAccountBuyer() {
      this.identity_verification_status = Number(
        this.dataAccountBuyer.identity_verification_status
      );
    },
  },
  created() {
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.user_type = localStorage.getItem("type");
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.user_type = Cookies.get("type");
      this.account_id = Cookies.get("account_id");
    }
    if (this.user_type === "SELLER") {
      this.storeSeller.getAccount(this.account_id);
    } else if (this.user_type === "BUYER") {
      this.store.getAccount(this.account_id);
    }
  },
  components: {
    SDIcon,
  },
  methods: {
    redirectToIdentityVerify() {
      this.$router.push("/account/identity/verify");
    },

    registerSubmitPage() {
      this.$router.push("/account/transfer/register/submit");
    },

    redirectToTerm() {
      window.open("/term", "_blank", "noreferrer");
    },

    redirectToPolicy() {
      window.open("/policy", "_blank", "noreferrer");
    },
  },
};
</script>

<style lang="scss" scoped>
.registerTransferPage {
  padding: 30px 100px;
  @include screen(991) {
    padding: 30px 50px;
  }
  @include screen(576) {
    padding: 20px;
  }
  &-content {
    @include screen(767) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 30px;
    }
    @include screen(480) {
      padding: 0px;
    }
    &-title {
      @include screen(480) {
        border-bottom: 2px solid #707070;
        padding-bottom: 15px;
        padding-top: 10px;
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
          display: none;
        }
      }
    }
    &-info {
      .identity-info {
        .background-info {
          border-radius: 8px;
          font-weight: 700;
          color: $white;
          font-size: 50px;
          background: #7e7d7d;
          opacity: 0.5;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
        }
        .background-info {
          @include screen(480) {
            font-size: 40px;
            .text-center {
              font-size: 5vw;
            }
          }
        }
        .identity-infomation-top {
          @include screen(767) {
            &-text {
              font-size: 3vw;
              flex-grow: 1;
            }
            &-image {
              width: 40%;
            }
          }
        }
      }
    }
    button {
      @include screen(767) {
        width: 100%;
      }
    }
  }
}
</style>
