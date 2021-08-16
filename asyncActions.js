const redux = require('redux');
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default //Import thunk middleware
//Redux Thunk middleware allows you to write action creators that return a function instead of an action.
const axios = require("axios")

const intitialState={
  loading:false,
  users:[],
  error:''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest =()=>{
    return{
        type:FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess=(users)=>{
    return{
        type:FETCH_USERS_SUCCESS,//type is a constant that is passed to the reducer in order to update the state
        payload:users //payload is the data we want to send to the store
    }
}
const fetchUsersFailure=(error)=>{
    return{
        type:FETCH_USERS_FAILURE,
        payload:error//payload is the data we want to send to the store
    }
}

const fetchUsers = () =>{ //passes the dispatch function to the middleware
    return function(dispatch){ //returns a function with the dispatch function as an argumen which allows us to dispatch actions
        dispatch(fetchUsersRequest())//dispatch the action to the store
        axios.get('https://jsonplaceholder.typicode.com/users')//make the request
        .then(response=>{//hanlde the response
            const users = response.data.map(user=> user.id)//get the ids of the users
            dispatch(fetchUsersSuccess(users))//dispatch the action to the store passing the users
        })
        .catch(error=>{
            dispatch(fetchUsersFailure(error))// if there is an error dispatch the action to the store
        })
    }
}

const reducer = (state=intitialState,action) =>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading:false,
                users:action.payload,
                error:''
            }
            case FETCH_USERS_FAILURE:
                return{
                    loading:false,
                    users:[],
                    error:action.payload
                }
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware)) //passes the reducer and the thunkmiddleware to the store
//passing applyMiddleware to the store so we can use the action creator to return a function intead of an action
//Th function thunkMiddleware allows us to perform async actions using axios    
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())