import { useCallback, useReducer, useState } from 'react'
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
	const mountedRef = useMountedRef()
	return useCallback(
		(...args: T[]) => {
			mountedRef.current ? dispatch(...args) : void 0
		},
		[dispatch, mountedRef]
	)
}

export const useAsync = <D>(initialState?: State<D>, initialConifg?: typeof defaultConfig) => {
	const conifg = { ...defaultConfig, ...initialConifg }
	const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
		...defaultInitialSate,
		...initialState,
	})

	const safeDispatch = useSafeDispatch(dispatch)

	//	useState 直接传入函数的含义是: 惰性初始化, 要用 useState 保存函数, 不能直接传入函数, 会直接运行函数内部
	/** retry 函数, 当执行该函数时重新执行 run, 携带 initialState 作为参数*/
	const [retry, setRetry] = useState(() => () => {})

	const setData = useCallback(
		(data: D) =>
			safeDispatch({
				data,
				stat: 'success',
				error: null,
			}),
		[safeDispatch]
	)

	const setError = useCallback(
		(error: Error) =>
			safeDispatch({
				stat: 'error',
				data: null,
				error,
			}),
		[safeDispatch]
	)

	//  run 用来发送异步请求
	const run = useCallback(
		(promise: Promise<D>, runConifg?: { retry: () => Promise<D> }) => {
			if (!promise || !promise.then) {
				throw new Error('请传入 Promise 数据')
			}
			//	修改 retry 函数
			setRetry(() => () => {
				if (runConifg?.retry) {
					run(runConifg.retry(), runConifg)
				}
			})
			safeDispatch({ stat: 'loading' })
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
		},
		[conifg.throwOnError, setData, setError, safeDispatch]
	)

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
