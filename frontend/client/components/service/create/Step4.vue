<template>
  <div class="createService-step4">
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="createService-step4-left flex flex-col justify-between">
            <div class="createService-step4-left-form">
              <div class="flex">
                <div class="step-title">
                  『サービス名』のタイプを教えてください。
                </div>
                <span class="mt-4 step-note text-danger">※</span
                ><span class="mt-4 step-note text-danger">※</span>
              </div>
              <div class="step4-form">
                <div class="step4-form-data">
                  <b-form-radio-group
                    v-model="selected"
                    :options="serviceTypes"
                    stacked
                    class="w-full form-raido-custom"
                    @change="changeTpye"
                  ></b-form-radio-group>
                  <div class="form-label mt-[20px]" v-if="selected === 4">
                    リンクを追加
                  </div>
                  <div
                    class="relative validate-form flex justify-between"
                    v-if="selected === 4"
                  >
                    <b-form-input
                      v-model.trim="v$.urlType4.$model"
                      ref="copy"
                      placeholder="https://subsq.jp/"
                      class="custom-input"
                      v-bind:class="{ 'is-invalid': v$.urlType4.$error }"
                      style="width: calc(100% - 140px)"
                      v-on:focus="$event.target.select()"
                    ></b-form-input>
                    <b-button
                      class="w-[120px] bg-[#e79c3a] border-none"
                      v-on:click="copy()"
                      >{{ textCopy }}</b-button
                    >
                    <div v-if="v$.urlType4.$error" class="error-text">
                      <p v-if="v$.urlType4.required.$invalid">
                        {{ message.url_step11_required }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <b-modal
                v-model="showModalConfirm"
                hide-footer
                id="modal-confirm-delete"
                title="サービスタイプを変更すると、これまで保存したコースは破棄されます。変更しますか？"
                ><div class="modal-confirm">
                  <div class="flex justify-around">
                    <button
                      class="bg-red-500 text-[#fff]"
                      v-on:click="btnClickDeleteCourses()"
                    >
                      はい</button
                    ><button
                      class="bg-gray-400 text-[#fff]"
                      @click="closePopup()"
                    >
                      キャンセル
                    </button>
                  </div>
                </div></b-modal
              >
            </div>
            <div class="createService-step4-left-btn">
              <div
                class="text-danger"
                style="padding: 0 22px; margin-bottom: 20px"
              >
                <b-row>
                  <b-col cols="2" class="cols-start"
                    ><span class="step-note">※</span>
                    <span class="step-note">※</span></b-col
                  >
                  <b-col cols="10" class="col-text-note">
                    <span
                      >この項目は、サービス作成完了後は変更することができません。</span
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
              createService-step4-right
              flex flex-col
              items-center
              justify-between
              h-full
            "
          >
            <div class="createService-step4-right-title">
              サブスクリプション事業開発の精鋭が <br />
              あなただけのシステムを開発します！
            </div>
            <div
              class="createService-step4-right-img"
              :style="'background-image: url(' + bgStep4 + ')'"
            ></div></div></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import bgStep4 from "@/assets/images/bgStep4.png";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import { sellerStore } from "@/store/seller";
import { ServiceStore } from "@/store/service/index.ts";
import { mapState } from "pinia";

export default {
  name: "Step4",
  setup() {
    const v$ = useVuelidate();
    const store = sellerStore();
    const serviceStore = ServiceStore();
    return {
      v$,
      store,
      serviceStore,
    };
  },
  data() {
    return {
      selected: 1,
      serviceTypes: [
        { text: "定期便タイプ", value: 1 },
        { text: "店舗型タイプ", value: 2 },
        { text: "訪問型タイプ/オンライン完結タイプ", value: 3 },
        { text: "外部リンクタイプ", value: 4 },
        { text: "どれにも当てはまらない", value: 5 },
      ],
      bgStep4,
      serviceTypeId: "",
      isEditDraftService: false,
      message: Message.SELLER,
      urlType4: "",
      textCopy: "コピーする",
      showModalConfirm: false,
    };
  },

  validations: {
    urlType4: {
      required,
      minLength: minLength(1),
    },
  },

  computed: {
    ...mapState(ServiceStore, ["listCourse"]),
  },

  created() {
    let idServiceType = JSON.parse(localStorage.getItem("data-step-4-init"));
    let idServiceTypeEdit = JSON.parse(localStorage.getItem("data-step-4"));
    if (idServiceTypeEdit !== null) {
      idServiceType = idServiceTypeEdit;
      localStorage.setItem("typeSelected", idServiceType);
    }
    const request = {
      hash_id: this.$route.query.hash_id,
      per_page: 30,
      page: 1,
    };
    this.serviceStore.getListCourseDraftByHashId(request);
    let urlType4 = localStorage.getItem("urlType4");
    if (idServiceType === null) {
      this.selected = 1;
    } else {
      this.selected = Number(idServiceType);
    }

    if (urlType4 != null) {
      this.urlType4 = urlType4;
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
  },

  watch: {
    selected() {
      for (let i in this.serviceTypes) {
        if (this.selected === this.serviceTypes[i].value) {
          this.serviceTypeId = this.serviceTypes[i].value;
        }
      }
      if (this.selected == 4) {
        localStorage.setItem("data-step-4", this.serviceTypeId);
      } else {
        let urlType4 = localStorage.getItem("urlType4");
        if (urlType4 != null) {
          localStorage.removeItem("urlType4");
        }
        localStorage.setItem("data-step-4", this.serviceTypeId);
      }
      if (this.selected === 1) {
        localStorage.removeItem("service_reserve_setting");
      }
      if (this.selected === 2) {
        localStorage.removeItem("with_skip");
        localStorage.removeItem("skip");
        localStorage.removeItem("interval");
        localStorage.removeItem("interval-init");
        localStorage.removeItem("skip");
      }
    },

    urlType4() {
      this.textCopy = "コピーする";
      if (this.selected == 4) {
        localStorage.setItem("urlType4", this.urlType4);
      } else {
        let urlType4 = localStorage.getItem("urlType4");
        if (urlType4 != null) {
          localStorage.removeItem("urlType4");
        }
      }
    },
  },

  mounted() {
    window.addEventListener("beforeunload", this.reloadPage, { capture: true });
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.reloadPage, {
      capture: true,
    });
  },

  methods: {
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    changeTpye() {
      let typeSelected = localStorage.getItem("typeSelected");
      let listCourse = JSON.parse(localStorage.getItem("list-course"));
      if (listCourse === null) {
        listCourse = this.listCourse.data;
      }
      if (listCourse && listCourse.length > 0) {
        if (typeSelected !== null && listCourse !== null) {
          if (typeSelected !== this.selected) {
            this.showModalConfirm = true;
          }
        }
      }
    },

    deleteAllCourses() {
      let listCourse = localStorage.getItem("list-course");
      if (listCourse === null) {
        listCourse = this.listCourse.data;
      }
      if (listCourse.length > 0) {
        for (let i = 0; i < listCourse.length; i++) {
          if (listCourse[i].id !== undefined) {
            const request = {
              service_id: localStorage.getItem("id"),
              hash_id: this.$route.query.hash_id,
              seller_id: localStorage.getItem("account_id"),
              course_id: listCourse[i].course_id,
            };
            this.serviceStore.deleteCourse(request);
          }
        }
      }

      this.removeListCourses();
    },

    closePopup() {
      let typeSelected = localStorage.getItem("typeSelected");
      this.selected = typeSelected;
      this.showModalConfirm = false;
    },

    btnClickDeleteCourses() {
      if (this.isEditDraftService) {
        this.deleteAllCourses();
      } else {
        this.removeListCourses();
      }
    },

    removeListCourses() {
      localStorage.removeItem("list-course");
      localStorage.removeItem("typeSelected");
      this.store.listImgCourse = [];
      this.showModalConfirm = false;
    },

    async nextStep() {
      for (let i in this.serviceTypes) {
        if (this.selected === this.serviceTypes[i].value) {
          this.serviceTypeId = this.serviceTypes[i].value;
        }
      }

      if (this.isEditDraftService) {
        const hash_id = this.$route.query.hash_id;

        if (this.selected == 4) {
          const result = await this.v$.$validate();
          if (!result) {
          } else {
            localStorage.setItem("data-step-4", this.serviceTypeId);
            localStorage.setItem("urlType4", this.urlType4);
            this.$router.push(
              `/seller/service/create?step=5&hash_id=${hash_id}`
            );
          }
        } else {
          let urlType4 = localStorage.getItem("urlType4");
          if (urlType4 != null) {
            localStorage.removeItem("urlType4");
          }
          localStorage.setItem("data-step-4", this.serviceTypeId);
          this.$router.push(`/seller/service/create?step=5&hash_id=${hash_id}`);
        }
      } else {
        if (this.selected == 4) {
          const result = await this.v$.$validate();
          if (!result) {
          } else {
            localStorage.setItem("data-step-4", this.serviceTypeId);
            localStorage.setItem("urlType4", this.urlType4);
            this.$router.push("/seller/service/create?step=5");
          }
        } else {
          let urlType4 = localStorage.getItem("urlType4");
          if (urlType4 != null) {
            localStorage.removeItem("urlType4");
          }
          localStorage.setItem("data-step-4", this.serviceTypeId);
          this.$router.push("/seller/service/create?step=5");
        }
      }
    },

    backStep() {
      if (this.isEditDraftService) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create/?step=3&hash_id=${hash_id}`);
      } else {
        this.$router.push("/seller/service/create?step=3");
      }
    },

    copy() {
      this.$refs.copy.focus();
      document.execCommand("copy");
      this.textCopy = "コピー済み";
    },
  },
};
</script>

<style></style>
