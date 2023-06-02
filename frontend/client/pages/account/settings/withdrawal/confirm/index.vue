<template>
  <NuxtLayout :name="user_type === 'BUYER' ? 'buyer' : 'seller'">
    <div class="withdrawalPage flex flex-col">
      <SDPreLoad :preload="preload" />
      <div class="withdrawalPage-link flex items-center flex-wrap d-none">
        <div>
          <NuxtLink to="/account/settings">設定</NuxtLink>
        </div>
        <div class="mx-2">
          <SDIcon icon="chevron-right" class="mx-2" />
        </div>
        <div>退会する</div>
      </div>
      <div class="withdrawalPage-content">
        <div class="withdrawalPage-content-title flex items-end">
          <div class="title-main">退会する</div>
          <div class="title-description">Withdrawal from membership</div>
        </div>
        <div
          class="withdrawalPage-content-main flex flex-col pl-[10%] pr-[20%]"
        >
          <div
            class="
              text-[#5E5C5C]
              mt-[40px]
              mb-[50px]
              font-semibold
              text-[22px] text-top
            "
          >
            退会は即時反映され、退会処理後にアカウントを元に戻すことはできません。
            売上金は全て消滅します。
          </div>
          <div class="text-[#5E5C5C] text-[18px]">
            退会する理由をお聞かせください（任意）
          </div>
          <div class="flex flex-col my-[20px] relative validate-form">
            <b-form-textarea
              id="textarea-rows"
              placeholder="ここにコメントが入ります。"
              rows="6"
              maxlength="50"
              v-bind:change="onChangeTextarea()"
              v-model.trim="v$.description.$model"
            ></b-form-textarea>
            <div class="description-textarea text-end text-[#7E7D7D]">
              残り{{ remaining }}文字
            </div>
          </div>
          <div class="flex items-center withdrawalPage-checkbox">
            <b-form-checkbox 
              v-model="v$.checked1.$model"
              v-bind:class="{ 'is-invalid': v$.checked1.$error }"
              class="cursor-pointer"
            >
            </b-form-checkbox>
            <div class="text-[#7E7D7D] text[16px]">
              売上金{{
                formatPrice(Number(transferHistorys.amount_current))
              }}を破棄します
              <div v-if="v$.checked1.$error" class="error-text">
                <span v-if="v$.checked1.requiredCheckbox.$invalid">{{
                  messageNoti.checkbox_required
                }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center withdrawalPage-checkbox">
            <b-form-checkbox v-model="checked2"> </b-form-checkbox>
            <div class="text-[#7E7D7D] text[16px]">
              <a class="text-[#7D9FB1]" @click="redirectToTerm">退会に関するガイド</a>
              を確認しました
            </div>
          </div>
          <div class="flex justify-center w-[100%] my-[50px]">
            <b-button
              class="bg-[#E79C3A] border-none py-[10px] font-medium w-[100%]"
              v-on:click="modalConfirm()"
              >上記に同意して退会する</b-button
            >
          </div>
        </div>
      </div>
      <b-modal
        v-model="isModal"
        hide-header
        hide-footer
        id="isModalConfirm"
        size="lg"
        ><div class="isModalConfirm-header flex justify-between">
          <div>退会する</div>
          <SDIcon
            icon="x"
            size="lg"
            v-on:click="isModal = false"
            class="cursor-pointer"
          />
        </div>
        <div class="isModalConfirm-main">
          <div class="text-[#5E5C5C] text-[18px]">
            本当に退会処理をしてもよろしいですか？
          </div>
          <div class="w-full flex justify-center mt-[40px]">
            <b-button
              class="w-[80%] bg-[#E79C3A] border-none py-[10px] font-medium"
              v-on:click="submitWithdrawal()"
              >退会する</b-button
            >
          </div>
        </div>
      </b-modal>
    </div>
  </NuxtLayout>
</template>

<script>
import SDIcon from "@/components/SDIcon";
import SDPreLoad from "@/components/SDPreLoad";
import { buyerStore } from "@/store/buyer";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import { required, maxLength, minLength } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import useVuelidate from "@vuelidate/core";
import Cookies from "js-cookie";

const requiredCheckbox = (value) => {
  let isNotFullWidth = true;
  if (value) {
    isNotFullWidth = true;
  } else {
    isNotFullWidth = false;
  }
  return isNotFullWidth;
};

export default {
  setup() {
    const store = buyerStore();
    const storeSeller = sellerStore();
    const toast = useToast();
    const v$ = useVuelidate();
    return {
      store,
      v$,
      toast,
      storeSeller
    };
  },
  validations: {
    description: {
      maxLength: maxLength(50),
      minLength: minLength(1),
    },
    checked1: {
      requiredCheckbox,
    },
  },
  components: {
    SDIcon,
    SDPreLoad,
  },
  data() {
    return {
      user_type: "",
      description: "",
      remaining: 50,
      checked1: false,
      checked2: false,
      isModal: false,
      preload: false,
      messageNoti: Message.SELLER,
      account_id: "",
      detailInfoWithdrawal: { discard_amount: "" },
      transferHistorys: {},
    };
  },
  created() {
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    let valueToken = null;
    if (rememberLogin === "true") {
      valueToken = localStorage.getItem("token_user");
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      valueToken = Cookies.get("token_user");
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }

    if (!valueToken) {
      this.$router.push("/login");
    }
    this.storeSeller.getTransferHistory(this.account_id);
  },
  methods: {
    redirectToTerm() {
      window.open("/term", '_blank', 'noreferrer');
    },

    async modalConfirm() {
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        if (this.checked2 === false) {
          this.toast.error(this.messageNoti.guide_require, this.optionToast);
        } else {
          this.isModal = true;
        }
      }
    },

    async submitWithdrawal() {
      const request = {
        reason_withdrawal: this.description,
      };
      await this.store.withdrawalAccount(request, this.account_id);
    },

    onChangeTextarea() {
      this.remaining = 50 - this.description.length;
    },

    formatPrice(value) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
    },
  },
  computed: {
    ...mapState(buyerStore, ["message", "success", "error", "infoWithdrawal"]),
    ...mapState(sellerStore, [
      "transferHistory"
    ])
  },
  watch: {
    transferHistory() {
      this.preload = true;
      this.transferHistorys = this.transferHistory;
      this.preload = false;
    },

    infoWithdrawal() {
      this.preload = true;
      this.detailInfoWithdrawal = this.infoWithdrawal;
      this.preload = false;
    },

    success() {
      if (this.store.success) {
        this.toast.success(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.isModal = false;
        this.$router.push("/account/settings/withdrawal/completed");
      }
    },

    error() {
      if (this.store.error) {
        this.toast.error(this.store.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
        this.isModal = false;
      }
    },
  },
};
</script>

<style lang="scss">
.withdrawalPage {
  padding: 30px 100px;
  @include screen(991) {
    padding: 30px 50px;
  }
  @include screen(576) {
    padding: 30px;
  }
  &-link {
    font-size: 14px;
    font-weight: 600;
    color: $gray-800;
    margin-bottom: 50px;
    margin-top: 30px;
    @include screen(991) {
      margin-bottom: 30px;
    }
    a {
      &:hover {
        color: $orange;
      }
    }
  }
  &-content {
    @include screen(767) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 30px;
    }
    @include screen(480) {
      padding: 0px;
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
          display: none;
        }
      }
      @include screen(480) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    &-main {
      @include screen(991) {
        padding: unset;
      }
      .text-top {
        @include screen(480) {
          font-size: 18px;
        }
      }
    }
    .withdrawalPage-checkbox {
      @include screen(480) {
        align-items: baseline;
      }
      .form-check {
        .form-check-input:checked {
          background-color: $orange;
          border-color: $orange;
        }
      }
    }
  }
}
#isModalConfirm {
  margin-top:  45%;
  .isModalConfirm-header {
    border-bottom: 1px solid $gray-800;
    padding: 20px;
    font-weight: 600;
    color: $gray-800;
    @include screen(480){
      border-bottom: none;
    }
    svg{
      @include screen(480){
        width: 50px;
        height: 50px;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  .isModalConfirm-main {
    padding: 50px;
    @include screen(480){
      padding: 20px 10px 10px 10px;
    }
    .btn{
      @include screen(480){
        width: 100%;
        font-size: 16px;
      }
    }
  }
}
</style>