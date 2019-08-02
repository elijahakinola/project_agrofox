
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
                      <th>Transaction ID</th>
                      <th>Portfolio ID</th>
                      <th>Subsciber Name</th>
                      <th>Amount</th>
                      <th>Medium </th>
                      <th>Comments</th>
                      <th>Date</th>
                      <th>Action</th>
                    </thead>
                    <tbody>

                      <tr v-for="( transaction, index) in transactions" :key="transaction+index">
                        <td> {{ index + 1 }}</td>
                        <td>{{ transaction.transaction_id }}</td>
                        <td> LC- {{ transaction.user_portfolio_id }}</td>
                        <td class="tex-left"> {{ transaction.user_id }}</td>
                        <td> &#8358;  {{ transaction.amount }} </td>
                        <td> {{ transaction.payment_medium }} </td>
                        <td>{{ transaction.comments }} </td>
                        <td>  {{ transaction.payment_date }}</td>
                        
                        <td>
                          <router-link :to="{ name: 'UserPortfolioEdit', params: { id: transaction.id, user_id: transaction.user_id} }" tag='button' class="btn btn-info"><i class="fa fa-eye-slash"></i> View </router-link>
                           

                            
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
        transactions: [],
        search: 'all'
        
    }
  },
  methods: {
     api_params: function(value){

        if(value == 'FETCH_ALL_TRANSACTIONS'){
             return { token: this.$store.getters.getToken, search: this.search };
        }

        if(value == 'FETCH_ALL_TRANSACTIONS_SEARCH'){
             return { token: this.$store.getters.getToken, search: this.search };
        }
     

    },
    async api_calls(value){


      if(value == 'FETCH_ALL_TRANSACTIONS'){
          
          let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('transaction_list', this.api_params(value));

           if(response && 'status' in response){
             //console.log(response.data.message)
            if(response.status == 200){

                this.transactions = response.data.message;
            }
          }
          // End loader gif
          this.toggle_loading(false);
   
      }


      if(value == 'FETCH_ALL_TRANSACTIONS_SEARCH'){
         let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('transaction_list_search', this.api_params(value));

           if(response && 'status' in response){
            if(response.status == 200){

              

                this.transactions = response.data.message;
            }
          }
          //console.log(response);
          // End loader gif
          this.toggle_loading(false);
      }

      
       

    },
    searchForm(){

      if(this.search != ''){
        //searching all transactions table

        if(this.search =='all'){
          this.api_calls('FETCH_ALL_TRANSACTIONS');
        }else{
          this.api_calls('FETCH_ALL_TRANSACTIONS_SEARCH');
        }
         
      
      }
       

    },

    refresh(){
        ///// Fetching list of  transactions
        this.api_calls('FETCH_ALL_TRANSACTIONS');
    }
    
  
    
  },
   created(){

        // Updating title meta tag
        this.$store.commit('updateTitle','Transaction History');

       //refreshing the page
       this.refresh();
        

       


         

    }

    
};
</script>

<style scoped>
 

</style>
