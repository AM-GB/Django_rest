import React from 'react'

const TodoItem = ({ todo, delete_todo }) => {
    return todo.is_active ? (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.description}
            </td>
            <td>
                <button onClick={() => delete_todo(todo.id)}>Delete</button>
            </td>
        </tr>
    ) : (<tr></tr>)
}

const TodoList = ({ todos, delete_todo }) => {
    return (
        <table>
            <th>
                project
            </th>
            <th>
                User
            </th>
            <th>
                description
            </th>
            {todos.map((todo) => <TodoItem todo={todo} delete_todo={delete_todo} />)}
        </table>
    )
}

export default TodoList;
