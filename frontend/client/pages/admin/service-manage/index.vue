<template>
  <NuxtLayout name="admin">
    <SDPreLoad :preload="preload" />
    <div class="fd-admin-listservice">
      <div class="fd-admin-listservice-card">
        <div class="fd-admin-listservice-card-header">
          <div class="fd-admin-listservice-card-select">
            <label for="filter-all">絞り込み:</label>
          </div>
        </div>
        <div class="fd-admin-listservice-card-group">
          <div class="fd-admin-listservice-card-filter">
            <input
              v-model="dataFilter.id"
              v-b-tooltip.hover
              title="ID"
              class="form-control"
              placeholder="ID"
              type="number"
            />
          </div>
          <div class="fd-admin-listservice-card-filter">
            <input
              v-model="dataFilter.seller_id"
              v-b-tooltip.hover
              title="売り手ID"
              class="form-control"
              placeholder="売り手ID"
              type="number"
            />
          </div>
          <div class="fd-admin-listservice-card-filter">
            <b-form-input
              v-model="dataFilter.name"
              v-b-tooltip.hover
              title="サービス名"
              placeholder="サービス名"
            >
              ></b-form-input
            >
          </div>
          <div class="fd-admin-listservice-card-filter">
            <b-form-input
              v-model="dataFilter.caption"
              v-b-tooltip.hover
              title="キャッチコピー"
              placeholder="キャッチコピー"
            >
              ></b-form-input
            >
          </div>
          <div class="fd-admin-listservice-card-filter">
            <b-form-input
              v-model="dataFilter.service_content"
              v-b-tooltip.hover
              title="サービス内容の説明"
              placeholder="サービス内容の説明"
            >
              ></b-form-input
            >
          </div>
          <div class="fd-admin-listuser-card-filter">
            <b-form-select
              v-model="dataFilter.status"
              v-b-tooltip.hover
              title="サービス状態"
              class="form-select-custom"
              v-bind:class="{
                'option-null': dataFilter.status === '',
              }"
            >
              <b-form-select-option v-bind:value="''" style="color: #bebebe"
                >サービス状態</b-form-select-option
              >
              <b-form-select-option v-bind:value="1" style="color: #000"
                >個人</b-form-select-option
              >
              <b-form-select-option v-bind:value="0" style="color: #000"
                >公開</b-form-select-option
              >
            </b-form-select>
          </div>
        </div>
        <div class="custom-group">
          <div class="fd-admin-listservice-card-group mb-custom-20">
            <div
              class="fd-admin-listservice-card-filter"
              v-on:click="searchService()"
            >
              <button class="items-center bg-blue-800">
                <BootstrapIcon class="mx-auto" icon="search" size="sm" />
              </button>
            </div>
            <div class="fd-admin-listservice-card-filter">
              <b-button class="reset-search" v-on:click="resetFilter()">
                <BootstrapIcon class="mx-auto" icon="arrow-repeat" size="sm" />
              </b-button>
            </div>
          </div>
          <div class="fd-admin-listservice-card-select flex mb-4 items-center">
            <label for="filter-all">ページごとに項目数:</label>
            <b-form-select
              v-model="selectPerPage"
              class="select-box form-select-custom"
              v-bind:options="options"
            ></b-form-select>
          </div>
        </div>
        <div class="fd-admin-listservice-card-table">
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
            v-bind:items="listServiceAdmin"
            v-bind:fields="fields"
            v-bind:totalPage="totalPage"
            v-bind:currentPage="currentPage"
            v-on:update_page="updatePage"
          >
            <template #cell(action)="{ item }">
              <b-button
                v-b-tooltip.hover.top
                title="注目のサービスキャンセル"
                class="btn-custom btn-table bg-danger"
                square
                size="sm"
                v-on:click="updateService(item.id, item.is_featured)"
                v-if="item.is_featured === true"
              >
                <BootstrapIcon icon="box-arrow-in-down" />
              </b-button>
              <b-button
                v-b-tooltip.hover.top
                title="注目のサービス設定"
                class="btn-custom btn-table bg-success"
                square
                size="sm"
                v-on:click="updateService(item.id, item.is_featured)"
                v-else
              >
                <BootstrapIcon icon="box-arrow-in-up" />
              </b-button>
            </template>
            <template #cell(enabled)="{ item }">
              <div
                v-if="item.enabled === 0"
                class="group-btn bg-midnight text-tahiti text-center"
              >
                <b-button
                  v-b-tooltip.hover.top
                  title="審査"
                  class="btn-custom btn-danger btn-table bg-danger"
                  square
                  v-on:click="showModalEnabled(item.id)"
                  v-b-modal.modal-service
                  size="sm"
                >
                  審査中
                </b-button>
              </div>
              <div
                v-if="item.enabled === 1"
                class="group-btn bg-midnight text-tahiti text-center"
              >
                承認済み
              </div>
            </template>
            <template #cell(private)="{ item }">
              <div
                v-if="item.private === 1"
                class="group-btn bg-midnight text-tahiti text-center"
              >
                個人
              </div>
              <div
                v-if="item.private === 0"
                class="group-btn bg-midnight text-tahiti text-center"
              >
                公開
              </div>
            </template>
            <template #cell(seller_name)="{ item }">
              <div
                v-if="item.seller && item.seller.account_name"
                class="group-btn bg-midnight text-tahiti text-center"
              >
                {{ item.seller.account_name }}
              </div>
              <div v-else class="group-btn bg-midnight text-tahiti text-center">
                -
              </div>
            </template>
          </Tables>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-service"
      ref="modal-service"
      hide-header
      hide-footer
      v-model="showModalService"
    >
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="12"
              ><div class="flex justify-center py-3">
                このサービスを公開しますか？
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="showModalService = false"
                  >キャンセル</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-submit"
                  v-on:click="publicService(id_service)"
                  >確認</b-button
                >
              </div>
            </b-col></b-row
          >
        </b-container>
      </div>
    </b-modal>
    <b-modal
      id="modal-service"
      ref="modal-service"
      hide-header
      hide-footer
      v-model="showModalServiceEnabled"
    >
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="12"
              ><div class="flex justify-center py-3">
                このサービスを承認しますか。
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="showModalServiceEnabled = false"
                  >キャンセル</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-submit"
                  v-on:click="enabledService(id_service)"
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
      id="modal-detail-service"
      v-model="showModalDetailService"
      hide-footer
      hide-header
      size="md"
    >
      <div class="modal-detail-service w-full flex flex-col">
        <div class="header flex justify-between w-full items-center py-2">
          <div class="header-text">サービスタイプを更新する</div>
          <div class="icon-close">
            <SDIcon
              icon="x"
              size="2x"
              @click="showModalDetailService = false"
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
              <button v-on:click="updateService()">登録する</button>
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
import { serviceAdminStore } from "@/store/admin/service.ts";
import { useToast } from "vue-toastification";
import { mapState } from "pinia";
import { Message } from "@/utils/message";
import Tables from "../../../components/SDTable";
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
    const store = serviceAdminStore();
    const toast = useToast();
    return {
      toast,
      store,
    };
  },
  layout: "admin",
  data() {
    return {
      showModalService: false,
      showModalServiceEnabled: false,
      preload: true,
      preloadTable: false,
      listServiceAdmin: [],
      fields: tableFields.LIST_SERVICE_ADMIN,
      person: null,
      options: [
        { value: 10, text: 10 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
      ],
      id: "",
      id_service: "",
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
        seller_id: "",
        name: "",
        caption: "",
        service_content: "",
        status: "",
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
      detailService: {},
      is_recommended: false,
      is_special: false,
      is_featured: false,
      showModalDetailService: false,
    };
  },
  created() {
    this.getServiceList();
  },

  computed: {
    ...mapState(serviceAdminStore, [
      "listServiceForAdmin",
      "message",
      "success",
      "error",
    ]),
  },

  watch: {
    listServiceForAdmin() {
      this.preload = true;
      this.preloadTable = false;
      this.listServiceAdmin = this.listServiceForAdmin.data;
      if (this.listServiceAdmin.length > 0) {
        this.listServiceAdmin.forEach(item => {
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
      this.totalPage = this.listServiceForAdmin.last_page;
      this.currentPage = this.listServiceForAdmin.current_page;
      this.preload = false;
    },

    selectPerPage() {
      this.getServiceList();
    },

    showModalDetailService() {
      if (this.showModalDetailService === false) {
        this.is_recommended = false;
        this.is_special = false;
        this.is_featured = false;
      }
    },

    success() {
      if (this.store.success === true) {
        this.showModalDetailService = false;
        this.toast.clear();
        this.toast.success(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.getServiceList();
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
    getServiceList() {
      const {
        id,
        seller_id,
        name,
        caption,
        service_content,
        status,
        sort,
        sort_type,
        page,
      } = this.dataFilter;
      const request = {
        id: id,
        seller_id: seller_id,
        name: name,
        caption: caption,
        service_content: service_content,
        private: status,
        sort: sort,
        sort_type: sort_type,
        per_page: this.selectPerPage,
        page: page,
      };
      this.store.getServiceLists(request);
    },

    updatePage(page) {
      this.preloadTable = true;
      (this.dataFilter.page = page), this.getServiceList();
    },

    searchService() {
      (this.dataFilter.page = 1), this.getServiceList();
    },

    showDetailService(item) {
      this.detailService = item;
      if (
        this.detailService.sort_type != null &&
        this.detailService.sort_type
      ) {
        if (this.detailService.sort_type.includes(1)) {
          this.is_recommended = true;
        }
        if (this.detailService.sort_type.includes(2)) {
          this.is_special = true;
        }
        if (this.detailService.sort_type.includes(3)) {
          this.is_featured = true;
        }
      }
      this.showModalDetailService = true;
    },

    updateService(id, is_featured) {
      var type = [];
      // if (this.is_recommended === true) {
      //   type.push(1);
      // }
      // if (this.is_special === true) {
      //   type.push(2);
      // }
      if (is_featured === false) {
        type.push(3);
      }
      const request = {
        id: id,
        sort_type: type.toString(),
      };
      this.store.updateTypeService(request);
    },

    resetFilter() {
      (this.dataFilter = {
        id: "",
        seller_id: "",
        name: "",
        caption: "",
        service_content: "",
        status: "",
        sort: 1,
        sort_type: 1,
        page: 1,
      }),
        this.getServiceList();
    },

    publicService(id) {
      this.store.publicService(id);
      this.showModalService = false;
    },

    enabledService(id) {
      this.store.publicService(id);
      this.showModalService = false;
    },

    showModal(id) {
      this.id_service = id;
    },

    showModalEnabled(id) {
      this.id_service = id;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/admin/service/index.scss";
</style>
