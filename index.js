const redux = require('redux') // We cannot use the name redux in our code, we need to use the require function to import the redux module
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const reduxLogger = require('redux-logger')

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware

//Action describe the type of action that was taken
// the buycake function is the action creator that we reference in our reducer using the action.type with the value BUY_CAKE
//As soon as the buycake function is dispatched, the reducer will be called and the state of the application will be changed

function buycake(){ //Action creator:  i.e. function that returns an action
    return{ //An action with a type property, 
        type: BUY_CAKE, //type is a constant, the purpose of action types is to help you identify the action when it is passed to the reducer
        info: 'First redux action'// info is a property of the action 
    }
}
function buyIceCream(){
    return{
        type:BUY_ICECREAM
    }
}

// (previousState, action)=> newState //Reducer 

const initialCakeState = { //this is the initial state of the store
    numOfCakes:10
}

const initialIceCreamState = { 
    numOfIceCreams:20
    
}//this is the initial state of the store

//Reducer takes effect when an action is dispatched
//Reducer describes the state of the application after the action was taken
//How does reducer know what to do with the action? well reducer is passed in the action and the state of the application
const cakeReducer = (state = initialCakeState, action) =>{ //action is to be passed in from the action creator, action is the action that was taken
    switch(action.type){ //action.type is the type of action that was taken e.g. if action.type is BUY_CAKE then the reducer will do the following
        //case BUY_CAKE: means that the action is BUY_CAKE 
        case BUY_CAKE:return{//this is the new state of the application
            ...state, // copys the previous state numOfCakes to the new state
            numOfCakes:state.numOfCakes - 1 //subtracts 1 from the number of cakes
        }
        default : return state
    }
}


const iceCreamReducer =(state = initialIceCreamState, action) =>{
    switch(action.type){
        case BUY_ICECREAM:return{
            ...state,
            numOfIceCreams:state.numOfIceCreams - 1
        }
        default : return state
    }
}

//Now when we dispatch an action, both reducers will recieve that action but only one state will be affected and the other wont
const rootReducer = combineReducers({ // each key value pair in the object is a reducer
    cake:cakeReducer, 
    iceCream:iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger)) //This is the store, it is the object that we will use to access the state of the application
//passing in the rootReducer to createStore allows
//The 2nd argument is the middleware that we want to use to log the actions that are being dispatched

console.log('Inital state', store.getState()) //This will print the initial state of the application)

//subscribe is a function that we use to subscribe to the store that will be called when the store changes and unsubsribe when the store is unsubscribed
//How do we know if the store is unsubscribed? well we check the store.subscription property to see if it is null, it returns null if the store is not subscribed via the subscribe function
//When the store changes, the subscribe function will be called and the state of the application will be printed
const unsubscribe = store.subscribe(() => {})

store.dispatch(buycake()) //This will dispatch the action buycake(), dispatch is a function that we can use to dispatch actions to the store
store.dispatch(buycake())
store.dispatch(buycake()) 

store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
console.log(store.getState().iceCream.numOfIceCreams) //This will print the number of iceCreams in the state after the action was taken

unsubscribe()//This will call the unsubscribe function and stop the subscription to the store

