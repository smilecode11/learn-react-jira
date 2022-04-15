import React, { ReactNode, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/list'

interface AuthForm {
	username: string
	password: string
}

interface AuthProps {
	user: User | null
	login: (form: AuthForm) => Promise<void>
	register: (form: AuthForm) => Promise<void>
	logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthProps | undefined>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const register = (form: AuthForm) => auth.register(form).then(setUser) //  user => setUser(user)
	const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
	const logout = () => auth.logout().then(() => setUser(null))

	return <AuthContext.Provider children={children} value={{ user, login, register, logout }}></AuthContext.Provider>
}

/** 定义 useAuth, 方便在子孙组件中使用 user auth */
export const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (!context) {
		throw new Error('authAuth 必须在 AuthProvider 中使用')
	}
	return context
}
