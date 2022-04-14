/**
 * project-list demo
 *  知识点:
 * 		状态提升, fetch, 防抖, 环境变量文件, useEffect 模拟 DidMount 和 DidUpdate
 * 		TypeScript 强类型语言使用
 */
import { useEffect, useState } from 'react'
import qs from 'qs'
import './index.css'
import { cleanObject, useDidMount, useDebounce } from 'utils'

import SearchPanel from './search-panel'
import List from './list'

const apiUrl = process.env.REACT_APP_API_URL

const ProjectList = () => {
	const [users, setUsers] = useState([])
	const [param, setParam] = useState({ name: '', personId: '' })
	const [list, setList] = useState([])
	// 赋予 param 防抖能力
	const debouncedParam = useDebounce(param, 700)

	useEffect(() => {
		fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async resp => {
			if (resp.ok) {
				setList(await resp.json())
			}
		})
	}, [debouncedParam])

	useDidMount(() => {
		fetch(`${apiUrl}/users`).then(async resp => {
			if (resp.ok) {
				setUsers(await resp.json())
			}
		})
	})

	return (
		<div className="project-list-container">
			<SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
			<List users={users} list={list}></List>
		</div>
	)
}

export default ProjectList
