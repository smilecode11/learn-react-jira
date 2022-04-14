
const List = (props) => {
    const { list, users } = props
    return <table border="1">
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {list.map(item => {
                return <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{(users.find(user => user.id === item.personId)?.name || '未知')}</td>
                </tr>
            })}
        </tbody>
    </table>
}

export default List