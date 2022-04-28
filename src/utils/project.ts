import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Project } from 'screens/project-list/list'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'

/** 获取列表*/
export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp()
	// 请求数据, 并存储到缓存区
	return useQuery<Project[], Error>(['projects', param], () => client('projects', { data: param }))
}

/** 编辑项目*/
export const useEditProject = () => {
	const client = useHttp()

	const queryClient = useQueryClient()
	return useMutation(
		(param: Partial<Project>) =>
			client(`projects/${param.id}`, {
				method: 'PATCH',
				data: param,
			}),
		{
			onSuccess: () => queryClient.invalidateQueries('projects'),
		}
	)
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
