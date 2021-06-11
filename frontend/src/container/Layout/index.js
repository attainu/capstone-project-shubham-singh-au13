import Navbar from './../../compnent/Navbar/index';

import { useSelector } from 'react-redux';
import SimpleMenu from './../../compnent/MenuItems/index';
import LODER from './../../compnent/Loder/index';
import UserMenu from './../../compnent/OrderCartIcon/index';


const Layout=(props)=>{
    const TOKEN=useSelector(({Token})=>Token)
    const TYPE=useSelector(({Type})=>Type)
    return(
        <>
        <LODER/>
        <Navbar/>
        {TYPE==='shopkeper' && TOKEN.length>0?<SimpleMenu/>:null}
        {TYPE==='user' && TOKEN.length>0?<UserMenu/>:null}
        {props.children}
        </>
    )
}
export default Layout
