import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LoginButton } from './login'

const LoginScreen = () => {
	//	从 useAuth 中获取登录方法及登录用户信息
	const { register } = useAuth()

	const handleSubmit = (values: { username: string; password: string }) => {
		register({
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
				<LoginButton type={'primary'} htmlType={'submit'}>
					注册
				</LoginButton>
			</Form.Item>
		</Form>
	)
}

export default LoginScreen
