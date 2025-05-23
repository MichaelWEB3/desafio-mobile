import { useTheme } from '@/context/ThemeContext';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text } from 'react-native';
import { getStyles } from './styles';

interface MessageProps {
    message: string;
    duration?: number; // tempo em ms (padrão: 2000ms)
    type?: 'error' | 'success';
}

export const Message: React.FC<MessageProps> = ({
    message,
    duration = 2000,
    type = 'error',
}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-20)).current;
    const [visible, setVisible] = useState(true);

    const { currentColors } = useTheme();
    const styles = getStyles(currentColors, type);

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(duration),
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: -20,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => setVisible(false));
    }, []);

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity,
                    transform: [{ translateY }],
                },
            ]}
        >
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};
