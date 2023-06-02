import { APISettings } from '../../utils/fetch-api'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
import { defineStore } from 'pinia';

interface State {
    message: string,
    success: string,
    error: string,
    listTagForAdmin: [],
    detailTag: {},
}

export const tagAdminStore = defineStore('tag/admin', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        listTagForAdmin: [],
        detailTag: {},
    }),

    actions: {
        async getTagLists(request) {
            await Api.requestServer
                .post(`${Urls.ADMIN}/${Urls.FAVORITETAG}/${Urls.LIST}?page=${request.page}`, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.listTagForAdmin = data.data
                    } else {
                        this.error = true;
                        this.message = data.message;
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        async createTag(request) {
            await Api.requestServer
                .post(`${Urls.ADMIN}/${Urls.FAVORITETAG}`, request)
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

        async getDetailTagById(request) {
            await Api.requestServer
                .get(`${Urls.ADMIN}/${Urls.FAVORITETAG}/${request}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.detailTag = data.data;
                    } else {
                        this.error = true;
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    this.success = false
                });
        },

        async editTag(request) {
            await Api.requestServer
                .patch(`${Urls.ADMIN}/${Urls.FAVORITETAG}/${request.id}`, request)
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

        async deleteTag(id) {
            await Api.requestServer.delete(`${Urls.ADMIN}/${Urls.FAVORITETAG}/${id}`)
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