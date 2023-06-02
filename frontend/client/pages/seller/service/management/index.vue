<template>
  <NuxtLayout name="seller">
    <div class="seller-service flex flex-col">
      <SDPreLoad :preload="preload" />
      <div class="seller-service-content">
        <div class="seller-service-content-title flex items-end">
          <div class="title-main">サービス管理</div>
          <div class="title-description">Service management</div>
        </div>

        <div class="list-by-created">
          <div class="list-by-created-header flex justify-between items-center w-full">
            <div class="flex items-center">
              <div class="amount" v-if="dataServiceSelling.data">
                {{ totalSelling }}
              </div>
              <div class="text-name">出品サービス</div>
            </div>
            <div
              class="flex justify-center items-center text-[#E79C3A] cursor-pointer"
              v-on:click="redirectSupport()"
            >
              <img src="@/assets/images/messageIcon.png" alt="" class="mx-2" />
              <div class="font-semibold">出品のサポートを依頼する</div>
            </div>
          </div>
          <div
            v-if="preloadListSelling"
            class="sd-preloads flex justify-center items-center"
          >
            <div class="snippet" data-title=".dot-flashing">
              <div class="stage">
                <div class="dot-flashing"></div>
              </div>
            </div>
          </div>
          <div class="list-by-created-list w-full">
            <b-row>
              <b-col cols="6" lg="3"
                ><div
                  class="list-by-created-list-item flex flex-col"
                  v-on:click="redirectToCreatePage"
                >
                  <div class="item-add relative">
                    <div class="absolute icon-add">
                      <div class="icon-add-img flex justify-center">
                        <img src="@/assets/images/iconAdd.png" alt="" />
                      </div>
                      <div class="icon-add-text">サービスを追加</div>
                    </div>
                  </div>
                </div></b-col
              >
              <b-col
                cols="6"
                lg="3"
                v-for="(item, index) in dataServiceSelling.data"
                :key="index"
              >
                <div class="list-by-created-list-item flex flex-col">
                  <Nuxt-Link :to="`/seller/service/service-manage/${item.hash_id}`">
                    <div
                      class="item-img relative"
                      :style="'background-image: url(' + item.images[0] + ')'"
                    >
                      <!-- <img
                        :src="
                          item.images.length === 0 ? imgDefault : item.images[0]
                        "
                        :alt="item.name"
                      /> -->
                      <div class="absolute service-draft" v-if="item.enabled === 0">
                        審査中
                      </div>
                    </div>
                  </Nuxt-Link>

                  <div class="item-text flex flex-col">
                    <div class="item-text-top">{{ item.name }}</div>
                    <div class="item-text-bottom">
                      {{ item.seller.business_name }}
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="flex justify-center">
            <SDPagination
              v-if="totalPageSelling > 1"
              :totalpage="totalPageSelling"
              :currentPage="currentPageSelling"
              v-on:update-page="updatePageSelling"
            />
          </div>
        </div>

        <div class="list-by-favorites" v-if="totalCreate > 0">
          <div class="list-by-favorites-header flex items-center w-full">
            <div class="amount">{{ totalCreate }}</div>
            <div class="text-name">作成中のサービス</div>
          </div>
          <div
            v-if="preloadListCreating"
            class="sd-preloads flex justify-center items-center"
          >
            <div class="snippet" data-title=".dot-flashing">
              <div class="stage">
                <div class="dot-flashing"></div>
              </div>
            </div>
          </div>
          <div class="list-by-favorites-list w-full">
            <b-row>
              <b-col
                cols="6"
                lg="3"
                v-for="(item, index) in dataServiceCreate.data"
                :key="index"
              >
                <div class="list-by-favorites-list-item flex flex-col relative">
                  <div
                    class="absolute icon-delete flex justify-center items-center"
                    v-on:click="showModal(item.id)"
                  >
                    <img src="@/assets/images/iconTrash.png" alt="" />
                  </div>
                  <Nuxt-Link
                    :to="`/seller/service/create?step=1&hash_id=${item.hash_id}`"
                  >
                    <div
                      class="item-img flex justify-center items-center"
                      v-if="item.images.length === 0"
                      :style="'background-image: url(' + noImage + ')'"
                    ></div>
                    <div
                      class="item-img"
                      :style="'background-image: url(' + item.images[0] + ')'"
                      v-else
                    ></div>
                  </Nuxt-Link>

                  <div class="item-text flex flex-col">
                    <div class="item-text-top">{{ item.name }}</div>
                    <div class="item-text-bottom">
                      {{ item.seller.business_name }}
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="flex justify-center">
            <SDPagination
              v-if="totalPageCreating > 1"
              :totalpage="totalPageCreating"
              :currentPage="currentPageCreating"
              v-on:update-page="updatePageCreating"
            />
          </div>
        </div>

        <div
          class="list-by-comment flex flex-col items-center"
          v-if="dataComment.length > 0"
        >
          <div
            v-if="preloadListComment"
            class="sd-preloads flex justify-center items-center"
          >
            <div class="snippet" data-title=".dot-flashing">
              <div class="stage">
                <div class="dot-flashing"></div>
              </div>
            </div>
          </div>
          <div class="list-by-comment-header flex items-center w-full">
            <div class="text-name">レビュー評価一覧</div>
          </div>
          <div class="list-by-comment-list mt-16 mb-20 w-full flex flex-col">
            <div
              class="item-comment flex w-100 flex-col items-end"
              v-for="(item, index) in dataComment"
              :key="index"
            >
              <div class="item-comment-top flex w-full">
                <img
                  :src="item.service.images[0] ? item.service.images[0] : imgDefault"
                  alt=""
                  class="item-comment-top-image"
                />
                <div class="item-comment-top-text flex justify-between">
                  <div class="text-left flex flex-col">
                    <div class="text-left-top">
                      {{ item.service.service_content }}
                    </div>
                    <div class="text-left-bottom my-2">
                      {{ item.service.name }}
                    </div>
                  </div>
                  <div
                    class="text-right"
                    v-if="item.is_active_seller === 0 && item.seller_reply"
                  >
                    <b-button class="custom-button">承認待ち</b-button>
                  </div>
                  <div class="text-right" v-else-if="!item.seller_reply">
                    <b-button
                      v-on:click="
                        editComment({
                          buyer_id: item.buyer.account_id,
                          service_hash_id: item.service.hash_id,
                        })
                      "
                      >返信する</b-button
                    >
                  </div>
                </div>
              </div>
              <div class="item-comment-bottom flex flex-col">
                <div class="comment-first w-100 flex flex-col">
                  <div class="comment-first-header flex justify-between">
                    <div class="avatar flex">
                      <div class="avatar-image">
                        <img
                          :src="
                            item.buyer.profile_image_url_buy
                              ? item.buyer.profile_image_url_buyer
                              : avatarDefault
                          "
                          alt=""
                        />
                      </div>
                      <div class="avatar-star flex flex-col justify-center">
                        <div class="list-star flex my-2">
                          <img
                            :src="star"
                            alt=""
                            class="list-star-item"
                            v-if="item.rating > 0"
                          />
                          <img
                            :src="star"
                            alt=""
                            class="list-star-item"
                            v-if="item.rating > 1"
                          />
                          <img
                            :src="star"
                            alt=""
                            class="list-star-item"
                            v-if="item.rating > 2"
                          />
                          <img
                            :src="star"
                            alt=""
                            class="list-star-item"
                            v-if="item.rating > 3"
                          />
                          <img
                            :src="star"
                            alt=""
                            class="list-star-item"
                            v-if="item.rating > 4"
                          />
                        </div>
                        <div class="seller-name">
                          {{ item.buyer.account_name }}
                        </div>
                      </div>
                    </div>
                    <div class="time">
                      {{
                        item.updated_at
                          ? $moment(item.updated_at).format("YYYY-MM-DD HH:mm")
                          : ""
                      }}
                    </div>
                  </div>
                  <div class="comment-first-mid my-2">
                    <div
                      v-if="item.description"
                      v-html="replaceText(item.description)"
                    ></div>
                  </div>
                  <div class="comment-first-footer flex w-full">
                    <img
                      :src="item.images[0].path"
                      v-if="item.images[0]"
                      class="mr-[20px]"
                    />
                    <img
                      :src="item.images[1].path"
                      v-if="item.images[1]"
                      class="mr-[20px]"
                    />
                    <img
                      :src="item.images[2].path"
                      v-if="item.images[2]"
                      class="mr-[20px]"
                    />
                    <img :src="item.images[3].path" v-if="item.images[3]" />
                  </div>
                </div>
                <div
                  class="comment-reply flex flex-col"
                  v-if="item.seller_reply && item.is_active_seller === 1"
                >
                  <div class="comment-reply-top flex justify-between items-center">
                    <div class="avatar flex items-center">
                      <div class="avatar-image">
                        <img
                          :src="
                            item.seller.profile_image_url_sell !== null
                              ? item.seller.profile_image_url_seller
                              : avatarDefault
                          "
                          alt=""
                        />
                      </div>
                      <div class="avatar-text">
                        {{
                          item.seller.account_name !== null
                            ? item.seller.account_name
                            : "-"
                        }}
                      </div>
                    </div>
                    <div class="edit">
                      <SDIcon
                        icon="pencil"
                        class="mr-3 cursor-pointer"
                        v-on:click="
                          editComment({
                            buyer_id: item.buyer.account_id,
                            service_hash_id: item.service.hash_id,
                          })
                        "
                        size="lg"
                      />
                    </div>
                  </div>
                  <div class="comment-reply-bottom">
                    <div
                      v-if="item.seller_reply"
                      v-html="replaceText(item.seller_reply)"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="list-by-comment-bottom flex justify-center w-full">
              <SDPagination
                v-if="totalComment > 1"
                :totalpage="totalComment"
                :currentPage="currentPageComment"
                v-on:update-page="updatePageComment"
              />
            </div>
          </div>
        </div>
        <b-modal
          v-model="showModalConfirm"
          hide-footer
          id="modal-confirm-delete"
          title="削除すると、元に戻せませんがよろしいですか？"
          ><div class="modal-confirm">
            <div class="flex justify-around">
              <button class="bg-red-500 text-[#fff]" v-on:click="deleteDraftService()">
                はい</button
              ><button class="bg-gray-400 text-[#fff]" @click="showModalConfirm = false">
                いいえ
              </button>
            </div>
          </div></b-modal
        >
        <b-modal id="modal-review-service" v-model="modalReview" hide-footer>
          <div>
            <div class="flex justify-around">
              <div class="modal-review-right flex h-full">
                <div class="flex">
                  <div class="modal-review-right-title">
                    おつかれさまでした！
                    <br />あなたの素晴らしいサービスが <br />完成しました。
                  </div>
                </div>
                <div
                  class="modal-review-right-img mt-5"
                  :style="'background-image: url(' + bgStep11 + ')'"
                ></div>
              </div>
            </div>
            <div class="flex justify-center mt-2 mb-2">
              <button
                class="bg-orange-400 text-[#fff] flex btn-review"
                @click="showModalDetail"
              >
                <img class="mr-2" src="@/assets/images/iconEye.png" alt="" />
                完成したページをみてみる
              </button>
            </div>
          </div>
        </b-modal>
        <b-modal
          id="modal-review-service-detail"
          v-model="modalReviewDetail"
          hide-footer
          size="xl"
        >
          <div class="page-service w-full">
            <Header />
            <ContentService />
            <RatePlan />
            <FlowService />
            <Map />
            <CommentService />
          </div>
        </b-modal>
      </div></div
  ></NuxtLayout>
</template>

<script>
import { useToast } from "vue-toastification";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import imgDefault from "@/assets/images/detail1.png";
import noImage from "@/assets/images/noImage.png";
import avatarDefault from "@/assets/images/ellipse.png";
import star from "@/assets/images/star1.png";
import Cookies from "js-cookie";
import iconArrowRight from "@/assets/images/iconArrowRight.png";
import SDIcon from "@/components/SDIcon";
import SDPreLoad from "@/components/SDPreLoad";
import SDPagination from "@/components/SDPagination";
import { ServiceStore } from "@/store/service/index.ts";
import bgStep11 from "@/assets/images/bgStep11.png";
import ContentService from "@/components/service/detail/ContentService";
import Header from "@/components/service/detail/Header";
import RatePlan from "@/components/service/detail/RatePlan";
import FlowService from "@/components/service/detail/FlowService";
import Map from "@/components/service/detail/Map";
import CommentService from "@/components/service/detail/CommentService";
import RecommendService from "@/components/service/detail/RecommendService";
import LinkService from "@/components/service/detail/LinkService";
export default {
  name: "PageService",
  setup() {
    const store = sellerStore();
    const toast = useToast();
    const serviceStore = ServiceStore();

    return {
      store,
      toast,
      serviceStore,
    };
  },
  data() {
    return {
      account_id: null,
      serviceCreate: [],
      totalCreate: 0,
      totalSelling: 0,
      imgDefault,
      listServiceCreate: [],
      iconArrowRight,
      dataComment: [],
      preload: true,
      preloadListSelling: false,
      preloadListCreating: false,
      preloadListComment: false,
      avatarDefault,
      star,
      totalComment: null,
      currentPageSelling: 1,
      totalPageSelling: 1,
      totalPageCreating: 1,
      currentPageCreating: 1,
      showModalConfirm: false,
      idDraft: null,
      currentPageComment: 1,
      statusIdentity: false,
      noImage,
      totalApprove: 0,
      approvedList: [],
      modalReview: false,
      modalReviewDetail: false,
      bgStep11,
    };
  },
  components: {
    SDIcon,
    SDPreLoad,
    SDPagination,
    ContentService,
    Header,
    RatePlan,
    FlowService,
    Map,
    CommentService,
    RecommendService,
    LinkService,
  },
  created() {
    this.clearData();
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }
    const request = {
      seller_id: Number(this.account_id),
      is_draft: 1,
      sort_type: 2,
      per_page: 8,
    };
    this.store.getServiceCreating(request);

    this.store.getServiceSelling({
      seller_id: Number(this.account_id),
      is_draft: 0,
      sort_type: 2,
      per_page: 7,
      page: 1,
    });
    localStorage.removeItem("data-reply");
    this.viewDefaultComment();
    const dataRequest = {
      seller_id: this.account_id,
    };
    this.store.getListServiceApproved(dataRequest);
  },
  computed: {
    ...mapState(sellerStore, [
      "dataServiceCreate",
      "dataServiceSelling",
      "listComment",
      "dataAccount",
      "listApproved",
    ]),
    ...mapState(ServiceStore, ["success", "message", "error", "successDelete"]),
  },
  watch: {
    dataServiceCreate() {
      this.preloadListCreating = false;
      this.preload = true;
      if (this.dataServiceCreate.data.length > 0) {
        this.serviceCreate = this.dataServiceCreate.data;
        this.totalCreate = this.dataServiceCreate.total;
        this.totalPageCreating = this.dataServiceCreate.last_page;
        this.currentPageCreating = this.dataServiceCreate.current_page;
      }
      this.preload = false;
    },

    dataServiceSelling() {
      this.preloadListSelling = false;
      this.preload = true;
      let createSuccessFlag = localStorage.getItem("createServiceSuccessful");

      if (createSuccessFlag && createSuccessFlag === "true") {
        this.modalReview = true;
        localStorage.removeItem("createServiceSuccessful");
      }
      if (this.dataServiceSelling.total > 0) {
        this.totalSelling = this.dataServiceSelling.total;
        this.totalPageSelling = this.dataServiceSelling.last_page;
        this.currentPageSelling = this.dataServiceSelling.current_page;
      }
      this.preload = false;
    },

    listComment() {
      this.preloadListComment = false;
      this.preload = true;
      this.dataComment = this.listComment.data;
      this.totalComment = this.listComment.last_page;
      this.preload = false;
    },

    success() {
      if (this.serviceStore.success === true) {
        this.toast.success(this.serviceStore.message, this.optionToast);
        this.serviceStore.success = "";
        this.serviceStore.message = "";
        this.$router.push("/seller/account");
      }
    },

    error() {
      if (this.serviceStore.error === true) {
        this.toast.error(this.serviceStore.message, this.optionToast);
        this.serviceStore.error = "";
        this.serviceStore.message = "";
      }
    },

    successDelete() {
      if (this.serviceStore.successDelete === true) {
        this.toast.success(this.serviceStore.message, this.optionToast);
        this.serviceStore.successDelete = "";
        this.serviceStore.message = "";
        const request = {
          seller_id: Number(this.account_id),
          is_draft: 1,
          sort_type: 2,
          per_page: 8,
        };
        this.store.getServiceCreating(request);
      }
    },

    dataAccount() {
      if (
        this.dataAccount.identity_verification_status === 1 ||
        this.dataAccount.identity_verification_status === 3
      ) {
        this.statusIdentity = false;
      } else if (this.dataAccount.identity_verification_status === 2) {
        this.statusIdentity = false;
      } else if (this.dataAccount.identity_verification_status === 4) {
        this.statusIdentity = true;
      }
    },

    listApproved() {
      this.approvedList = this.listApproved;
    },
  },
  methods: {
    redirectToCreatePage() {
      if (this.statusIdentity) {
        this.$router.push("/seller/service/create?step=1");
        localStorage.removeItem("isEditService");
        localStorage.removeItem("data-step-4-init");
        localStorage.removeItem("isEditService");
        localStorage.removeItem("isPrivate-step-8-init");
        localStorage.removeItem("data-step-7-init");
        localStorage.removeItem("service_reserve_setting-init");
        localStorage.removeItem("is_reserves-init");
        localStorage.removeItem("typeServiceId");
        localStorage.removeItem("typeSelected");
        localStorage.setItem("isNewService", true);
      } else {
        this.$router.push("/account/identity/verify");
      }
    },

    editComment({ buyer_id, service_hash_id }) {
      this.$router.push(
        "/seller/service/comment/reply/" + service_hash_id + "?buyer_id=" + buyer_id
      );
      window.scrollTo(0, 0);
    },

    viewDefaultComment() {
      const dataForm = {
        seller_id: this.account_id,
        per_page: 5,
        page: 1,
      };
      this.store.getListComment(dataForm);
    },

    updatePageComment(page) {
      this.preloadListComment = true;
      this.currentPageComment = page;
      const dataForm = {
        seller_id: this.account_id,
        per_page: 5,
        page: this.currentPageComment,
      };
      this.store.getListComment(dataForm);
    },

    updatePageSelling(page) {
      this.preloadListSelling = true;
      this.currentPageSelling = page;
      const dataForm = {
        seller_id: this.account_id,
        is_draft: 0,
        sort_type: 2,
        per_page: 7,
        page: this.currentPageSelling,
      };
      this.store.getServiceSelling(dataForm);
    },

    updatePageCreating(page) {
      this.preloadListCreating = true;
      this.currentPageCreating = page;
      const dataForm = {
        seller_id: this.account_id,
        is_draft: 1,
        sort_type: 2,
        per_page: 8,
        page: this.currentPageCreating,
      };
      this.store.getServiceCreating(dataForm);
    },

    showModal(id) {
      this.idDraft = id;
      this.showModalConfirm = true;
    },

    showModalDetail() {
      this.modalReviewDetail = true;
      this.modalReview = false;
    },

    deleteDraftService() {
      this.serviceStore.deleteServiceById(this.idDraft);
      this.showModalConfirm = false;
    },

    replaceText(data) {
      return data.replace(/(?:\r\n|\r|\n)/g, "<br>");
    },

    redirectSupport() {
      this.store.requestSupport();
      this.$router.push("/seller/support");
    },

    clearData() {
      localStorage.removeItem("data-step-1");
      localStorage.removeItem("data-step-2");
      localStorage.removeItem("id-step-2");
      localStorage.removeItem("checkListPrefectures");
      localStorage.removeItem("isActive");
      localStorage.removeItem("isFull");
      localStorage.removeItem("checkAreas");
      localStorage.removeItem("checkAllFlag");
      localStorage.removeItem("data-step-area_id-3");
      localStorage.removeItem("data-step-5-catchCopy");
      localStorage.removeItem("checkNational");
      localStorage.removeItem("data-step-4");
      localStorage.removeItem("imageDraftService");
      localStorage.removeItem("data-step-6");
      localStorage.removeItem("data-step-7");
      localStorage.removeItem("list-course-add");
      localStorage.removeItem("hash_id");
      localStorage.removeItem("id");
      localStorage.removeItem("interval");
      localStorage.removeItem("skip");
      localStorage.removeItem("with_skip");
      localStorage.removeItem("month_delivery");
      localStorage.removeItem("listTagDelete");
      localStorage.removeItem("isPrivate-step-8");
      localStorage.removeItem("id-step-8");
      localStorage.removeItem("data-step-10");
      localStorage.removeItem("data-step-9");
      localStorage.removeItem("data-step-9-error");
      localStorage.removeItem("hash_id-step-8");
      localStorage.removeItem("changeData");
      localStorage.removeItem("list-course");
      localStorage.removeItem("data-step-7-new");
      localStorage.removeItem("data-step-5-image");
      localStorage.removeItem("data-step-11-websiteUrl");
      localStorage.removeItem("zipCode");
      localStorage.removeItem("data-step-10-max");
      localStorage.removeItem("data-step-11-address");
      localStorage.removeItem("listAreaStep11");
      localStorage.removeItem("service_reserve_setting");
      localStorage.removeItem("is_reserves");
      localStorage.removeItem("course-name");
      localStorage.removeItem("course-price");
      localStorage.removeItem("course-cycle");
      localStorage.removeItem("course-content");
      localStorage.removeItem("course-firstPr");
      localStorage.removeItem("course-age_confirm");
      localStorage.removeItem("course-gender_restrictions");
      localStorage.removeItem("next-step-9");
      localStorage.removeItem("addedImage");
      localStorage.removeItem("copyCourse");
      localStorage.removeItem("moreCourse");
      localStorage.removeItem("detailCopyCourse");
      localStorage.removeItem("backCourse1");
      localStorage.removeItem("area");
      localStorage.removeItem("service_hours");
      localStorage.removeItem("url-step-8");
      localStorage.removeItem("lengthListCourse");
      localStorage.removeItem("data-step-9-delete");
      localStorage.removeItem("listClick");
      this.store.listFiles = [];
      this.store.imgCourseService = [];
      this.store.dataAddress = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.seller-service {
  .button-return {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 6px #44444333;
    border-radius: 33px;
    opacity: 1;
    padding: 12px 30px;
    color: #5e5c5c;
    border: unset;
    font-weight: 600;
    margin: unset;
    width: 200px;
    text-align: center;
    cursor: pointer;
  }
  &-content {
    padding: 30px 100px;

    @include screen(767) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 30px;
    }
    @include screen(480) {
      padding: 20px;
    }
    &-title {
      .title-main {
        font-size: 22px;
        color: #5e5c5c;
        font-weight: 600;
        @include screen(480) {
          font-size: 16px;
        }
      }
      .title-description {
        margin-left: 20px;
        font-size: 14px;
        color: #5e5c5c;
        @include screen(480) {
          font-size: 12px;
        }
      }
    }
    .list-by-created {
      &-header {
        padding: 20px 0;
        border-bottom: 2px solid #5e5c5c;
        .amount {
          color: #5e5c5c;
          font-size: 30px;
          font-weight: 600;
        }
        .text-name {
          color: #7e7d7d;
          font-size: 16px;
          margin-left: 20px;
          font-weight: 600;
        }
      }
      &-list {
        margin: 50px 0 50px;
        &-item {
          margin-bottom: 30px;
          .item-add {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            background: $white;
            box-shadow: 2px 2px 2px #4d4d4d33;
            opacity: 1;
            cursor: pointer;
            .icon-add {
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              &-text {
                color: #7e7d7d;
                font-weight: 600;
                text-align: center;
              }
            }
          }
          .item-img {
            width: 100%;
            height: 0;
            object-fit: cover;
            padding-bottom: 100%;
            background: $white;
            overflow: hidden;
            background-position: center center;
            background-size: cover, 60%;
            box-shadow: 2px 2px 2px #4d4d4d33;
            opacity: 1;
            img {
              width: 100%;
            }
            .service-draft {
              background: $orange;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 90%;
              padding: 10px 0;
              border-radius: 28px;
              text-align: center;
              color: $white;
              opacity: 0.8;
              font-weight: 600;
            }
          }
          .item-text {
            margin-top: 20px;
            @include screen(480) {
              margin-top: 0px;
            }
            &-top {
              margin: 10px 0;
              font-size: 22px;
              color: #5e5c5c;
              font-weight: 800;
            }
            &-top {
              font-size: 16px;
              color: #5e5c5c;
              font-weight: 800;
            }
          }
        }
      }
    }
    .list-by-favorites {
      &-header {
        padding: 20px 0;
        border-bottom: 2px solid #5e5c5c;
        .amount {
          color: #5e5c5c;
          font-size: 30px;
          font-weight: 600;
        }
        .text-name {
          color: #7e7d7d;
          font-size: 16px;
          margin-left: 20px;
          font-weight: 600;
        }
      }
      &-list {
        margin: 50px 0 100px;
        &-item {
          margin-bottom: 30px;
          .icon-delete {
            height: 50px;
            width: 50px;
            right: 0;
            cursor: pointer;
          }
          .item-img {
            width: 100%;
            height: 0;
            object-fit: cover;
            padding-bottom: 100%;
            background: #cccccc;
            overflow: hidden;
            background-position: center center;
            background-size: cover, 60%;
            box-shadow: 2px 2px 2px #4d4d4d33;
            opacity: 1;
            img {
              width: 100%;
            }
            .service-draft {
              background: $orange;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 90%;
              padding: 10px 0;
              border-radius: 28px;
              text-align: center;
              color: $white;
              opacity: 0.8;
              font-weight: 600;
            }
          }
          .item-text {
            margin-top: 20px;
            @include screen(480) {
              margin-top: 0px;
            }
            &-top {
              margin: 10px 0;
              font-size: 22px;
              color: #5e5c5c;
              font-weight: 800;
            }
            &-top {
              font-size: 16px;
              color: #5e5c5c;
              font-weight: 800;
            }
          }
        }
      }
    }

    .list-by-comment {
      &-header {
        padding: 20px 0;
        border-bottom: 1px solid $gray-600;
        .text-name {
          color: $gray-500;
          font-size: 16px;
          font-weight: 700;
        }
      }

      &-bottom {
        width: 80%;
        margin-bottom: 90px;
        @include screen(991) {
          width: 100%;
        }

        &-btn-viewall {
          background: #fff 0 0 no-repeat padding-box;
          border: unset;
          border-radius: 223px;
          box-shadow: 0px 0px 6px #44444333;
          color: #5e5c5c;
          cursor: pointer;
          font-weight: 600;
          padding: 15px 30px;
        }
      }

      &-list {
        width: 90%;
        .item-comment {
          width: 80%;
          margin-bottom: 80px;
          &-top {
            @include screen(480) {
              flex-direction: column;
            }
            &-image {
              width: 120px;
              height: 120px;
              object-fit: cover;
              @include screen(480) {
                width: 100px;
                height: 100px;
              }
            }
            &-text {
              width: calc(100% - 140px);
              margin-left: 20px;
              @include screen(480) {
                width: 100%;
                margin-left: unset;
                margin-top: 10px;
              }
              .text-left {
                width: 80%;
                &-top {
                  font-size: 18px;
                  font-weight: 600;
                  color: $gray-800;
                  @include screen(480) {
                    font-size: 14px;
                  }
                }
                &-bottom {
                  font-size: 16px;
                  font-weight: 500;
                  color: $gray-800;
                }
              }
              .text-right {
                button {
                  width: 113px;
                  padding: 8px 0;
                  background: $orange;
                  border: unset;
                  border-radius: 28px;
                }
              }

              .custom-button {
                background: #6c757d !important;
                cursor: default;
              }
            }
          }
          &-bottom {
            width: calc(100% - 140px);
            @include screen(480) {
              width: 100%;
            }
            .comment-first {
              &-header {
                @include screen(480) {
                  flex-direction: column;
                }
                .avatar {
                  &-image {
                    img {
                      width: 70px;
                      height: 70px;
                      border-radius: 50%;
                      @include screen(480) {
                        width: 50px;
                        height: 50px;
                      }
                      object-fit: cover;
                    }
                  }
                  &-star {
                    margin: 0 20px;
                    .list-star {
                      &-item {
                        margin: 0 2px;
                      }
                    }
                    .seller-name {
                      font-size: 16px;
                      font-weight: 600;
                      color: $gray-800;
                    }
                  }
                }
              }
              &-mid {
                font-size: 16px;
                font-weight: 600;
                color: $gray-800;
              }
              &-footer {
                margin-right: 10px !important;
                width: unset !important;
                img {
                  width: 169px;
                  height: 151px;
                  object-fit: cover;
                  margin-right: 10px !important;
                  @include screen(991) {
                    width: 50px;
                    height: 40px;
                  }
                }
              }
            }
            .comment-reply {
              margin-top: 30px;
              &-top {
                @include screen(480) {
                  flex-direction: column;
                  align-items: flex-start;
                }
                .avatar {
                  @include screen(480) {
                    margin-bottom: 10px;
                  }
                  &-image {
                    img {
                      width: 50px;
                      height: 50px;
                      object-fit: cover;
                      border-radius: 50%;
                      @include screen(480) {
                        width: 40px;
                        height: 40px;
                      }
                    }
                  }
                  &-text {
                    margin-left: 20px;
                    color: $orange;
                    font-size: 16px;
                    font-weight: 600;
                  }
                }
              }
              &-bottom {
                font-size: 18px;
                font-weight: 600;
                color: $gray-800;
                margin-top: 10px;
                @include screen(480) {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
  }
}
.modal-review {
  &-left {
    height: calc(100vh - 100px);

    &-form {
      padding: 0 54px;

      // margin-top: 100px;
      @include screen(991) {
        padding: 30px;
      }

      .input-group-text {
        width: 40px;
      }

      .step11-form {
        margin-top: 50px;
      }
    }

    &-btn {
      .btn-step-common {
        width: 50%;
        padding: 10px 0;
        color: #fff;
        border-radius: unset;
        border: none;
      }

      .btn-return {
        background: #b2b2b2;
      }

      .btn-next {
        background: $orange;
      }
    }
  }

  &-right {
    height: 100%;
    opacity: 0.75;

    &-title {
      color: #e79c3a;
      font-weight: 600;
      font-size: 17px;
    }

    &-img {
      background-repeat: no-repeat;
      background-size: contain;
      width: 150px;
      height: 150px;
    }
  }
}
.btn-review {
  align-items: center;
  padding-left: 13px;
  padding-right: 13px;
  border-radius: 10px;
  font-size: 16px;
  height: 48px;
  line-height: 35px;
}
</style>
