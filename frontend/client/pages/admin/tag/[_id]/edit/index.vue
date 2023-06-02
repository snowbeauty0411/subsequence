<template>
  <NuxtLayout name="admin">
    <div id="registerTemplate">
      <!-- form infomation -->
      <div class="wrap-infomation">
        <h2>基本情報</h2>
        <form
          ref="form-info"
          action=""
          class="register-form__infomation"
          v-on:submit.prevent="handleSubmitInfo"
        >
          <!-- tag name -->
          <div class="form-group wrap-tag-name">
            <label class="mb-2 mt-3" for="tag">タグ名</label>
            <div class="w-full position-relative relative validate-form">
              <input
                id="name"
                v-model.trim="v$.name.$model"
                type="text"
                name="name"
                class="form-control"
                placeholder=""
                v-bind:class="{ 'is-invalid': v$.name.$error }"
              />
              <span v-if="v$.name.$error" class="error-text">{{
                listMess.name_required
              }}</span>
            </div>
          </div>
          <div class="hr-b"></div>
          <div class="row">
            <div class="col-md-6 col-sm-12 d-flex justify-content-center">
              <b-button
                class="cancel-register__info border-0"
                v-on:click="$router.push({ path: '/admin/tag/list' })"
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
                <span class="text-button">修正する</span></b-button
              >
            </div>
          </div>
        </form>
      </div>
    </div>
    <b-modal
      id="modal-tag"
      ref="modal-tag"
      hide-header
      hide-footer
      v-model="showModalTag"
    >
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="12"
              ><div class="flex justify-center py-3">
                変更を保存します。よろしいですか
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="showModalTag = false"
                  >キャンセル</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-submit"
                  v-on:click="edit()"
                  >確認</b-button
                >
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
import { tagAdminStore } from "@/store/admin/tag.ts";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import { Message } from "@/utils/message";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    const store = tagAdminStore();
    const toast = useToast();
    return {
      store,
      toast,
      v$: useVuelidate(),
    };
  },
  auth: "admin",
  layout: "admin",

  data() {
    return {
      showModalTag: false,
      listMess: Message.ADMIN.TAG,
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
      name: "",
      tagDetail: {},
      idTag: null
    };
  },

  validations: {
    name: { required },
  },

  created() {
    this.idTag = this.$route.params._id;
    this.store.getDetailTagById(this.idTag);
  },
  computed: {
    ...mapState(tagAdminStore, ["success", "detailTag", "message", "error"]),
  },

  watch: {
    detailTag() {
      this.tagDetail = this.detailTag;
      this.name = this.tagDetail.name;
    },

    success() {
      if (this.store.success === true) {
        this.toast.clear();
        this.toast.success(this.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.$router.push({
          path: `/admin/tag/list`,
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
    edit() {
      this.submitted = true;
      this.v$.name.$touch();
      if (this.v$.name.$error) {
        this.submitted = false;
      } else {
        const request = {
          id: this.idTag,
          name: this.name,
        };
        this.store.editTag(request);
      }
      this.showModalTag = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/admin/tag/index.scss";
</style>
