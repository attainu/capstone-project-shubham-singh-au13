import medicineTable from './../../../Model/Schema/Addmedicine'
const mongoose=require('mongoose')
const medicine={
    addMedicine:async(req,resp)=>{
        try{
            req.ShoapkeperId= mongoose.Types.ObjectId(req.ShoapkeperId)
        let  newMedicine=new medicineTable({
            ...req.body,
            shopKeperId:req.ShoapkeperId,
            photo:req.result
        })
        
        await newMedicine.save()
        return resp.status(200).json({
            data:[newMedicine],
            err:{}
        })
    }
    catch(e){
        if(e){
            if(e instanceof mongoose.Error.ValidationError){
                let fields={}
                for(let field in e.errors ){
                    fields[field]=e.errors[field].message
                }
                return resp.status(400).json({
                    data:[],
                    err:fields
                })
            }
            else{
                return resp.status(400).json({
                    data:[],
                    err:{msg:e.message}
                })
            }
        }
        return resp.status(400).json({
            data:[],
            err:{msg:e.message}
        })
    }
    },
    showmedicine:async(req,resp)=>{
        try{
        const  query={...req.query} 
        let medicines=await medicineTable.find({quantity:{ $gt: 0},...query}).sort({ price : 1}).sort({quantity:-1})
        return resp.json({
            data:medicines, 
            err:{}
        })
    }
    catch(e){
        return resp.status(400).json({
            data:[],
            err:{msg:e.message}
        })
    }
    },
    updateMedicine:"code of update medicine"
}
export default medicine