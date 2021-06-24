import { TYPE } from './../../actionTypes/index';
// this function is used to store the type of user is it sopkeper or user 
// this Type will come from back end
const TYPECHECK={
    getType:(data)=>(dispatch)=>{
        dispatch({
            type:TYPE.getType,
            payload:data
        })
        return 
    },
    // this is used when we have remove the type or when we have to logout
    removeType:()=>(dispatch)=>{
        dispatch({
            type:TYPE.removeType
        })
    }
}
export default TYPECHECK