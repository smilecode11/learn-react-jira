import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LoginButton } from './login'
import { useAsync } from 'utils/use-async'

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
	//	从 useAuth 中获取登录方法及登录用户信息
	const { register } = useAuth()
	const { run, isLoading } = useAsync(undefined, { throwOnError: true })

	const handleSubmit = async ({ cpassword, ...values }: { username: string; password: string; cpassword: string }) => {
		if (cpassword !== values.password) return onError(new Error('请确认两次输入密码相同'))
		try {
			await run(register(values))
		} catch (e: any) {
			onError(e)
		}
	}

	return (
		<Form onFinish={handleSubmit}>
			<Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
				<Input placeholder={'用户名'} type="text" id={'username'} />
			</Form.Item>
			<Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
				<Input placeholder={'密码'} type="password" id={'password'} />
			</Form.Item>
			<Form.Item name={'cpassword'} rules={[{ required: true, message: '请确认密码' }]}>
				<Input placeholder={'密码'} type="password" id={'cpassword'} />
			</Form.Item>
			<Form.Item>
				<LoginButton loading={isLoading} type={'primary'} htmlType={'submit'}>
					注册
				</LoginButton>
			</Form.Item>
		</Form>
	)
}

export default LoginScreen
