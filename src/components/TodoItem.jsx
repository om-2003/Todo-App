import React, { useState, useRef, useEffect } from 'react'


export default function TodoItem({ todo, onToggle, onRemove, onEdit }) {
const [editing, setEditing] = useState(false)
const [value, setValue] = useState(todo.text)
const inputRef = useRef(null)


useEffect(() => {
if (editing && inputRef.current) inputRef.current.focus()
}, [editing])


function save() {
const v = value.trim()
if (!v) return onRemove()
if (v !== todo.text) onEdit(v)
setEditing(false)
}


return (
<li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
<label>
<input type="checkbox" checked={todo.completed} onChange={onToggle} />
</label>


{!editing ? (
<div className="text" onDoubleClick={() => setEditing(true)}>
{todo.text}
</div>
) : (
<input
ref={inputRef}
className="edit"
value={value}
onChange={e => setValue(e.target.value)}
onBlur={save}
onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') { setValue(todo.text); setEditing(false) } }}
/>
)}


<div className="actions">
<button onClick={() => setEditing(true)}>Edit</button>
<button onClick={onRemove}>Delete</button>
</div>
</li>
)
}