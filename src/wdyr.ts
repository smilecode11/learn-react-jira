import React from 'react'
if (process.env.NODE_ENV === 'development') {
	const whyDidYouRender = require('@welldone-software/why-did-you-render')
	whyDidYouRender(React, {
		trackAllPureComponents: false, //  是否监听全部组件
	})
}
