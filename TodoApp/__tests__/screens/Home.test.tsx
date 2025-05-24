import React from 'react';
import { useGetTasksQuery } from '../../src/redux/features/task';
import { HomeScreen } from '../../src/screens/Home';
import { render, screen, waitFor } from '@testing-library/react-native';

const mockUpdateMutation = jest.fn();
const mockDeleteMutation = jest.fn();
jest.mock('../../src/redux/features/task', () => ({
    useGetTasksQuery: jest.fn(),
    useDeleteTaskMutation: () => [
        mockDeleteMutation,
        { isError: false, error: null },
    ],
    useUpdateTaskMutation: () => [
        mockUpdateMutation,
        { isError: false, error: null },
    ],
}));

jest.mock('@shopify/flash-list', () => {
    const React = require('react');
    const { View } = require('react-native');

    const MockFlashList = ({ data, renderItem, keyExtractor }: any) => (
        <View>
            {data?.map((item: any, index: number) => (
                <React.Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
                    {renderItem({ item, index })}
                </React.Fragment>
            ))}
        </View>
    );

    return {
        __esModule: true,
        default: MockFlashList,
        FlashList: MockFlashList,
    };
});




jest.mock('../../src/context/ThemeContext', () => ({
    useTheme: () => ({
        currentColors: {
            background: '#fff',
            contextText: '#ccc',
        },
    }),
}));

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
    useFocusEffect: (callback: any) => callback(),
}));

jest.mock('@shopify/flash-list', () => {
    const React = require('react');
    const { View } = require('react-native');

    const MockFlashList = ({ data, renderItem }: any) => (
        <View>
            {data?.map((item: any, index: number) => (
                <React.Fragment key={index}>
                    {renderItem({ item, index })}
                </React.Fragment>
            ))}
        </View>
    );

    return {
        __esModule: true,
        default: MockFlashList,
        FlashList: MockFlashList,
    };
});






describe('HomeScreen', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render SkeletonPlaceholder during loading', () => {
        (useGetTasksQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
            refetch: jest.fn(),
        });

        render(<HomeScreen />);

        expect(screen.getByText('Tarefas')).toBeTruthy();
    });

    it('should render error message when isError is true', () => {
        const tasksMock = [
            { id: '1', title: 'Tarefa 1', description: 'Desc 1', done: false },
            { id: '2', title: 'Tarefa 2', description: 'Desc 2', done: false },
        ];
        (useGetTasksQuery as jest.Mock).mockReturnValue({
            data: tasksMock,
            isLoading: false,
            isError: true,
            refetch: jest.fn(),
        });

        render(<HomeScreen />);

        expect(screen.getByText('Ops! Algo deu errado.')).toBeTruthy();
    });

    it('should render empty message when there are no tasks', () => {
        (useGetTasksQuery as jest.Mock).mockReturnValue({
            data: { tasks: [] },
            isLoading: false,
            isError: false,
            refetch: jest.fn(),
        });

        render(<HomeScreen />);

        expect(screen.getByText('Nenhuma tarefa por aqui!')).toBeTruthy();
    });

    it('should render the task list', async () => {
        const tasksMock = [
            { id: '1', title: 'Tarefa 1', description: 'Desc 1', done: false },
            { id: '2', title: 'Tarefa 2', description: 'Desc 2', done: false },
        ];

        (useGetTasksQuery as jest.Mock).mockReturnValue({
            data: { tasks: tasksMock },
            isLoading: false,
            isError: false,
            refetch: jest.fn(),
        });

        render(<HomeScreen />);
        await waitFor(() => {
            expect(screen.getByText(/Tarefa 1/)).toBeTruthy();
            expect(screen.getByText(/Tarefa 2/)).toBeTruthy();
        });
    });

});
