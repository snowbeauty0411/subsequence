<template>
  <b-container fluid class="dashboard-seller w-full g-0">
    <div class="flex flex-col" v-if="this.approvedList.length > 0">
      <PreLoad :preload="preload" />
      <div class="dashboard-seller-header">
        <div class="header-wave">
          <svg
            class="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g class="parallax">
              <use xlink:href="#gentle-wave" x="48" y="0" fill="#FE948A" />
              <use xlink:href="#gentle-wave" x="48" y="3" fill="#FE948A" />
              <use xlink:href="#gentle-wave" x="48" y="7" fill="#f48089" />
            </g>
          </svg>

          <!-- <svg
            class="waves1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g class="parallax">
              <use xlink:href="#gentle-wave" x="48" y="4" fill="#e5e9fc" />
            </g>
          </svg> -->
        </div>
        <div
          class="absolute top-[10px] justify-center flex items-center header-select"
        >
          <b-form-select
            v-model="serviceSelected"
            :options="listServices"
            size="sm"
            class="form-select-custom"
            @change="getMonthOfStatis($event)"
          ></b-form-select>
        </div>
        <div class="flex flex-col">
          <div
            class="header-content absolute flex flex-col w-full justify-between"
          >
            <div class="flex justify-between header-content-sp">
              <div class="header-content-item flex flex-col">
                <div
                  class="header-content-item-top flex px-3 items-center text-base font-semibold"
                >
                  予約スケジュール
                </div>
                <div class="header-content-item-bottom py-4">
                  <div class="flex">
                    <div
                      class="flex w-full px-3 text-center"
                      :class="
                        listImgReserveToday.length > 0
                          ? 'flex-row-reverse justify-between'
                          : 'justify-center'
                      "
                      style="border-right: 2px solid #e5e5e5"
                    >
                      <div v-if="listImgReserveToday.length > 0" class="d-grid">
                        <div
                          v-for="(item, index) in listImgReserveToday"
                          :key="index"
                          :style="
                            index === 0
                              ? 'z-index: 2;'
                              : index === 1
                              ? 'z-index: 1;'
                              : 'z-index: 0;'
                          "
                        >
                          <img
                            :src="
                              item.profile_image_url_buy !== null
                                ? item.profile_image_url_buy
                                : avatarDefault
                            "
                            alt=""
                            class="mb-[-15px] header-manage-right-avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div class="text-base font-semibold py-2">本日</div>
                        <div class="text-yellow-500 text-4xl">
                          {{ formatNumber(parseInt(today_reserves_number)) }} 件
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex w-full px-3 text-center"
                      :class="
                        listImgReserveNextday.length > 0
                          ? 'flex-row-reverse justify-between'
                          : 'justify-center'
                      "
                    >
                      <div
                        v-if="listImgReserveNextday.length > 0"
                        class="d-grid"
                      >
                        <div
                          v-for="(item, index) in listImgReserveNextday"
                          :key="index"
                          :style="
                            index === 0
                              ? 'z-index: 2;'
                              : index === 1
                              ? 'z-index: 1;'
                              : 'z-index: 0;'
                          "
                        >
                          <img
                            :src="
                              item.profile_image_url_buy !== null
                                ? item.profile_image_url_buy
                                : avatarDefault
                            "
                            alt=""
                            class="mb-[-15px] header-manage-right-avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div class="text-base font-semibold py-2">明日</div>
                        <div class="text-yellow-500 text-4xl">
                          {{ formatNumber(parseInt(nextday_reserves_number)) }}
                          件
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="header-content-item">
                <div
                  class="header-content-item-top flex px-3 items-center text-base font-semibold"
                >
                  配送予定
                </div>
                <div
                  class="header-content-item-bottom flex py-4 w-full justify-center"
                >
                  <div class="flex flex-col justify-around">
                    <div class="text-base font-semibold">配送待ち</div>
                    <div class="text-yellow-500 text-4xl">
                      {{ formatNumber(parseInt(service_estimated_delivery)) }}
                      <span class="text-2xl">件</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-between mt-[50px] header-content-sp2">
              <div class="flex justify-between w-[45%] header-content-sp-item1">
                <div class="header-content-item1 flex flex-col">
                  <div
                    class="header-content-item1-top flex px-3 items-center text-base font-semibold"
                  >
                    閲覧数（一覧ページ）
                  </div>
                  <div class="header-content-item1-bottom py-4">
                    <div class="flex h-full">
                      <div
                        class="flex w-full justify-between px-3 text-center items-end"
                      >
                        <div class="text-yellow-500 text-2xl">
                          {{ formatNumber(parseInt(service_page_access)) }}
                        </div>
                        <div
                          class="flex text-1xl items-center"
                          :class="
                            Number(service_page_number) >= 0
                              ? 'text-[#D53201]'
                              : 'text-[#1CB3B9]'
                          "
                        >
                          <SDIcon
                            icon="arrow-up"
                            v-if="Number(service_page_number) >= 0"
                          />
                          <SDIcon icon="arrow-down" v-else />
                          {{ formatNumber(parseInt(service_page_number)) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="header-content-item1 flex flex-col">
                  <div
                    class="header-content-item1-top flex px-3 items-center text-base font-semibold"
                  >
                    閲覧数（詳細ページ）
                  </div>
                  <div class="header-content-item1-bottom py-4">
                    <div class="flex h-full">
                      <div
                        class="flex w-full justify-between px-3 text-center items-end"
                      >
                        <div class="text-yellow-500 text-2xl">
                          {{
                            formatNumber(parseInt(detail_page_current_access))
                          }}
                        </div>
                        <div
                          class="flex text-1xl items-center"
                          :class="
                            Number(detail_increase_number) >= 0
                              ? 'text-[#D53201]'
                              : 'text-[#1CB3B9]'
                          "
                        >
                          <SDIcon
                            icon="arrow-up"
                            v-if="Number(detail_increase_number) >= 0"
                          />
                          <SDIcon icon="arrow-down" v-else />
                          {{ formatNumber(parseInt(detail_increase_number)) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between w-[45%] header-content-sp-item1">
                <div class="header-content-item1 flex flex-col">
                  <div
                    class="text-center header-content-item1-top flex text-center px-3 items-center text-base font-semibold text-center"
                  >
                    お気に入り登録数
                  </div>
                  <div class="header-content-item1-bottom py-4">
                    <div class="flex h-full">
                      <div
                        class="flex w-full justify-between px-3 text-center items-end"
                      >
                        <div class="text-yellow-500 text-2xl">
                          {{ formatNumber(parseInt(current_favorites)) }}
                        </div>
                        <div
                          class="flex text-1xl items-center"
                          :class="
                            Number(favorites_increase_number) >= 0
                              ? 'text-[#D53201]'
                              : 'text-[#1CB3B9]'
                          "
                        >
                          <SDIcon
                            icon="arrow-up"
                            v-if="Number(favorites_increase_number) >= 0"
                          />
                          <SDIcon icon="arrow-down" v-else />
                          {{
                            formatNumber(parseInt(favorites_increase_number))
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="header-content-item1 flex flex-col">
                  <div
                    class="header-content-item1-top flex px-3 items-center text-base font-semibold text-center"
                  >
                    口コミ数
                  </div>
                  <div class="header-content-item1-bottom py-4">
                    <div class="flex h-full">
                      <div
                        class="flex w-full justify-between px-3 text-center items-end"
                      >
                        <div class="text-yellow-500 text-2xl">
                          {{ formatNumber(parseInt(current_reviews)) }}
                        </div>
                        <div
                          class="flex text-1xl items-center"
                          :class="
                            Number(review_increase_number) >= 0
                              ? 'text-[#D53201]'
                              : 'text-[#1CB3B9]'
                          "
                        >
                          <SDIcon
                            icon="arrow-up"
                            v-if="Number(review_increase_number) >= 0"
                          />
                          <SDIcon icon="arrow-down" v-else />
                          {{ formatNumber(parseInt(review_increase_number)) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-between mt-[50px] header-content-sp2">
              <div class="flex justify-between w-[45%] header-content-sp-item1">
                <div class="header-content-item1 flex flex-col">
                  <div
                    class="header-content-item1-top flex px-3 items-center text-base font-semibold text-center"
                  >
                    サービス評価
                  </div>
                  <div class="header-content-item1-bottom py-4">
                    <div class="flex h-full">
                      <div
                        class="flex w-full justify-between px-3 text-center items-end"
                      >
                        <div class="text-yellow-500 text-2xl">
                          {{ formatNumber(parseInt(current_rating)) }}
                        </div>
                        <div
                          class="flex text-1xl items-center"
                          :class="
                            Number(rating_increase_number) >= 0
                              ? 'text-[#D53201]'
                              : 'text-[#1CB3B9]'
                          "
                        >
                          <SDIcon
                            icon="arrow-up"
                            v-if="Number(rating_increase_number) >= 0"
                          />
                          <SDIcon icon="arrow-down" v-else />
                          {{ formatNumber(parseInt(rating_increase_number)) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="header-content-item1 flex flex-col">
                  <div
                    class="header-content-item1-top flex px-3 items-center text-base font-semibold text-center"
                  >
                    契約数
                  </div>
                  <div class="header-content-item1-bottom py-4">
                    <div class="flex h-full">
                      <div
                        class="flex w-full justify-between px-3 text-center items-end"
                      >
                        <div class="text-yellow-500 text-2xl">
                          {{ formatNumber(parseInt(current_contracts)) }}
                        </div>
                        <div
                          class="flex text-1xl items-center"
                          :class="
                            Number(contracts_increase_number) >= 0
                              ? 'text-[#D53201]'
                              : 'text-[#1CB3B9]'
                          "
                        >
                          <SDIcon
                            icon="arrow-up"
                            v-if="Number(contracts_increase_number) >= 0"
                          />
                          <SDIcon icon="arrow-down" v-else />
                          {{
                            formatNumber(parseInt(contracts_increase_number))
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between w-[45%] header-content-sp-item1">
                <div class="header-content-item1 flex flex-col">
                  <div
                    class="header-content-item1-top flex px-3 items-center text-base font-semibold text-center"
                  >
                    売上高
                  </div>
                  <div class="header-content-item1-bottom py-4">
                    <div class="flex h-full">
                      <div
                        class="flex w-full justify-between px-3 text-center items-end"
                      >
                        <div class="text-yellow-500 text-2xl">
                          {{
                            formatNumber(
                              parseInt(
                                current_revenue === null ? 0 : current_revenue
                              )
                            )
                          }}
                        </div>
                        <div
                          class="flex text-1xl items-center"
                          :class="
                            Number(current_revenue) >= 0
                              ? 'text-[#D53201]'
                              : 'text-[#1CB3B9]'
                          "
                        >
                          <SDIcon
                            icon="arrow-up"
                            v-if="Number(revenue_increase_number) >= 0"
                          />
                          <SDIcon icon="arrow-down" v-else />
                          {{
                            formatNumber(
                              parseInt(
                                revenue_increase_number === null
                                  ? 0
                                  : revenue_increase_number
                              )
                            )
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="header-content-item1 flex flex-col">
                  <div
                    class="header-content-item1-top flex px-3 items-center text-base font-semibold text-center"
                  >
                    公式サイトURLクリック数
                  </div>
                  <div class="header-content-item1-bottom py-4">
                    <div class="flex h-full">
                      <div
                        class="flex w-full justify-between px-3 text-center items-end"
                      >
                        <div class="text-yellow-500 text-2xl">
                          {{
                            formatNumber(
                              parseInt(
                                offical_access === null ? 0 : offical_access
                              )
                            )
                          }}
                        </div>
                        <div
                          class="flex text-1xl items-center"
                          :class="
                            Number(offical_increase_number) >= 0
                              ? 'text-[#D53201]'
                              : 'text-[#1CB3B9]'
                          "
                        >
                          <SDIcon
                            icon="arrow-up"
                            v-if="Number(offical_increase_number) >= 0"
                          />
                          <SDIcon icon="arrow-down" v-else />
                          {{ formatNumber(parseInt(offical_increase_number)) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-seller-mid flex flex-col">
        <div class="dashboard-seller-mid-header flex justify-between">
          <div class="title-chart font-semibold text-[20px] text-[#7E7D7D]">
            ページビュー
          </div>
          <div class="select-chart flex">
            <b-form-select
              v-model="viewSelected"
              :options="optionsView"
              size="md"
              class="form-select-custom mx-0 mb-4"
              @change="getGraphOfStatisticals($event)"
            ></b-form-select>
            <b-form-select
              v-model="yearSelected"
              :options="optionListYear"
              size="md"
              class="form-select-custom mx-2 mb-4"
              @change="getGraphOfYear($event)"
            ></b-form-select>
          </div>
        </div>
        <div class="dashboard-seller-mid-list w-full">
          <LineChart
            :dataList="listGraphOfStatisticals"
            :title="selectedTitle"
            :key="listGraphOfStatisticals"
          />
        </div>
      </div>
      <div class="dashboard-seller-mid flex flex-col">
        <div class="title-chart font-semibold text-[20px] text-[#7E7D7D]">
          サマリー
        </div>
        <div class="dashboard-seller-mid-header flex justify-between mt-4">
          <div class="select-chart flex">
            <b-form-select
              v-model="selectYear"
              :options="optionYear"
              size="md"
              class="form-select-custom mx-0 mb-4"
              @change="getListByYear($event)"
            ></b-form-select>
          </div>
          <div class="select-chart flex w-[28%]">
            <label class="mr-[20px]">ページごとの表示数:</label>
            <b-form-select
              v-model="perPage"
              :options="listPerpage"
              size="md"
              class="form-select-custom mx-0 mb-4 w-[50%]"
              @change="getListByPerpage($event)"
            ></b-form-select>
          </div>
        </div>
        <div class="dashboard-seller-mid-table w-full">
          <div
            v-if="preloadTable"
            class="sd-preloads flex justify-center items-center"
          >
            <div class="snippet" data-title=".dot-flashing">
              <div class="stage">
                <div class="dot-flashing"></div>
              </div>
            </div>
          </div>
          <Tables
            v-bind:items="listServiceStatistical"
            v-bind:fields="fields"
            v-bind:border="false"
            v-bind:bgCell="false"
            v-bind:totalPage="totalPageList"
            v-bind:currentPage="currentPageList"
            v-on:update_page="updatePage"
          >
            <template #cell(statistical_access_list_service_page)="{ item }">
              <div
                class="group-btn bg-midnight text-tahiti text-center flex items-end"
              >
                <div class="w-20 text-right text-lg" style="line-height: 10px">
                  {{
                    formatNumber(
                      parseInt(
                        item.statistical_access_list_service_page
                          .current_access_list_pages
                      )
                    )
                  }}
                </div>
                <div class="ml-2 text-sm" style="line-height: 10px">
                  <label
                    v-if="
                      Number(
                        item.statistical_access_list_service_page
                          .increase_number >= 0
                      )
                    "
                    >(+{{
                      formatNumber(
                        parseInt(
                          item.statistical_access_list_service_page
                            .increase_number
                        )
                      )
                    }})</label
                  >
                  <label v-else
                    >({{
                      formatNumber(
                        parseInt(
                          item.statistical_access_list_service_page
                            .increase_number
                        )
                      )
                    }})</label
                  >
                </div>
              </div>
            </template>
            <template #cell(statistical_access_service_detail_page)="{ item }">
              <div class="group-btn bg-midnight text-tahiti text-center flex">
                <div class="w-20 text-right text-lg" style="line-height: 10px">
                  {{
                    formatNumber(
                      parseInt(
                        item.statistical_access_service_detail_page
                          .current_access_detail_pages
                      )
                    )
                  }}
                </div>
                <div class="ml-2 text-sm" style="line-height: 10px">
                  <label
                    v-if="
                      Number(
                        item.statistical_access_service_detail_page
                          .increase_number >= 0
                      )
                    "
                    >(+{{
                      formatNumber(
                        parseInt(
                          item.statistical_access_service_detail_page
                            .increase_number
                        )
                      )
                    }})</label
                  ><label v-else>
                    ({{
                      formatNumber(
                        parseInt(
                          item.statistical_access_service_detail_page
                            .increase_number
                        )
                      )
                    }})
                  </label>
                </div>
              </div>
            </template>
            <template #cell(statistical_click_official_url)="{ item }">
              <div class="group-btn bg-midnight text-tahiti text-center flex">
                <div class="w-20 text-right text-lg" style="line-height: 10px">
                  {{
                    formatNumber(
                      parseInt(
                        item.statistical_click_official_url
                          .current_number_click_official_urls
                      )
                    )
                  }}
                </div>
                <div class="ml-2 text-sm" style="line-height: 10px">
                  <label
                    v-if="
                      Number(
                        item.statistical_click_official_url.increase_number >= 0
                      )
                    "
                    >(+{{
                      formatNumber(
                        parseInt(
                          item.statistical_click_official_url.increase_number
                        )
                      )
                    }})</label
                  ><label v-else
                    >({{
                      formatNumber(
                        parseInt(
                          item.statistical_click_official_url.increase_number
                        )
                      )
                    }})</label
                  >
                </div>
              </div>
            </template>
            <template #cell(statistical_contracts)="{ item }">
              <div class="group-btn bg-midnight text-tahiti text-center flex">
                <div class="w-20 text-right text-lg" style="line-height: 10px">
                  {{
                    formatNumber(
                      parseInt(item.statistical_contracts.current_contracts)
                    )
                  }}
                </div>
                <div class="ml-2 text-sm" style="line-height: 10px">
                  <label
                    v-if="
                      Number(item.statistical_contracts.increase_number >= 0)
                    "
                    >(+{{
                      formatNumber(
                        parseInt(item.statistical_contracts.increase_number)
                      )
                    }})</label
                  ><label v-else
                    >({{
                      formatNumber(
                        parseInt(item.statistical_contracts.increase_number)
                      )
                    }})</label
                  >
                </div>
              </div>
            </template>
            <template #cell(statistical_favorite)="{ item }">
              <div class="group-btn bg-midnight text-tahiti text-center flex">
                <div class="w-20 text-right text-lg" style="line-height: 10px">
                  {{
                    formatNumber(
                      parseInt(item.statistical_favorite.current_favorites)
                    )
                  }}
                </div>
                <div class="ml-2 text-sm" style="line-height: 10px">
                  <label
                    v-if="
                      Number(item.statistical_favorite.increase_number >= 0)
                    "
                    >(+{{
                      formatNumber(
                        parseInt(item.statistical_favorite.increase_number)
                      )
                    }})</label
                  ><label v-else
                    >({{
                      formatNumber(
                        parseInt(item.statistical_favorite.increase_number)
                      )
                    }})</label
                  >
                </div>
              </div>
            </template>
            <template #cell(statistical_rating)="{ item }">
              <div class="group-btn bg-midnight text-tahiti text-center flex">
                <div class="w-20 text-right text-lg" style="line-height: 10px">
                  {{
                    formatNumber(
                      parseInt(item.statistical_rating.current_ratings)
                    )
                  }}
                </div>
                <div class="ml-2 text-sm" style="line-height: 10px">
                  <label
                    v-if="Number(item.statistical_rating.increase_number >= 0)"
                    >(+{{
                      formatNumber(
                        parseInt(item.statistical_rating.increase_number)
                      )
                    }})</label
                  ><label v-else
                    >({{
                      formatNumber(
                        parseInt(item.statistical_rating.increase_number)
                      )
                    }})</label
                  >
                </div>
              </div>
            </template>
            <template #cell(statistical_review)="{ item }">
              <div class="group-btn bg-midnight text-tahiti text-center flex">
                <div class="w-20 text-right text-lg" style="line-height: 10px">
                  {{
                    formatNumber(
                      parseInt(item.statistical_review.current_reviews)
                    )
                  }}
                </div>
                <div class="ml-2 text-sm" style="line-height: 10px">
                  <label
                    v-if="Number(item.statistical_review.increase_number >= 0)"
                    >(+{{
                      formatNumber(
                        parseInt(item.statistical_review.increase_number)
                      )
                    }})</label
                  ><label v-else
                    >({{
                      formatNumber(
                        parseInt(item.statistical_review.increase_number)
                      )
                    }})</label
                  >
                </div>
              </div>
            </template>
            <template #cell(statistical_revenue)="{ item }">
              <div class="group-btn bg-midnight text-tahiti text-center flex">
                <div class="w-20 text-right text-lg" style="line-height: 10px">
                  {{
                    item.statistical_revenue === null
                      ? 0
                      : formatNumber(
                          parseInt(item.statistical_revenue.current_revenue)
                        )
                  }}
                </div>
                <div class="ml-2 text-sm" style="line-height: 10px">
                  (+
                  {{
                    item.statistical_revenue.increase_number === null
                      ? 0
                      : formatNumber(
                          parseInt(item.statistical_revenue.increase_number)
                        )
                  }})
                </div>
              </div>
            </template>
          </Tables>
        </div>
      </div>
    </div>
    <div class="flex flex-col" v-else>
      <b-row class="w-full complete-service">
        <b-col cols="6" lg="7" sm="6" class="complete-service-left">
          <div>
            <p class="complete-service-text text-center">
              まずは、あなたのサービスを出品してみましょう！
            </p>
          </div>
          <div class="flex justify-center d-none d-md-flex">
            <b-button
              class="complete-service-confirmation p-3"
              v-on:click="createService()"
            >
              サービス出品ページへ
            </b-button>
          </div>
          <div
            class="flex justify-center d-none d-md-flex items-center text-[#E79C3A] cursor-pointer"
            v-on:click="redirectSupport()"
          >
            <img src="@/assets/images/messageIcon.png" alt="" class="mx-2" />
            <div class="text-lg font-semibold">出品のサポートを依頼する</div>
          </div>
        </b-col>
        <b-col
          cols="6"
          lg="5"
          sm="6"
          class="complete-service-right flex items-center justify-center"
        >
          <b-img src="../assets/images/logo3.png"></b-img>
        </b-col>
        <b-col cols="12" class="d-md-none complete-service-left">
          <div class="d-none">
            <p class="complete-service-text text-center">
              まずは、あなたのサービスを出品してみましょう！
            </p>
          </div>
          <div class="flex justify-center w-md-full">
            <b-button class="complete-service-confirmation p-3 w-md-full" v-on:click="createService()">
              サービス出品ページへ
            </b-button>
          </div>
          <div class="flex justify-center items-center text-[#E79C3A] cursor-pointer" v-on:click="redirectSupport()">
            <img src="@/assets/images/messageIcon.png" alt="" class="mx-2" />
            <div class="text-lg font-semibold">出品のサポートを依頼する</div>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import imgDefault from "@/assets/images/detail1.png";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import SDIcon from "@/components/SDIcon";
import PreLoad from "@/components/SDPreLoad";
import SDPagination from "@/components/SDPagination";
import LineChart from "@/components/chart/LineDashboardSeller.ts";
import Tables from "@/components/SDTable";
import Cookies from "js-cookie";
import { tableFields } from "@/utils/table-fields";
import avatarDefault from "@/assets/images/ellipse.png";

export default {
  emits: ["update_page"],
  setup() {
    const store = sellerStore();
    return {
      store,
      avatarDefault,
    };
  },
  data() {
    return {
      totalPageBought: null,
      currentPageBought: 1,
      totalPageFavorite: null,
      currentPageFavorite: 1,
      totalPageStop: null,
      currentPageStop: 1,
      imgDefault,
      account_id: null,
      listServiceBought: [],
      listServiceFavorite: [],
      listCommentBuyer: [],
      totalPageList: 1,
      currentPageList: 1,
      listServiceStop: [],
      preload: true,
      listReservation: [],
      reservationAfterCurrent: 0,
      viewSelected: 1,
      yearSelected: 1,
      serviceSelected: "",
      listServices: [],
      perPage: 5,
      selectYear: 1,
      listPerpage: [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
      ],
      optionsView: [
        { value: 1, text: "閲覧数（一覧ページ）" },
        { value: 2, text: "閲覧数（詳細ページ）" },
        { value: 3, text: "お気に入り登録数" },
        { value: 4, text: "口コミ数" },
        { value: 5, text: "サービス評価" },
        { value: 6, text: "契約数" },
        { value: 7, text: "売上高" },
        { value: 8, text: "公式サイトURLクリック数" },
      ],
      optionYear: [
        { value: 0, text: "今年度" },
        { value: 1, text: "直近1年間" },
        { value: 2, text: "直近2年間" },
        { value: 3, text: "直近3年間" },
        { value: 4, text: "直近4年間" },
        { value: 5, text: "直近5年間" },
        { value: 6, text: "直近6年間" },
        { value: 7, text: "直近7年間" },
        { value: 8, text: "直近8年間" },
        { value: 9, text: "直近9年間" },
        { value: 10, text: "直近10年間" },
      ],

      optionListYear: [
        { value: 1, text: "1ヶ月前" },
        { value: 3, text: "3ヶ月前" },
        { value: 6, text: "6ヶ月前" },
        { value: 12, text: "12ヶ月前" }
      ],
      fields: tableFields.LIST_DASHBOARD_SELLER,
      listMonthStatistical: {},
      today_reserves_number: 0,
      nextday_reserves_number: 0,
      detail_page_current_access: 0,
      detail_increase_number: 0,
      service_estimated_delivery: 0,
      service_page_access: 0,
      service_page_number: 0,
      current_favorites: 0,
      favorites_increase_number: 0,
      current_reviews: 0,
      current_rating: 0,
      current_contracts: 0,
      rating_increase_number: 0,
      contracts_increase_number: 0,
      statistical_revenue: 0,
      offical_access: 0,
      offical_increase_number: 0,
      review_increase_number: 0,
      listServiceStatistical: [],
      pageList: 1,
      selectedTitle: "閲覧数（一覧ページ）",
      listImgReserveToday: [],
      listImgReserveNextday: [],
      listGraphOfStatisticals: {},
      preloadTable: false,
      current_revenue: 0,
      revenue_increase_number: 0,
      approvedList: [],
    };
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    SDIcon,
    PreLoad,
    SDPagination,
    LineChart,
    Tables,
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.account_id = Cookies.get("account_id");
    }
    this.getListSerivce();
    this.getYearOfStatisticals(this.perPage, this.selectYear);
    const dataRequest = {
      seller_id: this.account_id,
    };
    this.store.getListServiceApproved(dataRequest);
  },
  computed: {
    ...mapState(sellerStore, [
      "success",
      "message",
      "listGraph",
      "error",
      "listService",
      "listMonthOfStatistical",
      "listGraphOfStatistical",
      "listYearOfStatistical",
      "listApproved",
    ]),
  },
  watch: {
    listMonthOfStatistical() {
      this.preload = true;
      this.listMonthStatistical = this.listMonthOfStatistical;
      this.today_reserves_number =
        this.listMonthStatistical.service_reserve[0].today_reserves.number_reserves;

      this.listImgReserveToday =
        this.listMonthStatistical.service_reserve[0].today_reserves.last_user_reserves;
      this.listImgReserveNextday =
        this.listMonthStatistical.service_reserve[0].next_date_reserves.last_user_reserves;

      this.nextday_reserves_number =
        this.listMonthStatistical.service_reserve[0].next_date_reserves.number_reserves;
      this.detail_page_current_access =
        this.listMonthStatistical.statistical_access_service_detail_page.current_access_detail_pages;
      this.detail_increase_number =
        this.listMonthStatistical.statistical_access_service_detail_page.increase_number;
      this.service_estimated_delivery =
        this.listMonthStatistical.service_estimated_delivery;
      this.service_page_access =
        this.listMonthStatistical.statistical_access_list_service_page.current_access_list_pages;
      this.service_page_number =
        this.listMonthStatistical.statistical_access_list_service_page.increase_number;
      this.current_favorites =
        this.listMonthStatistical.statistical_favorite.current_favorites;
      this.favorites_increase_number =
        this.listMonthStatistical.statistical_favorite.increase_number;
      this.current_reviews =
        this.listMonthStatistical.statistical_review.current_reviews;
      this.review_increase_number =
        this.listMonthStatistical.statistical_review.increase_number;
      this.current_rating =
        this.listMonthStatistical.statistical_rating.current_ratings;
      this.rating_increase_number =
        this.listMonthStatistical.statistical_rating.increase_number;
      this.current_contracts =
        this.listMonthStatistical.statistical_contracts.current_contracts;
      this.contracts_increase_number =
        this.listMonthStatistical.statistical_contracts.increase_number;
      this.current_revenue =
        this.listMonthStatistical.statistical_revenue.current_revenues;
      this.revenue_increase_number =
        this.listMonthStatistical.statistical_revenue.increase_number;
      this.offical_access =
        this.listMonthStatistical.statistical_click_official_url.current_number_click_official_urls;
      this.offical_increase_number =
        this.listMonthStatistical.statistical_click_official_url.increase_number;
      this.preload = false;
      this.preloadTable = false;
    },

    listGraphOfStatistical() {
      this.listGraphOfStatisticals = this.listGraphOfStatistical;
    },

    listService() {
      if (this.listService.length > 0) {
        this.preload = true;
        this.listServices = this.listService.map((item) => ({
          text: item.name,
          value: item.hash_id,
        }));
        this.serviceSelected = this.listServices[0].value;
        this.getMonthOfStatis(this.serviceSelected);
        this.store.getGraphOfStatistical(this.serviceSelected);
        this.preload = false;
        this.preloadTable = false;
      }
    },

    listYearOfStatistical() {
      this.preload = true;
      if (this.listYearOfStatistical.data.length > 0) {
        this.listServiceStatistical = this.listYearOfStatistical.data;
      }
      this.totalPageList = this.listYearOfStatistical.last_page;
      this.currentPageList = this.listYearOfStatistical.current_page;
      this.preload = false;
      this.preloadTable = false;
    },

    listApproved() {
      this.approvedList = this.listApproved;
    },
  },
  methods: {
    getMonthOfStatis(event) {
      this.serviceSelected = event;
      this.preload = false;
      const request = {
        graph_type: this.viewSelected,
        last_year_number: this.yearSelected,
      };
      this.store.getMonthOfStatistical(this.serviceSelected);
      this.store.getGraphOfStatistical(this.serviceSelected, request);
    },

    getListSerivce() {
      this.preload = false;
      this.store.getListServiceOfSeller(this.account_id);
    },

    getYearOfStatisticals(perPage, selectYear) {
      const page = this.pageList;
      const request = {
        per_page: perPage,
        last_year_number: selectYear,
      };
      this.store.getYearOfStatistical(this.account_id, page, request);
    },

    updatePage(page) {
      this.preloadTable = true;
      (this.pageList = page),
        this.getYearOfStatisticals(this.perPage, this.selectYear);
    },

    getGraphOfStatisticals(event) {
      this.viewSelected = event;
      this.optionsView.map((item) => {
        if (item.value === event) {
          this.selectedTitle = item.text;
        }
      });
      const request = {
        graph_type: this.viewSelected,
        last_month_number: this.yearSelected,
      };
      this.store.getGraphOfStatistical(this.serviceSelected, request);
    },

    getGraphOfYear(event) {
      this.yearSelected = event;
      const request = {
        graph_type: this.viewSelected,
        last_month_number: this.yearSelected,
      };
      this.store.getGraphOfStatistical(this.serviceSelected, request);
    },

    getListByPerpage(event) {
      this.perPage = event;
      this.pageList = 1;
      this.getYearOfStatisticals(this.perPage, this.selectYear);
    },

    getListByYear(event) {
      this.selectYear = event;
      this.getYearOfStatisticals(this.perPage, this.selectYear);
    },

    formatNumber(value) {
      return new Intl.NumberFormat().format(value);
    },

    createService() {
      this.$router.push("/seller/service/management");
    },

    redirectSupport() {
      this.store.requestSupport();
      this.$router.push("/seller/support");
    },
  },
};
definePageMeta({
  layout: "seller",
});
</script>

<style lang="scss" scoped>
.dashboard-seller {
  &-header {
    background: white;
    width: 100%;
    height: 750px;
    position: relative;
    @include screen(991) {
      height: 1150px;
      background: #faf9f3;
    }
    @include screen(480) {
      height: 1950px;
    }
    .header-wave {
      height: 750px; /* change the height of the waves here */
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
        display: none;
      }
      @include screen(480) {
        height: 220px;
      }
      .waves {
        position: relative;
        width: 100%;
        height: 25vh;
        margin-bottom: -7px; /*Fix for safari gap*/
        min-height: 150px;
        max-height: 350px;
        transform: rotate(180deg);
      }
      .waves1 {
        position: relative;
        width: 100%;
        height: 15vh;
        margin-bottom: -7px; /*Fix for safari gap*/
        min-height: 30px;
        max-height: 80px;
      }
      .parallax > use {
        animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
      }
      .parallax > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
      }
      .parallax > use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
        margin-top: 50px;
      }
      .parallax > use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
      }
      .parallax > use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
      }

      .parallax1 > use {
        animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
      }
      .parallax1 > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
      }
      @keyframes move-forever {
        0% {
          transform: translate3d(-90px, 0, 0);
        }
        100% {
          transform: translate3d(85px, 0, 0);
        }
      }
      /*Shrinking for mobile*/
      @media (max-width: 768px) {
        .waves {
          height: 40px;
          min-height: 40px;
        }
      }
    }
    .header-select {
      right: 75px;
      @include screen(991) {
        right: 25px;
        left: 25px;
      }
    }
    .header-content {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0 75px;
      @include screen(991) {
        padding: 0 30px;
      }
      &-sp {
        @include screen(480) {
          flex-direction: column;
        }
      }
      &-item {
        width: 45%;
        height: 200px;
        @include screen(480) {
          height: 150px;
          width: 100%;
        }
        &:first-child {
          @include screen(480) {
            margin-bottom: 20px;
          }
        }
        &-top {
          border-radius: 15px 15px 0 0;
          height: 50px;
          background: rgb(255, 255, 255, 0.5);
          font-weight: 600;
          color: $gray-500;
          @include screen(480) {
            height: 50px;
            text-align: center;
            font-size: 14px !important;
          }
        }
        &-bottom {
          color: $gray-500;
          background: $white;
          height: 150px;
          border-radius: 0 0 15px 15px;
          @include screen(480) {
            height: 100px;
            font-size: 14px !important;
            text-align: center;
            .text-base {
              font-size: 12px !important;
            }
            .text-yellow-500 {
              font-size: 20px;
              span {
                font-size: 14px;
              }
            }
          }
        }
      }
      &-sp-item1 {
        @include screen(991) {
          flex-direction: column;
        }
        @include screen(480) {
          width: 100%;
        }
      }
      &-sp2 {
        @include screen(480) {
          flex-direction: column;
        }
      }
      &-item1 {
        width: 47%;
        height: 150px;
        @include screen(991) {
          width: 100%;
          margin-bottom: 20px;
        }
        @include screen(480) {
          height: 150px;
        }
        &-top {
          border-radius: 15px 15px 0 0;
          height: 50px;
          background: rgb(255, 255, 255, 0.5);
          font-weight: 600;
          color: $gray-500;
          @include screen(480) {
            height: 50px;
            text-align: center;
            font-size: 14px !important;
          }
        }
        &-bottom {
          color: $gray-500;
          background: $white;
          height: 100px;
          border-radius: 0 0 15px 15px;
          @include screen(480) {
            height: 100px;
            font-size: 14px !important;
            text-align: center;
            .text-base {
              font-size: 12px !important;
            }
            .text-yellow-500 {
              font-size: 20px;
              span {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
  &-mid {
    padding: 80px 75px;
    @include screen(991) {
      padding: 50px 20px 0 20px;
    }
    &-header {
      @include screen(480) {
        flex-direction: column;
      }
      .select-chart {
        @include screen(991) {
          &:first-child {
            width: 50%;
          }
          &:last-child {
            width: 40%;
          }
        }
        @include screen(480) {
          width: 100% !important;
        }
      }
    }
    &-table {
      thead {
        background: white !important;
      }
    }
  }
}
.form-select-custom {
  background-image: url("@/assets/images/iconArrowDownOrange.png") !important;
  color: #7e7d7d;
  padding: 0 2.25rem 0 1.25rem;
  border: 1px solid $gray-800;
  height: 40px;
}
.complete-service {
  padding: 74px;
  @include screen(991) {
    padding: 60px;
  }
  @include screen(767){
    padding: 30px;
  }
  .d-none{
    display: none;
  }
  .d-md-flex{
    @include screen(768){
        display: flex;
    }
  }
  .d-md-none{
    @include screen(768){
      display: none;
    }
  }
  &-left {
    @include screen(991) {}
    @include screen(767) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .w-md-full{
      @include screen(767){
        width: 100%;
      }
    }
    .complete-service-text {
      font-size: 22px;
      font-weight: bold;
      color: $lightblack;
      margin-top: 80px;
      @include screen(991) {
        font-size: unset;
        margin-top: 25px;
      }
    }
    .complete-service-confirmation {
      background-color: $orange;
      width: 75%;
      border: 0px;
      border-radius: 0px;
      font-weight: bold;
      margin: 56px 35px;
      font-size: 18px;
      @include screen(480) {
        margin: 56px 0px;
        width: 100%;
      }
    }
  }
  &-right {
    @include screen(991) {
      text-align: center;
    }
  }
}
.sd-preloads {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: #fff;
  // opacity: 0.5;
  .dot-flashing {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #fd8857;
    color: #fd8857;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0.5s;
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      left: 15px;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #fd8857;
      color: #fd8857;
      animation: dotFlashing 1s infinite alternate;
      animation-delay: 1s;
    }
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      left: -15px;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #fd8857;
      color: #fd8857;
      animation: dotFlashing 1s infinite alternate;
      animation-delay: 0s;
    }
  }
}
</style>
