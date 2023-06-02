<template>
  <div class="editService-step7">
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="editService-step7-left flex flex-col justify-between">
            <div class="editService-step7-left-form">
              <div class="d-flex">
                <div class="step-title">初月無料にしますか？</div>
                <span class="mt-4 step-note text-danger">※</span>
              </div>
              <div class="form-label">
                初月無料とした場合、2回目からの請求となります。
              </div>
              <div class="step7-form">
                <div class="step7-form-data">
                  <b-form-radio-group
                    v-model="firstPr"
                    :options="options"
                    stacked
                    class="w-full form-raido-custom"
                  ></b-form-radio-group>
                </div>
              </div>
            </div>
            <div class="editService-step7-left-btn">
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
              editService-step7-right
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
export default {
  name: "Step7",

  data() {
    return {
      firstPr: "0",
      options: [
        { text: "しない", value: "0" },
        { text: "する", value: "1" },
      ],
      queryData: null,
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
  },

  watch: {
    firstPr() {
      this.listCourse[this.index].firstPr = this.firstPr;
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

  methods: {
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    nextStep() {
      const hash_id = this.$route.query.hash_id;
      this.$router.push(
        `/seller/service/service-course-draft/create?step=5&index=${this.index}&hash_id=${hash_id}`
      );
    },

    backStep() {
      const hash_id = this.$route.query.hash_id;
      this.$router.push(
        `/seller/service/service-course-draft/create?step=3&index=${this.index}&hash_id=${hash_id}`
      );
    },
  },
};
</script>

<style></style>
