import { keepPreviousData, queryOptions } from '@tanstack/react-query'
const BASE_URL = 'https://83e68f322ce7782d.mokky.dev/todos'
export const todoService = {
    baseKey: 'todos',
    getTasks: ({ page }, { signal }) => {
        return fetch(`${BASE_URL}?page=${page}&limit=4`, {
            signal
        }).then((res) => {
            if (!res.ok) throw new Error('ошибка при загрузке задач')
            return res.json()
        })
    },
    getTasksQueryOptions: ({ page }) => {
        return queryOptions({
            queryKey: [todoService.baseKey, { page }],
            queryFn: (meta) => todoService.getTasks({ page }, meta),
            placeholderData: keepPreviousData,
            select: (data) => {
                if (data?.items) {
                    return {
                        ...data,
                        items: [...data.items].reverse()
                    }
                }
                return Array.isArray(data) ? [...data].reverse() : []
            }
        })
    },

    createTask: (payload) => {
        return fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((res) => {
            if (!res.ok) throw new Error('ошибка при создании задачи')
            return res.json()
        })
    },

    deleteTask: (id) => {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            if (!res.ok) throw new Error('ошибка при удалении задачи')
            return res.json()
        })
    },

    toggleTask: ({ id, done }) => {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ done })
        }).then((res) => {
            if (!res.ok) throw new Error('ошибка при обновлении статуса задачи')
            return res.json()
        })
    },
}
