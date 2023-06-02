<template>
  <div class="transferPage flex flex-col">
    <div class="transferPage-link flex items-center flex-wrap">
      <div>
        <NuxtLink to="/seller/transfer">売上振込申請</NuxtLink>
      </div>
      <div class="mx-2">
        <SDIcon icon="chevron-right" class="mx-2" />
      </div>
      <div>売上振込申請の確認</div>
      <div class="mx-2">
        <SDIcon icon="chevron-right" class="mx-2" />
      </div>
      <div>申請完了</div>
    </div>
    <div class="transferPage-content">
      <div class="transferPage-content-title flex items-end">
        <div class="title-main">申請完了</div>
        <div class="title-description">Application Completed</div>
      </div>
      <div class="transferPage-content-main flex flex-col">
        <div class="title-main">振込申請が完了しました。</div>
        <div
          class="
            text-base text-[#7E7D7D]
            font-medium
            mt-[60px]
            mb-[40px]
          "
        >
          ・振込申請を行ってから入金までは5営業日程お時間を要する場合がございます。あらかじめご了承ください。
          <br />
          ・振込結果につきましては、完了後にお知らせを通知いたします。
        </div>
        <div class="w-[100%]">
          <b-button
            class="w-full bg-[#E79C3A] border-none py-[10px]"
            v-on:click="topPage()"
            >アカウント管理TOPへ戻る</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SDIcon from "@/components/SDIcon";
export default {
  data() {
    return {};
  },
  components: {
    SDIcon,
  },
  methods: {
    topPage() {
      this.$router.push("/seller/account");
    },
  },
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      // on the navigation type checking refresh or close tab/browser for logout
      this.$router.push(`/seller/transfer`);
    });
  },
};
definePageMeta({
  layout: "seller",
});
</script>


<style lang="scss" scoped>
.transferPage {
  padding: 30px 100px;
  @include screen(767){
    padding: 30px;
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

  &-content {
    @include screen(767) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 30px;
    }
    @include screen(480) {
      padding: 0px;
    }
    &-title {
      @include screen(480){
        display: none;
      }
      .title-main {
        font-size: 22px;
        color: #5e5c5c;
        font-weight: 600;
        @include screen(480) {
          font-size: 16px;
        }
      }
      .title-description {
        margin-left: 20px;
        font-size: 14px;
        color: #5e5c5c;
        @include screen(480) {
          font-size: 12px;
        }
      }
    }
    &-main {
      margin-top: 50px;
      width: 100%;
      padding: 30px;
      @include screen(480){
        padding-inline: 0px;
      }
      .title-main {
        font-size: 22px;
        color: #5e5c5c;
        font-weight: 600;
        @include screen(480) {
          font-size: 16px;
        }
      }
      .main-top {
        padding: 30px;
        margin-right: 100px;
        @include screen(480) {
          margin-right: unset;
          padding: 10px;
        }
        &-button {
          margin-top: 50px;
          width: 60%;
          button {
            background: $orange;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>