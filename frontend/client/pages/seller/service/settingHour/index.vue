<template>
  <div class="editService">
    <Header />
    <div class="editService-main w-full">
      <SettingHour />
    </div>
  </div>
</template>

<script>
import Header from "@/components/service/create/Header.vue";
import SettingHour from "@/components/service/create/SettingsHour.vue";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";

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
    SettingHour,
  },
};
</script>

<style>
</style>
