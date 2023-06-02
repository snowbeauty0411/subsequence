<template>
  <NuxtLayout :name="user_type === 'BUYER' ? 'buyer' : 'seller'">
    <SDPreLoad :preload="preload" />
    <div class="submitRegisterPage">
      <div v-if="preloadList" class="sd-preloads flex justify-center items-center">
        <div class="snippet" data-title=".dot-flashing">
          <div class="stage">
            <div class="dot-flashing"></div>
          </div>
        </div>
      </div>
      <!-- <div class="relative">
        <div class="bankName my-[20px]">
          <div class="form-label">銀行名</div>
          <div class="submitRegisterPage-search relative validate-form w-[100%]">
            <b-form-input 
              class="form-input-search" 
              placeholder="銀行名からさがす" 
              v-model.trim="v$.bank_name.$model" v-bind:class="{'is-invalid': v$.bank_name.$error && isBank === false,}" 
              id="bank_name" 
              v-on:keyup="getBankName(bank_name)"
              v-on:click="getBankNameClick(bank_name)"
              v-on:change="getBankName(bank_name)"
            >
            </b-form-input>
            <div v-if="v$.bank_name.$error && isBank === false" class="error-text">
              <p v-if="v$.bank_name.required.$invalid">
                {{ Message.bank_name_required }}
              </p>
            </div>
          </div>
          <div class="list-data-search w-[60%]" v-show="listDataSearch">
            <div v-for="(item, index) in listBanks" :key="index" class="list-data-search-item"
              v-on:click="searchBanks(item.value, item.text)">
              <div v-if="item.text !== undefined">{{ item.text }}</div>
            </div>
          </div>
          
        </div>
      </div> -->
      <div class="submitRegisterPage-content flex flex-col">
        <div class="branchName my-[20px]">
          <div class="form-label">銀行名</div>
          <div class="relative validate-form w-[100%]">
            <b-form-select
              :options="listBanks"
              placeholder="銀行名からさがす"
              v-model="v$.bank_id.$model"
              v-bind:class="{
                'is-invalid': v$.bank_id.$error && isBank === false,
              }"
              id="bank_name"
              size="sm"
              class="form-select-custom"
            ></b-form-select>
            <div v-if="v$.bank_id.$error && isBank === false" class="error-text">
              <p v-if="v$.bank_id.required.$invalid">
                {{ Message.bank_name_required }}
              </p>
            </div>
          </div>
        </div>
        <div class="branchName my-[20px]">
          <div class="form-label">口座種別</div>
          <div class="relative validate-form">
            <b-form-select
              :options="listAccountType"
              v-model="v$.bankInfo.account_type.$model"
              v-bind:class="{ 'is-invalid': v$.bankInfo.account_type.$error }"
              id="account_type"
              size="sm"
              class="form-select-custom"
            ></b-form-select>
            <div v-if="v$.bankInfo.account_type.$error" class="error-text">
              <p v-if="v$.bankInfo.account_type.required.$invalid">
                {{ Message.account_type_required }}
              </p>
            </div>
          </div>
        </div>
        <div class="my-[20px]">
          <div class="form-label">口座番号</div>
          <div class="relative validate-form">
            <b-form-input
              class="custom-input"
              placeholder="例）1234567（数字7桁）"
              type="text"
              maxlength="8"
              @keypress="onlyNumber($event)"
              @blur="formatCardNumber"
              id="account_number"
              v-model.trim="v$.bankInfo.account_number.$model"
              v-bind:class="{
                'is-invalid': v$.bankInfo.account_number.$error,
              }"
              v-bind="formatNumber()"
            />
            <div v-if="v$.bankInfo.account_number.$error" class="error-text">
              <p v-if="v$.bankInfo.account_number.required.$invalid">
                {{ Message.account_number_required }}
              </p>
              <p v-if="v$.bankInfo.account_number.minLength.$invalid">
                {{ Message.account_number_min }}
              </p>
            </div>
          </div>
          <div class="text-description">
            口座番号が8桁未満の場合は先頭に0をつけてください
          </div>
        </div>
        <div class="my-[20px]">
          <div class="form-label">口座名義</div>
          <div class="relative validate-form">
            <b-form-input
              placeholder="タナカ　タロウ"
              class="custom-input"
              v-model.trim="v$.bankInfo.last_name_account.$model"
              v-bind:class="{
                'is-invalid': v$.bankInfo.last_name_account.$error || last_name_invalid,
              }"
              id="last_name_account"
              v-on:input="checkLastNameKana($event)"
            />
            <div
              v-if="v$.bankInfo.last_name_account.$error || last_name_invalid"
              class="error-text"
            >
              <p v-if="v$.bankInfo.last_name_account.required.$invalid">
                {{ Message.last_name_account_required }}
              </p>
              <p v-if="last_name_invalid">
                {{ Message.name_account_invalid }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import SDIcon from "@/components/SDIcon";
import Cookies from "js-cookie";
import { mapState } from "pinia";
import { accountStore } from "@/store/account/index.ts";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import { sellerStore } from "@/store/seller";
import { useToast } from "vue-toastification";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  setup() {
    const accountStores = accountStore();
    const store = sellerStore();
    const v$ = useVuelidate();
    const toast = useToast();
    return {
      accountStores,
      v$,
      store,
      toast,
    };
  },
  validations: {
    bank_id: {
      required,
    },
    bankName: {
      required,
    },
    bank_name: {
      required,
    },
    bankInfo: {
      account_type: {
        required,
      },
      first_name_account: {
        required,
      },
      last_name_account: {
        required,
      },
      branch_code: {
        required,
      },
      account_number: {
        required,
        minLength: minLength(7),
      },
    },
  },
  data() {
    return {
      listDataSearch: false,
      isBank: true,
      account_id: null,
      Message: Message.CARD,
      bank_id: "",
      bankName: "",
      bankInfo: {
        account_type: 1,
        first_name_account: "",
        last_name_account: "",
        branch_code: "",
        account_number: "",
      },
      bank_name: "",
      user_type: "",
      branchList: [],
      listBanks: [{ value: "", text: "銀行名からさがす" }],
      listAccountType: [
        { value: 1, text: "普通預金" },
        { value: 2, text: "当座預金" },
        { value: 3, text: "貯蓄預金" },
      ],
      listDataSearchBranch: false,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      detailCard: {},
      flgEdit: false,
      preload: false,
      preloadList: false,
      first_name_invalid: false,
      last_name_invalid: false,
    };
  },
  computed: {
    ...mapState(accountStore, ["dataBank", "dataBranch"]),
    ...mapState(sellerStore, ["success", "error", "message", "cardInfo"]),
  },
  watch: {
    bank_id() {
      if (this.bank_id != "") {
        this.isBank = false;
        this.listBanks.forEach((item) => {
          if (item.value === this.bank_id) {
            this.bank_name = item.text;
          }
        });
        this.bankName = "";
        if (this.bank_id != this.cardInfo.bank_id) {
          this.bankInfo.branch_code = "";
        }
      } else {
        this.isBank = true;
      }
    },

    bankName() {
      if (this.bankName != this.cardInfo.bank_name) {
        this.bankInfo.branch_code = "";
      }
    },

    cardInfo() {
      this.preload = true;
      if (Object.keys(this.cardInfo).length > 0) {
        this.bankInfo.first_name_account = this.cardInfo.first_name_account;
        this.bankInfo.last_name_account = this.cardInfo.last_name_account;
        if (this.cardInfo.bank_id) {
          this.bank_id = this.cardInfo.bank_id;
        } else {
          this.bankName = this.cardInfo.bank_name;
        }
        this.bank_name = this.cardInfo.bank_name;
        this.bankInfo.branch_code = this.cardInfo.branch_code;
        this.bankInfo.account_number = this.cardInfo.account_number;
        this.flgEdit = true;
      }
      this.preload = false;
    },

    dataBank() {
      (this.listBanks = [{ value: "", text: "銀行名からさがす" }]),
        this.dataBank.forEach((bank) => {
          this.listBanks.push(bank);
        });
      // this.listDataSearch = true;
    },

    success() {
      this.preloadList = false;
      if (this.store.success === true) {
        this.toast.success(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.$router.push({ path: `/account/transfer/register/completed` });
      }
    },

    error() {
      this.preloadList = false;
      if (this.store.error === true) {
        this.toast.error(this.store.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
      }
    },
  },
  created() {
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    let valueToken = null;
    if (rememberLogin === "true") {
      valueToken = localStorage.getItem("token_user");
      this.user_type = localStorage.getItem("type");
      this.account_id = localStorage.getItem("account_id");
    } else {
      valueToken = Cookies.get("token_user");
      this.user_type = Cookies.get("type");
      this.account_id = Cookies.get("account_id");
    }

    if (!valueToken) {
      this.$router.push("/login");
    }
    this.store.getDetailCard(this.account_id);
    this.accountStores.getBank();
  },
  components: {
    SDIcon,
    SDPreLoad,
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },

    formatLastName() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.bankInfo.last_name_account;
      document.getElementById("last_name_account").blur();
      if (text) {
        text = text
          .toString()
          .replace(/([0-9０-９ぁ-んｧ-ﾝﾞﾟ一-龥a-zA-Zａ-ｚＡ-Ｚ　 。ー-])/g, "");
      }
      document.getElementById("last_name_account").focus();
      this.bankInfo.last_name_account = text;
    },

    // formatFirstName() {
    //   String.prototype.splice = function (idx, rem, str) {
    //     return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    //   };
    //   var text = this.bankInfo.first_name_account;
    //   document.getElementById("first_name_account").blur();
    //   if (text) {
    //     text = text
    //       .toString()
    //       .replace(/([0-9０-９ぁ-んｧ-ﾝﾞﾟ一-龥a-zA-Zａ-ｚＡ-Ｚ　 。ー-])/g, '');
    //   }
    //   document.getElementById("first_name_account").focus();
    //   this.bankInfo.first_name_account = text;
    // },

    checkFirstNameKana(event) {
      if (!/^([ァ-ン]|ー)+$/.test(event)) {
        this.first_name_invalid = true;
        return;
      } else {
        this.first_name_invalid = false;
      }
    },

    checkLastNameKana(event) {
      if (!/^([ァ-ン]|ー)+$/.test(event)) {
        this.last_name_invalid = true;
      } else {
        this.last_name_invalid = false;
      }
    },

    formatNumber() {
      if (
        /^[a-z]/.test(this.bankInfo.account_number) ||
        /^[A-Z]/.test(this.bankInfo.account_number) ||
        /^[ａ-ｚ]/.test(this.bankInfo.account_number) ||
        /^[Ａ-Ｚ]/.test(this.bankInfo.account_number) ||
        /^[ぁ-ん]/.test(this.bankInfo.account_number) ||
        /^[ァ-ン]/.test(this.bankInfo.account_number) ||
        /^[一-龥]/.test(this.bankInfo.account_number)
      ) {
        this.bankInfo.account_number = this.bankInfo.account_number
          .replace(/^[a-z]/, "")
          .replace(/^[A-Z]/, "")
          .replace(/^[ａ-ｚ]/, "")
          .replace(/^[Ａ-Ｚ]/, "")
          .replace(/^[ぁ-ん]/, "")
          .replace(/^[ァ-ン]/, "")
          .replace(/^[一-龥]/, "");
      }
    },

    formatCardNumber() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.bankInfo.account_number;
      document.getElementById("account_number").blur();
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      // if (text.length === 7) {
      //   this.bankInfo.account_number = '0' + text;
      // }
    },

    formatBranchCode() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.bankInfo.branch_code;
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      if (text.length <= 3) {
        this.bankInfo.branch_code = text;
      }
    },

    redirectToTerm() {
      window.open("/term", "_blank", "noreferrer");
    },

    redirectToPolicy() {
      window.open("/policy", "_blank", "noreferrer");
    },

    async addCard() {
      var result = "";
      if (this.bank_id === "") {
        result = await this.v$.bankName.$validate();
      } else {
        result = await this.v$.bank_id.$validate();
      }
      const result2 = await this.v$.bankInfo.$validate();
      if (!result || !result2) {
      } else {
        if (!/^([ァ-ン]|ー)+$/.test(this.bankInfo.first_name_account)) {
          this.toast.error(this.Message.name_account_invalid, this.optionToast);
        } else if (!/^([ァ-ン]|ー)+$/.test(this.bankInfo.last_name_account)) {
          this.toast.error(this.Message.name_account_invalid, this.optionToast);
        } else {
          const request = {
            seller_id: this.account_id,
            bank_name: this.bank_id === "" ? this.bankName : this.bank_name,
            bank_id: this.bank_id,
            branch_code: this.bankInfo.branch_code,
            account_number: this.bankInfo.account_number,
            account_type: this.bankInfo.account_type,
            first_name_account: this.bankInfo.first_name_account,
            last_name_account: this.bankInfo.last_name_account,
          };
          this.preloadList = true;
          this.store.addCreditCard(request);
        }
      }
    },

    async updateCard() {
      var result = "";
      if (this.bank_id === "") {
        result = await this.v$.bankName.$validate();
      } else {
        result = await this.v$.bank_id.$validate();
      }
      const result2 = await this.v$.bankInfo.$validate();
      if (!result || !result2) {
      } else {
        if (!/^([ァ-ン]|ー)+$/.test(this.bankInfo.first_name_account)) {
          this.toast.error(this.Message.name_account_invalid, this.optionToast);
        } else if (!/^([ァ-ン]|ー)+$/.test(this.bankInfo.last_name_account)) {
          this.toast.error(this.Message.name_account_invalid, this.optionToast);
        } else {
          const request = {
            bank_name: this.bank_id === "" ? this.bankName : this.bank_name,
            branch_code: this.bankInfo.branch_code,
            bank_id: this.bank_id,
            account_number: this.bankInfo.account_number,
            account_type: this.bankInfo.account_type,
            first_name_account: this.bankInfo.first_name_account,
            last_name_account: this.bankInfo.last_name_account,
          };
          this.preloadList = true;
          this.store.updateCreditCard(this.account_id, request);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.submitRegisterPage {
  padding: 30px 100px;

  @include screen(991) {
    padding: 30px 50px;
  }

  @include screen(576) {
    padding: 0px;
  }

  &-search {
    width: 60%;

    @include screen(480) {
      width: 100%;
    }

    .form-input-search {
      width: 100%;
      padding: 15px 25px;
      box-shadow: 0px 3px 6px #00000029 !important;
      border-radius: 8px !important;
      border: none !important;
      opacity: 1;
    }

    .icon-search {
      cursor: pointer;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);

      svg {
        font-size: 22px;
      }
    }
  }

  &-content {
    margin-top: 50px;
    width: 60%;

    @include screen(991) {
      width: 100%;
    }

    @include screen(767) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 30px;
    }

    @include screen(480) {
      padding: 20px;
    }

    .bankName {
      font-size: 22px;
      color: $gray-800;
    }

    .form-label {
      color: #7e7d7d;
      font-weight: 500;
      font-size: 18px;
    }

    .form-select-custom {
      background-image: url("@/assets/images/iconArrowDownOrange.png") !important;
      color: #7e7d7d;
      padding: 0.375rem 2.25rem 0.375rem 1.25rem;
      border: unset;
      height: 50px;
    }

    .custom-input {
      height: 50px;
      border: unset;
    }
  }
}

.list-data-search {
  max-height: 200px;
  overflow-y: scroll;
  box-shadow: 0px 0px 6px #44444333;
  margin-top: -20px;
  padding-top: 20px;

  &-item {
    padding: 10px 20px;
    background: $white;
    cursor: pointer;

    &:hover {
      color: $orange;
    }
  }
}
.text-description {
  font-size: 14px;
  margin-top: 2px;
  color: gray;
}
</style>
