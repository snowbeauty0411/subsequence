<template>
  <div id="page-threadChat">
    <SDPreLoad :preload="preload" />
    <div class="threadChat-search relative">
      <b-form-input
        class="form-input-search"
        placeholder="キーワードから検索"
        v-model="keyword"
        v-on:keyup.enter="searchListThreadChat()"
      ></b-form-input>
      <div class="icon-search absolute">
        <BootstrapIcon icon="search" v-on:click="searchListThreadChat()" />
      </div>
    </div>
    <div
      v-if="preloadList"
      class="sd-preloads flex justify-center items-center"
    >
      <div class="snippet" data-title=".dot-flashing">
        <div class="stage">
          <div class="dot-flashing"></div>
        </div>
      </div>
    </div>
    <div class="threadChat-list" v-if="listThread.length > 0">
      <div
        class="threadChat-list-item flex justify-between"
        v-for="(item, index) in listThread"
        v-bind:key="index"
      >
        <Nuxt-Link
          :to="`${item.id}`"
          class="flex justify-between w-full threadChat-list-link"
        >
          <div class="threadChat-list-item-left flex items-center">
            <div class="item-avatar">
              <img
                :src="
                  item.partner_avatar_url
                    ? item.partner_avatar_url
                    : avatarDefault
                "
                alt=""
              />
            </div>
            <div class="item-name" v-if="item.partner_name !== null">
              {{ item.partner_name }}
            </div>
            <div class="item-name" v-else>Unknowns</div>
          </div>
          <div class="threadChat-list-item-right flex flex-col items-center">
            <div class="item-time" v-if="item.last_message_at">
              {{ $moment(item.last_message_at).format("YYYY/MM/DD HH:mm") }}
            </div>
            <div class="item-amount my-2" v-if="item.message_unread > 0">
              {{ item.message_unread }}
            </div>
          </div>
        </Nuxt-Link>
      </div>
    </div>
    <SDPagination
      :totalpage="totalPage"
      :currentPage="currentPage"
      v-on:update-page="updatePage"
      v-if="totalPage > 1"
    />
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import imgDefault from "@/assets/images/ellipse.png";
import { ChatStore } from "@/store/chat";
import { mapState } from "pinia";
import avatarDefault from "@/assets/images/ellipse.png";
import "moment/locale/ja";
import SDPagination from "@/components/SDPagination";
import SDPreLoad from "@/components/SDPreLoad";
import { sellerStore } from "@/store/seller";
import Cookies from "js-cookie";

export default {
  name: "ListThreadChat",
  setup() {
    const storeSeller = sellerStore();
    const store = ChatStore();
    return {
      store,
      storeSeller,
    };
  },
  components: {
    BootstrapIcon,
    imgDefault,
    SDPagination,
    SDPreLoad,
  },
  data() {
    return {
      preload: true,
      preloadList: false,
      listThread: [],
      partner: {},
      keyword: "",
      login_type: "",
      per_page: 10,
      avatarDefault,
      page: 1,
      totalPage: 1,
      currentPage: 1,
      user_type: null,
      account_id: null,
    };
  },
  scrollToTop: true,

  created() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
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
      this.$router.push({ path: `/seller/account` });
    }
    this.getListThreadChat();
  },
  computed: {
    ...mapState(ChatStore, ["success", "message", "listThreadChat", "error"]),
    ...mapState(sellerStore, ["dataAccount"]),
  },
  watch: {
    listThreadChat() {
      this.preloadList = false;
      this.preload = true;
      this.listThread = this.listThreadChat.data;
      this.partner = this.listThread.partner;
      this.totalPage = this.listThreadChat.last_page;
      this.currentPage = this.listThreadChat.current_page;
      this.preload = false;
    },
  },
  methods: {
    searchListThreadChat() {
      (this.page = 1), this.getListThreadChat();
    },

    getListThreadChat() {
      const dataForm = {
        keyword: this.keyword,
        login_type: 2,
        per_page: this.per_page,
        page: this.page,
      };
      this.store.getListThreadChat(dataForm);
    },

    updatePage(page) {
      this.preloadList = true;
      (this.page = page), this.getListThreadChat();
    },
  },
};
definePageMeta({
  layout: "seller",
});
</script>

<style lang="scss" scoped>
#page-threadChat {
  padding: 30px 100px;
  @include screen(480) {
    padding: 30px 50px;
  }
  .threadChat-search {
    width: 60%;
    @include screen(480) {
      width: 100%;
    }
    .form-input-search {
      width: 100%;
      padding: 15px 25px;
      box-shadow: 0px 3px 6px #00000029 !important;
      border-radius: 8px !important;
      border: none !important;
      opacity: 1;
    }
    .icon-search {
      cursor: pointer;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      svg {
        font-size: 22px;
      }
    }
  }
  .threadChat-list {
    margin: 30px 0 100px 0;
    min-height: 1410px;
    @include screen(480) {
      min-height: 1210px;
    }
    &-item {
      padding: 30px 0;
      border-bottom: 1px solid #c4c4c4;
      cursor: pointer;
      .item-avatar {
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          @include screen(480) {
            width: 60px;
            height: 60px;
          }
        }
      }
      .item-name {
        color: #5e5c5c;
        font-size: 22px;
        font-weight: 600;
        margin: 0 20px;
        @include screen(480) {
          font-size: 18px;
        }
      }
      .item-time {
        color: #5e5c5c;
        font-size: 16px;
        font-weight: 600;
      }
      .item-amount {
        color: #fff;
        background: $orange;
        width: fit-content;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 14px;
      }

      &-right {
        @include screen(480) {
          flex-direction: column;
          align-items: flex-end;
        }
      }
    }
    &-link {
      @include screen(480) {
        flex-direction: column;
      }
    }
  }
}
</style>