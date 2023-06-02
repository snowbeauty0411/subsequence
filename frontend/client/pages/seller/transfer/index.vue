<template>
  <div class="transferPage flex flex-col">
    <SDPreLoad :preload="preload" />
    <div class="transferPage-content">
      <div class="transferPage-content-title flex items-end">
        <div class="title-main">売上振込申請</div>
        <div class="title-description">Transfer application</div>
      </div>
      <div class="transferPage-content-main">
        <div class="main-top flex flex-col">
          <div class="text-base text-[#7E7D7D] font-medium">振込可能金額</div>
          <div
            class="text-[35px] text-[#5E5C5C] font-bold my-[20px]"
            v-if="transferHistorys.amount_current !== undefined"
          >
            {{ formatPrice(parseInt(transferHistorys.amount_current)) }}
          </div>
          <div class="text-[35px] text-[#5E5C5C] font-bold my-[20px]" v-else>
            {{ formatPrice(parseInt(0)) }}
          </div>
          <div class="text-base text-[#7E7D7D] font-medium">
            振込手数料として￥250がかかります。
          </div>
        </div>
        <div class="main-mid flex flex-col">
          <div class="flex items-center text-[#F79158]">
            <SDIcon icon="info-circle-fill" />
            <div class="mx-2 text-base font-medium">
              売上金の振込申請を行うには、振込口座登録と本人確認が必須です
            </div>
          </div>
          <div class="flex flex-col my-[20px]">
            <div
              class="flex justify-between my-[10px] main-mid-info"
              :class="sellerCard === null ? 'w-[340px]' : 'w-[500px]'"
            >
              <div
                class="
                  flex
                  text-base
                  font-medium
                  justify-between
                  main-mid-info-left
                "
                :class="sellerCard === null ? 'w-[200px]' : 'w-[380px]'"
              >
                <div class="text-[#5E5C5C]">振込口座</div>
                <div class="text-[#7E7D7D]" v-if="sellerCard === null">
                  未登録
                </div>
                <div class="text-[#7E7D7D] mt-3" v-else>
                  <div>銀行名: {{ sellerCard.bank_name }}</div>
                  <div>支店コード: {{ sellerCard.branch_code }}</div>
                  <div>
                    口座名義:
                    {{
                      sellerCard.last_name_account +
                      " " +
                      sellerCard.first_name_account
                    }}
                  </div>
                  <div>口座番号: {{ sellerCard.account_number }}</div>
                </div>
              </div>
              <div
                class="text-base font-medium text-[#E79C3A] cursor-pointer"
                v-if="sellerCard === null"
                v-on:click="editPaymentSeller()"
              >
                登録する
              </div>
              <div
                class="text-base font-medium text-[#E79C3A] mt-5 cursor-pointer"
                v-else
                v-on:click="editPaymentSeller()"
              >
                編集
              </div>
            </div>
            <div class="flex w-[400px] justify-start my-[10px] main-mid-info">
              <div
                class="
                  flex
                  font-medium
                  w-[200px]
                  justify-between
                  main-mid-info-left
                  flex-row
                "
              >
                <div class="text-[#5E5C5C]">本人確認</div>
                <div
                  class="text-[#7E7D7D] flex items-center"
                  v-if="transferHistorys.identity_verification_status === 4"
                >
                  <SDIcon
                    icon="check-lg"
                    class="mx-2 text-[#E79C3A]"
                    size="lg"
                  />
                  <div class="text-base">確認済</div>
                </div>
                <div class="text-[#7E7D7D] flex items-center" v-else>
                  <SDIcon icon="x-lg" class="mx-2 text-[#E79C3A]" size="lg" />
                  <div class="text-base">未確認</div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-[60%] main-mid-form">
            <div class="text-base font-medium text[#7E7D7D]">振込申請金額</div>
            <div class="relative validate-form">
              <input
                placeholder="金額を入力してください"
                v-model.trim="amountTransfer"
                v-bind:class="{
                  'is-invalid':
                    amountTransferFlag ||
                    amountTransferMoreThanFlag ||
                    checkAmountTransferFlag,
                }"
                class="my-[10px] w-100"
                maxlength="10"
                id="amountTransfer"
                @keypress="onlyNumber($event)"
                v-bind="formatNumberPrice()"
                @blur="priceFormat"
              />
              <div v-if="amountTransferFlag" class="error-text">
                {{ Message.transfer_amount_required }}
              </div>
              <div v-if="amountTransferMoreThanFlag" class="error-text">
                {{ Message.transfer_amount_more_than }}
              </div>
              <div v-if="checkAmountTransferFlag" class="error-text">
                {{ Message.transfer_more_than }}
              </div>
            </div>
            <div class="flex justify-end mb-[20px] text-[#7E7D7D] text-[14px]">
              500円以上
            </div>
            <b-button
              class="bg-[#E79C3A] border-none py-[10px] font-semibold"
              v-on:click="createTransferOfSeller()"
              :class="
                transferHistorys.identity_verification_status === 4 &&
                sellerCard !== null
                  ? ''
                  : 'disabled'
              "
              >振込申請をする</b-button
            >
          </div>
        </div>
        <b-modal
          id="modal-tag"
          ref="modal-tag"
          hide-header
          hide-footer
          v-model="showModalAddCardFlg"
        >
          <div class="content-modal-detail">
            <div class="padding">
              <div class="row">
                <div class="col-sm-12">
                  <div class="card">
                    <div class="card-header">
                      <strong>クレジットカード</strong>
                      <small>カードの情報を入力してください</small>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">カード名</label>
                            <div class="relative validate-form">
                              <input
                                class="form-control"
                                id="name"
                                type="text"
                                placeholder="名前を入力してください"
                                v-model.trim="v$.cardName.$model"
                                v-bind:class="{
                                  'is-invalid': v$.cardName.$error,
                                }"
                              />
                              <div v-if="v$.cardName.$error" class="error-text">
                                <p v-if="v$.cardName.required.$invalid">
                                  {{ Message.card_name_required }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mt-4">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="ccnumber">カード番号</label>
                            <div class="input-group">
                              <div class="relative validate-form d-flex w-100">
                                <input
                                  class="form-control"
                                  type="text"
                                  placeholder="0000 0000 0000 0000"
                                  v-model="cardNumber"
                                  @keypress="onlyNumber($event)"
                                  maxlength="16"
                                  v-model.trim="v$.cardNumber.$model"
                                  v-bind:class="{
                                    'is-invalid': v$.cardNumber.$error,
                                  }"
                                />
                                <div
                                  v-if="v$.cardNumber.$error"
                                  class="error-text"
                                >
                                  <p v-if="v$.cardNumber.required.$invalid">
                                    {{ Message.card_number_required }}
                                  </p>
                                </div>
                                <div class="input-group-append">
                                  <span
                                    class="input-group-text"
                                    style="height: 38px"
                                  >
                                    <SDIcon icon="credit-card" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mt-4">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">銀行名</label>
                            <div class="relative validate-form">
                              <input
                                class="form-control"
                                id="name"
                                type="text"
                                v-model="bankName"
                                placeholder="銀行名を入力してください"
                                v-model.trim="v$.bankName.$model"
                                v-bind:class="{
                                  'is-invalid': v$.bankName.$error,
                                }"
                              />
                              <div v-if="v$.bankName.$error" class="error-text">
                                <p v-if="v$.bankName.required.$invalid">
                                  {{ Message.bank_name_required }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <button
                        class="btn btn-sm btn-success float-right"
                        v-on:click="addCard"
                        v-if="!editFlag"
                      >
                        追加
                      </button>
                      <button
                        class="btn btn-sm btn-success float-right"
                        v-on:click="updateCard"
                        v-else
                      >
                        更新
                      </button>
                      <button
                        class="btn btn-sm btn-danger"
                        v-on:click="resetCard"
                      >
                        リセット
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-modal>
        <div class="main-bottom flex flex-col">
          <div
            v-if="preloadTable"
            class="sd-preloads flex justify-center items-center"
          >
            <div class="snippet" data-title=".dot-flashing">
              <div class="stage">
                <div class="dot-flashing"></div>
              </div>
            </div>
          </div>
          <div class="flex justify-between flex-column flex-sm-row">
            <div class="text-[#7E7D7D] font-medium my-[20px]">振込履歴</div>
            <div class="select-chart flex col-sm-3">
              <label class="w-[100%] mt-2">ページごとの表示数:</label>
              <b-form-select
                v-model="perPage"
                :options="listPerpage"
                size="md"
                class="form-select-custom mx-0 mb-4 w-[50%]"
                @change="getListByPerpage($event)"
              ></b-form-select>
            </div>
          </div>
          <SDTable
            v-bind:items="listTransferHistories"
            v-bind:fields="fields"
            v-bind:border="false"
            v-bind:bgCell="false"
            v-bind:totalPage="totalPageList"
            v-bind:currentPage="currentPageList"
            v-on:update_page="updatePage"
          >
            <template #cell(status)="{ item }">
              <div class="group-btn bg-midnight flex justify-center">
                <div
                  class="btn-status"
                  style="background: #c0db5b"
                  v-if="item.status === 1"
                >
                  振込完了
                </div>
                <div class="btn-status" style="background: #e79c3acc" v-else>
                  振込申請中
                </div>
              </div>
            </template>
            <template #cell(created_at)="{ item }">
              <div class="group-btn bg-midnight">
                {{ $moment(item.created_at).format("YYYY-MM-DD HH:mm") }}
              </div>
            </template>
            <template #cell(transfer_amount)="{ item }">
              <div class="group-btn bg-midnight">
                <label> {{ formatNumber(item.transfer_amount) }}</label>
              </div>
            </template>
            <template #cell(transfer_fee)="{ item }">
              <div class="group-btn bg-midnight">
                <label> {{ formatNumber(item.transfer_fee) }}</label>
              </div>
            </template>
          </SDTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SDIcon from "@/components/SDIcon";
import SDTable from "@/components/SDTable";
import { tableFields } from "@/utils/table-fields";
import { Message } from "@/utils/message";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import Cookies from "js-cookie";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import "moment/locale/ja";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  setup() {
    const store = sellerStore();
    const toast = useToast();
    const v$ = useVuelidate();
    return {
      v$,
      store,
      toast,
    };
  },
  validations: {
    bankName: {
      required,
    },
    cardName: {
      required,
    },
    cardNumber: {
      required,
    },
  },
  data() {
    return {
      totalPageList: 1,
      currentPageList: 1,
      fields: tableFields.LIST_TRANSFER,
      transferHistorys: {},
      amountTransfer: "",
      listTransferHistories: [],
      perPage: 5,
      listPerpage: [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
      ],
      page: 1,
      preload: false,
      preloadTable: false,
      sellerCard: {},
      showModalAddCardFlg: false,
      bankName: "",
      cardName: "",
      cardNumber: "",
      Message: Message.CARD,
      sellerID: 0,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      editFlag: false,
      cardDetailInfo: {},
      amountTransferFlag: false,
      amountTransferMoreThanFlag: false,
      checkAmountTransferFlag: false,
      messageShippingInfo: Message.DELIVERY
    };
  },
  components: {
    SDIcon,
    SDTable,
    SDPreLoad,
  },
  computed: {
    ...mapState(sellerStore, [
      "success",
      "error",
      "message",
      "transferHistory",
      "listTransferHistory",
      "cardFlg",
      "cardInfo",
    ]),
  },
  watch: {
    transferHistory() {
      this.preload = true;
      this.transferHistorys = this.transferHistory;
      this.sellerCard = this.transferHistory.seller_card;
      this.preload = false;
    },

    cardFlg() {
      if (this.store.success) {
        this.toast.success(this.message, this.optionToast);
        this.store.cardFlg = false;
        this.store.success = false;
        this.store.message = "";
      }
      this.showModalAddCardFlg = false;
      this.getTransfer();
    },

    cardInfo() {
      this.cardNumber = this.cardInfo.account_number;
      this.cardName = this.cardInfo.account_holder;
      this.bankName = this.cardInfo.financial_institution_name;
    },

    listTransferHistory() {
      this.preloadTable = false;
      this.listTransferHistories = this.listTransferHistory.data;
      this.totalPageList = this.listTransferHistory.last_page;
      this.currentPageList = this.listTransferHistory.current_page;
    },
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.sellerID = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      this.sellerID = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }
    this.getTransfer();
    this.getListTransferHistories();
  },
  methods: {
    getTransfer() {
      this.store.getTransferHistory(this.sellerID);
    },

    getListTransferHistories() {
      this.store.getListTransferHistory(this.sellerID, this.perPage, this.page);
    },

    getListByPerpage(event) {
      this.perPage = event;
      this.page = 1;
      this.getListTransferHistories();
    },

    updatePage(page) {
      this.preloadTable = true;
      (this.page = page), this.getListTransferHistories();
    },

    formatPrice(value) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
    },

    formatNumber(value) {
      return new Intl.NumberFormat().format(value);
    },

    formatNumberPrice() {
      var text = this.amountTransfer;
      if (
        /^[a-z]/.test(text) ||
        /^[A-Z]/.test(text) ||
        /^[ａ-ｚ]/.test(text) ||
        /^[Ａ-Ｚ]/.test(text) ||
        /^[ぁ-ん]/.test(text) ||
        /^[ァ-ン]/.test(text) ||
        /^[一-龥]/.test(text)
      ) {
        text = text
          .replace(/^[a-z]/, "")
          .replace(/^[A-Z]/, "")
          .replace(/^[ａ-ｚ]/, "")
          .replace(/^[Ａ-Ｚ]/, "")
          .replace(/^[ぁ-ん]/, "")
          .replace(/^[ァ-ン]/, "")
          .replace(/^[一-龥]/, "");
      }
      this.amountTransfer = text;
    },
    priceFormat() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.amountTransfer;
      document.getElementById("amountTransfer").blur();
      document.getElementById("amountTransfer").focus();
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          // .replace(/[a-zA-Z０-９ぁ-んァ-ン一-龥ａ-ｚＡ-Ｚ　 。ー]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      this.amountTransfer = text;
    },

    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },

    showModalAddCard() {
      this.showModalAddCardFlg = true;
    },

    showModalEditCard() {
      this.showModalAddCardFlg = true;
      this.editFlag = true;
      this.store.getDetailCard(this.sellerID);
    },

    resetCard() {
      this.cardName = "";
      this.cardNumber = "";
      this.bankName = "";
    },

    async addCard() {
      const result = await this.v$.$validate();
      if (/^[０-９]/.test(this.amountTransfer)) {
        this.toast.error(
          this.messageShippingInfo.enter_halfwidth,
          this.optionToast
        );
        return
      }
      if (!result) {
      } else {
        const request = {
          seller_id: this.sellerID,
          financial_institution_name: this.bankName,
          account_number: this.cardNumber,
          account_holder: this.cardName,
        };
        this.store.addCreditCard(request);
        this.showModalAddCardFlg = false;
      }
    },

    async updateCard() {
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        const request = {
          financial_institution_name: this.bankName,
          account_number: this.cardNumber,
          account_holder: this.cardName,
        };
        this.store.updateCreditCard(this.sellerID, request);
        this.showModalAddCardFlg = false;
      }
    },

    async createTransferOfSeller() {
      if (/^[０-９。＝、””’「」ー]/.test(this.amountTransfer)) {
        this.toast.error(
          this.messageShippingInfo.enter_halfwidth,
          this.optionToast
        );
        return
      }
      if (this.amountTransfer === "") {
        this.amountTransferFlag = true;
        this.amountTransferMoreThanFlag = false;
        this.checkAmountTransferFlag = false;
      } else if (this.amountTransfer < 500) {
        this.amountTransferFlag = false;
        this.amountTransferMoreThanFlag = true;
        this.checkAmountTransferFlag = false;
      } else if (this.amountTransfer > this.transferHistorys.amount_current) {
        this.amountTransferFlag = false;
        this.amountTransferMoreThanFlag = false;
        this.checkAmountTransferFlag = true;
      } else {
        localStorage.setItem("amountTransfer", this.amountTransfer);
        this.$router.push(`/seller/transfer/confirm`);
      }
    },

    changeAmountTransfer(event) {
      if (event === "") {
        this.checkAmountTransferFlag = false;
        this.amountTransferFlag = true;
        this.amountTransferMoreThanFlag = false;
      } else if (event <= 0) {
        this.checkAmountTransferFlag = false;
        this.amountTransferFlag = false;
        this.amountTransferMoreThanFlag = true;
      } else if (event > this.transferHistorys.amount_current) {
        this.checkAmountTransferFlag = true;
        this.amountTransferMoreThanFlag = false;
        this.amountTransferFlag = false;
      } else {
        this.amountTransferMoreThanFlag = false;
        this.amountTransferFlag = false;
        this.checkAmountTransferFlag = false;
      }
    },

    editPaymentSeller() {
      this.$router.push("/account/transfer/register");
    },
  },
};
definePageMeta({
  layout: "seller",
});
</script>


<style lang="scss" scoped>
.transferPage {
  &-content {
    padding: 30px 100px;

    @include screen(767) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 30px;
    }
    @include screen(480) {
      padding: 20px;
    }
    &-title {
      .title-main {
        font-size: 22px;
        color: #5e5c5c;
        font-weight: 600;
        @include screen(480) {
          font-size: 16px;
        }
      }
      .title-description {
        margin-left: 20px;
        font-size: 14px;
        color: #5e5c5c;
        @include screen(480) {
          font-size: 12px;
        }
      }
    }
    &-main {
      margin-top: 50px;
      width: 100%;
      background: $white;
      padding: 30px;
      .main-top {
        padding: 30px;
        margin-right: 100px;
        @include screen(480) {
          margin-right: unset;
          padding: 10px;
        }
        border-bottom: 1px solid $gray-700;
      }
      .main-mid {
        padding: 30px;
        &-info {
          @include screen(480) {
            width: 100%;
            flex-direction: column;
          }
          &-left {
            @include screen(480) {
              width: 100%;
              flex-direction: column;
            }
          }
        }

        &-form {
          @include screen(480) {
            width: 100%;
          }
        }

        input {
          outline: none;
          padding: 10px;
          border: 1px solid $gray-500;
        }
      }
      .main-bottom {
        padding: 30px 10px;
      }
    }
  }
  .padding {
    padding: 5rem !important;
    margin-left: 300px;
  }
  .card {
    margin-bottom: 1.5rem;
  }

  .card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #c8ced3;
    border-radius: 0.25rem;
  }

  .card-header:first-child {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
  }

  .card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: #f0f3f5;
    border-bottom: 1px solid #c8ced3;
  }

  .card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
  }

  .form-control:focus {
    color: #5c6873;
    background-color: #fff;
    border-color: #c8ced3 !important;
    outline: 0;
    box-shadow: 0 0 0 #f44336;
  }
}
.btn-status {
  padding: 10px 20px;
  color: white;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  border-radius: 28px;
  width: 120px;
}
</style>