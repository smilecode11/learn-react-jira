import { useState } from 'react'
import { useMountedRef } from 'utils'

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

	const mountedRef = useMountedRef()

	//	useState 直接传入函数的含义是: 惰性初始化, 要用 useState 保存函数, 不能直接传入函数, 会直接运行函数内部
	/** retry 函数, 当执行该函数时重新执行 run, 携带 initialState 作为参数*/
	const [retry, setRetry] = useState(() => () => {})

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
	const run = (promise: Promise<D>, runConifg?: { retry: () => Promise<D> }) => {
		if (!promise || !promise.then) {
			throw new Error('请传入 Promise 数据')
		}
		//	修改 retry 函数
		setRetry(() => () => {
			if (runConifg?.retry) {
				run(runConifg.retry(), runConifg)
			}
		})
		setState({ ...state, stat: 'loading' })
		return (
			promise
				.then(data => {
					if (mountedRef.current) setData(data)
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
		retry,
		...state,
	}
}
