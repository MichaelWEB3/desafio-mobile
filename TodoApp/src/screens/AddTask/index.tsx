import React, { useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import {
    useNavigation,
    useRoute,
    RouteProp,
} from '@react-navigation/native';
import { useTheme } from '@/context/ThemeContext';
import { getStyles } from './estyles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    useAddTaskMutation,
    useUpdateTaskMutation,
} from '@/redux/features/task';
import { taskSchema, TaskFormData } from '@/schemas/task.schema';
import Icon from 'react-native-vector-icons/Feather';
import { Message } from '@/components/ErrorSuccesMessage';

type RouteParams = {
    params: {
        taskToEdit?: {
            id: string;
            title: string;
            description: string;
            done: boolean;
        };
    };
};

export default function CreateTask() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const { taskToEdit } = route.params || {};
    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);

    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        mode: 'onChange',
        defaultValues: {
            title: taskToEdit?.title || '',
            description: taskToEdit?.description || '',
        },
    });

    useEffect(() => {
        register('title');
        register('description');
    }, [register]);

    const title = watch('title');
    const description = watch('description');

    const inputFocusStyle = (value: string) => ({
        borderColor:
            value.length > 0
                ? currentColors.text + 'CC'
                : currentColors.text + '88',
    });

    const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

    const handleSave = async (data: TaskFormData) => {
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            if (taskToEdit) {
                updateTask({
                    id: Number(taskToEdit.id),
                    title: data.title,
                    description: data.description,
                    done: taskToEdit?.done ?? false, // ou o valor original da task
                });
                setSuccessMessage('Tarefa atualizada com sucesso!');
            } else {
                await addTask(data).unwrap();
                setSuccessMessage('Tarefa criada com sucesso!');
            }

            navigation.goBack();
        } catch (error) {
            setErrorMessage('Erro ao salvar tarefa!');
            console.error('Erro ao salvar tarefa:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Icon
                    name="edit-3"
                    size={24}
                    color={currentColors.contextText}
                    style={{ marginRight: 8 }}
                />
                <Text style={styles.label}>
                    {taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
                </Text>
            </View>

            <Text style={{ color: currentColors.text + 'AA', marginBottom: 12 }}>
                {taskToEdit
                    ? 'Altere os campos abaixo para atualizar sua tarefa.'
                    : 'Preencha os campos abaixo para criar uma nova tarefa.'}
            </Text>

            <TextInput
                placeholder="Título da tarefa"
                placeholderTextColor={currentColors.contextText + '88'}
                value={title}
                onChangeText={(text) =>
                    setValue('title', text, { shouldValidate: true })
                }
                style={[
                    styles.input,
                    {
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        color: currentColors.contextText,
                        ...inputFocusStyle(title),
                    },
                ]}
            />
            {errors.title && (
                <Text style={{ color: 'red', marginBottom: 6 }}>{errors.title.message}</Text>
            )}

            <TextInput
                placeholder="Descrição"
                placeholderTextColor={currentColors.text + '88'}
                value={description}
                onChangeText={(text) =>
                    setValue('description', text, { shouldValidate: true })
                }
                multiline
                style={[
                    styles.input,
                    {
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        color: currentColors.contextText,
                        height: 100,
                        textAlignVertical: 'top',
                        ...inputFocusStyle(description),
                    },
                ]}
            />
            {errors.description && (
                <Text style={{ color: 'red', marginBottom: 10 }}>
                    {errors.description.message}
                </Text>
            )}

            <TouchableOpacity
                onPress={handleSubmit(handleSave)}
                disabled={!isValid || isAdding || isUpdating}
                style={[
                    styles.button,
                    {
                        backgroundColor: isValid
                            ? currentColors.secondary
                            : currentColors.secondary + '55',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                ]}
            >
                {(isAdding || isUpdating) ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={styles.buttonText}>
                        {taskToEdit ? 'Atualizar' : 'Salvar'}
                    </Text>
                )}
            </TouchableOpacity>

            {errorMessage && <Message type="error" message={errorMessage} />}
            {successMessage && <Message type="success" message={successMessage} />}
        </View>
    );
}
