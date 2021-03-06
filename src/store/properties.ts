import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Axios from 'axios'
import { Response } from '../model/response'
import { AppDispatch, AppThunk } from './store'

// Slice
const properties = createSlice({
    name: 'properties',
    initialState: {
        loading: false,
        response: null as null | Response,
    },
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setResponse: (state, action: PayloadAction<null | Response>) => {
            state.response = action.payload
        },
    },
})

export default properties

const client = Axios.create()

export const get_rating = (city: string, zipcode: string, current_payment: number, beds: number, baths: number, radius: number): AppThunk => async (
    dispatch: AppDispatch
) => {
    dispatch(properties.actions.setLoading(true))
    try {
        const res = await client.post('/', {
            city,
            zipcode,
            current_payment,
            beds,
            baths,
            radius,
        })

        console.log(JSON.parse(JSON.stringify(res.data)))
        dispatch(properties.actions.setResponse(res.data))
    } catch (e) {
        console.error(e.message)
    } finally {
        dispatch(properties.actions.setLoading(false))
    }
}
