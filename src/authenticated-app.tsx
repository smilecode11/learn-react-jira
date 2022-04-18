import { Button } from 'antd'
import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import ProjectListScreen from 'screens/project-list'

export const AuthenticatedApp = () => {
	const { logout } = useAuth()

	return (
		<Container>
			<Header>
				<HeaderLeft>
					Logo
					<div>Title xxx....</div>
					<span>span 内容</span>
				</HeaderLeft>
				<HeaderRight>
					<Button danger type={'primary'} onClick={logout}>
						登出
					</Button>
				</HeaderRight>
			</Header>
			<Nav>Nav</Nav>
			<Main>
				<ProjectListScreen />
			</Main>
			<ASide>aside</ASide>
			<Footer>footer</Footer>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-rows: 6rem 1fr 6rem;
	grid-template-columns: 12rem 1fr 12rem;
	grid-template-areas:
		'header header header'
		'nav main aside'
		'footer footer footer';
	height: 100vh;
	grid-gap: 3.2rem;
`

const Header = styled.header`
	grid-area: header;
	background: #f2f2f2;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
`
const HeaderRight = styled.div`
	display: flex;
	align-items: center;
`

const Nav = styled.nav`
	grid-area: nav;
`

const Main = styled.div`
	grid-area: main;
`

const ASide = styled.aside`
	grid-area: aside;
`

const Footer = styled.footer`
	grid-area: footer;
	background: #f2f2f2;
`
