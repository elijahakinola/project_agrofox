export const registeredUsersController ={

    methods:{
        createUsers(x){
            return x;
        },
        clearInputField(data){
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    data[key] = '';
                    // console.log(key + " -> " + p[key]);
                }
            }
        }
    }
}