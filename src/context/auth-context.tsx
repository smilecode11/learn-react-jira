import React, { ReactNode, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/list'
import { http } from 'utils/http'
import { useDidMount } from 'utils'

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

/** 初始化 user*/
const initializeUser = async () => {
	let user = null
	const token = auth.getToken()
	if (token) {
		const data = await http('me', { token })
		user = data.user
	}
	return user
}

const AuthContext = React.createContext<AuthProps | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)

	const register = (form: AuthForm) => auth.register(form).then(setUser) //  user => setUser(user)
	const login = (form: AuthForm) => auth.login(form).then(setUser)
	const logout = () => auth.logout().then(() => setUser(null))

	//  effect 模拟的生命周期中执行 user 初始化赋值
	useDidMount(() => {
		initializeUser().then(setUser)
	})

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
