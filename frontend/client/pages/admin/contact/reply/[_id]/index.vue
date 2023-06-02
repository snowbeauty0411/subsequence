<template>
  <NuxtLayout name="admin">
    <SDPreLoad :preload="preload" />
    <div id="registerTemplate">
      <!-- form infomation -->
      <div class="wrap-infomation">
        <h2>お問い合わせを回答します</h2>
        <form
          ref="form-info"
          action=""
          class="register-form__infomation"
          v-on:submit.prevent="handleSubmitInfo"
        >
          <!-- name -->
          <div class="form-group wrap-contact">
            <label class="mb-2 mt-3" for="user">お名前</label>
            <div class="w-full position-relative">
              <input
                id="name"
                v-model="contact.name"
                type="text"
                readonly
                name="name"
                class="form-control"
              />
            </div>
          </div>
          <!-- email -->
          <div class="form-group wrap-contact">
            <label class="mb-2 mt-3" for="user">メールアドレス</label>
            <div class="w-full position-relative">
              <input
                id="email"
                v-model="contact.email"
                type="text"
                readonly
                name="email"
                class="form-control"
              />
            </div>
          </div>
          <!-- content -->
          <div class="form-group wrap-contact">
            <label class="mb-2 mt-3" for="content">お問い合わせ内容</label>
            <div class="w-full position-relative">
              <b-form-textarea
                id="content"
                v-model="contact.content"
                type="text"
                rows="9"
                readonly
                no-resize
                name="content"
                class="form-control"
              ></b-form-textarea>
            </div>
          </div>
          <!-- reply -->
          <div class="form-group wrap-contact">
            <label class="mb-2 mt-3" for="reply_content"
              >お問い合わせを回答します</label
            >
            <div class="w-full relative validate-form">
              <b-form-textarea
                id="reply_content"
                rows="9"
                no-resize
                name="reply_content"
                class="form-control"
                v-model.trim="v$.reply_content.$model"
                v-bind:class="{
                  'is-invalid': v$.reply_content.$error,
                }"
              ></b-form-textarea>
              <div v-if="v$.reply_content.$error" class="error-text">
                <p v-if="v$.reply_content.required.$invalid">
                  {{ Message.reply_content_required }}
                </p>
              </div>
            </div>
          </div>
          <div class="hr-b"></div>
          <div class="row">
            <div class="col-md-6 col-sm-12 d-flex justify-content-center">
              <b-button
                class="cancel-register__info border-0"
                v-on:click="$router.push({ path: '/admin/contact/list' })"
              >
                <span class="text-button">キャンセル</span></b-button
              >
            </div>
            <div class="col-md-6 col-sm-12 d-flex justify-content-center">
              <b-button
                type="submit"
                class="submit-register__info border-0"
                v-bind:is-loading="submitted"
                v-b-modal.modal-tag
              >
                <span class="text-button">回答を送信する</span></b-button
              >
            </div>
          </div>
        </form>
      </div>
    </div>
    <b-modal id="modal-tag" ref="modal-tag" hide-header hide-footer v-model="showModalReplyContact">
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="12"
              ><div class="flex justify-center py-3">
                回答を送信しますか？
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="showModalReplyContact = false"
                  >キャンセル</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button class="btn-submit" v-on:click="replyContact()">確認</b-button>
              </div>
            </b-col></b-row
          >
        </b-container>
      </div>
    </b-modal>
  </NuxtLayout>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { contactAdminStore } from "@/store/admin/contact.ts";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import { Message } from "@/utils/message";
import { required } from "@vuelidate/validators";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  setup() {
    const store = contactAdminStore();
    const toast = useToast();
    const v$ = useVuelidate();
    return {
      store,
      toast,
      v$,
    };
  },
  auth: "admin",
  layout: "admin",
  components: {
    SDPreLoad,
  },

  data() {
    return {
      preload: true,
      Message: Message.ADMIN.CONTACT,
      submitted: false,
      optionToast: {
        position: "top-right",
        duration: 3000,
        keepOnHover: true,
        singleton: true,
        fitToScreen: true,
      },
      styleCssFd: {
        height: "100px",
        align: "center",
        verticalAlign: "middle",
        color: "white",
        border: "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "20px",
        padding: "0",
        margin: "0",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
      },
      reply_content: "",
      contact: {},
      idContact: null,
      showModalReplyContact: false,
    };
  },

  validations: {
    reply_content: { required },
  },

  created() {
    this.idContact = this.$route.params._id;
    this.store.getDetailContactById(this.idContact);
  },
  computed: {
    ...mapState(contactAdminStore, ["success", "detailContact", "message", "error"]),
  },

  watch: {
    detailContact() {
      this.preload = true;
      this.contact = this.detailContact;
      this.preload = false;
    },

    success() {
      if (this.store.success === true) {
        this.toast.clear();
        this.toast.success(this.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.$router.push({
          path: `/admin/contact/list`,
        });
      }
    },

    error() {
      if (this.store.error === true) {
        this.toast.clear();
        this.toast.error(this.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
      }
    },
  },

  methods: {
    replyContact() {
      this.submitted = true;
      this.v$.reply_content.$touch();
      if (this.v$.reply_content.$error) {
        this.submitted = false;
      } else {
        const request = {
          id: this.idContact,
          reply_content: this.reply_content,
        };
        this.store.replyContact(request);
      }
      this.showModalReplyContact = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/admin/tag/index.scss";
</style>
