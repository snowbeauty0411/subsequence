<template>
  <NuxtLayout name="toppage">
    <div class="page-category w-full">
      <div class="page-category-header relative">
        <div class="page-category-header-title">お気に入り</div>
        <div
          class="page-category-header-select absolute"
          v-if="listFavorite.length > 0"
        >
          <b-form-select
            v-model="sortType"
            :options="options"
            size="sm"
            class="form-select-custom"
            @change="filterFavorite($event)"
          ></b-form-select>
        </div>
      </div>
      <div class="page-category-list">
        <b-container fluid>
          <b-row>
            <b-col cols="6" lg="4" v-for="item in listFavorite" :key="item.id">
              <div class="page-category-list-item">
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
                />
              </div>
            </b-col>
            <b-col lg="12" cols="12" sm="12">
              <PreLoad :preload="preload" />
              <div
                v-if="listFavorite.length == 0 || preload === true"
                class="text-center text-lg text-yellow-500"
              >
                サービスがありません
              </div>
            </b-col>
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
      <div
        class="page-category-pagination flex justify-center"
        v-if="listFavorite.length > 0"
      >
        <SDPagination
          v-if="totalPage > 1"
          v-bind:totalpage="totalPage"
          v-bind:currentPage="currentPage"
          v-on:update-page="updatePage"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import SDServiceCard from "@/components/SDServiceCard";
import SDPagination from "@/components/SDPagination";
import { buyerStore } from "@/store/buyer/index.ts";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import PreLoad from "@/components/SDPreLoad";
import Cookies from "js-cookie";
import { SearchStore } from "@/store/search";

export default {
  name: "CategoryPage",

  setup() {
    const store = buyerStore();
    const searchStores = SearchStore();
    const toast = useToast();
    return {
      store,
      toast,
      searchStores,
    };
  },

  created() {
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }
    if (this.user_type === "SELLER") {
      this.$router.push("/");
    }
    this.getListFavorite();
  },

  computed: {
    ...mapState(buyerStore, [
      "success",
      "message",
      "dataServiceFavorite",
      "error",
    ]),
    ...mapState(SearchStore, ["success", "message", "favoriteFlag", "error"]),
  },

  watch: {
    dataServiceFavorite() {
      this.preloadList = false;
      this.preload = true;
      this.listFavorite = this.dataServiceFavorite.data;
      this.totalPage = this.dataServiceFavorite.last_page;
      this.currentPage = this.dataServiceFavorite.current_page;
      this.preload = false;
    },

    favoriteFlag() {
      if (this.searchStores.favoriteFlag === true) {
        this.getListFavorite();
        this.searchStores.favoriteFlag = false;
      }
    },

    detailCategory() {
      this.categoryById = this.detailCategory;
    },
  },

  data() {
    return {
      totalPage: null,
      options: [
        { value: 0, text: "並び替え" },
        { value: 1, text: "新着" },
        { value: 2, text: "評価が高い" },
        { value: 3, text: "価格が高い" },
        { value: 4, text: "価格が安い" },
        { value: 5, text: "登録者が多い" },
      ],
      listFavorite: [],
      currentPage: 1,
      preload: true,
      preloadList: false,
      account_id: null,
      sortType: 0,
      user_type: "BUYER",
    };
  },

  components: {
    SDServiceCard,
    SDPagination,
    PreLoad,
  },

  methods: {
    updatePage(page) {
      this.preload = true;
      (this.currentPage = page), this.getListFavorite();
      window.scrollTo(0, 0);
    },

    filterFavorite(event) {
      this.sortType = event;
      this.getListFavorite();
      window.scrollTo(0, 0);
    },

    getListFavorite() {
      this.store.getServiceFavorite({
        buyer_id: this.account_id,
        per_page: 9,
        page: this.currentPage,
        sort: this.sortType,
      });
    },
  },
};
</script>

<style lang="scss">
.page-category {
  padding: 50px 100px;
  @include screen(480) {
    padding: 50px 20px;
  }
  @include screen(991) {
    padding: 50px 20px;
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
}
</style>
