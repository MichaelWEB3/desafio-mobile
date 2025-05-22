import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from '@/context/ThemeContext';
import { getStyles } from './estyles';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const taskSchema = z.object({
    title: z.string().min(1, 'Título obrigatório'),
    description: z.string().min(1, 'Descrição obrigatória'),
});

type TaskFormData = z.infer<typeof taskSchema>;

type RouteParams = {
    params: {
        taskToEdit?: {
            title: string;
            description: string;
        };
    };
};

export default function CreateTask() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const { taskToEdit } = route.params || {};
    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);

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

    const handleSave = (data: TaskFormData) => {
        console.log(taskToEdit ? 'Tarefa editada:' : 'Tarefa criada:', data);
        navigation.goBack();
    };

    const inputFocusStyle = (value: string) => ({
        borderColor: value.length > 0 ? currentColors.text + 'CC' : currentColors.text + '88',
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
            </Text>

            <TextInput
                placeholder="Título da tarefa"
                placeholderTextColor={currentColors.text + '88'}
                value={title}
                onChangeText={(text) => setValue('title', text, { shouldValidate: true })}
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
                onChangeText={(text) => setValue('description', text, { shouldValidate: true })}
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
                <Text style={{ color: 'red', marginBottom: 10 }}>{errors.description.message}</Text>
            )}

            <TouchableOpacity
                onPress={handleSubmit(handleSave)}
                disabled={!isValid}
                style={[
                    styles.button,
                    {
                        backgroundColor: isValid
                            ? currentColors.secondary
                            : currentColors.secondary + '55',
                    },
                ]}
            >
                <Text style={styles.buttonText}>{taskToEdit ? 'Atualizar' : 'Salvar'}</Text>
            </TouchableOpacity>
        </View>
    );
}
