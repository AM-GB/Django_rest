import React from 'react'

const TodoItem = ({ todo }) => {
    return (
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
        </tr>
    )
}

const TodoList = ({ todos }) => {
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
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default TodoList;
