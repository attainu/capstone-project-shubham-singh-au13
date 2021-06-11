import AllShoapkeper from './../../../Model/Schema/shopkeperProfile'
const bcrypt=require("bcrypt")
const profile={
    ShowProfile:async(req,resp)=>{
        let Shoapkeper= await AllShoapkeper.findOne({_id:req.ShoapkeperId})
        return resp.json({
            Shoapkeper
        })
    },
    changeProfile:async(req,resp)=>{
        try{
            if(req.body.password.length>=3){
                let salt=await bcrypt.genSalt(8)
                req.body.password=req.body.password.length>=3?await bcrypt.hash(req.body.password,salt):req.body.password
            }

        else{
        let password=await AllShoapkeper.findOne({_id:req.ShoapkeperId})
        req.body.password=password.password
        }
        let url=await AllShoapkeper.findOne({_id:req.ShoapkeperId})
        url=url.profilePic
        await AllShoapkeper.findOneAndUpdate({_id:req.ShoapkeperId},{$set:{...req.body,profilePic:req.result?req.result:url}},{new: true})
        return resp.status(200).json({
            data:["data updated successfully"],
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
export default profile