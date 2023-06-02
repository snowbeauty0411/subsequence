<template>
  <div id="page-threadChatId">
    <SDPreLoad :preload="preload" />
    <div class="threadChatId-search relative">
      <b-form-input
        class="form-input-search"
        placeholder="キーワードから検索"
        v-model="keyword"
        v-on:keyup.enter="searchMessage()"
      ></b-form-input>
      <div class="icon-search absolute">
        <BootstrapIcon icon="search" v-on:click="searchMessage()" />
      </div>
    </div>
    <div class="threadChatId-content">
      <div class="threadChatId-content-top">
        <div class="threadChatId-content-top-left flex items-center">
          <div class="item-avatar" v-on:click="$router.push({path: `/profile/seller/${partner.partner_id}`})">
            <img
              :src="
                partner.partner_avatar_img_url
                  ? partner.partner_avatar_img_url
                  : avatarDefault
              "
              alt=""
            />
          </div>
          <div class="item-name" v-on:click="$router.push({path: `/profile/seller/${partner.partner_id}`})">{{ partner.partner_name }}</div>
        </div>
      </div>
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
      <div
        class="threadChatId-content-main"
        id="threadChat"
        v-if="messages.length > 0"
      >
        <div
          class="main-chat flex-col"
          v-for="(item, index) in messages"
          v-bind:key="index"
        >
          <div
            class="main-chat-date"
            v-if="
              index === 0 ||
              $moment(messages[index - 1].created_at).format('YYYY/MM/DD') !==
                $moment(messages[index].created_at).format('YYYY/MM/DD')
            "
          >
            <div class="main-chat-date-content">
              <div class="main-chat-date-content-text">
                {{ $moment(item.created_at).format("YYYY/MM/DD") }}
              </div>
              <div class="main-chat-date-content-line"></div>
            </div>
          </div>
          <div class="main-chat-content">
            <div
              class="chat-left w-full flex justify-start w-full my-4"
              v-if="parseInt(item.from_id) !== parseInt(account_id)"
            >
              <div class="flex w-1/2 chat-left-item">
                <div class="chat-left-avatar" v-on:click="$router.push({path: `/profile/seller/${partner.partner_id}`})">
                  <img
                    :src="
                      partner.partner_avatar_img_url
                        ? partner.partner_avatar_img_url
                        : avatarDefault
                    "
                    alt=""
                  />
                </div>
                <div class="flex flex-col chat-left-message items-start">
                  <div class="text-message mb-2" v-if="item.message_content">
                    <p style="white-space: pre-wrap">
                      {{ item.message_content }}
                    </p>
                  </div>
                  <div class="file" v-if="item.file_path">
                    <a :href="item.file_path">
                      <img
                        :src="fileList[index]"
                        alt=""
                        v-if="
                          item.file_type === 'png' ||
                          item.file_type === 'jpg' ||
                          item.file_type === 'jpeg' ||
                          item.file_type === 'gif'
                        "
                      />
                      <img
                        :src="fileList[index]"
                        alt=""
                        style="width: 50px"
                        v-else
                      />
                    </a>
                  </div>
                  <div class="text-time">
                    {{ $moment(item.created_at).format("HH:mm") }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="chat-right w-full flex justify-end w-full my-4"
              v-if="parseInt(item.from_id) === parseInt(account_id)"
            >
              <div class="flex w-1/2 flex-col chat-right-item items-end">
                <div
                  class="chat-right-message mb-2 mr-[20px]"
                  v-if="item.message_content"
                >
                  <p style="white-space: pre-wrap">
                    {{ item.message_content }}
                  </p>
                </div>
                <div class="file mr-[20px]" v-if="item.file_path">
                  <a :href="item.file_path">
                    <img
                      :src="fileList[index]"
                      alt=""
                      v-if="
                        item.file_type === 'png' ||
                        item.file_type === 'jpg' ||
                        item.file_type === 'jpeg' ||
                        item.file_type === 'gif'
                      "
                    />
                    <img
                      :src="fileList[index]"
                      alt=""
                      style="width: 50px; margin-left: 150px"
                      v-else
                    />
                  </a>
                </div>
                <div class="chat-right-time mr-[20px]">
                  {{ $moment(item.created_at).format("HH:mm") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="threadChatId-content-footer">
        <div v-if="url_file" class="message-file">
          <BootstrapIcon
            style="
              z-index: 2147483646;
              position: absolute;
              top: -6px;
              right: -11px;
              color: black;
              cursor: pointer;
            "
            icon="x-circle-fill"
            size="sm"
            class="mx-1 exclamation-triangle-fill"
            v-on:click="deleteImage()"
          />
          <img :src="url_file" alt="" class="img-main" />
        </div>
        <div class="form-input-chat">
          <b-form-textarea
            placeholder="メッセージを入力してください。"
            rows="5"
            max-rows="10"
            no-auto-shrink
            v-model.trim="message_content"
          ></b-form-textarea>
        </div>
        <div class="form-input-action flex justify-between my-4">
          <div class="form-input-action-left flex">
            <label for="img">
              <div for="img">
                <img src="@/assets/images/photo.png" alt="" />
                <input
                  type="file"
                  class="hidden"
                  id="img"
                  accept="image/png, .pdf, .jpg, .gif, .jpeg"
                  v-on:change="onFileChangeFile"
                />
              </div>
            </label>
            <label for="file">
              <div for="file">
                <img src="@/assets/images/file.png" alt="" class="mx-4" />
                <input
                  type="file"
                  class="hidden"
                  id="file"
                  v-on:change="onFileChangeFile"
                />
              </div>
            </label>
          </div>
          <div class="form-input-action-right" v-on:click="sendMessage()">
            <img
              src="@/assets/images/buttonSend.png"
              alt=""
              class="button-send-chat"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import imgDefault from "@/assets/images/ellipse.png";
import { ChatStore } from "@/store/chat";
import { mapState } from "pinia";
import avatarDefault from "@/assets/images/ellipse.png";
import "moment/locale/ja";
import { Message } from "@/utils/message";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";
import pdfDefault from "@/assets/images/pdf-default.png";
import wordDefault from "@/assets/images/word-default.png";
import excelDefault from "@/assets/images/excel-default.png";
import pptxDefault from "@/assets/images/pptx-default.png";
import fileDefault from "@/assets/images/file-default.png";
import SDPreLoad from "@/components/SDPreLoad";
import { buyerStore } from "@/store/buyer";

export default {
  name: "ThreadChatId",
  components: {
    BootstrapIcon,
    SDPreLoad,
  },
  validations: {
    message_content: {
      required,
    },
  },
  setup() {
    const store = ChatStore();
    const v$ = useVuelidate();
    const toast = useToast();
    const storeBuyer = buyerStore();
    return {
      store,
      v$,
      toast,
      storeBuyer,
    };
  },
  data() {
    return {
      preloadList: false,
      preload: true,
      Message: Message.CHAT,
      url_file: "",
      account_id: null,
      user_type: "",
      id_thread: this.$route.params.id,
      message_content: "",
      file: "",
      avatarDefault,
      imgDefault,
      pdfDefault,
      wordDefault,
      excelDefault,
      pptxDefault,
      fileDefault,
      messages: [],
      partner: {},
      keyword: "",
      login_type: "",
      fileList: [],
      inteval: null,
      heightChat: 0,
      isHeight: false,
      file_base64: "",
    };
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }
    if (this.user_type === "SELLER") {
      this.$router.push({path: `/buyer/account`});
    } else if (this.user_type === "BUYER") {
      this.storeBuyer.getAccount(this.account_id);
    }
    this.store.success = "";
    this.store.error = "";
    this.getListMessages();
  },
  computed: {
    ...mapState(ChatStore, [
      "success",
      "message",
      "listMessages",
      "error",
      "fileBase64",
    ]),
    ...mapState(buyerStore, ["dataAccountBuyer"]),
  },
  mounted() {
    if (!this.inteval) {
      this.inteval = setInterval(() => {
        let threadChat = document.getElementById("threadChat");
        if (threadChat) {
          this.heightChat = threadChat.scrollHeight;
          threadChat.scrollTop = threadChat.scrollHeight;
        }
        if (threadChat && this.heightChat === threadChat.scrollHeight) {
          threadChat.scrollTop = threadChat.scrollHeight;
          this.isHeight = true;
        }
      }, 500);
    } else {
      clearInterval(this.inteval);
    }
  },
  watch: {
    isHeight() {
      if (this.isHeight) {
        clearInterval(this.inteval);
        this.inteval = null;
      }
    },

    fileBase64() {
      this.file_base64 = this.fileBase64;
    },

    listMessages() {
      this.preload = true;
      this.messages = this.listMessages.messages;
      this.partner = this.listMessages.partner_info;
      this.messages.forEach((item, index) => {
        if (item.file_path) {
          if (item.file_type === "pdf") {
            this.fileList[index] = this.pdfDefault;
          } else if (item.file_type === "doc" || item.file_type === "docx") {
            this.fileList[index] = this.wordDefault;
          } else if (item.file_type === "xlsx") {
            this.fileList[index] = this.excelDefault;
          } else if (item.file_type === "ppt" || item.file_type === "pptx") {
            this.fileList[index] = this.pptxDefault;
          } else if (
            item.file_type === "jpg" ||
            item.file_type === "jpeg" ||
            item.file_type === "png" ||
            item.file_type === "gif"
          ) {
            this.fileList[index] = item.file_path;
          } else {
            this.fileList[index] = this.fileDefault;
          }
        }
      });
      this.preload = false;
    },
    success() {
      this.isHeight = false;
      this.preloadList = false;
      if (this.store.success === true) {
        this.store.success = "";
        this.store.message = "";
        this.getListMessages();
        this.message_content = "";
        this.url_file = "";
        this.file = "";
        this.inteval = setInterval(() => {
          let threadChat = document.getElementById("threadChat");
          if (threadChat) {
            this.heightChat = threadChat.scrollHeight;
            threadChat.scrollTop = threadChat.scrollHeight;
          }
          if (threadChat && this.heightChat === threadChat.scrollHeight) {
            threadChat.scrollTop = threadChat.scrollHeight;
            this.isHeight = true;
          }
        }, 500);
      }
    },
    error() {
      this.preloadList = false;
      if (this.store.error === true) {
        this.toast.error(this.store.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
      }
    },
  },
  methods: {
    searchMessage() {
      this.getListMessages();
    },

    getListMessages() {
      const dataForm = {
        id_thread: this.id_thread,
        keyword: this.keyword,
        login_type: 1,
      };
      this.store.getListMessages(dataForm);
    },

    sendMessage() {
      const dataForm = new FormData();
      dataForm.append("message_content", this.message_content);
      dataForm.append("file", this.file);
      dataForm.append("message_thread_id", this.id_thread);
      if (this.file === "" && this.message_content === "") {
        this.toast.error(
          this.Message.message_content_is_required,
          this.optionToast
        );
      } else {
        this.preloadList = true;
        this.store.sendMessage(dataForm);
      }
    },

    onFileChangeFile(e) {
      const file = e.target.files[0];
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.toast.error(this.Message.max_size_file, this.optionToast);
      } else {
        if (file.type === "application/pdf") {
          this.url_file = this.pdfDefault;
        } else if (file.type.split("/")[0] === "image") {
          this.url_file = URL.createObjectURL(file);
        } else if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          this.url_file = this.wordDefault;
        } else if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          this.url_file = this.excelDefault;
        } else if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) {
          this.url_file = this.pptxDefault;
        } else {
          this.url_file = this.fileDefault;
        }
        this.file = file;
      }
    },

    deleteImage() {
      this.url_file = "";
      this.file = "";
    },
  },
};
definePageMeta({
  layout: "buyer",
});
</script>

<style lang="scss" scoped>
#page-threadChatId {
  padding: 30px 100px;
  @include screen(480) {
    padding: 30px 50px;
  }
  .threadChatId-search {
    width: 60%;
    @include screen(480) {
      width: 100%;
    }
    .form-input-search {
      width: 100%;
      padding: 15px 25px;
      box-shadow: 0px 3px 6px #00000029 !important;
      border-radius: 8px !important;
      border: none !important;
      opacity: 1;
    }
    .icon-search {
      cursor: pointer;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      svg {
        font-size: 22px;
      }
    }
  }
  .threadChatId-content {
    margin: 30px 0 100px 0;
    &-top {
      padding: 30px 0;
      .item-avatar {
        img {
          width: 80px;
          height: 80px;
          cursor: pointer;
          border-radius: 50%;
          object-fit: cover;
          @include screen(480) {
            width: 60px;
            height: 60px;
          }
        }
      }
      .item-name {
        color: #5e5c5c;
        font-size: 22px;
        font-weight: 600;
        cursor: pointer;
        margin: 0 20px;
        @include screen(480) {
          font-size: 18px;
        }
      }
    }
    &-main {
      max-height: 700px;
      overflow-y: scroll;
      .main-chat {
        @include screen(480){
          font-size: 10px;
        }
        &-date {
          &-content {
            width: 100%;
            position: relative;
            height: 24px;
            &-text {
              color: #7e7d7d;
              width: fit-content;
              line-height: 24px;
              padding: 0 30px;
              background: #faf9f3;
              font-size: 16px;
              font-weight: 600;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 1;
            }
            &-line {
              height: 2px;
              width: 100%;
              background: #7e7d7d;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 0;
            }
          }
        }
        .chat-left {
          &-avatar {
            width: 80px;
            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          &-message {
            width: calc(100% - 80px);
            .text-message {
              padding: 20px;
              background: white;
              border-radius: 8px;
              color: #5e5c5c;
              font-weight: 600;
              @include screen(480){
                padding: 10px;
              }
            }
            .text-time {
              color: #5e5c5c;
              font-weight: 600;
            }
          }
          &-item {
            @include screen(480) {
              width: 100% !important;
            }
          }
        }
        .chat-right {
          &-message {
            padding: 20px;
            background: #5e5c5c;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            @include screen(480){
              padding: 10px;
            }
          }
          &-time {
            color: #5e5c5c;
            font-weight: 600;
            text-align: right;
          }
          &-item {
            @include screen(480) {
              width: 100% !important;
            }
          }
        }
      }
    }
    &-footer {
      .message-file {
        position: relative;
        width: 200px;
        img {
          width: 100%;
          margin-bottom: 5px;
          object-fit: cover;
        }
      }
      margin-top: 100px;
      .form-input-action {
        &-left {
          img {
            width: 25px;
            height: 25px;
            cursor: pointer;
            object-fit: cover;
          }
        }
        &-right {
          .button-send-chat {
            cursor: pointer;
          }
        }
      }
    }
  }
}
.file {
  width: 200px;
  height: auto;
  margin-bottom: 10px;
  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>