<template>
  <NuxtLayout name="layoutdefault"
    ><div class="payment-completed">
      <div class="payment-completed-header flex items-end">
        <div class="payment-completed-header-textJP">お申し込み完了</div>
      </div>
      <div class="payment-completed-main">
        <div class="text-[22px] font-semibold text-[#5E5C5C] mb-[50px]">
          サービスの利用申込みを受け付けました。
        </div>
        <div class="payment-completed-main-header">
          <div class="my-3">
            サービスの利用申込みが完了しました。 <br />
          </div>
          <Nuxt-Link to="/">
            <div class="mt-2">
              <b-button
                type="input"
                class="back-toppage"
                v-on:click="backToTopPage()"
              >
                <span class="text-button">TOPページへ戻る</span>
              </b-button>
            </div>
          </Nuxt-Link>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
export default {
  created() {
    window.scrollTo(0, 0);
  },
  methods: {
    backToTopPage() {
      localStorage.removeItem("dataDelivery");
      localStorage.removeItem("dataStripe");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.payment-completed {
  &-header {
    padding: 20px 400px;
    @include screen(991) {
      padding: 20px 50px;
    }
    @include screen(576){
      padding-inline: 30px;
    }
    background: $lightwhite;
    &-textJP {
      color: #5e5c5c;
      font-size: 22px;
      font-weight: 600;
      @include screen(576){
        font-size: 18px;
      }
    }
    &-textEN {
      margin-left: 20px;
      color: #5e5c5c;
      font-size: 16px;
    }
  }
  &-main {
    padding: 100px 400px;
    @include screen(991) {
      padding: 30px 50px;
    }
    @include screen(9921023) {
      padding: 50px;
    }
    @include screen(10241365) {
      padding: 30px 100px;
    }
    @include screen(576){
      padding-inline: 20px;
    }
    .main-text{
      @include screen(576){
        font-size: 18px;
        margin-block: 30px 20px;
      }
    }
    background: $white;
    &-header {
      color: $lightblack;
      font-size: 16px;
      font-weight: 500;
      .main-header-text{
        font-size: 14px;
      }
    }
    .back-toppage {
      margin-top: 50px;
      background-color: $orange;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 11px 0;
      width: 100%;
      border-radius: 8px;
      border: none;
      &:focus {
        box-shadow: 0 0 0 0.25rem #95c895 !important;
      }
      .text-button {
        color: #fff;
        font-size: 1rem;
      }
    }
  }
}
</style>