const route=require('express').Router()
import UserRoutes from './../User/routes/index'
import Shoapkeper from './../Admin/routes'
import logout from './../logout/index';
route.use('/user',UserRoutes)
route.use('/shoapkeper',Shoapkeper)
route.get('/logout',logout)
export default route
