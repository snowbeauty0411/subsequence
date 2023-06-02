<template>
  <div class="flex flex-col">
    <Header />
    <div class="main-content">
      <div class="flex w-screen">
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
import Cookies from "js-cookie";
export default {
  name: "TopPage",
  components: {
    Header,
    Sidebar,
    Footer,
  },
  setup() {
    const route = useRoute();

    useHead({
      // title: computed(() => `${route.meta.title}`)
      title: computed(() => `subsQ - サブスクマッチングサービスのサブスキュー`),
    });
  },
  created() {
    const type = Cookies.get("type");
    if (type === "ADMIN") {
      Cookies.remove("token_user");
      localStorage.removeItem("token_user");
      localStorage.removeItem("account_id");
      localStorage.removeItem("type");
      Cookies.remove("account_id");
      Cookies.remove("type");
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  min-height: calc(100vh - 290px);
  background: #faf9f3;
  .sdSidebar {
    background: #fff;
    width: 380px;

    @include screen(1280) {
      display: none;
      width: 200px;
      min-height: calc(100% - 160px - 359px);
    }
  }
  .page-content {
    width: calc(100vw - 380px);
    @include screen(1280) {
      width: 100%;
    }
  }
}
</style>
