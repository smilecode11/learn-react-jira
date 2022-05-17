import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useEditProject, useDeleteProject } from 'utils/project'
import { useProjectModal, useProjectQueryKey } from './util'

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
}

const List = ({ users, ...props }: ListPros) => {
	const { mutate } = useEditProject(useProjectQueryKey())
	// const pinProject = (id: number, pin: boolean) => mutate({ id, pin })
	//	函数式编程写法
	const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

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
					title: '负责人',
					render(value, project) {
						return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
					},
				},
				{
					title: '时间',
					render(value, project) {
						return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
					},
				},
				{
					render(value, project) {
						return (
							// @ts-ignore
							<More project={project} />
						)
					},
				},
			]}
			{...props}
		></Table>
	)
}

const More = ({ project }: { project: Project }) => {
	const { startEdit } = useProjectModal()
	const editProject = (id: number) => () => startEdit(id)
	const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey())

	const confirmDeleteProject = (id: number) => {
		Modal.confirm({
			title: `确定删除该项目吗?`,
			content: '点击确定删除',
			okText: '确定',
			onOk() {
				deleteProject({ id })
			},
		})
	}

	return (
		<Dropdown
			overlay={
				<Menu>
					<Menu.Item key={'edit'} onClick={editProject(project.id)}>
						编辑
					</Menu.Item>
					<Menu.Item key={'delete'} onClick={() => confirmDeleteProject(project.id)}>
						删除
					</Menu.Item>
				</Menu>
			}
		>
			<ButtonNoPadding type={'link'}>...</ButtonNoPadding>
		</Dropdown>
	)
}

export default List
