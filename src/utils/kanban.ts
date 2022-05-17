import { useQuery } from 'react-query'
import { Kanban } from 'types/kanban'
import { useHttp } from './http'

/** 获取列表*/
export const useKanbans = (param?: Partial<Kanban>) => {
	const client = useHttp()
	// 请求数据, 并存储到缓存区
	return useQuery<Kanban[], Error>(['kanbans', param], () => client('kanbans', { data: param }))
}
