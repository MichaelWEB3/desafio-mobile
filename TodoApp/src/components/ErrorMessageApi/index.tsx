import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStyles } from './styles';
import { useTheme } from '@/context/ThemeContext';

interface ErroMessageProps {
    title: string;
    description: string;
}

export const ErroMessageApi: React.FC<ErroMessageProps> = ({ title, description }) => {
    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);

    return (
        <View style={styles.container}>
            <View style={styles.errorBox}>
                <Ionicons testID="icon" name="warning-outline" size={40} color="#FF4D4F" />
                <Text style={styles.errorTitle}>{title}</Text>
                <Text style={styles.errorMessage}>
                    {description}
                </Text>
            </View>
        </View>
    );
};
