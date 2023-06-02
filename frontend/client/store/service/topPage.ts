import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";

import { defineStore } from 'pinia'
interface State {
    message: string
    success: string,
    listRecommended: [],
    listSpecial: [],
    listHashTag: [],
    listNewList: [],
    listFeatured: [],
    listFeaturedAll: [],
    listNewListAll: [],
}
export const TopPageStore = defineStore('user/admin', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        listRecommended: [],
        listSpecial: [],
        listHashTag: [],
        listNewList: [],
        listFeatured: [],
        listFeaturedAll: [],
        listNewListAll: [],
    }),

    actions: {
        async getRecommendedList() {
            await Api.requestServer.get(Urls.BASE_URL_SERVER + Urls.SERVICE_RECOMMEND_LIST)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listRecommended = data.data.data
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async getRecommendedListLogined(request) {
            await Api.requestServer.get(Urls.BASE_URL_SERVER + Urls.SERVICE_RECOMMEND_LIST + `&buyer_id=${request}`)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listRecommended = data.data.data
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async getSpecialList() {
            await Api.requestServer.get(Urls.BASE_URL_SERVER + Urls.SERVICE_SPECIAL_LIST)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listSpecial = data.data.data
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async getHashTagList() {
            await Api.requestServer.get(Urls.BASE_URL_SERVER + Urls.HASHTAG_LIST)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listHashTag = data.data
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async getNewList(request) {
            await Api.requestServer.post(Urls.BASE_URL_SERVER + Urls.SERVICE_NEW_LIST_TOPPAGE, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listNewList = data.data.data
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async getFeaturedList(request) {
            await Api.requestServer.post(Urls.BASE_URL_SERVER + Urls.SERVICE_FEATURED_LIST_TOPPAGE, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listFeatured = data.data.data
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async getFeaturedListAll(request) {
            await Api.requestServer.post(Urls.BASE_URL_SERVER + Urls.SERVICE_FEATURED_LIST + `/9?page=${request.page}`, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listFeaturedAll = data.data
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async getFeaturedListAllLogined(request) {
            await Api.requestServer.post(Urls.BASE_URL_SERVER + Urls.SERVICE_FEATURED_LIST + `/9?page=${request.page}`, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listFeaturedAll = data.data
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async getNewListAll(request) {
            await Api.requestServer.post(Urls.BASE_URL_SERVER + Urls.SERVICE_NEW_LIST + `/9?page=${request.page}`, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listNewListAll = data.data
                    }
                }).catch((error) => {
                    this.success = false
                })
        },
    },
})
