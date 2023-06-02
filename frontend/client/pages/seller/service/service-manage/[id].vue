<template>
  <div id="ServiceManageId">
    <SDPreLoad :preload="preload" />
    <div class="service-manage-link flex items-center flex-wrap">
      <div>
        <NuxtLink to="/seller/service/management">サービス管理</NuxtLink>
      </div>
      <div class="mx-2">
        <BootstrapIcon icon="chevron-right" size="sm" />
      </div>
      <div>
        <NuxtLink
          v-bind:to="'/seller/service/service-manage/' + serviceDetail.hash_id"
          >{{ serviceDetail.name }}</NuxtLink
        >
      </div>
    </div>
    <div class="service-manage-header flex justify-between xsm:flex-col">
      <div
        class="
          service-manage-header-left
          flex
          md:mb-5
          xl:mb-0
          md:w-full
          pr-5
          xsm:pr-0 xsm:flex-col
        "
      >
        <div class="img-service">
          <img :src="image_service" alt="" />
        </div>
        <div class="infomation-service xsm:ml-0 md:text-center">
          <div class="infomation-service-text1 my-1">
            {{ serviceDetail.name }}
          </div>
          <div class="infomation-service-text2 my-1">{{ business_name }}</div>
        </div>
      </div>
      <div class="service-manage-header-right md:mx-auto">
        <Nuxt-Link :to="`/seller/service/${idService}/edit`">
          <div class="form-submit">
            <b-button
              type="input"
              class="form-submit-button md:mx-auto xl:ml-0 flex items-center"
            >
              <SDIcon icon="pencil" class="mx-2" style="color: #5e5c5c" />
              <span class="text-button">サービスを編集</span>
            </b-button>
          </div>
        </Nuxt-Link>
        <div class="text-yellow-500 text-center font-semibold mt-2 text-sm">
          <Nuxt-Link
            :to="`/service/detail/${idService}`"
            class="hover:text-[#e79c3a]"
          >
            公開ページをみる
          </Nuxt-Link>
        </div>
      </div>
    </div>
    <div class="service-manage-tabs">
      <b-tabs class="list-tabs" justified>
        <b-tab title="売上管理" active>
          <div class="tab-content-item sale-manager">
            <div class="w-full 2xl:p-35 xl:p-35">
              <b-row>
                <b-col cols="12" md="8">
                  <div class="sale-manager-titleComponent">
                    月を選択してください
                  </div>
                  <!-- <b-form-select
                    name="checkbox3"
                    v-model="dateRevenue"
                    :options="optionsMonth"
                    size="md"
                    class="form-select-custom min-w-full mx-0 mb-4"
                  ></b-form-select> -->
                  <div class="w-50 mx-0 mb-4 mt-2">
                    <Datepicker
                      v-model="dateRevenue"
                      monthPicker
                      locale="ja"
                      format="yyyy年M月"
                      autoApply
                      closeOnScroll
                      :clearable="false"
                    >
                      <template #action-preview="{ value }">
                        {{ getDate(value) }}
                      </template>
                    </Datepicker>
                  </div>

                  <div
                    class="
                      sale-manager-pice
                      mb-4
                      text-5xl
                      xsm:text-2xl
                      md:text-4xl
                      font-bold
                    "
                  >
                    {{ $setComma(revenueData.total) }}
                  </div>
                  <div
                    class="text-yellow-500 sale-manager-date text-base mb-40"
                  >
                    {{ revenueData.time_query }}
                  </div>
                </b-col>
              </b-row>
              <div
                class="
                  grid grid-cols-3
                  md:grid-cols-2
                  xl:grid-cols-3
                  lg:grid-cols-2
                  gap-6
                  xsm:grid-cols-1
                "
              >
                <div
                  class="
                    sale-manager-pice
                    mb-2
                    text-3xl
                    md:text-2xl
                    xsm:text-xl
                  "
                >
                  <div class="font-bold">
                    {{ $setComma(revenueData.total_paid_all) }}
                  </div>
                  <div class="text-yellow-500 text-base">決済済み</div>
                </div>
                <div
                  class="
                    sale-manager-pice
                    mb-2
                    text-3xl
                    md:text-2xl
                    xsm:text-xl
                  "
                >
                  <div class="font-bold">
                    {{ $setComma(revenueData.unpaid_total) }}
                  </div>
                  <div class="text-[#7D9FB1] text-base">未決済</div>
                </div>
              </div>
              <b-row>
                <b-col cols="12" md="10">
                  <div class="my-4 text-base">
                    売上金額は料金価格からサービス手数料（5％）を減じた額になります。
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="w-full flex">
              <div class="w-50 text-xl my-2 sale-manager-titleTable">
                売上履歴
              </div>
              <div class="w-50 flex justify-end my-2 items-center">
                <label for="filter-all">ページごとの表示数</label>
                <b-form-select
                  v-model="selectPerPageSales"
                  class="form-select-custom-per-page"
                  v-bind:options="optionPerPage"
                ></b-form-select>
              </div>
            </div>
            <div class="w-full sale-manager-tab">
              <div
                v-if="preloadTableSales"
                class="sd-preloads flex justify-center items-center"
              >
                <div class="snippet" data-title=".dot-flashing">
                  <div class="stage">
                    <div class="dot-flashing"></div>
                  </div>
                </div>
              </div>
              <Tables
                v-bind:items="listSales"
                v-bind:fields="fieldsListSaleManager"
                v-bind:border="false"
                v-bind:bgCell="false"
                v-bind:totalPage="totalPageSales"
                v-bind:currentPage="currentPageSales"
                v-on:update_page="updatePageSales"
              >
                <template #cell(created_at)="{ item }">
                  <div v-if="item.pay_expire_at_date">
                    {{
                      $moment(item.pay_expire_at_date).format(
                        "YYYY/MM/DD HH:mm"
                      )
                    }}
                  </div>
                  <div v-else class="text-center">-</div>
                </template>
                <template #cell(sub_total)="{ item }">
                  <div v-if="item.sub_total > 0">
                    {{ $setComma(item.sub_total) }}
                  </div>
                  <div v-else>￥{{ item.sub_total }}</div>
                </template>
                <template #cell(payment_status)="{ item }">
                  <div v-if="item.payment_status === 0">-</div>
                  <div v-else>支払い確認済み</div>
                </template>
              </Tables>
            </div>
          </div>
        </b-tab>
        <b-tab
          title="配送管理"
          :disabled="detailService.service_type_id != 1"
          v-on:click="showListDeliveries"
        >
          <div class="tab-content-item flex flex-col item-tab2">
            <div class="item-tab2-select flex justify-end">
              <b-form-select
                name="checkbox3"
                v-model="courseList"
                :options="optionCourseList"
                size="md"
                class="form-select-custom"
              ></b-form-select>
              <b-form-select
                name="checkbox3"
                v-model="paymentStatus"
                :options="optionPaymentStatus"
                size="md"
                class="form-select-custom"
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
                v-if="preloadTableDelivery"
                class="sd-preloads flex justify-center items-center"
              >
                <div class="snippet" data-title=".dot-flashing">
                  <div class="stage">
                    <div class="dot-flashing"></div>
                  </div>
                </div>
              </div>
              <Tables
                v-bind:items="listDelivery"
                v-bind:fields="fields"
                v-bind:border="false"
                v-bind:bgCell="false"
                v-bind:totalPage="totalPageDelivery"
                v-bind:currentPage="currentPageDelivery"
                v-on:update_page="updatePageDelivery"
              >
                <template #cell(estimated_date)="{ item }">
                  <div
                    v-if="item.estimated_date"
                    class="group-btn bg-midnight text-tahiti"
                  >
                    {{ $moment(item.estimated_date).format("YYYY/MM/DD") }}
                  </div>
                  <div
                    v-else
                    class="group-btn bg-midnight text-tahiti text-center"
                  >
                    -
                  </div>
                </template>
                <template #cell(actual_date)="{ item }">
                  <div
                    v-if="item.actual_date"
                    class="group-btn bg-midnight text-tahiti"
                  >
                    {{ $moment(item.actual_date).format("YYYY/MM/DD") }}
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
                <template #cell(delivery_status)="{ item }">
                  <div
                    class="status-payment"
                    style="background: #ff9f9f"
                    v-if="item.delivery_status === 0"
                  >
                    スキップ
                  </div>
                  <button
                    class="status-payment"
                    style="background: #e79c3acc; cursor: pointer"
                    v-if="item.delivery_status === 1"
                    v-on:click="
                      showModalConfirmSkip(item.estimated_date, item.id)
                    "
                  >
                    配送待ち
                  </button>
                  <div
                    class="status-payment"
                    style="background: #c0db5b"
                    v-if="item.delivery_status === 2"
                  >
                    配送完了
                  </div>
                </template>
              </Tables>
            </div>
          </div>
        </b-tab>
        <b-tab title="顧客管理">
          <div class="tab-content-item flex flex-col item-tab3">
            <div class="item-tab3-select flex justify-end">
              <b-form-select
                name="checkbox3"
                v-model="courseListCustomer"
                :options="optionCourseList"
                size="md"
                class="form-select-custom"
              ></b-form-select>
              <b-form-select
                name="checkbox3"
                v-model="dateList"
                :options="optionDateList"
                size="md"
                class="form-select-custom"
              ></b-form-select>
            </div>
            <div class="item-tab3-select flex justify-end my-2 items-center">
              <label for="filter-all">ページごとの表示数:</label>
              <b-form-select
                v-model="selectPerPageCustomer"
                class="form-select-custom-per-page"
                v-bind:options="optionPerPage"
              ></b-form-select>
            </div>
            <div class="item-tab3-table">
              <div
                v-if="preloadTableCustomer"
                class="sd-preloads flex justify-center items-center"
              >
                <div class="snippet" data-title=".dot-flashing">
                  <div class="stage">
                    <div class="dot-flashing"></div>
                  </div>
                </div>
              </div>
              <Tables
                v-bind:items="listCustomer"
                v-bind:fields="fieldsListCustomer"
                v-bind:border="false"
                v-bind:bgCell="false"
                v-bind:totalPage="totalPageCustomer"
                v-bind:currentPage="currentPageCustomer"
                v-on:update_page="updatePageCustomer"
              >
                <template #cell(status)="{ item }">
                  <div v-if="item.status === 1">契約中</div>
                  <div v-else>解約済み</div>
                </template>
                <template #cell(buyer_name)="{ item }">
                  <div>
                    {{ item.buyer.account_name }}
                  </div>
                </template>
                <template #cell(buyer_full_name)="{ item }">
                  <div v-if="item.buyer.shipping_info_default">
                    {{
                      item.buyer.shipping_info_default.last_name_kana +
                      " " +
                      item.buyer.shipping_info_default.first_name_kana
                    }}
                  </div>
                  <div v-else>-</div>
                </template>
                <template #cell(post_code)="{ item }">
                  <div v-if="item.buyer.shipping_info_default">
                    {{ item.buyer.shipping_info_default.post_code }}
                  </div>
                  <div v-else>-</div>
                </template>
                <template #cell(address)="{ item }">
                  <div v-if="item.buyer.shipping_info_default">
                    {{ item.buyer.shipping_info_default.address }}
                  </div>
                  <div v-else>-</div>
                </template>
                <template #cell(phone_number)="{ item }">
                  <div v-if="item.buyer.shipping_info_default">
                    {{ item.buyer.shipping_info_default.phone }}
                  </div>
                </template>
                <template #cell(course_name)="{ item }">
                  <div>
                    {{ item.service_courses.name }}
                  </div>
                </template>
                <template #cell(contract_date)="{ item }">
                  <div
                    v-if="item.created_at"
                    class="group-btn bg-midnight text-tahiti"
                  >
                    {{ $moment(item.created_at).format("YYYY/MM/DD HH:mm") }}
                  </div>
                  <div
                    v-else
                    class="group-btn bg-midnight text-tahiti text-center"
                  >
                    -
                  </div>
                </template>
                <template #cell(message)="{ item }">
                  <b-button
                    title="審査"
                    class="btn-custom btn-warning btn-table bg-warning"
                    square
                    v-on:click="createThreadChat(item)"
                    size="sm"
                  >
                    メッセージ
                  </b-button>
                </template>
                <template #cell(action)="{ item }">
                  <div
                    v-if="item.status === 1"
                    class="group-btn bg-midnight text-tahiti text-center"
                  >
                    <b-button
                      v-b-tooltip.hover.top
                      title="審査"
                      class="btn-custom btn-danger btn-table bg-danger"
                      square
                      v-on:click="showModalCancel(item.id)"
                      v-b-modal.modal-cancel
                      size="sm"
                    >
                      契約解除
                    </b-button>
                  </div>
                  <div v-else>契約解除済み</div>
                </template>
              </Tables>
            </div>
          </div>
          <b-modal
            id="modal-cancel"
            ref="modal-cancel"
            hide-header
            hide-footer
            v-model="showModalReviewCancel"
          >
            <div class="content-modal-detail">
              <b-container fluid>
                <b-row>
                  <b-col cols="12"
                    ><div class="py-3">
                      <p>【ユーザーを強制的に契約解除します。】</p>
                      <p>・ユーザーへの十分な事前告知を推奨します。</p>
                      <p>
                        ・契約を解除しても、当期間のサブスクリプション契約は有効であり、期間中は設定したサービスを提供する義務があります。
                      </p>
                      <p>・この操作は取り消せません。</p>
                      <p>
                        ・やむを得ずサービスを提供できない場合、ユーザーに対して返金を行う義務があります。
                      </p>
                      <br />
                      <p>本当に契約解除しますか？</p>
                    </div>
                  </b-col></b-row
                >
                <b-row>
                  <b-col cols="6"
                    ><div class="flex justify-center py-3">
                      <b-button
                        class="btn-cancel"
                        v-on:click="showModalReviewCancel = false"
                        >キャンセル</b-button
                      >
                    </div>
                  </b-col>
                  <b-col cols="6"
                    ><div class="flex justify-center py-3">
                      <b-button
                        class="btn-submit"
                        v-on:click="submitCancel(id_cancel)"
                        >確認</b-button
                      >
                    </div>
                  </b-col></b-row
                >
              </b-container>
            </div>
          </b-modal>
        </b-tab>
        <b-tab
          :disabled="
            detailService.service_type_id === 1 ||
            detailService.service_type_id === 4
          "
          title="予約管理"
          @click="getReserve"
          class="tabsSchedule"
        >
          <div class="tab-content-item">
            <div
              class="
                flex flex-wrap
                px-[30px]
                py-[20px]
                items-center
                justify-between
              "
            >
              <div class="action-schedule flex 2xl:col-span-4">
                <b-button
                  variant="light"
                  class="
                    action-schedule-button
                    flex flex-center
                    items-center
                    px-4
                  "
                  v-on:click="settingOrder1 = true"
                >
                  <BootstrapIcon
                    icon="pencil"
                    class="ml-2 m-[5px]"
                  ></BootstrapIcon>
                  営業スケジュールを設定
                </b-button>
                <b-button
                  variant="light"
                  class="
                    action-schedule-button
                    flex flex-center
                    items-center
                    ml-4
                    px-4
                  "
                  v-on:click="selectDate = true"
                >
                  <BootstrapIcon
                    icon="pencil"
                    class="ml-2 m-[5px]"
                  ></BootstrapIcon>
                  臨時営業の設定
                </b-button>
              </div>
              <div class="2xl:col-start-5 flex items-center justify-end">
                <span class="mr-2 font-bold text-base">予約受付</span>
                <b-form-checkbox
                  v-model="is_reserves"
                  name="check-button"
                  switch
                  class="SDSwitch mb-0"
                  size="lg"
                  v-on:click="actionReserves"
                >
                  <span class="font-bold text-base">ON</span>
                </b-form-checkbox>
              </div>
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
              <div>
                <b-form-select
                  v-model="course_id"
                  :options="optionsListCourse"
                  size="md"
                  class="form-select-custom"
                ></b-form-select>
              </div>
            </div>

            <CalendarSchedule v-if="is_reserves === true" />
            <div v-else class="text-center p-3">
              このサービスの予約機能をオフにしました
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <!-- Modal Detail TopUp -->
    <b-modal id="modal-detail" hide-header hide-footer>
      <div class="content-modal-detail">
        <b-container fluid>
          <b-row>
            <b-col cols="6">
              <div class="textLeft w-full">小計</div>
            </b-col>
            <b-col cols="6">
              <div class="textRight w-full">￥10,000</div>
            </b-col>
            <b-col cols="6">
              <div class="textLeft w-full">サービス手数料</div>
            </b-col>
            <b-col cols="6">
              <div class="textRight w-full">￥1,000</div>
            </b-col>
            <b-col cols="6">
              <div class="textLeft w-full">合計</div>
            </b-col>
            <b-col cols="6">
              <div class="textRight w-full">￥11,000</div>
            </b-col>
            <b-col cols="12">
              <div class="flex justify-end py-3">
                <b-button class="btn-print">領収書を発行する</b-button>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-modal>
    <!-- Modal Detail TopUp -->

    <!-- Modal Settings Hours -->
    <b-modal
      id="settingOrder1"
      hide-header
      hide-footer
      size="xl"
      v-if="is_reserves"
      v-model="settingOrder1"
    >
      <div class="w-ful p-3">
        <div class="flex justify-between w-full mb-3">
          <div class="flex items-center">
            <div class="text-[#5E5C5C] font-semibold mr-4">
              サービス営業時間
            </div>
            <BootstrapIcon
              icon="arrow-right-circle-fill"
              class="mr-4"
            ></BootstrapIcon>
            <div class="text-[#5E5C5C] font-semibold">予約設定</div>
          </div>
          <button type="button" class="close text-2xl">
            <BootstrapIcon
              icon="x-lg"
              v-on:click="hideModalSettings1()"
            ></BootstrapIcon>
          </button>
        </div>
        <hr class="bg-gray-900 opacity-100 h-px" size="sm" />
        <div class="settingOrder1-content" v-if="service_hour.length > 0">
          <!-- <b-form-checkbox v-model="checked"> </b-form-checkbox> -->
          <div
            class="settingOrder1-form w-100 flex justify-between"
            v-for="(item, index) in service_hour"
            :key="index"
          >
            <div class="item-checkbox" v-if="item">
              <b-form-checkbox
                v-model="item.status"
                @change="changeStatus(item)"
                class="form-checkbox-select"
                >{{
                  item.day_of_week === 0
                    ? "日曜日"
                    : item.day_of_week === 1
                    ? "月曜日"
                    : item.day_of_week === 2
                    ? "火曜日"
                    : item.day_of_week === 3
                    ? "水曜日"
                    : item.day_of_week === 4
                    ? "木曜日"
                    : item.day_of_week === 5
                    ? "金曜日"
                    : "土曜日"
                }}</b-form-checkbox
              >
            </div>
            <div class="list-time flex flex-col" v-if="item && item.work_hour">
              <div
                class="item-time flex items-center"
                v-for="(item1, index1) in item.work_hour"
                :key="index1"
              >
                <b-form-select
                  v-model="item1.start"
                  :options="listTime"
                  size="sm"
                  class="form-select-custom"
                  v-on:change="selectStartHourOfWeek($event, index, index1)"
                ></b-form-select>
                <div class="mx-[10px] text-xl">-</div>
                <b-form-select
                  v-model="item1.end"
                  :options="listTime"
                  size="sm"
                  class="form-select-custom"
                  v-on:change="selectEndHourOfWeek($event, index, index1)"
                ></b-form-select>
                <div class="item-add flex items-center justify-center">
                  <img
                    :src="iconAdd"
                    alt=""
                    v-on:click="addWorkHourOfWeek(item.day_of_week)"
                    v-if="item1.end !== '22:00' && index1 === 0"
                  />
                  <img
                    :src="iconMinus"
                    alt=""
                    v-on:click="
                      removeWorkHourOfWeek(item.day_of_week, index1, item1.end)
                    "
                    v-if="item.work_hour.length > 1 && index1 != 0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="settingOrder1-button">
            <b-button v-on:click="updateSettingsHoursOfWeek()"
              >予約設定へ</b-button
            >
          </div>
        </div>
      </div>
    </b-modal>
    <!-- Modal Settings Hours -->

    <!-- Modal Setting Reservation -->
    <b-modal
      id="settingOrder2"
      hide-header
      hide-footer
      size="xl"
      v-if="is_reserves"
      v-model="settingOrder2"
    >
      <div class="w-ful p-3">
        <div class="flex justify-between w-full mb-3">
          <div class="flex items-center">
            <div class="text-[#5E5C5C] font-semibold mr-4">
              サービス営業時間
            </div>
            <BootstrapIcon
              icon="arrow-right-circle-fill"
              class="mr-4"
            ></BootstrapIcon>
            <div class="text-[#5E5C5C] font-semibold">予約設定</div>
          </div>
          <button
            type="button"
            aria-label="Close"
            class="close text-2xl"
            v-on:click="hideModalSettings2()"
          >
            <BootstrapIcon icon="x-lg"></BootstrapIcon>
          </button>
        </div>
        <hr class="bg-gray-900 opacity-100 h-px" size="sm" />
        <div class="settingOrder2-content">
          <div class="modal-reserve-content flex flex-col">
            <div class="icon-switch flex justify-end items-center">
              <div>予約受付</div>
              <b-form-checkbox
                v-model="is_enable"
                name="check-button"
                switch
                class="form-check-switch"
              >
              </b-form-checkbox>
              <div>ON</div>
            </div>
            <b-container>
              <b-row>
                <b-col cols="5">
                  <div class="modal-left py-5">予約1枠あたりの受付人数上限</div>
                </b-col>
                <b-col cols="7"
                  ><div class="modal-right relative py-5">
                    <b-form-radio-group
                      v-model="selected2s"
                      :options="options2"
                      stacked
                      class="w-full form-raido-custom"
                    ></b-form-radio-group>
                    <div class="input-modal-absolute flex flex-col">
                      <div class="flex items-center">
                        <input
                          type="number"
                          v-model="reserve_setting.max"
                          :disabled="selected2s === 1"
                        />人まで
                      </div>
                      <div class="flex items-center my-2 text-yellow-500">
                        <SDIcon
                          icon="info-circle-fill"
                          size="sm"
                          class="mx-1 exclamation-triangle-fill"
                          variant="warning"
                        /><span>入力してください</span>
                      </div>
                    </div>
                  </div></b-col
                >
                <b-col cols="5">
                  <div class="modal-left py-5">予約枠の間隔</div>
                </b-col>
                <b-col cols="7"
                  ><div class="modal-right flex py-5 justify-between">
                    <b-form-select
                      v-model="hour"
                      :options="hourList"
                      size="sm"
                      class="form-select-customs w-2/5"
                    ></b-form-select>
                    <b-form-select
                      v-model="minute"
                      :options="minuteList"
                      size="sm"
                      class="form-select-customs w-2/5"
                    ></b-form-select></div
                ></b-col>
                <b-col cols="5">
                  <div class="modal-left py-5">予約受付可能期間</div>
                </b-col>
                <b-col cols="7"
                  ><div class="modal-right relative py-5">
                    <div class="flex items-center input-row3">
                      <input
                        type="number"
                        v-model="reserve_setting.duration_before"
                      />
                      <div>日先まで受付可能</div>
                    </div>
                  </div></b-col
                >
                <b-col cols="5">
                  <div class="modal-left py-5">予約締切期間</div>
                </b-col>
                <b-col cols="7"
                  ><div class="modal-right relative py-5">
                    <b-form-radio-group
                      v-model="reserve_setting.type_duration_after"
                      :options="options3"
                      stacked
                      class="w-full form-raido-custom form-multi-input"
                    ></b-form-radio-group>
                    <div class="input-modal1-absolute flex flex-col">
                      <input
                        type="number"
                        v-model="reserve_setting.duration_after1"
                        :hidden="reserve_setting.type_duration_after == 2"
                      />
                    </div>
                    <div class="input-modal-absolute flex flex-col">
                      <div class="flex items-center">
                        <input
                          type="number"
                          v-model="reserve_setting.duration_after2"
                          :hidden="reserve_setting.type_duration_after == 1"
                        />枠前
                      </div>
                    </div>
                  </div></b-col
                >
              </b-row>
            </b-container>
          </div>
          <div class="settingOrder2-button">
            <b-button v-on:click="updateSettingReserve()">更新する</b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- Modal Setting Reservation -->

    <b-modal v-if="is_reserves" v-model="selectDate" hide-footer hide-header>
      <Datepicker
        v-model="date"
        locale="ja"
        format="yyyy年M月dd"
        autoApply
        inline
        closeOnScroll
        :clearable="false"
        class="justify-center"
      >
        <template #action-preview="{ value }">
          {{ getDate(value) }}
        </template>
      </Datepicker>
      <div class="my-3 settingHours-button flex justify-center">
        <b-button class="w-50" v-on:click="showModalSettingHours(date)"
          >臨時営業の設定
        </b-button>
      </div>
    </b-modal>

    <!-- Modal Setting Hours Of Day -->
    <b-modal
      id="settingHours"
      hide-header
      hide-footer
      size="xl"
      v-if="is_reserves"
      v-model="settingHours"
    >
      <div class="w-ful p-3">
        <div class="flex justify-between w-full mb-3">
          <div class="text-[#5E5C5C] font-semibold">サービス営業時間</div>
          <button type="button" class="close text-2xl">
            <BootstrapIcon
              icon="x-lg"
              v-on:click="settingHours = false"
            ></BootstrapIcon>
          </button>
        </div>
        <hr class="bg-gray-900 opacity-100 h-px" size="sm" />
        <div class="settingOrder1-content px-[100px] py-[50px]">
          <div class="settingOrder1-form w-100 flex justify-between">
            <div class="item-checkbox" v-if="service_hour_temp">
              <b-form-checkbox
                v-model="service_hour_temp.status"
                class="form-checkbox-select"
                >{{ service_hour_temp.date_format }}</b-form-checkbox
              >
            </div>
            <div
              class="list-time flex flex-col"
              v-show="
                service_hour_temp &&
                service_hour_temp.work_hour &&
                service_hour_temp.work_hour.length > 0
              "
            >
              <div
                class="item-time flex items-center"
                v-for="(item1, index1) in service_hour_temp.work_hour"
                :key="index1"
              >
                <b-form-select
                  v-model="item1.start"
                  :options="listTime"
                  size="sm"
                  class="form-select-custom"
                  v-on:change="selectStartHour($event, index1)"
                ></b-form-select>
                <div class="mx-[30px] text-xl">-</div>
                <b-form-select
                  v-model="item1.end"
                  :options="listTime"
                  size="sm"
                  class="form-select-custom"
                  v-on:change="selectEndHour($event, index1)"
                ></b-form-select>
                <div class="item-add flex items-center justify-center">
                  <img
                    :src="iconAdd"
                    alt=""
                    v-on:click="addWorkHour()"
                    v-if="item1.end !== '22:00' && index1 === 0"
                  />
                  <img
                    :src="iconMinus"
                    alt=""
                    v-on:click="removeWorkHour(index1, item1.end)"
                    v-if="service_hour_temp.work_hour.length > 1 && index1 != 0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="settingOrder1-button">
            <b-button v-on:click="updateSettingsHours()">更新する</b-button>
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
                次回配送を処理してください
              </div>
            </b-col></b-row
          >
          <b-row>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button class="btn-cancel" v-on:click="confirmDelivery()"
                  >配送完了</b-button
                >
              </div>
            </b-col>
            <b-col cols="6"
              ><div class="flex justify-center py-3">
                <b-button class="btn-submit" v-on:click="skipDelivery()"
                  >スキップ</b-button
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
import Tables from "../../../../components/SDTable";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import CalendarSchedule from "@/components/SDCalendarSchedule";
import { reservationStoreSeller } from "@/store/seller/reservations.ts";
import { sellerStore } from "@/store/seller/index.ts";
import { buyerStore } from "@/store/buyer/index.ts";
import { mapState } from "pinia";
import "moment/locale/ja";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useToast } from "vue-toastification";
import SDPreLoad from "@/components/SDPreLoad";
import SDIcon from "@/components/SDIcon";
import iconAdd from "@/assets/images/iconAdd.png";
import iconMinus from "@/assets/images/iconMinus.png";
import { Message } from "@/utils/message";
import { ChatStore } from "@/store/chat/index.ts";
import Cookies from "js-cookie";

export default {
  name: "ServiceManageId",
  emits: ["update_page"],
  components: {
    BootstrapIcon,
    CalendarSchedule,
    Tables,
    Datepicker,
    SDPreLoad,
    SDIcon,
  },
  setup() {
    const reservations = reservationStoreSeller();
    const store = sellerStore();
    const storeBuyer = buyerStore();
    const chatStore = ChatStore();
    const month = ref({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
    const date = ref(new Date());
    const toast = useToast();
    return {
      toast,
      reservations,
      month,
      store,
      storeBuyer,
      date,
      chatStore,
    };
  },
  data() {
    return {
      selectDate: false,
      settingOrder2: false,
      settingOrder1: false,
      dataSchedule: {},
      is_reserves: false,
      checked1: true,
      checked: true,
      selected2s: 1,
      options2: [
        { text: "上限なし", value: 1 },
        { text: "上限あり", value: 2 },
      ],
      selected3s: 1,
      is_enable: 0,
      options3: [
        { text: "日前", value: 1 },
        { text: "枠単位", value: 2 },
      ],
      minute: null,
      minuteList: [
        { text: "分", value: null },
        { text: "0分", value: "00" },
        { text: "15分", value: 15 },
        { text: "30分", value: 30 },
        { text: "45分", value: 45 },
      ],
      max: null,
      hour: null,
      hourList: [
        { text: "時間", value: null },
        { text: "1時間", value: 1 },
        { text: "2時間", value: 2 },
        { text: "3時間", value: 3 },
        { text: "4時間", value: 4 },
        { text: "5時間", value: 5 },
        { text: "6時間", value: 6 },
        { text: "7時間", value: 7 },
        { text: "8時間", value: 8 },
        { text: "9時間", value: 9 },
        { text: "10時間", value: 10 },
        { text: "11時間", value: 11 },
        { text: "12時間", value: 12 },
      ],
      duration_before: null,
      duration_after1: null,
      duration_after2: null,
      iconMinus,
      iconAdd,
      idService: this.$route.params.id,
      listDelivery: [],
      listCustomer: [],
      serviceDetail: {},
      business_name: null,
      image_service: null,
      revenueData: {},
      listSales: [],
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
      optionsMonth: [
        { value: "", text: "月を選ぶ" },
        { value: 1, text: "1月" },
        { value: 2, text: "2月" },
        { value: 3, text: "3月" },
        { value: 4, text: "4月" },
        { value: 5, text: "5月" },
        { value: 6, text: "6月" },
        { value: 7, text: "7月" },
        { value: 8, text: "8月" },
        { value: 9, text: "9月" },
        { value: 10, text: "10月" },
        { value: 11, text: "11月" },
        { value: 12, text: "12月" },
      ],
      optionCourseList: [],
      optionDateList: [],
      currentItems: [],
      selected1: null,
      selected2: null,
      selected3: null,
      selected4: null,
      optionPerPage: [
        { value: 10, text: 10 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
      ],
      selectPerPageDelivery: 10,
      selectPerPageCustomer: 10,
      selectPerPageSales: 10,
      fields: tableFields.LIST_DELIVERY_MANAGEMENT_SELLER,
      fieldsListCustomer: tableFields.LIST_CUSTOMER_MANAGEMENT_SELLER,
      fieldsListSaleManager: tableFields.LIST_SALES_MANAGER,
      subtotal: null,
      fee: null,
      total: null,
      deliveryStatus: "",
      paymentStatus: "",
      courseList: "",
      courseListCustomer: "",
      dateList: "",
      page: 1,
      totalPageDelivery: 1,
      currentPageDelivery: 1,
      totalPageSales: 1,
      currentPageSales: 1,
      dateRevenue: "",
      preload: true,
      preloadTableSales: false,
      preloadTableDelivery: false,
      preloadTableCustomer: false,
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
      listTime: [
        { text: "9:00", value: "9:00" },
        { text: "10:00", value: "10:00" },
        { text: "11:00", value: "11:00" },
        { text: "12:00", value: "12:00" },
        { text: "13:00", value: "13:00" },
        { text: "14:00", value: "14:00" },
        { text: "15:00", value: "15:00" },
        { text: "16:00", value: "16:00" },
        { text: "17:00", value: "17:00" },
        { text: "18:00", value: "18:00" },
        { text: "19:00", value: "19:00" },
        { text: "20 00", value: "20:00" },
        { text: "21:00", value: "21:00" },
        { text: "22:00", value: "22:00" },
      ],
      isTrue: false,
      weekCurrent: null,
      reserve_setting: {
        is_enable: "0",
        max: "",
        duration_before: "",
        duration_after1: "",
        duration_after2: "",
        type_duration_after: "",
      },
      service_hour: [
        {
          day_of_week: 1,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: true,
        },
        {
          day_of_week: 2,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: true,
        },
        {
          day_of_week: 3,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: true,
        },
        {
          day_of_week: 4,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: true,
        },
        {
          day_of_week: 5,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: true,
        },
        {
          day_of_week: 6,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: false,
        },
        {
          day_of_week: 0,
          work_hour: [{ start: "10:00", end: "18:00" }],
          status: false,
        },
      ],
      optionsListCourse: [],
      course_id: "",
      totalPageCustomer: 1,
      currentPageCustomer: 1,
      hashID: this.$route.params.id,
      detailSettingHours: [],
      settingHours: false,
      service_hour_temp: {},
      work_hour: [],
      messageNoti: Message.SELLER,
      showModalConfirm: false,
      showModalReviewCancel: false,
      id_cancel: "",
      with_skip: null,
      skip: false,
      idDelivery: null,
      estDate: null,
      serviceHourUpdate: [],
    };
  },

  created() {
    window.scrollTo(0, 0);
    // this.reservations.timeSelected = this.month;
    this.reservations.course_id = this.course_id;
    this.store.getDetailServiceById(this.$route.params.id);
    this.getRevenue();
    this.getCustomerList();
    this.getDateListSelected();
    this.getCourseListSelected();
    this.store.getListCourse(this.$route.params.id);
    // if (this.user_type === "SELLER") {
    this.getDateNowSeller();
    // }
    localStorage.removeItem("data-reply");
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.token = localStorage.getItem("token_user");
    } else {
      this.token = Cookies.get("token_user");
    }
  },
  computed: {
    ...mapState(reservationStoreSeller, [
      "dataRevenue",
      "dataReservationSeller",
      "successReservationSeller",
      "messageReservationSeller",
      "errorReservationSeller",
      "dataBusinessSchedule",
      "dataServiceHourTemp",
    ]),
    ...mapState(sellerStore, [
      "listDeliveryForSeller",
      "listCustomerForSeller",
      "listDateSelected",
      "listCourseSelected",
      "detailService",
      "message",
      "success",
      "error",
      "listCourse",
      "checkPermissionService",
      "updateDeliverySuccess",
      "updateDeliveryMessage",
    ]),
    ...mapState(buyerStore, ["stopService", "message", "success", "error"]),
    ...mapState(ChatStore, ["idThreadChat", "success", "message", "error"]),
  },
  watch: {
    selected2s() {
      if (this.selected2s === 1) {
        this.reserve_setting.max = null;
      }
    },
    dataReservationSeller() {
      this.month.month = new Date(
        this.dataReservationSeller.service_reserves[0].date
      ).getMonth();
      this.month.year = new Date(
        this.dataReservationSeller.service_reserves[0].date
      ).getFullYear();
    },

    updateDeliverySuccess() {
      if (this.updateDeliverySuccess) {
        this.toast.clear();
        this.toast.success(this.updateDeliveryMessage, this.optionToast);
        this.sellerStore.updateDeliverySuccess = ""
        this.sellerStore.updateDeliveryMessage = ""
        this.showListDeliveries()
      }
    },

    dataBusinessSchedule() {
      this.preload = true;
      this.dataSchedule = this.dataBusinessSchedule;
      if (this.dataSchedule.reserve_setting) {
        this.reserve_setting = this.dataSchedule.reserve_setting;
        if (this.dataSchedule.reserve_setting.type_duration_after === 1) {
          this.reserve_setting.duration_after1 =
            this.dataSchedule.reserve_setting.duration_after;
          this.reserve_setting.duration_after2 = "";
        } else {
          this.reserve_setting.duration_after2 =
            this.dataSchedule.reserve_setting.duration_after;
          this.reserve_setting.duration_after1 = "";
        }
        this.is_enable =
          Number(this.reserve_setting.is_enable) === 1 ? true : false;
        this.selected3s = this.type_duration_after;
        if (this.reserve_setting.max !== null) {
          this.selected2s = 2;
        } else {
          this.selected2s = 1;
        }
        const time = this.reserve_setting.time_distance.split(":"[0]);
        this.hour = time[0];
        this.minute = time[1];
      }
      if (
        this.dataSchedule.service_hours &&
        this.dataSchedule.service_hours[0]
      ) {
        this.service_hour = this.dataSchedule.service_hours;
        this.service_hour.map((item) => {
          if (item && item.work_hour) {
            const dataNew = JSON.parse(item.work_hour);
            item.work_hour = [];
            dataNew.map((item2) => {
              item.work_hour.push(item2);
            });
          }
        });
      }
      this.select3s = this.dataSchedule;
      this.preload = false;
    },

    checkPermissionService() {
      if (this.store.checkPermissionService === true) {
        this.toast.error(this.store.messageService, this.optionToast);
        this.$router.push({ path: `/seller/service/management` });
      }
    },

    listDeliveryForSeller() {
      this.preloadTableDelivery = false;
      this.preload = true;
      this.listDelivery = [];
      this.listDelivery = this.listDeliveryForSeller.deliveryList.data;
      this.totalPageDelivery =
        this.listDeliveryForSeller.deliveryList.last_page;
      this.currentPageDelivery =
        this.listDeliveryForSeller.deliveryList.current_page;
      this.preload = false;
    },

    detailService() {
      this.preload = true;
      this.serviceDetail = this.detailService;
      this.business_name = this.serviceDetail.seller.business_name;
      this.image_service = this.serviceDetail.images[0].path;
      if (this.serviceDetail.is_reserves === 0) {
        this.is_reserves = false;
      } else {
        this.reservations.getBusinessSchedule(this.$route.params.id);
        this.is_reserves = true;
      }
      if (
        this.serviceDetail.service_delivery !== null &&
        this.serviceDetail.service_delivery.skip != 0
      ) {
        this.skip = false;
        this.with_skip = this.serviceDetail.service_delivery.with_skip;
      } else {
        this.skip = true;
      }
      this.preload = false;
    },

    dataRevenue() {
      this.preloadTableSales = false;
      this.preload = true;
      this.revenueData = this.dataRevenue;
      this.listSales = this.revenueData.revenue.data;
      this.totalPageSales = this.revenueData.revenue.last_page;
      this.currentPageSales = this.revenueData.revenue.current_page;
      this.preload = false;
    },

    paymentStatus() {
      this.page = 1;
      this.getDeliveryList();
    },

    deliveryStatus() {
      this.page = 1;
      this.getDeliveryList();
    },

    courseList() {
      this.page = 1;
      this.getDeliveryList();
    },

    selectPerPageDelivery() {
      this.page = 1;
      this.getDeliveryList();
    },

    listCustomerForSeller() {
      this.preloadTableCustomer = false;
      this.preload = true;
      this.listCustomer = [];
      this.listCustomer = this.listCustomerForSeller.data;
      this.totalPageCustomer = this.listCustomerForSeller.last_page;
      this.currentPageCustomer = this.listCustomerForSeller.current_page;
      this.preload = false;
    },

    courseListCustomer() {
      this.page = 1;
      this.getCustomerList();
    },

    dateList() {
      this.page = 1;
      this.getCustomerList();
    },

    selectPerPageCustomer() {
      this.page = 1;
      this.getCustomerList();
    },

    listDateSelected() {
      if (this.listDateSelected) {
        this.optionDateList = this.listDateSelected;
      }
      this.optionDateList.unshift({
        value: "",
        text: "契約日付",
      });
    },

    listCourseSelected() {
      if (this.listCourseSelected) {
        this.optionCourseList = this.listCourseSelected;
      }
      this.optionCourseList.unshift({
        value: "",
        text: "利用コース",
      });
    },

    selectPerPageSales() {
      this.page = 1;
      this.getRevenue();
    },

    dateRevenue() {
      this.page = 1;
      this.getRevenue();
    },

    course_id() {
      this.reservations.course_id = this.course_id;
      this.getDateNowSeller();
    },

    success() {
      if (this.store.success === true) {
        this.toast.clear();
        this.toast.success(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.getDeliveryList();
      }
    },

    error() {
      if (this.store.error === true) {
        this.toast.clear();
        this.toast.error(this.store.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
      }
    },

    success() {
      if (this.storeBuyer.success === true) {
        this.toast.clear();
        this.toast.success(this.storeBuyer.message, this.optionToast);
        this.storeBuyer.success = "";
        this.storeBuyer.message = "";
        this.getCustomerList();
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
      if (this.storeBuyer.error === true) {
        this.toast.clear();
        this.toast.error(this.storeBuyer.message, this.optionToast);
        this.storeBuyer.error = "";
        this.storeBuyer.message = "";
      }

      if (this.chatStore.error === true) {
        this.toast.error(this.chatStore.message, this.optionToast);
        this.chatStore.error = "";
        this.chatStore.message = "";
      }
    },

    successReservationSeller() {
      if (this.successReservationSeller === true) {
        this.reservations.successReservationSeller = "";
        this.toast.clear();
        this.toast.success(
          this.reservations.messageReservationSeller,
          this.optionToast
        );
        this.reservations.messageReservationSeller = "";
        this.settingOrder2 = false;
        this.settingOrder1 = false;
        this.selectDate = false;
        this.showModalConfirm = false;
        this.showModalReviewCancel = false;
        this.reservations.getBusinessSchedule(this.$route.params.id);

        this.getDateNowSeller();
      }
    },

    errorReservationSeller() {
      if (this.errorReservationSeller === true) {
        this.toast.clear();
        this.toast.error(
          this.reservations.messageReservationSeller,
          this.optionToast
        );
        this.reservations.errorReservationSeller = "";
        this.reservations.messageReservationSeller = "";
        this.is_reserves = this.serviceDetail.is_reserves === 0 ? false : true;
        // this.getDateNowSeller();
      }
    },

    listCourse() {
      this.preload = true;
      if (this.listCourse.data.length > 0) {
        this.listCourse.data.map((item) => {
          this.optionsListCourse.push({
            text: item.name,
            value: item.course_id,
          });
        });
      }
      this.course_id = this.optionsListCourse[0].value;
      this.preload = false;
    },

    settingOrder1() {
      this.reservations.getBusinessSchedule(this.$route.params.id);
    },

    dataServiceHourTemp() {
      this.service_hour_temp = this.dataServiceHourTemp;
      const dataNew = JSON.parse(this.service_hour_temp.work_hour);
      this.service_hour_temp.work_hour = [];
      dataNew.map((item2) => {
        this.service_hour_temp.work_hour.push(item2);
      });
    },
  },
  methods: {
    showListDeliveries() {
      this.getDeliveryList();
    },

    getReserve() {
      // this.getDateNowSeller();
    },

    getMonth() {
      // this.reservations.timeSelected = this.month;
      this.getDateSelectedSeller();
    },

    getWeekOfMonth(dateMinus) {
      this.lastDate = dateMinus;
      this.month.month = this.lastDate.getMonth();
      this.month.year = this.lastDate.getFullYear();
      let adjustedDate = this.lastDate.getDate() + this.lastDate.getDay();
      return Math.round(adjustedDate / 7);
    },

    getDateNowSeller() {
      let now = new Date();
      const request = {
        hash_id: this.hashID,
        course_id: this.course_id,
        year: this.month.year,
        month: this.month.month + 1,
        week:
          now.getMonth() + 1 === this.month.month + 1
            ? this.getWeekOfMonth(now)
            : 1,
      };
      this.reservations.getReservationsByMonthFirst(request);
    },

    getDateSelectedSeller() {
      const request = {
        hash_id: this.hashID,
        course_id: this.course_id,
        year: this.month.year,
        month: this.month.month + 1,
        week: 1,
      };
      this.reservations.getReservationsByMonthFirst(request);
    },

    selectEndHourOfWeek(event, indexValue, indexItem) {
      this.service_hour.map((item, index) => {
        if (index == indexValue) {
          var eventCompare = false;
          item.work_hour[indexItem].end = event;
          item.work_hour.map((item1, index1) => {
            const itemEnd = item1.end.split(":"[0]);
            const itemStart = item1.start.split(":"[0]);
            const eventEnd = event.split(":"[0]);
            if (Number(itemEnd[0]) === Number(eventEnd[0])) {
              eventCompare = true;
            }
            if (Number(itemStart[0]) > Number(itemEnd[0])) {
              this.isTrue = true;
            } else {
              this.isTrue = false;
              if (eventCompare === true && index1 != indexItem) {
                if (
                  Number(eventEnd[0]) >= Number(itemEnd[0]) ||
                  Number(eventEnd[0]) >= Number(itemStart[0])
                ) {
                  this.isTrue = true;
                } else {
                  this.isTrue = false;
                }
              } else {
                if (eventCompare === false) {
                  if (
                    Number(eventEnd[0]) <= Number(itemEnd[0]) ||
                    Number(eventEnd[0]) <= Number(itemStart[0])
                  ) {
                    this.isTrue = true;
                  } else {
                    this.isTrue = false;
                  }
                }
              }
            }
          });
          if (this.isTrue === true) {
            this.toast.error(
              this.messageNoti.setting_hourse_invalid,
              this.optionToast
            );
          }
        }
      });
    },

    selectStartHourOfWeek(event, indexValue, indexItem) {
      this.service_hour.map((item, index) => {
        if (index == indexValue) {
          var eventCompare = false;
          item.work_hour[indexItem].start = event;
          item.work_hour.map((item1, index1) => {
            const itemEnd = item1.end.split(":"[0]);
            const itemStart = item1.start.split(":"[0]);
            const eventStart = event.split(":"[0]);
            if (Number(itemStart[0]) === Number(eventStart[0])) {
              eventCompare = true;
            }
            if (Number(itemStart[0]) > Number(itemEnd[0])) {
              this.isTrue = true;
            } else {
              if (eventCompare === true && index1 != indexItem) {
                if (
                  Number(eventStart[0]) >= Number(itemEnd[0]) ||
                  Number(eventStart[0]) >= Number(itemStart[0])
                ) {
                  this.isTrue = true;
                } else {
                  this.isTrue = false;
                }
              } else {
                if (eventCompare === false) {
                  if (
                    Number(eventStart[0]) <= Number(itemEnd[0]) ||
                    Number(eventStart[0]) <= Number(itemStart[0])
                  ) {
                    this.isTrue = true;
                  } else {
                    this.isTrue = false;
                  }
                }
              }
            }
          });
          if (this.isTrue === true) {
            this.toast.error(
              this.messageNoti.setting_hourse_invalid,
              this.optionToast
            );
          }
        }
      });
    },

    selectEndHour(event, indexItem) {
      var item = this.service_hour_temp;
      var eventCompare = false;
      item.work_hour[indexItem].end = event;
      item.work_hour.map((item1, index1) => {
        const itemEnd = item1.end.split(":"[0]);
        const itemStart = item1.start.split(":"[0]);
        const eventEnd = event.split(":"[0]);
        if (Number(itemEnd[0]) === Number(eventEnd[0])) {
          eventCompare = true;
        }
        if (Number(itemStart[0]) > Number(itemEnd[0])) {
          this.isTrue = true;
        } else {
          this.isTrue = false;
          if (eventCompare === true && index1 != indexItem) {
            if (
              Number(eventEnd[0]) > Number(itemEnd[0]) ||
              Number(eventEnd[0]) > Number(itemStart[0])
            ) {
              this.isTrue = true;
            } else {
              this.isTrue = false;
            }
          } else {
            if (eventCompare === false) {
              if (
                Number(eventEnd[0]) < Number(itemEnd[0]) ||
                Number(eventEnd[0]) < Number(itemStart[0])
              ) {
                this.isTrue = true;
              } else {
                this.isTrue = false;
              }
            }
          }
        }
      });
      if (this.isTrue === true) {
        this.toast.error(
          this.messageNoti.setting_hourse_invalid,
          this.optionToast
        );
      }
    },

    selectStartHour(event, indexItem) {
      var item = this.service_hour_temp;
      var eventCompare = false;
      item.work_hour[indexItem].start = event;
      item.work_hour.map((item1, index1) => {
        const itemEnd = item1.end.split(":"[0]);
        const itemStart = item1.start.split(":"[0]);
        const eventStart = event.split(":"[0]);
        if (Number(itemStart[0]) === Number(eventStart[0])) {
          eventCompare = true;
        }
        if (Number(itemStart[0]) > Number(itemEnd[0])) {
          this.isTrue = true;
        } else {
          if (eventCompare === true && index1 != indexItem) {
            if (
              Number(eventStart[0]) > Number(itemEnd[0]) ||
              Number(eventStart[0]) > Number(itemStart[0])
            ) {
              this.isTrue = true;
            } else {
              this.isTrue = false;
            }
          } else {
            if (eventCompare === false) {
              if (
                Number(eventStart[0]) < Number(itemEnd[0]) ||
                Number(eventStart[0]) < Number(itemStart[0])
              ) {
                this.isTrue = true;
              } else {
                this.isTrue = false;
              }
            }
          }
        }
      });
      if (this.isTrue === true) {
        this.toast.error(
          this.messageNoti.setting_hourse_invalid,
          this.optionToast
        );
      }
    },

    updateSettingsHoursOfWeek() {
      this.service_hour.map((item) => {
        item.work_hour.map((item1, index1) => {
          const itemEnd = item1.end.split(":"[0]);
          const itemStart = item1.start.split(":"[0]);
          if (Number(itemStart[0]) > Number(itemEnd[0])) {
            this.isTrue = true;
          }
        });
      });
      if (this.isTrue) {
        this.toast.error(
          this.messageNoti.setting_hourse_invalid,
          this.optionToast
        );
      } else {
        this.settingOrder2 = true;
        this.settingOrder1 = false;
        this.service_hour.map((item, index) => {
          if (item && item.status) {
            item.status = item.status === true ? 1 : 0;
          }
        });
      }
      this.settingOrder1 = false;
    },

    updateSettingsHours() {
      if (this.isTrue) {
        this.toast.error(
          this.messageNoti.setting_hourse_invalid,
          this.optionToast
        );
      } else {
        const request = {
          hash_id: this.hashID,
          date: this.service_hour_temp.date,
          work_hour: this.service_hour_temp.work_hour,
          status: this.service_hour_temp.status === true ? 1 : 0,
        };
        this.reservations.updateSettingsHours(request);
      }
    },

    updateSettingReserve() {
      if (this.reserve_setting.max === null && Number(this.selected2s) === 2) {
        this.toast.error(this.messageNoti.limit_required, this.optionToast);
      } else if (
        this.reserve_setting.max <= 0 &&
        Number(this.selected2s) === 2
      ) {
        this.toast.error(this.messageNoti.limit_min, this.optionToast);
      } else if (this.hour === "時間") {
        this.toast.error(this.messageNoti.hour_required, this.optionToast);
      } else if (this.minute === "分") {
        this.toast.error(this.messageNoti.minute_required, this.optionToast);
      } else if (
        this.reserve_setting.duration_before == null ||
        this.reserve_setting.duration_before == ""
      ) {
        this.toast.error(
          this.messageNoti.duration_before_required,
          this.optionToast
        );
      } else if (this.reserve_setting.duration_before <= 0) {
        this.toast.error(this.messageNoti.limit_min, this.optionToast);
      } else if (
        Number(this.selected3s) === 1 &&
        this.reserve_setting.duration_after == null
      ) {
        this.toast.error(
          this.messageNoti.duration_after_required,
          this.optionToast
        );
      } else if (
        Number(this.selected3s) === 1 &&
        this.reserve_setting.duration_after <= 0
      ) {
        this.toast.error(this.messageNoti.limit_min, this.optionToast);
      } else if (
        Number(this.selected3s) === 2 &&
        this.reserve_setting.duration_after == null
      ) {
        this.toast.error(
          this.messageNoti.duration_after_required,
          this.optionToast
        );
      } else if (
        Number(this.selected3s) === 2 &&
        this.reserve_setting.duration_after <= 0
      ) {
        this.toast.error(this.messageNoti.limit_min, this.optionToast);
      } else {
        const request = {
          is_reserves: this.is_reserves === true ? 1 : 0,
          service_reserve_setting: {
            is_enable: this.is_enable === true ? 1 : 0,
            max: this.selected2s === 1 ? null : this.reserve_setting.max,
            time_distance: this.hour + ":" + this.minute,
            duration_before: this.reserve_setting.duration_before,
            duration_after: this.reserve_setting.duration_after,
            type_duration_after: this.reserve_setting.type_duration_after,
          },
          service_hours: this.serviceHourUpdate,
          hash_id: this.hashID,
        };
        this.reservations.updateSettingReserve(request);
      }
    },

    getDeliveryList() {
      const request = {
        idService: this.idService,
        delivery_status: this.deliveryStatus,
        payment_status: this.paymentStatus,
        course_id: this.courseList,
        page: this.page,
        per_page: this.selectPerPageDelivery,
      };
      this.store.getListDelivery(request);
    },

    updatePageDelivery(page) {
      this.preloadTableDelivery = true;
      (this.page = page), this.getDeliveryList();
    },

    getCustomerList() {
      const request = {
        idService: this.idService,
        created_at: this.dateList,
        course_id: this.courseListCustomer,
        page: this.page,
        per_page: this.selectPerPageCustomer,
      };
      this.store.getListCustomer(request);
    },

    updatePageCustomer(page) {
      this.preloadTableCustomer = true;
      (this.page = page), this.getCustomerList();
    },

    getRevenue() {
      const request = {
        idService: this.idService,
        month: this.dateRevenue ? this.dateRevenue.month + 1 : "",
        year: this.dateRevenue ? this.dateRevenue.year : "",
        page: this.page,
        per_page: this.selectPerPageSales,
      };
      this.reservations.getReservations(request);
    },

    updatePageSales(page) {
      this.preloadTableSales = true;
      (this.page = page), this.getRevenue();
    },

    getDateListSelected() {
      const request = {
        idService: this.idService,
        type_select: 1,
      };
      this.store.getDateSelected(request);
    },

    getCourseListSelected() {
      const request = {
        idService: this.idService,
        type_select: 0,
      };
      this.store.getCourseSelected(request);
    },

    updateStatusDelivery(id) {
      this.store.updateDeliveryStatus(id);
      this.reservations.getBusinessSchedule(this.$route.params.id);
    },

    addWorkHourOfWeek(value) {
      this.service_hour.map((item) => {
        if (item.day_of_week === value) {
          item.work_hour.map((item1, index) => {
            const itemEnd = item.work_hour[item.work_hour.length - 1];
            const timeItemEnd = itemEnd.end.split(":"[0]);
            if (Number(timeItemEnd[0]) < 21) {
              item.work_hour.push({
                start: `${Number(timeItemEnd[0]) + 1}:00`,
                end: "22:00",
              });
            }
          });
        }
      });
    },

    removeWorkHourOfWeek(value, index) {
      this.service_hour.map((item) => {
        if (item.day_of_week === value) {
          item.work_hour.splice(index, 1);
        }
      });
    },

    addWorkHour() {
      var item = this.service_hour_temp;
      item.work_hour.map((item1, index) => {
        const itemEnd = item.work_hour[item.work_hour.length - 1];
        const timeItemEnd = itemEnd.end.split(":"[0]);
        if (Number(timeItemEnd[0]) < 21) {
          item.work_hour.push({
            start: `${Number(timeItemEnd[0]) + 1}:00`,
            end: "22:00",
          });
        }
      });
    },

    removeWorkHour(index) {
      this.service_hour_temp.work_hour.splice(index, 1);
    },

    hideModalSettings1() {
      this.settingOrder1 = false;
      // this.settingOrder2 = true;
    },

    hideModalSettings2() {
      this.settingOrder2 = false;
    },

    showModalSettingHours(date) {
      const request = {
        hash_id: this.hashID,
        date: this.$moment(date).format("YYYY-MM-DD"),
      };
      this.reservations.getServiceHourTemp(request);
      this.settingHours = true;
      this.selectDate = false;
    },

    actionReserves() {
      this.settingOrder2 = false;
      this.reservations.updateStatusReserve(this.hashID);
    },

    skipDelivery() {
      // console.log(this.skip);
      // if (!this.skip) {
      if (new Date().getMonth() + 1 < Number(this.estDate.slice(5, 7))) {
        this.store.updateDeliveryStatus(this.idDelivery, 0);
        this.showModalConfirm = false;
      } else if (
        new Date().getMonth() + 1 ==
        Number(this.estDate.slice(5, 7))
      ) {
        if (
          Number(this.estDate.slice(8)) - new Date().getDate() <
          this.with_skip
        ) {
          this.toast.error(this.messageNoti.error_skip, this.optionToast);
        } else {
          this.store.updateDeliveryStatus(this.idDelivery, 0);
          this.showModalConfirm = false;
        }
      }
      // }
    },

    confirmDelivery() {
      this.store.updateDeliveryStatus(this.idDelivery, 2);
      this.showModalConfirm = false;
    },

    showModalConfirmSkip(value, id) {
      this.idDelivery = id;
      this.estDate = value;
      this.showModalConfirm = true;
    },
    showModalCancel(id) {
      this.id_cancel = id;
    },
    submitCancel(id) {
      this.storeBuyer.stopService(id);
      this.showModalReviewCancel = false;
    },
    createThreadChat(item) {
      if (this.token) {
        const request = {
          login_type: this.user_type === "BUYER" ? 1 : 2,
          receiver_id: item.buyer.account_id,
        };
        this.chatStore.createThreadChat(request);
      } else {
        this.$router.push("/login");
      }
    },

    changeStatus(item) {
      for (let i = 0; i < this.service_hour.length; i++) {
        if (this.service_hour[i].day_of_week === item.day_of_week) {
          this.service_hour[i].status = item.status;
          this.serviceHourUpdate = this.service_hour;
        }
      }
    },
  },
};
definePageMeta({
  layout: "seller",
});
</script>

<style lang="scss">
#ServiceManageId {
  padding: 30px 100px;
  @include screen(1199) {
    padding: 20px;
  }
  @include screen(0133601440) {
    padding: 30px 50px;
  }
  .service-manage {
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
  .service-manage-header {
    margin: 50px 0;

    &-left {
      .img-service {
        img {
          width: 200px;
          min-width: 200px;
          height: 200px;
          object-fit: cover;
          min-height: 200px;
          @include screen(01023) {
            width: 150px;
            min-width: 150px;
            height: 150px;
            min-height: 150px;
            margin: 0 auto;
          }
          @include screen(767) {
            width: 100%;
            height: auto;
            margin: 0 auto;
          }
        }
      }

      .infomation-service {
        margin-left: 50px;
        @include screen(1199) {
          margin-left: 30px;
        }
        @include screen(767) {
          margin-left: 0;
          text-align: center;
          margin-bottom: 30px;
          margin-top: 30px;
        }
        &-text1 {
          color: #5e5c5c;
          font-weight: 600;
          font-size: 28px;
          @include screen(01023) {
            font-size: 24px;
          }
        }

        &-text2 {
          color: #5e5c5c;
          font-weight: 600;
          font-size: 20px;
        }

        &-text3 {
          color: #5e5c5c;
          font-weight: 600;
          font-size: 16px;
        }
      }
    }

    &-right {
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
          padding: 11px 30px;
          border: none;
          white-space: nowrap;
          @media (max-width: 768px) {
            width: unset;
            margin: 0 auto;
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
    box-shadow: 2px 2px 2px #4d4d4d33;
    .nav-tabs {
      border-bottom: unset !important;

      .nav-item {
        background: #cccbcb;

        .nav-link {
          color: white;
          font-size: 18px;
          font-weight: 600;
          border: unset !important;
          border: 0;
          min-height: 60px;
        }

        .active {
          color: #5e5c5c;
          border-radius: unset !important;
        }
      }
    }

    .tab-content-item {
      background: white;
      padding: 20px 30px;
    }

    .item-qrcode {
      img {
        width: 250px;
        height: 250px;
      }

      &-text1 {
        color: #5e5c5c;
        font-weight: 600;
        font-size: 28px;
      }

      &-text2 {
        color: #5e5c5c;
        font-weight: 600;
        font-size: 20px;
      }
    }

    .form-select-custom {
      background-image: url("@/assets/images/iconArrowDownOrange.png") !important;
      color: #7e7d7d;
      padding: 0.375rem 2.25rem 0.375rem 1.25rem;
      border: none;
      height: 40px;
      box-shadow: 0px 3px 6px #00000029;
      width: 200px;
      margin-left: 10px;
    }

    .form-select-custom-per-page {
      background-image: url("@/assets/images/iconArrowDownOrange.png") !important;
      color: #7e7d7d;
      padding: 0.375rem 2.25rem 0.375rem 1.25rem;
      border: none;
      height: 40px;
      box-shadow: 0px 3px 6px #00000029;
      width: 90px;
      margin-left: 10px;
    }

    .item-tab2 {
      &-table {
        margin-top: 30px;
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
    .tabsSchedule {
      .tab-content-item {
        padding: 0;
      }
    }
  }
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
          .dote {
            min-width: 25px;
            height: 25px;
            background-color: $gray-500;
            border-radius: 50%;
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
  }
}
.action-schedule {
  &-button {
    box-shadow: 1px 1px 6px #00000029;
    background: #fff;
    border-radius: 30px;
    min-height: 45px;
    &:hover {
      background: $orange;
      color: $white;
      border-color: $orange;
    }
  }
}

.settingOrder1-form {
  margin-bottom: 20px;
  .item-checkbox {
    width: 20%;
    @media (max-width: 575.98px) {
      width: 30% !important;
    }
    .form-check {
      margin: 10px 0;
      cursor: pointer;
      font-size: 18px;
      @media (max-width: 575.98px) {
        font-size: 15px;
      }
      color: $gray-800;

      .form-checkbox-select:checked {
        background-color: $orange !important;
        border-color: $orange !important;
      }

      span {
        color: #7e7d7d;
        font-weight: 500;
      }
    }
  }
  .list-time {
    width: 80%;
    @media (max-width: 575.98px) {
      width: 89% !important;
    }

    .item-time {
      width: 100%;
      margin: 10px 0;
    }
  }

  .item-add {
    margin-left: 20px;
    width: 20%;
    img {
      width: 30px;
      cursor: pointer;
    }
  }
}
.settingOrder1-button {
  button {
    background: $orange;
    width: 100%;
    border: unset;
    font-size: 18px;
    font-weight: 500;
  }
}
.settingOrder1-content {
  padding-left: 100px;
  padding-right: 100px;
  @media (max-width: 575.98px) {
    padding-left: 0px;
    padding-right: 0px;
  }

  @media (max-width: 770px) {
    padding-left: 0px;
    padding-right: 0px;
  }
}
.settingOrder2-button {
  button {
    background: $orange;
    width: 100%;
    border: unset;
    font-size: 18px;
    font-weight: 500;
  }
}
.settingOrder2-content {
  padding-left: 100px;
  padding-right: 100px;
  @media (max-width: 575.98px) {
    padding-left: 0px;
    padding-right: 0px;
  }

  @media (max-width: 770px) {
    padding-left: 0px;
    padding-right: 0px;
  }
}
.settingHours-button {
  button {
    background: $orange;
    width: 100%;
    border: unset;
    font-size: 18px;
    font-weight: 500;
  }
}

#modal-cancel {
  .content-modal-detail {
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
