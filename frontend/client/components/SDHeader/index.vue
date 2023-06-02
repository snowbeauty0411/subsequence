<template>
  <div class="sdHeader">
    <b-container fluid>
      <div class="sdHeader-header-top flex relative w-full">
        <div class="absolute icon-search" v-on:click="toggleSearchbar">
          <img src="@/assets/images/iconSearch.png" width="18"/>
        </div>
        <div class="absolute icon-sidebar" v-on:click="toggleSidebar">
          <SDIcon icon="list" />
        </div>
        <div
          class="list-sidebar-sp"
          :class="{ active: isActive || isSearchActive }"
        >
          <div class="backdrop" v-on:click="closeAllSideBar" />
          
          <MenuSP :class="{ active: isActive }" @closeSideBar="closeAllSideBar"  :isMember="isMember"/>
          <SearchbarSP :class="{ active: isSearchActive }" />
        </div>
        <div class="sdHeader-logo">
          <Nuxt-link to="/">
            <div
              class="text-end sdHeader-subscription-service flex items-center justify-center"
            >
              <img src="~/assets/images/subsQ_logo3.svg" class="img-logo" />
              <span class="mx-3">サブスクマッチングサービスのサブスキュー</span>
            </div>
          </Nuxt-link>
        </div>
        <div
          class="sdHeader-icon-contact text-end flex items-center justify-center absolute"
        >
          <a href="#"
            ><img class="pl-3" src="~/assets/images/facebookH.svg"
          /></a>
          <a href="#"><img class="pl-3" src="~/assets/images/cameraH.svg" /></a>
          <a href="#"
            ><img class="pl-3" src="~/assets/images/twitterH.svg"
          /></a>
        </div>
      </div>
      <div class="sdHeader-account flex justify-end" v-if="dataToken">
        <Nuxt-link to="/login">
          <div class="sdHeader-login">ログイン</div>
        </Nuxt-link>
        <Nuxt-link to="/signup">
          <div class="sdHeader-create-account">アカウント作成</div>
        </Nuxt-link>
      </div>
      <SDHeaderTopPage v-else />
    </b-container>
  </div>
</template>
<script>
import SDHeaderTopPage from "@/components/SDHeaderTopPage";
import SDIcon from "@/components/SDIcon";
import MenuSP from "@/components/SDMenuSP";
import SearchbarSP from "@/components/SDSearchSP";
import Cookies from "js-cookie";

export default {
  name: "Header",
  components: { SDHeaderTopPage, SDIcon, MenuSP, SearchbarSP },
  data() {
    return {
      dataToken: false,
      isActive: false,
      isSearchActive: false,
      isMember: false
    };
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    let valueToken = null;
    if (rememberLogin === "true") {
      valueToken = localStorage.getItem("token_user");
    } else {
      valueToken = Cookies.get("token_user");
    }

    if (!valueToken) {
      this.dataToken = true;
    } else {
      this.dataToken = false;
      this.isMember = true;
    }
  },
  methods: {
    testData() {
      console.log('hello');
    },
    closeAllSideBar() {
      this.isActive = false;
      this.isSearchActive = false;
    },
    toggleSidebar() {
      this.isActive = !this.isActive;
    },
    toggleSearchbar() {
      this.isSearchActive = !this.isSearchActive;
    },
  },
};
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.sdHeader {
  position: sticky;
  //height: 100%;
  width: 100%;
  z-index: 1000;
  left: 0;
  top: 0;
  @include screen(767) {
    //position: fixed;
    //width: 100%;
    z-index: 1000;
    //height: unset;
    .header-manage {
      display: none;
    }
  }
  .container-fluid {
    padding-right: unset !important;
    padding-left: unset !important;
  }
  svg {
    cursor: pointer;
    font-size: 24px;
  }
  &-logo {
    @include screen(767) {
      max-width: 21.73%;
    }
  }
  &-header-top {
    padding: 24px 0 24px 30px;
    border-bottom: 2px solid $graybland;
    top: 0px;
    left: 0px;
    /* UI Properties */
    background: #fff 0% 0% no-repeat padding-box;
    background: #ffffff 0% 0% no-repeat padding-box;
    opacity: 1;
    justify-content: center;
    @include screen(767) {
      justify-content: flex-start;
  }

    .sdHeader-subscription-service {
      font-size: 14px;
      @include screen(991) {
        padding-right: unset;
      }
      font-weight: bold;
      span {
        color: $gray-800;
        @include screen(991) {
          display: none;
        }
      }
      .img-logo {
        height: 30px;
      }
    }
    .sdHeader-icon-contact {
      padding: 11px 42px;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      @include screen(991) {
        display: none;
      }
      @include screen(480) {
        padding: 11px 30px;
      }
      a {
        color: $black;
        padding-right: 30px;
        @include screen(991) {
          padding-right: 20px;
        }
        @include screen(480) {
          padding-right: 10px;
        }
      }
    }
    .icon-sidebar,
    .icon-search {
      @include screen(767) {
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .icon-sidebar {
      font-size: 30px;
      display: none;
      left: 50px;
      @include screen(1280) {
        display: block;
      }
      @include screen(767) {
        right: 19px;
        left: unset;
      }
    }
    .icon-search {
      font-size: 30px;
      display: none;
      right: 60px;
      @include screen(767) {
        display: block;
        svg {
          font-size: 18px;
          margin: 0;
        }
      }

    }
  }
  .list-sidebar-sp {
    display: none;
    @include screen(1280) {
      display: block;
    }
    @include screen(767) {
      right: 19px;
      left: unset;
    }
  .icon-search {
    font-size: 30px;
    display: none;
    right: 60px;
    @include screen(767) {
      display: block;
      svg {
        font-size: 18px;
        margin: 0;
      }
    }
  }
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateX(100%);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(5px);
      background-color: #0000008f;
      z-index: 1031;
    }
    .sdSidebar {
      overflow-y: scroll;
      position: fixed;
      transform: translateX(-100%);
      top: 0;
      left: 0;
      bottom: 0;
      height: 100vh;
      transition: all 0.5s;
      z-index: 1031;
      display: flex;
      flex-flow: column;
      flex-shrink: 1;
      width: 350px;
      //background: $white;
      //max-height: unset;
      //min-height: unset;
    }
    &.active {
      .sdSidebar {
        &.active {
          transform: translateX(0%);
        }
      }
      .backdrop {
        transform: translateX(0%);
      }
    }
  }
  &-account {
    @include screen(1280) {
      display: none;
    }
    @include screen(991) {
      width: 100%;
    }
    div {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 80px;
      text-align: center;
      cursor: pointer;
      color: $gray-800;
      font-weight: 600;
    }
    a {
      &:hover {
        color: black;
      }
      .sdHeader-login {
        width: 160px;
        @include screen(991) {
          width: 160px;
        }
      }
    }
    .sdHeader-create-account {
      color: $white;
      width: 236px;
      background-color: $orange;
      @include screen(991) {
        width: 160px;
      }
    }
  }
}
</style>
