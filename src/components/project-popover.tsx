import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { CursorText } from 'authenticated-app'
import { useProjects } from 'utils/project'
import { useDispatch } from 'react-redux'
import { ButtonNoPadding } from './lib'
import { projectListActions } from 'screens/project-list/project-list.slice'

export const ProjectPopover = () => {
	const dispatch = useDispatch()

	const { data: projects } = useProjects()
	const pinnedProjects = projects?.filter(project => project.pin)

	const content = (
		<ContextContainer>
			<Typography.Text type={'secondary'}>收藏项目</Typography.Text>
			<List>
				{pinnedProjects?.map(project => (
					<List.Item>
						<List.Item.Meta title={project.name}></List.Item.Meta>
					</List.Item>
				))}
			</List>
			<Divider></Divider>
			<ButtonNoPadding onClick={() => dispatch(projectListActions.openProjectModal())} type={'link'}>
				创建项目
			</ButtonNoPadding>
		</ContextContainer>
	)

	return (
		<Popover content={content}>
			<CursorText>项目</CursorText>
		</Popover>
	)
}

const ContextContainer = styled.div`
	min-width: 30rem;
`
