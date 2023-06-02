<template>
  <div class="editService-step8">
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="editService-step8-left flex flex-col justify-between">
            <div class="editService-step8-left-form">
              <div class="d-flex">
                <div class="step-title">
                  このコースの利用には年齢確認が必要ですか？
                </div>
                <span class="mt-4 step-note text-danger">※</span>
              </div>
              <div class="step8-form">
                <div class="step8-form-data relative">
                  <b-form-radio-group
                    v-model="selected"
                    :options="options"
                    stacked
                    class="w-full form-raido-custom"
                  ></b-form-radio-group>
                  <div
                    class="descriptionYellow absolute flex flex-col"
                    style="left: 100px; top: 60%"
                  >
                    <div class="flex items-end textGray-custom w−100">
                      <input
                        maxlength="2"
                        v-model.trim="age_confirm"
                        class="lineDes text-yellow-500 text-center"
                        style="
                          border-bottom: 1px solid #e79c3a;
                          width: 40px;
                          outline: none;
                          background: unset;
                        "
                        :disabled="selected == 0"
                        v-bind="formatNumber()"
                        @blur="formatAgeConfirm()"
                        id="age_confirm"
                      />
                      <span style="width: 200px">歳以上が利用可能</span>
                    </div>
                    <div class="flex items-center py-1">
                      <BootstrapIcon
                        icon="info-circle-fill"
                        size="sm"
                        class="mx-1 exclamation-triangle-fill"
                        variant="warning"
                      /><span>数字を入力してください</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="editService-step8-left-btn">
              <div
                class="text-danger"
                style="padding: 0 22px; margin-bottom: 10px"
              >
                <b-row>
                  <b-col cols="2" class="col-start"
                    ><span class="step-note">※</span></b-col
                  >
                  <b-col cols="10" class="col-text-note">
                    <span
                      >この項目は、契約者が存在する場合変更することができません。</span
                    ><br />
                    <span class=""
                      >お間違えのないよう確認してご入力ください。</span
                    >
                  </b-col>
                </b-row>
              </div>
              <div class="flex">
                <b-button
                  class="
                    btn-return
                    flex
                    justify-center
                    items-center
                    btn-step-common
                  "
                  v-on:click="backStep()"
                >
                  戻る
                </b-button>
                <b-button
                  class="
                    btn-next
                    flex
                    items-center
                    justify-center
                    btn-step-common
                  "
                  v-on:click="nextStep()"
                >
                  次へ
                </b-button>
              </div>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="
              editService-step8-right
              flex flex-col
              items-center
              justify-between
              h-full
            "
          ></div></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { useToast } from "vue-toastification";
import { Message } from "@/utils/message";

export default {
  name: "Step8",

  components: {
    BootstrapIcon,
  },

  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },

  data() {
    return {
      selected: "0",
      age_confirm: null,
      options: [
        { text: "不要", value: "0" },
        { text: "必要", value: "1" },
      ],
      queryData: null,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      message: Message.SELLER,
      isEditDraftService: false,
      isNotFullWidth: true,
      messageShippingInfo: Message.DELIVERY,
      detailCourse: {},
      copyCourse: "",
      detailCopyCourse1: {},
      listCourse: [],
    };
  },

  watch: {
    selected() {
      if (this.selected == 0) {
        this.age_confirm = "";
        this.isNotFullWidth = true;
      } else {
        if (this.age_confirm != "" && this.age_confirm != null) {
          if (this.age_confirm) {
            const regex = /^[0-9]*[1-9][0-9]*$/;
            const found = regex.test(this.age_confirm);
            if (found) {
              this.isNotFullWidth = true;
            } else {
              this.isNotFullWidth = false;
            }
          }
        } else {
          this.isNotFullWidth = false;
        }
      }
    },

    age_confirm() {
      if (this.age_confirm != "" && this.age_confirm != null) {
        if (this.age_confirm) {
          const regex = /^[0-9]*[1-9][0-9]*$/;
          const found = regex.test(this.age_confirm);
          if (found) {
            this.isNotFullWidth = true;
            if (this.selected === "0") {
              this.age_confirm = null;
            } else {
              if (this.age_confirm === null || this.age_confirm === "") {
                this.isNotFullWidth = false;
              } else {
                if (!this.isNotFullWidth) {
                  if (
                    Number(this.age_confirm) < 10 ||
                    Number(this.age_confirm) >= 100
                  ) {
                    this.isNotFullWidth = false;
                  } else {
                    this.isNotFullWidth = false;
                  }
                }
              }
            }
            this.listCourse[this.index].age_confirm = this.age_confirm;
            localStorage.setItem(
              "list-course",
              JSON.stringify(this.listCourse)
            );
          } else {
            this.isNotFullWidth = false;
          }
        }
        return this.isNotFullWidth;
      } else {
        this.isNotFullWidth = false;
      }
    },
  },

  created() {
    let serviceName = localStorage.getItem("data-step-1");
    if (serviceName == null) {
      this.$router.push("/seller/service/create?step=1");
    }
    this.queryData = Number(this.$route.query.step);
    this.index = Number(this.$route.query.index);
    this.listCourse = JSON.parse(localStorage.getItem("list-course"));
    if (this.listCourse[this.index].age_confirm === 0) {
      this.selected = "0";
    } else {
      this.selected = "1";
      this.age_confirm = this.listCourse[this.index].age_confirm;
    }
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

    formatNumber() {
      if (this.age_confirm !== 0) {
        if (/^0/.test(this.age_confirm) || /^[０-９]/.test(this.age_confirm)) {
          this.age_confirm = this.age_confirm
            .replace(/^0/, "")
            .replace(/^０/, "");
        }
      }
    },

    formatAgeConfirm() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.age_confirm;
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      if (text.length <= 2) {
        this.age_confirm = text;
      }
    },

    nextStep() {
      if (this.selected === "1" && /^[０-９]/.test(this.age_confirm)) {
        this.toast.error(
          this.messageShippingInfo.enter_halfwidth,
          this.optionToast
        );
        return;
      }
      if (this.selected === "1" && this.age_confirm === null) {
        this.toast.error(this.message.error_enter_age, this.optionToast);
        return;
      }

      if (this.selected === "1" && this.age_confirm === "") {
        this.toast.error(this.message.error_enter_age, this.optionToast);
        return;
      }
      const hash_id = this.$route.query.hash_id;
      this.$router.push(
        `/seller/service/service-course-draft/create?step=6&index=${this.index}&hash_id=${hash_id}`
      );
    },

    backStep() {
      const hash_id = this.$route.query.hash_id;
      this.$router.push(
        `/seller/service/service-course-draft/create?step=4&index=${this.index}&hash_id=${hash_id}`
      );
    },
  },
};
</script>

<style></style>
