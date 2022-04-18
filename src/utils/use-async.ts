import { useState } from 'react'

interface State<D> {
	error: Error | null
	data: D | null
	stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialSate: State<null> = {
	stat: 'idle',
	data: null,
	error: null,
}

const defaultConfig = {
	throwOnError: false,
}

export const useAsync = <D>(initialState?: State<D>, initialConifg?: typeof defaultConfig) => {
	const conifg = { ...defaultConfig, ...initialConifg }
	const [state, setState] = useState<State<D>>({
		...defaultInitialSate,
		...initialState,
	})

	const setData = (data: D) =>
		setState({
			data,
			stat: 'success',
			error: null,
		})

	const setError = (error: Error) =>
		setState({
			stat: 'error',
			data: null,
			error,
		})

	//  run 用来发送异步请求
	const run = (promise: Promise<D>) => {
		if (!promise || !promise.then) {
			throw new Error('请传入 Promise 数据')
		}
		setState({ ...state, stat: 'loading' })
		return (
			promise
				.then(data => {
					setData(data)
					return data
				})
				// catch 会消化异常,如果不主动抛出, 外界是接收不到异常的
				.catch(error => {
					setError(error)
					if (conifg.throwOnError) return Promise.reject(error)
					return error
				})
		)
	}

	return {
		isIdle: state.stat === 'idle',
		isLoading: state.stat === 'loading',
		isSuccess: state.stat === 'success',
		isError: state.stat === 'error',
		run,
		setData,
		setError,
		...state,
	}
}
