<template>
  <div class="createService-step7">
    <SDPreLoad :preload="preload" />
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="
              createService-step7-left
              flex flex-column
              justify-content-between
            "
          >
            <div class="createService-step7-left-form">
              <div class="step-title">タグを付けて検索しやすくしましょう。</div>
              <div class="step7-form">
                <div class="form-label">タグ</div>
                <div class="step7-form-data relative">
                  <b-form-input
                    v-model.trim="hashtag"
                    placeholder="例）パスタ"
                    class="custom-input cursor-pointer"
                    v-on:keypress.enter="addHashtag"
                    v-on:click="showInputSearch"
                    @keyup.down="onArrowDown"
                    @keyup.up="onArrowUp"
                    @input="getHashtag($event)"
                  />
                  <div
                    class="list-data-search"
                    v-show="showModalSearch"
                    ref="scrollContainer"
                  >
                    <div
                      class="list-data-search-item cursor-pointer"
                      v-for="(item, index) in listTagRecommend"
                      :key="index"
                      ref="options"
                      :class="
                        dataActive == item ? 'list-data-search-item-active' : ''
                      "
                    >
                      <div
                        v-on:click="selectTitle(item)"
                        class="element-search"
                      >
                        {{ item }}
                      </div>
                    </div>
                  </div>
                  <div
                    :class="showModalSearch ? 'backdropStep7' : ''"
                    v-on:click="hideInputSearch()"
                  ></div>
                  <div class="validate-form" v-if="isEditDraftService">
                    <div class="list-hashtag flex flex-wrap" v-if="hasTagName">
                      <div
                        class="list-hashtag-item relative mb-[10px]"
                        v-for="(tag, index) in dataHashTagEdit"
                        :key="index"
                      >
                        {{ tag.name }}
                        <div
                          class="
                            absolute
                            list-hashtag-item-remove
                            flex
                            justify-center
                            items-center
                          "
                          v-on:click="
                            removeHashtagEdit(tag.name, tag.id, index)
                          "
                        >
                          <BootstrapIcon icon="dash" size="sm" />
                        </div>
                      </div>
                    </div>
                    <div v-else class="error-text">
                      {{ messageNoti.tag_length_required }}
                    </div>
                  </div>
                  <div class="validate-form" v-else>
                    <div class="list-hashtag flex flex-wrap" v-if="hasTagName">
                      <div
                        class="list-hashtag-item relative mb-[10px]"
                        v-for="(tag, index) in dataHashTag"
                        :key="index"
                      >
                        {{ tag }}
                        <div
                          class="
                            absolute
                            list-hashtag-item-remove
                            flex
                            justify-center
                            items-center
                          "
                          v-on:click="removeHashtag(index)"
                        >
                          <BootstrapIcon icon="dash" />
                        </div>
                      </div>
                    </div>
                    <div v-else class="error-text">
                      {{ messageNoti.tag_length_required }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="createService-step7-left-btn flex">
              <b-button
                v-on:click="backStep()"
                class="
                  btn-return
                  flex
                  justify-center
                  align-items-center
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
                  align-items-center
                  justify-center
                  btn-step-common
                "
              >
                次へ
              </b-button>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="createService-step7-right"></div></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { Message } from "@/utils/message";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import { ServiceStore } from "@/store/service/index.ts";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  name: "Step7",
  data() {
    return {
      hashtag: "",
      dataHashTag: [],
      dataEdit: [],
      index: null,
      hasTagName: true,
      messageNoti: Message.SELLER,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      isEditDraftService: false,
      listDelete: [],
      dataNew: [],
      listCourseService: [],
      dataHashTagEdit: [],
      listTagRecommend: [],
      showModalSearch: false,
      listResult: [],
      courseDraft: {},
      isCourseDraft: false,
      arrowCounter: -1,
      dataActive: "",
      listCourseCreate: [],
      listCourseData: {
        index: 0,
        name: "",
        price: 0,
        cycle: 1,
        age_confirm: 0,
        gender_restrictions: null,
        content: "",
        max: null,
        firstPr: 0,
        course_images: "",
        isUpdate: false,
        cycle_format: "",
        is_draft: 0,
      },
      preload: false,
    };
  },
  setup() {
    const toast = useToast();
    const serviceStore = ServiceStore();
    const store = sellerStore();

    return {
      toast,
      serviceStore,
      store,
    };
  },
  components: {
    BootstrapIcon,
    SDPreLoad
  },
  computed: {
    ...mapState(ServiceStore, ["detailService", "listCourse"]),
    ...mapState(sellerStore, ["listHashTag"]),
  },

  created() {
    let listCourseStorage = JSON.parse(localStorage.getItem("list-course"));
    if (listCourseStorage !== null && listCourseStorage.length > 0) {
      this.listCourseCreate = listCourseStorage;
    }
    let tag = JSON.parse(localStorage.getItem("data-step-7-init"));
    let tagEdit = JSON.parse(localStorage.getItem("data-step-7"));
    if (tagEdit !== null) {
      tag = tagEdit;
    }

    if (this.$route.query.hash_id !== undefined) {
      this.isEditDraftService = true;
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=1&hash_id=${hash_id}`);
      }
      this.preload = true
      const request = {
        hash_id: this.$route.query.hash_id,
        page: this.page,
      };
      this.serviceStore.getListCourseByHashId(request);
      
      if (tag !== null) {
        this.dataEdit = tag;
        if (tag.length > 0) {
          tag.map((item) => {
            this.dataHashTagEdit.push(item);
          });
        }
      } else {
        this.dataHashTagEdit = [];
      }
    } else {
      if (tag !== null) {
        tag.map((item) => {
          this.dataHashTag.push(item);
        });
      } else {
        this.dataHashTag = [];
      }
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        this.$router.push("/seller/service/create?step=1");
      }
    }
  },

  watch: {
    listHashTag() {
      this.listTagRecommend = [];
      this.listTagRecommend = this.listHashTag.map((item) => item.name);
    },

    listCourse() {
      this.preload = false
      this.listCourseService = this.listCourse.data;
      if (this.listCourseService.length > 0) {
        this.courseDraft =
          this.listCourseService[this.listCourseService.length - 1];
      }
      if (this.courseDraft.is_draft == 1) {
        this.isCourseDraft = true;
      } else {
        this.isCourseDraft = false;
      }
    },
  },

  mounted() {
    window.addEventListener("beforeunload", this.reloadPage, { capture: true });
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.reloadPage, {
      capture: true,
    });
  },

  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    getHashtag(event) {
      if (this.hashtag != "") {
        this.showModalSearch = true;
        this.store.getHashTagList(event);
      } else {
        this.listTagRecommend = [];
      }
    },
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    getListTagSuggest() {
      this.addHashtag();
    },

    addHashtag() {
      if (
        /^[\s\xA0\uFEFF\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]+|[\s\xA0\uFEFF\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]+$/g.test(
          this.hashtag
        )
      ) {
        // this.hashtag = this.hashtag.trim()
        this.toast.error(
          this.messageNoti.tag_has_white_space,
          this.optionToast
        );
        return false;
      }
      if (this.isEditDraftService) {
        if (this.hashtag.trim() !== "") {
          if (this.dataHashTagEdit.length > 0) {
            this.hasTagName = true;
            this.dataHashTag.includes(this.hashtag);
            const dataTest = [];
            this.dataHashTagEdit.map((item) => {
              dataTest.push(item.name);
            });
            if (!dataTest.includes(this.hashtag)) {
              this.hasTagName = true;
              this.dataHashTagEdit.push({ name: this.hashtag });
              this.hashtag = "";
            } else {
              this.toast.error(this.messageNoti.tag_is_exist, this.optionToast);
              return false;
            }
          } else {
            this.hasTagName = true;
            this.dataHashTagEdit.push({ name: this.hashtag });
            this.dataNew.push(this.hashtag);
            this.hashtag = "";
          }
          localStorage.setItem(
            "data-step-7",
            JSON.stringify(this.dataHashTagEdit)
          );
        }
      } else {
        if (this.hashtag.trim() !== "") {
          if (this.dataHashTag.length >= 1) {
            this.hasTagName = true;
            if (!this.dataHashTag.includes(this.hashtag)) {
              this.hasTagName = true;
              this.dataHashTag.push(this.hashtag);
              this.hashtag = "";
            } else {
              this.toast.error(this.messageNoti.tag_is_exist, this.optionToast);
              return false;
            }
          }

          if (this.dataHashTag.length === 0) {
            this.hasTagName = true;
            this.dataHashTag.push(this.hashtag);
            this.hashtag = "";
          }

          localStorage.setItem("data-step-7", JSON.stringify(this.dataHashTag));
        }
      }
      this.showModalSearch = false;
    },

    removeHashtag(index) {
      this.dataHashTag.splice(index, 1);
    },

    removeHashtagEdit(tag, id, index) {
      if (id !== undefined) {
        this.dataHashTagEdit.splice(index, 1);
        this.listDelete.push(tag);
      } else {
        this.dataHashTagEdit.splice(index, 1);
      }
      localStorage.setItem("listTagDelete", JSON.stringify(this.listDelete));
      localStorage.setItem("data-step-7", JSON.stringify(this.dataHashTagEdit));
    },

    nextStep() {
      if (this.isEditDraftService) {
        if (this.dataHashTagEdit.length > 0) {
          this.hasTagName = true;
        } else {
          this.hasTagName = false;
          return;
        }
        const hash_id = this.$route.query.hash_id;
        localStorage.setItem(
          "data-step-7",
          JSON.stringify(this.dataHashTagEdit)
        );
        localStorage.setItem("listTagDelete", JSON.stringify(this.listDelete));
        localStorage.setItem("lengthListCourse", this.listCourseService.length);
        if (this.listCourseService.length) {
          localStorage.setItem("isEditService", true);
          this.$router.push(
            `/seller/service/service-course-draft/list?hash_id=${hash_id}`
          );
        } else {
          this.listCourseData.is_draft = 1;
          if (this.listCourseCreate.length === 0) {
            this.listCourseCreate.push(this.listCourseData);
          }
          localStorage.setItem(
            "list-course",
            JSON.stringify(this.listCourseCreate)
          );
          this.$router.push(
            `/seller/service/service-course-draft/create?step=1&index=0&hash_id=${hash_id}`
          );
        }
      } else {
        if (this.dataHashTag.length > 0) {
          this.hasTagName = true;
        } else {
          this.hasTagName = false;
          return;
        }

        if (this.listCourseCreate.length === 0) {
          this.listCourseCreate.push(this.listCourseData);
        }
        localStorage.setItem("isEditService", false);
        localStorage.setItem("data-step-7", JSON.stringify(this.dataHashTag));
        localStorage.setItem(
          "list-course",
          JSON.stringify(this.listCourseCreate)
        );
        this.$router.push(
          "/seller/service/service-course/create?step=1&index=0"
        );
      }
    },

    backStep() {
      if (this.isEditDraftService) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=6&hash_id=${hash_id}`);
      } else {
        this.$router.push("/seller/service/create?step=6");
      }
    },

    showInputSearch() {
      this.showModalSearch = true;
    },

    hideInputSearch() {
      this.showModalSearch = false;
    },

    selectTitle(value) {
      this.hashtag = value;
      this.showModalSearch = false;
    },

    onArrowDown() {
      if (this.arrowCounter < this.listTagRecommend.length - 1) {
        this.arrowCounter = this.arrowCounter + 1;
        this.fixScrolling();
        this.keyword = this.listTagRecommend[this.arrowCounter];
        this.dataActive = this.listTagRecommend[this.arrowCounter];
        this.hashtag = this.keyword;
      }
    },

    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
        this.fixScrolling();
        this.keyword = this.listTagRecommend[this.arrowCounter];
        this.dataActive = this.listTagRecommend[this.arrowCounter];
        this.hashtag = this.keyword;
      }
    },

    fixScrolling() {
      const liH = this.$refs.options[this.arrowCounter].clientHeight;
      this.$refs.scrollContainer.scrollTop = liH * this.arrowCounter;
    },

    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.listDataSearch = false;
        this.arrowCounter = -1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.error-text {
  color: red;
  margin-top: 10px;
}
.list-data-search {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  box-shadow: 0px 0px 6px #44444333;
  z-index: 1001;
  &-item {
    padding: 10px 20px;
    background: $white;
    cursor: pointer;
    &:hover {
      color: $orange;
    }
    &-active {
      background: #f5f5f5;
      color: $orange;
      font-weight: 600;
    }
  }
}
.list-data-search::-webkit-scrollbar {
  display: none;
}
.backdropStep7 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
</style>
