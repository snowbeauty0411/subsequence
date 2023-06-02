<template>
  <div class="createService-step2">
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="createService-step2-left flex flex-col justify-between">
            <div class="createService-step2-left-form">
              <div class="step-title">
                次に、出品するサービスのカテゴリを選びましょう。
              </div>
              <div class="step2-form">
                <div class="form-label">カテゴリ名</div>
                <b-form-select
                  v-model="selected"
                  :options="categoryList"
                  size="sm"
                  class="form-select-custom"
                ></b-form-select>
              </div>
            </div>
            <div class="createService-step2-left-btn flex">
              <b-button
                v-on:click="backStep()"
                class="btn-return flex justify-center items-center btn-step-common"
              >
                戻る
              </b-button>
              <b-button
                v-on:click="nextStep()"
                class="btn-next flex items-center justify-center btn-step-common"
                :disabled="isLoading"
              >
                次へ
              </b-button>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="createService-step2-right"></div></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import { ServiceStore } from "@/store/service/index.ts";
export default {
  setup() {
    const store = sellerStore();
    const serviceStore = ServiceStore();
    return {
      store,
      serviceStore,
    };
  },
  computed: {
    ...mapState(sellerStore, ["success", "message", "error", "listCategory"]),
    ...mapState(ServiceStore, ["detailService"]),
  },
  name: "Step2",
  data() {
    return {
      selected: 1,
      categoryList: [],
      categoryName: "",
      isLoading: false,
      isEditDraftService: false,
    };
  },

  created() {
    this.store.getListCategory();
    let categoryName = localStorage.getItem("data-step-2");
    let selected = localStorage.getItem("id-step-2");
    if (categoryName != "" && categoryName != null) {
      this.categoryName = categoryName;
      this.selected = selected;
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
    listCategory() {
      this.isLoading = true;
      this.categoryList = this.listCategory.map((item) => ({
        text: item.name,
        value: item.id,
      }));

      let idCategory = localStorage.getItem("id-step-2");
      if (idCategory !== null) {
        this.selected = idCategory;
      } else {
        this.selected = this.categoryList[0].value;
      }
      this.isLoading = false;
    },

    selected() {
      for (let i in this.categoryList) {
        if (this.selected === this.categoryList[i].value) {
          this.categoryName = this.categoryList[i].text;
        }
      }
      localStorage.setItem("data-step-2", this.categoryName);
      localStorage.setItem("id-step-2", this.selected);
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

    nextStep() {
      if (this.isEditDraftService) {
        for (let i in this.categoryList) {
          if (this.selected === this.categoryList[i].value) {
            this.categoryName = this.categoryList[i].text;
          }
        }
        localStorage.setItem("data-step-2", this.categoryName);
        localStorage.setItem("id-step-2", this.selected);
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=3&hash_id=${hash_id}`);
      } else {
        for (let i in this.categoryList) {
          if (this.selected === this.categoryList[i].value) {
            this.categoryName = this.categoryList[i].text;
          }
        }
        localStorage.setItem("data-step-2", this.categoryName);
        localStorage.setItem("id-step-2", this.selected);
        this.$router.push("/seller/service/create?step=3");
      }
    },

    backStep() {
      if (this.isEditDraftService) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=1&hash_id=${hash_id}`);
      } else {
        this.$router.push("/seller/service/create?step=1");
      }
    },
  },
};
</script>

<style></style>
