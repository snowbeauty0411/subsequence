<template>
  <div class="createService-step5">
    <b-container fluid class="position-relative">
      <b-row
        ><b-col cols="12" lg="6" class="g-0">
          <div class="createService-step5-left flex flex-col justify-between">
            <div class="createService-step5-left-form">
              <div class="step-title">そのサービスのキャッチコピーは？</div>
              <div class="step-description">
                ページで最上部に表示されます。ユーザーが最初に目にする大切な部分。とっておきのフレーズを届けましょう。
              </div>
              <div class="step5-form">
                <div class="d-flex">
                  <div class="form-label">キャッチコピー</div>
                  <span class="ml-3 mt-[-6px] text-danger step-note">※</span>
                </div>
                <div class="relative validate-form">
                  <b-form-textarea
                    id="textarea-rows"
                    placeholder="ここに説明文が入ります。"
                    rows="3"
                    maxlength="50"
                    v-bind:change="onChangeTextarea()"
                    v-model.trim="v$.catchCopy.$model"
                    v-bind:class="{ 'is-invalid': v$.catchCopy.$error }"
                  ></b-form-textarea>
                  <div v-if="v$.catchCopy.$error" class="error-text">
                    <p v-if="v$.catchCopy.required.$invalid">
                      {{ message.catch_copy_required }}
                    </p>
                  </div>
                </div>
                <div class="description-textarea">残り{{ remaining }}文字</div>
                <div class="step5-form-data mt-2">
                  <div class="form-label">画像を追加しましょう。</div>
                  <div class="data-image flex w-full">
                    <div class="data-image-left w-1/2 relative">
                      <b-overlay :show="loadingImg1">
                        <label for="img1" class="w-full">
                          <div
                            class="data-image-left-item relative"
                            :class="
                              url1 == null ? 'cursor-pointer' : 'cursor-default'
                            "
                          >
                            <img
                              src="@/assets/images/iconCamera.png"
                              alt=""
                              class="absolute img-icon"
                              v-if="!url1 && !loadingImg1"
                            />
                            <img
                              :src="url1"
                              alt=""
                              class="absolute img-main"
                              v-else
                            />
                          </div>
                        </label>
                        <input
                          type="file"
                          class="hidden"
                          id="img1"
                          accept="image/png, .jpeg, .jpg"
                          @change="onFileChangeImg1($event)"
                          :disabled="url1"
                          ref="fileUpload1"
                        />
                        <img
                          src="@/assets/images/iconTrash.png"
                          alt=""
                          v-if="url1"
                          class="absolute img-trash"
                          v-on:click="removeImage(url1, 0)"
                        />
                      </b-overlay>
                    </div>
                    <div
                      class="
                        data-image-right
                        w-1/2
                        flex flex-col
                        justify-content-between
                      "
                    >
                      <div
                        class="
                          data-image-right-list
                          flex
                          w-full
                          justify-between
                        "
                      >
                        <div class="w-1/2 relative data-image-right-list1">
                          <b-overlay :show="loadingImg2">
                            <label for="img2" class="w-full">
                              <div class="data-image-right-list-item relative">
                                <img
                                  src="@/assets/images/iconCamera.png"
                                  alt=""
                                  class="absolute img-icon"
                                  v-if="!url2"
                                />
                                <img
                                  :src="url2"
                                  alt=""
                                  class="absolute img-main"
                                  v-else
                                />
                              </div>
                            </label>
                            <input
                              type="file"
                              class="hidden"
                              id="img2"
                              accept="image/png, .jpeg, .jpg"
                              @change="onFileChangeImg2($event)"
                              ref="fileUpload2"
                            />
                            <img
                              src="@/assets/images/iconTrash.png"
                              alt=""
                              v-if="url2"
                              class="absolute img-trash"
                              v-on:click="removeImage(url2, 1)"
                            />
                          </b-overlay>
                        </div>

                        <div class="w-1/2 relative data-image-right-list1">
                          <b-overlay :show="loadingImg3">
                            <label for="img3" class="w-full">
                              <div class="data-image-right-list-item relative">
                                <img
                                  src="@/assets/images/iconCamera.png"
                                  alt=""
                                  class="absolute img-icon"
                                  v-if="!url3"
                                />
                                <img
                                  :src="url3"
                                  alt=""
                                  class="absolute img-main"
                                  v-else
                                />
                              </div>
                            </label>
                            <input
                              type="file"
                              class="hidden"
                              id="img3"
                              accept="image/png, .jpeg, .jpg"
                              @change="onFileChangeImg3($event)"
                              ref="fileUpload3"
                            />
                            <img
                              src="@/assets/images/iconTrash.png"
                              alt=""
                              v-if="url3"
                              class="absolute img-trash"
                              v-on:click="removeImage(url3, 2)"
                            />
                          </b-overlay>
                        </div>
                      </div>
                      <div
                        class="
                          data-image-right-list
                          flex
                          w-full
                          justify-between
                        "
                      >
                        <div class="w-1/2 relative data-image-right-list1">
                          <b-overlay :show="loadingImg4">
                            <label for="img4" class="w-full">
                              <div class="data-image-right-list-item relative">
                                <img
                                  src="@/assets/images/iconCamera.png"
                                  alt=""
                                  class="absolute img-icon"
                                  v-if="!url4"
                                />
                                <img
                                  :src="url4"
                                  alt=""
                                  class="absolute img-main"
                                  v-else
                                />
                              </div>
                            </label>
                            <input
                              type="file"
                              class="hidden"
                              id="img4"
                              accept="image/png, .jpeg, .jpg"
                              @change="onFileChangeImg4($event)"
                              ref="fileUpload4"
                            />
                            <img
                              src="@/assets/images/iconTrash.png"
                              alt=""
                              v-if="url4"
                              class="absolute img-trash"
                              v-on:click="removeImage(url4, 3)"
                            />
                          </b-overlay>
                        </div>

                        <div class="w-1/2 relative data-image-right-list1">
                          <b-overlay :show="loadingImg5">
                            <label for="img5" class="w-full">
                              <div class="data-image-right-list-item relative">
                                <img
                                  src="@/assets/images/iconCamera.png"
                                  alt=""
                                  class="absolute img-icon"
                                  v-if="!url5"
                                />
                                <img
                                  :src="url5"
                                  alt=""
                                  class="absolute img-main"
                                  v-else
                                />
                              </div>
                            </label>
                            <input
                              type="file"
                              class="hidden"
                              id="img5"
                              accept="image/png, .jpeg, .jpg"
                              @change="onFileChangeImg5($event)"
                              ref="fileUpload5"
                            />
                            <img
                              src="@/assets/images/iconTrash.png"
                              alt=""
                              v-if="url5"
                              class="absolute img-trash"
                              v-on:click="removeImage(url5, 4)"
                            />
                          </b-overlay>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                createService-step5-footer
                col col-12 col-lg-6
                g-0
                position-absolute
              "
            >
              <div class="createService-step5-left-btn">
                <div
                  class="text-danger"
                  style="padding: 0 22px; margin-bottom: 20px"
                  v-if="!isMobile()"
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
            </div>
          </div> </b-col
        ><b-col cols="12" lg="6" class="g-0">
          <div class="createService-step5-right flex flex-col items-center">
            <div class="createService-step5-right-title text-white">
              プレビュー preview
            </div>
            <div class="createService-step5-right-content">
              <div class="py-4">
                <div class="form-label white-space">{{ catchCopy }}</div>
              </div>
              <div class="data-image flex w-full">
                <div class="data-image-left w-1/2">
                  <div class="data-image-left-item relative">
                    <img
                      src="@/assets/images/iconCamera.png"
                      alt=""
                      class="absolute img-icon"
                      v-if="!url1"
                    />
                    <img :src="url1" alt="" class="absolute img-main" v-else />
                  </div>
                </div>
                <div
                  class="
                    data-image-right
                    w-1/2
                    flex flex-col
                    justify-content-between
                  "
                >
                  <div
                    class="data-image-right-list flex w-full justify-between"
                  >
                    <div class="data-image-right-list-item relative">
                      <img
                        src="@/assets/images/iconCamera.png"
                        alt=""
                        class="absolute img-icon"
                        v-if="!url2"
                      />
                      <img
                        :src="url2"
                        alt=""
                        class="absolute img-main"
                        v-else
                      />
                    </div>
                    <div class="data-image-right-list-item relative">
                      <img
                        src="@/assets/images/iconCamera.png"
                        alt=""
                        class="absolute img-icon"
                        v-if="!url3"
                      />
                      <img
                        :src="url3"
                        alt=""
                        class="absolute img-main"
                        v-else
                      />
                    </div>
                  </div>
                  <div
                    class="data-image-right-list flex w-full justify-between"
                  >
                    <div class="data-image-right-list-item relative">
                      <img
                        src="@/assets/images/iconCamera.png"
                        alt=""
                        class="absolute img-icon"
                        v-if="!url4"
                      />
                      <img
                        :src="url4"
                        alt=""
                        class="absolute img-main"
                        v-else
                      />
                    </div>
                    <div class="data-image-right-list-item relative">
                      <img
                        src="@/assets/images/iconCamera.png"
                        alt=""
                        class="absolute img-icon"
                        v-if="!url5"
                      />
                      <img
                        :src="url5"
                        alt=""
                        class="absolute img-main"
                        v-else
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="text-danger"
              style="margin-bottom: 15px"
              v-if="isMobile()"
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
          </div>
        </b-col></b-row
      ></b-container
    >
  </div>
</template>

<script>
import { required, minLength } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import useVuelidate from "@vuelidate/core";
import { useToast } from "vue-toastification";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";

export default {
  setup() {
    const v$ = useVuelidate();
    const toast = useToast();
    const store = sellerStore();
    return {
      v$,
      toast,
      store,
    };
  },
  name: "Step5",
  data() {
    return {
      message: Message.SELLER,
      catchCopy: "",
      remaining: 50,
      url1: null,
      url2: null,
      url3: null,
      url4: null,
      url5: null,
      file: null,
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      dataImage: [],
      checkImgList: [],
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      isEditDraftService: false,
      imageDraftService: false,
      loadingImg1: false,
      loadingImg2: false,
      loadingImg3: false,
      loadingImg4: false,
      loadingImg5: false,
      listImgStorage: [],
    };
  },

  created() {
    let catchCopy = localStorage.getItem("data-step-5-catchCopy");
    if (catchCopy === null) {
      this.catchCopy = "";
    } else {
      this.catchCopy = catchCopy;
    }
    if (this.store.listFiles.length > 0) {
      this.store.listFiles.map((item, index) => {
        if (item.file !== null) {
          if (item.status !== undefined) {
            if (item.status == 1) {
              if (typeof item.file === "object") {
                this["url" + (index + 1)] = URL.createObjectURL(
                  this.base64toBlob(item.file)
                );
              } else {
                this["url" + (index + 1)] = URL.createObjectURL(item.file);
              }
            }
          } else {
            // if (item.file.includes("data:image")) {
            //   this["url" + (index + 1)] = URL.createObjectURL(this.base64toBlob(item.file));
            // } else {
            this["url" + (index + 1)] = URL.createObjectURL(item.file);
            // }
          }
        }
      });
      this.checkImgList = this.store.listFiles;
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

    let imageDraftService = JSON.parse(
      localStorage.getItem("imageDraftService")
    );
    if (imageDraftService != null) {
      if (this.store.listFiles.length > 0) {
        this.checkImgList = this.store.listFiles;
      } else {
        this.checkImgList = imageDraftService;
        this.listImgStorage = imageDraftService;
      }
      if (this.checkImgList.length > 0) {
        this.checkImgList.map((item, index) => {
          if (item.file != null) {
            if (item.status == 0) {
              if (typeof item.file === "object") {
                this["url" + (index + 1)] = URL.createObjectURL(
                  this.base64toBlob(item.file)
                );
              } else {
                this["url" + (index + 1)] = item.file;
              }
            } else {
              if (typeof item.file === "object") {
                this["url" + (index + 1)] = URL.createObjectURL(
                  this.base64toBlob(item.file)
                );
              }
            }
          }
        });
      }
      this.imageDraftService = true;
    }
  },

  beforeUpdate() {
    this.isMobile()
  },

  watch: {
    catchCopy() {
      if (this.catchCopy != "") {
        localStorage.setItem("data-step-5-catchCopy", this.catchCopy);
      }
    },

    checkImgList() {
      if (this.isEditDraftService) {
        this.store.setFiles(this.checkImgList);
      }
    },
  },

  computed: {
    ...mapState(sellerStore, ["listFiles"]),
  },

  validations: {
    catchCopy: { required, minLength: minLength(1) },
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
    isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    },
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    onChangeTextarea() {
      this.remaining = 50 - this.catchCopy.length;
    },

    onFileChangeImg1(e) {
      if (this.url1 == null) {
        if (e.target.files[0].size / 1024 / 1024 > 10) {
          this.toast.error(this.message.max_size_image, this.optionToast);
        } else {
          this.loadingImg1 = true;
          setTimeout(() => {
            this.loadingImg1 = false;
            this.file = e.target.files[0];
            if (this.isEditDraftService) {
              this.uploadImg(this.file, e);
            } else {
              this.url1 = URL.createObjectURL(this.file);
              if (this.checkImgList.length == 0) {
                this.checkImgList.push({ index: 1, file: this.file });
              } else {
                this.checkImgList.splice(0, 1);
                this.checkImgList.push({ index: 1, file: this.file });
              }
            }
          }, 1000);
          localStorage.setItem(
            "data-step-5-image",
            JSON.stringify(this.listImgStorage)
          );
          this.store.setFiles(this.checkImgList);
        }
      }
    },

    onFileChangeImg2(e) {
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.toast.error(this.message.max_size_image, this.optionToast);
      } else {
        if (this.url1 == null) {
          this.loadingImg1 = true;
        } else {
          this.loadingImg2 = true;
        }
        setTimeout(() => {
          if (this.url1 == null) {
            this.loadingImg1 = false;
          } else {
            this.loadingImg2 = false;
          }
          this.file1 = e.target.files[0];
          if (this.isEditDraftService) {
            this.uploadImg(this.file1, e);
          } else {
            this.file1 = e.target.files[0];
            if (this.url1 === null) {
              this.url1 = URL.createObjectURL(this.file1);
              this.checkImgList.push({ index: 1, file: this.file1 });
            } else {
              this.url2 = URL.createObjectURL(this.file1);
              if (
                this.checkImgList.length > 1 &&
                this.checkImgList[1] === undefined
              ) {
                this.checkImgList.push({ index: 2, file: this.file1 });
              } else {
                this.checkImgList.splice(1, 1);
                this.checkImgList.push({ index: 2, file: this.file1 });
              }
            }
          }
        }, 1000);
        this.store.setFiles(this.checkImgList);
        localStorage.setItem(
          "data-step-5-image",
          JSON.stringify(this.listImgStorage)
        );
      }
    },

    onFileChangeImg3(e) {
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.toast.error(this.message.max_size_image, this.optionToast);
      } else {
        if (this.url1 == null) {
          this.loadingImg1 = true;
        } else if (this.url2 == null) {
          this.loadingImg2 = true;
        } else {
          this.loadingImg3 = true;
        }
        setTimeout(() => {
          if (this.url1 == null) {
            this.loadingImg1 = false;
          } else if (this.url2 == null) {
            this.loadingImg2 = false;
          } else {
            this.loadingImg3 = false;
          }
          this.file2 = e.target.files[0];
          if (this.isEditDraftService) {
            this.uploadImg(this.file2, e);
          } else {
            if (this.url1 === null) {
              this.url1 = URL.createObjectURL(this.file2);
              this.checkImgList.push({ index: 1, file: this.file2 });
            } else if (this.url2 === null) {
              this.url2 = URL.createObjectURL(this.file2);
              this.checkImgList.push({ index: 2, file: this.file2 });
            } else {
              this.url3 = URL.createObjectURL(this.file2);
              if (
                this.checkImgList.length > 2 &&
                this.checkImgList[2] === undefined
              ) {
                this.checkImgList.push({ index: 3, file: this.file2 });
              } else {
                this.checkImgList.splice(2, 1);
                this.checkImgList.push({ index: 3, file: this.file2 });
              }
            }
          }
        }, 1000);
        this.store.setFiles(this.checkImgList);
        localStorage.setItem(
          "data-step-5-image",
          JSON.stringify(this.listImgStorage)
        );
      }
    },

    onFileChangeImg4(e) {
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.toast.error(this.message.max_size_image, this.optionToast);
      } else {
        if (this.url1 == null) {
          this.loadingImg1 = true;
        } else if (this.url2 == null) {
          this.loadingImg2 = true;
        } else if (this.url3 == null) {
          this.loadingImg3 = true;
        } else {
          this.loadingImg4 = true;
        }
        setTimeout(() => {
          if (this.url1 == null) {
            this.loadingImg1 = false;
          } else if (this.url2 == null) {
            this.loadingImg2 = false;
          } else if (this.url3 == null) {
            this.loadingImg3 = false;
          } else {
            this.loadingImg4 = false;
          }
          this.file3 = e.target.files[0];
          if (this.isEditDraftService) {
            this.uploadImg(this.file3, e);
          } else {
            if (this.url1 === null) {
              this.url1 = URL.createObjectURL(this.file3);
              this.checkImgList.push({ index: 1, file: this.file3 });
            } else if (this.url2 === null) {
              this.url2 = URL.createObjectURL(this.file3);
              this.checkImgList.push({ index: 2, file: this.file3 });
            } else if (this.url3 === null) {
              this.url3 = URL.createObjectURL(this.file3);
              this.checkImgList.push({ index: 3, file: this.file3 });
            } else {
              this.url4 = URL.createObjectURL(this.file3);
              if (
                this.checkImgList.length > 3 &&
                this.checkImgList[3] === undefined
              ) {
                this.checkImgList.push({ index: 4, file: this.file3 });
              } else {
                this.checkImgList.splice(3, 1);
                this.checkImgList.push({ index: 4, file: this.file3 });
              }
            }
          }
        }, 1000);

        this.store.setFiles(this.checkImgList);

        localStorage.setItem(
          "data-step-5-image",
          JSON.stringify(this.listImgStorage)
        );
      }
    },

    onFileChangeImg5(e) {
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.toast.error(this.message.max_size_image, this.optionToast);
      } else {
        if (this.url1 == null) {
          this.loadingImg1 = true;
        } else if (this.url2 == null) {
          this.loadingImg2 = true;
        } else if (this.url3 == null) {
          this.loadingImg3 = true;
        } else if (this.url4 == null) {
          this.loadingImg4 = true;
        } else {
          this.loadingImg5 = true;
        }
        setTimeout(() => {
          if (this.url1 == null) {
            this.loadingImg1 = false;
          } else if (this.url2 == null) {
            this.loadingImg2 = false;
          } else if (this.url3 == null) {
            this.loadingImg3 = false;
          } else if (this.url4 == null) {
            this.loadingImg4 = false;
          } else {
            this.loadingImg5 = false;
          }
          this.file4 = e.target.files[0];
          if (this.isEditDraftService) {
            this.uploadImg(this.file4, e);
          } else {
            if (this.url1 === null) {
              this.url1 = URL.createObjectURL(this.file4);
              this.checkImgList.push({ index: 1, file: this.file4 });
            } else if (this.url2 === null) {
              this.url2 = URL.createObjectURL(this.file4);
              this.checkImgList.push({ index: 2, file: this.file4 });
            } else if (this.url3 === null) {
              this.url3 = URL.createObjectURL(this.file4);
              this.checkImgList.push({ index: 3, file: this.file4 });
            } else if (this.url4 === null) {
              this.url4 = URL.createObjectURL(this.file4);
              this.checkImgList.push({ index: 4, file: this.file4 });
            } else {
              this.url5 = URL.createObjectURL(this.file4);
              if (
                this.checkImgList.length > 4 &&
                this.checkImgList[4] === undefined
              ) {
                this.checkImgList.splice(4, 1);
                this.checkImgList.push({ index: 5, file: this.file4 });
              } else {
                this.checkImgList.splice(4, 1);
                this.checkImgList.push({ index: 5, file: this.file4 });
              }
            }
          }
        }, 1000);

        this.store.setFiles(this.checkImgList);
        localStorage.setItem(
          "data-step-5-image",
          JSON.stringify(this.listImgStorage)
        );
      }
    },

    checkListImg(fileImg, index, e) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      if (
        this.checkImgList[index] &&
        this.checkImgList[index].id !== undefined
      ) {
        this.checkImgList.splice(index, 1, {
          id: this.checkImgList[index].id,
          status: 1,
          file: fileImg,
        });
        fileReader.onload = (fileLoadedEvent) => {
          this.listImgStorage.splice(index, 1, {
            id: this.checkImgList[index].id,
            status: 1,
            file: fileLoadedEvent.target.result,
          });
        };
      } else {
        this.checkImgList.splice(index, 1, {
          status: 1,
          file: fileImg,
        });
        fileReader.onload = (fileLoadedEvent) => {
          this.listImgStorage.splice(index, 1, {
            status: 1,
            file: fileLoadedEvent.target.result,
          });
        };
      }
    },

    uploadImg(fileImg, e) {
      if (this.url1 === null || this.url1 === "") {
        this.url1 = URL.createObjectURL(fileImg);
        this.checkListImg(fileImg, 0, e);
      } else if (this.url2 === null || this.url2 === "") {
        this.url2 = URL.createObjectURL(fileImg);
        this.checkListImg(fileImg, 1, e);
      } else if (this.url3 === null || this.url3 === "") {
        this.url3 = URL.createObjectURL(fileImg);
        this.checkListImg(fileImg, 2, e);
      } else if (this.url4 === null || this.url4 === "") {
        this.url4 = URL.createObjectURL(fileImg);
        this.checkListImg(fileImg, 3, e);
      } else {
        this.url5 = URL.createObjectURL(fileImg);
        this.checkListImg(fileImg, 4, e);
      }
    },

    base64toBlob(dataurl) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let newFile = new File([u8arr], {
        type: mime,
      });
      return newFile;
    },

    async nextStep() {
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        var checkImg = false;
        this.checkImgList.forEach((item) => {
          if (item.file && (item.file != null || item.file != "")) {
            checkImg = true;
          }
        });
        if (!checkImg) {
          this.toast.error(this.message.image_minlength, this.optionToast);
        } else {
          if (this.isEditDraftService) {
            localStorage.setItem("data-step-5-catchCopy", this.catchCopy);
            this.store.setFiles(this.checkImgList);
            localStorage.setItem(
              "data-step-5-image",
              JSON.stringify(this.listImgStorage)
            );
            const hash_id = this.$route.query.hash_id;
            this.$router.push(
              `/seller/service/create?step=6&hash_id=${hash_id}`
            );
          } else {
            localStorage.setItem("data-step-5-catchCopy", this.catchCopy);
            this.store.setFiles(this.checkImgList);
            localStorage.setItem(
              "data-step-5-image",
              JSON.stringify(this.listImgStorage)
            );
            this.$router.push("/seller/service/create?step=6");
          }
        }
      }
    },

    removeImage(value, indexValue) {
      if (!this.isEditDraftService) {
        if (this.url1 == value) {
          this.url1 = null;
          this.file = null;
          this.checkImgList.splice(0, 1);
          this.listImgStorage.splice(0, 1);
          this.dataImage.splice(0, 1);
          this.$refs.fileUpload1.value = null;
        } else if (this.url2 == value) {
          this.url2 = null;
          this.file1 = null;
          this.checkImgList.splice(1, 1);
          this.listImgStorage.splice(1, 1);
          this.dataImage.splice(1, 1);
          this.$refs.fileUpload2.value = null;
        } else if (this.url3 == value) {
          this.url3 = null;
          this.file2 = null;
          this.checkImgList.splice(2, 1);
          this.listImgStorage.splice(2, 1);
          this.dataImage.splice(2, 1);
          this.$refs.fileUpload3.value = null;
        } else if (this.url4 == value) {
          this.url4 = null;
          this.file3 = null;
          this.checkImgList.splice(3, 1);
          this.listImgStorage.splice(3, 1);
          this.dataImage.splice(3, 1);
          this.$refs.fileUpload4.value = null;
        } else {
          this.url5 = null;
          this.file4 = null;
          this.checkImgList.splice(4, 1);
          this.listImgStorage.splice(4, 1);
          this.dataImage.splice(4, 1);
          this.$refs.fileUpload5.value = null;
        }
      } else {
        this.checkImgList.map((item, index) => {
          if (item.status === 0) {
            if (item.file === value) {
              item.file = "";
              item.status = 1;
              if (index == 0) {
                this.url1 = null;
                this.dataImage.splice(0, 1);
                this.$refs.fileUpload1.value = null;
              } else if (index == 1) {
                this.url2 = null;
                this.dataImage.splice(1, 1);
                this.$refs.fileUpload2.value = null;
              } else if (index == 2) {
                this.url3 = null;
                this.dataImage.splice(2, 1);
                this.$refs.fileUpload3.value = null;
              } else if (index == 3) {
                this.url4 = null;
                this.dataImage.splice(3, 1);
                this.$refs.fileUpload4.value = null;
              } else if (index == 4) {
                this.url5 = null;
                this.dataImage.splice(4, 1);
                this.$refs.fileUpload5.value = null;
              }
            }
          } else {
            if (indexValue == index) {
              item.file = "";
            }
            if (indexValue == 0) {
              this.url1 = null;
              this.dataImage.splice(0, 1);
              this.$refs.fileUpload1.value = null;
            } else if (indexValue == 1) {
              this.url2 = null;
              this.dataImage.splice(1, 1);
              this.$refs.fileUpload2.value = null;
            } else if (indexValue == 2) {
              this.url3 = null;
              this.dataImage.splice(2, 1);
              this.$refs.fileUpload3.value = null;
            } else if (indexValue == 3) {
              this.url4 = null;
              this.dataImage.splice(3, 1);
              this.$refs.fileUpload4.value = null;
            } else if (indexValue == 4) {
              this.url5 = null;
              this.dataImage.splice(4, 1);
              this.$refs.fileUpload5.value = null;
            }
          }
        });
      }
      this.store.setFiles(this.checkImgList);
      localStorage.setItem(
        "data-step-5-image",
        JSON.stringify(this.listImgStorage)
      );
    },

    backStep() {
      if (this.isEditDraftService) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=4&hash_id=${hash_id}`);
      } else {
        this.$router.push("/seller/service/create?step=4");
      }
    },
  },
};
</script>

<style>
.white-space {
  white-space: pre-wrap;
}
</style>
