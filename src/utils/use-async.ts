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

export const useAsync = <D>(initialState?: State<D>) => {
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
		return promise
			.then(data => {
				setData(data)
				return data
			})
			.catch(error => {
				setError(error)
				return error
			})
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
