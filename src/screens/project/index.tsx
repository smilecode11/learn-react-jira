import { Link } from 'react-router-dom'
import { Routes, Route, useLocation } from 'react-router'
import { KanbanScreen } from 'screens/kanban'
import { EpicScreen } from 'screens/epic'
import styled from '@emotion/styled'
import { Menu } from 'antd'

const useSelectType = () => {
	const { pathname } = useLocation()
	const keyArr = pathname.split('/')
	return keyArr[keyArr.length - 1]
}

export const ProjectScreen = () => {
	const selectType = useSelectType()

	return (
		<Container>
			<Aside>
				<Menu selectedKeys={[selectType]} style={{ textAlign: 'center', flex: 1 }}>
					<Menu.Item key={'kanban'}>
						<Link to={'kanban'}>看板</Link>
					</Menu.Item>
					<Menu.Item key={'epic'}>
						<Link to={'epic'}>任务</Link>
					</Menu.Item>
				</Menu>
			</Aside>
			<Main>
				<Routes>
					<Route path="kanban" element={<KanbanScreen />}></Route>
					<Route path="epic" element={<EpicScreen />}></Route>
					<Route index element={<KanbanScreen />}></Route>
				</Routes>
			</Main>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 16rem 1fr;
	overflow-x: scroll;
`

const Aside = styled.div`
	display: flex;
	flex-direction: column;
	background-color: rgb(244, 245, 247); ;
`

const Main = styled.div`
	display: flex;
`
