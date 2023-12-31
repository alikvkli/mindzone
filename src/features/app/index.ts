import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialStateProps } from "./types"


const initialState: InitialStateProps = {
    appName: "MindZone",
    appDescription: "Ruh Sağlığına Yönelik Beyin Egzersizleri",
    step: {
        week: 1,
        task: 1
    },
    isLogin: false,
    initalFlow: {
        step_1: false
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
        },
        setLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
        setInitialFlow: (state, action:PayloadAction<InitialStateProps['initalFlow']>) => {
            state.initalFlow = action.payload;
        }
    }
})
    ;

export const {
    changeAppName,
    setStep,
    setLogin,
    setInitialFlow
} = appSlice.actions;

export default appSlice.reducer;