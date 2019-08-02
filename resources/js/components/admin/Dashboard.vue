
<template>

  <div>
   <app-legend>
       
       <div class="content">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4">
                    <div class="icon-big text-center icon-warning">
                      <i class="nc-icon nc-user-run text-warning"></i>
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category">Users</p>
                      <p class="card-title">{{ this.$store.getters.getCounters.users   }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <hr />
                 <router-link :to="{ name: 'UsersList'}" tag='li'>
                      <a style="text-decoration: none"><i class="fa fa-eye"></i> View Now</a>
                  </router-link>
                
                
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4">
                    <div class="icon-big text-center icon-warning">
                      <i class="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category">Revenue</p>
                      <p class="card-title" style='font-size: 1.5rem'>&#8358; {{ this.$store.getters.getCounters.revenue   }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <hr />
                <div class="stats">
                  <router-link :to="{ name: 'TransactionHistory'}" tag='li'>
                      <a style="text-decoration: none"><i class="fa fa-eye"></i> View Now</a>
                  </router-link>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4">
                    <div class="icon-big text-center icon-warning">
                      <i class="nc-icon nc-layout-11 text-danger"></i>
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category">Portfolios</p>
                      <p class="card-title"> {{ this.$store.getters.getCounters.users_portfolio   }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <hr />
                <div class="stats">
                  
                   <router-link :to="{ name: 'PortfolioList'}" tag='li'>
                      <a style="text-decoration: none"><i class="fa fa-eye"></i> View Now</a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4">
                    <div class="icon-big text-center icon-warning">
                      <i class="nc-icon nc-settings text-primary"></i>
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category">Admin</p>
                      <p class="card-title">{{ this.$store.getters.getCounters.admin   }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <hr />
                 <router-link :to="{ name: 'AdminList' }" tag="div"> 
                  <a style="text-decoration: none"><i class="fa fa-eye"></i> View Now </a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div>
  <apexchart width='1000' height='400' type="bar" :options="options" :series="series"></apexchart>
</div>
            </div>
          </div>
        </div>
      </div>
   </app-legend>
  </div>

</template>

<script>
   import Legend from '../layouts/Legend';
   import { pick } from '../../repositories/pick';
   import 'es6-promise/auto'
   
   
   
  

  export default{
      mixins: [pick],
      components: {
          'app-legend' : Legend,

      },
      mixins: [pick],
      data: function() {
        return {    
          options: {
            chart: {
              id: 'vuechart-example'
            },
            xaxis: {
              categories: [
                'mortgage',
                'flexible',
                'outright',
                '3 Installments',
                '6 Installments',
                '12 Installments'
              ]
            }
          },
          series: [{
            name: 'Investment Plan',
            data: [
              this.$store.getters.getCharts.mortgage, 
              this.$store.getters.getCharts.flexible, 
              this.$store.getters.getCharts.outright,
              this.$store.getters.getCharts['3 installments'],
              this.$store.getters.getCharts['6 installments'],
              this.$store.getters.getCharts['12 installments']
               
             ]
          }]
        }
      },

      methods:{
        toggle_loading: function(value){

          this.loading = value;

        },
    
        async api_calls(){
    

          // Start loader gif
          this.toggle_loading(true);
          var response = await this.$store.dispatch('charts',{token: this.$store.getters.getToken });

          if(response && 'status' in response){
            if(response.status == 200){
                this.$store.commit('updateCharts',response.data.message);
            }
          }

            // End loader gif
          this.toggle_loading(false);
        },


          
        async api_calls2(){
      
          // Start loader gif
          this.toggle_loading(true);
          var response = await this.$store.dispatch('counters',{token: this.$store.getters.getToken });

          if(response && 'status' in response){
            if(response.status == 200){
                this.$store.commit('updateCounters',response.data.message);
            }
          }

          // End loader gif
          this.toggle_loading(false);
        },
      } ,
      
      async mounted(){

          //updating title meta tag
          this.$store.commit('updateTitle','Dashboard');

          //fetching charts data from api
          await this.api_calls();

          //fetching counter from api
         await this.api_calls2();


         
      }
  }
</script>