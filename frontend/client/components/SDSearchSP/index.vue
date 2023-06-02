<template>
    <div class="sdSidebar">
      <div class="flex sdSidebar-search w-full relative">
        <b-form-input
          class="w-full input-search"
          id="input-small"
          size="sm"
          placeholder="キーワードからさがす"
          v-model.trim="keyword"
          v-on:keypress.enter="searchKeyword1()"
        >
        </b-form-input>
        <!-- <BootstrapIcon
          icon="search"
          size="2x"
          class="sdSidebar-icon-category absolute pt-1"
          v-on:click="searchKeyword()"
        /> -->
        <img
          src="@/assets/images/icon.svg"
          alt=""
          class="sdSidebar-icon-category absolute pt-1"
          v-on:click="searchKeyword()"
        />
      </div>
      <div class="mt-5 sdSidebar-search">
        <label class="sdSidebar-titel-search">カテゴリからさがす</label>
        <div
          v-for="(category, index) in searchCategory"
          v-bind:key="index"
          class="pt-3 sidebar-item sdSidebar-list-category"
        >
          <NuxtLink v-bind:to="'/category/' + category.id" target="_top">
            {{ category.name }}
          </NuxtLink>
        </div>
      </div>
      <div class="mt-5 sdSidebar-search">
        <label class="sdSidebar-titel-search">エリアからさがす</label>
        <div
          v-for="(item, index) in dataArea"
          v-bind:key="index"
          class="pt-3 sidebar-item sdSidebar-list-category"
        >
          <NuxtLink v-bind:to="'/search?area=' + item.name" target="_top">
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  <script>
  import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
  import { SearchStore } from "@/store/search";
  import { mapState } from "pinia";
  import { useToast } from "vue-toastification";
  import { Message } from "@/utils/message";
  import Cookies from "js-cookie";
  export default {
    name: "Sidebar",
    setup() {
      const store = SearchStore();
      const toast = useToast();
      return {
        store,
        toast,
      };
    },
    created() {
      this.store.getListCategory();
      this.store.getListArea();
  
      let rememberLogin = localStorage.getItem("rememberLogin");
      let valueToken = null;
      if(rememberLogin === 'true') {
        valueToken = localStorage.getItem("token_user");
      } else {
        valueToken = Cookies.get("token_user");
      }
    },
    computed: {
      ...mapState(SearchStore, [
        "success",
        "message",
        "listCategory",
        "error",
        "listArea",
      ]),
    },
    components: { BootstrapIcon },
    watch: {
      listCategory() {
        this.searchCategory = this.listCategory;
      },
  
      listArea() {
        this.dataArea = this.listArea;
      },
    },
    methods: {
      searchKeyword() {
        if (this.keyword !== null && this.keyword.length > 0) {
          const dataForm = {
            page: 1,
            keyword: this.keyword,
            sort: 0,
          };
          this.store.getListCategoryByKeyword(dataForm);
          this.$router.push(`/search?keyword=${this.keyword}`);
          this.keyword = null;
          window.scrollTo(0, 0);
        } else {
          this.messages = this.messageSearch.keyword;
          this.toast.error(this.messages, this.optionToast);
          this.messages = "";
        }
      },
  
      searchKeyword1() {
        if (this.keyword !== null && this.keyword.length > 0) {
          const dataForm = {
            page: 1,
            keyword: this.keyword,
            sort: 0,
          };
          this.store.getListCategoryByKeyword(dataForm);
          this.$router.push(`/search?keyword=${this.keyword}`);
          this.keyword = null;
          window.scrollTo(0, 0);
        } else {
          this.messages = this.messageSearch.keyword;
          this.toast.error(this.messages, this.optionToast);
          this.messages = "";
        }
      },
  
      // searchArea(keyword) {
      //   const dataForm = {
      //     page: 1,
      //     area: keyword,
      //     sort: 0,
      //   };
      //   this.store.getListCategoryByArea(dataForm);
      //   this.$router.push(`/search?area=${keyword}`);
      //   window.scrollTo(0, 0);
      // },
    },
    data() {
      return {
        keyword: null,
        searchCategory: [],
        searchFromArea: [
          { name: "北海道" },
          { name: "東北" },
          { name: "関東" },
          { name: "中部" },
          { name: "関西" },
          { name: "中国" },
          { name: "四国" },
          { name: "九州" },
        ],
        messages: null,
        messageSearch: Message.SEARCH,
        dataArea: [],
      };
    },
  };
  </script>
  <style lang="scss" scoped>
  .sdSidebar {
     width: 20%;
    min-height: calc(100% - 359px);
    max-height: calc(100% - 359px);
    @include screen(767) {
      height: 100vh;
      background-color: #fff;
      color: #5e5c5c;
      padding: 5rem 1rem 3rem;
      max-height: unset;
    }
    &-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-account {
      a {
        display: block;
        padding: 10px 5px;
        margin-bottom: 10px;
        border-radius: 4px;
        background-color: #ffffff1a;
      }
    }
    &-search {
      .form-control {
        border: unset !important;
        &::placeholder {
          color: #5e5c5c;
        }
      }
      a {
        text-decoration: none;
      }
      .input-search {
        padding-left: unset;
        &::placeholder {
          color: $gray-800 !important;
          font-weight: 600;
          font-size: 16px;
        }
      }
      .sdSidebar-icon-category {
        right: 0px;
        font-size: 22px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
      .sdSidebar-titel-search {
        color: $lightblack;
        font-size: 16px;
        font-weight: bold;
      }
      .sdSidebar-list-category {
        cursor: pointer;
        color: $lightblack;
        font-size: 14px;
        a {
          &:hover {
            color: $orange;
          }
        }
      }
      .sdSidebar-list-category:hover {
        color: $orange;
      }
    }
  }
  </style>
