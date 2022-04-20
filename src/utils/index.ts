import { useEffect, useRef, useState } from 'react'

export const isFalsy = (value: unknown) => {
	return value === 0 ? false : !value
}

export const isVoid = (value: unknown) => {
	return value === undefined || value === null || value === ''
}

/** 清除对象中空值*/
export const cleanObject = (object: { [key: string]: unknown }) => {
	const result = { ...object }
	Object.keys(result).forEach(key => {
		const value = result[key]
		if (isVoid(value)) {
			delete result[key]
		}
	})
	return result
}

/** 自定义 hook useMount, 模拟生命周期 componentDidMount*/
export const useDidMount = (callback: () => void) => {
	useEffect(() => {
		callback()
		// eslint-disable-next-line
	}, [])
}

/** 自定义 hook useDebounce, 防抖函数*/
export const useDebounce = <T>(value: T, delay?: number): T => {
	const [debounceValue, setDebounceValue] = useState(value)

	useEffect(() => {
		//  每次在 value 变化之后, 设置一个定时器
		const timeout = setTimeout(() => setDebounceValue(value), delay)
		//  每次在上一个 useEffect 处理完之后执行
		return () => clearTimeout(timeout)
	}, [value, delay])

	return debounceValue
}

// export const debounce = (fn, delay) => {
//     let timeout;
//     return (...args) => {
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(function () {
//             fn(...args)
//         }, delay)
//     }
// }

// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()

/** 自定义 hook useArray*/
export const useArray = <T>(initialArray: T[]) => {
	const [value, setValue] = useState(initialArray)

	return {
		value,
		setValue,
		add: (item: T) => setValue([...value, item]),
		clear: () => setValue([]),
		removeIndex: (index: number) => {
			const copyObject = [...value]
			copyObject.splice(index, 1)
			setValue(copyObject)
		},
	}
}

/**
 * 自定义 hook, 实现页面变更, title 改变
 * @param title 要设置的标题
 * @param keepOnUnmount 是否在组件卸载时保存设置
 */
export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
	const oldTitle = useRef(document.title).current

	useEffect(() => {
		document.title = title
	}, [title])

	useEffect(() => {
		return () => {
			if (!keepOnUnmount) {
				document.title = oldTitle
			}
		}
	}, [keepOnUnmount, oldTitle])
}

/** 路由重置*/
export const resetRoute = () => (window.location.href = window.location.origin)

/** 自定义 hook, 保存组件状态
 * 组件加载时: mountedRef.current 值是 true
 * 组件卸载时: mountedRef.current 值是 false
 */
export const useMountedRef = () => {
	const mountedRef = useRef(false)

	useEffect(() => {
		mountedRef.current = true
		return () => {
			mountedRef.current = false
		}
	})

	return mountedRef
}
