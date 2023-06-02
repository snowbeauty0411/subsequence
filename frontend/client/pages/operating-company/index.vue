<template>
  <NuxtLayout name="layoutdefault"
    ><div class="company">
      <div class="company-header flex items-end">
        <div class="company-header-textJP">運営会社</div>
        <div class="company-header-textEN">Company profile</div>
      </div>
      <div class="company-main">
        <div class="company-main-footer">
          <div>
            <div class="font-bold">商号</div>
            株式会社スタッコ (旧エバーファースト) <br /><br />
            <div class="font-bold">所在地</div>
            〒615-0884 京都府京都市右京区西京極郡町 96-2
            <br /><br />
            <div class="font-bold">連絡先</div>
            TEL : 075-963-6161<br />
            FAX : 075-963-6162 <br />
            <br />
            <div class="font-bold">設立</div>
            平成17年11月<br />
            <br />
            <div class="font-bold">資本金</div>
            10,000,000円 <br />
            <br />
            <div class="font-bold">取引先銀行</div>
            みずほ銀行船場支店 <br />京都信用金庫梅津支店<br /><br />
            <div class="font-bold">代表取締役</div>
            甘竹繁人<br />
            <br />
            <div class="font-bold">取締役</div>
            金子政右<br />
            <br />
            <div class="font-bold">WebサイトURL</div>
            http://www.stuccoplus.co.jp/ <br /><br />
            <div class="font-bold">事業内容</div>
            建築資材の輸入、販売<br />建築資材の新製品の開発、販売<br />
            壁画の設計デザイン･制作施工<br />
            特殊塗装及び特殊左官工事の施工 <br /><br />
            <div class="font-bold">経営理念</div>
            安全で、環境に優しく、意匠性豊か な建材で地球と人間社会に貢献する
            <br /><br />
            <div class="font-bold">その他</div>
            建設業許可　塗装工事業　京都府知事　般-28第39176号<br />
            京都商工会議所会員<br />
            グリーンサイト・CCUS加入
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
    @include screen(991) {
      padding: 20px 50px;
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
    padding: 20px 400px;
    @include screen(991) {
      padding: 30px 50px;
    }
    @include screen(480){
      padding-inline: 20px;
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
      @include screen(480){
        font-size: 15px;
        line-height: 2;
      }
      .title {
        font-weight: 600;
      }
    }
  }
}
</style>
