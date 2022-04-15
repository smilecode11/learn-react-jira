module.exports = (req, res, next) => {
	if (req.method === 'POST' && req.path === '/login') {
		if (req.body.username === 'chenxin' && req.body.password === '12345') {
			return res.status(200).json({
				user: {
					token: '12345',
				},
			})
		} else {
			return res.status(400).json({
				message: '用户名或密码输入错误',
			})
		}
	}
	next()
}
