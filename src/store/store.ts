import { configureStore, Action } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'

import properties from './properties'

const reducer = combineReducers({
    // here we will be adding reducers
    properties: properties.reducer,
})

const store = configureStore({
    reducer,
})

export default store

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
