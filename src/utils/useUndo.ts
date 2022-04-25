import { useState, useCallback } from 'react'

export const useUndo = <T>(initialPresent: T) => {
	const [state, setState] = useState<{
		past: T[]
		future: T[]
		present: T
	}>({
		past: [], //  从前动作
		future: [], //  未来动作
		present: initialPresent, //  当前动作
	})

	const canUndo = state.past.length !== 0
	const canRedo = state.future.length !== 0

	//  撤销 -> 找从前
	const undo = useCallback(() => {
		setState(currentState => {
			let { past, future, present } = currentState
			if (past.length === 0) return currentState

			let previous = past[past.length - 1]
			const newPast = past.slice(0, past.length - 1)

			return {
				past: newPast,
				present: previous,
				future: [present, ...future],
			}
		})
	}, [])

	//  前进 -> 找未来
	const redo = useCallback(() => {
		setState(currentState => {
			let { past, future, present } = currentState
			if (future.length === 0) return currentState

			const next = future[0]
			const newFuture = future.slice(1)

			return {
				past: [...past, present],
				present: next,
				future: newFuture,
			}
		})
	}, [])

	//  设置
	const set = useCallback((newPresent: T) => {
		setState(currentState => {
			let { past, present } = currentState
			if (newPresent === present) return currentState

			return {
				past: [...past, present],
				present: newPresent,
				future: [],
			}
		})
	}, [])

	const reset = useCallback((newPresent: T) => {
		setState(() => {
			return {
				past: [],
				present: newPresent,
				future: [],
			}
		})
	}, [])

	return [state, { undo, redo, set, reset, canRedo, canUndo }] as const
}
