import { APISettings } from "../../utils/fetch-api";
import { Message } from "../../utils/message";
import { defineStore } from "pinia";
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";

interface State {
  messageReservationSeller: string;
  successReservationSeller: string;
  dataAccount: {};
  errorReservationSeller: string;
  dataRevenue: {};
  dataReservationSeller: {};
  dataBusinessSchedule: [];
  timeSelected: {};
  dataServiceHourTemp: {};
  isTimeSelected: string;
}

export const reservationStoreSeller = defineStore("reservationStoreSeller", {
  // arrow function recommended for full type inference
  state: (): State => ({
    messageReservationSeller: "",
    successReservationSeller: "",
    dataAccount: {},
    errorReservationSeller: "",
    dataRevenue: {},
    dataReservationSeller: {},
    dataBusinessSchedule: [],
    timeSelected: {},
    dataServiceHourTemp: {},
    isTimeSelected: "",
  }),

  actions: {
    async getReservations(request) {
      await Api.requestServer
        .post(
          `${Urls.SELLER}/${Urls.SERVICE}/${Urls.REVENUE}/${request.idService}?page=${request.page}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataRevenue = data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getReservationsByMonthFirst(request) {
      const year = request.year;
      const month = request.month;
      const course_id = request.course_id;
      const week = request.week;
      const hash_id = request.hash_id;
      await Api.requestServer
        .get(
          `${Urls.SELLER}/${Urls.SERVICE}/${hash_id}/${Urls.RESERVATION}?course_id=${course_id}&year=${year}&month=${month}&week=${week}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataReservationSeller = data.data;
            this.isTimeSelected = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getReservationsByMonth(request) {
      const year = request.year;
      const month = request.month;
      const week = request.week;
      const hash_id = request.hash_id;
      const course_id = request.course_id;
      await Api.requestServer
        .get(
          `${Urls.SELLER}/${Urls.SERVICE}/${hash_id}/${Urls.RESERVATION}?course_id=${course_id}&year=${year}&month=${month}&week=${week}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataReservationSeller = data.data;
            this.isTimeSelected = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getBusinessSchedule(request) {
      await Api.requestServer
        .get(
          `${Urls.SELLER}/${Urls.SERVICE}/${request}/${Urls.BUSSINESS_SCHEDULE}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataBusinessSchedule = data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getServiceHourTemp(request) {
      await Api.requestServer
        .get(
          `${Urls.SELLER}/${Urls.SERVICE}/${request.hash_id}/${Urls.SERVICE_HOURS_TEMP}?date=${request.date}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataServiceHourTemp = data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updateSettingReserve(request) {
      await Api.requestServer
        .post(
          `${Urls.SELLER}/${Urls.SERVICE}/${request.hash_id}/${Urls.BUSSINESS_SCHEDULE}/${Urls.UPDATE}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.successReservationSeller = true;
            this.messageReservationSeller = data.message;
          } else {
            this.errorReservationSeller = true;
            this.messageReservationSeller = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updateStatusReserve(request) {
      await Api.requestServer
        .post(
          `${Urls.SELLER}/${Urls.SERVICE}/${request}/${Urls.STATUS_RESERVES}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.successReservationSeller = true;
            this.messageReservationSeller = data.message;
          } else {
            this.errorReservationSeller = true;
            this.messageReservationSeller = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updateSettingsHours(request) {
      await Api.requestServer
        .post(
          `${Urls.SELLER}/${Urls.SERVICE}/${request.hash_id}/${Urls.SERVICE_HOURS_TEMP}/${Urls.UPDATE}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.successReservationSeller = true;
            this.messageReservationSeller = data.message;
          } else {
            this.errorReservationSeller = true;
            this.messageReservationSeller = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
