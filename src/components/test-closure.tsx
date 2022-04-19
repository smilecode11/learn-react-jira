import React, { useEffect, useState } from 'react'

const testClosure = () => {
	let num = 0

	const effect = () => {
		num += 1
		const message = `num value in message: ${num}`

		return function unmount() {
			console.log(message)
		}
	}

	return effect
}

//  执行 test, 返回 effect 函数
const add = testClosure()
// 执行 effect 函数, 返回引用了 message1 的 unmount 函数
const unmount = add()
//  再次执行 effect 函数, 返回了 message2 的 unmount 函数
add()
//  再次执行 effect 函数, 饭回了 message3 的 unmount 函数
add()
//  ...
add()
//  执行了 message1 的 unmount 函数
unmount() //  1

export const Test = () => {
	const [num, setNum] = useState(0)

	const add = () => setNum(num + 1)

	useEffect(() => {
		const id = setInterval(() => {
			console.log('num in setInterval: ', num)
		}, 1000)
		return () => clearInterval(id)
		// 依赖不指定 num 的话, num 就会因为闭包被保存下来
	}, [num])

	useEffect(() => {
		return () => {
			console.log('卸载值:', num)
		}
	}, [num])

	return (
		<>
			<button onClick={add}>add</button>
			<p>num: {num}</p>
		</>
	)
}
