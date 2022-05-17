import { QueryKey, useQueryClient } from 'react-query'

export const useConfg = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
	// console.log(queryKey)
	// BUGFIX: 传入的 queryKey 有问题导致页面不执行 success, 先跳过
	queryKey = 'projects'
	const queryClient = useQueryClient()
	return {
		onSuccess: () => queryClient.invalidateQueries(queryKey),
		//	执行时调用
		async onMutate(target: any) {
			const previousItems = queryClient.getQueryData(queryKey)
			queryClient.setQueryData(queryKey, (old?: any[]) => {
				return callback(target, old)
			})
			return {
				previousItems,
			}
		},
		//	失败时调用
		onError(error: any, newItem: any, context: any) {
			queryClient.setQueryData(queryKey, context.previousItems)
		},
	}
}

export const useDeleteConifg = (queryKey: QueryKey) => useConfg(queryKey, (target, old) => old?.filter(item => item.id !== target.id) || [])
export const useEditConifg = (queryKey: QueryKey) => useConfg(queryKey, (target, old) => old?.map(item => (item.id === target.id ? { ...item, ...target } : item)) || [])
export const useAddConifg = (queryKey: QueryKey) => useConfg(queryKey, (target, old) => (old ? [...old, target] : target))
