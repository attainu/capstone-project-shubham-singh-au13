import { LODER } from "../../actionTypes";
// this function is used when there is any fetch operation
const LoderOperation={
    // this function will ren before the fetch request made it is user side request
    show:()=>dispatch=>{
        dispatch({
            type:LODER.showLoder
        })
    },
    // this function is run after when the fetch request give some output
    hide:()=>dispatch=>{
        dispatch({
            type:LODER.hideLoder
        })
    }
}

export default LoderOperation