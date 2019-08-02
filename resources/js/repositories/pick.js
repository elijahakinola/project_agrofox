import { store } from '../store/store';
export const pick ={

    data(){
        return {
            loading: false,
            toggle: false,
        }
    },

    methods:{

        
        toggle_loading: function(value){

          this.loading = value;

        },
       
        customRedirect(url){
            return window.location = url;
        },

        customLogout(){
            localStorage.removeItem('token');
            this.customRedirect('/'); 
        },
        customAlert(obj){

            
            return this.$swal({
                type: obj.type,
                title: obj.title,
                text: obj.text,
                footer: obj.footer
              });

              

        },
        clearInputField(obj){
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key] = '';
                }
            }
        },
        requiredValidator(obj, value){

            let result = true

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {

                    if(value == 'required'){

                        if(obj[key].length < 1){
                            return false;
                        }

                    }
                    
                }
            }

            return result;

        },

        customInvestmentPlan(){
            //return 2;
            var x = {
                "mortgage": {
                    percentage: "10",
                    duration: "3months",
                },
                "flexible": {
                    percentage: "10",
                    duration: "3months",
                },
                "outright": {
                    percentage: "100",
                    duration: "2weeks",
                },
                "3 installments": {
                    percentage: "100",
                    duration: "",
                },
                "6 installments": {
                    percentage: "100",
                    duration: "",
                },
                "12 installments": {
                    percentage: "100",
                    duration: "",
                }

                
            }

            return x;
        },

        isValidToken(token){
            const payload = this.payload(token);

            if(payload){
                return true;
            }

            return false;
        },
        payload(token){
            const payload  = token.split('.')[1];
            return this.decode(payload);

        },
        decode(payload){
            return JSON.parse(atob(payload));
        }

    },
    filters: {
        dateToHumanReadableForm: function (value) {
          if (!value) return ''
          value = value.toString()
          var dateData, dateObject, dateReadable;

            dateData = value; //For example

            dateObject = new Date(Date.parse(dateData));

            dateReadable = dateObject.toDateString();

            return dateReadable;
        },
        getNameFromId: function(value){

            

        //    var array1 = store.getters.getUsersData;
        //    return array1;
           

            //looping through array
            for(var arr in array1[0]){
                return arr.id;
            }

            return 2;
        }
    }
}