<template>
  <div>
    <app-login-header></app-login-header>
    <div class="form-body">
      <div class="website-logo">
        <a href="#">
          <div class="logo">
            <img class="logo-size" src="/assets/theme1/images/logo-light.png" alt />
          </div>
        </a>
      </div>
      <div class="row">
        <div class="img-holder">
          <div class="bg"></div>
          <div class="info-holder">
            <img src="/assets/theme1/images/graphic1.svg" alt />
          </div>
        </div>
        <div class="form-holder">
          <div class="form-content">
            <div class="form-items">
              <h3>Log in.</h3>
              <p>Please sign in with login details to access dashboard</p>
              <form method="post">
                <input
                  class="form-control"
                  type="email" name='email' v-validate.continues="{ required: true, email: true, min: 5 }"
                  placeholder="E-mail Address"
                  v-model="myForm.email"
                />
                <span>
                        <ul>
                              <li v-for="error in errors.collect('email')" :key="error" style="color: #df7e81">{{ error }}</li>
                          </ul>
                </span>
                <input
                  class="form-control"
                  type="password" name="password" v-validate.continues="{ required: true, min: 7 }"
                  placeholder="Password"
                  v-model="myForm.password"
                />

                <span>
                  <ul>
                        <li v-for="error in errors.collect('password')" :key="error" style="color: #df7e81">{{ error }}</li>
                  </ul>
                </span>

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
  </div>
</template>

<script>
import LoginHeader from "../layouts/LoginHeader";
import { pick } from "../../repositories/pick";
import 'es6-promise/auto'

export default {
  components: {
    "app-login-header": LoginHeader
  },
  mixins: [pick],
  data() {
    return {
      loading: false,
      myForm: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    toggle_loading: function(value){

      this.loading = value;

    },
    api_params() {
      return { email: this.myForm.email, password: this.myForm.password };
    },
    async api_calls2(value){
        //log me in
        await this.$store.commit('login',value);
    },

    async api_calls() {
        var response;
        var x = this;

        // Start loader gif
        this.toggle_loading(true);
        response = await this.$store.dispatch("login", this.api_params());
        
      
           if( response && 'status' in response){

              //If it is successful
              if(response.status == 200){
                let api_payload = response.data.message.original;
                let access_token = api_payload.access_token;
                
                // console.log(this.isValidToken(access_token))

                if(this.isValidToken(access_token) == true){
                 await this.api_calls2(api_payload).then(()=>{
                     x.$router.push('/admin/dashboard');
                 })
                }
              }

               //If an error occured
              if(response.status == 400 || response.status == 404){
                  x.customAlert({
                  type: "error",
                  text: response.data.message,
                  title: "Oooops"
                  });
              }
              
            } 

            // End loader gif
            x.toggle_loading(false);

        
        



    },
    async submitForm() {
      //submitting formdata to api database

      if(this.myForm.email && this.myForm.password){
          await this.api_calls();
      }
      
    }
  }
};
</script>

<style scoped>
 input:valid {
  border-color: green;
}

input:invalid {
  border-color: red;
}
</style>
