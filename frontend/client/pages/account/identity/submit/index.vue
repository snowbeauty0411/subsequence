<template>
  <NuxtLayout :name="user_type === 'BUYER' ? 'buyer' : 'seller'">
    <SDPreLoad :preload="preload" />
    <b-container fluid class="identity w-full">
      <b-row class="w-full">
        <b-col cols="12" class="flex">
          <div class="mb-5 flex flex-col">
            <div class="identity-link flex items-center flex-wrap">
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
              <NuxtLink to="/account/identity/verify"
                >本人確認について</NuxtLink
              >
              <div class="mx-2">
                <SDIcon icon="chevron-right" class="mx-2" />
              </div>
              <div>本人確認書類の提出</div>
            </div>
            <div class="identity-title flex items-end flex-wrap">
              <div class="title-main">本人確認書類を提出する</div>
              <small class="title-sub"> identification documents</small>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <div class="identity-description mt-20 mb-32">
          <b-col cols="12">
            <div class="mb-4 text-lg identity-description-content">
              書類のご申請から当社での確認・承認まで、○営業日ほどお時間をいただく場合がございます。
            </div>
          </b-col>
        </div>
      </b-row>
      <b-row class="flex-SP">
        <b-col cols="12">
          <div class="title-individuals">申請が承認されないケース</div>
          <div class="identity-individuals flex flex-wrap">
            <div
              class="identity-individuals-box flex justify-center text-center"
            >
              <img
                src="@/assets/images/driver_license.png"
                alt=""
                class="absolute img-icon mt-5"
              />
              <span class="identity-individuals-title"
                >過去画像・情報が見えない</span
              >
              <span class="identity-individuals-replay">イラスト差し替え</span>
              <div class="identity-individuals-items"></div>
            </div>
            <div
              class="identity-individuals-box flex justify-center text-center"
            >
              <img
                src="@/assets/images/driver_license.png"
                alt=""
                class="absolute img-icon mt-5"
              />
              <span class="identity-individuals-title"
                >当社で認めていない本人確認書類</span
              >
              <span class="identity-individuals-replay">イラスト差し替え</span>
              <div class="identity-individuals-items"></div>
            </div>
            <div
              class="identity-individuals-box flex justify-center text-center"
            >
              <img
                src="@/assets/images/driver_license.png"
                alt=""
                class="absolute img-icon mt-5"
              />
              <span class="identity-individuals-title"
                >裏面がない・判別できない</span
              >
              <span class="identity-individuals-replay">イラスト差し替え</span>
              <div class="identity-individuals-items"></div>
            </div>
            <div class="identity-individuals-text">
              ・画像が加工されている、一部が写っていない、文字の判別ができない場合
              <br>・健康保険証や通知カードなど、当社で認めていない本人確認書類の場合
              <br>・裏面の提出が必要な書類で、裏面の画像がない場合
              <br>・データ形式がJPG、 PNG、GIF（アニメーションGIF画像は不可）以外の場合
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="identity-individuals-select">
            提出する本人確認書類
            <b-form-select
              v-model="identity_file_type"
              :options="options"
              size="sm"
              class="form-select-custom w-3/6 mt-3 py-3 px-6"
            ></b-form-select>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <div class="identity-upload flex">
          <div class="flex flex-column">
            <span class="identity-upload-title">1.表面</span>
            <div class="identity-upload-content">
              <div
                class="identity-upload-box flex justify-center items-center relative"
              >
                <b-overlay :show="loadingImg1">
                  <label for="img1" class="w-full h-full cursor-pointer">
                    <div class="image-left-item1 relative">
                      <div
                        class="btn btn-secondary button-upload w-auto absolute"
                        v-if="!img1Base64"
                      >
                        画像をアップロード
                      </div>
                      <img
                        :src="img1Base64"
                        alt=""
                        class="absolute img-main"
                        v-else
                      />
                    </div>
                  </label>
                  <input
                    type="file"
                    class="hidden"
                    id="img1"
                    accept="image/png, .jpeg, .jpg, .gif"
                    v-on:change="changeImage($event, 1)"
                  />
                </b-overlay>
              </div>
            </div>
          </div>
          <div class="flex flex-column">
            <span class="identity-upload-title">2.裏面</span>
            <div class="identity-upload-content relative">
              <div class="identity-upload-box flex justify-center items-center">
                <b-overlay :show="loadingImg2">
                  <label for="img2" class="w-full h-full cursor-pointer">
                    <div class="image-left-item2 relative">
                      <div
                        class="btn btn-secondary button-upload w-auto absolute"
                        v-if="!img2Base64"
                      >
                        画像をアップロード
                      </div>
                      <img
                        :src="img2Base64"
                        alt=""
                        class="absolute img-main"
                        v-else
                      />
                    </div>
                  </label>
                  <input
                    type="file"
                    class="hidden"
                    id="img2"
                    accept="image/png, .jpeg, .jpg, .gif"
                    v-on:change="changeImage($event, 2)"
                  />
                </b-overlay>
              </div>
            </div>
          </div>
        </div>
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
        <b-col>
          <div class="identity-confirmed">
            <b-form-checkbox
              v-model="confirmed"
              class="mr-3 checkbox-custom"
              size="lg"
              >本人確認書類とアカウント情報の「氏名」「住所」「生年月日」に相違がないことを確認した</b-form-checkbox
            >
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <div class="identity-button">
            <b-button
              class="btn btn-secondary button-submit w-full"
              v-on:click="uploadFile()"
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
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { identityStore } from "@/store/identity";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import pdfDefault from "@/assets/images/pdf-default.png";
import Cookies from "js-cookie";
import SDPreLoad from "@/components/SDPreLoad";
import { Message } from "@/utils/message";
import { sellerStore } from "@/store/seller";

export default {
  name: "PageIdentitySubmit",
  components: {
    SDPreLoad,
    BootstrapIcon,
    SDIcon,
  },
  setup() {
    const storeIdentity = identityStore();
    const toast = useToast();
    const store = sellerStore();
    return {
      toast,
      store,
      storeIdentity,
    };
  },
  data() {
    return {
      Message: Message.IDENTITY_FILE,
      selected: 1,
      selectedFileInput: null,
      selectedFileOutput: null,
      options: [
        { value: "", text: "本人確認書類を選択する" },
        { value: 1, text: "運転免許証/運転経歴証明書" },
        { value: 2, text: "マイナンバーカード" },
        { value: 3, text: "パスポート" },
        { value: 4, text: "在留カード" },
        { value: 5, text: "登記簿謄本" },
      ],
      preload: true,
      img1Base64: null,
      img2Base64: null,
      imgData1: null,
      imgData2: null,
      pathImg1: null,
      pathImg2: null,
      isLoading: false,
      optionToast: {
        type: "error",
        position: "top-right",
        duration: 3000,
        keepOnHover: true,
        singleton: true,
        theme: "toasted-primary",
        iconPack: "material",
        fitToScreen: true,
      },
      isOpenGallery: false,
      isGalleryActive: 1,
      dataPath: [],
      pdfDefault,
      confirmed: true,
      identity_file_type: "",
      user_type: "",
      loadingImg1: false,
      loadingImg2: false,
    };
  },
  created() {
    window.scrollTo(0, 0);
    this.storeIdentity.dataIdentity = [];
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }
    this.storeIdentity.getFileIdentificationById(this.account_id);
    this.store.getAccount(this.account_id);
  },
  computed: {
    ...mapState(identityStore, [
      "success",
      "message",
      "error",
      "dataIdentity",
      "dataImage",
    ]),
    ...mapState(sellerStore, ["dataAccount"]),
  },
  watch: {
    dataIdentity() {
      this.preload = true;
      if (this.dataIdentity) {
        if (this.dataIdentity.file1) {
          this.getImage(
            this.dataIdentity.account_id,
            this.dataIdentity.file1,
            1
          );
          this.imgData1 = this.dataIdentity.file1;
          this.dataPath.push(this.dataIdentity.file1);
        }
        if (this.dataIdentity.file2) {
          this.getImage(
            this.dataIdentity.account_id,
            this.dataIdentity.file2,
            2
          );
          this.imgData2 = this.dataIdentity.file2;
          this.dataPath.push(this.dataIdentity.file2);
        }
        this.identity_file_type = this.dataIdentity.identity_file_type;
      }
      this.preload = false;
    },

    success() {
      if (this.storeIdentity.success === true) {
        this.isLoading = false;
        this.toast.success(this.storeIdentity.message, this.optionToast);
        this.storeIdentity.success = "";
        this.storeIdentity.message = "";
        this.$router.push({
          path: `/account/identity/completed`,
        });
      }
    },

    error() {
      if (this.storeIdentity.error === true) {
        this.isLoading = false;
        this.toast.error(this.storeIdentity.message, this.optionToast);
        this.storeIdentity.error = "";
        this.storeIdentity.message = "";
      }
    },
  },
  methods: {
    getImage(account_id, fileName, index) {
      const req = {
        account_id,
        fileName,
        index,
      };
      const _this = this;
      const img = this.storeIdentity.getImageIdentificById(req);
      Promise.resolve(img).then(function (value) {
        const reader = new FileReader();
        reader.readAsDataURL(value);
        reader.onload = () => {
          _this["img" + index + "Base64"] = reader.result;
        };
      });
    },

    changeImage(e, id) {
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.toast.error(this.Message.max_size_image, this.optionToast);
      } else {
        if (id === 1) {
          this.loadingImg1 = true;
        } else if (id === 2) {
          this.loadingImg2 = true;
        }
        setTimeout(() => {
          if (id === 1) {
            this.loadingImg1 = false;
          } else if (id === 2) {
            this.loadingImg2 = false;
          }
          if (e.target.files.length) {
            const fileReader = new FileReader();
            const _this = this;
            fileReader.readAsDataURL(e.target.files[0]);
            if (id === 1) {
              fileReader.onload = (fileLoadedEvent) => {
                _this.img1Base64 = fileLoadedEvent.target.result;
                _this.imgData1 = e.target.files[0];
                e.target.value = null;
              };
            } else if (id === 2) {
              fileReader.onload = (fileLoadedEvent) => {
                _this.img2Base64 = fileLoadedEvent.target.result;
                _this.imgData2 = e.target.files[0];
                e.target.value = null;
              };
            }
          }
        }, 1000);
      }
    },

    async uploadFile() {
      if (this.store.dataAccount.birth_day) {
        this.isLoading = true;
        const dataForm = new FormData();
        dataForm.append("account_id", this.account_id);
        dataForm.append("identity_file_type", this.identity_file_type);
        if (this.imgData1 && !this.imgData1.file) {
          dataForm.append("file1", this.imgData1);
        }
        if (this.imgData2 && !this.imgData2.file) {
          dataForm.append("file2", this.imgData2);
        }
        if (!this.identity_file_type) {
          this.toast.error(this.Message.identity_file_type, this.optionToast);
        } else if (!this.imgData1 || !this.imgData2) {
          this.toast.error(this.Message.file_required, this.optionToast);
        } else if (!this.confirmed) {
          this.toast.error(this.Message.confirm, this.optionToast);
        } else {
          await this.storeIdentity.uploadIdentification(dataForm);
        }
      } else {
        this.toast.error(
          this.Message.birth_day_before_identity,
          this.optionToast
        );
      }
    },

    redirectToTerm() {
      window.open("/term", "_blank", "noreferrer");
    },

    redirectToPolicy() {
      window.open("/policy", "_blank", "noreferrer");
    }
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
    @include screen(480){
      display: none;
      background : red;
    }
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
        margin-top: 40px;
      }
    }
    .title-sub {
      color: $gray-800;
      @include screen(480){
        display: none;
      }
    }
  }
  &-description {
    @include screen(991) {
      flex-direction: column;
      margin-top: 50px;
    }
    @include screen(480){
      margin-top: 20px;
      margin-bottom: 20px;
    }
    &-content {
      color: $gray-800;
      @include screen(480) {
        font-size: 14px;
        margin-bottom: 10px !important;
      }
    }
    &-node {
      color: #f79158;
    }
  }
  &-confirmed {
    .form-check {
      display: flex;
      align-items: center;
    }
  }
  &-term {
    font-size: $gray-800;
    font-weight: 600;
    font-size: 14px;
    margin-top: 80px;
    margin-bottom: 60px;
    width: 60%;
    @include screen(991) {
      width: 100%;
    }
    &-node {
      color: $orange;
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
  &-upload {
    margin-top: 80px;
    @include screen(991) {
      flex-direction: column;
    }
    @include screen(480){
      padding-inline: 30px;
    }
    &-content {
      display: flex;
      justify-content: center;
    }
    &-title {
      font-size: 18px;
      font-weight: 600;
      color: $gray-800;
      margin-bottom: 10px;
    }
    &-box {
      background: $white;
      width: 346px;
      height: 310px;
      box-shadow: 2px 2px 2px #4d4d4d33;
      @include screen(991) {
        margin-bottom: 10px;
      }
      @include screen(480) {
        width: 100%;
      }
    }
    &-box:first-child {
      margin-right: 100px;
      @include screen(991) {
        margin-right: 0;
      }
    }
  }
  &-individuals {
    font-size: 22px;
    color: $gray-800;
    @include screen(991) {
      flex-direction: column;
      align-items: center;
      margin-top: 0;
      width: 100%;
    }
    &-text{
      @include screen(480){
        font-size: 13px;
        padding-inline: 10px;
        padding-bottom: 30px;
        color: $white;
        font-weight: 700;
      }
    }
    &-items {
      position: absolute;
      inset: 0;
      z-index: 0;
      @include screen(480) {
        flex-direction: column;
      }
    }
    &-box {
      background: $body-bg;
      color: $gray-500;
      border-radius: 8px;
      padding: 20px;
      margin-right: 30px;
      height: 200px;
      width: 350px;
      margin-bottom: 30px;
      position: relative;
      @include screen(991) {
        margin-bottom: 30px;
        margin-right: 0;
      }
      @include screen(480) {
        padding: 10px 20px;
        width: 100%;
      }
    }
    &-replay {
      position: absolute;
      z-index: 10;
      bottom: 40%;
      color: #d53201;
      font-size: 23px;
      font-weight: 800;
      cursor: pointer;
    }
    &-select {
      margin-top: 150px;
      color: $gray-800;
      font-size: 18px;
      font-weight: 600;
      @include screen(480) {
        margin-top: 50px;
      }

      select {
        @include screen(480) {
          width: 100%;
        }
      }
    }
    &-title {
      font-size: 20px;
      color: $gray-800;
      font-weight: 800;
      position: absolute;
      z-index: 10;
      @include screen(480) {
        font-size: 15px;
      }
    }
  }
}

.hiddenFileInput {
  position: absolute;
  inset: 0;
}

.img-main {
  width: 100%;
  height: 100%;
}

.title-individuals {
  font-size: 22px;
  color: $gray-800;
  margin-bottom: 30px;
  font-weight: 800;
  @include screen(480) {
    font-size: 22px;
    color: $white;
    padding-top: 40px;
  }
}

.button-submit {
  background: $orange;
  border: none;
  color: $white;
  padding: 10px 0;
  font-weight: 600;
}

.button-upload {
  background: $orange;
  border: none;
  color: $white;
  padding: 10px 0;
  border-radius: 33px;
  padding: 15px 30px;
  font-weight: 800;
}

.complete-service-right {
  @include screen(991) {
    justify-content: center;
    margin-top: 20px;
  }
}

.image-left {
  &-item1 {
    width: 346px;
    height: 310px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-item2 {
    width: 346px;
    height: 310px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.form-select-custom {
  background-image: url("@/assets/images/iconArrowDownOrange.png") !important;
  color: #7e7d7d;
  padding: 0.375rem 2.25rem 0.375rem 1.25rem;
  border: 1px solid $gray-800;
  height: 55px;
}
.flex-SP{
  @include screen(480){
    background: #E79C3A;
    margin-inline: -20px;
  }
}
// .checkbox-custom {
//   border-color: #e79c3a !important;
//   &:checked {
//     background-color: #e79c3a !important;
//     border-color: #e79c3a !important;
//   }
//   label {
//     color: #e79c3a;
//     font-weight: 500;
//   }
// }
</style>
