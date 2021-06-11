import { TYPE } from "../actionTypes"
const initialState=''
// this will store the type value that is user or shopkeper 
const Type=(state,action)=>{
    state=state||localStorage.getItem('type')||initialState
    switch(action.type){
        case TYPE.getType:
            localStorage.setItem('type',action.payload)
            return action.payload
        case TYPE.removeType:
            localStorage.removeItem('type')
            return ''
        default:
            return state
    }
}
export default Type