import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import questionsReducer from '~/store/questions.reducer';
import userAnswersReducer from '~/store/userAnswers.reducer';

const persistConfig = {
  key: 'questions',
  storage,
  blacklist: ['userAnswers']
}

const rootReducer = combineReducers({
  questions: questionsReducer,
  userAnswers: userAnswersReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persister = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch