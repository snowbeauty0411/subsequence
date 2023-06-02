import { APISettings } from '../../utils/fetch-api'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
import { defineStore } from 'pinia';

interface State {
    message: string,
    success: string,
    error: string,
    listTransferAdmin: [],
}

export const transferAdminStore = defineStore('transfer/admin', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        listTransferAdmin: [],
    }),

    actions: {

        async getListTransferAdmin(request) {
            await Api.requestServer
                .post(`${Urls.ADMIN}/${Urls.TRANSFER}/${Urls.LIST}?page=${request.page}`, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listTransferAdmin = data.data
                    } else {
                        this.error = true;
                        this.message = data.message;
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async completedTransferAdmin(request) {
            await Api.requestServer
                .patch(`${Urls.ADMIN}/${Urls.TRANSFER}/${request}/${Urls.COMPLETED}`, request)
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
    },
})