<template>
  <div class="flex flex-col">
    <Header />
    <div class="main-content">
      <div class="flex">
        <Sidebar />
        <div class="page-content"><slot /></div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/SDHeader";
import Sidebar from "@/components/SDSideBar";
import Footer from "@/components/SDFooter";
export default {
  name: "TopPage",
  components: {
    Header,
    Sidebar,
    Footer,
  },
  setup() {
    const route = useRoute()

    useHead({
      // title: computed(() => `${route.meta.title}`)
      title: computed(() => `subsQ - サブスクマッチングサービスのサブスキュー`),
    });
  }
};
</script>

<style lang="scss" scoped>
.main-content {
  min-height: calc(100vh - 290px);
  background: $white;
  .sdSidebar {
    background: $white;
    @include screen(991) {
      display: none;
    }
  }
  .page-content {
    width: calc(100% - 396px);
    @include screen(991) {
      width: 100%;
    }
  }
}
</style>
