import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Platform, View, SafeAreaView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getStyles } from './styles';
import { useTheme } from '@/context/ThemeContext';
import CreateTask from '@/screens/AddTask';
import BottomTabs from '@/components/BottomTabs';
import CreateTaskScreen from '@/screens/AddTask';

export type RootStackParamList = {
    Tabs: undefined;
    CreateTask: {
        taskToEdit?: {
            id?: Number;
            title: string;
            description: string;
            done?: boolean;
        };
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { currentColors } = useTheme();
    const styles = getStyles(currentColors);

    return (
        <SafeAreaProvider>
            <InnerNavigator currentColors={currentColors} styles={styles} />
        </SafeAreaProvider>
    );
}

function InnerNavigator({ currentColors, styles }: { currentColors: any; styles: any }) {
    const insets = useSafeAreaInsets();

    return (
        <>
            {Platform.OS === 'android' && (
                <StatusBar
                    backgroundColor={currentColors.primary}
                    barStyle="light-content"
                    translucent={false}
                    hidden={false}
                />
            )}

            <SafeAreaView style={[styles.consentSafeArea, { flex: 1 }]}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Tabs" component={BottomTabs} />
                        <Stack.Screen
                            name="CreateTask"
                            component={CreateTaskScreen}
                            options={{
                                presentation: 'modal',
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>

            <View
                style={{
                    height: insets.bottom,
                    backgroundColor: currentColors.mode === 'dark' ? currentColors.primary : '#FFF',
                }}
            />
        </>
    );
}

