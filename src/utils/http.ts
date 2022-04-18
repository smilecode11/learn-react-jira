import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'
const apiUrl = process.env.REACT_APP_API_URL

interface Conifg extends RequestInit {
	token?: string
	data?: object
}

export const http = (endpoint: string, { data, token, headers, ...customeConfig }: Conifg = {}) => {
	const config = {
		method: 'GET',
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
			'Content-Type': data ? 'application/json' : '',
		},
		...customeConfig,
	}

	if (config.method.toLocaleUpperCase() === 'GET') {
		endpoint += `?${qs.stringify(data)}`
	} else {
		config.body = JSON.stringify(data || {})
	}

	return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
		if (response.status === 401) {
			await auth.logout()
			window.location.reload()
			return Promise.reject({ message: '请重新登录' })
		} else {
			const data = await response.json()
			if (response.ok) {
				return data
			} else {
				//  手动抛出错误, 适用 fetch catch
				return Promise.reject(data)
			}
		}
	})
}

export const useHttp = () => {
	const { user } = useAuth()
	return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}

//  Utility type: Partial Omit Parameters
type Person = {
	name: string
	age: number
}

//  Partial, 让属性变成非必需
const xiaoMing: Partial<Person> = { name: 'xiao ming' }

//  Partial 的实现
type Partial<T> = {
	[P in keyof T]?: T[P]
}

//  Omit, 剔除属性 -> 属性非必须
const shenMiRen: Omit<Person, 'name'> = { age: 27 }
const shenMiRen2: Omit<Person, 'name' | 'age'> = {}

//  Parameters 读取函数参数定义
type httpType = Parameters<typeof http>
