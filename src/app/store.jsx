// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/authSlice";


//  const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
//   devTools: process.env.NODE_ENV !== "production",
// });

// export default store
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
// import storage from "redux-persist/lib/storage" 
import storage from "redux-persist/lib/storage/session" 


const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)


 const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)

export default store