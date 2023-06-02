import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";

import { defineStore } from 'pinia'
interface State {
    message: string
    success: string,
    error: string,
    detailProfileSeller: {},
    detailProfileBuyer: {},
    listServiceBySeller: [],
    dataServiceFavorite: [],
    listComment: {},
}
export const ProfileStore = defineStore('profile', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        listServiceBySeller: [],
        detailProfileSeller: {},
        detailProfileBuyer: {},
        dataServiceFavorite: [],
        listComment: {},
    }),

    actions: {
        async getServiceCreating(request) {
            await Api.requestServer
                .post(`${Urls.SELLER}/${Urls.SERVICE}/${Urls.CREATING_OR_SELLING}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.listServiceBySeller = data.data;
                    } else {
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async getAllServiceSeller(request) {
            await Api.requestServer
                .post(`${Urls.SELLER}/${Urls.SERVICE}/${Urls.GET_ALL_SERVICE}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.listServiceBySeller = data.data;
                    } else {
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getAccountSellerNotLogin(request) {
            Api.requestServer
                .get(`${Urls.SELLER}/${Urls.ACCOUNT_SELLER}/${request}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.detailProfileSeller = data.data;
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
                        this.detailProfileSeller = data.data;
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
                        this.detailProfileBuyer = data.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getServiceFavorite(request) {
            Api.requestServer
                .post(`${Urls.BUYER}/${Urls.SERVICE}/${Urls.FAVORITE}?page=${request.page}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.dataServiceFavorite = data.data;
                    } else {
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getListComment(request) {
            const buyer_id = request.buyer_id;
            const limit = request.limit;
            const page = request.page;
            Api.requestServer
                .get(`${Urls.COMMENT}/${Urls.BUYER}/${buyer_id}?limit=${limit}&page=${page}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.listComment = data.data;
                    } else {
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
})
