
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
               
                <form class="form-inline" method="post">
                    <div class="form-group">
                      <input type="text" class="form-control" v-model="search" id="search" placeholder="Search">
                      
                      <custom-loader :loading="loading">
                              <button
                              id="submit"
                              type="button"
                              @click.prevent="searchForm"
                              class="btn btn-info" style="margin-left: 10px;"
                        >Search</button>
                      </custom-loader>
                     
                    </div>
                  </form>
                <div class="table-responsive">
                  <table class="table">
                    <thead class="text-primary">
                      <th>S/N</th>
                      <th>Subsciber Name</th>
                      <th>Room Type</th>
                      <th>Payment Plan </th>
                      <th>Amount</th>
                      <th>Action</th>
                    </thead>
                    <tbody>

                      <tr v-for="( portfolio, index) in portfolios" :key="portfolio+index">
                        <td> {{ index + 1 }}</td>
                        <td class="tex-left"> {{ portfolio.user_id }}</td>
                        <td> {{ portfolio.room_type }} </td>
                        <td> {{ portfolio.payment_plan }}</td>
                        <td> &#8358; {{ portfolio.amount }}</td>
                        <td>

                             <router-link :to="{ name: 'UserPortfolioEdit', params: { id: portfolio.id, user_id: portfolio.user_id} }"  class="btn btn-primary" style="font-size: 10px" >
                                    <i class="fa fa-folder-open"></i> Payment History
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
        portfolios: [],
        search: 'all'
        
    }
  },
  methods: {
     api_params: function(value){

        if(value == 'FETCH_ALL_PORTFOLIOS'){
             return { token: this.$store.getters.getToken, search: this.search };
        }

        if(value == 'FETCH_ALL_PORTFOLIO_SEARCH'){
             return { token: this.$store.getters.getToken, search: this.search };
        }
     

    },
    async api_calls(value){


      if(value == 'FETCH_ALL_PORTFOLIOS'){
          
          let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('portfolio_list', this.api_params(value));

           if(response && 'status' in response){
            if(response.status == 200){

                this.portfolios = response.data.message;
            }
          }
          // End loader gif
          this.toggle_loading(false);
   
      }


      if(value == 'FETCH_ALL_PORTFOLIO_SEARCH'){
         let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('portfolio_list_search', this.api_params(value));

           if(response && 'status' in response){
            if(response.status == 200){

              

                this.portfolios = response.data.message;
            }
          }
          //console.log(response);
          // End loader gif
          this.toggle_loading(false);
      }

      
       

    },
    searchForm(){

      if(this.search != ''){
        //searching all portfolio table

        if(this.search == 'all'){
            this.api_calls('FETCH_ALL_PORTFOLIO');
        }else{
           this.api_calls('FETCH_ALL_PORTFOLIO_SEARCH');
        }
        
      
      }
       

    },

    refresh(){
        ///// Fetching list of  portfolio
        this.api_calls('FETCH_ALL_PORTFOLIOS');
    }
    
  
    
  },
   created(){

        // Updating title meta tag
        this.$store.commit('updateTitle','Portfolios');

       //refreshing the page
       this.refresh();
        

       


         

    }

    
};
</script>

<style scoped>
 

</style>
