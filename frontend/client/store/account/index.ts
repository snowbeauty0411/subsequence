import { defineStore } from 'pinia'
import { Message } from "../../utils/message";
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
import axios from 'client/plugins/axios';
import axios1 from "axios"

interface State {
    messageAccount: string,
    successAccount: string,
    messageSettingAccount: string,
    successSettingAccount: string,
    dataAccountUser: {},
    errorAccount: string,
    errorSettingAccount: string,
    infoWithdrawal: {},
    dataBank: [],
    dataBranch: [],
}

export const accountStore = defineStore('account', {
    // arrow function recommended for full type inference
    state: (): State => ({
        messageAccount: "",
        successAccount: "",
        messageSettingAccount: "",
        successSettingAccount: "",
        dataAccountUser: {},
        errorAccount: "",
        errorSettingAccount: "",
        infoWithdrawal: {},
        dataBank: [],
        dataBranch: [],
    }),

    actions: {
        getAccountSetting() {
            Api.requestServer
                .get(`${Urls.ACCOUNT}/${Urls.SETTING}/${Urls.INFO}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.dataAccountUser = data.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        updateSettingAccount(request) {
            Api.requestServer
                .patch(`${Urls.ACCOUNT}/${Urls.SETTING}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.successSettingAccount = true;
                        this.messageSettingAccount = data.message;
                    } else {
                        this.errorSettingAccount = true;
                        this.messageSettingAccount = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async updateEmail(request) {
            await Api.requestServer
                .post(`${Urls.MAIL}/${Urls.INPUT}`, request)
                .then((response) => {
                    const { data } = response
                    if (data.success) {
                        this.successAccount = true;
                        this.messageAccount = data.message;
                    } else {
                        this.errorAccount = true;
                        this.messageAccount = data.message;
                    }
                }).catch((error) => {
                    this.success = false
                })
        },

        getInfoWithdrawalAccount(request) {
            Api.requestServer
                .get(`${Urls.ACCOUNT}/${request}/${Urls.INFO_WITHDRAWAL}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.infoWithdrawal = data.data;
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

        async getBank() {
            Api.requestServer
                .get(`${Urls.ACCOUNT}/${Urls.BANK}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.dataBank = data.data;
                    } else {
                        this.messageAccount = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async getBranch(bank_id, branch_name) {
            Api.requestServer
                .get(`${Urls.ACCOUNT}/${Urls.BRANCH}?bank_id=${bank_id}&name=${branch_name}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.dataBranch = data.data;
                    } else {
                        this.messageAccount = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

})