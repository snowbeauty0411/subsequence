import { defineStore } from 'pinia'
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
interface State {
    message: string
    success: string,
    error: string,
    detailCourse: {}
}

export const courseStore = defineStore('course', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        error: '',
        detailCourse: {}
    }),

    actions: {
        getDetailCourse(course_id) {
            Api.requestServer
                .get(`${Urls.COURSE}/${course_id}`)
                .then((response) => {
                    const { data } = response;
                    if (data.success) {
                        this.detailCourse = data.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

    },


})