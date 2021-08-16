import {BUY_CAKE} from './cakeTypes'
const initalCakeState ={
    numOfCakes:10
}

const cakeReducer =(state=initalCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes:state.numOfCakes-1
            }
        default:return state  
    }
}

export default cakeReducer