<template>
  <div class="createService-step6">
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="
              createService-step6-left
              flex flex-column
              justify-content-between
            "
          >
            <div class="createService-step6-left-form">
              <div class="d-flex">
                <div class="step-title">
                  サービス内容の詳細を入力しましょう。
                </div>
                <!-- <span class="ml-5 mt-4">※あとから編集不可</span> -->
              </div>
              <div class="step6-form">
                <div class="form-label">サービス内容の説明</div>
                <div class="step6-form-data relative validate-form">
                  <b-form-textarea
                    id="textarea-rows"
                    placeholder="ここに説明文が入ります。"
                    rows="9"
                    maxlength="500"
                    v-bind:change="onChangeTextarea()"
                    v-model.trim="v$.serviceContent.$model"
                    v-bind:class="{ 'is-invalid': v$.serviceContent.$error }"
                  ></b-form-textarea>
                  <div v-if="v$.serviceContent.$error" class="error-text">
                    <p v-if="v$.serviceContent.required.$invalid">
                      {{ message.service_content }}
                    </p>
                  </div>
                  <div class="description-textarea">
                    残り{{ remaining }}文字
                  </div>
                </div>
              </div>
            </div>
            <div class="createService-step6-left-btn">
              <!-- <div
                class="text-danger"
                style="padding: 0 22px; margin-bottom: 20px"
              >
                <span
                  >※あとから編集不可の項目はコースに契約者が存在する場合変更することができません。</span
                ><br />
                <span>お間違えのないよう確認してご入力ください。</span>
              </div> -->
              <div class="flex">
                <b-button
                  v-on:click="backStep()"
                  class="
                    btn-return
                    flex
                    justify-center
                    align-items-center
                    btn-step-common
                  "
                >
                  戻る
                </b-button>
                <b-button
                  v-on:click="nextStep()"
                  class="
                    btn-next
                    flex
                    align-items-center
                    justify-center
                    btn-step-common
                  "
                >
                  次へ
                </b-button>
              </div>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="createService-step6-right"></div></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import { required, minLength } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import useVuelidate from "@vuelidate/core";

export default {
  name: "step6",
  setup: () => ({
    v$: useVuelidate(),
  }),
  data() {
    return {
      message: Message.SELLER,
      serviceContent: "",
      remaining: 500,
      isEditDraftService: false,
    };
  },

  validations: {
    serviceContent: { required, minLength: minLength(1) },
  },

  created() {
    let serviceContent = localStorage.getItem("data-step-6");
    if (serviceContent !== null) {
      this.serviceContent = serviceContent;
    } else {
      this.serviceContent = "";
    }

    if (this.$route.query.hash_id !== undefined) {
      this.isEditDraftService = true;
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=1&hash_id=${hash_id}`);
      }
    } else {
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        this.$router.push("/seller/service/create?step=1");
      }
    }
  },

  watch: {
    serviceContent() {
      if (this.serviceContent != "") {
        localStorage.setItem("data-step-6", this.serviceContent);
      }
    },
  },

  mounted() {
    window.addEventListener("beforeunload", this.reloadPage, { capture: true });
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.reloadPage, {
      capture: true,
    });
  },

  methods: {
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    onChangeTextarea() {
      this.remaining = 500 - this.serviceContent.length;
    },

    async nextStep() {
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        if (this.isEditDraftService) {
          const hash_id = this.$route.query.hash_id;
          localStorage.setItem("data-step-6", this.serviceContent);
          this.$router.push(
            `/seller/service/create?step=7&hash_id=${hash_id}`
          );
        } else {
          localStorage.setItem("data-step-6", this.serviceContent);
          this.$router.push("/seller/service/create?step=7");
        }
      }
    },

    backStep() {
      if (this.isEditDraftService) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=5&hash_id=${hash_id}`);
      } else {
        this.$router.push("/seller/service/create?step=5");
      }
    },
  },
};
</script>

<style></style>
