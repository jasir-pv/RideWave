import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";

const SignUp = () => {

    const { isLoaded, signUp, setActive } = useSignUp()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',

    })

    const [verification, setVerification] = useState({
        state: 'default',
        error: '',
        code:'',
    })

    const onSignUpPress = async () => {
        if (!isLoaded) return
    
        // Start sign-up process using email and password provided
        try {
          await signUp.create({
            emailAddress: form.email,
            password: form.password,
          })
    
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    
          setVerification({
            ...verification,
            state: 'pending'
          })
        } catch (err) {
          console.error(JSON.stringify(err, null, 2))
        }
      }
    
      // Handle submission of verification form
      const onVerifyPress = async () => {
        if (!isLoaded) return
    
        try {
          const signUpAttempt = await signUp.attemptEmailAddressVerification({
            code: verification.code,
          })
    
          if (signUpAttempt.status === 'complete') {
            // TODO : Create a database User!
            await setActive({ session: signUpAttempt.createdSessionId })
            setVerification({...verification, state: "succes"})
          } else {
            setVerification({...verification, state: "failed", error:"Verification Failed"})
          }
        } catch (err) {
            setVerification({
                ...verification,
                error: err.error[0].longMessae,
                state: 'failed'
            })
        }
      }

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
                    Create Your Account
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

                   <CustomButton title="Sign Up"
                   onPress={onSignUpPress} className="mt-8"/>

                   <OAuth/>

                   <Link href='/sign-in' className="text-lg text-center text-general-200 mt-10">
                       <Text >Already have an account? </Text>
                       <Text className="text-primary-700">Log In</Text>
                   </Link>
            </View>

            {/* verification */}

        </View>
       </ScrollView>
    )
}


export default SignUp;