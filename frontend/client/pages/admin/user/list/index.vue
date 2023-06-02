<template>
  <NuxtLayout name="admin">
    <SDPreLoad :preload="preload" />
    <div class="fd-admin-listuser">
      <b-tabs class="list-tabs" justified>
        <b-tab title="購入者" active>
          <div class="fd-admin-listuser-card">
            <div class="fd-admin-listuser-card-header">
              <div class="fd-admin-listuser-card-select">
                <label for="filter-all">絞り込み:</label>
              </div>
            </div>
            <div class="fd-admin-listuser-card-group">
              <div class="fd-admin-listuser-card-filter">
                <input
                  v-model="dataFilterBuyer.id"
                  v-b-tooltip.hover
                  title="ID"
                  class="form-control"
                  placeholder="ID"
                  type="number"
                />
              </div>
              <div class="fd-admin-listuser-card-filter">
                <b-form-input
                  v-model="dataFilterBuyer.account_name"
                  v-b-tooltip.hover
                  title="ニックネーム"
                  placeholder="ニックネーム"
                >
                  ></b-form-input
                >
              </div>
              <div class="fd-admin-listuser-card-filter">
                <b-form-input
                  v-model="dataFilterBuyer.email"
                  v-b-tooltip.hover
                  title="メールアドレス"
                  placeholder="メールアドレス"
                >
                  ></b-form-input
                >
              </div>
              <div class="fd-admin-listuser-card-filter">
                <b-form-input
                  v-model="dataFilterBuyer.phone_number"
                  v-b-tooltip.hover
                  title="電話番号"
                  placeholder="電話番号"
                  type="number"
                >
                  ></b-form-input
                >
              </div>
              <div class="fd-admin-listuser-card-filter">
                <b-form-select
                  v-model="dataFilterBuyer.identity_verification_status"
                  v-b-tooltip.hover
                  class="form-select-custom"
                  title="本人確認状態"
                  v-bind:class="{
                    'option-null':
                      dataFilterBuyer.identity_verification_status === '',
                  }"
                >
                  <b-form-select-option v-bind:value="''" style="color: #bebebe"
                    >本人確認状態</b-form-select-option
                  >
                  <b-form-select-option v-bind:value="1" style="color: #000"
                    >未確認</b-form-select-option
                  >
                  <b-form-select-option v-bind:value="2" style="color: #000"
                    >確認待ち</b-form-select-option
                  >
                  <b-form-select-option v-bind:value="3" style="color: #000"
                    >拒否</b-form-select-option
                  >
                  <b-form-select-option v-bind:value="4" style="color: #000"
                    >確認済み</b-form-select-option
                  >
                </b-form-select>
              </div>
            </div>
            <div class="custom-group">
              <div class="fd-admin-listuser-card-group mb-custom-20">
                <div class="fd-admin-listuser-card-filter">
                  <button
                    class="items-center bg-blue-800"
                    v-on:click="searchBuyer()"
                  >
                    <BootstrapIcon class="mx-auto" icon="search" size="sm" />
                  </button>
                </div>
                <div class="fd-admin-listuser-card-filter">
                  <b-button
                    class="reset-search"
                    v-on:click="resetFilterBuyer()"
                  >
                    <BootstrapIcon
                      class="mx-auto"
                      icon="arrow-repeat"
                      size="sm"
                    />
                  </b-button>
                </div>
              </div>
              <div class="fd-admin-listuser-card-select flex mb-4 items-center">
                <label for="filter-all">ページごとの表示数:</label>
                <b-form-select
                  v-model="selectPerPageBuyer"
                  class="select-box form-select-custom"
                  v-bind:options="options"
                ></b-form-select>
              </div>
            </div>
            <div class="fd-admin-listuser-card-table">
              <div
                v-if="preloadTableBuyer"
                class="sd-preloads flex justify-center items-center"
              >
                <div class="snippet" data-title=".dot-flashing">
                  <div class="stage">
                    <div class="dot-flashing"></div>
                  </div>
                </div>
              </div>
              <Tables
                v-bind:items="listBuyerAdmin"
                v-bind:fields="fields"
                v-bind:totalPage="totalPageBuyer"
                v-bind:currentPage="currentPageBuyer"
                v-on:update_page="updatePageBuyer"
              >
                <template #header(action)="{ item }">
                  {{ item.label }}
                </template>
                <template #cell(action)="{ item }">
                  <div
                    class="text-center"
                    v-if="item.identity_verification_status"
                  >
                    <!-- <b-row class="flex">
                      <b-col cols="4" class="flex justify-end"> -->
                    <b-button
                      v-b-tooltip.hover.top
                      :title="
                        item.is_blocked === 0
                          ? 'アカウントをロック'
                          : 'アカウントをアンロック'
                      "
                      class="btn-custom btn-table mr-2"
                      :class="
                        item.is_blocked === 0 ? 'bg-success' : 'bg-danger'
                      "
                      square
                      v-on:click="blockUser(item.id)"
                      size="sm"
                      v-if="!item.date_withdrawal"
                    >
                      <BootstrapIcon icon="lock" v-if="item.is_blocked === 1" />
                      <BootstrapIcon icon="unlock" v-else />
                    </b-button>
                    <b-button
                      v-b-tooltip.hover.top
                      class="btn-custom btn-table mr-2"
                      :class="'bg-danger'"
                      square
                      size="sm"
                      disabled
                      v-else
                    >
                      <BootstrapIcon icon="lock" />
                    </b-button>
                    <!-- </b-col>
                      <b-col cols="4" class="flex justify-end"> -->
                    <b-button
                      v-b-tooltip.hover.top
                      title="
                            メッセージ
                          "
                      class="btn-custom btn-table bg-warning mr-2"
                      square
                      v-on:click="chatWithBuyer(item.id)"
                      v-if="!item.date_withdrawal"
                      size="sm"
                    >
                      <BootstrapIcon icon="messenger" />
                    </b-button>
                    <b-button
                      v-b-tooltip.hover.top
                      title="
                            メッセージ
                          "
                      class="btn-custom btn-table bg-warning mr-2"
                      square
                      size="sm"
                      disabled
                      v-else
                    >
                      <BootstrapIcon icon="messenger" />
                    </b-button>
                    <!-- </b-col>
                      <b-col cols="4"> -->
                    <b-button
                      v-b-tooltip.hover.top
                      title="本人確認"
                      variant="info"
                      class="btn-custom btn-table bg-info text-white"
                      square
                      size="sm"
                      v-on:click="
                        $router.push({
                          path: `/admin/user/buyer/${item.id}/honnin`,
                        })
                      "
                      v-if="item.identity_verification_status === 2 && !item.date_withdrawal"
                    >
                      <BootstrapIcon icon="person-badge" />
                    </b-button>
                    <b-button
                      v-b-tooltip.hover.top
                      title="本人確認"
                      variant="info"
                      class="btn-custom btn-table bg-info text-white"
                      square
                      size="sm"
                      v-else
                      disabled
                    >
                      <BootstrapIcon icon="person-badge" />
                    </b-button>
                    <!-- </b-col>
                    </b-row> -->
                  </div>
                </template>
                <template #cell(id)="{ item }">
                  <div>
                    {{ item.id }}
                  </div>
                </template>
                <template #cell(account_name)="{ item }">
                  <div v-if="item.buyers && item.buyers.account_name">
                    {{ item.buyers.account_name }}
                  </div>
                  <div v-else>-</div>
                </template>
                <template #cell(phone_number)="{ item }">
                  <div v-if="item.phone_number">
                    {{ item.phone_number }}
                  </div>
                  <div v-else>-</div>
                </template>
                <template #cell(is_blocked)="{ item }">
                  <b-badge
                    v-bind:variant="
                      getBadge(item.identity_verification_status).status
                    "
                    >{{
                      getBadge(item.identity_verification_status).text
                    }}</b-badge
                  >
                </template>
                <template #cell(reason_withdrawal)="{ item }">
                  <div v-if="item.reason_withdrawal">
                    {{ item.reason_withdrawal }}
                  </div>
                  <div v-else>-</div>
                </template>
                <template #cell(status)="{ item }">
                  <div v-if="item.date_withdrawal">退会済み</div>
                  <div v-else>
                    <div v-if="item.is_blocked === 1">ロック中</div>
                    <div v-else>アクティブ中</div>
                  </div>
                </template>
              </Tables>
            </div>
          </div>
        </b-tab>
        <b-tab title="販売者">
          <div class="fd-admin-listuser-card">
            <div class="fd-admin-listuser-card-header">
              <div class="fd-admin-listuser-card-select">
                <label for="filter-all">絞り込み:</label>
              </div>
            </div>
            <div class="fd-admin-listuser-card-group">
              <div class="fd-admin-listuser-card-filter">
                <input
                  v-model="dataFilterSeller.id"
                  v-b-tooltip.hover
                  title="ID"
                  class="form-control"
                  placeholder="ID"
                  type="number"
                />
              </div>
              <div class="fd-admin-listuser-card-filter">
                <b-form-input
                  v-model="dataFilterSeller.account_name"
                  v-b-tooltip.hover
                  title="ニックネーム"
                  placeholder="ニックネーム"
                >
                  ></b-form-input
                >
              </div>
              <div class="fd-admin-listuser-card-filter">
                <b-form-input
                  v-model="dataFilterSeller.email"
                  v-b-tooltip.hover
                  title="メールアドレス"
                  placeholder="メールアドレス"
                >
                  ></b-form-input
                >
              </div>
              <div class="fd-admin-listuser-card-filter">
                <b-form-input
                  v-model="dataFilterSeller.phone_number"
                  v-b-tooltip.hover
                  title="電話番号"
                  placeholder="電話番号"
                  type="number"
                >
                  ></b-form-input
                >
              </div>
              <div class="fd-admin-listuser-card-filter">
                <b-form-select
                  v-model="dataFilterSeller.identity_verification_status"
                  v-b-tooltip.hover
                  class="form-select-custom"
                  title="本人確認状態"
                  v-bind:class="{
                    'option-null':
                      dataFilterSeller.identity_verification_status === '',
                  }"
                >
                  <b-form-select-option v-bind:value="''" style="color: #bebebe"
                    >本人確認状態</b-form-select-option
                  >
                  <b-form-select-option v-bind:value="1" style="color: #000"
                    >未確認</b-form-select-option
                  >
                  <b-form-select-option v-bind:value="2" style="color: #000"
                    >確認待ち</b-form-select-option
                  >
                  <b-form-select-option v-bind:value="3" style="color: #000"
                    >拒否</b-form-select-option
                  >
                  <b-form-select-option v-bind:value="4" style="color: #000"
                    >確認済み</b-form-select-option
                  >
                </b-form-select>
              </div>
            </div>
            <div class="custom-group">
              <div class="fd-admin-listuser-card-group mb-custom-20">
                <div class="fd-admin-listuser-card-filter">
                  <button
                    class="items-center bg-blue-800"
                    v-on:click="searchSeller()"
                  >
                    <BootstrapIcon class="mx-auto" icon="search" size="sm" />
                  </button>
                </div>
                <div class="fd-admin-listuser-card-filter">
                  <b-button
                    class="reset-search"
                    v-on:click="resetFilterSeller()"
                  >
                    <BootstrapIcon
                      class="mx-auto"
                      icon="arrow-repeat"
                      size="sm"
                    />
                  </b-button>
                </div>
              </div>
              <div class="fd-admin-listuser-card-select flex mb-4 items-center">
                <label for="filter-all">ページごとの表示数:</label>
                <b-form-select
                  v-model="selectPerPageSeller"
                  class="select-box form-select-custom"
                  v-bind:options="options"
                ></b-form-select>
              </div>
            </div>
            <div class="fd-admin-listuser-card-table">
              <div
                v-if="preloadTableSeller"
                class="sd-preloads flex justify-center items-center"
              >
                <div class="snippet" data-title=".dot-flashing">
                  <div class="stage">
                    <div class="dot-flashing"></div>
                  </div>
                </div>
              </div>
              <Tables
                v-bind:items="listSellerAdmin"
                v-bind:fields="fields"
                v-bind:totalPage="totalPageSeller"
                v-bind:currentPage="currentPageSeller"
                v-on:update_page="updatePageSeller"
              >
                <template #header(action)="{ item }">
                  {{ item.label }}
                </template>
                <template #cell(action)="{ item }">
                  <div
                    class="text-left group-btn bg-midnight text-tahiti"
                    v-if="item.identity_verification_status"
                  >
                    <b-row class="flex">
                      <b-col cols="4" class="flex justify-end">
                        <b-button
                          v-b-tooltip.hover.top
                          :title="
                            item.is_blocked === 0
                              ? 'アカウントをロック'
                              : 'アカウントをアンロック'
                          "
                          class="btn-custom btn-table"
                          :class="
                            item.is_blocked === 0 ? 'bg-success' : 'bg-danger'
                          "
                          square
                          v-on:click="blockUser(item.id)"
                          size="sm"
                          v-if="!item.date_withdrawal"
                        >
                          <BootstrapIcon
                            icon="lock"
                            v-if="item.is_blocked === 1"
                          />
                          <BootstrapIcon icon="unlock" v-else />
                        </b-button>
                      </b-col>
                      <b-col cols="4" class="flex justify-end">
                        <b-button
                          v-b-tooltip.hover.top
                          title="
                            メッセージ
                          "
                          class="btn-custom btn-table bg-warning"
                          square
                          v-on:click="chatWithSeller(item.id)"
                          size="sm"
                        >
                          <BootstrapIcon icon="messenger" />
                        </b-button>
                      </b-col>
                      <b-col cols="4">
                        <b-button
                          v-b-tooltip.hover.top
                          title="本人確認"
                          variant="info"
                          class="btn-custom btn-table bg-info text-white"
                          square
                          size="sm"
                          v-on:click="
                            $router.push({
                              path: `/admin/user/seller/${item.id}/honnin`,
                            })
                          "
                          v-if="item.identity_verification_status !== 4"
                        >
                          <BootstrapIcon icon="person-badge" />
                        </b-button>
                      </b-col>
                    </b-row>
                  </div>
                </template>
                <template #cell(id)="{ item }">
                  <div>
                    {{ item.id }}
                  </div>
                </template>
                <template #cell(account_name)="{ item }">
                  <div v-if="item.sellers && item.sellers.account_name">
                    {{ item.sellers.account_name }}
                  </div>
                  <div v-else>-</div>
                </template>
                <template #cell(phone_number)="{ item }">
                  <div v-if="item.phone_number">
                    {{ item.phone_number }}
                  </div>
                  <div v-else>-</div>
                </template>
                <template #cell(is_blocked)="{ item }">
                  <b-badge
                    v-bind:variant="
                      getBadge(item.identity_verification_status).status
                    "
                    >{{
                      getBadge(item.identity_verification_status).text
                    }}</b-badge
                  >
                </template>
                <template #cell(reason_withdrawal)="{ item }">
                  <div v-if="item.reason_withdrawal">
                    {{ item.reason_withdrawal }}
                  </div>
                  <div v-else>-</div>
                </template>
                <template #cell(status)="{ item }">
                  <div v-if="item.date_withdrawal">退会済み</div>
                  <div v-else>
                    <div v-if="item.is_blocked === 1">ロック中</div>
                    <div v-else>アクティブ中</div>
                  </div>
                </template>
              </Tables>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </NuxtLayout>
</template>
 
<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { tableFields } from "@/utils/table-fields";
import { usersAdminStore } from "@/store/admin/user.ts";
import { useToast } from "vue-toastification";
import { mapState } from "pinia";
import { Message } from "@/utils/message";
import Tables from "../../../../components/SDTable";
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
    const userAdminStore = usersAdminStore();
    const toast = useToast();
    return {
      toast,
      userAdminStore,
    };
  },
  layout: "admin",
  data() {
    return {
      preload: true,
      preloadTableBuyer: false,
      preloadTableSeller: false,
      listBuyerAdmin: [],
      listSellerAdmin: [],
      fields: tableFields.LIST_USER_ADMIN,
      person: null,
      options: [
        { value: 10, text: 10 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
      ],
      id: "",
      selectPerPageBuyer: 10,
      selectPerPageSeller: 10,
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
      dataFilterBuyer: {
        id: "",
        full_name: "",
        account_name: "",
        email: "",
        phone_number: "",
        identity_verification_status: "",
        sort: "",
        sort_type: "",
        is_blocked: "",
        page: "",
      },
      dataFilterSeller: {
        id: "",
        full_name: "",
        account_name: "",
        email: "",
        phone_number: "",
        identity_verification_status: "",
        sort: "",
        sort_type: "",
        is_blocked: "",
        page: "",
      },
      totalPageBuyer: 1,
      totalPageSeller: 1,
      sortCurrent: null,
      sortType: false,
      currentPageBuyer: 1,
      currentPageSeller: 1,
      loading: false,
      loadingReset: false,
    };
  },
  created() {
    this.getBuyerLists();
    this.getSellerLists();
  },

  computed: {
    ...mapState(usersAdminStore, [
      "listBuyers",
      "listSellers",
      "message",
      "success",
      "error",
      "createSuccess",
      "threadId",
    ]),
  },

  watch: {
    listBuyers() {
      this.preload = true;
      this.preloadTableBuyer = false;
      this.listBuyerAdmin = this.listBuyers.data;
      this.totalPageBuyer = this.listBuyers.last_page;
      this.currentPageBuyer = this.listBuyers.current_page;
      this.preload = false;
    },

    listSellers() {
      this.preload = true;
      this.preloadTableSeller = false;
      this.listSellerAdmin = this.listSellers.data;
      this.totalPageSeller = this.listSellers.last_page;
      this.currentPageSeller = this.listSellers.current_page;
      this.preload = false;
    },

    createSuccess() {
      if (this.createSuccess) {
        this.userAdminStore.createSuccess = "";
        this.$router.push(`/admin/chat/thread/${this.threadId}`);
      }
    },

    selectPerPageBuyer() {
      (this.dataFilterBuyer.page = 1), this.getBuyerLists();
    },

    selectPerPageSeller() {
      (this.dataFilterSeller.page = 1), this.getSellerLists();
    },

    success() {
      if (this.userAdminStore.success === true) {
        this.toast.clear();
        this.toast.success(this.userAdminStore.message, this.optionToast);
        this.userAdminStore.success = "";
        this.userAdminStore.message = "";
        this.getBuyerLists();
        this.getSellerLists();
      }
    },

    error() {
      if (this.userAdminStore.error === true) {
        this.toast.clear();
        this.toast.error(this.userAdminStore.message, this.optionToast);
        this.userAdminStore.error = "";
        this.userAdminStore.message = "";
      }
    },
  },

  methods: {
    getBadge(status) {
      switch (status) {
        case 2:
          return {
            status: "warning",
            text: "確認待ち",
          };
        case 3:
          return {
            status: "danger",
            text: "拒否",
          };
        case 4:
          return {
            status: "success",
            text: "確認済み",
          };
        default:
          return {
            status: "secondary",
            text: "未確認",
          };
      }
    },

    getBuyerLists() {
      const {
        id,
        email,
        phone_number,
        account_name,
        full_name,
        is_blocked,
        identity_verification_status,
        page,
      } = this.dataFilterBuyer;
      const request = {
        id: id,
        email: email,
        phone_number: phone_number,
        account_name: account_name,
        full_name: full_name,
        is_blocked: is_blocked,
        identification_verify_status: identity_verification_status,
        sort: 1,
        sort_type: 1,
        per_page: this.selectPerPageBuyer,
        page: page,
      };

      this.userAdminStore.getBuyerLists(request);
    },

    getSellerLists() {
      const {
        id,
        email,
        phone_number,
        account_name,
        full_name,
        is_blocked,
        identity_verification_status,
        page,
      } = this.dataFilterSeller;
      const request = {
        id: id,
        email: email,
        phone_number: phone_number,
        account_name: account_name,
        full_name: full_name,
        is_blocked: is_blocked,
        identification_verify_status: identity_verification_status,
        sort: 1,
        sort_type: 1,
        per_page: this.selectPerPageSeller,
        page: page,
      };

      this.userAdminStore.getSellerLists(request);
    },

    updatePageBuyer(page) {
      this.preloadTableBuyer = true;
      (this.dataFilterBuyer.page = page), this.getBuyerLists();
    },

    updatePageSeller(page) {
      this.preloadTableSeller = true;
      (this.dataFilterSeller.page = page), this.getSellerLists();
    },

    searchBuyer() {
      (this.dataFilterBuyer.page = 1), this.getBuyerLists();
    },

    searchSeller() {
      (this.dataFilterSeller.page = 1), this.getSellerLists();
    },

    resetFilterBuyer() {
      (this.dataFilterBuyer = {
        id: "",
        full_name: "",
        account_name: "",
        email: "",
        phone_number: "",
        identity_verification_status: "",
        sort: 1,
        sort_type: 1,
        is_blocked: "",
        per_page: "1",
        page: 1,
      }),
        this.getBuyerLists();
    },

    resetFilterSeller() {
      (this.dataFilterSeller = {
        id: "",
        full_name: "",
        account_name: "",
        email: "",
        phone_number: "",
        identity_verification_status: "",
        sort: 1,
        sort_type: 1,
        is_blocked: "",
        per_page: "1",
        page: 1,
      }),
        this.getSellerLists();
    },

    blockUser(userID) {
      this.userAdminStore.blockUserStore(userID);
    },

    chatWithSeller(userID) {
      var request = {
        seller_id: userID,
      };
      this.userAdminStore.chatToSeller(request);
    },

    chatWithBuyer(userID) {
      var request = {
        buyer_id: userID,
      };
      this.userAdminStore.chatToBuyer(request);
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/admin/user/main.scss";
</style>
