import { useAuth } from 'context/auth-context'
import { Button, Form, Input } from 'antd'
import styled from '@emotion/styled'
import { useAsync } from 'utils/use-async'

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
	//	从 useAuth 中获取登录方法及登录用户信息
	const { login } = useAuth()
	const { run, isLoading } = useAsync(undefined, { throwOnError: true })

	const handleSubmit = async (values: { username: string; password: string }) => {
		try {
			await run(login(values))
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
			<Form.Item>
				<LoginButton loading={isLoading} type={'primary'} htmlType={'submit'}>
					登录
				</LoginButton>
			</Form.Item>
		</Form>
	)
}

export default LoginScreen

export const LoginButton = styled(Button)`
	width: 100%;
`
