import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(auth)/sign-up")
                }}
                className="w-full flex justify-end items-end p-5"
            >
                <Text>
                    Sign Up
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


export default SignUp;