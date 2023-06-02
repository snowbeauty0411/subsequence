<template>
  <div class="createService-step11">
    <SDPreLoad :preload="preload" />
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="createService-step11-left flex flex-col justify-between">
            <div class="createService-step11-left-form">
              <div class="step-title">
                最後に、下記の情報を入力してください。
              </div>
              <div class="step11-form">
                <div class="step11-form-data">
                  <div class="form-label">ウェブサイトURL</div>
                  <div
                    class="relative validate-form flex justify-between"
                    v-if="requiredUrl"
                  >
                    <b-form-input
                      ref="copy"
                      v-model.trim="v$.websiteUrl.$model"
                      placeholder="https://subsq.jp/"
                      class="custom-input"
                      v-bind:class="{ 'is-invalid': v$.websiteUrl.$error }"
                      style="width: calc(100% - 140px)"
                      v-on:focus="$event.target.select()"
                    />
                    <b-button
                      class="w-[120px] bg-[#e79c3a] border-none"
                      v-on:click="copy()"
                      >{{ textCopy }}</b-button
                    >
                    <div v-if="v$.websiteUrl.$error" class="error-text">
                      <p v-if="v$.websiteUrl.required.$invalid">
                        {{ messageNoti.url_step11_required }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="relative validate-form flex justify-between"
                    v-else
                  >
                    <b-form-input
                      ref="copy"
                      v-model.trim="websiteUrl"
                      placeholder="https://subsq.jp/"
                      class="custom-input"
                      style="width: calc(100% - 140px)"
                      v-on:focus="$event.target.select()"
                    />
                    <b-button
                      class="w-[120px] bg-[#e79c3a] border-none"
                      v-on:click="copy()"
                      >{{ textCopy }}</b-button
                    >
                  </div>
                  <div class="form-label pt-5">郵便番号</div>
                  <b-input-group prepend="〒">
                    <div
                      class="relative validate-form"
                      style="width: calc(100% - 40px)"
                      v-if="requiredZipcode"
                    >
                      <input
                        v-model.trim="v$.zipCode.$model"
                        maxlength="8"
                        placeholder="000-0000"
                        class="custom-input custom-zipcode w-100"
                        id="zipcode_step_11"
                        @blur="formartZipcode()"
                        v-bind:class="{ 'is-invalid': v$.zipCode.$error }"
                        @keypress="onlyNumber($event)"
                        v-bind="formatNumber()"
                      />
                      <div v-if="v$.zipCode.$error" class="error-text">
                        <p v-if="v$.zipCode.required.$invalid">
                          {{ messageNoti.zipcode_step11_required }}
                        </p>
                        <p v-if="v$.zipCode.minLength.$invalid">
                          {{ messageNoti.zipcode_step11_minLength }}
                        </p>
                      </div>
                    </div>
                    <div
                      class="relative validate-form"
                      style="width: calc(100% - 40px)"
                      v-else
                    >
                      <b-form-input
                        v-model.trim="v$.zipCode.$model"
                        :maxlength="8"
                        placeholder="000-0000"
                        class="custom-input custom-zipcode"
                        id="zipcode_step_11"
                        v-on:keyup="formartZipcode()"
                        v-bind:class="{
                          'is-invalid': v$.zipCode.$error && minZipcode,
                        }"
                        v-bind="formatNumber()"
                        @keypress="onlyNumber($event)"
                      />
                      <div
                        v-if="v$.zipCode.$error && minZipcode"
                        class="error-text"
                      >
                        <p v-if="v$.zipCode.minLength.$invalid">
                          {{ messageNoti.zipcode_step11_minLength }}
                        </p>
                      </div>
                    </div>
                  </b-input-group>
                  <div class="form-label pt-5">所在地</div>
                  <div class="relative validate-form" v-if="requiredAddress">
                    <b-form-input
                      v-model.trim="v$.address.$model"
                      placeholder="例）大阪府大阪市北区梅田○-○-○　○○ビル○○号室"
                      class="custom-input"
                      v-bind:class="{ 'is-invalid': v$.address.$error }"
                    />
                    <div v-if="v$.address.$error" class="error-text">
                      <p v-if="v$.address.required.$invalid">
                        {{ messageNoti.address_step11_required }}
                      </p>
                    </div>
                  </div>
                  <div class="relative validate-form" v-else>
                    <b-form-input
                      v-model.trim="address"
                      placeholder="例）大阪府大阪市北区梅田○-○-○　○○ビル○○号室"
                      class="custom-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="createService-step11-left-btn flex">
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
                class="
                  btn-next
                  flex
                  items-center
                  justify-center
                  btn-step-common
                "
                v-on:click="createServicePublic"
              >
                完了
              </b-button>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="
              createService-step11-right
              flex flex-col
              items-center
              justify-between
              h-full
            "
          >
            <div class="flex flex-col">
              <div class="createService-step11-right-title">
                おつかれさまでした！
                <br />最後のステップです！
              </div>
              <!-- <div
                class="
                  createService-step11-right-description
                  flex
                  self-end
                  my-3
                  cursor-pointer
                "
                @click="showModalReview"
              >
                <img src="@/assets/images/iconEye.png" alt="" />
                <div class="text-white mx-3">出品したページをみてみる</div>
              </div> -->
            </div>
            <div
              class="createService-step11-right-img"
              :style="'background-image: url(' + bgStep11 + ')'"
            ></div>
          </div>
          <b-modal
            v-model="showModal"
            hide-header
            hide-footer
            id="modal-preview"
            size="xl"
          >
            <div class="flex flex-col p-[50px]">
              <div class="page-service-header">
                <div class="page-service-header-title">
                  {{ serviceDetail.caption }}<br />
                  「{{ serviceDetail.name }}」
                </div>

                <div class="page-service-header-detail flex flex-col">
                  <div class="country flex flex-wrap">
                    <div
                      v-for="(item, index) in serviceDetail.area"
                      :key="index"
                      class="mx-2"
                    >
                      {{ item }}
                    </div>
                  </div>
                  <div
                    class="
                      page-service-header-detail-link
                      flex
                      justify-between
                      items-end
                    "
                  >
                    <div
                      class="
                        page-service-header-detail-link-left
                        flex flex-wrap
                      "
                    >
                      <div class="star flex items-center">
                        <img src="@/assets/images/star.png" />
                        <span class="amount-star">{{
                          serviceDetail.avg_reviews
                        }}</span>
                        <span class="amount-vote"
                          >({{ serviceDetail.reviews_count }}件)</span
                        >
                      </div>
                      <div class="heart flex items-center">
                        <img src="@/assets/images/heart.png" />
                        <span class="amount-vote"
                          >お気に入り({{
                            serviceDetail.favorites_count
                          }}件)</span
                        >
                      </div>
                      <div class="share flex items-center">
                        <img src="@/assets/images/share.png" />
                        <span class="text-share">シェア</span>
                      </div>
                    </div>
                    <div
                      class="
                        page-service-header-detail-link-right
                        flex
                        items-end
                      "
                      v-if="
                        serviceDetail.max == 'null' || serviceDetail.max == 0
                      "
                    >
                      <div class="remaining-text h-[35px]">上限なし</div>
                    </div>
                    <div
                      class="
                        page-service-header-detail-link-right
                        flex
                        items-end
                      "
                      v-else
                    >
                      <div class="remaining-text h-[35px]">
                        「残り{{ serviceDetail.current_quantity }}」
                      </div>
                    </div>
                  </div>
                </div>
                <div class="page-service-header">
                  <div class="page-service-header-img">
                    <b-container fluid class="g-0">
                      <b-row
                        ><b-col lg="6">
                          <div
                            class="img-main relative"
                            :style="
                              'background-image: url(' + imgService1 + ')'
                            "
                          >
                            <div class="favourite absolute">
                              <button
                                type="button"
                                class="btn btn-favourite"
                                v-bind:class="{ isLike: isLike }"
                              >
                                <img
                                  v-if="isLike"
                                  src="@/assets/images/iconWhiteHeart.png"
                                />
                                <img
                                  v-else
                                  src="@/assets/images/iconHeart.png"
                                />
                              </button>
                            </div>
                          </div>
                        </b-col>
                        <b-col lg="6">
                          <b-row>
                            <b-col lg="6" cols="6" class="mb-3">
                              <div
                                class="w-full img-element"
                                :style="
                                  'background-image: url(' + imgService2 + ')'
                                "
                                v-if="imgService2"
                              ></div> </b-col
                            ><b-col lg="6" cols="6" class="mb-3"
                              ><div
                                class="w-full img-element"
                                :style="
                                  'background-image: url(' + imgService3 + ')'
                                "
                                v-if="imgService3"
                              ></div></b-col
                            ><b-col lg="6" cols="6" class="mb-3"
                              ><div
                                class="w-full img-element"
                                :style="
                                  'background-image: url(' + imgService4 + ')'
                                "
                                v-if="imgService4"
                              ></div></b-col
                            ><b-col lg="6" cols="6" class="mb-3"
                              ><div
                                class="w-full img-element"
                                :style="
                                  'background-image: url(' + imgService5 + ')'
                                "
                                v-if="imgService5"
                              ></div></b-col
                          ></b-row>
                        </b-col> </b-row
                    ></b-container>
                  </div>
                </div>
                <div class="page-service-header-footer flex justify-between">
                  <div class="page-service-header-footer-left">
                    <div class="service-name">{{ serviceDetail.name }}</div>
                    <div class="service-restaurant">{{ category }}</div>
                    <div class="service-info flex items-center">
                      <div class="service-info-avatar">
                        <Nuxt-Link
                          :to="`/profile/seller/${dataSeller.account_id}`"
                        >
                          <img
                            :src="
                              dataSeller.profile_image_url_sell
                                ? dataSeller.profile_image_url_sell
                                : imgAvatarDefault
                            "
                          />
                        </Nuxt-Link>
                      </div>
                      <div
                        class="service-info-link flex flex-col justify-between"
                      >
                        <div class="service-info-link-top">
                          <Nuxt-Link
                            :to="`/profile/seller/${dataSeller.account_id}`"
                            class="hover:text-[#e79c3a]"
                          >
                            {{ dataSeller.account_name }}
                          </Nuxt-Link>
                        </div>
                        <div class="service-info-link-bottom">
                          <Nuxt-Link>
                            <img src="@/assets/images/sendMail.png" />
                          </Nuxt-Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="page-service-header-footer-right flex flex-col">
                    <div class="page-service-header-footer-right-button">
                      <a :href="dataSeller.url_official">Official site</a>
                    </div>
                    <div
                      class="
                        page-service-header-footer-right-socialNetwork
                        flex
                        justify-center
                        w-full
                      "
                    >
                      <a
                        :href="`https://www.facebook.com/${dataSeller.url_facebook}`"
                        class="mx-2"
                        ><img src="@/assets/images/iconFacebook.png"
                      /></a>
                      <a
                        :href="`https://www.instagram.com/${dataSeller.url_instagram}`"
                        class="mx-2"
                        ><img src="@/assets/images/iconInsta.png"
                      /></a>
                      <a
                        :href="`https://twitter.com/${dataSeller.url_twitter}`"
                        class="mx-2"
                        ><img src="@/assets/images/iconTwitter.png"
                      /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="page-service-content flex flex-col">
                <div class="page-service-content-name">サービス内容</div>
                <div class="page-service-content-description">
                  {{ serviceDetail.service_content }}
                </div>
                <div
                  class="page-service-content-hashtag flex flex-wrap"
                  v-if="!isEditDraftService"
                >
                  <button
                    class="page-service-content-hashtag-item"
                    v-for="(item, index) in serviceDetail.favorite_tags"
                    :key="index"
                  >
                    {{ item }}
                  </button>
                </div>
                <div class="page-service-content-hashtag flex flex-wrap" v-else>
                  <button
                    class="page-service-content-hashtag-item"
                    v-for="(item, index) in serviceDetail.favorite_tags"
                    :key="index"
                  >
                    {{ item.name }}
                  </button>
                </div>
              </div>
              <div class="page-service-rate flex flex-col">
                <div class="page-service-rate-title">料金プラン</div>
                <div
                  class="page-service-rate-list flex flex-col"
                  v-if="listCourseCurent.length > 0"
                >
                  <div
                    class="page-service-rate-list-item flex flex-col"
                    v-for="(item, index) in listCourseCurent"
                    :key="index"
                  >
                    <div class="item-top flex">
                      <div class="item-top-image">
                        <img :src="item.course_images" alt="" />
                      </div>
                      <div class="flex flex-col w-full justify-between">
                        <div class="item-top-content flex">
                          <SDIcon icon="check" size="2x" style="width: 80px" />
                          <div class="flex flex-col">
                            <div
                              class="item-top-content-title"
                              v-if="item.course_name !== undefined"
                            >
                              {{ item.course_name }}
                            </div>
                            <div
                              class="item-top-content-title"
                              v-if="item.name !== undefined"
                            >
                              {{ item.name === null ? "" : item.names }}
                            </div>
                            <div
                              class="item-top-content-description"
                              v-if="item.content !== undefined"
                            >
                              {{
                                item.course_content === null
                                  ? ""
                                  : item.course_content
                              }}
                            </div>
                            <div
                              class="item-top-content-description"
                              v-if="item.content !== undefined"
                            >
                              {{ item.content === null ? "" : item.content }}
                            </div>
                          </div>
                        </div>
                        <div class="item-top-price flex flex-col items-end">
                          <div
                            class="item-top-price-text"
                            v-if="serviceTypeId === 1"
                          >
                            （送料・税込）
                          </div>
                          <div class="item-top-price-text" v-else>（税込）</div>
                          <div
                            class="item-top-price-number"
                            v-if="item.course_price != undefined"
                          >
                            {{ $setComma(item.course_price) }} /<span
                              style="font-size: 18px"
                              >{{
                                item.course_cycle == 1 ? "" : item.course_cycle
                              }}月</span
                            >
                          </div>
                          <div
                            class="item-top-price-number"
                            v-if="item.price != undefined"
                          >
                            {{ $setComma(item.price) }} /<span
                              style="font-size: 18px"
                              >{{
                                item.cycle == null ||
                                item.cycle == 1 ||
                                item.cycle == 0
                                  ? "月"
                                  : item.cycle + "ヶ月"
                              }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item-bottom w-full flex justify-end my-2">
                      <button class="flex items-center justify-center">
                        <SDIcon icon="cart" size="md" class="mx-2" /><span
                          >サブスクする</span
                        >
                      </button>
                    </div>
                  </div>
                </div>
                <!-- <SDPagination
                  v-if="last_page > 1"
                  :totalpage="last_page"
                  :currentPage="current_page"
                  v-on:update-page="updatePageListCourse"
                /> -->
              </div>
              <div class="page-service-rate flex flex-col">
                <div class="page-service-flow-title">
                  サービスご利用までの流れ
                </div>
                <div class="page-service-flow-content">
                  <SDServiceStep
                    v-for="(item, index) in dataStep"
                    :key="index"
                    :number="'0' + (index + 1)"
                    :title="item.title"
                    :content="item.content"
                  />
                </div>
              </div>
              <div
                class="page-service-rate flex flex-col"
                v-if="latLngAddress !== null"
              >
                <div class="page-service-rate-title mb-4">MAP</div>
                <div class="page-service-rate-content">
                  <GoogleMap
                    :api-key="google_api_key"
                    style="width: 100%; height: 500px"
                    :center="{
                      lat: parseFloat(center.lat),
                      lng: parseFloat(center.lng),
                    }"
                    :zoom="15"
                    v-if="center.lat !== '' && center.lng !== ''"
                  >
                    <Marker
                      :options="{
                        position: {
                          lat: parseFloat(center.lat),
                          lng: parseFloat(center.lng),
                        },
                      }"
                      :clickable="true"
                      :draggable="true"
                    />
                  </GoogleMap>
                </div>
                <div class="page-service-map-content-textName">
                  {{ address }}
                </div>
              </div>
              <div class="page-service-flow flex flex-col">
                <div class="page-service-rate-title">レビュー0件</div>
              </div>
            </div>
          </b-modal>
        </b-col>
      </b-row></b-container
    >
  </div>
</template>

<script>
import bgStep11 from "@/assets/images/bgStep11.png";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";
import imgAvatarDefault from "@/assets/images/ellipse.png";
import SDPreLoad from "@/components/SDPreLoad";
import SDIcon from "@/components/SDIcon";
import { ServiceStore } from "@/store/service/index.ts";
import SDPagination from "@/components/SDPagination";
import { GoogleMap, Marker } from "vue3-google-map";
import { Urls } from "@/utils/urls";

export default {
  name: "Step11",
  setup() {
    const v$ = useVuelidate();
    const toast = useToast();
    const store = sellerStore();
    const serviceStore = ServiceStore();
    const google_api_key = Urls.GOOGLE_API_KEY;
    return {
      v$,
      toast,
      store,
      serviceStore,
      google_api_key,
    };
  },

  data() {
    return {
      center: { lat: "", lng: "" },
      preload: false,
      imgAvatarDefault,
      showModal: false,
      websiteUrl: "",
      address: "",
      bgStep11,
      messageNoti: Message.SELLER,
      messageErrSys: Message.ERROR_SYSTEM,
      messageShippingInfo: Message.DELIVERY,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      zipCode: "",
      dataZipCode: { pref: "", city: "", town: "" },
      listStep: [],
      listDelivery: [],
      listArea: [],
      listCourseService: [],
      listTag: [],
      options: [
        { text: "はい", value: 1 },
        { text: "いいえ", value: 0 },
      ],
      selected: 0,
      service_hours: [],
      service_reserve_setting: {},
      area: "",
      serviceDetail: {
        name: "",
        area: [],
        avg_reviews: "0",
        reviews_count: "0",
        favorites_count: "0",
        max: null,
        service_content: "",
        favorite_tags: [],
      },
      imgService1: null,
      imgService2: null,
      imgService3: null,
      imgService4: null,
      imgService5: null,
      dataSeller: {},
      category: "",
      isLike: false,
      courseList: [],
      dataStep: [],
      isEditDraftService: false,
      pageListCourse: 1,
      listCourseTotal: [],
      listCourseOld: [],
      current_page: 1,
      last_page: 1,
      listCourseCurent: [],
      lengthListCourseOld: [],
      requiredUrl: true,
      textCopy: "コピーする",
      requiredZipcode: true,
      minZipcode: false,
      requiredAddress: true,
      serviceType: 2,
      serviceTypeId: 0,
    };
  },

  components: {
    SDPreLoad,
    SDIcon,
    SDPagination,
    GoogleMap,
    Marker,
  },

  computed: {
    ...mapState(sellerStore, [
      "listFiles",
      "dataAddress",
      "listImgCourse",
      "success",
      "error",
      "message",
      "dataAccount",
      "errorAddress",
      "errorSystem",
      "latLngAddress",
      "dataServiceSelling",
    ]),
    ...mapState(ServiceStore, ["listCourseAll"]),
  },

  validations: {
    websiteUrl: {
      required,
      minLength: minLength(1),
    },

    zipCode: {
      required,
      minLength: minLength(8),
    },

    address: {
      required,
      maxLength: maxLength(30),
      minLength: minLength(1),
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

  created() {
    this.serviceType = localStorage.getItem("data-step-4");
    let address = localStorage.getItem("data-step-5-address");
    if (address === null) {
      this.address = "";
    } else {
      this.address = address;
    }

    let websiteUrl = localStorage.getItem("data-step-5-websiteUrl");
    if (websiteUrl === null) {
      this.websiteUrl = "";
      this.webUrl = "";
    } else {
      this.websiteUrl = websiteUrl;
      this.webUrl = websiteUrl;
    }

    let urlType4 = localStorage.getItem("data-step-4");
    if (urlType4 != null) {
      if (Number(urlType4) == 4) {
        this.requiredUrl = false;
        this.requiredZipcode = false;
        this.requiredAddress = false;
      }
      // else if (Number(urlType4) != 2) {
      //   this.requiredUrl = true;
      //   this.requiredZipcode = false;
      //   this.requiredAddress = false;
      // }
      else if (Number(urlType4) == 2) {
        this.requiredUrl = false;
        this.requiredZipcode = true;
        this.requiredAddress = true;
      } else {
        this.requiredUrl = true;
        this.requiredZipcode = true;
        this.requiredAddress = true;
      }
    }

    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.account_id = Cookies.get("account_id");
    }
    this.store.getAccount(this.account_id);

    let serviceName = localStorage.getItem("data-step-1");
    let area = localStorage.getItem("area");
    let category = localStorage.getItem("data-step-2");
    let serviceContent = localStorage.getItem("data-step-6");
    let hashTag = localStorage.getItem("data-step-7");
    let max = localStorage.getItem("data-step-10-max");
    let course = localStorage.getItem("list-course");
    // this.listCourseCurent = course
    let data_step = localStorage.getItem("data-step-9");
    let listAreaStep11 = JSON.parse(localStorage.getItem("listAreaStep11"));
    this.serviceDetail.name = serviceName;
    this.serviceDetail.area = listAreaStep11;
    this.serviceDetail.max = max;
    this.serviceDetail.service_content = serviceContent;
    this.serviceDetail.favorite_tags = JSON.parse(hashTag);
    this.serviceDetail.caption = localStorage.getItem("data-step-5-catchCopy");
    this.category = category;

    let hash_id = localStorage.getItem("hash_id");
    if (hash_id !== null) {
      this.isEditDraftService = true;
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        this.$router.push(`/seller/service/create?step=1&hash_id=${hash_id}`);
      }
    } else {
      let serviceName = localStorage.getItem("data-step-1");
      if (serviceName == null) {
        this.$router.push("/seller/service/create?step=1");
      }
    }

    if (this.isEditDraftService) {
      let zipCode = localStorage.getItem("zipCode");
      let websiteUrl = localStorage.getItem("data-step-11-websiteUrl");
      let address = localStorage.getItem("data-step-11-address");
      if (zipCode != null) {
        this.zipCode = zipCode;
      }
      if (websiteUrl != null) {
        this.websiteUrl = websiteUrl;
      }
      if (address != null) {
        this.address = address;
      }

      // if (this.store.listFiles.length > 0) {
      //   this.store.listFiles.map((item, index) => {
      //     const _this = this;
      //     if (item.file != null) {
      //       if (item.status === 0) {
      //         _this["imgService" + (index + 1)] = item.file;
      //       } else {
      //         _this["imgService" + (index + 1)] = URL.createObjectURL(
      //           item.file
      //         );
      //       }
      //     }
      //   });
      // }

      const request = {
        hash_id: this.$route.query.hash_id,
        page: this.pageListCourse,
      };
      this.serviceStore.getListCourseAll(request);
    } else {
      if (this.store.listFiles.length > 0) {
        this.store.listFiles.map((item) => {
          const _this = this;
          if (item.status === 0) {
            _this["imgService" + item.index] = item.file;
          } else {
            _this["imgService" + item.index] = URL.createObjectURL(item.file);
          }
        });
      }
    }

    if (course !== null) {
      course = JSON.parse(course);
      course.map((item) => {
        this.courseList.push(item);
      });
    }

    if (data_step !== null) {
      data_step = JSON.parse(data_step);
      data_step.map((item) => {
        this.dataStep.push(item);
      });
    }

    if (this.store.listImgCourse.length > 0) {
      this.courseList.map((item, index) => {
        this.store.listImgCourse.map((item1, index1) => {
          if (index === index1) {
            item.course_images = item1;
          }
        });
      });
    }

    if (!this.isEditDraftService) {
      this.courseList.map((item) => {
        this.listCourseTotal.push(item);
      });

      if (parseInt(this.listCourseTotal.length) % 3 == 0) {
        this.last_page = parseInt(this.listCourseTotal.length / 3);
      } else {
        this.last_page = parseInt(this.listCourseTotal.length / 3) + 1;
      }

      this.getListCourseCurrent();
    }
  },

  watch: {
    latLngAddress() {
      if (this.latLngAddress !== null) {
        this.center.lat = this.latLngAddress.lat;
        this.center.lng = this.latLngAddress.lng;
      }
    },
    dataAccount() {
      this.dataSeller = this.dataAccount.sellers;
    },

    dataAddress() {
      if (this.store.dataAddress) {
        this.dataZipCode = this.store.dataAddress;
        this.address = this.dataZipCode.address_2;
        this.area = this.dataZipCode.area;
        if (this.dataZipCode.area !== undefined) {
          localStorage.setItem("area", this.dataZipCode.area);
        }
      }
    },

    zipCode() {
      if (this.zipCode != "") {
        this.minZipcode = true;
        if (this.zipCode.length < 8) {
          this.address = "";
        }
      } else {
        this.minZipcode = false;
      }
      localStorage.setItem("zipCode", this.zipCode);
    },

    dataServiceSelling() {
      localStorage.setItem(
        "hash_id_detail",
        this.dataServiceSelling.data[0].hash_id
      );

      localStorage.setItem("createServiceSuccessful", true);
      this.$router.push("/seller/service/management");
    },

    success() {
      if (this.store.success === true) {
        this.preload = false;
        this.toast.success(this.store.message, this.optionToast);
        this.store.getServiceSelling({
          seller_id: Number(this.account_id),
          is_draft: 0,
          sort_type: 2,
          per_page: 7,
          page: 1,
        });
        this.store.success = "";
        this.store.message = "";
        this.clearData();
        this.store.listFiles = [];
        this.store.listImgCourse = [];
        this.store.dataAddress = {};
      }
    },

    error() {
      if (this.store.error === true) {
        this.preload = false;
        this.toast.error(this.store.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
      }
    },

    errorAddress() {
      if (this.store.errorAddress === true) {
        this.preload = false;
        this.toast.error(this.store.message, this.optionToast);
        this.address = "";
        this.store.errorAddress = "";
        this.store.message = "";
      }
    },

    errorSystem() {
      if (this.store.errorSystem === true) {
        this.preload = false;
        this.toast.error(this.messageErrSys, this.optionToast);
        this.store.errorSystem = "";
      }
    },

    websiteUrl() {
      this.textCopy = "コピーする";
      localStorage.setItem("data-step-11-websiteUrl", this.websiteUrl);
    },

    address() {
      if (this.address != undefined && this.address != "") {
        localStorage.setItem("data-step-11-address", this.address);
      }
    },

    listCourseAll() {
      this.listCourseOld = this.listCourseAll.data;
      this.current_page = 1;
      this.listCourseOld.map((item) => {
        this.listCourseTotal.push(item);
      });
      this.courseList.map((item) => {
        this.listCourseTotal.push(item);
      });
      if (parseInt(this.listCourseTotal.length) % 3 == 0) {
        this.last_page = parseInt(this.listCourseTotal.length / 3);
      } else {
        this.last_page = parseInt(this.listCourseTotal.length / 3) + 1;
      }

      this.getListCourseCurrent();
    },
  },

  methods: {
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    backStep() {
      if (this.isEditDraftService) {
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=10&hash_id=${hash_id}`);
      } else {
        localStorage.setItem("data-step-11-address", this.address);
        localStorage.setItem("data-step-11-websiteUrl", this.websiteUrl);
        this.$router.push("/seller/service/create?step=10");
      }
    },

    async createServicePublic() {
      if (/^[０-９]/.test(this.zipCode)) {
        this.toast.error(
          this.messageShippingInfo.zipcode_haflwidth,
          this.optionToast
        );
        return;
      }
      var result = true;
      var result1 = true;

      let dataStep4 = localStorage.getItem("data-step-4");
      let dataStep4Init = localStorage.getItem("data-step-4-init");
      if (dataStep4 === null) {
        this.serviceTypeId = dataStep4Init;
      } else {
        this.serviceTypeId = dataStep4;
      }
      if (Number(this.serviceTypeId) == 4) {
        result = await this.v$.websiteUrl.$validate();
      } else if (Number(this.serviceTypeId) == 2) {
        result = await this.v$.zipCode.$validate();
        result = await this.v$.address.$validate();
      } else {
        result = await this.v$.$validate();
      }
      if (!result || !result1) {
      } else {
        let account_id = null;
        let rememberLogin = localStorage.getItem("rememberLogin");
        if (rememberLogin === "true") {
          account_id = localStorage.getItem("account_id");
        } else {
          account_id = Cookies.get("account_id");
        }
        let serviceName = localStorage.getItem("data-step-1");
        let serviceCategoryId = localStorage.getItem("id-step-2");
        let area = localStorage.getItem("data-step-area_id-3");
        let catchCopy = localStorage.getItem("data-step-5-catchCopy");
        let serviceContent = localStorage.getItem("data-step-6");

        let isPrivate = localStorage.getItem("isPrivate-step-8");
        let max = localStorage.getItem("data-step-10-max");
        let course = localStorage.getItem("list-course");
        let data_step = localStorage.getItem("data-step-9");
        let skip = localStorage.getItem("skip");
        let with_skip = localStorage.getItem("with_skip");
        let interval = localStorage.getItem("interval");
        let month_delivery = localStorage.getItem("month_delivery");
        let urlPrivate = localStorage.getItem("url-step-8");
        let id = localStorage.getItem("id");
        let hash_id = localStorage.getItem("hash_id");
        let service_reserve_setting = localStorage.getItem(
          "service_reserve_setting"
        );
        let service_hours = localStorage.getItem("service_hours");
        let is_reserves = localStorage.getItem("is_reserves");
        let urlType4 = localStorage.getItem("urlType4");

        if (
          service_reserve_setting !== "null" ||
          service_reserve_setting !== null
        ) {
          this.service_reserve_setting = JSON.parse(service_reserve_setting);
        }

        if (service_hours !== "null" || service_hours !== null) {
          this.service_hours = JSON.parse(service_hours);
        }

        if (Number(this.serviceTypeId) === 1) {
          if (month_delivery === "null") {
            month_delivery = null;
          } else {
            month_delivery = Number(month_delivery);
          }
          if (with_skip === "null") {
            with_skip = 0;
          } else {
            with_skip = Number(with_skip);
          }
          if (month_delivery === "null") {
            month_delivery = 0;
          } else {
            month_delivery = Number(month_delivery);
          }
          const service_delivery = {
            interval: interval,
            month_delivery: month_delivery,
            skip: skip,
            with_skip: with_skip,
          };
          this.listDelivery.push(service_delivery);
        }

        let service_steps = data_step;
        service_steps = JSON.parse(service_steps);
        service_steps.map((item) => this.listStep.push(item));

        course = JSON.parse(course);
        course.map((item) => {
          this.listCourseService.push(item);
        });

        let areas = JSON.parse(area);

        areas.map((item) => {
          this.listArea.push(item);
        });

        let hashTag = localStorage.getItem("data-step-7");
        if (hashTag === null) {
          hashTag = localStorage.getItem("data-step-7-init");
        }

        let tags = JSON.parse(hashTag);

        tags.map((item) => {
          this.listTag.push(item);
        });

        const dataForm = new FormData();
        if (id > 0) {
          dataForm.append("service_id", Number(id));
          dataForm.append("hash_id", hash_id);
        }
        dataForm.append("seller_id", account_id);
        dataForm.append("service_cat_id", Number(serviceCategoryId));
        dataForm.append("service_type_id", Number(this.serviceTypeId));
        dataForm.append("name", serviceName);
        dataForm.append("address", this.address);
        dataForm.append("caption", catchCopy);
        dataForm.append("zipcode", this.zipCode);
        dataForm.append("service_content", serviceContent);
        dataForm.append("private", isPrivate);
        dataForm.append("max", max == "null" ? 0 : max);
        dataForm.append(
          "area",
          this.dataZipCode.area != undefined ? this.dataZipCode.area : ""
        );
        dataForm.append("url", this.websiteUrl);
        dataForm.append("is_reserves", Number(is_reserves));
        if (Number(this.serviceTypeId) == 4) {
          dataForm.append("url_website", urlType4);
        }
        if (isPrivate == 1) {
          dataForm.append("url_private", urlPrivate);
        }
        dataForm.append("is_draft", 0);

        // ListImageService
        if (this.isEditDraftService) {
          let listImgStorage = JSON.parse(
            localStorage.getItem("data-step-5-image")
          );
          let dataImageService = [];
          if (this.store.listFiles.length === 0) {
            listImgStorage.map((item) => {
              if (item.id === undefined) {
                dataImageService.push({
                  status: 1,
                  file: this.base64toBlob(item.file),
                });
              } else {
                dataImageService.push({
                  id: item.id,
                  status: 0,
                  file: item.file,
                });
              }
            });
            this.store.setFiles(dataImageService);
          }
          if (this.store.listFiles.length > 0) {
            this.store.listFiles.forEach((item, index) => {
              if (item.status === 0) {
                dataForm.append(
                  "service_images[" + index + "]" + "[id]",
                  item.id
                );
                dataForm.append(
                  "service_images[" + index + "]" + "[status]",
                  item.file === "" ? 0 : 1
                );
                if (typeof item.file === "object") {
                  dataForm.append(
                    "service_images[" + index + "]" + "[file]",
                    item.file
                  );
                } else if (item.file.includes("data:image")) {
                  dataForm.append(
                    "service_images[" + index + "]" + "[file]",
                    this.base64toBlob(item.file)
                  );
                } else {
                  dataForm.append(
                    "service_images[" + index + "]" + "[file]",
                    item.file === "" ? "" : item.file
                  );
                }
              } else {
                if (item.id !== undefined) {
                  dataForm.append(
                    "service_images[" + index + "]" + "[id]",
                    item.id
                  );
                  dataForm.append(
                    "service_images[" + index + "]" + "[status]",
                    item.file === "" ? 0 : item.status
                  );

                  if (item.file !== "") {
                    if (typeof item.file === "object") {
                      dataForm.append(
                        "service_images[" + index + "]" + "[file]",
                        item.file
                      );
                    } else if (item.file.includes("data:image")) {
                      dataForm.append(
                        "service_images[" + index + "]" + "[file]",
                        this.base64toBlob(item.file)
                      );
                    } else {
                      dataForm.append(
                        "service_images[" + index + "]" + "[file]",
                        item.file
                      );
                    }
                  } else {
                    dataForm.append(
                      "service_images[" + index + "]" + "[file]",
                      ""
                    );
                  }
                } else {
                  if (typeof item.file === "object") {
                    dataForm.append(
                      "service_images[" + index + "]" + "[file]",
                      item.file
                    );
                  } else if (item.file.includes("data:image")) {
                    dataForm.append(
                      "service_images[" + index + "]" + "[file]",
                      this.base64toBlob(item.file)
                    );
                  } else {
                    dataForm.append(
                      "service_images[" + index + "]" + "[file]",
                      item.file
                    );
                  }
                  dataForm.append(
                    "service_images[" + index + "]" + "[status]",
                    1
                  );
                }
              }
            });
          } else {
            let dataImage = JSON.parse(
              localStorage.getItem("imageDraftService")
            );
            if (dataImage != null && dataImage.length > 0) {
              dataImage.forEach((item, index) => {
                if (item.status === 0) {
                  dataForm.append(
                    "service_images[" + index + "]" + "[id]",
                    item.id
                  );
                  dataForm.append(
                    "service_images[" + index + "]" + "[status]",
                    item.status
                  );
                  dataForm.append(
                    "service_images[" + index + "]" + "[file]",
                    ""
                  );
                }
              });
            }
          }
        } else {
          if (this.store.listFiles.length > 0) {
            this.store.listFiles.forEach((item, index) => {
              dataForm.append("service_images[" + index + "]", item.file);
            });
          } else {
            if (dataImage != null && dataImage.length > 0) {
              dataImage.forEach((item, index) => {
                if (item.status === 0) {
                  dataForm.append(
                    "service_images[" + index + "]" + "[id]",
                    item.id
                  );
                  dataForm.append(
                    "service_images[" + index + "]" + "[status]",
                    item.status
                  );
                  dataForm.append(
                    "service_images[" + index + "]" + "[file]",
                    ""
                  );
                }
              });
            }
          }
        }
        if (this.isEditDraftService) {
          this.listTag.forEach((item) => {
            if (item.id != undefined) {
            } else {
              dataForm.append("tags[]", item.name);
            }
          });
          let listTagDelete = JSON.parse(localStorage.getItem("listTagDelete"));
          if (listTagDelete != null) {
            listTagDelete.map((item) => {
              dataForm.append("tag_deletes[]", item);
            });
          }
        } else {
          this.listTag.forEach((item) => {
            dataForm.append("tags[]", item);
          });
        }

        // ListArea
        this.listArea.forEach((item, index) => {
          if (item.list.length > 0) {
            dataForm.append(
              "service_areas[" + index + "]" + "[area_id]",
              item.area_id
            );
            dataForm.append(
              "service_areas[" + index + "]" + "[pref_id]",
              item.list
            );
          }
        });

        // ListCourse
        if (this.isEditDraftService) {
          this.listCourseService.forEach((item, index) => {
            if (item.course_id != undefined) {
              dataForm.append(
                "service_courses[" + index + "]" + "[course_id]",
                item.course_id
              );
              dataForm.append(
                "service_courses[" + index + "]" + "[name]",
                item.name
              );
              dataForm.append(
                "service_courses[" + index + "]" + "[price]",
                Number(item.price)
              );

              if (item.cycle != null) {
                dataForm.append(
                  "service_courses[" + index + "]" + "[cycle]",
                  item.cycle
                );
              }
              dataForm.append(
                "service_courses[" + index + "]" + "[content]",
                item.content
              );
              dataForm.append(
                "service_courses[" + index + "]" + "[firstPr]",
                item.firstPr === null ? 0 : item.firstPr
              );
              if (item.gender_restrictions !== null) {
                dataForm.append(
                  "service_courses[" + index + "]" + "[gender_restrictions]",
                  item.gender_restrictions
                );
              } else {
                dataForm.append(
                  "service_courses[" + index + "]" + "[gender_restrictions]",
                  0
                );
              }

              dataForm.append(
                "service_courses[" + index + "]" + "[age_confirm]",
                item.age_confirm === "null" ? 0 : Number(item.age_confirm)
              );
            } else {
              dataForm.append(
                "service_courses[" + index + "]" + "[name]",
                item.name === undefined ? item.course_name : item.name
              );
              dataForm.append(
                "service_courses[" + index + "]" + "[price]",
                item.name === undefined
                  ? Number(item.course_price)
                  : Number(item.price)
              );
              dataForm.append(
                "service_courses[" + index + "]" + "[cycle]",
                item.cycle === undefined ? item.course_cycle : item.cycle
              );
              dataForm.append(
                "service_courses[" + index + "]" + "[content]",
                item.content === undefined ? item.course_content : item.content
              );
              dataForm.append(
                "service_courses[" + index + "]" + "[firstPr]",
                item.firstPr === undefined ? item.course_firstPr : item.firstPr
              );
              dataForm.append(
                "service_courses[" + index + "]" + "[gender_restrictions]",
                item.gender_restrictions === null ? 0 : item.gender_restrictions
              );
              dataForm.append(
                "service_courses[" + index + "]" + "[age_confirm]",
                item.age_confirm === undefined
                  ? item.course_age_confirm
                  : item.age_confirm
              );
            }
          });
          // ListImageCourse
          if (this.store.listImgCourse.length > 0) {
            this.store.listImgCourse.forEach((item, index) => {
              dataForm.append(
                "service_courses[" + index + "]" + "[image]",
                item.index === undefined ? item : item.file
              );
            });
          }
        } else {
          this.listCourseService.forEach((item, index) => {
            dataForm.append(
              "service_courses[" + index + "]" + "[name]",
              item.name
            );
            dataForm.append(
              "service_courses[" + index + "]" + "[price]",
              Number(item.price)
            );
            dataForm.append(
              "service_courses[" + index + "]" + "[cycle]",
              item.cycle
            );
            dataForm.append(
              "service_courses[" + index + "]" + "[content]",
              item.content
            );
            dataForm.append(
              "service_courses[" + index + "]" + "[firstPr]",
              item.firstPr
            );
            dataForm.append(
              "service_courses[" + index + "]" + "[gender_restrictions]",
              item.gender_restrictions == null
                ? 0
                : item.gender_restrictions == 1
                ? 1
                : 2
            );
            dataForm.append(
              "service_courses[" + index + "]" + "[age_confirm]",
              item.age_confirm === "null" ? 0 : Number(item.age_confirm)
            );
          });

          // ListImageCourse
          if (this.store.listImgCourse.length > 0) {
            this.store.listImgCourse.forEach((item, index) => {
              dataForm.append(
                "service_courses[" + index + "]" + "[image]",
                item.index === undefined ? item : item.file
              );
            });
          }
        }

        // ListImageCourse

        // ListStep
        this.listStep.forEach((item, index) => {
          if (item.id !== undefined) {
            dataForm.append("service_steps[" + index + "]" + "[id]", item.id);
            dataForm.append(
              "service_steps[" + index + "]" + "[number]",
              index + 1
            );
            dataForm.append(
              "service_steps[" + index + "]" + "[title]",
              item.title
            );
            if (item.content) {
              dataForm.append(
                "service_steps[" + index + "]" + "[content]",
                item.content
              );
            }
          } else {
            dataForm.append(
              "service_steps[" + index + "]" + "[number]",
              index + 1
            );
            dataForm.append(
              "service_steps[" + index + "]" + "[title]",
              item.title
            );
            if (item.content) {
              dataForm.append(
                "service_steps[" + index + "]" + "[content]",
                item.content
              );
            }
          }
        });
        // ListStep

        // ListDelivery
        if (this.listDelivery.length > 0) {
          this.listDelivery.forEach((item) => {
            dataForm.append("service_delivery" + "[interval]", item.interval);
            dataForm.append(
              "service_delivery" + "[month_delivery]",
              item.month_delivery
            );
            dataForm.append(
              "service_delivery" + "[skip]",
              item.skip === null ? 0 : item.skip
            );
            dataForm.append("service_delivery" + "[with_skip]", item.with_skip);
          });
        }

        // ListDelivery

        // service_reserve_setting
        if (
          Number(this.serviceTypeId == 2) ||
          Number(this.serviceTypeId == 3)
        ) {
          if (this.service_reserve_setting != null) {
            if (this.service_reserve_setting.max != null) {
              dataForm.append(
                "service_reserve_setting" + "[max]",
                this.service_reserve_setting.max
              );
            }

            dataForm.append(
              "service_reserve_setting" + "[is_enable]",
              this.service_reserve_setting.is_enable === true ? "1" : "0"
            );

            dataForm.append(
              "service_reserve_setting" + "[time_distance]",
              this.service_reserve_setting.time_distance != undefined
                ? this.service_reserve_setting.time_distance
                : null
            );
            dataForm.append(
              "service_reserve_setting" + "[duration_before]",
              this.service_reserve_setting.duration_before != undefined
                ? this.service_reserve_setting.duration_before
                : null
            );
            dataForm.append(
              "service_reserve_setting" + "[duration_after]",
              this.service_reserve_setting.duration_after != undefined
                ? this.service_reserve_setting.duration_after
                : null
            );
            dataForm.append(
              "service_reserve_setting" + "[type_duration_after]",
              this.service_reserve_setting.type_duration_after != undefined
                ? this.service_reserve_setting.type_duration_after
                : null
            );
          }
        }
        // service_reserve_setting

        // service_hours
        if (
          Number(this.serviceTypeId == 2) ||
          Number(this.serviceTypeId == 3)
        ) {
          if (this.service_hours != null) {
            this.service_hours.forEach((item, index) => {
              dataForm.append(
                "service_hours[" + index + "]" + "[day_of_week]",
                item.day_of_week
              );

              item.work_hour.map((item1, index1) => {
                dataForm.append(
                  "service_hours[" +
                    index +
                    "]" +
                    "[work_hour][" +
                    index1 +
                    "][start]",
                  item1.start
                );
                dataForm.append(
                  "service_hours[" +
                    index +
                    "]" +
                    "[work_hour][" +
                    index1 +
                    "][end]",
                  item1.end
                );
              });
              dataForm.append(
                "service_hours[" + index + "]" + "[status]",
                item.status == true ? 1 : 0
              );
            });
          }
        }
        this.preload = true;

        // service_hours
        if (this.isEditDraftService) {
          await this.store.editServiceById(dataForm, Number(id));
        } else {
          await this.store.createService(dataForm);
        }
        //
        this.service_reserve_setting = [];
        this.service_hours = [];
        this.listStep = [];
        this.listDelivery = [];
        this.listArea = [];
        this.listCourseService = [];
        this.listTag = [];
      }
    },

    showModalReview() {
      this.showModal = true;
      if (this.address !== "") {
        let request = {
          address: this.address,
        };
        this.store.getLatLngFromAddress(request);
      }

      if (this.store.listImgCourse.length > 0) {
        this.listCourseCurent.map((item, index) => {
          this.store.listImgCourse.map((item1, index1) => {
            if (index === index1) {
              item.course_images = item1;
            }
          });
        });
      }
    },

    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },

    formatNumber() {
      if (
        /^[a-z]/.test(this.zipCode) ||
        /^[A-Z]/.test(this.zipCode) ||
        /^[ａ-ｚ]/.test(this.zipCode) ||
        /^[Ａ-Ｚ]/.test(this.zipCode) ||
        /^[ぁ-ん]/.test(this.zipCode) ||
        /^[ァ-ン]/.test(this.zipCode) ||
        /^[一-龥]/.test(this.zipCode)
      ) {
        this.zipCode = this.zipCode
          .replace(/^[a-z]/, "")
          .replace(/^[A-Z]/, "")
          .replace(/^[ａ-ｚ]/, "")
          .replace(/^[Ａ-Ｚ]/, "")
          .replace(/^[ぁ-ん]/, "")
          .replace(/^[ァ-ン]/, "")
          .replace(/^[一-龥]/, "");
      }
    },

    formartZipcode() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.zipCode;
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1")
          .replace("-", "");
        text = text.replaceAll(",", "");
        if (text.length === 8) {
          text = "";
        }
        if (text.length > 3) {
          text = text.splice(3, 0, "-");
        }
      }
      if (text.length <= 8) {
        this.zipCode = text;
      }
      var zipcode = text;
      if (zipcode) {
        zipcode = zipcode.replaceAll("-", "");
      }

      if (zipcode !== "" && zipcode.length === 7) {
        this.store.getAddress(zipcode);
      }
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
      localStorage.removeItem("hash_id");
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
      localStorage.removeItem("lengthListCourse");
      localStorage.removeItem("urlType4");
      localStorage.removeItem("data-step-9-delete");
      localStorage.removeItem("listClick");
    },

    updatePageListCourse(page) {
      this.listCourseCurent = [];
      this.current_page = page;
      this.getListCourseCurrent();
    },

    copy() {
      this.$refs.copy.focus();
      document.execCommand("copy");
      this.textCopy = "コピー済み";
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

    getListCourseCurrent() {
      // let coursePreview = [];
      // this.listCourseTotal.map((item, index) => {
      //   if (this.current_page == 1) {
      //     if (index < 3) {
      //       coursePreview.push(item);
      //     }
      //   } else {
      //     if (
      //       index < this.current_page * 3 &&
      //       index > (this.current_page - 1) * 3 - 1
      //     ) {
      //       coursePreview.push(item);
      //     }
      //   }
      // });

      // this.listCourseCurent = coursePreview.filter(function (item, pos) {
      //   return coursePreview.indexOf(item.id) == pos;
      // });
      this.listCourseCurent = JSON.parse(localStorage.getItem("list-course"));
    },
  },
};
</script>

<style lang="scss" scoped>
#modal-preview {
  .page-service-header {
    &-title {
      font-size: 18px;
    }
  }
  .page-service-content {
    &-hashtag {
      margin-top: 40px;
    }
  }
  .page-service-flow {
    border-bottom: unset;
  }
}
.remaining-text {
  color: #7e7d7d;
  font-weight: 600;
  font-size: 18px;

  @include screen(480) {
    font-size: 16px;
  }
}
</style>
