const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser =require('body-parser')
const cors = require('cors')
const xlsx = require('xlsx')
const path=require('path')

const app = express();

app.use(express.static('public'))
app.use(fileUpload())
app.use(cors())
app.use(bodyParser.json())
let fileName=""

function accessData(myFileName){
    const filePath=path.resolve(`${__dirname}/public`,myFileName)
    const dataSheet  = xlsx.readFile(filePath);
    const xlSheetNames=dataSheet.SheetNames;
    const jsonData = xlsx.utils.sheet_to_json(dataSheet.Sheets[xlSheetNames[0]])
    jsonData.map(employee=>{
        //console.log(`Emaployee Name : ${employee.Employee_Name} employee Id : ${employee.Employee_EmailID}`)
    })
    return jsonData;
}

function createXmlFile(data){

const filePath=path.resolve(`${__dirname}/public`,"result.xlsx")
let workSheet=xlsx.utils.json_to_sheet(JSON.parse(data))
let workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook,workSheet,"employee");
xlsx.writeFile(workbook,filePath)
return filePath
}

app.post("/upload",(req,res)=>{
    if(!req.files){
        res.status(500).send("file not found");
    }
    let employeeData="";
    let priviousYearData="";
    const myFile=req.files.file;
    const myFile1=req.files.file1;
    fileName=myFile.name;
    myFile.mv(`${__dirname}/public/${myFile.name}`,function(err){
        if(err){
           return res.status(500).send({msg:"error occured"})
        }
        
        

    })
    myFile1.mv(`${__dirname}/public/${myFile1.name}`,function(err){
        if(err){
           return res.status(500).send({msg:"error occured"})
        }
        

    })
    employeeData=accessData(myFile.name);
    priviousYearData=accessData(myFile1.name);
    res.status(200).send({name:myFile.name,path:`/${myFile.name}`,employeeData:employeeData,priviousYearData:priviousYearData});
})
app.post("/submit",(req,res)=>{
    let path= createXmlFile(req.body.data)
    res.status(200).send(path)
})


app.listen(8989,()=>{
    console.log("listen on port 8989")
});