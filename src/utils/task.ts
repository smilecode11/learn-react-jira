import { useQuery } from 'react-query'
import { Task } from 'types/task'
import { useHttp } from './http'

/** 获取列表*/
export const useTasks = (param?: Partial<Task>) => {
	const client = useHttp()
	// 请求数据, 并存储到缓存区
	return useQuery<Task[], Error>(['tasks', param], () => client('tasks', { data: param }))
}
