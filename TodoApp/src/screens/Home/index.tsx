import { View, Text } from 'react-native'
import React from 'react';
import { getStyles } from './styles';
import { useTheme } from '../../context/ThemeContext';
export const HomeScreen = () => {
    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
        </View>
    )
}


