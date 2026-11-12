import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoService } from '../service/todo-service.js'

export function useDeleteTodo() {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: todoService.deleteTask,
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
        handleDelete: (id) => deleteMutation.mutate(id),
        isPending: deleteMutation.isPending,
        error: deleteMutation.error
    }
}
