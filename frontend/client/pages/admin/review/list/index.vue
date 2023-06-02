<template>
  <NuxtLayout name="admin">
    <SDPreLoad :preload="preload" />
    <div class="fd-admin-listreview">
      <div class="fd-admin-listreview-card">
        <div class="fd-admin-listreview-card-header">
          <div class="fd-admin-listreview-card-select">
            <label for="filter-all">絞り込み:</label>
          </div>
        </div>
        <div class="fd-admin-listreview-card-group">
          <div class="fd-admin-listreview-card-filter">
            <input
              v-model="dataFilter.id"
              v-b-tooltip.hover
              title="ID"
              class="form-control"
              placeholder="ID"
              type="number"
            />
          </div>
          <div class="fd-admin-listreview-card-filter">
            <input
              v-model="dataFilter.buyer_id"
              v-b-tooltip.hover
              title="購入者ID"
              class="form-control"
              placeholder="購入者ID"
              type="number"
            />
          </div>
          <div class="fd-admin-listreview-card-filter">
            <b-form-input
              v-model="dataFilter.name"
              v-b-tooltip.hover
              title="サービス名"
              placeholder="サービス名"
            >
              ></b-form-input
            >
          </div>
          <div class="fd-admin-listreview-card-filter">
            <b-form-input
              v-model="dataFilter.rating"
              v-b-tooltip.hover
              title="評価"
              placeholder="評価"
            >
              ></b-form-input
            >
          </div>
          <div class="fd-admin-listreview-card-filter">
            <b-form-input
              v-model="dataFilter.description"
              v-b-tooltip.hover
              title="レビュー内容の説明"
              placeholder="レビュー内容の説明"
            >
              ></b-form-input
            >
          </div>
          <div class="fd-admin-listuser-card-filter">
            <b-form-select
              v-model="dataFilter.is_active"
              v-b-tooltip.hover
              title="サービス状態"
              class="form-select-custom"
              v-bind:class="{
                'option-null': dataFilter.is_active === '',
              }"
            >
              <b-form-select-option v-bind:value="''" style="color: #bebebe"
                >評価状況</b-form-select-option
              >
              <b-form-select-option v-bind:value="1" style="color: #000"
                >公衆</b-form-select-option
              >
              <b-form-select-option v-bind:value="0" style="color: #000"
                >私設</b-form-select-option
              >
            </b-form-select>
          </div>
        </div>
        <div class="custom-group">
          <div class="fd-admin-listreview-card-group mb-custom-20">
            <div
              class="fd-admin-listreview-card-filter"
              v-on:click="searchReview()"
            >
              <button class="items-center bg-blue-800">
                <BootstrapIcon class="mx-auto" icon="search" size="sm" />
              </button>
            </div>
            <div class="fd-admin-listreview-card-filter">
              <b-button class="reset-search" v-on:click="resetFilter()">
                <BootstrapIcon class="mx-auto" icon="arrow-repeat" size="sm" />
              </b-button>
            </div>
          </div>
          <div class="fd-admin-listreview-card-select flex mb-4 items-center">
            <label for="filter-all">ページごとの表示数:</label>
            <b-form-select
              v-model="selectPerPage"
              class="select-box form-select-custom"
              v-bind:options="options"
            ></b-form-select>
          </div>
        </div>
        <div class="fd-admin-listreview-card-table">
          <div
            v-if="preloadTable"
            class="sd-preloads flex justify-center items-center"
          >
            <div class="snippet" data-title=".dot-flashing">
              <div class="stage">
                <div class="dot-flashing"></div>
              </div>
            </div>
          </div>
          <Tables
            v-bind:items="listReviewAdmin"
            v-bind:fields="fields"
            v-bind:totalPage="totalPage"
            v-bind:currentPage="currentPage"
            v-on:update_page="updatePage"
          >
            <template #cell(rating)="{ item }">
              <div
                v-if="item && item.rating"
                class="group-btn bg-midnight text-tahiti text-center d-flex justify-content-center"
              >
                <div v-for="(i, index) in item.rating" v-bind:key="index">
                  <BootstrapIcon icon="star-fill" size="1x" />
                </div>
              </div>
              <div v-else class="group-btn bg-midnight text-tahiti text-center">
                -
              </div>
            </template>
            <template #cell(buyer_name)="{ item }">
              <div
                v-if="item.buyer && item.buyer.account_name"
                class="group-btn bg-midnight text-tahiti text-center"
              >
                {{ item.buyer.account_name }}
              </div>
              <div v-else class="group-btn bg-midnight text-tahiti text-center">
                -
              </div>
            </template>
            <template #cell(name)="{ item }">
              <div
                v-if="item.service && item.service.name"
                class="group-btn bg-midnight text-tahiti text-center"
              >
                {{ item.service.name }}
              </div>
              <div v-else class="group-btn bg-midnight text-tahiti text-center">
                -
              </div>
            </template>
            <template #cell(is_active)="{ item }">
              <div
                v-if="item.is_active === 0"
                class="group-btn bg-midnight text-tahiti text-center"
              >
                <b-button
                  v-b-tooltip.hover.top
                  title="審査"
                  class="btn-custom btn-danger btn-table bg-danger"
                  square
                  v-on:click="showModalActive(item.id)"
                  v-b-modal.modal-review
                  size="sm"
                >
                  審査中
                </b-button>
              </div>
              <div
                v-if="item.is_active === 1"
                class="group-btn bg-midnight text-tahiti text-center"
              >
                承認済み
              </div>
            </template>
            <template #cell(is_active_seller)="{ item }">
              <div
                v-if="
                  item.is_active_seller === 0 
                  && item.is_active === 1
                  && item.seller_reply
                "
                class="group-btn bg-midnight text-tahiti text-center"
              >
                <b-button
                  v-b-tooltip.hover.top
                  title="審査"
                  class="btn-custom btn-danger btn-table bg-danger"
                  square
                  v-on:click="showModalActiveSeller(item.id)"
                  v-b-modal.modal-review-seller
                  size="sm"
                >
                  審査中
                </b-button>
              </div>
              <div
                v-else-if="item.is_active_seller === 1"
                class="group-btn bg-midnight text-tahiti text-center"
              >
                承認済み
              </div>
            </template>
          </Tables>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-review"
      ref="modal-review"
      hide-header
      hide-footer
      v-model="showModalReview"
    >
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="12"
              ><div class="flex justify-center py-3">
                このレビューを公開しますか？
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="showModalReview = false"
                  >キャンセル</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-submit"
                  v-on:click="publicReview(id_review)"
                  >確認</b-button
                >
              </div>
            </b-col></b-row
          >
        </b-container>
      </div>
    </b-modal>
    <b-modal
      id="modal-review-seller"
      ref="modal-review-seller"
      hide-header
      hide-footer
      v-model="showModalReviewSeller"
    >
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="12"
              ><div class="flex justify-center py-3">
                このレビューを公開しますか？
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="showModalReviewSeller = false"
                  >キャンセル</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-submit"
                  v-on:click="publicReviewSeller(id_review)"
                  >確認</b-button
                >
              </div>
            </b-col></b-row
          >
        </b-container>
      </div>
    </b-modal>
    <!-- Modal Add Delivery? -->
    <b-modal
      id="modal-detail-review"
      v-model="showModalDetailReview"
      hide-footer
      hide-header
      size="md"
    >
      <div class="modal-detail-review w-full flex flex-col">
        <div class="header flex justify-between w-full items-center py-2">
          <div class="header-text">サービスタイプを更新する</div>
          <div class="icon-close">
            <SDIcon
              icon="x"
              size="2x"
              @click="showModalDetailReview = false"
            />
          </div>
        </div>
        <div class="main flex flex-col w-full px-[20px] py-[30px]">
          <!-- <div class="flex w-full items-center my-2">
            <div class="main-label"></div>
            <div class="main-input">
              <div class="w-full relative validate-form">
                <div class="flex items-end">
                  <b-form-checkbox
                    v-model="is_recommended"
                    class="mr-3"
                    size="lg"
                    >おすすめのサービス</b-form-checkbox
                  >
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div class="flex w-full items-center my-2">
            <div class="main-label"></div>
            <div class="main-input">
              <div class="w-full relative validate-form">
                <div class="flex items-end">
                  <b-form-checkbox
                    v-model="is_special"
                    class="mr-3"
                    size="lg"
                    >特集のサービス</b-form-checkbox
                  >
                </div>
              </div>
            </div>
          </div> -->
          <div class="flex w-full items-center my-2">
            <div class="main-label"></div>
            <div class="main-input">
              <div class="w-full relative validate-form">
                <div class="flex items-end">
                  <b-form-checkbox
                    v-model="is_featured"
                    class="mr-3"
                    size="lg"
                    >注目のサービス
                  </b-form-checkbox>
                </div>
              </div>
            </div>
          </div>
          <div class="flex w-full items-center my-2 justify-center">
            <div class="main-btn">
              <button v-on:click="updateReview()">登録する</button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </NuxtLayout>
</template>
 
<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { tableFields } from "@/utils/table-fields";
import { reviewAdminStore } from "@/store/admin/review.ts";
import { useToast } from "vue-toastification";
import { mapState } from "pinia";
import { Message } from "@/utils/message";
import Tables from "@/components/SDTable";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  auth: "admin",
  emits: ["update_page"],
  components: {
    BootstrapIcon,
    Tables,
    SDPreLoad,
  },
  setup() {
    const store = reviewAdminStore();
    const toast = useToast();
    return {
      toast,
      store,
    };
  },
  layout: "admin",
  data() {
    return {
      showModalReview: false,
      showModalReviewSeller: false,
      preload: true,
      preloadTable: false,
      listReviewAdmin: [],
      fields: tableFields.LIST_REVIEW_ADMIN,
      person: null,
      options: [
        { value: 10, text: 10 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
      ],
      id: "",
      id_review: "",
      selectPerPage: 10,
      optionToast: {
        type: "error",
        position: "top-right",
        duration: 1,
        keepOnHover: true,
        singleton: true,
        theme: "toasted-primary",
        iconPack: "material",
        fitToScreen: true,
      },
      dataFilter: {
        id: "",
        buyer_id: "",
        name: "",
        caption: "",
        rating: "",
        description: "",
        is_active: "",
        sort: "",
        sort_type: "",
        page: 1,
      },
      totalPage: 1,
      sortCurrent: null,
      sortType: false,
      currentPage: 1,
      loading: false,
      loadingReset: false,
      detailReview: {},
      is_recommended: false,
      is_special: false,
      is_featured: false,
    };
  },
  created() {
    this.getReviewList();
  },

  computed: {
    ...mapState(reviewAdminStore, [
      "listReviewForAdmin",
      "message",
      "success",
      "error",
    ]),
  },

  watch: {
    listReviewForAdmin() {
      this.preload = true;
      this.preloadTable = false;
      this.listReviewAdmin = this.listReviewForAdmin.data;
      if (this.listReviewAdmin.length > 0) {
        this.listReviewAdmin.forEach(item => {
          if (
            item.sort_type != null &&
            item.sort_type
          ) {
            if (item.sort_type.includes(1)) {
              item.is_recommended = true;
            } else {
              item.is_recommended = false;
            }
            if (item.sort_type.includes(2)) {
              item.is_special = true;
            } else {
              item.is_special = false;
            }
            if (item.sort_type.includes(3)) {
              item.is_featured = true;
            } else {
              item.is_featured = false;
            }
          } else {
            item.is_recommended = false;
            item.is_special = false;
            item.is_featured = false;
          }
        });
      }
      this.totalPage = this.listReviewForAdmin.last_page;
      this.currentPage = this.listReviewForAdmin.current_page;
      this.preload = false;
    },

    selectPerPage() {
      this.getReviewList();
    },

    success() {
      if (this.store.success === true) {
        this.showModalDetailReview = false;
        this.toast.clear();
        this.toast.success(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.getReviewList();
      }
    },

    error() {
      if (this.store.error === true) {
        this.toast.clear();
        this.toast.error(this.store.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
      }
    },
  },

  methods: {
    getReviewList() {
      const {
        id,
        buyer_id,
        name,
        rating,
        description,
        is_active,
        seller_reply,
        is_active_seller,
        sort,
        sort_type,
        page,
      } = this.dataFilter;
      const request = {
        id: id,
        buyer_id: buyer_id,
        name: name,
        rating: rating,
        description: description,
        is_active: is_active,
        seller_reply: seller_reply,
        is_active_seller: is_active_seller,
        sort: sort,
        sort_type: sort_type,
        per_page: this.selectPerPage,
        page: page,
      };
      this.store.getReviewLists(request);
    },

    updatePage(page) {
      this.preloadTable = true;
      (this.dataFilter.page = page), this.getReviewList();
    },

    searchReview() {
      (this.dataFilter.page = 1), this.getReviewList();
    },

    resetFilter() {
      (this.dataFilter = {
        id: "",
        buyer_id: "",
        name: "",
        caption: "",
        rating: "",
        description: "",
        is_active: "",
        sort: 1,
        sort_type: 1,
        page: 1,
      }),
        this.getReviewList();
    },

    publicReview(id) {
      this.store.publicReview(id);
      this.showModalReview = false;
    },

    showModalActive(id) {
      this.id_review = id;
    },

    publicReviewSeller(id) {
      this.store.publicReviewSeller(id);
      this.showModalReviewSeller = false;
    },

    showModalActiveSeller(id) {
      this.id_review = id;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/admin/review/index.scss";
</style>
