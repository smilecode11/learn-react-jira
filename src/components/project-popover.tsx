import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { CursorText } from 'authenticated-app'
import { useProjectModal } from 'screens/project-list/util'
import { useProjects } from 'utils/project'
import { ButtonNoPadding } from './lib'

export const ProjectPopover = () => {
	const { data: projects } = useProjects()
	const pinnedProjects = projects?.filter(project => project.pin)
	const { open } = useProjectModal()

	const content = (
		<ContextContainer>
			<Typography.Text type={'secondary'}>收藏项目</Typography.Text>
			<List>
				{pinnedProjects?.map(project => (
					<List.Item key={project.id}>
						<List.Item.Meta title={project.name}></List.Item.Meta>
					</List.Item>
				))}
			</List>
			<Divider></Divider>
			<ButtonNoPadding type={'link'} onClick={open}>
				新建项目
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
