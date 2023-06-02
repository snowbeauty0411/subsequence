<template>
  <div class="sdSidebar"  :class="{ sdSidebarMember: isMember }">
    <button class="sdSidebar-close" @click="closeAllSideBar">
      <BootstrapIcon
        icon="x"
        size="2x"
        class="sdSidebar-icon-category absolute pt-1"
      />
    </button>
    <div class="sdSidebar-account" v-if="!isMember">
      <Nuxt-link to="/signup">
        <div>新規登録</div>
      </Nuxt-link>
      <Nuxt-link to="/login">
        <div>ログイン</div>
      </Nuxt-link>
    </div>
    <div class="sdSidebar-account" v-else>
      <div class="sdSidebar-accountInfo">
        <div class="avatar">
          <img src="https://dummyimage.com/60x60/9e9e9e/ffffff" alt="" width="60">
        </div>
        <h4>
          Test User
        </h4>
      </div>
      <button class="sdSidebar-accountSwitchRole" v-on:click="switchAccount()">
          <img src="@/assets/images/switchWhite.svg" alt="switch_ico" width="40">
          {{ user_type === "BUYER" ? "出品モードへ切り替え" : "購入モードへ切り替え" }}
      </button>
      <div class="sdSidebar-accountNav">
        <Nuxt-link :to="user_type === 'BUYER' ? '/buyer/dashboard' : '/seller/dashboard'">
          <div>ダッシュボード</div>
        </Nuxt-link>
        <Nuxt-link :to="user_type === 'BUYER' ? '/buyer/account' : '/seller/account'">
          <div>アカウント管理</div>
        </Nuxt-link>
        <Nuxt-link 
          :to="
            user_type === 'BUYER'
              ? '/buyer/chat/thread/list'
              : '/seller/chat/thread/list'
          "
        >
          <div>メッセージボックス</div>
        </Nuxt-link>
        <Nuxt-link 
        :to="
          user_type === 'BUYER'
            ? '/buyer/service/management'
            : '/seller/service/management'
        "
        >
          <div>サービス管理</div>
        </Nuxt-link>
        <Nuxt-link to="/account/settings">
          <div>設定</div>
        </Nuxt-link>
      </div>
      <div class="sdSidebar-accountLogOut">
        <button
          v-on:click="logoutUser()"
        >
          <img src="@/assets/images/logout2.png" />
            </button>
      </div>
    </div>
  </div>
</template>
<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { SearchStore } from "@/store/search";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import { Message } from "@/utils/message";
import Cookies from "js-cookie";
export default {
  name: "MenuSP",
  props:{
    isMember: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = SearchStore();
    const toast = useToast();
    return {
      store,
      toast,
    };
  },
  created() {
    this.store.getListCategory();
    this.store.getListArea();
    let rememberLogin = localStorage.getItem("rememberLogin");
    let valueToken = null;
    if(rememberLogin === 'true') {
      valueToken = localStorage.getItem("token_user");
      this.user_type = localStorage.getItem("type");
    } else {
      valueToken = Cookies.get("token_user");
      this.user_type = Cookies.get("type");
    }

  },
  computed: {
    ...mapState(SearchStore, [
      "success",
      "message",
      "listCategory",
      "error",
      "listArea",
    ]),
  
  },
  components: { BootstrapIcon },
  watch: {
    listCategory() {
      this.searchCategory = this.listCategory;
    },

    listArea() {
      this.dataArea = this.listArea;
    }
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
    closeAllSideBar(){
      this.$emit('closeSideBar')
    },
    searchKeyword() {
      if (this.keyword !== null && this.keyword.length > 0) {
        const dataForm = {
          page: 1,
          keyword: this.keyword,
          sort: 0,
        };
        this.store.getListCategoryByKeyword(dataForm);
        this.$router.push(`/search?keyword=${this.keyword}`);
        this.keyword = null;
        window.scrollTo(0, 0);
      } else {
        this.messages = this.messageSearch.keyword;
        this.toast.error(this.messages, this.optionToast);
        this.messages = "";
      }
    },

    searchKeyword1() {
      if (this.keyword !== null && this.keyword.length > 0) {
        const dataForm = {
          page: 1,
          keyword: this.keyword,
          sort: 0,
        };
        this.store.getListCategoryByKeyword(dataForm);
        this.$router.push(`/search?keyword=${this.keyword}`);
        this.keyword = null;
        window.scrollTo(0, 0);
      } else {
        this.messages = this.messageSearch.keyword;
        this.toast.error(this.messages, this.optionToast);
        this.messages = "";
      }
    },

    switchAccount() {
      console.log('click')
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

    // searchArea(keyword) {
    //   const dataForm = {
    //     page: 1,
    //     area: keyword,
    //     sort: 0,
    //   };
    //   this.store.getListCategoryByArea(dataForm);
    //   this.$router.push(`/search?area=${keyword}`);
    //   window.scrollTo(0, 0);
    // },
  },
  data() {
    return {
      keyword: null,
      searchCategory: [],
      searchFromArea: [
        { name: "北海道" },
        { name: "東北" },
        { name: "関東" },
        { name: "中部" },
        { name: "関西" },
        { name: "中国" },
        { name: "四国" },
        { name: "九州" },
      ],
      messages: null,
      messageSearch: Message.SEARCH,
      dataArea: [],
      user_type: null
    };
  },
};
</script>
<style lang="scss" scoped>
.sdSidebar {
  width: 20%;
  min-height: calc(100% - 359px);
  max-height: calc(100% - 359px);
  background: #fff;
  color: #5e5c5c;
  padding: 3rem;
  @include screen(1280) {
    width: 100%!important;
    height: 100vh;
    background-image: linear-gradient(to bottom, #fd8857, #ff9792);
    color: #fff;
    padding: 5rem 1rem 3rem;
    max-height: unset;
    &Member {
      padding: 1.5rem 1rem 3rem;
      .sdSidebar-account{
        &Info {
          margin-bottom: 25px;
        }
        &Nav {
          height: 400px;
          max-height: 60vh;
          overflow-y: scroll;
          a {
            padding-left: 30px;
          }
        }
        &SwitchRole {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        &LogOut {
          margin-top: 20px;
          padding-left: 30px;
        }
      }
    }
    
  }
  &-close {
    display: none;
    @include screen(1280) {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &-account {
    //display: none;
    @include screen(1024) {
      //display: block;
    }
    a {
      display: block;
      padding: 10px 5px;
      margin-bottom: 10px;
      border-radius: 4px;
      background-color: #ffffff1a;
    }
  }
  &-accountInfo {
    display: flex;
    align-items: center;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    h4 {
      margin-left: 15px;
      font-size: 20px;
    }
  }
}
</style>
