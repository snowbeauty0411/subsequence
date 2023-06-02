<template>
  <div class="createService-step10">
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="createService-step10-left flex flex-col justify-between">
            <div class="createService-step10-left-form">
              <div class="step-title">
                このサービスの契約上限数を設定してください。
              </div>
              <div class="step10-form mb-5">
                <div class="step10-form-data form-checkbox-step10 relative">
                  <b-form-radio-group
                    v-model="selected"
                    :options="options"
                    stacked
                    class="w-full form-raido-custom form-check-select"
                  >
                  </b-form-radio-group>
                  <div
                    class="flex flex-col mx-3 absolute"
                    style="top: 52%; left: 140px"
                  >
                    <div class="flex items-center">
                      契約数
                      <input
                        maxlength="3"
                        v-model="max"
                        :disabled="selected == '0'"
                        class="
                          checkbox-amount-step-11
                          mx-3
                          text-center text-yellow-500
                        "
                        style="background: unset"
                        v-bind="formatNumber()"
                        id="max"
                        @blur="formatMax()"
                      />
                      件まで
                    </div>
                    <div
                      class="
                        flex
                        items-center
                        justify-end
                        py-1
                        text-[#E79C3A]
                        ml-[60px]
                      "
                    >
                      <SDIcon icon="exclamation-circle" class="mx-1" /><span
                        >数字を入力してください</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="createService-step10-left-btn flex">
              <b-button
                v-on:click="backStep()"
                class="
                  btn-return
                  flex
                  justify-center
                  items-center
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
                  items-center
                  justify-center
                  btn-step-common
                "
              >
                次へ
              </b-button>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import { Message } from "@/utils/message";
import { useToast } from "vue-toastification";
import SDIcon from "@/components/SDIcon";

export default {
  name: "Step1",
  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },
  components: {
    SDIcon,
  },
  data() {
    return {
      selected: "0",
      message: Message.SELLER,
      options: [
        { text: "上限なし", value: "0" },
        { text: "上限あり", value: "1" },
      ],
      queryData: this.$route.query.step,
      max: null,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      isEditDraftService: false,
      isNotFullWidth: true,
    };
  },

  mounted() {
    window.addEventListener("beforeunload", this.reloadPage, { capture: true });
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.reloadPage, {
      capture: true,
    });
  },

  created() {
    this.queryData = Number(this.$route.query.step);
    let selected = localStorage.getItem("data-step-10");
    let max = localStorage.getItem("data-step-10-max");
    if (selected === null) {
      this.selected = "0";
    } else {
      this.selected = selected;
    }
    if (max == "null") {
      this.selected = "0";
      this.max = "";
    } else if (max == 0) {
      this.selected = "0";
      this.max = "";
    } else {
      this.max = max;
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
    selected() {
      if (this.selected == 0) {
        this.max = "";
        this.isNotFullWidth = true;
      } else {
        this.isNotFullWidth = false;
      }
      // if (this.isEditDraftService) {
      localStorage.setItem("data-step-10", this.selected);
      // }
    },

    max() {
      if (this.max != "" && this.max != null) {
        if (this.max) {
          const regex = /^[0-9]*[1-9][0-9]*$/;
          const found = regex.test(this.max);
          if (found) {
            // if (this.isEditDraftService) {
            localStorage.setItem("data-step-10-max", Number(this.max));
            // }
            this.isNotFullWidth = true;
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

  methods: {
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    nextStep() {
      if (this.isEditDraftService) {
        if (this.selected == 1) {
          if (this.max === "" || this.max == null) {
            this.toast.error(
              this.message.number_contract_required,
              this.optionToast
            );
          } else {
            if (!this.isNotFullWidth) {
              if (Number(this.max) < 10) {
                this.toast.error(this.message.number_value, this.optionToast);
              } else {
                this.toast.error(this.message.number_requied, this.optionToast);
              }
            } else {
              if (Number(this.max) < 10) {
                this.toast.error(this.message.number_value, this.optionToast);
              } else {
                localStorage.setItem("data-step-10", this.selected);
                localStorage.setItem("data-step-10-max", Number(this.max));
                const hash_id = this.$route.query.hash_id;
                this.$router.push(
                  `/seller/service/create?step=11&hash_id=${hash_id}`
                );
              }
            }
          }
        } else {
          const hash_id = this.$route.query.hash_id;
          localStorage.setItem("data-step-10", this.selected);
          localStorage.setItem("data-step-10-max", null);
          this.$router.push(
            `/seller/service/create?step=11&hash_id=${hash_id}`
          );
        }
      } else {
        if (this.selected == 1) {
          if (this.max === "" || this.max == null) {
            this.toast.error(
              this.message.number_contract_required,
              this.optionToast
            );
          } else {
            if (!this.isNotFullWidth) {
              if (Number(this.max) < 10) {
                this.toast.error(this.message.number_value, this.optionToast);
              } else {
                this.toast.error(this.message.number_requied, this.optionToast);
              }
            } else {
              if (Number(this.max) < 10) {
                this.toast.error(this.message.number_value, this.optionToast);
              } else {
                localStorage.setItem("data-step-10", this.selected);
                localStorage.setItem("data-step-10-max", Number(this.max));
                this.$router.push("/seller/service/create?step=11");
              }
            }
          }
        } else {
          localStorage.setItem("data-step-10", this.selected);
          localStorage.setItem("data-step-10-max", null);
          this.$router.push("/seller/service/create?step=11");
        }
      }
    },

    backStep() {
      if (this.isEditDraftService) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=9&hash_id=${hash_id}`);
      } else {
        this.$router.push("/seller/service/create?step=9");
      }
    },

    formatNumber() {
      if (
        /^0/.test(this.max) ||
        /^０/.test(this.max) ||
        /^[０-９]/.test(this.max)
      ) {
        this.max = this.max
          .replace(/^[０-９]/, "")
          .replace(/^0/, "")
          .replace(/^０/, "");
      }
    },

    formatMax() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.max;
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      if (text.length <= 2) {
        this.max = text;
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/seller/index.scss";
.form-checkbox-step10 {
  label {
    display: flex;
    align-items: center;
    @include screen(480) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .checkbox-amount-step-11 {
    width: 50px;
    border-bottom: 1px solid $orange;
    outline: none;
  }
}

.form-check {
  &-label {
    color: #7e7d7d;
    font-weight: 500;
  }

  margin: 10px 0;
  .form-check-select:checked {
    background-color: $orange !important;
    border-color: $orange !important;
  }

  span {
    color: #7e7d7d;
    font-weight: 500;
  }
}
</style>
