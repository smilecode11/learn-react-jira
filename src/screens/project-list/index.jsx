/**
 * project-list demo
 *  考点: 状态提升, fetch, 防抖, 环境变量文件, useEffect 模拟 DidMount 和 DidUpdate
 */
import { useEffect, useState } from 'react'
import qs from 'qs'
import './index.css'
import { cleanObject } from 'utils'

import SearchPanel from "./search-panel"
import List from "./list"

const apiUrl = process.env.REACT_APP_API_URL

const ProjectList = () => {

    const [param, setParam] = useState({ name: '', id: '' })
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (resp) => {
            if (resp.ok) {
                setList(await resp.json())
            }
        })
    }, [param])

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async resp => {
            if (resp.ok) {
                setUsers(await resp.json())
            }
        })
    }, [])


    return <div className='project-list-container'>
        <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
        <List users={users} list={list} setList={setList}></List>
    </div>
}

export default ProjectList