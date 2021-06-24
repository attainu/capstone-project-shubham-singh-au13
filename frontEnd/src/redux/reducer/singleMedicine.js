import {SINGLEADMINMEDICINE } from "../actionTypes"

// this is used to store the all the medicine which is created by single shopkeper
const initialState=[]
const SingleAdminMedicine=(state,action)=>{
    state=state||initialState
    switch(action.type){
        case SINGLEADMINMEDICINE.updatemedicine:
            return [...action.payload]
        case SINGLEADMINMEDICINE.removemedicine:
            return []
        default:
            return state
    }
}
export default SingleAdminMedicine