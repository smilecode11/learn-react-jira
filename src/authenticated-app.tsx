import { Button, Dropdown, Menu } from 'antd'
import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import ProjectListScreen from 'screens/project-list'
import { Row } from 'components/lib'
// import softwareLogin from 'assets/software-logo.svg'
import { ReactComponent as SoftWareLogo } from 'assets/software-logo.svg'

export const AuthenticatedApp = () => {
	const { logout, user } = useAuth()

	return (
		<Container>
			<Header between={true}>
				<HeaderLeft gap={true}>
					{/* <img src={softwareLogin} alt="" /> */}
					{/* 以 svg 渲染, 可自定义样式 */}
					<SoftWareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
					<h3>项目</h3>
					<h3>用户</h3>
				</HeaderLeft>
				<HeaderRight>
					{/* @ts-ignore */}
					<Dropdown
						overlay={
							<Menu>
								<Menu.Item>
									<a onClick={logout}>登出</a>
								</Menu.Item>
							</Menu>
						}
					>
						<a onClick={e => e.preventDefault()}>Hi, {user?.name}</a>
					</Dropdown>
				</HeaderRight>
			</Header>
			<Main>
				<ProjectListScreen />
			</Main>
		</Container>
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
`
