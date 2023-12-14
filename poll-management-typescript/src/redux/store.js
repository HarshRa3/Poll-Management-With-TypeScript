import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

const store=configureStore({
    reducer:rootReducer,
},)
export  default store
export const {dispatch}=store