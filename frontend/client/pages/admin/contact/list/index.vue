<template>
  <NuxtLayout name="admin">
    <SDPreLoad :preload="preload" />
    <div class="fd-admin-listcontact">
      <div class="fd-admin-listcontact-card">
        <div class="fd-admin-listcontact-card-header">
          <div class="fd-admin-listcontact-card-select">
            <label for="filter-all">絞り込み:</label>
          </div>
        </div>
        <div class="fd-admin-listcontact-card-group">
          <div class="fd-admin-listcontact-card-filter">
            <input
              v-model="dataFilter.id"
              v-b-tooltip.hover
              title="ID"
              class="form-control"
              placeholder="ID"
              type="number"
            />
          </div>
          <div class="fd-admin-listcontact-card-filter">
            <b-form-input
              v-model="dataFilter.name"
              v-b-tooltip.hover
              title="お名前"
              placeholder="お名前"
            >
              ></b-form-input
            >
          </div>
          <div class="fd-admin-listcontact-card-filter">
            <b-form-input
              v-model="dataFilter.email"
              v-b-tooltip.hover
              title="メールアドレス"
              placeholder="メールアドレス"
            >
              ></b-form-input
            >
          </div>
          <div class="fd-admin-listcontact-card-filter">
            <b-form-select
              v-model="dataFilter.status"
              class="form-select-custom"
              v-b-tooltip.hover
              title="ステータス"
              v-bind:class="{
                'option-null': dataFilter.status === '',
              }"
            >
              <b-form-select-option v-bind:value="''" style="color: #bebebe"
                >ステータス</b-form-select-option
              >
              <b-form-select-option v-bind:value="0" style="color: #000"
                >未返信</b-form-select-option
              >
              <b-form-select-option v-bind:value="1" style="color: #000"
                >返信済み</b-form-select-option
              >
            </b-form-select>
          </div>
        </div>
        <div class="custom-group">
          <div class="fd-admin-listcontact-card-group mb-custom-20">
            <div class="fd-admin-listcontact-card-filter">
              <button
                class="items-center bg-blue-800"
                v-on:click="searchContact()"
              >
                <BootstrapIcon class="mx-auto" icon="search" size="sm" />
              </button>
            </div>
            <div class="fd-admin-listcontact-card-filter">
              <b-button class="reset-search" v-on:click="resetFilter()">
                <BootstrapIcon class="mx-auto" icon="arrow-repeat" size="sm" />
              </b-button>
            </div>
          </div>
          <div class="fd-admin-listcontact-card-select flex mb-4 items-center">
            <label for="filter-all">ページごとの表示数:</label>
            <b-form-select
              v-model="selectPerPage"
              class="select-box form-select-custom"
              v-bind:options="options"
            ></b-form-select>
          </div>
        </div>
        <div class="fd-admin-listcontact-card-table">
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
            v-bind:items="listContactAdmin"
            v-bind:fields="fields"
            v-bind:totalPage="totalPage"
            v-bind:currentPage="currentPage"
            v-on:update_page="updatePage"
          >
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
            <template #cell(status)="{ item }">
              <div
                v-if="item.status === 0"
                class="group-btn bg-midnight text-tahiti flex justify-center"
              >
                <div class="mr-3">未返信</div>
                <div>
                  <b-button
                    v-b-tooltip.hover.top
                    title="お問い合わせを回答します"
                    class="btn-custom btn-table bg-secondary"
                    square
                    size="sm"
                    v-on:click="
                      $router.push({ path: `/admin/contact/reply/${item.id}` })
                    "
                  >
                    <BootstrapIcon icon="reply" />
                  </b-button>
                </div>
              </div>
              <div
                v-if="item.status === 1"
                class="group-btn bg-midnight text-tahiti text-center"
              >
                返信済み
              </div>
            </template>
          </Tables>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
 
<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { tableFields } from "@/utils/table-fields";
import { contactAdminStore } from "@/store/admin/contact.ts";
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
    const store = contactAdminStore();
    const toast = useToast();
    return {
      toast,
      store,
    };
  },
  layout: "admin",
  data() {
    return {
      preload: true,
      listContactAdmin: [],
      fields: tableFields.LIST_CONTACT_ADMIN,
      person: null,
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
        email: "",
        status: "",
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
      preloadTable: false,
    };
  },
  created() {
    this.getContactList();
  },

  computed: {
    ...mapState(contactAdminStore, [
      "listContactForAdmin",
      "message",
      "success",
      "error",
    ]),
  },

  watch: {
    listContactForAdmin() {
      this.preloadTable = false;
      this.preload = true;
      this.listContactAdmin = this.listContactForAdmin.data;
      this.totalPage = this.listContactForAdmin.last_page;
      this.currentPage = this.listContactForAdmin.current_page;
      this.preload = false;
    },

    selectPerPage() {
      this.getContactList();
    },

    success() {
      if (this.store.success === true) {
        this.toast.clear();
        this.toast.success(this.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.getContactList();
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
    getContactList() {
      const { id, name, email, status, sort, sort_type, page } =
        this.dataFilter;
      const request = {
        id: id,
        name: name,
        email: email,
        status: status,
        sort: sort,
        sort_type: sort_type,
        per_page: this.selectPerPage,
        page: page,
      };

      this.store.getContactLists(request);
    },

    updatePage(page) {
      this.preloadTable = true;
      (this.dataFilter.page = page), this.getContactList();
    },

    searchContact() {
      (this.dataFilter.page = 1), this.getContactList();
    },

    resetFilter() {
      (this.dataFilter = {
        id: "",
        name: "",
        email: "",
        status: "",
        sort: 1,
        sort_type: 1,
        page: 1,
      }),
        this.getContactList();
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/admin/contact/index.scss";
</style>
