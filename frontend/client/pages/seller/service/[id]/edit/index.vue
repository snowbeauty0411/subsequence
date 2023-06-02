<template>
  <NuxtLayout name="seller">
    <PreLoad :preload="preload" />
    <div class="ed-service flex flex-col">
      <div class="ed-service-content">
        <div class="ed-service-content-link flex items-center flex-wrap">
          <div>
            <NuxtLink to="/seller/service/management">サービス管理</NuxtLink>
          </div>
          <div class="mx-2">
            <SDIcon icon="chevron-right" size="sm" />
          </div>
          <div>
            <NuxtLink
              :to="`/seller/service/service-manage/${detailService.hash_id}`"
              >{{ detailService.name }}</NuxtLink
            >
          </div>
          <div class="mx-2">
            <SDIcon icon="chevron-right" size="sm" />
          </div>
          <div>サービス編集</div>
        </div>
        <div class="ed-service-content-title flex items-center">
          <div class="title-main">サービス編集</div>
          <div class="title-description">Edit service</div>
        </div>
        <div class="ed-service-content-form">
          <div class="form-text">
            <div class="my-3 relative">
              <div class="form-label">サービス名</div>
              <b-form-input
                :disabled="serviceDetail.is_use == 1"
                v-model.trim="serviceDetail.name"
                placeholder="サービス名"
                class="custom-input"
              />
            </div>

            <div class="my-3 relative validate-form">
              <div class="form-label">キャッチコピー</div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="キャッチコピー"
                rows="6"
                v-model.trim="serviceDetail.caption"
                maxlength="50"
                :disabled="serviceDetail.is_use == 1"
              ></b-form-textarea>
              <div class="description-textarea text-end">
                残り{{ 50 - serviceDetail.caption.length }}文字
              </div>
            </div>

            <div class="my-3">
              <div class="form-label">カテゴリ名</div>
              <b-form-select
                v-model="serviceDetail.service_cat_id"
                :options="categoryList"
                size="sm"
                class="form-select-custom"
              ></b-form-select>
            </div>

            <div class="my-3 relative validate-form">
              <div class="form-label">ウェブサイトURL</div>
              <b-form-input
                v-model="serviceDetail.url"
                placeholder="https://subsq.jp/"
                class="custom-input"
              />
            </div>

            <div
              class="my-3 relative validate-form"
              v-if="serviceDetail.service_type_id == 4"
            >
              <div class="form-label">リンクを追加</div>
              <b-form-input
                v-model="serviceDetail.url_website"
                placeholder="https://subsq.jp/"
                class="custom-input"
              />
            </div>

            <div class="my-3">
              <div class="form-label">郵便番号</div>
              <input
                v-model="serviceDetail.zipcode"
                placeholder="000-0000"
                class="custom-input w-100"
                maxlength="7"
                id="zipcode"
                @blur="formartZipcode()"
                v-bind="formatNumber()"
                @keypress="onlyNumber($event)"
              />
            </div>

            <div class="my-3 relative validate-form">
              <div class="form-label">所在地</div>
              <b-form-input
                v-model="serviceDetail.address"
                placeholder="例）大阪府大阪市北区梅田○-○-○　○○ビル○○号室"
                class="custom-input"
              />
            </div>

            <div class="my-3">
              <div class="form-label">対象エリア</div>
              <div class="step3-form-data">
                <div class="step3-checkbox py-3 px-5">
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
                  v-bind:key="index"
                >
                  <div class="flex justify-between items-center py-3 px-5">
                    <b-form-checkbox
                      v-model="checkAreas"
                      :value="Number(item.value)"
                      :nchecked-value="null"
                      class="form-checkbox-custom"
                      v-on:change="checkAreaValue(item, Number(item.value))"
                      >{{ item.name }}
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
                    class="openSelect py-3 px-5 grid grid-cols-3 gap-3"
                    :class="
                      isActive.findIndex((item) => item === index) !== -1
                        ? 'block'
                        : 'hidden'
                    "
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

          <div class="form-image my-3">
            <div class="my-3">
              <div class="form-label">写真の編集</div>
              <div class="data-image flex w-full">
                <div class="data-image-left w-1/2 relative">
                  <b-overlay :show="loadingImg1">
                    <label for="img1" class="w-full">
                      <div class="data-image-left-item relative">
                        <img
                          src="@/assets/images/iconCamera.png"
                          alt=""
                          class="absolute img-icon"
                          v-if="!url1"
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
                      @change="onFileChangeImg1"
                      accept="image/png, .jpeg, .jpg"
                      v-if="!url1"
                      ref="fileUpload1"
                    />
                    <img
                      :src="imgTrash"
                      alt=""
                      class="absolute img-trash"
                      v-if="url1"
                      style="top: 5%; right: 5%"
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
                    class="data-image-right-list flex w-full justify-between"
                  >
                    <div class="w-1/2 relative">
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
                          @change="onFileChangeImg2"
                          accept="image/png, .jpeg, .jpg"
                          v-if="!url2"
                          ref="fileUpload2"
                        />
                        <img
                          :src="imgTrash"
                          alt=""
                          class="absolute img-trash"
                          v-if="url2"
                          style="top: 5%; right: 5%"
                          v-on:click="removeImage(url2, 1)"
                        />
                      </b-overlay>
                    </div>
                    <div class="w-1/2 relative">
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
                          @change="onFileChangeImg3"
                          v-if="!url3"
                          ref="fileUpload3"
                        />
                        <img
                          :src="imgTrash"
                          alt=""
                          class="absolute img-trash"
                          v-if="url3"
                          style="top: 5%; right: 5%"
                          v-on:click="removeImage(url3, 2)"
                        />
                      </b-overlay>
                    </div>
                  </div>
                  <div
                    class="data-image-right-list flex w-full justify-between"
                  >
                    <div class="w-1/2 relative">
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
                          @change="onFileChangeImg4"
                          v-if="!url4"
                          ref="fileUpload4"
                        />
                        <img
                          :src="imgTrash"
                          alt=""
                          class="absolute img-trash"
                          v-if="url4"
                          style="top: 5%; right: 5%"
                          v-on:click="removeImage(url4, 3)"
                        />
                      </b-overlay>
                    </div>

                    <div class="w-1/2 relative">
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
                          @change="onFileChangeImg5"
                          v-if="!url5"
                          ref="fileUpload5"
                        />
                        <img
                          :src="imgTrash"
                          alt=""
                          class="absolute img-trash"
                          v-if="url5"
                          style="top: 5%; right: 5%"
                          v-on:click="removeImage(url5, 4)"
                        />
                      </b-overlay>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-text">
            <div class="my-3">
              <div class="form-label">サービス内容の説明</div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="ここに説明文が入ります。"
                rows="6"
                maxlength="500"
                v-model="serviceDetail.service_content"
              ></b-form-textarea>
              <div class="description-textarea text-end">
                残り{{ 500 - serviceDetail.service_content.length }}文字
              </div>
            </div>
            <div class="my-3">
              <div class="form-label">公開範囲</div>
              <div
                class="form-label label-description flex flex-col"
                style="font-size: 12px"
              >
                <div>
                  公開範囲が非公開の場合、個別URLを知っているユーザーだけが、サービスを閲覧・契約することが出来ます。
                </div>
                <div
                  style="color: #e79c3a"
                  class="flex justify-end items-center"
                >
                  <BootstrapIcon
                    icon="info-circle-fill"
                    size="sm"
                    class="mx-1 exclamation-triangle-fill"
                    variant="warning"
                  />公開範囲とは？
                </div>
              </div>
              <div class="flex flex-col edit-checkbox-2">
                <div class="flex py-1">
                  <b-form-radio-group v-model="serviceDetail.privateValue">
                    <b-form-radio value="0" class="formRadio-edit"
                      >公開</b-form-radio
                    >
                    <b-form-radio value="1" class="formRadio-edit mx-3"
                      >非公開</b-form-radio
                    >
                  </b-form-radio-group>
                </div>
              </div>
            </div>
            <div class="my-3" v-if="serviceDetail.privateValue == 1">
              <div class="form-label">非公開URL</div>
              <b-form-input
                v-model="urlHost"
                placeholder="https://subsq.jp/"
                class="custom-input"
                disabled
              />
            </div>
            <div class="my-5 relative">
              <div class="form-label">タグ</div>
              <b-form-input
                v-model.trim="hashtag"
                placeholder="例）パスタ"
                class="custom-input"
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
                  <div v-on:click="selectTitle(item)" class="element-search">
                    {{ item }}
                  </div>
                </div>
              </div>
              <div
                :class="showModalSearch ? 'backdropEdit' : ''"
                v-on:click="hideInputSearch()"
              ></div>
              <div class="list-hashtag flex flex-wrap">
                <div
                  class="list-hashtag-item relative mb-2"
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
                    v-on:click="removeHashtag(tag, index)"
                  >
                    <BootstrapIcon icon="dash" size="sm" />
                  </div>
                </div>
                <div
                  class="list-hashtag-item relative mb-2"
                  v-for="(tag, index) in dataHashTagNew"
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
                    v-on:click="removeHashtagNew(tag, index)"
                  >
                    <BootstrapIcon icon="dash" size="sm" />
                  </div>
                </div>
              </div>
            </div>
            <div class="my-3">
              <div class="form-label">サービスの契約上限</div>
              <div class="flex flex-col edit-checkbox-2">
                <div class="flex py-1 isLitmit-input">
                  <b-form-radio-group v-model="isLimit">
                    <b-form-radio :value="true" class="formRadio-edit"
                      >上限なし</b-form-radio
                    >
                    <b-form-radio :value="false" class="formRadio-edit mx-3"
                      >上限あり</b-form-radio
                    >
                  </b-form-radio-group>
                  <div class="flex items-center mx-2" v-if="isLimit == false">
                    <div>契約数</div>
                    <input
                      type="number"
                      class="inputSpecial"
                      v-model="serviceDetail.max"
                    />
                    <div>件まで</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-text">
            <div class="my-3">
              <div class="form-label">サービスご利用までの流れ</div>
              <div
                class="step-form relative"
                v-for="(value, index) in dataStep"
                :key="index"
              >
                <div
                  class="absolute btn-remove-step"
                  v-if="index > 0 && serviceDetail.is_use !== 1"
                  v-on:click="removeStep(index)"
                >
                  <img src="@/assets/images/iconMinus.png" alt="" />
                </div>
                <div class="form-label mt-[20px]">STEP.0{{ index + 1 }}</div>
                <b-form-input
                  v-model="value.title"
                  placeholder="ここに説明文が入ります。"
                  class="custom-input"
                  v-if="index == 0"
                  :disabled="serviceDetail.is_use == 1"
                />
                <!-- <b-form-select
                  v-model="value.title"
                  :options="listTitle"
                  size="sm"
                  class="form-select-custom my-2"
                  v-else
                ></b-form-select> -->
                <div class="relative">
                  <b-form-input
                    v-model="value.title"
                    list="listStepName"
                    class="custom-input relative"
                    v-if="index > 0"
                    :disabled="serviceDetail.is_use == 1"
                  />
                  <div
                    class="absolute icon-delete-step9"
                    v-if="
                      (serviceDetail.is_use !== 1 &&
                        value.title == '商品を受け取る') ||
                      value.title == '予約する' ||
                      value.title == '来店する'
                    "
                    v-on:click="refreshTitle(index)"
                  >
                    <SDIcon icon="x" size="lg" />
                  </div>
                </div>

                <datalist id="listStepName">
                  <option
                    v-for="item in listTitle"
                    :key="item.value"
                    :value="item.text"
                    :data-value="item.value"
                  >
                    {{ item.text }}
                  </option>
                </datalist>

                <div class="form-label mt-4" v-if="index !== 0">説明文</div>
                <b-form-textarea
                  id="textarea-rows"
                  placeholder="ここに説明文が入ります。"
                  rows="6"
                  v-model="value.content"
                  v-bind:change="50 - value.content.length"
                  v-if="index !== 0 && value.content !== null"
                  maxlength="50"
                  :disabled="serviceDetail.is_use == 1"
                ></b-form-textarea>
                <div
                  class="description-textarea my-2 text-end"
                  v-if="index !== 0 && value.content !== null"
                >
                  残り{{ 50 - value.content.length }}文字
                </div>
              </div>
              <div
                v-if="dataStep.length < 5 && serviceDetail.is_use !== 1"
                class="btn-add-step flex items-center mt-3"
                v-on:click="addStep()"
              >
                <img src="@/assets/images/iconAdd.png" alt="" />
                <div class="btn-add-step-text mx-2">ステップを追加する</div>
              </div>
            </div>
          </div>
          <div class="ed-service-button flex">
            <b-button
              v-on:click="editService()"
              :disabled="isLoading"
              class="mr-[20px] btn-public"
              >保存する</b-button
            >
            <b-button
              v-on:click="showModalDeleteService = true"
              class="btn-delete"
              >サービスを削除</b-button
            >
          </div>
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
                  v-if="this.listCourseService.length > 1"
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
                  v-on:click="openPopup(item)"
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
                        {{ formatPrice(parseInt(item.price)) }}/
                        {{ item.cycle_format }}
                      </div>
                      <div
                        class="textNotComplete flex justify-end mr-5"
                        v-if="
                          item.name === null ||
                          item.content === null ||
                          item.price === 0 ||
                          item.course_images === null
                        "
                      >
                        ※ 未完成のため商品ページには表示されません。
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
                        {{ formatPrice(parseInt(item.course_price)) }}/{{
                          item.cycle
                        }}
                        {{ item.cycle_format }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="btn-add-step flex items-center mt-3"
                v-on:click="openPopup(0)"
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
    </div>
    <!-- Modal Confirm Delete Service -->
    <b-modal
      id="modal-confirm-delete-service"
      title="削除すると、元に戻せませんがよろしいですか？"
      v-model="showModalDeleteService"
      hide-footer
    >
      <div class="modal-confirm">
        <div class="flex justify-around">
          <button
            class="bg-red-500 text-[#fff]"
            v-on:click="deleteService()"
            :disabled="isLoading"
          >
            はい</button
          ><button
            class="bg-gray-400 text-[#fff]"
            v-on:click="showModalDeleteService = false"
          >
            いいえ
          </button>
        </div>
      </div>
    </b-modal>
    <!-- Modal Confirm Delete Service -->
    <b-modal
      id="modal-confirm-update-service"
      title="料金プランを編集／追加すると他のサービス内容の変更がリセットされます。 ここまでを保存してプラン編集へ進みますか？"
      v-model="showModalUpdateService"
      hide-footer
    >
      <div class="modal-confirm">
        <div class="flex justify-around">
          <button
            class="bg-red-500 text-[#fff] mr-2"
            v-on:click="editService()"
            :disabled="isLoading"
          >
            はい
          </button>
          <button
            class="bg-gray-400 text-[#fff]"
            v-on:click="showModalUpdateService = false"
          >
            キャンセル
          </button>
        </div>
      </div>
    </b-modal>
  </NuxtLayout>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { ServiceStore } from "@/store/service/index.ts";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";
import PreLoad from "../../../../../components/SDPreLoad";
import SDPagination from "@/components/SDPagination";
import imgTrash from "@/assets/images/iconTrash.png";
import imgPen from "@/assets/images/iconPen.png";
import { sellerStore } from "@/store/seller";
import { Message } from "@/utils/message";

export default {
  name: "EditService",
  components: {
    BootstrapIcon,
    PreLoad,
    SDPagination,
  },
  data() {
    return {
      showModalDeleteService: false,
      showModalUpdateService: false,
      preload: true,
      preloadList: false,
      isLoading: false,
      listTag: [],
      optionToast: {
        type: "error",
        position: "top-right",
        duration: 3000,
        keepOnHover: true,
        singleton: true,
        theme: "toasted-primary",
        iconPack: "material",
        fitToScreen: true,
      },
      selected: null,
      url1: null,
      url2: null,
      url3: null,
      url4: null,
      url5: null,
      idUrl1: null,
      idUrl2: null,
      idUrl3: null,
      idUrl4: null,
      idUrl5: null,
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      file0: null,
      dataHashTag: [],
      dataHashTagNew: [],
      index: null,
      dataStep: [],
      categoryList: [],
      listTagDelete: [],
      listCourseService: [],
      page: 1,
      totalPage: 1,
      currentPage: 1,
      isLimit: false,
      imgTrash,
      imgPen,
      id_private: null,
      hash_id_Private: null,
      hashtag: "",

      // Data Service
      serviceDetail: {
        id: null,
        name: "",
        service_content: "",
        url_private: "",
        caption: "",
        privateValue: "",
        service_cat_id: null,
        hash_id: "",
        address: "",
        zipcode: "",
        area: "",
        urlWebsite: "",
        max: "",
        service_type_id: "",
        is_reserves: "",
        is_draft: "",
        is_use: 0,
        url: "",
      },

      //Area
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
      listTitle: [
        { value: "自由入力", text: "自由入力" },
        { value: "商品を受け取る", text: "商品を受け取る" },
        { value: "予約する", text: "予約する" },
        { value: "来店する", text: "来店する" },
      ],
      service_images: [],
      listCourseNew: [],
      listImageEdit: [],
      messageNoti: Message.SELLER,
      service_reserve_setting: [],
      service_hours: [],
      service_delivery: [],
      dataStepDelete: [],
      dataCourseDelete: [],
      id_service_image_deletes: [],
      listImageService: [],
      dataImage: [],
      deliveryNull: [],
      options: [
        { text: "女性のみ利用可能", value: 0 },
        { text: "男性のみ利用可能", value: 1 },
      ],
      listCourseFull: [],
      host: "",
      urlHost: "",
      loadingImg1: false,
      loadingImg2: false,
      loadingImg3: false,
      loadingImg4: false,
      loadingImg5: false,
      listTagRecommend: [],
      showModalSearch: false,
      arrowCounter: -1,
      dataActive: "",
      messageShippingInfo: Message.DELIVERY,
      listImgUpdate: [],
      listImgNew: [],
      addFlag: null,
    };
  },
  setup() {
    const serviceStore = ServiceStore();
    const store = sellerStore();
    const toast = useToast();
    return {
      serviceStore,
      toast,
      store,
    };
  },
  computed: {
    ...mapState(ServiceStore, [
      "detailService",
      "listCategory",
      "success",
      "message",
      "error",
      "listCourse",
      "successDelete",
    ]),
    ...mapState(sellerStore, [
      "listArea",
      "imgCourseService",
      "listImgCourse",
      "imgCourseEdit",
      "dataAddress",
      "errorAddress",
      "message",
      "listHashTag",
    ]),
  },
  created() {
    let checkReload = localStorage.getItem("reloadPage");
    if (checkReload === "true") {
      localStorage.setItem("reloadPage", false);
    }

    let checkCRUDSuccess = localStorage.getItem("CRUDCourseSuccess");
    if (checkCRUDSuccess === "true") {
      localStorage.removeItem("CRUDCourseSuccess");
      this.$router.go();
    }

    this.serviceStore.getDetailServiceById(this.$route.params.id);
    this.host = window.location.origin;
    this.store.getListArea();
    this.serviceStore.getListCategory();
    const request = {
      hash_id: this.$route.params.id,
      per_page: 3,
      page: 1,
    };
    this.serviceStore.getListCourseByHashId(request);
    this.store.getListArea();
    const course = JSON.parse(localStorage.getItem("list-course"));
    if (course != null) {
      course.map((item) => {
        this.listCourseNew.push(item);
      });
    }

    if (this.store.listImgCourse.length > 0) {
      this.store.listImgCourse.forEach((item) => {
        item.forEach((value) => {
          this.listImgNew.push(value);
          const url = URL.createObjectURL(value);
          this.listImageEdit.push(url);
        });
      });
    }
  },
  watch: {
    listHashTag() {
      this.listTagRecommend = [];
      this.listTagRecommend = this.listHashTag.map((item) => item.name);
    },
    detailService() {
      this.preload = true;
      const {
        id,
        name,
        service_content,
        url_private,
        caption,
        service_cat_id,
        hash_id,
        address,
        zipcode,
        area,
        links,
        max,
        tags,
        steps,
        service_areas,
        service_type_id,
        is_reserves,
        service_reserve_setting,
        service_hours,
        service_delivery,
        is_draft,
        is_use,
        url_website,
      } = this.detailService;

      this.serviceDetail.id = id;
      this.serviceDetail.name = name;
      this.serviceDetail.service_content = service_content;
      this.serviceDetail.url_private = url_private;
      if (this.serviceDetail.url_private == null) {
        this.urlHost = this.host + "/service/detail/" + hash_id;
      } else {
        this.urlHost = this.host + "/" + this.serviceDetail.url_private;
      }
      this.serviceDetail.caption = caption;
      this.serviceDetail.service_cat_id = service_cat_id;
      this.serviceDetail.service_type_id = service_type_id;
      localStorage.setItem("typeServiceId", service_type_id);
      this.serviceDetail.hash_id = hash_id;
      this.serviceDetail.address = address;
      this.serviceDetail.url_website = url_website;
      this.serviceDetail.url = links ? links.url : null;
      this.serviceDetail.max = max;
      if (zipcode) {
        this.serviceDetail.zipcode = zipcode;
      }
      this.serviceDetail.area = area;
      this.serviceDetail.is_draft = is_draft;
      this.serviceDetail.is_reserves = is_reserves;
      this.serviceDetail.is_use = is_use;
      this.serviceDetail.privateValue = this.detailService.private.toString();
      tags.map((item) => {
        this.dataHashTag.push(item.name);
      });

      this.dataStep = steps;
      this.service_reserve_setting = service_reserve_setting;
      this.service_hours = service_hours;
      if (service_delivery == null) {
        this.service_delivery = service_delivery;
      } else {
        this.service_delivery.push(service_delivery);
      }
      if (this.detailService.images) {
        this.detailService.images.map((item, index) => {
          this.dataImage.push({ id: item.id, status: 0, file: item.path });
        });

        this.dataImage.map((item, index) => {
          this["url" + (index + 1)] = item.file;
          this["idUrl" + (index + 1)] = item.id;
        });
      }

      if (this.detailService.max === 0 || this.detailService.max === null) {
        this.isLimit = true;
        this.serviceDetail.max = 0;
      } else {
        this.isLimit = false;
        this.serviceDetail.max = this.detailService.max;
      }

      if (this.listArea.length > 0) {
        this.listSubAreas = this.listArea.map((item) => ({
          area_id: item.id,
          list: [],
        }));
      }

      this.listSubAreas.map((item) => {
        service_areas.map((item1) => {
          if (item.area_id === item1.area_id) {
            item.list.push(item1.pref_id);
          }
        });
      });
      service_areas.map((item) => {
        if (item.pref_id !== 1) {
          this.checkListPrefectures.push(item.pref_id);
        }
      });

      if (this.listArea.length > 0) {
        this.listArea.map((item) => {
          this.listSubAreas.map((item1) => {
            if (item1.list.length === item.prefectures.length) {
              const isExist1 = this.isFull.indexOf(item1.area_id);
              if (isExist1 === -1) {
                this.isFull.push(item1.area_id);
              }
              const isExist2 = this.checkAreas.indexOf(item1.area_id);
              if (isExist2 === -1) {
                this.checkAreas.push(item1.area_id);
              }
            }
          });
        });
      }

      if (this.checkAreas.length === 8) {
        this.checkAllFlag = true;
        this.checkNational = true;
      }
      this.preload = false;
    },

    listCourse() {
      this.preloadList = false;
      this.listCourseService = this.listCourse.data;
      this.totalPage = this.listCourse.last_page;
      this.currentPage = this.listCourse.current_page;

      const listCourseEdited = JSON.parse(localStorage.getItem("listCourse"));
      if (listCourseEdited === "null" || listCourseEdited === null) {
      } else {
        this.listCourseService = listCourseEdited;
      }

      if (this.store.imgCourseEdit.length > 0) {
        this.store.imgCourseEdit.map((item1) => {
          this.listCourseService.map((item) => {
            if (
              this.store.imgCourseEdit.length === this.listCourseService.length
            ) {
              item.course_images = URL.createObjectURL(item1.file);
            } else {
              if (item.course_id === item1.course_id) {
                item.course_images = URL.createObjectURL(item1.file);
              }
            }

            if (item.course_images === "") {
              item.course_images = URL.createObjectURL(item1.file);
            }
          });
        });
      }
    },

    listCategory() {
      this.categoryList = this.listCategory.map((item) => ({
        text: item.name,
        value: item.id,
      }));
    },

    success() {
      if (this.serviceStore.success === true) {
        if (this.addFlag === false) {
          this.showModalUpdateService = false;
          this.isLoading = false;
          this.toast.success(this.serviceStore.message, this.optionToast);
          this.serviceStore.success = false;
          this.serviceStore.message = "";
          const hash_id = this.$route.params.id;
          this.$router.push(`/seller/service/service-manage/${hash_id}`);
          this.clearData();
          this.editCourse(this.valueEdit);
        } else if (this.addFlag === true) {
          this.showModalUpdateService = false;
          this.toast.success(this.serviceStore.message, this.optionToast);
          this.serviceStore.success = false;
          this.serviceStore.message = "";
          this.addCourse();
        } else {
          this.isLoading = false;
          this.toast.success(this.serviceStore.message, this.optionToast);
          this.serviceStore.success = false;
          this.serviceStore.message = "";
          const hash_id = this.$route.params.id;
          this.$router.push(`/seller/service/service-manage/${hash_id}`);
        }
      }
    },

    successDelete() {
      if (this.serviceStore.successDelete === true) {
        this.toast.success(this.serviceStore.message, this.optionToast);
        this.serviceStore.successDelete = "";
        this.serviceStore.message = "";
        this.$router.push(`/seller/service/management`);
        this.clearData();
      }
    },

    error() {
      if (this.serviceStore.error === true) {
        this.isLoading = false;
        this.toast.error(this.serviceStore.message, this.optionToast);
        this.serviceStore.error = "";
        this.serviceStore.message = "";
      }
    },

    errorAddress() {
      if (this.store.errorAddress === true) {
        this.toast.error(this.store.message, this.optionToast);
        this.store.errorAddress = "";
        this.store.message = "";
      }
    },

    listArea() {
      if (this.listArea.length > 0) {
        this.listAreas = this.listArea.map((item) => ({
          name: item.name,
          value: item.id,
          prefectures: item.prefectures,
        }));
      }

      this.amountAreas = this.listAreas.length;
    },

    listImgCourse() {
      this.listImageEdit = this.store.listImgCourse;
    },

    dataAddress() {
      this.serviceDetail.address = this.dataAddress.address_2;
      this.serviceDetail.area = this.dataAddress.area;
    },

    "serviceDetail.privateValue"() {
      if (this.serviceDetail.privateValue == 1) {
        this.serviceDetail.url_private =
          "service/detail/" + this.serviceDetail.hash_id;
      }
    },
  },
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      localStorage.removeItem("idService");
      localStorage.removeItem("isEditService");
      localStorage.removeItem("isEditServiceOnly");
      localStorage.removeItem("detailCourse");
      localStorage.removeItem("listCourse");
      localStorage.removeItem("isEditCourseId");
    });
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
    },

    removeImage(value, indexValue) {
      this.dataImage.map((item, index) => {
        if (item.status === 0) {
          if (item.file === value) {
            item.file = "";
            item.status = 0;
            if (index == 0) {
              this.url1 = null;
              // this.dataImage.splice(0, 1);
              // this.$refs.fileUpload1.value = null;
            } else if (index == 1) {
              this.url2 = null;
              // this.dataImage.splice(1, 1);
              // this.$refs.fileUpload2.value = null;
            } else if (index == 2) {
              this.url3 = null;
              // this.dataImage.splice(2, 1);
              // this.$refs.fileUpload3.value = null;
            } else if (index == 3) {
              this.url4 = null;
              // this.dataImage.splice(3, 1);
              // this.$refs.fileUpload4.value = null;
            } else if (index == 4) {
              this.url5 = null;
              // this.dataImage.splice(4, 1);
              // this.$refs.fileUpload5.value = null;
            }
          }
        } else {
          if (indexValue == index) {
            item.file = "";
          }
          if (indexValue == 0) {
            this.url1 = null;
            this.dataImage.splice(0, 1);
            // this.$refs.fileUpload1.value = null;
          } else if (indexValue == 1) {
            this.url2 = null;
            this.dataImage.splice(1, 1);
            // this.$refs.fileUpload2.value = null;
          } else if (indexValue == 2) {
            this.url3 = null;
            this.dataImage.splice(2, 1);
            // this.$refs.fileUpload3.value = null;
          } else if (indexValue == 3) {
            this.url4 = null;
            this.dataImage.splice(3, 1);
            // this.$refs.fileUpload4.value = null;
          } else if (indexValue == 4) {
            this.url5 = null;
            this.dataImage.splice(4, 1);
            // this.$refs.fileUpload5.value = null;
          }
        }
      });
    },

    onChangeTextarea() {
      this.remaining = 50 - this.text.length;
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
            this.url1 = URL.createObjectURL(this.file);
            this.dataImage[0].file = this.file;
            this.dataImage[0].status = 1;
          }, 1000);
          this.store.setFiles(this.dataImage);
          localStorage.setItem("data-step-5-image", this.dataImage);
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
          this.file = e.target.files[0];
          this.url2 = URL.createObjectURL(this.file);
          if (this.dataImage.length == 0) {
            this.dataImage.push({
              index: 1,
              file: this.file,
              status: 1,
            });
          } else {
            if (
              this.dataImage.length > 2 &&
              this.dataImage[1].id !== undefined
            ) {
              this.dataImage.push({
                id: this.dataImage[1].id,
                status: 1,
                file: this.file,
              });
            } else {
              this.dataImage.push({
                index: 1,
                status: 1,
                file: this.file,
              });
            }
          }
        }, 1000);
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
          this.url3 = URL.createObjectURL(this.file2);
          if (this.dataImage.length > 3 && this.dataImage[2].id !== undefined) {
            this.dataImage.push({
              id: this.dataImage[2].id,
              status: 1,
              file: this.file2,
            });
          } else {
            this.dataImage.push({
              index: 2,
              status: 1,
              file: this.file2,
            });
          }
        }, 1000);
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
          this.url4 = URL.createObjectURL(this.file3);
          if (this.dataImage.length > 4 && this.dataImage[3].id !== undefined) {
            this.dataImage.push({
              id: this.dataImage[3].id,
              status: 1,
              file: this.file3,
            });
          } else {
            this.dataImage.push({
              index: 3,
              status: 1,
              file: this.file3,
            });
          }
        }, 1000);
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
          this.url5 = URL.createObjectURL(this.file4);
          if (this.dataImage.length > 4 && this.dataImage[4].id !== undefined) {
            this.dataImage.push({
              id: this.dataImage[4].id,
              status: 1,
              file: this.file4,
            });
          } else {
            this.dataImage.push({
              index: 4,
              status: 1,
              file: this.file4,
            });
          }
        }, 1000);
      }
    },

    addHashtag() {
      if (
        /^[\s\xA0\uFEFF\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]+|[\s\xA0\uFEFF\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]+$/g.test(
          this.hashtag
        )
      ) {
        this.toast.error(
          this.messageNoti.tag_has_white_space,
          this.optionToast
        );
        return false;
      }
      if (this.hashtag.trim() === "" || this.hashtag.trim() === null) {
        this.toast.error(this.messageNoti.hashtag_error, this.optionToast);
        this.hashtag = "";
      } else {
        this.dataHashTagNew.push(this.hashtag);
        this.hashtag = "";
      }
    },

    removeHashtag(item, index) {
      this.dataHashTag.splice(index, 1);
      this.listTagDelete.push(item);
    },

    removeHashtagNew(item, index) {
      this.dataHashTagNew.splice(index, 1);
    },

    updatePage(page) {
      const request = {
        hash_id: this.$route.params.id,
        per_page: 3,
        page: page,
      };
      this.preloadList = true;
      this.serviceStore.getListCourseByHashId(request);
    },

    async editService() {
      if (/^[０-９]/.test(this.serviceDetail.zipcode)) {
        this.toast.error(
          this.messageShippingInfo.zipcode_haflwidth,
          this.optionToast
        );
        return;
      }
      var checkImg = false;
      this.dataImage.forEach((item) => {
        if (item.file && (item.file != null || item.file != "")) {
          checkImg = true;
        }
      });
      if (!checkImg) {
        this.toast.error(this.messageNoti.image_minlength, this.optionToast);
      } else {
        let rememberLogin = localStorage.getItem("rememberLogin");
        if (rememberLogin === "true") {
          this.account_id = localStorage.getItem("account_id");
        } else {
          this.account_id = Cookies.get("account_id");
        }
        // this.isLoading = true;
        const dataForm = new FormData();
        dataForm.append("service_id", this.serviceDetail.id);
        dataForm.append("hash_id", this.serviceDetail.hash_id);
        dataForm.append("seller_id", this.account_id);
        dataForm.append("service_cat_id", this.serviceDetail.service_cat_id);
        dataForm.append("service_type_id", this.serviceDetail.service_type_id);
        dataForm.append("name", this.serviceDetail.name);
        dataForm.append("address", this.serviceDetail.address);
        dataForm.append("zipcode", this.serviceDetail.zipcode);
        dataForm.append("area", this.serviceDetail.area);
        dataForm.append("caption", this.serviceDetail.caption);
        dataForm.append("service_content", this.serviceDetail.service_content);
        dataForm.append("private", this.serviceDetail.privateValue);
        dataForm.append("is_reserves", this.detailService.is_reserves);
        dataForm.append("is_draft", this.detailService.is_draft);
        if (this.isLimit) {
          this.serviceDetail.max = null;
          dataForm.append("max", 0);
        } else {
          dataForm.append("max", this.serviceDetail.max);
        }
        dataForm.append("url", this.serviceDetail.url);
        dataForm.append("url_website", this.serviceDetail.url_website);
        this.url_private = null;
        if (this.serviceDetail.privateValue == 0) {
          dataForm.append("url_private", null);
        } else {
          dataForm.append("url_private", this.serviceDetail.url_private);
        }
        this.dataHashTagNew.forEach((item) => {
          dataForm.append("tags[]", item);
        });
        if (this.listTagDelete.length > 0) {
          this.listTagDelete.forEach((item) => {
            dataForm.append("tag_deletes[]", item);
          });
        }

        if (this.service_reserve_setting === null) {
        } else {
          if (
            this.service_reserve_setting.max != null &&
            this.service_reserve_setting.max != undefined
          ) {
            dataForm.append(
              "service_reserve_setting" + "[max]",
              this.service_reserve_setting.max
            );
          }
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
        }

        if (this.service_hours[0] === null) {
          // dataForm.append("service_hours", null);
        } else {
          this.service_hours.forEach((item, index) => {
            dataForm.append(
              "service_hours[" + index + "]" + "[day_of_week]",
              item.day_of_week
            );
            JSON.parse(item.work_hour).map((item1, index1) => {
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

        if (this.service_delivery === null) {
          // dataForm.append("service_delivery", null);
        } else {
          this.service_delivery.forEach((item) => {
            dataForm.append("service_delivery" + "[interval]", item.interval);
            dataForm.append(
              "service_delivery" + "[month_delivery]",
              item.month_delivery
            );
            dataForm.append("service_delivery" + "[skip]", item.skip);
            dataForm.append("service_delivery" + "[with_skip]", item.with_skip);
          });
        }

        this.dataStep.forEach((item, index) => {
          if (item.id) {
            dataForm.append("service_steps[" + index + "]" + "[id]", item.id);
          }
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
        });

        this.dataStepDelete.forEach((item) => {
          dataForm.append("id_step_deletes[]", item);
        });
        this.listSubAreas.forEach((item, index) => {
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
        this.listCourseService.forEach((item, index) => {
          if (item.course_id !== undefined) {
            dataForm.append(
              "service_courses[" + index + "]" + "[course_id]",
              item.course_id
            );
          }

          dataForm.append(
            "service_courses[" + index + "]" + "[name]",
            item.name
          );
          dataForm.append(
            "service_courses[" + index + "]" + "[price]",
            Number(item.price)
          );

          if (item.cycle !== null) {
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
            item.firstPr
          );
          dataForm.append(
            "service_courses[" + index + "]" + "[gender_restrictions]",
            item.gender_restrictions === 0
              ? 0
              : item.gender_restrictions === 1
              ? 1
              : 2
          );
          dataForm.append(
            "service_courses[" + index + "]" + "[age_confirm]",
            item.age_confirm === null ? 0 : Number(item.age_confirm)
          );
        });

        if (this.listCourseNew.length > 0) {
          const lengthListCourse = this.listCourseService.length;
          this.listCourseNew.forEach((item, index) => {
            dataForm.append(
              "service_courses[" + (index + lengthListCourse) + "]" + "[name]",
              item.course_name
            );
            dataForm.append(
              "service_courses[" + (index + lengthListCourse) + "]" + "[price]",
              Number(item.course_price)
            );

            if (item.course_cycle !== null) {
              dataForm.append(
                "service_courses[" +
                  (index + lengthListCourse) +
                  "]" +
                  "[cycle]",
                item.course_cycle
              );
            }

            dataForm.append(
              "service_courses[" +
                (index + lengthListCourse) +
                "]" +
                "[content]",
              item.course_content
            );
            dataForm.append(
              "service_courses[" +
                (index + lengthListCourse) +
                "]" +
                "[firstPr]",
              item.course_firstPr
            );
            dataForm.append(
              "service_courses[" +
                (index + lengthListCourse) +
                "]" +
                "[gender_restrictions]",
              item.gender_restrictions
            );
            dataForm.append(
              "service_courses[" +
                (index + lengthListCourse) +
                "]" +
                "[age_confirm]",
              item.course_age_confirm === "null"
                ? 0
                : Number(item.course_age_confirm)
            );
          });
        }

        // ListImageCourse
        if (this.store.listImgCourse.length > 0) {
          const lengthListCourse = this.listCourseService.length;
          this.listImgNew.forEach((item, index) => {
            dataForm.append(
              "service_courses[" + (index + lengthListCourse) + "]" + "[image]",
              item
            );
          });
        }

        if (this.store.imgCourseEdit.length > 0) {
          this.listCourseService.map((item, index) => {
            this.store.imgCourseEdit.map((item1) => {
              if (item.course_id === item1[index].course_id) {
                dataForm.append(
                  "service_courses[" + index + "]" + "[image]",
                  item1[index].file
                );
              }
            });
          });
        }

        if (this.dataCourseDelete.length > 0) {
          this.dataCourseDelete.map((item) => {
            dataForm.append("id_service_courses_deletes[]", item);
          });
        }
        this.dataImage.map((item, index) => {
          if (item.status === 0) {
            dataForm.append("service_images[" + index + "]" + "[id]", item.id);
            dataForm.append(
              "service_images[" + index + "]" + "[status]",
              item.file === "" ? 0 : 1
            );
            dataForm.append(
              "service_images[" + index + "]" + "[file]",
              item.file === "" ? "" : item.file
            );
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

              if (item.file != null || item.file !== "") {
                dataForm.append(
                  "service_images[" + index + "]" + "[file]",
                  item.file
                );
              } else {
                dataForm.append("service_images[" + index + "]" + "[file]", "");
              }
            } else {
              dataForm.append(
                "service_images[" + index + "]" + "[file]",
                item.file
              );
              dataForm.append("service_images[" + index + "]" + "[status]", 1);
            }
          }
        });

        if (
          this.serviceDetail.zipcode &&
          this.serviceDetail.zipcode.length < 8
        ) {
          this.toast.error(
            this.messageNoti.zipcode_step11_minLength,
            this.optionToast
          );
        } else {
          await this.serviceStore.editServiceById(
            dataForm,
            this.serviceDetail.id
          );
        }
      }
    },

    confirmUpdateService() {},

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

        const valueFull = this.isFull.findIndex((element) => element === index);
        const indexArea = this.listSubAreas.findIndex(
          (item) => item.area_id === index
        );

        if (valueFull !== -1) {
          this.isFull.splice(valueFull, 1);
        } else {
          this.isFull.push(index);
        }

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

      if (this.checkAreas.length < this.amountAreas) {
        this.checkNational = false;
      } else {
        this.checkNational = true;
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

    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
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

    addStep() {
      this.dataStep.push({
        title: "",
        content: "",
      });
    },

    removeStep(event) {
      this.dataStep.map((item, index) => {
        if (index == event && item.id !== undefined) {
          this.dataStepDelete.push(item.id);
        }
      });
      this.dataStep.splice(event, 1);
    },

    removeCourse(event, isUse) {
      if (isUse == 1) {
        this.toast.error("契約者が存在するコースは削除できません");
        return;
      }
      this.listCourseService.map((item, index) => {
        if (item.course_id == event) {
          this.dataCourseDelete.push(event);
          this.listCourseService.splice(index, 1);
        }
      });
    },

    removeCourseNew(value) {
      this.listCourseNew.splice(value, 1);
      this.listImageEdit.map((item, index) => {
        if (value === index) {
          this.listImageEdit.splice(index, 1);
        }
      });
    },

    openPopup(value) {
      this.showModalUpdateService = true;
      this.valueEdit = value;
      if (value === 0) {
        this.addFlag = true;
      } else {
        this.addFlag = false;
      }
    },

    addCourse() {
      localStorage.removeItem("detailCourse");
      localStorage.removeItem("listCourseNew");
      this.store.imgCourseService = [];
      localStorage.setItem("idService", this.serviceDetail.hash_id);
      localStorage.setItem("service_id", this.serviceDetail.id);
      localStorage.setItem("isEditService", true);
      localStorage.setItem("serviceType", this.detailService.service_type_id);
      localStorage.setItem(
        "listCourse",
        JSON.stringify(this.listCourseService)
      );
      this.showModalUpdateService = false;
      this.$router.push("/seller/service/service-course/update?step=1");
    },

    editCourse(value) {
      this.showModalUpdateService = true;
      localStorage.setItem("idService", this.serviceDetail.hash_id);
      localStorage.setItem("service_id", this.serviceDetail.id);
      localStorage.setItem("isEditService", true);
      value.isUpdate = true;
      localStorage.setItem("detailCourse", JSON.stringify(value));
      localStorage.setItem(
        "listCourse",
        JSON.stringify(this.listCourseService)
      );
      this.showModalUpdateService = false;
      this.$router.push("/seller/service/service-course/update?step=1");
    },

    async deleteService() {
      const idService = this.serviceDetail.id;
      await this.serviceStore.deleteServiceById(idService);
      this.showModalDeleteService = false;
    },

    formatNumber() {
      var text = this.serviceDetail.zipcode;
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
      this.serviceDetail.zipcode = text;
    },

    formartZipcode() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.serviceDetail.zipcode;
      if (text) {
        text = text.toString().replace(/[^0-9Z０-９]/g, "");
        text = text.replaceAll(",", "");
        if (text.length > 3) {
          text = text.splice(3, 0, "-");
        }
      }
      if (text.length <= 8) {
        this.serviceDetail.zipcode = text;
      }
      var zipcode = text;
      if (zipcode) {
        zipcode = zipcode.replaceAll("-", "");
      }
      if (zipcode !== "") {
        this.serviceDetail.address = "";
        this.serviceDetail.area = "";
        if (zipcode.length === 7) {
          this.store.getAddress(zipcode);
        }
      }
    },

    selectTitle(value) {
      this.hashtag = value;
      this.showModalSearch = false;
    },

    showInputSearch() {
      this.showModalSearch = true;
    },

    hideInputSearch() {
      this.showModalSearch = false;
    },

    onArrowDown() {
      if (this.arrowCounter < this.listTagRecommend.length - 1) {
        this.arrowCounter = this.arrowCounter + 1;
        this.fixScrolling();
        this.hashtag = this.listTagRecommend[this.arrowCounter];
        this.dataActive = this.listTagRecommend[this.arrowCounter];
        this.hashtag = this.hashtag;
      }
    },

    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
        this.fixScrolling();
        this.hashtag = this.listTagRecommend[this.arrowCounter];
        this.dataActive = this.listTagRecommend[this.arrowCounter];
        this.hashtag = this.hashtag;
      }
    },

    fixScrolling() {
      const liH = this.$refs.options[this.arrowCounter].clientHeight;
      this.$refs.scrollContainer.scrollTop = liH * this.arrowCounter;
    },

    getHashtag(event) {
      if (this.hashtag != "" || event) {
        this.showModalSearch = true;
        this.store.getHashTagList(event);
      } else {
        this.listTagRecommend = [];
      }
    },
    clearData() {
      localStorage.removeItem("data-step-1");
      localStorage.removeItem("id-step-2");
      localStorage.removeItem("data-step-area_id-3");
      localStorage.removeItem("data-step-4");
      localStorage.removeItem("data-step-5-catchCopy");
      localStorage.removeItem("data-step-6");
      localStorage.removeItem("data-step-7");
      localStorage.removeItem("isPrivate-step-8");
      localStorage.removeItem("data-step-10-max");
      localStorage.removeItem("list-course");
      localStorage.removeItem("data-step-9");
      localStorage.removeItem("skip");
      localStorage.removeItem("with_skip");
      localStorage.removeItem("interval");
      localStorage.removeItem("month_delivery");
      localStorage.removeItem("url-step-8");
      localStorage.removeItem("id-step-8");
      localStorage.removeItem("hash_id-step-8");
      localStorage.removeItem("service_reserve_setting");
      localStorage.removeItem("service_hours");
      localStorage.removeItem("is_reserves");
      localStorage.removeItem("urlType4");
      localStorage.removeItem("data-step-11-websiteUrl");
      localStorage.removeItem("data-step-11-address");
      localStorage.removeItem("zipCode");
      localStorage.removeItem("listAreaStep11");
    },

    refreshTitle(value) {
      this.dataStep.map((item, index) => {
        if (index === value) {
          item.title = "";
        }
      });
    },
  },
};
</script>

<style lang="scss">
.ed-service {
  &-content {
    padding: 30px 100px;
    @include screen(991) {
      padding: 20px 50px;
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
    &-link {
      font-size: 14px;
      font-weight: 600;
      color: $gray-800;
      margin-bottom: 50px;
      margin-top: 30px;
      a {
        &:hover {
          color: $orange;
        }
      }
    }
    &-form {
      .form-label {
        color: #7e7d7d;
        font-weight: 600;
        font-size: 16px;
      }
      margin: 50px 0;
      .form-text {
        width: 60%;
        @include screen(991) {
          width: 100%;
        }
        .form-select-custom {
          background-image: url("@/assets/images/iconArrowDownOrange.png") !important;
          color: #7e7d7d;
          padding: 0.375rem 2.25rem 0.375rem 1.25rem;
          border: 1px solid $gray-800;
          height: 50px;
        }
        .edit-form-data {
          background: $white;
          .edit-checkbox {
            border: 1px solid $gray-800;
            padding: 10px 40px;
            .form-check {
              input {
                &:checked {
                  background-color: $orange !important;
                  border-color: $orange !important;
                }
              }
              label {
                font-weight: 500;
              }
            }
            .form-select-custom {
              border: unset !important;
              height: unset;
              padding: unset !important;
              color: $orange;
            }
            &:first-child {
              border-radius: 8px 8px 0 0;
            }
            &:nth-child(2) {
              border-top: unset;
            }
            &:nth-child(3) {
              border-top: unset;
            }
            &:nth-child(4) {
              border-top: unset;
            }
            &:last-child {
              border-top: unset;
            }
            &:nth-child(5) {
              border-top: unset;
            }
            &:nth-child(6) {
              border-top: unset;
            }
            &:nth-child(7) {
              border-top: unset;
            }
          }
        }
        .edit-checkbox-2 {
          border: 1px solid $gray-800;
          padding: 7px 20px;
          border-radius: 8px;
          background: white;
          .form-check {
            input {
              &:checked {
                background-color: $orange !important;
                border-color: $orange !important;
              }
            }
            label {
              font-weight: 500;
            }
          }
        }
        .inputSpecial {
          border-bottom: 1px solid $orange;
          width: 80px;
          outline: none;
          padding: 0 20px;
          margin: 0 5px;
          color: $orange;
        }
        .list-hashtag {
          margin: 20px 0;
          &-item {
            padding: 3px 20px;
            background: $orange;
            border-radius: 20px;
            color: #fff;
            margin-right: 20px;
            &-remove {
              top: -5px;
              right: -5px;
              background: #cccbcb;
              height: 16px;
              width: 16px;
              border-radius: 50%;
              cursor: pointer;
            }
          }
        }
        .step-form {
          .btn-remove-step {
            top: 0;
            left: -40px;
            cursor: pointer;
            img {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
      .form-image {
        .data-image {
          &-left {
            margin-right: 10px;
            .img-trash {
              cursor: pointer;
              @include screen(480) {
                width: 30px !important;
              }
            }
            &-item {
              background: #cccccc;
              padding-top: 100%;
              cursor: pointer;
              width: 100%;
              img {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60px;
                height: auto;
              }
              .img-main {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
          &-right {
            &-list {
              .img-trash {
                @include screen(480) {
                  width: 30px !important;
                }
              }
              &-item {
                width: 96%;
                background: #cccccc;
                padding-top: 98%;
                cursor: pointer;
                img {
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 40px;
                  height: auto;
                }
                .img-main {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
                .img-trash {
                  top: 5% !important;
                  right: 5% !important;
                  transform: translate(-5%, -5%) !important;
                  left: unset;
                  cursor: pointer;
                  @include screen(480) {
                    width: 30px !important;
                  }
                }
                .img-icon {
                  @include screen(480) {
                    width: 25px;
                  }
                }
              }
            }
          }
        }
      }
      .formRadio-edit {
        border-radius: 0.25em !important;
        background-image: unset !important;
      }
      .step3-form-data {
        background: $white;
        @include screen(480) {
          padding: 0 20px;
        }

        .step3-checkbox {
          &:first-child {
            @include screen(480) {
              padding: 10px !important;
            }
          }
          @include screen(480) {
            div {
              padding: 10px !important;
            }
            .openSelect {
              @include screen(480) {
                padding: unset !important;
              }
            }
          }
          .form-check {
            @include screen(480) {
              display: flex;
              flex-wrap: wrap;
            }
            input {
              &:checked {
                background-color: $orange !important;
                border-color: $orange !important;
              }
            }

            label {
              font-weight: 500;
              @include screen(480) {
                margin-left: 5px;
              }
            }
          }

          .form-select-customs {
            color: $orange;
          }

          .closeS {
            transform: rotate(180deg);
          }

          .openSelect {
            @include screen(480) {
              display: flex;
              flex-wrap: wrap;
            }
          }

          &:first-child {
            border-radius: 8px 8px 0 0;
          }

          &:nth-child(2) {
            border-top: unset;
          }

          &:nth-child(3) {
            border-top: unset;
          }

          &:nth-child(4) {
            border-top: unset;
          }

          &:last-child {
            border-top: unset;
          }

          &:nth-child(5) {
            border-top: unset;
          }

          &:nth-child(6) {
            border-top: unset;
          }

          &:nth-child(7) {
            border-top: unset;
          }
        }
      }
      .form-cource {
        width: 70%;
        @include screen(991) {
          width: 100%;
        }
        .imgPen {
          top: 10px;
          right: 10px;
          width: 50px;
          height: 50px;
          object-fit: cover;
          cursor: pointer;
        }
      }
      .ed-service-button {
        @include screen(480) {
          flex-direction: column;
          button {
            margin-bottom: 10px;
          }
        }
        button {
          width: 100%;
          background: $orange;
          color: $white;
          font-size: 18px;
          padding: 10px 0;
          border: none;
        }
        .btn-delete {
          background: #fe958b;
        }
      }
      .isLitmit-input {
        @include screen(991) {
          flex-direction: column;
        }
      }
      .item-content {
        box-shadow: 2px 2px 2px #4d4d4d33;
        border-radius: 15px;
        opacity: 1;
        padding: 20px;
        background: $white;
        height: 100%;
        @include screen(480) {
          flex-direction: column;
        }
        &-left {
          width: 30%;
          height: 0;
          padding-bottom: 30%;
          object-fit: cover;
          background: $white;
          background-size: cover;
          background-position: center;
          @include screen(480) {
            width: 100%;
            padding-bottom: 100%;
          }
        }
        &-right {
          width: 70%;
          @include screen(480) {
            width: 100%;
          }
          .courseName {
            color: $gray-800;
            font-weight: 600;
            font-size: 18px;
          }
          .courseDescription {
            color: $gray-800;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .textPrice {
            font-size: 14px;
            color: $orange;
            font-weight: 600;
          }
          .textNotComplete {
            font-size: 15px;
            color: $orange;
            font-weight: 400;
          }
          .coursePrice {
            font-size: 25px;
            color: $orange;
            font-weight: 600;
          }
        }
      }
      .btn-add-step {
        cursor: pointer;

        img {
          width: 30px;
          height: 30px;
        }

        &-text {
          font-size: 16px;
          color: #7e7d7d;
          font-weight: 600;
        }
      }
      .icon-delete-step9 {
        cursor: pointer;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}

.backdropEdit {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
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
</style>
