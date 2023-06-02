<template>
  <b-container fluid class="account-buyer w-full">
    <SDPreLoad :preload="preload" />
    <b-row class="w-full pb-[50px]">
      <b-col cols="12" lg="8" sm="7" class="flex account-buyer-user">
        <div>
          <b-img
            class="icon-user"
            :src="
              dataUser.profile_image_url_buy
                ? dataUser.profile_image_url_buy
                : avatarDefault
            "
          ></b-img>
        </div>
        <div
          class="px-4 account-buyer-text w-full flex justify-between flex-col"
        >
          <div class="mt-[5px]">
            <p class="account-name">{{ dataUser.account_name }}</p>
          </div>
          <div class="flex flex-col">
            <div>
              <span class="corporate-industry"
                >{{ classification_id }}
                {{ gender ? "/ " + gender : "/ -" }}</span
              >
              <span class="corporate-industry p-4">{{ statusIdentity }}</span>
            </div>
            <div :class="statusIdentity == '本人確認済み' ? 'mb-[20px]' : ''">
              <p
                class="submit-please flex"
                v-if="statusIdentity === '認証未済'"
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
            class="public-profile-edit flex items-center"
            v-on:click="$router.push('/buyer/profile/edit')"
            ><b-img src="../assets/images/editblack.svg" />
            公開プロフィールを編集
          </b-button>
          <p class="p-3 public-profile-view text-center">
            <Nuxt-link :to="`/profile/${account_id}`"
              >公開プロフィールページをみる</Nuxt-link
            >
          </p>
        </div>
      </b-col>
    </b-row>    
  </b-container>
</template>

<script>
import { buyerStore } from "@/store/buyer";
import { mapState } from "pinia";
import imgDefault from "../../../assets/images/editblack.svg";
import { useToast } from "vue-toastification";
import avatarDefault from "@/assets/images/ellipse.png";
import Cookies from "js-cookie";
import SDPreLoad from "@/components/SDPreLoad";
import { Message } from "@/utils/message";

export default {
  name: "BuyerAccount",
  auth: false,
  setup() {
    const store = buyerStore();
    const toast = useToast();
    return {
      store,
      toast,
    };
  },
  components: {
    SDPreLoad,
  },
  data() {
    return {
      Message: Message.IDENTITY_FILE,
      avatarDefault,
      account_id: null,
      avatar: null,
      dataUser: {},
      imgDefault,
      gender: "",
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
    window.scrollTo(0, 0);
  },
  computed: {
    ...mapState(buyerStore, [
      "success",
      "message",
      "dataAccountBuyer",
      "error",
    ]),
  },
  watch: {
    dataAccountBuyer() {
      this.preload = true;
      this.dataUser = this.dataAccountBuyer.buyers;
      if (this.dataUser.gender === "1") {
        this.gender = "女性";
      } else if (this.dataUser.gender === "2") {
        this.gender = "男性";
      }
      if (
        this.dataAccountBuyer.identity_verification_status === 1 ||
        this.dataAccountBuyer.identity_verification_status === 3
      ) {
        this.statusIdentity = "認証未済";
      } else if (this.dataAccountBuyer.identity_verification_status === 2) {
        this.statusIdentity = "認証待ちです";
      } else if (this.dataAccountBuyer.identity_verification_status === 4) {
        this.statusIdentity = "本人確認済み";
      }
      if (this.dataAccountBuyer.classification_id != null) {
        if (this.dataAccountBuyer.classification_id == 1) {
          this.classification_id = "個人";
        } else {
          this.classification_id = "法人";
        }
      } else {
        this.classification_id = "-";
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
        this.store.error = "";
        this.store.message = "";
      }
    },
  },
  methods: {
    identity() {
      if (this.dataAccountBuyer.birth_day) {
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
  layout: "buyer",
});
</script>

<style lang="scss">
.container-buyer {
  .sidebar {
    @include screen(991) {
      display: none !important;
    }
  }
  .account-buyer {
    padding: 80px 75px;
    @include screen(480) {
      padding: 20px;
      &-user{
        flex-direction: column;
        align-items: center;
      }
    }
    .icon-user {
      height: 115px !important;
      width: 115px !important;
      max-width: unset;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      @include screen(991) {
        height: 84px !important;
        width: 84px !important;
        margin-top: unset;
      }
      @include screen(480){
        margin-bottom: 30px;
      }
    }
    &-text {
      color: $lightblack;
      margin-left: 30px;
      @include screen(991) {
        margin-left: unset;
        height: 84px;
      }
      @include screen(480){
        text-align: center;
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
        font-size: 20px;
        color: $gray-500;
        font-weight: bold;
        @include screen(991) {
          font-size: 15px;
        }
        @include screen(480){
          padding-right: 0 !important;
        }
      }
      .submit-please {
        color: $orange;
        font-size: 12px;
        padding-left: 80px;
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
      @include screen(9921023) {
        width: 100% !important;
        height: 100px;
      }
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
      }
      &-left {
        @include screen(991) {
          width: 100%;
        }
        .complete-service-text {
          font-size: 22px;
          font-weight: bold;
          color: $lightblack;
          margin-top: 80px;
          @include screen(991) {
            font-size: unset;
            margin-top: 25px;
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
          }
        }
      }
      &-right {
        @include screen(991) {
          width: 100%;
          text-align: center;
        }
      }
    }
  }
}
</style>
