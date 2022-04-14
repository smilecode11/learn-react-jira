import { useEffect, useState } from 'react'

export const isFalsy = value => (value === 0 ? false : !value)

/** 清除对象中空值*/
export const cleanObject = object => {
	const result = { ...object }
	Object.keys(result).forEach(key => {
		const value = result[key]
		if (isFalsy(value)) {
			delete result[key]
		}
	})
	return result
}

/** 自定义 hook useMount, 模拟生命周期 componentDidMount*/
export const useMount = callback => {
	useEffect(() => {
		callback()
	}, [])
}

/** 自定义 hook useDebounce, 防抖函数*/
export const useDebounce = (value, delay = 700) => {
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
