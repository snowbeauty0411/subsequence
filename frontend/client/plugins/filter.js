export default defineNuxtPlugin(() => {
    return {
      provide: {
        setComma: (value) => {
            return new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "JPY",
              }).format(value);
        }
      }
    }
})