import React, { ReactNode } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/list'
import { http } from 'utils/http'
import { useDidMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageLoading, FullPageErrorFallback } from 'components/lib'
import { useQueryClient } from 'react-query'

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
	const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>()
	const queryClient = useQueryClient()

	const register = (form: AuthForm) => auth.register(form).then(setUser) //  user => setUser(user)
	const login = (form: AuthForm) => auth.login(form).then(setUser)
	const logout = () =>
		auth.logout().then(() => {
			setUser(null)
			//	清除 queryClient 数据
			queryClient.clear()
		})

	//  effect 模拟的生命周期中执行 user 初始化赋值
	useDidMount(() => {
		run(initializeUser())
	})

	if (isIdle || isLoading) {
		return <FullPageLoading></FullPageLoading>
	}

	if (isError) {
		return <FullPageErrorFallback error={error}></FullPageErrorFallback>
	}

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
