import Vue from 'vue'

const state = {
    
}



const getters = {   //this.$store.getters.email

}

const mutations = {  //this.store.commit('updateEmail',value)


}

const actions = {

    async users_add({commit},value){

        try {
            var response = await axios
             .get(
                 "/api/v1/users_register/",{ params: value}
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