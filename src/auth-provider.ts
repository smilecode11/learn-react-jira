import { User } from './screens/project-list/list'
const localStorageKey = '__auth_provider_token__'
const apiUrl = process.env.REACT_APP_API_URL

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
	window.localStorage.setItem(localStorageKey, user.token || '')
	return user
}

/** 登录*/
export const login = (data: { username: string; password: string }) => {
	return fetch(`${apiUrl}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then(async resp => {
		if (resp.ok) {
			return handleUserResponse(await resp.json())
		} else {
			return Promise.reject(await resp.json())
		}
	})
}

/** 注册*/
export const register = (data: { username: string; password: string }) => {
	return fetch(`${apiUrl}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then(async resp => {
		console.log(resp)
		if (resp.ok) {
			return handleUserResponse(await resp.json())
		} else {
			return Promise.reject(await resp.json())
		}
	})
}

/** 登出*/
export const logout = async () => {
	window.localStorage.removeItem(localStorageKey)
}
