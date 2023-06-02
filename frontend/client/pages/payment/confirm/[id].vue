<template>
  <NuxtLayout name="layoutdefault">
    <SDPreLoad :preload="preload" />
    <div class="paymentPage">
      <div class="paymentPage-header flex items-end">
        <div class="paymentPage-header-textJP">お申し込み内容の確認</div>
      </div>
      <div class="paymentPage-main">
        <div class="paymentPage-main-top flex flex-col pb-[50px]">
          <div
            class="info-course text-[#5E5C5C] py-3 text-[22px] font-semibold"
          >
            お申込み内容の確認
          </div>
          <div
            class="
              thead-course
              flex
              w-100
              text-[#5E5C5C]
              py-3
              md:text-[20px]
              sm:text-[18px]
              font-semibold
              px-3
            "
          >
            <!-- PC -->
            <div class="thead-course-item">コース名</div>
            <div class="thead-course-item">決済日</div>
            <div class="thead-course-item">価格</div>
            <!-- Mobile -->
            <div
              class="thead-course-item-sp"
              style="word-break: break-all"
              v-if="courseDetail.name"
            >
              コース名: {{ courseDetail.name }}
            </div>
            <div
              class="thead-course-item-sp"
              v-if="
                courseDetail.payment_info && courseDetail.payment_info.charge_at
              "
            >
              決済日:
              {{
                $moment(courseDetail.payment_info.charge_at).format(
                  "YYYY-MM-DD"
                )
              }}
            </div>
          </div>
          <div
            class="
              tbody-course
              flex
              w-100
              text-[#5E5C5C]
              py-[20px]
              md:text-[20px]
              sm:text-[18px]
              font-semibold
              px-3
            "
          >
            <div class="w-[40%] pr-2" style="word-break: break-all">
              {{ courseDetail.name }}
            </div>
            <div
              class="w-[45%]"
              v-if="
                courseDetail.payment_info && courseDetail.payment_info.charge_at
              "
            >
              {{
                $moment(courseDetail.payment_info.charge_at).format(
                  "YYYY-MM-DD"
                )
              }}
            </div>
            <!-- <div class="w-[40%]">1234567689</div> -->
            <div
              class="w-[15%] flex"
              v-if="
                courseDetail.payment_info && courseDetail.payment_info.price
              "
            >
              <div class="w-[30%] flex justify-end">
                {{ $setComma(courseDetail.payment_info.price) }}
              </div>
              <div class="w-[70%]"></div>
            </div>
          </div>
          <div
            class="
              payment-course
              flex flex-col
              w-100
              text-[#5E5C5C]
              py-[20px]
              md:text-[20px]
              sm:text-[18px]
              font-semibold
              px-3
            "
          >
            <!-- <div class="flex justify-end w-100 py-2 payment-course-item">
              <div class="w-[30%]">小計</div>
              <div
                class="w-[15%]"
                v-if="
                  courseDetail.payment_info && courseDetail.payment_info.price
                "
              >
                <div class="w-[30%] flex justify-end">
                  {{ $setComma(courseDetail.payment_info.price) }}
                </div>
                <div class="w-[70%]"></div>
              </div>
            </div> -->
            <!-- <div class="flex justify-end w-100 py-2 payment-course-item">
              <div class="w-[30%]">消費税</div>
              <div
                class="w-[15%]"
                v-if="
                  courseDetail.payment_info &&
                  courseDetail.payment_info.service_fee
                "
              >
                <div class="w-[30%] flex justify-end">
                  {{ $setComma(courseDetail.payment_info.service_fee) }}
                </div>
                <div class="w-[70%]"></div>
              </div>
            </div> -->
            <div class="flex justify-end w-100 py-2 payment-course-item">
              <div class="w-[30%]">合計</div>
              <div
                class="w-[15%] col col-sm-auto"
                v-if="
                  courseDetail.payment_info && courseDetail.payment_info.price
                "
              >
                <div class="w-[30%] flex justify-end">
                  {{ $setComma(courseDetail.payment_info.price) }}
                </div>
                <div class="w-[70%]"></div>
              </div>
            </div>
            <div
              class="
                flex
                justify-end
                w-100
                py-4
                items-center
                text-[#7D9FB1]
                font-medium
                payment-course-item1
              "
            >
              <div class="col-2 col-sm-3">利用開始日</div>
              <div
                class="w-[15%] flex"
                v-if="
                  courseDetail.payment_info &&
                  courseDetail.payment_info.start_date_format
                "
              >
                {{ courseDetail.payment_info.start_date_format }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="paymentPage-main-mid flex flex-col py-[50px]"
          v-if="dataPayment && Object.keys(dataPayment).length > 0"
        >
          <div
            class="info-payment text-[#5E5C5C] py-3 text-[22px] font-semibold"
          >
            送付先の確認
          </div>
          <div
            class="list-payment"
            v-if="dataPayment && Object.keys(dataPayment).length > 0"
          >
            <div
              class="
                list-payment-item
                flex
                px-[20px]
                py-[25px]
                my-[20px]
                items-center
              "
            >
              <div class="address-payment">
                {{ dataPayment.post_code }} <br />{{ dataPayment.address }}
              </div>
              <div class="card-payment">{{ dataPayment.phone }}</div>
              <div class="name-payment">
                {{ dataPayment.last_name }} {{ dataPayment.first_name }}
              </div>
            </div>
          </div>
        </div>
        <div class="paymentPage-main-bottom flex flex-col py-[50px]">
          <div
            class="info-stripe text-[#5E5C5C] py-3 text-[22px] font-semibold"
          >
            お支払い方法の確認
          </div>
          <div class="list-stripe">
            <div v-if="dataStripe && Object.keys(dataStripe).length > 0">
              <div
                class="
                  list-stripe-item
                  flex
                  px-[20px]
                  py-[25px]
                  my-[20px]
                  items-center
                "
              >
                <div class="img-stripe">
                  <img v-if="dataStripe.brand === 'Visa'" :src="visa" alt="" />
                  <img
                    class="imgCard"
                    v-else-if="dataStripe.brand === 'JCB'"
                    :src="jcb"
                    alt=""
                  />
                  <img
                    class="imgCard"
                    v-else-if="dataStripe.brand === 'Discover'"
                    :src="discover"
                    alt=""
                  />
                  <img
                    class="imgCard"
                    v-else-if="dataStripe.brand === 'Diners Club'"
                    :src="dinnerclub"
                    alt=""
                  />
                  <img
                    class="imgCard"
                    v-else-if="dataStripe.brand === 'UnionPay'"
                    :src="unionpay"
                    alt=""
                  />
                  <img
                    class="imgCard"
                    v-else-if="dataStripe.brand === 'American Express'"
                    :src="americanExpress"
                    alt=""
                  />
                  <img class="imgCard" v-else :src="mastercard" alt="" />
                </div>
                <div class="card-stripe">
                  {{ dataStripe.brand }}　末尾　{{ dataStripe.last4 }}
                </div>
                <div class="date-stripe">
                  有効期限　{{ dataStripe.exp_month }}/{{ dataStripe.exp_year }}
                </div>
                <div class="name-stripe">
                  {{ dataStripe.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="paymentPage-main-bg flex items-center justify-around py-[50px]"
        >
          <div class="bg-text text-[20px] text-[#5E5C5C] font-semibold">
            それでは、<br />
            サブスクのサービスを開始しましょう！
          </div>
          <div class="bg-img">
            <img src="@/assets/images/logo3.png" alt="" />
          </div>
        </div>
        <div class="paymentPage-main-button">
          <button v-on:click="payment()">サブスクをスタート！</button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import Cookies from "js-cookie";
import iconPen from "@/assets/images/iconPen.png";
import iconTrash from "@/assets/images/iconTrash.png";
import iconAdd from "@/assets/images/iconAdd.png";
import visa from "@/assets/images/visa.png";
import jcb from "@/assets/images/jcb.png";
import unionpay from "@/assets/images/unionpay.png";
import americanExpress from "@/assets/images/american-express.png";
import dinnerclub from "@/assets/images/dinnerclub.png";
import discover from "@/assets/images/discover.png";
import mastercard from "@/assets/images/mastercard.png";
import { StripeElementCard } from "@vue-stripe/vue-stripe";
import SDIcon from "@/components/SDIcon";
import { useToast } from "vue-toastification";
import { Message } from "@/utils/message";
import SDPreLoad from "@/components/SDPreLoad";
import { mapState } from "pinia";
import { courseStore } from "@/store/course";
import { paymentStore } from "@/store/payment";
import "moment/locale/ja";

export default {
  setup() {
    const storeCourse = courseStore();
    const storePayment = paymentStore();
    const toast = useToast();
    return {
      toast,
      storeCourse,
      storePayment,
    };
  },
  data() {
    return {
      course_id: this.$route.params.id,
      courseDetail: {},
      account_id: null,
      preload: true,
      messageNoti: Message.PAYMENT,
      visa,
      mastercard,
      jcb,
      unionpay,
      discover,
      americanExpress,
      dinnerclub,
      dataStripe: {},
      iconAdd,
      iconPen,
      iconTrash,
      dataPayment: {},
      stripe: {},
      delivery: {},
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      service_type_id: "",
    };
  },
  components: {
    SDIcon,
    StripeElementCard,
    SDPreLoad,
  },
  computed: {
    ...mapState(courseStore, ["detailCourse"]),
    ...mapState(paymentStore, ["success", "message", "error"]),
  },
  created() {
    if (
      this.storeCourse.detailCourse &&
      this.storeCourse.detailCourse.service
    ) {
      this.service_type_id =
        this.storeCourse.detailCourse.service.service_type_id;
    }
    let valueToken = null;
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      valueToken = localStorage.getItem("token_user");
      this.account_id = localStorage.getItem("account_id");
    } else {
      valueToken = Cookies.get("token_user");
      this.account_id = Cookies.get("account_id");
    }
    if (!valueToken) {
      this.$router.push("/login");
    }
    window.scrollTo(0, 0);
    this.storeCourse.getDetailCourse(this.course_id);
    const delivery = localStorage.getItem("dataDelivery");
    if (delivery !== null || this.service_type_id === 1) {
      {
        this.dataPayment = JSON.parse(delivery);
      }
    } else {
      this.$router.push("/");
    }
    const stripe = localStorage.getItem("dataStripe");
    if (stripe !== null) {
      {
        this.dataStripe = JSON.parse(stripe);
      }
    } else {
      this.$router.push("/");
    }
  },
  watch: {
    detailCourse() {
      this.preload = true;
      this.courseDetail = this.detailCourse;
      if (this.courseDetail.service) {
        this.service_type_id = this.courseDetail.service.service_type_id;
      }
      this.preload = false;
    },
    success() {
      if (this.storePayment.success === true) {
        this.preload = false;
        this.toast.success(this.storePayment.message, this.optionToast);
        this.storePayment.success = "";
        this.storePayment.message = "";
        this.$router.push("/payment/completed");
      }
    },
    error() {
      if (this.storePayment.error === true) {
        this.preload = false;
        this.toast.error(this.storePayment.message, this.optionToast);
        this.storePayment.error = "";
        this.storePayment.message = "";
      }
    },
  },
  methods: {
    payment() {
      var request = {};
      if (Object.keys(this.dataPayment).length > 0) {
        request = {
          buyer_id: this.account_id,
          course_id: this.course_id,
          card_id: this.dataStripe ? this.dataStripe.id : "",
          shipping_info_id: this.dataPayment.id,
        };
      } else {
        request = {
          buyer_id: this.account_id,
          course_id: this.course_id,
          card_id: this.dataStripe ? this.dataStripe.id : "",
        };
      }
      this.preload = true;
      this.storePayment.paymentStripe(request);
    },
  },
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      localStorage.removeItem("dataDelivery");
      localStorage.removeItem("dataStripe");
    });
  },
};
</script>

<style lang="scss" scoped>
.paymentPage {
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
    }
    &-textEN {
      margin-left: 20px;
      color: #5e5c5c;
      font-size: 16px;
    }
  }
  &-main {
    background: $white;
    padding: 50px 200px;
    @include screen(991) {
      padding: 30px 50px;
    }
    @include screen(9921023) {
      padding: 50px;
    }
    @include screen(10241365) {
      padding: 30px 100px;
    }
    &-top {
      .info-course {
        border-bottom: 1px solid $gray-500;
      }
      .thead-course {
        &-item {
          &:first-child {
            width: 40%;
          }
          &:nth-child(2) {
            width: 45%;
          }
          &:nth-child(3) {
            width: 15%;
          }
          // &:nth-child(4) {
          //   width: 20%;
          // }
          @include screen(480) {
            display: none;
          }
          &-sp {
            display: none;
            @include screen(480) {
              display: block;
            }
          }
        }
        @include screen(480) {
          flex-direction: column;
        }
      }
      .tbody-course {
        background: #f5f6fa;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 8px;
        opacity: 1;
        @include screen(480) {
          display: none;
        }
      }
      .payment-course {
        width: 60%;
        background: $white;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 0px 0px 8px 8px;
        opacity: 1;
        &-item {
          @include screen(480) {
            justify-content: flex-start;
          }
        }
        &-item1 {
          @include screen(480) {
            justify-content: center;
            flex-direction: column;
            div {
              width: 100%;
            }
          }
        }
      }
    }
    &-mid {
      .info-payment {
        border-bottom: 1px solid $gray-500;
      }
      .list-payment {
        margin-top: 20px;
        &-item {
          cursor: pointer;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 8px;
          opacity: 1;
          background: $white;
          width: 100%;
          color: $gray-500;
          font-weight: 600;
          position: relative;
          @include screen(480) {
            flex-direction: column;
            align-items: flex-start;
          }
          .address-payment {
            width: 46%;
            @include screen(480) {
              font-size: 14px;
              width: 60%;
            }
          }
          .card-payment {
            width: 18%;
            @include screen(480) {
              font-size: 14px;
              width: 60%;
            }
          }
          .name-payment {
            width: 18%;
            @include screen(480) {
              font-size: 14px;
              width: 60%;
            }
          }
          .action-payment {
            width: 18%;
            img {
              width: 50px;
              height: 50px;
              cursor: pointer;
            }
            @include screen(480) {
              position: absolute;
              left: 60%;
              img {
                width: 40px;
                height: 40px;
              }
            }
          }
        }
        .active {
          background: #f5f6fa;
        }
        &-add {
          color: $gray-500;
          cursor: pointer;
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    &-bottom {
      .info-stripe {
        border-bottom: 1px solid $gray-500;
        width: 100%;
      }
      .list-stripe {
        margin-top: 20px;
        &-item {
          cursor: pointer;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 8px;
          opacity: 1;
          background: $white;
          width: 100%;
          color: $gray-500;
          font-weight: 600;
          position: relative;
          @include screen(480) {
            flex-direction: column;
            align-items: flex-start;
          }
          .img-stripe {
            width: 15%;
            @include screen(480) {
              font-size: 14px;
              width: 60%;
            }

            .imgCard {
              height: 50px;
            }
          }
          .card-stripe {
            width: 27%;
            @include screen(480) {
              font-size: 14px;
              width: 60%;
              margin: 10px 0;
            }
          }
          .date-stripe {
            width: 20%;
            @include screen(480) {
              font-size: 14px;
              width: 60%;
              margin: 10px 0;
            }
          }
          .name-stripe {
            width: 20%;
            @include screen(480) {
              font-size: 14px;
              width: 60%;
            }
          }
          .action-stripe {
            width: 18%;
            img {
              width: 50px;
              height: 50px;
              cursor: pointer;
            }
            @include screen(480) {
              position: absolute;
              left: 60%;
              img {
                width: 40px;
                height: 40px;
              }
            }
          }
        }
        .active {
          background: #f5f6fa;
        }
        &-add {
          color: $gray-500;
          cursor: pointer;
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    &-button {
      button {
        width: 100%;
        background: $orange;
        border-radius: 8px;
        color: $white;
        padding: 10px;
      }
    }
  }
}
.modal-add-delivery {
  .header {
    border-bottom: 1px solid $gray-500;
    &-text {
      font-size: 20px;
      font-weight: 600;
      color: $gray-500;
    }
    .icon-close {
      cursor: pointer;
    }
  }
  .main {
    &-label {
      width: 25%;
      color: $gray-800;
      font-size: 18px;
      font-weight: 500;
    }
    &-input {
      width: 75%;
      input {
        border: 1px solid $gray-800;
        padding: 10px;
        border-radius: 8px;
        outline: none;
      }
    }
    &-btn {
      width: 75%;
      button {
        width: 100%;
        background: $orange;
        padding: 10px;
        color: $white;
        font-weight: 600;
        border-radius: 8px;
      }
    }
  }
}
.modal-add-stripe {
  .header {
    border-bottom: 1px solid $gray-500;
    &-text {
      font-size: 20px;
      font-weight: 600;
      color: $gray-500;
    }
    .icon-close {
      cursor: pointer;
    }
  }
  .main {
  }
}
</style>