import { CurrentCostumerReducer } from "./CustumerSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
    reducer: {
        CurrentCostumer: CurrentCostumerReducer
    }
});
