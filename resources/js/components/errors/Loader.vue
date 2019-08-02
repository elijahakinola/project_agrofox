<template>
    <span>
        <span ref='loading'> <slot></slot> </span>
        
        <span v-if='loading == true'>
            <img src='/assets/spinner.gif' style="width: 44px">
        </span>

        <span v-if='loading == "completed"'>
             <img src='/assets/check-circle.gif' style="width: 44px">
        </span>

        <span v-if='loading == false'>
            
        </span>

    </span>
</template>

<script>
export default {
    data(){
        return{
            loadingStyle : ''

        }
    },
    props: ['loading'],
    watch:{
        loading: function(value){
            var y = this;


            if(y.loading== true){
                this.$refs.loading.style.opacity = 0.5;
                this.$refs.loading.style.display = 'none';
            }

            if(y.loading== false){
                this.$refs.loading.style.opacity = 1.0;
                this.$refs.loading.style.display = 'block';
            }

        }
    }
}
</script>


<style scoped>
 
</style>
