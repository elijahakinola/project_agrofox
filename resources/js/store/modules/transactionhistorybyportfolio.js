import Vue from 'vue'

const state = {}

const getters = { }

const mutations = { }

const actions = {
    async SUBMIT_TRANSACTION_HISTORY_BY_PORTFOLIO({commit},value){


        //console.log(value);

 
        var user_id = value.user_id || '-';
        var user_portfolio_id = value.user_portfolio_id || '-';
        var amount = value.amount || '0';
        var payment_medium = value.payment_medium || '-';
        var payment_date= value.payment_date || '-';
        var other_information= value.other_information || '-';
        var token = value.token || '-'; 
        
        var response;
        var recieved_data;


        try {
            response = await Vue.http
            .get(
            "http://lumen.lilycourt.ng/api/v1/transaction_history_portfolio_add/"+token+'/'+user_id+'/'+user_portfolio_id+'/'+amount+'/'+payment_medium+'/'+payment_date+'/'+other_information
            );

            recieved_data = response.body.message;
            
            return {'success': recieved_data};


        }catch(error){

        
            return {'failure': error.data.message};
        }   
    },

    async GET_PAYMENT_HISTORY_FROM_PORTFOLIO_ID({commit},value){
 
        var token = value.token || '-'; 
        var user_portfolio_id = value.user_portfolio_id || '-';

        var response;
        var recieved_data;


        try {
            response = await Vue.http
            .get(
            "http://lumen.lilycourt.ng/api/v1/transaction_history/portfolio/"+user_portfolio_id+'/'+token
            );

            recieved_data = response.body.message;
            
            return {'success': recieved_data};


        }catch(error){

        
            return {'failure': error.data.message};
        }
        

        
        


        

        
        
    },


    
}

export default {
    state,
    getters,
    mutations,
    actions,
}