import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTheme } from '../../context/ThemeContext';
import { getStyles } from './styles';
import type { TaskType } from '@/types/taskType';
import { useAddTaskMutation, useGetTasksQuery } from '@/redux/features/task';
import { TaskItem } from '@/components/TaskItem';
import { EmptyMessage } from '@/components/EmptyMessage';
import { ErroMessageApi } from '@/components/ErrorMessageApi';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NavigationType } from '@/types/navigationTypes';

export const DoneTaskScreen = () => {
    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);
    const navigation = useNavigation<NavigationType>();

    const handleEditTask = (task: TaskType) => {
        navigation.navigate('CreateTask', { taskToEdit: { title: task.title, description: task.description } });
    };
    const { data, isLoading, isError, refetch } = useGetTasksQuery();
    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, { fontWeight: '700' }]}>Tarefas</Text>
                <SkeletonPlaceholder
                    backgroundColor={currentColors.background}
                    highlightColor={currentColors.contextText}
                    speed={1200}
                >
                    {[...Array(6)].map((_, i) => (
                        <View
                            key={i}
                            style={{
                                height: 60,
                                borderRadius: 12,
                                marginBottom: 14,
                            }}
                        />
                    ))}
                </SkeletonPlaceholder>
            </View>
        );
    }

    if (isError) {
        return (
            <ErroMessageApi
                title='Ops! Algo deu errado.'
                description=' Não foi possível carregar suas tarefas. Por favor, tente novamente mais tarde.'
            />
        );
    }

    const tasks = (data?.tasks || [])
        .filter(task => task.done === true)
        .sort((a, b) => Number(a.id) - Number(b.id));
        
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { fontWeight: '700' }]}>Tarefas Concluidas</Text>

            {tasks.length === 0 ? (
                <EmptyMessage
                    title='Nenhuma tarefa por aqui!'
                    description='Crie uma nova tarefa para começar a se organizar.'
                />
            ) : (
                <FlashList
                    data={tasks}
                    keyExtractor={(item: TaskType) => item.id.toString()}
                    estimatedItemSize={70}
                    renderItem={({ item }) => (
                        <TaskItem
                            onEdit={() => handleEditTask(item)}
                            task={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    extraData={tasks}
                />
            )}
        </View>
    );
};
