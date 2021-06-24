
import { PROFILE } from './../../actionTypes/index';
// function use to store the profile detail of shopkeoper
const SHOP_KEPER={
    // used to store the detial of proofile of shopkeeper
    PROFILE:(dispatch,store)=>{
        return fetch('http://localhost:2000/shoapkeper/profile',{
            headers:{
                token:store().Token
            }
        }).then(d=>d.json()).then(d=>{
            dispatch({
                type:PROFILE.SHOPKEPER,
                payload:d
            })
        })
    }
}
export default SHOP_KEPER