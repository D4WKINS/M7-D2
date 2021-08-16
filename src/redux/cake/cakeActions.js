import {BUY_CAKE} from './cakeTypes.js'// The curly brackets around BUY_CAKE are required because we are importing a constant variable.
//An action is a plain object with a type property that indicates the type of action being performed.
export const buyCake = () => {
    return{
        type: BUY_CAKE
    }

}