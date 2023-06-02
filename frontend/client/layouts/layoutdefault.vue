<template>
  <div class="flex flex-col">
    <Header />
    <div class="main-content w-full">
      <div class="page-content"><slot /></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/SDHeader";
import Footer from "@/components/SDFooter";
import Cookies from "js-cookie";
export default {
  name: "LayoutDefault",
  components: {
    Header,
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
    let rememberLogin = localStorage.getItem("rememberLogin");
    let type = "";
    if (rememberLogin === "true") {
      type = localStorage.getItem("type");
    } else {
      type = Cookies.get("type");
    }
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
  .page-content {
    @include screen(991) {
      width: 100%;
    }
  }
}
</style>
