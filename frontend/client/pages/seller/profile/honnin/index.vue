<template>
  <div class="fd-edituser">
    <SDPreLoad :preload="preload" />
    <div class="fd-edituser-container">
      <div class="h5 text-center title-content">
        <div
          class="icon-left"
          v-on:click="$router.push('/mypage/profile/edit/additional')"
        ></div>
        本人確認用画像をアップロード
        <span v-on:click="updateModal('IDENTITY_DOCUMENT')"> </span>
        <div
          class="icon-right"
          v-on:click="$router.push('/mypage/profile/edit')"
        ></div>
      </div>
      <div class="main-content">
        <div class="accountNumber">
          <!-- <div class="h5 text-center title-content">本人確認用画像をアップロード</div> -->
          <div class="w-full">
            <div class="input-honnin">
              <div class="relative">
                <label
                  class="input-honnin-item"
                  v-bind:class="{ active: !img1Base64 }"
                  for="input-image1"
                >
                  <div v-if="!img1Base64" class="input-honnin-item-times">
                    <BootstrapIcon icon="plus" size="sm" />
                  </div>
                  <div v-if="img1Base64" class="input-honnin-item-image">
                    <img class="img-contain" v-bind:src="img1Base64" alt="" />
                  </div>
                </label>
                <div
                  v-if="img1Base64"
                  class="input-honnin-item-close"
                  v-on:click="deleteImage(1)"
                >
                  <BootstrapIcon icon="x" size="sm" />
                </div>
              </div>
              <div class="relative">
                <label
                  class="input-honnin-item"
                  v-bind:class="{ active: !img2Base64 && img1Base64 }"
                  for="input-image2"
                >
                  <div
                    v-if="!img2Base64 && img1Base64"
                    class="input-honnin-item-times"
                  >
                    <BootstrapIcon icon="plus" size="sm" />
                  </div>
                  <div v-if="img2Base64" class="input-honnin-item-image">
                    <img class="img-contain" v-bind:src="img2Base64" alt="" />
                  </div>
                </label>
                <div
                  v-if="img2Base64"
                  class="input-honnin-item-close"
                  v-on:click="deleteImage(2)"
                >
                  <BootstrapIcon icon="x" size="sm" />
                </div>
              </div>
              <div class="relative item-bot">
                <label
                  class="input-honnin-item"
                  v-bind:class="{ active: !img3Base64 && img2Base64 }"
                  for="input-image3"
                >
                  <div
                    v-if="!img3Base64 && img2Base64"
                    class="input-honnin-item-times"
                  >
                    <BootstrapIcon icon="plus" size="sm" />
                  </div>
                  <div v-if="img3Base64" class="input-honnin-item-image">
                    <img class="img-contain" v-bind:src="img3Base64" alt="" />
                  </div>
                </label>
                <div
                  v-if="img3Base64"
                  class="input-honnin-item-close"
                  v-on:click="deleteImage(3)"
                >
                  <BootstrapIcon icon="x" size="sm" />
                </div>
              </div>
              <div class="relative item-bot">
                <label
                  class="input-honnin-item"
                  v-bind:class="{ active: !img4Base64 && img3Base64 }"
                  for="input-image4"
                >
                  <div
                    v-if="!img4Base64 && img3Base64"
                    class="input-honnin-item-times"
                  >
                    <BootstrapIcon icon="plus" size="sm" />
                  </div>
                  <div v-if="img4Base64" class="input-honnin-item-image">
                    <img class="img-contain" v-bind:src="img4Base64" alt="" />
                  </div>
                </label>
                <div
                  v-if="img4Base64"
                  class="input-honnin-item-close"
                  v-on:click="deleteImage(4)"
                >
                  <BootstrapIcon icon="x" size="sm" />
                </div>
              </div>
            </div>
            <input
              id="input-image1"
              hidden
              v-bind:disabled="img1Base64"
              type="file"
              accept="image/png, .pdf, .jpg, .gif"
              v-on:change="changeImage($event, 1)"
            />
            <input
              id="input-image2"
              hidden
              v-bind:disabled="img2Base64 || !img1Base64"
              type="file"
              accept="image/png, .pdf, .jpg, .gif"
              v-on:change="changeImage($event, 2)"
            />
            <input
              id="input-image3"
              hidden
              v-bind:disabled="img3Base64 || !img2Base64"
              type="file"
              accept="image/png, .pdf, .jpg, .gif"
              v-on:change="changeImage($event, 3)"
            />
            <input
              id="input-image4"
              hidden
              v-bind:disabled="img4Base64 || !img3Base64"
              type="file"
              accept="image/png, .pdf, .jpg, .gif"
              v-on:change="changeImage($event, 4)"
            />
          </div>
          <div class="text-center mt-3 mess">
            PNG / JPG / GIF / PDF、画像1枚につき1MBまで
          </div>
          <div class="edit-save pt-4">
            <b-button
              class="w-full p-2"
              v-on:click="uploadImg()"
              :disabled="isLoading"
              >修正する</b-button
            >
          </div>
          <div class="w-full pb-5">
            <h3>【アップロード方法】</h3>
            <h5>１．アップロードに必要なものを用意します。</h5>
            <p>
              ・本人確認書類<br />
              ・デジタルカメラ、カメラ付き携帯電話、スキャナーなどの画像を取り込めるもの
            </p>

            <h5>２．本人確認書類を撮影します。</h5>
            <p>
              【方法１】<br />
              お使いのデジタルカメラ、カメラ付き携帯電話などで「本人確認書類」を撮影
            </p>

            <p>
              【方法２】<br />
              お使いのスキャンなどで、「本人確認書類」をスキャン。
            </p>

            <h5>
              ３．撮影した画像を、お使いパソコンまたはスマートフォンに保存します。
            </h5>
            <p>
              保存のしかたについては、デジタルカメラやカメラ付き携帯電話などのマニュアルをご覧ください。
            </p>

            <h5>４．本人撮影書類をアップロードします。</h5>
            <p>
              下記「画像をアップロード」にある⊕ボタンを押すと、保存ファイルから画像を選択できます。<br />
              添付画像を間違えた場合は、画像右上の⊖ボタンを押して一旦削除し、再び⊕ボタンを押して画像を選択します。
            </p>

            <h5 class="mb-5">
              ５．「修正する」ボタンを押して、「認証画像のアップロードに成功しました」とメッセージが表示されたら完了です。
            </h5>

            <span
              >※PNG/ JPG / GIF /
              PDFを、画像１ファイルあたり10MBまでアップロード可能です。<br />
              ※「お名前」「ご住所」「生年月日」が記載されてる欄を全て鮮明にして撮影してください。不鮮明な箇所があると、再提出をお願いする場合があります。<br />
              ※運転免許証・各種健康保険証・住民基本台帳カード・特別永住者証明書・外国人登録証明書・在留カードは裏面も併せて撮影してください。<br />
              ※本人確認書類の氏名、住所が最新のものでない場合、また、身体障がい者手帳に住所の記載がない場合は、補助書類も併せて撮影してください。<br />
              ※撮影した画像は加工せず、原本をカラー画像で撮影してください。<br />
              ※デジタルカメラやカメラ付き携帯電話でフラッシュ撮影を行うと、鮮明に写らない場合があります。明るい場所でフラッシュをオフにして撮影してください。<br />
              ※直接ご自身やご家族の顔を撮影しただけの画像をご提出される方がいますが、本人確認書類として利用できませんのでご注意ください。</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import { identityStore } from "@/store/identity";
import pdfDefault from "@/assets/images/pdf-default.png";
import Cookies from "js-cookie";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  name: "SellerProfileHonnin",
  auth: false,
  setup() {
    const toast = useToast();
    const storeIdentity = identityStore();
    return {
      toast,
      storeIdentity,
    };
  },
  data() {
    return {
      preload: true,
      img1Base64: null,
      img2Base64: null,
      img3Base64: null,
      img4Base64: null,
      imgData1: null,
      imgData2: null,
      imgData3: null,
      imgData4: null,
      listImage: [],
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
      delete_file_names1: [],
      delete_file_names2: [],
      delete_file_names3: [],
      delete_file_names4: [],
      dataPath: [],
      pdfDefault,
    };
  },
  computed: {
    ...mapState(identityStore, [
      "success",
      "message",
      "error",
      "dataIdentity",
      "dataImage",
    ]),
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.account_id = Cookies.get("account_id");
    }
    this.storeIdentity.getFileIdentificationById(account_id);
  },
  watch: {
    dataIdentity() {
      this.preload = true;
      if (this.dataIdentity && this.dataIdentity.length > 0) {
        this.dataIdentity.forEach((item, index) => {
          const count = index + 1;
          this["pathImg" + count] = item.file;
          this.getImage(item.account_id, item.file, count);
          this["imgData" + count] = item;
          this.dataPath.push(item.file);
        });

        this.listImage = this.dataIdentity.map((item) => {
          return { type: "image", src: item.path_file };
        });
      }
      this.preload = false;
    },

    success() {
      if (this.storeIdentity.success === true) {
        this.isLoading = false;
        this.toast.success(this.message, this.optionToast);
        this.storeIdentity.success = "";
        this.storeIdentity.message = "";
        this.$router.push({
          path: `/seller/account`,
        });
      }
    },

    error() {
      if (this.storeIdentity.error === true) {
        this.isLoading = false;
        this.toast.error(this.message, this.optionToast);
        this.storeIdentity.error = "";
        this.storeIdentity.message = "";
        this.$router.push({
          path: `/seller/account`,
        });
      }
    },
  },
  components: { BootstrapIcon, SDPreLoad },
  methods: {
    getImage(account_id, fileName, index) {
      const req = {
        account_id,
        fileName,
      };
      const _this = this;
      const img = this.storeIdentity.getImageIdentificById(req);
      Promise.resolve(img).then(function (value) {
        if (value.type === "application/pdf") {
          _this["img" + index + "Base64"] = _this.pdfDefault;
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(value);
          reader.onload = () => {
            _this["img" + index + "Base64"] = reader.result;
          };
        }
      });
    },
    changeImage(e, id) {
      if (e.target.files.length) {
        const fileReader = new FileReader();
        const _this = this;
        fileReader.readAsDataURL(e.target.files[0]);
        if (id === 1) {
          fileReader.onload = (fileLoadedEvent) => {
            if (e.target.files[0].type === "application/pdf") {
              _this.img1Base64 = this.pdfDefault;
              _this.listImage.push({
                type: "pdf",
                src: fileLoadedEvent.target.result,
              });
            } else {
              _this.img1Base64 = fileLoadedEvent.target.result;
              _this.listImage.push({ type: "image", src: _this.img1Base64 });
            }
            _this.imgData1 = e.target.files[0];
            e.target.value = null;
          };
        } else if (id === 2) {
          fileReader.onload = (fileLoadedEvent) => {
            if (e.target.files[0].type === "application/pdf") {
              _this.img2Base64 = this.pdfDefault;
              _this.listImage.push({
                type: "pdf",
                src: fileLoadedEvent.target.result,
              });
            } else {
              _this.img2Base64 = fileLoadedEvent.target.result;
              _this.listImage.push({ type: "image", src: _this.img2Base64 });
            }
            _this.imgData2 = e.target.files[0];
            e.target.value = null;
          };
        } else if (id === 3) {
          fileReader.onload = (fileLoadedEvent) => {
            if (e.target.files[0].type === "application/pdf") {
              _this.img3Base64 = this.pdfDefault;
              _this.listImage.push({
                type: "pdf",
                src: fileLoadedEvent.target.result,
              });
            } else {
              _this.img3Base64 = fileLoadedEvent.target.result;
              _this.listImage.push({ type: "image", src: _this.img3Base64 });
            }
            _this.imgData3 = e.target.files[0];
            e.target.value = null;
          };
        } else {
          fileReader.onload = (fileLoadedEvent) => {
            if (e.target.files[0].type === "application/pdf") {
              _this.img4Base64 = this.pdfDefault;
              _this.listImage.push({
                type: "pdf",
                src: fileLoadedEvent.target.result,
              });
            } else {
              _this.img4Base64 = fileLoadedEvent.target.result;
              _this.listImage.push({ type: "image", src: _this.img4Base64 });
            }
            _this.imgData4 = e.target.files[0];
            e.target.value = null;
          };
        }
      }
    },
    deleteImage(id) {
      if (id === 1) {
        const obj = this.listImage.find((e) => e.src === this.img1Base64);
        this.listImage.splice(this.listImage.indexOf(obj), 1);
        if (this.delete_file_names1.length === 0) {
          this.delete_file_names1.push(this.imgData1.file);
        } else if (this.delete_file_names2.length === 0) {
          this.delete_file_names2.push(this.imgData1.file);
        } else if (this.delete_file_names3.length === 0) {
          this.delete_file_names3.push(this.imgData1.file);
        } else {
          this.delete_file_names4.push(this.imgData1.file);
        }
        this.img1Base64 = this.img2Base64;
        this.img2Base64 = this.img3Base64;
        this.img3Base64 = this.img4Base64;
        this.img4Base64 = null;
        this.imgData1 = this.imgData2;
        this.imgData2 = this.imgData3;
        this.imgData3 = this.imgData4;
        this.imgData4 = null;
      } else if (id === 2) {
        const obj = this.listImage.find((e) => e.src === this.img2Base64);
        this.listImage.splice(this.listImage.indexOf(obj), 1);
        if (this.delete_file_names1.length === 0) {
          this.delete_file_names1.push(this.imgData2.file);
        } else if (this.delete_file_names2.length === 0) {
          this.delete_file_names2.push(this.imgData2.file);
        } else if (this.delete_file_names3.length === 0) {
          this.delete_file_names3.push(this.imgData2.file);
        } else {
          this.delete_file_names4.push(this.imgData2.file);
        }
        this.img2Base64 = this.img3Base64;
        this.img3Base64 = this.img4Base64;
        this.img4Base64 = null;
        this.imgData2 = this.imgData3;
        this.imgData3 = this.imgData4;
        this.imgData4 = null;
      } else if (id === 3) {
        const obj = this.listImage.find((e) => e.src === this.img3Base64);
        this.listImage.splice(this.listImage.indexOf(obj), 1);
        if (this.delete_file_names1.length === 0) {
          this.delete_file_names1.push(this.imgData3.file);
        } else if (this.delete_file_names2.length === 0) {
          this.delete_file_names2.push(this.imgData3.file);
        } else if (this.delete_file_names3.length === 0) {
          this.delete_file_names3.push(this.imgData3.file);
        } else {
          this.delete_file_names4.push(this.imgData3.file);
        }
        this.img3Base64 = this.img4Base64;
        this.img4Base64 = null;
        this.imgData3 = this.imgData4;
        this.imgData4 = null;
      } else {
        const obj = this.listImage.find((e) => e.src === this.img4Base64);
        this.listImage.splice(this.listImage.indexOf(obj), 1);
        if (this.delete_file_names1.length === 0) {
          this.delete_file_names1.push(this.imgData4.file);
        } else if (this.delete_file_names2.length === 0) {
          this.delete_file_names2.push(this.imgData4.file);
        } else if (this.delete_file_names3.length === 0) {
          this.delete_file_names3.push(this.imgData4.file);
        } else {
          this.delete_file_names4.push(this.imgData4.file);
        }
        this.img4Base64 = null;
        this.imgData4 = null;
      }
    },
    async uploadImg() {
      this.isLoading = true;
      const dataForm = new FormData();
      dataForm.append("account_id", this.account_id);
      if (this.imgData1 && !this.imgData1.file) {
        dataForm.append("file1", this.imgData1);
      }
      if (this.imgData2 && !this.imgData2.file) {
        dataForm.append("file2", this.imgData2);
      }
      if (this.imgData3 && !this.imgData3.file) {
        dataForm.append("file3", this.imgData3);
      }
      if (this.imgData4 && !this.imgData4.file) {
        dataForm.append("file4", this.imgData4);
      }
      if (this.delete_file_names1.length > 0) {
        dataForm.append("delete_file_names[]", this.delete_file_names1);
      }
      if (this.delete_file_names2.length > 0) {
        dataForm.append("delete_file_names[]", this.delete_file_names2);
      }
      if (this.delete_file_names3.length > 0) {
        dataForm.append("delete_file_names[]", this.delete_file_names3);
      }
      if (this.delete_file_names4.length > 0) {
        dataForm.append("delete_file_names[]", this.delete_file_names4);
      }
      await this.storeIdentity.uploadIdentification(dataForm);
    },
  },
};
definePageMeta({
  layout: "seller",
});
</script>

<style lang="scss" scoped>
.fd-edituser-container {
  background-color: $lightwhite;
  .main-content {
    margin: auto;
    width: 600px;
    @include screen(767) {
      width: 310px;
    }
    .accountNumber {
      div {
        .input-wrapper {
          svg {
            color: $green-1 !important;
          }
        }
      }
      .input-honnin {
        display: flex;
        justify-content: space-between;
        width: 600px;
        margin: 0 auto;
        @include screen(767) {
          width: 100%;
          flex-wrap: wrap;
          .item-bot {
            margin-top: 15px;
          }
        }
        &-item {
          width: 140px;
          height: 110px;
          background: $white;
          border-radius: 10px;
          margin: unset;
          display: flex;
          justify-content: center;
          align-items: center;
          &-times {
            width: 35px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;
            font-size: 35px;
            color: $orange;
            border: 2px solid $orange;
            .bi {
              margin-bottom: unset !important;
            }
          }
          &.active {
            cursor: pointer;
          }
          &-close {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid;
            border-radius: 100%;
            background: $danger;
            color: $white;
            font-size: 12px;
            cursor: pointer;
          }
          &-image {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            .img-contain {
              width: 100%;
              height: 100%;
              object-fit: contain;
              border-radius: 10px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .title {
    color: $green-1;
    margin-top: 61px;
    font-size: 24px;
    margin-bottom: 15px;
    @include screen(767) {
      font-size: 20px;
    }
    @include screen(480) {
      font-size: 18px;
    }
  }
  .fd-edituser-hr {
    width: 100%;
    border-top: 1px solid $gray-600;
    margin-top: 40px;
  }
  .h6 {
    color: $gray-600;
    @include screen(767) {
      font-size: 12px;
    }
  }
  .title-content {
    margin: 36px 0;
    color: $brownlight;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-left {
      display: none;
    }
    .icon-right {
      display: none;
    }
    @include screen(767) {
      justify-content: space-between;
      .icon-left {
        margin-left: 30px;
        cursor: pointer;
        display: block;
      }
      .icon-right {
        margin-right: 30px;
        cursor: pointer;
        display: block;
      }
    }
  }
  .mess {
    color: $gray-600;
    font-size: 12px;
  }
  .edit-save {
    button {
      background-color: $orange;
      border: 0px;
    }
  }
  .impale {
    background-color: $green;
    width: 100%;
    height: 48px;
    color: $white;
    margin-top: 30px;
    margin-bottom: 40px;
    &:hover {
      background-color: $green-1;
    }
    &:focus {
      background-color: $green-1;
    }
  }
  h3 {
    font-size: 20px;
    margin-bottom: 1em;
    padding-top: 40px;
  }
  h5 {
    font-size: 18px;
    margin-top: 2em;
    color: map-get($colors, "brown");
  }
  p {
    font-size: 16px;
    margin-bottom: 1em;
  }
  span {
    font-size: 13px;
    line-height: 1;
  }
  .icon-label {
    cursor: pointer;
    color: $gray-600;
    margin-left: 5px;
  }
}
</style>
