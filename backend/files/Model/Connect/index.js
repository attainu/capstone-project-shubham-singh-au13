const mongoose=require("mongoose")
const  Uri="mongodb://localhost:27017/Medicene"
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