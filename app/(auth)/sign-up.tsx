import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, View, Text, Image, Alert } from "react-native";
import ReactNativeModal from 'react-native-modal'


const SignUp = () => {

    const { isLoaded, signUp, setActive } = useSignUp()
    const [showSuccessModal, setShowSuccessModal] = useState(false)

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
            Alert.alert('Error', err.errors[0].longMessage)
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

{/* If Success Verification */}
            <ReactNativeModal isVisible={showSuccessModal}>
                <View className="bg-white px-7 rounded-3xl min-h-[300px]">
                   <Image source={images.check}
                    className="w-[110px] h-[110px] mx-auto my-5"/>

                    <Text className="text-3xl font-JakartaBold text-center"> Verified</Text>
                    <Text className="text-base text-gray-400 font-Jakarta text-center mt-4">
                        You have successfully verified your account.
                    </Text>

                    <CustomButton 
                        title="Home"
                        onPress={() => {
                            setShowSuccessModal(false)
                            router.push('/(root)/(tabs)/Home')
                            }}
                        className="mt-6"/>

                </View>
            </ReactNativeModal>

    {/* If Pending verification */}

    <ReactNativeModal isVisible={verification.state === 'pending'}
       onModalHide={()=> {
            if(verification.state === 'success') setShowSuccessModal(true)
       }}>

    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
       <Text className="text-3xl font-JakartaBold">Verification</Text>
        <Text className="font-Jakarta mb-5 mt-3">
            We've sent a verification code to {form.email}
        </Text>

        <InputField 
            label="code"
            icon={icons.lock}
            placeholder="12345"
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code) => setVerification({ ...verification, code}) 
        }
        />
        {verification.error &&  (
            <Text className="text-red-500 text-sm mt-1">
                {verification.error}
            </Text>
        )}

        <CustomButton 
            title="Verify Email" 
            onPress={onVerifyPress}
            className="mt-7 bg-success-500"/>
    </View>
    </ReactNativeModal>

        </View>
       </ScrollView>
    )
}


export default SignUp;