import { useAuth } from 'context/auth-context'
import { Button, Form, Input } from 'antd'

const LoginScreen = () => {
	//	从 useAuth 中获取登录方法及登录用户信息
	const { login } = useAuth()

	const handleSubmit = (values: { username: string; password: string }) => {
		login({
			username: values.username,
			password: values.password,
		})
	}

	return (
		<Form onFinish={handleSubmit}>
			<Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
				<Input placeholder={'用户名'} type="text" id={'username'} />
			</Form.Item>
			<Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
				<Input placeholder={'密码'} type="password" id={'password'} />
			</Form.Item>
			<Form.Item>
				<Button type={'primary'} htmlType={'submit'}>
					登录
				</Button>
			</Form.Item>
		</Form>
	)
}

export default LoginScreen
