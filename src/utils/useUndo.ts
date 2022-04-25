import { useState } from 'react'

export const useUndo = <T>(initialPresent: T) => {
	const [past, setPast] = useState<T[]>([]) //  从前动作
	const [future, setFuture] = useState<T[]>([]) //  未来动作
	const [present, setPresent] = useState(initialPresent) //  当前动作

	const canUndo = past.length !== 0
	const canRedo = future.length !== 0

	//  撤销 -> 找从前
	const undo = () => {
		if (!canUndo) return

		const previous = past[past.length - 1]
		const newPast = past.slice(0, past.length - 1)

		setPast(newPast) //  从前减一
		setPresent(previous) //  当前
		setFuture([present, ...future]) //  未来加一
	}

	//  前进 -> 找未来
	const redo = () => {
		if (!canRedo) return

		const next = future[0]
		const newFuture = future.slice(1)

		setPast([...past, present])
		setPresent(next)
		setFuture(newFuture)
	}

	const set = (newPresent: T) => {
		if (newPresent === present) return
		setPast([...past, present])
		setPresent(newPresent)
		setFuture([])
	}

	const reset = (newPresent: T) => {
		setPast([])
		setPresent(newPresent)
		setFuture([])
	}

	return [
		{ past, future, present },
		{ undo, redo, set, reset },
	] as const
}
