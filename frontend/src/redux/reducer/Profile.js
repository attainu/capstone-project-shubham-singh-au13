import { PROFILE } from './../actionTypes/index';
const initialState={}
// this store is used to store the profile of user or shopkeper
const Profile=(state,action)=>{
    state=state||initialState
    switch(action.type){
        case PROFILE.USER_PROFILE:
            return action.payload
        case PROFILE.SHOPKEPER:
            return action.payload
        default:
            return state
    }
}
export default Profile