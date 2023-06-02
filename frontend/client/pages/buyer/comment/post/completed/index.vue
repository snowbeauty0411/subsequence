<template>
  <b-container fluid class="page-comment-completed w-full">
    <b-row class="w-full">
      <b-col cols="12" class="flex sm-d-none">
        <div class="mb-5 flex flex-col">
          <div class="page-comment-completed-link flex items-center flex-wrap">
            <div>
              <NuxtLink to="/buyer/service/management">サービス管理</NuxtLink>
            </div>
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <div>
              <NuxtLink
                v-bind:to="
                  '/buyer/service/service-manage/' + detailService.hash_id
                "
                >{{ detailService.name }}</NuxtLink
              >
            </div>
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <div>
              <NuxtLink
                v-bind:to="'/buyer/comment/post/' + detailService.hash_id"
                >レビューを書く</NuxtLink
              >
            </div>
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <div>レビュー内容の確認</div>
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <div>投稿完了</div>
          </div>
          <div class="page-preview-text flex items-end">
            <div class="title-main">投稿完了</div>
            <small class="text-[#5E5C5C]"
              >Review submission completed</small
            >
          </div>
        </div>
      </b-col>

      <b-col cols="12">
        <div class="page-comment-completed-button">
          <div class="page-comment-completed-title">
            ありがとうございます。 <br />
            レビューの投稿が完了しました。
          </div>
          <div class="page-comment-completed-description">
            ・レビューは審査させていただくため、公開までに通常2～10日程度のお時間を頂戴しております。また、繁忙期等は更にお時間を要する場合もございます。<br />
            ・内容によっては、公開を見送らせていただく場合もございます。
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
      detailService: {},
    };
  },
  created() {
    this.id = localStorage.getItem("id_service");
    if (Object.keys(this.listFiles).length === 0) {
      this.$router.push({ path: `/buyer/service/service-manage/${this.id}` });
    }
    this.detailService = this.detailServiceByHashId;
    window.scrollTo(0, 0);
  },
  computed: {
    ...mapState(buyerStore, ["detailServiceByHashId", "listFiles", "listDeleteImage"]),
  },
  methods: {
    goToTopPage() {
      this.store.listFiles = {};
      this.store.listDeleteImage = [];
      this.$router.push("/buyer/service/management");
      localStorage.removeItem("id_service");
    },
  },
};
definePageMeta({
  layout: "buyer",
});
</script>

<style lang="scss" scoped>
.page-comment-completed {
  .sm-d-none{
    @include screen(480){
      display: none;
    }
  }
  padding: 0 100px 100px 100px;
  @include screen(991) {
    padding: 0 20px;
  }
  &-text {
    .title-main {
      font-size: 22px;
      font-weight: 600;
      color: $gray-800;
      margin-right: 30px;
    }
    @include screen(991) {
      flex-direction: column;
      align-items: flex-start;
    }
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
    a {
      &:hover {
        color: $orange;
      }
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
