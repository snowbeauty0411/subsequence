<template>
  <NuxtLayout name="toppage">
    <div class="page-category w-full">
      <div class="page-category-header relative">
        <div class="page-category-header-title" v-if="categoryById.name">
          {{ categoryById.name }}
        </div>
        <div
          class="page-category-header-select absolute"
          v-if="dataNewService.length > 0"
        >
          <b-form-select
            v-model="selected"
            :options="options"
            size="sm"
            class="form-select-custom form-select-sp-custom"
            @change="filterCategory($event)"
          ></b-form-select>
        </div>
      </div>
      <div class="page-category-list">
        <b-container fluid>
          <b-row>
            <b-col
              cols="12"
              lg="4"
              v-for="item in dataNewService"
              :key="item.id"
            >
              <div class="page-category-list-item">
                <SDServiceCard
                  :idService="item.id"
                  :id="item.hash_id"
                  :name="item.name"
                  :imgUrl="item.images"
                  :area="item.area ? item.area : '-'"
                  :caption="item.service_content"
                  :price="item.price"
                  :star="item.avg_reviews"
                  :tags="item.tags"
                  :isLike="item.is_favorite === 1 ? 1 : 0"
                  :cycle="item.cycle"
                />
              </div>
            </b-col>
            <div
              v-if="dataNewService.length == 0 || preload === true"
              class="w-full"
            >
              <PreLoad :preload="preload" />
              <b-col lg="11" class="mx-auto alert-noResult px-3">
                <b-row align-v="center" align-h="center">
                  <b-col md="10" lg="7">
                    <div class="text-center text-lg alert-noResult-left">
                      <div class="w-100 text-center alert-noResult-text">
                        このカテゴリには、まだサービスがありません。
                      </div>
                      <b-button class="btn-backtoTop" to="/"
                        >TOPページへ</b-button
                      >
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </div>
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
      <!-- <div class="page-category-list-sp">
        <div class="list-slick-caroussel">
          <Carousel
            :settings="settingsList"
            :breakpoints="breakpoints"
            :wrap-around="true"
            v-if="dataNewService.length !== 0"
          >
            <Slide v-for="item in dataNewService" :key="item.id">
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
      </div> -->
      <div
        class="page-category-pagination flex justify-center"
        v-if="dataNewService.length > 0"
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
import { SearchStore } from "@/store/search";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import PreLoad from "@/components/SDPreLoad";
import Cookies from "js-cookie";

export default {
  name: "CategoryPage",

  setup() {
    const store = SearchStore();
    const toast = useToast();
    return {
      store,
      toast,
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
      this.token = localStorage.getItem("token_user");
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.token = Cookies.get("token_user");
      this.account_id = Cookies.get("account_id");
    }

    if (this.token) {
      this.getListServiceLogined();
    } else {
      this.getListService();
    }
    this.store.getDetaiCategory(this.$route.params.idCategory);
  },

  computed: {
    ...mapState(SearchStore, [
      "success",
      "message",
      "listServiceByCategory",
      "detailCategory",
      "error",
      "successFavorite",
    ]),
  },

  watch: {
    listServiceByCategory() {
      this.preload = true;
      this.dataNewService = this.listServiceByCategory.data;
      this.totalPage = this.listServiceByCategory.last_page;
      this.preload = false;
      this.preloadList = false;
    },

    detailCategory() {
      this.categoryById = this.detailCategory;
    },

    success() {
      if (this.store.success === true) {
        this.getListServiceLogined();
      }
    },

    successFavorite() {
      this.updatePage(this.currentPage);
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
      dataNewService: [],
      currentPage: 1,
      categoryById: {},
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
      preload: true,
      preloadList: false,
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
    PreLoad,
  },

  methods: {
    updatePage(page) {
      this.preloadList = true;
      this.currentPage = page;
      if (this.token) {
        const dataForm = {
          page: this.currentPage,
          category_id: this.$route.params.idCategory,
          sort: this.selected,
          buyer_id: this.account_id,
        };
        this.store.getListCategoryByCategoryLogined(dataForm);
      } else {
        this.currentPage = page;
        const dataForm = {
          page: this.currentPage,
          category_id: this.$route.params.idCategory,
          sort: this.selected,
        };
        this.store.getListCategoryByCategory(dataForm);
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    },

    filterCategory(event) {
      if (this.token) {
        const dataForm = {
          page: this.currentPage,
          category_id: this.$route.params.idCategory,
          sort: event,
          buyer_id: this.account_id,
        };
        this.store.getListCategoryByCategoryLogined(dataForm);
      } else {
        const dataForm = {
          page: this.currentPage,
          category_id: this.$route.params.idCategory,
          sort: event,
        };
        this.store.getListCategoryByCategory(dataForm);
      }
    },

    getListServiceLogined() {
      const dataForm = {
        page: this.currentPage,
        category_id: this.$route.params.idCategory,
        sort: this.selected,
        buyer_id: this.account_id,
      };
      this.store.getListCategoryByCategoryLogined(dataForm);
    },

    getListService() {
      const dataForm = {
        page: this.currentPage,
        category_id: this.$route.params.idCategory,
        sort: this.selected,
      };
      this.store.getListCategoryByCategory(dataForm);
    },
  },
};

</script>

<style lang="scss">
.page-category {
  padding: 50px 100px;
  @include screen(480) {
    padding: 50px 0px;
  }
  @include screen(991) {
    padding: 50px 0px;
  }
  @include screen(12001599) {
    padding: 50px 30px;
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
      padding-bottom: 15px;
      @include screen(01023) {
        font-size: 20px;
      }
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
      .form-select-sp-custom {
        @include screen(01023) {
          border: none;
          outline: none;
          background-color: transparent;
          background-position: left 0.5rem center;
          color: #7e7d7d;
          padding: 0.25rem;
          padding-left: 2rem;
          width: auto;
        }
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
  //   .custom-pagination {
  //     margin-top: 20px;
  //     .carousel__pagination-button {
  //       width: 18px;
  //       height: 18px;
  //       border-radius: 50px;
  //       background: $body-bg;
  //       opacity: 1;
  //       box-shadow: 2px 2px 2px #4d4d4d33;
  //     }
  //     .carousel__pagination-button--active {
  //       background: $orange;
  //     }
  //   }
  //   .custom-navigation {
  //     background: $orange;
  //     @include screen(991) {
  //       display: none;
  //     }
  //   }
  // }
  &-pagination {
    margin-top: 40px;
  }
  .service-card {
    margin: 0;
    .card-body {
      padding: 15px;
    }
    &-top {
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
// .alert-noResult:deep {
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
// }
</style>
