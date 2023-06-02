<template>
  <div class="page-service-recommend flex flex-col">
    <div class="page-service-recommend-seller" v-if="listService.length > 0">
      <div class="page-service-recommend-title">
        この出品者のその他のサービス
      </div>
      <div class="page-service-recommend-seller-content">
        <Carousel
          :settings="settings"
          :breakpoints="breakpoints"
          :wrap-around="true"
          v-if="listService.length !== 0"
        >
          <Slide v-for="item in listService" :key="item.id">
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
              :isLike="item.is_favorite"
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
      class="page-service-recommend-restaurant"
      v-if="listSameCategoryService.length > 0"
    >
      <div class="page-service-recommend-title">
        {{ categories_name }} の関連サービス
      </div>
      <div class="page-service-recommend-restaurant-content">
        <Carousel
          :settings="settings"
          :breakpoints="breakpoints"
          :wrap-around="true"
          v-if="listSameCategoryService.length !== 0"
        >
          <Slide v-for="item in listSameCategoryService" :key="item.id">
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
              :isLike="item.is_favorite"
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
      class="page-service-recommend-checked"
      v-if="listHistoryService.length > 0"
    >
      <div class="page-service-recommend-title">
        このサービスを閲覧している人がチェックしているサービス
      </div>
      <div class="page-service-recommend-checked-content">
        <Carousel
          :settings="settings"
          :breakpoints="breakpoints"
          :wrap-around="true"
          v-if="listHistoryService.length !== 0"
        >
          <Slide v-for="item in listHistoryService" :key="item.id">
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
              :isLike="item.is_favorite"
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
  </div>
</template>

<script>
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import SDServiceCard from "../../SDServiceCard";
import "vue3-carousel/dist/carousel.css";
import { ServiceStore } from "@/store/service/index.ts";
import { mapState } from "pinia";
import Cookies from "js-cookie";
import { SearchStore } from "@/store/search";

export default {
  name: "RecommendService",
  components: {
    Carousel,
    Slide,
    Navigation,
    Pagination,
    SDServiceCard,
  },
  setup() {
    const serviceStore = ServiceStore();
    const store = SearchStore();
    return {
      serviceStore,
      store,
    };
  },
  computed: {
    ...mapState(ServiceStore, [
      "listServiceOther",
      "listServiceHistory",
      "listServiceCategory",
      "detailService",
    ]),
    ...mapState(SearchStore, ["success"]),
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
    if (this.token) {
      this.getListOtherLogined();
      this.getListHistoryServiceLogined();
      this.getListCategoryLogined();
    } else {
      this.getListHistoryService();
      this.getListOther();
      this.getListCategory();
    }
  },
  watch: {
    listServiceOther() {
      this.listService = this.listServiceOther.data;
    },

    listServiceHistory() {
      this.listHistoryService = this.listServiceHistory.data;
    },

    listServiceCategory() {
      this.listSameCategoryService = this.listServiceCategory.data;
    },

    detailService() {
      this.categories_name = this.detailService.categories.name;
    },

    success() {
      if (this.store.success === true) {
        this.getListOtherLogined();
        this.getListHistoryServiceLogined();
        this.getListCategoryLogined();
      }
    },
  },
  data() {
    return {
      settings: {
        itemsToShow: 3,
        snapAlign: "start",
        autoplay: 2000,
      },
      breakpoints: {
        1600: {
          itemsToShow: 3,
          snapAlign: "start",
        },
        1440: {
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
      listService: [],
      listHistoryService: [],
      listSameCategoryService: [],
      token: "",
      account_id: null,
      categories_name: "",
    };
  },
  methods: {
    getListOtherLogined() {
      const dataForm = {
        id: this.$route.params.idService,
        limit: 10,
        buyer_id: this.account_id,
      };
      this.serviceStore.getListServiceOtherLogined(dataForm);
    },

    getListOther() {
      const dataForm = {
        id: this.$route.params.idService,
        limit: 10,
      };
      this.serviceStore.getListServiceOther(dataForm);
    },

    getListHistoryService() {
      const dataForm = {
        id: this.$route.params.idService,
        limit: 5,
      };
      this.serviceStore.getListServiceHistory(dataForm);
    },

    getListHistoryServiceLogined() {
      const dataForm = {
        id: this.$route.params.idService,
        limit: 5,
        buyer_id: this.account_id,
      };
      this.serviceStore.getListServiceHistoryLogined(dataForm);
    },

    getListCategoryLogined() {
      const dataForm = {
        id: this.$route.params.idService,
        limit: 5,
        buyer_id: this.account_id,
      };
      this.serviceStore.getListServiceCategoryLogined(dataForm);
    },

    getListCategory() {
      const dataForm = {
        id: this.$route.params.idService,
        limit: 10,
      };
      this.serviceStore.getListServiceCategory(dataForm);
    },
  },
};
</script>

<style>
</style>
