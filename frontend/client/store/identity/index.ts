import { defineStore } from 'pinia'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
interface State {
    message: string
    success: string
    dataIdentity: [],
    error: string,
    dataImage,
}

export const identityStore = defineStore('identity', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        dataIdentity: [],
        error: '',
        dataImage: null,
    }),

    actions: {
        uploadIdentification(request) {
            Api.requestServer
                .post(`${Urls.IDENTITY}/${Urls.UPLOAD_FILE}`, request)
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

        getFileIdentificationById(account_id) {
            Api.requestServer
                .get(`${Urls.IDENTITY}/${Urls.ACCOUNT}/${Urls.FILE}/${account_id}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.dataIdentity = data.data
                    } else {
                        this.error = 'true';
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async getImageIdentificById(request) {
            return await Api.requestImage
                .get(`${Urls.ACCOUNT}/${request.account_id}/${request.fileName}/${request.index}`)
                .then((response) => {
                    const { data } = response;
                    return data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        confirmIdentificationById(id) {
            Api.requestServer
                .patch(`${Urls.ADMIN}/${Urls.USER}/${Urls.IDENTITY}/${Urls.CONFIRM}/${id}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.success = 'true';
                        this.message = data.message
                    } else {
                        this.error = 'true';
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        rejectIdentificationById(id) {
            Api.requestServer
                .patch(`${Urls.ADMIN}/${Urls.USER}/${Urls.IDENTITY}/${Urls.REJECT}/${id}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.success = 'true';
                        this.message = data.message
                    } else {
                        this.error = 'true';
                        this.message = data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },


})