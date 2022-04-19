import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { KanbanScreen } from 'screens/kanban'
import { EpicScreen } from 'screens/epic'

export const ProjectScreen = () => {
	return (
		<div>
			<h2>Project Screen</h2>
			<Link to={'kanban'}>看板</Link> &nbsp;
			<Link to={'epic'}>任务</Link>
			<Routes>
				<Route path="kanban" element={<KanbanScreen />}></Route>
				<Route path="epic" element={<EpicScreen />}></Route>
				<Route index element={<KanbanScreen />}></Route>
			</Routes>
		</div>
	)
}
