<template>
  <div>
    <div class="flex container-seller">
      <SDSidebarManage />
      <div class="main-container flex flex-col">
        <div class="sm-d-none">
          <SDHeaderManage :username="dataAccount.account_name" />
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
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import Cookies from "js-cookie";

export default {
  name: "Seller",
  setup() {
    const store = sellerStore();
    const route = useRoute();

    useHead({
      // title: computed(() => `${route.meta.title}`)
      title: computed(() => `subsQ - サブスクマッチングサービスのサブスキュー`),
    });

    return {
      store,
    };
  },
  components: {
    SDSidebarManage,
    SDHeaderManage,
    SDHeader,
    SDFooter,
  },
  data() {
    return {
      account_id: null,
    };
  },
  computed: {
    ...mapState(sellerStore, ["dataAccount", "success"]),
  },
  created() {
    let valueToken = null;
    let rememberLogin = localStorage.getItem("rememberLogin");
    let user_type = null;

    if (rememberLogin === "true") {
      valueToken = localStorage.getItem("token_user");
      this.account_id = localStorage.getItem("account_id");
      user_type = localStorage.getItem("account_id");
    } else {
      valueToken = Cookies.get("token_user");
      this.account_id = Cookies.get("account_id");
      user_type = Cookies.get("account_id");
    }
    if (!valueToken) {
      this.$router.push("/login");
    } else {
      if (user_type === "BUYER" || user_type === "ADMIN") {
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
<style lang="scss">
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
.container-seller {
  background-color: $lightwhite !important;
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
