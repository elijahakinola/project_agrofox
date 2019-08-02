
<template>
  <div>
    <app-legend>
      <div class="content">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <div class="card-title"> 
                  <span v-if='toggle == false'>
                     <button class="btn btn-danger" @click="toggle = true" style="background: rgb(127, 172, 173); border-radius: 0px !important;"><i class="fa fa-plus"></i> Add Payment</button>
                  </span>
                   <span v-else-if='toggle == true'>
                     <button class="btn btn-danger" @click="toggle = false" style="background: rgb(127, 172, 173); border-radius: 0px !important;"><i class="fa fa-eye"></i> View Transaction History</button>
                  </span>
                 
                </div>
              </div>
              <div class="card-body">
                

                 
                <form method="post" v-if='toggle == true'>

                  
                  <div class="row">
                    <div class="col-md-6">
                      <label>Amount</label>
                      <input class="form-control" type="text" v-model="myForm.amount" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <label>Payment Medium</label>
                      <select class="form-control" v-model='myForm.payment_medium'>
                          <option value="bank deposit" selected> Bank Deposit </option>
                           <option value="credit card"> Credit Card </option>
                      </select>
                    </div>
                    
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Payment Date</label>
                      <input class="form-control" type="date" v-model="myForm.payment_date" />
                    </div>
                  </div>

                  <br>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Additional Information</label>
                      <textarea id="" class="form-control" cols="30" rows="10" v-model="myForm.other_information"  ></textarea>
                    </div>
                  </div>

                 
                  
                  <div class="form-button">
                    <custom-loader :loading='loading'>
                      <button
                        id="submit"
                        type="button" @click.prevent='submitForm'
                        class="btn btn-primary"
                      >Submit 
                      </button> 
                      
                    </custom-loader>
                   
                   
                  </div>
                </form>


              

                <div class="table-responsive" v-if='toggle == false'> 
                  <custom-loader :loading='loading'></custom-loader>
                  <table class="table">
                    <thead class="text-primary">
                      <th>S/N</th>
                      <th>Amount</th>
                      <th>Payment Medium</th>
                      <th>Payment Date</th>
                      <th>Other Information</th>     
                    </thead>
                    <tbody>
                      
                     
                      <tr v-for="(xd, index) in this.data" :key="xd+index">
                        <td> {{  index+1 }}</td>
                        <td> {{ xd.amount }}</td>
                        <td>{{ xd.payment_medium }}</td>
                        <td>{{ xd.payment_date | dateToHumanReadableForm }}</td>
                        <td>{{ xd.other_information }}</td>
                       
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
    "app-legend": Legend,
     
    
  },
  mixins: [pick],
  data() {
    return {
        
        routeParameters: {
            user_id: this.$route.params.user_id, 
            user_portfolio_id: this.$route.params.user_portfolio_id,   
            username: this.$route.params.username,
        },

        data: [],

        myForm: {
          amount: '',
          payment_date: '',
          payment_medium: '',
          other_information: '',
        }
        
    }
  },


 

  methods: {

    api_params: function(value){
      return { 
               user_id: this.routeParameters.user_id, 
               user_portfolio_id: this.routeParameters.user_portfolio_id,
               amount: this.myForm.amount,
               payment_medium: this.myForm.payment_medium,
               payment_date: this.myForm.payment_date,
               other_information: this.myForm.other_information,
               token: this.$store.getters.getToken
        };

    },
    async api_calls(value){

        if(value == 'GET_PAYMENT_HISTORY_FROM_PORTFOLIO_ID'){  
             // Start loader gif
             this.toggle_loading(true); 

             var response =await this.$store.dispatch('GET_PAYMENT_HISTORY_FROM_PORTFOLIO_ID',{ user_portfolio_id: this.routeParameters.user_portfolio_id, token: this.$store.getters.getToken});
             if(response.success){

                   
                    this.data = response.success;
             }


            // End loader gif
             this.toggle_loading(false); 
        
        }


         if(value == 'SUBMIT_TRANSACTION_HISTORY_BY_PORTFOLIO'){  
             // Start loader gif
             this.toggle_loading(true); 

             var response =await this.$store.dispatch('SUBMIT_TRANSACTION_HISTORY_BY_PORTFOLIO',this.api_params());
             if(response.success){

                //console.log(response.success);

                //Reload the page
                this.api_calls('GET_PAYMENT_HISTORY_FROM_PORTFOLIO_ID')
             }

  
            this.toggle = false;

            // End loader gif
             this.toggle_loading(false); 
        
        }





      
    },
    async submitForm(){
       await this.api_calls('SUBMIT_TRANSACTION_HISTORY_BY_PORTFOLIO');

    }
    

  },
  
  async created(){

        //Updating of page title
        this.$store.commit('updateTitle','Transaction_history  [ '+'LCN:'+ this.routeParameters.user_portfolio_id+' ]');
        
        //Get transaction_history using user_portfolio_id
        await this.api_calls('GET_PAYMENT_HISTORY_FROM_PORTFOLIO_ID');


  }

    
};
</script>

<style scoped>
 

</style>
