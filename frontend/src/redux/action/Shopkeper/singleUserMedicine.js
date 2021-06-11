import { SINGLEADMINMEDICINE } from "../../actionTypes"
// this function is used to store the detail of detail of single Shopkeper medicines and the data is comming from backend
// which is send here
const SingleAdminMedicine={
    AddMedicines:(data)=>(dispatch)=>{
        return dispatch({
            type:SINGLEADMINMEDICINE.updatemedicine,
            payload:data
        })
    },
    // used to remove the detail of single medicine on logout
    deletemedicine:()=>(dispatch)=>{
        return dispatch({
            type:SINGLEADMINMEDICINE.removemedicine
        })
    }
}
export default SingleAdminMedicine