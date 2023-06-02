<template>
  <div class="editService-step4">
    <b-container fluid class="position-relative"
      ><b-row
        ><b-col cols="12" xl="6" class="g-0"
          ><div
            class="editService-step4-left h-full flex flex-col justify-between"
          >
            <div class="editService-step4-left-form">
              <div class="d-flex">
                <div class="step-title">
                  サービスの料金コースを設定していきましょう。
                </div>
                <span class="mt-4 step-note text-danger">※</span>
              </div>
              <div class="step4-form">
                <div class="form-label">料金コース名</div>
                <div class="relative validate-form">
                  <b-form-input
                    v-model.trim="v$.courseName.$model"
                    placeholder="コース名"
                    class="custom-input"
                    maxlength="50"
                    v-bind:class="{ 'is-invalid': v$.courseName.$error }"
                    v-bind:change="onChangeInput()"
                  />
                  <div class="description-textarea text-end">
                    残り{{ remaining }}文字
                  </div>
                  <div v-if="v$.courseName.$error" class="error-text">
                    <p v-if="v$.courseName.required.$invalid">
                      {{ message.course_name_required }}
                    </p>
                    <p v-if="v$.courseName.maxLength.$invalid">
                      {{ message.course_name_maxlength }}
                    </p>
                    <p v-if="v$.courseName.minLength.$invalid">
                      {{ message.course_name_minlength }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="step-title mt-4">画像を追加しましょう。</div>
              <div class="data-image-left w-1/2 relative">
                <b-overlay :show="loadingImg">
                  <label for="img1" class="w-full">
                    <div
                      class="data-image-left-item relative"
                      :class="url == null ? 'cursor-pointer' : 'cursor-default'"
                    >
                      <img
                        src="@/assets/images/iconCamera.png"
                        alt=""
                        class="absolute img-icon"
                        v-if="!url"
                      />
                      <img :src="url" alt="" class="absolute img-main" v-else />
                    </div>
                  </label>
                  <input
                    type="file"
                    class="hidden"
                    id="img1"
                    @change="onFileChangeImg1"
                    accept="image/png, .jpeg, .jpg"
                    :disabled="url"
                  />
                  <img
                    src="@/assets/images/iconTrash.png"
                    alt=""
                    v-if="url"
                    class="absolute img-trash"
                    v-on:click="removeImage()"
                  />
                </b-overlay>
              </div>
            </div>
            <div
              class="
                editService-step4-footer
                col col-12 col-xl-6
                g-0
                position-absolute
              "
            >
              <div class="editService-step4-left-btn">
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
            </div>
          </div></b-col
        ><b-col cols="12" xl="6" class="g-0"
          ><div
            class="editService-step4-right flex flex-col items-center h-full"
          >
            <div
              class="editService-step4-right-title text-white flex items-end"
            >
              プレビュー <span class="mx-2">preview</span>
            </div>
            <div
              class="
                editService-step4-right-content
                flex
                items-center
                justify-center
              "
            >
              <div class="item-content flex w-full">
                <div
                  class="item-content-left relative mb-[50px]"
                  :style="'background-image: url(' + url + ')'"
                >
                  <img
                    src="@/assets/images/iconCamera.png"
                    alt=""
                    class="absolute img-icon"
                    style="
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    "
                    v-if="!url"
                  />
                </div>
                <div class="item-content-right flex">
                  <div class="w-[50px]">
                    <BootstrapIcon
                      icon="check"
                      size="2x"
                      style="color: #5e5c5c"
                      class="mx-2"
                    />
                  </div>
                  <div
                    class="flex flex-col w-full justify-between"
                    style="width: calc(100% - 50px)"
                  >
                    <div class="flex flex-col">
                      <div class="courseName">{{ courseName }}</div>
                      <div
                        class="courseDescription white-space"
                        style="overflow: hidden"
                      >
                        {{ courseContent }}
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <div class="textPrice flex justify-end">(送料・税込)</div>
                      <div class="coursePrice flex justify-end items-baseline">
                        {{ formatPrice(parseInt(coursePrice)) }} /<span
                          class="text-[18px]"
                        >
                          {{
                            cycle === 0
                              ? "月"
                              : cycle === 1
                              ? "月"
                              : cycle + "ヶ月"
                          }}</span
                        >
                      </div>
                      <div
                        class="
                          btn-buy
                          flex
                          items-center
                          w-full
                          justify-center
                          py-2
                        "
                      >
                        <BootstrapIcon
                          icon="cart"
                          size="sm"
                          class="mx-2"
                        /><span>サブスクする</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></b-col
        ></b-row
      ></b-container
    >
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { Message } from "@/utils/message";
import { useToast } from "vue-toastification";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
  setup() {
    const toast = useToast();
    const store = sellerStore();
    const v$ = useVuelidate();
    return {
      toast,
      store,
      v$,
    };
  },

  name: "Step1Course",

  data() {
    return {
      remaining: 50,
      courseName: "",
      url: null,
      message: Message.SELLER,
      queryData: null,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      dataImageCourse: [],
      coursePrice: 0,
      courseContent: "",
      dataEditServise: [],
      cycle: 1,
      isEditDraftService: false,
      amountCourse: 0,
      loadingImg: false,
      listCourse: [],
      imageCourseDraft: {},
      detailCourse: {},
      isEditServiceOnly: "",
      isEditService: "",
      copyCourse: "",
      detailCopyCourse1: {},
      index: 0,
    };
  },

  validations: {
    courseName: {
      required,
      maxLength: maxLength(50),
      minLength: minLength(1),
    },
  },

  created() {
    let serviceName = localStorage.getItem("data-step-1");
    let typeSelected = localStorage.getItem("data-step-4");
    localStorage.setItem("typeSelected", typeSelected);
    if (serviceName == null) {
      this.$router.push("/seller/service/create?step=1");
      return;
    }
    this.queryData = Number(this.$route.query.step);
    this.index = Number(this.$route.query.index);
    this.listCourse = JSON.parse(localStorage.getItem("list-course"));
    this.courseName = this.listCourse[this.index].name;
    this.cycle = this.listCourse[this.index].cycle;
    if (this.listCourse[this.index].price === null) {
      this.coursePrice = 0;
    } else {
      this.coursePrice = this.listCourse[this.index].price;
    }
    this.courseContent = this.listCourse[this.index].content;
    if (this.store.listImgCourse.length > 0) {
      this.store.listImgCourse.forEach((item, index) => {
        if (this.index === index) {
          this.url = URL.createObjectURL(item.file);
        }
      });
    }
  },

  watch: {
    "$route.query.step"() {
      this.queryData = Number(this.$route.query.step);
    },

    courseName() {
      this.listCourse[this.index].name = this.courseName;
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
    ...mapState(sellerStore, [
      "imgCourseService",
      "imgCourseEdit",
      "listCourse",
    ]),
  },

  components: {
    BootstrapIcon,
  },

  methods: {
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    formatPrice(value) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
    },

    removeImage() {
      this.url = null;
      for (let i = 0; i < this.store.listImgCourse.length; i++) {
        if (this.index === this.store.listImgCourse[i].index) {
          this.store.listImgCourse[i].file = "";
        }
      }
    },

    onFileChangeImg1(e) {
      if (this.url == null) {
        if (e.target.files[0].size / 1024 / 1024 > 10) {
          this.toast.error(this.message.max_size_image, this.optionToast);
        } else {
          this.loadingImg = true;
          setTimeout(() => {
            this.loadingImg = false;
            const file1 = e.target.files[0];
            this.url = URL.createObjectURL(file1);
            if (this.store.listImgCourse.length > 0) {
              // for (let i = 0; i < this.store.listImgCourse.length; i++) {
              if (
                this.store.listImgCourse[this.index] &&
                this.index === this.store.listImgCourse[this.index].index
              ) {
                this.store.listImgCourse[this.index].file = file1;
              } else {
                let fileImg = {
                  index: this.index,
                  file: file1,
                };
                this.store.setImageCourseService(fileImg);
              }
              // }
            } else {
              let fileImg = {
                index: this.index,
                file: file1,
              };
              this.store.setImageCourseService(fileImg);
            }
          }, 1000);
        }
      }
    },

    async nextStep() {
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        if (this.url == null) {
          this.toast.error(this.message.image_required, this.optionToast);
        } else {
          this.$router.push(
            `/seller/service/service-course/create?step=2&index=${this.index}`
          );
        }
      }
    },

    backStep() {
      const hash_id = this.$route.query.hash_id;
      if (this.index === 0) {
        if (hash_id !== undefined) {
          this.$router.push(`/seller/service/create?step=7&hash_id=${hash_id}`);
        } else {
          this.$router.push(`/seller/service/create?step=7`);
        }
      } else {
        this.$router.push(
          `/seller/service/service-course/create?step=6&index=${this.index - 1}`
        );
      }
    },

    onChangeInput() {
      if (this.courseName != null) {
        this.remaining = 50 - this.courseName.length;
      }
    },
  },
};
</script>

<style></style>
