import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";

import { defineStore } from 'pinia'
interface State {
    message: string
    success: string,
    error: string,
    listThreadChat: [],
    listThreadChatAdmin: [],
    idThreadChat: string,
    listMessages: {},
    listMessagesAdmin: {},
    fileBase64: string,

}
export const ChatStore = defineStore('ChatStore', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        listThreadChat: [],
        listThreadChatAdmin: [],
        idThreadChat: '',
        listMessages: {},
        listMessagesAdmin: {},
        fileBase64: '',
    }),

    actions: {

        async getListThreadChat(request) {
            await Api.requestServer
                .post(`${Urls.CHAT_THREAD_USER_LIST}?page=${request.page}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.listThreadChat = data.data;
                    }
                })
                .catch((error) => {
                    this.success = false
                });
        },

        async createThreadChat(request) {
            await Api.requestServer
                .post(`${Urls.CHAT}/${Urls.USER}/${Urls.CREATE}/${Urls.THREAD}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.success = true;
                        this.message = data.message;
                        if (data.data) {
                            this.idThreadChat = data.data
                        }
                    } else {
                        this.error = true;
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    this.success = false
                });
        },

        async getListMessages(request) {
            await Api.requestServer
                .post(`${Urls.CHAT}/${Urls.USER}/${Urls.THREAD}/${Urls.INDEX}/${request.id_thread}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.listMessages = data.data;
                    }
                })
                .catch((error) => {
                    this.success = false
                });
        },

        async sendMessage(request) {
            await Api.requestServer
                .post(`${Urls.CHAT}/${Urls.MESSAGE_CREATE}`, request)
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

        async getListThreadChatAdmin(request) {
            await Api.requestServer
                .post(`${Urls.ADMIN}/${Urls.CHAT}/${Urls.LIST_THREAD}?page=${request.page}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.listThreadChatAdmin = data.data;
                    }
                })
                .catch((error) => {
                    this.success = false
                });
        },

        async getListMessagesAdmin(request) {
            await Api.requestServer
                .post(`${Urls.ADMIN}/${Urls.CHAT}/${Urls.THREAD}/${Urls.INDEX}`, request)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.listMessagesAdmin = data.data;
                    }
                })
                .catch((error) => {
                    this.success = false
                });
        },

        async readFile(request) {
            await Api.requestServer
                .get(`${Urls.CHAT}/${request.thread_id}/${request.file_name }`)
                .then((response) => {
                    const { data } = response;
                        this.fileBase64 = data;
                })
                .catch((error) => {
                    this.success = false
                });
        },
    },
})
