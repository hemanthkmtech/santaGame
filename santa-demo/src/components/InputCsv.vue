<template>
    <div class="main-div bg-info bg-gradient">
        <h3>secret santa game</h3> 
    <div v-if="!employeeData">
        <div class="custom-file">
        <input type="file" @change="employeeFile" class="custom-file-input" id="inputGroupFile03">
        <label class="custom-file-label" for="inputGroupFile02">Choose employee xls file</label>
        </div>
        <div class="custom-file">
        <input type="file" @change="priFile" class="custom-file-input" id="inputGroupFile03">
        <label class="custom-file-label" for="inputGroupFile02">Choose secret-santa-previous year xlsx file</label>
       </div>
       <div>
        <button :disabled="!empSelectedFile && !priSelectedFile" @click="uploadFile" class="btn btn-success">UploadFile</button>
        </div>
        </div>
        <div v-if="employeeData">
            <option-component :data="employeeData" :priData="priviousYearData" @submit-file="submit"></option-component>
        </div>
     </div>
</template>
<script>
import axios from 'axios';
import optionComponent from './optionComponent.vue';
export default {
    name:"input-csv",
    data(){
        return{
            path:"",
            empSelectedFile:"",
            priSelectedFile:"",
            employeeData:null,
            priviousYearData:null
        }
    },
    components:{
        optionComponent:optionComponent
    },
    methods:{
        employeeFile(e){
        this.empSelectedFile=e.target.files[0];
       }, 
       priFile(e){
        this.priSelectedFile=e.target.files[0];
       },
       uploadFile(){
        const fileFormat = new FormData();
        fileFormat.append('file',this.empSelectedFile);
        fileFormat.append('file1',this.priSelectedFile);
        axios.post("http://localhost:8989/upload",fileFormat)
        .then(res=>{
            this.employeeData=res.data.employeeData;
            this.priviousYearData=res.data.priviousYearData;
        }).catch(err=>{
            alert("Worng File type choice proper file")
            console.log(err);
        })
       },
       submit(selectedList){
        const formFormat = new FormData();
        formFormat.append("data",JSON.stringify(selectedList))
        console.log(selectedList)
        axios.post('http://localhost:8989/submit',formFormat
            )
            .then(res=>{
                alert("file generated at : "+ res.data)
                console.log(res)
            //this.employeeData=res.data.employeeData;
            //this.priviousYearData=res.data.priviousYearData;
        }).catch(err=>{
            alert("Worng File type choice proper file")
            console.log(err);
        })
       }
    }

}
</script>
<style scoped>

div{
    margin: 20px;
}
    h3 {
            margin: 10px auto;
            text-align: center;
            color: black;
            font-size: 4em;
            transition: 0.5s;
            font-family: Arial, Helvetica, sans-serif;
            text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc,
                0 3px 0 #ccc, 0 4px 0 #ccc,
                0 5px 0 #ccc, 0 6px 0 #ccc,
                0 7px 0 #ccc, 0 8px 0 #ccc,
                0 9px 0 #ccc, 0 10px 0 #ccc,
                0 11px 0 #ccc, 0 12px 0 #ccc,
                0 5px 8px rgba(0, 0, 0, 0.5);
        }
    .main-div{
        height:400px;
    }
</style>

