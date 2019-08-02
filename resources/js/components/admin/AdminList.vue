
<template>
  <div>
    <app-legend>
      <div class="content">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title"></h4>
              </div>
              <div class="card-body">
                 <custom-loader :loading='loading'></custom-loader>
                <div class="table-responsive">
                  <table class="table">
                    <thead class="text-primary">
                      <th>S/N</th>
                      <th class="tex-left">Full Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Role</th>
                    </thead>
                    <tbody>

                      <tr v-for="( admin, index) in admins" :key="admin+index">
                        <td> {{ index + 1 }}</td>
                        <td class="tex-left"> {{ admin.name }}</td>
                        <td>{{ admin.email }}</td>
                        <td>{{ admin.telephone }}</td>
                        <td>{{ admin.role }}</td>
                      </tr>
                      
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-legend>
  </div>
</template>

<script>
import Legend from "../layouts/Legend";
import { pick } from "../../repositories/pick";

export default {
  components: {
    "app-legend": Legend
  },
  mixins: [pick],
  data() {
    return {
        admins: [],
        loading: false
    }
  },
  methods: {
     api_params: function(value){
      return { token: this.$store.getters.getToken };

    },
    async api_calls(){

      
          // Start loader gif
          this.toggle_loading(true);
          var response = await this.$store.dispatch('admin_list', this.api_params());

          if(response && 'status' in response){
            if(response.status == 200){
             
                this.admins = response.data.message;
            }
          }

            // End loader gif
          this.toggle_loading(false);
       

    },
    validator: function(value){

    },
    toggle_loading: function(value){

      this.loading = value;

    },
    
  },
   created(){

        // Updating title meta tag
        this.$store.commit('updateTitle','View Admin');

        ///// Fetching list of registered admin
        this.api_calls();


         

    }

    
};
</script>

<style scoped>
 

</style>
