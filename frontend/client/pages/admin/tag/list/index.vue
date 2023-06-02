<template>
  <NuxtLayout name="admin">
    <SDPreLoad :preload="preload" />
    <div class="fd-admin-listtag">
      <div class="fd-admin-listtag-card">
        <div class="fd-admin-listtag-card-header">
          <div class="fd-admin-listtag-card-select">
            <label for="filter-all">絞り込み:</label>
          </div>
        </div>
        <div class="fd-admin-listtag-card-group">
          <div class="fd-admin-listtag-card-filter">
            <input
              v-model="dataFilter.id"
              v-b-tooltip.hover
              title="ID"
              class="form-control"
              placeholder="ID"
              type="number"
            />
          </div>
          <div class="fd-admin-listtag-card-filter">
            <b-form-input
              v-model="dataFilter.name"
              v-b-tooltip.hover
              title="タグ名"
              placeholder="タグ名"
            >
              ></b-form-input
            >
          </div>
          <div class="fd-admin-listtag-card-filter">
            <b-form-input
              v-model="dataFilter.amount_registed"
              v-b-tooltip.hover
              title="登録数量"
              placeholder="登録数量"
              type="number"
            >
              ></b-form-input
            >
          </div>
        </div>
        <div class="custom-group">
          <div class="fd-admin-listtag-card-group mb-custom-20">
            <div class="fd-admin-listtag-card-filter">
              <b-button class="add-tag" v-on:click="$router.push({ path: `/admin/tag/create` })">
                <BootstrapIcon
                  class="mx-auto"
                  icon="plus-circle"
                  size="sm"
                />
              </b-button>
            </div>
            <div class="fd-admin-listtag-card-filter">
              <button class="items-center bg-blue-800" v-on:click="searchTag()">
                <BootstrapIcon class="mx-auto" icon="search" size="sm" />
              </button>
            </div>
            <div class="fd-admin-listtag-card-filter">
              <b-button class="reset-search" v-on:click="resetFilter()">
                <BootstrapIcon
                  class="mx-auto"
                  icon="arrow-repeat"
                  size="sm"
                />
              </b-button>
            </div>
          </div>
          <div class="fd-admin-listtag-card-select flex mb-4 items-center">
            <label for="filter-all">ページごとの表示数:</label>
            <b-form-select
              v-model="selectPerPage"
              class="select-box form-select-custom"
              v-bind:options="options"
            ></b-form-select>
          </div>
        </div>
        <div class="fd-admin-listtag-card-table">
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
            v-bind:items="listTagAdmin"
            v-bind:fields="fields"
            v-bind:totalPage="totalPage"
            v-bind:currentPage="currentPage"
            v-on:update_page="updatePage"
          >
            <template #header(action)="{ item }">
              <div>
                {{ item.label }}
              </div>
            </template>
            <template #cell(action)="{ item }">
              <div class="group-btn bg-midnight text-tahiti">
                <b-button
                  v-b-tooltip.hover.top
                  title="編集"
                  class="btn-custom btn-table bg-secondary"
                  square
                  size="sm"
                  v-on:click="
                    $router.push({ path: `/admin/tag/${item.id}/edit` })
                  "
                >
                  <BootstrapIcon icon="pencil-square" />
                </b-button>
                <b-button
                  v-b-tooltip.hover.top
                  title="削除"
                  class="btn-custom btn-danger btn-table bg-danger"
                  square
                  v-on:click="showModal(item.id)"
                  v-b-modal.modal-tag
                  size="sm"
                >
                  <BootstrapIcon icon="trash-fill" />
                </b-button>
              </div>
            </template>
            <template #cell(created_at)="{ item }">
              <div
                v-if="item.created_at"
                class="group-btn bg-midnight text-tahiti"
              >
                {{ $moment(item.created_at).format("YYYY/MM/DD HH:mm") }}
              </div>
            </template>
            <template #cell(updated_at)="{ item }">
              <div
                v-if="item.updated_at"
                class="group-btn bg-midnight text-tahiti"
              >
                {{ $moment(item.updated_at).format("YYYY/MM/DD HH:mm") }}
              </div>
            </template>
          </Tables>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-tag"
      ref="modal-tag"
      hide-header
      hide-footer
      v-model="showModalTag"
    >
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="12"
              ><div class="flex justify-center py-3">
                タグ情報を削除します。よろしいですか
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="showModalTag = false"
                  >キャンセル</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-submit"
                  v-on:click="deleteTag(tag_id)"
                  >確認</b-button
                >
              </div>
            </b-col></b-row
          >
        </b-container>
      </div>
    </b-modal>
  </NuxtLayout>
</template>
 
<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { tableFields } from "@/utils/table-fields";
import { tagAdminStore } from "@/store/admin/tag.ts";
import { useToast } from "vue-toastification";
import { mapState } from "pinia";
import { Message } from "@/utils/message";
import Tables from "../../../../components/SDTable";
import 'moment/locale/ja';
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
    const store = tagAdminStore();
    const toast = useToast();
    return {
      toast,
      store,
    };
  },
  layout: "admin",
  data() {
    return {
      showModalTag: false,
      preload: true,
      preloadTable: false,
      listTagAdmin: [],
      fields: tableFields.LIST_TAG_ADMIN,
      person: null,
      tag_id: null,
      options: [
        { value: 10, text: 10 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
      ],
      id: "",
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
        name: "",
        amount_registed: "",
        sort: "",
        sort_type: "",
        page: "",
      },
      totalPage: 1,
      sortCurrent: null,
      sortType: false,
      currentPage: 1,
      loading: false,
      loadingReset: false,
    };
  },
  created() {
    this.getTagList();
  },

  computed: {
    ...mapState(tagAdminStore, [
      "listTagForAdmin",
      "message",
      "success",
      "error",
    ]),
  },

  watch: {
    listTagForAdmin() {
      this.preload = true;
      this.preloadTable = false;
      this.listTagAdmin = this.listTagForAdmin.data;
      this.totalPage = this.listTagForAdmin.last_page;
      this.currentPage = this.listTagForAdmin.current_page;
      this.preload = false;
    },

    selectPerPage() {
      this.getTagList();
    },

    success() {
      if (this.store.success === true) {
        this.toast.clear();
        this.toast.success(this.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.getTagList();
      }
    },

    error() {
      if (this.store.error === true) {
        this.toast.clear();
        this.toast.error(this.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
      }
    },
  },

  methods: {
    getTagList() {
      const { id, name, amount_registed, sort, sort_type, page } =
        this.dataFilter;
      const request = {
        id: id,
        name: name,
        amount_registed: amount_registed,
        sort: sort,
        sort_type: sort_type,
        per_page: this.selectPerPage,
        page: page,
      };

      this.store.getTagLists(request);
    },

    updatePage(page) {
      this.preloadTable = true;
      (this.dataFilter.page = page), this.getTagList();
    },

    searchTag() {
      (this.dataFilter.page = 1), this.getTagList();
    },

    resetFilter() {
      (this.dataFilter = {
        id: "",
        name: "",
        amount_registed: "",
        sort: 1,
        sort_type: 1,
        page: 1,
      }),
        this.getTagList();
    },

    deleteTag(id) {
      this.store.deleteTag(id);
      this.showModalTag = false;
    },

    showModal(id) {
      this.tag_id = id;
    }
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/admin/tag/index.scss";
</style>
