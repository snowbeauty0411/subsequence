<template>
  <div class="createService">
    <Header />
    <div class="createService-main w-full">
      <Step1 v-if="this.queryData === 1" />
      <Step2 v-if="this.queryData === 2" />
      <Step3 v-if="this.queryData === 3" />
      <Step4 v-if="this.queryData === 4" />
      <Step5 v-if="this.queryData === 5" />
      <Step6 v-if="this.queryData === 6" />
      <Step7 v-if="this.queryData === 7" />
      <Step8 v-if="this.queryData === 8" />
      <Step9 v-if="this.queryData === 9" />
      <Step10 v-if="this.queryData === 10" />
      <Step11 v-if="this.queryData === 11" />
    </div>
  </div>
</template>

<script>
import Header from "../../../../components/service/create/Header.vue";
import Step1 from "../../../../components/service/create/Step1.vue";
import Step2 from "../../../../components/service/create/Step2.vue";
import Step3 from "../../../../components/service/create/Step3.vue";
import Step4 from "../../../../components/service/create/Step4.vue";
import Step5 from "../../../../components/service/create/Step5.vue";
import Step6 from "../../../../components/service/create/Step6.vue";
import Step7 from "../../../../components/service/create/Step7.vue";
import Step8 from "../../../../components/service/create/Step8.vue";
import Step9 from "../../../../components/service/create/Step9.vue";
import Step10 from "../../../../components/service/create/Step10.vue";
import Step11 from "../../../../components/service/create/Step11.vue";

export default {
  name: "CreateService",
  setup() {
    useHead({
      // title: computed(() => `${route.meta.title}`)
      title: computed(() => `subsQ - サブスクマッチングサービスのサブスキュー`),
    });
  },
  data() {
    return {
      queryData: this.$route.query.step,
    };
  },
  components: {
    Header,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8,
    Step9,
    Step10,
    Step11,
  },
  watch: {
    "$route.query.step"() {
      this.queryData = Number(this.$route.query.step);
    },
  },
  created() {
    this.queryData = Number(this.$route.query.step);
  },
};
</script>

<style>
</style>
