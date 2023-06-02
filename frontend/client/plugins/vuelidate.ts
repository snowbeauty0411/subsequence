import { defineNuxtPlugin } from '#app'
import useVuelidate  from '@vuelidate/core'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(useVuelidate)
})