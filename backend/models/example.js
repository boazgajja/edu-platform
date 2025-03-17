import mangoose from "mangoose";
const exam=new mangoose.Schema({
    from:{
        type:String
    },
    to:{
        type:String,
        maxLength:50
    },
});
const model=mangoose.model("model",exam);

module.exports=model;