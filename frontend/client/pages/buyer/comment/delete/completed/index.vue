<template>
  <b-container fluid class="page-delete-completed w-full">
    <b-row class="w-full">
      <b-col cols="12" class="flex sm-d-none">
        <div class="mb-5 flex flex-col">
          <div class="page-delete-completed-link flex items-center flex-wrap">
            <div>
              <NuxtLink to="/buyer/service/management">サービス管理</NuxtLink>
            </div>
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <NuxtLink
              v-bind:to="'/buyer/service/service-manage/' + detailServiceBuyer.hash_id"
              >{{ detailServiceBuyer.name }}</NuxtLink
            >
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <NuxtLink
              v-bind:to="
                '/buyer/comment/post/' + detailServiceBuyer.id
              "
              >レビュー削除の確認</NuxtLink
            >
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <div>削除完了</div>
          </div>
          <div class="page-delete-completed-text">削除完了</div>
        </div>
      </b-col>

      <b-col cols="12">
        <div class="page-delete-completed-button">
          <div class="page-delete-completed-title">
            レビューの削除が完了しました。
          </div>
          <div class="page-delete-completed-description">
            今後のサービス向上に役立てさせていただくため、またのご意見、ご感想をお聞かせいただける機会をお待ちしております。
          </div>
          <b-button class="button-submit w-full" v-on:click="goToTopPage()"
            >サービス管理TOPへ戻る</b-button
          >
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { buyerStore } from "@/store/buyer";
import { mapState } from "pinia";

export default {
  setup() {
    const store = buyerStore();
    return {
      store,
    };
  },
  components: {
    BootstrapIcon,
  },
  data() {
    return {
      detailServiceBuyer: {},
      id: null,
    };
  },
  created() {
    if (!localStorage.getItem("id_service")) {
      this.$router.push("/buyer/service/management");
    }
    this.id = localStorage.getItem("id_service");
    this.store.getDetailServiceByHashId(this.id);
  },
  computed: {
    ...mapState(buyerStore, ["detailServiceByHashId"]),
  },
  watch: {
    detailServiceByHashId() {
      this.detailServiceBuyer = this.detailServiceByHashId;
    },
  },
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      localStorage.removeItem("id_service");
    });
  },
  methods: {
    goToTopPage() {
      this.$router.push("/buyer/service/management");
    },
  },
};
definePageMeta({
  layout: "buyer",
});
</script>

<style lang="scss" scoped>
.page-delete-completed {
  .sm-d-none{
    display: none;
  }
  padding: 0 100px 100px 100px;
  @include screen(991) {
    padding: 0 20px;
  }
  &-text {
    font-size: 22px;
    font-weight: 600;
    color: $gray-800;
    @include screen(480){
      display: none;
    }
  }
  &-link {
    font-size: 14px;
    font-weight: 600;
    color: $gray-800;
    margin-bottom: 50px;
    margin-top: 30px;
    @include screen(480){
      display: none;
    }
  }
  &-title {
    font-size: 18px;
    color: $gray-800;
    font-weight: 600;
    margin-bottom: 30px;
  }
  &-description {
    font-size: 14px;
    color: $gray-500;
    font-weight: 600;
    margin-bottom: 50px;
  }
  &-button {
    height: 100%;
    width: 60%;
    @include screen(991) {
      width: 100%;
      padding-bottom: 50px;
    }
    .button-submit {
      padding: 10px 0;
      background: $orange;
      color: $white;
      border: none;
    }
  }
}
</style>
