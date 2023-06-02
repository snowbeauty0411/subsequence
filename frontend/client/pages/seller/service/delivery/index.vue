<template>
  <div class="editService">
    <Header />
    <div class="editService-main w-full">
      <SettingsDelivery />
    </div>
  </div>
</template>

<script>
import Header from "@/components/service/create/Header.vue";
import SettingsDelivery from "@/components/course/create/SettingsDelivery.vue";

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
    SettingsDelivery,
  },
};
</script>

<style>
</style>
