<template>
  <div class="page-service-flow flex flex-col">
    <div class="page-service-flow-title">サービスご利用までの流れ</div>
    <div class="page-service-flow-content-box">
      <div class="page-service-flow-content">
        <SDServiceStep
          v-for="(item, index) in dataStep"
          :key="index"
          :number="'0' + item.number"
          :title="item.title"
          :content="item.content"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
import SDServiceStep from "../../SDServiceStep";
import { ServiceStore } from "@/store/service/index.ts";
import { mapState } from "pinia";
export default {
  name: "FlowService",
  components: { SDServiceStep },
  data() {
    return {
      dataStep: [],
      serviceStore: {},
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
      this.serviceDetail = this.detailService;
      if (this.serviceDetail.steps) {
        this.dataStep = this.serviceDetail.steps;
      }
    },
  },
};
</script>

<style>
</style>