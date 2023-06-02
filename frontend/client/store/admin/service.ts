import { APISettings } from '../../utils/fetch-api'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
import { defineStore } from 'pinia';

interface State {
    message: string,
    success: string,
    error: string,
    listServiceForAdmin: [],
}

export const serviceAdminStore = defineStore('service/admin', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        listServiceForAdmin: [],
    }),

    actions: {
        async getServiceLists(request) {
            await Api.requestServer
                .post(`${Urls.ADMIN}/${Urls.SERVICE_MANAGE}?page=${request.page}`, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listServiceForAdmin = data.data
                    } else {
                        this.error = true;
                        this.message = data.message;
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async publicService(id) {
            await Api.requestServer.patch(`${Urls.ADMIN}/${Urls.SERVICE}/${id}/${Urls.APPROVE}`)
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

        async updateTypeService(request) {
            await Api.requestServer.patch(`${Urls.ADMIN}/${Urls.SERVICE_MANAGE}/${request.id}/${Urls.SETTING}`, request)
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