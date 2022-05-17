import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { KanbanColumn } from './kanban-column'
import { useKanbanSearchParams, useProjectInUrl } from './util'

export const KanbanScreen = () => {
	useDocumentTitle('看板列表')

	const { data: currentProject } = useProjectInUrl()
	const { data: kanbans } = useKanbans(useKanbanSearchParams())

	return (
		<div>
			<h2>{currentProject?.name}看板</h2>
			{kanbans?.map(kanban => (
				<KanbanColumn kanban={kanban} key={kanban.id} />
			))}
		</div>
	)
}
