
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
                     <button class="btn btn-danger" @click="toggle = true" style="background: rgb(127, 172, 173); border-radius: 0px !important;"><i class="fa fa-plus"></i> Add Investment</button>
                  </span>
                   <span v-else-if='toggle == true'>
                     <button class="btn btn-danger" @click="toggle = false" style="background: rgb(127, 172, 173); border-radius: 0px !important;"><i class="fa fa-eye"></i> View Investment</button>
                  </span>
                 
                </div>
              </div>
              <div class="card-body">
                

                 
                <form method="post" v-if='toggle == true'>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Investment Plan</label>
                      <select class="form-control" v-model='myForm.plan'>
                          <option> Select Investment Plan</option>
                        
                        <option v-for="xx in this.$store.getters.generate_investment_plan" :key='xx'> {{ xx }}</option>
                        
                      </select>
                    </div>
                    
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Start Date</label>
                      <input class="form-control" type="date" v-model="myForm.start_date" />
                    </div>
                  </div>

                  <br>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Cost</label>
                      <input class="form-control" type="text" v-model="myForm.cost" />
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
                      <th>Investment Plan</th>
                      <th>Cost</th>
                      <th>Created On</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      
                     
                      <tr v-for="(xd, index) in this.$store.getters.user_portfolio" :key="xd+index">
                        <td> {{  index+1 }}</td>
                        <td> {{ xd.plan+' Plan' }}</td>
                        <td>{{ 'N'+xd.cost }}</td>
                        <td>{{ xd.created_at | dateToHumanReadableForm }}</td>
                        <td>
                           
                             <router-link :to="{ name: 'TransactionHistoryByPortfolio' , params: { user_portfolio_id: xd.id, user_id: id, username: name  } }" class="btn btn-danger" style="background: rgb(127, 172, 173); border-radius: 0px !important;">
                                    <i class="fa fa-pencil"></i> View Payment History
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
    "app-legend": Legend,
     
    
  },
  mixins: [pick],
  data() {
    return {
        
        name: this.$route.params.name,
        id: this.$route.params.id,
        loading: false,
        toggle: false,
        myForm: {
          cost: '',
          start_date: '',
          plan: ''
        }
        
    }
  },


 

  methods: {
    api_params: function(value){
      return { user_id: this.id, token: this.$store.getters.getToken, plan: this.myForm.plan, cost: this.myForm.cost, start_date: this.myForm.start_date };

    },
    validator: function(value){

    },
    toggle_loading: function(value){

      this.loading = value;

    },
    async api_calls(){

      this.$store.dispatch('user_portfolio',{user_id: this.id, token: this.token});
    },
    async submitForm(){

      var response;

      // Start loader gif
      this.toggle_loading(true);

     

      //Sending the form data to the api_database
       response = await this.$store.dispatch('user_portfolio_add',this.api_params())

       //outputting the result
      if(response.success){
         this.customAlert({type: 'success', text: response.success, title: 'Success'});
      }

      if(response.failure){
        this.customAlert({type: 'error', text: response.failure, title: 'Oooops'});
      }

      
       // End loader gif
      this.toggle_loading(false);


      // Clear  All Input fields
      this.clearInputField(this.myForm);

      //Reloading the portfolio list
      this.api_calls();

      
    
      
        
    }
    

  },
  
  created(){

    
       

        //Updating of page title
        this.$store.commit('updateTitle',this.name+' Portfolio');

        //Generate list of investment plan
        this.$store.dispatch('generate_investment_plan');

        //Get all the portfolio of the user on this page
        this.api_calls();
        
        
  }

    
};
</script>

<style scoped>
 

</style>
