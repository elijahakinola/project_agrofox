import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login.js'
import userportfolio from './modules/userportfolio.js'
import userslist from './modules/userslist'
import portfoliolist from './modules/portfoliolist'
import adminlist from './modules/adminlist'
import userslistedit from './modules/userslistedit'
import transactionhistorybyportfolio from './modules/transactionhistorybyportfolio'
import usersadd from './modules/usersadd'
import projectaccount from './modules/projectaccount'
import userportfolioedit from './modules/userportfolioedit'
import transactionhistory from './modules/transactionhistory'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users_data: {},
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
        title: '',
        charts: [],
        counters: []
    },

    getters:{
        title: (state)=>{
            return state.title;
        },

        getToken: (state) =>{
            return state.token;
        },
        getCharts: (state) =>{
            return state.charts;
        },
        getCounters: (state) =>{
            return state.counters;
        },

        getUsersData: (state) =>{
            return state.users_data;
        }
        
        

    },

    mutations:{
        submit_user_data: (state, request) =>{
            state.users_data = request;
        },

        updateTitle: (state, value) =>{
            state.title = value;
        },

        updateCharts: (state, value) =>{
            state.charts = value;
        },

        updateCounters: (state, value) =>{
            state.counters = value;
        },

        updateUsersData: (state, value) =>{
            state.users_data = value;
        },

    },

    actions:{

        async charts({commit},value){


            try {
                var response = await axios
                 .get(
                    "http://localhost:8000/api/v1/charts/",{ params: value}
                 );

                 return await response;

     
     
             }catch(error){
                 return await error.response;
            }
 
        
            
    
    
            
    
            
            
        },


        async counters({commit},value){


            
            try {
                var response = await axios
                 .get(
                    "http://localhost:8000/api/v1/counters/",{ params: value}
                 );
 
                 return await response;

     
     
             }catch(error){
                 return await error.response;
            }
             
 
        

            
    
            
            
    
    
            
    
            
            
        },
    
        

    },
    modules: {
        login,
        userportfolio,
        userslist,
        userslistedit,
        usersadd,
        adminlist,
        portfoliolist,
        transactionhistorybyportfolio,
        projectaccount,
        userportfolioedit,
        transactionhistory

    }
})