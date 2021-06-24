const mongoose=require('mongoose')
import AllShopkeper from './../../../Model/Schema/shopkeperProfile'
import AllMedicine from './../../../Model/Schema/Addmedicine'
const AllMedicineAddedBySingleShopkeper={
    detailOfMedicine:async(req,resp)=>{
        try{
            let shopKeperId=mongoose.Types.ObjectId(req.ShoapkeperId)
            let AllMedicine=await AllShopkeper.aggregate([
                {
                    $match:{
                        _id:shopKeperId
                    }
                },
                {
                    $lookup:{
                        from: 'addmedicines',
                        localField: '_id',
                        foreignField: 'shopKeperId',
                        as: 'medicine'
                      }
                }
            ])
            return resp.status(200).json({
                data:AllMedicine,
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
    editMedicine:async(req,resp)=>{
        try{
        let medicineId=mongoose.Types.ObjectId(req.params.id)
        await AllMedicine.findByIdAndUpdate({_id:medicineId},{$set:{...req.body,date:Date.now()}},{new: true})
        return resp.status(200).json({
            data:['data updated successfully'],
            err:{}
        })
        }
        catch(e){
            return resp.status(400).json({
                data:[],
                err:{msg:e.message}
            })
        }
    }
}
export default AllMedicineAddedBySingleShopkeper