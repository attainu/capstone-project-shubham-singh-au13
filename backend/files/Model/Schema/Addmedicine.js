const mongoose=require('mongoose')

const medicineSchema=mongoose.Schema({
    shopKeperId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'shoapkeperProfile'
    },
    name:{
        type:String,
        required:[true,'please enter the medicine name']
    },
    quantity:{
        type:Number,
        required:[true,'enter the number of medicine you want to add']
    },
    date:{
        type:Date,
        default:Date.now()
    },
    price:{
        type:Number,
        required:[true,"Enter the price of one quantity of medicine"]
    },
    photo:{
        type:String,
        required:[true,'please upload the medicine pic']
    }

})
export default mongoose.model('Addmedicine',medicineSchema)