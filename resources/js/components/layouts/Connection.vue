<template>
  <!-- @detected-condition fires when the connectivity status of the device changes -->
  <offline @detected-condition="handleConnectivityChange">
    <!-- Only renders when the device is online -->
    <div slot="online">
      <!-- <p v-if='internet_status == true' > you're online!</p> -->

      

      <span v-if='internet_status == false'  class="" >
          <div class="alert alert-danger animated lightSpeedIn delay-2s" style="margin: 0 0 0 0%;padding-bottom: 0.5rem; padding-top: 0.5rem; font-size: 12px; background-color: #bd3e42!important">
               <i class="fa fa-bell-slash"></i> No internet connectiony
               
          </div>
      </span>
      
    </div>
    
  </offline>
</template>

<script>
import offline from 'v-offline';

export default {
  components: {
    offline
  },
  data(){
      return {
          internet_status: true
      }
  },

  methods: {
    handleConnectivityChange(status) {
        this.internet_status =status;
    }
  }
}
</script>