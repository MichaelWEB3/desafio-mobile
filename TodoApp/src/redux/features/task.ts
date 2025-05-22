import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { api } from '@/api/api';
import type { TaskType } from '@/types/taskType';

interface TasksResponse {
    tasks: TaskType[];
}

type AxiosQueryArgs = {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
};

const axiosBaseQuery: BaseQueryFn<AxiosQueryArgs, unknown, unknown> = async ({
    url,
    method = 'GET',
    data,
    params,
}) => {
    try {
        const response = await api.request({ url, method, data, params });
        return { data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return {
            error: {
                status: axiosError.response?.status ?? 500,
                data: axiosError.response?.data ?? axiosError.message,
            },
        };
    }
};

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: axiosBaseQuery,
    tagTypes: ['Task'],
    endpoints: builder => ({
        getTasks: builder.query<TasksResponse, void>({
            query: () => ({ url: '/tasks' }),
            transformResponse: (response: TasksResponse) => ({
                tasks: response.tasks.sort((a, b) => Number(a.done) - Number(b.done)),
            }),
            providesTags: ['Task'],
        }),

        addTask: builder.mutation<void, TaskType>({
            query: task => ({
                url: '/task/create',
                method: 'POST',
                data: task,
            }),
            invalidatesTags: ['Task'],
        }),

        updateTask: builder.mutation<void, TaskType>({
            query: task => ({
                url: '/task/update',
                method: 'PUT',
                data: task,
            }),
            invalidatesTags: ['Task'],
        }),

        deleteTask: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: '/task/delete',
                method: 'DELETE',
                data: { id },
            }),
            invalidatesTags: ['Task'],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = tasksApi;
