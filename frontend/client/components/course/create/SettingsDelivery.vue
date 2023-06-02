<template>
  <div class="editService-step1 relative">
    <div class="editService-headerBox flex items-center mt-3">
      <div class="headerBox"></div>
      <div class="d-flex"></div>
    </div>
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="editService-delivery-left flex flex-col justify-between">
            <div class="editService-step1-left-form">
              <div class="headerText font-bold">定期便タイプ</div>
              <div class="flex">
                <div class="step-title">配送間隔を設定しましょう。</div>
                <span class="text-danger step-note mt-4">※</span>
                <span class="text-danger step-note mt-4">※</span>
              </div>
              <div class="step1-form relative">
                <div class="step1-form-data">
                  <b-form-radio-group
                    v-model="interval"
                    :options="options"
                    stacked
                    class="w-full form-raido-custom form-custom-1"
                  ></b-form-radio-group>
                </div>
                <div
                  class="descriptionYellow absolute flex flex-col form-custom-1"
                  style="left: 30px; top: 50px"
                >
                  <input
                    maxlength="2"
                    v-model="month_delivery"
                    class="lineDes px-2"
                    style="
                      border-bottom: 1px solid #e79c3a;
                      width: 80px;
                      outline: none;
                      background: unset;
                    "
                    id="month_delivery"
                    v-bind="formatNumber1()"
                    @blur="formatMonthDelivery()"
                    :disabled="interval == '0'"
                  />
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
            <div class="editService-delivery-left-form my-1">
              <div class="step-title relative step-title-bottom">
                <div class="flex">
                  <div>また、配送のスキップ機能は付けますか？</div>
                  <span class="text-danger step-note mt-1">※</span>
                  <span class="text-danger step-note mt-1">※</span>
                </div>

                <div
                  class="descriptionYellow absolute flex items-center"
                  style="right: 0"
                >
                  <BootstrapIcon
                    icon="question-circle-fill"
                    size="sm"
                    class="mx-1 exclamation-triangle-fill"
                    variant="warning"
                  /><a @click="redirectToTerm()">スキップ機能とは？</a>
                </div>
              </div>
              <div class="step1-form relative">
                <div class="step1-form-data">
                  <b-form-radio-group
                    v-model="skip"
                    :options="option2"
                    stacked
                    class="w-full form-raido-custom form-custom-1"
                  ></b-form-radio-group>
                </div>
                <div
                  class="descriptionYellow absolute flex flex-col form-custom-2"
                  style="left: 200px; top: 65%"
                >
                  <div class="flex items-end textGray-custom">
                    次回決済日の
                    <input
                      maxlength="2"
                      v-model="with_skip"
                      class="lineDes px-2 text-yellow-500"
                      style="
                        border-bottom: 1px solid #e79c3a;
                        width: 80px;
                        outline: none;
                        background: unset;
                      "
                      id="with_skip"
                      v-bind="formatNumber2()"
                      @blur="formatWithSkip()"
                      :disabled="skip == '0'"
                    />
                    日前までに確定
                  </div>

                  <div class="flex items-center py-1 justify-center">
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
            <div class="editService-delivery-left-btn">
              <div
                class="text-danger"
                style="padding: 0 22px; margin-bottom: 20px"
              >
                <b-row>
                  <b-col cols="2" class="cols-start"
                    ><span class="step-note">※</span><span class="step-note">※</span></b-col
                  >
                  <b-col cols="10" class="col-text-note">
                    <span
                      >この項目は、サービス作成完了後は変更することができません。</span
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
              editService-step1-right
              flex flex-col
              items-center
              justify-between
              h-full
            "
          >
            <div class="editService-step1-right-title">
              タイプ別のイラスト挿入
            </div>
            <div
              class="editService-step1-right-img"
              :style="'background-image: url(' + bgStep1 + ')'"
            ></div></div></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import bgStep1 from "@/assets/images/bgStep1.png";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { useToast } from "vue-toastification";
import { Message } from "@/utils/message";

export default {
  name: "Step1",

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
      interval: "0",
      skip: "0",
      options: [
        { text: "毎週配送", value: "0" },
        { text: "ヶ月ごとに配送", value: 1 },
      ],
      option2: [
        { text: "スキップなし", value: "0" },
        { text: "スキップあり", value: 1 },
      ],
      bgStep1,
      month_delivery: null,
      with_skip: null,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      isNextStep: false,
      message: Message.SELLER,
      isEditDraftService: false,
      isNotFullWidth1: true,
      isNotFullWidth2: true,
      messageShippingInfo: Message.DELIVERY,
      listCourse: [],
    };
  },

  created() {
    this.listCourse = JSON.parse(localStorage.getItem("list-course"));
    let interval = localStorage.getItem("interval");
    let intervalInit = localStorage.getItem("interval-init");
    if (interval === null) {
      this.interval = intervalInit;
    }
    let month_delivery = localStorage.getItem("month_delivery");
    let skip = localStorage.getItem("skip");
    let with_skip = localStorage.getItem("with_skip");
    if (interval != "null") {
      if (Number(interval) === 0) {
        this.interval = "0";
        this.month_delivery = null;
      } else if (month_delivery != "null" && Number(interval) === 1) {
        this.interval = "1";
        this.month_delivery = Number(month_delivery);
      }
    }
    if (skip !== "null") {
      if (Number(skip) === 0) {
        this.skip = "0";
        this.with_skip = null;
      } else if (with_skip !== "null" && Number(skip) === 1) {
        this.skip = "1";
        this.with_skip = Number(with_skip);
      }
    }
    if (this.$route.query.hash_id !== undefined) {
      this.isEditDraftService = true;
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        this.$router.push(
          `/seller/service/create?step=1&hash_id=${this.$route.query.hash_id}`
        );
      }
    } else {
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        this.$router.push("/seller/service/create?step=1");
      }
    }
  },

  watch: {
    interval() {
      if (this.interval == "0") {
        this.month_delivery = "";
        this.isNotFullWidth1 = true;
      } else {
        this.isNotFullWidth1 = false;
      }
      localStorage.setItem("interval", this.interval);
    },

    skip() {
      if (this.skip == "0") {
        this.with_skip = "";
        this.isNotFullWidth2 = true;
      } else {
        this.isNotFullWidth2 = false;
      }
      localStorage.setItem("skip", this.skip);
    },

    month_delivery() {
      if (this.month_delivery != "" && this.month_delivery != null) {
        if (this.month_delivery) {
          const regex = /^[0-9]*[1-9][0-9]*$/;
          const found = regex.test(this.month_delivery);
          if (found) {
            localStorage.setItem("month_delivery", this.month_delivery);
            this.isNotFullWidth1 = true;
          } else {
            this.isNotFullWidth1 = false;
          }
        }
        return this.isNotFullWidth1;
      } else {
        if (this.interval == "0") {
          this.isNotFullWidth1 = true;
        } else {
          this.isNotFullWidth1 = false;
        }
      }
    },

    with_skip() {
      if (this.with_skip != "" && this.with_skip != null) {
        if (this.with_skip) {
          const regex = /^[0-9]*[1-9][0-9]*$/;
          const found = regex.test(this.with_skip);
          if (found) {
            localStorage.setItem("with_skip", this.with_skip);
            this.isNotFullWidth2 = true;
          } else {
            this.isNotFullWidth2 = false;
          }
        }
        return this.isNotFullWidth2;
      } else {
        if (this.interval == "0") {
          this.isNotFullWidth2 = true;
        } else {
          this.isNotFullWidth2 = false;
        }
      }
    },
  },

  mounted() {
    // this.checkIMEKeyboard();
    window.addEventListener("beforeunload", this.reloadPage, { capture: true });
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.reloadPage, {
      capture: true,
    });
  },

  methods: {
    reloadPage(e) {
      return (e.returnValue = "Are you sure you want to exit?");
    },

    formatNumber1() {
      if (/^0/.test(this.month_delivery) || /^０/.test(this.month_delivery)) {
        this.month_delivery = this.month_delivery
          .replace(/^0/, "")
          .replace(/^０/, "");
      }
    },

    formatMonthDelivery() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.month_delivery;
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
    },

    formatWithSkip() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.with_skip;
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
    },

    formatNumber2() {
      if (/^0/.test(this.with_skip) || /^０/.test(this.with_skip)) {
        this.with_skip = this.with_skip.replace(/^0/, "").replace(/^０/, "");
      }
    },

    redirectToTerm() {
      window.open("/term", "_blank", "noreferrer");
    },

    nextStep() {
      if (/^[０-９]/.test(this.with_skip)) {
        this.toast.error(
          this.messageShippingInfo.enter_halfwidth,
          this.optionToast
        );
        return;
      }
      if (/^[０-９]/.test(this.month_delivery)) {
        this.toast.error(
          this.messageShippingInfo.enter_halfwidth,
          this.optionToast
        );
        return;
      }
      if (this.interval == 1) {
        if (
          this.month_delivery === null ||
          this.month_delivery === "" ||
          !this.isNotFullWidth1
        ) {
          this.toast.error(this.message.number_requied, this.optionToast);
        } else if (this.month_delivery < 1 || this.month_delivery > 99) {
          this.toast.error(
            this.message.month_delivery_required,
            this.optionToast
          );
        } else {
          if (this.skip == 1) {
            if (
              this.with_skip === null ||
              this.with_skip === "" ||
              !this.isNotFullWidth2
            ) {
              this.toast.error(this.message.number_requied, this.optionToast);
            } else if (this.with_skip < 10 || this.with_skip > 99) {
              this.toast.error(
                this.message.skip_with_required,
                this.optionToast
              );
            } else {
              if (this.isEditDraftService) {
                let hash_id = localStorage.getItem("hash_id");
                localStorage.setItem("interval", this.interval);
                localStorage.setItem("month_delivery", this.month_delivery);
                localStorage.setItem("skip", this.skip);
                localStorage.setItem("with_skip", this.with_skip);
                this.$router.push(
                  `/seller/service/create?step=8&hash_id=${hash_id}`
                );
              } else {
                localStorage.setItem("interval", this.interval);
                localStorage.setItem("month_delivery", this.month_delivery);
                localStorage.setItem("skip", this.skip);
                localStorage.setItem("with_skip", this.with_skip);
                this.$router.push("/seller/service/create?step=8");
              }
            }
          } else {
            this.with_skip = null;
            if (this.isEditDraftService) {
              let hash_id = localStorage.getItem("hash_id");
              localStorage.setItem("interval", this.interval);
              localStorage.setItem("month_delivery", this.month_delivery);
              localStorage.setItem("skip", this.skip);
              localStorage.setItem("with_skip", this.with_skip);
              this.$router.push(
                `/seller/service/create?step=8&hash_id=${hash_id}`
              );
            } else {
              localStorage.setItem("interval", this.interval);
              localStorage.setItem("month_delivery", this.month_delivery);
              localStorage.setItem("skip", this.skip);
              localStorage.setItem("with_skip", this.with_skip);
              this.$router.push("/seller/service/create?step=8");
            }
          }
        }
      } else if (this.skip == 1) {
        if (
          this.with_skip === null ||
          this.with_skip === "" ||
          !this.isNotFullWidth2
        ) {
          this.toast.error(this.message.number_requied, this.optionToast);
        } else if (this.with_skip < 1 || this.with_skip > 90) {
          this.toast.error(this.message.skip_with_required, this.optionToast);
        } else {
          if (this.interval == 1) {
            if (
              this.month_delivery === null ||
              this.month_delivery === "" ||
              !this.isNotFullWidth1
            ) {
              this.toast.error(this.message.number_requied, this.optionToast);
            } else if (this.month_delivery < 10 || this.month_delivery > 99) {
              this.toast.error(
                this.message.month_delivery_required,
                this.optionToast
              );
            }
          } else {
            this.month_delivery = null;
            if (this.isEditDraftService) {
              let hash_id = localStorage.getItem("hash_id");
              localStorage.setItem("interval", this.interval);
              localStorage.setItem("month_delivery", this.month_delivery);
              localStorage.setItem("skip", this.skip);
              localStorage.setItem("with_skip", this.with_skip);
              this.$router.push(
                `/seller/service/create?step=8&hash_id=${hash_id}`
              );
            } else {
              localStorage.setItem("interval", this.interval);
              localStorage.setItem("month_delivery", this.month_delivery);
              localStorage.setItem("skip", this.skip);
              localStorage.setItem("with_skip", this.with_skip);
              this.$router.push("/seller/service/create?step=8");
            }
          }
        }
      } else {
        this.month_delivery = null;
        this.with_skip = null;
        if (this.isEditDraftService) {
          let hash_id = localStorage.getItem("hash_id");
          localStorage.setItem("interval", this.interval);
          localStorage.setItem("month_delivery", this.month_delivery);
          localStorage.setItem("skip", this.skip);
          localStorage.setItem("with_skip", this.with_skip);
          this.$router.push(`/seller/service/create?step=8&hash_id=${hash_id}`);
        } else {
          localStorage.setItem("interval", this.interval);
          localStorage.setItem("month_delivery", this.month_delivery);
          localStorage.setItem("skip", this.skip);
          localStorage.setItem("with_skip", this.with_skip);
          this.$router.push("/seller/service/create?step=8");
        }
      }
    },

    backStep() {
      let hash_id = localStorage.getItem("hash_id-step-8");
      this.listCourse = JSON.parse(localStorage.getItem("list-course"));
      if (this.listCourse[0].course_id === undefined) {
        let lastItem = this.listCourse[this.listCourse.length - 1];
        if (this.listCourse[0].is_draft === 0) {
          this.$router.push(
            `/seller/service/service-course/create?step=7&index=${lastItem.index}`
          );
        } else {
          this.$router.push(
            `/seller/service/service-course-draft/create?step=7&index=${lastItem.index}&hash_id=${hash_id}`
          );
        }
      } else if (this.$route.query.hash_id) {
        localStorage.setItem("isEditService", true);
        this.$router.push(
          `/seller/service/service-course-draft/list?hash_id=${this.$route.query.hash_id}`
        );
      }
    },
  },
};
</script>

<style></style>
