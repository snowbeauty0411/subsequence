<template>
  <div class="editService">
    <Header />
    <div class="editService-main w-full">
      <Step1 v-if="this.queryData === 1" />
      <Step2 v-if="this.queryData === 2" />
      <Step3 v-if="this.queryData === 3" />
      <Step4 v-if="this.queryData === 4" />
      <Step5 v-if="this.queryData === 5" />
      <Step6 v-if="this.queryData === 6" />
      <Step7 v-if="this.queryData === 7" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/service/create/Header.vue";
import Step1 from "@/components/course_draft/create/Step1.vue";
import Step2 from "@/components/course_draft/create/Step2.vue";
import Step3 from "@/components/course_draft/create/Step3.vue";
import Step4 from "@/components/course_draft/create/Step4.vue";
import Step5 from "@/components/course_draft/create/Step5.vue";
import Step6 from "@/components/course_draft/create/Step6.vue";
import Step7 from "@/components/course_draft/create/Step7.vue";

export default {
  name: "CreateCourse",
  setup() {
    useHead({
      // title: computed(() => `${route.meta.title}`)
      title: computed(() => `subsQ - サブスクマッチングサービスのサブスキュー`),
    });
  },
  data() {
    return {
      queryData: null,
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
