import { Alert, Image, Text, View } from "react-native"
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import { useCallback } from "react";
import { googleOAuth } from "@/lib/auth";
import { router } from "expo-router";
import { useSSO } from "@clerk/clerk-expo";


const OAuth =() => {

    const { startSSOFlow } = useSSO()

    const handleGoogleSignIn = useCallback(async () => {
      try {
        const result = await googleOAuth(startSSOFlow)

        if(result?.code === 'session_exists') {
            Alert.alert("Success", "Session Exists. Redirecting to home page")
            router.push("/(root)/(tabs)/home")
        }

        Alert.alert(result?.success? "success": "Error", result?.message)

      } catch (err) {
        console.error(JSON.stringify(err, null, 2))
      }
    }, [])
  

 return ( 

    <View>
       <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
            <View className="flex-1 h-[1px] bg-general-100"/>
            <Text>Or</Text>
            <View className="flex-1 h-[1px] bg-general-100"/>
        </View> 

        <CustomButton 
            title="Log in with Google"
            className="mt-6 w-full shadow-none"
            IconLeft={() => (
                <Image 
                    source={icons.google}    
                    className="w-5 h-5 mx-3 "
                    resizeMode="contain"
                />
            )}
            bgVariant="outline"
            textVariant="primary"
            onPress={handleGoogleSignIn}
            />
    </View>

  )
}

export default OAuth;