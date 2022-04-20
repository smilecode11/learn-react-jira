import { useMemo } from 'react'
import { cleanObject } from 'utils'
import { useUrlQueryParam } from 'utils/url'

/** 项目列表搜索参数*/
export const useProjectsSearchParams = () => {
	const [param, setParam] = useUrlQueryParam(['name', 'personId'])
	return [useMemo(() => cleanObject({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const
}
