export const Message = {
  DATA_TABLE: {
    NO_ITEM: "該当データはありません。",
  },
  ERROR_SYSTEM: "システムエラーが発生しています",
  LOGIN: {
    email_required: "メールアドレスを入力してください。",
    email: "正しいメールアドレスを入力してください。",
    email_maxLength: "メールアドレスは256文字未以下である必要があります。",
    pass_required: "パスワードを入力してください。",
    pass_maxLength:
      "パスワードは英数を含む8文字以上30文字以下である必要があります。",
    pass_invalid:
      "パスワードは英数を含む8文字以上30文字以下である必要があります。",
    error_password: "パスワードが一致しません。",
    account_name: "アカウント名は3文字以上10文字以下である必要があります。",
    reset_pw_success: "パスワードの変更に成功しました。",
    signup_success: "アカウント登録に成功しました。",
    birthday_required: "生年月日を入力してください。",
    phone_has_11_numbers:
      "電話番号は10桁または11桁の数字でなければいけません。",
  },
  UPLOAD_AVATAR: {
    success: "アバターを正常に変更しています。",
  },
  ADMIN: {
    TAG: {
      name_required: "タグ名は必須項目です。",
    },
    CONTACT: {
      reply_content_required: "コメントは必須項目です。",
    },
  },
  CONTACT: {
    name_required: "名前フィールドは必須です。",
    email_required: "メールアドレスは必須です。",
    content_required: "お問い合わせ内容は必須です。",
  },
  SEARCH: {
    keyword: "キーワードを入力してください。",
    NO_ITEM: "該当データはありません。",
  },
  SELLER: {
    service_name_maxlength: "サービス名の最大文字数は30文字までです。",
    service_name_required: "サービス名は必須項目です。",
    catch_copy_required: "キャッチコピーは必須項目です。",
    service_content: "サービス内容の詳細は必須項目です。",
    tag_length_required: "タグを1つ以上入力してください。",
    tag_is_exist:
      "このハッシュタグは既に存在しています。他のハッシュタグをご使用ください。",
    url_is_required: "非公開URLは必須項目です。",
    tag_has_white_space: "タグの先頭に空白は入れられません。",
    image_minlength: "サービス画像を1つ以上選択してください。",
    number_contract_required: "契約数は必須項目です。",
    number_value: "契約数は10以上である必要があります。",
    course_name_maxlength: "コース名の最大文字数は50文字です。",
    course_name_minlength: "コース名の最小文字数は1文字です。",
    course_name_required: "コース名は必須項目です。",
    course_content: "コース内容は必須項目です。",
    image_required: "コース画像は必須項目です。",
    price_required: "コースの価格は必須項目です。",
    price_value: "コース価格は10円単位で設定可能です。",
    age_required: "数字を入力してください。",
    age_value: "この値は10以上でなければなりません.",
    checkbox_required: "チェックボックスを選択してください。",
    month_delivery_required:
      "配送間隔は必須項目で、1以上の値である必要があります。",
    skip_with_required:
      "スキップ期間は必須項目で、10以上の値である必要があります。",
    urlPrivate: "これは必須項目です。",
    area_is_required: "サービス提供エリアを選択してください",
    step_required: "説明文を入力してください。",
    limit_required: "制限人数を入力してください",
    minute_required: "分数を入力してください",
    hour_required: "時間を入力してください",
    duration_before_required: "予約受付可能期間を入力してください。",
    duration_after_required: "予約締切期間を入力してください",
    limit_min: "受付人数上限を入力してください",
    reservation_deadline: "予約締切期間を入力してください",
    max_size_image: "アップロード可能なファイルのサイズは10MBまでです。",
    url_step11_required: "ウェブサイトURLは必須項目です。",
    zipcode_step11_required: "郵便番号は必須項目です。",
    zipcode_step11_minLength: "郵便番号は半角数字7文字で入力してください",
    address_step11_required: "所在地は必須項目です。",
    hashtag_error: "このハッシュタグは無効です。",
    url_maxLength: "URLは30文字より大きくありません。",
    reason_required: "退会する理由が必須項目です",
    guide_require: "ガイドのご確認とチェックを入れてください",
    setting_hourse_invalid: "入力されたデータが無効です",
    save_step1: "この画面に保存することはできません。",
    number_requied: "数字を入力してください",
    price_invalid:
      "サービスの価格は500円以上9999999円以下でなければなりません。",
    max_invalid: "契約可能上限数は999件です。",
    error_skip: "次回配送をスキップできません",
    enter_halfwidth: "数字半角で入力してください。",
    error_enter_age: "年齢を入力してください。",
  },
  COMMENT: {
    comment_is_required: "コメントは必須項目です。",
    comment_maxlength: "コメントの最大文字数は50文字です。",
    star_is_required: "このサービスの評価をしてください。",
    max_size_file: "アップロード可能なファイルのサイズは10MBまでです。",
    no_comment: "このサービスにコメントがありません",
  },
  SWITCH_ACCOUNT: {
    buyer: "購入者のアカウントに切り替えました。",
    seller: "販売者のアカウントに切り替えました。",
  },
  CHAT: {
    message_content_is_required: "メッセージの内容を入力してください。",
    max_size_file: "アップロード可能なファイルのサイズは10MBまでです。",
  },
  PAYMENT: {
    delivery_required: "送付先情報は必須です。",
    stripe_required: "決済のアカウントを選択してください。",
    used_service: "サービス契約中（同一サービスの複数同時契約は出来ません）",
  },
  IDENTITY_FILE: {
    file_required: "本人認証画像は必須です。",
    identity_file_type: "本人確認書類は必須です。",
    confirm:
      "登録情報を全て確認し、チェックボックスにチェックを入れてください。",
    birth_day_before_identity: "本人確認の前に生年月日を更新してください",
    max_size_image: "アップロード可能なファイルのサイズは10MBまでです。",
  },
  DELIVERY: {
    first_name_required: "名前は必須入力です。",
    first_name_kana_required: "名前は必須項目です。",
    last_name_required: "苗字は必須項目です。",
    last_name_kana_required: "苗字は必須項目です。",
    phone_required: "電話番号は必須項目です。",
    post_code_required: "郵便番号は必須項目です。",
    post_code_minLength: "郵便番号は半角数字7文字で入力してください",
    address_required: "住所は必須項目です。",
    last_name_kana_invalid: "カタカナで入力してください。",
    first_name_kana_invalid: "カタカナで入力してください。",
    first_name_invalid: "利用できない文字が含まれています。",
    last_name_invalid: "利用できない文字が含まれています。",
    address_invalid: "利用できない文字が含まれています。",
    enter_halfwidth: "数字半角で入力してください。",
    enter_phone_halfwidth: "電話番号は半角数字で入力してください。",
    phone_has_11_numbers:
      "電話番号は10桁または11桁の数字でなければいけません。",
    zipcode_haflwidth: "郵便番号は半角数字で入力してください。",
    check_default_address:
      "初めて送付先を登録する場合は、これをデフォルトの送付先に設定してください。",
  },
  CARD: {
    card_name_required: "口座名義は必須項目です。",
    bank_name_required: "銀行名は必須項目です。",
    branch_code_required: "支店コードは必須項目です。",
    account_type_required: "口座種別は必須項目です。",
    first_name_account_required: "口座名義（メイ）は必須項目です。",
    name_account_invalid: "カタカナで入力してください。",
    last_name_account_required: "口座名義（セイ）は必須項目です。",
    card_number_required: "カード番号は必須項目です。",
    account_number_required: "口座番号は必須項目です。",
    account_number_min: "口座番号の最小文字数は７文字です。",
    transfer_amount_required: "振込申請金額は必須項目です。",
    transfer_amount_more_than: "振込申請金額は500円以上である必要があります。",
    transfer_more_than:
      "振込申請する金額は振込可能金額以下である必要があります。",
  },
  DETAIL: {
    copy_success: "URLをクリップボードにコピーしました",
  },
};
