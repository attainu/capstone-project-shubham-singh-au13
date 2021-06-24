import { TOKEN } from "../actionTypes"
const initialState=''
// this function is used to store the token value in store
const Token=(state,action)=>{
    state=state||localStorage.getItem('token')||initialState
    switch(action.type){
        case TOKEN.createdToken:
            localStorage.setItem('token',action.payload)
            return action.payload
        case TOKEN.removeToke:
            localStorage.removeItem('token')
            return ''
        default:
            return state
    }
}
export default Token