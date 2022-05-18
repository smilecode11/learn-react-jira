import { useQuery } from 'react-query'
import { TaskType } from 'types/task-type'
import { useHttp } from './http'

/** 获取tasktypes列表*/
export const useTaskTypes = () => {
	const client = useHttp()
	return useQuery<TaskType[], Error>(['taskTypes'], () => client('taskTypes'))
}
