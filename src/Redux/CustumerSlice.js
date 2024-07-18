import { createSlice } from "@reduxjs/toolkit";
let initialState = { CurrentCostumerr: 0};
let CurrentCostumer = createSlice({
    name: "CurrentCostumer",
    initialState,
    reducers: {
        SetCurrentCustomer(state ,value) {
            state.CurrentCostumerr =value.payload ;
        }
    }
});

export const CurrentCostumerReducer = CurrentCostumer.reducer;
export const { SetCurrentCustomer } = CurrentCostumer.actions;