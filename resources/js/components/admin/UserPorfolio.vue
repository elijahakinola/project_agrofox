
<template>
  <div>
    <app-legend>

       <div class="content" >
          <div class="row">
            <div class="col-md-12">
              <div class="card ">
                <div class="card-header ">
                  <div style="float: left;">
                    
                    <h5 class="card-title">Portfolio</h5>
                    <p class="card-category">Add user portfolio</p>
                  </div>
                  <!-- <div class="row" style="float: right;">
                    <div class="col-md-12">
                      <div class="form-button">
                        <button id="submit" type="submit" name="sup_submit" class="btn btn-info"><i class="fa fa-list"></i> Portfolio Summary</button>
                      </div>
                    </div>
                  </div> -->
                </div>
                <div class="card-body ">
                  <custom-loader :loading='loading'></custom-loader>
                  <form method="post">
                    <div class="row">
                      <div class="col-md-3">
                        <label>Subscriber Name</label>
                      </div>
                      <div class="col-md-3">
                        <label>Room Type</label>
                      </div>
                      <div class="col-md-2">
                        <label>Purchase Price</label>
                      </div>
                      <div class="col-md-2">
                        <label>Equity </label>
                      </div>
                      <div class="col-md-2">
                        <label>Admission Fee</label>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="col-md-3">
                        <input class="form-control" type="text" name="Category" style="height: 31px;" :value="name" disabled="">
                      </div>
                      <div class="col-md-3">
                        <select class="form-control" type="text" v-model="formData.room_type" style="height: 31px;">
                          <option v-for='(room_type, index) in room_types' :key="index+room_type"> {{ room_type }}</option>
                          
                        </select>
                      </div>
                      <div class="col-md-2">
                        <input class="form-control" type="text" v-model="formData.purchase_price" >
                      </div>
                      <div class="col-md-2">
                         <select class="form-control" type="text" v-model="formData.equity" style="height: 31px;">
                          <option v-for='(equity_type, index) in equity_types' :key="index+equity_type"> {{ equity_type }}</option>
                          
                        </select>
                      </div>
                      <div class="col-md-2">
                        <input class="form-control" type="text" v-model="formData.admt_fee">
                      </div>
                      <br><br>
                      <div class="col-md-3">
                         <br><br>
                        <label>Payment Plan</label>
                        
                        <select class="form-control" type="text" v-model="formData.payment_plan" style="height: 31px;">
                          <option v-for='(payment_plan, index) in payment_plans' :key='index+payment_plan'> {{ payment_plan }}</option>
                        </select>
                      </div>
                      <div class="col-md-3">

                         <br><br>
                        <label>Date</label>
                        
                        <input class="form-control" type="date" v-model="formData.date">
                      </div>

                      <div class="col-md-3">
                        <br><br>
                        <label>Balance</label>
                        
                        <input class="form-control" type="text" v-model="formData.balance" style='color: red' disabled>
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
                              @click.prevent="submitForm('SUBMIT_PORFOLIO_ADD_FORM')"
                              class="btn btn-info"
                            ><i class="fa fa-plus"></i> Add Portfolio</button>
                          </custom-loader>

                         
                        </div>
                      </div>
                    </div>
                  </form>
                  <br><br>
                  <!-- <form class="form-inline" method="post">
                    <div class="form-group">
                      <input type="text" class="form-control" id="search" placeholder="Search">
                      <button type="submit" class="btn btn-info" style="margin-left: 10px;">Search</button>
                    </div>
                  </form> -->
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th class="tex-left">S/N</th>
                        <th class="tex-left">Room Type</th>
                        <th class="tex-left">Purchase Price ( &#8358; )</th>
                        <th class="tex-left">Equity (%) </th>
                        <th class="tex-left">Admission Fee ( &#8358; )</th>
                        <th class="tex-left">Payment Plan</th>
                        <th class="tex-left">Date</th>
                        <th class="tex-left">Action</th>
                      </thead>
                      <tbody>
                        <tr v-for='(my_portfolio, index) in my_portfolios' :key="index+my_portfolio">
                          <td class="tex-left">{{ index+1 }}</td>
                          <td class="tex-left"> {{ my_portfolio.room_type }}</td>
                          <td class="tex-left">{{ my_portfolio.purchase_price }} </td>
                          <td class="tex-left">{{ my_portfolio.equity }}</td>
                          <td class="tex-left">{{ my_portfolio.admt_fee }}</td>
                          <td class="tex-left">{{ my_portfolio.payment_plan }}</td>
                          <td class="tex-left">{{ my_portfolio.start_date }}</td>
                          <td class="tex-left" width="15%">
                            <router-link :to="{ name: 'UserPortfolioEdit', params: { id: my_portfolio.id, user_id: my_portfolio.user_id} }" tag='button' class="btn btn-info"><i class="fa fa-money"></i></router-link>
                           
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
    "app-legend": Legend,
     
    
  },
  mixins: [pick],
  data() {
    return {
        
        name: this.$route.params.name,
        id: this.$route.params.id,
        my_portfolios: [],
        payment_plans: [],
        room_types: [],
        equity_types: [],
        formData: {
          room_type: '',
          purchase_price: '',
          equity: 0,
          admt_fee: '',
          equity: '',
          payment_plan: '',
          date: '',
          balance: '',
        }
        
    }
  },

  watch: {
     
     'formData.equity': function (val) {
       this.formData.balance = this.balance_calculator();
    },
    'formData.purchase_price': function (val) {
       this.formData.balance = this.balance_calculator();
    },

    'formData.admt_fee': function (val) {
       this.formData.balance = this.balance_calculator();
    },
  },


 

  methods: {
    balance_calculator: function(val){

      return parseFloat(this.formData.equity/100) * parseFloat(this.formData.purchase_price) + parseFloat(this.formData.admt_fee);

    },

    api_params: function(value){

      if(value == 'FETCH_PAYMENT_PLANS' ){
        return {token: this.$store.getters.getToken }
      }

      if(value == 'FETCH_ROOM_TYPES' ){
        return {token: this.$store.getters.getToken }
      }

      if(value == 'FETCH_EQUITY_TYPES' ){
        return {token: this.$store.getters.getToken }
      }

      if(value == 'SUBMIT_PORFOLIO_ADD_FORM' ){
        return {token: this.$store.getters.getToken, ...this.formData, user_id: this.id, fullname: this.name }
      }

      if(value == 'LIST_MY_PORTFOLIOS'){
        return {token: this.$store.getters.getToken, user_id: this.id }
      }

      

      

      
      //return { user_id: this.id, token: this.$store.getters.getToken, plan: this.myForm.plan, cost: this.myForm.cost, start_date: this.myForm.start_date };

    },
    validator: function(value){

    },
    toggle_loading: function(value){

      this.loading = value;

    },
    async api_calls(value){

      

      if(value == 'LIST_MY_PORTFOLIOS'){
        

         let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('list_my_portfolios', this.api_params(value));

           if(response && 'status' in response){
             console.log(response.data);
            if(response.status == 200){
              //console.log(response.data.message);
                this.my_portfolios = response.data.message;
            }
          }
          // End loader gif
          this.toggle_loading(false);
      }

      if(value == 'FETCH_PAYMENT_PLANS'){

         let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('generate_payment_plans', this.api_params(value));

           if(response && 'status' in response){
            if(response.status == 200){
                this.payment_plans = response.data.message;
            }
          }
          // End loader gif
          this.toggle_loading(false);
      }


      if(value == 'FETCH_ROOM_TYPES'){
        
         let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('generate_room_types', this.api_params(value));

           if(response && 'status' in response){
            if(response.status == 200){
                this.room_types = response.data.message;
            }
          }
          // End loader gif
          this.toggle_loading(false);
      }

      if(value == 'FETCH_EQUITY_TYPES'){
        
         let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('generate_equity_types', this.api_params(value));

           if(response && 'status' in response){
            if(response.status == 200){
                this.equity_types = response.data.message;
            }

            
          }
          // End loader gif
          this.toggle_loading(false);
      }

      if(value == 'SUBMIT_PORFOLIO_ADD_FORM'){
       
        
         let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('users_portfolio_add', this.api_params(value));

           if(response && 'status' in response){
             
            if(response.status == 200){

              this.customAlert({type: 'success', text: response.data.message, title: 'Success'});

              //clear input fields
              this.clearInputField(this.formData);

              //refresh the page
              this.refreshPage();
            
            }

            if(response.status == 400 ){
                this.customAlert({type: 'failure', text: response.data.message, title: 'Success'});
            }
          }
          // End loader gif
          this.toggle_loading(false);
      }


      
      //this.$store.dispatch('user_portfolio',{user_id: this.id, token: this.token});
    },
    async submitForm(type){

      if(type == 'SUBMIT_PORFOLIO_ADD_FORM'){

        if(this.requiredValidator(this.formData,'required') == true){
           await this.api_calls(type);
        }
        
      }


      // var response;

      // // Start loader gif
      // this.toggle_loading(true);

     

      // //Sending the form data to the api_database
      //  response = await this.$store.dispatch('user_portfolio_add',this.api_params())

      //  //outputting the result
      // if(response.success){
      //    this.customAlert({type: 'success', text: response.success, title: 'Success'});
      // }

      // if(response.failure){
      //   this.customAlert({type: 'error', text: response.failure, title: 'Oooops'});
      // }

      
      //  // End loader gif
      // this.toggle_loading(false);


      // // Clear  All Input fields
      // this.clearInputField(this.formData);

      // //Reloading the portfolio list
      // this.api_calls();

      
    
      
        
    },

    refreshPage(){
        //fetch payment_plans
        this.api_calls('FETCH_PAYMENT_PLANS');

        //fetch room_types
        this.api_calls('FETCH_ROOM_TYPES');

        //fetch equity_types
        this.api_calls('FETCH_EQUITY_TYPES');

        //Get all the portfolio of the user on this page
        this.api_calls('LIST_MY_PORTFOLIOS');
    }

    

  },
  
  created(){

    
       

        //Updating of page title
        this.$store.commit('updateTitle',this.name+' Portfolio');

        
        this.refreshPage();
        
        
  }

    
};
</script>

<style scoped>
 

</style>
