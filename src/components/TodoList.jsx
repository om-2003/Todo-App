import React from 'react'
import TodoItem from './TodoItem'


export default function TodoList({ todos, onToggle, onRemove, onEdit }) {
if (todos.length === 0) return <p className="empty">No todos — enjoy your free time 🎉</p>
return (
<ul className="todo-list">
{todos.map(todo => (
<TodoItem
key={todo.id}
todo={todo}
onToggle={() => onToggle(todo.id)}
onRemove={() => onRemove(todo.id)}
onEdit={(newText) => onEdit(todo.id, newText)}
/>
))}
</ul>
)
}