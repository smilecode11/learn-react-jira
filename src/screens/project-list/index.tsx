/**
 * project-list demo
 *  知识点:
 * 		状态提升, fetch, 防抖, 环境变量文件, useEffect 模拟 DidMount 和 DidUpdate
 * 		TypeScript 强类型语言使用
 */
import { useState } from 'react'
import { useDebounce } from 'utils'

import SearchPanel from './search-panel'
import List from './list'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'

const ProjectList = () => {
	const [param, setParam] = useState({ name: '', personId: '' })
	// 赋予 param 防抖能力
	const debouncedParam = useDebounce(param, 700)
	const { isLoading, data: list, error } = useProjects(debouncedParam)
	const { data: users } = useUsers()

	return (
		<Container>
			<h2>项目列表</h2>
			<SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
			{error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
			<List loading={isLoading} users={users || []} dataSource={list || []}></List>
		</Container>
	)
}

export default ProjectList

const Container = styled.div`
	padding: 3.2rem;
`
