<template>
  <NuxtLayout :name="user_type === 'BUYER' ? 'buyer' : 'seller'">
    <b-container fluid class="identity w-full">
      <b-row class="w-full d-sm-none">
        <b-col cols="12" class="flex">
          <div class="mb-5 flex flex-col">
            <div
              class="identity-link flex items-center flex-wrap"
            >
              <div>
                <NuxtLink :to="user_type === 'BUYER' ? '/buyer/account' : '/seller/account'"
                  >アカウント管理</NuxtLink
                >
              </div>
              <div class="mx-2">
                <SDIcon icon="chevron-right" class="mx-2" />
              </div>
              <NuxtLink to="/account/identity/verify">本人確認について</NuxtLink>
              <div class="mx-2">
                <SDIcon icon="chevron-right" class="mx-2" />
              </div>
              <div>
                <NuxtLink to="/account/identity/submit"
                  >本人確認書類の提出</NuxtLink
                >
              </div>
              <div class="mx-2">
                <SDIcon icon="chevron-right" class="mx-2" />
              </div>
              <div>提出完了</div>
            </div>
            <div class="identity-title flex items-end flex-wrap">
              <div class="title-main">提出完了</div>
              <small class="title-sub">Submission completed</small>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <div class="identity-description my-20">
          <b-col cols="12">
            <div class="identity-description-content">
              本人確認の提出が完了しました。
            </div>
          </b-col>
        </div>
      </b-row>
      <b-row>
        <b-col cols="12" lg="7" class="identity-document">
          <div>
            ・ご提出いただいた書類を審査させていただくため、承認まで最大5営業日以内のお時間を頂戴しております。また、繁忙期等は更にお時間を要する場合もございます。
            <br />
            ・ご提出書類やご申請内容に不備があった場合は承認できませんので、再度申請をいただく必要がございます。
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <div class="identity-button">
            <b-button
              class="btn btn-secondary button-return w-full"
              v-on:click="goToTopPage()"
            >
              アカウント管理TOPへ戻る
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </NuxtLayout>
</template>

<script>
import SDIcon from "@/components/SDIcon";
import Cookies from "js-cookie";

export default {
  name: "PageIdentityCompleted",
  data() {
    return {
      user_type: '',
    };
  },
  components: {
    SDIcon,
  },
  created() {
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.user_type = localStorage.getItem("type");
    } else {
      this.user_type = Cookies.get("type");
    }
  },
  methods: {
    goToTopPage() {
      if (this.user_type === "BUYER") {
        this.$router.push("/buyer/account");
      } else {
        this.$router.push("/seller/account");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.identity {
  background-color: $lightwhite;
  padding: 0 100px;
  @include screen(991) {
    padding: 0 20px;
  }
  .d-sm-none{
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
  }
  &-title {
    .title-main {
      font-size: 22px;
      color: #5e5c5c;
      font-weight: 600;
      margin-right: 30px;
      @include screen(480) {
        font-size: 16px;
        margin-right: 10px;
      }
    }
    .title-sub {
      color: $gray-800;
    }
  }
  &-description {
    @include screen(480) {
      margin-top: 50px;
      margin-bottom: 50px;
    }
    &-content {
      color: $gray-800;
      font-size: 22px;
      font-weight: 800;
      @include screen(480) {
        font-size: 14px;
        margin-bottom: 10px !important;
      }
    }
  }
  &-document {
    color: $gray-500;
    font-size: 16px;
    @include screen(480) {
      font-size: 14px;
    }
  }
  &-button {
    width: 60%;
    height: 100%;
    margin-top: 60px;
    margin-bottom: 50px;
    @include screen(991) {
      width: 100%;
    }
  }
}

.button-return {
  background: $orange;
  border: none;
  color: $white;
  padding: 10px 0;
  font-weight: 600;
}
</style>
