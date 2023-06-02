<template>
  <div class="service-step flex justify-between ">
    <div class="step-left">
      <div>
        <h5 class="text">STEP</h5>
        <h4 class="number">{{ number }}</h4>
      </div>
    </div>
    <div class="step-right">
      <div class="card row p-3 py-5 shadow border-0 flex-wrap">
        <div
          class="
            col-lg-5 col-12
            flex
            justify-start
            md:justify-center
            self-center
            card-left
            items-center
            h-full
            text-center text-[#5e5c5c]
          "
        >
          {{ title !== "自由入力" ? title : "" }}
        </div>
        <div
          class="
            col-lg-7 col-12
            flex
            justify-center
            self-center
            card-right
            items-center
            h-full
            text-center
            white-space
          "
          v-if="content !== ''"
        >
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SDServiceStep",
  props: {
    number: {
      type: String,
      default: "01",
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.service-step {
  //--left-width: 100px;
  //--bg-data: transparent linear-gradient(135deg, #ff9792 0%, #fd8857 100%) 0%
 // 0% no-repeat padding-box;
  //@include screen(01023) {
   // --left-width: 70px;
  //}
  // --- Global Style ---
  position: relative;
  text-align: center;
  .step-left {
    .text {
      color: $white;
      font: normal normal bold 16px/35px Europa-Bold;
    }
    .number {
      font: normal normal bold 45px/29px Europa-Bold;
      color: $white;
    }
  }
  .step-right {
    .card {
      background: $white 0% 0% no-repeat padding-box;
      opacity: 1;
      max-width: 100%;
      &-left {
        opacity: 1;
      }
      &-right {
        color: #7e7d7d;
        opacity: 1;
        word-break: break-word;
        font: normal normal bold 16px/30px Noto Sans CJK JP;
      }
      @include screen(01023) {
        margin: 0;
        padding: 0.25rem;
        padding-top: 1.5rem!important;
        padding-bottom: 1.5rem!important;
        &-left, &-right {
          text-align: left!important;
        }
        &-left {
          font-weight: bold;
        }
        &-right {
          font-weight: normal;
          font-size: 12px;
          line-height: 1.6;
          margin-top: 10px;
        }
      }
    }
  }
  // --- PC Style ---
  @include screen(1024) {
  margin-top: -42px;
  height: 400px;
  .step-left {
    background: var(--bg-data);
    opacity: 0.9;
    
    height: 403px;
    width: var(--left-width);
    position: absolute;
    clip-path: polygon(0 0, 0 85%, 50% 100%, 100% 85%, 100% 0, 50% 15%);
    @include screen(480) {
      width: var(--left-width);
    }
    .text {
      letter-spacing: -0.16px;
      color: $white;
      font: normal normal bold 16px/35px Europa-Bold;
      margin-top: 70%;
      @include screen(01023) {
        font-size: 0.6rem;
      }
      @include screen(480) {
        margin-top: 70px;
      }
    }
    .number {
      font: normal normal bold 45px/29px Europa-Bold;
      letter-spacing: 0px;
      color: $white;
    }
  }
  &:first-child {
    position: unset;
    margin-top: unset;
    height: 355px;
    @include screen(480) {
      height: 250px;
    }
    .step-left {
      height: 355px;
      //clip-path: polygon(0 0, 0 84%, 50% 100%, 100% 84%, 100% 0, 0 0);
      .text {
        margin-top: 10%;
      }
      @include screen(480) {
        height: 230px;
      }
    }
    .step-right {
      padding: 26px 20px 48px 10px;
      margin-top: unset;
      @include screen(480) {
        height: 230px;
      }
    }
  }
  .step-right {
    padding: 26px 20px 48px 10px;
    width: 100%;
    height: 345px;
    margin-top: 45px;
    margin-left: 130px;
    @include screen(480) {
      margin-left: 75px;
    }
    .card {
      border-radius: 19px;
      @include screen(480) {
        height: 100% !important;
        padding: 20px !important;
      }
      &-left {
        letter-spacing: 0.9px;
        opacity: 1;
        
        @include screen(991) {
          height: 50% !important;
        }
      }
      &-right {
        letter-spacing: 0.8px;
        color: #7e7d7d;
        @include screen(991) {
          height: 50% !important;
        }
        @include screen(480) {
          padding: 10px !important;
          font-size: 14px;
          height: 50% !important;
        }
      }
    }
  }
  }
  // --- SP Style ---
  @include screen(01023) {
    --main-bg: #faf9f3;
    .step-left {
      width: var(--left-width);
      overflow: hidden;
      position: relative;
      min-height: 130px;
      &::after {
        content: "";
        display: inline-block;
        width: var(--left-width);
        padding-top: var(--left-width);
        border-bottom: 4px solid var(--main-bg);
        border-right: 4px solid var(--main-bg);
        transform: rotate(45deg);
    }
      .text {
        font-size: 0.7rem;
      }
    }
    .step-right {
      width: calc(100% - var(--left-width) - 25px);// screen - left-width - space-between

    }
    .step-left,.step-right {
      padding-bottom: 15px;
    }
  }
}
</style>
