import Vue from 'vue'
import router from '../../routes'


const state = {

    
    
}



const getters = {   //this.$store.getters.email
    // email: (state) =>{
    //     return state.email;
    // },

   


}

const mutations = {  //this.store.commit('updateEmail',value)
    

    login: (state, value) => {
           
            localStorage.setItem("token",value.access_token);
            localStorage.setItem("fullname",value.fullname);   
        
    },
    

}

const actions = {

      async login({commit},value){

            try {
               var response = await axios
                .get(
                    "/api/v1/users/login/",{ params: value}
                );

                return await response;
    
    
            }catch(error){
                return await error.response;
            }
            

            
     

        
        
    }

}

export default {
    state,
    getters,
    mutations,
    actions,
}

