import { ReactNode, useCallback } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/list'
import { http } from 'utils/http'
import { useDidMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageLoading, FullPageErrorFallback } from 'components/lib'
import * as authStore from 'store/auth.slice'
import { bootstrap, selectUser } from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'

export interface AuthForm {
	username: string
	password: string
}

/** 初始化 user*/
export const bootstrapUser = async () => {
	let user = null
	const token = auth.getToken()
	if (token) {
		const data = await http('me', { token })
		user = data.user
	}
	return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { error, isLoading, isIdle, isError, run } = useAsync<User | null>()
	const dispatch: (...args: any[]) => Promise<User> = useDispatch()

	useDidMount(() => {
		run(dispatch(bootstrap()))
	})

	if (isIdle || isLoading) {
		return <FullPageLoading></FullPageLoading>
	}

	if (isError) {
		return <FullPageErrorFallback error={error}></FullPageErrorFallback>
	}

	return <div>{children}</div>
}

/** 定义 useAuth, 方便在子孙组件中使用 user auth */
export const useAuth = () => {
	//	显示声明 dispatch 传递参数和返回结果
	const dispatch: (...args: any[]) => Promise<User> = useDispatch()
	const user = useSelector(selectUser)
	const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
	const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
	const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])

	return {
		user,
		login,
		register,
		logout,
	}
}
