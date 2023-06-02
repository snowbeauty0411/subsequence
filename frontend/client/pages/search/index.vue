<template>
  <NuxtLayout name="toppage">
    <div class="page-search w-full relative h-full">
      <div class="page-search-header relative">
        <div class="page-search-header-title" v-if="keyword && isKeyword">
          「{{ keyword }}」の検索結果
        </div>
        <div
          class="page-search-header-select absolute"
          v-if="dataService.length > 0"
        >
          <b-form-select
            v-model="selected"
            @change="filterService($event)"
            :options="options"
            size="sm"
            class="form-select-custom"
          ></b-form-select>
        </div>
      </div>
      <div
        v-if="
          (dataService.length == 0 && isStation) ||
          (dataService.length == 0 && isArea)
        "
        class="w-full"
      >
        <PreLoad :preload="preload" />
        <b-col lg="11" class="mx-auto alert-noResult px-3">
          <b-row align-v="center" align-h="center">
            <b-col md="10" lg="7">
              <div class="text-center text-lg alert-noResult-left">
                <div class="w-100 text-center alert-noResult-text">
                  そのエリアには、まだサービスがありません。
                </div>
                <b-button class="btn-backtoTop" to="/">TOPページへ</b-button>
              </div>
            </b-col>
            <!-- <b-col md="10" lg="5">
              <div class="img-alert position-relative alert-noResult-right">
                <b-img src="../assets/images/logo3.png" class="mx-auto"></b-img>
                <div class="img-alert-text text-danger text-center">イラスト差し替え</div>
              </div>
            </b-col> -->
          </b-row>
        </b-col>
      </div>
      <div class="page-search-list">
        <b-container fluid>
          <b-row>
            <b-col
              lg="4"
              cols="6"
              sm="6"
              v-for="item in dataService"
              :key="item.id"
            >
              <div class="page-search-list-item">
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
                  v-on:successFavorite="successFavorite(item, isLike)"
                />
              </div>
            </b-col>
            <!-- <b-col lg="12" cols="12" sm="12">
              <PreLoad :preload="preload" />
              <div
                v-if="dataService.length == 0 || preload === true"
                class="text-center text-lg text-yellow-500"
              >
                サービスがありません2
              </div>
            </b-col> -->
          </b-row>
        </b-container>
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
      <div v-if="isKeyword">
        <div class="page-search-list-sp">
          <div class="list-slick-caroussel">
            <div class="w-full">
              <PreLoad :preload="preload" />
              <div
                v-if="dataService.length == 0 || preload === true"
                class="text-center text-lg text-yellow-500"
              >
                サービスがありません
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-search-pagination" v-if="dataService.length > 0">
        <SDPagination
          v-if="totalPage > 1"
          :totalpage="totalPage"
          :currentPage="currentPage"
          v-on:update-page="updatePage"
        />
      </div>
    </div>
  </NuxtLayout>
</template> 

<script>
import SDServiceCard from "@/components/SDServiceCard";
import SDPagination from "@/components/SDPagination";
import { SearchStore } from "@/store/search";
import { mapState } from "pinia";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import PreLoad from "@/components/SDPreLoad";
import Cookies from "js-cookie";

export default {
  name: "CategoryPage",

  setup() {
    const store = SearchStore();
    return {
      store,
    };
  },

  created() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.token = localStorage.getItem("token_user");
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.token = Cookies.get("token_user");
      this.account_id = Cookies.get("account_id");
    }
    if (this.token) {
      if (this.$route.query.keyword) {
        this.isKeyword = true;
        this.isStation = false;
        this.isArea = false;
        this.isHashTag = false;
        this.getServiceByKeywordLogined();
      } else if (this.$route.query.station) {
        this.isKeyword = false;
        this.isStation = true;
        this.isArea = true;
        this.isHashTag = false;
        this.getServiceByStationLogined();
      } else if (this.$route.query.area) {
        this.isKeyword = false;
        this.isStation = false;
        this.isArea = true;
        this.isHashTag = false;
        this.getServiceByAreaLogined();
      } else if (this.$route.query.hashtag) {
        this.isKeyword = false;
        this.isStation = false;
        this.isArea = false;
        this.isHashTag = true;
        this.getServiceByHashTagLogined();
      }
    } else {
      if (this.$route.query.keyword) {
        this.isKeyword = true;
        this.isStation = false;
        this.isArea = false;
        this.isHashTag = false;
        this.getServiceByKeyword();
      } else if (this.$route.query.station) {
        this.isKeyword = false;
        this.isStation = true;
        this.isArea = false;
        this.isHashTag = false;
        this.getServiceByStation();
      } else if (this.$route.query.area) {
        this.isKeyword = false;
        this.isStation = false;
        this.isArea = true;
        this.isHashTag = false;
        this.getServiceByArea();
      } else if (this.$route.query.hashtag) {
        this.isKeyword = false;
        this.isStation = false;
        this.isArea = false;
        this.isHashTag = true;
        this.getServiceByHashTag();
      }
    }
  },

  computed: {
    ...mapState(SearchStore, [
      "success",
      "message",
      "listServiceByKeyword",
      "listServiceByArea",
      "listServiceByHashTag",
      "error",
      "listStation",
    ]),
  },

  watch: {
    listServiceByKeyword() {
      this.preloadList = false;
      this.preload = true;
      this.keyword = this.$route.query.keyword;
      this.dataService = this.listServiceByKeyword.data;
      this.totalPage = this.listServiceByKeyword.last_page;
      this.currentPage = this.listServiceByKeyword.current_page;
      this.preload = false;
    },

    listStation() {
      this.preloadList = false;
      this.preload = true;
      if (
        this.$route.query.longi_d !== undefined &&
        this.$route.query.lati_d !== undefined
      ) {
        this.keyword =
          this.$route.query.station.split("-")[1] + " 駅周辺のサービス";

        if (
          this.listStation.data !== undefined &&
          this.listStation.data.length > 0
        ) {
          this.dataService = this.listStation.data;
          this.totalPage = this.listStation.last_page;
          this.currentPage = this.listStation.current_page;
        }
      } else {
        this.keyword = this.$route.query.station + " 駅周辺のサービス";
      }

      this.preload = false;
    },

    listServiceByArea() {
      this.preloadList = false;
      this.preload = true;
      this.keyword = this.$route.query.area;
      this.dataService = this.listServiceByArea.data;
      this.totalPage = this.listServiceByArea.last_page;
      this.currentPage = this.listServiceByArea.current_page;
      this.preload = false;
    },

    listServiceByHashTag() {
      this.preloadList = false;
      this.preload = true;
      this.keyword = this.$route.query.hashtag;
      this.dataService = this.listServiceByHashTag.data;
      this.totalPage = this.listServiceByHashTag.last_page;
      this.currentPage = this.listServiceByHashTag.current_page;
      this.preload = false;
    },

    success() {
      if (this.store.success === true) {
        if (this.$route.query.keyword) {
          this.getServiceByKeywordLogined();
        } else if (this.$route.query.station) {
          this.getServiceByStationLogined();
        } else if (this.$route.query.area) {
          this.getServiceByAreaLogined();
        } else if (this.$route.query.hashtag) {
          this.getServiceByHashTagLogined();
        }
      }
    },

    "$route.query"() {
      let rememberLogin = localStorage.getItem("rememberLogin");
      if (rememberLogin === "true") {
        this.token = localStorage.getItem("token_user");
        this.account_id = localStorage.getItem("account_id");
      } else {
        this.token = Cookies.get("token_user");
        this.account_id = Cookies.get("account_id");
      }

      if (this.token) {
        if (this.$route.query.keyword) {
          this.isKeyword = true;
          this.isStation = false;
          this.isArea = false;
          this.isHashTag = false;
          this.getServiceByKeywordLogined();
        } else if (this.$route.query.station) {
          this.isKeyword = false;
          this.isStation = true;
          this.isArea = true;
          this.isHashTag = false;
          this.getServiceByStationLogined();
        } else if (this.$route.query.area) {
          this.isKeyword = false;
          this.isStation = false;
          this.isArea = true;
          this.isHashTag = false;
          this.getServiceByAreaLogined();
        } else if (this.$route.query.hashtag) {
          this.isKeyword = false;
          this.isStation = false;
          this.isArea = false;
          this.isHashTag = true;
          this.getServiceByHashTagLogined();
        }
      } else {
        if (this.$route.query.keyword) {
          this.isKeyword = true;
          this.isStation = false;
          this.isArea = false;
          this.isHashTag = false;
          this.getServiceByKeyword();
        } else if (this.$route.query.station) {
          this.isKeyword = false;
          this.isStation = true;
          this.isArea = false;
          this.isHashTag = false;
          this.getServiceByStation();
        } else if (this.$route.query.area) {
          this.isKeyword = false;
          this.isStation = false;
          this.isArea = true;
          this.isHashTag = false;
          this.getServiceByArea();
        } else if (this.$route.query.hashtag) {
          this.isKeyword = false;
          this.isStation = false;
          this.isArea = false;
          this.isHashTag = true;
          this.getServiceByHashTag();
        }
      }
      this.selected = 0;
    },
  },

  data() {
    return {
      selected: 0,
      totalPage: null,
      options: [
        { value: 0, text: "並び替え" },
        { value: 1, text: "新着" },
        { value: 2, text: "評価が高い" },
        { value: 3, text: "価格が高い" },
        { value: 4, text: "価格が安い" },
        { value: 5, text: "登録者が多い" },
      ],
      dataService: [],
      currentPage: 1,
      categoryById: {},
      keyword: null,
      station: null,
      area: null,
      hashtag: null,
      keywordChange: null,
      settingsList: {
        itemsToShow: 1,
        snapAlign: "center",
        autoplay: 2000,
      },
      breakpoints: {
        1440: {
          itemsToShow: 3,
          snapAlign: "start",
        },
        1366: {
          itemsToShow: 2.5,
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
      preload: true,
      token: "",
      account_id: null,
      preloadList: false,
      isKeyword: false,
      isStation: false,
      isArea: false,
      isHashTag: false,
    };
  },

  components: {
    SDServiceCard,
    SDPagination,
    Carousel,
    Slide,
    Navigation,
    Pagination,
    PreLoad,
  },

  methods: {
    successFavorite() {
      let rememberLogin = localStorage.getItem("rememberLogin");
      if (rememberLogin === "true") {
        this.token = localStorage.getItem("token_user");
        this.account_id = localStorage.getItem("account_id");
      } else {
        this.token = Cookies.get("token_user");
        this.account_id = Cookies.get("account_id");
      }
      if (this.token) {
        if (this.$route.query.keyword) {
          this.getServiceByKeywordLogined();
        } else if (this.$route.query.station) {
          this.getServiceByStationLogined();
        } else if (this.$route.query.area) {
          this.getServiceByAreaLogined();
        } else if (this.$route.query.hashtag) {
          this.getServiceByHashTagLogined();
        }
      } else {
        if (this.$route.query.keyword) {
          this.getServiceByKeyword();
        } else if (this.$route.query.station) {
          this.getServiceByStation();
        } else if (this.$route.query.area) {
          this.getServiceByArea();
        } else if (this.$route.query.hashtag) {
          this.getServiceByHashTag();
        }
      }
    },
    updatePage(page) {
      this.preloadList = true;
      this.currentPage = page;
      if (this.token) {
        if (this.$route.query.keyword) {
          this.getServiceByKeywordLogined();
        } else if (this.$route.query.area) {
          this.getServiceByAreaLogined();
        } else if (this.$route.query.station) {
          this.getServiceByStationLogined();
        } else if (this.$route.query.hashtag) {
          this.getServiceByHashTagLogined();
        }
      } else {
        if (this.$route.query.keyword) {
          this.getServiceByKeyword();
        } else if (this.$route.query.area) {
          this.getServiceByArea();
        } else if (this.$route.query.station) {
          this.getServiceByStation();
        } else if (this.$route.query.hashtag) {
          this.getServiceByHashTag();
        }
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    },

    getServiceByKeyword() {
      const dataForm = {
        page: this.currentPage,
        keyword: this.$route.query.keyword,
        sort: this.selected,
      };
      this.store.getListCategoryByKeyword(dataForm);
    },

    getServiceByKeywordLogined() {
      const dataForm = {
        page: this.currentPage,
        keyword: this.$route.query.keyword,
        sort: this.selected,
        buyer_id: this.account_id,
      };
      this.store.getListCategoryByKeywordLogined(dataForm);
    },

    getServiceByStation() {
      const formData = {
        page: this.currentPage,
        lat: this.$route.query.lati_d,
        lng: this.$route.query.longi_d,
        sort: this.selected,
      };
      this.store.getListServiceByStation(formData);
    },

    getServiceByStationLogined() {
      const formData = {
        page: this.currentPage,
        lat: this.$route.query.lati_d,
        lng: this.$route.query.longi_d,
        sort: this.selected,
        buyer_id: this.account_id,
      };
      this.store.getListServiceByStationLogined(formData);
    },

    getServiceByArea() {
      const dataForm = {
        page: this.currentPage,
        area: this.$route.query.area,
        sort: this.selected,
      };
      this.store.getListCategoryByArea(dataForm);
    },

    getServiceByAreaLogined() {
      const dataForm = {
        page: this.currentPage,
        area: this.$route.query.area,
        sort: this.selected,
        buyer_id: this.account_id,
      };
      this.store.getListCategoryByAreaLogined(dataForm);
    },

    getServiceByHashTag() {
      const dataForm = {
        page: this.currentPage,
        tag_name: this.$route.query.hashtag,
        sort: this.selected,
      };
      this.store.getListServiceByHashTag(dataForm);
    },

    getServiceByHashTagLogined() {
      const dataForm = {
        page: this.currentPage,
        tag_name: this.$route.query.hashtag,
        sort: this.selected,
        buyer_id: this.account_id,
      };
      this.store.getListServiceByHashTagLogined(dataForm);
    },

    filterService(event) {
      this.selected = event;

      if (this.token) {
        if (this.$route.query.keyword) {
          const dataForm = {
            page: this.currentPage,
            keyword: this.$route.query.keyword,
            sort: event,
            buyer_id: this.account_id,
          };
          this.store.getListCategoryByKeywordLogined(dataForm);
        } else if (this.$route.query.area) {
          const dataForm = {
            page: this.currentPage,
            area: this.$route.query.area,
            sort: event,
            buyer_id: this.account_id,
          };
          this.store.getListCategoryByAreaLogined(dataForm);
        } else if (this.$route.query.station) {
          const formData = {
            page: this.currentPage,
            lat: this.$route.query.lati_d,
            lng: this.$route.query.longi_d,
            sort: event,
            buyer_id: this.account_id,
          };
          this.store.getListServiceByStationLogined(formData);
        } else if (this.$route.query.hashtag) {
          const formData = {
            page: this.currentPage,
            tag_name: this.$route.query.hashtag,
            sort: event,
            buyer_id: this.account_id,
          };
          this.store.getListServiceByHashTagLogined(formData);
        }
      } else {
        if (this.$route.query.keyword) {
          const dataForm = {
            page: this.currentPage,
            keyword: this.$route.query.keyword,
            sort: event,
          };
          this.store.getListCategoryByKeyword(dataForm);
        } else if (this.$route.query.area) {
          const dataForm = {
            page: this.currentPage,
            area: this.$route.query.area,
            sort: event,
          };
          this.store.getListCategoryByArea(dataForm);
        } else if (this.$route.query.station) {
          const formData = {
            page: this.currentPage,
            lat: this.$route.query.lati_d,
            lng: this.$route.query.longi_d,
            sort: event,
          };
          this.store.getListServiceByStation(formData);
        } else if (this.$route.query.hashtag) {
          const formData = {
            page: this.currentPage,
            tag_name: this.$route.query.hashtag,
            sort: event,
          };
          this.store.getListServiceByHashTag(formData);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-search {
  padding: 50px 100px;
  @include screen(1366) {
    padding: 50px 50px;
    padding-bottom: 100px;
  }
  @include screen(991) {
    padding: 20px 0px;
  }
  @include screen(480) {
    padding: 20px 0;
  }
  &-header {
    @include screen(991) {
      padding: 0 20px;
    }
    &-title {
      color: #5e5c5c;
      opacity: 1;
      font-weight: 600;
      font-size: 22px;
      text-align: center;
    }
    &-select {
      top: 0;
      @include screen(991) {
        top: 100%;
      }
      @include screen(9921023) {
        top: 100%;
      }
      @include screen(10241365) {
        top: 100%;
      }
      right: 20px;
      .form-select-custom {
        background-image: url("@/assets/images/iconArrowDown.png") !important;
        width: 150px;
        color: #5e5c5c;
        font-weight: 600;
      }
    }
  }
  &-list {
    margin-top: 20px;
    // @include screen(991) {
    //   display: none;
    // }
    // @include screen(9921023) {
    //   display: none;
    // }
    // @include screen(10241365) {
    //   display: none;
    // }
    &-item {
      margin-top: 40px;
    }
  }
  // &-list-sp {
  //   display: none;
  //   margin-top: 50px;
  //   @include screen(991) {
  //     display: block;
  //   }
  //   @include screen(9921023) {
  //     display: block;
  //   }
  //   @include screen(10241365) {
  //     display: block;
  //   }
  // }
  &-pagination {
    margin-top: 40px;
  }
  .service-card:deep {
    @include screen(480) {
      margin: 0;
      .card-body {
        padding: 15px;
      }
      .service-card-top {
        .price {
          font-size: 18px;
        }
        .title {
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          -webkit-line-clamp: 2;
          display: -webkit-box;
        }
      }
      .service-card-bottom {
        flex-direction: column;
        margin-top: 10px;
        height: 65px;
        .list-tag {
          width: 100%;
          text-align: center;
          > div {
            width: 100%;
            display: block;
          }
        }
      }
    }
  }
}
.alert-noResult {
  &-text {
    font-size: 22px;
    font-weight: 900;
    color: #5e5c5c;
    margin-bottom: 60px;
  }
  &-left,
  &-right {
    padding: 100px 0 0;
    @include screen(01199) {
      padding: 50px 0 0;
    }
  }
  .img-alert-text {
    position: absolute;
    top: 65%;
    left: 0;
    width: 100%;
    height: auto;
    transform: translateY(-50%);
    font-size: 35px;
    font-weight: 900;
  }
}
.alert-noResult:deep {
  .btn-backtoTop {
    height: 56px;
    width: 100%;
    background: var(--unnamed-color-e79c3a) 0% 0% no-repeat padding-box;
    background: #e79c3a 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 6px #0000004f;
    border-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
