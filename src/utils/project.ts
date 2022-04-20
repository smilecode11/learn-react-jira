import { useEffect } from 'react'
import { Project } from 'screens/project-list/list'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'

/** 获取列表*/
export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp()
	const { run, ...result } = useAsync<Project[]>()

	useEffect(() => {
		run(client('projects', { data: cleanObject(param || {}) }))
	}, [param])

	return result
}

/** 编辑项目*/
export const useEditProject = () => {
	const client = useHttp()
	const { run, ...aysncResult } = useAsync<Project>()

	const mutate = (param: Partial<Project>) => {
		return run(
			client(`projects/${param.id}`, {
				method: 'PATCH',
				data: param,
			})
		)
	}

	return {
		mutate,
		...aysncResult,
	}
}

/** 新建项目*/
export const useAddProject = () => {
	const client = useHttp()
	const { run, ...asyncResult } = useAsync()

	const mutate = (param: Partial<Project>) => {
		return run(
			client(`projects`, {
				method: 'POST',
				data: param,
			})
		)
	}

	return {
		mutate,
		...asyncResult,
	}
}
