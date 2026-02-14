import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatData: null
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeChat: (state, action) => {
      // console.log("changeChatRoom", action.payload)
      if (state.chatData !== null && state.chatData == action.payload) {
        return
      }
      state.chatData = action.payload
    }
  }
})

export const { changeChat } = chatSlice.actions

export default chatSlice.reducer