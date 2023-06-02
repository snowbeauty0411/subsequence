<template>
  <NuxtLayout name="admin">
    <SDPreLoad :preload="preload" />
    <div class="admin-honnin">
      <div class="customer-container">
        <div class="main-content">
          <div class="accountNumber">
            <div class="h5 text-center title-content">本人確認</div>
            <div>
              <b-row>
                <b-col cols="12" md="7">
                  <div class="fd-edituser-content">
                    <form
                      ref="form-info"
                      class="fd-edituser-form"
                      v-on:submit.prevent="handleSubmitInfo"
                    >
                      <div class="fd-edituser-input" v-if="infoUser.sellers">
                        <label class="mb-2" for="input-live"
                          >ニックネーム</label
                        >
                        <b-form-input
                          id="nickName input-live"
                          v-model="infoUser.sellers.account_name"
                          type="text"
                          name="nickName"
                          placeholder="ニックネーム"
                          readonly
                        />
                      </div>
                      <div class="fd-edituser-input">
                        <label class="mb-2" for="input-live"
                          >メールアドレス</label
                        >
                        <div class="flex relative">
                          <b-form-input
                            id="input-live email"
                            v-model="infoUser.email"
                            type="text"
                            name="email"
                            placeholder="メールアドレス"
                            readonly
                          />
                        </div>
                      </div>
                      <div class="fd-edituser-input">
                        <label class="mb-2" for="input-live"
                          >生年月日</label
                        >
                        <div class="flex relative">
                          <b-form-input
                            id="input-live email"
                            v-model="infoUser.birth_day"
                            type="text"
                            name="birthday"
                            placeholder="生年月日"
                            readonly
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </b-col>
                <b-col cols="12" md="5">
                  <div class="image-verify justify-center">
                    <div class="image-verify-item">
                      <div
                        class="image-verify-image my-3"
                        v-if="img1Base64"
                        v-b-modal.modal-file
                        v-on:click="showModal(img1Iframe, img1Base64, imgData1)"
                      >
                        <img class="img-contant" v-bind:src="img1Base64" />
                      </div>
                      <div
                        class="image-verify-image my-3"
                        v-if="img2Base64"
                        v-b-modal.modal-file
                        v-on:click="showModal(img2Iframe, img2Base64, imgData2)"
                      >
                        <img class="img-contant" v-bind:src="img2Base64" />
                      </div>
                    </div>
                  </div>
                  <div v-if="isOpenGallery" class="preview-image">
                    <div
                      class="preview-image-backdrop"
                      v-on:click="toggleOpenGallery(0)"
                    />
                    <div class="preview-image-content">
                      <div
                        class="preview-image-close"
                        v-on:click="toggleOpenGallery(0)"
                      >
                        <BootstrapIcon icon="Times" />
                      </div>
                      <div v-if="image.length" class="preview-image-block">
                        <iframe
                          v-if="image[isGalleryActive].url.includes('pdf')"
                          class="img-contant"
                          v-bind:src="image[isGalleryActive].url"
                          alt=""
                        />
                        <img
                          v-else
                          class="img-contant"
                          v-bind:src="image[isGalleryActive].url"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="flex justify-between">
              <b-button
                class="cancel border-0"
                v-on:click="$router.push({ path: '/admin/user/list' })"
              >
                キャンセル</b-button
              >
              <b-button
                v-bind:is-loading="isLoadingConfirm"
                class="impale border-0"
                :disabled="!img1Base64 && !img2Base64"
                v-on:click="confirmIdentity()"
              >
                本人確認</b-button
              >
              <b-button
                v-bind:is-loading="isLoadingReject"
                class="reject border-0"
                :disabled="!img1Base64 && !img2Base64"
                v-on:click="rejectIdentity()"
              >
                否認</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="modal-file" hide-footer hide-header size="xl" v-model="showModalFile">
      <div class="modal-reserve flex flex-col">
        <div class="modal-reserve-header relative flex justify-center">
          <div class="text-name">{{ file_name }}</div>
          <div
            class="icon-close absolute"
            v-on:click="hideModal()"
            style="cursor: pointer"
          >
            <SDIcon icon="x" />
          </div>
        </div>
        <div class="modal-reserve-content flex flex-col">
          <iframe
            class="embed-responsive-it"
            :src="iframeSrc"
            style="height: 500px" v-if="iframeSrc"
          ></iframe>
          <img :src="imgBase64" alt="" v-else>
        </div>
      </div>
    </b-modal>
  </NuxtLayout>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import Checkradio from "@/components/FDRadiobutton";
import { identityStore } from "@/store/identity";
import { usersAdminStore } from "@/store/admin/user.ts";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import pdfDefault from "@/assets/images/pdf-default.png";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  name: "Honnin",
  auth: "admin",
  layout: "admin",
  components: {
    BootstrapIcon,
    Checkradio,
    SDPreLoad,
  },
  setup() {
    const storeIdentity = identityStore();
    const storeAdmin = usersAdminStore();
    const toast = useToast();
    return {
      toast,
      storeIdentity,
      storeAdmin,
    };
  },
  created() {
    this.storeIdentity.success = '';
    this.storeIdentity.error = '';
    this.storeIdentity.getFileIdentificationById(this.$route.params._id, this.user_type);
    this.storeAdmin.getInfoUser(this.$route.params._id);
  },
  data() {
    return {
      showModalFile: false,
      preload: true,
      user_type: "seller",
      idUser: this.$route.params.id,
      isOpenGallery: false,
      isGalleryActive: 0,
      image: [
        {
          path: "../../../assets/images/avatar.png",
          url: "../../../assets/images/avatar.png",
        },
      ],
      optionsToast: {
        position: "top-right",
        duration: 3000,
        keepOnHover: true,
        singleton: true,
        fitToScreen: true,
      },
      isLoadingConfirm: false,
      isLoadingReject: false,
      person: "1",
      personCheck1: true,
      personCheck2: false,
      sexCheck1: false,
      sexCheck2: false,
      sexCheck3: false,
      zipcodeOne: "323",
      zipcodeTwo: "3232",
      dataPath: [],
      infoUser: {},
      pdfDefault,
      img1Base64: null,
      img2Base64: null,
      img3Base64: null,
      img4Base64: null,
      iframeSrc: null,
      file_name: "",
      imgBase64: null,
      img1Iframe: null,
      img2Iframe: null,
      img3Iframe: null,
      img4Iframe: null,
      listImage: [],
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
    ...mapState(usersAdminStore, ["detailUser"]),
  },

  watch: {
    success() {
      if (this.storeIdentity.success === "true") {
        this.toast.success(this.storeIdentity.message, this.optionToast);
        this.storeIdentity.success = "";
        this.storeIdentity.message = "";
        this.$router.push({
          path: `/admin/user/list`,
        });
      }
    },

    error() {
      if (this.storeIdentity.error === "true") {
        this.toast.error(this.storeIdentity.message, this.optionToast);
        this.storeIdentity.error = "";
        this.storeIdentity.message = "";
      }
    },

    dataIdentity() {
      this.preload = true;
      if (this.dataIdentity) {
          this.getImage(this.dataIdentity.account_id, this.dataIdentity.file1, 1);
          this.imgData1 = this.dataIdentity.file1;
          this.dataPath.push(this.dataIdentity.file1);

          this.getImage(this.dataIdentity.account_id, this.dataIdentity.file2, 2);
          this.imgData2 = this.dataIdentity.file2;
          this.dataPath.push(this.dataIdentity.file1);
      }
      this.preload = false;
    },

    detailUser() {
      this.preload = true;
      this.infoUser = this.detailUser;
      this.infoUser.birth_day = this.detailUser.birth_day ? this.$moment(this.detailUser.birth_day).format('YYYY/MM/DD') : "";
      this.preload = false;
    },
  },

  methods: {
    getImage(account_id, fileName, index) {
      const req = {
        account_id,
        fileName,
        index
      };
      const _this = this;
      const img = this.storeIdentity.getImageIdentificById(req);
      Promise.resolve(img).then(function (value) {
        if (value.type === "application/pdf") {
          const reader = new FileReader();
          reader.readAsDataURL(value);
          reader.onload = () => {
            _this["img" + index + "Iframe"] = reader.result;
          };
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

    toggleOpenGallery(id) {
      this.isOpenGallery = !this.isOpenGallery;
      this.isGalleryActive = id;
      if (this.isOpenGallery) {
        document.documentElement.style.overflow = "hidden";
        return;
      }
      document.documentElement.style.overflow = "auto";
    },

    async confirmIdentity() {
      this.isLoadingConfirm = true;
      await this.storeIdentity.confirmIdentificationById(
        this.$route.params._id
      );
      this.isLoadingConfirm = false;
    },

    async rejectIdentity() {
      this.isLoadingConfirm = true;
      await this.storeIdentity.rejectIdentificationById(this.$route.params._id);
      this.isLoadingConfirm = false;
    },

    showModal(src, imgBase64, fileName) {
      this.iframeSrc = src;
      this.file_name = fileName;
      this.imgBase64 = imgBase64;
    },

    hideModal() {
      this.showModalFile = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/admin/user/main.scss";
</style>