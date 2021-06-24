const mongoose=require("mongoose")
const Schema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'enter the name']
    },
    email:{
        type:String,
        required:[true,"enter the email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        
    },
    password:{
        type:String,
        required: [true,'enter the password'],
        minlength: [3,"enter minimum length of three"],
        trim: true
    },
    profilePic:{
        type:String
    },
    Address:{
        type:String,
        required:[true,'enter the address']
    },
    mobileNo:{
        type:String,
        match:[/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,"enter the correct mobile number"],
        required:[true,"enter the mobileNo"]
    },
    type:{
        type:String,  
        default:'user'
    }
})


export default mongoose.model('userProfile',Schema)