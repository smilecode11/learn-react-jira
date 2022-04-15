import { FormEvent } from 'react'
import './index.css'

import { useAuth } from 'context/auth-context'

const LoginScreen = () => {
	//	从 useAuth 中获取登录方法及登录用户信息
	const { login, user } = useAuth()

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const username = (event.currentTarget.elements[0] as HTMLInputElement).value
		const password = (event.currentTarget.elements[1] as HTMLInputElement).value
		// 登录操作
		login({ username, password })
	}

	return (
		<form className="login-container" onSubmit={handleSubmit}>
			{user && (
				<>
					<div>
						当前登录用户: {user.name} - token: {user.token}
					</div>
				</>
			)}
			<div>
				<label htmlFor="username">用户名</label>&nbsp;
				<input type="text" id={'username'} />
			</div>
			<div>
				<label htmlFor="password">密码</label>&nbsp;
				<input type="password" id={'password'} />
			</div>
			<div>
				<button type={'submit'}>登录</button>
			</div>
		</form>
	)
}

export default LoginScreen
