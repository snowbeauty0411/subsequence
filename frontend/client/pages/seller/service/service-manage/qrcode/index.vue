<template>
  <div id="scanQR">
    <SDPreLoad :preload="preload" />
    <div class="scanQR-form">
      <div class="logo flex justify-center mb-5">
        <Nuxt-link to="/"
          ><img src="@/assets/images/subsQ_logo3.svg" alt="logo"
        /></Nuxt-link>
      </div>
      <div class="scanQR-form-title my-4" v-if="checkSellerFlag">
        <div class="title-heading mb-3">失敗しました！</div>
        <div class="title-description">ログインして再度QRコードを読み取ってください。</div>
        <div class="mt-2 form-submit flex justify-content-end">
          <b-button type="input" class="form-submit-button" @click="redirectToHomePage">
            <img src="@/assets/images/returnIcon.svg" />
            <span class="text-button">ログイン</span>
          </b-button>
        </div>
      </div>
      <div v-else>
        <div class="scanQR-form-title my-4" v-if="flagSuccess">
          <div class="title-heading mb-3">読み取りに成功しました！</div>
          <div class="title-description">
            {{ this.messageQRCode }}
            利用ユーザーにページ更新後、確認して頂くようにお伝え下さい。
          </div>
        </div>
        <div class="scanQR-form-title my-4" v-else>
          <div class="title-heading mb-3">失敗しました！</div>
          <div class="title-description">
            エラーがありました。QRコードをもう一度スキャンしてください。
          </div>
        </div>
        <div class="mt-2 form-submit flex justify-content-end">
          <b-button type="input" class="form-submit-button" @click="redirectToDetailService">
            <img src="@/assets/images/returnIcon.svg" />
            <span class="text-button">サービス詳細へ</span>
          </b-button>
        </div>
      </div>
      <!-- <Nuxt-Link to="/login"> -->
      <!-- </Nuxt-Link> -->
    </div>
  </div>
</template>
<script>
import { sellerStore } from "../../../../../store/seller/index";
import { mapState } from "pinia";
import SDPreLoad from "@/components/SDPreLoad";
import Cookies from "js-cookie";

export default {
  setup() {
    const store = sellerStore();

    return {
      store,
    };
  },
  components: {
    SDPreLoad,
  },
  data() {
    return {
      preload: true,
      serviceHashID: "",
      flagSuccess: false,
      messageQRCode: "",
      checkSellerFlag: false,
    };
  },
  computed: {
    ...mapState(sellerStore, ["updateQRSuccess", "message"]),
  },

  watch: {
    updateQRSuccess() {
      if (this.updateQRSuccess) {
        this.flagSuccess = true;
        this.messageQRCode = this.message;
        this.preload = false;
      } else {
        this.preload = false;
        this.flagSuccess = false;
      }
    },
  },

  created() {
    this.serviceHashID = this.$route.query.service_id;
    let userID = this.$route.query.user_id;
    let sellerID = this.$route.query.seller_id;
    let sellerLogined = null
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      sellerLogined = localStorage.getItem("account_id");
    } else {
      sellerLogined = Cookies.get("account_id");
    }

    if (sellerID === sellerLogined) {
      this.checkSellerFlag = false;
      let request = {
        user_id: userID,
        hash_id: this.serviceHashID,
      };

      this.store.updateByQRCode(request);
    } else {
      this.preload = false;
      this.checkSellerFlag = true;
    }
  },

  methods: {
    redirectToDetailService() {
      this.$router.push(`/seller/service/service-manage/${this.serviceHashID}`)
    },

    redirectToHomePage() {
      this.$router.push("/")
    }
  }
};
</script>
<style lang="scss" scoped>
#scanQR {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
  min-height: 100vh;
  .scanQR-form {
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