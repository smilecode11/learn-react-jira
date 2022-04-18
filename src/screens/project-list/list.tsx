import { render } from '@testing-library/react'
import { Table } from 'antd'

export interface User {
	id: number
	name: string
	token: string
}

interface Project {
	id: number
	name: string
	personId: number
	organization: string
	created: number
}

interface ListPros {
	users: User[]
	list: Project[]
}

const List = ({ list, users }: ListPros) => {
	return (
		<Table
			columns={[
				{
					title: '项目名称',
					key: 'name',
					dataIndex: 'name',
				},
				{
					title: '负责人',
					key: 'personId',
					render(project) {
						return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
					},
				},
			]}
			dataSource={list}
			pagination={false}
		></Table>
	)
}

export default List
