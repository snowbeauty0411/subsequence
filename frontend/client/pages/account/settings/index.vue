<template>
  <NuxtLayout :name="user_type === 'BUYER' ? 'buyer' : 'seller'">
    <div class="page-settings flex flex-col">
      <SDPreLoad :preload="preload" />
      <div class="page-settings-content">
        <div class="page-settings-content-title flex items-end d-sm-none">
          <div class="title-main">設定</div>
          <div class="title-description">Settings</div>
        </div>
        <div class="page-settings-content-main w-full">
          <!-- Account User Common -->
          <div class="account-info flex flex-col">
            <div class="account-info-header">アカウント情報（共通）</div>
            <div class="account-info-list flex flex-col">
              <div class="account-info-list-item w-full flex">
                <div class="title-row">ユーザーID</div>
                <div class="content-row">
                  {{ dataAccount.account_id }}
                </div>
                <div class="edit-row"></div>
              </div>
              <div class="account-info-list-item w-full flex">
                <div class="title-row">生年月日</div>
                <div class="content-row">
                  <div class="input-birthday relative validate-form">
                    <Datepicker
                      v-model="v$.dataAccount.birthday.$model"
                      :disabled="isEdit.birthday"
                      locale="ja"
                      :maxDate="new Date()"
                      format="yyyy/MM/dd"
                      autoApply
                      closeOnScroll
                      class="input-edit-settings"
                      @blur="checkUpdateBirthday(v$.dataAccount.birthday.$model)"
                    >
                      <template #action-preview="{ value }">
                        {{ getDate(value) }}
                      </template>
                    </Datepicker>
                    <div v-if="v$.dataAccount.birthday.$error" class="error-text">
                      <p v-if="v$.dataAccount.birthday.required.$invalid">
                        {{ messageNotiAccount.birthday_required }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="edit-row">
                  <button v-on:click="editBirthday()">
                    {{ isEdit.birthday ? "変更する" : "完了" }}
                  </button>
                </div>
              </div>
              <div class="account-info-list-item w-full flex">
                <div class="title-row">電話番号</div>
                <div class="content-row validate-form relative w-[30%] mt-2">
                  <input
                    v-model="v$.dataAccount.phone.$model"
                    :disabled="isEdit.phone"
                    class="input-edit-settings mr-3 w-[100%]"
                    placeholder="00000000000"
                    v-bind="formatNumberPhone()"
                    v-on:keyup="formatPhoneNumberForBuyer()"
                    v-on:input="checkHasUpdatePhone(v$.dataAccount.phone.$model)"
                  />
                  <div v-if="v$.dataAccount.phone.$error" class="error-text">
                    <p v-if="v$.dataAccount.phone.maxLength.$invalid">
                      {{ messageNotiAccount.phone_has_11_numbers }}
                    </p>
                    <p v-if="v$.dataAccount.phone.minLength.$invalid">
                      {{ messageNotiAccount.phone_has_11_numbers }}
                    </p>
                  </div>
                </div>
                <div class="edit-row">
                  <button v-on:click="editPhone()">
                    {{ isEdit.phone ? "変更する" : "完了" }}
                  </button>
                </div>
              </div>
              <div class="account-info-list-item w-full flex">
                <div class="title-row">メールアドレス</div>
                <div class="content-row flex">
                  <div class="validate-form relative w-[90%]">
                    <input
                      type="text"
                      v-model.trim="v$.dataAccount.email.$model"
                      :disabled="isEdit.email"
                      v-bind:class="{
                        'is-invalid': v$.dataAccount.email.$error,
                      }"
                      class="input-edit-settings mr-3 w-[100%]"
                      v-on:input="checkHasUpdateEmail(v$.dataAccount.email.$model)"
                    />
                    <div v-if="v$.dataAccount.email.$error" class="error-text">
                      <p v-if="v$.dataAccount.email.required.$invalid">
                        {{ messageNotiAccount.email_required }}
                      </p>
                      <p v-if="v$.dataAccount.email.email.$invalid">
                        {{ messageNotiAccount.email }}
                      </p>
                      <p v-if="v$.dataAccount.email.maxLength.$invalid">
                        {{ messageNotiAccount.email_maxLength }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="edit-row">
                  <button v-on:click="editEmail()">
                    {{ isEdit.email ? "変更する" : "完了" }}
                  </button>
                </div>
              </div>
              <div class="account-info-list-item w-full flex">
                <div class="title-row">パスワード</div>
                <div class="content-row">
                  <div class="validate-form relative w-[90%]">
                    <input
                      :type="showPassword ? 'password' : 'text'"
                      v-model.trim="v$.old_password.$model"
                      :disabled="isEdit.password"
                      v-bind:class="{ 'is-invalid': v$.old_password.$error }"
                      class="input-edit-settings mr-3 w-[100%] py-[5px]"
                      placeholder="現在のパスワードを入力"
                      v-on:input="checkHasUpdatePass()"
                    />
                    <div
                      class="absolute cursor-pointer"
                      style="right: 0; top: 50%; transform: translateY(-50%)"
                      v-on:click="toggleShow()"
                      v-if="!isEdit.password"
                    >
                      <img src="@/assets/images/eye.png" v-if="showPassword" />
                      <img src="@/assets/images/eye-slash.png" v-if="!showPassword" />
                    </div>
                    <div v-if="v$.old_password.$error" class="error-text">
                      <p v-if="v$.old_password.minLength.$invalid">
                        {{ messageNotiAccount.pass_maxLength }}
                      </p>
                      <p v-if="v$.old_password.maxLength.$invalid">
                        {{ messageNotiAccount.pass_maxLength }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="edit-row">
                  <button v-on:click="editPassword()">
                    {{ isEdit.password ? "変更する" : "完了" }}
                  </button>
                </div>
              </div>
              <div class="account-info-list-item w-full flex">
                <div class="title-row">新しいパスワード</div>
                <div class="content-row">
                  <div class="validate-form relative w-[90%]">
                    <input
                      :type="showPassword ? 'password' : 'text'"
                      v-model.trim="v$.new_password.$model"
                      :disabled="isEdit.password"
                      v-bind:class="{ 'is-invalid': v$.new_password.$error }"
                      class="input-edit-settings mr-3 w-[100%] py-[5px]"
                      placeholder="新しいパスワードを入力"
                      v-on:input="checkHasUpdateNewPass()"
                    />
                    <div
                      class="absolute cursor-pointer"
                      style="right: 0; top: 50%; transform: translateY(-50%)"
                      v-on:click="toggleShow()"
                      v-if="!isEdit.password"
                    >
                      <img src="@/assets/images/eye.png" v-if="showPassword" />
                      <img src="@/assets/images/eye-slash.png" v-if="!showPassword" />
                    </div>
                    <div v-if="v$.new_password.$error" class="error-text">
                      <p v-if="v$.new_password.minLength.$invalid">
                        {{ messageNotiAccount.pass_maxLength }}
                      </p>
                      <p v-if="v$.new_password.maxLength.$invalid">
                        {{ messageNotiAccount.pass_maxLength }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="edit-row"></div>
              </div>
            </div>
          </div>

          <!-- Account User Buyer -->
          <div class="account-info flex flex-col">
            <div v-if="preloadList" class="sd-preloads flex justify-center items-center">
              <div class="snippet" data-title=".dot-flashing">
                <div class="stage">
                  <div class="dot-flashing"></div>
                </div>
              </div>
            </div>
            <div class="account-info-header">アカウント情報（購入者向け）</div>
            <div class="account-info-list flex flex-col">
              <div class="account-info-list-item w-full flex">
                <div class="title-row">クレジットカード</div>
                <div class="content-row flex" v-if="Object.keys(cardDefault).length > 0">
                  <div class="img-stripe mr-2">
                    <img :src="visa" alt="" />
                  </div>
                  <div class="info-stripe">
                    <div class="card-stripe flex" v-if="cardDefault.last4">
                      <div>末尾:　</div>
                      <div>
                        {{ cardDefault.last4 }}
                      </div>
                    </div>
                    <div
                      class="date-stripe flex"
                      v-if="cardDefault.exp_month && cardDefault.exp_year"
                    >
                      <div>有効期限:　</div>
                      <div>{{ cardDefault.exp_month }}/{{ cardDefault.exp_year }}</div>
                    </div>
                    <div class="name-stripe flex" v-if="cardDefault.name">
                      <div>お名前:　</div>
                      <div>{{ cardDefault.name }}</div>
                    </div>
                  </div>
                </div>
                <div class="content-row flex items-center" v-else>-</div>
                <div class="edit-row">
                  <button v-on:click="showListCard()">登録する</button>
                </div>
              </div>
              <div class="account-info-list-item w-full flex">
                <div class="title-row">送付先住所</div>
                <div
                  class="content-row"
                  v-if="Object.keys(shippingInfoDefault).length > 0"
                >
                  〒{{ shippingInfoDefault.post_code }}
                  {{ shippingInfoDefault.address }}
                </div>
                <div class="content-row" v-else>-</div>
                <div class="edit-row">
                  <button v-on:click="showListShippingInfo()">登録する</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Account User Seller -->
          <div class="account-info flex flex-col">
            <div class="account-info-header">アカウント情報（出品者向け）</div>
            <div class="account-info-list flex flex-col">
              <div class="account-info-list-item w-full flex">
                <div class="title-row">振込口座</div>
                <div class="content-row" v-if="sellerCard === null">-</div>
                <div class="content-row" v-else>
                  <div>銀行名: {{ sellerCard.bank_name }}</div>
                  <div>支店コード: {{ sellerCard.branch_code }}</div>
                  <div>
                    口座名義:
                    {{
                      sellerCard.last_name_account + " " + sellerCard.first_name_account
                    }}
                  </div>
                  <div>口座番号: {{ sellerCard.account_number }}</div>
                </div>
                <div class="edit-row">
                  <button v-on:click="editPaymentSeller()">登録する</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Identity -->
          <div class="account-info flex flex-col">
            <div class="account-info-header">認証申請</div>
            <div class="account-info-list flex flex-col">
              <div class="account-info-list-item w-full flex">
                <div class="title-row">本人確認</div>
                <div class="content-row text-identiy">
                  <div
                    class="cursor-pointer"
                    v-if="
                      dataAccount.identity_verification_status === 1 ||
                      dataAccount.identity_verification_status === 3
                    "
                    v-on:click="identity"
                  >
                    未確認
                  </div>
                  <div v-else>
                    {{
                      dataAccount.identity_verification_status === 2
                        ? "確認待ち"
                        : dataAccount.identity_verification_status === 4
                        ? "確認済み"
                        : "-"
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Setting System -->
          <div class="account-info flex flex-col">
            <div class="account-info-header">システム設定</div>
            <div class="account-info-list flex flex-col">
              <div class="account-info-list-item w-full flex flex-wrap">
                <div class="title-row title-checkbox">メールでお知らせ</div>
                <div class="content-row content-checkbox flex flex-col">
                  <div class="items-center mb-5 content-checkbox-description">
                    <div class="flex items-center">
                      <b-form-checkbox
                        v-model="dataAccount.transaction_mail_flg"
                        disabled
                        class="form-checkbox-select"
                        size="md"
                      >
                        <label class="mx-3 lable-checkbox-setting">取引関連</label>
                      </b-form-checkbox>
                    </div>
                    <div class="content-row-description">
                      取引関連のメール通知は変更できません
                    </div>
                  </div>
                  <div class="flex items-center mb-5">
                    <b-form-checkbox
                      v-model="dataAccount.message_mail_flg"
                      class="form-checkbox-select"
                      size="md"
                      v-on:input="checkHasUpdateMailFlg(dataAccount.message_mail_flg)"
                    >
                      <label class="mx-3 lable-checkbox-setting">メッセージ</label>
                    </b-form-checkbox>
                  </div>
                  <div class="flex items-center mb-5">
                    <b-form-checkbox
                      v-model="dataAccount.favorite_service_mail_flg"
                      class="form-checkbox-select"
                      size="md"
                      v-on:input="
                        checkHasUpdateFavoriteMailFlg(
                          dataAccount.favorite_service_mail_flg
                        )
                      "
                    >
                      <label class="mx-3 lable-checkbox-setting"
                        >フォロー・お気に入り</label
                      >
                    </b-form-checkbox>
                  </div>
                  <div class="flex items-center mb-5">
                    <b-form-checkbox
                      v-model="dataAccount.recommend_service_mail_flg"
                      class="form-checkbox-select"
                      size="md"
                      v-on:input="
                        checkHasUpdateRecommendMailFlg(
                          dataAccount.recommend_service_mail_flg
                        )
                      "
                    >
                      <label class="mx-3 lable-checkbox-setting"
                        >おすすめサービス・特集情報</label
                      >
                    </b-form-checkbox>
                  </div>
                  <div class="flex items-center mb-5">
                    <b-form-checkbox
                      v-model="dataAccount.system_maintenance_mail_flg"
                      class="form-checkbox-select"
                      size="md"
                      v-on:input="
                        checkHasUpdateMaintenanceMailFlg(
                          dataAccount.system_maintenance_mail_flg
                        )
                      "
                    >
                      <label class="mx-3 lable-checkbox-setting"
                        >機能更新・メンテナンス</label
                      >
                    </b-form-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Withdrawal -->
          <div class="account-info flex flex-col">
            <div class="account-info-header">退会</div>
            <div class="account-info-list flex flex-col">
              <div class="account-info-list-item w-full">
                <div
                  class="title-row title-checkbox cursor-pointer"
                  v-on:click="redirectWithdrawal()"
                >
                  退会手続きはこちら
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="hasUpdate" class="button-setting" v-on:click="updateSettingAccount">
          <button>更新</button>
        </div>
        <div v-else class="button-disabled-setting">
          <button :disabled="!hasUpdate">更新</button>
        </div>
      </div>
      <!-- Modal Confirm Delete delivery -->
      <b-modal
        id="modal-confirm-delete-delivery"
        title="削除しますか？"
        v-model="showModalDeleteShippingInfo"
        hide-footer
      >
        <div class="modal-confirm">
          <div class="flex justify-around">
            <button class="bg-red-500 text-[#fff]" v-on:click="deleteShippingInfo()">
              はい
            </button>
            <button
              class="bg-gray-400 text-[#fff]"
              @click="showModalDeleteShippingInfo = false"
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
      <!-- Modal Add ShippingInfo? -->
      <b-modal
        id="modal-add-deliver"
        v-model="showModalAddShippingInfo"
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
                    v-model.trim="v$.newShippingInfo.last_name.$model"
                    v-bind:class="{
                      'is-invalid': v$.newShippingInfo.last_name.$error,
                    }"
                  />
                  <div v-if="v$.newShippingInfo.last_name.$error" class="error-text">
                    <p v-if="v$.newShippingInfo.last_name.required.$invalid">
                      {{ messageShippingInfo.last_name_required }}
                    </p>
                  </div>
                </div>
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="名"
                    class="custom-input"
                    v-model.trim="v$.newShippingInfo.first_name.$model"
                    v-bind:class="{
                      'is-invalid': v$.newShippingInfo.first_name.$error,
                    }"
                  />
                  <div v-if="v$.newShippingInfo.first_name.$error" class="error-text">
                    <p v-if="v$.newShippingInfo.first_name.required.$invalid">
                      {{ messageShippingInfo.first_name_required }}
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
                    v-model.trim="v$.newShippingInfo.last_name_kana.$model"
                    v-bind:class="{
                      'is-invalid': v$.newShippingInfo.last_name_kana.$error,
                    }"
                    @input="testKanaLastName($event)"
                  />
                  <div v-if="v$.newShippingInfo.last_name_kana.$error" class="error-text">
                    <p v-if="v$.newShippingInfo.last_name_kana.required.$invalid">
                      {{ messageShippingInfo.last_name_kana_required }}
                    </p>
                  </div>
                  <div v-if="checkKatakanaLastName" class="error-text">
                    <p v-if="checkKatakanaLastName">
                      {{ messageShippingInfo.last_name_kana_invalid }}
                    </p>
                  </div>
                </div>
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="メイ"
                    class="custom-input"
                    v-model.trim="v$.newShippingInfo.first_name_kana.$model"
                    v-bind:class="{
                      'is-invalid': v$.newShippingInfo.first_name_kana.$error,
                    }"
                    @input="testKanaFirstName($event)"
                  />
                  <div
                    v-if="v$.newShippingInfo.first_name_kana.$error"
                    class="error-text"
                  >
                    <p v-if="v$.newShippingInfo.first_name_kana.required.$invalid">
                      {{ messageShippingInfo.first_name_kana_required }}
                    </p>
                  </div>
                  <div v-if="checkKatakanaFirstName" class="error-text">
                    <p v-if="checkKatakanaFirstName">
                      {{ messageShippingInfo.last_name_kana_invalid }}
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
                    v-model.trim="v$.newShippingInfo.phone.$model"
                    v-bind:class="{
                      'is-invalid': v$.newShippingInfo.phone.$error,
                    }"
                    id="phone_new_delivery"
                    @keypress="onlyNumber($event)"
                    v-bind="formatNumberPhoneNewShippingInfo()"
                  />
                  <div v-if="v$.newShippingInfo.phone.$error" class="error-text">
                    <p v-if="v$.newShippingInfo.phone.required.$invalid">
                      {{ messageShippingInfo.phone_required }}
                    </p>
                    <p v-if="v$.newShippingInfo.phone.maxLength.$invalid">
                      {{ messageNotiAccount.phone_has_11_numbers }}
                    </p>
                    <p v-if="v$.newShippingInfo.phone.minLength.$invalid">
                      {{ messageNotiAccount.phone_has_11_numbers }}
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
                    v-model.trim="v$.newShippingInfo.post_code.$model"
                    v-bind:class="{
                      'is-invalid': v$.newShippingInfo.post_code.$error,
                    }"
                    id="zipcode_new_delivery"
                    maxlength="8"
                    @blur="formartZipcodeNewShippingInfo()"
                  />
                  <div v-if="v$.newShippingInfo.post_code.$error" class="error-text">
                    <p v-if="v$.newShippingInfo.post_code.required.$invalid">
                      {{ messageShippingInfo.post_code_required }}
                    </p>
                    <p v-if="v$.newShippingInfo.post_code.minLength.$invalid">
                      {{ messageShippingInfo.post_code_minLength }}
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
                    v-model.trim="v$.newShippingInfo.address.$model"
                    v-bind:class="{
                      'is-invalid': v$.newShippingInfo.address.$error,
                    }"
                  />
                  <div v-if="v$.newShippingInfo.address.$error" class="error-text">
                    <p v-if="v$.newShippingInfo.address.required.$invalid">
                      {{ messageShippingInfo.address_required }}
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
                    <b-form-checkbox v-model="newShippingInfo.is_default" class="mr-3"
                      >メインの発送先住所として設定
                    </b-form-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2 justify-end">
              <div class="main-btn">
                <button v-on:click="addShippingInfo()">登録する</button>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
      <!-- Modal Edit ShippingInfo? -->
      <b-modal
        id="modal-add-deliver"
        v-model="showModalEditShippingInfo"
        hide-footer
        hide-header
        size="lg"
      >
        <div class="modal-add-delivery w-full flex flex-col">
          <div class="header flex justify-between w-full items-center py-2">
            <div class="header-text">送付先情報編集</div>
            <div class="icon-close">
              <SDIcon icon="x" size="2x" @click="showModalEditShippingInfo = false" />
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
                    v-model.trim="v$.detailShippingInfo.last_name.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailShippingInfo.last_name.$error,
                    }"
                  />
                  <div v-if="v$.detailShippingInfo.last_name.$error" class="error-text">
                    <p v-if="v$.detailShippingInfo.last_name.required.$invalid">
                      {{ messageShippingInfo.last_name_required }}
                    </p>
                  </div>
                </div>
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="名"
                    class="custom-input"
                    v-model.trim="v$.detailShippingInfo.first_name.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailShippingInfo.first_name.$error,
                    }"
                  />
                  <div v-if="v$.detailShippingInfo.first_name.$error" class="error-text">
                    <p v-if="v$.detailShippingInfo.first_name.required.$invalid">
                      {{ messageShippingInfo.first_name_required }}
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
                    v-model.trim="v$.detailShippingInfo.last_name_kana.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailShippingInfo.last_name_kana.$error,
                    }"
                    @input="testKanaLastName($event)"
                  />
                  <div
                    v-if="v$.detailShippingInfo.last_name_kana.$error"
                    class="error-text"
                  >
                    <p v-if="v$.detailShippingInfo.last_name_kana.required.$invalid">
                      {{ messageShippingInfo.last_name_kana_required }}
                    </p>
                  </div>
                  <div v-if="checkKatakanaLastName" class="error-text">
                    <p v-if="checkKatakanaLastName">
                      {{ messageShippingInfo.last_name_kana_invalid }}
                    </p>
                  </div>
                </div>
                <div class="w-[48%] relative validate-form">
                  <b-form-input
                    placeholder="メイ"
                    class="custom-input"
                    v-model.trim="v$.detailShippingInfo.first_name_kana.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailShippingInfo.first_name_kana.$error,
                    }"
                    @input="testKanaFirstName($event)"
                  />
                  <div
                    v-if="v$.detailShippingInfo.first_name_kana.$error"
                    class="error-text"
                  >
                    <p v-if="v$.detailShippingInfo.first_name_kana.required.$invalid">
                      {{ messageShippingInfo.first_name_kana_required }}
                    </p>
                  </div>
                  <div v-if="checkKatakanaFirstName" class="error-text">
                    <p v-if="checkKatakanaFirstName">
                      {{ messageShippingInfo.last_name_kana_invalid }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2">
              <div class="main-label">電話番号</div>
              <div class="main-input">
                <div class="w-full relative validate-form">
                  <b-form-input
                    placeholder="00000000000"
                    class="custom-input w-100"
                    v-model.trim="v$.detailShippingInfo.phone.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailShippingInfo.phone.$error,
                    }"
                    id="phone_delivery"
                    @keypress="onlyNumber($event)"
                    v-bind="formatNumberPhoneShippingInfo"
                    @blur="formatPhoneNumber()"
                  />
                  <div v-if="v$.detailShippingInfo.phone.$error" class="error-text">
                    <p v-if="v$.detailShippingInfo.phone.required.$invalid">
                      {{ messageShippingInfo.phone_required }}
                    </p>
                    <p v-if="v$.detailShippingInfo.phone.maxLength.$invalid">
                      {{ messageNotiAccount.phone_has_11_numbers }}
                    </p>
                    <p v-if="v$.detailShippingInfo.phone.minLength.$invalid">
                      {{ messageNotiAccount.phone_has_11_numbers }}
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
                    v-model.trim="v$.detailShippingInfo.post_code.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailShippingInfo.post_code.$error,
                    }"
                    id="zipcode_delivery"
                    @blur="formartZipcode()"
                    maxlength="8"
                  />
                  <div v-if="v$.detailShippingInfo.post_code.$error" class="error-text">
                    <p v-if="v$.detailShippingInfo.post_code.required.$invalid">
                      {{ messageShippingInfo.post_code_required }}
                    </p>
                    <p v-if="v$.detailShippingInfo.post_code.minLength.$invalid">
                      {{ messageShippingInfo.post_code_minLength }}
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
                    v-model.trim="v$.detailShippingInfo.address.$model"
                    v-bind:class="{
                      'is-invalid': v$.detailShippingInfo.address.$error,
                    }"
                  />
                  <div v-if="v$.detailShippingInfo.address.$error" class="error-text">
                    <p v-if="v$.detailShippingInfo.address.required.$invalid">
                      {{ messageShippingInfo.address_required }}
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
                    <b-form-checkbox v-model="detailShippingInfo.is_default" class="mr-3"
                      >メインの発送先住所として設定
                    </b-form-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full items-center my-2 justify-end">
              <div class="main-btn">
                <button v-on:click="editShippingInfo()">登録する</button>
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
                  placeHolder="LLLLLLL"
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
            <div class="flex w-full items-center my-2">
              <div class="main-label"></div>
              <div class="main-input">
                <div class="w-full relative validate-form">
                  <div class="flex items-end">
                    <b-form-checkbox v-model="newStripe.is_default" class="mr-3"
                      >メインのカードとして設定
                    </b-form-checkbox>
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
      <!-- Modal List ShippingInfo -->
      <b-modal
        id="modal-reserve"
        v-model="showModalListShippingInfo"
        hide-footer
        hide-header
        size="lg"
      >
        <div class="list-reserve w-full flex flex-col">
          <div class="header flex justify-between w-full items-center py-2">
            <div class="header-text">送付先情報</div>
            <div class="icon-close">
              <SDIcon icon="x" size="2x" @click="showModalListShippingInfo = false" />
            </div>
          </div>
          <div
            class="main flex flex-col w-full px-[10px] py-[30px] justify-center items-center d-block"
          >
            <div class="list-reserve-add flex items-center mb-3">
              <img
                :src="iconAdd"
                alt=""
                class="mr-2"
                v-on:click="showAddShippingInfo"
              />送付先住所を追加する
            </div>
            <SDTable
              v-bind:items="listShippingInfo"
              v-bind:fields="fieldShippingInfo"
              v-bind:border="false"
              v-bind:bgCell="false"
            >
              <template #cell(checkbox)="{ item }">
                <div>
                  <input
                    type="checkbox"
                    disabled
                    v-model="item.is_default"
                    class="input-checkbox-setting"
                  />
                </div>
              </template>
              <template #cell(action)="{ item }">
                <div class="action-shipping-info flex">
                  <img :src="iconPen" alt="" @click="showEditShippingInfo(item.id)" />
                  <img :src="iconTrash" alt="" @click="showDeleteShippingInfo(item)" />
                </div>
              </template>
              <template #cell(name)="{ item }">
                <div class="text-left">{{ item.last_name }} {{ item.first_name }}</div>
              </template>
              <template #cell(post_code)="{ item }">
                <div class="text-left">{{ item.post_code }}</div>
              </template>
              <template #cell(address)="{ item }">
                <div class="text-left">{{ item.address }}</div>
              </template>
              <template #cell(phone)="{ item }">
                <div class="text-left">{{ item.phone }}</div>
              </template>
              <template #cell(name_kana)="{ item }">
                <div class="text-left">
                  {{ item.last_name_kana }} {{ item.first_name_kana }}
                </div>
              </template>
            </SDTable>
          </div>
        </div>
      </b-modal>
      <!-- Modal List Card -->
      <b-modal
        id="modal-reserve"
        v-model="showModalListCard"
        hide-footer
        hide-header
        size="lg"
      >
        <div class="list-reserve w-full flex flex-col">
          <div class="header flex justify-between w-full items-center py-2">
            <div class="header-text">お支払い方法</div>
            <div class="icon-close">
              <SDIcon icon="x" size="2x" @click="showModalListCard = false" />
            </div>
          </div>
          <div
            class="main flex flex-col w-full px-[10px] py-[30px] justify-center items-center d-block"
          >
            <div class="list-stripe">
              <div v-if="listCards && listCards.length > 0">
                <div
                  class="list-stripe-item flex px-[20px] py-[25px] my-[20px] items-center"
                  v-for="(item, index) in listCards"
                  :key="index"
                  :class="item.is_default ? 'active' : ''"
                >
                  <div class="img-stripe">
                    <img :src="visa" alt="" />
                  </div>
                  <div class="card-stripe">VISA　末尾　{{ item.last4 }}</div>
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
                  v-on:click="showAddStripe"
                />新しいクレジットカードを追加する
              </div>
            </div>
          </div>
        </div>
      </b-modal>
      <!-- Modal Confirm Edit Email -->
      <b-modal
        id="modal-confirm-edit-email"
        v-model="showModalSendMail"
        hide-footer
        hide-header
      >
        <div class="modal-add-delivery w-full flex flex-col">
          <div class="header flex justify-between w-full items-center py-2">
            <div class="header-text">メール変更</div>
            <div class="icon-close">
              <SDIcon icon="x" size="2x" @click="showModalSendMail = false" />
            </div>
          </div>
          <div class="main flex flex-col w-full px-[20px] py-[30px]">
            <div class="w-full items-center my-2">
              変更確認用のURLを、入力されたメールアドレス宛に送信しました。
            </div>
          </div>
        </div>
      </b-modal>
      <!-- Modal add card seller-->
      <b-modal ref="modal-tag" hide-header hide-footer v-model="showModalAddCardFlg">
        <div class="content-modal-detail">
          <div class="padding">
            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <strong>クレジットカード</strong>
                    <small>カードの情報を入力してください</small>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label for="name">カード名</label>
                          <div class="relative validate-form">
                            <input
                              class="form-control"
                              type="text"
                              placeholder="名前を入力してください"
                              v-model.trim="v$.cardName.$model"
                              v-bind:class="{
                                'is-invalid': v$.cardName.$error,
                              }"
                            />
                            <div v-if="v$.cardName.$error" class="error-text">
                              <p v-if="v$.cardName.required.$invalid">
                                {{ messageStripe.card_name_required }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-4">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label for="ccnumber">カード番号</label>
                          <div class="input-group">
                            <div class="relative validate-form d-flex w-100">
                              <input
                                class="form-control"
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                v-model="cardNumber"
                                @keypress="onlyNumber($event)"
                                maxlength="16"
                                v-model.trim="v$.cardNumber.$model"
                                v-bind:class="{
                                  'is-invalid': v$.cardNumber.$error,
                                }"
                              />
                              <div v-if="v$.cardNumber.$error" class="error-text">
                                <p v-if="v$.cardNumber.required.$invalid">
                                  {{ messageStripe.card_number_required }}
                                </p>
                              </div>
                              <div class="input-group-append">
                                <span class="input-group-text" style="height: 38px">
                                  <SDIcon icon="credit-card" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-4">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label for="name">銀行名</label>
                          <div class="relative validate-form">
                            <input
                              class="form-control"
                              type="text"
                              v-model="bankName"
                              placeholder="銀行名を入力してください"
                              v-model.trim="v$.bankName.$model"
                              v-bind:class="{
                                'is-invalid': v$.bankName.$error,
                              }"
                            />
                            <div v-if="v$.bankName.$error" class="error-text">
                              <p v-if="v$.bankName.required.$invalid">
                                {{ messageStripe.bank_name_required }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button
                      class="btn btn-sm btn-success float-right"
                      v-on:click="addCardSeller"
                      v-if="!editFlag"
                    >
                      追加
                    </button>
                    <button
                      class="btn btn-sm btn-success float-right"
                      v-on:click="updateCardSeller"
                      v-else
                    >
                      更新
                    </button>
                    <button class="btn btn-sm btn-danger" v-on:click="resetCard">
                      リセット
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
      <!-- Modal confirm -->
      <b-modal
        id="modal-tag"
        ref="modal-tag"
        hide-header
        hide-footer
        v-model="showModalConfirm"
      >
        <div class="content-modal-detail">
          <b-container fluid>
            <b-row>
              <b-col cols="12">
                <div class="flex justify-start py-3" v-if="changeEmail && changeBirthday">
                  メールを変更しますか？ <br />
                </div>
                <div
                  class="flex justify-center py-3"
                  v-if="changeEmail && !changeBirthday"
                >
                  メールを変更しますか？
                </div>
                <div class="flex justify-start py-3" v-if="changeBirthday">
                  アカウント名または生年月日を変更すると本人確認が削除され、最初から行われます。<br />
                  変更しますか？
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6">
                <div class="flex justify-center py-3">
                  <b-button class="btn-cancel" v-on:click="showModalConfirm = false"
                    >いいえ</b-button
                  >
                </div>
              </b-col>
              <b-col cols="6">
                <div class="flex justify-center py-3">
                  <b-button class="btn-submit" v-on:click="confirmUpdate">はい</b-button>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-modal>
    </div>
  </NuxtLayout>
</template>

<script>
import { buyerStore } from "@/store/buyer/index.ts";
import { sellerStore } from "@/store/seller/index.ts";
import { accountStore } from "@/store/account/index.ts";
import Cookies from "js-cookie";
import { StripeElementCard } from "@vue-stripe/vue-stripe";
import { StripeElements, StripeElement } from "vue-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { defineComponent, ref, onBeforeMount } from "vue";
import useVuelidate from "@vuelidate/core";
import Datepicker from "@vuepic/vue-datepicker";
import {
  required,
  minValue,
  maxLength,
  minLength,
  email,
  maxValue,
} from "@vuelidate/validators";
import SDPreLoad from "@/components/SDPreLoad";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import { shippingInfoStore } from "@/store/shipping_info";
import { cardStore } from "@/store/card";
import iconPen from "@/assets/images/iconPen.png";
import iconTrash from "@/assets/images/iconTrash.png";
import iconAdd from "@/assets/images/iconAdd.png";
import visa from "@/assets/images/visa.png";
import SDIcon from "@/components/SDIcon";
import { tableFields } from "@/utils/table-fields";
import { Message } from "@/utils/message";
import "moment/locale/ja";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { Urls } from "@/utils/urls";

export default {
  name: "SettingsBuyer",
  auth: false,
  setup() {
    const toast = useToast();
    const store = buyerStore();
    const storeSeller = sellerStore();
    const storeAccount = accountStore();
    const v$ = useVuelidate();
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
    return {
      toast,
      store,
      v$,
      storeShippingInfo,
      storeCard,
      storeAccount,
      storeSeller,
      stripeKey,
      stripeLoaded,
      instanceOptions,
      elementsOptions,
      cardOptions,
      card,
      elms,
    };
  },
  validations: {
    bankName: {
      required,
    },
    cardName: {
      required,
    },
    cardNumber: {
      required,
    },
    detailShippingInfo: {
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
    newShippingInfo: {
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
        minLength: minLength(10),
        maxLength: maxLength(11),
        required,
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
    dataAccount: {
      email: {
        required,
        maxLength: maxLength(256),
        email,
      },
      birthday: {
        required,
      },
      phone: {
        maxLength: maxLength(11),
        minLength: minLength(10),
      },
    },
    old_password: {
      minLength: minLength(8),
      maxLength: maxLength(32),
    },
    new_password: {
      minLength: minLength(8),
      maxLength: maxLength(32),
    },
  },
  components: {
    SDIcon,
    StripeElementCard,
    SDPreLoad,
    StripeElements,
    Datepicker,
    StripeElement,
    BootstrapIcon,
  },
  data() {
    return {
      preload: false,
      preloadList: false,
      messageShippingInfo: Message.DELIVERY,
      messageStripe: Message.CARD,
      messageNotiAccount: Message.LOGIN,
      Message: Message.IDENTITY_FILE,
      account_id: null,
      sellerCard: {},
      bankName: "",
      cardName: "",
      cardNumber: "",
      showModalAddCardFlg: false,
      editFlag: false,
      dataTest: {
        account_id: "",
        phone: "000-0000-0000",
        email: "-",
        password: "-",
        card: "-",
        address: "-",
        payment: "-",
        identity: 1,
        transaction: 1,
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
      newShippingInfo: {
        first_name: "",
        last_name: "",
        first_name_kana: "",
        last_name_kana: "",
        phone: "",
        post_code: "",
        address: "",
        is_default: false,
      },
      showModalConfirm: false,
      showModalEditEmail: false,
      changeBirthday: false,
      changeEmail: false,
      newStripe: {
        is_default: false,
      },
      fieldShippingInfo: tableFields.LIST_SHIPPING_INFO,
      visa,
      detailShippingInfo: {
        first_name: "",
        last_name: "",
        first_name_kana: "",
        last_name_kana: "",
        phone: "",
        post_code: "",
        address: "",
        is_default: false,
      },
      showModalDeleteShippingInfo: false,
      showModalDeleteStripe: false,
      showModalAddShippingInfo: false,
      showModalAddStripe: false,
      showModalEditShippingInfo: false,
      detailStripe: {},
      old_password: "",
      new_password: "",
      dataAccount: {
        account_id: "",
        phone: "",
        email: "",
        birthday: "",
        identity_verification_status: "",
        transaction_mail_flg: true,
        system_maintenance_mail_flg: true,
        recommend_service_mail_flg: true,
        message_mail_flg: true,
        favorite_service_mail_flg: true,
      },
      iconAdd,
      iconPen,
      iconTrash,
      shippingInfoDefault: {},
      listShippingInfo: [],
      listCards: [],
      cardDefault: {},
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
      isEdit: {
        phone: true,
        email: true,
        password: true,
        birthday: true,
        card: true,
        address: true,
        payment: true,
        identity: true,
      },
      showModalListShippingInfo: false,
      showModalListCard: false,
      page: 1,
      user_type: "",
      showModalSendMail: false,
      identity_verification_status: false,
      showPassword: true,
      maxlength: 13,
      checkKatakanaLastName: false,
      checkKatakanaFirstName: false,
      hasUpdate: false,
      hasUpdateMail: false,
      hasUpdateFavorite: false,
      hasUpdateRecommend: false,
      hasUpdateMaintenance: false,
    };
  },
  created() {
    window.scrollTo(0, 0);
    let rememberLogin = localStorage.getItem("rememberLogin");
    let valueToken = null;
    if (rememberLogin === "true") {
      valueToken = localStorage.getItem("token_user");
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      valueToken = Cookies.get("token_user");
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }

    if (!valueToken) {
      this.$router.push("/login");
    }
    this.storeAccount.getAccountSetting();
    this.storeShippingInfo.getShippingInfoByBuyerId(this.account_id);
    this.storeSeller.getTransferHistory(this.account_id);
    this.getListCards();
    this.storeAccount.getInfoWithdrawalAccount(this.account_id);
  },
  computed: {
    ...mapState(buyerStore, ["dataAccountBuyer", "error", "success", "message"]),
    ...mapState(shippingInfoStore, [
      "successShipping",
      "messageShipping",
      "errorShipping",
      "errorAddress",
      "shippingInfoList",
      "dataAddress",
      "detailShippingById",
    ]),
    ...mapState(cardStore, ["successCard", "messageCard", "errorCard", "cardsList"]),
    ...mapState(sellerStore, [
      "success",
      "message",
      "transferHistory",
      "dataAccountInfo",
      "error",
      "cardFlg",
      "cardInfo",
    ]),
    ...mapState(accountStore, [
      "successAccount",
      "messageAccount",
      "successSettingAccount",
      "messageSettingAccount",
      "dataAccountUser",
      "errorAccount",
      "errorSettingAccount",
      "infoWithdrawal",
    ]),
  },
  watch: {
    transferHistory() {
      this.sellerCard = this.transferHistory.seller_card;
      this.preload = false;
    },

    cardFlg() {
      this.preloadList = false;
      if (this.storeSeller.success) {
        this.toast.success(this.message, this.optionToast);
        this.storeSeller.cardFlg = false;
        this.storeSeller.success = false;
        this.storeSeller.message = "";
      }
      this.showModalAddCardFlg = false;
      this.storeSeller.getTransferHistory(this.account_id);
    },

    cardInfo() {
      this.cardNumber = this.cardInfo.account_number;
      this.cardName = this.cardInfo.account_holder;
      this.bankName = this.cardInfo.financial_institution_name;
    },

    dataAddress() {
      if (this.showModalEditShippingInfo === true) {
        this.detailShippingInfo.address = this.dataAddress.address_2;
      }
      if (this.showModalAddShippingInfo === true) {
        this.newShippingInfo.address = this.dataAddress.address_2;
      }
    },
    dataAccountUser() {
      this.preload = true;
      this.dataAccount.account_id = this.account_id;
      this.dataAccount.email = this.dataAccountUser.email;
      this.dataAccount.phone = this.dataAccountUser.phone_number;
      this.dataAccount.identity_verification_status = this.dataAccountUser.identity_verification_status;
      this.dataAccount.favorite_service_mail_flg =
        this.dataAccountUser.favorite_service_mail_flg === 1 ? true : false;
      this.dataAccount.system_maintenance_mail_flg =
        this.dataAccountUser.system_maintenance_mail_flg === 1 ? true : false;
      this.dataAccount.recommend_service_mail_flg =
        this.dataAccountUser.recommend_service_mail_flg === 1 ? true : false;
      this.dataAccount.message_mail_flg =
        this.dataAccountUser.message_mail_flg === 1 ? true : false;
      if (
        this.dataAccountUser.birth_day != null &&
        this.dataAccountUser.birth_day != "" &&
        this.dataAccountUser.birth_day != "0000-00-00"
      ) {
        this.dataAccount.birthday = this.$moment(this.dataAccountUser.birth_day).format(
          "YYYY-MM-DD"
        );
      }
      this.preload = false;
    },

    shippingInfoList() {
      this.listShippingInfo = this.shippingInfoList;
      if (this.listShippingInfo && this.listShippingInfo.length > 0) {
        this.listShippingInfo.map((item) => {
          if (item.is_default === 1) {
            item.is_default = true;
            this.shippingInfoDefault = item;
          } else {
            item.is_default = false;
          }
        });
      }
    },

    detailShippingById() {
      this.detailShippingInfo = this.detailShippingById;
      this.detailShippingInfo.is_default =
        this.detailShippingById.is_default === 1 ? true : false;
      this.checkKatakanaLastName = false;
      this.checkKatakanaFirstName = false;
    },

    cardsList() {
      this.listCards = this.cardsList.cards;
      if (this.listCards && this.listCards.length > 0) {
        this.listCards.map((item) => {
          if (item.id === this.cardsList.card_default) {
            item.is_default = true;
            this.cardDefault = item;
          } else {
            item.is_default = false;
          }
        });
      }
    },

    showModalDeleteShippingInfo() {
      if (this.showModalDeleteShippingInfo === false) {
        this.showModalListShippingInfo = true;
      }
    },

    showModalEditShippingInfo() {
      if (this.showModalEditShippingInfo === false) {
        this.showModalListShippingInfo = true;
      }
    },

    showModalAddShippingInfo() {
      if (this.showModalAddShippingInfo === false) {
        this.showModalListShippingInfo = true;
      }
    },

    showModalDeleteStripe() {
      if (this.showModalDeleteStripe === false) {
        this.showModalListCard = true;
      }
    },

    showModalAddStripe() {
      if (this.showModalAddStripe === false) {
        this.showModalListCard = true;
      }
    },

    successShipping() {
      this.preloadList = false;
      if (this.storeShippingInfo.successShipping === true) {
        this.toast.success(this.storeShippingInfo.messageShipping, this.optionToast);
        this.storeShippingInfo.successShipping = "";
        this.storeShippingInfo.messageShipping = "";
        this.showModalDeleteShippingInfo = false;
        this.showModalEditShippingInfo = false;
        this.showModalAddShippingInfo = false;
        this.showModalListShippingInfo = true;
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
        this.showModalAddStripe = false;
        this.showModalListCard = true;
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

    successAccount() {
      this.preloadList = false;
      this.showModalConfirm = false;
      if (this.storeAccount.successAccount === true) {
        if (this.changeEmail === true) {
          this.showModalConfirm = false;
          this.showModalSendMail = true;
          this.storeAccount.successAccount = "";
          this.storeAccount.messageAccount = "";
          this.storeAccount.getAccountSetting();
        } else {
          this.toast.success(this.storeAccount.messageAccount, this.optionToast);
          this.storeAccount.successAccount = "";
          this.storeAccount.messageAccount = "";
          this.storeAccount.getAccountSetting();
          this.old_password = "";
          this.new_password = "";
          this.showModalAddCardFlg = false;
        }
      }
      window.scrollTo(0, 0);
    },

    successSettingAccount() {
      this.showModalConfirm = false;
      this.preloadList = false;
      if (this.storeAccount.successSettingAccount === true) {
        this.toast.success(this.storeAccount.messageSettingAccount, this.optionToast);
        this.storeAccount.successSettingAccount = "";
        this.storeAccount.messageSettingAccount = "";
        this.storeAccount.getAccountSetting();
        this.old_password = "";
        this.new_password = "";
      }
      window.scrollTo(0, 0);
    },

    errorAccount() {
      this.preloadList = false;
      if (this.storeAccount.errorAccount === true) {
        this.toast.error(this.storeAccount.messageAccount, this.optionToast);
        this.storeAccount.errorAccount = "";
        this.storeAccount.messageAccount = "";
      }
      window.scrollTo(0, 0);
    },

    errorSettingAccount() {
      this.preloadList = false;
      if (this.storeAccount.errorSettingAccount === true) {
        this.toast.error(this.storeAccount.messageSettingAccount, this.optionToast);
        this.storeAccount.errorSettingAccount = "";
        this.storeAccount.messageSettingAccount = "";
      }
      window.scrollTo(0, 0);
    },

    infoWithdrawal() {
      this.preload = true;
      if (
        this.infoWithdrawal.buyer_using === 0 &&
        this.infoWithdrawal.seller_selling === 0 &&
        this.infoWithdrawal.seller_transfer === 0
      ) {
        this.identity_verification_status = true;
      } else {
        this.identity_verification_status = false;
      }
      this.preload = false;
    },
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
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
      this.showModalAddShippingInfo = false;
      this.v$.newShippingInfo.$reset();
    },

    formatNumber(value) {
      return new Intl.NumberFormat().format(value);
    },

    formatNumberZipcodeNewShippingInfo() {
      var text = this.newShippingInfo.post_code;
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
      this.newShippingInfo.post_code = text;
    },

    formatNumberZipcode() {
      var text = this.detailShippingInfo.post_code;
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
      this.detailShippingInfo.post_code = text;
    },

    formatNumberPhoneNewShippingInfo() {
      var text = this.newShippingInfo.phone;
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
      this.newShippingInfo.phone = text;
    },

    formatNumberPhoneShippingInfo() {
      var text = this.detailShippingInfo.phone;
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
      this.detailShippingInfo.phone = text;
    },

    formatNumberPhone() {
      var text = this.dataAccount.phone;
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
      this.dataAccount.phone = text;
    },

    showModalAddCard() {
      this.showModalAddCardFlg = true;
    },

    showModalEditCard() {
      this.showModalAddCardFlg = true;
      this.editFlag = true;
      this.storeSeller.getDetailCard(this.account_id);
    },

    resetCard() {
      this.cardName = "";
      this.cardNumber = "";
      this.bankName = "";
    },

    async addCardSeller() {
      const result = await this.v$.bankName.$validate();
      const result2 = await this.v$.cardName.$validate();
      const result3 = await this.v$.cardNumber.$validate();
      if (!result && !result2 && !result3) {
      } else {
        const request = {
          seller_id: this.account_id,
          financial_institution_name: this.bankName,
          account_number: this.cardNumber,
          account_holder: this.cardName,
        };
        this.storeSeller.addCreditCard(request);
      }
    },

    async updateCardSeller() {
      const result = await this.v$.bankName.$validate();
      const result2 = await this.v$.cardName.$validate();
      const result3 = await this.v$.cardNumber.$validate();
      if (!result && !result2 && !result3) {
      } else {
        const request = {
          financial_institution_name: this.bankName,
          account_number: this.cardNumber,
          account_holder: this.cardName,
        };
        this.storeSeller.updateCreditCard(this.account_id, request);
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

    showEditShippingInfo(shippingId) {
      this.storeShippingInfo.getDetailShipping(shippingId);
      this.showModalListShippingInfo = false;
      this.showModalEditShippingInfo = true;
    },

    showDeleteShippingInfo(item) {
      this.detailShippingInfo = item;
      this.showModalListShippingInfo = false;
      this.showModalDeleteShippingInfo = true;
    },

    showAddShippingInfo() {
      this.showModalListShippingInfo = false;
      this.showModalAddShippingInfo = true;
    },

    async editShippingInfo() {
      const result = await this.v$.detailShippingInfo.$validate();
      if (this.detailShippingInfo.is_default === false) {
        this.toast.error(
          this.messageShippingInfo.check_default_address,
          this.optionToast
        );
        return;
      }
      if (result) {
        const request = {
          id: this.detailShippingInfo.id,
          last_name: this.detailShippingInfo.last_name,
          first_name: this.detailShippingInfo.first_name,
          last_name_kana: this.detailShippingInfo.last_name_kana,
          first_name_kana: this.detailShippingInfo.first_name_kana,
          phone: this.detailShippingInfo.phone,
          post_code: this.detailShippingInfo.post_code,
          address: this.detailShippingInfo.address,
          is_default: this.detailShippingInfo.is_default === true ? 1 : 0,
        };
        if (!/^([ァ-ン]|ー)+$/.test(request.first_name_kana)) {
          this.toast.error(
            this.messageShippingInfo.first_name_kana_invalid,
            this.optionToast
          );
        } else if (!/^([ァ-ン]|ー)+$/.test(request.last_name_kana)) {
          this.toast.error(
            this.messageShippingInfo.last_name_kana_invalid,
            this.optionToast
          );
        } else if (!/^[a-zA-Zぁ-んァ-ンｧ-ﾝﾞﾟ一-龥]+$/.test(request.first_name)) {
          this.toast.error(this.messageShippingInfo.first_name_invalid, this.optionToast);
        } else if (!/^[a-zA-Zぁ-んァ-ンｧ-ﾝﾞﾟ一-龥]+$/.test(request.last_name)) {
          this.toast.error(this.messageShippingInfo.last_name_invalid, this.optionToast);
        } else {
          this.preloadList = true;
          this.storeShippingInfo.editShippingInfo(request);
        }
      }
    },

    async showEditEmail() {
      const result = await this.v$.dataAccount.email.$validate();
      if (result) {
        this.showModalEditEmail = true;
      }
    },

    deleteShippingInfo() {
      this.preloadList = true;
      this.storeShippingInfo.deleteShippingInfo(this.detailShippingInfo.id);
    },

    async addShippingInfo() {
      const result = await this.v$.newShippingInfo.$validate();
      if (/^[０-９]/.test(this.newShippingInfo.phone)) {
        this.toast.error(
          this.messageShippingInfo.enter_phone_halfwidth,
          this.optionToast
        );
        return;
      }
      if (/^[０-９]/.test(this.newShippingInfo.post_code)) {
        this.toast.error(this.messageShippingInfo.zipcode_haflwidth, this.optionToast);
        return;
      }
      if (
        this.newShippingInfo.is_default === false &&
        this.listShippingInfo.length === 0
      ) {
        this.toast.error(
          this.messageShippingInfo.check_default_address,
          this.optionToast
        );
        return;
      }
      if (result) {
        const request = {
          buyer_id: this.account_id,
          last_name: this.newShippingInfo.last_name,
          first_name: this.newShippingInfo.first_name,
          last_name_kana: this.newShippingInfo.last_name_kana,
          first_name_kana: this.newShippingInfo.first_name_kana,
          phone: this.newShippingInfo.phone,
          post_code: this.newShippingInfo.post_code,
          address: this.newShippingInfo.address,
          is_default: this.newShippingInfo.is_default === true ? 1 : 0,
        };
        if (!/^([ァ-ン]|ー)+$/.test(request.first_name_kana)) {
          this.toast.error(
            this.messageShippingInfo.first_name_kana_invalid,
            this.optionToast
          );
        } else if (!/^([ァ-ン]|ー)+$/.test(request.last_name_kana)) {
          this.toast.error(
            this.messageShippingInfo.last_name_kana_invalid,
            this.optionToast
          );
        } else if (!/^[a-zA-Zぁ-んァ-ンｧ-ﾝﾞﾟ一-龥]+$/.test(request.first_name)) {
          this.toast.error(this.messageShippingInfo.first_name_invalid, this.optionToast);
        } else if (!/^[a-zA-Zぁ-んァ-ンｧ-ﾝﾞﾟ一-龥]+$/.test(request.last_name)) {
          this.toast.error(this.messageShippingInfo.last_name_invalid, this.optionToast);
        } else {
          this.preloadList = true;
          this.storeShippingInfo.addShippingInfo(request);
          this.newShippingInfo = {
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

    async updateSettingAccount() {
      const result = await this.v$.dataAccount.$validate();
      if (/^[０-９]/.test(this.dataAccount.phone)) {
        this.toast.error(
          this.messageShippingInfo.enter_phone_halfwidth,
          this.optionToast
        );
        return;
      }
      if (result) {
        const request = {
          phone_number: this.dataAccount.phone,
          old_password: this.old_password,
          new_password: this.new_password,
          birth_day: this.dataAccount.birthday
            ? this.$moment(this.dataAccount.birthday).format("YYYY-MM-DD")
            : "",
          message_mail_flg: this.dataAccount.message_mail_flg === true ? 1 : 0,
          transaction_mail_flg: this.dataAccount.transaction_mail_flg === true ? 1 : 0,
          favorite_service_mail_flg:
            this.dataAccount.favorite_service_mail_flg === true ? 1 : 0,
          recommend_service_mail_flg:
            this.dataAccount.recommend_service_mail_flg === true ? 1 : 0,
          system_maintenance_mail_flg:
            this.dataAccount.system_maintenance_mail_flg === true ? 1 : 0,
        };
        if (this.dataAccount.email != this.dataAccountUser.email) {
          const rs = await this.v$.dataAccount.email.$validate();
          if (rs) {
            this.changeEmail = true;
            if (this.old_password || this.new_password) {
              const result1 = await this.v$.old_password.$validate();
              const result2 = await this.v$.new_password.$validate();
              if (result1 && result2) {
                if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/.test(this.new_password)) {
                  this.toast.error(
                    this.messageNotiAccount.pass_invalid,
                    this.optionToast
                  );
                } else {
                  if (
                    this.dataAccount.birthday &&
                    request.birth_day !=
                      this.$moment(this.dataAccountUser.birth_day).format("YYYY-MM-DD")
                  ) {
                    this.changeBirthday = true;
                    this.showModalConfirm = true;
                  } else {
                    this.changeBirthday = false;
                    this.showModalConfirm = true;
                    // this.preloadList = true;
                    // this.storeAccount.updateSettingAccount(request);
                  }
                }
              }
            } else {
              if (
                this.dataAccount.birthday &&
                request.birth_day !=
                  this.$moment(this.dataAccountUser.birth_day).format("YYYY-MM-DD")
              ) {
                this.changeBirthday = true;
                this.showModalConfirm = true;
              } else {
                this.changeBirthday = false;
                this.showModalConfirm = true;
                // this.preloadList = true;
                // this.storeAccount.updateSettingAccount(request);
              }
            }
          } else {
            window.scrollTo(0, 0);
          }
        } else if (this.old_password || this.new_password) {
          this.changeEmail = false;
          const result1 = await this.v$.old_password.$validate();
          const result2 = await this.v$.new_password.$validate();
          if (result1 && result2) {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/.test(this.new_password)) {
              this.toast.error(this.messageNotiAccount.pass_invalid, this.optionToast);
            } else {
              if (
                this.dataAccount.birthday &&
                request.birth_day !=
                  this.$moment(this.dataAccountUser.birth_day).format("YYYY-MM-DD")
              ) {
                this.changeBirthday = true;
                this.showModalConfirm = true;
              } else {
                this.preloadList = true;
                this.storeAccount.updateSettingAccount(request);
              }
            }
          } else {
            window.scrollTo(0, 0);
          }
        } else {
          this.changeEmail = false;
          if (
            this.dataAccount.birthday &&
            request.birth_day !=
              this.$moment(this.dataAccountUser.birth_day).format("YYYY-MM-DD")
          ) {
            this.changeBirthday = true;
            this.showModalConfirm = true;
          } else {
            this.preloadList = true;
            this.storeAccount.updateSettingAccount(request);
          }
        }
      } else {
        window.scrollTo(0, 0);
      }
    },

    confirmUpdate() {
      if (this.dataAccount.email != this.dataAccountUser.email) {
        // this.showModalConfirm = false;
        // this.showModalEditEmail = true;
        this.updateEmail();
      } else {
        this.updateSetting();
      }
    },

    async updateSetting() {
      const request = {
        phone_number: this.dataAccount.phone,
        old_password: this.old_password,
        new_password: this.new_password,
        birth_day: this.dataAccount.birthday
          ? this.$moment(this.dataAccount.birthday).format("YYYY-MM-DD")
          : "",
        message_mail_flg: this.dataAccount.message_mail_flg === true ? 1 : 0,
        transaction_mail_flg: this.dataAccount.transaction_mail_flg === true ? 1 : 0,
        favorite_service_mail_flg:
          this.dataAccount.favorite_service_mail_flg === true ? 1 : 0,
        recommend_service_mail_flg:
          this.dataAccount.recommend_service_mail_flg === true ? 1 : 0,
        system_maintenance_mail_flg:
          this.dataAccount.system_maintenance_mail_flg === true ? 1 : 0,
      };
      this.preloadList = true;
      this.storeAccount.updateSettingAccount(request);
    },

    updateEmail() {
      this.preloadList = true;
      const request = {
        email: this.dataAccount.email,
      };
      this.updateSetting();
      this.storeAccount.updateEmail(request);
    },

    showAddStripe() {
      this.showModalListCard = false;
      this.showModalAddStripe = true;
    },

    showDeleteStripe(item) {
      this.detailStripe = item;
      this.showModalListCard = false;
      this.showModalDeleteStripe = true;
    },

    deleteStripe() {
      this.preloadList = true;
      this.storeCard.deleteCard(this.detailStripe.id, this.account_id);
    },

    getAdressPostCode(zipcode) {
      if (zipcode != "" && zipcode.length === 7) {
        this.storeShippingInfo.getAddress(zipcode);
      } else {
        this.detailDelivery.address = "";
      }
    },

    formartZipcode() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.detailShippingInfo.post_code;
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
        this.detailShippingInfo.post_code = text;
      }
      var zipcode = text;
      if (zipcode) {
        zipcode = zipcode.replaceAll("-", "");
      }
      this.getAdressPostCode(zipcode);
    },

    formartZipcodeNewShippingInfo() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.newShippingInfo.post_code;
      // document.getElementById("zipcode_new_delivery").focus();
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
        this.newShippingInfo.post_code = text;
      }
      var zipcode = text;
      if (zipcode) {
        zipcode = zipcode.replaceAll("-", "");
      }
      this.getAdressPostCode(zipcode);
    },

    formatPhoneNumber() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.detailShippingInfo.phone;
      document.getElementById("phone_delivery").blur();
      document.getElementById("phone_delivery").focus();
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
    },

    formatPhoneNumberNewShippingInfo() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.newShippingInfo.phone;
      document.getElementById("phone_new_delivery").blur();
      document.getElementById("phone_new_delivery").focus();
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      if (text.length <= 11) {
        this.newShippingInfo.phone = text;
      }
    },

    checkHasUpdatePhone(value) {
      if (this.dataAccountUser.phone_number !== value) {
        this.hasUpdate = true;
      } else {
        this.hasUpdate = false;
      }
    },

    checkUpdateBirthday(value) {
      if (new Date(this.dataAccountUser.birth_day).toString() === value.toString()) {
        this.hasUpdate = false;
      } else {
        this.hasUpdate = true;
      }
    },

    checkHasUpdateMailFlg(value) {
      if (value === true) {
        value = 1;
      } else {
        value = 0;
      }
      if (this.dataAccountUser.message_mail_flg === value) {
        this.hasUpdateMail = true;
      } else {
        this.hasUpdateMail = false;
      }
      this.checkUpdateFlg();
    },

    checkHasUpdateFavoriteMailFlg(value) {
      if (value === true) {
        value = 1;
      } else {
        value = 0;
      }
      if (this.dataAccountUser.favorite_service_mail_flg === value) {
        this.hasUpdateFavorite = true;
      } else {
        this.hasUpdateFavorite = false;
      }
      this.checkUpdateFlg();
    },

    checkHasUpdateRecommendMailFlg(value) {
      if (value === true) {
        value = 1;
      } else {
        value = 0;
      }
      if (this.dataAccountUser.recommend_service_mail_flg === value) {
        this.hasUpdateRecommend = true;
      } else {
        this.hasUpdateRecommend = false;
      }
      this.checkUpdateFlg();
    },

    checkHasUpdateMaintenanceMailFlg(value) {
      if (value === true) {
        value = 1;
      } else {
        value = 0;
      }
      if (this.dataAccountUser.system_maintenance_mail_flg === value) {
        this.hasUpdateMaintenance = true;
      } else {
        this.hasUpdateMaintenance = false;
      }
      this.checkUpdateFlg();
    },

    checkUpdateFlg() {
      if (
        this.hasUpdateMaintenance ||
        this.hasUpdateMail ||
        this.hasUpdateFavorite ||
        this.hasUpdateRecommend
      ) {
        this.hasUpdate = true;
      } else {
        this.hasUpdate = false;
      }
    },

    checkHasUpdateEmail(value) {
      if (this.dataAccountUser.email !== value) {
        this.hasUpdate = true;
      } else {
        this.hasUpdate = false;
      }
    },

    checkHasUpdatePass() {
      if (this.old_password !== "") {
        this.hasUpdate = true;
      } else {
        this.hasUpdate = false;
      }
    },

    checkHasUpdateNewPass() {
      if (this.new_password !== "") {
        this.hasUpdate = true;
      } else {
        this.hasUpdate = false;
      }
    },

    formatPhoneNumberForBuyer() {
      // console.log(this.dataAccount.phone.length);
      // if(this.dataAccount.phone.length === 13) {
      //   this.maxlength = 13
      // // } else {
      // // }
      // String.prototype.splice = function (idx, rem, str) {
      //   return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      // };
      var text = this.dataAccount.phone;
      // if(text.includes("-")) {
      //   this.maxlength = 13
      // } else {
      //   this.maxlength = 11
      // }
      // document.getElementById("phone").blur();
      // document.getElementById("phone").focus();
      if (text) {
        text = text.toString().replace(/[^0-9０-９]/g, "");
        text = text.replaceAll("", "");
      }
      if (text.length <= 11) {
        this.dataAccount.phone = text;
        // elem.setAttribute("maxlength", 11);
      }
    },

    editPhone() {
      this.isEdit.phone = !this.isEdit.phone;
    },

    editBirthday() {
      this.isEdit.birthday = !this.isEdit.birthday;
    },

    editEmail() {
      this.isEdit.email = !this.isEdit.email;
    },

    editPassword() {
      this.isEdit.password = !this.isEdit.password;
      this.showPassword = true;
    },

    showListCard() {
      this.showModalListCard = true;
    },

    showListShippingInfo() {
      this.showModalListShippingInfo = true;
    },

    editPayment() {
      this.isEdit.payment = !this.isEdit.payment;
    },

    editPaymentSeller() {
      this.$router.push("/account/transfer/register");
    },

    editIdentity() {
      this.isEdit.identity = !this.isEdit.identity;
    },

    redirectWithdrawal() {
      if (this.identity_verification_status) {
        this.$router.push("/account/settings/withdrawal/confirm");
      } else {
        this.$router.push("/account/settings/withdrawal");
      }
    },

    identity() {
      if (this.dataAccountUser.birth_day) {
        this.$router.push({ path: `/account/identity/verify` });
      } else {
        this.toast.error(this.Message.birth_day_before_identity, this.optionToast);
      }
    },

    toggleShow() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style lang="scss">
.page-settings {
  &-content {
    padding: 30px 100px;

    @include screen(576) {
      padding: 30px;
    }

    &-title {
      .title-main {
        font-size: 22px;
        color: $gray-800;
        font-weight: 600;

        @include screen(576) {
          font-size: 16px;
        }
      }
    }

    &-main {
      margin-top: 50px;
      padding: 20px 30px;
      background: $white;
      opacity: 1;

      @include screen(480) {
        background: $lightwhite;
        padding-inline: 0px;
        margin-top: 0px;
      }

      .account-info {
        &-header {
          color: $gray-800;
          font-size: 22px;
          font-weight: 600;
          border-bottom: 1px solid $gray-800;
          padding: 20px 0;
        }

        &-list {
          padding: 50px 0;

          &-item {
            padding: 20px 30px;

            @include screen(576) {
              padding: unset;
            }

            @include screen(991) {
              padding-inline: 10px;
            }

            .title-row {
              width: 35%;
              color: $gray-800;
              font-weight: 500;
              font-size: 18px;

              @include screen(991) {
                width: 50%;
              }

              @include screen(576) {
                width: 100%;
                max-width: 130px;
                font-size: 13px;
              }
            }

            .title-checkbox {
              @include screen(991) {
                width: 100%;
              }
            }

            .content-row {
              width: 65%;
              color: #7e7d7d;
              font-size: 18px;

              @include screen(991) {
                width: 50%;
              }

              @include screen(576) {
                width: fit-content;
                font-size: 13px;

                .items-center {
                  margin-bottom: 0px !important;

                  .content-row-description {
                    margin-block: 0px 8px;
                  }
                }
              }

              .lable-checkbox-setting {
                color: $gray-800;
                font-weight: 600;
              }

              .input-birthday {
                width: 50%;

                @media (max-width: 991px) {
                  width: 70%;
                }

                @media (max-width: 768px) {
                  width: 100%;
                }

                @media (max-width: 576px) {
                  width: 80%;
                }
              }

              .input-checkbox-setting {
                height: 18px;
                width: 18px;
              }

              &-description {
                color: #7e7d7d;
                font-size: 16px;
                font-weight: 600;
                margin-left: 43px;

                @include screen(576) {
                  margin-left: unset;
                  margin-top: 20px;
                }
              }
            }

            .content-checkbox {
              @include screen(991) {
                margin-top: 20px;
                width: 100%;
              }
            }

            .content-checkbox-description {
              @media (min-width: 768px) {
                display: flex;
              }

              @include screen(576) {
                flex-direction: column !important;
              }

              .content-row-description {
                margin-left: 43px;
              }
            }

            .edit-row {
              width: 20%;

              @include screen(991) {
                width: fit-content;
                min-width: 75px;
                margin-bottom: 20px;
                margin-left: auto;
              }

              @include screen(576) {
                min-width: 55px;
              }

              button {
                background: unset;
                color: $orange;
                font-size: 18px;
                font-weight: 500;

                @include screen(576) {
                  font-size: 13px;
                }
              }
            }

            .text-identiy {
              color: $orange;
              font-size: 18px;
              font-weight: 600;
            }

            .input-edit-settings {
              background: white;
              border: unset;
              outline-color: $orange;
              cursor: pointer;

              @include screen(480) {
                background: $lightwhite;
              }
            }
          }
        }
      }
    }

    .button-setting {
      button {
        background: $orange;
        color: $white;
        font-size: 18px;
        width: 100%;
        padding: 15px;
        font-weight: 500;
      }
    }

    .button-disabled-setting {
      button {
        background: #7e7d7d;
        color: $white;
        font-size: 18px;
        width: 100%;
        padding: 15px;
        font-weight: 500;
      }
    }
  }
}

.img-stripe {
  width: 30%;

  @include screen(480) {
    font-size: 14px;
    width: 60%;
  }
}

.info-stripe {
  width: 70%;

  .card-stripe {
    @include screen(480) {
      font-size: 14px;
      width: 60%;
      margin: 10px 0;
    }
  }

  .date-stripe {
    @include screen(480) {
      font-size: 14px;
      width: 60%;
      margin: 10px 0;
    }
  }

  .name-stripe {
    @include screen(480) {
      font-size: 14px;
      width: 60%;
    }
  }
}

.list-reserve {
  &-add {
    color: $gray-500;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
    }
  }

  .action-shipping-info {
    img {
      width: 50px;
      height: 50px;
      cursor: pointer;
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

.list-stripe {
  margin-top: 20px;

  &-item {
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
      width: 25%;

      @include screen(480) {
        font-size: 14px;
        width: 60%;
        margin: 10px 0;
      }
    }

    .name-stripe {
      width: 15%;

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
        left: 60%;

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

    img {
      width: 30px;
      height: 30px;
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
}

.button-edit-email {
  text-align: center;
  padding: 1px 10px;
  background: #e79c3a;
  color: #fff;
  border-radius: 10px;
}

.button-edit {
  text-align: center;
  padding: 5px 15px;
  background: #e79c3a;
  color: #fff;
  width: 110px;
  border-radius: 10px;
}

.button-cancel {
  text-align: center;
  background: gray;
  width: 110px;
  color: #fff;
  border-radius: 10px;
}

.form-checkbox-select:checked {
  background-color: $orange !important;
  border-color: $orange !important;
}

.title-description {
  margin-left: 20px;
  font-size: 14px;

  @include screen(480) {
    font-size: 12px;
  }
}
</style>
