import { defineStore } from 'pinia'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
interface State {
    message: string
    success: string,
    error: string,
}

export const paymentStore = defineStore('payment', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
    }),

    actions: {
        async paymentStripe(request) {
            await Api.requestServer
                .post(`${Urls.STRIPE_PAYMENT}`, request)
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