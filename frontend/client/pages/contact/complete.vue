<template>
  <NuxtLayout name="layoutdefault"
    ><div class="contact">
      <div class="contact-header flex items-end">
        <div class="contact-header-textJP">お問い合わせ</div>
        <div class="contact-header-textEN">Contact</div>
      </div>
      <div class="contact-main">
        <div class="contact-main-header">
          <div class="my-3">
            お問い合わせメールの送信が完了しました。<br />
            記載された内容を確認後、submaスタッフより○日以内に回答いたします。
          </div>
          <div class="my-3">
            お急ぎの場合は<a
              @click="redirectToHelp"
              class="text-[#7D9FB1]"
              to="/help"
              >ヘルプページ</a
            >をご活用ください。
          </div>
          <Nuxt-Link to="/">
            <div class="mt-2">
              <b-button type="input" class="back-toppage">
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
    redirectToHelp() {
      window.open("/help", "_blank", "noreferrer");
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  &-header {
    padding: 20px 400px;
    @include screen(991) {
      padding: 20px 50px;
    }
    @include screen(480){
      padding-inline: 30px;
    }
    background: $lightwhite;
    &-textJP {
      color: #5e5c5c;
      font-size: 22px;
      font-weight: 600;
      @include screen(480){
        font-size: 18px;
      }
    }
    &-textEN {
      margin-left: 20px;
      color: #5e5c5c;
      font-size: 16px;
      @include screen(480){
        font-size: 12px;
      }
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
    @include screen(480){
      padding: 20px;
    }
    background: $white;
    &-header {
      color: $lightblack;
      font-size: 16px;
      font-weight: 500;
      @include screen(480){
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