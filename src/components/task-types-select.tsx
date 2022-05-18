import React from 'react'
import { IdSelect } from 'components/id-select'
import { useTaskTypes } from 'utils/task-type'

export const TaskTypesSelect = (props: React.ComponentProps<typeof IdSelect>) => {
	const { data: taskTypes } = useTaskTypes()
	return <IdSelect options={taskTypes || []} {...props}></IdSelect>
}
