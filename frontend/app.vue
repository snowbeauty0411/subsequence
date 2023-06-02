<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>
<script lang="ts">
import NuxtPage from '~~/client/pages/index.vue'
export default {
  components:{
    NuxtPage
  }
}
</script>

<script lang="ts" setup>
import '@/assets/css/tailwind.css'
</script>