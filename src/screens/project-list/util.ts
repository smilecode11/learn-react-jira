import { useMemo, useState } from 'react'
import { cleanObject } from 'utils'
import { useUrlQueryParam } from 'utils/url'

/** 项目列表搜索参数*/
export const useProjectsSearchParams = () => {
	const [param, setParam] = useUrlQueryParam(['name', 'personId'])
	return [useMemo(() => cleanObject({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const
}

export const useProjectModal = () => {
	const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])

	const open = () => setProjectCreate({ projectCreate: true })
	const close = () => setProjectCreate({ projectCreate: undefined })

	return {
		projectModalOpen: projectCreate === 'true',
		open,
		close,
	}
}

// const useTest = () => {
// 	const [created, openXXX, closeXXX] = useProjectModal()
// 	const [a, setA] = useState()
// }
