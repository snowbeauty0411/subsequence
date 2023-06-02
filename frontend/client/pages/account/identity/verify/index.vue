<template>
  <NuxtLayout :name="user_type === 'BUYER' ? 'buyer' : 'seller'">
    <b-container fluid class="identity w-full">
      <b-row class="w-full">
        <b-col cols="12" class="flex">
          <div class="mb-5 flex flex-col">
            <div class="identity-link flex items-center flex-wrap d-none">
              <div>
                <NuxtLink
                  :to="
                    user_type === 'BUYER' ? '/buyer/account' : '/seller/account'
                  "
                  >アカウント管理</NuxtLink
                >
              </div>
              <div class="mx-2">
                <SDIcon icon="chevron-right" class="mx-2" />
              </div>
              <div>本人確認について</div>
            </div>
            <div class="identity-title flex items-end flex-wrap">
              <div class="title-main">本人確認について</div>
              <small class="title-sub d-none">About Identity Verification</small>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <div
          class="identity-description mt-20 flex justify-between items-center"
        >
          <b-col cols="6">
            <div class="mb-4 text-xl font-bold identity-description-content">
              「購入時」
              <br class="br_none" />
              サービス購入時、<span class="identity-description-node"
                >本人確認</span
              >が必要なサービスがあります
            </div>
            <div class="text-xl font-bold identity-description-content">
              「出品時」 サービス出品・振込入金には、事前に<span
                class="identity-description-node"
                >本人確認</span
              >が必要です
            </div>
          </b-col>
          <b-col
            cols="5"         
            class="complete-service-right flex justify-end"
          >
            <img :src="Imglogo3" alt="" />
          </b-col>
        </div>
      </b-row>
      <b-row>
        <b-col cols="12" class="mt-36 identity-document">
          <div>
            ご本人であることを確認するため、氏名、生年月日、住所、有効期限が確認できる下記書類のうち一つをご提出ください。
          </div>
        </b-col>
      </b-row>
      <b-row class="flex-SP">
        <b-col cols="12">
          <div class="title-individuals">個人の場合</div>
          <div class="identity-card flex">
            <b-col cols="12" lg="6" class="mr-10">
              <div class="identity-card-box">
                <span class="identity-card-title1"
                  >運転免許証/運転履歴証明書</span
                >
                <div class="flex my-4 identity-card-items">
                  <span class="hiddenFileInput">
                    <label for="img1" class="w-full h-full">
                      <div class="image-left-item1 relative">
                        <img
                          src="@/assets/images/driver_license.png"
                          alt=""
                          class="absolute img-icon"
                        />
                      </div>
                    </label>
                  </span>
                  <div class="required text-base flex flex-col justify-center">
                    <span class="font-bold">必要な面/ページ</span>
                    <div>1. 表面</div>
                    <div>2. 裏面（※）</div>
                  </div>
                </div>
                <span class="text-sm"
                  >※現住所が裏面に記載の場合は、裏面も必要になります。</span
                >
              </div>
            </b-col>
            <b-col cols="12" lg="6">
              <div class="identity-card-box">
                <span class="identity-card-title1">マイナンバーカード</span>
                <div class="flex my-4 identity-card-items">
                  <span class="hiddenFileInput">
                    <label for="img2" class="w-full h-full">
                      <div class="image-left-item2 relative">
                        <img
                          src="@/assets/images/number_card.png"
                          alt=""
                          class="absolute img-icon"
                        />
                      </div>
                    </label>
                  </span>
                  <div class="required text-base flex flex-col justify-center">
                    <span class="font-bold">必要な面/ページ</span>
                    <div>1. 表面</div>
                    <div>2. 裏面</div>
                  </div>
                </div>
                <span class="text-sm">※表面、裏面どちらも提出が必要です。</span>
              </div>
            </b-col>
          </div>
        </b-col>
      </b-row>
      <b-row class="flex-SP">
        <b-col cols="12">
          <div class="identity-card flex mt-7">
            <b-col cols="12" lg="6" class="mr-10">
              <div class="identity-card-box">
                <span class="identity-card-title1">パスポート</span>
                <div class="flex my-4 identity-card-items">
                  <span class="hiddenFileInput">
                    <label for="img3" class="w-full h-full">
                      <div class="image-left-item3 relative">
                        <img
                          src="@/assets/images/passport.png"
                          alt=""
                          class="absolute img-icon"
                        />
                      </div>
                    </label>
                  </span>
                  <div class="required text-base flex flex-col justify-center">
                    <span class="font-bold">必要な面/ページ</span>
                    <div>1. 写真印刷ページ</div>
                    <div>2. 住所記載ページ</div>
                  </div>
                </div>
                <span class="text-sm"
                  >※写真印刷ページ、住所記載ページどちらも提出が必要です。</span
                >
              </div>
            </b-col>
            <b-col cols="12" lg="6">
              <div class="identity-card-box">
                <span class="identity-card-title1">在留カード</span>
                <div class="flex my-4 identity-card-items">
                  <span class="hiddenFileInput">
                    <label for="img4" class="w-full h-full">
                      <div class="image-left-item4 relative">
                        <img
                          src="@/assets/images/residence_card.png"
                          alt=""
                          class="absolute img-icon"
                        />
                      </div>
                    </label>
                  </span>
                  <div class="required text-base flex flex-col justify-center">
                    <span class="font-bold">必要な面/ページ</span>
                    <div>1. 表面</div>
                    <div>2. 裏面（※）</div>
                  </div>
                </div>
                <span class="text-sm"
                  >※現住所が裏面に記載の場合は、裏面も必要になります。</span
                >
              </div>
            </b-col>
          </div>
        </b-col>
      </b-row>
      <b-row class="flex-SP">
        <b-col cols="12">
          <div class="title-individuals">法人の場合</div>
          <div class="identity-card flex">
            <b-col cols="12" lg="7" class="mr-10">
              <div class="identity-card-box">
                <span class="identity-card-title1">登記簿謄本</span>
                <div class="flex my-4 identity-card-items">
                  <span class="hiddenFileInput">
                    <label for="img5" class="w-full h-full">
                      <div class="image-left-item5 relative">
                        <img
                          src="@/assets/images/transcript.png"
                          alt=""
                          class="absolute img-icon"
                        />
                      </div>
                    </label>
                  </span>
                  <div class="required text-base">
                    <span class="font-bold">必要な面/ページ</span>
                    <div>1. 法人名、法人、住所記載面</div>
                    <div>2. 代表者名記載面</div>
                    <div>3. 設立日記載面</div>
                    <div>4. 交付日記載面</div>
                  </div>
                </div>
                <span class="text-sm"
                  >※3か月以内に取得した履歴事項全証明書をご提出ください。</span
                >
              </div>
            </b-col>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <div class="identity-term">
            <a class="identity-term-node" @click="redirectToTerm">subsQ 利用規約</a>
            および<a class="identity-term-node" @click="redirectToPolicy">プライバシーポリシー</a
            >に基づき取り扱います。ご確認いただき、内容に同意した上で次へお進みください。
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <div class="identity-button">
            <b-button
              class="btn btn-secondary button-submit w-full"
              v-on:click="goToTopSubmit()"
            >
              本人確認提出画面へ
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </NuxtLayout>
</template>

<script>
import SDIcon from "@/components/SDIcon";
import Imglogo3 from "@/assets/images/logo3.png";
import Cookies from "js-cookie";

export default {
  name: "PageIdentityVerify",
  data() {
    return {
      Imglogo3,
      user_type: "",
      selectedFileDrive: null,
      selectedFileNumberCard: null,
      selectedFilePassPort: null,
      selectedFileResidenceCard: null,
      selectedFileRegisteredCopy: null,
    };
  },
  components: {
    SDIcon,
  },
  created() {
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    let valueToken = null;
    if (rememberLogin === "true") {
      valueToken = localStorage.getItem("token_user");
      this.user_type = localStorage.getItem("type");
    } else {
      valueToken = Cookies.get("token_user");
      this.user_type = Cookies.get("type");
    }

    if (!valueToken) {
      this.$router.push("/login");
    }
  },
  methods: {
    goToTopSubmit() {
      this.$router.push("/account/identity/submit");
    },

    redirectToTerm() {
      window.open("/term", "_blank", "noreferrer");
    },

    redirectToPolicy() {
      window.open("/policy", "_blank", "noreferrer");
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
    width: 80%;
    @include screen(991) {
      margin-top: 50px;
      width: 100%;
    }
    @include screen(480){
      margin-top: 0px;
    }
    &-content {
      color: $gray-800;
      @include screen(480) {
        font-size: 14px;
        margin-bottom: 10px !important;
      }
      .br_none {
        @include screen(991) {
          display: none;
        }
      }
    }
    &-node {
      color: #f79158;
    }
  }
  &-document {
    width: 70%;
    color: $gray-800;
    font-size: 18px;
    @include screen(991) {
      margin-top: 50px;
    }
    @include screen(480) {
      font-size: 14px;
      width: 100%;
      margin-bottom: 30px;
    }
  }
  &-term {
    font-size: $gray-800;
    font-weight: 600;
    font-size: 14px;
    margin-top: 100px;
    margin-bottom: 60px;
    width: 60%;
    @include screen(991) {
      width: 100%;
    }
    @include screen(480) {
      margin-top: 50px;
      margin-bottom: 50px;
    }
    &-node {
      color: $orange;
    }
  }
  &-button {
    width: 60%;
    height: 100%;
    margin-bottom: 50px;
    @include screen(991) {
      width: 100%;
    }
  }
  &-card {
    font-size: 22px;
    color: $gray-800;
    width: 70%;
    @include screen(991) {
      flex-direction: column;
      margin-top: 0;
      width: 100%;
    }
    &-items {
      @include screen(480) {
      }
    }
    &-box {
      background: $body-bg;
      color: $gray-500;
      border-radius: 8px;
      padding: 20px 30px;
      @include screen(991) {
        margin-bottom: 30px;
      }
      @include screen(480) {
        padding: 10px 20px;
      }
    }
    &-title1 {
      font-size: 20px;
      color: $gray-800;
      font-weight: 800;
      @include screen(480) {
        font-size: 15px;
      }
    }
  }
}

.hiddenFileInput {
  width: 50%;
  height: 100px;
  margin-right: 10px;
  @include screen(480) {
    height: 100px;
  }
}

.title-individuals {
  font-size: 22px;
  color: $gray-800;
  margin-bottom: 30px;
  font-weight: 800;
  margin-top: 60px;
  @include screen(480) {
    font-size: 16px;
    margin-top: 35px;
    color: $white;

  }
}

.button-submit {
  background: $orange;
  border: none;
  color: $white;
  padding: 10px 0;
  font-weight: 600;
}

.flex-SP {
  @include screen(991) {
    width: 100%;
  }
  @include screen(480){
    background: #E79C3A;
    margin-inline: -20px;
    width: 100vw;
  }
}

.complete-service-right {
  @include screen(991) {
    justify-content: center;
    margin-top: 20px;
  }
}

.img-icon {
  object-fit: cover;
  max-height: 100px;
}

.img-main {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
</style>
