<template>
  <NuxtLayout name="layoutdefault">
    <SDPreLoad :preload="preload" />
    <div class="paymentPage">
      <div class="paymentPage-header flex items-end">
        <div class="paymentPage-header-textJP">利用開始のお申し込み</div>
      </div>
      <div class="paymentPage-detail">
        <div class="paymentPage-detail-wave">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            class="wave wave1 absolute"
          >
            <path
              fill="#f48589"
              fill-opacity="1"
              d="M0,0L60,16C120,32,240,64,360,69.3C480,75,600,53,720,37.3C840,21,960,11,1080,32C1200,53,1320,107,1380,133.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            class="wave wave2 absolute"
          >
            <path
              fill="#fdad99"
              fill-opacity="1"
              d="M0,64L80,90.7C160,117,320,171,480,165.3C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            class="wave wave3 absolute"
          >
            <path
              fill="#e5e9fc"
              fill-opacity="1"
              d="M0,128L120,138.7C240,149,480,171,720,202.7C960,235,1200,277,1320,298.7L1440,320L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div class="paymentPage-detail-bar">
          <div class="item-course flex flex-col">
            <div class="item-top flex">
              <div class="item-top-image">
                <img
                  :src="
                    courseDetail.course_images != null
                      ? courseDetail.course_images
                      : '@/assets/images/detail1.png'
                  "
                  alt=""
                />
              </div>
              <div class="flex flex-col w-full justify-between">
                <div class="item-top-content flex">
                  <SDIcon icon="check" size="2x" style="width: 80px" />
                  <div class="flex flex-col">
                    <div class="item-top-content-title">
                      {{ courseDetail.name }}
                    </div>
                    <div class="item-top-content-description">
                      {{ courseDetail.content }}
                    </div>
                  </div>
                </div>
                <div class="item-top-price flex flex-col items-end">
                  <div class="item-top-price-text" v-if="this.service_type_id === 1">
                    （送料・税込）
                  </div>
                  <div class="item-top-price-text" v-else>（税込）</div>
                  <div class="item-top-price-number" v-if="courseDetail.price">
                    {{ $setComma(courseDetail.price) }} /
                    <span style="font-size: 18px" v-if="courseDetail.cycle !== null">
                      {{ courseDetail.cycle === 1 ? "" : courseDetail.cycle + "ヶ" }}月
                    </span>
                    <span style="font-size: 18px" v-else>
                      {{ courseDetail.cycle_format }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="paymentPage-main">
        <div v-if="preloadList" class="sd-preloads flex justify-center items-center">
          <div class="snippet" data-title=".dot-flashing">
            <div class="stage">
              <div class="dot-flashing"></div>
            </div>
          </div>
        </div>
        <div class="paymentPage-main-top flex flex-col pb-[50px]">
          <div class="info-course text-[#5E5C5C] py-3 text-[22px] font-semibold">
            お申込み内容
          </div>
          <div
            class="thead-course flex w-100 text-[#5E5C5C] py-3 md:text-[20px] sm:text-[18px] font-semibold px-3"
          >
            <!-- PC -->
            <div class="thead-course-item">コース名</div>
            <div class="thead-course-item">決済日</div>
            <!-- <div class="thead-course-item">決済No.</div> -->
            <div class="thead-course-item">価格</div>
            <!-- Mobile -->
            <div class="thead-course-item-sp" v-if="courseDetail.name">
              コース名: {{ courseDetail.name }}
            </div>
            <div
              class="thead-course-item-sp"
              v-if="courseDetail.payment_info && courseDetail.payment_info.charge_at"
            >
              決済日:
              {{ $moment(courseDetail.payment_info.charge_at).format("YYYY-MM-DD") }}
            </div>
            <!-- <div class="thead-course-item-sp">決済No: dataMobile</div> -->
          </div>
          <div
            class="tbody-course flex w-100 text-[#5E5C5C] py-[20px] md:text-[20px] sm:text-[18px] font-semibold px-3"
          >
            <div class="w-[40%] pe-3" style="word-break: break-all">
              {{ courseDetail.name }}
            </div>
            <div
              class="w-[45%]"
              v-if="courseDetail.payment_info && courseDetail.payment_info.charge_at"
            >
              {{ $moment(courseDetail.payment_info.charge_at).format("YYYY-MM-DD") }}
            </div>
            <!-- <div class="w-[40%]">1234567689</div> -->
            <div
              class="w-[15%]"
              v-if="courseDetail.payment_info && courseDetail.payment_info.amount"
            >
              <div class="w-[30%] flex justify-end">
                {{ $setComma(courseDetail.payment_info.price) }}
              </div>
            </div>
          </div>
          <div
            class="payment-course flex flex-col w-100 text-[#5E5C5C] py-[20px] md:text-[20px] sm:text-[18px] font-semibold px-3"
          >
            <!-- <div class="flex justify-end w-100 py-2 payment-course-item">
              <div class="w-[30%]">小計</div>
              <div
                class="w-[15%]"
                v-if="
                  courseDetail.payment_info && courseDetail.payment_info.price
                "
              >
                <div class="w-[30%] flex justify-end">
                  {{ $setComma(courseDetail.payment_info.price) }}
                </div>
                <div class="w-[70%]"></div>
              </div>
            </div> -->
            <!-- <div class="flex justify-end w-100 py-2 payment-course-item">
              <div class="w-[30%]">消費税</div>
              <div
                class="w-[15%]"
                v-if="
                  courseDetail.payment_info &&
                  courseDetail.payment_info.service_fee
                "
              >
                <div class="w-[30%] flex justify-end">
                  {{ $setComma(courseDetail.payment_info.service_fee) }}
                </div>
                <div class="w-[70%]"></div>
              </div>
            </div> -->
            <div class="flex justify-end w-100 py-2 payment-course-item">
              <div class="w-[30%]">合計</div>
              <div
                class="w-[15%] col col-sm-auto"
                v-if="courseDetail.payment_info && courseDetail.payment_info.price"
              >
                <div class="w-[30%] flex justify-end">
                  {{ $setComma(courseDetail.payment_info.price) }}
                </div>
                <div class="w-[70%]"></div>
              </div>
            </div>
            <div
              class="flex justify-end w-100 py-4 items-center text-[#7D9FB1] font-medium payment-course-item1"
            >
              <div class="col-2 col-sm-3">利用開始日</div>
              <div
                class="w-[15%] flex"
                v-if="
                  courseDetail.payment_info && courseDetail.payment_info.start_date_format
                "
              >
                {{ courseDetail.payment_info.start_date_format }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="paymentPage-main-mid flex flex-col py-[50px]"
          v-if="service_type_id === 1"
        >
          <div class="info-payment text-[#5E5C5C] py-3 text-[22px] font-semibold">
            送付先情報
          </div>
          <div class="list-payment">
            <div
              class="list-payment-item flex px-[20px] py-[25px] my-[20px] d-flex flex-wrap"
              :class="activeDelivery === index ? 'active' : ''"
              v-for="(item, index) in shippingInfo"
              :key="index"
              v-on:click="selectDelivery(item, index)"
            >
              <div class="address-payment mr-5">
                〒{{ item.post_code }} <br />{{ item.address }}
              </div>
              <div class="card-payment ms-auto">{{ item.phone }}</div>
              <div class="name-payment ms-auto">
                {{ item.last_name }} {{ item.first_name }}
              </div>
              <div class="action-payment flex ms-auto">
                <img :src="iconPen" alt="" class="mx-3" @click="showEditDelivery(item)" />
                <img :src="iconTrash" alt="" @click="showDeleteDelivery(item)" />
              </div>
            </div>
            <div class="list-payment-add flex items-center">
              <img
                :src="iconAdd"
                alt=""
                class="mr-2"
                @click="openModalAddDelivery"
              />送付先住所を追加する
            </div>
          </div>
        </div>
        <div class="paymentPage-main-bottom flex flex-col py-[50px]">
          <div class="info-stripe text-[#5E5C5C] py-3 text-[22px] font-semibold">
            お支払い方法
          </div>
          <div class="list-stripe">
            <div v-if="listCards && listCards.length > 0">
              <div
                class="list-stripe-item flex px-[20px] py-[25px] my-[20px] items-center"
                v-for="(item, index) in listCards"
                :key="index"
                :class="activeStripe === index ? 'active' : ''"
                v-on:click="selectStripe(item, index)"
              >
                <div class="img-stripe">
                  <img v-if="item.brand === 'Visa'" :src="visa" alt="" />
                  <img
                    class="imgCard"
                    v-else-if="item.brand === 'JCB'"
                    :src="jcb"
                    alt=""
                  />
                  <img
                    class="imgCard"
                    v-else-if="item.brand === 'Discover'"
                    :src="discover"
                    alt=""
                  />
                  <img
                    class="imgCard"
                    v-else-if="item.brand === 'Diners Club'"
                    :src="dinnerclub"
                    alt=""
                  />
                  <img
                    class="imgCard"
                    v-else-if="item.brand === 'UnionPay'"
                    :src="unionpay"
                    alt=""
                  />
                  <img
                    class="imgCard"
                    v-else-if="item.brand === 'American Express'"
                    :src="americanExpress"
                    alt=""
                  />
                  <img class="imgCard" v-else :src="mastercard" alt="" />
                </div>
                <div class="card-stripe">{{ item.brand }}　末尾　{{ item.last4 }}</div>
                <div class="date-stripe">
                  有効期限　{{ item.exp_month }}/{{ item.exp_year }}
                </div>
                <div class="name-stripe">
                  {{ item.name }}
                </div>
                <div class="action-stripe flex justify-content-center">
                  <img :src="iconTrash" alt="" v-on:click="showDeleteStripe(item)" />
                </div>
              </div>
            </div>
            <div class="list-stripe-add flex items-center">
              <img
                :src="iconAdd"
                alt=""
                class="mr-2"
                @click="showModalAddStripe = true"
              />新しいクレジットカードを追加する
            </div>
          </div>
        </div>
        <div class="paymentPage-main-button">
          <button v-on:click="redirectConfirm()">申込み内容を確認する</button>
        </div>
      </div>
      <!-- Modal Confirm Delete delivery -->
      <b-modal
        id="modal-confirm-delete-delivery"
        title="削除しますか？"
        v-model="showModalDeleteDelivery"
        hide-footer
      >
        <div class="modal-confirm">
          <div class="flex justify-around">
            <button class="bg-red-500 text-[#fff]" v-on:click="deleteDelivery()">
              はい
            </button>
            <button
              class="bg-gray-400 text-[#fff]"
              @click="showModalDeleteDelivery = false"
            >
              キャンセル
            </button>
          </div>
        </div>
      </b-modal>
      <!-- Modal Confirm Delete Stripe -->
      <b-modal
        id="modal-confirm-delete-stripe"
        title="削除しますか？"
        v-model="showModalDeleteStripe"
        hide-footer
      >
        <div class="modal-confirm">
          <div class="flex justify-around">
            <button class="bg-red-500 text-[#fff]" v-on:click="deleteStripe()">
              はい</button
            ><button
              class="bg-gray-400 text-[#fff]"
              @click="showModalDeleteStripe = false"
            >
              キャンセル
            </button>
          </div>
        </div>
      </b-modal>
      <!-- Modal Add Delivery? -->
      <b-modal
        id="modal-add-deliver"
        v-model="showModalAddDelivery"
        hide-footer
        hide-header
        size="lg"
        @hide="closeModalAddShipping"
      >
        <div class="modal-add-delivery w-full flex flex-col">
          <div class="header flex justify-between w-full items-center py-2">
            <div class="header-text">送付先情報</div>
            <div class="icon-close">
              <SDIcon icon="x" size="2x" @click="closeModalAddShipping" />
            </div>
          </div>
          <div class="main flex flex-col w-full px-[20px] py-[30px]">
            <div class="flex w-full items-center my-2">
              <div class="main-label">お名前</div>
              <div class="main-input flex justify-between">
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="姓"
                    class="custom-input"
                    v-model.trim="v$.newDelivery.last_name.$model"
                    v-bind:class="{
                      'is-invalid': v$.newDelivery.last_name.$error,
                    }"
                  />
                  <div v-if="v$.newDelivery.last_name.$error" class="error-text">
                    <p v-if="v$.newDelivery.last_name.required.$invalid">
                      {{ messageDelivery.last_name_required }}
                    </p>
                  </div>
                </div>
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="名"
                    class="custom-input"
                    v-model.trim="v$.newDelivery.first_name.$model"
                    v-bind:class="{
                      'is-invalid': v$.newDelivery.first_name.$error,
                    }"
                  />
                  <div v-if="v$.newDelivery.first_name.$error" class="error-text">
                    <p v-if="v$.newDelivery.first_name.required.$invalid">
                      {{ messageDelivery.first_name_required }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label">フリガナ</div>
              <div class="main-input flex justify-between">
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="セイ"
                    class="custom-input"
                    v-model.trim="v$.newDelivery.last_name_kana.$model"
                    v-bind:class="{
                      'is-invalid': v$.newDelivery.last_name_kana.$error,
                    }"
                    @input="testKanaLastName($event)"
                  />
                  <div v-if="v$.newDelivery.last_name_kana.$error" class="error-text">
                    <p v-if="v$.newDelivery.last_name_kana.required.$invalid">
                      {{ messageDelivery.last_name_kana_required }}
                    </p>
                  </div>
                  <div v-if="checkKatakanaLastName" class="error-text">
                    <p v-if="checkKatakanaLastName">
                      {{ messageDelivery.last_name_kana_invalid }}
                    </p>
                  </div>
                </div>
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="メイ"
                    class="custom-input"
                    v-model.trim="v$.newDelivery.first_name_kana.$model"
                    v-bind:class="{
                      'is-invalid': v$.newDelivery.first_name_kana.$error,
                    }"
                    @input="testKanaFirstName($event)"
                  />
                  <div v-if="v$.newDelivery.first_name_kana.$error" class="error-text">
                    <p v-if="v$.newDelivery.first_name_kana.required.$invalid">
                      {{ messageDelivery.first_name_kana_required }}
                    </p>
                  </div>
                  <div v-if="checkKatakanaFirstName" class="error-text">
                    <p v-if="checkKatakanaFirstName">
                      {{ messageDelivery.last_name_kana_invalid }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label">電話番号</div>
              <div class="main-input">
                <div class="w-full relative validate-form">
                  <input
                    placeholder="例）00000000000"
                    class="custom-input w-100"
                    v-model.trim="v$.newDelivery.phone.$model"
                    v-bind:class="{
                      'is-invalid': v$.newDelivery.phone.$error,
                    }"
                    id="phone_new_delivery"
                    @keypress="onlyNumber($event)"
                    v-bind="formatNumberPhoneNewShippingInfo()"
                  />
                  <div v-if="v$.newDelivery.phone.$error" class="error-text">
                    <p v-if="v$.newDelivery.phone.required.$invalid">
                      {{ messageDelivery.phone_required }}
                    </p>
                    <p v-if="v$.newDelivery.phone.maxLength.$invalid">
                      {{ messageDelivery.phone_has_11_numbers }}
                    </p>
                    <p v-if="v$.newDelivery.phone.minLength.$invalid">
                      {{ messageDelivery.phone_has_11_numbers }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label">郵便番号</div>
              <div class="main-input">
                <div class="w-full relative validate-form">
                  <input
                    placeholder="000-0000"
                    class="custom-input w-100"
                    v-model.trim="v$.newDelivery.post_code.$model"
                    v-bind:class="{
                      'is-invalid': v$.newDelivery.post_code.$error,
                    }"
                    id="zipcode_new_delivery"
                    @blur="formartZipcodeNewDelivery()"
                    maxlength="8"
                  />
                  <div v-if="v$.newDelivery.post_code.$error" class="error-text">
                    <p v-if="v$.newDelivery.post_code.required.$invalid">
                      {{ messageDelivery.post_code_required }}
                    </p>
                    <p v-if="v$.newDelivery.post_code.minLength.$invalid">
                      {{ messageDelivery.post_code_minLength }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label">住所</div>
              <div class="main-input">
                <div class="w-full relative validate-form">
                  <b-form-input
                    placeholder="例）大阪府大阪市北区梅田○-○-○　○○マンション○○号室"
                    class="custom-input"
                    v-model.trim="v$.newDelivery.address.$model"
                    v-bind:class="{
                      'is-invalid': v$.newDelivery.address.$error,
                    }"
                  />
                  <div v-if="v$.newDelivery.address.$error" class="error-text">
                    <p v-if="v$.newDelivery.address.required.$invalid">
                      {{ messageDelivery.address_required }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label"></div>
              <div class="">
                <div class="w-full relative validate-form">
                  <div class="flex items-end">
                    <b-form-checkbox v-model="newDelivery.is_default" class="mr-3"
                      >メインの発送元住所として設定</b-form-checkbox
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2 justify-end">
              <div class="main-btn">
                <button v-on:click="addDelivery()">登録する</button>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
      <!-- Modal Edit Delivery? -->
      <b-modal
        id="modal-add-deliver"
        v-model="showModalEditDelivery"
        hide-footer
        hide-header
        size="lg"
      >
        <div class="modal-add-delivery w-full flex flex-col">
          <div class="header flex justify-between w-full items-center py-2">
            <div class="header-text">送付先情報</div>
            <div class="icon-close">
              <SDIcon icon="x" size="2x" @click="showModalEditDelivery = false" />
            </div>
          </div>
          <div class="main flex flex-col w-full px-[20px] py-[30px]">
            <div class="flex w-full items-center my-2">
              <div class="main-label">お名前</div>
              <div class="main-input flex justify-between">
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="姓"
                    class="custom-input"
                    v-model.trim="v$.detailDelivery.last_name.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailDelivery.last_name.$error,
                    }"
                  />
                  <div v-if="v$.detailDelivery.last_name.$error" class="error-text">
                    <p v-if="v$.detailDelivery.last_name.required.$invalid">
                      {{ messageDelivery.last_name_required }}
                    </p>
                  </div>
                </div>
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="名"
                    class="custom-input"
                    v-model.trim="v$.detailDelivery.first_name.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailDelivery.first_name.$error,
                    }"
                  />
                  <div v-if="v$.detailDelivery.first_name.$error" class="error-text">
                    <p v-if="v$.detailDelivery.first_name.required.$invalid">
                      {{ messageDelivery.first_name_required }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label">フリガナ</div>
              <div class="main-input flex justify-between">
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="セイ"
                    class="custom-input"
                    v-model.trim="v$.detailDelivery.last_name_kana.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailDelivery.last_name_kana.$error,
                    }"
                  />
                  <div v-if="v$.detailDelivery.last_name_kana.$error" class="error-text">
                    <p v-if="v$.detailDelivery.last_name_kana.required.$invalid">
                      {{ messageDelivery.last_name_kana_required }}
                    </p>
                  </div>
                </div>
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="メイ"
                    class="custom-input"
                    v-model.trim="v$.detailDelivery.first_name_kana.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailDelivery.first_name_kana.$error,
                    }"
                  />
                  <div v-if="v$.detailDelivery.first_name_kana.$error" class="error-text">
                    <p v-if="v$.detailDelivery.first_name_kana.required.$invalid">
                      {{ messageDelivery.first_name_kana_required }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label">電話番号</div>
              <div class="main-input">
                <div class="w-full relative validate-form">
                  <input
                    placeholder="例）00000000000"
                    class="custom-input w-100"
                    v-model.trim="v$.detailDelivery.phone.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailDelivery.phone.$error,
                    }"
                    id="phone_delivery"
                    @keypress="onlyNumber($event)"
                    v-on:keyup="formatPhoneNumber()"
                  />
                  <div v-if="v$.detailDelivery.phone.$error" class="error-text">
                    <p v-if="v$.detailDelivery.phone.required.$invalid">
                      {{ messageDelivery.phone_required }}
                    </p>
                    <p v-if="v$.detailDelivery.phone.maxLength.$invalid">
                      {{ messageDelivery.phone_has_11_numbers }}
                    </p>
                    <p v-if="v$.detailDelivery.phone.minLength.$invalid">
                      {{ messageDelivery.phone_has_11_numbers }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label">郵便番号</div>
              <div class="main-input">
                <div class="w-full relative validate-form">
                  <input
                    placeholder="000-0000"
                    class="custom-input w-100"
                    v-model.trim="v$.detailDelivery.post_code.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailDelivery.post_code.$error,
                    }"
                    id="zipcode_delivery"
                    @blur="formartZipcode()"
                    maxlength="8"
                  />
                  <div v-if="v$.detailDelivery.post_code.$error" class="error-text">
                    <p v-if="v$.detailDelivery.post_code.required.$invalid">
                      {{ messageDelivery.post_code_required }}
                    </p>
                    <p v-if="v$.detailDelivery.post_code.minLength.$invalid">
                      {{ messageDelivery.post_code_minLength }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label">住所</div>
              <div class="main-input">
                <div class="w-full relative validate-form">
                  <b-form-input
                    placeholder="例）大阪府大阪市北区梅田○-○-○　○○マンション○○号室"
                    class="custom-input"
                    v-model.trim="v$.detailDelivery.address.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailDelivery.address.$error,
                    }"
                  />
                  <div v-if="v$.detailDelivery.address.$error" class="error-text">
                    <p v-if="v$.detailDelivery.address.required.$invalid">
                      {{ messageDelivery.address_required }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label"></div>
              <div class="">
                <div class="w-full relative validate-form">
                  <div class="flex items-end">
                    <b-form-checkbox v-model="detailDelivery.is_default" class="mr-3"
                      >メインの発送元住所として設定</b-form-checkbox
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2 justify-end">
              <div class="main-btn">
                <button v-on:click="editDelivery()">登録する</button>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
      <!-- Modal Add Stripe -->
      <b-modal id="modal-add-stripe" v-model="showModalAddStripe" hide-footer hide-header>
        <div class="modal-add-stripe w-full flex flex-col">
          <div class="header flex justify-between w-full items-center py-2">
            <div class="header-text">新しいクレジットカードを追加する</div>
            <div class="icon-close">
              <SDIcon icon="x" size="2x" @click="showModalAddStripe = false" />
            </div>
          </div>
          <div class="main flex flex-col w-full px-[20px] py-[30px]">
            <div class="p-[10px]" style="box-shadow: 0px 3px 6px #4d4d4d33">
              <StripeElements
                v-if="stripeLoaded"
                v-slot="{ elements }"
                ref="elms"
                :stripe-key="stripeKey"
                :instance-options="instanceOptions"
                :elements-options="elementsOptions"
                class="w-100"
              >
                <div class="d-flex w-100">
                  <div class="mx-1">
                    <BootstrapIcon icon="credit-card" />
                  </div>
                  <StripeElement
                    ref="card"
                    class="w-100"
                    type="cardNumber"
                    :elements="elements"
                  />
                  <StripeElement
                    ref="card"
                    style="width: 90px"
                    type="cardExpiry"
                    :elements="elements"
                  />
                  <StripeElement
                    ref="card"
                    style="width: 50px"
                    type="cardCvc"
                    :elements="elements"
                  />
                </div>
              </StripeElements>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label"></div>
              <div class="main-input">
                <div class="w-full relative validate-form">
                  <div class="flex items-end">
                    <b-form-checkbox v-model="newStripe.is_default" class="mr-3"
                      >メインのカードとして設定</b-form-checkbox
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-3 justify-center">
              <div class="main-btn">
                <button v-on:click="addStripe()">登録する</button>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </NuxtLayout>
</template>

<script>
import Cookies from "js-cookie";
import iconPen from "@/assets/images/iconPen.png";
import iconTrash from "@/assets/images/iconTrash.png";
import iconAdd from "@/assets/images/iconAdd.png";
import visa from "@/assets/images/visa.png";
import jcb from "@/assets/images/jcb.png";
import mastercard from "@/assets/images/mastercard.png";
import unionpay from "@/assets/images/unionpay.png";
import americanExpress from "@/assets/images/american-express.png";
import dinnerclub from "@/assets/images/dinnerclub.png";
import discover from "@/assets/images/discover.png";
import SDIcon from "@/components/SDIcon";
import { useToast } from "vue-toastification";
import { Message } from "@/utils/message";
import { courseStore } from "@/store/course";
import { shippingInfoStore } from "@/store/shipping_info";
import { cardStore } from "@/store/card";
import { mapState } from "pinia";
import SDPreLoad from "@/components/SDPreLoad";
import "moment/locale/ja";
import { StripeElementCard } from "@vue-stripe/vue-stripe";
import { StripeElements, StripeElement } from "vue-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { defineComponent, ref, onBeforeMount } from "vue";
import useVuelidate from "@vuelidate/core";
import { Urls } from "@/utils/urls";
import { required, minValue, minLength, maxLength } from "@vuelidate/validators";

export default {
  setup() {
    const toast = useToast();
    const storeCourse = courseStore();
    const storeShippingInfo = shippingInfoStore();
    const storeCard = cardStore();
    const stripeKey = ref(Urls.STRIPE_KEY);
    const instanceOptions = ref({
      // https://stripe.com/docs/js/initializing#init_stripe_js-options
    });
    const elementsOptions = ref({
      // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
    });
    const cardOptions = ref({
      // https://stripe.com/docs/stripe.js#element-options
    });
    const stripeLoaded = ref(false);
    const card = ref();
    const elms = ref();

    onBeforeMount(() => {
      const stripePromise = loadStripe(stripeKey.value);
      stripePromise.then(() => {
        stripeLoaded.value = true;
      });
    });

    const v$ = useVuelidate();
    return {
      toast,
      storeCourse,
      storeShippingInfo,
      storeCard,
      stripeKey,
      stripeLoaded,
      instanceOptions,
      elementsOptions,
      cardOptions,
      card,
      elms,
      v$,
    };
  },
  validations: {
    detailDelivery: {
      last_name: {
        required,
      },
      first_name: {
        required,
      },
      last_name_kana: {
        required,
      },
      first_name_kana: {
        required,
      },
      post_code: {
        required,
        minLength: minLength(8),
      },
      phone: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(11),
      },
      address: {
        required,
      },
    },
    newDelivery: {
      last_name: {
        required,
      },
      first_name: {
        required,
      },
      last_name_kana: {
        required,
      },
      first_name_kana: {
        required,
      },
      post_code: {
        required,
        minLength: minLength(8),
      },
      phone: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(11),
      },
      address: {
        required,
      },
    },
    detailStripe: {
      name: {
        required,
      },
      exp_month: {
        required,
      },
      exp_year: {
        required,
        minValue: minValue(new Date().getFullYear()),
      },
    },
  },
  data() {
    return {
      preloadList: false,
      messageDelivery: Message.DELIVERY,
      preload: true,
      course_id: this.$route.params.id,
      service_type_id: "",
      courseDetail: {},
      shippingInfo: [],
      account_id: null,
      listCards: [],
      newDelivery: {
        first_name: "",
        last_name: "",
        first_name_kana: "",
        last_name_kana: "",
        phone: "",
        post_code: "",
        address: "",
        is_default: false,
      },
      monthList: [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
        { text: "6", value: 6 },
        { text: "7", value: 7 },
        { text: "8", value: 8 },
        { text: "9", value: 9 },
        { text: "10", value: 10 },
        { text: "11", value: 11 },
        { text: "12", value: 12 },
      ],
      messageNoti: Message.PAYMENT,
      token: null,
      showModalDeleteDelivery: false,
      showModalDeleteStripe: false,
      showModalAddDelivery: false,
      showModalAddStripe: false,
      showModalEditDelivery: false,
      showModalEditStripe: false,
      detailDelivery: {
        first_name: "",
        last_name: "",
        first_name_kana: "",
        last_name_kana: "",
        phone: "",
        post_code: "",
        address: "",
        is_default: false,
      },
      detailStripe: {},
      visa,
      jcb,
      mastercard,
      unionpay,
      discover,
      americanExpress,
      dinnerclub,
      selected: "A",
      iconAdd,
      iconPen,
      iconTrash,
      activeDelivery: "",
      activeStripe: "",
      stripe: {},
      delivery: {},
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      page: 1,
      newStripe: {
        is_default: false,
      },
      cardDefault: "",
      messageShippingInfo: Message.DELIVERY,
      checkKatakanaLastName: false,
      checkKatakanaFirstName: false,
    };
  },
  components: {
    SDIcon,
    StripeElementCard,
    SDPreLoad,
    StripeElements,
    StripeElement,
  },
  computed: {
    ...mapState(courseStore, ["detailCourse"]),
    ...mapState(shippingInfoStore, [
      "successShipping",
      "messageShipping",
      "errorShipping",
      "shippingInfoList",
      "dataAddress",
      "errorAddress",
    ]),
    ...mapState(cardStore, ["successCard", "messageCard", "errorCard", "cardsList"]),
  },
  created() {
    let valueToken = null;
    let rememberLogin = localStorage.getItem("rememberLogin");
    let user_type = "";
    if (rememberLogin === "true") {
      valueToken = localStorage.getItem("token_user");
      this.account_id = localStorage.getItem("account_id");
      user_type = localStorage.getItem("type");
    } else {
      valueToken = Cookies.get("token_user");
      this.account_id = Cookies.get("account_id");
      user_type = Cookies.get("type");
    }
    if (!valueToken) {
      this.$router.push("/login");
    }
    if (user_type === "SELLER") {
      this.$router.push("/");
    }
    window.scrollTo(0, 0);
    this.storeCourse.getDetailCourse(this.course_id);
    this.storeShippingInfo.getShippingInfoByBuyerId(this.account_id);
    this.getListCards();
  },
  watch: {
    dataAddress() {
      if (this.showModalEditDelivery === true) {
        this.preload = true;
        this.detailDelivery.address = this.dataAddress.address_2;
        this.preload = false;
      }
      if (this.showModalAddDelivery === true) {
        this.preload = true;
        this.newDelivery.address = this.dataAddress.address_2;
        this.preload = false;
      }
    },
    detailCourse() {
      this.preload = true;
      this.courseDetail = this.detailCourse;
      if (this.courseDetail.service) {
        this.service_type_id = this.courseDetail.service.service_type_id;
      }
      this.preload = false;
    },
    shippingInfoList() {
      this.preload = true;
      this.shippingInfo = this.shippingInfoList;
      this.preload = false;
    },
    cardsList() {
      this.preload = true;
      this.listCards = this.cardsList.cards;
      this.cardDefault = this.cardsList.card_default;
      this.preload = false;
    },

    showModalEditDelivery() {
      if (this.showModalEditDelivery == false) {
        this.preload = true;
        this.storeShippingInfo.getShippingInfoByBuyerId(this.account_id);
        this.preload = false;
      }
    },

    successShipping() {
      this.preloadList = false;
      if (this.storeShippingInfo.successShipping === true) {
        this.toast.success(this.storeShippingInfo.messageShipping, this.optionToast);
        this.storeShippingInfo.successShipping = "";
        this.storeShippingInfo.messageShipping = "";
        this.showModalDeleteDelivery = false;
        this.showModalEditDelivery = false;
        this.showModalAddDelivery = false;
        this.storeShippingInfo.getShippingInfoByBuyerId(this.account_id);
      }
    },

    errorShipping() {
      this.preloadList = false;
      if (this.storeShippingInfo.errorShipping === true) {
        this.toast.error(this.storeShippingInfo.messageShipping, this.optionToast);
        this.storeShippingInfo.errorShipping = "";
        this.storeShippingInfo.messageShipping = "";
      }
    },

    errorAddress() {
      this.preloadList = false;
      if (this.storeShippingInfo.errorAddress === true) {
        this.toast.error(this.storeShippingInfo.messageShipping, this.optionToast);
        this.storeShippingInfo.errorAddress = "";
        this.storeShippingInfo.messageShipping = "";
      }
    },

    successCard() {
      this.preloadList = false;
      if (this.storeCard.successCard === true) {
        this.toast.success(this.storeCard.messageCard, this.optionToast);
        this.storeCard.successCard = "";
        this.storeCard.messageCard = "";
        this.showModalDeleteStripe = false;
        this.showModalEditStripe = false;
        this.showModalAddStripe = false;
        this.getListCards();
      }
    },

    errorCard() {
      this.preloadList = false;
      if (this.storeCard.errorCard === true) {
        this.toast.error(this.storeCard.messageCard, this.optionToast);
        this.storeCard.errorCard = "";
        this.storeCard.messageCard = "";
      }
    },
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },

    getListCards() {
      const request = {
        buyer_id: this.account_id,
        limit: 10,
        page: this.page,
      };
      this.storeCard.getListCardsByBuyerId(request);
    },

    showEditDelivery(item) {
      this.detailDelivery = item;
      this.detailDelivery.is_default = item.is_default === 1 ? true : false;
      this.showModalEditDelivery = true;
    },

    showDeleteDelivery(item) {
      this.detailDelivery = item;
      this.showModalDeleteDelivery = true;
    },

    selectDelivery(item, index) {
      if (this.activeDelivery) {
        const checkValue = this.activeDelivery;
        if (checkValue === index) {
          this.activeDelivery = "";
          this.delivery = {};
        } else {
          this.activeDelivery = "";
          this.activeDelivery = index;
          this.delivery = item;
        }
      } else {
        this.activeDelivery = index;
        this.delivery = item;
      }
    },

    async editDelivery() {
      const result = await this.v$.detailDelivery.$validate();
      this.checkNumber();

      if (result) {
        const request = {
          id: this.detailDelivery.id,
          last_name: this.detailDelivery.last_name,
          first_name: this.detailDelivery.first_name,
          last_name_kana: this.detailDelivery.last_name_kana,
          first_name_kana: this.detailDelivery.first_name_kana,
          phone: this.detailDelivery.phone,
          post_code: this.detailDelivery.post_code,
          address: this.detailDelivery.address,
          is_default: this.detailDelivery.is_default === true ? 1 : 0,
        };
        if (!/^([ァ-ヾ])/.test(request.first_name_kana)) {
          this.toast.error(
            this.messageDelivery.first_name_kana_invalid,
            this.optionToast
          );
        } else if (!/^([ァ-ヾ])/.test(request.last_name_kana)) {
          this.toast.error(this.messageDelivery.last_name_kana_invalid, this.optionToast);
        } else if (!/^[a-zA-Zぁ-んァ-ンｧ-ﾝﾞﾟ一-龥]+$/.test(request.first_name)) {
          this.toast.error(this.messageDelivery.first_name_invalid, this.optionToast);
        } else if (!/^[a-zA-Zぁ-んァ-ンｧ-ﾝﾞﾟ一-龥]+$/.test(request.last_name)) {
          this.toast.error(this.messageDelivery.last_name_invalid, this.optionToast);
        } else {
          this.preloadList = true;
          this.storeShippingInfo.editShippingInfo(request);
        }
      }
    },

    deleteDelivery() {
      this.preloadList = true;
      this.storeShippingInfo.deleteShippingInfo(this.detailDelivery.id);
    },

    checkNumber() {
      if (/^[０-９]/.test(this.detailDelivery.phone)) {
        this.toast.error(
          this.messageShippingInfo.enter_phone_halfwidth,
          this.optionToast
        );
        return;
      }
      if (/^[０-９]/.test(this.detailDelivery.post_code)) {
        this.toast.error(this.messageShippingInfo.zipcode_haflwidth, this.optionToast);
        return;
      }
    },

    testKanaFirstName(event) {
      if (!/^([ァ-ン]|ー)+$/.test(event)) {
        this.checkKatakanaFirstName = true;
      } else {
        this.checkKatakanaFirstName = false;
      }
    },

    testKanaLastName(event) {
      if (!/^([ァ-ン]|ー)+$/.test(event)) {
        this.checkKatakanaLastName = true;
      } else {
        this.checkKatakanaLastName = false;
      }
    },

    closeModalAddShipping() {
      this.showModalAddDelivery = false;
      this.v$.newDelivery.$reset();
    },

    async addDelivery() {
      const result = await this.v$.newDelivery.$validate();
      this.checkNumber();
      if (result) {
        const request = {
          buyer_id: this.account_id,
          last_name: this.newDelivery.last_name,
          first_name: this.newDelivery.first_name,
          last_name_kana: this.newDelivery.last_name_kana,
          first_name_kana: this.newDelivery.first_name_kana,
          phone: this.newDelivery.phone,
          post_code: this.newDelivery.post_code,
          address: this.newDelivery.address,
          is_default: this.newDelivery.is_default === true ? 1 : 0,
        };
        if (this.newDelivery.is_default === false && this.shippingInfo.length === 0) {
          this.toast.error(
            this.messageShippingInfo.check_default_address,
            this.optionToast
          );
          return;
        }
        if (!/^([ァ-ン]|ー)+$/.test(request.first_name_kana)) {
          this.toast.error(
            this.messageDelivery.first_name_kana_invalid,
            this.optionToast
          );
        } else if (!/^([ァ-ン]|ー)+$/.test(request.last_name_kana)) {
          this.toast.error(this.messageDelivery.last_name_kana_invalid, this.optionToast);
        } else if (!/^[a-zA-Zぁ-んァ-ンｧ-ﾝﾞﾟ一-龥]+$/.test(request.first_name)) {
          this.toast.error(this.messageDelivery.first_name_invalid, this.optionToast);
        } else if (!/^[a-zA-Zぁ-んァ-ンｧ-ﾝﾞﾟ一-龥]+$/.test(request.last_name)) {
          this.toast.error(this.messageDelivery.last_name_invalid, this.optionToast);
        } else {
          this.preloadList = true;
          this.storeShippingInfo.addShippingInfo(request);
          this.newDelivery = {
            first_name: "",
            last_name: "",
            first_name_kana: "",
            last_name_kana: "",
            phone: "",
            post_code: "",
            address: "",
            is_default: false,
          };
        }
      }
    },

    selectStripe(item, index) {
      if (this.activeStripe) {
        const checkValue = this.activeStripe;
        if (checkValue === index) {
          this.activeStripe = "";
          this.stripe = {};
        } else {
          this.activeStripe = "";
          this.activeStripe = index;
          this.stripe = item;
        }
      } else {
        this.activeStripe = index;
        this.stripe = item;
      }
    },

    addStripe() {
      const cardElement = this.card.stripeElement;
      this.elms.instance.createToken(cardElement).then((result) => {
        const request = {
          token_card: result.token.id,
          buyer_id: this.account_id,
          is_default: this.newStripe.is_default === true ? 1 : 0,
        };
        this.preloadList = true;
        this.storeCard.addCard(request);
        for (let i = 0; i < this.$refs.card.elements._elements.length; i++) {
          this.$refs.card.elements._elements[i].clear();
        }
      });
    },

    showDeleteStripe(item) {
      this.detailStripe = item;
      this.showModalDeleteStripe = true;
    },

    deleteStripe() {
      this.preloadList = true;
      this.storeCard.deleteCard(this.detailStripe.id, this.account_id);
    },

    redirectConfirm() {
      if (Object.keys(this.delivery).length === 0 && this.service_type_id === 1) {
        this.toast.error(this.messageNoti.delivery_required, this.optionToast);
      } else if (Object.keys(this.stripe).length === 0) {
        this.toast.error(this.messageNoti.stripe_required, this.optionToast);
      } else {
        localStorage.setItem("dataDelivery", JSON.stringify(this.delivery));
        localStorage.setItem("dataStripe", JSON.stringify(this.stripe));
        this.$router.push(`/payment/confirm/${this.course_id}`);
      }
    },

    getAddressPostCode(zipcode) {
      if (zipcode != "" && zipcode.length === 7) {
        this.storeShippingInfo.getAddress(zipcode);
      }
    },

    formatNumberZipcode() {
      var text = this.detailDelivery.post_code;
      if (
        /^[a-z]/.test(text) ||
        /^[A-Z]/.test(text) ||
        /^[ａ-ｚ]/.test(text) ||
        /^[Ａ-Ｚ]/.test(text) ||
        /^[ぁ-ん]/.test(text) ||
        /^[ァ-ン]/.test(text) ||
        /^[一-龥]/.test(text)
      ) {
        text = text
          .replace(/^[a-z]/, "")
          .replace(/^[A-Z]/, "")
          .replace(/^[ａ-ｚ]/, "")
          .replace(/^[Ａ-Ｚ]/, "")
          .replace(/^[ぁ-ん]/, "")
          .replace(/^[ァ-ン]/, "")
          .replace(/^[一-龥]/, "");
      }
      this.detailDelivery.post_code = text;
    },

    formartZipcode() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.detailDelivery.post_code;
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1")
          .replace("-", "");
        text = text.replaceAll("", "");
        if (text.length === 8) {
          text = "";
        }
        if (text.length > 3) {
          text = text.splice(3, 0, "-");
        }
      }
      if (text.length <= 8) {
        this.detailDelivery.post_code = text;
      }
      var zipcode = text;
      if (zipcode) {
        zipcode = zipcode.replaceAll("-", "");
      }
      if (zipcode.length === 7) {
        this.getAddressPostCode(zipcode);
      } else if (zipcode.length < 7) {
        this.detailDelivery.address = "";
      }
    },

    formatNumberZipcodeNewShippingInfo() {
      var text = this.newDelivery.post_code;
      if (
        /^[a-z]/.test(text) ||
        /^[A-Z]/.test(text) ||
        /^[ａ-ｚ]/.test(text) ||
        /^[Ａ-Ｚ]/.test(text) ||
        /^[ぁ-ん]/.test(text) ||
        /^[ァ-ン]/.test(text) ||
        /^[一-龥]/.test(text)
      ) {
        text = text
          .replace(/^[a-z]/, "")
          .replace(/^[A-Z]/, "")
          .replace(/^[ａ-ｚ]/, "")
          .replace(/^[Ａ-Ｚ]/, "")
          .replace(/^[ぁ-ん]/, "")
          .replace(/^[ァ-ン]/, "")
          .replace(/^[一-龥]/, "");
      }
      this.newDelivery.post_code = text;
    },

    formartZipcodeNewDelivery() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.newDelivery.post_code;
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1")
          .replace("-", "");
        text = text.replaceAll("", "");
        if (text.length === 8) {
          text = "";
        }
        if (text.length > 3) {
          text = text.splice(3, 0, "-");
        }
      }
      if (text.length <= 8) {
        this.newDelivery.post_code = text;
      }
      var zipcode = text;
      if (zipcode) {
        zipcode = zipcode.replaceAll("-", "");
      }
      if (zipcode.length === 7) {
        this.getAddressPostCode(zipcode);
      } else if (zipcode.length < 7) {
        this.newDelivery.address = "";
      }
    },

    openModalAddDelivery() {
      this.showModalAddDelivery = true;
      this.newDelivery = {
        first_name: "",
        last_name: "",
        first_name_kana: "",
        last_name_kana: "",
        phone: "",
        post_code: "",
        address: "",
        is_default: false,
      };
    },

    formatNumberPhoneShippingInfo() {
      var text = this.detailDelivery.phone;
      if (
        /^[a-z]/.test(text) ||
        /^[A-Z]/.test(text) ||
        /^[ａ-ｚ]/.test(text) ||
        /^[Ａ-Ｚ]/.test(text) ||
        /^[ぁ-ん]/.test(text) ||
        /^[ァ-ン]/.test(text) ||
        /^[一-龥]/.test(text)
      ) {
        text = text
          .replace(/^[a-z]/, "")
          .replace(/^[A-Z]/, "")
          .replace(/^[ａ-ｚ]/, "")
          .replace(/^[Ａ-Ｚ]/, "")
          .replace(/^[ぁ-ん]/, "")
          .replace(/^[ァ-ン]/, "")
          .replace(/^[一-龥]/, "");
      }
      this.detailDelivery.phone = text;
    },

    formatPhoneNumber() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.detailDelivery.phone;
      document.getElementById("phone_delivery").blur();
      document.getElementById("phone_delivery").focus();
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      if (text.length <= 13) {
        this.detailDelivery.phone = text;
      }
    },

    formatNumberPhoneNewShippingInfo() {
      var text = this.newDelivery.phone;
      if (
        /^[a-z]/.test(text) ||
        /^[A-Z]/.test(text) ||
        /^[ａ-ｚ]/.test(text) ||
        /^[Ａ-Ｚ]/.test(text) ||
        /^[ぁ-ん]/.test(text) ||
        /^[ァ-ン]/.test(text) ||
        /^[一-龥]/.test(text)
      ) {
        text = text
          .replace(/^[a-z]/, "")
          .replace(/^[A-Z]/, "")
          .replace(/^[ａ-ｚ]/, "")
          .replace(/^[Ａ-Ｚ]/, "")
          .replace(/^[ぁ-ん]/, "")
          .replace(/^[ァ-ン]/, "")
          .replace(/^[一-龥]/, "");
      }
      this.newDelivery.phone = text;
    },

    formatPhoneNumberNewDelivery() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.newDelivery.phone;
      document.getElementById("phone_new_delivery").blur();
      document.getElementById("phone_new_delivery").focus();
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      if (text.length <= 13) {
        this.newDelivery.phone = text;
      }
    },
  },
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      localStorage.removeItem("dataDelivery");
      localStorage.removeItem("dataStripe");
    });
  },
};
</script>

<style lang="scss">
.paymentPage {
  &-header {
    padding: 20px 400px;
    @include screen(991) {
      padding: 20px 50px;
    }
    background: $lightwhite;
    &-textJP {
      color: #5e5c5c;
      font-size: 22px;
      font-weight: 600;
    }
    &-textEN {
      margin-left: 20px;
      color: #5e5c5c;
      font-size: 16px;
    }
  }
  &-detail {
    background: white;
    width: 100%;
    height: 380px;
    position: relative;
    &-wave {
      height: 380px; /* change the height of the waves here */
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-x: hidden;
      overflow-y: hidden;
      z-index: 0;
      background: #ffd2cf;
      @include screen(991) {
        height: 300px;
      }
      @include screen(480) {
        height: 100%;
        display: none;
      }
      .wave {
        position: absolute;
      }
      .wave1 {
        animation: wave 20s -3s linear infinite;
        transform: translate3d(0, 0, 0);
        width: 200%;
        margin-top: -30px;
        z-index: 999;
        @include screen(991) {
          margin-top: 0;
        }
      }
      .wave2 {
        animation: wave 13s -3s linear infinite;
        width: 200%;
        margin-top: -100px;
        @include screen(991) {
          margin-top: 0;
        }
      }
      .wave3 {
        animation: wave 5s -3s linear infinite;
        transform: translate3d(0, 0, 0);
        opacity: 0.8;
        height: 100px;
        bottom: 0;
      }
      @keyframes wave {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(-25%);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    }
    @include screen(991) {
      height: 300px;
    }
    @include screen(480) {
      height: 500px;
    }
    &-text {
      position: absolute;
      font-size: 25px;
      font-weight: bold;
      color: #7e7d7d;
      margin-left: 100px;
      padding-top: 120px;
      // margin-bottom: 100px;
      @include screen(991) {
        text-align: center;
        margin-left: unset;
        padding-top: 30px;
      }
      @include screen(480) {
        font-size: 12px;
      }
    }
    &-bar {
      width: 50% !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      @include screen(991) {
        width: 80% !important;
      }
      @include screen(480) {
        width: 280px !important;
      }
      .item-course {
        width: 100%;
        background: white;
        height: 100%;
        border-radius: 14.78px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 2px 2px 2px #4d4d4d33;
        border-radius: 15px;
        opacity: 1;
        @include screen(480) {
          height: 100%;
        }
        .item-top {
          @include screen(480) {
            flex-direction: column;
          }
          &-image {
            @include screen(480) {
              display: flex;
              justify-content: center;
              align-items: center;
            }
            img {
              width: 200px;
              height: 200px;
              max-width: unset;
              object-fit: cover;
              @include screen(991) {
                width: 100px;
                height: 100px;
              }
              @include screen(480) {
                width: 200px;
                height: 200px;
                box-shadow: 3px 3px 3px #4d4d4d33;
                opacity: 1;
                margin-bottom: 20px;
              }
            }
          }

          &-content {
            margin-left: 20px;
            svg {
              @include screen(480) {
                width: 23px !important;
                height: 20px;
              }
            }

            &-title {
              color: #333333;
              font-size: 20px;
              font-weight: 600;

              @include screen(480) {
                font-size: 16px;
              }
            }

            &-description {
              font-size: 14px;
              color: $gray-800;
            }
          }

          &-price {
            &-text {
              font-size: 15px;
              color: $orange;
              font-weight: 600;
              @include screen(480) {
                font-size: 10px;
                margin-top: 8px;
              }
            }

            &-number {
              font-size: 35px;
              color: $orange;
              font-weight: 600;
              @include screen(991) {
                font-size: 22px;
              }
            }
          }
        }

        .item-bottom {
          button {
            border: none;
            background: #c0db5b;
            box-shadow: 3px 3px 6px #0000004f;
            opacity: 1;
            padding: 8px 0;
            color: white;
            font-weight: 600;
            width: calc(100% - 250px);

            @include screen(480) {
              width: unset;
              padding: 8px 20px;
            }

            @include screen(9921023) {
              width: unset;
              padding: 8px 20px;
            }

            @include screen(10241365) {
              width: unset;
              padding: 8px 20px;
            }
          }
        }
      }
    }
  }
  &-main {
    background: $white;
    padding: 50px 200px;
    @include screen(991) {
      padding: 30px 50px;
    }
    @include screen(9921023) {
      padding: 50px;
    }
    @include screen(10241365) {
      padding: 30px 100px;
    }
    &-top {
      @include screen(480) {
        padding-bottom: 25px;
      }
      .info-course {
        border-bottom: 1px solid $gray-500;
      }
      .thead-course {
        &-item {
          &:first-child {
            width: 40%;
          }
          &:nth-child(2) {
            width: 45%;
          }
          &:nth-child(3) {
            width: 15%;
          }
          // &:nth-child(4) {
          //   width: 20%;
          // }
          @include screen(480) {
            display: none;
          }
          &-sp {
            display: none;
            @include screen(480) {
              display: block;
              margin-block: 10px;
            }
          }
        }
        @include screen(480) {
          flex-direction: column;
          box-shadow: 0px 6px 6px rgb(0 0 0 / 16%);
          margin-top: 20px;
        }
      }
      .tbody-course {
        background: #f5f6fa;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 8px;
        opacity: 1;
        @include screen(480) {
          display: none;
        }
      }
      .payment-course {
        width: 60%;
        background: $white;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 0px 0px 8px 8px;
        opacity: 1;
        @include screen(480) {
          box-shadow: 0px 5px 6px #00000029 !important;
        }
        &-item {
          @include screen(480) {
            justify-content: space-between;
            max-width: 170px;
            margin-left: auto;
            div {
              width: fit-content;
              &:first-child {
                margin-left: auto;
              }
            }
          }
        }
        &-item1 {
          @include screen(480) {
            flex-direction: row !important;
            justify-content: space-between !important;
            min-width: fit-content;
            max-width: 170px;
            margin-left: auto;
            div {
              width: fit-content !important;
            }
          }
        }
      }
    }
    &-mid {
      @include screen(480) {
        padding-top: 25px;
        padding-bottom: 25px;
      }
      .info-payment {
        border-bottom: 1px solid $gray-500;
      }
      .list-payment {
        margin-top: 20px;
        &-item {
          cursor: pointer;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 8px;
          opacity: 1;
          background: $white;
          width: 100%;
          color: $gray-500;
          font-weight: 600;
          position: relative;
          align-items: center;
          @include screen(480) {
            flex-direction: column;
            align-items: flex-start;
          }
          .address-payment {
            @include screen(480) {
              font-size: 13px;
              margin-top: 20px;
            }
          }
          .card-payment {
            @include screen(480) {
              font-size: 14px;
              margin-left: 0 !important;
            }
          }
          .name-payment {
            @include screen(480) {
              font-size: 15px;
              margin-left: 0 !important;
            }
          }
          .action-payment {
            img {
              width: 50px;
              height: 50px;
              cursor: pointer;
            }
            @include screen(480) {
              position: absolute;
              right: 7px;
              top: 10px;
              img {
                width: 40px;
                height: 40px;
                margin: unset !important;
              }
            }
          }
        }
        .active {
          background: #f5f6fa;
        }
        &-add {
          color: $gray-500;
          cursor: pointer;
          font-size: 12px;
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    &-bottom {
      @include screen(480) {
        padding-top: 25px;
        padding-bottom: 25px;
      }
      .info-stripe {
        border-bottom: 1px solid $gray-500;
        width: 100%;
      }
      .list-stripe {
        margin-top: 20px;
        &-item {
          cursor: pointer;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 8px;
          opacity: 1;
          background: $white;
          width: 100%;
          color: $gray-500;
          font-weight: 600;
          position: relative;
          @include screen(480) {
            flex-direction: column;
            align-items: flex-start;
          }
          .img-stripe {
            width: 15%;
            @include screen(480) {
              font-size: 14px;
              width: 60%;
            }
          }
          .card-stripe {
            width: 27%;
            @include screen(480) {
              font-size: 14px;
              width: 60%;
              margin: 10px 0;
            }
          }
          .date-stripe {
            width: 20%;
            @include screen(480) {
              font-size: 14px;
              width: 60%;
              margin: 10px 0;
            }
          }
          .name-stripe {
            width: 20%;
            @include screen(480) {
              font-size: 14px;
              width: 60%;
            }
          }
          .action-stripe {
            width: 18%;
            img {
              width: 50px;
              height: 50px;
              cursor: pointer;
            }
            @include screen(480) {
              position: absolute;
              right: 1%;
              left: auto;
              top: 5%;
              img {
                width: 40px;
                height: 40px;
              }
            }
          }
        }
        .active {
          background: #f5f6fa;
        }
        &-add {
          color: $gray-500;
          cursor: pointer;
          @include screen(480) {
            font-size: 12px;
          }
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    &-button {
      button {
        width: 100%;
        background: $orange;
        border-radius: 8px;
        color: $white;
        padding: 10px;
      }
    }
  }
}
.modal-add-delivery {
  .header {
    border-bottom: 1px solid $gray-500;
    &-text {
      font-size: 20px;
      font-weight: 600;
      color: $gray-500;
    }
    .icon-close {
      cursor: pointer;
    }
  }
  .main {
    &-label {
      width: 25%;
      color: $gray-800;
      font-size: 18px;
      font-weight: 500;
    }
    &-input {
      width: 75%;
      input {
        border: 1px solid $gray-800;
        padding: 10px;
        border-radius: 8px;
        outline: none;
      }
    }
    &-btn {
      width: 75%;
      button {
        width: 100%;
        background: $orange;
        padding: 10px;
        color: $white;
        font-weight: 600;
        border-radius: 8px;
      }
    }
  }
}
.modal-add-stripe {
  .header {
    border-bottom: 1px solid $gray-500;
    &-text {
      font-size: 20px;
      font-weight: 600;
      color: $gray-500;
    }
    .icon-close {
      cursor: pointer;
    }
  }
  .form-check-input:checked {
    background: $orange !important;
    border-color: $orange !important;
  }
  .main-btn {
    button {
      background: $orange;
      border-radius: 8px;
      color: #fff;
      font-weight: 600;
      padding: 10px;
      width: 100%;
    }
  }
  .CardField-postalCode {
    display: none !important;
  }
}
</style>
