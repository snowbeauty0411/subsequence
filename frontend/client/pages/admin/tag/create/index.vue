<template>
  <NuxtLayout name="admin">
    <div id="registerTemplate">
      <!-- form infomation -->
      <div class="wrap-infomation">
        <h2>新規作成</h2>
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
                v-on:click="create()"
              >
                <span class="text-button">内容を保存</span></b-button
              >
            </div>
          </div>
        </form>
      </div>
    </div>
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
  created() {},
  computed: {
    ...mapState(tagAdminStore, ["success", "message", "error"]),
  },
  data() {
    return {
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
    };
  },

  validations: {
    name: { required },
  },

  watch: {
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
    create() {
      this.submitted = true;
      this.v$.name.$touch();
      if (this.v$.name.$error) {
        this.submitted = false;
      } else {
        const dataForm = {
          name: this.name,
        };

        this.store.createTag(dataForm);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/admin/tag/index.scss";
</style>
