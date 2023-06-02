<template>
  <div class="wrap-admin">
    <div class="wrap-admin-main">
      <!-- header -->
      <div class="wrap-admin-header">
        <span class="wrap-admin-header-name">Administrator</span>
        <div class="wrap-admin-header-icon" v-on:click="setShowSettings">
          <img src="~/assets/images/avatar.png" alt />
        </div>
        <div v-show="showSetting" class="wrap-admin-header-setting">
          <div class="wrap-admin-header-setting-logout">
            <button v-on:click="logoutBtn()">Logout</button>
          </div>
        </div>
      </div>
      <!-- content -->
      <div class="wrap-admin-content">
        <div
          class="wrap-admin-content-sidebar"
          v-bind:class="{ showsidebar: sidebar }"
        >
          <div class="wrap-admin-content-sidebar-header">
            <span class="w-full h-full flex items-center justify-center">
              <b-img
                src="/assets/images/subsQ_logo3.svg"
                class="h-75"
                alt="Responsive image"
              ></b-img>
            </span>
            <button v-on:click="toggleSidebar" class="_btnShowSidebar">
              <BootstrapIcon
                icon="list"
                v-bind:class="{ _iconShowSidebar: iconshowsidebar }"
              />
            </button>
          </div>
          <ul class="wrap-admin-content-sidebar-content">
            <li class="sidebar-content-item">
              <NuxtLink to="/admin/user/list">
                <div class="sidebar-content-item-icon">
                  <BootstrapIcon icon="person-fill" size="2x" />
                </div>
                会員管理
              </NuxtLink>
            </li>
            <!-- <li class="sidebar-content-item">
              <NuxtLink to="/admin/tag/list">
                <div class="sidebar-content-item-icon">
                  <BootstrapIcon icon="tags-fill" size="2x" />
                </div>
                タグ管理
              </NuxtLink>
            </li> -->
            <li class="sidebar-content-item">
              <NuxtLink to="/admin/service-manage">
                <div class="sidebar-content-item-icon">
                  <BootstrapIcon icon="card-list" size="2x" />
                </div>
                サービス管理
              </NuxtLink>
            </li>
            <li class="sidebar-content-item">
              <NuxtLink to="/admin/chat/thread/list">
                <div class="sidebar-content-item-icon">
                  <BootstrapIcon icon="chat-text-fill" size="2x" />
                </div>
                メッセージボックス
              </NuxtLink>
            </li>
            <li class="sidebar-content-item">
              <NuxtLink to="/admin/contact/list">
                <div class="sidebar-content-item-icon">
                  <BootstrapIcon icon="patch-question-fill" size="2x" />
                </div>
                お問い合わせ
              </NuxtLink>
            </li>
            <li class="sidebar-content-item">
              <NuxtLink to="/admin/payment/list">
                <div class="sidebar-content-item-icon">
                  <BootstrapIcon icon="credit-card" size="2x" />
                </div>
                決済管理
              </NuxtLink>
            </li>
            <li class="sidebar-content-item">
              <NuxtLink to="/admin/review/list">
                <div class="sidebar-content-item-icon">
                  <BootstrapIcon icon="star-fill" size="2x" />
                </div>
                レビュー管理
              </NuxtLink>
            </li>
          </ul>
          <div class="wrap-admin-content-sidebar-footer">
            <button v-on:click="toggleSidebar">
              <BootstrapIcon class="sidebar-footer-icon" icon="chevron-left" />
            </button>
          </div>
        </div>
        <main
          class="wrap-admin-content-mainNuxt"
          v-bind:class="{ _fullWidthMainNuxt: !sidebar }"
        >
          <div class="page-content"><slot /></div>
        </main>
      </div>

      <!-- footter -->
      <section class="wrap-admin-footer">
        <div class="copyright">Copyright© 2022 株式会社ＳＴＵＣＣＯ</div>
      </section>
    </div>
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import Cookies from "js-cookie";
export default {
  auth: false,
  components: {
    BootstrapIcon,
  },
  setup() {
    const route = useRoute();

    useHead({
      // title: computed(() => `${route.meta.title}`)
      title: computed(() => `subsQ - サブスクマッチングサービスのサブスキュー`),
    });
  },
  data() {
    return {
      showSetting: false,
      sidebar: true,
      iconshowsidebar: true,
    };
  },
  created() {
    let valueToken = localStorage.getItem("token_admin");
    let user_type = localStorage.getItem("type_admin");
    if (!valueToken) {
      this.$router.push("/admin/login");
    } else {
      if (user_type !== "ADMIN") {
        localStorage.removeItem("token_admin");
        localStorage.removeItem("account_id");
        localStorage.removeItem("type");
        this.$router.push("/admin/login");
      }
    }
    if ( window.innerWidth <= 1200 ) {
        this.sidebar = false;
        this.iconshowsidebar = false;
      } else {
        this.sidebar = true;
        this.iconshowsidebar = true;
      }
    window.addEventListener('resize', () => {
      if ( window.innerWidth <= 1200 ) {
        this.sidebar = false;
        this.iconshowsidebar = false;
      } else {
        this.sidebar = true;
        this.iconshowsidebar = true;
      }
    })
  },
  methods: {
    setShowSettings() {
      this.showSetting = !this.showSetting;
    },
    logoutBtn() {
      Cookies.remove("account_id");
      localStorage.removeItem("account_id");
      Cookies.remove("token_admin");
      localStorage.removeItem("token_admin");
      this.$router.push("/admin/login");
    },
    toggleSidebar() {
      this.sidebar = !this.sidebar;
      this.iconshowsidebar = !this.iconshowsidebar;
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap-admin {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  &-main {
    width: 100%;
    font-size: 14px;
  }
  &-header {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    background-color: #423931;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    z-index: 999;
    &-name {
      margin-right: 5px;
      color: #fff;
    }
    &-icon {
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 1rem;
      position: relative;
      cursor: pointer;
      background-color: #b8b8b8;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &-setting {
      background-color: #423931;
      position: absolute;
      top: 72px;
      padding: 10px 30px;
      right: 4px;
      border-radius: 5px;
      border: 1px solid #fff;
      box-shadow: 1px 1px 4px 1px #717171;
      color: #fff;
      &::after {
        content: "";
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 13px solid transparent;
        position: absolute;
        border-top: 11px solid #423931;
        top: -11px;
        right: 33px;
        transform: rotate(180deg);
      }
      &-logout {
        background-color: transparent;
        width: 100%;
        button {
          width: 100%;
          background-color: transparent;
          color: #fff;
          border: none;
        }
      }
    }
  }
  &-content {
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    &-sidebar {
      width: 0px;
      background-color: #fff;
      transform: translateX(-270px);
      transition: all 0.2s linear;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
      bottom: 0;
      &-header {
        width: 270px;
        position: relative;
        height: 64px;
        display: flex;
        align-items: center;
        @include screen(767) {
          width: 300px;
        }
        ._logo {
          margin-left: 1rem;
          transition: all 0.2s linear;
        }
        ._btnShowSidebar {
          color: #fff;
          font-size: 35px;
          background-color: transparent;
          border: none;
          position: absolute;
          right: -50px;
          top: 16px;
          transition: all 0.2s linear;
          @include screen(767) {
            right: -20px;
          }
        }
        button {
          ._iconShowSidebar {
            display: none;
          }
        }
      }
      &-content {
        height: calc(100% - 114px);
        padding-top: 20px;
        padding-left: 0;
        .sidebar-content-item {
          background-color: transparent;
          padding: 10px;
          margin: 10px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
          a {
            color: #423931;
            font-size: 16px;
            padding: 10px 20px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            font-weight: 500;
            text-decoration: none;

            &:hover {
              background-color: #423931;
              opacity: 0.9;
              color: #fff;
            }
          }
          &-icon {
            width: 25px;
            height: 25px;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
          }
        }
      }
      &-footer {
        width: 100%;
        background-color: #d9d9d9;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          border: none;
        }
        .sidebar-footer-icon {
          color: #000000;
          font-size: x-large;
          margin-right: 1rem;
        }
      }
    }
    .showsidebar {
      transform: translateX(0);
      transition: all 0.2s linear;
      width: 270px;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      @include screen(767) {
        &::before {
          content: "";
          width: calc(100vw - 270px);
          position: absolute;
          background-color: #000;
          opacity: 0.15;
          height: 100%;
          left: 100%;
          top: 0;
        }
      }
    }
    &-mainNuxt {
      width: calc(100% - 270px);
      margin-top: 64px;
      margin-left: 270px;
      transition: all 0.2s linear;
      min-height: 85vh;
      background-color: #ebedef;
      @include screen(767) {
        width: 100%;
        margin-left: 0;
      }
    }
    ._fullWidthMainNuxt {
      transition: all 0.2s linear;
      width: 100%;
      margin-left: 0;
    }
  }

  &-footer {
    width: 100%;
    height: 50px;
    background-color: #888888;
    color: #fff;
    display: flex;
    align-items: center;
    .copyright {
      font-size: 18px;
      font-weight: 500;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  a.nuxt-link-exact-active {
    color: #fff !important;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #423931;
  }
  @keyframes slide-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(0px);
      transform: translateX(0px);
    }
  }
}

.wrap-admin:deep{
  .pagi-components{
    @include screen (480) {
      margin-top: 20px;
    }
    .page-item {
      .page-link {
        padding: 6px;
      }
    }
  }
}
</style>
