import styled from '@emotion/styled'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './util'
import { ScreenContainer } from 'components/lib'
import { useTasks } from 'utils/task'
import { Spin } from 'antd'

export const KanbanScreen = () => {
	useDocumentTitle('看板列表')

	const { data: currentProject } = useProjectInUrl()
	const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
	const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
	const isLoading = kanbanIsLoading || taskIsLoading

	return (
		<ScreenContainer>
			<h2>{currentProject?.name}看板</h2>
			<SearchPanel></SearchPanel>
			{isLoading ? (
				<Spin size={'large'} />
			) : (
				<Container>
					{kanbans?.map(kanban => (
						<KanbanColumn kanban={kanban} key={kanban.id} />
					))}
				</Container>
			)}
		</ScreenContainer>
	)
}

const Container = styled.div`
	display: flex;
	flex: 1;
`
