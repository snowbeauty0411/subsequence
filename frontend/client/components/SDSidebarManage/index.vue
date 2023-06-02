<template>
  <div class="sidebar flex flex-col">
    <div class="sidebar-logo flex items-center">
      <NuxtLink to="/">
        <img src="@/assets/images/subsQ_logo2.svg" />
      </NuxtLink>
    </div>
    <div class="sidebar-content w-full flex flex-col justify-between">
      <b-nav class="sidebar-content-nav flex flex-col">
        <NuxtLink
          :to="user_type === 'BUYER' ? '/buyer/dashboard' : '/seller/dashboard'"
          ><b-nav-item class="sidebar-content-nav-item flex items-center"
            >ダッシュボード</b-nav-item
          ></NuxtLink
        >

        <NuxtLink
          :to="user_type === 'BUYER' ? '/buyer/account' : '/seller/account'"
          ><b-nav-item class="sidebar-content-nav-item flex items-center"
            >アカウント管理</b-nav-item
          ></NuxtLink
        >

        <NuxtLink
          :to="
            user_type === 'BUYER'
              ? '/buyer/chat/thread/list'
              : '/seller/chat/thread/list'
          "
          ><b-nav-item class="sidebar-content-nav-item flex items-center"
            >メッセージボックス
            <div v-if="count_unread_message > 0" class="amount-notification">
              {{ count_unread_message }}
            </div>
          </b-nav-item></NuxtLink
        >

        <NuxtLink
          :to="
            user_type === 'BUYER'
              ? '/buyer/service/management'
              : '/seller/service/management'
          "
          ><b-nav-item class="sidebar-content-nav-item flex items-center"
            >サービス管理</b-nav-item
          ></NuxtLink
        >

        <NuxtLink to="/seller/transfer" v-if="user_type === 'SELLER'"
          ><b-nav-item class="sidebar-content-nav-item flex items-center"
            >売上振込申請</b-nav-item
          ></NuxtLink
        >

        <NuxtLink to="/account/settings"
          ><b-nav-item class="sidebar-content-nav-item flex items-center"
            >設定</b-nav-item
          ></NuxtLink
        >

        <!-- <NuxtLink
          :to="
            user_type === 'BUYER'
              ? '/buyer/profile/honnin'
              : '/seller/profile/honnin'
          "
          ><b-nav-item class="sidebar-content-nav-item flex items-center"
            >本人確認</b-nav-item
          ></NuxtLink
        > -->
      </b-nav>
      <div class="sidebar-content-logout w-full mb-5" v-on:click="logoutUser()">
        <img src="@/assets/images/logout2.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { buyerStore } from "@/store/buyer";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import Cookies from "js-cookie";

export default {
  name: "Sidebar",
  data() {
    return {
      account_id: null,
      user_type: null,
      count_unread_message: 0,
    };
  },
  setup() {
    const storeBuyer = buyerStore();
    const storeSeller = sellerStore();
    return {
      storeBuyer,
      storeSeller,
    };
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
  },
  computed: {
    ...mapState(buyerStore, ["dataAccountBuyer", "success"]),
    ...mapState(sellerStore, ["dataAccount", "success"]),
  },
  watch: {
    dataAccount() {
      this.count_unread_message = this.dataAccount.count_unread_message;
    },

    dataAccountBuyer() {
      this.count_unread_message = this.dataAccountBuyer.count_unread_message;
    },
  },
  methods: {
    logoutUser() {
      Cookies.remove("token_user");
      localStorage.removeItem("token_user");
      localStorage.removeItem("account_id");
      localStorage.removeItem("type");
      Cookies.remove("account_id");
      Cookies.remove("type");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  width: 400px;
  @include screen(133601440) {
    width: 300px;
  }
  @include screen(01365) {
    width: 300px;
  }
  background-image: linear-gradient(
    #fd8857,
    #fd8859,
    #fe9078,
    #fe958b,
    #ff9792
  );
  min-height: calc(100% - 359px);
  max-height: calc(100% - 359px);
  &-logo {
    width: calc(100% - 100px);
    height: 100px;
    margin-left: 60px;
    img {
      width: 150px;
    }
  }

  &-content {
    height: 100%;
    width: 100%;
    &-nav {
      margin-top: 100px;
      &-item {
        list-style-type: none;
        height: 60px;
        background: #ffffff1a;
        padding-left: 40px;
        margin-bottom: 5px;
        cursor: pointer;
        a {
          color: #ffffffcc;
          font-weight: 600;
          font-size: 16px;
          opacity: 1;
          text-decoration: none;
          display: flex;
          width: 100%;
          &:hover {
            color: #ffffffcc;
          }
        }
      }
    }
    &-logout {
      padding-left: 60px;
      color: #ffffffcc;
      font-weight: 600;
      font-size: 16px;
      opacity: 1;
      cursor: pointer;
    }
  }
  .amount-notification {
    background: #e79c3a 0% 0% no-repeat padding-box;
    border-radius: 4px;
    opacity: 1;
    color: #fff;
    height: 25px;
    width: 25px;
    margin-left: 10px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
