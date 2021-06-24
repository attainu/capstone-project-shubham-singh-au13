import 'babel-polyfill'
import mongooseConnection from './files/Model/Connect'
import route from './files/Controller/AllRoutes/index'
const cookiePraser=require("cookie-parser")
const server=require("express")  
const fileUpload=require("express-fileupload")
const app=server()

// use Cors for fronTend
const cors=require("cors")

const Port = process.env.PORT||2000

mongooseConnection()
app.use(server.json())
app.use(server.urlencoded({extended:true}))
app.use(cookiePraser())
app.use(cors())

// upload file at temprarey location
app.use(fileUpload({
    useTempFiles:true,
}))

// adding routes
app.use(route)
// checking page not found error
app.use((req,resp,next)=>{
    const err=new Error ("page Not Found")
    next(err)

})

// checking the app error
app.use((err,req,resp,next)=>{
    return resp.status(400).json({
        data:[],
        err:{msg:err.message}
    })
})




app.listen(Port,()=>{
    console.log(`listen at port ${Port}`)
})
