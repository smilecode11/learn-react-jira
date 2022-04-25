import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { CursorText } from 'authenticated-app'
import { useProjects } from 'utils/project'

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
	const { data: projects, isLoading } = useProjects()
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
			{props.projectButton}
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
