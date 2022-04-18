import { Table } from 'antd'
import dayjs from 'dayjs'

export interface User {
	id: number
	name: string
	token: string
}

interface Project {
	id: number
	name: string
	personId: number
	organization: string //	部门
	created: number //	时间
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
					dataIndex: 'name',
				},
				{
					title: '部门',
					dataIndex: 'organization',
				},
				{
					title: '时间',
					render(value, project) {
						return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
					},
				},
				{
					title: '负责人',
					render(value, project) {
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
