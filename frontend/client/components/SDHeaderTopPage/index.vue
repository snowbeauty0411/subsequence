<template>
  <div class="header-manage flex justify-end items-center">
    <div class="header-manage-right flex items-center">
      <div class="header-manage-right-username">{{ account_name }}</div>
      <b-dropdown
        no-caret
        class="header-manage-right-avatar"
        id="drowpdown-user"
        right
        :style="'background-image: url(' + urlImg + ')'"
      >
        <div
          class="list-drowpdown flex flex-col justify-between cursor-default"
        >
          <div class="list-top">
            <b-dropdown-item>
              <button class="button-top my-3" v-on:click="switchAccount()">
                {{ user_type === "BUYER" ? "出品モードへ" : "購入モードへ" }}
              </button>
            </b-dropdown-item>
            <NuxtLink
              :to="user_type === 'BUYER' ? '/buyer/account' : '/seller/account'"
              class="item-link"
            >
              <b-dropdown-item> アカウント </b-dropdown-item>
            </NuxtLink>
            <NuxtLink
              :to="
                user_type === 'BUYER'
                  ? '/buyer/chat/thread/list'
                  : '/seller/chat/thread/list'
              "
              class="item-link flex items-center"
            >
              <b-dropdown-item> メッセージ </b-dropdown-item>
              <div
                class="amount-notification flex justify-center"
                v-if="count_unread_message > 0"
              >
                {{ count_unread_message }}
              </div>
            </NuxtLink>
            <NuxtLink
              to="/buyer/service/favorite"
              class="item-link"
              v-if="user_type === 'BUYER'"
            >
              <b-dropdown-item> お気に入り </b-dropdown-item>
            </NuxtLink>
            <NuxtLink to="/account/settings" class="item-link">
              <b-dropdown-item> 設定 </b-dropdown-item>
            </NuxtLink>
          </div>
          <b-dropdown-item class="btn-logout">
            <button
              class="btn-logout-text flex justify-end w-full mb-2"
              v-on:click="logoutUser()"
            >
              <img src="@/assets/images/logout1.png" />
            </button>
          </b-dropdown-item>
        </div>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { buyerStore } from "@/store/buyer";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import Cookies from "js-cookie";
import { useToast } from "vue-toastification";
import { Message } from "@/utils/message";

export default {
  name: "HeaderManageTopPage",
  setup() {
    const storeBuyer = buyerStore();
    const storeSeller = sellerStore();
    const toast = useToast();
    return {
      storeBuyer,
      storeSeller,
      toast,
    };
  },
  data() {
    return {
      urlImg: null,
      user_type: null,
      account_id: null,
      account_name: "",
      message: Message.SWITCH_ACCOUNT,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      count_unread_message: 0,
    };
  },
  computed: {
    ...mapState(buyerStore, ["dataAccountBuyer", "success"]),
    ...mapState(sellerStore, ["dataAccount", "success"]),
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }
    if (this.user_type === "SELLER") {
      this.storeSeller.getAccount(this.account_id);
    } else if (this.user_type === "BUYER") {
      this.storeBuyer.getAccount(this.account_id);
    }
  },
  watch: {
    dataAccount() {
      if (this.dataAccount.sellers !== null) {
        this.urlImg = this.dataAccount.sellers.profile_image_url_sell;
        this.account_name = this.dataAccount.sellers.account_name;
        this.count_unread_message = this.dataAccount.count_unread_message;
      } else if (!this.dataAccount.buyers && this.dataAccount.buyers !== null) {
        this.urlImg = this.dataAccount.buyers.profile_image_url_buy;
        this.account_name = this.dataAccount.buyers.account_name;
        this.count_unread_message = this.dataAccount.count_unread_message;
      }
    },

    dataAccountBuyer() {
      if (this.dataAccountBuyer.buyers !== null) {
        this.urlImg = this.dataAccountBuyer.buyers.profile_image_url_buy;
        this.account_name = this.dataAccountBuyer.buyers.account_name;
      }
    },
  },
  props: {
    // count_unread_message: {
    //   type: String,
    //   default() {
    //     return "0";
    //   },
    // },
  },
  methods: {
    logoutUser() {
      Cookies.remove("token_user");
      localStorage.removeItem("token_user");
      Cookies.remove("account_id");
      localStorage.removeItem("account_id");
      localStorage.removeItem("type");
      Cookies.remove("type");
      this.$router.push("/login");
    },

    switchAccount() {
      const href = window.location.pathname;
      let rememberLogin = localStorage.getItem("rememberLogin");
      if (rememberLogin === "true") {
        this.account_id = localStorage.getItem("account_id");
        this.user_type = localStorage.getItem("type");
      } else {
        this.account_id = Cookies.get("account_id");
        this.user_type = Cookies.get("type");
      }

      if (this.user_type === "BUYER") {
        if (rememberLogin === "true") {
          localStorage.setItem("type", "SELLER");
        } else {
          Cookies.set("type", "SELLER");
        }
        this.storeSeller.getAccount(this.account_id);
        if (href == "/") {
          window.location.reload();
        } else {
          this.$router.push("/seller/account");
        }
      } else if (this.user_type === "SELLER") {
        if (rememberLogin === "true") {
          localStorage.setItem("type", "BUYER");
        } else {
          Cookies.set("type", "BUYER");
        }
        this.storeBuyer.getAccount(this.account_id);
        if (href == "/") {
          window.location.reload();
        } else {
          this.$router.push("/buyer/account");
        }
      }
    },
  },
};
</script>

<style lang="scss">
.header-manage {
  height: 80px;
  width: 100%;
  background: $white;
  &-right {
    &-username {
      color: #5e5c5c;
      font-size: 1rem;
      font-weight: 600;
      margin-right: 20px;
    }
    &-avatar {
      cursor: pointer;
      border: none;
      // background: #5e5c5c;
      border-radius: 50px;
      width: 50px;
      height: 50px;
      object-fit: cover;
      background-position: center;
      background-repeat: no-repeat;
      .btn-secondary {
        border-radius: 50px;
        background: unset !important;
      }
      .list-drowpdown {
        font-size: 14px;
        width: 250px;
        height: 300px;
        .dropdown-item {
          &:hover {
            background: none !important;
            color: $orange;
          }
        }
        .button-top {
          background: #f79158 !important;
          border-radius: 2px;
          opacity: 1;
          border: none;
          color: #fff;
          padding: 4px 15px;
        }
        .item-link {
          color: #7e7d7d !important;
          text-decoration: none;
          .amount-notification {
            background: #e79c3a 0% 0% no-repeat padding-box;
            border-radius: 4px;
            opacity: 1;
            color: #fff;
            height: 20px;
            width: 20px;
            margin-left: 10px;
            font-size: 14px;
          }
        }
        .btn-logout {
          width: 100%;
          &-text {
            border: unset;
            background: unset;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
