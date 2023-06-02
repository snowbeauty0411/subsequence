<template>
  <div class="page-service-map" v-if="center.lat !== '' && center.lng !== ''">
    <div class="page-service-map-title">MAP</div>
    <div class="page-service-map-content">
      <GoogleMap
        :api-key="google_api_key"
        style="width: 100%;"
        class="map-box"
        :center="{ lat: parseFloat(center.lat), lng: parseFloat(center.lng) }"
        :zoom="15"
        v-if="center.lat !== '' && center.lng !== ''"
      >
        <Marker
          :options="{
            position: {
              lat: parseFloat(center.lat),
              lng: parseFloat(center.lng),
            },
          }"
          :clickable="true"
          :draggable="true"
        />
      </GoogleMap>
      <div class="page-service-map-content-textName">{{ address }}</div>
    </div>
  </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";
import { Urls } from "@/utils/urls";
import { ServiceStore } from "@/store/service/index.ts";
import { mapState } from "pinia";

export default {
  name: "ServiceMap",
  components: { GoogleMap, Marker },
  setup() {
    const google_api_key = Urls.GOOGLE_API_KEY;
    const serviceStore = ServiceStore();
    return { google_api_key, serviceStore };
  },
  data() {
    return {
      center: { lat: "", lng: "" },
      address: "",
    };
  },
  computed: {
    ...mapState(ServiceStore, ["detailService"]),
  },
  watch: {
    detailService() {
      if (this.detailService.lng && this.detailService.lat) {
        this.center.lat = this.detailService.lat;
        this.center.lng = this.detailService.lng;
      }
      this.address = this.detailService.address;
    },
  },
};
</script>

<style lang="scss"></style>
