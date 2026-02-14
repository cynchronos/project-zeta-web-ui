import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callData: null
}

export const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    changeCall: (state, action) => {
      // console.log("changeCall", action.payload)
      if (state.callData !== null && state.callData == action.payload) {
        return
      }
      state.callData = action.payload
    }
  }
})

export const { changeCall } = callSlice.actions

export default callSlice.reducer