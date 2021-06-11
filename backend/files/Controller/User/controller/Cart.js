
import AllShopkeper from './../../../Model/Schema/shopkeperProfile'
import AllMedicine from './../../../Model/Schema/Addmedicine'
import BuyMedicine from './../../../Model/Schema/buyMedicine'
import AllUser from './../../../Model/Schema/userProfile'
const mongoose=require('mongoose')
const Cart={
    AddingMedicineCart:async(req,resp)=>{
        try{
        const medicineId=req.params.id
        const UserId=req.userId
        let findMedicineDetail=await AllMedicine.findOne({_id:medicineId})
        let findMedicineInBuyCart=await BuyMedicine.findOne({medicineId:medicineId,buyerId:UserId,cart:true})
        if(findMedicineInBuyCart){
            return resp.status(401).json({
                data:[],
                err:{msg:"You have alredy added medicine to cart Please check"}
            })
        }
        if(req.body.quantity>findMedicineDetail.quantity){
            return resp.status(401).json({
                data:[],
                err:{msg:"We do not have this much quantity of medicine"}
            })
        }
        let newBuyer=new BuyMedicine({
            ...req.body,
            buyerId:UserId,
            medicineId:medicineId,
            cart:true
        })
        await newBuyer.save()
        return resp.status(200).json({
            data:["added to cart"],
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
                    return resp.json({
                        data:[],
                        err:fields
                    })
                }
                else{
                    return resp.json({
                        data:[],
                        err:{msg:e.message}
                    })
                }
            }
        }
    },
    showcartItems:async(req,resp)=>{
        try{
        let Allcarditems=await AllUser.aggregate([
            {
                $match:{
                    _id:mongoose.Types.ObjectId(req.userId)
                }
            },
            {
                $lookup:{
                    from: 'buymedicines',
                    localField: '_id',
                    foreignField: 'buyerId',
                    as: 'medicine'
                }
            }
        ])

        let Allmedicines=Allcarditems[0].medicine.filter(i=>i.cart===true)
        const data=Allmedicines.map(async(item)=>{
            let MedidineDetail=await AllMedicine.findOne({_id:item.medicineId})
            return ({_id:item.id,buy:item.buy,date:item.date,cart:item.cart,quantity:item.quantity,buyerId:item.buyerId,medicineDetail:{...MedidineDetail._doc}})
        })
        
        Promise.all(data).then(d=>{
            return resp.status(200).json({
                data:d,
                err:{}
            })
        }).catch(e=>{
            return resp.status(400).json({
                data:[],
                err:{err:e.message}
            })
        })
        
    }
    catch(e){
        return resp.status(401).json({
            data:[],
            err:{msg:e.message}
        })
    }
    }
}
export default Cart