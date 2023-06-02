<template>
  <b-container fluid class="dashboard-buyer w-full g-0">
    <div class="flex flex-col" v-if="listServiceBought.length > 0">
      <PreLoad :preload="preload" />
      <div class="dashboard-buyer-header">
        <div class="header-wave">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            class="wave wave1 absolute"
          >
            <path
              fill="#f48589"
              fill-opacity="1"
              d="M0,0L60,16C120,32,240,64,360,69.3C480,75,600,53,720,37.3C840,21,960,11,1080,32C1200,53,1320,107,1380,133.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            class="wave wave2 absolute"
          >
            <path
              fill="#fdad99"
              fill-opacity="1"
              d="M0,64L80,90.7C160,117,320,171,480,165.3C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            class="wave wave3 absolute"
          >
            <path
              fill="#e5e9fc"
              fill-opacity="1"
              d="M0,128L120,138.7C240,149,480,171,720,202.7C960,235,1200,277,1320,298.7L1440,320L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div class="header-content absolute flex w-full justify-between">
          <div class="header-content-item flex flex-col">
            <div
              class="header-content-item-top flex px-3 items-center text-base font-semibold"
            >
              本日の予約スケジュール
            </div>
            <div
              class="header-content-item-bottom py-4 overflow-y-scroll overflow-x-hidden"
              v-if="listReservation.length > 0"
            >
              <div v-if="listReservation.length === 1">
                <div class="flex-col w-full justify-around px-3 text-center">
                  <div
                    class="text-base font-semibold py-2"
                    v-if="listReservation[0].service"
                  >
                    {{ listReservation[0].service.name }}
                  </div>
                  <div class="text-yellow-500 text-5xl">
                    {{ listReservation[0].time }}
                  </div>
                </div>
              </div>
              <div v-else>
                <b-row>
                  <b-col
                    cols="6"
                    v-for="(item, index) in listReservation"
                    :key="index"
                    class="my-3"
                  >
                    <div
                      class="flex flex-col justify-around px-3 text-center"
                      v-if="index & (1 === 1)"
                    >
                      <div
                        class="text-base font-semibold py-2"
                        v-if="item.service"
                      >
                        {{ item.service.name }}
                      </div>
                      <div class="text-yellow-500 text-5xl">
                        {{ item.time }}
                      </div>
                    </div>
                    <div
                      class="flex flex-col justify-around px-3 text-center"
                      style="border-right: 2px solid #e5e5e5"
                      v-else
                    >
                      <div
                        class="text-base font-semibold py-2"
                        v-if="item.service"
                      >
                        {{ item.service.name }}
                      </div>
                      <div class="text-yellow-500 text-5xl">
                        {{ item.time }}
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
            <div
              class="header-content-item-bottom py-4 w-full justify-center"
              v-else
            >
              <div class="flex flex-col justify-around">
                <div class="text-base font-semibold my-1 text-center">
                  本日の予約がありません
                </div>
                <div class="text-yellow-500 text-5xl"></div>
              </div>
            </div>
          </div>
          <div class="header-content-item">
            <div
              class="header-content-item-top flex px-3 items-center text-base font-semibold"
            >
              明日以降の予約スケジュール
            </div>
            <div
              class="header-content-item-bottom flex py-4 w-full justify-center"
            >
              <div class="flex flex-col justify-around">
                <div class="text-base font-semibold">予約中のサービス</div>
                <div class="text-yellow-500 text-center text-5xl">
                  {{ reservationAfterCurrent }} <span class="text-2xl">件</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-buyer-mid flex flex-col">
        <div class="dashboard-buyer-mid-list w-full" v-if="totalBought > 0">
          <div class="list-header flex items-center">
            <div class="amount text-3xl font-semibold">
              {{ totalBought }}
            </div>
            <div class="text-name text-base font-semibold">
              契約中のサービス
            </div>
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
          <div class="list-content">
            <div v-if="listServiceBought.length == 0 || preload === true">
              サービスがありません
            </div>
            <b-row>
              <b-col
                cols="6"
                lg="3"
                v-for="(item, index) in listServiceBought"
                :key="index"
              >
                <div class="list-content-item flex flex-col">
                  <Nuxt-link
                    :to="`/buyer/service/service-manage/${item.hash_id}`"
                  >
                    <div
                      class="item-img"
                      :style="'background-image: url(' + item.images[0] + ')'"
                    ></div>
                  </Nuxt-link>

                  <div class="item-text flex flex-col">
                    <div
                      class="item-text-top font-semibold text-[22px] my-2 text-[#5E5C5C]"
                    >
                      {{ item.name }}
                    </div>
                    <div
                      class="item-text-bottom text-sm font-semibold text-[#5E5C5C]"
                    >
                      {{ item.categories.name }}
                    </div>
                  </div>
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

        <div
          class="dashboard-buyer-mid-list w-full"
          v-if="listServiceFavorite.length > 0"
        >
          <div class="list-header flex items-center">
            <div class="amount text-3xl font-semibold">
              {{ totalFavorite }}
            </div>
            <div class="text-name text-sm font-semibold">
              お気に入りサービス
            </div>
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
          <div class="list-content">
            <b-row>
              <b-col
                cols="6"
                lg="3"
                v-for="(item, index) in listServiceFavorite"
                :key="index"
              >
                <div class="list-content-item flex flex-col">
                  <Nuxt-link :to="`/service/detail/${item.hash_id}`">
                    <div
                      class="item-img"
                      :style="'background-image: url(' + item.images[0] + ')'"
                    ></div>
                    <div class="item-text flex flex-col">
                      <div
                        class="item-text-top font-semibold text-[22px] my-2 text-[#5E5C5C]"
                      >
                        {{ item.name }}
                      </div>
                      <div class="item-text-bottom text-sm font-semibold">
                        {{ item.categories.name }}
                      </div>
                    </div>
                  </Nuxt-link>
                </div>
              </b-col>
            </b-row>
          </div>
          <SDPagination
            v-if="totalPageFavorite > 1"
            :totalpage="totalPageFavorite"
            :currentPage="currentPageFavorite"
            v-on:update-page="updatePageFavorite"
          />
        </div>

        <div class="dashboard-buyer-mid-list w-full" v-if="totalStop > 0">
          <div class="list-header flex items-center">
            <div class="amount text-3xl font-semibold">
              {{ totalStop }}
            </div>
            <div class="text-name text-base font-semibold">
              解約済みのサービス
            </div>
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
          <div class="list-content">
            <b-row>
              <b-col
                cols="6"
                lg="3"
                v-for="(item, index) in listServiceStop"
                :key="index"
              >
                <div class="list-content-item flex flex-col">
                  <Nuxt-link :to="`/service/detail/${item.hash_id}`">
                    <div
                      class="item-img"
                      v-if="item.images.length > 0"
                      :style="'background-image: url(' + item.images[0] + ')'"
                    ></div>
                    <div class="item-text flex flex-col">
                      <div
                        class="item-text-top font-semibold text-[22px] my-2 text-[#5E5C5C]"
                      >
                        {{ item.name }}
                      </div>
                      <div
                        class="item-text-bottom text-sm font-semibold"
                        v-if="item.categories"
                      >
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
      </div>

      <div
        class="dashboard-buyer-bottom flex flex-col"
        v-if="listCommentBuyer.length > 0"
      >
        <div class="dashboard-buyer-bottom-list w-full">
          <div class="list-header flex items-center">
            <div class="text-name text-base font-semibold">
              アカウント名さんが投稿したレビュー
            </div>
          </div>
          <div
            class="list-comment my-3 w-full flex justify-center flex-col items-center"
          >
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
              class="item-comment flex pc-content"
              v-for="(item, index) in listCommentBuyer"
              :key="index"
            >
              <div class="item-comment-img flex items-start">
                <img
                  :src="
                    item.service.images[0] ? item.service.images[0] : imgDefault
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
                          : $moment(item.updated_at).format("YYYY-MM-DD HH:mm")
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
            <div
              class="c-comment-item sp-content"
              v-for="(item, index) in listCommentBuyer"
              :key="index"
            >
              <div class="c-comment-item__top flex justify-between">
                <div class="c-comment-item__avatar flex">
                  <div class="c-comment-item__avatar-left">
                    <img
                      :src="
                        item.service.images[0]
                          ? item.service.images[0]
                          : avatarDefault
                      "
                    />
                  </div>
                  <div
                    class="c-comment-item__avatar-right flex flex-col justify-between"
                  >
                    <div
                      class="c-comment-item__avatar-right-top flex items-center"
                    >
                      <img
                        src="@/assets/images/star1.png"
                        alt=""
                        v-for="(image, i) in parseInt(item.rating)"
                        :key="i"
                      />
                    </div>
                    <div class="c-comment-item__avatar-right-bottom">
                      {{ item.service.name }}
                    </div>
                  </div>
                </div>
                <div class="c-comment-item__date-time font-semibold">
                  {{
                    item.updated_at === null
                      ? ""
                      : $moment(item.updated_at).format("YYYY-MM-DD HH:mm")
                  }}
                </div>
              </div>
              <div class="c-comment-item__bottom flex flex-col">
                <div class="text-comment my-3">
                  <div
                    v-if="item.description"
                    v-html="replaceText(item.description)"
                  ></div>
                </div>
                <div class="list-image flex my-3">
                  <div class="list-image-item cursor-pointer">
                    <img
                      :src="item.images[0].path"
                      alt=""
                      v-if="item.images.length > 0"
                    />
                  </div>
                  <div class="list-image-item cursor-pointer">
                    <img
                      :src="item.images[1].path"
                      alt=""
                      v-if="item.images.length > 1"
                    />
                  </div>
                  <div class="list-image-item cursor-pointer">
                    <img
                      :src="item.images[2].path"
                      alt=""
                      v-if="item.images.length > 2"
                    />
                  </div>
                  <div class="list-image-item cursor-pointer">
                    <img
                      :src="item.images[3].path"
                      alt=""
                      v-if="item.images.length > 3"
                    />
                  </div>
                </div>
                <div class="text-reply flex items-center">
                  出品者からの返信を読む
                  <BootstrapIcon
                    icon="chevron-down"
                    size="sm"
                    class="mx-2 openS"
                  />
                </div>
              </div>
            </div>
            <div
              class="page-search-pagination flex justify-center"
              v-if="listCommentBuyer.length > 0"
            >
              <SDPagination
                v-if="totalPage > 1"
                :totalpage="totalPage"
                :currentPage="currentPage"
                v-on:update-page="updatePage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col" v-else>
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
          <b-img src="../assets/images/logo3.png"></b-img>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import imgDefault from "@/assets/images/detail1.png";
import { buyerStore } from "@/store/buyer";
import { mapState } from "pinia";
import SDIcon from "@/components/SDIcon";
import PreLoad from "@/components/SDPreLoad";
import SDPagination from "@/components/SDPagination";
import Cookies from "js-cookie";
import avatarDefault from "@/assets/images/ellipse.png";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

export default {
  setup() {
    const store = buyerStore();
    return {
      store,
    };
  },
  data() {
    return {
      totalPageBought: null,
      currentPageBought: 1,
      totalPageFavorite: null,
      currentPageFavorite: 1,
      totalPageStop: null,
      currentPageStop: 1,
      imgDefault,
      account_id: null,
      listServiceBought: [],
      listServiceFavorite: [],
      listCommentBuyer: [],
      totalPage: null,
      currentPage: 1,
      listServiceStop: [],
      preload: true,
      listReservation: [],
      reservationAfterCurrent: 0,
      totalFavorite: null,
      totalBought: null,
      totalStop: null,
      preloadListBought: false,
      preloadListFavorite: false,
      preloadListStop: false,
      preloadListComment: false,
      avatarDefault,
    };
  },
  components: {
    BootstrapIcon,
    SDIcon,
    PreLoad,
    SDPagination,
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
    };
    const dataForm = {
      buyer_id: this.account_id,
      limit: 3,
      page: 1,
    };
    this.store.getServiceBought(request);
    this.store.getListStatisticReservation(this.account_id);
    this.store.getServiceFavorite({
      buyer_id: this.account_id,
      per_page: 8,
      page: 1,
    });
    this.store.getListComment(dataForm);
    const requestListStop = {
      buyer_id: this.account_id,
      per_page: 6,
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
      "listStatisticReservation",
    ]),
  },
  watch: {
    listStatisticReservation() {
      this.preload = true;
      this.listReservation = this.listStatisticReservation.reservation_current;
      this.reservationAfterCurrent =
        this.listStatisticReservation.reservation_after_current;
      this.preload = false;
    },

    dataServiceBought() {
      this.preload = true;
      this.preloadListBought = false;
      this.listServiceBought = this.dataServiceBought.data;
      this.totalPageBought = this.dataServiceBought.last_page;
      this.totalBought = this.dataServiceBought.total;
      this.preload = false;
    },

    dataServiceFavorite() {
      this.preloadListFavorite = false;
      this.preload = true;
      this.listServiceFavorite = this.dataServiceFavorite.data;
      this.totalPageFavorite = this.dataServiceFavorite.last_page;
      this.totalFavorite = this.dataServiceFavorite.total;
      this.preload = false;
    },

    listComment() {
      this.preloadListComment = false;
      this.preload = true;
      this.listCommentBuyer = this.listComment.data;
      this.totalPage = this.listComment.last_page;
      this.preload = false;
    },

    dataServiceStop() {
      this.preloadListStop = false;
      this.preload = true;
      this.listServiceStop = this.dataServiceStop.data;
      this.totalPageStop = this.dataServiceStop.last_page;
      this.totalStop = this.dataServiceStop.total;
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
        per_page: 6,
        page: this.currentPageStop,
      };
      this.store.getServiceStop(requestListStop);
    },

    editComment(id) {
      this.$router.push("/buyer/comment/post/" + id);
      window.scrollTo(0, 0);
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
definePageMeta({
  layout: "buyer",
});
</script>

<style lang="scss" scoped>
.pc-content {
  @include screen(01023) {
    display: none!important;
  }
}
.sp-content {
  @include screen(1024) {
    display: none!important;
  }
}
.dashboard-buyer {
  &-header {
    background: white;
    width: 100%;
    height: 340px;
    position: relative;
    @include screen(991) {
      height: 300px;
    }
    @include screen(480) {
      height: 330px;
      padding-inline: 0;
    }
    .header-wave {
      height: 340px; /* change the height of the waves here */
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-x: hidden;
      overflow-y: hidden;
      z-index: 0;
      background: #ffd2cf;
      @include screen(991) {
        height: 300px;
      }
      @include screen(480) {
        height: 220px;
        display: none;
      }
      .wave {
        position: absolute;
      }
      .wave1 {
        animation: wave 20s -3s linear infinite;
        transform: translate3d(0, 0, 0);
        width: 200%;
        margin-top: -30px;
        z-index: 999;
        @include screen(991) {
          margin-top: 0;
        }
      }
      .wave2 {
        animation: wave 13s -3s linear infinite;
        width: 200%;
        margin-top: -100px;
        @include screen(991) {
          margin-top: 0;
        }
      }
      .wave3 {
        animation: wave 5s -3s linear infinite;
        transform: translate3d(0, 0, 0);
        opacity: 0.8;
        height: 100px;
        bottom: 0;
      }
      @keyframes wave {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(-25%);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    }
    .header-content {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0 75px;
      @include screen(991) {
        padding: 0 30px;
      }
      @include screen(480){
        background: $lightwhite;
        flex-direction: column;
        padding-inline: 0;
      }
      &-item {
        width: 45%;
        height: 200px;
        @include screen(480) {
          height: 150px;
          width: 100%;
          margin-bottom: 20px;
        }
        &-top {
          border-radius: 15px 15px 0 0;
          height: 50px;
          background: rgb(255, 255, 255, 0.5);
          font-weight: 600;
          color: $gray-500;
          @include screen(480) {
            height: 50px;
            text-align: center;
            font-size: 14px !important;
            background: $white;
          }
        }
        &-bottom {
          color: $gray-500;
          background: $white;
          height: 150px;
          border-radius: 0 0 15px 15px;
          &::-webkit-scrollbar {
            display: none;
          }
          @include screen(480) {
            height: 100px;
            font-size: 14px !important;
            text-align: center;
            .text-base {
              font-size: 12px !important;
            }
            .text-yellow-500 {
              font-size: 20px;
              span {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
  &-mid {
    padding: 80px 75px 0 75px;
    @include screen(991) {
      padding: 50px 20px 0 20px;
    }
    &-list {
      .list-header {
        padding: 20px 0;
        border-bottom: 2px solid #5e5c5c;
        .amount {
          color: $gray-800;
        }
        .text-name {
          color: $gray-500;
          margin-left: 20px;
        }
      }
      .list-content {
        margin: 50px 0 10px;
        &-item {
          a {
            &:hover {
              color: #5e5c5c;
            }
          }
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
            width: 100%;
            &-top {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &:hover {
                color: $orange;
              }
            }
            &-bottom {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            @include screen(480) {
              width: 100%;
              margin-top: 5px;
              &-top {
                font-size: 14px !important;
              }
              &-bottom {
                font-size: 10px !important;
              }
            }
          }
        }
      }
    }
  }
  &-bottom {
    padding: 0 75px 50px 75px;
    @include screen(991) {
      padding: 50px 20px 0 20px;
    }
    &-list {
      .list-header {
        padding: 20px 0;
        border-bottom: 2px solid #5e5c5c;
        .text-name {
          color: $gray-500;
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
              max-width: unset;
              object-fit: cover;
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
                  width: 100px;
                  object-fit: cover;
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
                margin-right: 10px;
                object-fit: cover;
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
