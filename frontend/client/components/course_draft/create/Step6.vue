<template>
  <div class="editService-step9">
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="editService-step9-left flex flex-col justify-between">
            <div class="editService-step9-left-form">
              <div class="d-flex">
                <div class="step-title">
                  このコースには性別制限が必要ですか？
                </div>
                <span class="mt-4 step-note text-danger">※</span>
              </div>
              <div class="step9-form">
                <div class="step9-form-data">
                  <b-form-radio-group
                    v-model="gender_restrictions"
                    :options="options"
                    stacked
                    class="w-full form-raido-custom"
                  ></b-form-radio-group>
                </div>
              </div>
            </div>
            <div class="editService-step9-left-btn">
              <div
                class="text-danger"
                style="padding: 0 22px; margin-bottom: 10px"
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
                  class="
                    btn-return
                    flex
                    justify-center
                    items-center
                    btn-step-common
                  "
                  v-on:click="backStep()"
                >
                  戻る
                </b-button>
                <b-button
                  class="
                    btn-next
                    flex
                    items-center
                    justify-center
                    btn-step-common
                  "
                  v-on:click="nextStep()"
                >
                  次へ
                </b-button>
              </div>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="
              editService-step9-right
              flex flex-col
              items-center
              justify-between
              h-full
            "
          ></div></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { sellerStore } from "@/store/seller";
export default {
  name: "Step9",

  setup() {
    const store = sellerStore();
    return {
      store,
    };
  },

  data() {
    return {
      gender_restrictions: "0",
      options: [
        { text: "不要", value: "0" },
        { text: "女性のみ利用可能", value: "1" },
        { text: "男性のみ利用可能", value: "2" },
      ],
      isEditDraftService: false,
      isEditServiceOnly: "",
      detailCourse: {},
      copyCourse: "",
      detailCopyCourse1: {},
      listCourse: [],
    };
  },

  created() {
    let serviceName = localStorage.getItem("data-step-1");
    if (serviceName == null) {
      this.$router.push("/seller/service/create?step=1");
    }
    this.queryData = Number(this.$route.query.step);
    this.index = Number(this.$route.query.index);
    this.listCourse = JSON.parse(localStorage.getItem("list-course"));
    if (this.listCourse[this.index].gender_restrictions === null) {
      this.gender_restrictions = "0";
    } else {
      this.gender_restrictions =
        this.listCourse[this.index].gender_restrictions;
    }
  },

  watch: {
    gender_restrictions() {
      this.listCourse[this.index].gender_restrictions =
        this.gender_restrictions;
      localStorage.setItem("list-course", JSON.stringify(this.listCourse));
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

  computed: {
    ...mapState(sellerStore, ["imgCourseEdit"]),
  },

  methods: {
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    nextStep() {
      const hash_id = this.$route.query.hash_id;
      let listCourse = JSON.parse(localStorage.getItem("list-course"));
      if (listCourse.length > 0) {
        let lastCourse = listCourse[listCourse.length - 1];
        if (lastCourse.index === this.index) {
          this.$router.push(
            `/seller/service/service-course-draft/create?step=7&index=${this.index}&hash_id=${hash_id}`
          );
        } else {
          this.$router.push(
            `/seller/service/service-course-draft/create?step=1&index=${
              this.index + 1
            }&hash_id=${hash_id}`
          );
        }
      }
    },

    backStep() {
      const hash_id = this.$route.query.hash_id;
      this.$router.push(
        `/seller/service/service-course-draft/create?step=5&index=${this.index}&hash_id=${hash_id}`
      );
    },
  },
};
</script>

<style></style>
