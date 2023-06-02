<template>
  <div class="w-100 flex flex-row">
    <button
      class="
        button-action-schedule
        rounded-[12px]
        flex
        items-center
        justify-center
        flex-col
      "
      v-on:click="prevWeek"
      v-if="dataShow && dataShow.length > 0"
    >
      <SDIcon icon="chevron-left" size="2x" />
      前週
    </button>
    <div class="w-100 overflow-hidden list-settings d-flex justify-between">
      <div
        v-for="(item, index) in dataShow"
        :key="index"
        class="list-settings-column"
      >
        <div class="w-100">
          <div class="list-settings-row row-date">{{ item.date_format }}</div>
          <div v-if="checkEnable === 1 && user_type == 'BUYER'">
            <div
              v-for="(itemTime, indexTime) in item.event"
              :key="indexTime"
              class="list-settings-row row-time"
              v-on:click="showCreateReservation(item, itemTime)"
              :class="
                itemTime.status === 0 && user_type == 'BUYER'
                  ? 'bg-[#CCCBCB]'
                  : itemTime.status === 1 &&
                    user_type == 'BUYER' &&
                    item.isExpired == false
                  ? 'cursor-pointer bg-[#E79C3A]'
                  : itemTime.status === 1 &&
                    user_type == 'BUYER' &&
                    item.isExpired == true
                  ? 'bg-[#CCCBCB]'
                  : 'cursor-pointer bg-[#C0DB5B]'
              "
            >
              <div
                v-if="user_type == 'BUYER' && itemTime.buyers.length > 0"
                class="avatar ml-[-27px] cursor-pointer"
                v-on:click="$router.push({ path: `/profile/${account_id}` })"
              >
                <div v-for="(item, index) in itemTime.buyers" :key="index">
                  <img
                    :src="urlImg ? urlImg : avatarDefault"
                    alt=""
                    v-if="parseInt(item.account_id) === parseInt(account_id)"
                  />
                </div>
              </div>
              <div
                v-if="itemTime.buyers.length > 0 && user_type == 'SELLER'"
                class="avatar ml-[-27px] cursor-pointer"
                v-on:click="showListReserve(index, indexTime)"
              >
                <img
                  :src="
                    itemTime.buyers[0].profile_image_url_buy ?? avatarDefault
                  "
                  alt=""
                  v-if="itemTime.buyers && itemTime.buyers.length === 1"
                />
                <div
                  class="buyer_amount"
                  v-if="itemTime.buyers && itemTime.buyers.length > 1"
                >
                  +{{ itemTime.buyers.length }}
                </div>
              </div>
              <div class="time">
                {{ itemTime.time_start }}
              </div>
            </div>
          </div>
          <div v-if="checkEnable === 0 && user_type == 'BUYER'">
            <div
              v-for="(itemTime, indexTime) in item.event"
              :key="indexTime"
              class="list-settings-row row-time bg-[#CCCBCB]"
              v-on:click="showCreateReservation(item, itemTime)"
            >
              <div
                v-if="user_type == 'BUYER' && itemTime.buyers.length > 0"
                class="avatar ml-[-27px] cursor-pointer"
                v-on:click="$router.push({ path: `/profile/${account_id}` })"
              >
                <div v-for="(item, index) in itemTime.buyers" :key="index">
                  <img
                    :src="urlImg ? urlImg : avatarDefault"
                    alt=""
                    v-if="parseInt(item.account_id) === parseInt(account_id)"
                  />
                </div>
              </div>
              <div
                v-if="itemTime.buyers.length > 0 && user_type == 'SELLER'"
                class="avatar ml-[-27px] cursor-pointer"
                v-on:click="showListReserve(index, indexTime)"
              >
                <img
                  :src="
                    itemTime.buyers[0].profile_image_url_buy ?? avatarDefault
                  "
                  alt=""
                  v-if="itemTime.buyers && itemTime.buyers.length === 1"
                />
                <div
                  class="buyer_amount"
                  v-if="itemTime.buyers && itemTime.buyers.length > 1"
                >
                  +{{ itemTime.buyers.length }}
                </div>
              </div>
              <div class="time">
                {{ itemTime.time_start }}
              </div>
            </div>
          </div>
          <div v-if="user_type == 'SELLER'">
            <div
              v-for="(itemTime, indexTime) in item.event"
              :key="indexTime"
              class="list-settings-row row-time"
              v-on:click="showCreateReservation(item, itemTime)"
              :class="
                itemTime.status === 0 && user_type == 'SELLER'
                  ? 'bg-[#CCCBCB]'
                  : itemTime.status === 1 && user_type == 'SELLER'
                  ? 'bg-[#E79C3A]'
                  : 'cursor-pointer bg-[#C0DB5B]'
              "
            >
              <div
                v-if="user_type == 'BUYER' && itemTime.buyers.length > 0"
                class="avatar ml-[-27px] cursor-pointer"
                v-on:click="$router.push({ path: `/profile/${account_id}` })"
              >
                <div v-for="(item, index) in itemTime.buyers" :key="index">
                  <img
                    :src="urlImg ? urlImg : avatarDefault"
                    alt=""
                    v-if="parseInt(item.account_id) === parseInt(account_id)"
                  />
                </div>
              </div>
              <div
                v-if="itemTime.buyers.length > 0 && user_type == 'SELLER'"
                class="avatar ml-[-27px] cursor-pointer"
                v-on:click="showListReserve(index, indexTime)"
              >
                <img
                  :src="
                    itemTime.buyers[0].profile_image_url_buy ?? avatarDefault
                  "
                  alt=""
                  v-if="itemTime.buyers && itemTime.buyers.length === 1"
                />
                <div
                  class="buyer_amount"
                  v-if="itemTime.buyers && itemTime.buyers.length > 1"
                >
                  +{{ itemTime.buyers.length }}
                </div>
              </div>
              <div class="time">
                {{ itemTime.time_start }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="
        button-action-schedule
        rounded-[12px]
        flex
        items-center
        justify-center
        flex-col
      "
      v-on:click="nextWeek"
      v-if="dataShow && dataShow.length > 0"
    >
      <SDIcon icon="chevron-right" size="2x" />
      次週
    </button>
    <!-- Modal Create Reservation -->
    <b-modal
      id="modal-delete-reservation"
      v-model="showModalCreateReserve"
      hide-footer
      hide-header
      size="lg"
    >
      <div class="list-reserve w-full flex flex-col">
        <div class="header flex justify-between w-full items-center py-2">
          <div class="header-text">この日時で予約する</div>
          <div class="icon-close">
            <SDIcon
              icon="x"
              size="2x"
              @click="showModalCreateReserve = false"
            />
          </div>
        </div>
        <div
          class="
            main
            flex flex-col
            w-full
            px-[100px]
            py-[30px]
            justify-center
            items-center
          "
        >
          <div
            class="
              main-detail
              flex
              justify-flex-start
              items-center
              p-[30px]
              bg-[#FAF9F3]
              w-full
            "
          >
            <div class="main-detail-left mr-[25px]">
              <img
                :src="
                  serviceDetail.images && serviceDetail.images.length > 0
                    ? serviceDetail.images[0].path
                    : imgDefault
                "
                alt=""
              />
            </div>
            <div class="main-detail-right flex flex-col">
              <div class="font-semibold">
                {{ serviceDetail.caption }} <br />
                「{{ serviceDetail.name }}」
              </div>
              <div class="font-medium my-2">{{ serviceDetail.name }}</div>
              <div
                class="font-semibold"
                v-if="
                  serviceDetail.service_store_buyers &&
                  serviceDetail.service_store_buyers.length > 0 &&
                  serviceDetail.service_store_buyers[0].service_courses
                "
              >
                {{ serviceDetail.service_store_buyers[0].service_courses.name }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            main-list-top
            relative
            flex
            pr-[100px]
            pl-[30px]
            py-[30px]
            items-center
          "
        >
          <div class="w-[70px] font-semibold text-[#5e5c5c]">予約日時</div>
          <div
            class="p-[15px] rounded-lg font-semibold text-[#5e5c5c]"
            style="border: 1px solid #5e5c5c; width: calc(100% - 70px)"
            v-if="detailReserve.date"
          >
            {{ $moment(detailReserve.date).format("YYYY") }}年{{
              detailReserve.date_format
            }}{{ detailReserve.time ? detailReserve.time.time_start : "" }}-{{
              detailReserve.time ? detailReserve.time.time_end : ""
            }}
          </div>
        </div>
        <div class="main-list w-full px-[100px] py-[30px]">
          <div class="main-list-bottom w-full">
            <button
              class="
                bg-[#e79c3a]
                text-[#fff]
                px-[10px]
                py-[15px]
                rounded-lg
                w-full
              "
              v-on:click="createReservation"
            >
              予約する
            </button>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- Modal List Buyer -->
    <b-modal
      id="modal-delete-reservation"
      v-model="showModalListReserve"
      hide-footer
      hide-header
      size="sm"
    >
      <div class="list-reserve w-full flex flex-col">
        <div class="header flex justify-between w-full items-center py-2">
          <div class="header-text">予約した人一覧</div>
          <div class="icon-close">
            <SDIcon icon="x" size="2x" @click="showModalListReserve = false" />
          </div>
        </div>
        <div
          class="main-list-top relative flex items-center"
          v-for="(item, index) in listBuyerReserves"
          :key="index"
        >
          <div class="main-list-top flex w-full px-3 py-[10px]">
            <div class="main-list-top-img text-[#5E5C5C] font-semibold w-[50%]">
              <img
                :src="item.profile_image_url_buy ?? avatarDefault"
                alt=""
                srcset=""
              />
            </div>
            <div
              class="main-list-top-text text-[#5E5C5C] font-semibold w-[50%]"
            >
              {{ item.account_name }}
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import { reservationStoreBuyer } from "@/store/buyer/reservations.ts";
import { reservationStoreSeller } from "@/store/seller/reservations.ts";
import SDIcon from "@/components/SDIcon";
import { mapState } from "pinia";
import Cookies from "js-cookie";
import { buyerStore } from "@/store/buyer/index.ts";
import "moment/locale/ja";
import moment from "moment";
import { useToast } from "vue-toastification";
import avatarDefault from "@/assets/images/avatar.png";
import imgDefault from "@/assets/images/detail1.png";

export default {
  setup() {
    const reservationsBuyer = reservationStoreBuyer();
    const reservationsSeller = reservationStoreSeller();
    const storeBuyer = buyerStore();
    const toast = useToast();
    return {
      reservationsBuyer,
      reservationsSeller,
      storeBuyer,
      toast,
    };
  },
  components: {
    Carousel,
    Slide,
    Navigation,
    SDIcon,
  },
  data() {
    return {
      account_id: null,
      showModalCreateReserve: false,
      avatarDefault,
      indexDate: 0,
      imgDefault,
      disabledPrev: false,
      disabledNext: false,
      dataShow: [],
      serviceDetail: {},
      optionToast: {
        type: "error",
        position: "top-right",
        duration: 1,
        keepOnHover: true,
        singleton: true,
        theme: "toasted-primary",
        iconPack: "material",
        fitToScreen: true,
      },
      data1: [],
      weekCurrent: 1,
      weekNext: 2,
      weekPrev: 0,
      time: null,
      user_type: null,
      last_day_reserves: "",
      detailReserve: {
        date: "",
        date_format: "",
        time: "",
      },
      urlImg: "",
      account_name: "",
      month: {},
      listBuyerReserves: [],
      showModalListReserve: false,
      dateEndService: null,
      currentDate: "",
      lastDate: "",
      end_of_week: "",
      start_of_week: "",
      checkEnable: 0,
    };
  },
  // props: {
  //   date: {
  //     type: String,
  //     default() {
  //       return {};
  //     },
  //   },
  // },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }
    if (this.user_type === "BUYER") {
      this.dateEndService = localStorage.getItem("dateEndService");
      this.month = this.reservationsBuyer.monthSelected;
      this.storeBuyer.getDetailServiceByHashId(this.$route.params.id);
      this.storeBuyer.getAccount(this.account_id);
    } else if (this.user_type === "SELLER") {
      this.month = this.reservationsSeller.timeSelected;
    }

    this.currentDate = new Date(); // get current date
    this.firstDate = this.currentDate.getDate() - this.currentDate.getDay(); // First day is the day of the month - the day of the week
    this.lastDate = new Date();
  },
  computed: {
    ...mapState(reservationStoreBuyer, [
      "dataReservationBuyer",
      "messageReservationBuyer",
      "successReservationBuyer",
      "errorReservationBuyer",
      "monthSelected",
      "isMonthSelected",
    ]),
    ...mapState(reservationStoreSeller, [
      "dataReservationSeller",
      "messageReservationSeller",
      "successReservationSeller",
      "errorReservationSeller",
      "timeSelected",
      "isTimeSelected",
    ]),
    ...mapState(buyerStore, ["detailServiceByHashId", "dataAccountBuyer"]),
  },
  watch: {
    detailServiceByHashId() {
      this.serviceDetail = this.detailServiceByHashId;
    },
    monthSelected() {
      if (this.user_type === "BUYER") {
        this.month = this.monthSelected;
      }
    },
    timeSelected() {
      if (this.user_type === "SELLER") {
        this.month = this.timeSelected;
      }
    },
    dataReservationBuyer() {
      if (this.user_type === "BUYER") {
        let current_time = moment(new Date()).format("YYYY-MM-DD HH:mm:00");
        this.dataShow = this.dataReservationBuyer.service_reserves;
        this.last_day_reserves = this.dataReservationBuyer.last_day_reserves;
        this.weekCurrent = this.dataReservationBuyer.week_info.week_current;
        this.end_of_week = this.dataReservationBuyer.week_info.end_of_week;
        this.start_of_week = this.dataReservationBuyer.week_info.start_of_week;
        this.checkEnable =
          this.dataReservationBuyer.service_reserve_setting.is_enable;
        for (let i = 0; i < this.dataShow.length; i++) {
          if (
            !this.dateEndService ||
            this.dateEndService > this.dataShow[i].date
          ) {
            this.dataShow[i].isExpired = false;
            for (let j = 0; j < this.dataShow[i].event.length; j++) {
              var hourStart = this.dataShow[i].event[j].time_start;
              if (hourStart === "9:00") {
                hourStart = hourStart.replace("9:00", "09:00");
              }
              var dateTime = this.dataShow[i].date + " " + hourStart;
              if (dateTime < current_time) {
                this.dataShow[i].event[j].status = 0;
              }
            }
          } else {
            this.dataShow[i].isExpired = true;
          }
        }

        // if (this.weekCurrent === 1) {
        //   this.weekNext = this.weekCurrent + 1;
        // } else {
        //   this.weekPrev = this.weekCurrent - 1;
        //   this.disabledPrev = false;
        // }
        // if (
        //   this.weekCurrent === this.dataReservationBuyer.week_info.week_count
        // ) {
        //   this.disabledNext = true;
        //   this.weekPrev = this.weekCurrent - 1;
        // } else {
        //   this.weekNext = this.weekCurrent + 1;
        //   this.disabledNext = false;
        // }
      }
    },
    dataReservationSeller() {
      if (this.user_type === "SELLER") {
        this.dataShow = this.dataReservationSeller.service_reserves;
        this.weekCurrent = this.dataReservationSeller.week_info.week_current;
        this.end_of_week = this.dataReservationSeller.week_info.end_of_week;
        this.start_of_week = this.dataReservationSeller.week_info.start_of_week;
        // if (this.weekCurrent === 1) {
        //   this.disabledPrev = true;
        //   this.weekNext = this.weekCurrent + 1;
        // } else {
        //   this.weekPrev = this.weekCurrent - 1;
        //   this.disabledPrev = false;
        // }
        // if (
        //   this.weekCurrent === this.dataReservationSeller.week_info.week_count
        // ) {
        //   this.disabledNext = true;
        //   this.weekPrev = this.weekCurrent - 1;
        // } else {
        //   this.weekNext = this.weekCurrent + 1;
        //   this.disabledNext = false;
        // }
      }
    },
    dataAccountBuyer() {
      if (this.dataAccountBuyer.buyers !== null) {
        this.urlImg = this.dataAccountBuyer.buyers.profile_image_url_buy;
        this.account_name = this.dataAccountBuyer.buyers.account_name;
      }
    },

    successReservationBuyer() {
      if (this.reservationsBuyer.successReservationBuyer === true) {
        this.toast.success(
          this.reservationsBuyer.messageReservationBuyer,
          this.optionToast
        );
        this.reservationsBuyer.successReservationBuyer = "";
        this.reservationsBuyer.messageReservationBuyer = "";
        this.showModalCreateReserve = false;
        // this.getDateNowBuyer();
        this.getListReservations();
        this.storeBuyer.getDetailServiceByHashId(this.$route.params.id);
      }
    },
    errorReservationBuyer() {
      if (this.reservationsBuyer.errorReservationBuyer === true) {
        this.toast.error(
          this.reservationsBuyer.messageReservationBuyer,
          this.optionToast
        );
        this.reservationsBuyer.errorReservationBuyer = "";
        this.reservationsBuyer.messageReservationBuyer = "";
      }
    },

    successReservationSeller() {
      if (this.reservationsSeller.successReservationSeller === true) {
        this.toast.success(
          this.reservationsSeller.messageReservationSeller,
          this.optionToast
        );
        this.reservationsSeller.successReservationSeller = "";
        this.reservationsSeller.messageReservationSeller = "";
        this.getDateNowSeller();
      }
    },
    errorReservationSeller() {
      if (this.reservationsSeller.errorReservationSeller === true) {
        this.toast.error(
          this.reservationsSeller.messageReservationSeller,
          this.optionToast
        );
        this.reservationsSeller.errorReservationSeller = "";
        this.reservationsSeller.messageReservationSeller = "";
      }
    },
  },
  methods: {
    getWeekOfMonth(dateMinus) {
      this.lastDate = dateMinus;
      this.month.month = this.lastDate.getMonth() + 1;
      this.month.year = this.lastDate.getFullYear();
      let adjustedDate = this.lastDate.getDate() + this.lastDate.getDay();
      return Math.round(adjustedDate / 7 + 1);
    },
    getWeeksDiff(startDate, endDate) {
      const msInWeek = 1000 * 60 * 60 * 24 * 7;

      return Math.round(
        Math.abs(endDate.getTime() - startDate.getTime()) / msInWeek
      );
    },
    prevWeek() {
      if (this.isMonthSelected) {
        this.lastDate = new Date(this.start_of_week);
      }
      if (this.isTimeSelected) {
        this.lastDate = new Date(this.start_of_week);
      }
      let dateMinus = new Date(
        this.lastDate.setDate(this.lastDate.getDate() - 7)
      );
      this.weekPrev = this.getWeekOfMonth(dateMinus);
      if (this.user_type === "BUYER") {
        const request = {
          hash_id: this.$route.params.id,
          buyer_id: this.account_id,
          year: this.month.year,
          month: this.month.month,
          week: this.weekPrev,
        };
        this.reservationsBuyer.getReservationsByMonth(request);
      } else if (this.user_type === "SELLER") {
        const request = {
          hash_id: this.$route.params.id,
          year: this.month.year,
          month: this.month.month,
          course_id: this.reservationsSeller.course_id,
          week: this.weekPrev,
        };
        this.reservationsSeller.getReservationsByMonth(request);
      }
    },

    nextWeek() {
      if (this.isMonthSelected) {
        this.lastDate = new Date(this.start_of_week);
      }
      if (this.isTimeSelected) {
        this.lastDate = new Date(this.start_of_week);
      }
      let dateMinus = new Date(
        this.lastDate.setDate(this.lastDate.getDate() + 7)
      );
      this.weekNext = this.getWeekOfMonth(dateMinus);
      if (this.user_type === "BUYER") {
        const request = {
          hash_id: this.$route.params.id,
          buyer_id: this.account_id,
          year: this.month.year,
          month: this.month.month,
          week: this.weekNext,
        };
        this.reservationsBuyer.getReservationsByMonth(request);
      } else if (this.user_type === "SELLER") {
        const request = {
          hash_id: this.$route.params.id,
          year: this.month.year,
          month: this.month.month,
          course_id: this.reservationsSeller.course_id,
          week: this.weekNext,
        };
        this.reservationsSeller.getReservationsByMonth(request);
      }
    },

    getDateNowBuyer() {
      if (Object.keys(this.month).length > 0) {
        var month = this.month.month + 1;
        var year = this.month.year;
      } else {
        const d = new Date();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
      }
      const request = {
        hash_id: this.$route.params.id,
        buyer_id: this.account_id,
        year: year,
        month: month,
        week: this.weekCurrent,
      };
      this.reservationsBuyer.getReservationsByMonthFirst(request);
    },

    getListReservations() {
      const request = {
        hash_id: this.$route.params.id,
        buyer_id: this.account_id,
        per_page: 5,
        page: 1,
      };
      this.reservationsBuyer.getReservations(request);
    },

    getDateNowSeller() {
      // if (Object.keys(this.month).length > 0) {
      //   var month = this.month.month + 1;
      //   var year = this.month.year;
      // } else {
      //   const d = new Date();
      //   const month = d.getMonth() + 1;
      //   const year = d.getFullYear();
      // }
      const request = {
        hash_id: this.$route.params.id,
        course_id: this.reservationsSeller.course_id,
        year: this.month.year,
        month: this.month.month,
        week: this.weekCurrent,
      };
      this.reservationsBuyer.getReservationsByMonthFirst(request);
    },

    showCreateReservation(item, itemTime) {
      if (this.user_type === "BUYER") {
        if (itemTime.status == 1 && this.dateEndService == null) {
          this.detailReserve.date = item.date;
          this.detailReserve.date_format = item.date_format;
          this.detailReserve.time = itemTime;
          this.showModalCreateReserve = true;
        }
      }
    },

    createReservation() {
      const request = {
        buyer_id: this.account_id,
        service_id: this.serviceDetail.id,
        course_id:
          this.serviceDetail &&
          this.serviceDetail.service_store_buyers &&
          this.serviceDetail.service_store_buyers.length > 0
            ? this.serviceDetail.service_store_buyers[0].course_id
            : "",
        reserve_start:
          this.detailReserve && this.detailReserve.time
            ? this.detailReserve.date + " " + this.detailReserve.time.time_start
            : "",
        reserve_end:
          this.detailReserve && this.detailReserve.time
            ? this.detailReserve.date + " " + this.detailReserve.time.time_end
            : "",
        service_reserve_setting:
          this.dataReservationBuyer.service_reserve_setting,
        service_hours: this.dataReservationBuyer.service_hours,
        is_reserves: this.dataReservationBuyer.is_reserves,
        hours_temp: this.dataReservationBuyer.hours_temp,
      };
      this.reservationsBuyer.createReservations(request);
    },

    showListReserve(index, indexTime) {
      if (
        this.dataShow &&
        this.dataShow[index] &&
        this.dataShow[index].event &&
        this.dataShow[index].event[indexTime] &&
        this.dataShow[index].event[indexTime].buyers
      ) {
        this.listBuyerReserves = this.dataShow[index].event[indexTime].buyers;
      }
      this.showModalListReserve = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.button-action-schedule {
  background-color: #7e7d7d;
  color: $white;
  padding: 0 10px;
  @include screen(480) {
    padding: 0 0px;
  }
  @include screen(768) {
    padding: 0 0px;
  }
  font-size: 14px;
  font-weight: 600;
}
.list-settings {
  display: flex;
  width: 900px !important;
  overflow-x: scroll !important;

  &-column {
    width: auto;
    margin: 0 5px;
  }
  &-row {
    padding: 10px 0;
    border-radius: 8px;
    color: $white;
    font-weight: 700;
    text-align: center;
    height: 40px;
    margin: 10px 0;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    @include screen(767) {
      font-size: 10px;
    }
    .avatar {
      img {
        object-fit: cover;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .buyer_amount {
        background-color: white;
        border-radius: 50%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        width: 30px;
      }
    }
  }
  .row-date {
    background: $gray-500;
  }
  .row-time {
    width: 95px;
  }
}
.main-list-top {
  &-img {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
    }
  }
  &-text {
    display: flex;
    align-items: center;
  }
}
</style>