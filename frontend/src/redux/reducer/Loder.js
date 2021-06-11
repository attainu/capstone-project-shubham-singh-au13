import { LODER } from "../actionTypes"
const initialState=false
// this redux store the value which is used in modal
const Loder=(state,action)=>{
    state=state||initialState
    switch(action.type){
        case LODER.showLoder:
            return true
        case LODER.hideLoder:
            return false
        default:
            return state
    }
}
export default Loder