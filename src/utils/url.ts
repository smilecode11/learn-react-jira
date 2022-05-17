import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'

/** 返回 url 中指定key 的参数值*/
export const useUrlQueryParam = <T extends string>(keys: T[]) => {
	const [searchParams, setSearchParams] = useSearchParams()
	//  searchParams.get(key)   获取 param 参数值
	//  useMemo 会对传入的对象进行浅层比较, 避免依赖是对象时重复执行 useEffect
	//  useState 创建的状态不会引起 useEffect 的重复执行
	return [
		useMemo(
			() =>
				keys.reduce((prev, key) => {
					return {
						...prev,
						[key]: searchParams.get(key) || '',
					}
				}, {} as { [key in T]: string }),
			// eslint-disable-next-line
			[searchParams]
		),
		(params: Partial<{ [key in T]: unknown }>) => {
			//  Object.fromEntries 将 iteration 对象转为 键值对 数据
			const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
			return setSearchParams(o)
		},
	] as const
}
