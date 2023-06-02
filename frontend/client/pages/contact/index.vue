<template>
  <NuxtLayout name="layoutdefault"
    ><div class="contact">
      <div class="contact-header flex items-end">
        <div class="contact-header-textJP">お問い合わせ</div>
        <div class="contact-header-textEN">Contact</div>
      </div>
      <div class="contact-main">
        <div class="contact-main-form relative validate-form">
          <div class="create-form" v-on:keyup.enter="createNewContact">
            <!-- Name -->
            <!-- <div class="text-center text-danger">{{ message }}</div> -->
            <div class="form-label">お名前</div>
            <div class="form-group">
              <b-form-input
                placeholder="例）山田　太郎"
                class="custom-input"
                v-model.trim="v$.contact.name.$model"
                v-bind:class="{ 'is-invalid': v$.contact.name.$error }"
              />
              <div v-if="v$.contact.name.$error" class="error-text">
                <p v-if="v$.contact.name.required.$invalid">
                  {{ message.name_required }}
                </p>
              </div>
            </div>
          </div>
          <!-- Email -->
          <div class="form-label mt-3">メールアドレス*</div>
          <div class="form-group">
            <b-form-input
              placeholder="例）qazwsx@gmail.com"
              class="custom-input"
              v-model.trim="v$.contact.email.$model"
              v-bind:class="{ 'is-invalid': v$.contact.email.$error }"
            />
            <div v-if="v$.contact.email.$error" class="error-text">
              <p v-if="v$.contact.email.required.$invalid">
                {{ message.email_required }}
              </p>
            </div>
          </div>

          <div class="form-label mt-3">お問い合わせ内容*</div>
          <div class="form-group">
            <b-form-textarea
              id="textarea-rows"
              placeholder="こちらにお問い合わせの内容やご質問をご記入ください。"
              rows="9"
              no-resize
              v-model.trim="v$.contact.content.$model"
              v-bind:class="{ 'is-invalid': v$.contact.content.$error }"
            ></b-form-textarea>
            <div v-if="v$.contact.content.$error" class="error-text">
              <p v-if="v$.contact.content.required.$invalid">
                {{ message.content_required }}
              </p>
            </div>
          </div>
          <div class="mt-2">
            <b-button class="submit-form" v-on:click="createNewContact()">
              <span class="text-button">お問い合わせメールを送信する</span>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import { contactStore } from "@/store/contact";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";
import { required } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import useVuelidate from "@vuelidate/core";
export default {
  setup() {
    const store = contactStore();
    const toast = useToast();
    const v$ = useVuelidate();
    return {
      v$,
      store,
      toast,
    };
  },
  data() {
    return {
      contact: {
        name: "",
        email: "",
        content: "",
      },
      account_id: "",
      submitted: false,
      login_type: null,
      optionToast: {
        position: "top-right",
        duration: 3000,
        keepOnHover: true,
        singleton: true,
        fitToScreen: true,
      },
      message: Message.CONTACT
    };
  },
  validations: {
    contact: {
      name: {
        required
      },

      email: {
        required
      },

      content: {
        required
      },
    },
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
      this.login_type = localStorage.getItem("type");
    } else {
      this.account_id = Cookies.get("account_id");
      this.login_type = Cookies.get("type");
    }

    if (this.login_type === "SELLER") {
      this.store.getAccountSeller(this.account_id);
    } else if (this.login_type === "BUYER") {
      this.store.getAccountBuyer(this.account_id);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    this.store.success = "";
    this.store.error = "";
  },
  computed: {
    ...mapState(contactStore, ["success", "message", "error", "dataAccount"]),
  },
  watch: {
    dataAccount() {
      if (this.login_type === "SELLER") {
        this.contact.name = this.dataAccount.sellers.account_name;
        this.contact.email = this.dataAccount.email;
      } else if (this.login_type === "BUYER") {
        this.contact.name = this.dataAccount.buyers.account_name;
        this.contact.email = this.dataAccount.email;
      }
    },
    success() {
      if (this.store.success === "true") {
        this.toast.success(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.$router.push({
          path: `/contact/complete`,
        });
      }
    },
    error() {
      if (this.store.error === "true") {
        this.toast.error(this.store.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
      }
    },
  },
  methods: {
    async createNewContact() {
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        this.submitted = true;
        const dataForm = this.contact;
        await this.store.createContact(dataForm);
      }
    },
  },
};
</script>
<style lang="scss">
@import "~/assets/scss/auth/index.scss";
</style>

<style lang="scss" scoped>
.contact {
  &-header {
    padding: 20px 400px;
    @include screen(991) {
      padding: 20px 50px;
    }
    @include screen(480){
      padding-inline: 30px;
    }
    background: $lightwhite;
    &-textJP {
      color: #5e5c5c;
      font-size: 22px;
      font-weight: 600;
      @include screen(480){
        font-size: 18px;
      }
    }
    &-textEN {
      margin-left: 20px;
      color: #5e5c5c;
      font-size: 16px;
      @include screen(480){
        font-size: 12px;
      }
    }
  }
  &-main {
    padding: 100px 400px;
    @include screen(991) {
      padding: 30px 50px;
    }
    @include screen(9921023) {
      padding: 50px;
    }
    @include screen(10241365) {
      padding: 30px 100px;
    }
    @include screen(480){
      padding-inline: 20px;
    }
    background: $white;
    &-form {
      color: #7e7d7d;
      font-size: 16px;
      font-weight: 600;

      .create-from {
        .form-label {
          color: #7e7d7d;
          font-weight: 600;
          font-size: 20px;
        }
      }
      .form-group {
        position: relative;
        .control {
          position: absolute;
          top: 50%;
          right: 30px;
          transform: translateY(-50%);
          img {
            width: 20px;
            cursor: pointer;
          }
        }
      }
      .submit-form {
        margin-top: 50px;
        background-color: $orange;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 11px 0;
        width: 100%;
        border-radius: 8px;
        border: none;
        &:focus {
          box-shadow: 0 0 0 0.25rem #95c895 !important;
        }
        .text-button {
          color: #fff;
          font-size: 1rem;
        }
      }
      #textarea-rows {
        border-radius: 9px !important;
        border-color: #5e5c5c;
      }
      #textarea-rows:focus {
        border-color: $orange;
      }
      .custom-input:focus {
        border-color: $orange;
      }
    }
  }
}
.error-text {
  color: red;
  margin-top: 10px;
}
</style>
