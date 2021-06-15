
import ShopKeper from '../container/Signup/ShopkeperSignin';
import PATH from './../config/webPath';
import Home from './../container/Home/index';
import SignUpButton from './../container/Signup/index';
import UserSignUp from './../container/Signup/UserSignup';
import LOGIN from './../compnent/LoginComponent/index';
import LoginUpButton from './../container/Login/index';
import PROFILE from './../container/Profile/index';
import USERUPDATEPROFILE from '../container/UpdateProfile/UserUpdateProfile';
import UPDATESHOPKEPERPROFILE from './../container/UpdateProfile/UpdateShopkeperprofile';
import AddingMedicine from './../container/Medicine/Addmedicine';
import AllMedicineOfSingleAdmin from './../container/Medicine/singleShopkepermedicine';
import UPDATEMEDICINE from './../container/Medicine/UpdateMedicine';
import MedicineDetail from './../container/User/Medicinedetail';
import Cart from './../container/User/Cart';
import AllCatItems from './../container/User/AllCartItems';
import Buy from './../container/User/Buy';
import Bill from '../container/User/bill';
import Orders from './../container/User/Allorder';

export const routes=[
{exact : true , path:PATH.HOME,component:Home},
{exact : true , path:PATH.SIGNUP,component:SignUpButton},
{exact : true , path:PATH.USERSIGNUP,component:UserSignUp},
{exact : true , path:PATH.SHOPKEPERSIGNUP,component:ShopKeper},
{exact : true , path:PATH.LOGIN,component:LoginUpButton},
{exact : true , path:PATH.USERLOGIN,component:LOGIN},
{exact : true , path:PATH.SHOPKEPERLOGIN,component:LOGIN},
{exact : true , path:PATH.PROFILE,component:PROFILE},
{exact : true , path:PATH.USERUPDATEPROFILE,component:USERUPDATEPROFILE},
{exact : true , path:PATH.SHOPKEPERUPDATEPROFILE,component:UPDATESHOPKEPERPROFILE},
{exact : true , path:PATH.ADDMEDICINE,component:AddingMedicine},
{exact : true , path:PATH.ALLMEDICINEOFSINGLEADMIN,component:AllMedicineOfSingleAdmin},
{exact : true , path:PATH.UPDATEMEDICINEBYADMIN,component:UPDATEMEDICINE},
{exact : true , path:PATH.MEDICINEDETAILS,component:MedicineDetail},
{exact : true , path:PATH.ADDITEMTOCART,component:Cart},
{exact : true , path:PATH.CARTITEMS,component:AllCatItems},
{exact : true , path:PATH.BUTITEMSID,component:Buy},
{exact : true , path:PATH.RECIPTS,component:Bill},
{exact : true , path:PATH.ALLORDERS,component:Orders},
]
