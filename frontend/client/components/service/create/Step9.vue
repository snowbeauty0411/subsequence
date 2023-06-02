<template>
  <div class="createService-step9">
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="
              createService-step9-left
              flex flex-col
              justify-between
              h-full
            "
          >
            <div class="createService-step9-left-form">
              <div class="d-flex">
                <div class="step-title">
                  サービス利用方法のステップを設定しましょう。
                </div>
                <span class="text-danger step-note mt-4">※</span>
              </div>
              <div class="step9-form">
                <div class="step9-form-data">
                  <div class="form-label">STEP.01</div>
                  <div class="relative validate-form">
                    <b-form-input
                      v-model.trim="v$.dataStep.$model[0].title"
                      class="custom-input"
                      v-bind:class="{
                        'is-invalid':
                          v$.dataStep.$each.$response.$data[0].title.$error,
                      }"
                      v-bind:change="saveDraft()"
                    />
                    <div
                      v-if="v$.dataStep.$each.$response.$data[0].title.$error"
                      class="error-text"
                    >
                      {{ message.step_required }}
                    </div>
                  </div>
                  <div
                    class="step9-form-data-item relative"
                    v-for="(value, index) in dataStep"
                    :key="index"
                  >
                    <div class="form-label" v-if="index > 0">
                      STEP.0{{ index + 1 }}
                    </div>
                    <div
                      class="absolute btn-remove-step"
                      v-if="index > 0"
                      v-on:click="removeStep(index, value)"
                    >
                      <img src="@/assets/images/iconMinus.png" alt="" />
                    </div>
                    <div class="relative validate-form" style="z-index: 1001">
                      <b-form-input
                        v-model.trim="v$.dataStep.$model[index].title"
                        list="listStepName"
                        class="custom-input relative"
                        placeholder="自由入力"
                        v-if="index > 0"
                        :disabled="
                          value.title == '商品を受け取る' ||
                          value.title == '予約する' ||
                          value.title == '来店する'
                        "
                        v-bind:class="{ 'is-invalid': value.errorTitle }"
                        @input="changeTitle($event, index)"
                        v-on:click="showInputSearch(index)"
                        v-bind:change="saveDraft()"
                      />
                      <div class="error-text" v-if="value.errorTitle">
                        {{ message.step_required }}
                      </div>
                      <div
                        class="absolute icon-delete-step9"
                        v-if="
                          value.title == '商品を受け取る' ||
                          value.title == '予約する' ||
                          value.title == '来店する'
                        "
                        v-on:click="refreshTitle(index)"
                      >
                        <SDIcon icon="x" size="lg" />
                      </div>

                      <div
                        class="list-data-search"
                        v-if="index > 0"
                        v-show="
                          showModalSearch.findIndex(
                            (item) => item === index
                          ) !== -1
                        "
                      >
                        <div
                          class="list-data-search-item cursor-pointer"
                          v-for="(item, index1) in options"
                          :key="index1"
                          v-on:click="selectTitle(item.text, index)"
                        >
                          {{ item.text }}
                        </div>
                      </div>
                    </div>

                    <div v-if="index > 0">
                      <div class="form-label mt-4">説明文</div>
                      <div class="relative validate-form">
                        <b-form-textarea
                          id="textarea-rows"
                          placeholder="ここに説明文が入ります。"
                          rows="6"
                          v-model.trim="v$.dataStep.$model[index].content"
                          maxlength="50"
                          v-bind:class="{ 'is-invalid': value.errorContent }"
                          @input="changeContent($event, index)"
                          v-bind:change="saveDraft()"
                        ></b-form-textarea>
                        <div
                          class="description-textarea"
                          v-if="value.content !== null"
                        >
                          残り{{ 50 - value.content.length }}文字
                        </div>
                        <div v-if="value.errorContent" class="error-text">
                          {{ message.step_required }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="dataStep.length < 5"
                    class="btn-add-step flex items-center"
                  >
                    <img
                      src="@/assets/images/iconAdd.png"
                      v-on:click="addStep()"
                      alt=""
                    />
                    <div class="btn-add-step-text mx-2" v-on:click="addStep()">
                      ステップを追加する
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="createService-step9-left-btn w-1/2">
              <div
                class="text-danger"
                style="padding: 0 22px; margin-bottom: 20px"
              >
                <b-row>
                  <b-col cols="2" class="col-start"
                    ><span class="step-note">※</span></b-col
                  >
                  <b-col cols="10" class="col-text-note">
                    <span
                      >この項目は、契約者が存在する場合変更することができません。</span
                    ><br />
                    <span class=""
                      >お間違えのないよう確認してご入力ください。</span
                    >
                  </b-col>
                </b-row>
              </div>
              <div class="flex">
                <b-button
                  v-on:click="backStep()"
                  class="
                    btn-return
                    flex
                    justify-center
                    items-center
                    btn-step-common
                  "
                >
                  戻る
                </b-button>
                <b-button
                  v-on:click="nextStep()"
                  class="
                    btn-next
                    flex
                    items-center
                    justify-center
                    btn-step-common
                  "
                >
                  次へ
                </b-button>
              </div>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="
              createService-step9-right
              flex flex-col
              items-center
              justify-between
              h-full
            "
          >
            <div class="createService-step9-right-title text-white">
              プレビュー preview
            </div>
            <div class="createService-step9-right-content">
              <SDServiceStep
                v-for="(item, index) in dataStep"
                :key="index"
                :number="'0' + (index + 1)"
                :title="item.title"
                :content="item.content"
              />
            </div></div></b-col></b-row
    ></b-container>
    <div
      :class="showModalSearch.length > 0 ? 'backdropStep9' : ''"
      v-on:click="hideInputSearch()"
    ></div>
  </div>
</template>

<script>
import SDServiceStep from "../../SDServiceStep";
import { Message } from "@/utils/message";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import SDIcon from "@/components/SDIcon";
export default {
  setup() {
    const toast = useToast();
    const v$ = useVuelidate();

    return {
      toast,
      v$,
    };
  },
  validations: {
    dataStep: {
      $each: helpers.forEach({
        title: {
          required,
        },
        content: {
          required,
        },
      }),
    },
  },
  data() {
    return {
      isEditDraftService: false,
      message: Message.SELLER,
      selected: null,
      options: [
        { value: "自由入力", text: "自由入力" },
        { value: "商品を受け取る", text: "商品を受け取る" },
        { value: "予約する", text: "予約する" },
        { value: "来店する", text: "来店する" },
      ],
      text: "",
      remaining: 50,
      dataStep: [
        {
          title: "サブスクを登録する",
        },
        {
          title: "",
          content: "",
          errorTitle: false,
          errorContent: false,
        },
      ],
      index: 0,
      invalid: 0,
      dataGet: [],
      indexChecked: false,
      dataEditDraft: [],
      dataStepDelete: [],
      showModalSearch: [],
    };
  },

  created() {
    this.dataGet = JSON.parse(localStorage.getItem("data-step-9"));
    this.dataEditDraft = JSON.parse(localStorage.getItem("data-step-9-error"));
    if (this.dataEditDraft != null) {
      this.dataStep = this.dataEditDraft;
    } else {
      this.dataStep = [
        {
          title: "サブスクを登録する",
        },
        {
          title: "",
          content: "",
          errorTitle: false,
          errorContent: false,
        },
      ];
    }
    if (this.$route.query.hash_id !== undefined) {
      this.isEditDraftService = true;
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=1&hash_id=${hash_id}`);
      }
    } else {
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        this.$router.push("/seller/service/create?step=1");
      }
    }
    let nextStep = localStorage.getItem("next-step-9");
    if (nextStep != null) {
      if (this.dataGet.length > 0) {
        this.dataStep = [];
        this.dataGet.map((item) => {
          item.content === null ? 0 : item.content;
          this.dataStep.push(item);
        });
      }
    }
  },

  watch: {},

  components: { SDServiceStep, SDIcon },

  mounted() {
    window.addEventListener("beforeunload", this.reloadPage, { capture: true });
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.reloadPage, {
      capture: true,
    });
  },

  methods: {
    saveDraft() {
      // if (this.isEditDraftService) {
      localStorage.setItem("data-step-9", JSON.stringify(this.dataStep));
      // localStorage.setItem(
      //   "data-step-9-error",
      //   JSON.stringify(this.dataStep)
      // );
      // }
    },

    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    onChangeTextarea() {
      this.remaining = 50 - this.text.length;
    },

    addStep() {
      this.dataStep.push({
        title: "",
        content: "",
        errorTitle: false,
        errorContent: false,
      });
    },

    removeStep(event, item) {
      if (this.isEditDraftService) {
        this.index = this.dataStep.indexOf(event.target);
        this.dataStep.splice(event, 1);
        if (item.id !== undefined) {
          this.dataStepDelete.push(item.id);
        }
        localStorage.setItem(
          "data-step-9-delete",
          JSON.stringify(this.dataStepDelete)
        );
      } else {
        this.index = this.dataStep.indexOf(event.target);
        this.dataStep.splice(event, 1);
      }
    },

    async nextStep() {
      const result = await this.v$.$validate();
      if (!result) {
        this.dataStep.map((item, index) => {
          if (index !== 0) {
            if (item.content === "") {
              item.errorContent = true;
            } else {
              item.errorContent = false;
            }
            if (item.title === "") {
              item.errorTitle = true;
            } else {
              item.errorTitle = false;
            }
          } else {
            item.errorContent = false;
          }
        });
      } else {
        if (this.isEditDraftService) {
          const hash_id = this.$route.query.hash_id;
          localStorage.setItem("data-step-9", JSON.stringify(this.dataStep));
          localStorage.setItem(
            "data-step-9-error",
            JSON.stringify(this.dataStep)
          );
          localStorage.setItem(
            "data-step-9-delete",
            JSON.stringify(this.dataStepDelete)
          );
          this.$router.push(
            `/seller/service/create?step=10&hash_id=${hash_id}`
          );
        } else {
          localStorage.setItem("next-step-9", "true");
          localStorage.setItem("data-step-9", JSON.stringify(this.dataStep));
          this.$router.push("/seller/service/create?step=10");
        }
      }
    },

    backStep() {
      if (this.isEditDraftService) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=8&hash_id=${hash_id}`);
      } else {
        this.$router.push("/seller/service/create?step=8");
      }
    },

    changeContent($event, index) {
      this.dataStep.map((item, idx) => {
        if (index === idx) {
          if ($event === "") {
            item.errorContent = true;
          } else {
            item.errorContent = false;
          }
        }
      });
    },

    changeTitle($event, index) {
      this.dataStep.map((item, idx) => {
        if (index === idx) {
          if ($event === "") {
            item.errorTitle = true;
          } else {
            item.errorTitle = false;
          }
        }
      });
    },

    refreshTitle(value) {
      this.dataStep.map((item, index) => {
        if (index === value) {
          item.title = "";
        }
      });
    },

    showInputSearch(value) {
      if (this.showModalSearch.length > 0) {
        const checkValue = this.showModalSearch.findIndex(
          (item) => item === value
        );
        if (checkValue !== -1) {
          this.showModalSearch.splice(checkValue, 1);
        } else {
          this.showModalSearch.push(value);
        }
      } else {
        this.showModalSearch.push(value);
      }
    },

    hideInputSearch() {
      this.showModalSearch = [];
    },

    selectTitle(value, number) {
      this.dataStep.map((item, index) => {
        if (index === number) {
          if (value == "自由入力") {
            item.title = "";
            item.errorTitle = false;
          } else {
            item.title = value;
            item.errorTitle = false;
          }
        }
      });
      this.showModalSearch = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.list-data-search {
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  box-shadow: 0px 0px 6px #44444333;
  margin-top: -20px;
  padding-top: 20px;
  z-index: -1 !important;
  &-item {
    padding: 10px 20px;
    background: $white;
    cursor: pointer;
    &:hover {
      color: $orange;
    }
  }
}
.list-data-search::-webkit-scrollbar {
  display: none;
}
.backdropStep9 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
</style>
