import { images } from "@/constants";
import { ScrollView, View, Text, Image } from "react-native";

const SignUp = () => {
    return (
       <ScrollView className='flex-1 bg-white'>
        <View className=" flex-1 bg-white">
            <View>
                <Image
                    source={images.signUpCar} 
                    className="z-0  w-full h-[250px]"
                />
                <Text className="text-2xl text-black font-JakartaSemiBold
                absolute bottom-5 left-5">
                    Create Your Accout
                </Text>

            </View>

            <View className="p-5" >
                <InputFlied />
            </View>
        </View>
       </ScrollView>
    )
}


export default SignUp;