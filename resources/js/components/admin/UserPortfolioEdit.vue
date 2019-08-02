
<template>
  <div>
    <app-legend>
        <div class="content" >
          <div class="row">
            <div class="col-md-12">
              <div class="card ">
                <div class="card-header ">
                  <div style="float: left;">
                    <a  @click="$router.go(-1)"><i class="fa fa-arrow-left"></i> Back</a>
                    <br><br>
                    
                    <h5 class="card-title">Portfolio ID: LC-{{ portfolio_id }} </h5>
                    <p class="card-category">Add Payment to <code style="font-size: 100%; color: #51bcda">{{ fullname }} </code> portfolio</p>
                  </div>
                  <div class="row" style="float: right;">
                    <div class="col-md-12">
                      <div class="list-group">
                        <a href="#" class="list-group-item">Total Expected Payment - &#8358; {{ portfolio_transaction_summary.expected_payment}}</a>
                        <a href="#" class="list-group-item">Total Amount Paid - &#8358; {{ portfolio_transaction_summary.total_amount_paid}}</a>
                        <a href="#" v-bind:class="classObject"><b>Outstanding  - &#8358; {{ portfolio_transaction_summary.outstanding}}</b></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body ">
                  <custom-loader :loading='loading'></custom-loader>
                  <form method="post">
                    <div class="row">
                      <div class="col-md-2">
                        <label>Payment Amount</label>
                      </div>
                      <div class="col-md-2">
                        <label>Date</label>
                      </div>
                       <div class="col-md-3">
                        <label>Payment Medium</label>
                      </div>
                      <div class="col-md-4">
                        <label>Comment</label>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="col-md-2">
                        <input class="form-control" type="text" v-model="formData.amount" value="500,000">
                      </div>
                      <div class="col-md-2">
                        <input class="form-control" type="date" v-model="formData.payment_date" name="date">
                      </div>
                       <div class="col-md-3">
                         <select class="form-control" type="text"  v-model="formData.payment_medium" style="height: 31px;">
                          
                          <option value='bank-deposit'> Bank Deposit </option>
                          <option value='credit-card'> Credit Card </option>
                          
                        </select>

                      </div>
                      <div class="col-md-4">
                        <input class="form-control" type="text"  v-model="formData.comments">
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-button">
                          <custom-loader :loading="loading">
                              <button
                              id="submit"
                              type="button"
                              @click.prevent="submitForm('SUBMIT_PAYMENT_ADD_FORM')"
                              class="btn btn-info"
                            ><i class="fa fa-plus"></i> Add Payment</button>
                          </custom-loader>
              
                        </div>
                      </div>
                    </div>
                  </form>
                  <br><br>
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th class="tex-left">S/N</th>
                        <th class="tex-left">Transaction ID</th>
                        <th class="tex-left">Owned by</th>
                        <th class="tex-left">Payments</th>
                        <th class="tex-left">Medium</th>
                        <th class="tex-left">Date</th>
                        <th class="tex-left">Comment</th>
                      </thead>
                      <tbody>
                        <tr v-for="(portfolio_transaction, index) in portfolio_transactions" :key="index+portfolio_transaction">
                          <td class="tex-left"> {{ index + 1 }}</td>
                          <td class="tex-left"> {{ portfolio_transaction.transaction_id }}</td>
                          <td class="tex-left"> {{ fullname }}</td>
                          <td class="tex-left">&#8358; {{ portfolio_transaction.amount }}</td>
                          <td class="tex-left">{{ portfolio_transaction.payment_medium }}</td>
                          <td class="tex-left">{{ portfolio_transaction.payment_date }}</td>
                          <td class="tex-left">{{ portfolio_transaction.comments }}</td>
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
        
        portfolio_id: this.$route.params.id,
        user_id: this.$route.params.user_id,
        fullname: '',
        portfolio_transactions: [],
        portfolio_transaction_summary: {
          expected_payment: '',
          total_amount_paid: '',
          outstanding: '',
        },
        classObject: {
             'list-group-item': true,
            ' list-group-item-danger': true
          },

        formData: {
          amount: '',
          payment_medium: '',
          payment_date: '',
          comments: '',
        }
        
    }
  },

  watch: {

    'portfolio_transaction_summary.outstanding': function(val){
       if(val < 1){
          this.classObject = {
            'list-group-item': true,
            ' list-group-item-primary': true
          }
        }else if(val > 0){
          this.classObject = {
             'list-group-item': true,
            ' list-group-item-danger': true
          }
       }
      

    }

  },


 

  methods: {
    api_params: function(value){
      if(value == 'FETCH_PORTFOLIO_TRANSACTION_HISTORY'){
        return { portfolio_id: this.portfolio_id, token: this.$store.getters.getToken, user_id: this.user_id}
      }

       if(value == 'SUBMIT_PAYMENT_ADD_FORM' ){
        return {token: this.$store.getters.getToken, ...this.formData, user_portfolio_id: this.portfolio_id, user_id: this.user_id }
      }
      

    },
    async api_calls(value){

      if(value == 'FETCH_PORTFOLIO_TRANSACTION_HISTORY'){
        let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('portfolio_transaction_history', this.api_params(value));

           if(response && 'status' in response){
            if(response.status == 200){
              //console.log('Yeeeeeeeee')
                this.portfolio_transactions = response.data.message.history;
                 
                 //populating the summary
                 this.portfolio_transaction_summary.expected_payment = response.data.message.expected_payment;
                 this.portfolio_transaction_summary.total_amount_paid = response.data.message.total_amount_paid;
                 this.portfolio_transaction_summary.outstanding = response.data.message.outstanding;
                 
                 this.fullname = response.data.message.fullname;

            }

             //console.log(response.data.message)
          }
          // End loader gif
          this.toggle_loading(false);

      }



      if(value == 'SUBMIT_PAYMENT_ADD_FORM'){
       
        
         let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('portfolio_transaction_history_add', this.api_params(value));

           if(response && 'status' in response){
             
            if(response.status == 200){

              this.customAlert({type: 'success', text: response.data.message, title: 'Success'});

              //clear input fields
              this.clearInputField(this.formData);

              //refresh the page
              this.refresh();
            
            }

            if(response.status == 400 ){
                this.customAlert({type: 'failure', text: response.data.message, title: 'Success'});
            }
          }
          // End loader gif
          this.toggle_loading(false);
      }


    },
    
    async submitForm(type){

      if(type == 'SUBMIT_PAYMENT_ADD_FORM'){

        if(this.requiredValidator(this.formData,'required') == true){
           await this.api_calls(type);
        }
        
      }
    },

    refresh(){

      //fetch portfolio transaction history
      this.api_calls('FETCH_PORTFOLIO_TRANSACTION_HISTORY')

    }
    

  },
  
  created(){

    
      

        ////Updating of page title
        this.$store.commit('updateTitle','Portfolio Payment History');

        this.refresh();

        
        
  }

    
};
</script>

<style scoped>
 

</style>
