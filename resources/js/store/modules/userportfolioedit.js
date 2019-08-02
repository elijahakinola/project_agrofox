import Vue from 'vue'

const state = {
    
}



const getters = {   //this.$store.getters.email

}

const mutations = {  //this.store.commit('updateEmail',value)


}

const actions = {

    async portfolio_transaction_history({commit},value){

        try {
            var response = await axios
             .get(
                 "/api/v1/portfolio_transaction_history/",{ params: value}
             );

             return await response;
 
 
        }catch(error){
             return await error.response;
        }
         

        
        
    },

    async portfolio_transaction_history_add({commit},value){

        

        try {
            var response = await axios
             .get(
                 "/api/v1/portfolio_transaction_history_add/",{ params: value}
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