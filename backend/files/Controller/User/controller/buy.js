import AllShopkeper from './../../../Model/Schema/shopkeperProfile'
import AllMedicine from './../../../Model/Schema/Addmedicine'
import BuyMedicine from './../../../Model/Schema/buyMedicine'
import AllUser from './../../../Model/Schema/userProfile'
const buy={
    BUY_MEDICINE:async(req,resp)=>{
        let medicine=await AllMedicine.findOne({_id:req.params.medicine})
        let cartMedicine=await BuyMedicine.findOne({_id:req.params.cart})
        if(cartMedicine.buy==true){
            return resp.status(200).json({
                data:[],
                err:{msg:"product is alredy buyed"}
            })
        }
        if(cartMedicine.quantity<=medicine.quantity){
            await BuyMedicine.findOneAndUpdate({_id:req.params.cart},{$set:{cart:false,buy:true,deliveryPlace:req.body.address}},{new: true})
            await AllMedicine.findOneAndUpdate({_id:req.params.medicine},{$set:{quantity:medicine.quantity-cartMedicine.quantity}},{new: true})
            return resp.status(200).json({
                data:["DONE"],
                err:{}
            })
        }
        return resp.status(200).json({
            data:[],
            err:{msg:"currentle item is out of stock"}
        })
    }
}
export default buy