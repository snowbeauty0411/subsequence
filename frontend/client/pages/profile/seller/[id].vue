<template>
  <NuxtLayout name="toppage"
    ><div class="profile-page flex flex-col">
      <SDPreLoad :preload="preload" />
      <div class="profile-page-header flex justify-between">
        <div class="header-left flex items-center">
          <div class="header-left-avatar">
            <img
              :src="info.avatar !== null ? info.avatar : avatarDefault"
              alt=""
            />
          </div>
          <div class="header-left-info">
            <div class="header-left-info-top my-2">
              {{ info.account_name }}
            </div>
            <div class="header-left-info-bottom my-2 flex">
              <div>{{ classification_id }}</div>
              <div class="mx-4">{{ statusIdentity }}</div>
            </div>
          </div>
        </div>
        <div class="header-right">
          <div class="header-right-top">
            <a :href="info.official">Official site</a>
          </div>
          <div class="header-right-bottom flex justify-center w-full">
            <a :href="`https://www.facebook.com/${info.fb}`" class="mx-2"
              ><img src="@/assets/images/iconFacebook.png"
            /></a>
            <a :href="`https://www.instagram.com/${info.insta}`" class="mx-2"
              ><img src="@/assets/images/iconInsta.png"
            /></a>
            <a :href="`https://twitter.com/${info.twitter}`" class="mx-2"
              ><img src="@/assets/images/iconTwitter.png"
            /></a>
          </div>
        </div>
      </div>
      <div
        class="profile-page-mail flex items-center"
        v-on:click="createThreadChat()"
        v-if="account_id != $route.params.id && user_type != 'SELLER'"
      >
        <BootstrapIcon icon="envelope" size="sm" class="mx-2" /><span
          >お問い合わせ</span
        >
      </div>
      <div class="profile-page-description" v-if="info.profile_text_sell != ''">
        {{ info.profile_text_sell }}
      </div>
      <div class="profile-page-list" v-if="totalService > 0">
        <div class="profile-page-list-header flex items-center w-full">
          <div class="amount">{{ totalService }}</div>
          <div class="text-name">出品サービス</div>
        </div>
        <div class="profile-page-list-content my-3">
          <b-container fluid class="g-0">
            <b-row>
              <b-col lg="4" sm="6" v-for="item in listService" :key="item.id">
                <div class="toppage-featured-list-item mb-[30px]">
                  <SDServiceCard
                    :idService="item.id"
                    :id="item.hash_id"
                    :name="item.name"
                    :imgUrl="item.images[0]"
                    :area="item.area ? item.area : '-'"
                    :caption="item.service_content"
                    :price="item.price"
                    :star="item.avg_reviews"
                    :tags="item.tags"
                    :isLike="item.is_favorite === 1 ? 1 : 0"
                    :cycle="item.cycle"
                  /></div
              ></b-col>
              <div class="flex justify-center mt-[50px]">
                <SDPagination
                  :totalpage="totalPage"
                  :currentPage="currentPageService"
                  v-on:update-page="updatePage"
                />
              </div>
            </b-row>
          </b-container>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import avatarDefault from "@/assets/images/ellipse.png";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import SDServiceCard from "@/components/SDServiceCard";
import { ProfileStore } from "@/store/profile";
import { mapState } from "pinia";
import Cookies from "js-cookie";
import { ChatStore } from "@/store/chat/index.ts";
import { useToast } from "vue-toastification";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  data() {
    return {
      avatarDefault,
      account_id: null,
      listService: [],
      user_type: "",
      detailProfile: {},
      statusIdentity: null,
      info: {
        official: "",
        fb: "",
        insta: "",
        twitter: "",
        avatar: null,
        profile_text_sell: "",
        account_name: "",
      },
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
      classification_id: "",
      preload: true,
      totalService: 0,
      totalPage: 0,
      currentPageService: 1,
      token: undefined
    };
  },
  setup() {
    const store = ProfileStore();
    const chatStore = ChatStore();
    const toast = useToast();
    return {
      chatStore,
      toast,
      store,
    };
  },
  created() {
    this.token = Cookies.get("token_user");
    const seller_id = this.$route.params.id;
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }
    const request = {
      seller_id: seller_id,
      is_draft: 0,
      sort_type: 2,
      per_page: 6,
      page: this.currentPageService,
    };

    if (this.token === undefined) {
      this.store.getAllServiceSeller(request);
      this.store.getAccountSellerNotLogin(seller_id);
    } else {
      this.store.getServiceCreating(request);
      this.store.getAccountSeller(seller_id);
    }
  },
  computed: {
    ...mapState(ProfileStore, [
      "success",
      "message",
      "listServiceBySeller",
      "detailProfileSeller",
      "error",
    ]),
    ...mapState(ChatStore, ["idThreadChat", "success", "message", "error"]),
  },
  watch: {
    listServiceBySeller() {
      if (this.listServiceBySeller) {
        this.preload = true;
        this.listService = this.listServiceBySeller.data;
        this.totalService = this.listServiceBySeller.total;
        this.totalPage = this.listServiceBySeller.last_page;
        this.preload = false;
      }
    },

    detailProfileSeller() {
      if (this.detailProfileSeller) {
        this.preload = true;
        this.detailProfile = this.detailProfileSeller;
        if (this.detailProfile.classification_id != null) {
          if (this.detailProfile.classification_id == 1) {
            this.classification_id = "個人";
          } else if (this.detailProfile.classification_id == 2) {
            this.classification_id = "法人";
          } else {
            this.classification_id = "-";
          }
        } else {
          this.classification_id = "-";
        }
        this.info.official = this.detailProfile.sellers.url_official;
        this.info.fb = this.detailProfile.sellers.url_facebook;
        this.info.insta = this.detailProfile.sellers.url_instagram;
        this.info.twitter = this.detailProfile.sellers.url_twitter;
        this.info.profile_text_sell =
          this.detailProfile.sellers.profile_text_sell;
        this.info.account_name = this.detailProfile.sellers.account_name;

        if (this.detailProfile.sellers.profile_image_url_sell) {
          this.info.avatar = this.detailProfile.sellers.profile_image_url_sell;
        }
        if (
          this.detailProfileSeller.identity_verification_status === 1 ||
          this.detailProfileSeller.identity_verification_status === 3
        ) {
          this.statusIdentity = "未確認";
        } else if (
          this.detailProfileSeller.identity_verification_status === 2
        ) {
          this.statusIdentity = "認証待ちです";
        } else if (
          this.detailProfileSeller.identity_verification_status === 4
        ) {
          this.statusIdentity = "本人確認済み";
        }

        this.preload = false;
      }
    },

    success() {
      if (this.chatStore.success === true) {
        if (this.chatStore.idThreadChat === "") {
          this.toast.success(this.chatStore.message, this.optionToast);
          this.chatStore.success = "";
          this.chatStore.message = "";
          if (this.user_type === "BUYER") {
            this.$router.push({
              path: `/buyer/chat/thread/list`,
            });
          } else {
            this.$router.push({
              path: `/seller/chat/thread/list`,
            });
          }
        } else {
          const idThreadChat = this.chatStore.idThreadChat;
          if (this.user_type === "BUYER") {
            this.$router.push({
              path: `/buyer/chat/thread/${idThreadChat}`,
            });
          } else {
            this.$router.push({
              path: `/seller/chat/thread/${idThreadChat}`,
            });
          }
        }
      }
    },

    error() {
      if (this.chatStore.error === true) {
        this.toast.error(this.chatStore.message, this.optionToast);
        this.chatStore.error = "";
        this.chatStore.message = "";
      }
    },
  },
  methods: {
    createThreadChat() {
      const request = {
        login_type: this.user_type === "BUYER" ? 1 : 2,
        receiver_id: this.$route.params.id,
      };
      this.chatStore.createThreadChat(request);
    },

    updatePage(page) {
      const seller_id = this.$route.params.id;
      this.currentPageService = page;
      const request = {
        seller_id: seller_id,
        is_draft: 0,
        sort_type: 2,
        per_page: 6,
        page: this.currentPageService,
      };

      if (this.account_id !== undefined) {
        this.store.getServiceCreating(request);
      } else {
        this.store.getAllServiceSeller(request);
      }
    },
  },
  components: {
    BootstrapIcon,
    SDServiceCard,
    SDPreLoad,
  },
};
</script>

<style lang="scss" scoped>
.profile-page {
  padding: 50px 100px;
  @include screen(991) {
    padding: 30px;
  }
  &-header {
    @include screen(480) {
      // flex-direction: column !important;
      // justify-content: center !important;
    }
    .header-left {
      &-avatar {
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center;
          @include screen(991) {
            width: 70px;
            height: 70px;
          }
          @include screen(480) {
            width: 40px;
            height: 40px;
          }
        }
      }
      &-info {
        margin-left: 40px;
        color: $gray-800;
        @include screen(480) {
          margin-left: 10px;
        }
        &-top {
          font-size: 30px;
          font-weight: bold;
          @include screen(991) {
            font-size: 20px;
          }
          @include screen(480) {
            font-size: 14px;
          }
        }
        &-bottom {
          font-size: 20px;
          font-weight: bold;
          @include screen(991) {
            font-size: 15px;
          }
          @include screen(480) {
            font-size: 11px;
          }
        }
      }
    }
    .header-right {
      @include screen(480) {
        margin-top: 20px;
        width: fit-content;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
      }
      &-top {
        background: $white;
        box-shadow: 0px 0px 6px #44444333;
        border-radius: 33px;
        opacity: 1;
        padding: 15px 50px;
        color: $gray-800;
        border: unset;
        font-weight: 600;
        @include screen(991) {
          padding: 10px 50px;
        }
        @include screen(480) {
          padding: 7px 15px;
          width: fit-content;
          font-size: 12px;
        }

        a {
          &:hover {
            color: $gray-800;
          }
        }
      }
      &-bottom {
        margin-top: 20px;
        @include screen(991) {
          width: unset !important;
          margin: 10px 20px;
          align-items: center;
        }
        @include screen(480) {
          margin: 10px 0;
          a {
            img {
              width: 10px;
            }
            &:nth-child(2) {
              img {
                width: 15px;
              }
            }
            &:nth-child(3) {
              img {
                width: 15px;
              }
            }
          }
        }
      }
    }
  }
  &-mail {
    color: $orange;
    border: 1px solid $orange;
    width: fit-content;
    padding: 3px 10px;
    cursor: pointer;
    margin-top: 20px;
  }
  &-description {
    margin: 70px 0;
    background: $white;
    box-shadow: 2px 2px 2px #4d4d4d33;
    border-radius: 15px;
    opacity: 1;
    padding: 50px 80px;
    color: $gray-800;
    font-size: 20px;
    font-weight: 500;
    @include screen(767){
      font-size: 14px;
      padding: 35px 30px;
    }
  }

  &-list {
    &-header {
      padding: 20px 0;
      border-bottom: 1px solid #5e5c5c;
      .amount {
        color: #5e5c5c;
        font-size: 30px;
        font-weight: 600;
      }
      .text-name {
        color: #7e7d7d;
        font-size: 16px;
        margin-left: 20px;
        font-weight: 600;
      }
    }
    .service-card {
      margin: unset !important;
      margin-right: 10px !important;
    }
  }
}
</style>