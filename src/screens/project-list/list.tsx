import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'

export interface User {
	id: string
	name: string
	token: string
}

export interface Project {
	id: number
	name: string
	personId: string
	organization: string //	部门
	created: number //	时间
}

interface ListPros extends TableProps<Project> {
	users: User[]
}

const List = ({ users, ...props }: ListPros) => {
	return (
		<Table
			rowKey={'id'}
			pagination={false}
			columns={[
				{
					title: '项目名称',
					dataIndex: 'name',
					key: 'name',
				},
				{
					title: '部门',
					dataIndex: 'organization',
					key: 'organization',
				},
				{
					title: '时间',
					key: 'created',
					render(value, project) {
						return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
					},
				},
				{
					title: '负责人',
					key: 'personId',
					render(value, project) {
						return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
					},
				},
			]}
			{...props}
		></Table>
	)
}

export default List
