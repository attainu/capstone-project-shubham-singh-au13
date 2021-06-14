const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
import AllShoapkeper from './../../../Model/Schema/shopkeperProfile'
const ShopkeperSignUp={
    PostSignUpUser:async(req,resp)=>{
        try{
        let findUser=await AllShoapkeper.findOne({$or:[{'email':req.body.email} ,{'mobileNo':req.body.mobileNo}]})
        if(findUser){
            return resp.status(200).json({
                data:[{email:req.body.email,mobileNo:req.body.mobileNo}],
                err:{msg:'mobile number or email is alredy registor'}
            })
        }
        let salt=await bcrypt.genSalt(8)
        req.body.password=req.body.password.length>=3?await bcrypt.hash(req.body.password,salt):req.body.password
        let newUser= new AllShoapkeper({
            ...req.body,profilePic:req.result?req.result:''
        })
        await newUser.save()
        const token=await jwt.sign({id:newUser._id,type:'shoapkepr'},'medicine')
        resp.cookie('token', token, { maxAge: 900000});
        return resp.status(200).json({
            data:[token,newUser.type],
            err:{}
        })}
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
                        err:e.message
                    })
                }
            }
        }
    }
}
export default ShopkeperSignUp