import { Form, Input } from 'antd'
import { IdSelect } from 'components/id-select'
import { UserSelect } from 'components/user-select'
import { Project, User } from './list'

interface SearchPanelProps {
	users: User[]
	param: Partial<Pick<Project, 'name' | 'personId'>>
	setParam: (param: SearchPanelProps['param']) => void
}

const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
	return (
		<Form style={{ marginBottom: '2rem' }} layout={'inline'}>
			<Form.Item>
				<Input
					type="text"
					placeholder={'项目名'}
					defaultValue={param.name}
					onChange={ev =>
						setParam({
							...param,
							name: ev.target.value,
						})
					}
				/>
			</Form.Item>
			<Form.Item>
				<IdSelect
					value={param.personId}
					defaultOptionName={'负责人'}
					options={users || []}
					onChange={value =>
						setParam({
							...param,
							personId: value,
						})
					}
				></IdSelect>
			</Form.Item>
		</Form>
	)
}

export default SearchPanel
