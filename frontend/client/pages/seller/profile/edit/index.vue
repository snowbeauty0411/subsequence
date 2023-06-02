<template>
  <b-container class="edit-profile">
    <SDPreLoad :preload="preload" />
    <div class="flex mb-5 flex-col d-none">
      <div class="edit-profile-link flex items-center">
        <NuxtLink
          class="cursor-pointer hover:text-[#e79c3a]"
          @click="$router.back()"
          >アカウント管理</NuxtLink
        >
        <div class="mx-4">
          <BootstrapIcon icon="chevron-right" size="sm" />
        </div>
        <div>プロフィール編集</div>
      </div>
      <div class="edit-profile-text">プロフィール編集</div>
    </div>
    <div class="w-full edit-profile-content text-center">
      <span class="hiddenFileInput mt-4 mb-2">
        <b-overlay :show="loadingImg">
          <label for="img1" class="w-full">
            <div class="data-image-left-item relative">
              <img
                src="@/assets/images/iconCamera.png"
                alt=""
                class="absolute img-icon"
                v-if="!avatarImg"
              />
              <img
                :src="avatarImg"
                alt=""
                class="absolute img-main"
                v-if="avatarImg !== null"
              />
              <img :src="avatarDefault" alt="" class="absolute img-main" v-else />
            </div>
          </label>
          <input
            type="file"
            class="hidden"
            id="img1"
            accept="image/png, .pdf, .jpg, .gif"
            @change="onFileChangeImg1"
          />
        </b-overlay>
      </span>
      <div class="group-content relative pb-5">
        <b-form-group
          label-cols-lg="3"
          label-size="lg"
          label="アカウント名"
          label-for="input-lg"
          content-cols-lg="9"
          class="group-content-form"
          label-text-align="left"
        >
          <b-form-input
            id="input-lg"
            size="lg"
            placeholder="アカウント名"
            v-model="account_name"
          ></b-form-input>
          <div v-if="messageError !== null" class="message-error my-2">
            {{ messageError }}
          </div>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="3"
          label-size="lg"
          label="利用区分"
          label-for="input-lg"
        >
          <div class="flex checkbox-edit">
            <b-form-radio
              v-model="classification_id"
              class="mr-3"
              name="some-radios"
              size="lg"
              value="1"
              >個人で利用</b-form-radio
            >
            <b-form-radio
              v-model="classification_id"
              class="mr-3"
              size="lg"
              name="some-radios"
              value="2"
              >法人で利用</b-form-radio
            >
          </div>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="3"
          label-size="lg"
          label="プロフィール説明文"
          label-for="input-lg"
          class="textarea-description"
          label-align-lg="left"
        >
          <b-form-textarea
            id="textarea-no-resize"
            placeholder="プロフィール説明文"
            rows="3"
            no-resize
            v-model="profile"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="3"
          label-size="lg"
          label="WEBサイトURL"
          label-for="input-lg"
        >
          <b-form-input
            id="input-lg"
            size="lg"
            placeholder="WEBサイトURL"
            v-model="url_official"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="3"
          label-size="lg"
          label="SNSリンク"
          label-for="input-lg"
        >
          <b-input-group size="lg" class="mb-3">
            <div class="flex w-full">
              <div class="form-custom-prepend-img flex items-center">
                <img src="@/assets/images/iconFacebook.png" alt="" />
              </div>
              <div class="form-custom-prepend flex items-center">
                https://facebook.com/
              </div>
              <b-form-input
                v-model="url_facebook"
                id="input-lg"
                size="lg"
                class="form-input-custom-prepend"
                placeholder="ユーザーID"
              ></b-form-input>
            </div>
          </b-input-group>
          <b-input-group size="lg" class="mb-3">
            <div class="flex w-full">
              <div class="form-custom-prepend-img1 flex items-center">
                <img src="@/assets/images/iconInsta.png" alt="" />
              </div>
              <div class="form-custom-prepend flex items-center">
                https://instagram.com/
              </div>
              <b-form-input
                v-model="url_instagram"
                id="input-lg"
                size="lg"
                class="form-input-custom-prepend"
                placeholder="ユーザーID"
              ></b-form-input>
            </div>
          </b-input-group>
          <b-input-group size="lg" class="mb-3">
            <div class="flex w-full">
              <div class="form-custom-prepend-img1 flex items-center">
                <img src="@/assets/images/iconTwitter.png" alt="" />
              </div>
              <div class="form-custom-prepend flex items-center">
                https://twitter.com/
              </div>
              <b-form-input
                v-model="url_twitter"
                id="input-lg"
                size="lg"
                class="form-input-custom-prepend"
                placeholder="ユーザーID"
              ></b-form-input>
            </div>
          </b-input-group>
        </b-form-group>
      </div>
      <b-button
        class="w-full profile-edit-save"
        v-bind:is-loading="submitted"
        v-on:click="editProfileAccount()"
        >保存する</b-button
      >
    </div>
    <!-- Modal confirm -->
    <b-modal
      id="modal-tag"
      ref="modal-tag"
      hide-header
      hide-footer
      v-model="showModalConfirm"
    >
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="12">
              <div class="flex justify-center py-3">
                アカウント名または生年月日を変更すると本人確認が削除され、最初から行われます。<br />
                変更しますか？
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="showModalConfirm = false"
                  >いいえ</b-button
                >
              </div>
            </b-col>
            <b-col cols="6">
              <div class="flex justify-center py-3">
                <b-button class="btn-submit" v-on:click="updateProfile"
                  >はい</b-button
                >
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import avatarDefault from "@/assets/images/ellipse.png";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { Message } from "@/utils/message";
import Cookies from "js-cookie";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  name: "SellerEditProfile",
  auth: false,
  setup() {
    const store = sellerStore();
    const toast = useToast();
    return {
      store,
      toast,
    };
  },
  components: {
    BootstrapIcon,
    SDPreLoad,
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.account_id = Cookies.get("account_id");
    }
    this.store.getAccount(this.account_id);
  },
  computed: {
    ...mapState(sellerStore, ["success", "message", "dataAccount", "error"]),
  },
  data() {
    return {
      avatarDefault,
      account_id: null,
      account_name: "",
      selectedOption: "",
      profile: "",
      url_official: "",
      url_facebook: "",
      url_instagram: "",
      url_twitter: "",
      urlImg: null,
      business_id: "",
      submitted: false,
      avatarImg: null,
      avatar: null,
      classification_id: "",
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
      messageError: null,
      showModalConfirm: false,
      preload: true,
      file: null,
      messageImage: Message.SELLER,
      loadingImg: false,
    };
  },
  watch: {
    dataAccount() {
      this.preload = true;
      if (this.dataAccount.sellers !== null) {
        this.account_name = this.dataAccount.sellers.account_name;
        this.profile = this.dataAccount.sellers.profile_text_sell;
        this.avatarImg = this.dataAccount.sellers.profile_image_url_sell;
        this.business_id = this.dataAccount.sellers.business_id;
        this.classification_id = this.dataAccount.classification_id;
        this.url_official = this.dataAccount.sellers.url_official;
        this.url_facebook = this.dataAccount.sellers.url_facebook;
        this.url_instagram = this.dataAccount.sellers.url_instagram;
        this.url_twitter = this.dataAccount.sellers.url_twitter;
      }
      this.preload = false;
    },

    success() {
      this.showModalConfirm = false;
      if (this.store.success === "true") {
        this.toast.success(this.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.$router.push({
          path: `/seller/account`,
        });
        this.store.getAccount(this.account_id);
      }
    },

    error() {
      if (this.store.error === "true") {
        this.toast.error(this.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
      }
    },
  },
  methods: {
    editProfileAccount() {
      this.submitted = true;
      if (this.account_name === "") {
        this.messageError = Message.LOGIN.account_name;
        this.submitted = false;
      } else {
        const dataForm = {
          account_id: this.account_id,
          account_name: this.account_name,
          business_id: this.business_id,
          profile: this.profile,
          classification_id: Number(this.classification_id),
          url_official: this.url_official,
          url_facebook: this.url_facebook,
          url_instagram: this.url_instagram,
          url_twitter: this.url_twitter,
        };
        if (this.dataAccount.sellers.account_name != this.account_name) {
          this.showModalConfirm = true;
        } else {
          this.submitted = false;
          this.store.editProfile(dataForm);
          if (this.file != null) {
            this.uploadAvatarSeller(this.file);
          }
        }
      }
    },

    updateProfile() {
      const dataForm = {
        account_id: this.account_id,
        account_name: this.account_name,
        business_id: this.business_id,
        profile: this.profile,
        classification_id: Number(this.classification_id),
        url_official: this.url_official,
        url_facebook: this.url_facebook,
        url_instagram: this.url_instagram,
        url_twitter: this.url_twitter,
      };
      this.store.editProfile(dataForm);
      if (this.file != null) {
        this.uploadAvatarSeller(this.file);
      }
      this.submitted = false;
    },

    onFileChangeImg1(e) {
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.toast.error(this.messageImage.max_size_image, this.optionToast);
      } else {
        this.loadingImg = true;
        setTimeout(() => {
          this.loadingImg = false;
          this.file = e.target.files[0];
          this.avatarImg = URL.createObjectURL(this.file);
        }, 1000);
      }
    },

    async uploadAvatarSeller(file) {
      const dataForm = new FormData();
      dataForm.append("seller_id", this.account_id);
      dataForm.append("file", file);
      await this.store.uploadAvatar(dataForm);
    },
  },
};
definePageMeta({
  layout: "seller",
});
</script>

<style lang="scss">
.edit-profile {
  .col-form-label {
    text-align: start;
  }
  .checkbox-group {
    text-align: start;
    .form-check {
      margin-right: 100px !important;
    }
  }
  &-text {
    font-size: 22px;
    font-weight: 600;
    color: $gray-800;
  }
  &-link {
    font-size: 14px;
    font-weight: 600;
    color: $gray-800;
    margin-bottom: 50px;
    margin-top: 30px;
  }
  &-content {
    background-color: $white;
    margin-bottom: 300px;
    .group-content {
      width: 85%;
      left: 7%;
      &-form {
        label {
          text-align: left;
        }
      }
    }
    label {
      font-size: 18px;
    }
    .form-custom-prepend {
      width: 40%;
      font-size: 16px;
      border: 1px solid #ced4da;
      color: #7e7d7d;
      padding-left: 20px;
      border-radius: 0.3rem 0 0 0.3rem;
    }
    .form-input-custom-prepend {
      border-left: unset !important;
      border-radius: 0 0.3rem 0.3rem 0;
    }
    .form-custom-prepend-img {
      margin: 0 10px 0 -25px;
      @include screen(480) {
        margin: 0 10px;
      }
      img {
        width: 13px;
      }
    }
    .form-custom-prepend-img1 {
      margin: 0 10px 0 -30px;
      @include screen(480) {
        margin: 0 6px;
      }
      img {
        width: 19px;
      }
    }
    .col-form-label {
      text-align: left !important;
    }
    .checkbox-edit {
      border: 1px solid $blue-2 !important;
      border-radius: 0.25rem;
      padding: 0px 22px;
      .form-check {
        width: 50%;
        @include screen(991) {
          width: 100%;
        }
        input {
          font-size: 20px;
          border-radius: 0;
          margin-top: 7px;
          cursor: pointer;
          &:checked {
            background-image: unset !important;
            background: $orange !important;
            border-color: $orange !important;
          }
        }
        label {
          padding-top: 4px;
        }
      }
      .checkbox-corporation {
        margin-left: 100px;
      }
    }
    .select-industry {
      .form-select {
        background-image: url("./assets/images/selectIcon.svg");
      }
    }
    .textarea-description {
      textarea {
        height: 300px;
      }
    }
    .bv-no-focus-ring {
      border: 1px solid $blue-2 !important;
      border-radius: 0.25rem;
      padding: 0px 22px;
      .form-check {
        input {
          font-size: 20px;
          border-radius: 0;
          margin-top: 7px;
        }
        label {
          padding-top: 4px;
        }
      }
      .checkbox-corporation {
        margin-left: 100px;
      }
    }
    .hiddenFileInput > input {
      height: 100%;
      width: 100;
      opacity: 0;
      cursor: pointer;
    }
    .hiddenFileInput {
      width: 120px;
      height: 120px;
      display: inline-block;
      overflow: hidden;
      cursor: pointer;
      .data-image-left-item {
        width: 120px;
        height: 120px;
        background: #c4c4c4;
        border-radius: 50%;
        cursor: pointer;
        .img-icon {
          width: 40px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 999;
        }
        .img-main {
          object-fit: cover;
          object-position: center;
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
      }
    }
    .profile-edit-save {
      margin-top: 100px;
      background-color: $orange;
      color: $white;
      font-size: 18px;
      height: 60px;
      border: 0px;
      border-radius: 0px;
    }
  }
}
</style>
