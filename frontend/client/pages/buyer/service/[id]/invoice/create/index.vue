<template>
  <SDPreLoad :preload="preload" />
  <div class="flex flex-col">
    <Header />
    <div class="invoice-main w-full">
      <div class="invoice-main-header flex justify-between">
        <b-button class="btn-return" v-on:click="backToServiceManagement">
          <span class="text-button">閉じる</span>
        </b-button>
        <b-button v-if="!isSafari" class="flex items-center btn-print" v-print="'#content_print'"
          ><BootstrapIcon icon="printer" size="sm" class="mx-2" /><span
            >印刷する</span
          ></b-button
        >
        <b-button v-else class="flex items-center btn-print" v-on:click="printInSafari()"
          ><BootstrapIcon icon="printer" size="sm" class="mx-2" /><span
            >印刷する</span
          ></b-button
        >
      </div>
      <div class="invoice-main-content flex justify-center" id="content_print">
        <div class="ct-print flex flex-col">
          <div class="ct-print-title flex justify-center text-black">領収書</div>
          <div class="ct-print-information flex justify-between">
            <div class="information-left flex flex-col text-black">
              <div class="my-1" v-if="invoiceDetail.buyer_name">
                {{ invoiceDetail.buyer_name }}　様
              </div>
              <div class="my-1">{{ invoiceDetail.post_code }}</div>
              <div class="my-1">{{ invoiceDetail.delivery_address }}</div>
            </div>
            <div class="information-right flex flex-col text-black">
              <div class="my-1">
                表示日：{{ invoiceDetail.invoice_create_at }}
              </div>
              <div class="my-1">領収書No.：{{ bill_id }}</div>
            </div>
          </div>
          <div class="ct-print-price flex justify-between">
            <div class="price-left text-black">
              {{ $setComma(invoiceDetail.sub_total) }}-
            </div>
            <div class="price-right flex text-black">
              <div class="my-1 flex flex-col justify-center">
                <div class="my-1">「SUBSQ」</div>
                <div class="my-1">株式会社スタッコ<br> 〒615-0884 <br>京都府京都市右京区<br>西京極郡町 96-2</div>
                <!-- <div class="my-1" v-if="invoiceDetail.service_address">
                  {{ invoiceDetail.service_address }}
                </div> -->
              </div>
              <div class="my-1 ct-mark flex justify-center items-center">
                印
              </div>
            </div>
          </div>
          <div class="ct-print-content4 flex flex-col text-black">
            <div class="my-1">
              但し、サブスクサービス利用料として <br />
              上記の金額、正に領収いたしました。
            </div>
          </div>
          <div class="ct-print-table flex">
            <div class="col-table flex flex-col text-black">
              <div class="col-header mb-2">決済日</div>
              <div class="col-content" v-if="invoiceDetail.pay_expire_at_date">
                {{
                  $moment(invoiceDetail.pay_expire_at_date).format("YYYY/MM/DD")
                }}
              </div>
              <div class="col-content" v-else>-</div>
            </div>
            <div class="col-table flex flex-col text-black">
              <div class="col-header mb-2">決済No.</div>
              <div class="col-content">
                {{ invoiceDetail.id }}
              </div>
            </div>
            <div class="col-table flex flex-col text-end mr-4 text-black">
              <div class="col-header mb-2">内容</div>
              <div class="col-content">
                {{ invoiceDetail.service_name }} {{ invoiceDetail.course_name }}
              </div>
            </div>
            <div class="col-table flex flex-col text-end text-black">
              <div class="col-header mb-2">金額</div>
              <div class="col-content">
                {{ $setComma(invoiceDetail.sub_total) }}
              </div>
            </div>
          </div>
          <div class="ct-print-detail flexflex-col">
            <!-- <div class="flex justify-between my-2">
              <div class="detail-left flex justify-end w-1/2">価格</div>
              <div class="detail-right flex justify-end w-1/2">
                {{ $setComma(invoiceDetail.sub_total) }}
              </div>
            </div> -->
            <!-- <div class="flex justify-between my-2">
              <div class="detail-left flex justify-end w-1/2">
                サービス手数料
              </div>
              <div class="detail-right flex justify-end w-1/2">
                {{ $setComma(invoiceDetail.service_fee) }}
              </div>
            </div> -->
            <div class="flex justify-between my-2 text-black">
              <div class="detail-left flex justify-end w-1/2">合計</div>
              <div class="detail-right flex justify-end w-1/2">
                {{ $setComma(invoiceDetail.sub_total) }}
              </div>
            </div>
          </div>
          <div class="ct-print-logo">
            <img src="@/assets/images/subsQ_logo4.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/SDHeaderManage";
import Footer from "@/components/SDFooter";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { buyerStore } from "@/store/buyer";
import { mapState } from "pinia";
import moment from "moment";
import print from "vue3-print-nb";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  directives: {
    print,
  },
  components: {
    Header,
    Footer,
    BootstrapIcon,
    SDPreLoad,
  },
  setup() {
    const store = buyerStore();
    return {
      store,
    };
  },
  data() {
    return {
      invoiceDetail: {},
      bill_id: "",
      preload: true,
      id_service: "",
      isSafari: false
    };
  },
  created() {
    var checkBrowser = navigator.userAgent.toLowerCase();
    if (checkBrowser.indexOf("safari") != -1) {
      if (checkBrowser.indexOf("chrome") > -1) {
        this.isSafari = false
      } else {
        // Safari
        this.isSafari = true
      }
    }
    this.id_service = localStorage.getItem("id_service");
    if (this.id_service === null || this.id_service === "") {
      this.$router.push("/buyer/dashboard");
    }
    this.store.getDetailInvoice(this.$route.params.id);
  },
  computed: {
    ...mapState(buyerStore, ["success", "message", "detailInvoice", "error"]),
  },
  watch: {
    detailInvoice() {
      this.preload = true;
      this.invoiceDetail = this.detailInvoice;
      this.bill_id = this.invoiceDetail.bill_id;
      this.preload = false;
    },
  },
  methods: {
    printInSafari() {
      document.execCommand('print', false, null)
    },

    backToServiceManagement() {
      localStorage.removeItem("id_service");
      this.$router.push({
        path: `/buyer/service/service-manage/${this.id_service}`,
      });
    },
  },
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      localStorage.removeItem("id_service");
    });
  },
};
</script>

<style lang="scss" scoped>
@media print, screen {
  .invoice-main {
    background: $lightwhite;
    padding: 50px 200px 100px;
    &-header {
      .btn-return {
        box-shadow: 1px 1px 6px #00000029;
        border-radius: 28px;
        opacity: 1;
        background: $white;
        padding: 8px 40px;
        color: $gray-800;
        border: none;
      }
      .btn-print {
        background: $orange;
        border: none;
        padding: 8px 20px;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 8px;
        opacity: 1;
      }
    }
    &-content {
      padding: 50px;
      .ct-print {
        background: $white;
        height: 100%;
        width: 884px;
        box-shadow: 0px 3px 6px #00000029;
        opacity: 1;
        padding: 40px 50px;
        &-title {
          color: #7e7d7d;
          font-size: 20px;
          font-weight: 600;
        }
        &-information {
          margin: 30px 0;
          color: #7e7d7d;
          font-size: 17px;
          font-weight: 600;
          .information-left {
            width: 250px;
          }
          .information-right {
            width: 250px;
          }
        }
        &-price {
          .price-left {
            font-size: 50px;
            color: #7e7d7d;
            font-weight: 600;
            margin-left: 100px;
          }
          .price-right {
            color: #7e7d7d;
            font-size: 17px;
            font-weight: 600;
            height: 150px;
            width: 250px;
            .ct-mark {
              height: 52px;
              min-width: 52px;
              border: 1px solid #f46045;
              color: #f46045;
            }
          }
        }
        &-content4 {
          color: #7e7d7d;
          font-size: 17px;
          font-weight: 600;
        }
        &-table {
          margin-top: 30px;
          height: 150px;
          .col-table {
            color: #7e7d7d;
            font-size: 17px;
            .col-header {
              font-weight: 600;
            }
            &:first-child {
              width: 25%;
            }
            &:nth-child(2) {
              width: 20%;
            }
            &:nth-child(3) {
              width: 44%;
            }
            &:nth-child(4) {
              width: 11%;
            }
          }
        }
        &-detail {
          font-size: 17px;
          color: #7e7d7d;
          font-weight: 600;
        }
        &-logo {
          margin: 30px 0;
          width: 150px;
        }
      }
    }
  }
}
</style>