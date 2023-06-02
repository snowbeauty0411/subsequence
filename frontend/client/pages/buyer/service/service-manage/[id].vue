<template>
  <div id="BuyerServiceManageId">
    <SDPreLoad :preload="preload" />
    <div class="flex page-preview">
      <div class="flex flex-col">
        <div class="page-preview-link flex items-center flex-wrap">
          <div>
            <NuxtLink to="/buyer/service/management">サービス管理</NuxtLink>
          </div>
          <div class="mx-2">
            <BootstrapIcon icon="chevron-right" size="sm" />
          </div>
          <div>
            <NuxtLink
              v-bind:to="
                '/buyer/service/service-manage/' + serviceDetail.hash_id
              "
              >{{ serviceDetail.name }}</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="service-manage-header flex justify-between w-full">
      <div class="service-manage-header-left flex items-center w-[70%]">
        <div class="img-service">
          <img :src="image_service ? image_service : imgDefault" alt="" />
        </div>
        <div class="infomation-service flex flex-col">
          <div class="infomation-service-text1 my-1">
            {{ serviceDetail.name }}
          </div>
          <div class="infomation-service-text2 my-2">
            {{ service_course_name }}
          </div>
          <div
            class="infomation-service-text3 my-2"
            v-if="service_course_price"
          >
            {{ $setComma(service_course_price) }} /{{ service_course_cycle }}
          </div>
          <div class="w-100 d-flex items-center mb-2">
            <div class="infomation-service-text4 my-1 pe-4" v-if="account_name">
              {{ account_name }}
            </div>
            <b-button
              type="input"
              class="form-submit-button text-nowrap d-flex items-center"
              v-on:click="createThreadChat()"
            >
              <SDIcon icon="envelope" style="color: #5e5c5c" class="mb-0" />
              <span class="text-button mx-2">メッセージ</span>
            </b-button>
          </div>
          <div class="infomation-service-text3 my-2" v-if="business_name">
            {{ business_name }}
          </div>
          <div class="infomation-service-text5 my-1" v-if="service_start_date">
            サービス利用開始日：{{
              $moment(service_start_date).format("YYYY-MM-DD HH:mm")
            }}
          </div>
          <div class="infomation-service-text5 my-1" v-else>
            サービス利用開始日：-
          </div>
          <div
            class="infomation-service-text5 my-1"
            v-if="service_course_status === 2"
          >
            サービスの残り利用期間：{{
              $moment(service_course_endDate).format("YYYY-MM-DD HH:mm")
            }}
          </div>
        </div>
      </div>
      <div
        class="
          service-manage-header-right
          flex flex-col
          justify-between
          w-[30%]
          items-end
        "
      >
        <div>
          <Nuxt-Link
            :to="`/buyer/comment/post/${this.$route.params.id}`"
            v-if="service_course_status !== 2"
          >
            <div class="form-submit" v-if="commentDetail">
              <b-button type="input" class="form-submit-button">
                <SDIcon icon="pencil" style="color: #5e5c5c" />
                <span class="text-button mx-2">レビューを書く</span>
              </b-button>
            </div>
          </Nuxt-Link>
          <!-- <Nuxt-Link
            :to="`/buyer/comment/post/${this.$route.params.id}`"
            v-else
          > -->
          <div class="form-submit" v-else>
            <b-button
              type="input"
              class="form-submit-button"
              @click="showModalDelComment"
            >
              <SDIcon icon="pencil" style="color: #5e5c5c" />
              <span class="text-button mx-2">レビューの削除</span>
            </b-button>
          </div>
          <!-- </Nuxt-Link> -->
        </div>
        <div
          v-if="service_course_status !== 2"
          class="stop-service flex justify-center"
          v-b-modal.modal-stop-service
        >
          サービスの利用を停止する
        </div>
        <div v-else class="stop-service flex justify-center">解約済みです</div>
      </div>
    </div>
    <div class="service-manage-tabs">
      <b-tabs class="list-tabs" justified>
        <b-tab
          title="QRコード"
          :active="service_course_status !== 2"
          :disabled="service_course_status === 2"
          ><div
            class="
              tab-content-item
              item-qrcode
              flex
              justify-center
              items-center
              h-full
              flex-col
            "
          >
            <div
              class="
                item-qrcode-content
                flex
                justify-center
                items-center
                h-full
                flex-col
              "
              v-if="service_flag_qrCode !== 1"
            >
              <qrcode-vue
                :value="linkQR"
                class="qrcode my-5"
                level="H"
                :size="200"
              />
              <div class="item-qrcode-content-text1 mb-2">
                {{ serviceDetail.name }}
              </div>
              <div class="item-qrcode-content-text2">
                {{ account_name }}
              </div>
              <div
                class="item-qrcode-content-text3 my-4"
                v-if="pre_service_end_date"
              >
                前回サービス利用日時：{{
                  $moment(pre_service_end_date).format("YYYY-MM-DD HH:mm")
                }}
              </div>
              <div class="item-qrcode-content-text3 my-4" v-else>
                前回サービス利用日時：-
              </div>
            </div>
            <div
              class="
                item-qrcode-content
                flex
                justify-center
                items-center
                h-full
                flex-col
              "
              v-else
            >
              <b-button class="item-qrcode-content-btn my-5" v-on:click="showQR"
                >読み取り完了</b-button
              >
              <div class="item-qrcode-content-text1 mb-2">
                {{ serviceDetail.name }}
              </div>
              <div class="item-qrcode-content-text2 mb-5">
                {{ account_name }}
              </div>
              <div class="item-qrcode-content-text3" v-if="service_start_date">
                サービス利用日時：{{
                  $moment(service_start_date).format("YYYY-MM-DD HH:mm")
                }}
              </div>
              <div class="item-qrcode-content-text3" v-else>
                サービス利用日時：-
              </div>
              <img class="my-5" src="~/assets/images/subsQ_logo4.svg" alt="" />
            </div></div
        ></b-tab>
        <b-tab
          title="配送管理"
          :disabled="
            serviceDetail.service_type_id != 1 || service_course_status === 2
          "
          v-on:click="showListDeliveries"
          ><div class="tab-content-item flex flex-col item-tab2">
            <div class="item-tab2-select d-flex flex-wrap flex justify-end">
              <b-form-select
                name="checkbox3"
                v-model="paymentStatus"
                :options="optionPaymentStatus"
                size="md"
                class="form-select-custom mb-1"
              ></b-form-select>
              <b-form-select
                name="checkbox3"
                v-model="deliveryStatus"
                :options="optionDeliveryStatus"
                size="md"
                class="form-select-custom"
              ></b-form-select>
            </div>
            <div class="item-tab2-select flex justify-end my-2 items-center">
              <label for="filter-all">ページごとの表示数:</label>
              <b-form-select
                v-model="selectPerPageDelivery"
                class="form-select-custom-per-page"
                v-bind:options="optionPerPage"
              ></b-form-select>
            </div>
            <div class="item-tab2-table">
              <div
                v-if="preloadDelivery"
                class="sd-preloads flex justify-center items-center"
              >
                <div class="snippet" data-title=".dot-flashing">
                  <div class="stage">
                    <div class="dot-flashing"></div>
                  </div>
                </div>
              </div>
              <SDTable
                v-bind:items="listDelivery"
                v-bind:fields="fields"
                v-bind:border="false"
                v-bind:bgCell="false"
                v-bind:totalPage="totalPageDelivery"
                v-bind:currentPage="currentPageDelivery"
                v-on:update_page="updatePageDelivery"
              >
                <template #cell(payment_date)="{ item }">
                  <div
                    v-if="item.payment_date"
                    class="group-btn bg-midnight text-tahiti"
                  >
                    {{
                      item.payment_date != null
                        ? $moment(item.payment_date).format("YYYY-MM-DD")
                        : "-"
                    }}
                  </div>
                  <div
                    v-else
                    class="group-btn bg-midnight text-tahiti text-center"
                  >
                    -
                  </div>
                </template>
                <template #cell(payment_status)="{ item }">
                  <div
                    v-if="item.payment_status === 0"
                    class="group-btn bg-midnight text-tahiti text-center"
                  >
                    -
                  </div>
                  <div
                    v-if="item.payment_status === 1"
                    class="group-btn bg-midnight text-tahiti text-center"
                  >
                    支払い確認済み
                  </div>
                </template>
                <template #cell(course_name)="{ item }">
                  <div class="group-btn bg-midnight text-tahiti text-center">
                    {{ item.course_name }}
                  </div>
                </template>
                <template #cell(delivery_status)="item">
                  <div
                    class="status-payment"
                    style="background: #ff9f9f"
                    v-if="item.item.delivery_status === 0"
                  >
                    スキップ
                  </div>
                  <button
                    class="status-payment"
                    :class="skip ? '' : 'cursor-pointer'"
                    style="background: #e79c3acc"
                    v-if="item.item.delivery_status === 1"
                    v-on:click="
                      showModalConfirmSkip(
                        item.item.estimated_date,
                        item.item.id
                      )
                    "
                    :disabled="skip"
                  >
                    配送待ち
                  </button>
                  <div
                    class="status-payment"
                    style="background: #c0db5b"
                    v-if="item.item.delivery_status === 2"
                  >
                    配送完了
                  </div>
                </template>
              </SDTable>
            </div>
          </div></b-tab
        >
        <b-tab title="支払明細" :active="service_course_status === 2"
          ><div class="tab-content-item flex flex-col item-tab3">
            <div class="item-tab3-select flex justify-end my-2 items-center">
              <label for="filter-all">ページごとの表示数:</label>
              <b-form-select
                v-model="selectPerPagePayment"
                class="form-select-custom-per-page"
                v-bind:options="optionPerPage"
              ></b-form-select>
            </div>
            <div class="item-tab3-table">
              <div
                v-if="preloadPayment"
                class="sd-preloads flex justify-center items-center"
              >
                <div class="snippet" data-title=".dot-flashing">
                  <div class="stage">
                    <div class="dot-flashing"></div>
                  </div>
                </div>
              </div>
              <SDTable
                v-bind:items="listPayment"
                v-bind:fields="fields1"
                v-bind:border="false"
                v-bind:bgCell="false"
                v-bind:totalPage="totalPagePayment"
                v-bind:currentPage="currentPagePayment"
                v-on:update_page="updatePagePayment"
              >
                <template #cell(payment_status)="{ item }">
                  <div
                    v-if="item.payment_status === 2"
                    class="group-btn bg-midnight text-tahiti"
                  >
                    解約済み
                  </div>
                </template>
                <template #cell(pay_expire_at_date)="{ item }">
                  <div
                    v-if="item.pay_expire_at_date"
                    class="group-btn bg-midnight text-tahiti"
                  >
                    {{ item.pay_expire_at_date.split(" ")[0] }}
                  </div>
                  <div
                    v-else
                    class="group-btn bg-midnight text-tahiti text-center"
                  >
                    -
                  </div>
                </template>
                <template #cell(totalsub_total)="{ item }">
                  <div
                    v-if="item.sub_total"
                    class="group-btn bg-midnight text-tahiti"
                  >
                    {{ $setComma(item.sub_total) }}
                  </div>
                  <div v-else class="group-btn bg-midnight text-tahiti">-</div>
                </template>
                <template #cell(action)="data">
                  <div>
                    <b-button
                      square
                      v-on:click="detailPaymentById(data.item.id)"
                      variant="outline-primary"
                      size="sm"
                      v-b-tooltip.hover.top
                      title="詳細な支払い"
                      v-b-modal.modal-detail
                    >
                      <BootstrapIcon icon="eye" />
                    </b-button>
                  </div>
                </template>
              </SDTable>
            </div></div
        ></b-tab>
        <b-tab
          :disabled="
            serviceDetail.service_type_id === 1 ||
            serviceDetail.service_type_id === 4 ||
            service_course_status === 2
          "
          title="予約管理"
          class="tabsSchedule"
        >
          <div class="tab-content-item flex flex-col">
            <div
              class="
                header-tab4
                flex
                d-flex
                flex-wrap
                justify-between
                py-[30px]
              "
            >
              <div class="header-tab4-left flex items-center mb-2">
                <b-button
                  variant="light"
                  class="
                    action-schedule-button
                    flex flex-center
                    items-center
                    px-4
                  "
                  v-on:click="showModalListReserve = true"
                >
                  <BootstrapIcon
                    icon="pencil"
                    class="ml-2 m-[5px]"
                  ></BootstrapIcon>
                  予約一覧
                </b-button>
              </div>
              <div class="font-semibold mx-4 mb-2">
                前回の予約：{{
                  last_day_reserves
                    ? $moment(last_day_reserves).format("YYYY-MM-DD")
                    : "-"
                }}
              </div>

              <div class="header-tab4-right mb-2">
                <Datepicker
                  v-model="month"
                  monthPicker
                  locale="ja"
                  format="yyyy年M月"
                  autoApply
                  closeOnScroll
                  @update:modelValue="getMonth"
                >
                  <template #action-preview="{ value }">
                    {{ getDate(value) }}
                  </template>
                </Datepicker>
              </div>
            </div>
            <CalendarSchedule v-if="serviceDetail.is_reserves === 1" />
            <div v-else class="text-center p-3">
              このサービスは予約機能がありません。
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <!-- Modal Detail -->
    <b-modal
      id="modal-detail"
      ref="modal-detail"
      v-model="showModalDetail"
      hide-header
      hide-footer
    >
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="6"><div class="textLeft w-full">小計</div></b-col
            ><b-col cols="6"
              ><div class="textRight w-full">
                {{
                  paymentDetail.sub_total
                    ? $setComma(paymentDetail.sub_total)
                    : "￥0"
                }}
              </div></b-col
            >
            <!-- <b-col cols="6"
              ><div class="textLeft w-full">サービス手数料</div></b-col
            ><b-col cols="6"
              ><div class="textRight w-full">
                {{
                  paymentDetail.service_fee
                    ? $setComma(paymentDetail.service_fee)
                    : "-"
                }}
              </div></b-col
            > -->
            <b-col cols="6"><div class="textLeft w-full">合計</div></b-col
            ><b-col cols="6"
              ><div class="textRight w-full">
                {{
                  paymentDetail.sub_total
                    ? $setComma(paymentDetail.sub_total)
                    : "￥0"
                }}
              </div></b-col
            ><b-col cols="12"
              ><div class="flex justify-end py-3">
                <b-button
                  class="btn-print"
                  v-on:click="printPayment(paymentDetail.id)"
                  >領収書を発行する</b-button
                >
              </div>
            </b-col></b-row
          >
        </b-container>
      </div>
    </b-modal>
    <!-- Modal Detail -->
    <!-- Modal Stop Service -->
    <b-modal
      id="modal-stop-service"
      hide-footer
      title="サービス利用停止の確認"
      size="xl"
    >
      <div class="content-modal-detail mx-10">
        <div class="page-service-rate-list-item flex flex-col mt-14">
          <div class="item-top flex mx-3.5">
            <div class="item-top-image">
              <img :src="image_service ? image_service : imgDefault" alt="" />
            </div>
            <div class="flex flex-col w-full">
              <div class="item-top-content flex justify-flex-start">
                <div class="item-top-content-icon">
                  <SDIcon icon="check" size="2x" style="width: 100%" />
                </div>
                <div class="flex flex-col">
                  <div
                    class="item-top-content-title"
                    v-if="service_course_name"
                  >
                    {{ service_course_name }}
                  </div>
                  <div
                    class="item-top-content-description"
                    v-if="service_course_content"
                    v-html="replaceText(service_course_content)"
                  ></div>
                </div>
              </div>
              <div class="item-top-price flex flex-col items-end">
                <div
                  class="item-top-price-text"
                  v-if="serviceDetail.service_type_id === 1"
                >
                  （送料・税込）
                </div>
                <div class="item-top-price-text" v-else>（税込）</div>
                <div class="item-top-price-number">
                  {{
                    service_course_price ? $setComma(service_course_price) : "-"
                  }}
                  /<span style="font-size: 18px">月</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex checkbox-stop w-full justify-end items-center">
          <label class="mr-20">利用開始日</label>
          {{
            service_start_date
              ? $moment(service_start_date).format("MM") +
                "月" +
                $moment(service_start_date).format("DD") +
                "日"
              : "-"
          }}
        </div>
        <div class="text-description-stop flex justify-center text-left">
          <span
            >次回決済よりキャンセル扱いになります。<br />
            サービスの利用を停止すると、QRコードや配送管理機能、予約管理機能、レビューなどが利用できなくなります。<br />
            よろしければ、下の「サービスの利用を停止する」ボタンを押してください。</span
          >
        </div>
        <div class="btn-confirm-stop flex justify-center">
          <button v-b-modal.modal-confirm-stop-service>
            サービスの利用を停止する
          </button>
        </div>
      </div>
    </b-modal>
    <!-- Modal Stop Service -->
    <!-- Modal Confirm Stop -->
    <b-modal
      id="modal-confirm-stop-service"
      ref="modal-confirm-stop-service"
      hide-header
      hide-footer
      v-model="showModalConfirmStopService"
    >
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="12"
              ><div class="flex justify-center py-3">
                <p v-if="serviceDetail.reserves_count > 0">
                  現在、予約サービスが{{
                    serviceDetail.reserves_count
                  }}件あります。サービス利用を停止すると、この予約が解除になります。<br />
                  このサービスを利用停止しますか。
                </p>
                <p v-else>このサービスを利用停止しますか。</p>
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="showModalConfirmStopService = false"
                  >キャンセル</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-submit"
                  v-on:click="stopService(service_store_buyers_id)"
                  >確認</b-button
                >
              </div>
            </b-col></b-row
          >
        </b-container>
      </div>
    </b-modal>
    <!-- Modal Detail -->
    <!-- Modal List Reserve -->
    <b-modal
      id="modal-reserve"
      v-model="showModalListReserve"
      hide-footer
      hide-header
      size="lg"
    >
      <div class="list-reserve w-full flex flex-col">
        <div class="header flex justify-between w-full items-center py-2">
          <div class="header-text">予約一覧</div>
          <div class="icon-close">
            <SDIcon icon="x" size="2x" @click="showModalListReserve = false" />
          </div>
        </div>
        <div
          class="
            main
            flex flex-col
            w-full
            px-[100px]
            py-[30px]
            justify-center
            items-center
          "
        >
          <div
            class="
              main-detail
              flex
              justify-flex-start
              items-center
              p-[30px]
              bg-[#FAF9F3]
              w-full
            "
          >
            <div class="main-detail-left mr-[25px]">
              <img :src="image_service ? image_service : imgDefault" alt="" />
            </div>
            <div class="main-detail-right flex flex-col">
              <div class="font-semibold">
                {{ serviceDetail.caption }} <br />
                「{{ serviceDetail.name }}」
              </div>
              <div class="font-medium my-2">{{ serviceDetail.name }}</div>
              <div
                class="font-semibold"
                v-if="
                  serviceDetail.service_store_buyers &&
                  serviceDetail.service_store_buyers.length > 0 &&
                  serviceDetail.service_store_buyers[0].service_courses
                "
              >
                {{ serviceDetail.service_store_buyers[0].service_courses.name }}
              </div>
            </div>
          </div>
          <div class="main-list w-full">
            <div
              v-if="preloadReservations"
              class="sd-preloads flex justify-center items-center"
            >
              <div class="snippet" data-title=".dot-flashing">
                <div class="stage">
                  <div class="dot-flashing"></div>
                </div>
              </div>
            </div>
            <div class="main-list-header flex bg-[#F5F6FA] w-full px-3 py-2">
              <div class="text-[#5E5C5C] font-semibold w-[65%]">予約日時</div>
              <div class="text-[#5E5C5C] font-semibold w-[35%]">操作</div>
            </div>
            <div
              class="main-list-item flex w-full px-3 py-[15px]"
              v-for="(item, index) in listReservations"
              :key="index"
            >
              <div
                class="text-[#5E5C5C] font-semibold w-[65%]"
                v-if="item.reserve_start"
              >
                {{ $moment(item.reserve_start).format("YYYY") }}年{{
                  item.date_format
                }}
              </div>
              <div class="text-[#5E5C5C] font-semibold w-[35%]">
                <button
                  class="bg-[#e79c3a] text-[#fff] px-[10px] py-[5px] rounded-lg"
                  v-on:click="showCancelReservation(item)"
                >
                  予約キャンセル
                </button>
              </div>
            </div>
            <div
              v-if="!listReservations || listReservations.length === 0"
              class="text-center my-3"
            >
              このサービスは予約スケジュールがありません。
            </div>
            <SDPagination
              :totalpage="totalPageReservations"
              :currentPage="currentPageReservations"
              v-on:update-page="updatePageReservations"
              v-if="totalPageReservations > 1"
            />
          </div>
        </div>
      </div>
    </b-modal>
    <!-- Modal Cancel Reservation -->
    <b-modal
      id="modal-cancel-reservation"
      v-model="showModalCancelReserve"
      hide-footer
      hide-header
      size="lg"
    >
      <div class="list-reserve w-full flex flex-col">
        <div class="header flex justify-between w-full items-center py-2">
          <div class="header-text">この予約をキャンセルする</div>
          <div class="icon-close">
            <SDIcon
              icon="x"
              size="2x"
              @click="showModalCancelReserve = false"
            />
          </div>
        </div>
        <div
          class="
            main
            flex flex-col
            w-full
            px-[100px]
            py-[30px]
            justify-center
            items-center
          "
        >
          <div
            class="
              main-detail
              flex
              justify-flex-start
              items-center
              p-[30px]
              bg-[#FAF9F3]
              w-full
            "
          >
            <div class="main-detail-left mr-[25px]">
              <img :src="image_service ? image_service : imgDefault" alt="" />
            </div>
            <div class="main-detail-right flex flex-col">
              <div class="font-semibold">
                {{ serviceDetail.caption }} <br />
                「{{ serviceDetail.name }}」
              </div>
              <div class="font-medium my-2">{{ serviceDetail.name }}</div>
              <div
                class="font-semibold"
                v-if="
                  serviceDetail.service_store_buyers &&
                  serviceDetail.service_store_buyers.length > 0 &&
                  serviceDetail.service_store_buyers[0].service_courses
                "
              >
                {{ serviceDetail.service_store_buyers[0].service_courses.name }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            main-list-top
            relative
            flex
            pr-[100px]
            pl-[30px]
            py-[30px]
            items-center
          "
        >
          <div class="w-[70px] font-semibold text-[#5e5c5c]">予約日時</div>
          <div
            class="p-[15px] rounded-lg font-semibold text-[#5e5c5c]"
            style="border: 1px solid #5e5c5c; width: calc(100% - 70px)"
            v-if="detailReservation.reserve_start"
          >
            {{ $moment(detailReservation.reserve_start).format("YYYY") }}年{{
              detailReservation.date_format
            }}
          </div>
        </div>
        <div class="main-list w-full px-[100px] py-[30px]">
          <div class="main-list-bottom w-full">
            <button
              class="
                bg-[#e79c3a]
                text-[#fff]
                px-[10px]
                py-[15px]
                rounded-lg
                w-full
              "
              v-on:click="cancelReservation"
            >
              予約のキャンセル
            </button>
          </div>
        </div>
      </div>
    </b-modal>

    <b-modal
      v-model="showModalConfirm"
      hide-header
      hide-footer
      id="modal-confirm"
    >
      <div class="modal-confirm-content">
        <b-container fluid>
          <b-row>
            <b-col cols="12"
              ><div class="flex justify-center py-3">
                次回配送をスキップしますか？
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="showModalConfirm = false"
                  >いいえ</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button class="btn-submit" v-on:click="skipDelivery()"
                  >はい</b-button
                >
              </div>
            </b-col></b-row
          >
        </b-container>
      </div>
    </b-modal>
    <b-modal
      v-model="showModalDeleteComment"
      hide-header
      hide-footer
      id="modal-confirm"
    >
      <div class="modal-confirm-content">
        <b-container fluid>
          <b-row>
            <b-col cols="12"
              ><div class="flex justify-center py-3">
                このサービスに投稿した過去のレビューを削除します。よろしいですか？
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button
                  class="btn-cancel"
                  v-on:click="showModalDeleteComment = false"
                >
                  キャンセル</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button class="btn-submit" v-on:click="deleteComment()"
                  >削除する</b-button
                >
              </div>
            </b-col></b-row
          >
        </b-container>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { tableFields } from "@/utils/table-fields";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import CalendarSchedule from "@/components/SDCalendarSchedule";
import SDPreLoad from "@/components/SDPreLoad";
import SDIcon from "../../../../components/SDIcon";
import imgDefault from "@/assets/images/detail1.png";
import SDTable from "../../../../components/SDTable";
import "moment/locale/ja";
import { buyerStore } from "@/store/buyer/index.ts";
import { mapState } from "pinia";
import QrcodeVue from "qrcode.vue";
import Cookies from "js-cookie";
import { useToast } from "vue-toastification";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { reservationStoreBuyer } from "@/store/buyer/reservations.ts";
import SDPagination from "@/components/SDPagination";
import { Message } from "@/utils/message";
import { ChatStore } from "@/store/chat/index.ts";

export default {
  name: "BuyerServiceManageId",
  emits: ["update_page"],
  components: {
    BootstrapIcon,
    CalendarSchedule,
    SDIcon,
    SDTable,
    SDPreLoad,
    QrcodeVue,
    Datepicker,
    SDPagination,
  },
  setup() {
    const store = buyerStore();
    const toast = useToast();
    const chatStore = ChatStore();
    const month = ref({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
    const reservationsBuyer = reservationStoreBuyer();
    return {
      toast,
      store,
      reservationsBuyer,
      month,
      chatStore,
    };
  },
  data() {
    return {
      showModalConfirmStopService: false,
      dataTest: [
        { text: "2022年5月15日(日)10:00-12:00" },
        { text: "2022年5月15日(日)10:00-12:00" },
        { text: "2022年5月15日(日)10:00-12:00" },
        { text: "2022年5月15日(日)10:00-12:00" },
      ],
      showModalListReserve: false,
      showModalCancelReserve: false,
      showModalDeleteReserve: false,
      showModalDetail: false,
      showModalConfirm: false,
      showModalDeleteComment: false,
      optionsMont: [
        { text: "上限なし", value: 0 },
        { text: "上限あり", value: 1 },
      ],
      optionToast: {
        type: "error",
        position: "top-right",
        duration: 1,
        keepOnHover: true,
        singleton: true,
        theme: "toasted-primary",
        iconPack: "material",
        fitToScreen: true,
      },
      showQRCode: true,
      linkQR: null,
      hashID: this.$route.params.id,
      idService: null,
      listDelivery: [],
      listPayment: [],
      serviceDetail: {},
      account_name: null,
      business_name: null,
      service_start_date: null,
      pre_service_end_date: null,
      service_course_name: null,
      service_course_price: null,
      service_course_content: null,
      service_flag_qrCode: null,
      image_service: null,
      service_store_buyers_id: null,
      checked: "1",
      imgDefault,
      optionPerPage: [
        { value: 10, text: 10 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
      ],
      selectPerPageDelivery: 10,
      selectPerPagePayment: 10,
      optionPaymentStatus: [
        { value: "", text: "決済ステータス" },
        { value: 0, text: "未決済" },
        { value: 1, text: "支払い確認済み" },
      ],
      optionDeliveryStatus: [
        { value: "", text: "配送ステータス" },
        { value: 0, text: "スキップ" },
        { value: 1, text: "配送待ち" },
        { value: 2, text: "配送完了" },
      ],
      currentItems: [],
      fields: tableFields.LIST_DELIVERY_MANAGEMENT_BUYER,
      fields1: tableFields.LIST_DETAIL_PAYMENT,
      subtotal: null,
      fee: null,
      total: null,
      deliveryStatus: "",
      paymentStatus: "",
      pageDelivery: 1,
      pagePayment: 1,
      pageReservations: 1,
      totalPageDelivery: 1,
      currentPageDelivery: 1,
      totalPagePayment: 1,
      currentPagePayment: 1,
      totalPageReservations: 1,
      currentPageReservations: 1,
      preload: true,
      commentDetail: {},
      paymentDetail: {},
      preloadDelivery: false,
      preloadPayment: false,
      preloadReservations: false,
      last_day_reserves: "",
      listReservations: [],
      detailReservation: {},
      with_skip: null,
      skip: false,
      messageNoti: Message.SELLER,
      messageComment: Message.COMMENT,
      idDelivery: null,
      flagQR: true,
      seller_id: this.$route.query.seller_id,
      is_stop: this.$route.query.is_stop,
      service_course_status: "",
      service_course_endDate: "",
      serviceId: null,
      listCmtBuyer: [],
      checkEnable: false,
    };
  },

  created() {
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.token = localStorage.getItem("token_user");
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      this.token = Cookies.get("token_user");
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }
    this.getDateNowBuyer();

    if (this.is_stop === "true") {
      this.linkQR =
        window.location.origin +
        "/seller/service/service-manage/qrcode?user_id=" +
        this.account_id +
        "&service_id=" +
        this.hashID +
        "&seller_id=" +
        this.seller_id;
      this.store.getDetailServiceStop(this.hashID);
    } else {
      this.linkQR =
        window.location.origin +
        "/seller/service/service-manage/qrcode?user_id=" +
        this.account_id +
        "&service_id=" +
        this.hashID +
        "&seller_id=" +
        this.seller_id;
      // if (this.user_type === "BUYER") {

      // }
      this.getListReservations();
      // this.reservationsBuyer.monthSelected = this.month;
      this.store.getDetailServiceByHashId(this.hashID);

      const request = {
        hash_id: this.hashID,
        buyer_id: this.account_id,
      };
      this.store.getDetailComment(request);
    }

    this.getPaymentList();
  },
  computed: {
    ...mapState(buyerStore, [
      "listDeliveryForBuyer",
      "listPaymentForBuyer",
      "detailServiceByHashId",
      "detailComment",
      "detailPayment",
      "message",
      "success",
      "error",
      "checkPermissionService",
      "stopMessage",
      "stopSuccess",
      "detailServiceStop",
      "deliverySuccess",
      "deliveryMessage",
      "deliveryError",
      "listCommentBuyer",
      "messageComment",
      "deleteCommentSuccess",
    ]),
    ...mapState(reservationStoreBuyer, [
      "dataReservationBuyer",
      "reservationList",
      "errorCancelReservation",
      "successCancelReservation",
      "successReservationBuyer",
      "messageCancelReservation",
    ]),
    ...mapState(ChatStore, ["idThreadChat", "success", "message", "error"]),
  },
  watch: {
    listCommentBuyer() {
      this.listCmtBuyer = this.listCommentBuyer.data;
    },
    successReservationBuyer() {
      this.getDateNowBuyer();
    },
    reservationList() {
      this.preloadReservations = false;
      this.preload = true;
      this.listReservations = this.reservationList.data;
      this.currentPageReservations = this.reservationList.current_page;
      this.totalPageReservations = this.reservationList.last_page;
      this.preload = false;
    },
    dataReservationBuyer() {
      this.month.month = new Date(
        this.dataReservationBuyer.service_reserves[0].date
      ).getMonth();
      this.month.year = new Date(
        this.dataReservationBuyer.service_reserves[0].date
      ).getFullYear();
      this.last_day_reserves = this.dataReservationBuyer.last_day_reserves;
      this.checkEnable =
        this.dataReservationBuyer.service_reserve_setting.is_enable === 1
          ? true
          : false;
    },
    detailComment() {
      this.commentDetail = this.detailComment;
    },
    detailPayment() {
      this.paymentDetail = this.detailPayment;
    },
    listDeliveryForBuyer() {
      this.preloadDelivery = false;
      this.preload = true;
      this.listDelivery = [];
      this.listDelivery = this.listDeliveryForBuyer.data;
      this.totalPageDelivery = this.listDeliveryForBuyer.last_page;
      this.currentPageDelivery = this.listDeliveryForBuyer.current_page;
      this.preload = false;
    },
    paymentStatus() {
      this.pageDelivery = 1;
      this.getDeliveryList();
    },
    deliveryStatus() {
      this.pageDelivery = 1;
      this.getDeliveryList();
    },
    selectPerPageDelivery() {
      this.pageDelivery = 1;
      this.getDeliveryList();
    },
    detailServiceStop() {
      this.serviceDetail = this.detailServiceStop;
      this.serviceId = this.serviceDetail.id;
      const requestComment = {
        buyer_id: this.account_id,
        service_id: this.serviceId,
        page: 1,
        limit: 10,
      };
      this.store.getListCommentByServiceId(requestComment);
      this.account_name = this.serviceDetail.seller.account_name;
      if (this.serviceDetail.service_delivery != null) {
        if (this.serviceDetail.service_delivery.skip != 0) {
          this.skip = false;
          this.with_skip = this.serviceDetail.service_delivery.with_skip;
        } else {
          this.skip = true;
        }
      }
      if (this.serviceDetail.images) {
        this.image_service = this.serviceDetail.images[0].path;
      }
      if (this.serviceDetail.seller) {
        this.business_name = this.serviceDetail.seller.business_name;
      }
      let storeBuyer = this.serviceDetail.service_store_buyers;

      this.service_course_name = storeBuyer[0].service_courses.name;
      this.service_course_cycle = storeBuyer[0].service_courses.cycle;
      this.service_course_price = storeBuyer[0].service_courses.price;
      this.service_course_content = storeBuyer[0].service_courses.content;
      this.service_store_buyers_id = storeBuyer[0].id;
      this.service_course_status = storeBuyer[0].status;
      this.service_start_date = storeBuyer[0].start;
      this.service_course_endDate = storeBuyer[0].end;
      if (this.service_course_endDate !== null) {
        localStorage.setItem(
          "dateEndService",
          this.$moment(this.service_course_endDate).format("YYYY-MM-DD HH:mm")
        );
      } else {
        localStorage.removeItem("dateEndService");
      }

      if (this.serviceDetail.service_store_buyers[1]) {
        this.pre_service_end_date =
          this.serviceDetail.service_store_buyers[1].end;
      }
      this.preload = false;
    },
    detailServiceByHashId() {
      this.preload = true;
      this.serviceDetail = this.detailServiceByHashId;
      this.account_name = this.serviceDetail.seller.account_name;
      if (this.serviceDetail.service_delivery != null) {
        if (this.serviceDetail.service_delivery.skip != 0) {
          this.skip = false;
          this.with_skip = this.serviceDetail.service_delivery.with_skip;
        } else {
          this.skip = true;
        }
      }
      if (this.serviceDetail.images) {
        this.image_service = this.serviceDetail.images[0].path;
      }
      if (this.serviceDetail.seller) {
        this.business_name = this.serviceDetail.seller.business_name;
      }
      let storeBuyer = this.serviceDetail.service_store_buyers;
      if (storeBuyer.length > 0) {
        for (let i = 0; i < storeBuyer.length; i++) {
          if (Number(storeBuyer[i].buyer_id) === Number(this.account_id)) {
            this.service_course_name = storeBuyer[i].service_courses.name;
            this.service_course_cycle = storeBuyer[i].service_courses.cycle;
            this.service_course_price = storeBuyer[i].service_courses.price;
            this.service_course_content = storeBuyer[i].service_courses.content;
            this.service_store_buyers_id = storeBuyer[i].id;
            this.service_course_status = storeBuyer[i].status;
            this.service_start_date = storeBuyer[i].start;
            this.service_course_endDate = storeBuyer[i].end;
            if (this.service_course_endDate !== null) {
              localStorage.setItem(
                "dateEndService",
                this.$moment(this.service_course_endDate).format(
                  "YYYY-MM-DD HH:mm"
                )
              );
            } else {
              localStorage.removeItem("dateEndService");
            }
            this.service_flag_qrCode = storeBuyer[i].flagQR;
            if (storeBuyer[i].flagQR == 1) {
              this.flagQR = false;
            } else {
              this.flagQR = true;
            }
          }
        }
      }
      if (this.serviceDetail.service_store_buyers[1]) {
        this.pre_service_end_date =
          this.serviceDetail.service_store_buyers[1].end;
      }
      this.preload = false;
    },
    checkPermissionService() {
      if (this.store.checkPermissionService === true) {
        this.toast.error(this.store.message, this.optionToast);
        this.$router.push({ path: `/service/detail/${this.hashID}` });
      }
    },
    listPaymentForBuyer() {
      this.preloadPayment = false;
      this.preload = true;
      this.listPayment = [];
      this.listPayment = this.listPaymentForBuyer.data;
      this.totalPagePayment = this.listPaymentForBuyer.last_page;
      this.currentPagePayment = this.listPaymentForBuyer.current_page;
      this.preload = false;
    },
    selectPerPagePayment() {
      this.pagePayment = 1;
      this.getPaymentList();
    },

    deleteCommentSuccess() {
      if (this.deleteCommentSuccess) {
        this.toast.success(this.store.messageComment, this.optionToast);
        this.store.deleteCommentSuccess = "";
      }
    },

    stopSuccess() {
      if (this.stopSuccess) {
        this.toast.success(this.store.stopMessage, this.optionToast);
        this.store.stopSuccess = "";
        this.$router.push({ path: `/buyer/service/management` });
      }
    },
    deliverySuccess() {
      if (this.deliverySuccess) {
        this.toast.success(this.store.deliveryMessage, this.optionToast);
        this.store.deliveryMessage = "";
        this.store.deliverySuccess = "";
      }
      this.getDeliveryList();
    },

    deliveryError() {
      this.toast.error(this.store.deliveryMessage, this.optionToast);
      this.store.deliveryMessage = "";
      this.store.deliverySuccess = "";
    },

    success() {
      if (this.store.success === true) {
        this.toast.clear();
        this.toast.success(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.$router.push({ path: `/buyer/service/management` });
      }

      if (this.chatStore.success === true) {
        if (this.chatStore.idThreadChat === "") {
          this.chatStore.success = "";
          this.chatStore.message = "";
          if (this.user_type === "BUYER") {
            this.$router.push({
              path: `/buyer/chat/thread/list`,
            });
          } else {
            this.$router.push({
              path: `/seller/chat/thread/list`,
            });
          }
        } else {
          const idThreadChat = this.chatStore.idThreadChat;
          if (this.user_type === "BUYER") {
            this.$router.push({
              path: `/buyer/chat/thread/${idThreadChat}`,
            });
          } else {
            this.$router.push({
              path: `/seller/chat/thread/${idThreadChat}`,
            });
          }
        }
      }
    },
    error() {
      if (this.store.error === true) {
        this.toast.clear();
        this.toast.error(this.store.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
      }

      if (this.chatStore.error === true) {
        this.toast.error(this.chatStore.message, this.optionToast);
        this.chatStore.error = "";
        this.chatStore.message = "";
      }
    },
    successCancelReservation() {
      this.preloadReservations = false;
      if (this.reservationsBuyer.successCancelReservation === true) {
        this.toast.success(
          this.reservationsBuyer.messageCancelReservation,
          this.optionToast
        );
        this.reservationsBuyer.successCancelReservation = "";
        this.reservationsBuyer.messageCancelReservation = "";
        this.getListReservations();
        this.getDateNowBuyer();
        this.showModalCancelReserve = false;
        this.showModalListReserve = true;
        this.store.getDetailServiceByHashId(this.hashID);
      }
    },
    errorCancelReservation() {
      this.preloadReservations = false;
      if (this.reservationsBuyer.errorCancelReservation === true) {
        this.toast.error(
          this.reservationsBuyer.messageCancelReservation,
          this.optionToast
        );
        this.reservationsBuyer.successCancelReservation = "";
        this.reservationsBuyer.messageCancelReservation = "";
      }
    },
  },
  methods: {
    showModalDelComment() {
      this.showModalDeleteComment = true;
    },

    showListDeliveries() {
      this.getDeliveryList();
    },

    deleteComment() {
      if (this.listCmtBuyer.length > 0) {
        const id = this.listCmtBuyer[0].id;
        this.store.deleteComment(id);
        this.showModalDeleteComment = false;
      } else {
        this.toast.error(this.messageComment.no_comment, this.optionToast);
        this.showModalDeleteComment = false;
      }
    },

    getWeekOfMonth(dateMinus) {
      this.lastDate = dateMinus;
      this.month.month = this.lastDate.getMonth();
      this.month.year = this.lastDate.getFullYear();
      let adjustedDate = this.lastDate.getDate() + this.lastDate.getDay();
      return Math.round(adjustedDate / 7);
    },

    getDateNowBuyer() {
      let now = new Date();
      const request = {
        hash_id: this.hashID,
        buyer_id: this.account_id,
        year: this.month.year,
        month: this.month.month + 1,
        week:
          now.getMonth() + 1 === this.month.month + 1
            ? this.getWeekOfMonth(now)
            : 1,
      };
      this.reservationsBuyer.getReservationsByMonthFirst(request);
    },

    getMonth() {
      if (this.month) {
        // this.reservationsBuyer.monthSelected = this.month;
        this.getDateNowBuyer();
      }
    },

    getListReservations() {
      const request = {
        hash_id: this.hashID,
        buyer_id: this.account_id,
        per_page: 5,
        page: this.pageReservations,
      };
      this.reservationsBuyer.getReservations(request);
    },

    updatePageReservations(page) {
      this.preloadReservations = true;
      (this.pageReservations = page), this.getListReservations();
    },

    cancelReservation() {
      const request = {
        buyer_id: this.detailReservation.buyer_id,
        service_id: this.detailReservation.service_id,
        course_id: this.detailReservation.course_id,
        reserve_start: this.$moment(
          this.detailReservation.reserve_start
        ).format("YYYY-MM-DD H:mm"),
      };
      this.preloadReservations = true;
      this.reservationsBuyer.cancelReservation(request);
    },

    detailPaymentById(id) {
      this.store.getDetailPayment(id);
    },

    getDeliveryList() {
      const request = {
        hash_id: this.hashID,
        delivery_status: this.deliveryStatus,
        payment_status: this.paymentStatus,
        page: this.pageDelivery,
        per_page: this.selectPerPageDelivery,
      };
      this.store.getListDelivery(request);
    },

    updatePageDelivery(page) {
      this.preloadDelivery = true;
      (this.pageDelivery = page), this.getDeliveryList();
    },

    getPaymentList() {
      const request = {
        hash_id: this.hashID,
        page: this.pagePayment,
        per_page: this.selectPerPagePayment,
      };
      this.store.getListPayment(request);
    },

    updatePagePayment(page) {
      this.preloadPayment = true;
      (this.pagePayment = page), this.getPaymentList();
    },

    showQRContent() {
      this.showQRCode = false;
    },

    showQR() {
      this.showQRCode = true;
    },

    replaceText(data) {
      return data.replace(/(?:\r\n|\r|\n)/g, "<br>");
    },

    printPayment(id) {
      this.showModalDetail = false;
      localStorage.setItem("id_service", this.hashID);
      this.$router.push({
        path: `/buyer/service/${id}/invoice/create`,
      });
    },

    stopService(id) {
      this.store.stopService(id);
      this.showModalConfirmStopService = false;
    },

    showCancelReservation(item) {
      this.showModalCancelReserve = true;
      this.showModalListReserve = false;
      this.detailReservation = item;
    },

    skipDelivery() {
      this.store.updateDeliveryStatus(this.idDelivery);
      this.showModalConfirm = false;
    },

    showModalConfirmSkip(value, id) {
      let date = value.split("-");
      if (Number(date[0] > new Date().getFullYear())) {
        if (new Date().getMonth() + 1 > Number(value.slice(5, 7))) {
          this.showModalConfirm = true;
          this.idDelivery = id;
        }
      } else {
        if (new Date().getMonth() + 1 < Number(value.slice(5, 7))) {
          this.showModalConfirm = true;
          this.idDelivery = id;
        } else if (new Date().getMonth() + 1 == Number(value.slice(5, 7))) {
          if (Number(value.slice(8)) - new Date().getDate() < this.with_skip) {
            this.toast.error(this.messageNoti.error_skip, this.optionToast);
            this.showModalConfirm = false;
          } else {
            this.showModalConfirm = true;
            this.idDelivery = id;
          }
        }
      }
    },
    createThreadChat() {
      if (this.token) {
        const request = {
          login_type: this.user_type === "BUYER" ? 1 : 2,
          receiver_id: this.serviceDetail.seller_id,
        };
        this.chatStore.createThreadChat(request);
      } else {
        this.$router.push("/login");
      }
    },
  },
};
definePageMeta({
  layout: "buyer",
});
</script>

<style lang="scss">
#BuyerServiceManageId {
  padding: 30px 100px;
  @include screen(991) {
    padding: 30px;
  }
  .service-manage-header {
    margin: 50px 0;
    @include screen(991) {
      flex-direction: column;
    }
    .form-submit {
      &-button {
        margin-top: unset !important;
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 1px 1px 6px #00000029;
        border-radius: 28px;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 11px 50px;
        border: none;
        border: 1px solid transparent;
        @media (max-width: 768px) {
          width: unset;
        }
        &:focus {
          border: 1px solid $orange;
        }
        img {
          margin-right: 10px;
        }
        .text-button {
          color: #5e5c5c;
          font-size: 1rem;
          font-weight: 600;
        }
      }
    }
    &-left {
      @include screen(480) {
        flex-direction: column;
        align-items: flex-start;
      }
      .img-service {
        img {
          width: 200px;
          height: 200px;
          object-fit: cover;
        }
      }
      .infomation-service {
        font-weight: 600;
        margin-left: 50px;
        @include screen(480) {
          margin-left: unset;
        }
        &-text1 {
          color: $orange;
          font-size: 28px;
        }
        &-text2 {
          color: $gray-800;
          font-size: 20px;
        }
        &-text3 {
          color: $gray-800;
          font-size: 14px;
        }
        &-text4 {
          color: $orange;
          font-size: 14px;
        }
        &-text5 {
          color: $gray-800;
          font-size: 16px;
        }
      }
      .form-submit {
        &-button {
          font-size: 24px;
          padding: 8px 30px;
        }
      }
    }
    &-right {
      @include screen(991) {
        margin-top: 10px;
        flex-direction: row;
        align-items: center;
        width: 100%;
      }
      @include screen(480) {
        flex-direction: column;
      }
      .stop-service {
        color: #7d9fb1;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        @include screen(480) {
          margin-top: 20px;
        }
      }
    }
  }
  .service-manage-title {
    color: #5e5c5c;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 40px;
  }
  .service-manage-tabs {
    .nav-tabs {
      border-bottom: unset !important;
      .nav-item {
        background: #cccbcb;
        button {
          color: white;
          font-size: 18px;
          font-weight: 600;
          border: unset !important;
        }
        .active {
          color: #5e5c5c;
          border-radius: unset !important;
          border: unset !important;
          font-weight: 600;
        }
      }
    }
    // .tab-content{
    //   display: none;
    // }
    .tab-content-item {
      background: white;
      padding: 20px 30px;
    }
    .item-qrcode {
      &-content {
        .qrcode {
          width: 200px !important;
          height: 200px !important;
          @media (max-width: 768px) {
            width: 100px !important;
            height: 100px !important;
          }
        }
        img {
          width: 150px;
          height: 100px;
        }
        &-text1 {
          color: #5e5c5c;
          font-weight: 600;
          font-size: 28px;
        }
        &-text2 {
          color: #919191;
          font-weight: 600;
          font-size: 20px;
        }
        &-text3 {
          color: #919191;
          font-weight: 600;
          font-size: 18px;
        }
        &-btn {
          padding: 10px 20px;
          color: white;
          font-size: 16px;
          text-align: center;
          font-weight: 600;
          border-radius: 28px;
          background: #e79c3acc;
          margin-top: 25%;
          border: none;
        }
      }
    }
    .form-select-custom {
      background-image: url("@/assets/images/iconArrowDownOrange.png") !important;
      color: #7e7d7d;
      padding: 0.375rem 2.25rem 0.375rem 1.25rem;
      border: none;
      box-shadow: 0px 3px 6px #00000029;
      height: 40px;
      width: 200px;
      margin-left: 10px;
    }
    .form-select-custom-per-page {
      background-image: url("@/assets/images/iconArrowDownOrange.png") !important;
      color: #7e7d7d;
      padding: 0.375rem 2.25rem 0.375rem 1.25rem;
      border: none;
      box-shadow: 0px 3px 6px #00000029;
      height: 40px;
      width: 90px;
      margin-left: 10px;
    }
    .item-tab2 {
      &-table {
        margin-top: 30px;
        table {
          thead {
            background: #f5f6fa;
            color: #131523;
            font-size: 14px;
          }
          tbody {
            border-top: unset;
            overflow-y: scroll;
            tr {
              td {
                font-size: 14px;
                // &:first-child {
                //   color: #cccbcb;
                // }
                .status-payment {
                  padding: 10px 20px;
                  color: white;
                  font-size: 16px;
                  text-align: center;
                  font-weight: 600;
                  border-radius: 28px;
                }
              }
            }
          }
        }
      }
    }
    .item-tab3 {
      &-table {
        margin-top: 30px;
        table {
          thead {
            background: #f5f6fa;
            color: #131523;
            font-size: 14px;
          }
          tbody {
            border-top: unset;
            overflow-y: scroll;
            tr {
              td {
                font-size: 14px;
                &:first-child {
                  color: #cccbcb;
                }
                .status-payment {
                  padding: 10px 20px;
                  color: white;
                  font-size: 16px;
                  font-weight: 600;
                  border-radius: 28px;
                }
              }
            }
          }
        }
      }
    }
  }
}
#modal-detail {
  .content-modal-detail {
    .textLeft {
      text-align: right;
      margin: 10px 0;
      font-size: 18px;
      font-weight: 600;
      color: #7e7d7d;
    }
    .textRight {
      text-align: right;
      margin: 10px 0;
      font-size: 16px;
      color: #7e7d7d;
    }
    .btn-print {
      color: #7d9fb1 !important;
      background: white !important;
      box-shadow: 1px 1px 6px #00000029;
      border-radius: 8px;
      border: unset !important;
    }
    .btn-cancel {
      button {
        color: #7d9fb1 !important;
        background: white !important;
        box-shadow: 1px 1px 6px #00000029;
        border-radius: 8px;
        width: 110px;
        border: unset !important;
      }
    }
    .btn-submit {
      button {
        color: #7d9fb1 !important;
        background: #e79c3a !important;
        box-shadow: 1px 1px 6px #00000029;
        border-radius: 8px;
        width: 110px;
        border: unset !important;
      }
    }
  }
}
#modal-confirm-stop-service {
  .content-modal-detail {
    .btn-cancel {
      color: #7d9fb1 !important;
      background: white !important;
      box-shadow: 1px 1px 6px #00000029;
      width: 110px;
      border-radius: 8px;
      border: unset !important;
    }
    .btn-submit {
      color: $white !important;
      background: $orange !important;
      box-shadow: 1px 1px 6px #00000029;
      border-radius: 8px;
      width: 110px;
      border: unset !important;
    }
  }
}
#modal-stop-service {
  .modal-content {
    padding: 50px 70px;
    @include screen(991) {
      padding: 0 30px;
    }
    .modal-body {
      @include screen(991) {
        padding: 0;
      }
    }
  }
  .modal-title {
    font-size: 20px;
    font-weight: 600;
    color: $gray-800;
    text-align: center;
  }
  .item-top {
    @include screen(991) {
      margin-left: 0;
      margin-right: 0;
    }
    &-image {
      box-shadow: 3px 0px 8px #4d4d4d33;
      width: 200px;
      height: 200px;
    }
    &-content {
      @include screen(991) {
        margin-top: 20px;
      }
      &-icon {
        width: 10%;
        @include screen(991) {
          display: none;
        }
      }
      &-title {
        color: $gray-800;
        font-weight: 900;
        font-size: 18px;
        @include screen(991) {
          margin-bottom: 20px;
        }
      }
      &-description {
        color: $gray-800;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
  .text-description-stop {
    span {
      color: $gray-500;
      font-size: 16px;
      margin: 50px 0;
    }
  }
  .checkbox-stop {
    color: #7d9fb1;
    label {
      margin-right: 20px;
    }
  }
  .btn-confirm-stop {
    button {
      background: $orange;
      color: $white;
      width: 80%;
      padding: 15px 0;
      border-radius: 8px;
      font-weight: 700;
      letter-spacing: 3.6px;
      @include screen(991) {
        margin-bottom: 20px;
        width: 100%;
      }
    }
  }
}
.page-preview {
  @include screen(991) {
    padding: 0 20px;
  }
  &-link {
    font-size: 14px;
    font-weight: 600;
    color: $gray-800;
    a {
      &:hover {
        color: $orange;
      }
    }
  }
}
.list-reserve {
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
    &-detail {
      &-left {
        img {
          width: 100px;
          height: 100px;
          max-width: unset !important;
          object-fit: cover;
        }
      }
    }
  }
}

#modal-confirm {
  .modal-confirm-content {
    .btn-cancel {
      width: 130px;
      color: #7d9fb1 !important;
      background: white !important;
      box-shadow: 1px 1px 6px #00000029;
      border-radius: 8px;
      border: unset !important;
    }
    .btn-submit {
      width: 130px;
      color: $white !important;
      background: $orange !important;
      box-shadow: 1px 1px 6px #00000029;
      border-radius: 8px;
      border: unset !important;
    }
  }
}
</style>
