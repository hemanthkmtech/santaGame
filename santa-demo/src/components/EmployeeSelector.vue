<template>
<div class="main">
    <h2>Select Employee and his child for santa game in given dropdown</h2>
<div class="employee">
<label for="employee">Choce Employee : </label>
<select name="employee" id="employee" v-model="empSelectData">
    <template v-for="employee in data" :key="employee.Employee_Name" >
    <option v-if="!(selectedEmpList.includes(employee.Employee_EmailID))" :value="employee"  >{{employee.Employee_Name }}</option>
    </template>
</select>
</div>
<div class="child">
<label for="employee">Choce Child : </label>
<select name="employee" id="employee" v-model="childSelectData" v-if="empSelectData" @change="checkChild">
    <template v-for="employee in data" >
    <option v-if=" empSelectData.Employee_EmailID != employee.Employee_EmailID && ! selectedChildList.includes(employee.Employee_EmailID) "  :value="employee" :key="employee.Employee_EmailID">{{employee.Employee_Name}}</option>
    </template>
</select>
</div>
<div v-if="selectedStatus">
<small class="badge">Click Button For Next Employee</small>
<button @click="next()" class="btn btn-primary">Next</button>
</div>
<button @click="goBack" class="btn btn-outline-danger"> GoBack to Options</button>
</div>
</template>
<script>
export default {
    emits:['submitFile','goBack'],
    data(){
        return {
            empData:null,
            empSelectData:"",
            childSelectData:"",
            selectedList:[],
            selectedEmpList:[],
            selectedChildList:[],
            selectedStatus:false
        }
    },
    props:{
        data:null,
        priData:null
    },
    methods:{
        goBack(){
            console.log("go back")
            this.$emit('goBack');
        },
        next(){
            this.selectedChildList.push(this.childSelectData.Employee_EmailID)
            this.selectedEmpList.push(this.empSelectData.Employee_EmailID)
            this.selectedList.push({Employee_Name:this.empSelectData.Employee_Name,Employee_EmailID:this.empSelectData.Employee_EmailID,Secret_Child_Name:this.childSelectData.Employee_Name,Secret_Child_EmailID:this.childSelectData.Employee_EmailID})
            this.$emit("submitFile",this.selectedList)
            this.empSelectData=""
            this.childSelectData=""
            this.selectedStatus=false

        },
        checkChild(){
            console.log("inside check")
            console.log(this.data.length)
            if(this.priData){
            let empData=null;
            let status=false;
              for(empData in this.priData){
                let currentData=this.priData[empData];
                if(currentData.Employee_EmailID == this.empSelectData.Employee_EmailID){
                    if(currentData.Secret_Child_EmailID == this.childSelectData.Employee_EmailID){
                        alert("this child selected privious year plase choice different employee or selected")
                        this.childSelectData=""
                        status=true;
                        this.selectedStatus=false;
                    }
                }
              }
              if(!status){
                this.selectedStatus=!status;
                //alert("the child selected click for next select")
            }

        }
    }
}
}
</script>
<style scoped>
.employee{
display:flex;
float:left
}
.child{
    display: flex;
    float: right;

}
.main{
    width:520px;
    align-items: center;
    margin-left: 350px;

}
</style>
