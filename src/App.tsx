import { TodoList } from './components/todo-list'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <TodoList />
    </div>
  )
}

export default App
