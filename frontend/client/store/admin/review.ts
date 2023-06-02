import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
import { defineStore } from 'pinia';

interface State {
    message: string,
    success: string,
    error: string,
    listReviewForAdmin: [],
}

export const reviewAdminStore = defineStore('review/admin', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        listReviewForAdmin: [],
    }),

    actions: {
        async getReviewLists(request) {
            await Api.requestServer
                .post(`${Urls.ADMIN}/${Urls.COMMENT}/${Urls.LIST}?page=${request.page}`, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listReviewForAdmin = data.data
                    } else {
                        this.error = true;
                        this.message = data.message;
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async publicReview(id) {
            await Api.requestServer.patch(`${Urls.ADMIN}/${Urls.COMMENT}/${id}/${Urls.APPROVE}`)
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
        async publicReviewSeller(id) {
            await Api.requestServer.patch(`${Urls.ADMIN}/${Urls.COMMENT}/${Urls.SELLER}/${id}/${Urls.APPROVE}`)
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