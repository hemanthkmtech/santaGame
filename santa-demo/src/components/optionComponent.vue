<template>
<div>
    <div v-if="(!autoGenerate && !manualSelect)">
        <h3>Option Page </h3>
    <spam>Click any one of the button for Auto Generate Santa result or manual Generate</spam><br>
<button @click="autoGenerateOption" class="btn btn-outline-danger">Auto Generate</button>
<button @click="manualSelectOption" class="btn btn-outline-success">manual Select</button>
</div>
<div v-if="autoGenerate">
    <auto-generate :data="data" :priData="priData" @submit-file="submit" @go-back="goBack"></auto-generate>
</div>
<div v-if="manualSelect">
    <EmployeeSelector :data="data" :priData="priData" @submit-file="submit" @go-back="goBack"></EmployeeSelector>
</div>
</div> 
</template>
<script>
import EmployeeSelector from './EmployeeSelector.vue'
import AutoGenerate from './AutoGenerate.vue'
export default{
    components:{
        EmployeeSelector:EmployeeSelector,
        AutoGenerate:AutoGenerate
    },
    props:{
        data:null,
        priData:null
    },
    data(){
        return{
            autoGenerate:false,
            manualSelect:false

        }
    },
    methods:{
        autoGenerateOption(){
            this.autoGenerate=!this.autoGenerate
        },
        manualSelectOption(){
            this.manualSelect=!this.manualSelect
        },
        submit(selectedList){
            this.$emit('submitFile',selectedList);
        },
        goBack(){
            this.autoGenerate=false
            this.manualSelect=false
        }
    }
}
</script>
<style>
.btn-outline-danger{
    margin:10px;
}
</style>