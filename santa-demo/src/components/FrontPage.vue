<template>
    <div>
    <h1 id="msg">{{ msg }}</h1>
    <spam>About:</spam>
    <p>{{about}}</p>
    <spam>Rules:</spam>
    <ul>
        <li v-for="rule in rules" :key="rule">{{rule}}</li>
    </ul>
    </div>
</template>
<script>
export default {
    name:"FrontPage",
    data(){
        return{
           msg:"Welcome To Santa Game" ,
           rules:["An employee cannot choose themselves as their secret child.", 
                   "An employee cannot be assigned to the same secret child as in the previous  year's Secret Santa event, if applicable.", 
                   "Each employee must have exactly one secret child.",
                   `Each secret child should be assigned to only one employee.`],
           about:`Each  employee is required to choose another employee as their secret child, to whom they will  anonymously give a gift during the event`
        }
    }

}
</script>
<style>
#msg{
    color:white;
}
spam{
    color: wheat;
    font-size: 30px;
    align:left;
}
li{
    color: aliceblue;
    align-items: left;
}
p{
    color: white;
}
</style>