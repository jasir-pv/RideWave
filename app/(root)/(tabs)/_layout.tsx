import { icons, images } from "@/constants";
import { Tabs } from "expo-router"
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({
    source,
    focused,
}: {
    source: ImageSourcePropType;
    focused: boolean;
    }) => (
    <View  className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}>
        <View  className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}>
            <Image
            source={source}
            tintColor="white"
            resizeMode="contain"
            className="w-7 h-7"
             />
        </View>
    </View>
);

const Layout = () => {
    <Tabs 
    initialRouteName="index" 
    screenOptions={{
        tabBarActiveTintColor : 'White',
    }}>

        <Tabs.Screen
            name="home"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} source={icons.home} />
                ) 
            }}
             />

        <Tabs.Screen
            name="rides"
            options={{
                title: 'Rides',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} source={icons.list} />
                ) 
            }}
            />

        <Tabs.Screen
            name="chat"
            options={{
                title: 'Chat',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} source={icons.chat} />
                ) 
            }}
             />

        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} source={icons.profile} />
                ) 
            }}
            />
        


    </Tabs>
}


export default Layout; 