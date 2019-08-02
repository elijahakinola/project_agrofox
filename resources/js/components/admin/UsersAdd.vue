
<template>
  <div>
    <app-legend>
      <div class="content">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">User Personal Bio-Data</h5>
              </div>
              <div class="card-body">
                 <custom-loader :loading="loading"></custom-loader>
                <form method="post">
                  <div class="row">
                    <div class="col-md-6">
                      <label>Surname</label>
                      <input class="form-control" type="text" v-model="formData.surname" />
                    </div>
                    <div class="col-md-6">
                      <label>Other Names</label>
                      <input class="form-control" type="text" v-model="formData.other_names" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label>Email</label>
                      <input class="form-control" v-validate.continues="{ required: true, email: true, min: 5 }" name='email' type="text" v-model="formData.email" />
                      <span>
                        <ul>
                              <li v-for="error in errors.collect('email')" :key="error">{{ error }}</li>
                          </ul>
                      </span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label>Date of Birth</label>
                      <input class="form-control" type="date" v-model="formData.date_of_birth" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Marital Status</label>
                      <select class="form-control" type="text" v-model="formData.marital_status">
                        <option></option>
                        <option>Single</option>
                        <option>Married</option>
                        <option>Divorced</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label>Mobile Phone</label>
                      <input class="form-control" type="text" v-model="formData.phone_no" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Nationality</label>
                      <select class="form-control" type="text" v-model="formData.nationality">
                        <option></option>
                        <option>Abuja</option>
                        <option>Lagos</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label>State of Origin</label>
                      <select class="form-control" type="text" v-model="formData.state_of_origin">
                        <option></option>
                        <option>Abuja</option>
                        <option>Lagos</option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label>Home Address</label>
                      <textarea class="form-control" v-model="formData.home_address" ></textarea>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label>Office Address (Optional)</label>
                      <textarea class="form-control" v-model="formData.office_address"></textarea>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label>Profession</label>
                      <input type="text" class="form-control" v-model="formData.profession"  />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label>Present Occupation</label>
                      <input type="text" class="form-control" v-model="formData.present_occupation"  />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label>Amount of Years in Occupation</label>
                      <input type="text" class="form-control" v-model="formData.amount_of_years"  />
                    </div>
                  </div>
                  <br />
                 
                  <div class="row">
                    <div class="col-md-6">
                      <label>Property Type</label>
                      <select class="form-control" v-model='formData.property_type' >
                          <option></option>
                        <option>2 Bedroom Carcass</option>
                        <option>2 Bedroom Furnished</option>
                        <option>3 Bedroom Carcass</option>
                        <option>3 Bedroom Furnished</option>
                      </select>
                    </div>
                  </div>
                  <br />
                 
                  <br />
                  <!-- If Installment -->
                  <div class="row">
                    <div class="col-md-12">
                        <label>Payment Option </label>
                      <select class="form-control" v-model="formData.payment_option" >
                          <option></option>
                        <option>Outright</option>
                        <option>Installment - 12 Months</option>
                        <option>Installment - 18 Months</option>
                        <option>Installment - 24 Months</option>
                        <option>Mortgage</option>
                        <option>Flexible Plan</option>
                      </select>
                    </div>
                  </div>

                  <!-- End If -->
                  <hr />
                  <h5 style="font-size: 1.37em">Next of Kin</h5>
                  <div class="row">
                    <div class="col-md-12">
                      <label>Name</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="formData.nok_name"
                        name="nok_name"
                        
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label>Address</label>
                      <textarea
                        class="form-control"
                        name="nok_address"
                        v-model="formData.nok_address"
                        
                      ></textarea>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-12">
                      <label>Other Relevant Information</label>
                      <textarea class="form-control" v-model="formData.relevant_info" ></textarea>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label>Preffered Name of The Title of Document</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="formData.doc_name"
                        name="doc_name"
                        
                      />

                      <br>
                      
                    </div>
                  </div>
                  <div class="form-button">
                    <custom-loader :loading="loading">
                      <button
                      id="submit"
                      type="button"
                      @click.prevent="submitForm"
                      class="btn btn-primary"
                    >Submit</button>
                    </custom-loader>
                   
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
import { pick } from '../../repositories/pick'

export default {
  components: {
    "app-legend": Legend
  },
  mixins: [pick],
  data() {
    return {
      formData: {
        surname: "",
        other_names: "",
        email: "",
        date_of_birth: "",
        marital_status: "",
        phone_no: "",
        nationality: "",
        state_of_origin: "",
        home_address: "",
        office_address: "",
        profession: "",
        present_occupation: "",
        amount_of_years: "",
        property_type: "",
        payment_option: "",
        nok_name: "",
        nok_address: "",
        relevant_info: "",
        doc_name: ""
      },
      loading: false,
    };
  },
  methods: {
    toggle_loading: function(value){

      this.loading = value;

    },
    api_params: function(value){
      return {token: this.$store.getters.getToken, ...this.formData};

    },
    async api_calls(){

      // Start loader gif
        this.toggle_loading(true);
        var response = await this.$store.dispatch('users_add', this.api_params());

        if(response && 'status' in response){
          if(response.status == 200){
              this.customAlert({type: 'success', text: response.data.message, title: 'Success'});
          }

          if(response.status == 400 ){
              this.customAlert({type: 'failure', text: response.data.message, title: 'Success'});
          }
        }

      // End loader gif
      this.toggle_loading(false);

      //clear input fields
      this.clearInputField(this.formData);

      
       
       
      

    },

    submitForm(){

      //submitting formdata to api database
      this.api_calls();

    },
  },

  created(){
        //updating page meta data
        this.$store.commit('updateTitle','Create User');
  }
            
  
};
</script>


<style>
input:valid {
  border-color: green;
}

input:invalid {
  border-color: red;
}
</style>
