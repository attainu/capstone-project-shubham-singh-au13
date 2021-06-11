
import { PROFILE } from './../../actionTypes/index';
const USER={
    // on running this function this will store the profile of user
    PROFILE:(dispatch,store)=>{
        return fetch('http://localhost:2000/user/profile',{
            headers:{
                token:store().Token
            }
        }).then(d=>d.json()).then(d=>{
            dispatch({
                type:PROFILE.USER_PROFILE,
                payload:d
            })
        })
    }
}
export default USER