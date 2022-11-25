import { Dispatch } from 'redux'
import { authApi } from 'api/api'
import { setIsLoginAC, setProfileDataAC } from './authReducer'

//===TYPES======================================================================

export enum RequestStatus {
    'idle',
    'loading',
    'succeeded',
    'error',
}

export type AppActionsType =
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setInfoAC>
    | ReturnType<typeof setIsInitializedAC>

type initialStateType = typeof initialState

//===REDUCER====================================================================

const initialState = {
    request: {
        status: RequestStatus.idle,
        error: null as string | null,
        info: null as string | null,
    },
    isInitialized: false,
}

export const appReducer = (
    state: initialStateType = initialState,
    action: AppActionsType
): initialStateType => {
    switch (action.type) {
        case 'APP/SET-LOADING':
            return { ...state, request: { ...state.request, status: action.value } }
        case 'APP/SET-ERROR':
            return {
                ...state,
                request: { ...state.request, error: action.textError },
            }
        case 'APP/SET-INFO':
            return {
                ...state,
                request: { ...state.request, info: action.textInfo },
            }
        case 'APP/SET-IS-INITIALIZED':
            return { ...state, isInitialized: action.isInitialized }
        default:
            return state
    }
}

//===ACTIONS====================================================================

export const setLoadingAC = (value: RequestStatus) => {
    return { type: 'APP/SET-LOADING', value } as const
}

export const setErrorAC = (textError: string | null) => {
    return { type: 'APP/SET-ERROR', textError } as const
}

export const setInfoAC = (textInfo: string | null) => {
    return { type: 'APP/SET-INFO', textInfo } as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
    return { type: 'APP/SET-IS-INITIALIZED', isInitialized } as const
}

//===THUNKS=====================================================================

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsInitializedAC(false))
        const res = await authApi.me()
        dispatch(setProfileDataAC(res))
        dispatch(setIsLoginAC(true))
    } catch (error) {
        dispatch(setIsLoginAC(false))
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}
