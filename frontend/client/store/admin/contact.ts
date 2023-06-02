import { APISettings } from '../../utils/fetch-api'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
import { defineStore } from 'pinia';

interface State {
    message: string,
    success: string,
    error: string,
    listContactForAdmin: [],
    detailContact: {},
}

export const contactAdminStore = defineStore('contact/admin', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        listContactForAdmin: [],
        detailContact: {},
    }),

    actions: {
        async getContactLists(request) {
            await Api.requestServer
                .post(`${Urls.ADMIN}/${Urls.CONTACT}/${Urls.LIST}?page=${request.page}`, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listContactForAdmin = data.data
                    } else {
                        this.error = true;
                        this.message = data.message;
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async replyContact(request) {
            await Api.requestServer
                .post(`${Urls.ADMIN}/${Urls.CONTACT}/${Urls.REPLY}/${request.id}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.success = true;
                        this.message = data.message;
                    } else {
                        this.error = true;
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    this.success = false
                });
        },

        async getDetailContactById(request) {
            await Api.requestServer
                .get(`${Urls.ADMIN}/${Urls.CONTACT}/${Urls.DETAIL}/${request}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.detailContact = data.data;
                    } else {
                        this.error = true;
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    this.success = false
                });
        },
    },
})