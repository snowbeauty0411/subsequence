<template>
  <div class="editService">
    <Header />
    <div class="editService-main w-full">
      <div class="form-cource">
            <div class="my-3">
              <div
                v-if="preloadList"
                class="sd-preloads flex justify-center items-center"
              >
                <div class="snippet" data-title=".dot-flashing">
                  <div class="stage">
                    <div class="dot-flashing"></div>
                  </div>
                </div>
              </div>
              <div class="form-label">料金プラン</div>
              <div
                class="item-content flex mb-[20px] relative"
                v-for="(item, index) in listCourseService"
                :key="index"
              >
                <div
                  class="absolute btn-remove-step"
                  v-on:click="removeCourse(item.course_id, item.is_use_course)"
                  style="left: -40px; top: 50%; transform: translateY(-50%)"
                >
                  <img src="@/assets/images/iconMinus.png" alt="" />
                </div>
                <img
                  v-if="item.is_use_course == 0"
                  :src="imgPen"
                  alt=""
                  class="absolute imgPen"
                  v-on:click="editCourse(item)"
                />
                <div
                  class="item-content-left"
                  :style="'background-image: url(' + item.course_images + ')'"
                ></div>
                <div class="item-content-right flex">
                  <div>
                    <BootstrapIcon
                      icon="check"
                      size="2x"
                      style="color: #5e5c5c"
                      class="mx-2"
                    />
                  </div>
                  <div class="flex flex-col w-full justify-between">
                    <div class="flex flex-col">
                      <div class="courseName">{{ item.name }}</div>
                      <div class="courseDescription">
                        {{ item.content }}
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <div
                        class="textPrice flex justify-end"
                        v-if="serviceDetail.service_type_id === 1"
                      >
                        (送料・税込)
                      </div>
                      <div class="textPrice flex justify-end" v-else>
                        (税込)
                      </div>
                      <div class="coursePrice flex justify-end">
                        {{ formatPrice(parseInt(item.price)) }}/月
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="item-content flex mb-[20px] relative"
                v-for="(item, index) in listCourseNew"
                :key="index"
              >
                <div
                  class="absolute btn-remove-step"
                  v-on:click="removeCourseNew(index)"
                  style="left: -40px; top: 50%; transform: translateY(-50%)"
                >
                  <img src="@/assets/images/iconMinus.png" alt="" />
                </div>
                <img :src="imgPen" alt="" class="absolute imgPen" />
                <div
                  class="item-content-left"
                  :style="'background-image: url(' + listImageEdit[index] + ')'"
                ></div>
                <div class="item-content-right flex">
                  <div>
                    <BootstrapIcon
                      icon="check"
                      size="2x"
                      style="color: #5e5c5c"
                      class="mx-2"
                    />
                  </div>
                  <div class="flex flex-col w-full justify-between">
                    <div class="flex flex-col">
                      <div class="courseName">{{ item.course_name }}</div>
                      <div class="courseDescription">
                        {{ item.course_content }}
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <div
                        class="textPrice flex justify-end"
                        v-if="serviceDetail.service_type_id === 1"
                      >
                        (送料・税込)
                      </div>
                      <div class="textPrice flex justify-end" v-else>
                        (税込)
                      </div>
                      <div class="coursePrice flex justify-end">
                        {{ formatPrice(parseInt(item.course_price)) }}/月
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="btn-add-step flex items-center mt-3"
                v-on:click="addCourse()"
              >
                <img src="@/assets/images/iconAdd.png" alt="" />
                <div class="btn-add-step-text mx-2">プランを追加する</div>
              </div>
              <SDPagination
                v-if="totalPage > 1"
                :totalpage="totalPage"
                :currentPage="currentPage"
                v-on:update-page="updatePage"
              />
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../../components/service/create/Header.vue";
import { mapState } from "pinia";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { ServiceStore } from "@/store/service/index.ts";

export default {
  name: "CreateService",
  setup() {
    useHead({
      // title: computed(() => `${route.meta.title}`)
      title: computed(() => `subsQ - サブスクマッチングサービスのサブスキュー`),
    });
    const serviceStore = ServiceStore();

    return {
      serviceStore,
    };
  },
  data() {
    return {
      listCourseService: [],
      courseDraft: [],
    };
  },
  components: {
    Header,
    BootstrapIcon
  },
  computed: {
    ...mapState(ServiceStore, ["listCourse"]),
  },
  watch: {
    listCourse() {
      this.listCourseService = this.listCourse.data;
    },
  },
  created() {
    if (this.$route.query.hash_id !== undefined) {
      const request = {
        hash_id: this.$route.query.hash_id,
        page: this.page,
      };
      this.serviceStore.getListCourseByHashId(request);
    }
  },
};
</script>