
<template>
  <div>
    <app-legend>
     <div class="content" >
          <div class="row">
            <div class="col-md-12">
              <div class="card " v-if='summary_visibility == false'>
                <div class="card-header ">
                  <div style="float: left;">
                    
                    <h5 class="card-title">Project Account</h5>
                    <p class="card-category">Materials used for contruction</p>
                  </div>
                  <div class="row" style="float: right;">
                    <div class="col-md-12">
                      <div class="form-button">
                        <button id="submit" type="button" @click="summary_visibility = !summary_visibility" name="sup_submit" class="btn btn-info"><i class="fa fa-list"></i> Project Account Summary</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body " >
                   <custom-loader :loading="loading"></custom-loader>
                  <form method="post">
                    <div class="row">
                      <div class="col-md-2">
                        <label>Category</label>
                      </div>
                      <div class="col-md-2">
                        <label>Category Type</label>
                      </div>
                      <div class="col-md-1">
                        <label>Quantity</label>
                      </div>
                      <div class="col-md-2">
                        <label>Rate</label>
                      </div>
                      <div class="col-md-2">
                        <label>Amount</label>
                      </div>
                      <div class="col-md-3">
                        <label>Date</label>
                      </div>

                      
                    </div>
                    <br>
                    <div class="row">
                      
                      <div class="col-md-2">
                        <select class="form-control" v-model="formData.category" type="text"  style="height: 31px;">

                          <option v-for="category in project_account_category" :key='category' > {{ category }}</option>
                        </select>
                      </div>
                      <div class="col-md-2">
                        <input class="form-control" type="text" v-model="formData.item_type">
                      </div>
                      <div class="col-md-1">
                        <input class="form-control" type="text" v-model.number="formData.quantity" name="quantity">
                      </div>
                      <div class="col-md-2">
                        <input class="form-control" type="text" v-model.number="formData.rate" name="rate">
                      </div>
                      <div class="col-md-2">
                        <input class="form-control" type="text" v-model.number="formData.amount" name="amount">
                      </div>
                      <div class="col-md-3">
                        <input class="form-control" type="date" v-model="formData.date" name="date">
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="col-md-12">
                        <label>Comment</label>
                        <textarea class="form-control" style="padding: 2px;font-size: 12px;" v-model="formData.comments"></textarea>
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
                              @click.prevent="submitForm"
                              class="btn btn-danger"
                            >Submit</button>
                          </custom-loader>
                        </div>
                      </div>
                    </div>
                  </form>
                  <br><br>
                  <form class="form-inline" method="post">
                    <div class="form-group">
                      <input type="text" class="form-control" v-model="search" id="search" placeholder="Search">
                      
                      <custom-loader :loading="loading">
                              <button
                              id="submit"
                              type="button"
                              @click.prevent="searchForm"
                              class="btn btn-info" style="margin-left: 10px;"
                        >Submit</button>
                      </custom-loader>
                     
                    </div>
                  </form>
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th class="tex-left">S/N</th>
                        <th class="tex-left">Category</th>
                        <th class="tex-left">Category Type</th>
                        <th class="tex-left">Quantity</th>
                        <th class="tex-left">Rate</th>
                        <th class="tex-left">Amount</th>
                        <th class="tex-left">Date</th>
                        <th class="tex-left">Comment</th>
                      </thead>
                      <tbody>
                        <tr v-for=' (project_account, index) in project_account_search' :key="index+project_account">
                          <td class="tex-left">{{ index+1  }}</td>
                          <td class="tex-left">{{ project_account.category }}</td>
                          <td class="tex-left">{{ project_account.item_type }}</td>
                          <td class="tex-left">{{ project_account.quantity }}</td>
                          <td class="tex-left">{{ project_account.rate }}</td>
                          <td class="tex-left"> {{ project_account.amount }}</td>
                          <td class="tex-left"> {{ project_account.date }} </td>
                          <td class="tex-left">{{ project_account.comments }}</td>
                        </tr>
                        <!-- <tr>
                          <td colspan="5" style="padding-top: 20px" class="text-right"><b>Total:</b></td>
                          <td colspan="3" style="padding-top: 20px" class="tex-left"><b>{{ totalSearch() }}</b></td>
                        </tr> -->
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- Project Summary Div -->
              <div class="card " v-if='summary_visibility == true'>
                <div class="card-header ">
                  <div style="float: left;">
                    
                    <h5 class="card-title">Project Account Summary</h5>
                    <p class="card-category">Total amount of Materials used for contruction</p>
                  </div>
                  <div class="row" style="float: right;">
                    <div class="col-md-12">
                      <div class="form-button">
                        <button id="submit" @click="summary_visibility = !summary_visibility" name="sup_submit" class="btn btn-info"><i class="fa fa-list"></i> Project Account</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body" style="font-size: 16px;">
                  <form method="post">
                    <div class="row">
                      <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th></th>
                        <th class="tex-left">Category</th>
                        <th class="tex-left">Amount</th>
            
                      </thead>
                      <tbody>
                        <tr v-for='(value,key) in project_account_summary' :key="key+'summary'" style="text-transform: capitalize;">
                          

                            <td width="5%" class="text-center"> 
                              <span v-if='key == "total"'>
                                <i class="nc-icon "></i>
                              </span>
                              <span v-if='key != "total"'>
                                <i class="nc-icon nc-tag-content"></i>
                              </span>
                            </td>
                            <td class="tex-left" width="50%">
                                 <span v-if='key == "total"'>
                                 <b>{{ key }}</b>
                                 </span>
                                 <span v-if='key != "total"'>
                            
                                  {{ key }}
                            
                                </span>
                            </td>

                             <td class="tex-left">
                                 <span v-if='key == "total"'>
                                 <b>{{ value }}</b>
                                 </span>
                                 <span v-if='key != "total"'>
                            
                                  {{ value }}
                            
                                </span>
                            </td>
                         

                          

                          
                          
                        </tr>
                        <!-- <tr>
                          <td colspan="5" style="padding-top: 20px" class="text-right"><b>Total:</b></td>
                          <td colspan="3" style="padding-top: 20px" class="tex-left"><b>504000</b></td>
                        </tr> -->
                      </tbody>
                    </table>
                  </div>
                      <!-- <div class="col-md-1">
                        <label>S/N</label>
                      </div> -->
                      
                    </div>
                 
                    <br>
                    <div class="row">
                      <div class="col-md-12">
                      </div>
                    </div>
                  </form>
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
        
        project_account_category: [],
        project_account_summary: [],
        project_account_search: [],
        formData: {
          category: '',
          item_type: '',
          quantity: '',
          rate: '',
          amount: '',
          date: '',
          comments: ''
        },
        search: 'all',
        loading: false,
        summary_visibility: false
    }
  },
  

  watch: {
    'formData.quantity': function (val) {
      this.formData.amount = this.formData.rate * this.formData.quantity;
    },
    'formData.rate': function (val) {
      this.formData.amount = this.formData.rate * this.formData.quantity;
    },
   
    
  },
  methods: {
     api_params: function(value){

       if(value == 'FETCH_PROJECT_ACCOUNT_CATEGORY'){
          return { token: this.$store.getters.getToken };
       }

       if(value == 'FETCH_PROJECT_ACCOUNT_SUMMARY'){
          return { token: this.$store.getters.getToken };
       }

       if(value == 'FETCH_PROJECT_ACCOUNT_SEARCH'){
          return { token: this.$store.getters.getToken, search: this.search };
       }
      

    },
    async api_calls(value){

      if(value == 'FETCH_PROJECT_ACCOUNT_CATEGORY'){
          
          let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('project_account_category', this.api_params(value));

           if(response && 'status' in response){
            if(response.status == 200){

              
             
                this.project_account_category = response.data.message;
            }
          }
          // End loader gif
          this.toggle_loading(false);
   
      }


      if(value == 'FETCH_PROJECT_ACCOUNT_SUMMARY'){
          
          let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('project_account_summary', this.api_params(value));

           if(response && 'status' in response){
            if(response.status == 200){
              
               // console.log(response.data.message)
                this.project_account_summary = response.data.message;
            }
          }
          // End loader gif
          this.toggle_loading(false);
   
      }


      if(value == 'FETCH_PROJECT_ACCOUNT_SEARCH'){

        let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('project_account_search', this.api_params(value));

           if(response && 'status' in response){
            if(response.status == 200){

              
             
                this.project_account_search = response.data.message;

                
            }
          }
          // End loader gif
          this.toggle_loading(false);
   

      }



      
      if(value == 'SUBMIT_PROJECT_ACCOUNT_FORM'){

        let response;

          // Start loader gif
          this.toggle_loading(true);
          response = await this.$store.dispatch('project_account_form', { token: this.$store.getters.getToken,...this.formData});

           if(response && 'status' in response){
            if(response.status == 200){

                this.clearInputField(this.formData);
                this.refresh();
            }
          }
          // End loader gif
          this.toggle_loading(false);
   

      }


       

    },
    searchForm(){

       //searching project account table
      this.api_calls('FETCH_PROJECT_ACCOUNT_SEARCH');
      

    },

    

    submitForm(){

      //submitting formdata to api database
      this.api_calls('SUBMIT_PROJECT_ACCOUNT_FORM');

    },

    refresh(){
        // // Updating title meta tag
        this.$store.commit('updateTitle','Project Account');

        // ///// Fetching list of  project account category
        this.api_calls("FETCH_PROJECT_ACCOUNT_CATEGORY");

        // ///// Fetching list of  project account category
        this.api_calls("FETCH_PROJECT_ACCOUNT_SUMMARY");

        // ///// Fetching list of  project account 
        this.api_calls("FETCH_PROJECT_ACCOUNT_SEARCH");
    }


    
    
  },
   created(){

        this.refresh();

        


         

    }

    
};
</script>

<style scoped>
 .tex-left{
   color: black!important;
   font-size: 14px !important;
 }
 

</style>
