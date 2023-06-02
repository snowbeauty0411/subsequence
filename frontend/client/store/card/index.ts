import { defineStore } from 'pinia'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
interface State {
    messageCard: string
    successCard: string,
    errorCard: string,
    cardsList: []
}

export const cardStore = defineStore('card', {
    // arrow function recommended for full type inference
    state: (): State => ({
        messageCard: '',
        successCard: '',
        errorCard: '',
        cardsList: []
    }),

    actions: {
        getListCardsByBuyerId(request) {
            Api.requestServer
                .get(`${Urls.CARD}/${Urls.BUYER}/${request.buyer_id}?limit=${request.limit}&page=${request.page}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.cardsList = data.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async addCard(request) {
            Api.requestServer
                .post(`${Urls.CARD}/${Urls.CREATE}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.successCard = true;
                        this.messageCard = data.message;
                    } else {
                        this.errorCard = true;
                        this.messageCard = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async deleteCard(card_id, buyer_id) {
            Api.requestServer
                .delete(`${Urls.CARD}/${Urls.DELETE}/${card_id}?buyer_id=${buyer_id}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.successCard = true;
                        this.messageCard = data.message;
                    } else {
                        this.errorCard = true;
                        this.messageCard = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async editCard(request) {
            Api.requestServer
                .post(`${Urls.CARD}/${Urls.EDIT}/${request.card_id}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.successCard = true;
                        this.messageCard = data.message;
                    } else {
                        this.errorCard = true;
                        this.messageCard = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

    },


})