import { useMemo } from 'react'
import { cleanObject } from 'utils'
import { useProject } from 'utils/project'
import { useUrlQueryParam } from 'utils/url'

/** 项目列表搜索参数*/
export const useProjectsSearchParams = () => {
	const [param, setParam] = useUrlQueryParam(['name', 'personId'])
	return [useMemo(() => cleanObject({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const
}

export const useProjectModal = () => {
	const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])
	const [{ editProjectId }, setEditProjectId] = useUrlQueryParam(['editProjectId'])

	const open = () => setProjectCreate({ projectCreate: true })
	const close = () => {
		projectCreate ? setProjectCreate({ projectCreate: undefined }) : setEditProjectId({ editProjectId: undefined })
	}
	const startEdit = (id?: number) => setEditProjectId({ editProjectId: id })

	const { data: editingProject, isLoading } = useProject(Number(editProjectId))

	return {
		projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
		open,
		close,
		startEdit,
		editingProject,
		isLoading,
	}
}

// const useTest = () => {
// 	const [created, openXXX, closeXXX] = useProjectModal()
// 	const [a, setA] = useState()
// }
