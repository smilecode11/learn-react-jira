import { Button, Card } from 'antd'
import React, { useState } from 'react'
import LoginScreen from './login'
import RegisterScreen from './register'

export const UnauthenticatedApp = () => {
	const [isRegister, setIsRegister] = useState(false)

	return (
		<Card style={{ width: '320px', minHeight: '200px', margin: '0 auto' }}>
			{isRegister ? <RegisterScreen /> : <LoginScreen></LoginScreen>}
			<Button type={'ghost'} onClick={() => setIsRegister(!isRegister)}>
				切换到{isRegister ? '登录' : '注册'}
			</Button>
		</Card>
	)
}
