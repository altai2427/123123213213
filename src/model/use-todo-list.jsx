import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { todoService } from '../service/todo-service.js'

export function useTodoList() {
    const [page, setPage] = useState(1)

    const { data, error, isLoading, isPlaceholderData, refetch } = useQuery({
        ...todoService.getTasksQueryOptions({ page }),
    })

    const items = data?.items ?? (Array.isArray(data) ? data : [])
    const totalPages = data?.meta?.total_pages ?? 1

    const pagination = (
        <div>
            <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
                prev
            </button>
            <span> {page} / {totalPages} </span>
            <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
                next
            </button>
        </div>
    )
    return {
        list: items,
        error,
        isLoading,
        isPlaceholderData,
        pagination,
        refetch
    }
}
