import { Button, Input } from 'antd'
import { Row } from 'components/lib'
import { TaskTypesSelect } from 'components/task-types-select'
import { UserSelect } from 'components/user-select'
import { useSetUrlQueryParam } from 'utils/url'
import { useTasksSearchParams } from './util'

export const SearchPanel = () => {
	const searchParams = useTasksSearchParams()
	const setSearchParams = useSetUrlQueryParam()
	const reset = () => {
		setSearchParams({
			typeId: undefined,
			processorId: undefined,
			tagId: undefined,
			name: undefined,
		})
	}

	return (
		<Row marginBottom={4} gap={true}>
			<Input style={{ width: '20rem' }} placeholder={'任务名'} value={searchParams.name} onChange={evt => setSearchParams({ name: evt.target.value })}></Input>
			<UserSelect
				defaultOptionName={'经办人'}
				value={searchParams.processorId}
				onChange={value =>
					setSearchParams({
						processorId: value,
					})
				}
			></UserSelect>
			<TaskTypesSelect
				defaultOptionName={'类型'}
				value={searchParams.typeId}
				onChange={value =>
					setSearchParams({
						typeId: value,
					})
				}
			></TaskTypesSelect>
			<Button onClick={reset}>重置筛选条件</Button>
		</Row>
	)
}
