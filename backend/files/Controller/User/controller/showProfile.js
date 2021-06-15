import AllUser from './../../../Model/Schema/userProfile'
const bcrypt=require('bcrypt')
const profile={
    ShowProfile:async(req,resp)=>{
        let currentUser= await AllUser.findOne({_id:req.userId})
        return resp.json({
            currentUser
        })
    },
    changeProfile:async(req,resp)=>{
        try{
            if(req.body.password.length>=3){
                let salt=await bcrypt.genSalt(8)
                req.body.password=req.body.password.length>=3?await bcrypt.hash(req.body.password,salt):req.body.password
            }

        else{
        let password=await AllUser.findOne({_id:req.userId})
        req.body.password=password.password
        }
        let url=await AllUser.findOne({_id:req.userId})
        url=url.profilePic
        await AllUser.findOneAndUpdate({_id:req.userId},{$set:{...req.body,profilePic:req.result?req.result:url}},{new: true})
        return resp.json({
            data:[],
            err:{}
        })
        }
        catch(e){

            return resp.json({
                data:[],
                err:{msg:e.message}
            })
        }
    }
}
export default profile