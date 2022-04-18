import { Form, Input, Select } from 'antd'
import { User } from './list'

interface SearchPanelProps {
	param: {
		name: string
		personId: string
	}
	users: User[]
	setParam: (param: SearchPanelProps['param']) => void
}

const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
	return (
		<Form style={{ marginBottom: '2rem' }} layout={'inline'}>
			<Form.Item>
				<Input
					type="text"
					placeholder={'项目名'}
					onChange={ev =>
						setParam({
							...param,
							name: ev.target.value,
						})
					}
				/>
			</Form.Item>
			<Form.Item>
				<Select
					defaultValue={''}
					value={param.personId}
					onChange={value =>
						setParam({
							...param,
							personId: value,
						})
					}
				>
					<Select.Option value={''}>请选择</Select.Option>
					{users.map(user => {
						return (
							<Select.Option key={user.id} value={user.id}>
								{user.name}
							</Select.Option>
						)
					})}
				</Select>
			</Form.Item>
		</Form>
	)
}

export default SearchPanel
