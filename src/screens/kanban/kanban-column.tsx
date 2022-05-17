import { Kanban } from 'types/kanban'
import { useTasks } from 'utils/task'
import { useTasksSearchParams } from './util'

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
	const { data: allTaks } = useTasks(useTasksSearchParams())
	const tasks = allTaks?.filter(task => task.kanbanId === kanban.id)

	return (
		<div>
			<h3>{kanban.name}</h3>
			<div>
				{tasks?.map(task => {
					return <div key={task.id}>{task.name}</div>
				})}
			</div>
		</div>
	)
}
