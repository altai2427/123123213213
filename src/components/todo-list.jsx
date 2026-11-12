import { useTodoList } from '../model/use-todo-list.jsx'
import { useCreateTodo } from '../model/use-create-todo.js'
import { useDeleteTodo } from '../model/use-delete-todo.js'
import { useToggleTodo } from '../model/use-toggle-todo.js'
export function TodoList() {
    const { error, list, isPlaceholderData, isLoading, pagination } = useTodoList()
    const { handleSubmit, isPending: isCreating } = useCreateTodo()
    const { handleDelete, isPending: isDeleting } = useDeleteTodo()
    const { handleToggle, isPending: isToggling } = useToggleTodo()
    if (error) {
        return <div>Error: {error.message || JSON.stringify(error)}</div>
    }
    return (
        <>
            <h1>TodoList</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="text" placeholder="Enter your task ..." />
                <button disabled={isCreating}>Create</button>
            </form>

            {isLoading ? (
                <div>LOADING...</div>
            ) : (
                <ul className={isPlaceholderData ? 'isFetching' : ''}>
                    {list.map((todo) => (
                        <li key={todo.id}>
                            <input
                                type="checkbox"
                                checked={Boolean(todo.done)}
                                disabled={isToggling}
                                onChange={() => handleToggle(todo)}
                            />
                            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                                {todo.text}
                            </span>
                            <button
                                disabled={isDeleting}
                                onClick={() => handleDelete(todo.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {pagination}
        </>
    )
}
