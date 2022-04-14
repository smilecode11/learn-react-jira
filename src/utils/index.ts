import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => {
	return value === 0 ? false : !value
}

/** 清除对象中空值*/
export const cleanObject = (object: object) => {
	const result = { ...object }
	Object.keys(result).forEach(key => {
		//	@ts-ignore
		const value = result[key]
		if (isFalsy(value)) {
			//	@ts-ignore
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
export const useDebounce = (value: unknown, delay?: number): any => {
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
