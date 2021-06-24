const logout=(req,resp)=>{
    resp.clearCookie('token')
    return resp.json({
        data:[{logout:'logout successfull'}],
        err:{}
    })
}
export default logout