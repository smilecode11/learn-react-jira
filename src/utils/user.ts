import { User } from 'screens/project-list/list'
import { useDidMount } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'

export const useUsers = (param?: Partial<User>) => {
	const client = useHttp()
	const { run, ...result } = useAsync<User[]>()

	useDidMount(() => {
		run(client('users'))
	})

	return result
}
