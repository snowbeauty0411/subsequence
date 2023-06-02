<template>
  <b-container fluid class="account-seller w-full">
    <PreLoad :preload="preload" />
    <b-row class="pb-[50px]">
      <b-col cols="12" lg="8" sm="7" class="flex account-seller-user">
        <div>
          <b-img
            class="icon-user"
            :src="
              dataUser.profile_image_url_sell
                ? dataUser.profile_image_url_sell
                : avatarDefault
            "
          ></b-img>
        </div>
        <div
          class="px-4 account-seller-text w-full flex justify-between flex-col"
        >
          <div class="mt-[5px]">
            <p class="account-name">{{ dataUser.account_name }}</p>
          </div>
          <div class="flex flex-col">
            <div>
              <span class="corporate-industry">{{ classification_id }}</span>
              <span class="corporate-industry ps-4">{{ statusIdentity }}</span>
            </div>
            <div :class="statusIdentity == '本人確認済み' ? 'mb-[20px]' : ''">
              <p
                class="submit-please flex"
                v-if="statusIdentity !== '本人確認済み'"
              >
                <b-img
                  class="icon-alert"
                  src="../assets/images/alertIcon.svg"
                ></b-img
                >本人確認資料を提出してください
              </p>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="12" lg="4" sm="5" class="public-profile relative">
        <div class="absolute public-profile-btn">
          <b-button
            class="public-profile-edit flex"
            v-on:click="$router.push('/seller/profile/edit')"
            ><b-img src="../assets/images/editblack.svg"></b-img>
            公開プロフィールを編集
          </b-button>
          <p class="p-3 public-profile-view text-center">
            <Nuxt-link :to="`/profile/seller/${account_id}`"
              >公開プロフィールページをみる</Nuxt-link
            >
          </p>
        </div>
      </b-col>
    </b-row>
    <hr class="d-sm-block d-none" />
    <b-row class="w-full complete-service">
      <b-col cols="6" lg="7" sm="6" class="complete-service-left">
        <div>
          <p class="complete-service-text text-center">
            サービス利用のためのステップを、完了させましょう！
          </p>
        </div>
        <div
          class="flex justify-center"
          v-if="statusIdentity !== '本人確認済み'"
        >
          <b-button
            class="complete-service-confirmation p-3"
            v-on:click="identity"
          >
            確認資料を提出する
          </b-button>
        </div>
      </b-col>
      <b-col cols="6" lg="5" sm="6" class="complete-service-right">
        <b-img src="../assets/images/logo3.png"></b-img>
      </b-col>
    </b-row>
  <b-row class="complete-service d-md-none py-0">
    <b-col cols="12" class="complete-service-left mt-0">
      <div class="flex justify-center w-100" v-if="statusIdentity !== '本人確認済み'">
        <b-button class="complete-service-confirmation d-block p-3 mt-0" v-on:click="identity">
          確認資料を提出する
        </b-button>
      </div>
    </b-col>
    <b-col></b-col>
  </b-row>
  </b-container>
</template>

<script>
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import imgDefault from "../../../assets/images/editblack.svg";
import { useToast } from "vue-toastification";
import avatarDefault from "@/assets/images/ellipse.png";
import Cookies from "js-cookie";
import PreLoad from "@/components/SDPreLoad";
import { Message } from "@/utils/message";

export default {
  name: "SellerAccount",
  setup() {
    const store = sellerStore();
    const toast = useToast();
    return {
      store,
      toast,
    };
  },
  components: {
    PreLoad,
  },
  auth: false,
  data() {
    return {
      Message: Message.IDENTITY_FILE,
      avatarDefault,
      account_id: null,
      avatar: null,
      dataUser: {},
      imgDefault,
      statusIdentity: null,
      optionToast: {
        type: "error",
        position: "top-right",
        duration: 3000,
        keepOnHover: true,
        singleton: true,
        theme: "toasted-primary",
        iconPack: "material",
        fitToScreen: true,
      },
      gender: "",
      preload: true,
      classification_id: "",
    };
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.account_id = Cookies.get("account_id");
    }
    this.store.getAccount(this.account_id);
  },
  computed: {
    ...mapState(sellerStore, ["success", "message", "dataAccount", "error"]),
  },
  watch: {
    dataAccount() {
      this.preload = true;
      this.dataUser = this.dataAccount.sellers;
      if (this.dataUser.gender === "1") {
        this.gender = "女性";
      } else if (this.dataUser.gender === "2") {
        this.gender = "男性";
      }
      if (
        this.dataAccount.identity_verification_status === 1 ||
        this.dataAccount.identity_verification_status === 3
      ) {
        this.statusIdentity = "未確認";
      } else if (this.dataAccount.identity_verification_status === 2) {
        this.statusIdentity = "認証待ちです";
      } else if (this.dataAccount.identity_verification_status === 4) {
        this.statusIdentity = "本人確認済み";
      }
      if (this.dataAccount.classification_id != null) {
        if (this.dataAccount.classification_id == 1) {
          this.classification_id = "個人";
        } else {
          this.classification_id = "法人";
        }
      }
      this.preload = false;
    },

    success() {
      if (this.store.success === "true") {
        this.toast.success(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.store.getAccount(this.account_id);
      }
    },

    error() {
      if (this.store.error === "true") {
        this.toast.error(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
      }
    },
  },
  methods: {
    identity() {
      if (this.dataAccount.birth_day) {
        this.$router.push({ path: `/account/identity/verify` });
      } else {
        this.toast.error(
          this.Message.birth_day_before_identity,
          this.optionToast
        );
      }
    },
  },
};
definePageMeta({
  layout: "seller",
});
</script>

<style lang="scss" scoped>
.container-seller {
  .sidebar {
    @include screen(991) {
      display: none !important;
    }
  }
  .account-seller {
    padding: 80px 75px;
    @include screen(480) {
      padding: 20px;
    }
    @include screen(576){
      &-user {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
    }
    .icon-user {
      height: 115px;
      width: 115px !important;
      max-width: unset;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      @include screen(991) {
        height: 84px;
        width: 84px !important;
        margin-top: unset;
      }
    }
    &-text {
      color: $lightblack;
      margin-left: 30px;
      @include screen(991) {
        margin-left: unset;
        height: 84px;
      }
      .account-name {
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 1.5px;
        @include screen(991) {
          font-size: 20px;
        }
      }
      .corporate-industry {
        color: $gray-500;
        font-size: 20px;
        font-weight: bold;
        @include screen(991) {
          font-size: 15px;
        }
      }
      .submit-please {
        color: $orange;
        font-size: 12px;
        padding-left: 65px;
        padding-top: 10px;
        @include screen(991) {
          padding-left: unset;
        }
        .icon-alert {
          padding-right: 5px;
        }
      }
    }
    .public-profile {
      padding-top: 32px;
      padding-right: 0px;
      &-btn {
        right: 0px;
        @include screen(991) {
          position: unset;
        }
      }
      &-edit {
        background-color: $white;
        border-radius: 28px;
        color: $lightblack;
        font-weight: bold;
        padding: 15px 32px;
        border: 0px;
        box-shadow: 1px 1px 6px #00000029;
        border-radius: 28px;
        opacity: 1;
        @include screen(991) {
          font-size: 14px;
          padding: 10px 16px;
          margin: 0 auto;
        }
        img {
          height: 22px;
          @include screen(991) {
            height: 16px;
          }
        }
      }
      &-view {
        font-weight: bold;
        color: $orange;
        @include screen(991) {
          font-size: 13px;
        }
        a {
          &:hover {
            color: $orange;
          }
        }
      }
    }
    .complete-service {
      padding: 74px;
      @include screen(991) {
        padding: unset;
        padding-block: 50px;
      }
      @include screen(576){
        padding-top: 0px;
      }
      &-left {
        @include screen(767){
          display: flex;
          align-items: center;
        }

        .complete-service-text {
          font-size: 22px;
          font-weight: bold;
          color: $lightblack;
          margin-top: 80px;
          @include screen(767){
            font-size: 18px;
            margin-top: 0px;
          }
          @include screen(576){
            font-size: 15px;
          }
        }
        .complete-service-confirmation {
          background-color: $orange;
          width: 75%;
          border: 0px;
          border-radius: 0px;
          font-weight: bold;
          margin: 56px 35px;
          font-size: 18px;
          @include screen(480) {
            margin: 56px 0px;
            width: 100%;
            font-size: 16px;
          }
          @include screen(767){
            display: none;
          }
        }
      }
      &-right {
        @include screen(991) {
          text-align: center;
        }
      }
    }
  }
}
</style>
