<template>
  <div class="createService-step8">
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="createService-step8-left flex flex-col justify-between">
            <div class="createService-step8-left-form">
              <div class="step-title">公開範囲はどうしますか？</div>
              <div class="step-description">
                公開範囲が非公開の場合、個別URLを知っているユーザーだけが、サービスを閲覧・契約することが出来ます。
              </div>
              <div class="flex justify-end">
                <b-button
                  v-b-tooltip.hover.bottom
                  title="公開を選択するとサービス一覧に表示されるようになります。非公開の場合は、サービス一覧や検索結果に表示されず、非公開URLからのみアクセス可能となります。"
                  class="step-description-yellow flex items-center"
                >
                  <BootstrapIcon
                    icon="question-circle"
                    size="sm"
                    class="mx-1"
                  />公開範囲とは？
                </b-button>
              </div>

              <div class="step8-form mb-5">
                <div class="step8-form-data">
                  <b-form-radio-group
                    v-model="selected"
                    :options="options"
                    stacked
                    class="w-full form-raido-custom mb-5"
                    v-on:change="chooseStatus"
                  ></b-form-radio-group>
                </div>
              </div>
              <div v-if="isPrivate == '1'" class="pb-[50px]">
                <div class="step-title">
                  公開範囲が非公開の場合、下記のURLでサービスの閲覧が可能となります。
                </div>
                <div class="form-label">非公開URL</div>
                <div class="relative validate-form">
                  <b-form-input
                    v-model.trim="urlHost"
                    :placeholder="host + domain + '_id'"
                    :disabled="isPrivate == '1'"
                    class="custom-input"
                  />
                </div>
              </div>
            </div>
            <div class="createService-step8-left-btn flex">
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
                :disabled="isLoading"
              >
                次へ
              </b-button>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { Message } from "@/utils/message";
import { useToast } from "vue-toastification";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
export default {
  name: "Step8",
  // setup: () => ({
  //   v$: useVuelidate(),
  // }),
  setup() {
    const toast = useToast();
    const store = sellerStore();
    return {
      toast,
      store,
    };
  },
  computed: {
    ...mapState(sellerStore, ["dataHashID"]),
  },

  watch: {
    dataHashID() {
      this.isLoading = true;
      this.id = this.store.dataHashID.id;
      this.hash_id = this.store.dataHashID.hash_id;
      this.isLoading = false;
    },

    isPrivate() {
      if (this.isEditDraftService) {
        localStorage.setItem("isPrivate-step-8", this.isPrivate);
      }
    },

    urlPrivate() {
      if (this.isEditDraftService) {
        localStorage.setItem("url-step-8", this.urlPrivate);
      }
    },
  },

  data() {
    return {
      selected: "0",
      message: Message.SELLER,
      isPrivate: "0",
      options: [
        { text: "公開", value: "0" },
        { text: "非公開", value: "1" },
      ],
      urlPrivate: "",
      domain: "",
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      id: "",
      hash_id: "",
      isLoading: false,
      isEditDraftService: false,
      host: "",
      urlHost: "",
      listCourse: [],
    };
  },

  created() {
    let isPrivate = Number(localStorage.getItem("isPrivate-step-8"));
    let isPrivateInit = Number(localStorage.getItem("isPrivate-step-8-init"));
    if(isPrivateInit !== null) {
      this.isPrivate = isPrivateInit
    }
    let urlPrivate = localStorage.getItem("url-step-8");
    this.domain = "service/detail/";
    this.host = window.location.origin;
    this.listCourse = JSON.parse(localStorage.getItem("list-course"));
    if (isPrivate !== null && isPrivate == 0) {
      this.isPrivate = "0";
      this.selected = this.isPrivate;
    } else if (isPrivate !== null && isPrivate == 1 && urlPrivate !== null) {
      this.isPrivate = 1;
      this.selected = this.isPrivate;
      this.urlPrivate = urlPrivate;
      this.urlHost = this.host + this.urlPrivate;
    }
    if (this.$route.query.hash_id !== undefined) {
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=1&hash_id=${hash_id}`);
      }
      this.isEditDraftService = true;
      this.hash_id = this.$route.query.hash_id;
      this.id = localStorage.getItem("id");
    } else {
      this.store.createHashID();
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        // this.$router.push("/seller/service/create?step=1");
      }
    }
  },

  components: {
    BootstrapIcon,
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

    nextStep() {
      if (this.isEditDraftService) {
        if (Number(this.isPrivate) === 1) {
          const invalid = this.urlPrivate.includes(this.domain);
          if (this.urlPrivate === "" || this.urlPrivate === null) {
            this.toast.error(this.message.url_is_required, this.optionToast);
          } else {
            if (invalid && this.urlPrivate !== this.domain) {
              let hash_id = localStorage.getItem("hash_id");
              localStorage.setItem("url-step-8", this.urlPrivate);
              localStorage.setItem("isPrivate-step-8", this.isPrivate);
              localStorage.setItem("id-step-8", this.id);
              localStorage.setItem("hash_id-step-8", this.hash_id);
              this.$router.push(
                `/seller/service/create?step=9&hash_id=${hash_id}`
              );
            } else {
              this.toast.error(this.message.urlPrivate, this.optionToast);
            }
          }
        } else {
          let hash_id = localStorage.getItem("hash_id");
          localStorage.setItem("id-step-8", this.id);
          localStorage.setItem("hash_id-step-8", this.hash_id);
          localStorage.setItem("isPrivate-step-8", this.isPrivate);
          this.$router.push(`/seller/service/create?step=9&hash_id=${hash_id}`);
        }
      } else {
        if (Number(this.isPrivate) === 1) {
          const invalid = this.urlPrivate.includes(this.domain);
          if (this.urlPrivate === "" || this.urlPrivate === null) {
            this.toast.error(this.message.url_is_required, this.optionToast);
          } else {
            if (invalid && this.urlPrivate !== this.domain) {
              localStorage.setItem("url-step-8", this.urlPrivate);
              localStorage.setItem("isPrivate-step-8", this.isPrivate);
              localStorage.setItem("id-step-8", this.id);
              localStorage.setItem("hash_id-step-8", this.hash_id);
              this.$router.push("/seller/service/create?step=9");
            } else {
              this.toast.error(this.message.urlPrivate, this.optionToast);
            }
          }
        } else {
          localStorage.setItem("id-step-8", this.id);
          localStorage.setItem("hash_id-step-8", this.hash_id);
          localStorage.setItem("isPrivate-step-8", this.isPrivate);
          this.$router.push("/seller/service/create?step=9");
        }
      }
    },

    backStep() {
      let serviceTypeId = localStorage.getItem("data-step-4");
      let serviceTypeIdInit = localStorage.getItem("data-step-4-init");
      if(serviceTypeId === null) {
        serviceTypeId = serviceTypeIdInit
      }
      let service_reserve_setting = localStorage.getItem(
        "service_reserve_setting"
      );
      if (Number(this.isPrivate) === 1) {
        const invalid = this.urlPrivate.includes(this.domain);
        if (this.urlPrivate === "" || this.urlPrivate === null) {
          this.toast.error(this.message.url_is_required, this.optionToast);
        } else {
          if (invalid && this.urlPrivate !== this.domain) {
            localStorage.setItem("url-step-8", this.urlPrivate);
            localStorage.setItem("isPrivate-step-8", this.isPrivate);
            localStorage.setItem("id-step-8", this.id);
            localStorage.setItem("hash_id-step-8", this.hash_id);
          } else {
            this.toast.error(this.message.urlPrivate, this.optionToast);
          }
        }
      } else {
        localStorage.setItem("id-step-8", this.id);
        localStorage.setItem("hash_id-step-8", this.hash_id);
        localStorage.setItem("isPrivate-step-8", this.isPrivate);
      }
      if (serviceTypeId !== "null" || serviceTypeId !== null) {
        if (Number(serviceTypeId) === 2 || Number(serviceTypeId) === 3) {
          if (service_reserve_setting != null) {
            if (this.isEditDraftService) {
              const hash_id = this.$route.query.hash_id;
              this.$router.push(
                `/seller/service/settingHour?hash_id=${hash_id}`
              );
            } else {
              this.$router.push("/seller/service/settingHour");
            }
          } else {
            if (this.isEditDraftService) {
              const hash_id = this.$route.query.hash_id;
              this.$router.push(`/seller/service/reserve?hash_id=${hash_id}`);
            } else {
              this.$router.push("/seller/service/reserve");
            }
          }
        } else if (Number(serviceTypeId) === 1) {
          if (this.isEditDraftService) {
            const hash_id = this.$route.query.hash_id;
            this.$router.push(`/seller/service/delivery?hash_id=${hash_id}`);
          } else {
            this.$router.push("/seller/service/delivery");
          }
        } else if (Number(serviceTypeId) === 4 || Number(serviceTypeId) === 5) {
          if (this.isEditDraftService) {
            const hash_id = this.$route.query.hash_id;
            this.$router.push(
              `/seller/service/service-course-draft/list?hash_id=${hash_id}`
            );
          } else {
            this.$router.push("/seller/service/create?step=7");
          }
        }
      }
    },

    chooseStatus() {
      if (this.selected !== "0") {
        this.isPrivate = "1";
        this.urlHost = this.host + "/" + this.domain + this.hash_id;
        this.urlPrivate = this.domain + this.hash_id;
      } else {
        this.isPrivate = "0";
      }
    },
  },
};
</script>

<style></style>
