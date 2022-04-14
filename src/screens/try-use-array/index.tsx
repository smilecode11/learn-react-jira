import { useDidMount, useArray } from 'utils'
import './index.css'

const TsReactTest = () => {
	const persons: { name: string; age: number }[] = [
		{ name: 'jack', age: 26 },
		{ name: 'ma', age: 12 },
	]
	const { value, add, removeIndex, clear } = useArray(persons)

	useDidMount(() => {
		//  期待这里报错
		// console.log(value.notExist)
		//  期待这里报错
		// add({ name: '尘心' })
		//  期待这里报错
		// removeIndex('123')
	})

	return (
		<div className="try-use-array">
			{/* 添加用户 */}
			<button onClick={() => add({ name: '尘心', age: 27 })}>add</button>
			&nbsp;
			{/* 移除 index 位 */}
			<button onClick={() => removeIndex(0)}>removeIndex 0</button>
			&nbsp;
			{/* clear */}
			<button onClick={() => clear()}>clear</button>
			<hr />
			{value.map((item: any, index: number) => {
				return (
					<div key={index}>
						{index} - {item.name}
					</div>
				)
			})}
		</div>
	)
}

export default TsReactTest
