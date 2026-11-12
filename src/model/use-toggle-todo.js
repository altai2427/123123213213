import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoService } from '../service/todo-service.js'

export function useToggleTodo() {
    const queryClient = useQueryClient()

    const toggleMutation = useMutation({
        mutationFn: todoService.toggleTask,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [todoService.baseKey]
            })
        },
        onError(error) {
            alert(error.message)
        }
    })

    return {
        handleToggle: (todo) => toggleMutation.mutate({ id: todo.id, done: !todo.done }),
        isPending: toggleMutation.isPending,
        error: toggleMutation.error
    }
}
