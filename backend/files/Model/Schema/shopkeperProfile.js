const mongoose=require("mongoose")
const Schema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'enter the name']
    },
    email:{
        type:String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required:[true,"enter the email"]
    },
    password:{
        type:String,
        minlength: [3,"enter minimum length of three"],
        trim: true,
        required: [true,'enter the password'],
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
        default:'shopkeper'
    },
    shopName:{
        type:String,
        required:[true,'enter the shoap name']
    }

})


export default mongoose.model('shoapkeperProfile',Schema)