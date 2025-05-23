import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { AddButton } from './AddButton';
import { getStyles } from './ styles';
import { HomeScreen } from '../../screens/Home';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
            
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="home-outline"
                            size={24}
                            color={focused ? currentColors.secondary : currentColors.primary}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="AddTask"
                component={HomeScreen}
                options={{
                    tabBarButton: (props) => <AddButton {...props} />,
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('CreateTask');
                    },
                })}
            />

            <Tab.Screen
                name="Profile"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="checkmark-done"
                            size={24}
                            color={focused ? currentColors.secondary : currentColors.primary}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
