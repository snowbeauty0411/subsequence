<template>
  <div class="createService-step3">
    <b-container fluid>
      <b-row>
        <b-col cols="12" lg="6" class="g-0">
          <div class="createService-step3-left flex flex-col justify-between">
            <div class="createService-step3-left-form">
              <div class="step-title">
                サービスを提供できるエリアはどこですか？
              </div>
              <div class="step-description">
                複数のエリアを選択できます。サービスの提供が全国で可能な場合は「全国」を選択しましょう。
              </div>
              <div class="step3-form" v-if="!isLoading">
                <div class="form-label">対象エリア</div>
                <div class="step3-form-data">
                  <div class="step3-checkbox py-2 px-5">
                    <b-form-checkbox
                      v-model="checkNational"
                      name="checkNational"
                      :value="true"
                      :nchecked-value="false"
                      class="form-checkbox-custom"
                      v-on:change="checkAll(checkNational)"
                      >全国</b-form-checkbox
                    >
                  </div>
                  <div
                    class="step3-checkbox flex flex-col border-top-0"
                    v-for="(item, index) in listAreas"
                    :key="index"
                  >
                    <div class="flex justify-between items-center py-2 px-5">
                      <b-form-checkbox
                        v-model="checkAreas"
                        :value="Number(item.value)"
                        :nchecked-value="null"
                        class="form-checkbox-custom"
                        v-on:change="checkAreaValue(item, Number(item.value))"
                      >
                        {{ item.name }}
                      </b-form-checkbox>
                      <SDIcon
                        v-if="item.value !== 1"
                        icon="caret-down-fill"
                        class="form-select-customs cursor-pointer"
                        v-on:click="openSelect(index)"
                        :class="
                          isActive.findIndex((item) => item === index) !== -1
                            ? 'closeS'
                            : 'openS'
                        "
                      />
                    </div>
                    <div
                      class="openSelect py-2 px-5 grid grid-cols-3 gap-3"
                      :class="
                        isActive.findIndex((item) => item === index) !== -1
                          ? 'block'
                          : 'hidden'
                      "
                      v-if="item.prefectures.length > 1"
                    >
                      <div
                        class=""
                        v-for="(items, index) in item.prefectures"
                        v-bind:key="index"
                      >
                        <b-form-checkbox
                          v-model="checkListPrefectures"
                          :value="Number(items.id)"
                          :nchecked-value="null"
                          class="form-checkbox-custom"
                          v-on:change="
                            checkPrefectureValue(
                              item.prefectures,
                              item.value,
                              items.id
                            )
                          "
                          >{{ items.name }}</b-form-checkbox
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="createService-step3-left-btn flex">
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
          </div>
        </b-col>
        <b-col cols="12" lg="6" class="g-0">
          <div class="createService-step3-right"></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import SDIcon from "../../../components/SDIcon";
import { Message } from "@/utils/message";

export default {
  name: "Step3",
  components: {
    SDIcon,
  },
  setup() {
    const store = sellerStore();
    const toast = useToast();
    return {
      store,
      toast,
    };
  },
  data() {
    return {
      checkNational: false,
      listAreas: [],
      listSubAreas: [],
      checkAreas: [],
      listData: [],
      checkListPrefectures: [],
      isActive: [],
      checkAllFlag: false,
      amountAreas: null,
      isFull: [],
      listClick: [],
      listPre: [],
      messageNoti: Message.SELLER,
      isArea: false,
      isLoading: false,
      isEditDraftService: false,
    };
  },

  computed: {
    ...mapState(sellerStore, ["success", "message", "error", "listArea"]),
  },

  created() {
    this.store.getListArea();
    let listSubAreas = JSON.parse(localStorage.getItem("data-step-area_id-3"));
    if (listSubAreas !== null) {
      this.listSubAreas = listSubAreas;
    }
    let isFull = JSON.parse(localStorage.getItem("isFull"));
    if (isFull !== null) {
      this.isFull = isFull;
    }
    let listClick = JSON.parse(localStorage.getItem("listClick"));
    if (listClick !== null) {
      this.listClick = listClick;
    }
    let isActive = JSON.parse(localStorage.getItem("isActive"));
    if (isActive !== null) {
      this.isActive = isActive;
    }
    let checkNational = localStorage.getItem("checkNational");
    if (checkNational == "true") {
      this.checkNational = true;
    } else {
      this.checkNational = false;
    }
    let checkAllFlag = localStorage.getItem("checkAllFlag");
    if (checkAllFlag == "true") {
      this.checkAllFlag = true;
    } else {
      this.checkAllFlag = false;
    }
    let checkListPrefectures = JSON.parse(
      localStorage.getItem("checkListPrefectures")
    );
    if (checkListPrefectures !== null) {
      this.checkListPrefectures = checkListPrefectures;
    }
    let checkAreas = JSON.parse(localStorage.getItem("checkAreas"));
    if (checkAreas !== null) {
      this.checkAreas = checkAreas;
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

  mounted() {
    // localStorage.removeItem("data-step-area_id-3");
    window.addEventListener("beforeunload", this.reloadPage, { capture: true });
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.reloadPage, {
      capture: true,
    });
  },

  watch: {
    listArea() {
      this.isLoading = true;
      this.listAreas = this.listArea.map((item) => ({
        name: item.name,
        value: item.id,
        prefectures: item.prefectures,
      }));

      this.listSubAreas = this.listArea.map((item) => ({
        area_id: item.id,
        list: [],
      }));

      this.amountAreas = this.listAreas.length;
      this.isLoading = false;
    },

    checkAreas() {
      localStorage.setItem("checkAreas", JSON.stringify(this.checkAreas));
      localStorage.setItem("isFull", JSON.stringify(this.isFull));
      localStorage.setItem("checkNational", this.checkNational);
      localStorage.setItem("checkAllFlag", this.checkAllFlag);
      localStorage.setItem(
        "data-step-area_id-3",
        JSON.stringify(this.listSubAreas)
      );
    },

    checkListPrefectures() {
      localStorage.setItem(
        "checkListPrefectures",
        JSON.stringify(this.checkListPrefectures)
      );

      localStorage.setItem(
        "data-step-area_id-3",
        JSON.stringify(this.listSubAreas)
      );
    },
  },

  methods: {
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    checkAll(value) {
      this.checkListPrefectures = [];
      if (value) {
        this.checkAllFlag = true;
        this.listSubAreas.map((item) => {
          item.list = [];
        });
        if (this.checkAreas.length > 0) {
          this.checkAreas = [];
          this.listAreas.map((item) => {
            this.checkAreas.push(item.value);
          });
        } else {
          this.listAreas.map((item) => {
            this.checkAreas.push(item.value);
            this.listClick.push(item.value);
            this.isFull.push(item.value);
          });
        }
        this.listSubAreas.map((item) => {
          this.listAreas.map((item1) => {
            item1.prefectures.map((item2) => {
              if (item.area_id === item2.area_id) {
                item.list.push(item2.id);
              }
            });
          });
        });
        for (let i = 1; i <= this.listAreas.length; i++) {
          const listPre = this.listAreas[i];
          if (listPre) {
            let j = i + 1;
            this.checkAreaValue(listPre, j);
          }
        }
      } else {
        this.listSubAreas.map((item) => {
          item.list = [];
        });
        this.listClick = [];
        this.isFull = [];
        this.checkAreas = [];
        this.checkListPrefectures = [];
        this.checkAllFlag = false;
      }
    },

    checkAreaValue(items, index) {
      let prefectures = items.prefectures;
      const checkValue = this.listClick.findIndex((item) => item === index);
      const idValue = index;
      if (this.checkAllFlag) {
        for (let i = 0; i < prefectures.length; i++) {
          if (items.value === prefectures[i].area_id) {
            let indexPre = this.checkListPrefectures.indexOf(prefectures[i].id);
            if (indexPre > -1) {
              this.checkListPrefectures.splice(indexPre, 1);
            } else {
              this.checkListPrefectures.push(prefectures[i].id);
            }
          }
        }
      } else {
        if (this.isFull.includes(index)) {
          prefectures.map((itemPre) => {
            const indexPre = this.checkListPrefectures.indexOf(itemPre.id);
            if (indexPre > -1) {
              this.checkListPrefectures.splice(indexPre, 1);
            }
          });
        } else {
          for (let i = 0; i < prefectures.length; i++) {
            if (!this.checkListPrefectures.includes(prefectures[i].id)) {
              this.checkListPrefectures.push(prefectures[i].id);
            }
          }
        }

        const indexArea = this.listSubAreas.findIndex(
          (item) => item.area_id === index
        );

        if (
          this.listSubAreas[indexArea].list.length > 0 &&
          this.listSubAreas[indexArea].list.length == items.prefectures.length
        ) {
          this.listClick.splice(checkValue, 1);
          this.listSubAreas[indexArea].list = [];
        } else {
          this.listClick.push(index);
          this.listSubAreas.map((item) => {
            if (idValue === item.area_id && !item.list.includes(index)) {
              for (let i = 0; i < prefectures.length; i++) {
                if (!item.list.includes(prefectures[i].id)) {
                  item.list.push(prefectures[i].id);
                }
              }
            }
          });
        }
      }
      const valueFull = this.isFull.findIndex((element) => element === index);
      if (valueFull !== -1) {
        this.isFull.splice(valueFull, 1);
      } else {
        this.isFull.push(index);
      }
      if (this.checkAreas.length < this.amountAreas) {
        this.checkNational = false;
        this.checkAllFlag = false;
      } else {
        this.checkNational = true;
        this.checkAllFlag = true;
      }
    },

    checkPrefectureValue(prefectures, index, id) {
      const listA = prefectures.map((item) => item.id);
      const isEx = (element) => (element = id);
      const index3 = listA.findIndex(isEx);
      const index4 = this.listSubAreas.includes(id);
      if (index3 > -1 && !index4) {
        this.listSubAreas.map((item) => {
          if (item.area_id === index) {
            if (!item.list.includes(id)) {
              item.list.push(id);
            } else {
              const index5 = item.list.indexOf(id);
              if (index5 > -1) {
                item.list.splice(index5, 1);
              }
            }
            if (item.list.length === prefectures.length) {
              if (!this.checkAreas.includes(index)) {
                this.checkAreas.push(index);
                this.isFull.push(index);
                this.listClick.push(index);
              }
            } else {
              const indexIsFull = this.isFull.indexOf(index);
              const indexCheckAreas = this.checkAreas.indexOf(index);
              const indexListClick = this.listClick.indexOf(index);
              if (indexIsFull > -1) {
                this.isFull.splice(indexIsFull, 1);
              }
              if (indexCheckAreas > -1) {
                this.checkAreas.splice(indexCheckAreas, 1);
              }
              if (indexListClick > -1) {
                this.listClick.splice(indexListClick, 1);
              }
            }
          }
        });
      }

      if (this.isFull.length === 8) {
        this.checkNational = true;
        this.checkAllFlag = true;
      } else {
        this.checkNational = false;
        this.checkAllFlag = false;
      }
    },

    nextStep() {
      this.listSubAreas = JSON.parse(
        localStorage.getItem("data-step-area_id-3")
      );
      this.listSubAreas.map((item) => {
        if (item.list.length > 0) {
          this.isArea = true;
        }
      });

      if (this.isArea) {
        if (this.isEditDraftService) {
          localStorage.setItem(
            "data-step-area_id-3",
            JSON.stringify(this.listSubAreas)
          );

          localStorage.setItem("isFull", JSON.stringify(this.isFull));
          localStorage.setItem("isActive", JSON.stringify(this.isActive));
          localStorage.setItem("checkNational", this.checkNational);
          localStorage.setItem(
            "checkListPrefectures",
            JSON.stringify(this.checkListPrefectures)
          );
          localStorage.setItem("checkAreas", JSON.stringify(this.checkAreas));
          localStorage.setItem("listClick", JSON.stringify(this.listClick));

          localStorage.setItem("checkAllFlag", this.checkAllFlag);
          const hash_id = this.$route.query.hash_id;

          this.$router.push(`/seller/service/create?step=4&hash_id=${hash_id}`);
          this.isArea = false;
        } else {
          localStorage.setItem(
            "data-step-area_id-3",
            JSON.stringify(this.listSubAreas)
          );
          const listAreaStep11 = [];
          this.listSubAreas.map((item) => {
            if (item.list.length > 0) {
              if (item.area_id === 1) {
                listAreaStep11.push("北海道");
              } else if (item.area_id === 2) {
                listAreaStep11.push("東北");
              } else if (item.area_id === 3) {
                listAreaStep11.push("関東");
              } else if (item.area_id === 4) {
                listAreaStep11.push("中部");
              } else if (item.area_id === 5) {
                listAreaStep11.push("関西");
              } else if (item.area_id === 6) {
                listAreaStep11.push("中国");
              } else if (item.area_id === 7) {
                listAreaStep11.push("四国");
              } else if (item.area_id === 8) {
                listAreaStep11.push("九州");
              }
            }
          });
          localStorage.setItem(
            "listAreaStep11",
            JSON.stringify(listAreaStep11)
          );
          localStorage.setItem("isFull", JSON.stringify(this.isFull));
          localStorage.setItem("listClick", JSON.stringify(this.listClick));
          localStorage.setItem("isActive", JSON.stringify(this.isActive));
          localStorage.setItem("checkNational", this.checkNational);
          localStorage.setItem(
            "checkListPrefectures",
            JSON.stringify(this.checkListPrefectures)
          );
          localStorage.setItem("checkAreas", JSON.stringify(this.checkAreas));

          localStorage.setItem("checkAllFlag", this.checkAllFlag);

          this.$router.push("/seller/service/create?step=4");
          this.isArea = false;
        }
      } else {
        this.toast.error(this.messageNoti.area_is_required, this.optionToast);
      }
    },

    backStep() {
      if (this.isEditDraftService) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=2&hash_id=${hash_id}`);
      } else {
        this.$router.push("/seller/service/create?step=2");
      }
    },

    openSelect(index) {
      const checkValue = this.isActive.findIndex((item) => item === index);
      if (checkValue !== -1) {
        this.isActive.splice(checkValue, 1);
      } else {
        this.isActive.push(index);
      }
    },
  },
};
</script>

<style></style>
