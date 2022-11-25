import { cardsApi, CardsStateType, CardType, GetCardsParamsType, NewCardType } from 'api/api'
import { Dispatch } from 'redux'
import { RequestStatus, setErrorAC, setLoadingAC } from './appReducer'
import { AppDispatch, AppRootReducerType } from './store'

//===TYPES======================================================================

export type CardsActionsType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof updateCardAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setCardQuestionAC>
    | ReturnType<typeof setSortCardsAC>

type InitialStateType = typeof initialState

//===REDUCER====================================================================

const initialState = {
    cards: [] as Array<CardType>,
    cardsTotalCount: 10,
    page: 1,
    pageCount: 10,
    packUserId: '',
    cardQuestion: '',
    sortCards: '',
}

export const cardsReducer = (
    state: InitialStateType = initialState,
    action: CardsActionsType
): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return { ...state, ...action.cardsState }
        case 'CARDS/UPDATE-CARD':
            return {
                ...state,
                cards: state.cards.map((card) =>
                    card._id === action.card._id ? { ...card, ...action.card } : card
                ),
            }
        case 'CARDS/SET-PAGE':
            return { ...state, page: action.page }
        case 'CARDS/SET-PAGE-COUNT':
            return { ...state, pageCount: action.pageCount }
        case 'CARDS/SET-CARD-QUESTION':
            return { ...state, cardQuestion: action.cardQuestion }
        case 'CARDS/SET-SORT-CARDS':
            return { ...state, sortCards: action.sortCards }
        default: {
            return state
        }
    }
}

//===ACTIONS====================================================================

export const setCardsAC = (cardsState: CardsStateType) => {
    return { type: 'CARDS/SET-CARDS', cardsState } as const
}

export const updateCardAC = (card: CardType) => {
    return { type: 'CARDS/UPDATE-CARD', card } as const
}

export const setPageAC = (page: number) => {
    return { type: 'CARDS/SET-PAGE', page } as const
}

export const setPageCountAC = (pageCount: number) => {
    return { type: 'CARDS/SET-PAGE-COUNT', pageCount } as const
}

export const setCardQuestionAC = (cardQuestion: string) => {
    return { type: 'CARDS/SET-CARD-QUESTION', cardQuestion } as const
}

export const setSortCardsAC = (sortCards: string) => {
    return { type: 'CARDS/SET-SORT-CARDS', sortCards } as const
}

//===THUNKS=====================================================================

export const fetchCardsTC =
    (cardsPack_id: string) => async (dispatch: Dispatch, getState: () => AppRootReducerType) => {
        try {
            const cards = getState().cards
            const params = {
                cardsPack_id,
                pageCount: cards.pageCount,
                page: cards.page,
                cardQuestion: cards.cardQuestion,
                sortCards: cards.sortCards,
            } as GetCardsParamsType
            dispatch(setLoadingAC(RequestStatus.loading))
            const res = await cardsApi.getCards(params)
            dispatch(setCardsAC(res))
        } catch (error) {
            dispatch(setErrorAC(error as string))
            dispatch(setLoadingAC(RequestStatus.error))
        } finally {
            dispatch(setLoadingAC(RequestStatus.idle))
        }
    }

export const createCardTC = (newCard: NewCardType) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoadingAC(RequestStatus.loading))
        await cardsApi.createCard(newCard)
        dispatch(fetchCardsTC(newCard.cardsPack_id))
    } catch (error) {
        dispatch(setErrorAC(error as string))
        dispatch(setLoadingAC(RequestStatus.error))
    } finally {
        dispatch(setLoadingAC(RequestStatus.idle))
    }
}

export const deleteCardTC =
    (cardId: string, cardsPackId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingAC(RequestStatus.loading))
            await cardsApi.deleteCard(cardId)
            dispatch(fetchCardsTC(cardsPackId))
        } catch (error) {
            dispatch(setErrorAC(error as string))
            dispatch(setLoadingAC(RequestStatus.error))
        } finally {
            dispatch(setLoadingAC(RequestStatus.idle))
        }
    }

export const editCardTC =
    (_id: string, answer: string, question: string, cardsPackId: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingAC(RequestStatus.loading))
            await cardsApi.updateCard({ _id, answer, question })
            dispatch(fetchCardsTC(cardsPackId))
        } catch (error) {
            dispatch(setErrorAC(error as string))
            dispatch(setLoadingAC(RequestStatus.error))
        } finally {
            dispatch(setLoadingAC(RequestStatus.idle))
        }
    }
