import React from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTheme } from '../../context/ThemeContext';
import { getStyles } from './styles';
import type { TaskType } from '@/types/taskType';
import { useGetTasksQuery } from '@/redux/features/task';
import { TaskItem } from '@/components/TaskItem';

export const HomeScreen = () => {
    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);

    const { data, isLoading, isError } = useGetTasksQuery();
    console.log(data)

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Tarefas</Text>
                <SkeletonPlaceholder
                    backgroundColor="#E1E9EE"
                    highlightColor="#F2F8FC"
                >
                    {[...Array(6)].map((_, i) => (
                        <View
                            key={i}
                            style={{
                                height: 60,
                                borderRadius: 8,
                                marginBottom: 12,
                            }}
                        />
                    ))}
                </SkeletonPlaceholder>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Erro ao carregar tarefas.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tarefas</Text>

            <FlashList
                data={data?.tasks || []}
                keyExtractor={(item: TaskType) => item.id.toString()}
                estimatedItemSize={60}
                renderItem={({ item }) => (
                    <TaskItem onEdit={() => { }} task={item} />
                )}
            />
        </View>
    );
};
