const mongoose=require("mongoose")
const  Uri="mongodb+srv://shubham-72:mondob1@cluster0.cieyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const connect=async()=>{
    try{
        await mongoose.connect(Uri,{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify: false })
        console.log('connect')
    }
    catch(e){
        console.log(e.message)
    }
}
export default connect