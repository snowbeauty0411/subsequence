import { APISettings } from '../../utils/fetch-api'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";

import { defineStore } from 'pinia'
interface State {
    message: string
    success: string,
    error: string,
    listBuyers: [],
    listSellers: [],
    detailUser: {},
    createSuccess: string,
    threadId: string
}
export const usersAdminStore = defineStore('user/admin', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        listBuyers: [],
        listSellers: [],
        detailUser: {},
        createSuccess: '',
        threadId: ''
    }),

    actions: {
        async getBuyerLists(request) {
            await Api.requestServer.post(Urls.BASE_URL_SERVER + Urls.ADMIN_BUYER_LIST + '?page=' + request.page, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listBuyers = data.data
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async getSellerLists(request) {
            await Api.requestServer.post(Urls.BASE_URL_SERVER + Urls.ADMIN_SELLER_LIST + '?page=' + request.page, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listSellers = data.data
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async blockUserStore(id) {
            await Api.requestServer.patch(Urls.BASE_URL_SERVER + Urls.ADMIN_BLOCK_USER + id)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.success = true;
                        this.message = data.message;
                    } else {
                        this.error = true;
                        this.message = data.message;
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async getInfoUser(request) {
            await Api.requestServer.get(Urls.BASE_URL_SERVER + Urls.ADMIN_ACCOUNT_INFO + request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.detailUser = data.data;
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async chatToSeller(request) {
            await Api.requestServer.post(Urls.BASE_URL_SERVER + Urls.TO_SELLER, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.createSuccess = true;
                        this.threadId = data.data;
                    } else {
                        this.createSuccess = false;
                    }
                }).catch((error) => {
                    this.createSuccess = false
                })
        },

        async chatToBuyer(request) {
            await Api.requestServer.post(Urls.BASE_URL_SERVER + Urls.TO_BUYER, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.createSuccess = true;
                        this.threadId = data.data;
                    } else {
                        this.createSuccess = false;
                    }
                }).catch((error) => {
                    this.createSuccess = false
                })
        },
    },
})
