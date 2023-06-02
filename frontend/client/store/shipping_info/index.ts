import { defineStore } from 'pinia'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
interface State {
    messageShipping: string
    successShipping: string,
    errorShipping: string,
    errorAddress: string,
    shippingInfoList: [],
    dataAddress: {},
    detailShippingById: {}
}

export const shippingInfoStore = defineStore('shippingInfo', {
    // arrow function recommended for full type inference
    state: (): State => ({
        messageShipping: '',
        successShipping: '',
        errorShipping: '',
        errorAddress: '',
        shippingInfoList: [],
        dataAddress: {},
        detailShippingById: {}
    }),

    actions: {
        getShippingInfoByBuyerId(buyer_id) {
            Api.requestServer
                .get(`${Urls.SHIPPING_INFO}/${Urls.LIST}/${buyer_id}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.shippingInfoList = data.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async editShippingInfo(request) {
            await Api.requestServer
                .put(`${Urls.SHIPPING_INFO}/${Urls.EDIT}/${request.id}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.successShipping = true;
                        this.messageShipping = data.message;
                    } else {
                        this.error = true;
                        this.messageShipping = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async deleteShippingInfo(id) {
            await Api.requestServer
                .delete(`${Urls.SHIPPING_INFO}/${Urls.DELETE}/${id}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.successShipping = true;
                        this.messageShipping = data.message;
                    } else {
                        this.errorShipping = true;
                        this.messageShipping = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async addShippingInfo(request) {
            await Api.requestServer
                .post(`${Urls.SHIPPING_INFO}/${Urls.STORE}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.successShipping = true;
                        this.messageShipping = data.message;
                    } else {
                        this.errorShipping = true;
                        this.messageShipping = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getAddress(request) {
            Api.requestServer
                .get(`${Urls.SERVICE}/${Urls.PREFECTURES}/${request}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.dataAddress = data.data;
                    } else {
                        this.errorAddress = true;
                        this.messageShipping = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getDetailShipping(shippingID) {
            Api.requestServer
                .get(`${Urls.SHIPPING_INFO}/${shippingID}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.detailShippingById = data.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    },


})