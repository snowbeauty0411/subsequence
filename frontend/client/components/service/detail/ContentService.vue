<template>
  <div class="page-service-content flex flex-col">
    <div class="page-service-content-name">サービス内容</div>
    <div class="page-service-content-description">
      {{ serviceDetail.service_content }}
    </div>
    <div class="page-service-content-hashtag flex flex-wrap">
      <button
        class="page-service-content-hashtag-item"
        v-for="(item, index) in serviceDetail.tags"
        :key="index"
        v-on:click="searchHashTag(item.name)"
      >
        {{ item.name }}
      </button>
      <!-- <button
        class="page-service-content-hashtag-item"
        v-for="(item, index) in serviceDetail.favorite_tags"
        :key="index"
        v-on:click="searchHashTag(item.name)"
      >
        {{ item.name }}
      </button> -->
    </div>
  </div>
</template>

<script>
import { ServiceStore } from "@/store/service/index.ts";
import { SearchStore } from "@/store/search/index.ts";
import { mapState } from "pinia";
export default {
  name: "ContentService",
  setup() {
    const serviceStore = ServiceStore();
    const searchStore = SearchStore();
    return {
      serviceStore,
      searchStore,
    };
  },
  computed: {
    ...mapState(ServiceStore, ["detailService"]),
    ...mapState(SearchStore, [
      "success",
      "message",
      "listServiceByStation",
      "error",
    ]),
  },
  created() {},
  data() {
    return {
      serviceDetail: {},
      dataHashTag: [
        { name: "完全栄養", id: 1 },
        { name: "常温保存", id: 2 },
        { name: "AmazonPay対応", id: 3 },
        { name: "継続コース", id: 4 },
        { name: "パスタ", id: 5 },
        { name: "パン", id: 6 },
      ],
    };
  },
  watch: {
    detailService() {
      this.serviceDetail = this.detailService;
    },
  },
  methods: {
    searchHashTag(item) {
      this.$router.push(`/search?hashtag=${item}`);
      // window.scrollTo(0, 0);
    },
  },
};
</script>

<style>
</style>