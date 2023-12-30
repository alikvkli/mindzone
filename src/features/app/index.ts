import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialStateProps } from "./types"


const initialState: InitialStateProps = {
    appName: "MindZone",
    step: {
        week: 1,
        task: 2
    }
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeAppName: (state, action: PayloadAction<InitialStateProps['appName']>) => {
            state.appName = action.payload;
        },
        setStep: (state, action: PayloadAction<InitialStateProps['step']>) => {
            state.step = action.payload
        }
    }
})
    ;

export const {
    changeAppName,
    setStep
} = appSlice.actions;

export default appSlice.reducer;