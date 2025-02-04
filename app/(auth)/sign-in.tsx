import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";

const SignIn = () => {

    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [form, setForm] = useState({
        email: '',
        password: '',

    })

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return
    
        // Start the sign-in process using the email and password provided
        try {
          const signInAttempt = await signIn.create({
            identifier: form.email,
            password: form.password,
          })

          if (signInAttempt.status === 'complete') {
            await setActive({ session: signInAttempt.createdSessionId })
            router.replace('/')
          } else {

            console.error(JSON.stringify(signInAttempt, null, 2))
          }
        } catch (err) {

          console.error(JSON.stringify(err, null, 2))
        }
      }, [isLoaded, form.email, form.password])


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
                    Welcome 👋
                </Text>

            </View>

            <View className="p-5" >

                <InputField 
                   label='Email'
                   placeholder = 'Enter your Email'
                   icon={icons.email}
                   value={form.email}
                   onChangeText={(value) => setForm({
                    ...form, email:value
                   })}
                   />

                <InputField 
                   label='Password'
                   placeholder = 'Enter your Password'
                   icon={icons.lock}
                   secureTextEntry={true}
                   value={form.password}
                   onChangeText={(value) => setForm({
                    ...form, password:value
                   })}
                   />

                   <CustomButton title="Sign In"
                   onPress={onSignInPress} className="mt-8"/>

                   <OAuth/>

                   <Link href='/sign-up' className="text-lg text-center text-general-200 mt-10">
                       <Text >Don't have an account? </Text>
                       <Text className="text-primary-700">Log In</Text>
                   </Link>
            </View>

            {/* verification */}

        </View>
       </ScrollView>
    )
}


export default SignIn;