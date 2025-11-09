import React, { useEffect, useState } from 'react'
import TodoList from './components/TodoList'

const STORAGE_KEY = 'todos_v1'


export default function App() {
const [todos, setTodos] = useState([])
const [text, setText] = useState('')
const [filter, setFilter] = useState('all')

useEffect(() => {
const raw = localStorage.getItem(STORAGE_KEY)
if (raw) setTodos(JSON.parse(raw))
}, [])


useEffect(() => {
localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}, [todos])

function addTodo(e) {
e.preventDefault()
const value = text.trim()
if (!value) return
const newTodo = {
id: Date.now().toString() + Math.random().toString(36).slice(2,8),
text: value,
completed: false
}
setTodos([newTodo, ...todos])
setText('')
}


function toggle(id) {
setTodos(todos.map(t => t.id === id ? {...t, completed: !t.completed} : t))
}

function remove(id) {
setTodos(todos.filter(t => t.id !== id))
}


function edit(id, newText) {
setTodos(todos.map(t => t.id === id ? {...t, text: newText} : t))
}


function clearCompleted() {
setTodos(todos.filter(t => !t.completed))
}

const remaining = todos.filter(t => !t.completed).length


const visible = todos.filter(t => {
if (filter === 'active') return !t.completed
if (filter === 'completed') return t.completed
return true
})

return (
<div className="app">
<div className="card">
<h1>Todo List</h1>


<form onSubmit={addTodo} className="input-row">
<input
value={text}
onChange={e => setText(e.target.value)}
placeholder="What needs to be done?"
/>
<button type="submit">Add</button>
</form>


<TodoList todos={visible} onToggle={toggle} onRemove={remove} onEdit={edit} />


<div className="controls">
<div>{remaining} item{remaining !== 1 ? 's' : ''} left</div>
<div className="filters">
<button className={filter==='all'? 'active' : ''} onClick={() => setFilter('all')}>All</button>
<button className={filter==='active'? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
<button className={filter==='completed'? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
</div>
<div>
<button onClick={clearCompleted}>Clear completed</button>
</div>
</div>


</div>


<footer className="footer">Built with React • No backend • Saved in localStorage</footer>
</div>
)
}