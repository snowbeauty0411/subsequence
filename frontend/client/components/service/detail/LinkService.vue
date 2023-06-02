<template>
  <div class="page-service-link flex justify-center items-center">
    <div class="page-service-link-text">
      <Nuxt-Link to="/">TOP</Nuxt-Link>
    </div>
    <BootstrapIcon icon="chevron-right" size="sm" class="mx-3" />
    <div class="page-service-link-text">
      <div v-on:click="gotToCategory()">
        {{ category }}
      </div>
    </div>
    <BootstrapIcon icon="chevron-right" size="sm" class="mx-3" />
    <div class="page-service-link-text">
      {{ detailService.name }}
    </div>
  </div>
</template>

<script>
import { ServiceStore } from "@/store/service/index.ts";
import { mapState } from "pinia";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
export default {
  name: "LinkService",
  components: {
    BootstrapIcon,
  },
  data() {
    return {
      account_name: "",
      category: "",
      idCategory: "",
    };
  },
  setup() {
    const serviceStore = ServiceStore();
    return {
      serviceStore,
    };
  },
  computed: {
    ...mapState(ServiceStore, ["detailService"]),
  },
  created() {},
  watch: {
    detailService() {
      if (this.detailService.seller.account_name) {
        this.account_name = this.detailService.seller.account_name;
        if (this.detailService.categories.name) {
          this.category = this.detailService.categories.name;
          this.idCategory = this.detailService.categories.id;
        }
      }
    },
  },
  methods: {
    gotToCategory() {
      this.$router.push(`/category/${this.idCategory}`);
    },
  },
};
</script>

<style>
</style>