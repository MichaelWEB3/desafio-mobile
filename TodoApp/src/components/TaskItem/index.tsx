import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Alert,
} from 'react-native';
import type { TaskType } from '@/types/taskType';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/redux/features/task';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStyles } from './styles';
import { useTheme } from '@/context/ThemeContext';
import { Message } from '../ErrorSuccesMessage';

interface TaskItemProps {
    task: TaskType;
    onEdit: (task: TaskType) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, }) => {
    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);
    const [deleteTask] = useDeleteTaskMutation();

    const [erro, setError] = useState('');

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const lineAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        Animated.timing(lineAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, []);

    const handleDelete = () => {
        Alert.alert(
            'Confirmar exclusão',
            'Tem certeza que deseja excluir esta tarefa?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {

                        try {
                            await deleteTask({ id: task.id.toString() }).unwrap();
                        } catch (error) {
                            console.error('Erro ao excluir tarefa', error);
                            setError('Erro ao excluir taref');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const lineWidth = lineAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const [updateTask] = useUpdateTaskMutation();


    const handleToggleDone = async () => {
        try {
            await updateTask({
                id: task.id,
                title: task.title,
                description: task.description,
                done: true,
            }).unwrap();
        } catch (error) {
            console.error('Erro ao atualizar status da tarefa', error);
            setError('Erro ao atualizar status da tarefa');
        }
    };

    return (
        <>
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: fadeAnim,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        backgroundColor: currentColors.background,
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 12,
                    }
                ]}
            >
                <View style={{ flex: 1 }}>
                    <Text
                        style={[
                            styles.text,
                            { color: currentColors.contextText, fontSize: 16 },
                        ]}
                    >
                        ID #{task.id.toString()} - {task.title}
                    </Text>

                    <Animated.View
                        style={{
                            height: 1,
                            backgroundColor: currentColors.text + '33',
                            width: lineWidth,
                            marginVertical: 6,
                            borderRadius: 1,
                        }}
                    />

                    <Text
                        style={[
                            styles.text,
                            { color: currentColors.text + 'AA', fontSize: 13 },
                        ]}
                    >
                        {task.description}
                    </Text>
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        onPress={() => onEdit(task)}
                        style={styles.iconBtn}
                    >
                        <Ionicons name="create-outline" size={20} color="#87CEEB" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleDelete}
                        style={styles.iconBtn}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={20}
                            color="#F44336"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleToggleDone}
                        style={styles.iconBtn}
                    >
                        <Ionicons
                            name="checkmark"
                            size={20}
                            color="#4CAF50" />
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {erro && (
                <Message type="error" message="Erro ao excluir tarefa!" />
            )}
            {erro && (
                <Message type="error" message="Erro ao excluir tarefa!" />
            )}
        </>
    );
};
