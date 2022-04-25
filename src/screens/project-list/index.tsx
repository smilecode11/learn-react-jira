/**
 * project-list demo
 *  知识点:
 * 		状态提升, fetch, 防抖, 环境变量文件, useEffect 模拟 DidMount 和 DidUpdate
 * 		TypeScript 强类型语言使用
 */
import { useDebounce, useDocumentTitle } from 'utils'

import SearchPanel from './search-panel'
import List from './list'
import styled from '@emotion/styled'
import { Divider, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { Row } from 'components/lib'

//	基本类型, 可以放到依赖里, 组件状态可以放到依赖里; 非组件状态的对象, 绝不可以放到依赖里

const ProjectList = (props: { projectButton: JSX.Element }) => {
	useDocumentTitle('项目列表', false)

	const [param, setParam] = useProjectsSearchParams()
	const { isLoading, data: list, error, retry } = useProjects(useDebounce(param, 200))
	const { data: users } = useUsers()

	return (
		<Container>
			<Row between={true}>
				<h2>项目列表</h2>
				{props.projectButton}
			</Row>
			<Divider />
			<SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
			{error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
			<List {...props} refresh={retry} loading={isLoading} users={users || []} dataSource={list || []}></List>
		</Container>
	)
}

// ProjectList.whyDidYouRender = true

export default ProjectList

const Container = styled.div`
	padding: 3.2rem;
`
