<template>
  <div class="transferPage flex flex-col">
    <SDPreLoad :preload="preload" />
    <div class="transferPage-link flex items-center flex-wrap">
      <div>
        <NuxtLink to="/seller/transfer">売上振込申請</NuxtLink>
      </div>
      <div class="mx-2">
        <SDIcon icon="chevron-right" class="mx-2" />
      </div>
      <div>売上振込申請の確認</div>
    </div>
    <div class="transferPage-content">
      <div class="transferPage-content-title flex items-end">
        <div class="title-main">売上振込申請の確認</div>
        <div class="title-description">Transfer application</div>
      </div>
      <div class="transferPage-content-main flex flex-col">
        <div class="main-top flex flex-col">
          <div class="main-top-price">
            <div class="text-base text-[#7E7D7D] font-medium">振込申請金額</div>
            <div class="text-[35px] text-[#5E5C5C] font-bold my-[20px]">
              {{ formatPrice(parseInt(amountTransfer)) }}
            </div>
          </div>
          <div class="text-base text-[#7E7D7D] font-medium">
            振込手数料として￥250がかかります。 <br />
            振込申請を行ってから入金までは5営業日程お時間を要する場合がございます。
            <br />
            あらかじめご了承ください。 <br />
          </div>
          <div class="main-top-button">
            <b-button
              class="bg-[#E79C3A] border-none py-[10px] font-semibold"
              v-on:click="createTransferOfSeller"
              >振込申請をする</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SDIcon from "@/components/SDIcon";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import SDPreLoad from "@/components/SDPreLoad";
import Cookies from "js-cookie";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const store = sellerStore();
    const toast = useToast();

    return {
      store,
      toast,
    };
  },
  data() {
    return {
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      amountTransfer: 0,
      preload: false,
      account_id: null
    };
  },
  computed: {
    ...mapState(sellerStore, [
      "success",
      "error",
      "createMessage",
      "createTransferFlg",
      "createSuccess",
      "createError",
    ]),
  },
  components: {
    SDIcon,
    SDPreLoad,
  },

  mounted() {
    window.addEventListener("beforeunload", (event) => {
      // on the navigation type checking refresh or close tab/browser for logout
      this.$router.push(`/seller/transfer`);
    });
  },

  watch: {
    createSuccess() {
      this.preload = false;
      if (this.store.createSuccess === true) {
        this.store.createMessage = "";
        this.store.createSuccess = "";
        this.$router.push(`/seller/transfer/completed`);
      }
    },

    createError() {
      this.preload = false;
      if (this.store.createError === true) {
        this.toast.error(this.store.createMessage, this.optionToast);
        this.store.createMessage = "";
        this.store.createError = "";
        this.$router.push(`/seller/transfer`);
      }
    },
  },
  created() {
    this.amountTransfer = localStorage.getItem("amountTransfer");
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
    },

    createTransferOfSeller() {
      let rememberLogin = localStorage.getItem("rememberLogin");
      if (rememberLogin === "true") {
        this.account_id = localStorage.getItem("account_id");
      } else {
        this.account_id = Cookies.get("account_id");
      }
      const request = {
        transfer_amount: this.amountTransfer,
      };
      this.store.createTransfer(this.account_id, request);
      localStorage.removeItem("amountTransfer");
    },
  },
};
definePageMeta({
  layout: "seller",
});
</script>


<style lang="scss" scoped>
.transferPage {
  padding: 30px 100px;
  @include screen(767){
    padding: 30px;
  }
  @include screen(480) {
    padding-inline: 0px;
  }
  &-link {
    font-size: 14px;
    font-weight: 600;
    color: $gray-800;
    margin-bottom: 50px;
    margin-top: 30px;
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
          display: none;
        }
      }
    }
    &-main {
      margin-top: 50px;
      width: 100%;
      background: $white;
      padding: 30px;
      box-shadow: 2px 2px 2px #4d4d4d33;
      border: 1px solid #00000000;
      opacity: 1;
      @include screen(480){
        background: none;
        box-shadow: none;
        padding: 0px;
        margin-top: 20px;
      }
      .main-top {
        padding: 30px;
        @include screen(480) {
          margin-right: unset;
          padding: 10px;
        }
        &-price{
          @include screen(480){
            background: linear-gradient(180deg, #FD8859, #FF9792);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 140px;
            border-radius: 5px;
            margin-bottom: 30px;
            padding-top: 20px;
          }
          div{
            @include screen(480){
              color: $white;
            }
          }
        }
        &-button {
          margin-top: 50px;
          width: 60%;
          @include screen(480){
            width: 100%;
          }
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