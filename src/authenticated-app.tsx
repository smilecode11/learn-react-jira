import { Button, Drawer, Dropdown, Menu, Popover } from 'antd'
import styled from '@emotion/styled'
import { Routes, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from 'context/auth-context'
import ProjectListScreen from 'screens/project-list'
import { ProjectScreen } from 'screens/project'
// import softwareLogin from 'assets/software-logo.svg'
import { ReactComponent as SoftWareLogo } from 'assets/software-logo.svg'
import { Row } from 'components/lib'
import { resetRoute } from 'utils'
import { ProjectPopover } from 'components/project-popover'
import { ProjectModal } from 'components/project-modal'

export const AuthenticatedApp = () => {
	return (
		<Container>
			<Router>
				<PageHeader />
				<Main>
					<Routes>
						<Route path={'/projects'} element={<ProjectListScreen />} />
						<Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
						<Route index element={<ProjectListScreen />} />
					</Routes>
				</Main>
				<ProjectModal />
			</Router>
		</Container>
	)
}

export const PageHeader = () => {
	const { logout, user } = useAuth()
	return (
		<Header between={true}>
			<HeaderLeft gap={true}>
				<Button type={'link'} onClick={resetRoute}>
					<SoftWareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
				</Button>
				<ProjectPopover></ProjectPopover>
				<CursorText>用户</CursorText>
			</HeaderLeft>
			<HeaderRight>
				{/* @ts-ignore */}
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item key={'logout'}>
								<Button type={'link'} danger onClick={logout}>
									登出
								</Button>
							</Menu.Item>
						</Menu>
					}
				>
					<Button type={'link'}>Hi, {user?.name}</Button>
				</Dropdown>
			</HeaderRight>
		</Header>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-rows: 6rem 1fr;
	grid-template-areas:
		'header'
		'main';
	height: 100vh;
`

const Header = styled(Row)`
	grid-area: header;
	padding: 3.2rem;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
	z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled(Row)`
	color: rgb(38, 132, 255);
	cursor: pointer;
`

const Main = styled.div`
	grid-area: main;
	display: flex;
`
export const CursorText = styled.div`
	cursor: pointer;
`
