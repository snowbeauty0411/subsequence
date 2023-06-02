<template>
  <div>
    <div class="flex container-buyer">
      <SDSidebarManage />
      <div class="main-container flex flex-col min-height-none">
        <div class="sm-d-none">
          <SDHeaderManage :username="dataAccountBuyer.account_name" />
        </div>
        <div class="sm-d-block">
          <SDHeader />
        </div>
        <div class="main-content w-full">
          <slot />
        </div>
      </div>
    </div>
    <SDFooter />
  </div>
</template>

<script>
import SDSidebarManage from "@/components/SDSidebarManage";
import SDHeader from "@/components/SDHeader";
import SDHeaderManage from "@/components/SDHeaderManage";
import SDFooter from "@/components/SDFooter";
import { buyerStore } from "@/store/buyer";
import { mapState } from "pinia";
import Cookies from "js-cookie";

export default {
  name: "Buyer",
  components: {
    SDSidebarManage,
    SDHeaderManage,
    SDHeader,
    SDFooter,
  },
  setup() {
    const store = buyerStore();
    const route = useRoute();

    useHead({
      // title: computed(() => `${route.meta.title}`)
      title: computed(() => `subsQ - サブスクマッチングサービスのサブスキュー`),
    });

    return {
      store,
    };
  },
  data() {
    return {
      account_id: null,
    };
  },
  computed: {
    ...mapState(buyerStore, ["dataAccountBuyer", "success"]),
  },
  created() {
    let valueToken = null;
    let rememberLogin = localStorage.getItem("rememberLogin");
    let user_type = "";
    if (rememberLogin === "true") {
      valueToken = localStorage.getItem("token_user");
      this.account_id = localStorage.getItem("account_id");
      user_type = localStorage.getItem("type");
    } else {
      valueToken = Cookies.get("token_user");
      this.account_id = Cookies.get("account_id");
      user_type = Cookies.get("type");
    }
    if (!valueToken) {
      this.$router.push("/login");
    } else {
      if (user_type === "SELLER" || user_type === "ADMIN") {
        Cookies.remove("token_user");
        localStorage.removeItem("token_user");
        localStorage.removeItem("account_id");
        localStorage.removeItem("type");
        Cookies.remove("account_id");
        Cookies.remove("type");
        this.$router.push("/login");
      }
    }
    this.store.getAccount(this.account_id);
  },
};
</script>
<style lang="scss" scoped>
.sm-d-none {
  @include screen(480) {
    display: none;
  }
}
.sm-d-block {
  display: none;
  @include screen(480) {
    display: block;
  }
}
.container-buyer {
  background-color: $lightwhite !important;
  .min-height-none {
    min-height: auto;
  }
  .sidebar {
    @include screen(1280) {
      display: none;
    }
  }
  .header-manage {
    background: $lightwhite;
    @include screen(480) {
      background: $white;
    }
  }
}
</style>
