import Vue from 'vue'

const state = {
    
}



const getters = {   //this.$store.getters.email

}

const mutations = {  //this.store.commit('updateEmail',value)


}

const actions = {

    async project_account_category({commit},value){


        
        try {
            var response = await axios
             .get(
                 "/api/v1/project_account_category/",{ params: value}
             );

             return await response;
 
 
        }catch(error){
             return await error.response;
        }
         

        
        
    },


    async project_account_summary({commit},value){

        try {
            var response = await axios
             .get(
                 "/api/v1/project_account_summary/",{ params: value}
             );

             return await response;
 
 
        }catch(error){
             return await error.response;
        }
         

        
        
    },


    async project_account_search({commit},value){

        try {
            var response = await axios
             .get(
                 "/api/v1/project_account_search/",{ params: value}
             );

             return await response;
 
 
        }catch(error){
             return await error.response;
        }
         

        
        
    },

    async project_account_form({commit},value){

        try {
            var response = await axios
             .get(
                 "/api/v1/project_account_form/",{ params: value}
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