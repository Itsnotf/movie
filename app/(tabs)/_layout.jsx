import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors'

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.PRIMARY
        }}>
            <Tabs.Screen name="home" options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />
            }} />
            <Tabs.Screen name="explore" options={{
                tabBarLabel: 'Explore',
                tabBarIcon: ({ color }) => <Feather name="airplay" size={24} color={color} />
            }} />
        </Tabs>
    );
}
