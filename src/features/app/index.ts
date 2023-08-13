import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ImageProps, InitialStateProps} from "./types"
import {v4 as uuidv4} from 'uuid';


const initialState: InitialStateProps = {
    images: undefined
}

const appSlice = createSlice({
        name: "app",
        initialState,
        reducers: {
            addImages: (state, action: PayloadAction<string>) => {
                const image: ImageProps = {
                    id: uuidv4(),
                    date: new Date().toLocaleDateString('tr-TR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    file: action.payload
                }
                if (state.images) {
                    state.images = [...state.images, image];
                } else {
                    state.images = [image];
                }
            },
            deleteImage: (state, action: PayloadAction<string>) => {
                if (!state.images) return;

                const findIndex = state.images.findIndex(item => item.id === action.payload)

                if (findIndex === -1) return;

                state.images = state.images.splice(findIndex, 1);

            }
        }
    })
;

export const {
    addImages,
    deleteImage
} = appSlice.actions;

export default appSlice.reducer;