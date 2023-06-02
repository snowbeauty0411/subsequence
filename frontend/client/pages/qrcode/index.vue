<template>
  <div id="scanQR">
    <SDPreLoad :preload="preload" />
    <div class="scanQR-form">
      <div class="logo flex justify-center mb-5">
        <Nuxt-link to="/"
          ><img src="@/assets/images/subsQ_logo3.svg" alt="logo"
        /></Nuxt-link>
      </div>
      <div class="scanQR-form-title my-4" v-if="flagSuccess">
        <div class="title-heading mb-3">成功しました！</div>
        <div class="title-description">
          サービスがアクティブ化されています。サービスをご利用いただきありがとうございます。
        </div>
      </div>
      <div class="scanQR-form-title my-4" v-else>
        <div class="title-heading mb-3">失敗しました！</div>
        <div class="title-description">
          エラーがありました。QRコードをもう一度スキャンしてください。
        </div>
      </div>
      <Nuxt-Link to="/login">
        <div class="mt-2 form-submit flex justify-content-end">
          <b-button type="input" class="form-submit-button">
            <img src="@/assets/images/returnIcon.svg" />
            <span class="text-button">ログイン</span>
          </b-button>
        </div>
      </Nuxt-Link>
    </div>
  </div>
</template>
<script>
import { buyerStore } from "../../store/buyer/index";
import { mapState } from "pinia";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  setup() {
    const store = buyerStore();

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
    };
  },
  computed: {
    ...mapState(buyerStore, ["updateQRSuccess"]),
  },

  watch: {
    updateQRSuccess() {
      if (this.updateQRSuccess) {
        this.flagSuccess = true;
      } else {
        this.flagSuccess = false;
      }
    },
  },

  created() {
    this.serviceHashID = this.$route.query.service_id;
    let userID = this.$route.query.user_id;
    let request = {
      user_id: userID,
      hash_id: this.serviceHashID,
    };

    this.store.updateByQRCode(request);
    this.preload = false;
  },
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