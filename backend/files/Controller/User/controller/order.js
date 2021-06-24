import AllMedicine from './../../../Model/Schema/Addmedicine'
import BuyMedicine from './../../../Model/Schema/buyMedicine'
import AllUser from './../../../Model/Schema/userProfile'
const order={
    billOrder:async(req,resp)=>{
        const currentUser=await AllUser.findOne({_id:req.userId})
        if (currentUser.buy==false){
            return resp.status(200).json({
                data: [],
                err:{msg:"please add to this item to cart for buy"}
            })
        }
        const orderedMedicine= await BuyMedicine.findOne({_id:req.params.id})
        const shopkeperDetail=await AllMedicine.findOne({_id:orderedMedicine.medicineId
        }).populate('shopKeperId')
        return resp.status(200).json({
            data:[{
                userDetail:{
                    name:currentUser.name,
                    email:currentUser.email,
                    mobileNo:currentUser.mobileNo
                }
            },
            {
                orderedMedicine:{
                    date:orderedMedicine.date,
                    quantity:orderedMedicine.quantity,
                    Address:orderedMedicine.deliveryPlace
                }
            },{
                medicineDetail:{
                    name:shopkeperDetail.name,
                    price:shopkeperDetail.price,
                }
            },
            {
                shopkeperDetail:{
                    name:shopkeperDetail.shopKeperId.name,
                    shopName:shopkeperDetail.shopKeperId.shopName,
                    email:shopkeperDetail.shopKeperId.email
                }
            }
        ],
        })
    },
    allOrders:async(req,resp)=>{
        let allMedicine=await BuyMedicine.find({buyerId:req.userId,buy:true}).populate('buyerId').populate(
            'medicineId')
        let data=allMedicine.map(i=>{
            return {buydetail:{
                date:i.date,quantity:i.quantity,address:i.deliveryPlace
            },medicine:{name:i.medicineId.name,price:i.medicineId.price,photo:i.medicineId.photo},
            userDetail:{name:i.buyerId.name,email:i.buyerId.email,mobileNo:i.buyerId.mobileNo}
        }
        })
    return resp.status(200).json({
        data,
        err:{}
    })
    }
}
export default order;