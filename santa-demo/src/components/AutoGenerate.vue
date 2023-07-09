<template>
    <div>
    <div v-if="!(this.selectedList.length==this.data.length)">
    <lable>Plase click button Bellow to generate result File</lable><br>
    <button  @click="generateEmployeeChildSets" class="btn btn-outline-success">Auto generate</button>
    </div>
    <div v-if="this.selectedList.length==this.data.length">
        <lable>Auto Generate Completed</lable><br>
        <button @click="sendResult" class="btn btn-outline-success">Generate Excel File</button>
        <button @click="regerate" class="btn btn-outline-danger">Regenerate</button>
    </div>
    <button @click="goBack" class="btn btn-outline-danger"> GoBack to Options</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            empData:null,
            empSelectData:"",
            childSelectData:"",
            selectedList:[],
            selectedEmpList:[],
            selectedChildList:[],
        }
    },
    props:{
        data:[],
        priData:[]
    },
    methods:{
        goBack(){
            this.$emit('goBack');
        },
        generateEmployeeChildSets(){
            let currentEmp=null;
            for(currentEmp in this.data){
            this.empSelectData = this.data[currentEmp];
            if(this.priData){
            let empData=null;
            let status=false;
            let childStatus=true;
            while(childStatus){
                status=false;
                let id=Math.floor(Math.random() * this.data.length);
                id=id%15;
                this.childSelectData=this.data[id]
                
              for(empData in this.priData){
                let currentData=this.priData[empData];
                if(currentData.Employee_EmailID == this.empSelectData.Employee_EmailID){
                    if(currentData.Secret_Child_EmailID == this.childSelectData.Employee_EmailID){
                        //alert("this child selected privious year plase choice different employee or selected")
                        this.childSelectData=""
                        status=true;
                        break;
                    }
                }
              }
              if(!status){
                childStatus=false; 
                }
            }
            if(!status){
            this.selectedChildList.push(this.childSelectData.Employee_EmailID)
            this.selectedEmpList.push(this.empSelectData.Employee_EmailID)
            this.selectedList.push({Employee_Name:this.empSelectData.Employee_Name,Employee_EmailID:this.empSelectData.Employee_EmailID,Secret_Child_Name:this.childSelectData.Employee_Name,Secret_Child_EmailID:this.childSelectData.Employee_EmailID})
            this.empSelectData=""
            this.childSelectData=""
            this.selectedStatus=false
            }
        }
    }
},
sendResult(){
    this.$emit("submitFile",this.selectedList)
},
regerate(){
    this.empData=null
    this.empSelectData=""
    this.childSelectData=""
    this.selectedList=[]
    this.selectedEmpList=[]
    this.selectedChildList=[]
}
}
}

</script>