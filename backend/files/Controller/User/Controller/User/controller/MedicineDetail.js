import AllShopkeper from './../../../Model/Schema/shopkeperProfile'
import AllMedicine from './../../../Model/Schema/Addmedicine'
// import AllUser from './../../../Model/Schema/userProfile'
// const mongoose=require('mongoose')

const Medicine={
    medicineDetail:async(req,resp)=>{
        try{
            let medicine=await AllMedicine.findOne({_id:req.params.id}).populate('shopKeperId')
            const {date,_id,price,name,quantity,photo}=medicine
            
            return resp.json({
                data:[{medicine:{_id:_id,date:date,price:price,name:name,quantity:quantity,photo:photo}}
                ,{shopkeper:{name:medicine.shopKeperId.name
                ,email:medicine.shopKeperId.email,Address:medicine.shopKeperId.Address
                ,shopName:medicine.shopKeperId.shopName,profilePic:medicine.shopKeperId.profilePic}}],
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

export default Medicine