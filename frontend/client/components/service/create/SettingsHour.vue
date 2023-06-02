<template>
  <div class="editService-step12 relative">
    <div class="editService-headerBox absolute flex items-center">
      <div class="headerBox"></div>
      <div class="headerText mx-2">{{ header }}</div>
    </div>
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="editService-step12-left flex flex-col justify-between">
            <div class="editService-step12-left-form">
              <div class="step-title">営業時間の設定をしましょう。</div>
              <div class="step12-form flex flex-col">
                <div
                  class="step12-form-item w-100 flex justify-center items-center"
                  v-for="(item, index) in service_hours"
                  :key="index"
                >
                  <div class="item-checkbox">
                    <b-form-checkbox
                      v-model="item.status"
                      v-bind:change="changeStatus()"
                      class="form-checkbox-select"
                      >{{
                        item.day_of_week === 0
                          ? "日曜日"
                          : item.day_of_week === 1
                          ? "月曜日"
                          : item.day_of_week === 2
                          ? "火曜日"
                          : item.day_of_week === 3
                          ? "水曜日"
                          : item.day_of_week === 4
                          ? "木曜日"
                          : item.day_of_week === 5
                          ? "金曜日"
                          : "土曜日"
                      }}</b-form-checkbox
                    >
                  </div>
                  <div class="list-time flex flex-col">
                    <div
                      class="item-time flex items-center justify-between"
                      v-for="(item1, index1) in item.work_hour"
                      :key="index1"
                    >
                      <b-form-select
                        v-model="item1.start"
                        :options="listTime"
                        size="sm"
                        class="form-select-custom-settingH w-[150px]"
                        v-on:change="selectStartHour($event, index, index1)"
                        :class="
                          item.status ? 'text-[#7E7D7D]' : 'text-[#CCCBCB]'
                        "
                        v-bind:change="changeStatus()"
                      ></b-form-select>
                      <div class="mx-[30px] text-xl">-</div>
                      <b-form-select
                        v-model="item1.end"
                        :options="listTime"
                        size="sm"
                        class="form-select-custom-settingH w-[150px]"
                        v-on:change="selectEndHour($event, index, index1)"
                        :class="
                          item.status ? 'text-[#7E7D7D]' : 'text-[#CCCBCB]'
                        "
                        v-bind:change="changeStatus()"
                      ></b-form-select>
                      <div class="item-add flex items-center">
                        <img
                          :src="iconAdd"
                          alt=""
                          v-on:click="addWorkHour(item.day_of_week)"
                          v-if="item1.end !== '22:00' && index1 === 0"
                          v-bind:change="changeStatus()"
                        />
                        <img
                          src=""
                          v-if="item1.end == '22:00'"
                        />
                        <img
                          :src="iconMinus"
                          alt=""
                          v-on:click="
                            removeWorkHour(item.day_of_week, index1, item1.end)
                          "
                          v-if="item.work_hour.length > 1 && index1 != 0"
                          v-bind:change="changeStatus()"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="editService-step12-left-btn flex">
              <b-button
                class="btn-return flex justify-center items-center btn-step-common"
                v-on:click="backStep()"
              >
                戻る
              </b-button>
              <b-button
                class="btn-next flex items-center justify-center btn-step-common"
                v-on:click="nextStep()"
              >
                次へ
              </b-button>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="editService-step12-right flex flex-col items-center justify-between h-full"
          ></div></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { useToast } from "vue-toastification";
import { Message } from "@/utils/message";
import SDIcon from "@/components/SDIcon";
import iconAdd from "@/assets/images/iconAdd.png";
import iconMinus from "@/assets/images/iconMinus.png";

export default {
  name: "Step1",

  components: {
    BootstrapIcon,
    SDIcon,
  },

  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },

  created() {
    let service_hours = localStorage.getItem("service_hours");
    if (service_hours != null) {
      this.service_hours = JSON.parse(service_hours);
    }
    let idServiceType = localStorage.getItem("data-step-4");
    if (idServiceType == 2) {
      this.header = "店舗型タイプ";
    } else if (idServiceType == 3) {
      this.header = "訪問型タイプ/オンライン完結タイプ";
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

  data() {
    return {
      header: "",
      iconMinus,
      iconAdd,
      message: Message.SELLER,
      listTime: [
        { text: "9:00", value: "9:00" },
        { text: "10:00", value: "10:00" },
        { text: "11:00", value: "11:00" },
        { text: "12:00", value: "12:00" },
        { text: "13:00", value: "13:00" },
        { text: "14:00", value: "14:00" },
        { text: "15:00", value: "15:00" },
        { text: "16:00", value: "16:00" },
        { text: "17:00", value: "17:00" },
        { text: "18:00", value: "18:00" },
        { text: "19:00", value: "19:00" },
        { text: "20 00", value: "20:00" },
        { text: "21:00", value: "21:00" },
        { text: "22:00", value: "22:00" },
      ],
      service_hours: [
        {
          day_of_week: 1,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: true,
        },
        {
          day_of_week: 2,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: true,
        },
        {
          day_of_week: 3,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: true,
        },
        {
          day_of_week: 4,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: true,
        },
        {
          day_of_week: 5,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: true,
        },
        {
          day_of_week: 6,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: false,
        },
        {
          day_of_week: 0,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: false,
        },
      ],
      value1: null,
      value2: null,
      isTrue: false,
      isEditDraftService: false,
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

  methods: {
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    changeStatus() {
      if (this.isEditDraftService) {
        localStorage.setItem(
          "service_hours",
          JSON.stringify(this.service_hours)
        );
      }
    },
    addWorkHour(value) {
      this.service_hours.map((item) => {
        if (item.day_of_week === value) {
          item.work_hour.map((item1, index) => {
            const itemEnd = item.work_hour[item.work_hour.length - 1];
            const timeItemEnd = itemEnd.end.split(":"[0]);
            if (Number(timeItemEnd[0]) < 21) {
              item.work_hour.push({
                start: `${Number(timeItemEnd[0]) + 1}:00`,
                end: "22:00",
              });
            }
          });
        }
      });
    },

    removeWorkHour(value, index) {
      this.service_hours.map((item) => {
        if (item.day_of_week === value) {
          item.work_hour.splice(index, 1);
        }
      });
    },

    nextStep() {
      this.service_hours.map((item) => {
        item.work_hour.map((item1, index1) => {
          const itemEnd = item1.end.split(":"[0]);
          const itemStart = item1.start.split(":"[0]);
          if (Number(itemStart[0]) > Number(itemEnd[0])) {
            this.isTrue = true;
          }
        });
      });
      if (this.isTrue === true) {
        this.toast.error(this.message.setting_hourse_invalid, this.optionToast);
      } else {
        localStorage.setItem(
          "service_hours",
          JSON.stringify(this.service_hours)
        );

        if (this.isEditDraftService) {
          const hash_id = this.$route.query.hash_id;
          this.$router.push(`/seller/service/create?step=8&hash_id=${hash_id}`);
        } else {
          this.$router.push("/seller/service/create?step=8");
        }
      }
    },

    backStep() {
      if (this.isEditDraftService) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/reserve?hash_id=${hash_id}`);
      } else {
        this.$router.push("/seller/service/reserve");
      }
    },

    selectEndHour(event, indexValue, indexItem) {
      this.service_hours.map((item, index) => {
        if (index == indexValue) {
          var eventCompare = false;
          item.work_hour[indexItem].end = event;
          item.work_hour.map((item1, index1) => {
            const itemEnd = item1.end.split(":"[0]);
            const itemStart = item1.start.split(":"[0]);
            const eventEnd = event.split(":"[0]);
            if (Number(itemEnd[0]) === Number(eventEnd[0])) {
              eventCompare = true;
            }
            if (Number(itemStart[0]) > Number(itemEnd[0])) {
              this.isTrue = true;
            } else {
              this.isTrue = false;
              if (eventCompare === true && index1 != indexItem) {
                if (
                  Number(eventEnd[0]) >= Number(itemEnd[0]) ||
                  Number(eventEnd[0]) >= Number(itemStart[0])
                ) {
                  this.isTrue = true;
                } else {
                  this.isTrue = false;
                }
              } else {
                if (eventCompare === false) {
                  if (
                    Number(eventEnd[0]) <= Number(itemEnd[0]) ||
                    Number(eventEnd[0]) <= Number(itemStart[0])
                  ) {
                    this.isTrue = true;
                  } else {
                    this.isTrue = false;
                  }
                }
              }
            }
          });
          if (this.isTrue === true) {
            this.toast.error(
              this.message.setting_hourse_invalid,
              this.optionToast
            );
          }
        }
      });
    },

    selectStartHour(event, indexValue, indexItem) {
      this.service_hours.map((item, index) => {
        if (index == indexValue) {
          var eventCompare = false;
          item.work_hour[indexItem].start = event;
          item.work_hour.map((item1, index1) => {
            const itemEnd = item1.end.split(":"[0]);
            const itemStart = item1.start.split(":"[0]);
            const eventStart = event.split(":"[0]);
            if (Number(itemStart[0]) === Number(eventStart[0])) {
              eventCompare = true;
            }
            if (Number(itemStart[0]) > Number(itemEnd[0])) {
              this.isTrue = true;
            } else {
              if (eventCompare === true && index1 != indexItem) {
                if (
                  Number(eventStart[0]) >= Number(itemEnd[0]) ||
                  Number(eventStart[0]) >= Number(itemStart[0])
                ) {
                  this.isTrue = true;
                } else {
                  this.isTrue = false;
                }
              } else {
                if (eventCompare === false) {
                  if (
                    Number(eventStart[0]) <= Number(itemEnd[0]) ||
                    Number(eventStart[0]) <= Number(itemStart[0])
                  ) {
                    this.isTrue = true;
                  } else {
                    this.isTrue = false;
                  }
                }
              }
            }
          });
          if (this.isTrue === true) {
            this.toast.error(
              this.message.setting_hourse_invalid,
              this.optionToast
            );
          }
        }
      });
    },
  },
};
</script>

<style></style>
