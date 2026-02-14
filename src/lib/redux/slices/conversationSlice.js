import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversation: null
}

export const conversationalSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    changeConversation: (state, action) => {
      // console.log("changeConversation", action.payload)
      if (state.conversation !== null && state.conversation.id == action.payload.id) {
        return
      }
      state.conversation = action.payload
    },
    addConversation: (state, action) => {
      state.conversation.messages.push(action.payload)
    },
    updateConversation: (state, action) => {
      const { id, message } = action.payload
      const existingConversation = state.conversation.messages.find((conversation) => conversation.id === id)
      if (existingConversation) {
        existingConversation.message = message
      }
    },
    removeConversation: (state, action) => {
      state.conversation.messages = state.conversation.messages.filter((message) => message.id !== action.payload)
    }
  }
})

export const { changeConversation, addConversation, updateConversation, removeConversation } = conversationalSlice.actions

export default conversationalSlice.reducer