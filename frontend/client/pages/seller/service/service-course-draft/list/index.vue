<template>
  <div class="editService">
    <Header />
    <div class="editService-main w-full">
      <List />
    </div>
  </div>
</template>

<script>
import Header from "@/components/service/create/Header.vue";
import List from "@/components/course_draft/list/index.vue";

export default {
  name: "CreateCourse",
  setup() {
    useHead({
      // title: computed(() => `${route.meta.title}`)
      title: computed(() => `subsQ - サブスクマッチングサービスのサブスキュー`),
    });
  },
  data() {},
  components: {
    Header,
    List,
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
