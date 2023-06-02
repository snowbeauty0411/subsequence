<template>
  <div class="editService-step2 relative">
    <div class="editService-headerBox absolute flex items-center">
      <div class="headerBox"></div>
      <div class="headerText mx-2">{{ header }}</div>
    </div>
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="editService-step2-left flex flex-col justify-between">
            <div class="editService-step2-left-form">
              <div class="step-title">予約機能は必要ですか？</div>
              <div class="step2-form">
                <div class="step2-form-data">
                  <b-form-radio-group
                    v-model="selected"
                    :options="options"
                    stacked
                    class="w-full form-raido-custom"
                  ></b-form-radio-group>
                </div>
              </div>
              <div class="step-title my-5" v-if="selected === '1'">
                予約の設定をしましょう。
              </div>
              <div class="step2-form" v-if="selected === '1'">
                <b-button
                  class="btn-modal flex items-center"
                  v-on:click="showModal1 = true"
                  ><SDIcon icon="pencil" class="mx-2" />
                  <div>予約の詳細設定</div></b-button
                >
                <b-modal
                  id="modal-1"
                  hide-footer
                  hide-header
                  size="lg"
                  v-model="showModal1"
                >
                  <div class="modal-reserve flex flex-col">
                    <div
                      class="modal-reserve-header relative flex justify-center"
                    >
                      <div class="text-name">予約設定</div>
                      <div class="icon-close absolute" v-on:click="hideModal()">
                        <SDIcon icon="x" />
                      </div>
                    </div>
                    <div class="modal-reserve-content flex flex-col">
                      <div class="icon-switch flex justify-end items-center">
                        <div>予約受付</div>
                        <b-form-checkbox
                          v-model="checked"
                          name="check-button"
                          switch
                          class="form-check-switch SDSwitch"
                        >
                        </b-form-checkbox>
                        <div>ON</div>
                      </div>
                      <b-container v-if="checked">
                        <b-row>
                          <b-col cols="5">
                            <div class="modal-left py-5">
                              予約1枠あたりの受付人数上限
                            </div>
                          </b-col>
                          <b-col cols="7"
                            ><div class="modal-right relative py-5">
                              <b-form-radio-group
                                v-model="selected2"
                                :options="options2"
                                stacked
                                class="w-full form-raido-custom"
                              ></b-form-radio-group>
                              <div class="input-modal-absolute flex flex-col">
                                <div class="flex items-center">
                                  <input
                                    maxlength="3"
                                    id="max"
                                    @blur="priceFormat()"
                                    @keypress="onlyNumber($event)"
                                    v-model="max"
                                    :disabled="Number(selected2) === 0"
                                  />人まで
                                </div>
                                <div
                                  class="flex items-center my-2 text-yellow-500"
                                >
                                  <SDIcon
                                    icon="info-circle-fill"
                                    size="sm"
                                    class="mx-1 exclamation-triangle-fill"
                                    variant="warning"
                                  /><span>数字を入力してください</span>
                                </div>
                              </div>
                            </div></b-col
                          >
                          <b-col cols="5">
                            <div class="modal-left py-5">予約枠の間隔</div>
                          </b-col>
                          <b-col cols="7"
                            ><div class="modal-right flex py-5 justify-between">
                              <b-form-select
                                v-model="hour"
                                :options="hourList"
                                size="sm"
                                class="form-select-custom w-2/5"
                              ></b-form-select>
                              <b-form-select
                                v-model="minute"
                                :options="minuteList"
                                size="sm"
                                class="form-select-custom w-2/5"
                              ></b-form-select></div
                          ></b-col>
                          <b-col cols="5">
                            <div class="modal-left py-5">予約受付可能期間</div>
                          </b-col>
                          <b-col cols="7"
                            ><div class="modal-right relative py-5">
                              <div class="flex items-center input-row3">
                                <input
                                  maxlength="2"
                                  id="duration_before"
                                  @blur="durationBeforeFormat()"
                                  @keypress="onlyNumber($event)"
                                  v-model="duration_before"
                                />
                                <div>日先まで受付可能</div>
                              </div>
                            </div></b-col
                          >
                          <b-col cols="5">
                            <div class="modal-left py-5">予約締切期間</div>
                          </b-col>
                          <b-col cols="7"
                            ><div class="modal-right relative py-5">
                              <b-form-radio-group
                                v-model="selected3"
                                :options="options3"
                                stacked
                                class="
                                  w-full
                                  form-raido-custom form-multi-input
                                "
                              ></b-form-radio-group>
                              <div class="input-modal1-absolute flex flex-col">
                                <input
                                  maxlength="2"
                                  id="duration_after1"
                                  @blur="durationAfter1Format()"
                                  @keypress="onlyNumber($event)"
                                  v-model="duration_after1"
                                  :disabled="Number(selected3) === 1"
                                  style="background: unset"
                                />
                              </div>
                              <div class="input-modal-absolute flex flex-col">
                                <div class="flex items-center">
                                  <input
                                    maxlength="2"
                                    id="duration_after2"
                                    @blur="durationAfter2Format()"
                                    @keypress="onlyNumber($event)"
                                    v-model="duration_after2"
                                    :disabled="Number(selected3) === 0"
                                    style="background: unset"
                                  />枠前
                                </div>
                              </div>
                            </div></b-col
                          >
                          <div class="btn-submit-modal flex justify-center">
                            <b-button v-on:click="submitModal()"
                              >更新する</b-button
                            >
                          </div>
                        </b-row>
                      </b-container>
                    </div>
                  </div>
                </b-modal>
              </div>
            </div>
            <div class="editService-step2-left-btn flex">
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
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="
              editService-step2-right
              flex flex-col
              items-center
              justify-between
              h-full
            "
          >
            <div class="editService-step2-right-title">
              タイプ別のイラスト挿入
            </div>
            <div
              class="editService-step2-right-img"
              :style="'background-image: url(' + bgstep2 + ')'"
            ></div></div></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import bgstep2 from "@/assets/images/bgStep1.png";
import SDIcon from "@/components/SDIcon";
import { useToast } from "vue-toastification";
import { Message } from "@/utils/message";

export default {
  name: "step2",

  components: {
    SDIcon,
  },

  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },

  data() {
    return {
      header: "",
      selected: "0",
      options: [
        { text: "予約機能なし", value: "0" },
        { text: "予約機能あり", value: "1" },
      ],
      selected2: "0",
      options2: [
        { text: "上限なし", value: "0" },
        { text: "上限あり", value: "1" },
      ],
      selected3: "0",
      options3: [
        { text: "日前", value: "0" },
        { text: "枠単位", value: "1" },
      ],
      bgstep2,
      checked: true,
      hour: "時間",
      hourList: [
        { text: "時間", value: "時間" },
        { text: "1時間", value: 1 },
        { text: "2時間", value: 2 },
        { text: "3時間", value: 3 },
        { text: "4時間", value: 4 },
        { text: "5時間", value: 5 },
        { text: "6時間", value: 6 },
        { text: "7時間", value: 7 },
        { text: "8時間", value: 8 },
        { text: "9時間", value: 9 },
        { text: "10時間", value: 10 },
        { text: "11時間", value: 11 },
        { text: "12時間", value: 12 },
      ],
      minute: "分",
      minuteList: [
        { text: "分", value: "分" },
        { text: "0分", value: "00" },
        { text: "15分", value: 15 },
        { text: "30分", value: 30 },
        { text: "45分", value: 45 },
      ],
      max: "",
      service_reserve_setting: {},
      duration_before: null,
      duration_after1: null,
      duration_after2: null,
      message: Message.SELLER,
      showModal1: false,
      isEditDraftService: false,
      time_distance: null
    };
  },

  created() {
    let idServiceType = localStorage.getItem("data-step-4");
    if (idServiceType == 2) {
      this.header = "店舗型タイプ";
    } else if (idServiceType == 3) {
      this.header = "訪問型タイプ/オンライン完結タイプ";
    }
    let service_reserve_setting = localStorage.getItem(
      "service_reserve_setting"
    );
    let is_reserves = localStorage.getItem("is_reserves");
    if (Number(is_reserves) === 0) {
      this.selected = "0";
    }
    if (Number(is_reserves) === 1) {
      this.selected = "1";
    }
    if (service_reserve_setting !== null) {
      this.service_reserve_setting = JSON.parse(service_reserve_setting);
      if (this.service_reserve_setting != null) {
        this.max = this.service_reserve_setting.max;
        if (this.max !== null) {
          this.selected2 = "1";
        } else {
          this.selected2 = "0";
        }
        const time = this.service_reserve_setting.time_distance.split(":"[0]);
        this.hour = time[0];
        this.minute = time[1];
        this.duration_before = this.service_reserve_setting.duration_before;
        this.duration_after1 = this.service_reserve_setting.duration_after;
        this.selected3 = "0";
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
    selected() {
      localStorage.setItem("is_reserves", Number(this.selected));
    },

    selected2() {
      if (this.selected2 == 0) {
        this.max = "";
      }
    },

    selected3() {
      if (this.selected3 == 0) {
        this.duration_after2 = null;
      } else {
        this.duration_after1 = null;
      }
    },

    checked() {
      if (this.checked === false) {
        this.selected2 = "0";
        this.max = "";
        this.hour = "時間";
        this.minute = "分";
        this.duration_before = "";
        this.duration_after1 = "";
        this.duration_after2 = "";
        this.selected3 = "0";
        localStorage.setItem("is_reserves", 1);
        localStorage.removeItem("service_reserve_setting");
      } else {
        localStorage.setItem("is_reserves", 1);
      }
    },

    max() {
      if (this.selected3 == "0") {
        if (
          this.time_distance != null &&
          this.duration_before != null &&
          this.duration_after1 != null
        ) {
          this.service_reserve_setting = {
            max: this.max,
            time_distance: this.hour + ":" + this.minute,
            duration_before: this.duration_before,
            duration_after: this.duration_after1,
          };
          localStorage.setItem(
            "service_reserve_setting",
            JSON.stringify(this.service_reserve_setting)
          );
        }
      } else {
        if (
          this.time_distance != null &&
          this.duration_before != null &&
          this.duration_after2 != null
        ) {
          this.service_reserve_setting = {
            max: this.max,
            time_distance: this.hour + ":" + this.minute,
            duration_before: this.duration_before,
            duration_after: this.duration_after2,
          };
          localStorage.setItem(
            "service_reserve_setting",
            JSON.stringify(this.service_reserve_setting)
          );
        }
      }
    },

    hour() {
      if (
        this.hour != "時間" &&
        this.minute != "分" &&
        this.duration_before != null &&
        (this.duration_after1 != null || this.duration_after2 != null)
      ) {
        this.service_reserve_setting = {
          max: this.max,
          time_distance: this.hour + ":" + this.minute,
          duration_before: this.duration_before,
          duration_after: this.duration_after2,
        };
        localStorage.setItem(
          "service_reserve_setting",
          JSON.stringify(this.service_reserve_setting)
        );
      }
    },

    minute() {
      if (
        this.hour != "時間" &&
        this.minute != "分" &&
        this.duration_before != null &&
        (this.duration_after1 != null || this.duration_after2 != null)
      ) {
        this.service_reserve_setting = {
          max: this.max,
          time_distance: this.hour + ":" + this.minute,
          duration_before: this.duration_before,
          duration_after: this.duration_after2,
        };
        localStorage.setItem(
          "service_reserve_setting",
          JSON.stringify(this.service_reserve_setting)
        );
      }
    },

    duration_before() {
      if (
        this.hour != "時間" &&
        this.minute != "分" &&
        (this.duration_after1 != null || this.duration_after2 != null) &&
        this.duration_before != null
      ) {
        this.service_reserve_setting = {
          max: this.max,
          time_distance: this.hour + ":" + this.minute,
          duration_before: this.duration_before,
          duration_after:
            Number(this.selected3) === 0
              ? this.duration_after1
              : this.duration_after2,
          type_duration_after: Number(this.selected3) === 0 ? 1 : 2,
        };
        localStorage.setItem(
          "service_reserve_setting",
          JSON.stringify(this.service_reserve_setting)
        );
      }
    },

    duration_after1() {
      if (this.selected3 == 0) {
        if (
          this.hour != "時間" &&
          this.minute != "分" &&
          this.duration_before != null &&
          this.duration_after1 != null
        ) {
          this.service_reserve_setting = {
            max: this.max,
            time_distance: this.hour + ":" + this.minute,
            duration_before: this.duration_before,
            duration_after: this.duration_after1,
            type_duration_after: 1,
          };
          localStorage.setItem(
            "service_reserve_setting",
            JSON.stringify(this.service_reserve_setting)
          );
        }
      }
    },

    duration_after2() {
      if (this.selected3 == 1) {
        if (
          this.hour != "時間" &&
          this.minute != "分" &&
          this.duration_before != null &&
          this.duration_after2 != null
        ) {
          this.service_reserve_setting = {
            max: this.max,
            time_distance: this.hour + ":" + this.minute,
            duration_before: this.duration_before,
            duration_after: this.duration_after2,
            type_duration_after: 2,
          };
          localStorage.setItem(
            "service_reserve_setting",
            JSON.stringify(this.service_reserve_setting)
          );
        }
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

    backStep() {
      if (this.isEditDraftService) {
        this.$router.push(
          `/seller/service/service-course/create?step=1&hash_id=${this.$route.query.hash_id}`
        );
      } else {
        this.$router.push("/seller/service/service-course/create?step=1");
        localStorage.setItem("backCourse1", 1);
      }
    },

    nextStep() {
      if (Number(this.selected) === 0) {
        localStorage.setItem("is_reserves", 0);
        if (this.isEditDraftService) {
          let hash_id = localStorage.getItem("hash_id");
          this.$router.push(`/seller/service/create?step=8&hash_id=${hash_id}`);
        } else {
          this.$router.push("/seller/service/create?step=8");
        }
      } else {
        if (this.checked) {
          if (this.max === null && Number(this.selected2) === 1) {
            this.toast.error(this.message.limit_required, this.optionToast);
          } else if (this.max <= 0 && Number(this.selected2) === 1) {
            this.toast.error(this.message.limit_min, this.optionToast);
          } else if (this.hour === "時間") {
            this.toast.error(this.message.hour_required, this.optionToast);
          } else if (this.minute === "分") {
            this.toast.error(this.message.minute_required, this.optionToast);
          } else if (
            this.duration_before == null ||
            this.duration_before == ""
          ) {
            this.toast.error(
              this.message.duration_before_required,
              this.optionToast
            );
          } else if (this.duration_before <= 0) {
            this.toast.error(this.message.limit_min, this.optionToast);
          } else if (
            Number(this.selected3) === 0 &&
            this.duration_after1 == null
          ) {
            this.toast.error(
              this.message.duration_after_required,
              this.optionToast
            );
          } else if (
            Number(this.selected3) === 0 &&
            this.duration_after1 <= 0
          ) {
            this.toast.error(this.message.limit_min, this.optionToast);
          } else if (
            Number(this.selected3) === 1 &&
            this.duration_after2 == null
          ) {
            this.toast.error(
              this.message.duration_after_required,
              this.optionToast
            );
          } else if (
            Number(this.selected3) === 1 &&
            this.duration_after2 <= 0
          ) {
            this.toast.error(this.message.limit_min, this.optionToast);
          } else {
            this.service_reserve_setting = {
              max: this.max,
              time_distance: this.hour + ":" + this.minute,
              duration_before: this.duration_before,
              duration_after:
                Number(this.selected3) === 0
                  ? this.duration_after1
                  : this.duration_after2,
              type_duration_after:
                Number(this.selected3) === 0
                  ? 1
                  : 2
            };
            localStorage.setItem("is_reserves", 1);
            localStorage.setItem(
              "service_reserve_setting",
              JSON.stringify(this.service_reserve_setting)
            );
            if (this.isEditDraftService) {
              const hash_id = this.$route.query.hash_id;
              this.$router.push(
                `/seller/service/settingHour?hash_id=${hash_id}`
              );
            } else {
              this.$router.push("/seller/service/settingHour");
            }
          }
        } else {
          localStorage.setItem("is_reserves", 1);
          if (this.isEditDraftService) {
            const hash_id = this.$route.query.hash_id;
            this.$router.push(
              `/seller/service/create?step=8&hash_id=${hash_id}`
            );
          } else {
            this.$router.push("/seller/service/create?step=8");
          }
        }
      }
    },

    hideModal() {
      this.showModal1 = false;
    },

    submitModal() {
      if (this.max === null && Number(this.selected2) === 1) {
        this.toast.error(this.message.limit_required, this.optionToast);
      } else if (this.max <= 0 && Number(this.selected2) === 1) {
        this.toast.error(this.message.limit_min, this.optionToast);
      } else if (this.hour === "時間") {
        this.toast.error(this.message.hour_required, this.optionToast);
      } else if (this.minute === "分") {
        this.toast.error(this.message.minute_required, this.optionToast);
      } else if (this.duration_before == null || this.duration_before == "") {
        this.toast.error(
          this.message.duration_before_required,
          this.optionToast
        );
      } else if (this.duration_before <= 0) {
        this.toast.error(this.message.limit_min, this.optionToast);
      } else if (Number(this.selected3) === 0 && this.duration_after1 == null) {
        this.toast.error(
          this.message.duration_after_required,
          this.optionToast
        );
      } else if (Number(this.selected3) === 0 && this.duration_after1 <= 0) {
        this.toast.error(this.message.limit_min, this.optionToast);
      } else if (Number(this.selected3) === 1 && this.duration_after2 == null) {
        this.toast.error(
          this.message.duration_after_required,
          this.optionToast
        );
      } else if (Number(this.selected3) === 1 && this.duration_after2 <= 0) {
        this.toast.error(this.message.limit_min, this.optionToast);
      } else {
        this.showModal1 = false;
      }
    },

    formatNumber() {
      var text = this.max;
      if (
        /^[a-z]/.test(text) ||
        /^[A-Z]/.test(text) ||
        /^[ａ-ｚ]/.test(text) ||
        /^[Ａ-Ｚ]/.test(text) ||
        /^[ぁ-ん]/.test(text) ||
        /^[ァ-ン]/.test(text) ||
        /^[一-龥]/.test(text)
      ) {
        text = text
          .replace(/^[a-z]/, "")
          .replace(/^[A-Z]/, "")
          .replace(/^[ａ-ｚ]/, "")
          .replace(/^[Ａ-Ｚ]/, "")
          .replace(/^[ぁ-ん]/, "")
          .replace(/^[ァ-ン]/, "")
          .replace(/^[一-龥]/, "");
      }
      this.max = text;
    },

    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },

    priceFormat() {
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
      this.max = text;
    },

    durationBeforeFormat() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.duration_before;
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      this.duration_before = text;
    },

    durationAfter1Format() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.duration_after1;
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      this.duration_after1 = text;
    },

    durationAfter2Format() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.duration_after2;
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      this.duration_after2 = text;
    },
  },
};
</script>

<style></style>
