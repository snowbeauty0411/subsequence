import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";

import { defineStore } from 'pinia'
interface State {
    message: string
    success: string,
    error: string,
    dataLogin: { token: '', type: '', account_id: '' }
}
export const LoginStore = defineStore('login', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        dataLogin: { token: '', type: '', account_id: '' }
    }),

    actions: {

        loginUser(request) {
            Api.requestServer
                .post(`${Urls.LOGIN}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.access_token) {
                        this.success = true;
                        this.dataLogin.token = data.access_token;
                        this.dataLogin.account_id = data.access_account_id;
                        this.dataLogin.type = data.access_type;
                        this.message = data.message;
                    } else {
                        this.error = true;
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        resetEmail(request) {
            Api.requestServer
                .post(`${Urls.MAIL}/${Urls.RESET}`, request)
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
                    console.log(error);
                });
        },
    },
})
