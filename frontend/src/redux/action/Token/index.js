import {TOKEN} from './../../actionTypes'
// this function is call when when we recive a token which is comming from fetch api 
// 
const VALIDATION={
    // create token function is used to store the token which is comming from backend 
    // and we store that data in token 
    createToken:(data)=>(dispatch)=>{
        dispatch({
            type:TOKEN.createdToken,
            payload:data
        })
        return 
    },
    // on logout this function will run first to remove  the token and get the token who have 
    // signin or login
    removeToken:()=>(dispatch)=>{
        dispatch({
            type:TOKEN.removeToke
        })
        return 
    }
}
export default VALIDATION