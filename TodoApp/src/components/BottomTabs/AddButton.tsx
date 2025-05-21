import React from 'react';
import { TouchableOpacity, View, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { getStyles } from './ styles';
import { GestureHandlerGestureEvent } from 'react-native-gesture-handler';

interface Props {
    style?: any;
}


export const AddButton: React.FC<Props> = (props) => {
    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);

    return (
        <TouchableOpacity
            {...props}
            style={[styles.addButton, props.style]}
            activeOpacity={0.9}
        >
            <View style={styles.plusContainer}>
                <Icon name="add" size={32} color="#fff" />
            </View>
        </TouchableOpacity>
    );
};

