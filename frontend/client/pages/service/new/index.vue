<template>
  <NuxtLayout name="toppage">
    <SDPreLoad :preload="preload" />
    <div class="page-serviceNew w-full">
      <div class="page-serviceNew-header relative">
        <div class="page-serviceNew-header-title">新着サービス</div>
        <div class="page-serviceNew-header-select absolute">
          <b-form-select
            v-model="selected"
            :options="options"
            @change="filterService($event)"
            size="sm"
            class="form-select-custom"
          ></b-form-select>
        </div>
      </div>
      <div class="page-serviceNew-list">
        <b-container fluid>
          <b-row>
            <b-col
              lg="4"
              cols="12"
              sm="6"
              v-for="item in newList"
              :key="item.id"
            >
              <div class="page-serviceNew-list-item">
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
                />
              </div>
              <div v-if="newList.length == 0">サビスがありません</div>
            </b-col>
            <!-- <b-col lg="12" cols="12" sm="12">
              <div
                v-if="newList.length == 0"
                class="text-center text-lg text-yellow-500"
              >
                サビスがありません
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
      <div class="page-serviceNew-list-sp">
        <div class="list-slick-caroussel">
          <div class="w-full">
            <div
              v-if="newList.length == 0"
              class="text-center text-lg text-yellow-500"
            >
              サービスがありません
            </div>
          </div>
          <Carousel
            :settings="settingsList"
            :breakpoints="breakpoints"
            v-if="newList.length > 0"
            :wrap-around="true"
          >
            <Slide v-for="item in newList" :key="item.id">
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
              />
            </Slide>

            <template #addons>
              <Pagination class="custom-pagination" />
              <Navigation class="custom-navigation" />
            </template>
          </Carousel>
        </div>
      </div>
      <div
        class="page-serviceNew-pagination flex justify-center"
        v-if="newList.length > 0"
      >
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
import { TopPageStore } from "@/store/service/topPage.ts";
import { mapState } from "pinia";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import Cookies from "js-cookie";
import { SearchStore } from "@/store/search";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  name: "ListNewServicePage",

  setup() {
    const topPageStore = TopPageStore();
    const searchStore = SearchStore();
    return {
      topPageStore,
      searchStore,
    };
  },

  created() {
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.token = localStorage.getItem("token_user");
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.token = Cookies.get("token_user");
      this.account_id = Cookies.get("account_id");
    }
    this.reloadData();
  },

  computed: {
    ...mapState(TopPageStore, ["listNewListAll"]),
    ...mapState(SearchStore, [
      "success",
      "message",
      "listServiceByStation",
      "error",
    ]),
  },

  watch: {
    listNewListAll() {
      this.preloadList = false;
      this.newList = this.listNewListAll.data;
      this.totalPage = this.listNewListAll.last_page;
      this.currentPage = this.listNewListAll.current_page;
      this.preload = false;
    },

    success() {
      if (this.searchStore.success === true) {
        this.reloadData();
      }
    },
  },

  data() {
    return {
      preloadList: false,
      preload: true,
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
      newList: [],
      currentPage: 1,
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
      token: "",
      account_id: null,
    };
  },

  components: {
    SDServiceCard,
    SDPagination,
    Carousel,
    Slide,
    Navigation,
    Pagination,
    SDPreLoad,
  },

  methods: {
    getNewListAll() {
      const dataForm = {
        page: 1,
        sort: 0,
      };
      this.topPageStore.getNewListAll(dataForm);
    },

    getNewListAllLogined() {
      const dataForm = {
        page: 1,
        sort: 0,
        buyer_id: this.account_id,
      };
      this.topPageStore.getNewListAll(dataForm);
    },

    updatePage(page) {
      this.preloadList = true;
      this.currentPage = page;
      if (this.token) {
        const dataForm = {
          page: this.currentPage,
          sort: this.selected,
          buyer_id: this.account_id,
        };
        this.topPageStore.getNewListAll(dataForm);
      } else {
        const dataForm = {
          page: this.currentPage,
          sort: this.selected,
        };
        this.topPageStore.getNewListAll(dataForm);
      }
      window.scrollTo(0, 0);
    },

    filterService(event) {
      this.selected = event;
      if (this.token) {
        const dataForm = {
          page: this.currentPage,
          sort: event,
          buyer_id: this.account_id,
        };
        this.topPageStore.getNewListAll(dataForm);
      } else {
        const dataForm = {
          page: this.currentPage,
          sort: event,
        };
        this.topPageStore.getNewListAll(dataForm);
      }
      window.scrollTo(0, 0);
    },

    reloadData() {
      if (this.token) {
        this.getNewListAllLogined();
      } else {
        this.getNewListAll();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-serviceNew {
  padding: 50px 100px;
  @include screen(480) {
    padding: 20px;
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
      margin-top: 40px;
    }
  }
  &-list-sp {
    display: none;
    margin-top: 50px;
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
  &-pagination {
    margin-top: 40px;
  }
  &-pagination {
    margin-top: 40px;
  }
}
</style>
