<template>
  <NuxtLayout name="buyer">
    <div class="buyer-service flex flex-col">
      <PreLoad :preload="preload" />
      <div class="buyer-service-content">
        <div class="buyer-service-content-title flex items-end">
          <div class="title-main">サービス管理</div>
          <small class="title-sub">Service management</small>
        </div>

        <div class="flex flex-col" v-if="totalSelled > 0">
          <div class="list-by-contract" v-if="totalSelled > 0">
            <div class="list-by-contract-header flex items-center w-full">
              <div class="amount" v-if="listServiceBought.data">
                {{ totalSelled }}
              </div>
              <div class="text-name">契約中のサービス</div>
            </div>
            <div
              v-if="preloadListBought"
              class="sd-preloads flex justify-center items-center"
            >
              <div class="snippet" data-title=".dot-flashing">
                <div class="stage">
                  <div class="dot-flashing"></div>
                </div>
              </div>
            </div>
            <div class="list-by-contract-list" :v-if="totalSelled > 0">
              <b-row>
                <b-col
                  cols="6"
                  lg="3"
                  v-for="(item, index) in listServiceBought.data"
                  :key="index"
                >
                  <div class="list-by-contract-list-item flex flex-col">
                    <Nuxt-link
                      :to="`/buyer/service/service-manage/${item.hash_id}?seller_id=${item.seller_id}`"
                    >
                      <div
                        class="item-img"
                        :style="'background-image: url(' + item.images[0] + ')'"
                      ></div>
                      <div class="item-text flex flex-col">
                        <div class="item-text-top">{{ item.name }}</div>
                        <div class="item-text-bottom">
                          {{ item.categories.name }}
                        </div>
                      </div>
                    </Nuxt-link>
                  </div>
                </b-col>
              </b-row>
            </div>
            <SDPagination
              v-if="totalPageBought > 1"
              :totalpage="totalPageBought"
              :currentPage="currentPageBought"
              v-on:update-page="updatePageBought"
            />
          </div>
          <!-- <div class="list-by-contract mt-[50px]" v-else>
            <div class="list-by-contract-header flex items-center">
              <div class="amount text-3xl font-semibold">
                {{ totalSelled }}
              </div>
              <div class="text-name text-base font-semibold">
                契約中のサービス
              </div>
            </div>
            <div
              class="
                list-by-contract-list
                w-full
                flex
                justify-center
                font-semibold
                text-yellow-500
              "
            >
              サービスがありません
            </div>
          </div> -->

          <div class="list-by-favorites" v-if="totalFavorite > 0">
            <div class="list-by-favorites-header flex items-center w-full">
              <div class="amount">
                {{ totalFavorite }}
              </div>
              <div class="text-name">お気に入り登録中のサービス</div>
            </div>
            <div
              v-if="preloadListFavorite"
              class="sd-preloads flex justify-center items-center"
            >
              <div class="snippet" data-title=".dot-flashing">
                <div class="stage">
                  <div class="dot-flashing"></div>
                </div>
              </div>
            </div>
            <div class="list-by-favorites-list" v-if="totalFavorite > 0">
              <b-row
                ><b-col
                  cols="6"
                  lg="3"
                  v-for="(item, index) in listServiceFavorite.data"
                  :key="index"
                >
                  <div class="list-by-favorites-list-item flex flex-col">
                    <Nuxt-link :to="`/service/detail/${item.hash_id}`">
                      <div
                        class="item-img"
                        :style="'background-image: url(' + item.images[0] + ')'"
                      ></div>
                    </Nuxt-link>
                    <div class="item-text flex flex-col">
                      <div class="item-text-top">{{ item.name }}</div>
                      <div class="item-text-bottom">
                        {{ item.categories.name }}
                      </div>
                    </div>
                  </div>
                </b-col></b-row
              >
            </div>
            <SDPagination
              v-if="totalPageFavorite > 1"
              :totalpage="totalPageFavorite"
              :currentPage="currentPageFavorite"
              v-on:update-page="updatePageFavorite"
            />
          </div>
          <!-- <div class="list-by-favorites" v-else>
            <div class="list-by-favorites-header flex items-center">
              <div class="amount text-3xl font-semibold">
                {{ totalFavorite }}
              </div>
              <div class="text-name text-base font-semibold">
                お気に入り登録中のサービス
              </div>
            </div>
            <div
              class="
                list-by-favorites-list
                w-full
                flex
                justify-center
                font-semibold
                text-yellow-500
              "
            >
              サービスがありません
            </div>
          </div> -->

          <div class="list-by-stop" v-if="totalStop > 0">
            <div class="list-by-stop-header flex items-center w-full">
              <div class="amount">
                {{ totalStop }}
              </div>
              <div class="text-name">解約済みのサービス</div>
            </div>
            <div
              v-if="preloadListStop"
              class="sd-preloads flex justify-center items-center"
            >
              <div class="snippet" data-title=".dot-flashing">
                <div class="stage">
                  <div class="dot-flashing"></div>
                </div>
              </div>
            </div>
            <div class="list-by-stop-list" v-if="totalStop > 0">
              <b-row>
                <b-col
                  cols="6"
                  lg="3"
                  v-for="(item, index) in listStop"
                  :key="index"
                >
                  <div class="list-by-stop-list-item flex flex-col">
                    <Nuxt-link :to="`/buyer/service/service-manage/${item.hash_id}?seller_id=${item.seller_id}&is_stop=true`">
                      <div
                        class="item-img"
                        :style="'background-image: url(' + item.images[0] + ')'"
                      ></div>
                      <div class="item-text flex flex-col">
                        <div class="item-text-top">{{ item.name }}</div>
                        <div class="item-text-bottom">
                          {{ item.categories.name }}
                        </div>
                      </div>
                    </Nuxt-link>
                  </div>
                </b-col>
              </b-row>
            </div>
            <SDPagination
              v-if="totalPageStop > 1"
              :totalpage="totalPageStop"
              :currentPage="currentPageStop"
              v-on:update-page="updatePageStop"
            />
          </div>
          <!-- <div class="list-by-stop" v-else>
            <div class="list-by-stop-header flex items-center">
              <div class="amount text-3xl font-semibold">
                {{ totalStop }}
              </div>
              <div class="text-name text-base font-semibold">
                お気に入り登録中のサービス
              </div>
            </div>
            <div
              class="
                list-by-stop-list
                w-full
                flex
                justify-center
                font-semibold
                text-yellow-500
              "
            >
              サービスがありません
            </div>
          </div> -->

          <div class="list-by-comment" v-if="listCommentBuyer.length > 0">
            <div class="list-by-comment-header flex items-center w-full">
              <div class="text-name">アカウント名さんが投稿したレビュー</div>
            </div>
            <div
              v-if="preloadListComment"
              class="sd-preloads flex justify-center items-center"
            >
              <div class="snippet" data-title=".dot-flashing">
                <div class="stage">
                  <div class="dot-flashing"></div>
                </div>
              </div>
            </div>
            <div
              class="list-comment flex flex-wrap justify-center items-center"
              v-if="totalComment > 0"
            >
              <div
                class="item-comment flex"
                v-for="(item, index) in listCommentBuyer"
                :key="index"
              >
                <div class="item-comment-img flex items-start">
                  <img
                    :src="
                      item.service.images[0]
                        ? item.service.images[0]
                        : imgDefault
                    "
                  />
                </div>
                <div class="item-comment-content flex flex-col">
                  <div
                    class="item-comment-content-top flex justify-between w-full"
                  >
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
                            : $moment(item.updated_at).format(
                                "YYYY-MM-DD HH:mm"
                              )
                        }}
                      </div>
                      <div class="flex justify-content-end my-3">
                        <SDIcon
                          icon="pencil"
                          class="mr-3 cursor-pointer"
                          v-on:click="editComment(item.service.hash_id)"
                        />
                        <SDIcon
                          icon="trash"
                          class="ml-3 cursor-pointer"
                          v-on:click="deleteComment(item.service.hash_id)"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="item-comment-content-mid my-2">
                    <div
                      v-if="item.description"
                      v-html="replaceText(item.description)"
                    ></div>
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
                </div>
              </div>
            </div>
            <div class="flex justify-center">
              <SDPagination
                v-if="totalComment > 1"
                :totalpage="totalComment"
                :currentPage="currentPage"
                v-on:update-page="updatePage"
              />
            </div>
          </div>
          <!-- <div class="list-by-comment" v-else>
            <div class="list-by-comment-header flex items-center w-full">
              <div class="text-name">アカウント名さんが投稿したレビュー</div>
            </div>
            <div
              class="
                list-comment
                w-full
                flex
                justify-center
                font-semibold
                text-yellow-500
                py-[40px]
              "
            >
              どのサービスにもコメントしていません
            </div>
          </div> -->
        </div>
        <div class="flex flex" v-else>
          <b-container>
            <b-row class="w-full complete-service">
              <b-col cols="12" lg="7" sm="6" class="complete-service-left">
                <div>
                  <p class="complete-service-text text-center">
                    まずは、サブスクのサービスを利用してみましょう！
                  </p>
                </div>
                <div class="flex justify-center">
                  <b-button
                    class="complete-service-confirmation p-3"
                    v-on:click="topPage()"
                  >
                    サービス一覧へ
                  </b-button>
                </div>
              </b-col>
              <b-col
                cols="12"
                lg="5"
                sm="6"
                class="complete-service-right flex items-center justify-center"
              >
                <b-img src="../../assets/images/logo3.png"></b-img>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </div></div
  ></NuxtLayout>
</template>

<script>
import { useToast } from "vue-toastification";
import { buyerStore } from "@/store/buyer";
import { mapState } from "pinia";
import Cookies from "js-cookie";
import PreLoad from "@/components/SDPreLoad";
import imgDefault from "@/assets/images/detail1.png";
import SDPagination from "@/components/SDPagination";

export default {
  name: "PageService",
  setup() {
    const store = buyerStore();
    const toast = useToast();
    return {
      store,
      toast,
    };
  },
  components: {
    PreLoad,
    SDPagination,
  },
  data() {
    return {
      imgDefault,
      dataContract: [
        { id: 1, name: "サービス名", description: "業種" },
        { id: 2, name: "サービス名", description: "業種" },
        { id: 3, name: "サービス名", description: "業種" },
      ],
      account_id: null,
      listServiceBought: [],
      listServiceFavorite: [],
      totalFavorite: 0,
      totalSelled: 0,
      totalComment: 0,
      listCommentBuyer: [],
      preload: true,
      totalPage: null,
      currentPage: 1,
      totalStop: 0,
      listStop: [],
      totalPageBought: null,
      currentPageBought: 1,
      totalPageFavorite: null,
      currentPageFavorite: 1,
      totalPageStop: null,
      currentPageStop: 1,
      preloadListBought: false,
      preloadListFavorite: false,
      preloadListStop: false,
      preloadListComment: false,
    };
  },
  created() {
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.account_id = Cookies.get("account_id");
    }
    const request = {
      buyer_id: this.account_id,
      status: 1,
      per_page: 8,
      page: 1,
    };
    this.store.getServiceBought(request);

    this.store.getServiceFavorite({
      buyer_id: this.account_id,
      per_page: 8,
      page: 1,
    });

    const dataForm = {
      buyer_id: this.account_id,
      limit: 3,
      page: 1,
    };
    this.store.getListComment(dataForm);
    const requestListStop = {
      buyer_id: this.account_id,
      per_page: 8,
    };
    this.store.getServiceStop(requestListStop);
  },
  computed: {
    ...mapState(buyerStore, [
      "success",
      "message",
      "dataServiceBought",
      "dataServiceFavorite",
      "error",
      "listComment",
      "dataServiceStop",
    ]),
  },
  watch: {
    dataServiceBought() {
      this.preloadListBought = false;
      this.preload = true;
      this.listServiceBought = this.dataServiceBought;
      this.totalPageBought = this.dataServiceBought.last_page;
      this.totalSelled = this.dataServiceBought.total;
      this.preload = false;
    },

    dataServiceFavorite() {
      this.preloadListFavorite = false;
      this.preload = true;
      this.listServiceFavorite = this.dataServiceFavorite;
      this.totalPageFavorite = this.dataServiceFavorite.last_page;
      this.totalFavorite = this.dataServiceFavorite.total;
      this.preload = false;
    },

    listComment() {
      this.preloadListComment = false;
      this.preload = true;
      this.listCommentBuyer = this.listComment.data;
      this.totalComment = this.listComment.last_page;
      this.currentPage = this.listComment.current_page;
      this.preload = false;
    },

    dataServiceStop() {
      this.preloadListStop = false;
      this.preload = true;
      this.listStop = this.dataServiceStop.data;
      this.totalStop = this.dataServiceStop.total;
      this.totalPageStop = this.dataServiceStop.last_page;
      this.preload = false;
    },
  },
  methods: {
    replaceText(data) {
      return data.replace(/(?:\r\n|\r|\n)/g, "<br>");
    },

    updatePage(page) {
      this.preloadListComment = true;
      this.currentPage = page;
      const dataForm = {
        buyer_id: this.account_id,
        limit: 3,
        page: this.currentPage,
      };
      this.store.getListComment(dataForm);
    },

    updatePageBought(page) {
      this.preloadListBought = true;
      this.currentPageBought = page;
      this.store.getServiceBought({
        buyer_id: this.account_id,
        per_page: 8,
        page: this.currentPageBought,
        status: 1,
      });
    },

    updatePageFavorite(page) {
      this.preloadListFavorite = true;
      this.currentPageFavorite = page;
      this.store.getServiceFavorite({
        buyer_id: this.account_id,
        per_page: 8,
        page: this.currentPageFavorite,
      });
    },

    updatePageStop(page) {
      this.preloadListStop = true;
      this.currentPageStop = page;
      const requestListStop = {
        buyer_id: this.account_id,
        per_page: 8,
        page: this.currentPageStop,
      };
      this.store.getServiceStop(requestListStop);
    },

    editComment(id) {
      window.scrollTo(0, 0);
      this.$router.push("/buyer/comment/post/" + id);
    },

    deleteComment(id) {
      window.scrollTo(0, 0);
      localStorage.setItem("id_service", id);
      if (localStorage.getItem("id_service")) {
        this.$router.push("/buyer/comment/delete/" + id + "/confirm");
      }
    },

    topPage() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.buyer-service {
  &-content {
    padding: 30px 100px;
    @include screen(480) {
      padding: 30px;
    }
    &-title {
      .title-main {
        font-size: 22px;
        color: #5e5c5c;
        font-weight: 600;
        margin-right: 30px;
        @include screen(480) {
          font-size: 16px;
        }
      }

      .title-sub {
        color: $gray-800;
      }

      .title-description {
        margin-left: 20px;
        font-size: 14px;
        color: #5e5c5c;
        @include screen(480) {
          font-size: 12px;
        }
      }
    }
    .list-by-contract {
      &-header {
        padding: 20px 0;
        border-bottom: 2px solid #5e5c5c;
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
      &-list {
        margin: 50px 0 10px;
        &-item {
          margin-bottom: 30px;
          .item-img {
            width: 100%;
            height: 0;
            object-fit: cover;
            padding-bottom: 100%;
            background: $white;
            overflow: hidden;
            background-position: center center;
            background-size: cover, 60%;
            box-shadow: 2px 2px 2px #4d4d4d33;
            opacity: 1;
            img {
              width: 100%;
            }
          }
          .item-text {
            margin-top: 20px;
            @include screen(480){
              margin-top: 5px;
            }

            &-top {
              margin: 10px 0;
              font-size: 20px;
              color: #5e5c5c;
              font-weight: 600;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
              &:hover {
                color: $orange;
              }
              @include screen(480){
                font-size: 16px;
              }
            }
            &-bottom {
              font-size: 14px;
              color: #5e5c5c;
              font-weight: 600;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
              @include screen(480){
                font-size: 12px;
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
    .list-by-favorites {
      &-header {
        padding: 20px 0;
        border-bottom: 2px solid #5e5c5c;
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
      &-list {
        margin: 50px 0 10px;
        &-item {
          margin-bottom: 30px;
          .item-img {
            width: 100%;
            height: 0;
            object-fit: cover;
            padding-bottom: 100%;
            background: $white;
            overflow: hidden;
            background-position: center center;
            background-size: cover, 60%;
            box-shadow: 2px 2px 2px #4d4d4d33;
            opacity: 1;
            img {
              width: 100%;
            }
          }
          .item-text {
            margin-top: 20px;
            @include screen(480){
              margin-top: 0px;
              margin-bottom: 5px;
            }

            width: 100%;
            
            &-top {
              margin: 10px 0;
              font-size: 20px;
              color: #5e5c5c;
              font-weight: 600;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
              &:hover {
                color: $orange;
              }
              @include screen(480){
                font-size: 16px;
              }
            }
            &-bottom {
              font-size: 14px;
              color: #5e5c5c;
              font-weight: 600;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              @include screen(480){
                font-size: 12px;
                margin-bottom: 5px;
              }
            }
          }
        }
      }
    }
    .list-by-stop {
      &-header {
        padding: 20px 0;
        border-bottom: 2px solid #5e5c5c;
        
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
      &-list {
        margin: 50px 0 10px;
        &-item {
          margin-bottom: 30px;
          .item-img {
            width: 100%;
            height: 0;
            object-fit: cover;
            padding-bottom: 100%;
            background: $white;
            overflow: hidden;
            background-position: center center;
            background-size: cover;
            box-shadow: 2px 2px 2px #4d4d4d33;
            opacity: 1;
            img {
              width: 100%;
            }
          }
          .item-text {
            margin-top: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            @include screen(480){
              margin-top: 5px;
            }
            &-top {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin: 10px 0;
              font-size: 20px;
              color: #5e5c5c;
              font-weight: 600;
              &:hover {
                color: $orange;
              }
              @include screen(480){
                font-size: 16px;
              }
            }
            &-bottom {
              font-size: 16px;
              color: #5e5c5c;
              font-weight: 600;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              @include screen(480){
                font-size: 12px;
                margin-bottom: 10px;
              }
            }
          }
        }
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
          @include screen(991) {
            flex-direction: column !important;
          }
          &-img {
            width: 130px;
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
            }
            .count-star {
              color: orange;
            }
            &-top {
              @include screen(991) {
                margin-top: 20px;
                flex-direction: column !important;
              }
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
                @include screen(991) {
                  width: 100%;
                  justify-content: flex-end;
                }
              }
            }
            &-mid {
              color: $gray-500;
              font-size: 16px;
              font-weight: 600;
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
              }
            }
          }
        }
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
</style>
