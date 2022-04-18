/**
 * project-list demo
 *  知识点:
 * 		状态提升, fetch, 防抖, 环境变量文件, useEffect 模拟 DidMount 和 DidUpdate
 * 		TypeScript 强类型语言使用
 */
import { useEffect, useState } from 'react'
import { cleanObject, useDidMount, useDebounce } from 'utils'
import { useHttp } from 'utils/http'

import SearchPanel from './search-panel'
import List from './list'
import styled from '@emotion/styled'

const ProjectList = () => {
	const [users, setUsers] = useState([])
	const [param, setParam] = useState({ name: '', personId: '' })
	const [list, setList] = useState([])
	// 赋予 param 防抖能力
	const debouncedParam = useDebounce(param, 700)

	const client = useHttp()

	useEffect(() => {
		client('projects', { data: cleanObject(debouncedParam) }).then(list => setList(list))
	}, [debouncedParam])

	useDidMount(() => {
		client('users').then(users => setUsers(users))
	})

	return (
		<Container>
			<h2>项目列表</h2>
			<SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
			<List users={users} list={list}></List>
		</Container>
	)
}

export default ProjectList

const Container = styled.div`
	padding: 3.2rem;
`
