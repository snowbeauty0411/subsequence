<template>
  <NuxtLayout name="toppage">
    <div class="toppage w-full">
      <PreLoad :preload="preload" />
      <section class="toppage-search">
        <div class="toppage-search-wave flex flex-col justify-between">
          <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
              <use xlink:href="#gentle-wave" x="48" y="0" fill="#FE948A" />
              <use xlink:href="#gentle-wave" x="48" y="3" fill="#FE948A" />
              <use xlink:href="#gentle-wave" x="48" y="7" fill="#f48089" />
            </g>
          </svg>

          <svg class="waves1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
              <use xlink:href="#gentle-wave" x="48" y="4" fill="#e5e9fc" />
            </g>
          </svg>
        </div>

        <div class="toppage-search-text">
          <div class="text-left">
            あなたが住んでいる街の <br />
            サブスクサービスを検索してみよう。
          </div>
        </div>
        <div class="toppage-search-bar" v-if="!preload">
          <div class="
              text-end
              mr-[30px]
              text-[#E79C3A] text-[20px]
              xsm:text-[16px]
            ">
            Find subscription services.
          </div>
          <SearchBar placeholder="最寄り駅を入力" @handle-change="searchStation" @onArrowDown="onArrowDown"
            @onArrowUp="onArrowUp" @onEnter="onEnter(keyword)" />
          <div class="list-data-search" v-show="listDataSearch" ref="scrollContainer">
            <div v-for="(item, index) in listStation" :key="index" class="list-data-search-item" v-on:click="
              searchServiceByStation(
                item.prefecture,
                item.line,
                item.longi_d,
                item.lati_d
              )
            " ref="options" :class="
  dataActive == item.line ? 'list-data-search-item-active' : ''
">
              <div v-if="item.line !== undefined">
                {{ item.line }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="toppage-recommend w-full overflow-hidden">
        <div class="toppage-title">
          <div class="toppage-title-textEN">
            <div class="toppage-title-textEN-content">
              Recommended service for you
            </div>
            <div class="toppage-title-textEN-line"></div>
          </div>
          <div class="toppage-title-textJP">あなたへのおすすめサービス</div>
        </div>
        <div class="toppage-slick-caroussel">
          <Carousel :settings="settingsRecommend" :breakpoints="breakpointsRecommend" :wrap-around="true"
            v-if="recommendedList.length !== 0">
            <Slide v-for="item in recommendedList" :key="item.id">
              <SDServiceCard :idService="item.id" :id="item.hash_id" :name="item.name" :imgUrl="item.images"
                :area="item.area ? item.area : '-'" :caption="item.service_content" :price="item.price"
                :star="item.avg_reviews" :tags="item.tags" :isLike="item.is_favorite === 1 ? 1 : 0"
                :cycle="item.cycle" />
            </Slide>

            <template #addons>
              <Pagination class="custom-pagination" />
              <Navigation class="custom-navigation" />
            </template>
          </Carousel>
        </div>
      </section>

      <section class="toppage-special w-full overflow-hidden">
        <div class="toppage-title">
          <div class="toppage-title-textEN specialLine">
            <div class="toppage-title-textEN-content">Special feature</div>
            <div class="toppage-title-textEN-line"></div>
          </div>
          <div class="toppage-title-textJP specialLine">特 集</div>
        </div>
        <div class="toppage-slick-caroussel">
          <Carousel :settings="settingsRecommend" :breakpoints="breakpointsSpecial" class="toppage-special-slider"
            :wrap-around="true" v-if="specialList.length !== 0">
            <Slide v-for="item in specialList" :key="item.id">
              <div :style="'background-image: url(' + item.images[0] + ')'" class="img-special">
                <!-- <img :src="item.images" alt="" /> -->
              </div>
            </Slide>

            <template #addons>
              <Pagination class="custom-pagination" />
              <Navigation class="custom-navigation" />
            </template>
          </Carousel>
        </div>
      </section>

      <section class="toppage-hashtag w-full">
        <div class="toppage-title">
          <div class="toppage-title-textEN hashTagLine">
            <div class="toppage-title-textEN-content">Hashtag</div>
            <div class="toppage-title-textEN-line"></div>
          </div>
          <div class="toppage-title-textJP hashTagLine">人気のタグ</div>
        </div>
        <div class="toppage-hashtag-list flex flex-wrap">
          <div class="toppage-hashtag-list-item mb-4" v-for="item in hashTagList" :key="item.id"
            v-on:click="searchHashTag(item.name)">
            {{ item.name }}
          </div>
        </div>
      </section>

      <section class="toppage-service">
        <div class="toppage-title">
          <div class="toppage-title-textEN newServiceLine">
            <div class="toppage-title-textEN-content">New service</div>
            <div class="toppage-title-textEN-line"></div>
          </div>
          <div class="toppage-title-textJP newServiceLine">新着サービス</div>
        </div>
        <!-- List PC -->
        <div class="toppage-service-list">
          <b-container fluid>
            <b-row>
              <b-col lg="4" v-for="item in dataNewList" :key="item.id">
                <div class="toppage-service-list-item">
                  <SDServiceCard :idService="item.id" :id="item.hash_id" :name="item.name" :imgUrl="item.images[0]"
                    :area="item.area ? item.area : '-'" :caption="item.service_content" :price="item.price"
                    :star="item.avg_reviews" :tags="item.tags" :isLike="item.is_favorite === 1 ? 1 : 0"
                    :cycle="item.cycle" />
                </div>
              </b-col>
            </b-row>
          </b-container>
          <div class="flex justify-end">
            <button class="button-viewall flex items-center" v-on:click="viewAllNewService()">
              View All
              <img src="@/assets/images/iconArrowRight.png" />
            </button>
          </div>
        </div>
        <!-- List SP -->
        <div class="toppage-service-list-sp" v-if="dataNewList.length !== 0">
          <NewServicesSP :itemsList="dataNewList" />
          <div class="flex justify-end">
            <button class="new-services-btn flex items-center" v-on:click="viewAllNewService()">
              View All
              <img src="@/assets/images/iconArrowRight.png" />
            </button>
          </div>
        </div>
      </section>

      <section class="toppage-featured">
        <div class="toppage-title">
          <div class="toppage-title-textEN featuredServiceLine">
            <div class="toppage-title-textEN-content">Featured service</div>
            <div class="toppage-title-textEN-line"></div>
          </div>
          <div class="toppage-title-textJP featuredServiceLine">
            注目のサービス
          </div>
        </div>
        <!-- List PC -->
        <div class="toppage-featured-list">
          <b-container fluid>
            <b-row>
              <b-col lg="4" v-for="item in featuredList" :key="item.id">
                <div class="toppage-featured-list-item">
                  <SDServiceCard :idService="item.id" :id="item.hash_id" :name="item.name" :imgUrl="item.images[0]"
                    :area="item.area ? item.area : '-'" :caption="item.service_content" :price="item.price"
                    :star="item.avg_reviews" :tags="item.tags" :isLike="item.is_favorite === 1 ? 1 : 0"
                    :cycle="item.cycle" />
                </div>
              </b-col>
            </b-row>
          </b-container>
          <div class="flex justify-end">
            <button class="button-viewall flex items-center" v-on:click="viewAllFeaturedService()">
              View All
              <img src="@/assets/images/iconArrowRight.png" />
            </button>
          </div>
        </div>
        <!-- List SP -->
        <div class="toppage-featured-list-sp" v-if="featuredList.length !== 0">
          <NewServicesSP :itemsList="featuredList" />
          <div class="flex justify-end">
            <button class="new-services-btn flex items-center" v-on:click="viewAllFeaturedService()">
              View All
              <img src="@/assets/images/iconArrowRight.png" />
            </button>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script>
import SearchBar from "@/components/SDSearchBar";
import SDServiceCard from "@/components/SDServiceCard";
import SDIcon from "@/components/SDIcon";
import NewServicesSP from "@/components/NewServicesSP";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import { TopPageStore } from "@/store/service/topPage.ts";
import { mapState } from "pinia";
import "vue3-carousel/dist/carousel.css";
import { SearchStore } from "@/store/search";
import { Message } from "@/utils/message";
import { useToast } from "vue-toastification";
import PreLoad from "@/components/SDPreLoad";
import Cookies from "js-cookie";

export default {
  name: "Home",

  data() {
    return {
      recommendedList: [],
      arrowCounter: -1,
      specialList: [],
      hashTagList: [],
      dataNewList: [],
      featuredList: [],
      dataSearch: "",
      settingsRecommend: {
        itemsToShow: 1,
        snapAlign: "start",
        autoplay: 300000,
      },
      breakpointsRecommend: {
        1440: {
          itemsToShow: 3,
          snapAlign: "start",
        },
        992: {
          itemsToShow: 2.2,
          snapAlign: "start",
        },
        880: {
          itemsToShow: 2,
          snapAlign: "start",
        },
        767: {
          itemsToShow: 1.6,
          snapAlign: "start",
        },
        650: {
          itemsToShow: 1.4,
          snapAlign: "start",
        },
        550: {
          itemsToShow: 1.2,
          snapAlign: "start",
        },
        424: {
          itemsToShow: 1,
          snapAlign: "start",
        },
        320: {
          itemsToShow: 1,
          snapAlign: "center",
        },
      },
      breakpointsFeatured: {
        1440: {
          itemsToShow: 3,
          snapAlign: "start",
        },
        992: {
          itemsToShow: 2.2,
          snapAlign: "start",
        },
        880: {
          itemsToShow: 2,
          snapAlign: "start",
        },
        767: {
          itemsToShow: 1.6,
          snapAlign: "start",
        },
        650: {
          itemsToShow: 1.4,
          snapAlign: "start",
        },
        550: {
          itemsToShow: 1.2,
          snapAlign: "start",
        },
        424: {
          itemsToShow: 1,
          snapAlign: "start",
        },
        320: {
          itemsToShow: 1,
          snapAlign: "center",
        },
      },
      breakpointsSpecial: {
        // 700px and up
        768: {
          itemsToShow: 2,
          snapAlign: "center",
        },
        // 1130 and up
        992: {
          itemsToShow: 2,
          snapAlign: "start",
        },
        // 1440 and up
        1440: {
          itemsToShow: 3,
          snapAlign: "start",
        },
        // 480px and up
        480: {
          itemsToShow: 1,
          snapAlign: "center",
        },
      },
      messageSearch: Message.SEARCH,
      listDataSearchPoint: [],
      stationName: "",
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
      listDataSearch: false,
      keyword: "",
      search: "",
      token: "",
      account_id: null,
      listStation: [],
      dataNull: false,
      dataActive: "",
    };
  },

  setup() {
    const topPageStore = TopPageStore();
    const searchStore = SearchStore();
    const toast = useToast();
    return {
      topPageStore,
      searchStore,
      toast,
    };
  },

  components: {
    SearchBar,
    SDServiceCard,
    NewServicesSP,
    Carousel,
    Slide,
    Navigation,
    Pagination,
    PreLoad,
    SDIcon,
  },

  computed: {
    ...mapState(TopPageStore, [
      "listRecommended",
      "listSpecial",
      "listHashTag",
      "listNewList",
      "listFeatured",
    ]),
    ...mapState(SearchStore, [
      "success",
      "message",
      "listServiceByStation",
      "successFavorite",
      "error",
    ]),
  },

  watch: {
    listRecommended() {
      this.preload = true;
      this.recommendedList = this.listRecommended;
      this.preload = false;
    },

    listSpecial() {
      this.preload = true;
      this.specialList = this.listSpecial;
      this.preload = false;
    },

    listHashTag() {
      this.preload = true;
      this.hashTagList = this.listHashTag;
      this.preload = false;
    },

    listNewList() {
      this.preload = true;
      this.dataNewList = this.listNewList;
      this.preload = false;
    },

    listFeatured() {
      this.preload = true;
      this.featuredList = this.listFeatured;
      this.preload = false;
    },

    listServiceByStation() {
      if (this.keyword !== "") {
        this.listStation = [];
        if (Number(this.listServiceByStation.ResultSet.max) > 1) {
          this.listDataSearchPoint = this.listServiceByStation.ResultSet.Point;
          this.listDataSearchPoint.map((item) => {
            this.listStation.push({
              line: item.Station.Name,
              prefecture: item.Prefecture.Name,
              longi_d: item.GeoPoint.longi_d,
              lati_d: item.GeoPoint.lati_d,
            });
          });
          // this.dataActive = this.listStation[0].line;
          this.listDataSearch = true;
          this.dataNull = false;
        } else if (Number(this.listServiceByStation.ResultSet.max) == 1) {
          // }
          this.listDataSearchPoint = this.listServiceByStation.ResultSet.Point;
          this.listStation.push({
            line: this.listDataSearchPoint.Station.Name,
            prefecture: this.listDataSearchPoint.Prefecture.Name,
            longi_d: this.listDataSearchPoint.GeoPoint.longi_d,
            lati_d: this.listDataSearchPoint.GeoPoint.lati_d,
          });
          this.listDataSearch = true;
          this.dataNull = false;
        } else if (Number(this.listServiceByStation.ResultSet.max) == 0) {
          this.listStation = [];
          this.listDataSearch = false;
          // this.dataNull = true;
        }
      } else {
        this.listStation = [];
        this.dataNull = false;
        this.listDataSearch = false;
      }
    },

    success() {
      if (this.searchStore.success === true) {
        this.getRecommenList();
        this.getSpecialList();
        this.getHashTagList();
        this.getNewList();
        this.getFeaturedList();
      }
    },

    successFavorite() {
      if (this.searchStore.successFavorite === true) {
        this.getRecommenList();
        this.getSpecialList();
        this.getHashTagList();
        this.getNewList();
        this.getFeaturedList();
      }
    },
  },

  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.token = localStorage.getItem("token_user");
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.token = Cookies.get("token_user");
      this.account_id = Cookies.get("account_id");
    }
    this.getRecommenList();
    this.getSpecialList();
    this.getHashTagList();
    this.getNewList();
    this.getFeaturedList();
  },

  methods: {
    getRecommenList() {
      if (this.token) {
        this.topPageStore.getRecommendedListLogined(this.account_id);
      } else {
        this.topPageStore.getRecommendedList();
      }
    },

    getSpecialList() {
      this.topPageStore.getSpecialList();
    },

    getHashTagList() {
      this.topPageStore.getHashTagList();
    },

    getNewList() {
      if (this.token) {
        const request = {
          sort: 1,
          buyer_id: this.account_id,
        };
        this.topPageStore.getNewList(request);
      } else {
        const request = {
          sort: 1,
        };
        this.topPageStore.getNewList(request);
      }
    },

    getFeaturedList() {
      if (this.token) {
        const request = {
          sort: 0,
          buyer_id: this.account_id,
        };
        this.topPageStore.getFeaturedList(request);
      } else {
        const request = {
          sort: 0,
        };
        this.topPageStore.getFeaturedList(request);
      }
    },

    searchHashTag(item) {
      this.$router.push(`/search?hashtag=${item}`);
      window.scrollTo(0, 0);
    },

    searchStation(keyword) {
      if (keyword != "" && keyword != null && keyword.length > 0) {
        this.keyword = keyword;
        this.searchStore.getListCategoryByStation(keyword);
      } else {
        this.keyword = keyword;
        this.listStation = [];
        this.listDataSearch = false;
      }
    },

    searchStationNow(keyword) {
      this.$router.push(`/search?station=${keyword}`);
    },

    viewAllFeaturedService() {
      this.$router.push(`/service/featured`);
      window.scrollTo(0, 0);
    },

    viewAllNewService() {
      this.$router.push(`/service/new`);
      window.scrollTo(0, 0);
    },

    searchServiceByStation(value, area, longi_d, lati_d) {
      this.$router.push(
        `/search?station=${value}-${area}&longi_d=${longi_d}&lati_d=${lati_d}`
      );
    },

    onArrowDown() {
      if (this.arrowCounter < this.listStation.length - 1) {
        this.arrowCounter = this.arrowCounter + 1;
        this.fixScrolling();
        this.keyword = this.listStation[this.arrowCounter].line;
        this.dataActive = this.listStation[this.arrowCounter].line;
      }
    },

    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
        this.fixScrolling();
        this.keyword = this.listStation[this.arrowCounter].line;
        this.dataActive = this.listStation[this.arrowCounter].line;
      }
    },

    fixScrolling() {
      const liH = this.$refs.options[this.arrowCounter].clientHeight;
      this.$refs.scrollContainer.scrollTop = liH * this.arrowCounter;
    },

    onEnter(event) {
      if (this.listStation.length > 0) {
        var dataSearch = this.listStation[this.arrowCounter];
        this.searchServiceByStation(
          dataSearch.prefecture,
          dataSearch.line,
          dataSearch.longi_d,
          dataSearch.lati_d
        );
        this.arrowCounter = -1;
        this.listDataSearch = false;
      } else {
        this.searchStationNow(event);
      }
    },

    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.listDataSearch = false;
        this.arrowCounter = -1;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/toppage/index.scss";
</style>

<style lang="scss" scoped>
.toppage {
  &-search {
    background: white;
    width: 100%;
    height: 320px;
    position: relative;

    &-wave {
      height: 320px;
      /* change the height of the waves here */
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-x: hidden;
      overflow-y: hidden;
      z-index: 0;

      @include screen(991) {
        height: 300px;
      }

      @include screen(480) {
        height: 220px;
      }

      .waves {
        position: relative;
        width: 100%;
        height: 15vh;
        margin-bottom: -7px;
        /*Fix for safari gap*/
        min-height: 100px;
        max-height: 150px;
        transform: rotate(180deg);
      }

      .waves1 {
        position: relative;
        width: 100%;
        height: 15vh;
        margin-bottom: -7px;
        /*Fix for safari gap*/
        min-height: 30px;
        max-height: 80px;
      }

      .parallax>use {
        animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
      }

      .parallax>use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
      }

      .parallax>use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
        margin-top: 50px;
      }

      .parallax>use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
      }

      .parallax>use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
      }

      .parallax1>use {
        animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
      }

      .parallax1>use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
      }

      @keyframes move-forever {
        0% {
          transform: translate3d(-90px, 0, 0);
        }

        100% {
          transform: translate3d(85px, 0, 0);
        }
      }

      /*Shrinking for mobile*/
      @media (max-width: 768px) {
        .waves {
          height: 40px;
          min-height: 40px;
        }
      }
    }

    @include screen(991) {
      height: 300px;
    }

    @include screen(480) {
      height: 220px;
    }

    &-text {
      position: absolute;
      font-size: 25px;
      font-weight: bold;
      color: #7e7d7d;
      margin-left: 100px;
      padding-top: 120px;

      @include screen(991) {
        text-align: center;
        margin-left: 50px;
        padding-top: 30px;
      }

      @include screen(480) {
        font-size: 12px;
      }
    }

    &-bar {
      width: 400px !important;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;

      @include screen(991) {
        top: 50%;
      }

      @include screen(480) {
        width: 300px !important;
      }

      &-text {
        color: $orange;
        font-size: 18px;
        text-align: center;
      }
    }

    .list-data-search {
      width: 100%;
      max-height: 200px;
      overflow-y: scroll;
      box-shadow: 0px 0px 6px #44444333;
      margin-top: -20px;
      padding-top: 20px;
      z-index: 1 !important;

      &-item {
        padding: 10px 20px;
        background: $white;
        cursor: pointer;

        &:hover {
          background: #f5f5f5;
          color: $orange;
          font-weight: 600;
        }

        &-active {
          background: #f5f5f5;
          color: $orange;
          font-weight: 600;
        }
      }
    }
  }

  &-recommend {
    padding: 50px 70px;

    @include screen(480) {
      padding: 50px 20px;
    }
  }

  &-special {
    padding: 50px 70px;

    @include screen(480) {
      padding: 50px 20px;
    }

    &-slider {
      .img-special {
        width: 90%;
        background-position: center center;
        background-color: $white;
        background-size: cover, 60%;
        object-fit: cover;
        height: 0;
        padding-bottom: 67%;
      }
    }
  }

  &-hashtag {
    padding: 50px 70px;

    @include screen(480) {
      padding: 50px 20px;
    }

    &-list {
      margin-left: 20px;
      margin-top: 50px;

      &-item {
        border: 2px solid $orange;
        padding: 5px 20px;
        border-radius: 22px;
        margin-right: 20px;
        color: $orange;
        font-weight: 600;
        cursor: pointer;
        @include screen(767) {
          margin-right: 10px;
          margin-bottom: 10px!important;
        }
      }
    }
  }

  &-service {
    padding: 50px 70px;

    @include screen(480) {
      padding: 50px 20px;
    }

    &-list {
      margin-top: 50px;

      @include screen(01199) {
        display: none;
      }

      @include screen(9921023) {
        display: none;
      }

      @include screen(10241365) {
        display: none;
      }

      &-item {
        margin-bottom: 30px;
      }
    }

    &-list-sp {
      display: none;

      @include screen(01199) {
        display: block;
      }

      @include screen(9921023) {
        display: block;
      }

      @include screen(10241365) {
        display: block;
      }
    }
  }

  &-featured {
    padding: 50px 70px 200px;

    @include screen(480) {
      padding: 50px 20px 50px;
    }

    &-list {
      margin-top: 50px;

      @include screen(991) {
        display: none;
      }

      @include screen(9921023) {
        display: none;
      }

      @include screen(10241365) {
        display: none;
      }

      &-item {
        margin-bottom: 30px;
      }
    }

    &-list-sp {
      display: none;

      @include screen(991) {
        display: block;
      }

      @include screen(9921023) {
        display: block;
      }

      @include screen(10241365) {
        display: block;
      }
    }
  }
}
</style>
