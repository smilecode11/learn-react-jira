import { QueryKey, useMutation, useQuery } from 'react-query'
import { Project } from 'types/project'
import { useHttp } from './http'
import { useAddConifg, useDeleteConifg, useEditConifg } from './use-optimistic-options'

/** 获取列表*/
export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp()
	// 请求数据, 并存储到缓存区
	return useQuery<Project[], Error>(['projects', param], () => client('projects', { data: param }))
}

/** 编辑项目*/
export const useEditProject = (queryKey: QueryKey) => {
	const client = useHttp()
	return useMutation(
		(param: Partial<Project>) =>
			client(`projects/${param.id}`, {
				method: 'PATCH',
				data: param,
			}),
		useEditConifg(queryKey)
	)
}

/** 新建项目*/
export const useAddProject = (queryKey: QueryKey) => {
	const client = useHttp()
	return useMutation(
		(param: Partial<Project>) =>
			client(`projects`, {
				method: 'POST',
				data: param,
			}),
		useAddConifg(queryKey)
	)
}

/** 删除项目*/
export const useDeleteProject = (queryKey: QueryKey) => {
	const client = useHttp()
	return useMutation(
		({ id }: { id: number }) =>
			client(`projects/${id}`, {
				method: 'DELETE',
			}),
		useDeleteConifg(queryKey)
	)
}

/** 获取项目*/
export const useProject = (id?: number) => {
	const client = useHttp()
	return useQuery<Project>(
		['project', { id }], //	配置请求数据缓存名 & 根据 id 变更再次执行
		() => client(`projects/${id}`), //	请求返回 的 Promise
		{
			//	配置当 id 存在时执行
			enabled: Boolean(id),
		}
	)
}
