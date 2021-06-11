import { ALLMEDICINE } from "../actionTypes"

// this redux  store all the medicine of shopkeper which is created now
const initialState=[]
const Allmedicine=(state,action)=>{
    state=state||initialState
    switch(action.type){
        case ALLMEDICINE.addallMedicineHome:
            return [...action.payload]
        case ALLMEDICINE.removeAllMedicineHome:
            return []
        default:
            return state
    }
}
export default Allmedicine