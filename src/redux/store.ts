import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { packsReducer } from './packsReducer'
import { appReducer } from './appReducer'
import { authReducer } from './authReducer'
import { cardsReducer } from './cardsReducer'
import {decksReducer} from "./decksReducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    packsCard: packsReducer,
    cards: cardsReducer,
    decks: decksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootReducerType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootReducerType, unknown, any>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootReducerType> = useSelector

// @ts-ignore
window.store = store //for console view
