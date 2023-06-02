<template>
  <div class="sdHeader">
    <b-container fluid>
      <div class="sdHeader-header-top flex relative justify-center w-full">
        <Nuxt-link to="/">
          <div
            class="
              text-end
              sdHeader-subscription-service
              flex
              items-center
              justify-center
            "
          >
            <img src="~/assets/images/subsQ_logo3.svg" class="img-logo" />
            <span class="mx-3">サブスクマッチングサービスのサブスキュー</span>
          </div>
        </Nuxt-link>
        <div
          class="
            sdHeader-icon-contact
            text-end
            flex
            items-center
            justify-center
            absolute
          "
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
    </b-container>
  </div>
</template>
<script>
import SDIcon from "@/components/SDIcon";
import Sidebar from "@/components/SDSideBar";
import Cookies from "js-cookie";

export default {
  name: "Header",
  components: { SDIcon, Sidebar },
  data() {
    return {
      dataToken: false,
      isActive: false,
    };
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    let valueToken = null;
    if(rememberLogin === 'true') {
      valueToken = localStorage.getItem("token_user");
    } else {
      valueToken = Cookies.get("token_user");
    }
    
    if (!valueToken) {
      this.dataToken = true;
    } else {
      this.dataToken = false;
    }
  },
  methods: {
    toggleSidebar() {
      this.isActive = !this.isActive;
      // this.$emit("toggleSidebar", this.isActive);
    },
  },
};
</script>
<style lang="scss" scoped>
.sdHeader {
  height: 100%;
  .container-fluid {
    padding-right: unset !important;
    padding-left: unset !important;
  }
  svg {
    cursor: pointer;
    font-size: 24px;
  }
  &-header-top {
    padding: 24px 0;
    border-bottom: 2px solid $graybland;
    top: 0px;
    left: 0px;
    /* UI Properties */
    background: #fff 0% 0% no-repeat padding-box;
    background: #ffffff 0% 0% no-repeat padding-box;
    opacity: 1;
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
    .icon-sidebar {
      font-size: 30px;
      display: none;
      left: 50px;
      @include screen(1280) {
        display: block;
      }
    }
  }
  .list-sidebar-sp {
    display: none;
    @include screen(1280) {
      display: block;
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
      background: $white;
      max-height: unset;
      min-height: unset;
    }
    &.active {
      .sdSidebar {
        transform: translateX(0%);
      }
      .backdrop {
        transform: translateX(0%);
      }
    }
  }
  &-account {
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