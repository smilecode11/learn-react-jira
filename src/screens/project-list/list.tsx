import { Table, TableProps } from 'antd'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useEditProject } from 'utils/project'

export interface User {
	id: number
	name: string
	email: string
	title: string
	organization: string
	token: string
}

export interface Project {
	id: number
	name: string
	personId: number
	organization: string //	部门
	created: number //	时间
	pin: boolean //	收藏
}

interface ListPros extends TableProps<Project> {
	users: User[]
	refresh?: () => void
}

const List = ({ users, ...props }: ListPros) => {
	const { mutate } = useEditProject()

	// const pinProject = (id: number, pin: boolean) => mutate({ id, pin })
	//	函数式编程写法
	const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)

	return (
		<Table
			rowKey={'id'}
			pagination={false}
			columns={[
				{
					title: <Pin checked={true} disabled={true} />,
					render(value, project) {
						// return <Pin checked={project.pin} onCheckedChange={pin => pinProject(project.id, pin)} />
						//	函数式编程写法
						return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
					},
				},
				{
					title: '项目名称',
					render(value, project) {
						return <Link to={`/projects/${String(project.id)}`}>{project.name}</Link>
					},
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
			{...props}
		></Table>
	)
}

export default List
