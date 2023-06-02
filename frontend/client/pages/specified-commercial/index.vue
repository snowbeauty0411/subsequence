<template>
  <NuxtLayout name="layoutdefault"
    ><div class="company">
      <div class="company-header flex items-end">
        <div class="company-header-textJP">特定商取引法に基づく表⽰</div>
        <div class="company-header-textEN">Display based on the Specified Commercial Transactions Law</div>
      </div>
      <div class="company-main">
        <div class="company-main-footer pb-5">
          <div class="mb-5">
            <div class="font-bold">販売業者</div>
            株式会社スタッコ <br /><br />
            <div class="font-bold">代表者</div>
            ⽢⽵繁⼈
            <br /><br />
            <div class="font-bold">WebサイトURL </div>
            http://www.stuccoplus.co.jp
            <br />
            <br />
            <div class="font-bold">所在地 </div>
            〒615-0884　京都府京都市右京区西京極郡町96-2<br />
            <br />
            <div class="font-bold">連絡先</div>
            TEL : 075-963-6161 <br />
            <br />
            <div class="font-bold">契約期間</div>
            別途ページにて記載<br /><br />
            <div class="font-bold">商品代⾦以外の必要料⾦</div>
            別途ページにて記載<br />
            <br />
            <div class="font-bold">⽀払い時期</div>
            別途ページにて記載<br />
            <br />
            <div class="font-bold">不良品</div>
            商品到着日から商品到着日から7日間以内にご連絡があった初期不良に付きましては<br />
            交換もしくは返金にて対応をいたします。
            <br /><br />
            <div class="font-bold">販売数量 </div>
            特に指定はございません（商品によって設定あり）
            <br /><br />
            <div class="font-bold">⽀払⽅法と⽀払期限</div>
            銀行振込・郵便振替・クレジットカード決済・コンビニ決済
            <br /><br />
            <div class="font-bold">引き渡し時期</div>
            別途ページにて記載<br /><br />
            <div class="font-bold">返品・交換について</div>
            確定後の取引は原則として返品・交換は不可能です<br /><br />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
export default {
  scrollToTop: true,
  created() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  },
};
</script>

<style lang="scss" scoped>
.company {
  &-header {
    padding: 20px 400px;
    @include screen(0133601440) {
      padding: 20px 300px;
    }
    @include screen(01199) {
      padding: 30px 100px;
      flex-direction: column;
      align-items: flex-start;
    }
    @include screen(991) {
      padding: 20px 50px;
    }
    
    background: $lightwhite;
    &-textJP {
      color: #5e5c5c;
      font-size: 22px;
      font-weight: 600;
    }
    &-textEN {
      margin-left: 20px;
      color: #5e5c5c;
      font-size: 16px;
      @include screen(01199) {
        margin: 0;
      }
    }
  }
  &-main {
    padding: 20px 400px;
    @include screen(0133601440) {
      padding: 20px 300px;
    }
    @include screen(991) {
      padding: 30px 50px;
    }
    @include screen(9921023) {
      padding: 50px;
    }
    @include screen(10241365) {
      padding: 30px 100px;
    }
    background: $white;
    &-header {
      color: $lightblack;
      font-size: 20px;
      font-weight: 500;
    }
    &-footer {
      margin: 30px 0;
      color: $lightblack;
      font-size: 20px;
      font-weight: 500;
      .title {
        font-weight: 600;
      }
    }
  }
}
</style>
