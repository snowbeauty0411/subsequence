import { defineStore } from 'pinia'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
interface State {
    message: string
    success: string,
    error: string,
    dataAccount: {}
}

export const contactStore = defineStore('contact', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        dataAccount: {}
    }),

    actions: {
        createContact(request) {
            Api.requestServer
                .post(`${Urls.CONTACT}/${Urls.CREATE}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.success = "true";
                        this.message = data.message;
                    } else {
                        this.error = 'true';
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getAccountBuyer(request) {
            Api.requestServer
                .get(`${Urls.BUYER}/${Urls.ACCOUNT}/${request}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.dataAccount = data.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getAccountSeller(request) {
            Api.requestServer
                .get(`${Urls.SELLER}/${Urls.ACCOUNT}/${request}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.dataAccount = data.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

    },


})