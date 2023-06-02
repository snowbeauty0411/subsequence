<template>
  <NuxtLayout name="admin">
    <SDPreLoad :preload="preload" />
    <div class="sdAdmin-paymentList">
      <div class="sdAdmin-paymentList-card">
        <div class="sdAdmin-paymentList-card-header">
          <div class="sdAdmin-paymentList-card-select">
            <label for="filter-all">絞り込み:</label>
          </div>
        </div>
        <div class="sdAdmin-paymentList-card-group">
          <div class="sdAdmin-paymentList-card-filter">
            <b-form-input
              v-model="dataFilter.name"
              v-b-tooltip.hover
              title="アカウント名"
              placeholder="アカウント名"
            >
              ></b-form-input
            >
          </div>
          <div class="sdAdmin-paymentList-card-filter">
            <b-form-select
              class="form-select-custom"
              v-model="dataFilter.status"
              v-b-tooltip.hover
              title="状態"
              v-bind:class="{
                'option-null': dataFilter.status === '',
              }"
            >
              <b-form-select-option
                v-bind:value="'振込済み'"
                style="color: #000"
                >振込済み</b-form-select-option
              >
              <b-form-select-option v-bind:value="'未振込'" style="color: #000"
                >未振込</b-form-select-option
              >
            </b-form-select>
          </div>
        </div>
        <div class="custom-group">
          <div class="sdAdmin-paymentList-card-group mb-custom-20">
            <div class="sdAdmin-paymentList-card-filter">
              <button
                class="items-center bg-blue-800"
                v-on:click="searchTransfer()"
              >
                <BootstrapIcon class="mx-auto" icon="search" size="sm" />
              </button>
            </div>
            <div class="sdAdmin-paymentList-card-filter">
              <b-button class="reset-search" v-on:click="resetFilter()">
                <BootstrapIcon class="mx-auto" icon="arrow-repeat" size="sm" />
              </b-button>
            </div>
          </div>
          <div class="sdAdmin-paymentList-card-select flex mb-4 items-center">
            <label for="filter-all">ページごとの表示数:</label>
            <b-form-select
              v-model="selectPerPage"
              class="select-box form-select-custom"
              v-bind:options="options"
            ></b-form-select>
          </div>
        </div>
        <div class="sdAdmin-paymentList-card-table">
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
            v-bind:items="listTransfer"
            v-bind:fields="fields"
            v-bind:totalPage="totalPage"
            v-bind:currentPage="currentPage"
            v-on:update_page="updatePage"
          >
            <template #cell(account_name)="{ item }">
              <div>
                {{ item.seller.account_name }}
              </div>
            </template>
            <template #cell(transfer_amount)="{ item }">
              <div>
                {{ formatPrice(parseInt(item.transfer_amount)) }}
              </div>
            </template>
            <template #cell(transfer_fee)="{ item }">
              <div>
                {{ formatPrice(parseInt(item.transfer_fee)) }}
              </div>
            </template>

            <template #cell(account_number)="{ item }">
              <div>
                {{ item.seller_card_info.account_number }}
              </div>
            </template>
            <template #cell(account_holder)="{ item }">
              <div>
                {{ item.seller_card_info.account_holder }}
              </div>
            </template>
            <template #cell(financial_institution_name)="{ item }">
              <div>
                {{ item.seller_card_info.financial_institution_name }}
              </div>
            </template>
            <template #cell(created_at)="{ item }">
              <div>
                {{ $moment(item.created_at).format("YYYY-MM-DD HH:mm") }}
              </div>
            </template>
            <template #cell(status)="{ item }">
              <div v-if="item.status === 1">振込済み</div>
              <div
                class="bg-[#C0DB5B] p-2 rounded-2xl text-[#fff] cursor-pointer"
                v-if="item.status === 0"
                v-on:click="showModalConfirm(item.id)"
              >
                未振込
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
      v-model="confirmTransfer"
    >
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="12"
              ><div class="flex justify-center py-3">
                振り込んでもよろしいですか？
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="confirmTransfer = false"
                  >いいえ</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-submit"
                  v-on:click="completedTransfer(tag_id)"
                  >はい</b-button
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
import { transferAdminStore } from "@/store/admin/transfer.ts";
import { useToast } from "vue-toastification";
import { mapState } from "pinia";
import Tables from "../../../../components/SDTable";
import moment from "moment";
import SDPreLoad from "@/components/SDPreLoad";
import "moment/locale/ja";

export default {
  auth: "admin",
  emits: ["update_page"],
  components: {
    BootstrapIcon,
    Tables,
    SDPreLoad,
  },
  setup() {
    const store = transferAdminStore();
    const toast = useToast();
    return {
      toast,
      store,
    };
  },
  layout: "admin",
  data() {
    return {
      confirmTransfer: false,
      preload: true,
      preloadTable: false,
      listTransfer: [],
      fields: tableFields.LIST_TRANSFER_ADMIN,
      person: null,
      moment: false,
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
        name: "",
        status: "",
        page: "",
        created_at: "",
      },
      totalPage: 1,
      sortCurrent: null,
      sortType: false,
      currentPage: 1,
      loading: false,
      loadingReset: false,
      idTransfer: "",
      statusFormat: "",
    };
  },
  created() {
    this.moment = moment;
    this.getTransferList();
  },

  computed: {
    ...mapState(transferAdminStore, [
      "listTransferAdmin",
      "message",
      "success",
      "error",
    ]),
  },

  watch: {
    listTransferAdmin() {
      this.preload = true;
      this.preloadTable = false;
      this.listTransfer = this.listTransferAdmin.data;
      this.totalPage = this.listTransferAdmin.last_page;
      this.currentPage = this.listTransferAdmin.current_page;
      this.preload = false;
    },

    selectPerPage() {
      this.getTransferList();
    },

    success() {
      if (this.store.success === true) {
        this.toast.clear();
        this.toast.success(this.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.getTransferList();
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
    showModalConfirm(id) {
      this.confirmTransfer = true;
      this.idTransfer = id;
    },

    getTransferList() {
      const { name, page, status } = this.dataFilter;
      if (status === "振込済み") {
        this.statusFormat = 1;
      }
      if (status === "未振込") {
        this.statusFormat = 0;
      }
      const request = {
        seller_name: name,
        per_page: this.selectPerPage,
        page: page,
        status: this.statusFormat,
      };

      this.store.getListTransferAdmin(request);
    },

    updatePage(page) {
      this.preloadTable = true;
      (this.dataFilter.page = page), this.getTransferList();
    },

    searchTransfer() {
      (this.dataFilter.page = 1), this.getTransferList();
    },

    resetFilter() {
      this.statusFormat = "";
      (this.dataFilter = {
        name: "",
        page: 1,
        status: "",
      }),
        this.getTransferList();
    },

    async completedTransfer() {
      await this.store.completedTransferAdmin(this.idTransfer);
      this.confirmTransfer = false;
    },

    formatPrice(value) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/admin/payment/index.scss";
</style>
