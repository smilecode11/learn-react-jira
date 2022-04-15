import { FormEvent } from 'react'
import './index.css'
import { login } from '../../auth-provider'

const LoginScreen = () => {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const username = (event.currentTarget.elements[0] as HTMLInputElement).value
		const password = (event.currentTarget.elements[1] as HTMLInputElement).value
		login({ username, password })
	}

	return (
		<form className="login-container" onSubmit={handleSubmit}>
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
