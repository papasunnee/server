const mongoose = require('mongoose')
const Schema = mongoose.Schema ;

const contactFormSchema = new Schema({
    firstname : {type : String , required : true},
    lastname :  {type : String , required : true},
    email :  {type : String , required : true},
    country :  {type : String , required : true},
    service :  {type : String , required : true},
    companySize :  {type : String , required : true},
    message :  {type : String , required : true},
})

module.exports = mongoose.model('contactforms' , contactFormSchema )