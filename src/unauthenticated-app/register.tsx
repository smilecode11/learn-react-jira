import { FormEvent } from 'react'
import './index.css'

import { useAuth } from 'context/auth-context'

const RegisterScreen = () => {
	//	从 useAuth 中获取登录方法及登录用户信息
	const { register } = useAuth()

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const username = (event.currentTarget.elements[0] as HTMLInputElement).value
		const password = (event.currentTarget.elements[1] as HTMLInputElement).value
		// 登录操作
		register({ username, password })
	}

	return (
		<form className="register-container" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">用户名</label>&nbsp;
				<input type="text" id={'username'} />
			</div>
			<div>
				<label htmlFor="password">密码</label>&nbsp;
				<input type="password" id={'password'} />
			</div>
			<div>
				<button type={'submit'}>注册</button>
			</div>
		</form>
	)
}

export default RegisterScreen
