import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoService } from '../service/todo-service.js'

export function useCreateTodo() {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: todoService.createTask,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [todoService.baseKey]
            })
        },
        onError(error) {
            alert(error.message)
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)

        const text = String(formData.get('text') ?? '').trim()
        if (!text) return

        createMutation.mutate(
            {
                text,
                done: false
            },
            {
                onSuccess: () => {
                    form.reset()
                }
            }
        )
    }

    return {
        handleSubmit,
        isPending: createMutation.isPending,
        error: createMutation.error
    }
}
