import Vue from 'vue'

const state = {
    user_portfolio: [],
    
    generate_investment_plan: [],
    create_toggle: false
    
}



const getters = {   //this.$store.getters.email
    user_portfolio: (state) =>{
        return state.user_portfolio;
    },
    create_toggle: (state) =>{
        return state.create_toggle;
    },
    generate_investment_plan: (state) =>{
        return state.generate_investment_plan;
    },
    




}

const mutations = {  //this.store.commit('updateEmail',value)

    user_portfolio: (state, value) => {
        
        state.user_portfolio = value;
    },

    create_toggle: (state) => {
        
        state.create_toggle = !state.create_toggle;
    },
    

    generate_investment_plan: (state, payload) =>{
        state.generate_investment_plan = payload;
    },
   

    
    

}

const actions = {

    


    async generate_payment_plans({commit}, value){

        try {
            var response = await axios
             .get(
                 "/api/v1/generate_payment_plans/",{ params: value}
             );

             return await response;
 
        }catch(error){
             return await error.response;
        }

       
      
        
        
    },

    async generate_room_types({commit}, value){

        try {
            var response = await axios
             .get(
                 "/api/v1/generate_room_types/",{ params: value}
             );

             return await response;
 
        }catch(error){
             return await error.response;
        }

       
      
        
        
    },


    async generate_equity_types({commit}, value){

        try {
            var response = await axios
             .get(
                 "/api/v1/generate_equity_types/",{ params: value}
             );

             return await response;
 
        }catch(error){
             return await error.response;
        }

       
      
        
        
    },

    async users_portfolio_add({commit}, value){

        

        try {
             var response = await axios
             .get(
                 "/api/v1/users_portfolio_add/",{ params: value}
             );
             return await response;
 
        }catch(error){


             return await error.response;
        }

       
      
        
        
    },


    async list_my_portfolios({commit}, value){


        try {
             var response = await axios
             .get(
                 "/api/v1/list_my_portfolios/",{ params: value}
             );

            
             return await response;
 
        }catch(error){


             return await error.response;
        }

       
      
        
        
    },


    


}

export default {
    state,
    getters,
    mutations,
    actions,
}