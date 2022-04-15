import { FormEvent } from 'react'
import './index.css'
const apiUrl = process.env.REACT_APP_API_URL

const LoginScreen = () => {
	/** 登录 */
	const login = (param: { username: string; password: string }) => {
		fetch(`${apiUrl}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(param),
		}).then(async resp => {
			if (resp.ok) {
				const data = await resp.json()
				console.log('登录成功', data)
			}
		})
	}

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
