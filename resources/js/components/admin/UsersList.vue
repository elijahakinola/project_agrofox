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
                      <th></th>
                    </thead>
                    <tbody>

                      <tr v-for="( user, index) in users" :key="user+index">
                        <td> {{ index + 1 }}</td>
                        <td class="tex-left"> {{ user.surname+'  '+user.other_names }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone_no }}</td>
                        <td>
                           

                            <router-link :to="{ name: 'UserPorfolio', params: { id: user.id, name: user.surname+' '+user.other_names } }" class="btn btn-primary" >
                                    <i class="fa fa-folder-open"></i> Porfolio
                            </router-link>

                             <router-link :to="{ name: 'UsersListEdit', params: { id: user.id } }" class="btn btn-danger" style="background: rgb(127, 172, 173); border-radius: 0px !important;">
                                    <i class="fa fa-pencil"></i> Edit
                            </router-link>
                        </td>
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
        users: [],
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
          var response = await this.$store.dispatch('users_list', this.api_params());

          if(response && 'status' in response){
            if(response.status == 200){
             
                this.users = response.data.message;
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
        this.$store.commit('updateTitle','View Users');

        ///// Fetching list of registered users
        this.api_calls();


         

    }

    
};
</script>

<style scoped>
 

</style>
