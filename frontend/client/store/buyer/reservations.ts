import { APISettings } from '../../utils/fetch-api'
import { Message } from "../../utils/message";
import { defineStore } from 'pinia'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";

interface State {
    messageReservationBuyer: string
    successReservationBuyer: string
    messageCancelReservation: string
    successCancelReservation: string
    dataAccount: {},
    errorReservationBuyer: string,
    errorCancelReservation: string,
    reservationList: {},
    dataReservationBuyer: {},
    dataBusinessSchedule: [],
    monthSelected: {},
    isMonthSelected: string,
}

export const reservationStoreBuyer = defineStore('reservationStoreBuyer', {
    // arrow function recommended for full type inference
    state: (): State => ({
        messageReservationBuyer: '',
        successReservationBuyer: '',
        messageCancelReservation: '',
        successCancelReservation: '',
        dataAccount: {},
        errorCancelReservation: '',
        errorReservationBuyer: '',
        reservationList: {},
        dataReservationBuyer: {},
        dataBusinessSchedule: [],
        monthSelected: {},
        isMonthSelected: '',
    }),

    actions: {
        async getReservations(request) {
            await Api.requestServer
                .get(`${Urls.BUYER}/${Urls.SERVICE}/${request.hash_id}/${Urls.RESERVATION}/${Urls.LIST}?buyer_id=${request.buyer_id}&per_page=${request.per_page}&page=${request.page}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.reservationList = data.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async getReservationsByMonthFirst(request) {
            const year = request.year;
            const buyer_id = request.buyer_id;
            const month = request.month;
            const week = request.week;
            const hash_id = request.hash_id;
            await Api.requestServer
                .get(`${Urls.BUYER}/${Urls.SERVICE}/${hash_id}/${Urls.RESERVATION}?buyer_id=${buyer_id}&year=${year}&month=${month}&week=${week}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.dataReservationBuyer = data.data;
                        this.isMonthSelected = true
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async getReservationsByMonth(request) {
            const year = request.year;
            const buyer_id = request.buyer_id;
            const month = request.month;
            const week = request.week;
            const hash_id = request.hash_id;
            await Api.requestServer
                .get(`${Urls.BUYER}/${Urls.SERVICE}/${hash_id}/${Urls.RESERVATION}?buyer_id=${buyer_id}&year=${year}&month=${month}&week=${week}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.dataReservationBuyer = data.data;
                        this.isMonthSelected = false
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async createReservations(request) {
            await Api.requestServer
                .post(`${Urls.BUYER}/${Urls.RESERVATION}/${Urls.CREATE}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.successReservationBuyer = true;
                        this.messageReservationBuyer = data.message;
                    } else {
                        this.errorReservationBuyer = true;
                        this.messageReservationBuyer = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async cancelReservation(request) {
            await Api.requestServer
                .post(`${Urls.BUYER}/${Urls.RESERVATION}/${Urls.DELETE}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.successCancelReservation = true;
                        this.messageCancelReservation = data.message;
                    } else {
                        this.errorCancelReservation = true;
                        this.messageCancelReservation = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

    },
})