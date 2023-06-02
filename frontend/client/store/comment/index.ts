import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";

import { defineStore } from 'pinia'
interface State {
    message: string
    success: string,
    error: string,
    detailComment: {},
}
export const SearchStore = defineStore('SearchStore', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        detailComment: {},
    }),

    actions: {

        async getDetaiCategory(request) {
            await Api.requestServer
                .get(`${Urls.SERVICE_CATEGORY_DETAIL}/${request}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.detailCategory = data.data;
                    }
                })
                .catch((error) => {
                    this.success = false
                });
        },
    },
})
