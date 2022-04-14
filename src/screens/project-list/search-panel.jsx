
const SearchPanel = ({ param, setParam, users }) => {
    return <>
        <form action="#">
            <input type="text" value={param.title} onChange={ev => setParam({
                ...param,
                name: ev.target.value
            })} />
            &nbsp;
            <select value={param.id} onChange={ev => setParam({
                ...param,
                id: ev.target.value
            })}>
                <option value="">负责人</option>
                {users.map((user) => {
                    return <option key={user.id} value={user.id}>{user.name}</option>
                })}
            </select>
        </form>
    </>
}

export default SearchPanel