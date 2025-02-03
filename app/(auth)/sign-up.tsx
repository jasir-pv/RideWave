import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";

const SignUp = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',

    })
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
                <InputField 
                   label='Name'
                   placeholder = 'Enter your name'
                   icon={icons.person}
                   value={form.name}
                   onChangeText={(value) => setForm({
                    ...form, name:value
                   })}
                   />
            </View>
        </View>
       </ScrollView>
    )
}


export default SignUp;