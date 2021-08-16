import {createStore} from 'redux'
import cakeReducer  from './redux/cake/cakeReducer.js'

const store = createStore(cakeReducer)

export default store

