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
