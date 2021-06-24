import { ALLMEDICINE } from "../../actionTypes"
import LoderOperation from './../Loder/index';

const AllMedicines={
    // this function is used to save the data of All medicine
    showMedicine:()=>(dispatch)=>{
        dispatch(LoderOperation.show())
        fetch(`http://localhost:2000/shoapkeper/allmedicine`).then(d=>d.json()).then(d=>{
            dispatch(LoderOperation.hide())
            if(Object.keys(d.err).length===0){
            dispatch({
                type:ALLMEDICINE.addallMedicineHome,
                payload:d.data
            })
            }
        }).catch((e)=>{
          dispatch(LoderOperation.hide())
    })}
    ,
    // this function is used to remove all the data of medicine which is stored
    removeMedicine:()=>(dispatch)=>{
        dispatch({
            type:ALLMEDICINE.removeAllMedicineHome
        })
    }
}
export default AllMedicines