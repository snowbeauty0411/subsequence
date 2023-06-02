<template>
  <div class="header-manage flex justify-between items-center">
    <SDIcon
      icon="list"
      sdClass="flex items-center menu-sp"
      v-on:click="toggleSidebar"
    />

    <!-- <div class="sidebar-sp" :class="{ active: isActive }">
      <div class="backdrop" v-on:click="toggleSidebar" />
      <div class="sidebar-sp-menu">
        <div class="flex">
          <Nuxt-link
            to="/"
          >
            <div class="logo-sidebar-btn">
              <img src="@/assets/images/subsQ_logo3.svg" class="img-footer" />
            </div>
          </Nuxt-link>

          <div class="close-sidebar-btn" v-on:click="toggleSidebar">
            <SDIcon icon="x" />
          </div>
        </div>
        <div ref="sidebarScroll" class="sidebar-scroll">
          <Nuxt-link
            :to="
              user_type === 'BUYER' ? '/buyer/dashboard' : '/seller/dashboard'
            "
          >
            <div class="sidebar-sp-items" v-on:click="toggleSidebar">
              ダッシュボード
            </div>
          </Nuxt-link>
          <Nuxt-link
            :to="user_type === 'BUYER' ? '/buyer/account' : '/seller/account'"
          >
            <div class="sidebar-sp-items" v-on:click="toggleSidebar">
              アカウント管理
            </div>
          </Nuxt-link>
          <Nuxt-link
            class="flex items-center"
            :to="
              user_type === 'BUYER'
                ? '/buyer/chat/thread/list'
                : '/seller/chat/thread/list'
            "
          >
            <div
              class="sidebar-sp-items sidebar-sp-items-chat"
              v-on:click="toggleSidebar"
            >
              メッセージボックス
            </div>
            <div
              class="amount-notification flex items-center justify-center"
              v-if="count_unread_message > 0"
            >
              {{ count_unread_message }}
            </div>
          </Nuxt-link>
          <Nuxt-link
            :to="
              user_type === 'BUYER'
                ? '/buyer/service/management'
                : '/seller/service/management'
            "
          >
            <div class="sidebar-sp-items" v-on:click="toggleSidebar">
              サービス管理
            </div>
          </Nuxt-link>
          <Nuxt-link to="/seller/transfer" v-if="user_type === 'SELLER'">
            <div class="sidebar-sp-items" v-on:click="toggleSidebar">売上振込申請</div>
          </Nuxt-link>
          <Nuxt-link to="/account/settings">
            <div class="sidebar-sp-items" v-on:click="toggleSidebar">設定</div>
          </Nuxt-link>
        </div>
        <div class="menu-sidebar-logout flex-column">
          <b-button class="logout-btn" v-on:click="logoutUser()"
            >ログアウト
          </b-button>
        </div>
      </div>
    </div> -->
    <div class="header-manage__spMenu" :class="{ active: isActive }">
      <div class="backdrop" v-on:click="closeAllSideBar" />
      <MenuSP :class="{ active: isActive }" @closeSideBar="closeAllSideBar"  :isMember="isMember" />
    </div>
    <div class="header-manage-right flex items-center">
      <div class="header-manage-right-username">{{ account_name }}</div>
      <b-dropdown
        no-caret
        class="header-manage-right-avatar"
        id="drowpdown-user"
        right
        :style="'background-image: url(' + urlImg + ')'"
      >
        <div class="list-drowpdown flex flex-col justify-between">
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
              class="item-link flex"
            >
              <b-dropdown-item> メッセージ </b-dropdown-item>
              <div
                class="amount-notification flex items-center justify-center"
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
import SDIcon from "@/components/SDIcon";
import MenuSP from "@/components/SDMenuSP";
import { buyerStore } from "@/store/buyer";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import avatarDefault from "@/assets/images/avatar.png";
import Cookies from "js-cookie";
import { Message } from "@/utils/message";
import { useToast } from "vue-toastification";

export default {
  name: "HeaderManage",
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
  components: {
    SDIcon,
    MenuSP,
  },
  data() {
    return {
      urlImg: null,
      user_type: null,
      account_id: null,
      count_unread_message: 0,
      account_name: "",
      avatarDefault,
      isActive: false,
      message: Message.SWITCH_ACCOUNT,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      isMember: false
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
      this.isMember = true;
    } else if (this.user_type === "BUYER") {
      this.storeBuyer.getAccount(this.account_id);
      this.isMember = true;
    }
  },
  watch: {
    dataAccount() {
      if (this.dataAccount.sellers !== null) {
        this.urlImg = this.dataAccount.sellers.profile_image_url_sell;
        this.account_name = this.dataAccount.sellers.account_name;
      } else if (!this.dataAccount.buyers && this.dataAccount.buyers !== null) {
        this.urlImg = this.dataAccount.buyers.profile_image_url_buy;
        this.account_name = this.dataAccount.buyers.account_name;
      }
      this.count_unread_message = this.dataAccount.count_unread_message;
    },
    dataAccountBuyer() {
      if (this.dataAccountBuyer.buyers !== null) {
        this.urlImg = this.dataAccountBuyer.buyers.profile_image_url_buy;
        this.account_name = this.dataAccountBuyer.buyers.account_name;
      }
      this.count_unread_message = this.dataAccountBuyer.count_unread_message;
    },
  },
  props: {
    username: {
      type: String,
      default() {
        return "";
      },
    },
    amountNotification: {
      type: String,
      default() {
        return "";
      },
    },
  },
  methods: {
    closeAllSideBar() {
      this.isActive = false;
      // this.isSearchActive = false;
    },
    logoutUser() {
      Cookies.remove("token_user");
      localStorage.removeItem("token_user");
      Cookies.remove("account_id");
      localStorage.removeItem("account_id");
      localStorage.removeItem("type");
      localStorage.removeItem("rememberLogin");
      Cookies.remove("type");
      this.$router.push("/login");
    },

    toggleSidebar() {
      this.isActive = !this.isActive;
    },

    switchAccount() {
      let rememberLogin = localStorage.getItem("rememberLogin");

      if (this.user_type === "BUYER") {
        if (rememberLogin === "true") {
          localStorage.setItem("type", "SELLER");
          this.user_type = localStorage.getItem("type");
        } else {
          Cookies.set("type", "SELLER");
          this.user_type = Cookies.get("type");
        }
        this.toast.success(this.message.seller, this.optionToast);
        this.$router.push("/seller/account");
      } else if (this.user_type === "SELLER") {
        if (rememberLogin === "true") {
          localStorage.setItem("type", "BUYER");
          this.user_type = localStorage.getItem("type");
        } else {
          Cookies.set("type", "BUYER");
          this.user_type = Cookies.get("type");
        }
        this.toast.success(this.message.buyer, this.optionToast);
        this.$router.push("/buyer/account");
      }
    },
  },
};
</script>

<style lang="scss">
.header-manage {
  height: 80px;
  width: 100%;
  background: #faf9f3;
  padding: 0 70px;
  position: relative;
  @include screen(1280) {
    padding: 0 20px;
  }
  &__spMenu {
    display: none;
    @include screen(01023) {
      display: block;
    }
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateX(100%);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(5px);
      background-color: #0000008f;
      z-index: 1031;
    }
    .sdSidebar {
      overflow-y: scroll;
      position: fixed;
      transform: translateX(-100%);
      top: 0;
      left: 0;
      bottom: 0;
      height: 100vh;
      transition: all 0.5s;
      z-index: 1031;
      display: flex;
      flex-flow: column;
      flex-shrink: 1;
      width: 350px;
      //background: $white;
      //max-height: unset;
      //min-height: unset;
    }
    &.active {
      .sdSidebar {
        &.active {
          transform: translateX(0%);
        }
      }
      .backdrop {
        transform: translateX(0%);
      }
    }
  }
  &-right {
    margin-left: auto;
    &-username {
      color: #5e5c5c;
      font-size: 1rem;
      font-weight: 600;
      margin-right: 20px;
    }
    &-avatar {
      cursor: pointer;
      border: none;
      background: #5e5c5c;
      border-radius: 50px;
      width: 50px;
      height: 50px;
      background-size: cover;
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
          color: #7e7d7d;
          text-decoration: none;
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
  .menu-sp {
    font-size: 30px;
    display: none;
    @include screen(1280) {
      display: block;
    }
  }
  .sidebar-sp {
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateX(100%);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(5px);
      background-color: #0000008f;
      z-index: 1031;
    }
    &-menu {
      position: fixed;
      transform: translateX(-100%);
      top: 0;
      left: 0;
      bottom: 0;
      height: 100vh;
      border-radius: 0 50px 0 0;
      padding: 60px 40px 0px 40px;
      background-image: linear-gradient(
        #fd8857,
        #fd8859,
        #fe9078,
        #fe958b,
        #ff9792
      );
      transition: all 0.5s;
      z-index: 1031;
      display: flex;
      flex-flow: column;
      flex-shrink: 1;
      width: 300px;
      .close-sidebar-btn {
        cursor: pointer;
        font-size: 28px;
        color: #fff;
        position: absolute;
        top: 20px;
        right: 25px;
      }
      .logo-sidebar-btn {
        cursor: pointer;
        font-size: 28px;
        color: #fff;
        position: absolute;
        top: 20px;
        width: 100px;
      }
    }

    .menu-sidebar-logout {
      width: 100%;
      height: 110px;
      border-top: 1px solid $white;
      display: flex;
      justify-content: center;
      align-items: center;
      .logout-btn {
        padding: 10px;
        font-size: 18px;
        cursor: pointer;
        border-radius: 10px;
        color: $white;
        border-color: $white;
      }
    }
    &-items {
      width: 100%;
      padding: 15px 0;
      color: $white;
      font-weight: 600;
      &:not(:first-child) {
        border-top: 1px solid $orange;
      }
    }
    &.active {
      .sidebar-sp-menu {
        transform: translateX(0%);
      }
      .backdrop {
        transform: translateX(0%);
      }
    }
  }
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
</style>
