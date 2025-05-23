import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStyles } from './styles';
import { useTheme } from '@/context/ThemeContext';

interface EmptyMessageProps {
    title: string;
    description: string;
}

export const EmptyMessage: React.FC<EmptyMessageProps> = ({ title, description }) => {
    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);

    return (
        <View style={styles.emptyBox}>
            <Ionicons name="checkmark-done-outline" size={50} color={currentColors.text} />
            <Text style={styles.emptyTitle}>{title}</Text>
            <Text style={styles.emptyMessage}>{description}</Text>
        </View>
    );
};
