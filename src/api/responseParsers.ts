import { AxiosError, AxiosResponse } from 'axios'
import { LoginResponseType, LogoutResponseType, ProfileDataType, SingUpResponseType } from './api'

type ErrorResponseType = {
    error: string
}

export const getDataFromAxiosResponse = <T>(res: AxiosResponse<T>): T => res.data

export const parseAxiosError = (res: AxiosError<ErrorResponseType>) =>
    Promise.reject(res.response?.data?.error ?? res.message)

export const parseLoginResponse = ({
    email,
    name,
    avatar,
    error,
    _id,
}: LoginResponseType): Promise<ProfileDataType> =>
    error ? Promise.reject(error) : Promise.resolve({ email, name, avatar, id: _id })

export const parseUpdatedUserResponse = ({
    updatedUser,
    error,
}: {
    error?: string
    updatedUser: LoginResponseType
}): Promise<ProfileDataType> => {
    return error
        ? Promise.reject(error)
        : Promise.resolve({
              email: updatedUser.email,
              name: updatedUser.name,
              avatar: updatedUser.avatar,
              id: updatedUser._id,
          })
}

export const parseLogoutResponse = ({ info, error }: LogoutResponseType) =>
    error ? Promise.reject(error) : Promise.resolve({ info })

export const parseSingUpResponse = ({ addedUser, error }: SingUpResponseType) =>
    error ? Promise.reject(error) : Promise.resolve({ addedUser })
