<template>
  <NuxtLayout name="toppage"
    ><div class="profile-page flex flex-col">
      <SDPreLoad :preload="preload" />
      <div class="profile-page-header flex justify-between mb-[30px]">
        <div class="header-left flex items-center">
          <div class="header-left-avatar">
            <img :src="info.avatar !== null ? info.avatar : avatarDefault" alt="" />
          </div>
          <div class="header-left-info">
            <div class="header-left-info-top my-2">
              {{ info.account_name }}
            </div>
            <div class="header-left-info-bottom my-2 flex">
              <div>
                {{ classification_id }} /
                {{ gender }}
              </div>
              <div class="mx-4">{{ statusIdentity }}</div>
            </div>
          </div>
        </div>
        <div class="header-right">
          <div class="header-right-bottom flex justify-center w-full">
            <a :href="`https://www.facebook.com/${info.fb}`" class="mx-3"
              ><img src="@/assets/images/iconFacebook.png"
            /></a>
            <a :href="`https://www.instagram.com/${info.insta}`" class="mx-3"
              ><img src="@/assets/images/iconInsta.png"
            /></a>
            <a :href="`https://twitter.com/${info.twitter}`" class="mx-3"
              ><img src="@/assets/images/iconTwitter.png"
            /></a>
          </div>
        </div>
      </div>
      <div v-if="preloadList" class="sd-preloads flex justify-center items-center">
        <div class="snippet" data-title=".dot-flashing">
          <div class="stage">
            <div class="dot-flashing"></div>
          </div>
        </div>
      </div>
      <div class="profile-page-list" v-if="totalFavorite > 0">
        <div class="profile-page-list-header flex items-center w-full">
          <div class="amount">{{ totalFavorite }}</div>
          <div class="text-name">お気に入り登録中サービス</div>
        </div>
        <div class="profile-page-list-content my-3">
          <b-container fluid class="g-0">
            <b-row>
              <b-col lg="4" sm="6" v-for="item in listServiceFavorite" :key="item.id">
                <div class="toppage-featured-list-item mb-3">
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
                  v-if="totalPageFavorite > 1"
                  :totalpage="totalPageFavorite"
                  :currentPage="currentPageFavorite"
                  v-on:update-page="updatePageFavorite"
                />
              </div>
            </b-row>
          </b-container>
        </div>
      </div>
      <div class="list-by-comment" v-if="dataComment.length > 0">
        <div class="list-by-comment-header flex items-center w-full">
          <div class="text-name">アカウント名さんが投稿したレビュー</div>
        </div>
        <div
          class="list-comment flex flex-wrap justify-center items-center"
          v-if="totalComment > 0"
        >
          <div
            class="item-comment flex"
            v-for="(item, index) in dataComment"
            :key="index"
          >
            <div class="item-comment-img flex items-start d-sm-none">
              <img :src="item.service.images[0] ? item.service.images[0] : imgDefault" />
            </div>
            <div class="item-comment-content flex flex-col">
              <div class="item-comment-content-top flex justify-between w-full">
                <div class="item-comment-img flex items-start d-sm-block">
                  <img
                    :src="item.service.images[0] ? item.service.images[0] : imgDefault"
                  />
                </div>
                <div class="text-left flex flex-col w-3/4">
                  <div class="flex w-full">
                    <div
                      class="waper-image mr-2"
                      v-for="(image, i) in parseInt(item.rating)"
                      :key="i"
                    >
                      <img
                        src="@/assets/images/star1.png"
                        style="width: unset; height: fit-content"
                      />
                    </div>
                  </div>
                  <div class="text-left-info my-2">
                    {{ item.service.service_content }}
                  </div>
                  <div class="text-left-name">{{ item.service.name }}</div>
                </div>
                <div class="text-right flex flex-col w-1/4">
                  <div>
                    {{
                      item.updated_at === null
                        ? ""
                        : $moment(item.updated_at).format("YYYY-MM-DD HH:mm")
                    }}
                  </div>
                </div>
              </div>
              <div class="item-comment-content-mid my-2">
                {{ item.description }}
              </div>
              <div v-if="item.images.length > 0" class="flex">
                <div
                  class="item-comment-content-bottom flex"
                  v-for="(image, index) in item.images"
                  :key="index"
                >
                  <img :src="image.path" alt="" />
                </div>
              </div>
              <div class="read-more">出品者からの返信を読む</div>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-[50px]">
          <SDPagination
            v-if="totalPageComment > 1"
            :totalpage="totalPageComment"
            :currentPage="current_page"
            v-on:update-page="updatePage"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import avatarDefault from "@/assets/images/ellipse.png";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import SDServiceCard from "@/components/SDServiceCard";
import SDPreLoad from "@/components/SDPreLoad";
import { ProfileStore } from "@/store/profile";
import { mapState } from "pinia";
import imageDefault from "@/assets/images/detail1.png";
import Cookies from "js-cookie";
import SDPagination from "@/components/SDPagination";
import { SearchStore } from "@/store/search";

export default {
  data() {
    return {
      preloadList: false,
      avatarDefault,
      account_id: null,
      listService: [],
      detailProfile: {},
      statusIdentity: null,
      listServiceFavorite: [],
      imageDefault,
      info: {
        avatar: null,
        account_name: "",
        official: "",
        fb: "",
        insta: "",
        twitter: "",
      },
      dataComment: [],
      current_page: 1,
      totalComment: 0,
      totalPageComment: 0,
      preload: true,
      currentPageFavorite: 1,
      totalFavorite: 0,
      totalPageFavorite: 0,
      classification_id: "",
      gender: "",
      buyer_id: "",
    };
  },
  setup() {
    const store = ProfileStore();
    const searchStore = SearchStore();
    return {
      store,
      searchStore,
    };
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.account_id = Cookies.get("account_id");
    }
    if (this.$route.params.id === this.account_id) {
      this.buyer_id = this.account_id;
    } else {
      this.buyer_id = this.$route.params.id;
    }
    this.store.getAccountBuyer(this.buyer_id);
    const request1 = {
      buyer_id: this.buyer_id,
      per_page: 6,
      page: 1,
    };
    this.store.getServiceFavorite(request1);
    const request = {
      buyer_id: this.buyer_id,
      page: this.current_page,
      limit: 5,
    };
    this.store.getListComment(request);
  },
  computed: {
    ...mapState(ProfileStore, [
      "success",
      "message",
      "detailProfileBuyer",
      "error",
      "dataServiceFavorite",
      "listComment",
    ]),
    ...mapState(SearchStore, ["success", "message", "error"]),
  },
  watch: {
    success() {
      if (this.searchStore.success === true) {
        const request1 = {
          buyer_id: this.buyer_id,
          per_page: 6,
          page: 1,
        };
        this.store.getServiceFavorite(request1);
      }
    },

    detailProfileBuyer() {
      if (this.detailProfileBuyer) {
        this.preload = true;
        this.detailProfile = this.detailProfileBuyer;

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

        if (this.detailProfile.buyers.gender != null) {
          if (this.detailProfile.buyers.gender == 1) {
            this.gender = "女性";
          } else if (this.detailProfile.buyers.gender == 2) {
            this.gender = "男性";
          } else {
            this.gender = "-";
          }
        } else {
          this.gender = "-";
        }

        if (
          this.detailProfileBuyer.identity_verification_status === 1 ||
          this.detailProfileBuyer.identity_verification_status === 3
        ) {
          this.statusIdentity = "未確認";
        } else if (this.detailProfileBuyer.identity_verification_status === 2) {
          this.statusIdentity = "認証待ちです";
        } else if (this.detailProfileBuyer.identity_verification_status === 4) {
          this.statusIdentity = "本人確認済み";
        }

        this.info.avatar = this.detailProfileBuyer.buyers.profile_image_url_buy;
        this.info.fb = this.detailProfileBuyer.buyers.url_facebook;
        this.info.official = this.detailProfileBuyer.buyers.url_official;
        this.info.insta = this.detailProfileBuyer.buyers.url_instagram;
        this.info.twitter = this.detailProfileBuyer.buyers.url_twitter;
        this.info.account_name = this.detailProfileBuyer.buyers.account_name;
        this.preload = false;
      }
    },

    dataServiceFavorite() {
      this.preloadList = false;
      if (this.dataServiceFavorite) {
        this.preload = true;
        this.listServiceFavorite = this.dataServiceFavorite.data;
        this.totalFavorite = this.dataServiceFavorite.total;
        this.totalPageFavorite = this.dataServiceFavorite.last_page;
        this.currentPageFavorite = this.dataServiceFavorite.current_page;
        this.preload = false;
      }
    },

    listComment() {
      this.preloadList = false;
      this.preload = true;
      this.dataComment = this.listComment.data;
      this.current_page = this.listComment.current_page;
      this.totalPageComment = this.listComment.last_page;
      this.totalComment = this.listComment.total;
      this.preload = false;
    },
  },
  components: {
    BootstrapIcon,
    SDServiceCard,
    SDPreLoad,
    SDPagination,
  },
  methods: {
    updatePage(page) {
      this.preloadList = true;
      this.current_page = page;
      const request = {
        buyer_id: this.buyer_id,
        page: this.current_page,
        limit: 5,
      };
      this.store.getListComment(request);
    },

    updatePageFavorite(page) {
      this.preloadList = true;
      this.currentPageFavorite = page;
      const request1 = {
        buyer_id: this.buyer_id,
        per_page: 6,
        page: this.currentPageFavorite,
      };
      this.store.getServiceFavorite(request1);
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-page {
  .d-sm-none {
    @include screen(576) {
      display: none;
    }
  }
  .d-sm-block {
    display: none;
    @include screen(576) {
      display: block;
    }
  }
  padding: 50px 100px;
  @include screen(991) {
    padding: 30px;
  }
  &-header {
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
          @include screen(576) {
            width: 50px;
            height: 50px;
            min-width: 50px;
          }
        }
      }
      &-info {
        margin-left: 40px;
        color: $gray-800;
        @include screen(576) {
          margin-left: 15px;
        }
        &-top {
          font-size: 30px;
          font-weight: bold;
          @include screen(991) {
            font-size: 20px;
          }
          @include screen(576) {
            font-size: 16px;
          }
          @include screen(375) {
            font-size: 14px;
          }
        }
        &-bottom {
          font-size: 20px;
          font-weight: bold;
          @include screen(991) {
            font-size: 15px;
          }
          @include screen(576) {
            font-size: 10px;
          }
        }
      }
    }
    .header-right {
      @include screen(480) {
        width: fit-content;
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
        @include screen(576) {
          margin: 10px 0px;
        }
        img {
          max-height: 18px;
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
  .list-by-comment {
    &-header {
      padding: 20px 0;
      border-bottom: 2px solid #5e5c5c;
      .text-name {
        color: #7e7d7d;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .list-comment {
      .item-comment {
        width: 90%;
        margin: 20px 0;
        @include screen(480) {
          width: 100%;
        }
        &-img {
          width: 130px;
          margin-right: 10px;
          img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            max-width: unset;
          }
        }
        &-content {
          width: calc(100% - 130px);
          @include screen(991) {
            width: 100%;
            margin-block: 15px;
          }
          .count-star {
            color: orange;
          }
          .read-more {
            display: none;
            @include screen(576) {
              display: block;
              font-size: 12px;
              font-weight: 700;
              color: #e79c3a;
              margin-top: 10px;
              &:after {
                content: url(/_nuxt/assets/images/down.png);
                margin-left: 5px;
              }
            }
          }
          &-top {
            .text-left {
              img {
                object-fit: cover;
                width: 100px;
              }
              &-info {
                color: $gray-800;
                font-size: 18px;
                font-weight: 600;
              }
              &-name {
                color: $gray-800;
                font-size: 16px;
              }
            }
            .text-right {
              color: $gray-500;
              font-size: 16px;
              width: fit-content;
              min-width: fit-content;
            }
          }
          &-mid {
            color: $gray-500;
            font-size: 16px;
            font-weight: 600;
            @include screen(576) {
              padding-top: 15px;
            }
          }
          &-bottom {
            margin-right: 10px;
            img {
              width: 169px;
              height: 151px;
              object-fit: cover;
              margin-right: 10px;
              @include screen(991) {
                width: 50px;
                height: 40px;
              }
              @include screen(576) {
                width: 110px;
                height: 110px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
