import { APISettings } from '../../utils/fetch-api'
import axios from "axios"

import { defineStore } from 'pinia'
interface State {
    message: string
    success: string
    token: string
}
export const authAdminStore = defineStore('auth/admin', {
    // arrow function recommended for full type inference
    state: (): State => ({
        message: '',
        success: '',
        token: ''
    }),

    actions: {
        async login(request) {
            await axios.post(APISettings.baseURL+ '/api/admin/login', request)
            .then((response) => {
                const { data } = response
                if(data.access_token !== undefined) {
                    this.token = data.access_token
                    this.message = ''
                    this.success = true
                } else {
                    this.message = data.message
                    this.success = false
                }
            }).catch((error) => {
                this.success = false
            })
        },
    },
})
