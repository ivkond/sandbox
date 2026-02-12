import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'
import { Trash2, Plus } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Изучить React', completed: false },
    { id: 2, text: 'Настроить Vite', completed: true },
    { id: 3, text: 'Добавить Tailwind CSS', completed: false },
  ])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-slate-950 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-slate-50">
        TODO List
      </h1>
      
      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Добавить задачу..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={addTodo} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {todos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <span
              className={`flex-1 ${
                todo.completed
                  ? 'line-through text-slate-400'
                  : 'text-slate-900 dark:text-slate-50'
              }`}
            >
              {todo.text}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <p className="text-center text-slate-400 py-8">
          Нет задач. Добавьте первую!
        </p>
      )}

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 text-center">
        Всего: {todos.length} | Выполнено: {completedCount} | Осталось: {todos.length - completedCount}
      </div>
    </div>
  )
}
