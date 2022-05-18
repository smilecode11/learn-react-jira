import { Kanban } from 'types/kanban'
import { useTasks } from 'utils/task'
import { useTaskTypes } from 'utils/task-type'
import { useTasksSearchParams } from './util'
import { ReactComponent as TaskIcon } from 'assets/task.svg'
import { ReactComponent as BugIcon } from 'assets/bug.svg'
import styled from '@emotion/styled'
import { Card } from 'antd'

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
	const { data: allTaks } = useTasks(useTasksSearchParams())
	const tasks = allTaks?.filter(task => task.kanbanId === kanban.id)

	return (
		<Container>
			<h3>{kanban.name}</h3>
			<TasksContainer>
				{tasks?.map(task => {
					return (
						<Card style={{ marginBottom: '0.5rem' }} key={task.id}>
							<div>{task.name}</div>
							<TaskTypeIcon id={task.typeId} />
						</Card>
					)
				})}
			</TasksContainer>
		</Container>
	)
}

const TaskTypeIcon = ({ id }: { id: number }) => {
	const { data: taskTypes } = useTaskTypes()
	const name = taskTypes?.find(task => task.id === id)?.name
	if (!name) return null
	return name === 'task' ? <TaskIcon style={{ width: '1.6rem' }} /> : <BugIcon style={{ width: '1.6rem' }} />
}

const Container = styled.div`
	min-width: 27rem;
	border-radius: 6px;
	background-color: rgb(244, 245, 247);
	padding: 0.7rem 0.7rem 1rem;
	margin-right: 1.5rem;
	overflow: hidden;
`

const TasksContainer = styled.div`
	overflow-y: scroll;
	flex: 1;
	//	影藏滚动条
	::-webkit-scrollbar {
		display: none;
	}
`
