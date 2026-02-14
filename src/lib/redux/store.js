import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import callReducer from "./slices/callSlice";
import auth from "./slices/authSlice";
import { serverApi } from "./api/serverApi";

export const reduxStore = () => {
  return configureStore({
    reducer: {
      // api authentication and authorization reducer
      [serverApi.reducerPath]: serverApi.reducer,

      // auth reducer
      auth: auth,
      

      // message reducer
      chat: chatReducer,

      // calls reducer
      call: callReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(serverApi.middleware),
  })
}