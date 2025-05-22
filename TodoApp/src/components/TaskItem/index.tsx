import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { TaskType } from '@/types/taskType';
import { useDeleteTaskMutation } from '@/redux/features/task';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStyles } from './styles';
import { useTheme } from '@/context/ThemeContext';

interface TaskItemProps {
    task: TaskType;
    onEdit: (task: TaskType) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {

    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);

    const [deleteTask] = useDeleteTaskMutation();

    const handleDelete = async () => {
        try {
            await deleteTask({ id: task.id.toString() });
        } catch (error) {
            console.error('Erro ao excluir tarefa', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {task.title} - {task.done ? '✅ Concluída' : '⌛ Pendente'}
            </Text>

            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => onEdit(task)} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={20} color="#4CAF50" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={20} color="#F44336" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
