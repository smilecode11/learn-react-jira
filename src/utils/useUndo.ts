import { useCallback, useReducer } from 'react'

const UNDO = 'UNDO' //  撤销
const REDO = 'REDO' //  前进
const SET = 'SET' //  设置
const RESET = 'RESET' //  重置

type State<T> = {
	past: T[]
	present: T
	future: T[]
}

type Action<T> = {
	newPresent?: T
	type: typeof UNDO | typeof REDO | typeof SET | typeof RESET
}

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
	const { past, present, future } = state
	const { type, newPresent } = action

	switch (type) {
		case UNDO: {
			if (past.length === 0) return state

			let previous = past[past.length - 1]
			const newPast = past.slice(0, past.length - 1)

			return {
				past: newPast,
				present: previous,
				future: [present, ...future],
			}
		}

		case REDO: {
			if (future.length === 0) return state

			const next = future[0]
			const newFuture = future.slice(1)

			return {
				past: [...past, present],
				present: next,
				future: newFuture,
			}
		}

		case SET: {
			if (newPresent === present) return state

			return {
				past: [...past, present],
				present: newPresent,
				future: [],
			}
		}

		case RESET: {
			return {
				past: [],
				present: newPresent,
				future: [],
			}
		}
	}
}

export const useUndo = <T>(initialPresent: T) => {
	const [state, dispatch] = useReducer(undoReducer, {
		past: [],
		present: initialPresent,
		future: [],
	} as State<T>)

	const canUndo = state.past.length !== 0
	const canRedo = state.future.length !== 0

	/** 撤销 -> 找从前*/
	const undo = useCallback(() => dispatch({ type: UNDO }), [])

	/** 前进 -> 找未来*/
	const redo = useCallback(() => dispatch({ type: REDO }), [])

	/** 设置*/
	const set = useCallback((newPresent: T) => dispatch({ type: SET, newPresent }), [])

	/** 重置*/
	const reset = useCallback((newPresent: T) => dispatch({ type: RESET, newPresent }), [])

	return [state, { undo, redo, set, reset, canRedo, canUndo }] as const
}
