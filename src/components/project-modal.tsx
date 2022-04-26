import { Button, Drawer } from 'antd'
import { useProjectModal } from 'screens/project-list/util'

export const ProjectModal = () => {
	const { projectModalOpen, close } = useProjectModal()
	return (
		<Drawer placement={'right'} visible={projectModalOpen} width={'100%'} zIndex={9999} onClose={close}>
			<Button onClick={close}>关闭</Button>
		</Drawer>
	)
}
