<template>
  <div class="editService">
    <Header />
    <div class="editService-main w-full">
      <SettingsReserve />
    </div>
  </div>
</template>

<script>
import Header from "@/components/service/create/Header.vue";
import SettingsReserve from "@/components/course/create/SettingsReserve.vue";

export default {
  name: "Delivery",
  setup() {
    useHead({
      // title: computed(() => `${route.meta.title}`)
      title: computed(() => `subsQ - サブスクマッチングサービスのサブスキュー`),
    });
  },
  components: {
    Header,
    SettingsReserve,
  },
};
</script>

<style>
</style>
