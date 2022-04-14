import { User } from './list'

interface SearchPanelProps {
	param: {
		name: string
		personId: string
	}
	users: User[]
	setParam: (param: SearchPanelProps['param']) => void
}

const SearchPanel = (props: SearchPanelProps) => {
	const { param, setParam, users } = props
	return (
		<>
			<form action="#">
				<input
					type="text"
					value={param.name}
					onChange={ev =>
						setParam({
							...param,
							name: ev.target.value,
						})
					}
				/>
				&nbsp;
				<select
					value={param.personId}
					onChange={ev =>
						setParam({
							...param,
							personId: ev.target.value,
						})
					}
				>
					<option value="">负责人</option>
					{users.map(user => {
						return (
							<option key={user.id} value={user.id}>
								{user.name}
							</option>
						)
					})}
				</select>
			</form>
		</>
	)
}

export default SearchPanel
