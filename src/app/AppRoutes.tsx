import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Error} from './error/Error'
import {Login} from 'feature/login/Login'
import {Registration} from 'feature/registration/Registration'
import {Profile} from 'feature/profile/Profile'
import {PasswordRecovery} from 'feature/passwordRecovery/PasswordRecovery'
import {NewPassword} from 'feature/passwordRecovery/NewPassword'
import {CheckEmail} from 'feature/passwordRecovery/CheckEmail'
import {MyPack} from 'feature/myPack/MyPack'
import {PacksList} from 'feature/packsList/PacksList'
import {NamePack} from 'feature/namePack/NamePack'
import {FriendsPack} from 'feature/friendsPack/FriendsPack'
import {AddToPack} from "../feature/friendsPack/AddPoPack";

export enum Path {
    root = '/',
    other = '/*',
    registration = '/registration',
    login = '/login',
    profile = '/profile',
    passwordRecovery = '/password',
    newPassword = '/set-new-password',
    checkEmail = '/check',
    myPack = '/mypack',
    friendsPack = '/friendspack',
    packsList = '/packslist',
    namePack = '/name-pack'
}

export const AppRoutes: React.FC = () => (
    <Routes>
        <Route path={Path.root} element={<Navigate to={Path.login} />} />
        <Route path={Path.login} element={<Login />} />
        <Route path={Path.registration} element={<Registration />} />
        <Route path={Path.profile} element={<Profile />} />
        <Route path={Path.passwordRecovery} element={<PasswordRecovery />} />
        <Route path={Path.newPassword + '/:token'} element={<NewPassword />} />
        <Route path={Path.checkEmail} element={<CheckEmail />} />
        <Route path={Path.myPack + '/:packId'} element={<MyPack />} />
        <Route path={Path.friendsPack + '/:id'} element={<FriendsPack />} />
        <Route path={Path.packsList} element={<PacksList />} />
        <Route path={Path.namePack} element={<NamePack />} />
        <Route path={Path.other} element={<Error />} />
    </Routes>
)
