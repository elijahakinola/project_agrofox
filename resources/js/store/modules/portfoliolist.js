import Vue from 'vue'

const state = {
    
}



const getters = {   //this.$store.getters.email

}

const mutations = {  //this.store.commit('updateEmail',value)


}

const actions = {

    async portfolio_list({commit},value){

       

        try {
            var response = await axios
             .get(
                 "/api/v1/portfolio_lists/",{ params: value}
             );

             return await response;
 
 
        }catch(error){
             return await error.response;
        }
        
        
    },

    async portfolio_list_search({commit},value){


        try {
            var response = await axios
             .get(
                 "/api/v1/portfolio_lists_search/",{ params: value}
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